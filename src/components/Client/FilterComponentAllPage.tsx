import {
    Box,
    Slider,
    Rating,
    Select,
    MenuItem,
    Collapse,
    FormControl,
    Typography,
    Paper,
    IconButton,
    RadioGroup,
    Button,
    FormControlLabel,
    Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useRef, useState } from "react";
import { ProductDetail, ProductFilter } from "@/models/product";
import { PRODUCT_CATEGORY, PRODUCT_CATEGORY_LIST } from "@/constants";
import { useBrandsByCategory } from "@/hooks/Admin/Products/useBrands";
import { convertToVietnameseDong } from "@/utils/convertToVnd";
import { useDispatch } from "react-redux";
import { useFilterProductQuery } from "@/hooks/Client/home/product/useFilterProduct";
import { setLoading } from "@/stores/client/loadingSlice";

interface FiltersComponentAllPageProps {
    setProductsData: React.Dispatch<React.SetStateAction<ProductDetail[]>>;
    productsData: ProductDetail[];
    setIsLoading : React.Dispatch<React.SetStateAction<boolean>>
}

const FiltersComponentAllPage = (props: FiltersComponentAllPageProps) => {
    type Panel = "category" | "price" | "rating" | "itemsPerPage" | "brand";
    const [filter, setFilter] = useState<ProductFilter>({
        categories: [
            PRODUCT_CATEGORY.ELECTRONICS,
        ],
        brands: [],
        minRating: undefined,
        minPrice: 1,
        maxPrice: 100000000
    });
    const firstRender = useRef(true);
    const useFilterProduct = useFilterProductQuery(filter);
    const { data: listBrands,  isSuccess: isSuccessBrands } = useBrandsByCategory(filter.categories?.[0] || PRODUCT_CATEGORY.ELECTRONICS); ;
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState<Record<Panel, boolean>>({
        category: true,
        brand: true,
        price: true,
        rating: true,
        itemsPerPage: true,
    });

    useEffect(() => {
        if(useFilterProduct.isSuccess){
            props.setProductsData(useFilterProduct.data.products);
        }
    }, [useFilterProduct.data]);
  

    useEffect(() => {
        if(filter.minPrice === filter.maxPrice) {
            setFilter({
                ...filter,
                minPrice: 1,
                maxPrice: 100000000
            });
        }
        if (firstRender.current) {
            firstRender.current = false;
            return;
        } else {
            const delayDebounceFn = setTimeout(async ()  => {
                props.setIsLoading(true);
                dispatch(setLoading(true));
                await useFilterProduct.refetch(); 
                dispatch(setLoading(false));
                props.setIsLoading(false);
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
                                Category
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
                                    value={filter.categories?.[0] || ""}
                                    sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                                >
                                    {PRODUCT_CATEGORY_LIST.map((item, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                value={item}
                                                control={<Radio />}
                                                label={item.charAt(0).toUpperCase() + item.slice(1)}
                                                onChange={(_) => {
                                                    setFilter({
                                                        ...filter,
                                                        categories: [item],
                                                        brands: [],
                                                    });
                                                }}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </Box>
                        </Collapse>
                    </Box>
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
                            <IconButton onClick={() => handleExpandClick("brand")}>
                                {expanded.brand ? (
                                    <ExpandMoreIcon fontSize="small" />
                                ) : (
                                    <ExpandLessIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Box>

                        <Collapse in={expanded.brand}>
                            <Box sx={{ ml: 2 }}>
                                <RadioGroup
                                    name="brand"
                                    value={filter.brands?.[0] || ""}
                                    sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                                >
                                    { !isSuccessBrands ? <Typography> Loading... </Typography> : listBrands?.map((brand) => {
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
                                    defaultValue={[1, 100000000]}
                                    valueLabelDisplay="off"
                                    min={1}
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
                                    <Typography variant="body2">{convertToVietnameseDong(filter.minPrice)}</Typography>
                                    <Typography variant="body2">{convertToVietnameseDong(filter.maxPrice)}</Typography>
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
                                    precision={1}
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
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>

                                </Select>
                            </FormControl>
                        </Collapse>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setFilter({
                                    categories: [
                                        PRODUCT_CATEGORY.ELECTRONICS,
                                    ],
                                    brands: [],
                                    minRating: undefined,
                                    minPrice: 1,
                                    maxPrice: 100000000
                                });
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

export default FiltersComponentAllPage;
