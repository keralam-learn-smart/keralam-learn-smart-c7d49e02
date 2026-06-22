import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ml" | "hi" | "ta";

const LANG_VALUES: readonly Lang[] = ["en", "ml", "hi", "ta"] as const;

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
];

type SiteCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  dark: boolean;
  setDark: (d: boolean) => void;
  toggleDark: () => void;
  t: (s: { en: string; ml: string }) => string;
};

const Ctx = createContext<SiteCtx | null>(null);

const LANG_KEY = "krm_lang";
const DARK_KEY = "krm_dark";

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [dark, setDarkState] = useState<boolean>(false);

  // Hydrate from localStorage on mount (avoid SSR mismatch).
  useEffect(() => {
    try {
      const l = window.localStorage.getItem(LANG_KEY);
      if (l && (LANG_VALUES as readonly string[]).includes(l)) setLangState(l as Lang);
      const d = window.localStorage.getItem(DARK_KEY);
      const prefers =
        d === "1" ||
        (d === null &&
          window.matchMedia?.("(prefers-color-scheme: dark)").matches);
      setDarkState(!!prefers);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      window.localStorage.setItem(DARK_KEY, dark ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [dark]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<SiteCtx>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "en" ? "ml" : "en"),
      dark,
      setDark: setDarkState,
      toggleDark: () => setDarkState((d) => !d),
      t: (s) => (lang === "ml" ? s.ml : s.en),
    }),
    [lang, setLang, dark],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}