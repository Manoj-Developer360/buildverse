import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import stripDirectives from "./vite-plugin-strip-directives";
export default defineConfig({
    plugins: [
        react(),
        stripDirectives()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    assetsInclude: ['**/*.glb'],
    build: {
        chunkSizeWarningLimit: 100000000,
        rollupOptions: {
            onwarn: function (warning, warn) {
                var _a;
                // Ignore certain warnings
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
                    (warning.code === 'EVAL' && ((_a = warning.id) === null || _a === void 0 ? void 0 : _a.includes('lottie.js')))) {
                    return;
                }
                warn(warning);
            }
        }
    },
    server: {
        host: true,
    },
});
