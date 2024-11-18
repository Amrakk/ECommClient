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
            const statusElement = (
                <div className="text-center">
                    {user.status === USER_STATUS.NORMAL ? (
                        <span className="status_btn !min-w-0 rounded-full size-4 block mx-auto"></span>
                    ) : (
                        <span className="status_btn !min-w-0 orange_bg rounded-full size-4 block mx-auto"></span>
                    )}
                </div>
            );

            const phoneNumberElement = <div className="text-center">{user.phoneNumber ?? "―"}</div>;

            const role = user.role === "admin" ? "Admin" : "Customer";

            return {
                _id: user._id,
                data: [user.name, user.email, role, statusElement, phoneNumberElement],
            };
        }) ?? [];

    const columns = [
        <div className="text-left">Name</div>,
        <div className="text-left">Email</div>,
        <div className="text-left">Role</div>,
        "Status",
        "Phone Number",
    ];
    return (
        <>
            <Table
                columns={columns}
                rows={rows}
                total={totalDocuments}
                isLoading={users.isFetching}
                navigatePath="/admin/users"
            />
        </>
    );
}
