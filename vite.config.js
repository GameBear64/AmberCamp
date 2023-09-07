import { fileURLToPath, URL } from 'node:url';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';
import { createLogger, defineConfig } from 'vite';

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
  plugins: [react(), reactScopedCssPlugin({ styleFileSuffix: 'style', hashPrefix: 'style', styleFileExtensions: ['scss'] })],
  customLogger: logger,
  resolve: {
    alias: {
      '@layout': fileURLToPath(new URL('./src/components/Layout/Layout', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@form': fileURLToPath(new URL('./src/components/Form/Form', import.meta.url)),
      '@form-inputs': fileURLToPath(new URL('./src/components/Form/FormInputs', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
});
