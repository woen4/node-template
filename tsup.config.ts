import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],

  minify: false,

  sourcemap: false,
  clean: true,
})
