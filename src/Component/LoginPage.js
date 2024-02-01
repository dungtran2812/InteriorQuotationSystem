// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { FaGoogle } from "react-icons/fa";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FaGoogle } from "react-icons/fa";


export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (

      <Container component="main" maxWidth="xs"> 
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          </Box>
    <Box sx={{
      backgroundImage: "url('https://interiordesign.net/wp-content/uploads/2024/01/Interior-Design-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL01b.jpg')",
      backgroundSize: 'cover',
      width: '100vw', // 100% of viewport width
      height: '100vh', // 100% of viewport height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Container component="main" maxWidth="xs"  >
        <Box
          sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <a href = "http://localhost:3000/"> Sign in</a>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot Password?               
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link href="#" variant="body2">

                  <a href="http://localhost:3002/SignUp"> SignUp</a>                               
                </Link>
              </Grid>
            </Grid>
          </Box>

          <p class="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
          <a href="https://accounts.google.com/signin/v2/usernamerecovery?hl=vi&theme=glif&flowName=GlifWebSignIn&flowEntry=ServiceLogin" class="px-2 py-2 ml-md-1 rounded">
					<FaGoogle />
          <span class="fa fa-google"></span>-Google
					</a> 
        </Box>
      </Container>
      </Box>
      </Container>
  );
}