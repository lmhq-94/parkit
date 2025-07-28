import {
  DEFAULT_LANGUAGE,
  getTranslation,
  getTranslationWithParams,
  SupportedLanguage,
  TranslationKey,
} from '@parkit/shared';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] =
    useState<SupportedLanguage>(DEFAULT_LANGUAGE);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      'parkit-language'
    ) as SupportedLanguage;
    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLanguage = navigator.language.split('-')[0];
      if (browserLanguage === 'en') {
        setLanguageState('en');
      } else {
        setLanguageState('es');
      }
    }
  }, []);

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
    localStorage.setItem('parkit-language', newLanguage);

    // Update document language
    document.documentElement.lang = newLanguage;
  };

  const t = (
    key: TranslationKey,
    params?: Record<string, string | number>
  ): string => {
    if (params) {
      return getTranslationWithParams(language, key, params);
    }
    return getTranslation(language, key);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
