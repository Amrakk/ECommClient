import { ProductDetail } from "@/models/product";
import { Box, Typography, Rating, Card, Divider, Button, IconButton, TextField, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BreadcrumbsComponent from "@/components/Client/BreadcrumbsComponent";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TabComponent from "@/components/Client/TabComponent";
import SliderComponent from "@/components/Client/SliderComponent";
import {  useProductDetailQuery } from "@/hooks/Client/home/product/useProduct";
import { toast } from "react-toastify";
import { convertToVietnameseDong } from "@/utils/convertToVnd";
import { addProductToNewCart, useGetCartByUser, useUpdateProductCart } from "@/hooks/Client/home/cart/useCart";
import { UpsertCart } from "@/apis/carts";
import { setLoading } from "@/stores/client/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/client/store";
import { UpdateByUser } from "@/apis/users";
import { useUpdateUserMutation } from "@/hooks/Client/home/useUser";
import ProductComponent from "@/components/Client/ProductCardComponent";

const ProductDetailComponent = () => {
    const [selectedVariant, setSelectedVariant] = useState("");
    const [quantity, setQuantity] = useState(1);
    const productDetailQuery = useProductDetailQuery();
    let isLoading = true;
    let product: ProductDetail | null = null;
    const addProductToNewCartMutate = addProductToNewCart();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const updateUserCart = useUpdateUserMutation();
    const addProductToOldCartMutate = useUpdateProductCart();
    const { data: currentCart } = useGetCartByUser();
    let listRelatedProduct: ProductDetail[] = [];


    useEffect(() => {
        if (productDetailQuery.isSuccess) {
            setSelectedVariant(product!.variants[0].id);
        }
    }, [productDetailQuery.data]);

    if (productDetailQuery.isError) {
        toast.error("Error while fetching product detail");
    }

    if (productDetailQuery.isSuccess) {
        isLoading = false;
        product = productDetailQuery.data.product;
        listRelatedProduct = productDetailQuery.data.relevantProducts;
    }

    const minQuantity = 1;
    const maxQuantity = isLoading
        ? 1
        : product!.variants.find((variant) => variant.id === selectedVariant)?.quantity || 1;

    function handleDecrement(_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, minQuantity));
    }

    function handleIncrement(_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, maxQuantity));
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setQuantity(Math.min(Math.max(value, minQuantity), maxQuantity));
        }
    }

    async function onClickProductToCart() {
        if (!user) {
            toast.error("Please login to add product to cart");
            return;
        }

        const productToCart: UpsertCart = {
            items: [
                {
                    productId: product!._id,
                    variantId: selectedVariant,
                    quantity: quantity,
                },
            ],
        };

        try {
            dispatch(setLoading(true));
            let response;
            if (user.cartId) {
                currentCart?.items.forEach((item) => {
                    // Check if product already exists in cart
                    if (
                        item.product._id === productToCart.items[0].productId &&
                        item.variantId === productToCart.items[0].variantId
                    ) {
                        productToCart.items[0].quantity += item.quantity;
                    } else {
                        productToCart.items = [
                            ...productToCart.items,
                            {
                                productId: item.product._id,
                                variantId: item.variantId,
                                quantity: item.quantity,
                            },
                        ];
                    }
                });
                response = await addProductToOldCartMutate.mutateAsync({ cartId: user.cartId, data: productToCart });
            } else {
                response = await addProductToNewCartMutate.mutateAsync(productToCart);
                const update: UpdateByUser = {
                    cartId: response._id,
                    addresses: user.addresses,
                    email: user.email,
                    name: user.name,
                    avatarUrl: user.avatarUrl,
                    phoneNumber: user.phoneNumber,
                };
                await updateUserCart.mutateAsync({ _id: user._id, data: update });
            }
            dispatch(setLoading(false));
            toast.success("Product added to cart successfully");
        } catch (error) {
            dispatch(setLoading(false));
            toast.error("Error while adding product to cart");
            console.error(error);
        }
    }

    return (
        <Box
            sx={{
                py: 4,
                margin: "auto",
                maxWidth: {
                    lg: 1200,
                    xs: 320,
                    sm: 500,
                    md: 900,
                },
            }}
        >
            {/* Top Section - Images, Variants, Price, Actions */}
            <Grid container spacing={4}>
                <Grid size={12}>
                    <BreadcrumbsComponent
                        customPath={[
                            product == undefined ? "" : product!.category,
                            product == undefined ? "" : product!.name,
                        ]}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    {isLoading ? (
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            sx={{ borderRadius: 2 }}
                            height={500}
                            width="100%"
                        />
                    ) : (
                        <>
                            <SliderComponent product={product!} />
                        </>
                    )}
                </Grid>

                {/* Right Side - Product Info & Actions */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h4" gutterBottom>
                        {isLoading ? <Skeleton animation="wave" width="80%" /> : product!.name}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        {isLoading ? (
                            <Skeleton animation="wave" width="30%" />
                        ) : (
                            <>
                                <Rating value={product!.ratings} readOnly precision={0.5} />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    ({product!.ratings})
                                </Typography>
                            </>
                        )}
                    </Box>

                    <Typography variant="h5" gutterBottom>
                        {isLoading ? (
                            <Skeleton animation="wave" width="50%" />
                        ) : (
                            convertToVietnameseDong(
                                product!.variants.find((variant) => variant.id === selectedVariant)?.retailPrice
                            )
                        )}
                    </Typography>

                    <Divider sx={{ opacity: 0.3 }} />

                    {/* Variants Selection */}
                    <Box sx={{ my: 3 }}>
                        {isLoading ? (
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                sx={{ borderRadius: 2 }}
                                height={100}
                                width="100%"
                            />
                        ) : (
                            <>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 500,
                                        mb: 2,
                                    }}
                                >
                                    Select Variant
                                </Typography>
                                <Grid container spacing={2}>
                                    {product!.variants.map((variant) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={variant.id}>
                                            <Card
                                                onClick={() => setSelectedVariant(variant.id)}
                                                sx={{
                                                    borderRadius: 2,
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    border: variant.id === selectedVariant ? "2px solid" : "1px solid",
                                                    borderColor:
                                                        variant.id === selectedVariant ? "primary.main" : "divider",
                                                    boxShadow: variant.id === selectedVariant ? 4 : 1,
                                                    "&:hover": {
                                                        boxShadow: 4,
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        height: 50,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: "medium",
                                                            textTransform: "none",
                                                        }}
                                                    >
                                                        {variant.id}
                                                        {/* {Object.entries(variant.details)
                                                            .filter(([key]) => key !== 'price')
                                                            .map(([, value]) => value)
                                                            .join(' - ')} */}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Box>
                    <Divider sx={{ opacity: 0.3 }} />
                    {/* Quantity Selection */}
                    <Box sx={{ my: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, mb: 4 }} id="quantity-label">
                            Quantity
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <IconButton
                                color="primary"
                                onClick={handleDecrement}
                                disabled={quantity <= minQuantity}
                                aria-label="Decrease quantity"
                            >
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                type="number"
                                variant="outlined"
                                value={quantity}
                                size="small"
                                onChange={handleInputChange}
                                inputProps={{
                                    min: minQuantity,
                                    max: maxQuantity,
                                    "aria-labelledby": "quantity-label",
                                }}
                                sx={{
                                    width: 70,
                                    "& input": {
                                        textAlign: "center",
                                        MozAppearance: "textfield",
                                        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                                            WebkitAppearance: "none",
                                            margin: 0,
                                        },
                                    },
                                }}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleIncrement}
                                disabled={quantity >= maxQuantity}
                                aria-label="Increase quantity"
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Action Buttons */}

                    <Box sx={{ display: "flex", gap: 2, my: 5 }}>
                        <Button
                            disabled={isLoading}
                            variant="contained"
                            size="large"
                            onClick={onClickProductToCart}
                            fullWidth
                            startIcon={<ShoppingCartIcon />}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ mt: 6, opacity: 0.5 }} />

            {/* Bottom Section - Description, Details, Tags */}
            {isLoading ? (
                <></>
            ) : (
                <>
                    <TabComponent product={product!} />
                </>
            )}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    {listRelatedProduct.length === 0 ? "" : "Related Products"}
                </Typography>
                {isLoading ? (
                    <Skeleton animation="wave" variant="rectangular" height={200} width="100%" />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                                height: 6,
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f1f1',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888',
                                borderRadius: 3,
                            },
                            mt:4
                        }}
                    >
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                flexWrap: 'nowrap',
                                pb: 2, // Add padding bottom to show scrollbar
                            }}
                        >
                            {listRelatedProduct.map((relatedProduct, index) => (
                                    <Grid
                                   size ={{ 
                                        xs: 7, 
                                        sm: 3.5, 
                                        md: 3, 
                                        lg: 2.7 
                                    }}
                                    minWidth={170}
                                    key={index}
                                >
                                    <ProductComponent product={relatedProduct}/>
                                </Grid>

                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProductDetailComponent;
