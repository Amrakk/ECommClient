import {
    Box,
    Slider,
    Rating,
    Select,
    MenuItem,
    Collapse,
    FormControl,
    FormControlLabel,
    Typography,
    Paper,
    IconButton,
    Radio,
    RadioGroup,
    Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useRef, useState } from "react";
import { ProductDetail, ProductFilter } from "@/models/product";
import { PRODUCT_CATEGORY } from "@/constants";
import { useBrandsByCategory } from "@/hooks/Admin/Products/useBrands";
import { convertToVietnameseDong } from "@/utils/convertToVnd";
import { ProductAPI } from "@/apis/client/home/product/api";
import { useDispatch } from "react-redux";
import { setLoading } from "@/stores/client/loadingSlice";
import { useProductByCategoryMutation } from "@/hooks/Client/home/product/useProduct";

interface FiltersComponentProps {
    setProductsData: React.Dispatch<React.SetStateAction<ProductDetail[]>>;
    category: PRODUCT_CATEGORY;
    productsData: ProductDetail[];
}

const FiltersComponent = (props: FiltersComponentProps) => {
    type Panel = "category" | "price" | "rating" | "itemsPerPage";
    const listBrand = useBrandsByCategory(props.category).data;
    const [filter, setFilter] = useState<ProductFilter>({});
    const useProductByCategory = useProductByCategoryMutation();
    const dispatch = useDispatch();
    const firstRender = useRef(true);

    const [expanded, setExpanded] = useState<Record<Panel, boolean>>({
        category: true,
        price: true,
        rating: true,
        itemsPerPage: true,
    });

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        } else {
            const delayDebounceFn = setTimeout(() => {
                dispatch(setLoading(true));
                useProductByCategory.mutateAsync(props.category).then((data) => {
                    const filteredProducts = ProductAPI.filterProducts(data, filter);
                    props.setProductsData(filteredProducts);
                    dispatch(setLoading(false));
                });
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [filter]);

    const handleExpandClick = (panel: Panel) => {
        setExpanded({
            ...expanded,
            [panel]: !expanded[panel],
        });
    };

    return (
        <>
            <Paper
                elevation={1}
                sx={{
                    bgcolor: "#051413",
                    borderRadius: 4,
                    maxWidth: 300,
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 5,
                        boxShadow: 1,
                    }}
                >
                    {/* Categories Section */}
                    <Box sx={{ mb: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                                cursor: "pointer",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                                Brands
                            </Typography>
                            <IconButton onClick={() => handleExpandClick("category")}>
                                {expanded.category ? (
                                    <ExpandMoreIcon fontSize="small" />
                                ) : (
                                    <ExpandLessIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Box>

                        <Collapse in={expanded.category}>
                            <Box sx={{ ml: 2 }}>
                                <RadioGroup
                                    name="brand"
                                    value={filter.brands?.[0] || ""}
                                    sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                                >
                                    {listBrand?.map((brand) => {
                                        return (
                                            <FormControlLabel
                                                key={brand}
                                                value={brand}
                                                control={<Radio />}
                                                label={brand}
                                                onChange={(e) => {
                                                    setFilter({
                                                        ...filter,
                                                        brands: [(e.target as HTMLInputElement).value],
                                                    });
                                                }}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </Box>
                        </Collapse>
                    </Box>

                    {/* Price Range */}
                    <Box sx={{ mb: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                                cursor: "pointer",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                                Price Range
                            </Typography>
                            <IconButton onClick={() => handleExpandClick("price")}>
                                {expanded.price ? (
                                    <ExpandMoreIcon fontSize="small" />
                                ) : (
                                    <ExpandLessIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Box>

                        <Collapse in={expanded.price}>
                            <Box sx={{ px: 2, mt: 2 }}>
                                <Slider
                                    defaultValue={[0, 100000000]}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    value={[filter.minPrice || 0, filter.maxPrice || 100000000]}
                                    valueLabelFormat={(value) => convertToVietnameseDong(value as number)}
                                    max={100000000}
                                    onChange={(_, value: any) =>
                                        setFilter({ ...filter, minPrice: value[0], maxPrice: value[1] })
                                    }
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: 1,
                                    }}
                                >
                                    <Typography variant="body2">0đ</Typography>
                                    <Typography variant="body2">100,000,000đ</Typography>
                                </Box>
                            </Box>
                        </Collapse>
                    </Box>

                    {/* Rating */}
                    <Box sx={{ mb: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                                cursor: "pointer",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                                Rating
                            </Typography>
                            <IconButton onClick={() => handleExpandClick("rating")}>
                                {expanded.rating ? (
                                    <ExpandMoreIcon fontSize="small" />
                                ) : (
                                    <ExpandLessIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Box>

                        <Collapse in={expanded.rating}>
                            <Box sx={{ px: 2 }}>
                                <Rating
                                    defaultValue={0}
                                    value={filter.minRating ?? 0}
                                    precision={0.5}
                                    size="large"
                                    onChange={(_, value) => setFilter({ ...filter, minRating: value ?? undefined })}
                                />
                            </Box>
                        </Collapse>
                    </Box>

                    {/* Items per Page */}
                    <Box sx={{ mb: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                                cursor: "pointer",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                                Items per Page
                            </Typography>
                            <IconButton onClick={() => handleExpandClick("itemsPerPage")}>
                                {expanded.itemsPerPage ? (
                                    <ExpandMoreIcon fontSize="small" />
                                ) : (
                                    <ExpandLessIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Box>

                        <Collapse in={expanded.itemsPerPage}>
                            <FormControl fullWidth size="small" disabled sx={{ borderRadius: 3 }}>
                                <Select defaultValue={10} sx={{ borderRadius: 3 }}>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                        </Collapse>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setFilter({});
                            }}
                            color="primary"
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default FiltersComponent;
