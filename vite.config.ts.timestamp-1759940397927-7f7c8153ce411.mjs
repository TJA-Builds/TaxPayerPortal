// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react({
    fastRefresh: true,
    jsxRuntime: "classic",
    babel: {
      plugins: [
        ["@babel/plugin-transform-react-jsx", { runtime: "classic" }]
      ]
    }
  })],
  server: {
    hmr: {
      ignored: ["**/forced/**"],
      protocol: "ws"
    }
  },
  build: {
    sourcemap: false,
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: void 0
      }
    }
  },
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCh7XG4gICAgZmFzdFJlZnJlc2g6IHRydWUsXG4gICAganN4UnVudGltZTogJ2NsYXNzaWMnLCBcbiAgICBiYWJlbDoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBbJ0BiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeCcsIHsgcnVudGltZTogJ2NsYXNzaWMnIH1dXG4gICAgICBdXG4gICAgfVxuICB9KV0sXG4gIHNlcnZlcjoge1xuICAgIGhtcjoge1xuICAgICAgaWdub3JlZDogW1wiKiovZm9yY2VkLyoqXCJdLFxuICAgICAgcHJvdG9jb2w6ICd3cydcbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBtaW5pZnk6IHRydWUsXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIGpzeEZhY3Rvcnk6ICdSZWFjdC5jcmVhdGVFbGVtZW50JyxcbiAgICBqc3hGcmFnbWVudDogJ1JlYWN0LkZyYWdtZW50J1xuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTTtBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLFFBQ1AsQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLFVBQVUsQ0FBQztBQUFBLE1BQzlEO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQyxDQUFDO0FBQUEsRUFDRixRQUFRO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxTQUFTLENBQUMsY0FBYztBQUFBLE1BQ3hCLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxFQUNmO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
