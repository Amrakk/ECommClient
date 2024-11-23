import { IMAGE_EXTENSIONS } from "@/constants";

export function isValidImageFile(file: File) {
    const ext = file.name.split(".").pop();
    if (ext && !IMAGE_EXTENSIONS.includes(ext.toLowerCase())) {
        return false;
    }
    return true;
}
