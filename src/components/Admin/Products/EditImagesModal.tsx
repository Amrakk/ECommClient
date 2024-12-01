import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseModal from "@/components/Shared/BaseModal";
import { isValidImage } from "@/utils/isValidImageFile";
import useProductActions from "@/hooks/Admin/Products/useProductActions";

import type { GetProductByIdResponse } from "@/apis/products";
import type { QueryObserverResult } from "@tanstack/react-query";
import CustomTextField from "@/components/Shared/CustomTextField";

type Props = {
    productId: string;
    images: string[];
    isShowing: boolean;
    hide: () => void;
    refetch: () => Promise<QueryObserverResult<GetProductByIdResponse, Error>>;
};

export default function EditImagesModal(props: Props) {
    const { images } = props;
    const [files, setFiles] = useState<(File | string)[]>([...images]);
    const { updateImageAction, updateAction } = useProductActions();

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const uploadingFiles = e.dataTransfer.files;

        if (uploadingFiles && uploadingFiles.length > 0 && [...uploadingFiles].every((file) => isValidImage(file)))
            setFiles([...uploadingFiles, ...files]);
        else toast.error("Invalid files format", { toastId: "invalid-files-format" });
    };

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const uploadingFiles = e.target.files;
        if (uploadingFiles && uploadingFiles.length > 0 && [...uploadingFiles].every((file) => isValidImage(file)))
            setFiles([...uploadingFiles, ...files]);
        else toast.error("Invalid files format", { toastId: "invalid-files-format" });
    }

    async function handleUrl(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.key === "Enter") {
            const value = e.currentTarget.value;

            if (!isValidImage(value)) {
                toast.error("Invalid URL format", { toastId: "invalid-url-format" });
                return;
            }

            setFiles([value, ...files]);
            e.currentTarget.value = "";
        }
    }

    async function handleSubmit() {
        if (!files || files.length === 0) return;

        const orderedImages: string[] = [];

        for (const file of files) {
            if (typeof file === "string") orderedImages.push(file);
            else {
                const response = await updateImageAction.mutateAsync({
                    _id: props.productId,
                    image: file,
                });
                orderedImages.push(response.url);
            }
        }

        const data = { images: orderedImages };
        await updateAction.mutateAsync({ _id: props.productId, data });

        setFiles([]);
        props.hide();
        await props.refetch();
        toast.success("Images updated successfully", { toastId: "update-avatar" });
    }

    async function handleDeleteImage(index: number) {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    }

    useEffect(() => {
        setFiles([...images]);
    }, []);

    return (
        <BaseModal
            isShowing={props.isShowing}
            hide={props.hide}
            width="65%"
            title="Edit Product Images"
            builder={() => {
                return (
                    <>
                        <div className="flex flex-col gap-4 border-b border-gray-600 p-4 md:p-5">
                            {/* Display Existing Images */}
                            <div className="flex flex-wrap gap-3 p-4">
                                {files.length > 0 ? (
                                    files.map((img, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                                                alt={`Image ${index}`}
                                                className="size-32 object-cover rounded-md"
                                            />
                                            <button
                                                className="absolute top-1 right-1 hover:scale-110 text-red-500 p-1 rounded-full"
                                                onClick={() => handleDeleteImage(index)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={4}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 w-full">No images</div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 items-center justify-center w-full">
                                <div className="w-[50%] ml-auto">
                                    <CustomTextField
                                        id="image-url"
                                        label="Image URL"
                                        type="text"
                                        onKeyDown={handleUrl}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                <label htmlFor="dropzone-file" className="w-full flex-1">
                                    <div
                                        className={`flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer transition-all relative ${
                                            isDragging
                                                ? "bg-blue-50 text-blue-500 border-blue-400"
                                                : "hover:bg-blue-50 hover:text-blue-500 hover:border-blue-400 border-gray-300 text-gray-500 bg-gray-50"
                                        }`}
                                    >
                                        <div
                                            className="absolute bg-transparent size-full"
                                            onDragOver={(e) => handleDragOver(e)}
                                            onDragEnter={(e) => handleDragEnter(e)}
                                            onDragLeave={(e) => handleDragLeave(e)}
                                            onDrop={(e) => handleDrop(e)}
                                        ></div>
                                        <svg
                                            className="w-8 h-8 mb-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs">PNG, JPG or JPEG</p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 p-4 md:p-5">
                            <div
                                className="w-full bg-black font-bold text-center select-none text-white p-3 rounded-md active:scale-90 transition-all duration-75"
                                onClick={handleSubmit}
                            >
                                Save
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
    );
}
