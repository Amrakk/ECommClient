import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategoryComponent from "@/components/Client/CategoryComponent";
import ProductComponent from "@/components/Client/ProductComponent";
import FooterComponent from "@/components/Client/FooterComponent";
import TrustUsComponent from "@/components/Client/TrustUsComponent";
import TrustpilotComponent from "@/components/Client/TrustPilotComponent";
import MainImageHome from "@/assets/home/EComm illustration.png";
import VoucherImage from "@/assets/home/50_off.png";
import VoucherCollectComponent from "@/components/Client/VoucherCollectComponent";




const HomePage = () => {
    return (
        <Box sx={{
            m: {
                xs: 2,
                md: 5,
                lg: 7
            },
        }}>
            <Grid container spacing={2}>
                {/* First Row */}
                <Grid size={12} >
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 4, lg: 10 }, alignItems: 'flex-start', display: 'flex', gap: 2, flexDirection: 'column' }}>
                            <Typography variant="h4">
                                Discover More, Shop More: Your All-in-One Marketplace!
                            </Typography>
                            <Typography variant="body1">
                                Shop a wide range of products—smartphones, clothing, and accessories. Enjoy great deals and fast shipping!
                            </Typography>
                            <Grid size={{ xs: 12, md: 12 }} container spacing={5} display='flex' flexDirection={{ lg: 'row', xs: 'column' }} justifyContent='center' alignItems='center'>
                                <Grid size={{ xs: 12, md: 4 }} >
                                    <Button variant="contained" color="primary" sx={{ mt: 2, width: { xs: '40%', md: '100%' } }}>
                                        <Typography variant="body2" sx={{ color: 'black', fontWeight: 'medium' }}>Shop Now</Typography>
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <TrustpilotComponent />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={6} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexDirection: 'column' }}>
                            <Box
                                component='img' src={MainImageHome} alt="EComm illustration"
                                sx={{ width: { sm: '100%', lg: '75%' }, height: 'auto' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/* Second Row */}
                <Grid container size={12} spacing={5} sx={{ mt: 5 }} >
                    <TrustUsComponent />
                </Grid>
                {/* Third Row */}
                <Grid container size={12} spacing={2} sx={{ mt: 10 }} >
                    <Grid size={5} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography variant="h6"> Popular Categories</Typography>
                    </Grid>
                    <Grid size={7} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-end' }} >
                        <CategoryComponent sx={{}} />
                        <CategoryComponent sx={{}} />
                        <CategoryComponent sx={{}} />
                        <CategoryComponent sx={{}} />

                    </Grid>
                </Grid>
                {/* Fourth Row */}
                <Grid container size={12} spacing={5} sx={{ mt: 5 }} >
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}  > Latest Products</Typography>
                        <Typography variant="body2"> See All</Typography>
                        <IconButton>
                            <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Grid>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'row', gap: 5, overflowX: 'auto' }} >
                        <ProductComponent />
                        <ProductComponent />
                        <ProductComponent />
                        <ProductComponent />
                    </Grid>
                </Grid>
                {/* Fifth Row */}

                <Grid container size={12} spacing={5} sx={{ mt: 5 }} >
                    <Grid size={6} sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Box
                            component='img' src={VoucherImage} alt="50% off"
                            sx={{ width: {lg: '50%', sm: '100%'}, height: 'auto', borderRadius: 5 }}
                        />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {/* <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Get 50% Off on Your First Purchase</Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>Sign up for our newsletter and get 50% off your first purchase. Stay updated on new arrivals and exclusive offers.</Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2, width: {md: '40%', sm: '100%'} }}>
                            <Typography variant="body2" sx={{ color: 'black', fontWeight: 'medium' }}>Subscribe Now</Typography>
                        </Button> */}
                        <VoucherCollectComponent />
                    </Grid>
                </Grid>
                {/* Divider */}
                <Grid size={12} sx={{ mt: 5, mx: 20 }}>
                    <Divider />
                </Grid>
                {/* Sixth Row */}
                <Grid container size={12} spacing={5} sx={{ mt: 2 }} >
                    <FooterComponent />
                </Grid>
            </Grid >
        </Box >
    )
}


export default HomePage;