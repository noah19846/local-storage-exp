/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Configure Vitest (https://vitest.dev/config/)
  test: {
    environment: 'jsdom'
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'localStorageExpirable',
      fileName: 'index'
    },
    sourcemap: true
  }
})
