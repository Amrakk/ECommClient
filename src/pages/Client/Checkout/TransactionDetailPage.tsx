import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    Button,
    Grow,
    Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MiniItem from "@/components/Client/Product/MiniItemComponent";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ResCheckout } from "@/apis/orders";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/client/store";
import { formatDate } from "@/utils/convertDate";
import { convertToVietnameseDong } from "@/utils/convertToVnd";
import { CustomerPaths } from "@/components/Route/CustomerRoute";
import { PAYMENT_TYPE } from "@/constants";
import { useEffect, useState } from "react";
import { setUser } from "@/stores/client/userSlice";
import { useSearchParams } from 'react-router-dom';
import useOrderById from "@/hooks/Admin/Orders/useOrderById";
import ErrorIcon from '@mui/icons-material/Error';
import { useGetTransactionByOrderIdQuery } from "@/hooks/Client/home/order/useTransaction";

interface TransactionDetailState {
    resCheckout: ResCheckout
}

interface TransactionURLParams {
    code: string | null;
    id: string | null;
    status: string | null;
    orderCode: string | null;
    cancel: boolean;
}


const TransactionDetailPage = () => {
    const location = useLocation();
    const { resCheckout } = location.state as TransactionDetailState ?? {};
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkedGrow, setCheckedGrow] = useState(true);
    const [searchParams] = useSearchParams();
    const [resCheckoutCopy, setResCheckoutCopy] = useState<ResCheckout | null>(null);
    let isUsingParams = false;
    const urlParams: TransactionURLParams = {
        code: searchParams.get('code'),
        id: searchParams.get('id'),
        status: searchParams.get('status'),
        orderCode: searchParams.get('orderCode'),
        cancel: searchParams.get('cancel') === 'true'
    };
    const { data: dataOrder, isError: isErrorOrder } = useOrderById(urlParams.orderCode || "");
    const [isLoading, setIsLoading] = useState(true);
    const { data: transactionOrder, isError: isErrorTransactionOrder } = useGetTransactionByOrderIdQuery(urlParams.orderCode || "");


    if (!urlParams.orderCode && !resCheckout) {
        return <Navigate to={CustomerPaths.home.Cart} />
    }
    else if (!resCheckout) {
        isUsingParams = true;
    }
    else {
        isUsingParams = false;
    }



    useEffect(() => {
        if (isUsingParams) {
            if (dataOrder && transactionOrder) {
                if (!isErrorOrder && !isErrorTransactionOrder) {
                    setResCheckoutCopy({
                        order: { ...dataOrder!, userId: "" },
                        transaction: transactionOrder!
                    });
                }
            }
        }
        else {
            // Update user order history of local when use just checkout
            if (user?.orderHistory.includes(resCheckout.order._id) === false) {
                dispatch(setUser({ ...user, orderHistory: [...user.orderHistory, resCheckout.order._id] }));
            }
            setResCheckoutCopy(resCheckout);
        }
    }, [dataOrder, transactionOrder]);


    useEffect(() => {
        if (resCheckoutCopy?.order && resCheckoutCopy?.transaction) {
            setIsLoading(false);
        }
        else if(isUsingParams === false) {
            setIsLoading(false);
        }
    }, [resCheckoutCopy]);



    return (
        <Grow in={checkedGrow} timeout={800}>
            {isLoading ? (
                <Box sx={{ m: 5, mt: 10 }} >
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                        <Skeleton animation="wave" variant="rectangular" height={100} sx={{ borderRadius: 3, width: { xs: "100%", lg: "50%" } }} />
                        <Skeleton animation="wave" variant="rectangular" height={400} sx={{ borderRadius: 3, width: { xs: "100%", lg: "50%" } }} />
                    </Grid>

                </Box>

            ) : (
                <Box
                    component={"div"}
                    sx={{
                        maxWidth: 800,
                        margin: "2rem auto",
                        padding: { xs: 2, md: 4 },
                        borderRadius: 2,
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            textAlign: "center",
                            marginBottom: 4,
                            background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
                            padding: 3,
                            borderRadius: 4,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
                        }}
                    >
                        {isUsingParams ? urlParams.cancel === false ? (
                            <CheckCircleIcon
                                sx={{
                                    fontSize: 64,
                                    color: "#4CAF50",
                                    filter: "drop-shadow(0 4px 6px rgba(76, 175, 80, 0.3))",
                                }}
                            />
                        ) : (
                            <ErrorIcon
                                sx={{
                                    fontSize: 64,
                                    color: "#f44336",
                                    filter: "drop-shadow(0 4px 6px rgba(244, 67, 54, 0.3))",
                                }}
                            />
                        ) : <CheckCircleIcon
                            sx={{
                                fontSize: 64,
                                color: "#4CAF50",
                                filter: "drop-shadow(0 4px 6px rgba(76, 175, 80, 0.3))",
                            }}
                        />
                        }


                        <Typography variant="h4" sx={{ fontWeight: 700, marginTop: 2, color: "#ffffff" }}>
                            {isUsingParams ? urlParams.cancel === true ? "Payment Failed" : "Thank you for your order" : "Thank you for your order"}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#b3b3b3", marginTop: 1 }}>
                            {isUsingParams ? urlParams.cancel === true ? "Your payment has been canceled" : <>The order invoice has been sent to <strong>{user!.email}</strong></> : <>The order invoice has been sent to <strong>{user!.email}</strong></> }
                        </Typography>
                    </Box>

                    <Card
                        component={"div"}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            backgroundColor: "#1E1E1E",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            transition: "all 0.3s ease"
                        }}
                    >
                        <CardContent sx={{ padding: { xs: 2, md: 4 } }}>
                            <Grid container spacing={3}>
                                {["Transaction Date", "Payment Method", "Shipping Method"].map((label, index) => (
                                    <Grid size={{ xs: 12, md: 4 }} key={label}>
                                        <Box
                                            sx={{
                                                padding: 2,
                                                backgroundColor: "rgba(255,255,255,0.05)",
                                                borderRadius: 2,
                                                height: "100%"
                                            }}
                                        >
                                            <Typography variant="caption" sx={{ color: "#878787", textTransform: "uppercase", letterSpacing: 1 }}>
                                                {label}
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500, marginTop: 1, color: "#ffffff" }}>
                                                {index === 0 && `${formatDate(new Date(resCheckoutCopy!.transaction.createdAt))}`}
                                                {index === 1 && `${resCheckoutCopy!.transaction.paymentType} (${resCheckoutCopy!.transaction.paymentType === PAYMENT_TYPE.COD ? "Cash on delivery" : "Online payment"})`}

                                                {index === 2 && "Standard delivery (3–14 business days)"}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 3, color: "#ffffff" }}>
                                    Your Order
                                </Typography>

                                {/* All cart item */}

                                {resCheckoutCopy!.order.items.map((item) => {
                                    return <MiniItem key={item.variant.id}
                                        productImage={item.product.images}
                                        productName={item.product.name}
                                        productPrice={item.variant.retailPrice}
                                        productQuantity={item.quantity}
                                        productVariant={item.variant.id}
                                    />
                                })}

                            </Box>

                            <Box sx={{ marginTop: 4, backgroundColor: "#252525", padding: 3, borderRadius: 2 }}>
                                {[
                                    { label: "Subtotal", value: `${convertToVietnameseDong(resCheckoutCopy!.order.totalPrice)}` },
                                    { label: "Discount", value: `${convertToVietnameseDong(resCheckoutCopy!.order.voucherDiscount || 0)}`, color: "#55efc4" },
                                    { label: "Loyal Point Discount", value: `${convertToVietnameseDong(resCheckoutCopy!.order.loyaltyPointsDiscount || 0)}`, color: "#55efc4" },
                                    { label: "Shipment cost", value: `${convertToVietnameseDong(resCheckoutCopy!.transaction.shippingFee)}`, color: "#ff7675" },
                                ].map((item) => (
                                    <Box
                                        key={item.label}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: 2,
                                            color: item.color || "#ffffff"
                                        }}
                                    >
                                        <Typography variant="body1">{item.label}</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.value}</Typography>
                                    </Box>
                                ))}

                                <Divider sx={{ marginY: 3, borderColor: "rgba(255,255,255,0.1)" }} />

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#ffffff" }}>
                                        Grand total
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#81ecec" }}>
                                        {convertToVietnameseDong(resCheckoutCopy!.transaction.paymentAmount +
                                            resCheckoutCopy!.transaction.shippingFee - (resCheckoutCopy!.order.voucherDiscount || 0) -
                                            (resCheckoutCopy!.order.loyaltyPointsDiscount || 0))}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    setCheckedGrow(false);
                                    setTimeout(() => {
                                        navigate(CustomerPaths.home.Category.All);
                                    }, 800);
                                }}
                                sx={{
                                    marginTop: 4,
                                    padding: "12px 24px",
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    boxShadow: "0 4px 12px rgba(0, 184, 148, 0.2)",
                                    '&:hover': {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 16px rgba(0, 184, 148, 0.3)",
                                    },
                                    transition: "all 0.3s ease"
                                }}
                                fullWidth
                            >
                                Continue Shopping
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Grow>

    );
};

export default TransactionDetailPage;