import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#222', // Update with your preferred background color
                color: '#fff', // Update with your preferred text color
                padding: '40px 0',
                mt: 'auto',
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#61dafb' }}>
                            About Us
                        </Typography>
                        <Typography variant="body2" >
                            Welcome to our innovative Quotation Interior System where elegance meets efficiency. Transforming your interior design projects has never been smoother. Our user-friendly platform streamlines the quotation process, offering a seamless experience for both designers and clients.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#61dafb' }}>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" >
                            Customer Support:
                        </Typography>
                        <Typography>
                            Email: support@interiorsystem.com
                            Phone: +1-555-123-4567
                        </Typography>
                        <Typography>Business Inquiries:</Typography>
                        <Typography>
                            Email: info@interiorsystem.com
                            Phone: +1-555-987-6543
                        </Typography>
                        <Typography>Visit Us:</Typography>
                        <Typography>
                            123 Design Street, Suite 456
                            Cityville, Interiorland
                        </Typography>
                        <Typography>Connect With Us:</Typography>
                        <Typography>Follow us on social media for the latest updates, design inspiration, and more:</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#61dafb' }}>
                            Connect With Us
                        </Typography>
                        <IconButton color="primary" aria-label="LinkedIn">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="Twitter">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="Facebook">
                            <FacebookIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body2"  align="center" mt={4}>
                    &copy; {new Date().getFullYear()} Interior design.  All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
