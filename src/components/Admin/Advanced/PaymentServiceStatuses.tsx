import { usePaymentServiceStatusStore } from "@/stores/paymentServiceStatus.store";

export default function PaymentServiceStatuses() {
    const { paymentServiceStatus } = usePaymentServiceStatusStore();

    return (
        <div className="bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-bold mb-4">Payment Services</h1>
            <div className="flex ">
                <div className="flex flex-col gap-4 justify-between min-w-60 pb-3">
                    {paymentServiceStatus.map((method, i) => (
                        <div
                            key={i}
                            className={`flex justify-between items-center border p-3 rounded-md ${
                                method.available ? "bg-green-100" : "bg-red-100"
                            }`}
                        >
                            <span className="font-medium">
                                {method.service.slice(0, 1).toUpperCase() + method.service.slice(1)}
                            </span>
                            <span
                                className={`px-2 py-1 text-sm font-semibold rounded-md ${
                                    method.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                }`}
                            >
                                {method.available ? "Available" : "Unavailable"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
