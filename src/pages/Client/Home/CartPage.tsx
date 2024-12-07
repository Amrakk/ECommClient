import { useCallback, useEffect, useState } from "react";
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
    Alert,
    Skeleton,
    Snackbar,
    Grow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import RemoveIcon from "@mui/icons-material/Remove";
import { ColorPrimary, ColorSecondaryBlackOverlay } from "@/styles/ThemeColorClient";
import { FONT_SIZE } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartByUser, useUpdateProductCart } from "@/hooks/Client/home/cart/useCart";
import { CartDetailWithProduct } from "@/apis/carts";
import { convertToVietnameseDong } from "@/utils/convertToVnd";
import { toast } from "react-toastify";
import { setLoading } from "@/stores/client/loadingSlice";
import DialogConfirm from "@/components/Client/DialogConfirm";
import useModal from "@/hooks/Shared/useModal";
import { useNavigate } from "react-router-dom";
import { CustomerPaths } from "@/components/Route/CustomerRoute";
import { RootState } from "@/stores/client/store";
import EmptyCartPNG from "@/assets/cart/CartEmpty.png";

const CartPage = () => {

    interface ProductOwn {
        productId: string;
        variantId: string;
    }


    const dispatch = useDispatch();
    const { data: cart, isSuccess, isLoading } = useGetCartByUser();
    const updateCart = useUpdateProductCart();
    const [selectedItems] = useState<ProductOwn[]>([]);
    const [localCart, setLocalCart] = useState<CartDetailWithProduct>();
    const { isShowing, toggle } = useModal();
    const [productIdAboutToDelete, setProductIdAboutToDelete] = useState<ProductOwn>({
        productId: "",
        variantId: "",
    });
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [checkedGrow, setCheckedGrow] = useState(true);

    const handleCheckout = () => {
        if (user?.addresses.length === 0) {
            setOpenSnackBar(true);
            return;
        }
        else {
            // const productWillCheckout =
            //     localCart?.items.filter((item) => selectedItems.some(i => i.productId === item.product._id && i.variantId === item.variantId));
            // if (productWillCheckout?.length === 0) {
            //     toast.error("Please select product to checkout");
            //     return;
            // }

            setCheckedGrow(false);

            setTimeout(() => {
                return navigate(CustomerPaths.home.Checkout, { state: { cart: localCart, totalPrice: totalPrice } });
            }, 800);

        }
    };


    useEffect(() => {
        if (isSuccess && cart) {
            setLocalCart(cart);
        }
    }, [isSuccess, cart]);

    // const handleSelectItem = (item: ProductOwn) => {
    //     setSelectedItems((prev) => {
    //         const isItemSelected = prev.some(i =>
    //             i.productId === item.productId && i.variantId === item.variantId
    //         );
    //         const newSelectedItems = isItemSelected
    //             ? prev.filter(i => !(i.productId === item.productId && i.variantId === item.variantId))
    //             : [...prev, item];
    //         return newSelectedItems;
    //     });
    // };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedItems, localCart]);

    const handleChangeVariant = (productId: string, variantIdCurrent: string, variantIdChange: string) => {
        setLocalCart((prev) => {
            if (!prev) return prev;
            const newCart = { ...prev };

            const item = newCart.items.find((i) => i.product._id === productId && i.variantId === variantIdCurrent);
            if (!item) return newCart;

            item.variantId = variantIdChange;

            // Check if there are many item same product id and variant after change, we will aggregate them into one and update quantity
            const sameItems = newCart.items.filter((i) => i.product._id === productId && i.variantId === variantIdChange);
            if (sameItems.length > 1) {
                const quantity = sameItems.reduce((acc, cur) => acc + cur.quantity, 0);
                sameItems.forEach((i) => {
                    const index = newCart.items.findIndex((item) => item.product._id === i.product._id && item.variantId === i.variantId);
                    newCart.items.splice(index, 1);
                });
                newCart.items.push({ ...sameItems[0], quantity });
            }

            updateCartCall();

            return newCart;
        });
    };

    const calculateTotalPrice = () => {
        if (!localCart) return;
        let total = 0;
        localCart.items.forEach((item) => {
            // if (selectedItems.some(i => i.productId === item.product._id && i.variantId === item.variantId)) {
            //     total += item.quantity * item.product.variants.find((v) => v.id === item.variantId)?.retailPrice!;
            // }
            total += item.quantity * item.product.variants.find((v) => v.id === item.variantId)?.retailPrice!;
        });
        setTotalPrice(total);
    }

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

    const updateQuantity = (itemId: string, change: number, variantId: string) => {
        if (!localCart) return;

        setLocalCart(prev => {
            if (!prev) return prev;
            const newCart = { ...prev };
            const itemIndex = newCart.items.findIndex((i) => i.product._id === itemId && i.variantId === variantId);
            if (itemIndex !== -1) {
                if (change < 0 && newCart.items[itemIndex].quantity === 1) {
                    setProductIdAboutToDelete({
                        productId: itemId,
                        variantId: variantId,
                    });
                    toggle();
                    return newCart;
                };
                newCart.items[itemIndex].quantity += change;
                updateCartCall();
            }
            return newCart;
        });
    };

    const deleteProductInCart = async (itemId: string, variantId: string) => {
        try {
            if (!localCart) return;
            dispatch(setLoading(true));
            const updatedItems = localCart.items
                .filter(i => !(i.product._id === itemId && i.variantId === variantId))
                .map(i =>
                ({
                    quantity: i.quantity,
                    variantId: i.variantId,
                    productId: i.product._id
                }));

            console.log(updatedItems);

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
            setProductIdAboutToDelete({
                productId: "",
                variantId: "",
            });
        }
    };

    const increaseQuantity = (itemId: string, variantId: string) => updateQuantity(itemId, 1, variantId);
    const decreaseQuantity = (itemId: string, variantId: string) => updateQuantity(itemId, -1, variantId);


    return (
        <Grow in={checkedGrow} timeout={800}>
            <Box sx={{ m: { xs: 1.5, md: 5 }, mt: { xs: 5, md: 10 } }}>
                <DialogConfirm content="Do you want to delete this product?" open={isShowing} onClose={function (): void {
                    toggle();
                }} onConfirm={function (): void {
                    deleteProductInCart(productIdAboutToDelete.productId, productIdAboutToDelete.variantId);
                }} title={"Alert"} />
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openSnackBar}
                    onClose={() => setOpenSnackBar(false)}
                    action={<Button onClick={() => navigate(CustomerPaths.home.User)} sx={{ color: ColorSecondaryBlackOverlay(1) }}>Add address</Button>}
                    autoHideDuration={3000}
                    message="Please add address before checkout"
                    key={"bottom" + "center"}
                />
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
                        <Button onClick={() => { navigate(CustomerPaths.home.Category.All) }} sx={{ display: { xs: 'none', md: 'block' } }} variant="text">Browse more &gt;</Button>
                    </Box>

                    {/* Grid Layout */}
                    <Grid container spacing={2} mt={3}>
                        {isLoading ? (
                            <>
                                <Skeleton variant="rounded" sx={{ borderRadius: 3 }} animation={"wave"} width="30%" height={100} />
                                <Skeleton variant="rounded" sx={{ borderRadius: 3 }} animation={"wave"} width="50%" height={100} />
                                <Skeleton variant="rounded" sx={{ borderRadius: 3 }} animation={"wave"} width="10%" height={100} />
                            </>
                        ) : cart != null ? cart.items.length == 0 ?
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
                                <Box component="img" src={EmptyCartPNG} alt="empty cart" sx={{ width: { lg: "30%", sm: "70%", md: "50%",  xs: "100%"}, height: 'auto', opacity: 0.5 }} />
                            </Box>
                         : (
                            <>
                                {cart!.items.map((item) => (
                                    <Grid
                                        container
                                        key={item.variantId}
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
                                            {/* <Checkbox
                                                checked={
                                                    selectedItems.some(selected =>
                                                        selected.productId === item.product._id &&
                                                        selected.variantId === item.variantId
                                                    )}
                                                onChange={() => handleSelectItem({
                                                    productId: item.product._id,
                                                    variantId: item.variantId,
                                                })}
                                                color="primary"
                                            /> */}
                                        </Grid>
                                        <Grid size={{ xs: 3, md: 1.5 }} >
                                            <Box
                                                component="img"
                                                onClick={() => navigate(`${CustomerPaths.home.Product.Detail}/${item.product._id}`)}
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
                                                <Select value={item.variantId} onChange={(e) => handleChangeVariant(item.product._id, item.variantId, e.target.value)} label="Variant">
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
                                                <IconButton onClick={() => decreaseQuantity(item.product._id, item.variantId)} size="small" color="primary">
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography variant="body1" mx={1}>
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton onClick={() => increaseQuantity(item.product._id, item.variantId)} size="small" color="primary">
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
                        )
                            : <Typography variant="body1">No items in cart, let's go shopping!</Typography>
                        }
                    </Grid>

                    {/* Footer */}
                    <Grid container spacing={3} mt={3} alignItems="center">
                        <Grid size={12} >
                            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="textSecondary">
                                    Total: <span style={{ color: ColorPrimary(1), fontSize: FONT_SIZE.h6, fontWeight: 'bold' }}>
                                        {convertToVietnameseDong(totalPrice)}</span>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
                            <Button
                                disabled={isLoading || localCart?.items.length === 0}
                                onClick={handleCheckout}
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Checkout
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Grow>

    );
};

export default CartPage;

