import { defineConfig } from 'eslint/config';
import myconfig from './client/eslint.config.js';

export default defineConfig([
  {
    files: ['**/*.{js,jsx}'],
    extends: [myconfig],
  },
]);
