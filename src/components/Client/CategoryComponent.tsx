import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ColorPrimary } from "@/styles/ThemeColorClient";

type Props = {
    sx: SxProps<Theme>
}
const CategoryComponent = ( props: Props) => {
    return (
        <Box>
            <Paper
                elevation={3}
                sx={{
                    width: {
                        xs: '100px',    
                        sm: '110px', 
                        md: '150px'     
                    },
                    minHeight: {
                        xs: 'auto',
                        sm: 'auto', 
                        md: 'auto'
                    },
                    display: 'flex',
                    padding: { 
                        xs: 2,
                        sm: 1.5,
                        md: 2 
                    },
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-3px)',
                        bgcolor: ColorPrimary(0.2), // More subtle blue
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    },
                    '&:active': {
                        transform: 'translateY(-2px)',
                    },
                    gap: 2,
                    borderRadius: 2,
                    ...props.sx
                }}
            >
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
                <Typography variant="body2" fontWeight="medium">
                    Shopping
                </Typography>
            </Paper>
        </Box>
    );
}
export default CategoryComponent;