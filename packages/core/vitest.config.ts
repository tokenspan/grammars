import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import * as dotenv from 'dotenv'

export default defineConfig({
  root: '.',
  esbuild: {
    tsconfigRaw: '{}',
  },
  test: {
    clearMocks: true,
    globals: true,
    env: dotenv.config({ path: '../../.env' }).parsed,
  },
  resolve: {
    alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
  },
})
