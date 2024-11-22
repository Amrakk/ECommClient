import { Box, Container, Typography, Card, CardContent, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SpeedIcon from '@mui/icons-material/Speed';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { ColorSecondaryBlackOverlay  } from '@/styles/ThemeColorClient';

const TrustUsComponent = () => {
    const reasons = [
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: 'Secure & Reliable',
            description: 'Bank-grade security protocols and 99.9% uptime guarantee'
        },
        {
            icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
            title: '24/7 Support',
            description: 'Round-the-clock customer support to assist you anytime'
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40 }} />,
            title: 'Fast & Efficient',
            description: 'Lightning-fast performance and optimized workflows'
        },
        {
            icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
            title: 'Premium Quality',
            description: 'Industry-leading solutions with proven track record'
        }
    ];

    return (
        <Box sx={{ py: 8, width: '100%', borderRadius: 10 }} bgcolor = {ColorSecondaryBlackOverlay(1)} >
            <Container maxWidth="lg">
                <Box textAlign="center" mb={8}>
                    <Typography
                        variant="h2"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            color: 'primary.main'
                        }}
                    >
                        Count on Us
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                        Discover the advantages that set us apart
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {reasons.map((reason, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <Card>
                                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                    <IconButton
                                        color="primary"
                                        sx={{
                                            mb: 2,
                                            '&:hover': { bgcolor: 'transparent' },
                                            cursor: 'default'
                                        }}
                                        disableRipple
                                    >
                                        {reason.icon}
                                    </IconButton>
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        {reason.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {reason.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default TrustUsComponent;