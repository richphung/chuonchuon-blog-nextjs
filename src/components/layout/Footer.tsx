import React from 'react';
import Link from 'next/link';
import { Linkedin, Mail, ExternalLink } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
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
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Dang Thi Quynh Huong
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Professional copywriter and content creator helping businesses turn ideas into words that convert.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
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
              {navigation.main.map((item) => (
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
              Get In Touch
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Ready to transform your content?</p>
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
              © 2024 Dang Thi Quynh Huong. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
