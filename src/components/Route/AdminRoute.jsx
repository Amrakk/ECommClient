import { Outlet, Navigate } from "react-router-dom";

export default function AdminRoute() {
    const user = "admin";
    if (user === "admin")
        return (
            <>
                <Outlet />
            </>
        );
    else return <Navigate to="/home" />;
}
