import {
  DEFAULT_LANGUAGE,
  getTranslation,
  getTranslationWithParams,
  SupportedLanguage,
  TranslationKey,
} from '@parkit/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import React, {
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

  // Load language from AsyncStorage on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = (await AsyncStorage.getItem(
          'parkit-language'
        )) as SupportedLanguage;
        if (
          savedLanguage &&
          Object.values(SupportedLanguage).includes(savedLanguage)
        ) {
          setLanguageState(savedLanguage);
        } else {
          // Try to detect device language
          const deviceLanguage = Localization.locale?.split('-')[0] || 'en';
          if (deviceLanguage === 'en') {
            setLanguageState('en');
          } else {
            setLanguageState('es');
          }
        }
      } catch (error) {
        console.warn('Error loading language:', error);
        setLanguageState(DEFAULT_LANGUAGE);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (newLanguage: SupportedLanguage) => {
    try {
      setLanguageState(newLanguage);
      await AsyncStorage.setItem('parkit-language', newLanguage);
    } catch (error) {
      console.warn('Error saving language:', error);
    }
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
