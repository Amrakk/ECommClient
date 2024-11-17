import Filter from "@/components/Admin/Users/Filter";
import UserTable from "@/components/Admin/Users/UserTable";

export default function Users() {
    return (
        <div className="p-6">
            <div>
                <Filter />
            </div>

            <div className="mt-6">
                <UserTable />
            </div>
        </div>
    );
}
