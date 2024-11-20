import Filter from "@/components/Admin/Users/Filter";
import UserTable from "@/components/Admin/Users/UserTable";
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
                    <UserTable />
                </div>
            </div>
        </>
    );
}
