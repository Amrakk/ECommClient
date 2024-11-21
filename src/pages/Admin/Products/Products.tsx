import useModal from "@/hooks/Shared/useModal";
import AddButton from "@/components/Shared/AddButton";
import Filter from "@/components/Admin/Products/Filter";
import InsertModal from "@/components/Admin/Products/InsertModal";
import ProductTable from "@/components/Admin/Products/ProductTable";

export default function Products() {
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
                    <ProductTable />
                </div>
            </div>
        </>
    );
}
