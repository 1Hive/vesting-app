// vite.config.ts
import { resolve } from "path";
import reactPlugin from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";
import { viteExternalsPlugin } from "vite-plugin-externals";
import tsconfigPaths from "vite-tsconfig-paths";
var isDev = process.env.ENVIRONMENT === "DEVELOPMENT";
console.log("env.dev:", process.env.ENVIRONMENT, " isDev:", isDev);
var externals = {
  http: "http-browserify",
  https: "http-browserify",
  timers: "timers-browserify",
  electron: "electron",
  "electron-fetch": "electron-fetch"
};
var nodeShims = {
  util: "util"
};
var externalPlugin = viteExternalsPlugin({
  ...externals,
  ...isDev ? { ...nodeShims } : {}
});
var excludeDeps = ["@apollo/client", `graphql`, "electron", "electron-fetch"];
var vite_config_default = defineConfig({
  plugins: [reactPlugin(), macrosPlugin(), tsconfigPaths(), externalPlugin],
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: /node_modules/,
      transformMixedEsModules: true
    },
    rollupOptions: {
      input: {
        main: resolve("/home/ubuntu/1Hive/scaffold-eth-typescript/packages/vite-app-ts", "index.html")
      }
    }
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import {jsx, css} from '@emotion/react'`
  },
  define: {},
  optimizeDeps: {
    exclude: excludeDeps,
    include: ["eth-hooks", "eth-components"]
  },
  resolve: {
    preserveSymlinks: true,
    mainFields: ["module", "main", "browser"],
    alias: {
      "~~": resolve("/home/ubuntu/1Hive/scaffold-eth-typescript/packages/vite-app-ts", "src"),
      ...externals,
      ...nodeShims,
      process: "process",
      stream: "stream-browserify"
    }
  },
  server: {
    watch: {
      followSymlinks: true
    },
    fs: {
      allow: ["../../"]
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IHJlYWN0UGx1Z2luIGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuLy8gaW1wb3J0IHJlYWN0UmVmcmVzaCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1yZWZyZXNoJztcbmltcG9ydCBtYWNyb3NQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tYmFiZWwtbWFjcm9zJztcbmltcG9ydCB7IHZpdGVFeHRlcm5hbHNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1leHRlcm5hbHMnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuRU5WSVJPTk1FTlQgPT09ICdERVZFTE9QTUVOVCc7XG5jb25zb2xlLmxvZygnZW52LmRldjonLCBwcm9jZXNzLmVudi5FTlZJUk9OTUVOVCwgJyBpc0RldjonLCBpc0Rldik7XG5cbi8qKlxuICogYnJvd3NlcmlmeSBmb3Igd2ViMyBjb21wb25lbnRzXG4gKi9cbmNvbnN0IGV4dGVybmFscyA9IHtcbiAgaHR0cDogJ2h0dHAtYnJvd3NlcmlmeScsXG4gIGh0dHBzOiAnaHR0cC1icm93c2VyaWZ5JyxcbiAgdGltZXJzOiAndGltZXJzLWJyb3dzZXJpZnknLFxuICBlbGVjdHJvbjogJ2VsZWN0cm9uJyxcbiAgJ2VsZWN0cm9uLWZldGNoJzogJ2VsZWN0cm9uLWZldGNoJyxcbn07XG5cbmNvbnN0IG5vZGVTaGltcyA9IHtcbiAgdXRpbDogJ3V0aWwnLFxufTtcblxuLyoqXG4gKiBFeHRlcm5hbHM6XG4gKiAtIG5vZGUgZXh0ZXJuYWxzIGFyZSByZXF1aXJlZCBiZWNhdXNlIHdlYjMgYXJlIHRlcnJpYmx5IGJ1bmRsZWQgYW5kIHNvbWUgb2YgdGhlbSB1c2UgY29tbW9uanMgbGlicmFyaWVzLiAgbW9kZXJuIGxpYnMgbGlrZSBldGhlcnMgaGVscCB3aXRoIHRoaXMuXG4gKiAtIGVsZWN0cm9uOiAgYWRkZWQgZHVlIHRvIGlwZnMtaHR0cC1jbGllbnQuICBpdCBoYXMgdmVyeSBwb29yIGVzbSBjb21wYXRpYmlsaXR5IGFuZCBhIHRvbiBvZiBkZXBlbmRlbmN5IGJ1Z3MuIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2lwZnMvanMtaXBmcy9pc3N1ZXMvMzQ1MlxuICovXG5jb25zdCBleHRlcm5hbFBsdWdpbiA9IHZpdGVFeHRlcm5hbHNQbHVnaW4oe1xuICAuLi5leHRlcm5hbHMsXG4gIC4uLihpc0RldiA/IHsgLi4ubm9kZVNoaW1zIH0gOiB7fSksXG59KTtcblxuLyoqXG4gKiBUaGVzZSBsaWJyYXJpZXMgc2hvdWxkIG5vdCBiZSBlZ2FybHkgYnVuZGxlZCBieSB2aXRlLiAgVGhleSBoYXZlIHN0cmFuZ2UgZGVwZW5kZW5jaWVzIGFuZCBhcmUgbm90IG5lZWRlZCBmb3IgdGhlIGFwcC5cbiAqL1xuY29uc3QgZXhjbHVkZURlcHMgPSBbJ0BhcG9sbG8vY2xpZW50JywgYGdyYXBocWxgLCAnZWxlY3Ryb24nLCAnZWxlY3Ryb24tZmV0Y2gnXTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0UGx1Z2luKCksIG1hY3Jvc1BsdWdpbigpLCB0c2NvbmZpZ1BhdGhzKCksIGV4dGVybmFsUGx1Z2luXSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgY29tbW9uanNPcHRpb25zOiB7XG4gICAgICBpbmNsdWRlOiAvbm9kZV9tb2R1bGVzLyxcbiAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWFpbjogcmVzb2x2ZShcIi9ob21lL3VidW50dS8xSGl2ZS9zY2FmZm9sZC1ldGgtdHlwZXNjcmlwdC9wYWNrYWdlcy92aXRlLWFwcC10c1wiLCAnaW5kZXguaHRtbCcpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBlc2J1aWxkOiB7XG4gICAganN4RmFjdG9yeTogJ2pzeCcsXG4gICAganN4SW5qZWN0OiBgaW1wb3J0IHtqc3gsIGNzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnYCxcbiAgfSxcbiAgZGVmaW5lOiB7fSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogZXhjbHVkZURlcHMsXG4gICAgaW5jbHVkZTogWydldGgtaG9va3MnLCAnZXRoLWNvbXBvbmVudHMnXSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXG4gICAgbWFpbkZpZWxkczogWydtb2R1bGUnLCAnbWFpbicsICdicm93c2VyJ10sXG4gICAgYWxpYXM6IHtcbiAgICAgICd+fic6IHJlc29sdmUoXCIvaG9tZS91YnVudHUvMUhpdmUvc2NhZmZvbGQtZXRoLXR5cGVzY3JpcHQvcGFja2FnZXMvdml0ZS1hcHAtdHNcIiwgJ3NyYycpLFxuICAgICAgLi4uZXh0ZXJuYWxzLFxuICAgICAgLi4ubm9kZVNoaW1zLFxuICAgICAgcHJvY2VzczogJ3Byb2Nlc3MnLFxuICAgICAgc3RyZWFtOiAnc3RyZWFtLWJyb3dzZXJpZnknLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHdhdGNoOiB7XG4gICAgICBmb2xsb3dTeW1saW5rczogdHJ1ZSxcbiAgICB9LFxuICAgIGZzOiB7XG4gICAgICAvLyBjb21wYXRhYmlsaXR5IGZvciB5YXJuIHdvcmtzcGFjZXNcbiAgICAgIGFsbG93OiBbJy4uLy4uLyddLFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQSxJQUFNLFFBQVEsUUFBUSxJQUFJLGdCQUFnQjtBQUMxQyxRQUFRLElBQUksWUFBWSxRQUFRLElBQUksYUFBYSxXQUFXO0FBSzVELElBQU0sWUFBWTtBQUFBLEVBQ2hCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFVBQVU7QUFBQSxFQUNWLGtCQUFrQjtBQUFBO0FBR3BCLElBQU0sWUFBWTtBQUFBLEVBQ2hCLE1BQU07QUFBQTtBQVFSLElBQU0saUJBQWlCLG9CQUFvQjtBQUFBLEtBQ3RDO0FBQUEsS0FDQyxRQUFRLEtBQUssY0FBYztBQUFBO0FBTWpDLElBQU0sY0FBYyxDQUFDLGtCQUFrQixXQUFXLFlBQVk7QUFFOUQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLGVBQWUsZ0JBQWdCLGlCQUFpQjtBQUFBLEVBQzFELE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGlCQUFpQjtBQUFBLE1BQ2YsU0FBUztBQUFBLE1BQ1QseUJBQXlCO0FBQUE7QUFBQSxJQUUzQixlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxNQUFNLFFBQVEsbUVBQW1FO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJdkYsU0FBUztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBO0FBQUEsRUFFYixRQUFRO0FBQUEsRUFDUixjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsSUFDVCxTQUFTLENBQUMsYUFBYTtBQUFBO0FBQUEsRUFFekIsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsSUFDbEIsWUFBWSxDQUFDLFVBQVUsUUFBUTtBQUFBLElBQy9CLE9BQU87QUFBQSxNQUNMLE1BQU0sUUFBUSxtRUFBbUU7QUFBQSxTQUM5RTtBQUFBLFNBQ0E7QUFBQSxNQUNILFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQTtBQUFBO0FBQUEsRUFHWixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxnQkFBZ0I7QUFBQTtBQUFBLElBRWxCLElBQUk7QUFBQSxNQUVGLE9BQU8sQ0FBQztBQUFBO0FBQUE7QUFBQSxFQUdaLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLG1CQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
