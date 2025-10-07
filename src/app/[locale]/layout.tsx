import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Dang Thi Quynh Huong - Professional Copywriter & Content Creator",
  description: "Professional copywriter and content creator helping businesses turn ideas into words that convert. Specializing in blog writing, website copy, email marketing, and more.",
  keywords: ["copywriter", "content writer", "blog writing", "website copy", "email marketing", "content strategy"],
  authors: [{ name: "Dang Thi Quynh Huong" }],
  creator: "Dang Thi Quynh Huong",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dangquynhhuong.com",
    title: "Dang Thi Quynh Huong - Professional Copywriter & Content Creator",
    description: "Professional copywriter and content creator helping businesses turn ideas into words that convert.",
    siteName: "Dang Thi Quynh Huong",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dang Thi Quynh Huong - Professional Copywriter & Content Creator",
    description: "Professional copywriter and content creator helping businesses turn ideas into words that convert.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  // Enable static rendering (required when not using middleware)
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

