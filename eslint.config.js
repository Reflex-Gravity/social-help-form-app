import { defineConfig } from 'eslint/config';
import myconfig from './client/eslint.config.js';

export default defineConfig([
  {
    files: ['./client/**/*.{js,jsx}'],
    extends: [myconfig],
  },
]);
