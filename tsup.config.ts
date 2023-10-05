import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: true,
  minify: 'terser',
  sourcemap: false,
  clean: true,
})
