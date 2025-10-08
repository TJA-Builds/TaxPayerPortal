import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    fastRefresh: true,
    jsxRuntime: 'classic', 
    babel: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]
      ]
    }
  })],
  server: {
    hmr: {
      ignored: ["**/forced/**"],
      protocol: 'ws'
    }
  },
  build: {
    sourcemap: false,
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  }
});