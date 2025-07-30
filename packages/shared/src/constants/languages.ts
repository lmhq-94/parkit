export const SUPPORTED_LANGUAGES = {
  ES: 'es',
  EN: 'en',
  // Futuros idiomas
  // FR: 'fr',
  // PT: 'pt',
  // DE: 'de',
} as const;

export type SupportedLanguage =
  (typeof SUPPORTED_LANGUAGES)[keyof typeof SUPPORTED_LANGUAGES];

export const LANGUAGE_NAMES = {
  [SUPPORTED_LANGUAGES.ES]: 'Español',
  [SUPPORTED_LANGUAGES.EN]: 'English',
  // Futuros idiomas
  // [SUPPORTED_LANGUAGES.FR]: 'Français',
  // [SUPPORTED_LANGUAGES.PT]: 'Português',
  // [SUPPORTED_LANGUAGES.DE]: 'Deutsch',
} as const;

export const LANGUAGE_FLAGS = {
  [SUPPORTED_LANGUAGES.ES]: '🇪🇸',
  [SUPPORTED_LANGUAGES.EN]: '🇺🇸',
  // Futuros idiomas
  // [SUPPORTED_LANGUAGES.FR]: '🇫🇷',
  // [SUPPORTED_LANGUAGES.PT]: '🇵🇹',
  // [SUPPORTED_LANGUAGES.DE]: '🇩🇪',
} as const;

export const LANGUAGE_CODES = {
  [SUPPORTED_LANGUAGES.ES]: 'es-ES',
  [SUPPORTED_LANGUAGES.EN]: 'en-US',
  // Futuros idiomas
  // [SUPPORTED_LANGUAGES.FR]: 'fr-FR',
  // [SUPPORTED_LANGUAGES.PT]: 'pt-BR',
  // [SUPPORTED_LANGUAGES.DE]: 'de-DE',
} as const;

export const LANGUAGE_DIRECTIONS = {
  [SUPPORTED_LANGUAGES.ES]: 'ltr',
  [SUPPORTED_LANGUAGES.EN]: 'ltr',
  // Futuros idiomas
  // [SUPPORTED_LANGUAGES.FR]: 'ltr',
  // [SUPPORTED_LANGUAGES.PT]: 'ltr',
  // [SUPPORTED_LANGUAGES.DE]: 'ltr',
} as const;

export const DEFAULT_LANGUAGE: SupportedLanguage = SUPPORTED_LANGUAGES.ES;

// Configuración de idiomas para el menú
export const LANGUAGE_CONFIG = {
  [SUPPORTED_LANGUAGES.ES]: {
    name: LANGUAGE_NAMES[SUPPORTED_LANGUAGES.ES],
    flag: LANGUAGE_FLAGS[SUPPORTED_LANGUAGES.ES],
    code: LANGUAGE_CODES[SUPPORTED_LANGUAGES.ES],
    direction: LANGUAGE_DIRECTIONS[SUPPORTED_LANGUAGES.ES],
    nativeName: 'Español',
  },
  [SUPPORTED_LANGUAGES.EN]: {
    name: LANGUAGE_NAMES[SUPPORTED_LANGUAGES.EN],
    flag: LANGUAGE_FLAGS[SUPPORTED_LANGUAGES.EN],
    code: LANGUAGE_CODES[SUPPORTED_LANGUAGES.EN],
    direction: LANGUAGE_DIRECTIONS[SUPPORTED_LANGUAGES.EN],
    nativeName: 'English',
  },
} as const;

// Helper functions
export function getLanguageConfig(language: SupportedLanguage) {
  return LANGUAGE_CONFIG[language];
}

export function getLanguageName(language: SupportedLanguage) {
  return LANGUAGE_NAMES[language];
}

export function getLanguageFlag(language: SupportedLanguage) {
  return LANGUAGE_FLAGS[language];
}

export function getLanguageCode(language: SupportedLanguage) {
  return LANGUAGE_CODES[language];
}

export function getLanguageDirection(language: SupportedLanguage) {
  return LANGUAGE_DIRECTIONS[language];
}

export function isSupportedLanguage(
  language: string
): language is SupportedLanguage {
  return Object.values(SUPPORTED_LANGUAGES).includes(
    language as SupportedLanguage
  );
}
