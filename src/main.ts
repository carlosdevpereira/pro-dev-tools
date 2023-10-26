import { createApp } from "vue";
import { useElectronBridge } from "./composables/useElectronBridge";
import App from "./App.vue";
import I18nPlugin from "./i18n";
import RouterPlugin from "./router";
import "virtual:uno.css";
import "./style.css";

const electronBridge = useElectronBridge();

createApp(App)
  .use(I18nPlugin)
  .use(RouterPlugin)
  .mount("#app")
  .$nextTick(() => {
    electronBridge.sendMessage("remove-loading");
  });
