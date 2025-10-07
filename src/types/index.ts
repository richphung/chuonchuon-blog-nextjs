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
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  content?: string;
  client?: string;
  results?: string;
  timeline?: string;
  skills?: string[];
  date?: string;
  featured?: boolean;
}

// Service types
export interface Service {
  slug: string;
  title: string;
  description: string;
  features?: string[];
  price?: string;
  category?: string;
  featured?: boolean;
  content?: string;
  deliveryTime?: string;
  icon?: string;
}

// Testimonial types
export interface Testimonial {
  author: string;
  role: string;
  quote: string;
  avatar?: string;
}

// About types
export interface AboutContent {
  name: string;
  tagline: string;
  introduction?: string;
  bio: string;
  image?: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    years: string;
    description?: string;
  }[];
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
  frontmatter: Record<string, unknown>;
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
