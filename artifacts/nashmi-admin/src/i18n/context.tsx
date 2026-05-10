import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import ar from "./ar";
import en from "./en";

type Lang = "ar" | "en";
type Translations = Record<string, string>;

interface LangContextType {
  lang: Lang;
  t: (key: string) => string;
  setLang: (l: Lang) => void;
  dir: "rtl" | "ltr";
}

const translations: Record<Lang, Translations> = { ar, en };

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("admin_lang") as Lang) || "ar";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("admin_lang", l);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key: string): string => {
    return translations[lang][key] ?? key;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, t, setLang, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be inside LanguageProvider");
  return ctx;
}