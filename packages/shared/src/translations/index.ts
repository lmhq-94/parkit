import { SupportedLanguage } from '../constants/languages';
import { en } from './en';
import { es } from './es';

export const translations = {
  es,
  en,
} as const;

export type TranslationKey = string;

// Type for nested translation objects
type NestedTranslation = {
  [key: string]: string | NestedTranslation;
};

// Get translation with fallback
export function getTranslation(
  language: SupportedLanguage,
  key: string,
  fallbackLanguage: SupportedLanguage = 'es'
): string {
  const translation = translations[language];
  const fallbackTranslation = translations[fallbackLanguage];

  if (!translation) {
    console.warn(`Translation not found for language: ${language}`);
    return getTranslationFromObject(fallbackTranslation, key) || key;
  }

  const result = getTranslationFromObject(translation, key);
  if (result) {
    return result;
  }

  // Try fallback language
  if (fallbackTranslation && language !== fallbackLanguage) {
    const fallbackResult = getTranslationFromObject(fallbackTranslation, key);
    if (fallbackResult) {
      console.warn(
        `Translation key not found in ${language}, using ${fallbackLanguage}: ${key}`
      );
      return fallbackResult;
    }
  }

  console.warn(`Translation key not found: ${key} for language: ${language}`);
  return key;
}

// Helper function to get translation from nested object
function getTranslationFromObject(
  translation: NestedTranslation,
  key: string
): string | null {
  // Handle nested keys with dot notation (e.g., "navigation.dashboard")
  const keys = key.split('.');
  let value: any = translation;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return null;
    }
  }

  return typeof value === 'string' ? value : null;
}

// Get translation with parameters
export function getTranslationWithParams(
  language: SupportedLanguage,
  key: string,
  params: Record<string, string | number>,
  fallbackLanguage: SupportedLanguage = 'es'
): string {
  let translation = getTranslation(language, key, fallbackLanguage);

  // Replace parameters in translation
  Object.entries(params).forEach(([param, value]) => {
    translation = translation.replace(
      new RegExp(`{{${param}}}`, 'g'),
      String(value)
    );
  });

  return translation;
}

// Get all translations for a specific key across all languages
export function getAllTranslations(
  key: string
): Record<SupportedLanguage, string> {
  const result: Record<SupportedLanguage, string> = {} as Record<
    SupportedLanguage,
    string
  >;

  Object.keys(translations).forEach(lang => {
    const language = lang as SupportedLanguage;
    result[language] = getTranslation(language, key);
  });

  return result;
}

// Check if a translation key exists
export function hasTranslation(
  language: SupportedLanguage,
  key: string
): boolean {
  const translation = translations[language];
  if (!translation) {
    return false;
  }

  return getTranslationFromObject(translation, key) !== null;
}

// Get all available translation keys
export function getAllTranslationKeys(): string[] {
  const keys: string[] = [];

  function extractKeys(obj: any, prefix: string = '') {
    Object.keys(obj).forEach(key => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'string') {
        keys.push(fullKey);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        extractKeys(obj[key], fullKey);
      }
    });
  }

  // Use the first available translation as reference
  const firstTranslation = Object.values(translations)[0];
  if (firstTranslation) {
    extractKeys(firstTranslation);
  }

  return keys;
}

// Validate translations completeness
export function validateTranslations(): {
  missing: Record<SupportedLanguage, string[]>;
  total: number;
} {
  const allKeys = getAllTranslationKeys();
  const missing: Record<SupportedLanguage, string[]> = {} as Record<
    SupportedLanguage,
    string[]
  >;

  Object.keys(translations).forEach(lang => {
    const language = lang as SupportedLanguage;
    missing[language] = [];

    allKeys.forEach(key => {
      if (!hasTranslation(language, key)) {
        missing[language].push(key);
      }
    });
  });

  return {
    missing,
    total: allKeys.length,
  };
}

// Export translations for direct access
export { en, es };
