import { toast } from "react-toastify";
import Table from "@/components/Shared/Table";
import useProducts from "@/hooks/Admin/Products/useProducts";

export default function ProductTable() {
    const products = useProducts();

    if (products.error) toast.error("Invalid query parameters", { toastId: "product-table" });

    const data = products.data ?? { products: [], totalDocuments: 0 };

    const { products: productsData, totalDocuments } = data;

    const rows =
        productsData.map((product) => {
            const quantity = product.variants.reduce((acc, stock) => acc + stock.quantity, 0);

            const quantityElement = <div className="text-center">{quantity === 0 ? "―" : quantity}</div>;
            const ratingElement = <div className="text-center">{product.ratings === -1 ? "―" : product.ratings}</div>;

            return {
                _id: product._id,
                data: [product.name, product.category, product.brand, quantityElement, ratingElement],
            };
        }) ?? [];

    const columns = [
        <div className="text-left">Name</div>,
        <div className="text-left">Category</div>,
        <div className="text-left">Brand</div>,
        "Quantity",
        "Ratings",
    ];

    return (
        <>
            <Table
                columns={columns}
                rows={rows}
                total={totalDocuments}
                isLoading={products.isFetching}
                navigatePath="/admin/products"
            />
        </>
    );
}
