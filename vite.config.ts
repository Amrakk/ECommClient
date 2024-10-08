import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }: { mode: string }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react()],
        server: {
            port: parseInt(process.env.VITE_PORT!),
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
    });
};
