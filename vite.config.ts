import path from "path";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
// @ts-expect-error - no TS types yet for beta test.
import PluginObject from "babel-plugin-react-compiler";

import { defineConfig } from "vite";

export default defineConfig({
    plugins: [TanStackRouterVite(), [PluginObject], react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/image": {
                target: "http://localhost:4000",
                changeOrigin: true,
            },
        },
    },
});
