import Header from "@/layouts/admin/Header";
import { Outlet } from "react-router-dom";

export default function CustomerRoute() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
