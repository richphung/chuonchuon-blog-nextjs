import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
