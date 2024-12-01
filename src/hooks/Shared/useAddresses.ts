import { useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user.store";
import ToastInitContent from "@/components/Shared/ToastInitContent";
import { useAddressesStore } from "@/stores/addresses.store";
import { getWards, getDistricts, getProvinces } from "@/apis/services";

export default function useAddresses() {
    const user = useUserStore((state) => state.user);
    const setWards = useAddressesStore((state) => state.setWards);
    const setDistricts = useAddressesStore((state) => state.setDistricts);
    const setProvinces = useAddressesStore((state) => state.setProvinces);

    const assignAddresses = useQuery({
        queryKey: ["addresses"],
        queryFn: async () => {
            return Promise.all([getProvinces(), getDistricts(), getWards()]);
        },
    });

    useEffect(() => {
        if (!assignAddresses.data) return;

        setProvinces(assignAddresses.data[0]);
        setDistricts(assignAddresses.data[1]);
        setWards(assignAddresses.data[2]);
    }, [assignAddresses.data]);

    useEffect(() => {
        if (assignAddresses.error && user && user.role === "admin") {
            toast.info(ToastInitContent, {
                position: "top-center",
                theme: "colored",
                toastId: "crawl-addresses-notify",
                style: {
                    width: "700px",
                    translate: "-150px",
                },
                closeButton: false,
                bodyClassName: () => "text-white select-none text-xl font-bold p-4 flex flex-col gap-4 w-[700px]",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [assignAddresses.error]);

    return { assignAddresses };
}
