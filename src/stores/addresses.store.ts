import { create } from "zustand";

export interface Province {
    province_name: string;
    province_id: number;
}

export interface District {
    district_id: number;
    district_name: string;
    province_id: number;
}

export interface Ward {
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

export const useAddressesStore = create<AddressesStore>()((set) => ({
    provinces: [],
    districts: [],
    wards: [],

    setProvinces: (provinces: Province[]) => set({ provinces }),
    setDistricts: (districts: District[]) => set({ districts }),
    setWards: (wards: Ward[]) => set({ wards }),
}));
