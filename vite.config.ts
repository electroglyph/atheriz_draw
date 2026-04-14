import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';

export default defineConfig({
  base: '/atheriz_draw/',
  plugins: [viteSingleFile()],
  resolve: {
    alias: {
      '@xterm/headless': path.resolve(__dirname, 'node_modules/@xterm/headless/lib-headless/xterm-headless.mjs'),
    },
  },
  optimizeDeps: {
    exclude: ['chafa-wasm'],
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 100_000_000,
  },
});
