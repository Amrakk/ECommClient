import ItemTable from "@/components/Admin/Orders/ItemTable";
import OrderDetails from "@/components/Admin/Orders/OrderDetails";
import TransactionDetails from "@/components/Admin/Orders/TransactionDetails";
import useOrderById from "@/hooks/Admin/Orders/useOrderById";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Details() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const orderId = pathname.split("/").pop();

    if (!orderId) {
        navigate("/admin/orders");
        return null;
    }

    const order = useOrderById(orderId);

    if (order.error) {
        toast.error("Order not found", { toastId: "order-not-found" });
        navigate("/admin/orders");
    }

    const orderData = order.data;
    if (!orderData) return null;

    let discount = (orderData.loyaltyPointsDiscount ?? 0) * 1000 + (orderData.voucherDiscount ?? 0);
    if (discount > orderData.totalPrice) discount = orderData.totalPrice;

    const costs = {
        subTotal: orderData.totalPrice,
        discount: discount,
        shippingFee: orderData.transaction?.shippingFee ?? 0,
        total: (orderData.transaction?.paymentAmount ?? 0) + (orderData.transaction?.shippingFee ?? 0),
    };

    return (
        <>
            <div className="p-6">
                <div className="grid grid-cols-7 gap-6">
                    <div className="col-span-5">
                        <OrderDetails order={orderData} refetch={order.refetch} />
                    </div>
                    <div className="col-span-2">
                        <TransactionDetails
                            orderId={orderData._id}
                            transaction={orderData.transaction}
                            refetch={order.refetch}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <ItemTable items={orderData.items} costs={costs} refetch={order.refetch} />
                </div>
            </div>
        </>
    );
}
