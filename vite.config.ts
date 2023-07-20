import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
import sassDts from 'vite-plugin-sass-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    libCss(),
    sassDts(),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/components/EventManager/EventManager.tsx',
      name: 'EventManager',
      fileName: (format) => `event-manager.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
