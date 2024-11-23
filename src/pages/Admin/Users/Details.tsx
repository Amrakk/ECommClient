import { toast } from "react-toastify";
import useModal from "@/hooks/Shared/useModal";
import useUserById from "@/hooks/Admin/Users/useUserById";
import Addresses from "@/components/Admin/Users/Addresses";
import { useLocation, useNavigate } from "react-router-dom";
import OrderTable from "@/components/Admin/Users/OrderTable";
import EditAvatarModal from "@/components/Shared/EditAvatarModal";
import PersonalDetails from "@/components/Admin/Users/PersonalDetails";

export default function Details() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const userId = pathname.split("/").pop();

    if (!userId) {
        navigate("/admin/users");
        return null;
    }

    const { isShowing, toggle } = useModal();
    const user = useUserById(userId);

    if (user.error) {
        toast.error("User not found", { toastId: "user-not-found" });
        navigate("/admin/users");
    }

    const userData = user.data;
    if (!userData) return null;

    return (
        <>
            <EditAvatarModal userId={userData._id} isShowing={isShowing} hide={toggle} refetch={user.refetch} />
            <div className="p-6">
                <div>
                    <PersonalDetails toggleAvatarModal={toggle} user={userData} refetch={user.refetch} />
                </div>
                <div className="mt-6">
                    <Addresses userId={userData._id} addresses={userData.addresses} refetch={user.refetch} />
                </div>
                <div className="mt-6">
                    <OrderTable orders={userData.orderHistory} refetch={user.refetch} />
                </div>
            </div>
        </>
    );
}
