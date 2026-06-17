"use client";

import { languageLabels, type Language } from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

const languages: Language[] = ["gr", "en"];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-aegean-900/10 bg-white p-1 shadow-sm" aria-label="Language switcher">
      {languages.map((item) => {
        const active = language === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setLanguage(item)}
            className={`min-h-8 rounded-full px-3 text-xs font-extrabold transition ${
              active && item === "gr"
                ? "bg-aegean-700 text-white"
                : active
                  ? "border border-aegean-700 bg-white text-aegean-700"
                  : "text-aegean-950/45 hover:text-aegean-700"
            }`}
          >
            {languageLabels[item]}
          </button>
        );
      })}
    </div>
  );
}
