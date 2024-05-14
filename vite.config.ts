import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1235,
  },
  root: "./",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
});
