import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { District, Province, useAddressesStore, Ward } from "@/stores/addresses.store";

import type { Option } from "./Dropdown";

type Props = {
    value?: FormValues;
    onChange: (data: FormValues) => void;
};

type FormValues = {
    province?: Province;
    district?: District;
    ward?: Ward;
};

export default function AddressSelector(props: Props) {
    const { wards, districts, provinces } = useAddressesStore();

    const [curWards, setCurWards] = useState<Option<Ward>[]>([
        { name: "Wards", value: { ward_code: "Default", ward_name: "Wards", district_id: 0 } },
    ]);
    const [curDistricts, setCurDistricts] = useState<Option<District>[]>([
        { name: "District", value: { district_id: 0, district_name: "District", province_id: 0 } },
    ]);

    const [formValues, setFormValuesBase] = useState<FormValues>({
        province: props.value?.province,
        district: props.value?.district,
        ward: props.value?.ward,
    });

    if (!provinces || !districts || !wards) return null;

    const provincesData = [
        { name: "Province", value: { province_name: "Province", province_id: 0 } },
        ...provinces.map((province) => ({
            name: province.province_name,
            value: province,
        })),
    ];

    function setFormValues(data: FormValues, isInit: boolean = false) {
        setFormValuesBase(data);
        if (!isInit) props.onChange(data);
    }

    useEffect(() => {
        if (!props.value) return;
        setFormValues(
            {
                province: props.value?.province,
                district: props.value?.district,
                ward: props.value?.ward,
            },
            true
        );
    }, [props.value]);

    useEffect(() => {
        const { province } = formValues;
        if (province?.province_id === undefined) return;

        const curDistrictsData = districts
            .filter((district) => district.province_id === province.province_id)
            .map((district) => ({
                name: district.district_name,
                value: district,
            }));

        const isDistrictEmpty = province.province_id && curDistrictsData.length === 0;

        setCurDistricts([
            isDistrictEmpty
                ? {
                      name: "None",
                      value: { district_id: -1, district_name: "None", province_id: province.province_id },
                  }
                : {
                      name: "District",
                      value: { district_id: 0, district_name: "District", province_id: province.province_id },
                  },
            ...curDistrictsData,
        ]);

        setCurWards(
            isDistrictEmpty
                ? [{ name: "None", value: { ward_code: "-1", ward_name: "None", district_id: -1 } }]
                : [{ name: "Wards", value: { ward_code: "Default", ward_name: "Wards", district_id: 0 } }]
        );

        setFormValues({
            ...formValues,
            district: isDistrictEmpty
                ? { district_id: -1, district_name: "None", province_id: province.province_id }
                : undefined,
            ward: isDistrictEmpty ? { ward_code: "-1", ward_name: "None", district_id: -1 } : undefined,
        });
    }, [formValues.province]);

    useEffect(() => {
        const { district } = formValues;
        if (district?.district_id === undefined) return;

        const curWardsData = wards
            .filter((ward) => ward.district_id === district.district_id)
            .map((ward) => ({
                name: ward.ward_name,
                value: ward,
            }));

        const isWardEmpty = district.district_id && curWardsData.length === 0;

        setCurWards([
            isWardEmpty
                ? { name: "None", value: { ward_code: "-1", ward_name: "None", district_id: district.district_id } }
                : { name: "Wards", value: { ward_code: "Default", ward_name: "Wards", district_id: 0 } },
            ...curWardsData,
        ]);
        setFormValues({
            ...formValues,
            ward: isWardEmpty ? { ward_code: "-1", ward_name: "None", district_id: district.district_id } : undefined,
        });
    }, [formValues.district]);

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="h-[50px]">
                <Dropdown
                    selected={formValues.province ?? { province_name: "Province", province_id: 0 }}
                    variant="secondary"
                    direction="down"
                    compare={(a, b) => a?.province_id === b?.province_id}
                    onChange={(option) =>
                        setFormValues({
                            province: option.value,
                            district: undefined,
                            ward: undefined,
                        })
                    }
                    data={provincesData}
                />
            </div>
            <div className="h-[50px]">
                <Dropdown
                    selected={formValues.district ?? { district_id: 0, district_name: "District", province_id: 0 }}
                    variant="secondary"
                    direction="down"
                    compare={(a, b) => a?.district_id === b?.district_id}
                    onChange={(option) =>
                        setFormValues({
                            ...formValues,
                            district: option.value,
                            ward: undefined,
                        })
                    }
                    data={curDistricts}
                />
            </div>
            <div className="h-[50px]">
                <Dropdown
                    selected={formValues.ward ?? { ward_code: "Default", ward_name: "Wards", district_id: 0 }}
                    variant="secondary"
                    direction="down"
                    compare={(a, b) => a?.ward_code === b?.ward_code}
                    onChange={(option) =>
                        setFormValues({
                            ...formValues,
                            ward: option.value,
                        })
                    }
                    data={curWards}
                />
            </div>
        </div>
    );
}
