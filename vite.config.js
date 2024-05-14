import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],
  resolve: {
    alias: {
      '@layout': fileURLToPath(new URL('./src/components/Layout/Layout', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@form': fileURLToPath(new URL('./src/components/Form', import.meta.url)),
      '@routers': fileURLToPath(new URL('./src/routers', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf('node_modules') !== -1) return id.toString().split('node_modules/')[1].split('/')[0].toString();
        },
      },
    },
  },
});
