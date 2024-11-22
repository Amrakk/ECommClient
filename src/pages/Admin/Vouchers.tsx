import useModal from "@/hooks/Shared/useModal";
import AddButton from "@/components/Shared/AddButton";
import Filter from "@/components/Admin/Vouchers/Filter";
import InsertModal from "@/components/Admin/Vouchers/InsertModal";
import VoucherTable from "@/components/Admin/Vouchers/VoucherTable";

export default function Vouchers() {
    const { isShowing, toggle } = useModal();

    return (
        <>
            <AddButton onClick={toggle} />
            <InsertModal isShowing={isShowing} hide={toggle} />
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
