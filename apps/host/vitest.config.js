import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    alias: {
      'budgT/app': path.resolve(__dirname, '../remotes/budgT/src/app.js'),
      'splittR/app': path.resolve(__dirname, '../remotes/splittR/src/app.js'),
    },
  },
});
