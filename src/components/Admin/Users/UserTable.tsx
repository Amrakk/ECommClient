import { toast } from "react-toastify";
import { USER_STATUS } from "@/constants";
import Table from "@/components/Shared/Table";
import useUsers from "@/hooks/Admin/Users/useUsers";

export default function UserTable() {
    const users = useUsers();

    if (users.error) toast.error("Invalid query parameters", { toastId: "user-table" });

    const data = users.data ?? { users: [], totalDocuments: 0 };

    const { users: usersData, totalDocuments } = data;

    const rows =
        usersData.map((user) => {
            const statusElement =
                user.status === USER_STATUS.NORMAL ? (
                    <span className="status_btn !min-w-0 rounded-full size-4 block mx-auto"></span>
                ) : (
                    <span className="status_btn !min-w-0 orange_bg rounded-full size-4 block mx-auto"></span>
                );

            const role = user.role === "admin" ? "Admin" : "Customer";

            return {
                _id: user._id,
                data: [user.name, user.email, role, statusElement, user.phoneNumber ?? "―"],
            };
        }) ?? [];

    return (
        <>
            <Table
                columns={["Name", "Email", "Role", "Status", "Phone Number"]}
                rows={rows}
                total={totalDocuments}
                isLoading={users.isFetching}
                navigatePath="/admin/users"
            />
        </>
    );
}
