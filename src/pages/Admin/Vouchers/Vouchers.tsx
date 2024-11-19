import Filter from "@/components/Admin/Vouchers/Filter";
import VoucherTable from "@/components/Admin/Vouchers/VoucherTable";
import AddButton from "@/components/Shared/AddButton";

export default function Vouchers() {
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
                    <VoucherTable />
                </div>
            </div>
        </>
    );
}
