import { useState } from "react";
import BaseModal from "./BaseModal";
import { toast } from "react-toastify";
import useUserActions from "@/hooks/Admin/Users/useUserActions";

import type { GetUserById } from "@/apis/users";
import type { QueryObserverResult } from "@tanstack/react-query";
import { isValidImage } from "@/utils/isValidImageFile";

type Props = {
    userId: string;
    isShowing: boolean;
    hide: () => void;
    refetch: () => Promise<QueryObserverResult<GetUserById, Error>>;
};

export default function EditAvatarModal(props: Props) {
    const [file, setFile] = useState<File | null>(null);
    const { updateAvatarAction } = useUserActions();

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

        const files = e.dataTransfer.files;
        if (files && files.length > 0 && isValidImage(files[0])) setFile(files[0]);
        else toast.error("Invalid file format", { toastId: "invalid-file-format" });
    };

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0 && isValidImage(files[0])) setFile(files[0]);
        else toast.error("Invalid file format", { toastId: "invalid-file-format" });
    }

    async function handleSubmit() {
        if (!file) return;

        await updateAvatarAction.mutateAsync({ _id: props.userId, avatar: file });

        setFile(null);
        props.hide();
        await props.refetch();
        toast.success("Avatar updated successfully", { toastId: "update-avatar" });
    }

    return (
        <BaseModal
            isShowing={props.isShowing}
            hide={props.hide}
            title="Change Avatar"
            builder={() => {
                return (
                    <>
                        <div className="flex flex-col gap-4 border-b border-gray-600 p-4 md:p-5">
                            {file ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-4 items-center">
                                        <div className="size-32">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="Avatar"
                                                className="w-full h-full object-contain rounded-full"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-sm font-bold w-[150px] truncate">{file.name}</div>
                                            <div className="text-sm">{file.size} bytes</div>
                                        </div>
                                        <button className="cursor-pointer" onClick={() => setFile(null)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full">
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
                            )}
                        </div>
                        <div className="flex flex-row gap-5 p-4 md:p-5">
                            <div
                                className="w-full bg-black font-bold text-center select-none text-white p-3 rounded-md active:scale-90 transition-all duration-75"
                                onClick={handleSubmit}
                            >
                                Upload
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
