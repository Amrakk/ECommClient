import {
    Container, TextField, Typography, RadioGroup,
    FormControlLabel, Radio, Button, Card, CardContent,
    Divider, Paper, Fade,
    Grow
} from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/client/store';
import BreadcrumbsComponent from '@/components/Client/BreadcrumbsComponent';
import AddressCard from '@/components/Client/User/CardAddressComponent';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CustomerPaths } from '@/components/Route/CustomerRoute';
import { useEffect, useState } from 'react';
import { CartDetailWithProduct } from '@/apis/carts';
import MiniItem from '@/components/Client/Product/MiniItemComponent';
import { convertToVietnameseDong } from '@/utils/convertToVnd';
import { PointSwitch } from '@/layouts/client/Theme';
import useGetShippingFeeQuery from '@/hooks/Client/home/order/useGetShippingFee';
import { GetShippingFee } from '@/apis/services';
import useVoucherActions from '@/hooks/Admin/Vouchers/useVoucherActions';
import { setLoading } from '@/stores/client/loadingSlice';
import { DISCOUNT_TYPE, PAYMENT_TYPE } from '@/constants';
import { Checkout } from '@/apis/orders';
import useCheckoutMutation from '@/hooks/Client/home/order/useCheckout';
import { toast } from 'react-toastify';

interface CheckoutNavigationState {
    cart: CartDetailWithProduct;
    totalPrice: number;
}


