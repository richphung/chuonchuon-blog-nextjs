'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalePreference, getBrowserLocale } from '@/lib/locale-storage';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Check for saved preference first
    const savedLocale = getLocalePreference();
    
    if (savedLocale && ['en', 'vi'].includes(savedLocale)) {
      router.replace(`/${savedLocale}`);
      return;
    }
    
    // Detect browser language
    const browserLang = getBrowserLocale();
    const supportedLocales = ['en', 'vi'];
    const locale = supportedLocales.includes(browserLang) ? browserLang : 'en';
    
    // Redirect to appropriate locale
    router.replace(`/${locale}`);
  }, [router]);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Loading...</p>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
          Redirecting to your language
        </p>
      </div>
    </div>
  );
}

