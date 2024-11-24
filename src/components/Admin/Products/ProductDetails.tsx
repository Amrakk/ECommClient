import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Shared/Dropdown";
import type { ProductDetail } from "@/models/product";
import { GetProductByIdResponse } from "@/apis/products";
import type { QueryObserverResult } from "@tanstack/react-query";
import CustomTextField from "@/components/Shared/CustomTextField";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useProductActions from "@/hooks/Admin/Products/useProductActions";
import { DEFAULT_PRODUCT_IMAGE_URL, PRODUCT_CATEGORY } from "@/constants";

type Props = {
    product: ProductDetail;
    toggleImagesModal: () => void;
    refetch: () => Promise<QueryObserverResult<GetProductByIdResponse, Error>>;
};

type FormValues = {
    name: string;
    description: string;
    category: PRODUCT_CATEGORY;
    brand: string;
    details: { [key: string]: string };
    ratings: number;
    tags: string[];
};

export default function ProductDetails(props: Props) {
    const { product } = props;
    const { updateAction } = useProductActions();
    const [curImageIndex, setCurImageIndex] = useState<number>(0);

    const [curTag, setCurTag] = useState<string | undefined>(undefined);
    const [curDetail, setCurDetail] = useState<{ key: string; value: string } | undefined>(undefined);
    const [formValues, setFormValues] = useState<FormValues>({
        name: props.product.name,
        description: props.product.description,
        category: props.product.category,
        brand: props.product.brand,
        details: props.product.details,
        ratings: props.product.ratings,
        tags: props.product.tags,
    });

    if (updateAction.error) {
        const path = (updateAction.error as any).error[0].path[0]?.toLowerCase() as string;
        toast.error(`Invalid ${path.slice(0, 1).toUpperCase() + path.slice(1)}`, {
            toastId: "update-product",
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
        if (!formValues.ratings) {
            showError("Ratings is required");
            return;
        }
        const ratings = parseFloat(`${formValues.ratings}`);
        if (isNaN(ratings) || ratings < 0 || ratings > 5) {
            showError("Ratings must be between 0 and 5");
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

        const data = {
            name: formValues.name,
            description: formValues.description,
            category: formValues.category,
            brand: formValues.brand,
            details: formValues.details,
            tags: formValues.tags,
            ratings,
        };

        await updateAction.mutateAsync({ _id: props.product._id, data });

        props.refetch();
        toast.success("Product updated successfully", { toastId: "update-product" });
    }

    useEffect(() => {
        if (curTag && curTag.trim().length > 0 && !formValues.tags.includes(curTag)) {
            setFormValues({ ...formValues, tags: [curTag, ...formValues.tags] });
            setCurTag(undefined);
        }
    }, [curTag]);

    return (
        <div className=" bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-row">
                    {/* Images */}
                    <div className="bg-gray-200 rounded-md w-72 p-6">
                        <div className="relative size-48">
                            <div className="absolute flex justify-center size-60">
                                <button
                                    className="rounded-md p-1 h-60 hover:opacity-40 transition-opacity disabled:opacity-20"
                                    disabled={curImageIndex === 0}
                                    onClick={() => setCurImageIndex(curImageIndex - 1)}
                                >
                                    <IoIosArrowBack size={24} />
                                </button>
                                <div className="flex flex-col justify-center items-center size-full">
                                    <div className="size-52 bg-gray-50 justify-center flex rounded-md shadow-md overflow-hidden">
                                        <div
                                            className="flex h-full transition-all duration-300 ease-in-out"
                                            style={{ transform: `translateX(-${curImageIndex * 100}%)` }}
                                        >
                                            {product.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image || DEFAULT_PRODUCT_IMAGE_URL}
                                                    alt={`Product Image ${index + 1}`}
                                                    className="object-cover aspect-square"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-2">{`Total: ${product.images.length}`}</div>
                                </div>

                                <button
                                    className="rounded-md p-1 h-60 hover:opacity-40 transition-opacity disabled:opacity-20"
                                    onClick={() => {
                                        console.log(product.images.length);
                                        console.log(curImageIndex);
                                        if (curImageIndex < product.images.length - 1)
                                            setCurImageIndex(curImageIndex + 1);
                                    }}
                                    disabled={
                                        curImageIndex === (product.images.length === 0 ? 1 : product.images.length) - 1
                                    }
                                >
                                    <IoIosArrowForward size={24} />
                                </button>
                            </div>

                            <div
                                className="absolute bg-white rounded-full p-1 -right-10 -bottom-6 z-10 hover:scale-110"
                                onClick={props.toggleImagesModal}
                            >
                                <MdEdit
                                    className="text-gray-800 transition-all cursor-pointer hover:text-gray-900"
                                    size={18}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Details */}

                    <div className="w-[80%] p-6">
                        <div className="flex flex-row gap-4 p-4 md:p-5">
                            <div className="flex flex-col gap-4 w-[50%] pr-4 ">
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
                                            id="rating"
                                            type="number"
                                            key={"rating"}
                                            min={0}
                                            max={5}
                                            step={0.1}
                                            label={"Ratings"}
                                            value={`${formValues.ratings}`}
                                            onChange={(e) => {
                                                if (parseFloat(e.target.value) < 0) e.target.value = "0";
                                                else if (parseFloat(e.target.value) > 5) e.target.value = "5";
                                                else if (isNaN(parseFloat(e.target.value))) e.target.value = "0";

                                                setFormValues({
                                                    ...formValues,
                                                    ratings: parseFloat(e.target.value),
                                                });
                                            }}
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
                                            value={formValues.description}
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
                                    <div className="w-full z-10">
                                        <Dropdown
                                            direction="down"
                                            variant="secondary"
                                            maxHeight={150}
                                            selected={formValues.category}
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
                                                value={formValues.brand}
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
                                            <div
                                                key={`${tag}_${index}`}
                                                className="inline-block mb-1.5 text-wrap max-w-[75%]"
                                            >
                                                <span
                                                    key={`tag-${index}`}
                                                    className="size-min bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded  border border-blue-400 flex gap-2 items-center select-none cursor-pointer fade-in"
                                                    onClick={() =>
                                                        setFormValues({
                                                            ...formValues,
                                                            tags: formValues.tags.filter((_, i) => i !== index),
                                                        })
                                                    }
                                                >
                                                    <div className="max-w-[150px] overflow-hidden whitespace-nowrap">
                                                        {tag}
                                                    </div>
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
                                <div className="size-full border-2 rounded-md relative">
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

                        <div className="flex space-x-4 float-end p-3">
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
