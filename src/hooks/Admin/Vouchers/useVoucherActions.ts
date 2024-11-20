import * as VoucherAPI from "@/apis/vouchers";
import { useMutation } from "@tanstack/react-query";

export default function useVoucherActions() {
    const insertAction = useMutation({
        mutationKey: ["voucher-insert"],
        mutationFn: VoucherAPI.insertVoucher,
    });

    const generateAction = useMutation({
        mutationKey: ["voucher-generate"],
        mutationFn: VoucherAPI.generateVouchers,
    });

    const deleteAction = useMutation({
        mutationKey: ["voucher-delete"],
        mutationFn: VoucherAPI.deleteVoucher,
    });

    return { insertAction, generateAction, deleteAction };
}
