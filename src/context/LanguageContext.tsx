import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  TRANSLATIONS,
  type Language,
  type Translations,
} from '../i18n/translations';

const STORAGE_KEY = 'car-garage-lang';
const DEFAULT_LANGUAGE: Language = 'bg';

interface LanguageContextValue {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function readStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'bg' || stored === 'en' ? stored : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (lang: Language) => setLanguageState(lang),
    [],
  );
  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'bg' ? 'en' : 'bg'));
  }, []);

  const value = useMemo(
    () => ({
      language,
      t: TRANSLATIONS[language],
      toggleLanguage,
      setLanguage,
    }),
    [language, toggleLanguage, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
