import { create } from "zustand";

interface Province {
    province_name: string;
    province_id: number;
}

interface District {
    district_id: number;
    district_name: string;
    province_id: number;
}

interface Ward {
    ward_code: string;
    ward_name: string;
    district_id: number;
}

interface AddressesStore {
    provinces?: Province[];
    districts?: District[];
    wards?: Ward[];

    setProvinces: (provinces: Province[]) => void;
    setDistricts: (districts: District[]) => void;
    setWards: (wards: Ward[]) => void;
}

export const useCartStore = create<AddressesStore>()((set) => ({
    provinces: [],
    districts: [],
    wards: [],

    setProvinces: (provinces: Province[]) => set({ provinces }),
    setDistricts: (districts: District[]) => set({ districts }),
    setWards: (wards: Ward[]) => set({ wards }),
}));
