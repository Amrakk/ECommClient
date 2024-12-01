import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import { ColorPrimary } from "@/styles/ThemeColorClient";
import { PRODUCT_CATEGORY_LIST } from "@/constants";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ComputerIcon from "@mui/icons-material/Computer";
import { CustomerPaths } from "../Route/CustomerRoute";
import { Link } from "react-router-dom";
type Props = {
    sx?: SxProps<Theme>;
    category: string;
};

const CategoryComponent = (props: Props) => {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case PRODUCT_CATEGORY_LIST[0]: {
                return <HomeIcon sx={{ fontSize: 30 }} />;
            }
            case PRODUCT_CATEGORY_LIST[1]: {
                return <BookIcon sx={{ fontSize: 30 }} />;
            }
            case PRODUCT_CATEGORY_LIST[2]: {
                return <SportsSoccerIcon sx={{ fontSize: 30 }} />;
            }
            case PRODUCT_CATEGORY_LIST[3]: {
                return <ComputerIcon sx={{ fontSize: 30 }} />;
            }
        }
    };

    const getLinkCategory = (category: string) => {
        switch (category) {
            case PRODUCT_CATEGORY_LIST[0]: {
                return CustomerPaths.home.Category.Home;
            }
            case PRODUCT_CATEGORY_LIST[1]: {
                return CustomerPaths.home.Category.Books;
            }
            case PRODUCT_CATEGORY_LIST[2]: {
                return CustomerPaths.home.Category.Sports;
            }
            case PRODUCT_CATEGORY_LIST[3]: {
                return CustomerPaths.home.Category.Electronics;
            }
            default: {
                throw new Error("Category not found");
            }
        }
    };

    return (
        <Box component={Link} to={getLinkCategory(props.category)}>
            <Paper
                elevation={3}
                sx={{
                    width: {
                        xs: "100px",
                        sm: "110px",
                        md: "150px",
                    },
                    minHeight: {
                        xs: "auto",
                        sm: "auto",
                        md: "auto",
                    },
                    display: "flex",
                    padding: {
                        xs: 2,
                        sm: 1.5,
                        md: 2,
                    },
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        transform: "translateY(-3px)",
                        bgcolor: ColorPrimary(0.2), // More subtle blue
                        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    },
                    "&:active": {
                        transform: "translateY(-2px)",
                    },
                    gap: 2,
                    borderRadius: 2,
                    ...props.sx,
                }}
            >
                {getCategoryIcon(props.category)}
                <Typography variant="body2" fontWeight="medium">
                    {props.category.charAt(0).toUpperCase() + props.category.slice(1)}
                </Typography>
            </Paper>
        </Box>
    );
};
export default CategoryComponent;
