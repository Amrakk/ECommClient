/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT: number;
    readonly VITE_API_URL: string;

    readonly VITE_DEFAULT_AVATAR_URL: string;
    readonly VITE_DEFAULT_PRODUCT_IMAGE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
