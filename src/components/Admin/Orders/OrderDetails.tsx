import { toast } from "react-toastify";
import { GetOrderByIdResponse } from "@/apis/orders";
import { QueryObserverResult } from "@tanstack/react-query";
import { ORDER_STATUS, ORDER_STATUS_STYLES } from "@/constants";
import { useOrderActions } from "@/hooks/Admin/Orders/useOrderActions";

type Props = {
    order: GetOrderByIdResponse;
    refetch: () => Promise<QueryObserverResult<GetOrderByIdResponse, Error>>;
};

export default function OrderDetails(props: Props) {
    const { order } = props;
    const { updateOrder } = useOrderActions();

    if (updateOrder.error) {
        if ("code" in updateOrder.error) toast.error("Order is already processed", { toastId: "update-order" });
        else toast.error(updateOrder.error.message, { toastId: "update-order" });
    }

    async function handleUpdateOrderStatus(status: ORDER_STATUS) {
        await updateOrder.mutateAsync({ _id: order._id, data: { status } });
        await props.refetch();
    }

    return (
        <div className="bg-white shadow-md rounded-md p-6 h-full">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4 gap-6 flex flex-col">Details</h1>
                <div className="flex gap-3">
                    {Object.keys(ORDER_STATUS_STYLES).map((status) => {
                        const typedStatus = status as ORDER_STATUS;
                        const isActive = typedStatus === order.status;
                        const styles = ORDER_STATUS_STYLES[typedStatus];

                        return (
                            <div
                                key={typedStatus}
                                className={`transition-all select-none cursor-pointer ${
                                    isActive
                                        ? "scale-110"
                                        : typedStatus === ORDER_STATUS.CANCELLED ||
                                          typedStatus === ORDER_STATUS.COMPLETED
                                        ? "opacity-30"
                                        : "opacity-30 hover:opacity-100 hover:scale-105"
                                }`}
                                onClick={
                                    typedStatus === order.status
                                        ? () => {}
                                        : typedStatus === ORDER_STATUS.CANCELLED ||
                                          typedStatus === ORDER_STATUS.COMPLETED
                                        ? () => toast.error(`You can't change status to ${typedStatus}`)
                                        : () => handleUpdateOrderStatus(typedStatus)
                                }
                            >
                                <div
                                    className={`text-base font-medium px-5 py-2.5 rounded-md border ${styles.bg} ${styles.text} ${styles.border}`}
                                >
                                    {styles.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-between bg-gray-50 rounded-lg p-6 shadow-md mb-6">
                {/* User Profile */}
                {order.user && (
                    <div className="mb-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">User Profile</h2>
                        <div className="text-sm text-gray-600 space-y-2.5">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-800">Name:</span>
                                <span>{order.user.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-800">Email:</span>
                                <span>{order.user.email}</span>
                            </div>
                            {order.user.phoneNumber && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-800">Phone:</span>
                                    <span>{order.user.phoneNumber}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Shipping Address */}
                <div className="mb-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
                    <div className="text-sm text-gray-600 space-y-2.5">
                        <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-800">Street:</span>
                            <span>{order.shippingAddress.street}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">Ward:</span>
                            <span>{order.shippingAddress.ward.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">District:</span>
                            <span>{order.shippingAddress.district.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">Province:</span>
                            <span>{order.shippingAddress.province.name}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Overview */}
            <div className="text-sm text-gray-500 align-bottom">
                <div className="bottom-0 flex items-baseline gap-1">
                    <strong>Id: </strong>
                    {order._id}
                </div>
                <div className="bottom-0 flex items-baseline gap-1">
                    <strong>Created At: </strong>
                    {new Date(order.createdAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
}
