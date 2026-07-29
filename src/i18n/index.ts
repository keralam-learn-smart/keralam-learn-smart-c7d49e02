import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ml from "./locales/ml.json";

export const resources = { en: { translation: en }, ml: { translation: ml } } as const;
export const supportedLngs = ["ml", "en"] as const;

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      supportedLngs: [...supportedLngs],
      fallbackLng: "ml",
      lng: "ml",
      defaultNS: "translation",
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        lookupLocalStorage: "krm_lang",
        caches: ["localStorage"],
      },
      react: { useSuspense: false },
    } as Parameters<typeof i18n.init>[0] & Record<string, unknown>);
}

export default i18n;
