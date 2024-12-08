import BreadcrumbsComponent from "@/components/Client/BreadcrumbsComponent";
import ProductComponent from "@/components/Client/ProductCardComponent";
import { IconButton, Typography, Pagination, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useEffect, useState } from "react";
import { ProductDetail } from "@/models/product";
import FiltersComponentAllPage from "@/components/Client/FilterComponentAllPage";
import EmptySearchPNG from "@/assets/error/EmptySearch.png";

const AllProductPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductsData] = useState<ProductDetail[]>([]);
    const [totalProductPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProduct, setTotalProduct] = useState(0);
    const [listProductPage, setListProductPage] = useState<ProductDetail[]>();



    useEffect(() => {
        setTotalProduct(productData.length);
        setListProductPage(productData.slice(0, totalProductPerPage));
        setCurrentPage(1);
    }, [productData])


    function handleChangePage(value: number): void {
        setCurrentPage(value);
        const startIndex = (value - 1) * totalProductPerPage;
        const endIndex = startIndex + totalProductPerPage;
        setListProductPage(productData.slice(startIndex, endIndex));
    }

    return (
        <Grid container spacing={2} sx={{ m: 5 }}>
            <Grid size={12} display="flex" justifyContent="space-between">
                <BreadcrumbsComponent customPath={["Category"]} />
                <IconButton sx={{ display: { md: "none" } }}>
                    <FilterAltRoundedIcon />
                </IconButton>
            </Grid>
            {/* First Column */}
            <Grid container spacing={2} size={3} sx={{ display: { md: "block", xs: "none" } }}>
                {/* Filter */}
                <Grid
                    size={12}
                    sx={{
                        position: "sticky",
                        top: 0,
                    }}
                >
                    <FiltersComponentAllPage
                        setProductsData={setProductsData}
                        productsData={productData}
                        setIsLoading={setIsLoading}
                    />
                </Grid>
            </Grid>
            {/* Second Column */}
            <Grid container spacing={2.5} size={{ lg: 9, md: 9, sm: 12 }} sx={{ display: "flex", pl: 2 }}>
                <Grid size={12} sx={{ height: "5%" }}>
                    <Typography>
                        Showing {listProductPage?.length} results in total {productData.length} results{" "}
                    </Typography>
                    {listProductPage?.length == 0 && listProductPage !== undefined && !isLoading ? <Typography>
                        <Grid container gap={5} sx={{ m: 10, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Box component="img" src={EmptySearchPNG} alt="No search results found" sx={{ width: { lg: "25%", md: "50%", sm: "75%", xs: "100%" } }} />
                            <Typography variant="h6" align="center">No product results found</Typography>
                        </Grid>
                    </Typography> : null}
                </Grid>
                {listProductPage == undefined || isLoading ? (
                    <>
                        <Grid size={{ lg: 3, md: 4, sm: 4, xs: 6 }}>
                            <ProductComponent isLoading={true} />
                        </Grid>
                        <Grid size={{ lg: 3, md: 4, sm: 4, xs: 6 }}>
                            <ProductComponent isLoading={true} />
                        </Grid>
                        <Grid size={{ lg: 3, md: 4, sm: 4, xs: 6 }}>
                            <ProductComponent isLoading={true} />
                        </Grid>
                        <Grid size={{ lg: 3, md: 4, sm: 4, xs: 6 }}>
                            <ProductComponent isLoading={true} />
                        </Grid>
                        <Grid size={{ lg: 3, md: 4, sm: 4, xs: 6 }}>
                            <ProductComponent isLoading={true} />
                        </Grid>
                    </>
                ) : (
                    listProductPage.map((item) => {
                        return (
                            <Grid key={item._id} size={{ lg: 3, md: 5, sm: 4, xs: 6 }}>
                                <ProductComponent product={item} isLoading={false} />
                            </Grid>
                        );
                    })
                )}
                <Grid size={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Pagination
                        count={Math.ceil(totalProduct / totalProductPerPage)}
                        page={currentPage}
                        onChange={(_, value) => handleChangePage(value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
export default AllProductPage