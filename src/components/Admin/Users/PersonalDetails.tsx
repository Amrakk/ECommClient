import { useState } from "react";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { GetUserById } from "@/apis/users";
import { FaRegTrashAlt } from "react-icons/fa";
import Dropdown from "@/components/Shared/Dropdown";
import useUserActions from "@/hooks/Admin/Users/useUserActions";
import CustomTextField from "@/components/Shared/CustomTextField";
import { DEFAULT_AVATAR_URL, SOCIAL_MEDIA_PROVIDER, USER_ROLE, USER_STATUS } from "@/constants";

import type { ISocialMediaAccount } from "@/models/user";
import type { QueryObserverResult } from "@tanstack/react-query";

type Props = {
    user: GetUserById;
    toggleAvatarModal: () => void;
    refetch: () => Promise<QueryObserverResult<GetUserById, Error>>;
};

type FormValues = {
    name: string;
    email: string;
    role: USER_ROLE;
    loyaltyPoint: number;
    phoneNumber?: string;
    socialMediaAccounts: ISocialMediaAccount[];
};

export default function PersonalDetails(props: Props) {
    const { updateAction } = useUserActions();

    const [formValues, setFormValues] = useState<FormValues>({
        name: props.user.name,
        email: props.user.email,
        role: props.user.role,
        loyaltyPoint: props.user.loyaltyPoint,
        phoneNumber: props.user.phoneNumber,
        socialMediaAccounts: props.user.socialMediaAccounts,
    });

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

        if (formValues.name.length === 0) {
            showError("Name is required");
            return;
        }
        if (formValues.email.length === 0) {
            showError("Email is required");
            return;
        }
        if (formValues.phoneNumber?.length === 0) {
            showError("Phone number is required");
            return;
        }
        const loyaltyPoint = parseInt(`${formValues.loyaltyPoint}`);
        if (isNaN(loyaltyPoint) || loyaltyPoint < 0) {
            showError("Loyalty point must be a positive number");
            return;
        }

        const data = {
            name: formValues.name,
            email: formValues.email,
            role: formValues.role,
            phoneNumber: formValues.phoneNumber,
            loyaltyPoint: loyaltyPoint,
            socialMediaAccounts: formValues.socialMediaAccounts,
        };

        await updateAction.mutateAsync({ _id: props.user._id, data });

        await props.refetch();
        toast.success("User updated successfully", { toastId: "update-user" });
    }

    async function handleChangeStatus() {
        await updateAction.mutateAsync({
            _id: props.user._id,
            data: {
                status: user.status === USER_STATUS.NORMAL ? USER_STATUS.BLOCKED : USER_STATUS.NORMAL,
            },
        });

        await props.refetch();
        toast.success("User updated successfully", { toastId: "update-user" });
    }

    const { user } = props;

    return (
        <div className=" bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-row">
                    {/* User Avatar */}
                    <div className="bg-gray-200 rounded-md w-52 p-6">
                        <div className="relative size-40">
                            <div className="absolute flex justify-center">
                                <img
                                    src={user.avatarUrl ?? DEFAULT_AVATAR_URL}
                                    alt="avatar"
                                    className="size-40 object-cover rounded-md shadow-lg border border-gray-300"
                                />
                            </div>
                            <div
                                className="absolute bg-white rounded-full p-1 -right-2 -bottom-2 z-10 hover:scale-110"
                                onClick={props.toggleAvatarModal}
                            >
                                <MdEdit
                                    className="text-gray-800 transition-all cursor-pointer hover:text-gray-900"
                                    size={18}
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="w-[60%] p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
                        <div className="flex flex-col gap-4 p-4 md:p-5">
                            <div className="flex flex-row gap-5">
                                <div className="flex-1 flex-shrink">
                                    <CustomTextField
                                        id="name"
                                        key={"name"}
                                        label={"Name"}
                                        value={formValues.name}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex-1 flex-shrink">
                                    <CustomTextField
                                        id="email"
                                        type="email"
                                        key={"email"}
                                        value={formValues.email}
                                        label={"Email"}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row gap-5">
                                <div className="w-full z-10">
                                    <Dropdown
                                        direction="down"
                                        variant="secondary"
                                        selected={formValues.role}
                                        onChange={(e) => setFormValues({ ...formValues, role: e.value as USER_ROLE })}
                                        data={[
                                            { value: USER_ROLE.CUSTOMER, name: "Customer" },
                                            { value: USER_ROLE.ADMIN, name: "Admin" },
                                        ]}
                                    />
                                </div>

                                <div className="size-full">
                                    <div className="flex-1 flex-grow">
                                        <CustomTextField
                                            id="phoneNumber"
                                            label="Phone number"
                                            value={formValues.phoneNumber}
                                            onChange={(e) =>
                                                setFormValues({ ...formValues, phoneNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="size-full">
                                    <div className="flex-1 flex-grow">
                                        <CustomTextField
                                            id="loyaltyPoint"
                                            label="Loyalty Points"
                                            type="number"
                                            value={formValues.loyaltyPoint}
                                            onChange={(e) =>
                                                setFormValues({ ...formValues, phoneNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        {formValues.socialMediaAccounts && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Social Media</h3>
                                {formValues.socialMediaAccounts
                                    .filter((account) => account.provider === SOCIAL_MEDIA_PROVIDER.GOOGLE)
                                    .map((account, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 bg-gray-50 rounded-lg shadow-md flex flex-row justify-between items-center"
                                        >
                                            <div className="">
                                                <p className="text-gray-600 text-base">
                                                    <span className="font-semibold">Provider:</span> Google
                                                </p>
                                                <p className="text-gray-600 text-base">
                                                    <span className="font-semibold">Account ID:</span>{" "}
                                                    {account.accountId}
                                                </p>
                                            </div>
                                            <FaRegTrashAlt
                                                className="text-red-500 cursor-pointer hover:scale-125 transition-all duration-100"
                                                size={24}
                                                onClick={() => {
                                                    // Remove the account
                                                    setFormValues({
                                                        ...formValues,
                                                        socialMediaAccounts: formValues.socialMediaAccounts.filter(
                                                            (acc) => acc.accountId !== account.accountId
                                                        ),
                                                    });
                                                }}
                                            />
                                        </div>
                                    ))}
                            </div>
                        )}

                        <div className="mt-6 flex space-x-4 float-end">
                            <button
                                type="button"
                                className={`border focus:ring-4 focus:outline-none hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ${
                                    props.user.status === USER_STATUS.NORMAL
                                        ? "text-red-700 border-red-700 hover:bg-red-800 focus:ring-red-300"
                                        : "text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300"
                                }`}
                                onClick={handleChangeStatus}
                            >
                                {user.status === USER_STATUS.NORMAL ? "Block" : "Unblock"}
                            </button>
                            <button
                                type="button"
                                className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
