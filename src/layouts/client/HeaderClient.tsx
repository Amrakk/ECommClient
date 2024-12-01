import { AppBar, Avatar, Badge, Box, IconButton, TextField, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import IconHomePagePNG from '@/assets/EComm-transparent.png';
import { Link, useNavigate } from "react-router-dom";
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
import { CustomerPaths } from "@/components/Route/CustomerRoute";
import { useGetCartByUser } from "@/hooks/Client/home/cart/useCart";
import { RootState } from "@/stores/client/store";
import { useDispatch, useSelector } from "react-redux";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { logout } from "@/apis/auth";
import { removeUser } from "@/stores/client/userSlice";
import { setLoading } from "@/stores/client/loadingSlice";
import { set } from "lodash";

const HeaderClient = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [searchValue, setSearchValue] = useState('');
    const { data: data } = useGetCartByUser();
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const user = useSelector((state: RootState) => state.user);

    const handleClose = async () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        dispatch(setLoading(true))
        await logout();
        dispatch(removeUser());
        localStorage.removeItem('user');
        dispatch(setLoading(false))
        setAnchorEl(null);
    }
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
                        onChange={(e) => setSearchValue(e.target.value)}
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
                                    <IconButton onClick={() => {
                                        navigate(CustomerPaths.home.Search + `?q=${searchValue}`)
                                    }} size="small" sx={{ color: 'white' }}>
                                        <Search />
                                    </IconButton>
                                ),
                            },
                        }}
                    />
                </Box>
                <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }} >
                    <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
                        <IconButton color="inherit" >
                            <Badge badgeContent={data?.items.length} color="error">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Link>

                    <IconButton
                        color="inherit"
                        onClick={handleClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            src={user?.avatarUrl}
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
                        {user != null ?
                            <Link to={CustomerPaths.home.User}>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <AccountIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="My Profile" />
                                </MenuItem>
                            </Link> : <Link to={CustomerPaths.auth.Login}>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <AccountIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </MenuItem>
                            </Link>
                        }

                        {
                            user != null ?
                                <Link to="/purchase">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <PurchaseIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="My Purchase" />
                                    </MenuItem>
                                </Link> :
                                <Link to={CustomerPaths.auth.SignUp}>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <AppRegistrationIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Sign Up" />
                                    </MenuItem>
                                </Link>
                        }

                        {
                            user != null ?
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </MenuItem> : null
                        }
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default HeaderClient;