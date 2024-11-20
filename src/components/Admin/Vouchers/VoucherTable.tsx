import { toast } from "react-toastify";
import { DISCOUNT_TYPE } from "@/constants";
import Table from "@/components/Shared/Table";
import useVouchers from "@/hooks/Admin/Vouchers/useVouchers";
import { FaTrashAlt } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import useVoucherActions from "@/hooks/Admin/Vouchers/useVoucherActions";
import { useState } from "react";

export default function VoucherTable() {
    const vouchers = useVouchers();
    const { deleteAction } = useVoucherActions();

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

            const actionsElement = (
                <div className="text-center flex gap-4 justify-center">
                    <button
                        className="text-blue-600"
                        onClick={() => {
                            navigator.clipboard.writeText(voucher.code);
                            toast.success("Copied to clipboard", {
                                toastId: "copy-voucher",
                                autoClose: 850,
                                hideProgressBar: true,
                            });
                        }}
                    >
                        <LuCopy className="hover:scale-125 active:scale-150 transition-all duration-100" size={18} />
                    </button>

                    <DeleteButton
                        onClick={async () => {
                            await deleteAction.mutateAsync(voucher._id);
                            await vouchers.refetch();
                            toast.success("Voucher deleted", { toastId: "delete-voucher" });
                        }}
                    />
                </div>
            );

            return {
                _id: `${voucher._id}`,
                data: [voucher.code, discountValueElement, isUsedElement, expirationDateElement, actionsElement],
            };
        }) ?? [];

    const columns = [
        <div className="text-left">Code</div>,
        "Discount",
        "Is Used",
        <div className="text-right">Expiration Date</div>,
        <div className="text-center">Actions</div>,
    ];

    const sizes = ["35%", "20%", "20%", "15%", "10%"];

    return (
        <>
            <Table columns={columns} rows={rows} total={totalDocuments} isLoading={vouchers.isFetching} sizes={sizes} />
        </>
    );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <button
            className="text-red-500 disabled:cursor-not-allowed disabled:opacity-50 "
            onClick={() => {
                setIsDeleting(true);
                onClick();
            }}
            disabled={isDeleting}
        >
            <FaTrashAlt className="hover:scale-125 active:scale-150 transition-all duration-100" size={18} />
        </button>
    );
}
