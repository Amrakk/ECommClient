import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAddressesStore } from "@/stores/addresses.store";
import { getWards, getDistricts, getProvinces } from "@/apis/services";

export default function useAddresses() {
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

    return { assignAddresses };
}
