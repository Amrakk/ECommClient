import { toast } from "react-toastify";
import { USER_ROLE } from "@/constants";
import { useEffect, useState } from "react";
import useUsers from "@/hooks/Admin/Users/useUsers";
import Dropdown from "@/components/Shared/Dropdown";
import BaseModal from "@/components/Shared/BaseModal";
import useUserActions from "@/hooks/Admin/Users/useUserActions";
import CustomTextField from "@/components/Shared/CustomTextField";

type Props = { isShowing: boolean; hide: () => void };

type FormValues = {
    name?: string;
    email?: string;
    role: USER_ROLE;
    phoneNumber?: string;
};

export default function InsertModal(props: Props) {
    const users = useUsers();
    const { insertAction } = useUserActions();

    const [formValues, setFormValues] = useState<FormValues>({
        role: USER_ROLE.CUSTOMER,
    });

    if (insertAction.error) {
        const path = (insertAction.error as any).error[0].path[0]?.toLowerCase() as string;
        toast.error(`Invalid ${path.slice(0, 1).toUpperCase() + path.slice(1)}`, {
            toastId: "insert-user",
        });
    }

    async function handleSubmit() {
        const showError = (message: string) => {
            toast.error(message, { toastId: "insert-user" });
        };

        if (!formValues.name) {
            showError("Name is required");
            return;
        }
        if (!formValues.email) {
            showError("Email is required");
            return;
        }
        if (!formValues.phoneNumber) {
            showError("Phone number is required");
            return;
        }

        const data = {
            name: formValues.name,
            email: formValues.email,
            role: formValues.role,
            phoneNumber: formValues.phoneNumber,
        };

        await insertAction.mutateAsync(data);

        props.hide();
        await users.refetch();
        toast.success("User created successfully", { toastId: "insert-user" });
    }

    useEffect(() => {
        setFormValues({ role: USER_ROLE.CUSTOMER });
    }, [props.isShowing]);

    return (
        <>
            <BaseModal
                isShowing={props.isShowing}
                hide={props.hide}
                title="Create"
                top={-100}
                builder={() => {
                    return (
                        <>
                            <div className="flex flex-col gap-4 border-b border-gray-600 p-4 md:p-5">
                                <div className="flex flex-row gap-5">
                                    <div className="flex-1 flex-shrink">
                                        <CustomTextField
                                            id="name"
                                            key={"name"}
                                            label={"Name"}
                                            onChange={(e) =>
                                                setFormValues({
                                                    ...formValues,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-5">
                                    <div className="flex-1 flex-shrink">
                                        <CustomTextField
                                            id="email"
                                            type="email"
                                            key={"email"}
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
                                    <div className="w-full z-50">
                                        <Dropdown
                                            direction="down"
                                            variant="secondary"
                                            onChange={(e) =>
                                                setFormValues({ ...formValues, role: e.value as USER_ROLE })
                                            }
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
                                                onChange={(e) =>
                                                    setFormValues({ ...formValues, phoneNumber: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-5 p-4 md:p-5">
                                <div
                                    className="w-full bg-black font-bold text-center select-none text-white p-3 rounded-md active:scale-90 transition-all duration-75"
                                    onClick={handleSubmit}
                                >
                                    Create
                                </div>
                                <div
                                    className="w-full bg-gray-200 text-black p-3 text-center select-none rounded-md active:scale-90 transition-all duration-75"
                                    onClick={props.hide}
                                >
                                    Cancel
                                </div>
                            </div>
                        </>
                    );
                }}
            />
        </>
    );
}
