import Filter from "@/components/Admin/Orders/Filter";
import OrderTable from "@/components/Admin/Orders/OrderTable";
import AddButton from "@/components/Shared/AddButton";

export default function Users() {
    return (
        <>
            <AddButton
                onClick={() => {
                    console.log(1);
                }}
            />
            <div className="p-6">
                <div>
                    <Filter />
                </div>

                <div className="mt-6">
                    <OrderTable />
                </div>
            </div>
        </>
    );
}
