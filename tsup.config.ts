import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Mark framework deps as external so the lib never tries to bundle them
  external: [
    'react',
    'react-dom',
    'clsx',
    'next',
    'next/*',
  ],
});