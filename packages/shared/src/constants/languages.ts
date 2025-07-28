export const SUPPORTED_LANGUAGES = {
  ES: 'es',
  EN: 'en',
} as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES];

export const LANGUAGE_NAMES = {
  [SUPPORTED_LANGUAGES.ES]: 'Español',
  [SUPPORTED_LANGUAGES.EN]: 'English',
} as const;

export const LANGUAGE_FLAGS = {
  [SUPPORTED_LANGUAGES.ES]: '🇪🇸',
  [SUPPORTED_LANGUAGES.EN]: '🇺🇸',
} as const;

export const DEFAULT_LANGUAGE: SupportedLanguage = SUPPORTED_LANGUAGES.ES;
