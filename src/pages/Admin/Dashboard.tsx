import NewUsers from "@/components/Admin/Dashboard/NewUsers";
import Overview from "@/components/Admin/Dashboard/Overview";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            <div className="col-span-2 ">
                <Overview />
            </div>

            <div className="col-span-1">
                <NewUsers />
            </div>
        </div>
    );
}
