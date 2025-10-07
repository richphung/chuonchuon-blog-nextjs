'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tContact = useTranslations('contact.info');

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('portfolio'), href: `/${locale}/portfolio` },
    { name: t('services'), href: `/${locale}/services` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  const social = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/dangquynhhuong',
      icon: Linkedin,
    },
    {
      name: 'Upwork',
      href: 'https://upwork.com/freelancers/dangquynhhuong',
      icon: ExternalLink,
    },
    {
      name: 'Email',
      href: 'mailto:contact@dangquynhhuong.com',
      icon: Mail,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary-100 via-accent-lavender-light to-primary-200 border-t-2 border-primary-400 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Dang Thi Quynh Huong
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {tFooter('builtWith')}
            </p>
            <div className="flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-primary-600 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tContact('title')}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{tContact('subtitle')}</p>
              <p>
                <a
                  href="mailto:contact@dangquynhhuong.com"
                  className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                >
                  contact@dangquynhhuong.com
                </a>
              </p>
              <p>Available for new projects</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              {tFooter('copyright', { year: currentYear })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
