import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  build: {
    // Memory-optimized build configuration
    minify: 'esbuild', // Using esbuild instead of terser (less memory intensive)
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Set lower memory usage thresholds
    assetsInlineLimit: 2048, // Lower threshold for inlining assets as base64
    cssCodeSplit: true, // Split CSS into smaller chunks
    target: 'es2018', // Target more widely supported JS version
    // Additional memory optimizations
    emptyOutDir: true,
    reportCompressedSize: false // Skip size reporting to reduce memory usage
  },
  optimizeDeps: {
    // Be explicit about dependencies to optimize
    include: ['react', 'react-dom'],
    exclude: ['@capacitor/core']
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      // Optimize HMR to use less memory
      overlay: false
    }
  },
  plugins: [
    react({
      // Fixed plugin options to match the expected types
      tsDecorators: false,
      jsxImportSource: undefined,
      plugins: []
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
