import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import type { Language, Localized } from "../data/site";

type LabContext = {
  lang: Language;
  toggleLanguage: () => void;
  t: (zh: string, en: string) => string;
  l: (value: Localized) => string;
  notify: (message: string) => void;
};
const Context = createContext<LabContext | null>(null);
export function LabProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    try {
      return localStorage.getItem("mci-language") === "en" ? "en" : "zh";
    } catch {
      return "zh";
    }
  });
  const [message, setMessage] = useState("");
  const notify = useCallback((text: string) => setMessage(text), []);
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem("mci-language", lang);
    } catch {
      /* Browsing without storage remains supported. */
    }
  }, [lang]);
  const value = useMemo(
    () => ({
      lang,
      toggleLanguage: () =>
        setLang((current) => (current === "zh" ? "en" : "zh")),
      t: (zh: string, en: string) => (lang === "zh" ? zh : en),
      l: (item: Localized) => item[lang],
      notify,
    }),
    [lang, notify],
  );
  return (
    <Context.Provider value={value}>
      {children}
      <div
        className={`toast ${message ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </Context.Provider>
  );
}
export function useLab() {
  const context = useContext(Context);
  if (!context) throw new Error("LabProvider is required");
  return context;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
