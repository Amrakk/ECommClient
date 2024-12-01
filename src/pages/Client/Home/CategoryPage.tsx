import Grid from "@mui/material/Grid2";
import BreadcrumbsComponent from "@/components/Client/BreadcrumbsComponent";
import FiltersComponent from "@/components/Client/FiltersComponent";
import { IconButton, Pagination, Typography } from "@mui/material";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useProductByCategoryMutation } from "@/hooks/Client/home/product/useProduct";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ProductComponent from "@/components/Client/ProductCardComponent";
import { ProductDetail } from "@/models/product";
import { setLoading } from "@/stores/client/loadingSlice";

const CategoryPage = (props: any) => {
    const useProductByCategory = useProductByCategoryMutation();
    const [isLoading, setIsLoading] = useState(true);
    const [dataProduct, setDataProduct] = useState<ProductDetail[]>([]);
    const [dataProductPage, setDataProductPage] = useState<ProductDetail[]>([]);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const totalProductPerPage = 10;

    useEffect(() => {
        useProductByCategory
            .mutateAsync(props.category)
            .then((data) => {
                setDataProduct(data);
                setDataProductPage(data.slice(0, totalProductPerPage));
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    }, []);

    useEffect(() => {
        setDataProductPage(dataProduct.slice(0, totalProductPerPage));
    }, [dataProduct]);

    const handleChangePage = (value: number) => {
        dispatch(setLoading(true));
        setTimeout(() => {
            setPage(value);
            const start = (value - 1) * totalProductPerPage;
            const end = value * totalProductPerPage;
            setDataProductPage(dataProduct.slice(start, end));
            dispatch(setLoading(false));
        }, 500);
    };

    return (
        <Grid container spacing={2} sx={{ m: 5 }}>
            <Grid size={12} display="flex" justifyContent="space-between">
                <BreadcrumbsComponent customPath={[props.category]} />
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
                    <FiltersComponent
                        setProductsData={setDataProduct}
                        category={props.category}
                        productsData={dataProduct}
                    />
                </Grid>
            </Grid>
            {/* Second Column */}
            <Grid container spacing={2.5} size={{ lg: 9, md: 9, sm: 12 }} sx={{ display: "flex", pl: 2 }}>
                <Grid size={12} sx={{ height: "5%" }}>
                    {" "}
                    <Typography>
                        {" "}
                        Showing {totalProductPerPage} results in total {dataProduct.length} results{" "}
                    </Typography>{" "}
                </Grid>
                {isLoading ? (
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
                    dataProductPage.map((product) => {
                        return (
                            <Grid size={{ lg: 3, md: 5, sm: 4, xs: 6 }}>
                                <ProductComponent product={product} isLoading={false} />
                            </Grid>
                        );
                    })
                )}
                {dataProduct.length > totalProductPerPage && (
                    <Grid size={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Pagination
                            count={Math.ceil(dataProduct.length / totalProductPerPage)}
                            page={page}
                            onChange={(_, value) => handleChangePage(value)}
                        />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};
export default CategoryPage;
