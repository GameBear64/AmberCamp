import { fileURLToPath, URL } from 'node:url';
import { createLogger, defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

import react from '@vitejs/plugin-react-swc';

const logger = createLogger();
const originalWarning = logger.warn;
logger.warn = (msg, options) => {
  // console.log(msg);

  if (
    msg.includes('import(import.meta.url).then(currentExports =>') &&
    msg.includes('The above dynamic import cannot be analyzed by Vite.')
  )
    return;
  originalWarning(msg, options);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],
  customLogger: logger,
  resolve: {
    alias: {
      '@layout': fileURLToPath(new URL('./src/components/Layout/Layout', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@form': fileURLToPath(new URL('./src/components/Form', import.meta.url)),
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
