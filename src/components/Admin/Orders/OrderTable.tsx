import { toast } from "react-toastify";
import Table from "@/components/Shared/Table";
import { ORDER_STATUS_STYLES } from "@/constants";
import useOrders from "@/hooks/Admin/Orders/useOrders";

export default function ProductTable() {
    const orders = useOrders();

    if (orders.error) toast.error("Invalid query parameters", { toastId: "order-table" });

    const data = orders.data ?? { orders: [], totalDocuments: 0 };

    const { orders: ordersData, totalDocuments } = data;

    const rows =
        ordersData.map((order) => {
            const statusElement = (
                <div className="text-center">
                    {order.status in ORDER_STATUS_STYLES && (
                        <span
                            className={`${ORDER_STATUS_STYLES[order.status].bg} ${
                                ORDER_STATUS_STYLES[order.status].text
                            } text-xs font-medium me-2 px-2.5 py-0.5 rounded-full border ${
                                ORDER_STATUS_STYLES[order.status].border
                            }`}
                        >
                            {ORDER_STATUS_STYLES[order.status].label}
                        </span>
                    )}
                </div>
            );

            const isPaidElement = (
                <div className="text-center">
                    {order.isPaid ? (
                        <span className="bg-black border border-black rounded-full size-3.5 block mx-auto"></span>
                    ) : (
                        <span className="border-2 border-black rounded-full size-3.5 block mx-auto"></span>
                    )}
                </div>
            );

            const totalElement = (
                <div className="text-right">
                    {order.totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </div>
            );

            const createdAtElement = (
                <div className="text-right">{new Date(`${order.createdAt}`).toLocaleString()}</div>
            );

            return {
                _id: `${order._id}`,
                data: [order._id, order.customerName, statusElement, isPaidElement, totalElement, createdAtElement],
            };
        }) ?? [];

    const columns = [
        <div className="text-left">Id</div>,
        <div className="text-left">Name</div>,
        "Status",
        "Is Paid",
        <div className="text-right">Total</div>,
        <div className="text-right">Created At</div>,
    ];

    const sizes = ["10%", "15%", "10%", "15%", "10%", "15%"];

    return (
        <>
            <Table
                columns={columns}
                rows={rows}
                total={totalDocuments}
                sizes={sizes}
                isLoading={orders.isFetching}
                navigatePath="/admin/orders"
            />
        </>
    );
}
