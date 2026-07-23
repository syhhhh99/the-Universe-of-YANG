import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // 使用 @ 统一表示 src，避免深层组件中出现难以维护的相对路径。
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
