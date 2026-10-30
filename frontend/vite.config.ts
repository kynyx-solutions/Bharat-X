import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    watch: {
      // The Express server is a separate process — don't page-reload on its edits.
      ignored: ["**/server/**"],
    },
  },
  build: {
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        // Rollup pulls a manual chunk's unassigned dependencies into that chunk. React's `scheduler` (a dependency
        // of r3f's reconciler) used to land in the r3f chunk, so react-dom imported it from there and every page
        // preloaded three + r3f (~300 KB gz). Giving React its own chunk keeps the 3D chunks lazy.
        manualChunks(id) {
          if (/\/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(id)) return "react";
          if (id.includes("/node_modules/three/")) return "three";
          if (id.includes("/node_modules/@react-three/")) return "r3f";
          if (id.includes("/node_modules/framer-motion/") || id.includes("/node_modules/motion-")) return "motion";
        },
      },
    },
  },
});
