import useModal from "@/hooks/Shared/useModal";
import Filter from "@/components/Admin/Users/Filter";
import AddButton from "@/components/Shared/AddButton";
import UserTable from "@/components/Admin/Users/UserTable";
import InsertModal from "@/components/Admin/Users/InsertModal";

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
                    <UserTable />
                </div>
            </div>
        </>
    );
}
