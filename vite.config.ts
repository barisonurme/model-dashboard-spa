import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

import { name, version } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4080,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: `dist/${name}-${version}`,
  },
});
