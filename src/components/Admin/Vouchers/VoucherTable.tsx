import { toast } from "react-toastify";
import { DISCOUNT_TYPE } from "@/constants";
import Table from "@/components/Shared/Table";
import useVouchers from "@/hooks/Admin/Vouchers/useVouchers";

export default function VoucherTable() {
    const vouchers = useVouchers();

    if (vouchers.error) toast.error("Invalid query parameters", { toastId: "voucher-table" });

    const data = vouchers.data ?? { vouchers: [], totalDocuments: 0 };

    const { vouchers: vouchersData, totalDocuments } = data;

    const rows =
        vouchersData.map((voucher) => {
            const discountValueElement = (
                <div className="text-center">
                    {voucher.discount.type === DISCOUNT_TYPE.FIXED ? (
                        <span className="bg-gray-100 text-gray-800 text-base me-2 px-2.5 py-0.5 rounded font-extrabold border border-gray-600">
                            {voucher.discount.value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                        </span>
                    ) : (
                        <span className="bg-gray-100 text-gray-800 text-base me-2 px-2.5 py-0.5 rounded font-extrabold border border-gray-600">
                            {voucher.discount.value}%
                        </span>
                    )}
                </div>
            );

            const isUsedElement = (
                <div className="text-center">
                    {voucher.used ? (
                        <span className="bg-black border border-black rounded-full size-3.5 block mx-auto"></span>
                    ) : (
                        <span className="border-2 border-black rounded-full size-3.5 block mx-auto"></span>
                    )}
                </div>
            );

            const expirationDateElement = (
                <div className="text-right">{new Date(`${voucher.expirationDate}`).toLocaleString()}</div>
            );

            return {
                _id: `${voucher._id}`,
                data: [voucher.code, discountValueElement, isUsedElement, expirationDateElement],
            };
        }) ?? [];

    const columns = [
        <div className="text-left">Code</div>,
        "Discount",
        "Is Used",
        <div className="text-right">Expiration Date</div>,
    ];

    return (
        <>
            <Table
                columns={columns}
                rows={rows}
                total={totalDocuments}
                isLoading={vouchers.isFetching}
                navigatePath="/admin/products"
            />
        </>
    );
}
