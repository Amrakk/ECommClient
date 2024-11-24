import { setUser } from "@/stores/client/userSlice";
import { useVerifyMutation } from "@/hooks/Client/auth/useCheck";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/user.store";

const CheckAuth = (props: any) => {
    const verifyMutation = useVerifyMutation();
    const dispatch = useDispatch();
    const zustandUserStore = useUserStore();
    


    useEffect(() => {
        verifyMutation.mutateAsync().then((data) => {
            props.setIsCheckingAuth(false);
            dispatch(setUser(data.user));
            zustandUserStore.setUser(data.user);
        }).catch((error) => {
            if (error.code >= 400 ) {
                toast.error(error.message);
            }
            props.setIsCheckingAuth(false);
            dispatch(setUser(null));
            zustandUserStore.setUser();
        });
    }, []);

    return (
        <>{props.children}</>
    );
}
export default CheckAuth;

