import {
    Typography,
    IconButton,
    Tooltip,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddressCard from "./CardAddressComponent";
import AddIcon from "@mui/icons-material/Add";
import { IAddress } from "@/models/user";
import { useState } from "react";
import { useAddressesStore } from "@/stores/addresses.store";
import { useUpdateUserMutation } from "@/hooks/Client/home/useUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/client/store";
import { toast } from "react-toastify";
import { setLoading } from "@/stores/client/loadingSlice";
import { setUser } from "@/stores/client/userSlice";

enum AddressType {
    "province",
    "district",
    "ward",
    "street",
    "contactInfo",
}

const AddressSection = () => {
    const [open, setOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<IAddress>();
    const provinces = useAddressesStore((state) => state.provinces);
    const districts = useAddressesStore((state) => state.districts);
    const user = useSelector((state: RootState) => state.user);
    const wards = useAddressesStore((state) => state.wards);
    const useUpdateUserMutate = useUpdateUserMutation();
    const [isAddNewAddress, setIsAddNewAddress] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<IAddress>({
        street: "",
        ward: { code: "", name: "" },
        district: { id: 0, name: "" },
        province: { id: 0, name: "" },
        contactInfo: "",
    });

    const [indexOfOldAddress, setIndexOfOldAddress] = useState(0);
    const dispatch = useDispatch();

    const handleEdit = (address: IAddress) => {
        setSelectedAddress(address);
        setIndexOfOldAddress(user!.addresses.findIndex((a) => a === address));
        setCurrentAddress(address);
        setOpen(true);
    };
    const handleDelete = () => {
        if (user) {
            const newUser = {
                ...user,
                addresses: user.addresses.filter((_, index) => index !== indexOfOldAddress),
            };
            dispatch(setLoading(true));
            useUpdateUserMutate
                .mutateAsync({
                    _id: user._id,
                    data: {
                        name: newUser.name,
                        email: newUser.email,
                        phoneNumber: newUser.phoneNumber,
                        addresses: newUser.addresses,
                        avatarUrl: newUser.avatarUrl,
                        cartId: newUser.cartId,
                    },
                })
                .then(() => {
                    dispatch(setLoading(false));
                    dispatch(setUser(newUser));
                    setOpen(false);
                    toast.success("Address deleted successfully");
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    toast.error("Error deleting address");
                });
        }
    };

    const onChangeAddress = (type: AddressType, value?: string, id?: number | string) => {
        switch (type) {
            case AddressType.province:
                setCurrentAddress({
                    ...currentAddress,
                    province: { id: Number(id), name: value! },
                    ward: { code: "", name: "" },
                    district: { id: 0, name: "" },
                });
                break;
            case AddressType.district:
                setCurrentAddress({
                    ...currentAddress,
                    district: { id: Number(id), name: value! },
                });
                break;
            case AddressType.ward:
                setCurrentAddress({
                    ...currentAddress,
                    ward: { code: String(id), name: value! },
                });
                break;
            case AddressType.street:
                setCurrentAddress({
                    ...currentAddress,
                    street: value!,
                });
                break;
            case AddressType.contactInfo:
                setCurrentAddress({
                    ...currentAddress,
                    contactInfo: value!,
                });
                break;
            default:
                break;
        }
    };

    const onSaveAddress = () => {
        // Check empty field
        if (
            currentAddress.street === "" ||
            currentAddress.ward.code === "" ||
            currentAddress.district.id === 0 ||
            currentAddress.province.id === 0
        ) {
            toast.error("Please fill all required fields");
            return;
        }
        if (isAddNewAddress && user) {
            const newUser = {
                ...user,
                addresses: [...user.addresses, currentAddress],
            };
            dispatch(setLoading(true));
            useUpdateUserMutate
                .mutateAsync({
                    _id: user._id,
                    data: {
                        name: newUser.name,
                        email: newUser.email,
                        phoneNumber: newUser.phoneNumber,
                        addresses: newUser.addresses,
                        avatarUrl: newUser.avatarUrl,
                        cartId: newUser.cartId,
                    },
                })
                .then(() => {
                    dispatch(setLoading(false));
                    dispatch(setUser(newUser));
                    toast.success("Address added successfully");
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    toast.error("Error adding address");
                });
        } else {
            if (user) {
                const newUser = {
                    ...user,
                    addresses: user.addresses.map((address, index) => {
                        if (index === indexOfOldAddress) {
                            return currentAddress;
                        }
                        return address;
                    }),
                };
                dispatch(setLoading(true));
                useUpdateUserMutate
                    .mutateAsync({
                        _id: user._id,
                        data: {
                            name: newUser.name,
                            email: newUser.email,
                            phoneNumber: newUser.phoneNumber,
                            addresses: newUser.addresses,
                            avatarUrl: newUser.avatarUrl,
                            cartId: newUser.cartId,
                        },
                    })
                    .then(() => {
                        dispatch(setLoading(false));
                        dispatch(setUser(newUser));
                        toast.success("Address updated successfully");
                    })
                    .catch(() => {
                        dispatch(setLoading(false));
                        toast.error("Error updating address");
                    });
            }
        }

        setCurrentAddress({
            street: "",
            ward: { code: "", name: "" },
            district: { id: 0, name: "" },
            province: { id: 0, name: "" },
            contactInfo: "",
        });
        setOpen(false);
        setIsAddNewAddress(false);
    };

    return (
        <>
            <Grid size={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Address</Typography>
                <IconButton
                    onClick={() => {
                        setOpen(true);
                        setIsAddNewAddress(true);
                    }}
                >
                    <Tooltip title="Add New Address">
                        <AddIcon />
                    </Tooltip>
                </IconButton>
            </Grid>
            <Grid container spacing={2} mt={2}>
                {/* Address Section */}
                <Box mt={1}>
                    <Grid container spacing={3}>
                        {user!.addresses.map((address, index) => (
                            <Grid sx={{ xs: 12, sm: 6 }} key={index}>
                                <AddressCard address={address} onEdit={() => handleEdit(address)} />
                            </Grid>
                        ))}
                    </Grid>
                    {user!.addresses.length === 0 ? (
                        <Typography color="text.secondary" variant="body2">
                            No address found, please add new address
                        </Typography>
                    ) : null}
                    <Dialog
                        open={open}
                        PaperProps={{
                            sx: {
                                p: 2,
                                borderRadius: 2,
                            },
                        }}
                        fullWidth
                        onClose={() => {
                            setOpen(false);
                            setCurrentAddress({
                                street: "",
                                ward: { code: "", name: "" },
                                district: { id: 0, name: "" },
                                province: { id: 0, name: "" },
                                contactInfo: "",
                            });
                            setIsAddNewAddress(false);
                        }}
                    >
                        <DialogTitle id="address-dialog-title">
                            {isAddNewAddress ? "Add New Address" : "Edit Address"}
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid size={12}>
                                    <TextField
                                        label="Street"
                                        fullWidth
                                        defaultValue={isAddNewAddress ? "" : selectedAddress?.street}
                                        onChange={(e) => onChangeAddress(AddressType.street, e.target.value)}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box sx={{ width: "100%" }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="simple-select-province">City/Province</InputLabel>
                                            <Select
                                                labelId="simple-select-province"
                                                id="simple-select-province"
                                                label="City/Province"
                                                value={currentAddress?.province.id}
                                                defaultValue={isAddNewAddress ? "" : selectedAddress?.province.id}
                                                onChange={(e) => {
                                                    const selectedProvince = provinces!.find(
                                                        (p) => p.province_id === e.target.value
                                                    );
                                                    if (selectedProvince) {
                                                        onChangeAddress(
                                                            AddressType.province,
                                                            selectedProvince.province_name,
                                                            selectedProvince.province_id
                                                        );
                                                    }
                                                }}
                                            >
                                                {provinces!.map((province) => (
                                                    <MenuItem key={province.province_id} value={province.province_id}>
                                                        {province.province_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth disabled={currentAddress?.province.id == 0}>
                                        <InputLabel id="simple-select-district">District</InputLabel>
                                        <Select
                                            labelId="simple-select-district"
                                            id="simple-select-district"
                                            label="District"
                                            value={currentAddress?.district.id}
                                            defaultValue={isAddNewAddress ? "" : selectedAddress?.district.id}
                                            onChange={(e) => {
                                                const selectedDistrict = districts!.find(
                                                    (d) => d.district_id === e.target.value
                                                );
                                                if (selectedDistrict) {
                                                    onChangeAddress(
                                                        AddressType.district,
                                                        selectedDistrict.district_name,
                                                        selectedDistrict.district_id
                                                    );
                                                }
                                            }}
                                        >
                                            {districts!.map((district) => {
                                                if (currentAddress?.province?.id === district.province_id) {
                                                    return (
                                                        <MenuItem
                                                            key={district.district_id}
                                                            value={district.district_id}
                                                        >
                                                            {district.district_name}
                                                        </MenuItem>
                                                    );
                                                }
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth disabled={currentAddress?.district.id == 0}>
                                        <InputLabel id="simple-select-ward">Ward</InputLabel>
                                        <Select
                                            labelId="simple-select-ward"
                                            id="simple-select-ward"
                                            label="Ward"
                                            value={currentAddress?.ward.code}
                                            defaultValue={isAddNewAddress ? "" : selectedAddress?.district.id}
                                            onChange={(e) => {
                                                const selectedWard = wards!.find((d) => d.ward_code === e.target.value);
                                                if (selectedWard) {
                                                    onChangeAddress(
                                                        AddressType.ward,
                                                        selectedWard.ward_name,
                                                        selectedWard.ward_code
                                                    );
                                                }
                                            }}
                                        >
                                            {wards!.map((ward) => {
                                                if (currentAddress?.district?.id === ward.district_id) {
                                                    return (
                                                        <MenuItem key={ward.ward_code} value={ward.ward_code}>
                                                            {ward.ward_name}
                                                        </MenuItem>
                                                    );
                                                }
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField label="Country" fullWidth disabled defaultValue="Vietnam" />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        label="Contact Info"
                                        fullWidth
                                        defaultValue={isAddNewAddress ? "" : selectedAddress?.contactInfo}
                                        onChange={(e) => onChangeAddress(AddressType.contactInfo, e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setOpen(false);
                                        setCurrentAddress({
                                            street: "",
                                            ward: { code: "", name: "" },
                                            district: { id: 0, name: "" },
                                            province: { id: 0, name: "" },
                                            contactInfo: "",
                                        });
                                        setIsAddNewAddress(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                {isAddNewAddress ? null : (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            handleDelete();
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}

                                <Button variant="contained" onClick={onSaveAddress}>
                                    Save Changes
                                </Button>
                            </Box>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Grid>
        </>
    );
};

export default AddressSection;
