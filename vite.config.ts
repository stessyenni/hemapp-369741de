
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    // Extreme memory optimization
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    minify: 'terser',
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    terserOptions: {
      compress: {
        passes: 1,
        drop_console: true,
        drop_debugger: true,
        ecma: 5,
        keep_infinity: false,
        collapse_vars: false
      },
      mangle: {
        safari10: true,
        keep_classnames: false,
        keep_fnames: false,
        toplevel: true
      },
      format: {
        comments: false,
        ecma: 5
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('radix')) return 'vendor-radix';
            if (id.includes('tanstack')) return 'vendor-tanstack';
            return 'vendor-other';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    target: 'es2015'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@capacitor/core']
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
