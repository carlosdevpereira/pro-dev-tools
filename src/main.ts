import { createApp } from "vue";
import App from "./App.vue";
import I18nPlugin from "./i18n";
import "virtual:uno.css";
import "./style.css";

createApp(App)
  .use(I18nPlugin)
  .mount("#app")
  .$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: "removeLoading" }, "*");

    // Use contextBridge
    window.ipcRenderer.on("main-process-message", (_event, message) => {
      console.log(message);
    });
  });
