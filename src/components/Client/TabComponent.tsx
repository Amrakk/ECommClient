import { ProductDetail } from "@/models/product";
import { Box, Tabs, Tab, Fade, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import ReviewCard from "./Product/ReviewGeneralComponent";
import UserReviewCard from "./Product/UserReview";
import { useProductRatingByIdQuery } from "@/hooks/Client/home/product/useProduct";
import { IResGetProductRatingByProductId } from "@/apis/productRatings";

interface TabProps {
    product: ProductDetail;
}

const TabComponent = ({ product }: TabProps) => {
    const productRatingQuery = useProductRatingByIdQuery();
    const [value, setValue] = useState(0);
    let [isLoadingFetchRating, setIsLoadingFetchRating] = useState(true);
    const [productRatingsResult, setProductRatingsResult] = useState<IResGetProductRatingByProductId[]>([]);

    useEffect(() => {
        if (productRatingQuery.isSuccess) {
            setProductRatingsResult(productRatingQuery.data.productRatings);
            setIsLoadingFetchRating(false);
        }
    }, [productRatingQuery.data]);

    return (
        <Box sx={{ mt: 6 }}>
            <Tabs
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                    if (newValue === 2) {
                        productRatingQuery.refetch();
                    }
                }}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="Description" />
                <Tab label="Details" />
                <Tab label="Reviews" />
            </Tabs>
            <Box sx={{ position: "relative", minHeight: 200 }}>
                {value === 0 && (
                    <Fade in={value === 0}>
                        <Box p={3}>
                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>
                        </Box>
                    </Fade>
                )}
                {value === 1 && (
                    <Fade in={value === 1}>
                        <Box p={3}>
                            <Table>
                                <TableBody>
                                    {Object.entries(product.details).map(([key, val]) => (
                                        <TableRow key={key}>
                                            <TableCell sx={{ width: "30%", border: "none" }}>
                                                <Typography variant="subtitle2">{key}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ border: "none" }}>{val}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Fade>
                )}
                {value === 2 && (
                    <Grid container spacing={2} sx={{ my: 10 }}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            {isLoadingFetchRating ? (
                                <ReviewCard />
                            ) : productRatingsResult.length === 0 ? (
                                <Typography variant="h6"></Typography>
                            ) : (
                                <ReviewCard totalResult={productRatingsResult} />
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {isLoadingFetchRating ? (
                                <UserReviewCard />
                            ) : productRatingsResult.length === 0 ? (
                                <Typography variant="body1">Be the first to review this product</Typography>
                            ) : (
                                productRatingsResult.map((review) => (
                                    <UserReviewCard key={review._id} review={review} />
                                ))
                            )}
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    );
};
export default TabComponent;
