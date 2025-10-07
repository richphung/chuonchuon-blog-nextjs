'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales } from '../../i18n';
import { saveLocalePreference } from '@/lib/locale-storage';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const switchLocale = (newLocale: string) => {
    // Save preference
    saveLocalePreference(newLocale);
    
    // Replace current locale in path with new locale
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace locale (first segment after /)
    const newPath = segments.join('/');
    
    router.push(newPath);
  };
  
  return (
    <div className="flex gap-2 items-center">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === locale 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={`Switch to ${locale.toUpperCase()}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

