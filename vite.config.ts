import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import {resolve} from "path";

export default defineConfig({
    resolve: {
        alias: [
            {
                find: "~/src", replacement: resolve(__dirname, "src")
            },
            {
                find: "~/components",
                replacement: resolve(__dirname, "src/components"),
            },
            {
                find: "~/config",
                replacement: resolve(__dirname, "src/config"),
            },
            {
                find: "~/context",
                replacement: resolve(__dirname, "src/context"),
            },
            {
                find: "~/hooks",
                replacement: resolve(__dirname, "src/hooks"),
            },
            {
                find: "~/images",
                replacement: resolve(__dirname, "src/images"),
            },
            {
                find: "~/pages",
                replacement: resolve(__dirname, "src/pages"),
            },

        ],
    },
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    server: {
        port: 3323,
    },
});