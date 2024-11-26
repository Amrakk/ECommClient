import AddressCrawlingPanel from "@/components/Admin/Advanced/AddressCrawlingPanel";
import PaymentServiceStatuses from "@/components/Admin/Advanced/PaymentServiceStatuses";
import PCYPanel from "@/components/Admin/Advanced/PCYPanel";

export default function Advanced() {
    return (
        <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="w-full col-span-1">
                    <PaymentServiceStatuses />
                </div>
                <div className="w-full col-span-2">
                    <AddressCrawlingPanel />
                </div>
            </div>

            <div className="mt-6">
                <PCYPanel />
            </div>
        </div>
    );
}
