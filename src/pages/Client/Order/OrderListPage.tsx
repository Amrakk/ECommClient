import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Collapse,
    Typography,
    Box,
    Grow,
    Skeleton,
    Chip,
    TablePagination,
    Card,
    Divider,
    Stack,
    Button,
} from '@mui/material';
import { ContactPhone, KeyboardArrowDown, KeyboardArrowUp, LocationOn, Payment, ShoppingBasket } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/client/store';
import useOrderById from '@/hooks/Admin/Orders/useOrderById';
import { formatDate } from '@/utils/convertDate';
import { ORDER_STATUS } from '@/constants';
import { IAddress } from '@/models/user';
import { convertToVietnameseDong } from '@/utils/convertToVnd';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ProductReviewModalComponent from '@/components/Client/ModalInsertReviewCompomemt';
import { useInsertProductRatingMutation } from '@/hooks/Client/home/product/useProductRating';
import { toast } from 'react-toastify';
import { setLoading } from '@/stores/client/loadingSlice';



function formatAddress(address: IAddress) {
    return `${address.street}, ${address.ward.name}, ${address.district.name}, ${address.province.name}, ${address.province.id}, Vietnam`
}



function Row({ orderId, index }: { orderId: number, index: number }) {
    const insertProductRatingMutation = useInsertProductRatingMutation();
    const [open, setOpen] = useState(false);
    const { data: order, isSuccess: isSuccessListOrder } = useOrderById(String(orderId));
    const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
    const dispatch = useDispatch();

    const handleSubmitReview = (rating: number, review: string, productId: string) => {
        dispatch(setLoading(true));

        insertProductRatingMutation.mutateAsync({
            userId: String(order?.user?._id),
            productId: productId,
            rating: rating,
            review: review,
            orderId: String(orderId)
        }).then((response) => {
            console.log(response);
            toast.success("Review submitted successfully");
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to submit review");
        }).finally(() => {
            dispatch(setLoading(false));
        })
    }

    const ChipSelected = ({ status }: { status: ORDER_STATUS }) => {
        switch (status) {
            case ORDER_STATUS.COMPLETED:
                return <Chip label={status} color="primary" />;
            case ORDER_STATUS.DELIVERED:
                return <Chip label={status} color="success" />;
            case ORDER_STATUS.PENDING:
                return <Chip label={status} color="warning" />;
            case ORDER_STATUS.CANCELLED:
                return <Chip label={status} color="error" />;
            default:
                return <Chip label={status} color="info" />;
        }
    }

    return (
        <>
            {!isSuccessListOrder ? (
                <>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            <Skeleton animation={'wave'} variant="text" width={100} />
                        </TableCell>
                        <TableCell>
                            <Skeleton animation={'wave'} variant="text" width={50} />
                        </TableCell>
                        <TableCell>
                            <Skeleton animation={'wave'} variant="text" width={50} />
                        </TableCell>
                        <TableCell>
                            <Skeleton animation={'wave'} variant="text" width={50} />
                        </TableCell>
                        <TableCell>
                            <Skeleton animation={'wave'} variant="text" width={50} />
                        </TableCell>
                        <TableCell>
                            <Skeleton animation={'wave'} variant="text" width={50} />
                        </TableCell>
                    </TableRow>
                </>
            ) : (
                <>
                    <TableRow onClick={() => setOpen(!open)}
                        sx={{
                            cursor: 'pointer',
                            backgroundColor: (theme) =>
                                index % 2 === 0
                                    ? theme.palette.action.hover
                                    : 'inherit',
                            '&:hover': {
                                backgroundColor: (theme) =>
                                    `${theme.palette.action.selected} !important`,
                            },
                        }} >
                        <TableCell>
                            <IconButton size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                        </TableCell>
                        <TableCell>{order!._id}</TableCell>
                        <TableCell>{formatDate(new Date(order!.createdAt))}</TableCell>
                        <TableCell>{order!.items.length}</TableCell>
                        <TableCell>{convertToVietnameseDong(order!.totalPrice + (order!.transaction!.shippingFee ?? 0) - (order!.voucherDiscount ?? 0))}</TableCell>
                        <TableCell>
                            {ChipSelected({ status: order!.status })}
                        </TableCell>
                        <TableCell>
                            <Chip label={order!.isPaid == true ? "Paid" : "Unpaid"} color={order!.isPaid == true ? "success" : "default"} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={2}>
                                    <Card
                                        elevation={3}
                                        sx={{
                                            p: 3,
                                            mb: 2,
                                            borderRadius: 2,
                                            transition: '0.3s',
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                borderBottom: '2px solid #1976d2',
                                                pb: 1,
                                                mb: 2,
                                                color: 'primary.main'
                                            }}
                                        >
                                            <ShoppingBasket sx={{ mr: 1, verticalAlign: 'middle' }} />
                                            Order Details
                                        </Typography>

                                        <Grid container spacing={2}>
                                            <Grid size={12} >
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: 2,
                                                        bgcolor: 'background.default',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <LocationOn color="primary" sx={{ mr: 2 }} />
                                                    <Box>
                                                        <Typography variant="subtitle2" color="text.secondary">
                                                            Shipping Address
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {formatAddress(order!.shippingAddress)}
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: 2,
                                                        bgcolor: 'background.default',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <ContactPhone color="primary" sx={{ mr: 2 }} />
                                                    <Box>
                                                        <Typography variant="subtitle2" color="text.secondary">
                                                            Contact Information
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {order!.shippingAddress.contactInfo ?? "Not provided"}
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }} >
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: 2,
                                                        bgcolor: 'background.default',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Payment color="primary" sx={{ mr: 2 }} />
                                                    <Box>
                                                        <Typography variant="subtitle2" color="text.secondary">
                                                            Payment Method
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {order!.transaction?.paymentType ?? "Not specified"}
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                    <Stack spacing={2}>
                                        {/* Order Items */}
                                        {order?.items.map((item, index) => (
                                                <Card key={index} elevation={3} sx={{ p: 2 }}>
                                                    <Grid container spacing={2} alignItems="center">
                                                        <Grid size={{ xs: 12, sm: 6 }}>
                                                            <Box display="flex" alignItems="center">
                                                                <img
                                                                    src={item.product.images[0] ?? "https://placehold.co/200x200"}
                                                                    alt={item.product.name}
                                                                    style={{ width: 50, height: 50, marginRight: 10, borderRadius: 3 }}
                                                                />
                                                                <Box>
                                                                    <Typography variant="subtitle1">
                                                                        {item.product.name.length > 25 ? `${item.product.name.substring(0, 25)}...` : item.product.name}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        Variant ID: {item.variant.id}
                                                                    </Typography>
                                                                </Box>
                                                                <Box display="flex" ml={3} >
                                                                    {order!.status === ORDER_STATUS.COMPLETED && order!.isPaid === true ? (
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setIsOpenReviewModal(!isOpenReviewModal);
                                                                            }}
                                                                            sx={{ textTransform: 'none' }}
                                                                            startIcon={<RateReviewIcon />}
                                                                        >
                                                                            Write a Review
                                                                        </Button>
                                                                    ) : null
                                                                    }
                                                                    <ProductReviewModalComponent
                                                                        open={isOpenReviewModal}
                                                                        onClose={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            setIsOpenReviewModal(!isOpenReviewModal)
                                                                        }}
                                                                        onSubmit={handleSubmitReview}
                                                                        productId={item.product._id}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 6 }}>
                                                            <Grid container spacing={2}>
                                                                <Grid size={4}>
                                                                    <Typography variant="body2" color="text.secondary">Quantity</Typography>
                                                                    <Typography>{item.quantity}</Typography>
                                                                </Grid>
                                                                <Grid size={4}>
                                                                    <Typography variant="body2" color="text.secondary">Price</Typography>
                                                                    <Typography>{convertToVietnameseDong(item.variant.retailPrice)}</Typography>
                                                                </Grid>
                                                                <Grid size={4}>
                                                                    <Typography variant="body2" color="text.secondary">Total</Typography>
                                                                    <Typography>{convertToVietnameseDong(item.variant.retailPrice * item.quantity)}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Card>


                                        ))}

                                        {/* Order Summary */}
                                        <Card elevation={3} sx={{ p: 2, mt: 2 }}>
                                            <Stack spacing={2}>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="subtitle2">Subtotal</Typography>
                                                    <Typography>{convertToVietnameseDong(order!.totalPrice)}</Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="subtitle2">Discount</Typography>
                                                    <Typography color="error.main">
                                                        -{convertToVietnameseDong(order!.voucherDiscount ?? 0)}
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="subtitle2">Shipment Cost</Typography>
                                                    <Typography>{convertToVietnameseDong(order!.transaction!.shippingFee ?? 0)}</Typography>
                                                </Box>
                                                <Divider sx={{ opacity: 0.3 }} />
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="h6">Grand Total</Typography>
                                                    <Typography variant="h6">
                                                        {convertToVietnameseDong(order!.totalPrice + (order!.transaction!.shippingFee ?? 0) - (order!.voucherDiscount ?? 0))}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Card>
                                    </Stack>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </>
            )}

        </>
    );
}

export default function OrderListPage() {
    const user = useSelector((state: RootState) => state.user);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [listOrderIds, setListOrderIds] = useState<number[]>([]);

    useEffect(() => {
        setListOrderIds(user?.orderHistory?.slice().reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [])
    }, [rowsPerPage, page])


    return (
        <Grow in timeout={700}>
            <TableContainer component={Paper} sx={{ borderRadius: 3, maxHeight: 600, height: 600 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Payment Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listOrderIds.map((orderId, index) => (<Row key={orderId} index={index} orderId={orderId} />))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 35]}
                    component="div"
                    size='small'
                    count={user?.orderHistory.length ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, page) => {
                        setPage(page);
                    }}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                />

            </TableContainer>
        </Grow>
    );
}