import { createLogger, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css'

const logger = createLogger();
const originalWarning = logger.warn;
logger.warn = (msg, options) => {
  // console.log(msg);

  if (
    msg.includes('import(import.meta.url).then(currentExports =>') &&
    msg.includes('The above dynamic import cannot be analyzed by Vite.')
  ) return;
  originalWarning(msg, options);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactScopedCssPlugin({ styleFileSuffix: 'style', hashPrefix: 'style', styleFileExtensions: ['scss'] })],
  customLogger: logger,
})
