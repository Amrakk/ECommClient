import { useMutation } from "@tanstack/react-query";
import { useAddressesStore } from "@/stores/addresses.store";
import { getWards, getDistricts, getProvinces } from "@/apis/services";

export default function useAddresses() {
    const setWards = useAddressesStore((state) => state.setWards);
    const setDistricts = useAddressesStore((state) => state.setDistricts);
    const setProvinces = useAddressesStore((state) => state.setProvinces);

    const assignAddresses = useMutation({
        mutationKey: ["addresses"],
        mutationFn: async () => {
            return await Promise.all([getProvinces(), getDistricts(), getWards()]);
        },
        onSuccess: (data) => {
            setProvinces(data[0]);
            setDistricts(data[1]);
            setWards(data[2]);
        },
    });

    return { assignAddresses };
}
