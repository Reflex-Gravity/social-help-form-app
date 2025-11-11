import { defineConfig, loadEnv } from 'vite';
import { cwd } from 'node:process';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '');
  return {
    plugins: [react({ include: /\.(js|jsx|ts|tsx)$/ }), tailwindcss()],
    define: {
      'import.meta.env.SERVER_URL': JSON.stringify(env.SERVER_URL),
    },
    server: {
      port: Number(env.CLIENT_PORT) || 5173,
    },
    test: {
      environment: 'jsdom',
      setupFiles: './test/setupTests.js',
      include: ['test/**/*.test.{js,jsx}'],
      css: true,
      esbuild: {
        loader: 'jsx',
        include: [/test\/.*\.js$/],
        jsx: 'automatic',
      },
    },
  };
});
