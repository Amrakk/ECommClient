import { useEffect, useState } from "react";
import { PRODUCT_CATEGORY } from "@/constants";
import { IProductVariant } from "@/models/product";
import BaseModal from "@/components/Shared/BaseModal";
import useProducts from "@/hooks/Admin/Products/useProducts";
import useProductActions from "@/hooks/Admin/Products/useProductActions";
import { toast } from "react-toastify";
import CustomTextField from "@/components/Shared/CustomTextField";
import Dropdown from "@/components/Shared/Dropdown";
import useBrands from "@/hooks/Admin/Products/useBrands";

type Props = { isShowing: boolean; hide: () => void };

type FormValues = {
    name?: string;
    description?: string;
    category: PRODUCT_CATEGORY;
    brand?: string;
    details: { [key: string]: string };
    tags: string[];
};

export default function InsertModal(props: Props) {
    const brands = useBrands();
    const products = useProducts();
    const { insertAction } = useProductActions();

    const [curTag, setCurTag] = useState<string | undefined>(undefined);
    const [curVariant, setCurVariant] = useState<Partial<IProductVariant>>({ quantity: 0 });
    const [curDetail, setCurDetail] = useState<{ key: string; value: string } | undefined>(undefined);
    const [formValues, setFormValues] = useState<FormValues>({
        category: PRODUCT_CATEGORY.OTHERS,
        details: {},
        tags: [],
    });

    if (insertAction.error) {
        const path = (insertAction.error as any).error[0].path[0]?.toLowerCase() as string;
        toast.error(`Invalid ${path.slice(0, 1).toUpperCase() + path.slice(1)}`, {
            toastId: "insert-product",
        });
    }

    function onDetailSubmit(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.key === "Enter") {
            setFormValues({
                ...formValues,
                details: {
                    ...formValues.details,
                    [curDetail?.key || ""]: curDetail?.value || "",
                },
            });
            setCurDetail(undefined);

            document.getElementById("detailKey")?.focus();
            (document.getElementById("detailKey") as HTMLInputElement).value = "";
            (document.getElementById("detailValue") as HTMLInputElement).value = "";
        }
    }

    async function handleSubmit() {
        const showError = (message: string) => {
            toast.error(message, { toastId: "insert-user" });
        };

        if (!formValues.name) {
            showError("Name is required");
            return;
        }
        if (!formValues.description) {
            showError("Description is required");
            return;
        }
        if (!formValues.brand) {
            showError("Brand is required");
            return;
        }

        if (!curVariant.id) {
            showError("Variant Id is required");
            return;
        }
        if (!curVariant.importPrice) {
            showError("Import Price is required");
            return;
        }
        if (!curVariant.retailPrice) {
            showError("Retail Price is required");
            return;
        }

        const variant = {
            id: curVariant.id,
            quantity: curVariant.quantity ?? 0,
            importPrice: curVariant.importPrice,
            retailPrice: curVariant.retailPrice,
            details: {},
        };

        const data = {
            name: formValues.name,
            description: formValues.description,
            category: formValues.category,
            brand: formValues.brand,
            variants: [variant],
            details: formValues.details,
            tags: formValues.tags,
        };

        await insertAction.mutateAsync(data);

        props.hide();
        await Promise.all([brands.refetch(), products.refetch()]);
        toast.success("Product created successfully", { toastId: "insert-product" });
    }

    useEffect(() => {
        if (curTag && curTag.trim().length > 0 && !formValues.tags.includes(curTag)) {
            setFormValues({ ...formValues, tags: [curTag, ...formValues.tags] });
            setCurTag(undefined);
        }
    }, [curTag]);

    useEffect(() => {
        setFormValues({
            category: PRODUCT_CATEGORY.OTHERS,
            details: {},
            tags: [],
        });
        setCurVariant({ quantity: 0 });
    }, [props.isShowing]);

    return (
        <>
            <BaseModal
                isShowing={props.isShowing}
                hide={props.hide}
                title="Create"
                width="65%"
                builder={() => {
                    return (
                        <>
                            <div className="flex flex-row gap-4 border-b border-gray-600 p-4 md:p-5">
                                <div className="flex flex-col gap-4 w-[50%] pr-4 border-r-2">
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
                                                id="description"
                                                type="textarea"
                                                rows={6}
                                                key={"description"}
                                                label={"Description"}
                                                onChange={(e) =>
                                                    setFormValues({
                                                        ...formValues,
                                                        description: e.target.value,
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
                                                    setFormValues({
                                                        ...formValues,
                                                        category: e.value as PRODUCT_CATEGORY,
                                                    })
                                                }
                                                data={[
                                                    { value: PRODUCT_CATEGORY.OTHERS, name: "Others" },
                                                    { value: PRODUCT_CATEGORY.HOME, name: "Home" },
                                                    { value: PRODUCT_CATEGORY.BOOKS, name: "Books" },
                                                    { value: PRODUCT_CATEGORY.SPORTS, name: "Sports" },
                                                    { value: PRODUCT_CATEGORY.ELECTRONICS, name: "Electronics" },
                                                ]}
                                            />
                                        </div>

                                        <div className="size-full">
                                            <div className="flex-1 flex-grow">
                                                <CustomTextField
                                                    id="brand"
                                                    label="Brand"
                                                    onChange={(e) =>
                                                        setFormValues({ ...formValues, brand: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-5">
                                        <div className="w-1/2">
                                            <CustomTextField
                                                id="tag"
                                                label="Tags"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        setCurTag(e.currentTarget.value);
                                                        e.currentTarget.value = "";
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="w-1/2 border-2 rounded-md p-2 overflow-x-auto h-[49.63px]">
                                            {formValues.tags.map((tag, index) => (
                                                <div className="inline-block mb-1.5 text-wrap max-w-[75%]">
                                                    <span
                                                        key={`tag-${index}`}
                                                        className="size-min bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded  border border-blue-400 flex gap-2 items-center select-none cursor-pointer fade-in"
                                                        onClick={() =>
                                                            setFormValues({
                                                                ...formValues,
                                                                tags: formValues.tags.filter((_, i) => i !== index),
                                                            })
                                                        }
                                                    >
                                                        <div className="max-w-[150px] overflow-hidden">{tag}</div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="size-3"
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
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 flex-grow">
                                    <div className="flex flex-row gap-4">
                                        <div className="flex-1 flex-grow">
                                            <CustomTextField
                                                id="variantId"
                                                label="Variant Id"
                                                onChange={(e) =>
                                                    setCurVariant({
                                                        ...curVariant,
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
                                                onChange={(e) =>
                                                    setCurVariant({
                                                        ...curVariant!,
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
                                                isCurrency={true}
                                                label="Import Price"
                                                onChange={(e) => {
                                                    setCurVariant({
                                                        ...curVariant,
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
                                                label=" Retail Price"
                                                onChange={(e) => {
                                                    setCurVariant({
                                                        ...curVariant,
                                                        retailPrice: parseInt(e.target.value),
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="size-full border-2 rounded-md relative mt-4">
                                        <div className="flex flex-row gap-4 p-4 pt-6">
                                            <div className="flex-1 flex-grow">
                                                <CustomTextField
                                                    id="detailKey"
                                                    label="Key"
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
                                                    id="detailValue"
                                                    label="Value"
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

                                        <div className="p-4 overflow-x-auto h-52">
                                            {formValues.details &&
                                                Object.entries(formValues.details).map(([key, value], index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-row gap-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer "
                                                        onClick={() =>
                                                            setFormValues({
                                                                ...formValues,
                                                                details: Object.fromEntries(
                                                                    Object.entries(formValues.details).filter(
                                                                        ([k]) => k !== key
                                                                    )
                                                                ),
                                                            })
                                                        }
                                                    >
                                                        <div className="flex-1 p-3">
                                                            <p className="text-base font-bold text-gray-800 truncate w-52">
                                                                {key}
                                                            </p>
                                                        </div>
                                                        <div className="flex-1 p-3">
                                                            <div className="flex justify-between items-center">
                                                                <p className="text-base text-gray-700 truncate w-52">
                                                                    {value}
                                                                </p>
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

                                        <div className="absolute text-sm text-gray-500 bg-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2">
                                            Details
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
