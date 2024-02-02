import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/signup">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
      <ThemeProvider theme={defaultTheme}>
        
          <CssBaseline />
          <Box
            sx={{
              width:'50%',
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor:'#ffffffe6',
            padding:5,
            borderRadius:5
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="PhoneNumber"
                    label="PhoneNumber"
                    name="PhoneNumber"
                    autoComplete="PhoneNumber"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Confirm Password"
                    label="Confirm Password"
                    type="Confirm Password"
                    id="Confirm Password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I agree."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>


                  Already have an account?
                  <Link to="/Login" variant="body2">
                    Signin                 

                  <Link to="/login" variant="body2">
                    <div class="signup">Already have an account?
                         SignIn
                    </div>

                  </Link>
                  
                </Grid>
              </Grid>
            </Box>
            <p class="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
            <a href="https://accounts.google.com/signin/v2/usernamerecovery?hl=vi&theme=glif&flowName=GlifWebSignIn&flowEntry=ServiceLogin" class="px-2 py-2 ml-md-1 rounded">
              <FaGoogle />
              <span class="fa fa-google" aria-hidden="true"></span> Google
            </a> 
          </Box>
          <Copyright sx={{ mt: 5 }} />
        
      </ThemeProvider>
    </Box>
  );
}