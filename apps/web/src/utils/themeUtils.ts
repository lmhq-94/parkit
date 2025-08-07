// Theme utility functions for managing theme state and preferences

/**
 * Detects user's preferred color scheme from system settings
 * @returns 'light' | 'dark' based on system preference
 */
export const detectSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

/**
 * Detects user's preferred language from browser settings
 * @returns language code (e.g., 'es', 'en')
 */
export const detectSystemLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return navigator.language.split('-')[0];
  }
  return 'es';
};

/**
 * Saves theme preference to localStorage
 * @param theme - Theme mode to save
 */
export const saveThemePreference = (theme: 'light' | 'dark'): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('parkit-theme', theme);
  }
};

/**
 * Retrieves saved theme preference from localStorage
 * @returns saved theme or null if not found
 */
export const getSavedThemePreference = (): 'light' | 'dark' | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('parkit-theme') as 'light' | 'dark' | null;
  }
  return null;
};

/**
 * Saves language preference to localStorage
 * @param language - Language code to save
 */
export const saveLanguagePreference = (language: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('parkit-language', language);
  }
};

/**
 * Retrieves saved language preference from localStorage
 * @returns saved language or null if not found
 */
export const getSavedLanguagePreference = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('parkit-language');
  }
  return null;
};

/**
 * Gets the initial theme based on saved preference or system preference
 * @returns initial theme mode
 */
export const getInitialTheme = (): 'light' | 'dark' => {
  const savedTheme = getSavedThemePreference();
  if (savedTheme) {
    return savedTheme;
  }
  return detectSystemTheme();
};

/**
 * Gets the initial language based on saved preference or system preference
 * @returns initial language code
 */
export const getInitialLanguage = (): string => {
  const savedLanguage = getSavedLanguagePreference();
  if (savedLanguage) {
    return savedLanguage;
  }
  return detectSystemLanguage();
};

/**
 * Applies theme to document body for CSS custom properties
 * @param theme - Theme mode to apply
 */
export const applyThemeToBody = (theme: 'light' | 'dark'): void => {
  if (typeof document !== 'undefined') {
    document.body.setAttribute('data-theme', theme);
  }
};

/**
 * Smooth scroll utility function
 * @param elementId - ID of element to scroll to
 * @param offset - Optional offset from top
 */
export const smoothScrollTo = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
};

/**
 * Debounce utility function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle utility function
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Checks if element is in viewport
 * @param element - Element to check
 * @returns boolean indicating if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Formats phone number for display
 * @param phoneNumber - Raw phone number
 * @returns formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format as (+506) 6216-4040
  if (cleaned.length === 11 && cleaned.startsWith('506')) {
    return `(+506) ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  
  return phoneNumber;
};

/**
 * Validates email format
 * @param email - Email to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a unique ID
 * @returns unique ID string
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
}; 