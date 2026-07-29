import { useSyncExternalStore } from "react";
import i18n from "i18next";

export const initReactI18next = { type: "3rdParty", init: () => undefined };

export function useTranslation() {
  useSyncExternalStore(
    (callback) => {
      i18n.on("languageChanged", callback);
      return () => i18n.off("languageChanged", callback);
    },
    () => i18n.language,
    () => i18n.language,
  );

  return { t: (key: string) => i18n.t(key), i18n };
}
