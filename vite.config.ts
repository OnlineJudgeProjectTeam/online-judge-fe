import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://10.19.134.21:8070",
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, ""), //重写路径,替换/api
        secure: false,
      },
    },
  },
});
