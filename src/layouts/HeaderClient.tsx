import { AppBar, Avatar, Badge, Box, Button, IconButton, TextField, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link as RouterLink } from "react-router-dom";

const HeaderClient = () => {
    return (
        <AppBar position="sticky" sx={{ display: 'flex', justifyContent: 'center' }} >
            <Toolbar>
                <Box component="img" src="src\assets\EComm-transparent.png"
                    sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0, mr: 2, mt: 1, width: '9%'}} />
                {/* <Box component="img" src="src\assets\ECommText.png"
                    sx={{ display: { xs: 'none', md: 'flex' }, height: 48, ml: -3}} /> */}
                {/* <Box sx={{ flexGrow: 1, display: 'flex' }} >
                    <Button component={RouterLink} to={'/'} color="inherit">Home</Button>
                    <Button component={RouterLink} to={'/about'} color="inherit">About</Button>
                    <Button component={RouterLink} to={'/contact'} color="inherit">Contact</Button>
                </Box> */}
                <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Search..."
                        variant="outlined"
                        sx={{
                            width: {
                                xs: '100%',
                                sm: '300px',
                                md: '400px',
                                lg: '500px',
                            },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                borderRadius: 3,
                                '& fieldset': {
                                    border: 'none',
                                },
                                '& input': {
                                    color: 'white',
                                    '&::placeholder': {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    },
                                },
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <IconButton size="small" sx={{ color: 'white' }}>
                                        <Search />
                                    </IconButton>
                                ),
                            },
                        }}
                    />
                </Box>
                <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: {xs: 1, md: 2} }} >
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsNoneIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" >
                        <Badge badgeContent={4} color="error">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Avatar src="https://avatars.githubusercontent.com/u/472311" />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default HeaderClient;