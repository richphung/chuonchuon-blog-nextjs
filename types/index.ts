// Blog post types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  readTime: string;
  image?: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

// Portfolio types
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  client: string;
  results: string;
  date: string;
  featured: boolean;
}

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  category: string;
  featured: boolean;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  date: string;
}

// About types
export interface AboutContent {
  name: string;
  tagline: string;
  bio: string;
  experience: string;
  approach: string;
  image: string;
  email: string;
  social: {
    linkedin: string;
    upwork: string;
    trello: string;
  };
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Search types
export interface SearchResult {
  type: 'post' | 'portfolio' | 'service';
  title: string;
  excerpt: string;
  href: string;
  category?: string;
  date?: string;
}

// Common props
export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Content management types
export interface ContentFile {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url: string;
  type: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}
