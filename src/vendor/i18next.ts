type Dict = Record<string, unknown>;
type InitOptions = {
  resources?: Record<string, { translation: Dict }>;
  fallbackLng?: string;
  lng?: string;
};

const getPath = (obj: Dict, path: string): string => {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return (acc as Dict)[key];
    return undefined;
  }, obj);
  return typeof value === "string" ? value : path;
};

const i18n = {
  isInitialized: false,
  language: "ml",
  fallbackLng: "ml",
  resources: {} as Record<string, { translation: Dict }>,
  listeners: new Set<() => void>(),
  use(_plugin?: unknown) {
    return this;
  },
  init(options: InitOptions) {
    this.resources = options.resources ?? this.resources;
    this.fallbackLng = options.fallbackLng ?? "ml";
    this.language = options.lng ?? this.language ?? this.fallbackLng;
    this.isInitialized = true;
    return Promise.resolve(this);
  },
  changeLanguage(lng: string) {
    this.language = lng;
    this.listeners.forEach((listener) => listener());
    return Promise.resolve(this);
  },
  t(key: string) {
    return getPath(
      this.resources[this.language]?.translation ??
        this.resources[this.fallbackLng]?.translation ??
        {},
      key,
    );
  },
  on(event: string, listener: () => void) {
    if (event === "languageChanged") this.listeners.add(listener);
  },
  off(event: string, listener: () => void) {
    if (event === "languageChanged") this.listeners.delete(listener);
  },
};

export default i18n;
