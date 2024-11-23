import { GetUserById } from "@/apis/users";
import Table from "@/components/Shared/Table";
import { ORDER_STATUS_STYLES } from "@/constants";
import { QueryObserverResult } from "@tanstack/react-query";

type Props = {
    orders: GetUserById["orderHistory"];
    refetch: () => Promise<QueryObserverResult<GetUserById, Error>>;
};

export default function OrderTable(props: Props) {
    const ordersData = props.orders;

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
                data: [order._id, statusElement, isPaidElement, totalElement, createdAtElement],
            };
        }) ?? [];

    const columns = [
        <div className="text-left">Id</div>,
        "Status",
        "Is Paid",
        <div className="text-right">Total</div>,
        <div className="text-right">Created At</div>,
    ];

    const sizes = ["10%", "10%", "15%", "10%", "15%"];

    return (
        <div className="flex flex-col gap-2 bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Orders History</h3>
            <Table columns={columns} rows={rows} total={ordersData.length} sizes={sizes} isPaginated={false} />
        </div>
    );
}
