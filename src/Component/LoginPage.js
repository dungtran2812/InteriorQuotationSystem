
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

    <Box sx={{
      backgroundImage: "url('images/loginbg.jpg')",
      backgroundSize: 'cover',
      width: '100vw', // 100% of viewport width
      height: '100vh', // 100% of viewport height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      
        <Box
          sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor:'#ffffffe6',
            padding:5,
            borderRadius:5
            
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
               <Link to='/'>Sign in</Link>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot Password?               
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link href="/signup" variant="body2">

                   SignUp                 
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
      
      </Box>
    
  );
}