import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DISCOUNT_TYPE } from "@/constants";
import Dropdown from "@/components/Shared/Dropdown";
import BaseModal from "@/components/Shared/BaseModal";
import useVouchers from "@/hooks/Admin/Vouchers/useVouchers";
import CustomTextField from "@/components/Shared/CustomTextField";
import useVoucherActions from "@/hooks/Admin/Vouchers/useVoucherActions";

type Props = { isShowing: boolean; hide: () => void };

type FormValues = {
    prefix?: string;
    code?: string;
    count?: number;
    discountType: DISCOUNT_TYPE;
    value?: number;
    expirationDate?: Date;
};

export default function InsertModal(props: Props) {
    const vouchers = useVouchers();
    const { insertAction, generateAction } = useVoucherActions();

    const [isGenerateMode, setIsGenerateMode] = useState(false);

    const [formValues, setFormValues] = useState<FormValues>({
        discountType: DISCOUNT_TYPE.PERCENT,
    });

    if (insertAction.error) {
        const path = (insertAction.error as any).error[0].path[0]?.toLowerCase() as string;
        toast.error(`Invalid ${path.slice(0, 1).toUpperCase() + path.slice(1)}`, {
            toastId: "insert-voucher",
        });
    }

    async function handleSubmit() {
        const showError = (message: string) => {
            toast.error(message, { toastId: "insert-voucher" });
        };

        const isValidExpirationDate = (date: Date) => {
            return date.getTime() - new Date().getTime() >= 0;
        };

        if (isGenerateMode) {
            if (!formValues.count) {
                showError("Count is required");
                return;
            }
            if (isNaN(formValues.count) || formValues.count < 0) {
                showError("Invalid count");
                return;
            }
            if (!formValues.value) {
                showError("Value is required");
                return;
            }
            if (isNaN(formValues.value) || formValues.value < 0) {
                showError("Invalid value");
                return;
            }
            if (!formValues.expirationDate) {
                showError("Expiration Date is required");
                return;
            }
            if (!isValidExpirationDate(formValues.expirationDate)) {
                showError("Expiration Date must be in the future");
                return;
            }

            const data = {
                prefix: formValues.prefix,
                count: formValues.count,
                discount: { type: formValues.discountType, value: formValues.value },
                expirationDate: formValues.expirationDate,
            };
            await generateAction.mutateAsync(data);
        } else {
            if (!formValues.code) {
                showError("Code is required");
                return;
            }
            if (!formValues.value) {
                showError("Value is required");
                return;
            }
            if (isNaN(formValues.value) || formValues.value < 0) {
                showError("Invalid value");
                return;
            }
            if (!formValues.expirationDate) {
                showError("Expiration Date is required");
                return;
            }
            if (!isValidExpirationDate(formValues.expirationDate)) {
                showError("Expiration Date must be in the future");
                return;
            }

            const data = {
                code: formValues.code,
                discount: { type: formValues.discountType, value: formValues.value },
                expirationDate: formValues.expirationDate,
            };
            await insertAction.mutateAsync(data);
        }

        props.hide();
        await vouchers.refetch();
        toast.success("Voucher created", { toastId: "insert-voucher" });
    }

    useEffect(() => {
        setFormValues({ discountType: DISCOUNT_TYPE.PERCENT });
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
                                <div className="min-w-72">
                                    <label className="relative flex justify-center items-center group p-2 text-xl min-w-48">
                                        <input
                                            type="checkbox"
                                            onClick={() => setIsGenerateMode(!isGenerateMode)}
                                            className="absolute left-1/2 -translate-x-1/2 w-[50%] peer appearance-none rounded-md cursor-pointer"
                                        />
                                        <span className="min-w-48 flex items-center flex-shrink-0 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-black after:min-w-[45%] after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-[120%] group-hover:after:translate-x-1"></span>
                                        <div className="absolute flex justify-around min-w-48 ml-2">
                                            <div className="text-gray-500 font-bold select-none text-sm">Single</div>
                                            <div className="text-black font-bold text-sm select-none">Generate</div>
                                        </div>
                                    </label>
                                </div>

                                <div className="flex flex-row gap-5">
                                    <div className="flex-1 flex-shrink">
                                        <CustomTextField
                                            id="prefix-code"
                                            key={"prefix-code"}
                                            label={isGenerateMode ? "Prefix" : "Code"}
                                            onChange={(e) =>
                                                setFormValues({
                                                    ...formValues,
                                                    code: isGenerateMode ? undefined : e.target.value,
                                                    prefix: isGenerateMode ? e.target.value : undefined,
                                                })
                                            }
                                            required={!isGenerateMode}
                                        />
                                    </div>

                                    {isGenerateMode ? (
                                        <div className="flex-1 flex-shrink fade-in">
                                            <CustomTextField
                                                id="count"
                                                label="Count"
                                                min={0}
                                                max={100}
                                                type="number"
                                                required={true}
                                                onChange={(e) =>
                                                    setFormValues({ ...formValues, count: parseInt(e.target.value) })
                                                }
                                            />
                                        </div>
                                    ) : null}
                                </div>

                                <div className="flex flex-row gap-5">
                                    <div className="w-full z-50">
                                        <Dropdown
                                            direction="down"
                                            variant="secondary"
                                            onChange={(e) =>
                                                setFormValues({ ...formValues, discountType: e.value as DISCOUNT_TYPE })
                                            }
                                            data={[
                                                { value: DISCOUNT_TYPE.PERCENT, name: "Percentage" },
                                                { value: DISCOUNT_TYPE.FIXED, name: "Fixed" },
                                            ]}
                                        />
                                    </div>

                                    <div className="size-full">
                                        <div className="flex-1 flex-grow">
                                            <CustomTextField
                                                id="value"
                                                label="Value"
                                                min={formValues.discountType === DISCOUNT_TYPE.FIXED ? 1000 : 0}
                                                max={formValues.discountType === DISCOUNT_TYPE.FIXED ? 10000000 : 100}
                                                onChange={(e) =>
                                                    setFormValues({ ...formValues, value: parseInt(e.target.value) })
                                                }
                                                type="number"
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 flex-grow">
                                    <CustomTextField
                                        id="expirationDate"
                                        label="Expiration Date"
                                        type="datetime-local"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, expirationDate: new Date(e.target.value) })
                                        }
                                        required={true}
                                    />
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
