import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithUserName } from "../api/auth/loginWithUsername";
import useAuth from "../hooks/useAuth";
import { updateUser } from "../store/currenUserSlice";
import Loading from "./Loading";
import LoginWithGG from "./LoginWithGG";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {setAuth} = useAuth()
  const [loading, setLoading] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    
    console.log({
      email: data.get("userName"),
      password: data.get("password"),
    });
    loginWithUserName(data.get("userName"), data.get("password"))
    .then(res => {
      if(res.error){
        setLoading(false)
      }
      else{
        if(res.data){
          dispatch(updateUser(res?.data))
          localStorage.removeItem("user")
          localStorage.setItem('userInfor', JSON.stringify(res.data));
          setAuth(res.data)
          setTimeout(() => {
            if(res.data?.role === "ROLE_STAFF"){
              setLoading(false)
              navigate("/staff-dashboard/viewRegisterList")
            }else if(res.data?.role === "ROLE_ADMIN"){
              setLoading(false)
              localStorage.setItem("admin_id", res.data?.id)
              navigate("/dashboard")
            }else{
              setLoading(false)
              navigate("/")
            }
          }, 1000);
        }
      }
    })
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('images/loginbg.jpg')",
        backgroundSize: "cover",
        width: "100vw", // 100% of viewport width
        height: "100vh", // 100% of viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading isLoading={loading} />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffffe6",
          padding: 5,
          borderRadius: 5,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>

          
        </Box>

        <p className="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
        <LoginWithGG
          setUser={() => {
            console.log("setUser");
          }}
        />
      </Box>
    </Box>
  );
}
