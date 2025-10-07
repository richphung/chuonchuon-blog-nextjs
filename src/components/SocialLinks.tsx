'use client';

import { Linkedin, Mail, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  variant?: 'default' | 'footer' | 'hero';
}

export function SocialLinks({ 
  className = '', 
  iconClassName = '',
  variant = 'default' 
}: SocialLinksProps) {
  const variants = {
    default: 'text-gray-400 hover:text-primary-600',
    footer: 'text-primary-100 hover:text-white',
    hero: 'text-gray-500 hover:text-primary-500',
  };

  const linkClass = variants[variant];

  return (
    <div className={cn('flex space-x-6', className)}>
      <a
        href={SOCIAL_LINKS.linkedin}
        className={cn(linkClass, 'transition-colors duration-200')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
      >
        <Linkedin className={cn('h-6 w-6', iconClassName)} />
      </a>
      <a
        href={SOCIAL_LINKS.upwork}
        className={cn(linkClass, 'transition-colors duration-200')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Upwork Profile"
      >
        <ExternalLink className={cn('h-6 w-6', iconClassName)} />
      </a>
      <a
        href={SOCIAL_LINKS.email}
        className={cn(linkClass, 'transition-colors duration-200')}
        aria-label="Email Contact"
      >
        <Mail className={cn('h-6 w-6', iconClassName)} />
      </a>
    </div>
  );
}

