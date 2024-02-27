import React from 'react';
import { Typography, Grid, Paper, Divider, IconButton } from '@mui/material';


const UserProfile = () => {
  
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  console.log(localStorageUser);
  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className="paper">
            <Typography variant="h4">User Profile</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="paper profile-info">
          <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <img
                  src={localStorageUser?.photoURL || ""}
                  alt="user"
                  style={{ borderRadius: "50%", width: "30px" }}
                />
        </IconButton>
            <Typography variant="h5">Alex Thompson</Typography>
            <Typography variant="subtitle1" className="role">CEO / Co-Founder</Typography>
            <Divider className="divider" />
            <Typography variant="body2" className="bio">
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
            </Typography>
            <Typography variant="subtitle1" className="profile-section">Profile Information</Typography>
            <Typography variant="body1" className="profile-details">
              Full Name: Alec M. Thompson<br />
              Mobile: (44) 123 1234 123<br />
              Email: alecthompson@mail.com<br />
              Location: USA
            </Typography>
          </Paper>
        </Grid>
        {/* Other sections */}
      </Grid>
    </div>
  );
};

export default UserProfile;
