import { useState } from "react";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { GetUserById } from "@/apis/users";
import { QueryObserverResult } from "@tanstack/react-query";
import useUserActions from "@/hooks/Admin/Users/useUserActions";
import CustomTextField from "@/components/Shared/CustomTextField";
import AddressSelector from "@/components/Shared/AddressSelector";
import { District, Province, Ward } from "@/stores/addresses.store";

type Props = {
    userId: string;
    addresses: GetUserById["addresses"];
    refetch: () => Promise<QueryObserverResult<GetUserById, Error>>;
};

type FormValues = {
    street?: string;
    province?: Province;
    district?: District;
    ward?: Ward;
    contactInfo?: string;
};

export default function Addresses(props: Props) {
    const { addresses } = props;
    const { updateAction } = useUserActions();

    const [formValues, setFormValues] = useState<FormValues>({});

    if (updateAction.error) {
        const path = (updateAction.error as any).error[0].path[0]?.toLowerCase() as string;
        toast.error(`Invalid ${path.slice(0, 1).toUpperCase() + path.slice(1)}`, {
            toastId: "update-user",
        });
    }

    async function handleSubmit() {
        const showError = (message: string) => {
            toast.error(message, { toastId: "update-user" });
        };

        if (!formValues?.street) {
            showError("Street is required");
            return;
        }
        if (!formValues?.province || !formValues?.province.province_id) {
            showError("Province is required");
            return;
        }
        if (!formValues?.district || !formValues?.district.district_id) {
            showError("District is required");
            return;
        }
        if (!formValues?.ward || formValues?.ward.ward_code === "Default") {
            showError("Ward is required");
            return;
        }

        const address = {
            street: formValues.street,
            ward: { code: formValues.ward.ward_code, name: formValues.ward.ward_name },
            district: { id: formValues.district.district_id, name: formValues.district.district_name },
            province: {
                id: formValues.province.province_id,
                name: formValues.province.province_name,
            },
            contactInfo: formValues.contactInfo,
        };

        const data = {
            addresses: [address, ...addresses],
        };

        await updateAction.mutateAsync({ _id: props.userId, data });

        await props.refetch();
        setFormValues({});
        toast.success("User updated successfully", { toastId: "update-user" });
    }

    async function handleRemove(index: number) {
        const data = {
            addresses: addresses.filter((_, idx) => idx !== index),
        };

        await updateAction.mutateAsync({ _id: props.userId, data });

        await props.refetch();
        toast.success("User updated successfully", { toastId: "update-user" });
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Addresses</h3>
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg shadow border border-gray-200 max-h-[320px]">
                    <p className="text-gray-700 font-semibold">Add New Address</p>

                    <div className="size-full">
                        <div className="flex-1 flex-grow">
                            <CustomTextField
                                id="street"
                                label="Street"
                                backgroundColor="bg-gray-50"
                                value={formValues.street ?? ""}
                                onChange={(e) => setFormValues({ ...formValues, street: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="size-full">
                        <div className="flex-1 flex-grow">
                            <AddressSelector
                                value={{
                                    ward: formValues.ward,
                                    district: formValues.district,
                                    province: formValues.province,
                                }}
                                onChange={(data) => {
                                    setFormValues({
                                        ...formValues,
                                        ward: data.ward,
                                        district: data.district,
                                        province: data.province,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="size-full">
                        <div className="flex-1 flex-grow bg-gray-50">
                            <CustomTextField
                                id="contactInfo"
                                label="Contact Info"
                                backgroundColor="bg-gray-50"
                                value={formValues.contactInfo ?? ""}
                                onChange={(e) => setFormValues({ ...formValues, contactInfo: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        className="w-full bg-black font-bold text-center select-none text-white p-3 rounded-md active:scale-90 transition-all duration-75"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>

                <div className="flex flex-wrap gap-6 col-span-2">
                    {addresses && addresses.length > 0 ? (
                        addresses.map((address, idx) => (
                            <div
                                key={idx}
                                className="p-4 border border-gray-200 rounded-lg h-fit bg-gray-50 hover:shadow-md transition max-w-96"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-lg font-semibold text-gray-800">Address {idx + 1}</p>
                                    <FaTimes
                                        className="text-red-500 hover:scale-110 transition cursor-pointer"
                                        title="Remove Address"
                                        onClick={() => handleRemove(idx)}
                                    />
                                </div>
                                <p className="text-gray-600 truncate">
                                    <span className="font-bold mr-3">Street:</span> {address.street}
                                </p>
                                <p className="text-gray-600 truncate">
                                    <span className="font-bold mr-3">Ward:</span> {address.ward.name} (
                                    {address.ward.code})
                                </p>
                                <p className="text-gray-600 truncate">
                                    <span className="font-bold mr-3">District:</span> {address.district.name} (
                                    {address.district.id})
                                </p>
                                <p className="text-gray-600 truncate">
                                    <span className="font-bold mr-3">Province:</span> {address.province.name} (
                                    {address.province.id})
                                </p>
                                {address.contactInfo && (
                                    <p className="text-gray-600 truncate">
                                        <span className="font-bold mr-3">Contact Info:</span> {address.contactInfo}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full">
                            <h3 className="text-xl font-semibold text-gray-700">No Addresses Available</h3>
                            <p className="text-gray-500 mt-2">This user has not provided any addresses.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
