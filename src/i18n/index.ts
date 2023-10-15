import { createI18n } from "vue-i18n";
import Languages from "./languages";

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: Languages,
});
