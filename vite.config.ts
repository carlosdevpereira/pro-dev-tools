import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@electron": path.resolve(__dirname, "electron"),
    },
  },
  plugins: [
    vue(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: "electron/main.ts",
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, "electron/preload.ts"),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
    UnoCSS(),
    Components({
      resolvers: [IconsResolver()],
      dts: false,
    }),
    Icons({
      autoInstall: true,
    }),
  ],
});
