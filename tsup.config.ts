import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  target: 'es2022',
  // Don't bundle host-app deps
  external: [
    'react',
    'react-dom',
    // mark any `next` import external (next/link, next/navigation, etc.)
    /^next(\/.*)?$/,
  ],
  esbuildOptions(options) {
    options.platform = 'browser';
  },
});