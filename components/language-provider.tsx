"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { defaultLanguage, type Language, translateText, translations } from "@/lib/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const storageKey = "santorini-live-language";

const reverseGreek = new Map(
  Object.entries(translations.gr).map(([english, greek]) => [greek, english]),
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "gr" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "gr" ? "el" : "en";
    window.localStorage.setItem(storageKey, language);
    translateDocument(language);
    const observer = new MutationObserver(() => translateDocument(language));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: setLanguageState,
    t: (text: string) => translateText(text, language),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

function translateDocument(language: Language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
      if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) {
    const current = node.textContent ?? "";
    const trimmed = current.trim();
    const english = reverseGreek.get(trimmed) ?? trimmed;
    const translated = language === "gr" ? translateText(english, "gr") : english;
    if (translated !== trimmed) {
      node.textContent = current.replace(trimmed, translated);
    }
  }

  document.querySelectorAll<HTMLElement>("[placeholder]").forEach((element) => {
    const current = element.getAttribute("placeholder") ?? "";
    const english = reverseGreek.get(current) ?? current;
    element.setAttribute("placeholder", language === "gr" ? translateText(english, "gr") : english);
  });
}
