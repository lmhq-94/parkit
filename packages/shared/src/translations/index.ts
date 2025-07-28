import { SupportedLanguage } from '../constants/languages';
import { en } from './en';
import { es } from './es';

export const translations = {
  es,
  en,
} as const;

export type TranslationKey = string;

export function getTranslation(
  language: SupportedLanguage,
  key: string
): string {
  const translation = translations[language];
  if (!translation) {
    console.warn(`Translation not found for language: ${language}`);
    return key;
  }

  // Handle nested keys with dot notation (e.g., "navigation.dashboard")
  const keys = key.split('.');
  let value: any = translation;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key} for language: ${language}`);
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

export function getTranslationWithParams(
  language: SupportedLanguage,
  key: string,
  params: Record<string, string | number>
): string {
  let translation = getTranslation(language, key);

  // Replace parameters in translation
  Object.entries(params).forEach(([param, value]) => {
    translation = translation.replace(
      new RegExp(`{{${param}}}`, 'g'),
      String(value)
    );
  });

  return translation;
}
