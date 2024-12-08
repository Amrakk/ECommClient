import { CardContent, CardMedia, Typography, Box, IconButton, Card, Skeleton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FONT_SIZE } from "@/constants";
import { ProductDetail } from "@/models/product";
import { convertToVietnameseDong } from "@/utils/convertToVnd";
import { Link } from "react-router-dom";
import { IRelevantProduct } from "@/apis/products";

interface ProductComponentProps {
    product?: ProductDetail ;
    relevantProducts?: IRelevantProduct;
    isLoading?: boolean;
}

const ProductComponent = (props: ProductComponentProps) => {


    return (
        <Link
            to={props.isLoading ? "#" : `/product/${props.product != undefined ? props.product._id : props.relevantProducts?._id}`} 
            style={{ textDecoration: "none", pointerEvents: props.isLoading ? "none" : "auto" }}
        >
            <Card sx={{ minWidth: 100 }}>
                {props.isLoading ? (
                    <Skeleton animation="wave" variant="rectangular" sx={{ height: { xs: 100, sm: 150, md: 200 } }} />
                ) : (
                    <CardMedia
                        component="img"
                        image={props.product?.images[0] ?? "https://placehold.co/220x550"}
                        alt="Product Image"
                        sx={{
                            height: { xs: 100, sm: 150, md: 200 },
                            width: "100%",
                            objectFit: "cover",
                        }}
                    />
                )}
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{
                            fontSize: {
                                xs: FONT_SIZE.superSmall,
                                md: FONT_SIZE.body1,
                            },
                        }}
                    >
                        {props.isLoading ? (
                            <Skeleton animation="wave" width="60%" />
                        ) : (
                            props.product != undefined ? props.product.brand : ""
                        )}
                    </Typography>
                    <Typography
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitLineClamp: { xs: 2, sm: 3 },
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            fontSize: {
                                xs: FONT_SIZE.body2,
                                md: FONT_SIZE.h6,
                            },
                        }}
                    >
                        {props.isLoading ? (
                            <Skeleton animation="wave" width="80%" />
                        ) : (
                            props.product != undefined ? props.product.name : props.relevantProducts?.name ?? ""
                        )}
                    </Typography>
                    <Typography
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            fontSize: {
                                xs: FONT_SIZE.small,
                                md: FONT_SIZE.body2,
                            },
                        }}
                    >
                        {props.isLoading ? (
                            <>
                                <Skeleton animation="wave" width="90%" />
                                <Skeleton animation="wave" width="80%" />
                            </>
                        ) : (
                            props.product != undefined ? props.product.description : ""
                        )}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: { md: 3, xs: 1 },
                        }}
                    >
                        {props.isLoading ? (
                            <Skeleton animation="wave" width="40%" />
                        ) : (
                            <Typography
                                color="primary"
                                sx={{
                                    fontWeight: "medium",
                                    fontSize: { xs: FONT_SIZE.body2, sm: FONT_SIZE.body1, md: FONT_SIZE.h6 },
                                }}
                            >
                                {convertToVietnameseDong(props.product != undefined ? props.product!.variants[0].retailPrice : props.relevantProducts?.retailPrice ?? 0)}
                            </Typography>
                        )}
                        <IconButton color="primary" disabled={props.isLoading}>
                            <ShoppingCartIcon sx={{ fontSize: { xs: FONT_SIZE.h6, md: FONT_SIZE.h4 } }} />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductComponent;
