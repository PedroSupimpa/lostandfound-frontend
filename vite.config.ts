import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { tempo } from "tempo-devtools/dist/vite"; // Import tempo plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tempo()], // Add tempo plugin
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
});
