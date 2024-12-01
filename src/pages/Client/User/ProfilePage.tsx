import React, { useEffect, useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Card,
    TextField,
    IconButton,
    Avatar,
    Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from '@mui/icons-material/Edit';
import { ColorSecondaryBlackOverlay } from "@/styles/ThemeColorClient";
import { RootState } from "@/stores/client/store";
import { useDispatch, useSelector } from "react-redux";
import GoogleIcon from '@mui/icons-material/Google';
import { useUpdateUserMutation } from "@/hooks/Client/home/useUser";
import AddressSection from "@/components/Client/User/AddressSection";
import SaveIcon from '@mui/icons-material/Save';
import { UserDetail } from "@/models/user";
import { toast } from "react-toastify";
import { setLoading } from "@/stores/client/loadingSlice";
import { setUser } from "@/stores/client/userSlice";
import isEmail from "validator/lib/isEmail";
import { isMobilePhone } from "validator";
import AvatarUploadDialog from "@/components/Client/User/UploadImage";
import DeleteAccountPage from "./DeleteAccountPage";
import {  useSearchParams } from "react-router-dom";

function TabPanel(props: { children: React.ReactNode; value: number; index: number }) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </Box>
    );
}


function ProfilePage() {
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const type = searchParams.get("type");
        if (type === "2") {
            setTabValue(1)
        }
        else if (type === "3") {
            setTabValue(2)
        }
    }, [searchParams]  )
    
    useEffect(() => {
         if (tabValue === 0) {
            window.history.replaceState(null, "", "/user/profile")
        }
        else if (tabValue === 1) {
            window.history.replaceState(null, "", "/user/profile?type=2")
        }
        else if (tabValue === 2) {
            window.history.replaceState(null, "", "/user/profile?type=3")
        }
    }, [tabValue])



    const [isEditProfile, setIsEditProfile] = useState(false);
    let user = useSelector((state: RootState) => state.user)
    const useUpdateUserMutate = useUpdateUserMutation();
    const [copiedUserProfile, setCopiedUserProfile] = useState<UserDetail >(user!)
    const dispatch = useDispatch()
    const [openAvatarDialogUpload, setOpenAvatarDialogUpload] = useState(false);


    const onSaveProfile = () => {
        if (isEditProfile) {
            if(isEmail(copiedUserProfile.email) === false ){
                toast.error("Invalid Email Address")
                return
            }
            else if(isMobilePhone(copiedUserProfile.phoneNumber ?? "", ["vi-VN"] ) === false){
                toast.error("Invalid Phone Number")
                return
            }

            dispatch(setLoading(true))
            useUpdateUserMutate.mutateAsync({
                _id: user!._id,
                data: {
                    name: copiedUserProfile.name,
                    email: copiedUserProfile.email,
                    phoneNumber: copiedUserProfile.phoneNumber,
                    addresses: copiedUserProfile.addresses,
                    avatarUrl: copiedUserProfile.avatarUrl,
                    cartId: copiedUserProfile.cartId
                }
            }).then(() => {
                dispatch(setUser(copiedUserProfile))
                setIsEditProfile(!isEditProfile)
                toast.success("Profile Updated Successfully")
            }).catch((err) => {
                toast.error(err.message)
                console.error(err)
            }).finally(() => {
                dispatch(setLoading(false))
            })
        }
        else{
            setIsEditProfile(!isEditProfile)
        }
    }



    return (
        <Box sx={{ width: "100%", padding: { xs: 0, lg: 3 } }}>
            <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="Profile tabs"
                variant="scrollable"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="My Profile" />
                <Tab label="My Order" />
                <Tab label="Delete Account" />
                <Tab label="Notifications" />
                <Tab label="Billing" />
                <Tab label="Data Export" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                <Card sx={{ p: 3 }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid >
                             {/* Upload Image Avatar URL */}
                            <Box position="relative" display="inline-block">
                                <Avatar 
                                sx={{ width: { lg: 100, xs: 64 }, height: { lg: 100, xs: 64 } }} 
                                alt={user!.name} 
                                src={user?.avatarUrl ?? "https://via.placeholder.com/100"} 
                                />
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: 'black',
                                        boxShadow: 3,
                                        '&:hover': { backgroundColor: ColorSecondaryBlackOverlay(1) }

                                    }}
                                    onClick={() => {
                                        setOpenAvatarDialogUpload(true)
                                    }}
                                >
                                    <EditIcon color="primary" />
                                </IconButton>
                                <AvatarUploadDialog onClose={ () => {
                                    setOpenAvatarDialogUpload(false)
                                }} open={openAvatarDialogUpload}  />
                            </Box>
                        </Grid>
                        <Grid>
                            <Typography variant="h6">{user?.name}</Typography>
                            <Chip label={"Loyalty Point: " +user?.loyaltyPoint} size="small" color="primary" />
                        </Grid>
                    </Grid>

                    <Box mt={4}>
                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between' }} >
                            <Typography variant="h6">Personal Information</Typography>
                            <IconButton onClick={() => {
                                onSaveProfile()
                            }}>
                                {isEditProfile ? <SaveIcon /> : <EditIcon />}
                            </IconButton>
                        </Grid>
                        <Grid container spacing={2} mt={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField disabled={!isEditProfile} label="Full Name" onChange={(e) => {
                                    setCopiedUserProfile({ ...copiedUserProfile, name: e.target.value })
                                }} defaultValue={user!.name} fullWidth />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField disabled={!isEditProfile} onChange={(e) => {
                                    setCopiedUserProfile({ ...copiedUserProfile, email: e.target.value })
                                }}
                                    label="Email Address"
                                    type="email"
                                    defaultValue={user!.email}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField label="Phone" disabled={!isEditProfile} onChange={(e) => {
                                    setCopiedUserProfile({ ...copiedUserProfile, phoneNumber: e.target.value })
                                }} defaultValue={user!.phoneNumber} fullWidth type="number" />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={3}>
                        <AddressSection />
                    </Box>
                    <Box mt={4}>
                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between' }} >
                            <Typography variant="h6">Social Linked</Typography>
                        </Grid>
                        <Grid container spacing={2} mt={2}>
                            {user!.socialMediaAccounts.map((social) => {
                                if (social.provider === "google") {
                                    return (
                                        <Grid key={social.accountId} size={12} sx={{ display: 'flex', alignItems: 'center' }} >
                                            <GoogleIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                                            <Typography variant="body1">Google - {social.accountId}</Typography>
                                        </Grid>
                                    )
                                }

                            })}
                        </Grid>
                    </Box>
                </Card>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Typography>My Order</Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <DeleteAccountPage />
            </TabPanel>
        </Box>
    );
}

export default ProfilePage;
