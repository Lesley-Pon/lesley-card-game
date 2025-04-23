import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.', // 告訴 Vite 專案根目錄是這個資料夾
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html', // 明確指定 index.html 的位置
    },
  },
})
