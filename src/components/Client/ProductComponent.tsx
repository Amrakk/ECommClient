import {
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
    useTheme,
    useMediaQuery,
    Card
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductComponent = () => {
    return (
        <Card sx={{ minWidth: 200 }}>
            <CardMedia
                component="img"
                height="250"
                image="https://placehold.co/320x250"
                alt="Product Image"
                sx={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography
                    variant="subtitle2"
                    color="primary"
                    gutterBottom
                >
                    NEW ARRIVAL
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                >
                    Premium Product Name
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    High-quality product with premium materials and elegant design
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        $99.99
                    </Typography>
                    <Box>
                        <IconButton size="small" color="primary">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton size="small" color="primary">
                            <ShoppingCartIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};


export default ProductComponent;