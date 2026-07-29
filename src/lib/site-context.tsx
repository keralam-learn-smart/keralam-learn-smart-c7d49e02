import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import mlMessages from "@/locales/ml.json";
import enMessages from "@/locales/en.json";

export type Lang = "en" | "ml";

const LANG_VALUES: readonly Lang[] = ["en", "ml"] as const;

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "en", label: "English", native: "English" },
];

type TranslationValue = string | string[] | { [key: string]: TranslationValue };
type TranslationTree = { [key: string]: TranslationValue };

type SiteCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  dark: boolean;
  setDark: (d: boolean) => void;
  toggleDark: () => void;
  t: (s: { en: string; ml: string }) => string;
  tr: (key: string) => string;
  trArray: (key: string) => string[];
};

const Ctx = createContext<SiteCtx | null>(null);

const LANG_KEY = "krm_lang";
const DARK_KEY = "krm_dark";
const resources: Record<Lang, TranslationTree> = { ml: mlMessages, en: enMessages };

function getNested(lang: Lang, key: string): TranslationValue | undefined {
  return key.split(".").reduce<TranslationValue | undefined>((acc, part) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc) && part in acc) {
      return acc[part];
    }
    return undefined;
  }, resources[lang]);
}

function detectInitialLanguage(): Lang {
  if (typeof window === "undefined") return "ml";
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved && (LANG_VALUES as readonly string[]).includes(saved)) return saved as Lang;
    const browser = window.navigator.language.toLowerCase();
    return browser.startsWith("en") ? "en" : "ml";
  } catch {
    return "ml";
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ml");
  const [dark, setDarkState] = useState<boolean>(false);

  useEffect(() => {
    setLangState(detectInitialLanguage());
    try {
      const d = window.localStorage.getItem(DARK_KEY);
      const prefers =
        d === "1" || (d === null && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
      setDarkState(!!prefers);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(DARK_KEY, dark ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [dark, lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const tr = useCallback(
    (key: string) => {
      const value = getNested(lang, key) ?? getNested("ml", key) ?? getNested("en", key);
      return typeof value === "string" ? value : "";
    },
    [lang],
  );

  const trArray = useCallback(
    (key: string) => {
      const value = getNested(lang, key) ?? getNested("ml", key) ?? getNested("en", key);
      return Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string")
        : [];
    },
    [lang],
  );

  const value = useMemo<SiteCtx>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "en" ? "ml" : "en"),
      dark,
      setDark: setDarkState,
      toggleDark: () => setDarkState((d) => !d),
      t: (s) => (lang === "ml" ? s.ml : s.en),
      tr,
      trArray,
    }),
    [lang, setLang, dark, tr, trArray],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
