import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages specific configuration
  basePath: process.env.NODE_ENV === 'production' ? '/chuonchuon-blog-nextjs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/chuonchuon-blog-nextjs' : '',
};

export default withNextIntl(nextConfig);