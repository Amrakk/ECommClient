import AddButton from "@/components/Shared/AddButton";
import Filter from "@/components/Admin/Products/Filter";
import ProductTable from "@/components/Admin/Products/ProductTable";

export default function Products() {
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
                    <ProductTable />
                </div>
            </div>
        </>
    );
}
