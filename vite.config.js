import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // 避免出现两份 React
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    }
  },
  // 本地联调时，顺便把 /coze 代理到你的 8888，避免 CORS
  server: {
    proxy: {
      '/coze': {
        target: 'http://52.224.246.19:8888',
        changeOrigin: true,
        ws: true,
        rewrite: p => p.replace(/^\/coze/, '')
      }
    }
  }
})
