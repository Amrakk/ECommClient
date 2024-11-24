import EditImagesModal from "@/components/Admin/Products/EditImagesModal";
import ProductDetails from "@/components/Admin/Products/ProductDetails";
import Variants from "@/components/Admin/Products/Variants";
import useProductById from "@/hooks/Admin/Products/useProductById";
import useModal from "@/hooks/Shared/useModal";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Details() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const productId = pathname.split("/").pop();

    if (!productId) {
        navigate("/admin/products");
        return null;
    }

    const { isShowing, toggle } = useModal();
    const product = useProductById(productId);

    if (product.error) {
        toast.error("Product not found", { toastId: "product-not-found" });
        navigate("/admin/products");
    }

    const productData = product.data?.product;
    if (!productData) return null;

    return (
        <>
            <EditImagesModal
                productId={productData._id}
                images={productData.images}
                isShowing={isShowing}
                hide={toggle}
                refetch={product.refetch}
            />
            <div className="p-6">
                <div>
                    <ProductDetails toggleImagesModal={toggle} product={productData} refetch={product.refetch} />
                </div>
                <div className="mt-6">
                    <Variants productId={productData._id} variants={productData.variants} refetch={product.refetch} />
                </div>
            </div>
        </>
    );
}
