import { useState } from "react";
import { toast } from "react-toastify";
import { GetOrderByIdResponse } from "@/apis/orders";
import { PAYMENT_TYPE, PAYMENT_STATUS } from "@/constants";
import { QueryObserverResult } from "@tanstack/react-query";
import { useTransactionActions } from "@/hooks/Admin/Orders/useTransactionActions";

type Props = {
    orderId: number;
    transaction: GetOrderByIdResponse["transaction"];
    refetch: () => Promise<QueryObserverResult<GetOrderByIdResponse, Error>>;
};

export default function TransactionDetails(props: Props) {
    const { updateTransaction } = useTransactionActions();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdatePaymentStatus = async () => {
        if (props.transaction?.paymentType === PAYMENT_TYPE.COD) {
            setIsLoading(true);

            await updateTransaction.mutateAsync({
                orderId: props.orderId,
                data: { paymentStatus: PAYMENT_STATUS.PAID, paymentTime: new Date() },
            });

            await props.refetch();
            toast.success("Payment status updated successfully");
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-md p-6 h-full">
            <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
            {props.transaction ? (
                <div className="space-y-4">
                    <div>
                        <span className="text-lg">
                            <strong>Payment Type:</strong> {props.transaction.paymentType}
                        </span>
                    </div>
                    <div>
                        <span className="text-lg">
                            <strong>Payment Status:</strong> {props.transaction.paymentStatus}
                        </span>
                    </div>

                    {props.transaction.paymentTime && (
                        <div>
                            <span className="text-lg">
                                <strong>Payment Time:</strong>{" "}
                                {new Date(props.transaction.paymentTime).toLocaleString()}
                            </span>
                        </div>
                    )}
                    {props.transaction.checkoutUrl && (
                        <div className="truncate">
                            <span className="text-lg">
                                <strong>Checkout URL:</strong>{" "}
                                <a
                                    href={props.transaction.checkoutUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {props.transaction.checkoutUrl}
                                </a>
                            </span>
                        </div>
                    )}
                    {props.transaction.paymentType === PAYMENT_TYPE.COD &&
                        props.transaction.paymentStatus !== PAYMENT_STATUS.PAID && (
                            <button
                                className={`mt-4 px-4 py-2 rounded-md ${
                                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                                } text-white font-semibold hover:bg-blue-600 transition`}
                                onClick={handleUpdatePaymentStatus}
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Mark as Paid"}
                            </button>
                        )}
                </div>
            ) : (
                <p className="text-gray-500">No props.transaction details available.</p>
            )}
        </div>
    );
}
