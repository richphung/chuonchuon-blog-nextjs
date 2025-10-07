// Locale storage utilities for remembering user's language preference

export function saveLocalePreference(locale: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('preferred-locale', locale);
    } catch (error) {
      console.warn('Failed to save locale preference:', error);
    }
  }
}

export function getLocalePreference(): string | null {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('preferred-locale');
    } catch (error) {
      console.warn('Failed to read locale preference:', error);
      return null;
    }
  }
  return null;
}

export function getBrowserLocale(): string {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    return browserLang;
  }
  return 'en';
}

