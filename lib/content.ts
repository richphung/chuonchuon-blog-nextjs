import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, Category, PortfolioItem, Service, Testimonial, AboutContent } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

// Blog posts
export function getAllBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(contentDirectory, 'blog', 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...data,
      } as BlogPost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, 'blog', 'posts', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured).slice(0, 4);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(post => post.category === category);
}

// Categories
export function getAllCategories(): Category[] {
  const categoriesPath = path.join(contentDirectory, 'blog', 'categories');
  
  if (!fs.existsSync(categoriesPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(categoriesPath);
  return fileNames
    .filter((name) => name.endsWith('.json'))
    .map((fileName) => {
      const fullPath = path.join(categoriesPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(fileContents) as Category;
    });
}

export function getCategoryBySlug(slug: string): Category | null {
  try {
    const fullPath = path.join(contentDirectory, 'blog', 'categories', `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents) as Category;
  } catch (error) {
    return null;
  }
}

// Portfolio
export function getAllPortfolioItems(): PortfolioItem[] {
  const portfolioPath = path.join(contentDirectory, 'portfolio', 'writing-samples.json');
  
  if (!fs.existsSync(portfolioPath)) {
    return [];
  }

  try {
    const fileContents = fs.readFileSync(portfolioPath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.items || [];
  } catch (error) {
    return [];
  }
}

export function getFeaturedPortfolioItems(): PortfolioItem[] {
  return getAllPortfolioItems().filter(item => item.featured).slice(0, 6);
}

export function getPortfolioItemsByCategory(category: string): PortfolioItem[] {
  return getAllPortfolioItems().filter(item => item.category === category);
}

// Services
export function getAllServices(): Service[] {
  const servicesPath = path.join(contentDirectory, 'services', 'services-list.json');
  
  if (!fs.existsSync(servicesPath)) {
    return [];
  }

  try {
    const fileContents = fs.readFileSync(servicesPath, 'utf8');
    return JSON.parse(fileContents) as Service[];
  } catch (error) {
    return [];
  }
}

export function getFeaturedServices(): Service[] {
  return getAllServices().filter(service => service.featured).slice(0, 6);
}

export function getServiceBySlug(slug: string): Service | null {
  const services = getAllServices();
  return services.find(service => service.slug === slug) || null;
}

// Testimonials
export function getAllTestimonials(): Testimonial[] {
  const testimonialsPath = path.join(contentDirectory, 'portfolio', 'testimonials.json');
  
  if (!fs.existsSync(testimonialsPath)) {
    return [];
  }

  try {
    const fileContents = fs.readFileSync(testimonialsPath, 'utf8');
    return JSON.parse(fileContents) as Testimonial[];
  } catch (error) {
    return [];
  }
}

// About content
export function getAboutContent(): AboutContent | null {
  const aboutPath = path.join(contentDirectory, 'about', 'about-content.json');
  
  if (!fs.existsSync(aboutPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(aboutPath, 'utf8');
    return JSON.parse(fileContents) as AboutContent;
  } catch (error) {
    return null;
  }
}

// Search functionality
export function searchContent(query: string): Array<{
  type: 'post' | 'portfolio' | 'service';
  title: string;
  excerpt: string;
  href: string;
  category?: string;
  date?: string;
}> {
  const results: Array<{
    type: 'post' | 'portfolio' | 'service';
    title: string;
    excerpt: string;
    href: string;
    category?: string;
    date?: string;
  }> = [];

  const searchTerm = query.toLowerCase();

  // Search blog posts
  getAllBlogPosts().forEach(post => {
    if (
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    ) {
      results.push({
        type: 'post',
        title: post.title,
        excerpt: post.excerpt,
        href: `/blog/${post.slug}`,
        category: post.category,
        date: post.date,
      });
    }
  });

  // Search portfolio items
  getAllPortfolioItems().forEach(item => {
    if (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      (item.content && item.content.toLowerCase().includes(searchTerm))
    ) {
      results.push({
        type: 'portfolio',
        title: item.title,
        excerpt: item.description,
        href: `/portfolio/${item.slug}`,
        category: item.category,
        date: item.date,
      });
    }
  });

  // Search services
  getAllServices().forEach(service => {
    if (
      service.title.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      (service.features && service.features.some(feature => feature.toLowerCase().includes(searchTerm)))
    ) {
      results.push({
        type: 'service',
        title: service.title,
        excerpt: service.description,
        href: `/services/${service.slug}`,
        category: service.category,
      });
    }
  });

  return results;
}

// Utility functions
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
  const plainText = content.replace(/<[^>]*>/g, '');
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength).trim() + '...';
}
