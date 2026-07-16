"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import id from "@/messages/id.json";
import en from "@/messages/en.json";

type Locale = "id" | "en";

const translations = { id, en } as const;

type TranslationKeys = typeof id;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");

  const value = {
    locale,
    setLocale: useCallback((l: Locale) => setLocale(l), []),
    t: translations[locale],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
