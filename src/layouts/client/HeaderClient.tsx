import { AppBar, Avatar, Badge, Box, IconButton, TextField, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import IconHomePagePNG from '@/assets/EComm-transparent.png';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Fade
} from '@mui/material';
import {
    AccountCircle as AccountIcon,
    ShoppingBag as PurchaseIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
const HeaderClient = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="sticky" sx={{ display: 'flex', justifyContent: 'center' }} >
            <Toolbar>
                <Box onClick={() => {
                    navigate('/home')
                }} component="img" src={IconHomePagePNG} alt="EComm"
                    sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0, mr: 2, mt: 1, width: '9%', cursor: 'pointer' }} />
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
                <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }} >
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
                    <IconButton
                        color="inherit"
                        onClick={handleClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/472311"
                            sx={{
                                width: 40,
                                height: 40,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.1)'
                                }
                            }}
                        />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        TransitionComponent={Fade}
                        slotProps={{
                            paper: {
                                elevation: 4,
                                sx: {
                                    minWidth: 200,
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <AccountIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="My Account" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PurchaseIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="My Purchase" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default HeaderClient;