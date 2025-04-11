
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    // Set a specific chunk size to avoid memory issues
    chunkSizeWarningLimit: 1000,
    // More conservative settings to avoid memory problems
    sourcemap: false,
    // Adjust build options to reduce memory usage
    minify: 'terser',
    terserOptions: {
      compress: {
        // Reduce optimization passes
        passes: 1
      }
    }
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
