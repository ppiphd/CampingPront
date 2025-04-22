import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    minify: true,
    minifySyntax: true,
  },
  plugins: [vue()],
  logLevel: "silent",
  server: {
    proxy: {
      "/me": {
        target: "https://openapi.naver.com/v1/nid", //이 주소로 바꿔줘
        changeOrigin: true, //나를 바꾼다
        rewrite: path => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
      B551011: {
        target: "https://apis.data.go.kr",
        changeOrigin: true, //나를 바꾼다
        rewrite: path => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
    },
  },
  define: {
    "process.env": {},
  },
});
