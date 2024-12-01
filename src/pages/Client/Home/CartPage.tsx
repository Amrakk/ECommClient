import  { useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Paper,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Checkbox,
    TextField,
    Alert,
    Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import RemoveIcon from "@mui/icons-material/Remove";
import { ColorPrimary } from "@/styles/ThemeColorClient";
import { FONT_SIZE } from "@/constants";
import { useDispatch } from "react-redux";
import { useGetCartByUser, useUpdateProductCart } from "@/hooks/Client/home/cart/useCart";
import { CartDetailWithProduct } from "@/apis/carts";
import { convertToVietnameseDong } from "@/utils/convertToVnd";
import { toast } from "react-toastify";
import { setLoading } from "@/stores/client/loadingSlice";
import DialogConfirm from "@/components/Client/DialogConfirm";
import useModal from "@/hooks/Shared/useModal";

const CartPage = () => {
    const dispatch = useDispatch();
    const { data: cart, isSuccess, isLoading, refetch } = useGetCartByUser();
    const updateCart = useUpdateProductCart();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [voucherCode, setVoucherCode] = useState("");
    const [isVoucherValid, setIsVoucherValid] = useState(true);
    const [localCart, setLocalCart] = useState<CartDetailWithProduct>();
    const { isShowing, toggle } = useModal();
    const [productIdAboutToDelete, setProductIdAboutToDelete] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<number>(0);


    useEffect(() => {
        if (isSuccess && cart) {
            setLocalCart(cart);
            console.log(localCart);
        }
    }, [isSuccess, cart]);

    const handleSelectItem = (itemId: string) => {
        setSelectedItems((prev) => {
            const newSelectedItems = prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId];
            return newSelectedItems;
        });
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedItems, localCart]);

    const handleChangeVariant = (productId: string, variantId: string) => {
        setLocalCart((prev) => {
            if (!prev) return prev;
            const newCart = { ...prev };
            const item = newCart.items.find((i) => i.product._id === productId);
            if (item) {
                item.variantId = variantId;
                updateCartCall();
            }
            return newCart;
        });
    };

    const calculateTotalPrice = () => {
        if (!localCart) return;
        let total = 0;
        localCart.items.forEach((item) => {
            if(selectedItems.includes(item.product._id)){
                total += item.quantity * item.product.variants.find((v) => v.id === item.variantId)?.retailPrice!;
            }
        });
        setTotalPrice(total);
    }


    const handleApplyVoucher = () => {
        setIsVoucherValid(voucherCode.length >= 3);
    };

    const updateCartCall = useCallback(async () => {
        if (!localCart) return;

        const cartItems = localCart.items.map((item) => ({
            quantity: item.quantity,
            variantId: item.variantId,
            productId: item.product._id
        }));

        const timer = setTimeout(async () => {
            try {
                dispatch(setLoading(true));
                await updateCart.mutateAsync({
                    cartId: localCart._id,
                    data: { items: cartItems }
                });
            } catch (err) {
                console.error(err);
                toast.error("Failed to update cart");
            } finally {
                dispatch(setLoading(false));
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [localCart, dispatch, updateCart]);
    const updateQuantity = (itemId: string, change: number) => {
        if (!localCart) return;

        setLocalCart(prev => {
            if (!prev) return prev;
            const newCart = { ...prev };
            const itemIndex = newCart.items.findIndex((i) => i.product._id === itemId);
            if (itemIndex !== -1) {
                if (change < 0 && newCart.items[itemIndex].quantity === 1) {
                    setProductIdAboutToDelete(itemId);
                    toggle();
                    return newCart;
                };
                newCart.items[itemIndex].quantity += change;
                updateCartCall();
            }
            return newCart;
        });
    };
    const deleteProductInCart = async (itemId: string) => {
        try {
            if (!localCart) return;
            dispatch(setLoading(true));

            const updatedItems = localCart.items
                .filter(i => i.product._id !== itemId)
                .map(item => ({
                    productId: item.product._id,
                    variantId: item.variantId,
                    quantity: item.quantity
                }));

            await updateCart.mutateAsync({
                cartId: localCart._id,
                data: { items: updatedItems }
            });

            setLocalCart(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    items: prev.items.filter(i => i.product._id !== itemId)
                };
            });
        } catch (error) {
            toast.error("Failed to remove product");
            console.error(error);
        } finally {
            dispatch(setLoading(false));
            toggle(); 
            setProductIdAboutToDelete('');
            refetch();
        }
    };

    const increaseQuantity = (itemId: string) => updateQuantity(itemId, 1);
    const decreaseQuantity = (itemId: string) => updateQuantity(itemId, -1);
    

    return (
        <Box sx={{ m: { xs: 1.5, md: 5 }, mt: { xs: 5, md: 10 } }}>
            <DialogConfirm content="Do you want to delete this product?" open={isShowing} onClose={function (): void {
                toggle();
            }} onConfirm={function (): void {
                deleteProductInCart(productIdAboutToDelete);
                toggle();
            }} title={"Alert"} />
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Your Shopping Cart
                    </Typography>
                </Box>

                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Alert
                        variant="outlined"
                        severity="info"
                        sx={{
                            border: `1px solid ${ColorPrimary(0.5)}`,
                            borderRadius: 3,
                            color: "#FF6B6B",
                            "& .MuiAlert-icon": {
                                color: ColorPrimary(1),
                            },
                            backgroundColor: ColorPrimary(0.1),
                        }}
                    >
                        <Typography variant="body2">
                            Tips: You can save on shipping by buying more items from the same category
                        </Typography>
                    </Alert>
                    <Button sx={{ display: { xs: 'none', md: 'block' } }} variant="text">Browse more &gt;</Button>
                </Box>

                {/* Grid Layout */}
                <Grid container spacing={2} mt={3}>
                    {isLoading ? (
                        <>
                            <Skeleton variant="rounded" sx={{ borderRadius: 3 }} animation={"wave"} width="30%" height={100} />
                            <Skeleton variant="rounded" sx={{ borderRadius: 3 }} animation={"wave"} width="50%" height={100} />
                            <Skeleton variant="rounded" sx={{ borderRadius: 3 }} animation={"wave"} width="10%" height={100} />
                        </>
                    ) : (
                        <>
                            {cart!.items.map((item) => (
                                <Grid
                                    container
                                    key={item.product._id}
                                    spacing={2}
                                    size={12}
                                    alignItems="center"
                                    sx={{
                                        borderBottom: "1px solid #e0e0e0",
                                        pb: 2,
                                        mb: 2,
                                    }}
                                >
                                    {/* Checkbox and Image */}
                                    <Grid size={{ lg: 0.5, md: 1, xs: 2 }}>
                                        <Checkbox
                                            checked={selectedItems.includes(item.product._id)}
                                            onChange={() => handleSelectItem(item.product._id)}
                                            color="primary"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 3, md: 1.5 }} >
                                        <Box
                                            component="img"
                                            src={item.product.images[0] ?? "https://placehold.co/400x400"}
                                            alt={item.product.name}
                                            sx={{
                                                width: {
                                                    xs: '90%',   // Full width on mobile
                                                    sm: '70%'     // 90% width on larger screens
                                                },
                                                aspectRatio: '1/1',
                                                objectFit: 'cover',
                                                borderRadius: 2,
                                                display: 'block',
                                                maxWidth: '100%',
                                                height: 'auto'
                                            }}
                                        />
                                    </Grid>

                                    {/* Product Details */}
                                    <Grid size={{ md: 3.5, xs: 7 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                            fontWeight="bold"
                                        >
                                            {item.product.name}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            Category: {item.product.category}
                                        </Typography>
                                        <Typography variant="caption" color="primary" display="block">
                                            Brand: {item.product.brand}
                                        </Typography>
                                    </Grid>

                                    {/* Variant Selector */}
                                    <Grid size={{ md: 2, xs: 4 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Variant</InputLabel>
                                            <Select value={item.variantId} onChange={(e) => handleChangeVariant(item.product._id, e.target.value)} label="Color">
                                                {item.product.variants.map((variant) => (
                                                    <MenuItem key={variant.id} value={variant.id}>
                                                        {variant.id}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Quantity */}
                                    <Grid size={{ xs: 4, md: 2 }}>
                                        <Box display="flex" alignItems="center">
                                            <IconButton onClick={() => decreaseQuantity(item.product._id)} size="small" color="primary">
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography variant="body1" mx={1}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton onClick={() => increaseQuantity(item.product._id)} size="small" color="primary">
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </Grid>

                                    {/* Price */}
                                    <Grid size={2}>
                                        <Typography sx={{ fontSize: { md: FONT_SIZE.h6, xs: FONT_SIZE.body2 }, fontWeight: 'medium' }} color="primary">
                                            {convertToVietnameseDong(item.product.variants.find((v) => v.id === item.variantId)?.retailPrice)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    )}
                </Grid>

                {/* Footer */}
                <Grid container spacing={3} mt={3} alignItems="center">
                    <Grid size={12} >
                        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
                            <Box sx={{ display: "flex", gap: 3 }} >
                                <TextField
                                    size="small"
                                    placeholder="Enter voucher code"
                                    value={voucherCode}
                                    onChange={(e) => setVoucherCode(e.target.value)}
                                    error={!isVoucherValid}
                                    helperText={!isVoucherValid ? "Invalid voucher code" : ""}
                                    sx={{
                                        width: 200,
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px",
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={handleApplyVoucher}
                                    disabled={!voucherCode}
                                >
                                    Apply
                                </Button>
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                                Total: <span style={{ color: ColorPrimary(1), fontSize: FONT_SIZE.h6, fontWeight: 'bold' }}>
                                    {convertToVietnameseDong(totalPrice)}</span>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 3, md: 6, xs: 12 }}>
                        <Button disabled={isLoading} variant="contained" color="primary" fullWidth>
                            Checkout
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CartPage;

