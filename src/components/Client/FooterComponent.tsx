import { Box, Typography, IconButton, Link, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const FooterComponent = () => {
    return (
        <Box
            component="footer"
            sx={{
                color: "white",
                mt: "auto",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    m: 10,
                    alignItems: "space-between",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2">
                            We are dedicated to providing the best service to our customers.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="#" color="inherit" underline="hover">
                                Home
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Services
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Contact
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Blog
                            </Link>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box>
                            <IconButton color="inherit" aria-label="Facebook">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit" aria-label="Twitter">
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit" aria-label="Instagram">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit" aria-label="LinkedIn">
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="inherit" align="center" sx={{ pt: 6 }}>
                    © {new Date().getFullYear()} Nguyen Duy - Ninh Dong. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default FooterComponent;
