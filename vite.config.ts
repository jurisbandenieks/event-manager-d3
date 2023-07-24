import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
import sassDts from 'vite-plugin-sass-dts'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    libCss(),
    sassDts(),
    svgr(),
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
