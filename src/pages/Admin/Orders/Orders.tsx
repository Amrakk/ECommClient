import useModal from "@/hooks/Shared/useModal";
import Filter from "@/components/Admin/Orders/Filter";
import AddButton from "@/components/Shared/AddButton";
import OrderTable from "@/components/Admin/Orders/OrderTable";
import InsertModal from "@/components/Admin/Orders/InsertModal";

export default function Users() {
    const { isShowing, toggle } = useModal();

    return (
        <>
            <AddButton onClick={toggle} />
            <InsertModal isShowing={isShowing} hide={toggle} />
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
