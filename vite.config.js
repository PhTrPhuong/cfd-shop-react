import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import jsconfigPath from "vite-jsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), jsconfigPath()],
    // --add config resolve alias--
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
