import { getRequestConfig } from 'next-intl/server';

// List of supported locales
export const locales = ['en', 'vi'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Since we're using setRequestLocale in layout, requestLocale will be set
  let locale = await requestLocale;
  
  // Fallback to default if not set
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

