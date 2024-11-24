import Addresses from "@/components/Admin/Users/Addresses";
import OrderTable from "@/components/Admin/Users/OrderTable";
import PersonalDetails from "@/components/Admin/Users/PersonalDetails";

export default function Details() {
    return (
        <div className="p-6">
            <div>
                <PersonalDetails />
            </div>
            <div className="mt-6">
                <Addresses />
            </div>
            <div className="mt-6">
                <OrderTable />
            </div>
        </div>
    );
}
