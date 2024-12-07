import { Box, CircularProgress, Pagination, Typography } from '@mui/material';
import useSearchQuery from "@/hooks/Client/home/useSearch";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import EmptySearchPNG from "@/assets/error/EmptySearch.png";
import { useLocation } from 'react-router-dom';
import ProductComponent from '@/components/Client/ProductCardComponent';
import { ProductDetail } from '@/models/product';

const SearchPage = () => {
    let { data: productResult, isError: isErrorResult, isLoading: isLoadingResult, refetch: refetchResult } = useSearchQuery();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [productDataCopy, setProductDataCopy] = useState<ProductDetail[]>([]);
    

    useEffect(() => {
        refetchResult();
    }, [location]);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setProductDataCopy(productResult!.data!.products.slice(10 * (currentPage - 1), 10 * currentPage));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
        return () => clearTimeout(timer);

    }, [currentPage]);


    useEffect(() => {
        if (!isLoadingResult && !isErrorResult && productResult) {
            setProductDataCopy(productResult!.data!.products.slice(0, 10));
        }
    }, [productResult, isErrorResult, isLoadingResult, location]);

    if (isLoadingResult && !productResult) {
        return (
            <Grid container sx={{
                height: '50vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CircularProgress />
            </Grid>
        );
    }
    if (productResult!.data!.products.length === 0) {
        return (
            <Grid container gap={5} sx={{ m: 10, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="img" src={EmptySearchPNG} alt="No search results found" sx={{ width: { lg: "25%", md: "50%", sm: "75%", xs: "100%" } }} />
                <Typography variant="h6" align="center">No search results found</Typography>
            </Grid>
        );
    }
    return (
        <Grid container gap={5} sx={{ m: { lg: 10, md: 6, sm: 3, xs: 2 }, display: 'flex', justifyContent: 'center' }}>
            {productDataCopy!.map((product) => (
                <Grid key={product._id} size={{ xs: 5, sm: 3.5, md: 3, lg: 2.5 }}>
                    <ProductComponent product={product} />
                </Grid>
            ))}

            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pagination
                    count={Math.ceil(productResult!.data!.totalDocuments / 10)}
                    color="primary" sx={{ alignSelf: 'center', justifySelf: 'center', mt: 5 }}
                    onChange={(_, page) => { setCurrentPage(page); }}
                    page={currentPage}
                />
            </Grid>
        </Grid>
    );
};

export default SearchPage;