const CheckoutPage = () => {

    const user = useSelector((state: RootState) => state.user);
    const location = useLocation();
    const { cart, totalPrice } = location.state as CheckoutNavigationState ?? {};

    // Early return if validation fails
    if (!user?.addresses.length) {
        return <Navigate to={CustomerPaths.home.User} />;
    }
    if (!cart || cart.items.length === 0) {
        return <Navigate to={CustomerPaths.home.Cart} />;
    }

    const [selectedAddress, setSelectedAddress] = useState("0");
    const [checkedGrow, setCheckedGrow] = useState(true);
    const [usePoints, setUsePoints] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<GetShippingFee>({
        districtId: user.addresses[0].district.id,
        wardCode: user.addresses[0].ward.code,
    });

    const { isLoading: isLoadingShippingFee, refetch: refetchShippingFee, data: dataShipping } = useGetShippingFeeQuery(currentAddress);
    const [shippingFee, setShippingFee] = useState<number>();
    const [voucherCode, setVoucherCode] = useState<string | null>(null);

    const [statusVoucher, setStatusVoucher] = useState({
        isError: false,
        message: "",
        discount: 0,
        type: null as DISCOUNT_TYPE | null,
        voucherCode: undefined as string | undefined
    });
    const [discountPrice, setDiscountPrice] = useState(0);
    const [currentTypePayment, setCurrentTypePayment] = useState<PAYMENT_TYPE>(PAYMENT_TYPE.COD);
    const dispatch = useDispatch();
    const { validateAction } = useVoucherActions();
    const [checkout, setCheckout] = useState<Checkout>()
    const checkoutMutation = useCheckoutMutation();
    const navigate = useNavigate();

    const handleApplyVoucher = async () => {
        if (!voucherCode) return;
        dispatch(setLoading(true));
        validateAction.mutateAsync(voucherCode!).then((response) => {
            setStatusVoucher({
                isError: false,
                message: "Voucher applied successfully",
                discount: response.discount.value,
                type: response.discount.type,
                voucherCode: voucherCode
            });
        }).catch((e) => {

            setStatusVoucher({
                isError: true,
                message: e.error.message,
                discount: 0,
                type: null,
                voucherCode: undefined
            })
        }).finally(() => {
            dispatch(setLoading(false))
        });
    }

    const handleApplyDiscount = () => {
        if (statusVoucher.type === DISCOUNT_TYPE.PERCENT) {
            setDiscountPrice(totalPrice * statusVoucher.discount / 100);
        } else {
            setDiscountPrice(statusVoucher.discount);
        }

    };

    const handleCheckout = () => {
        dispatch(setLoading(true));
        setCheckout({
            paymentType: currentTypePayment,
            shippingAddress: user.addresses[parseInt(selectedAddress)],
            usePoints: usePoints,
            voucherCode: statusVoucher.voucherCode
        })
    }

    useEffect(() => {
        if (checkout) {
            checkoutMutation.mutateAsync(checkout).then((response) => {
                if(currentTypePayment === PAYMENT_TYPE.COD){
                    setCheckedGrow(false);
                    setTimeout(() => {
                        navigate(CustomerPaths.home.TransactionDetail, { state: { resCheckout: response} })
                    }, 800);
                } else{
                    if(response.transaction.checkoutUrl){
                        window.location.href = response.transaction.checkoutUrl;
                    }
                    else{
                        toast.error("Error while checkout, please try again later");
                    }
                }
            }).catch((e) => {
                toast.error("Error while checkout, please try again later");
                console.error(e);
            }).finally(() => {
                if(currentTypePayment === PAYMENT_TYPE.COD){
                    dispatch(setLoading(false));
                }
            })
        }
    }, [checkout])



    useEffect(() => {
        const address = {
            districtId: user.addresses[parseInt(selectedAddress)].district.id,
            wardCode: user.addresses[parseInt(selectedAddress)].ward.code,
        };
        setCurrentAddress(address);
    }, [selectedAddress]);

    useEffect(() => {
        refetchShippingFee();
    }, [currentAddress, refetchShippingFee]);

    useEffect(() => {
        if (dataShipping?.shippingFee) {
            setShippingFee(dataShipping.shippingFee);
        }
    }, [dataShipping?.shippingFee]);

    useEffect(() => {
        handleApplyDiscount();
        console.log(statusVoucher);
    }, [statusVoucher]);



    return (
        <Grow in={checkedGrow} timeout={800} style={{ transformOrigin: '0 0 0' }}             >
            <Container maxWidth="lg" sx={{ my: 6 }}>
                <BreadcrumbsComponent />
                <Grid container spacing={4} mt={2}>
                    {/* Shipping Address Section */}
                    <Grid size={{ lg: 7, xs: 12 }}>
                        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Typography variant="h5" fontWeight="500">
                                    Select Your Shipping Address
                                </Typography>
                            </Box>

                            <Grid container spacing={2} display="flex" justifyContent={{ lg: "flex-start", sm: 'flex-start', xs: "center" }}>
                                {user!.addresses.map((address, index) => (
                                    <AddressCard key={index} value={index.toString()} isSelected={selectedAddress.includes(index.toString())} address={address} onEdit={(value) => { setSelectedAddress(value!) }} />
                                )
                                )}
                            </Grid>

                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 3 }}>
                                <LocalShippingIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Typography variant="h5" fontWeight="500">
                                    Shipping method
                                </Typography>
                            </Box>

                            <RadioGroup defaultValue="express">
                                <Paper variant="outlined" sx={{ mb: 1, p: 1.5, borderRadius: 2 }}>
                                    <FormControlLabel
                                        value="regular"
                                        checked
                                        control={<Radio />}
                                        label={
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="500">Regular shipping - {!isLoadingShippingFee ? convertToVietnameseDong(shippingFee) : "Loading..."}</Typography>
                                                <Typography variant="body2" color="text.secondary">Delivery by GHN</Typography>
                                                <Typography variant="body2" color="text.secondary">Take 3-14 days to deliver</Typography>
                                            </Box>
                                        }
                                    />
                                </Paper>
                            </RadioGroup>

                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 3 }}>
                                <PaymentIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Typography variant="h5" fontWeight="500">
                                    Payment method
                                </Typography>
                            </Box>

                            <RadioGroup defaultValue={PAYMENT_TYPE.COD} onChange={(value) => {
                                setCurrentTypePayment(value.target.value as PAYMENT_TYPE);
                            }} >
                                <Paper variant="outlined" sx={{ mb: 1, p: 1.5, borderRadius: 2 }}>
                                    <FormControlLabel
                                        value={PAYMENT_TYPE.COD}
                                        control={<Radio />}
                                        label={
                                            <Typography variant="subtitle1" fontWeight="500">Cash on Delivery (COD)</Typography>
                                        }
                                    />
                                </Paper>
                                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                                    <FormControlLabel
                                        value={PAYMENT_TYPE.PAYOS}
                                        control={<Radio />}
                                        label={
                                            <Typography variant="subtitle1" fontWeight="500">Payos</Typography>
                                        }
                                    />
                                </Paper>
                            </RadioGroup>
                        </Paper>
                    </Grid>

                    {/* Order Summary Section */}
                    <Grid size={{ lg: 5, xs: 12 }}>
                        <Card elevation={2} sx={{ position: 'sticky', top: 20, borderRadius: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <ShoppingCartIcon sx={{ mr: 2, color: 'primary.main' }} />
                                    <Typography variant="h5" fontWeight="500">
                                        Your Order
                                    </Typography>
                                </Box>

                                {cart.items.map((item, index) => (
                                    <MiniItem key={index} item={item} />
                                ))}

                                <Box sx={{ mb: 3 }}>
                                    <TextField
                                        fullWidth
                                        disabled={statusVoucher.discount > 0}
                                        label="Discount Code"
                                        variant="outlined"
                                        error={statusVoucher.isError}
                                        helperText={statusVoucher.message}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleApplyVoucher}
                                                        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                    >
                                                        Apply
                                                    </Button>
                                                ),
                                            }
                                        }}
                                    />
                                </Box>
                                {/* Voucher Discount Display */}

                                <Fade in={statusVoucher.discount > 0} timeout={500}>
                                    <Box sx={{
                                        display: statusVoucher.type === null ? 'none' : 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        bgcolor: 'primary.dark',
                                        color: 'primary.contrastText',
                                        p: 2,
                                        borderRadius: 3,
                                        mb: 2
                                    }}>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="500">
                                                Voucher Applied
                                            </Typography>
                                            <Typography variant="caption">
                                                {statusVoucher.type === DISCOUNT_TYPE.PERCENT
                                                    ? `${statusVoucher.discount}% off`
                                                    : convertToVietnameseDong(statusVoucher.discount)}
                                            </Typography>
                                        </Box>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="inherit"
                                            onClick={() => {
                                                setStatusVoucher({
                                                    ...statusVoucher,
                                                    discount: 0,
                                                })
                                                setTimeout(() => {
                                                    setStatusVoucher({
                                                        isError: false,
                                                        message: "",
                                                        discount: 0,
                                                        type: null,
                                                        voucherCode: undefined
                                                    })
                                                }, 500)
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </Fade>

                                {/* Use My Points */}

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    bgcolor: 'background.paper',
                                    p: 2,
                                    borderRadius: 3,
                                    boxShadow: 1,
                                    mb: 2
                                }}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="500">
                                            Use My Points
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Available points: {user.loyaltyPoint}
                                        </Typography>
                                    </Box>
                                    <FormControlLabel
                                        control={
                                            <PointSwitch
                                                checked={usePoints}
                                                disabled={user.loyaltyPoint === 0}
                                                onChange={(e) => setUsePoints(e.target.checked)}
                                            />
                                        }
                                        label=""
                                    />
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ '& > div': { my: 1 } }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography color="text.secondary">Subtotal:</Typography>
                                        <Typography>{convertToVietnameseDong(totalPrice)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography color="text.secondary">Discount:</Typography>
                                        <Typography> - {convertToVietnameseDong(discountPrice)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography color="text.secondary">Shipment cost:</Typography>
                                        <Typography>{convertToVietnameseDong(shippingFee)}</Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6">Grand total:</Typography>
                                    <Typography variant="h6" color="primary.main" fontWeight="600">
                                        {convertToVietnameseDong(totalPrice - discountPrice + (shippingFee ?? 0))}
                                    </Typography>
                                </Box>

                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    onClick={() => handleCheckout()}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Continue to payment
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default CheckoutPage;