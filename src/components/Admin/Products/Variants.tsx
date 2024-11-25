import { GetProductByIdResponse } from "@/apis/products";
import CustomTextField from "@/components/Shared/CustomTextField";
import useProductActions from "@/hooks/Admin/Products/useProductActions";
import { IProductVariant } from "@/models/product";
import { QueryObserverResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = {
    productId: string;
    variants: IProductVariant[];
    refetch: () => Promise<QueryObserverResult<GetProductByIdResponse, Error>>;
};

type FormValues = {
    id?: string;
    quantity?: number;
    importPrice?: number;
    retailPrice?: number;
    details: { [key: string]: string };
};

export default function Variants(props: Props) {
    const { variants } = props;
    const { updateAction } = useProductActions();

    const [formValues, setFormValues] = useState<FormValues>({ quantity: 0, details: {} });
    const [curDetail, setCurDetail] = useState<{ key: string; value: string } | undefined>(undefined);

    if (updateAction.error) {
        const path = (updateAction.error as any).error[0].path[0]?.toLowerCase() as string;
        toast.error(`Invalid ${path.slice(0, 1).toUpperCase() + path.slice(1)}`, {
            toastId: "update-user",
        });
    }

    function onDetailSubmit(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.key === "Enter") {
            setFormValues({
                ...formValues,
                details: {
                    [curDetail?.key || ""]: curDetail?.value || "",
                    ...formValues.details,
                },
            });
            setCurDetail(undefined);

            document.getElementById("variantDetailKey")?.focus();
            (document.getElementById("variantDetailKey") as HTMLInputElement).value = "";
            (document.getElementById("variantDetailValue") as HTMLInputElement).value = "";
        }
    }

    async function handleSubmit() {
        const showError = (message: string) => {
            toast.error(message, { toastId: "insert-variant" });
        };

        if (!formValues.id) {
            showError("Variant Id is required");
            return;
        }
        if (!formValues.importPrice) {
            showError("Import Price is required");
            return;
        }
        if (!formValues.retailPrice) {
            showError("Retail Price is required");
            return;
        }

        const variant = {
            id: formValues.id,
            quantity: formValues.quantity || 0,
            importPrice: formValues.importPrice,
            retailPrice: formValues.retailPrice,
            details: formValues.details,
        };

        const data = {
            variants: [variant, ...variants],
        };

        await updateAction.mutateAsync({ _id: props.productId, data });

        await props.refetch();
        setFormValues({ quantity: 0, details: {} });
        setCurDetail(undefined);
        toast.success("Variant created successfully", { toastId: "insert-variant" });
    }

    async function handleRemove(idx: number) {
        const data = {
            variants: variants.filter((_, index) => index !== idx),
        };

        await updateAction.mutateAsync({ _id: props.productId, data });

        await props.refetch();
        toast.success("Variant updated successfully", { toastId: "insert-variant" });
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Variants</h3>
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg shadow border border-gray-200 max-h-[550px]">
                    <div className="flex flex-row gap-4">
                        <div className="flex-1 flex-grow">
                            <CustomTextField
                                id="variantId"
                                label="Variant Id"
                                backgroundColor="bg-gray-50"
                                value={formValues.id ?? ""}
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        id: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex-1 flex-grow">
                            <CustomTextField
                                id="Quantity"
                                type="number"
                                min={0}
                                label="Quantity"
                                backgroundColor="bg-gray-50"
                                value={formValues.quantity ?? 0}
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        quantity: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-4">
                        <div className="flex-1 flex-grow">
                            <CustomTextField
                                id="importPrice"
                                type="text"
                                backgroundColor="bg-gray-50"
                                isCurrency={true}
                                value={
                                    formValues.importPrice
                                        ? formValues.importPrice.toLocaleString("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                          })
                                        : ""
                                }
                                label="Import Price"
                                onChange={(e) => {
                                    setFormValues({
                                        ...formValues,
                                        importPrice: parseInt(e.target.value.replace(/[^0-9]/g, "")),
                                    });
                                }}
                            />
                        </div>
                        <div className="flex-1 flex-grow">
                            <CustomTextField
                                id="retailPrice"
                                type="text"
                                isCurrency={true}
                                backgroundColor="bg-gray-50"
                                label=" Retail Price"
                                value={
                                    formValues.retailPrice
                                        ? formValues.retailPrice.toLocaleString("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                          })
                                        : ""
                                }
                                onChange={(e) => {
                                    setFormValues({
                                        ...formValues,
                                        retailPrice: parseInt(e.target.value.replace(/[^0-9]/g, "")),
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="size-full border-2 rounded-md relative mt-4">
                        <div className="flex flex-row gap-4 p-4 pt-6">
                            <div className="flex-1 flex-grow">
                                <CustomTextField
                                    id="variantDetailKey"
                                    label="Key"
                                    backgroundColor="bg-gray-50"
                                    value={curDetail?.key || ""}
                                    onChange={(e) =>
                                        setCurDetail({
                                            key: e.target.value,
                                            value: curDetail?.value || "",
                                        })
                                    }
                                />
                            </div>
                            <div className="flex-1 flex-grow">
                                <CustomTextField
                                    id="variantDetailValue"
                                    label="Value"
                                    value={curDetail?.value || ""}
                                    backgroundColor="bg-gray-50"
                                    onChange={(e) =>
                                        setCurDetail({
                                            key: curDetail?.key || "",
                                            value: e.target.value,
                                        })
                                    }
                                    onKeyDown={onDetailSubmit}
                                />
                            </div>
                        </div>

                        <div className="p-4 overflow-x-auto min-h-52 max-h-96">
                            {formValues.details &&
                                Object.entries(formValues.details).map(([key, value], index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row gap-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer "
                                        onClick={() =>
                                            setFormValues({
                                                ...formValues,
                                                details: Object.fromEntries(
                                                    Object.entries(formValues.details).filter(([k]) => k !== key)
                                                ),
                                            })
                                        }
                                    >
                                        <div className="flex-1 p-3">
                                            <p className="text-base font-bold text-gray-800 truncate w-32">{key}</p>
                                        </div>
                                        <div className="flex-1 p-3">
                                            <div className="flex justify-between items-center">
                                                <p className="text-base text-gray-700 truncate w-44">{value}</p>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-5 text-red-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="absolute text-sm text-gray-500 bg-gray-50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2">
                            Details
                        </div>
                    </div>

                    <button
                        className="w-full bg-black font-bold text-center select-none text-white p-3 rounded-md active:scale-90 transition-all duration-75"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>

                <div className="flex flex-row flex-wrap gap-6 col-span-2">
                    {variants.map((variant, idx) => (
                        <div
                            key={idx}
                            className="p-4 border border-gray-300 min-w-52 h-min rounded-lg bg-white shadow-sm hover:shadow-lg transition-all max-w-96"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Variant {idx + 1}</h3>
                                <button
                                    className="text-red-500 hover:text-red-600 hover:scale-110 transition-all"
                                    title="Remove Variant"
                                    onClick={() => handleRemove(idx)}
                                >
                                    <FaTimes size={18} />
                                </button>
                            </div>

                            {/* Variant Details */}
                            <div className="space-y-2">
                                <p className="text-gray-700 truncate">
                                    <span className="font-semibold text-gray-900 mr-3 text-base">ID:</span>
                                    {variant.id}
                                </p>
                                <p className="text-gray-700 truncate">
                                    <span className="font-semibold text-gray-900 mr-3 text-base">Quantity:</span>
                                    {variant.quantity}
                                </p>
                                <p className="text-gray-700 truncate">
                                    <span className="font-semibold text-gray-900 mr-3 text-base">Import Price:</span>
                                    {variant.importPrice.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                                <p className="text-gray-700 truncate">
                                    <span className="font-semibold text-gray-900 mr-3 text-base">Retail Price:</span>
                                    {variant.retailPrice.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>

                                {/* Details Section */}
                                {Object.keys(variant.details).length > 0 && (
                                    <div className="text-gray-700">
                                        <span className="font-semibold text-gray-900 block mb-2">Details:</span>
                                        <ul className="list-disc list-inside space-y-1">
                                            {Object.entries(variant.details)
                                                .slice(0, 6)
                                                .map(([key, value]) => (
                                                    <li key={key} className="truncate">
                                                        <span className="font-medium capitalize">{key}:</span> {value}
                                                    </li>
                                                ))}
                                        </ul>
                                        {Object.keys(variant.details).length > 6 && (
                                            <span className="text-gray-500">...and more</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
