import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { BlogPost, Category, PortfolioItem, Service, Testimonial, AboutContent } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

// Helper to get locale-specific content directory
function getLocaleDirectory(locale: string) {
  return path.join(contentDirectory, locale);
}

// Markdown processing
async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content);
  return processedContent.toString();
}

// Blog posts with locale support and fallback
export async function getAllBlogPosts(locale: string = 'en'): Promise<BlogPost[]> {
  const postsDirectory = path.join(getLocaleDirectory(locale), 'blog', 'posts');
  
  // If locale directory doesn't exist, fallback to English
  if (!fs.existsSync(postsDirectory)) {
    if (locale !== 'en') {
      return getAllBlogPosts('en');
    }
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((name) => name.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const processedContent = await processMarkdown(content);

        return {
          slug,
          content: processedContent,
          ...data,
        } as BlogPost;
      })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPostBySlug(slug: string, locale: string = 'en'): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(getLocaleDirectory(locale), 'blog', 'posts', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content} = matter(fileContents);
    const processedContent = await processMarkdown(content);

    return {
      slug,
      content: processedContent,
      ...data,
    } as BlogPost;
  } catch {
    // Fallback to English if not found
    if (locale !== 'en') {
      return getBlogPostBySlug(slug, 'en');
    }
    return null;
  }
}

export async function getFeaturedBlogPosts(locale: string = 'en'): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(locale);
  return posts.filter(post => post.featured).slice(0, 4);
}

export async function getBlogPostsByCategory(category: string, locale: string = 'en'): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(locale);
  return posts.filter(post => post.category === category);
}

// Categories with locale support
export function getAllCategories(locale: string = 'en'): Category[] {
  const categoriesPath = path.join(getLocaleDirectory(locale), 'blog', 'categories');
  
  if (!fs.existsSync(categoriesPath)) {
    if (locale !== 'en') {
      return getAllCategories('en');
    }
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

export function getCategoryBySlug(slug: string, locale: string = 'en'): Category | null {
  try {
    const fullPath = path.join(getLocaleDirectory(locale), 'blog', 'categories', `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents) as Category;
  } catch {
    if (locale !== 'en') {
      return getCategoryBySlug(slug, 'en');
    }
    return null;
  }
}

// Portfolio with locale support
export function getAllPortfolioItems(locale: string = 'en'): PortfolioItem[] {
  const portfolioPath = path.join(getLocaleDirectory(locale), 'portfolio', 'writing-samples.json');
  
  if (!fs.existsSync(portfolioPath)) {
    if (locale !== 'en') {
      return getAllPortfolioItems('en');
    }
    return [];
  }

  try {
    const fileContents = fs.readFileSync(portfolioPath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.items || [];
  } catch {
    if (locale !== 'en') {
      return getAllPortfolioItems('en');
    }
    return [];
  }
}

export function getFeaturedPortfolioItems(locale: string = 'en'): PortfolioItem[] {
  return getAllPortfolioItems(locale).filter(item => item.featured).slice(0, 6);
}

export function getPortfolioItemsByCategory(category: string, locale: string = 'en'): PortfolioItem[] {
  return getAllPortfolioItems(locale).filter(item => item.category === category);
}

export function getPortfolioItemBySlug(slug: string, locale: string = 'en'): PortfolioItem | null {
  const items = getAllPortfolioItems(locale);
  return items.find(item => item.slug === slug) || null;
}

// Services with locale support
export function getAllServices(locale: string = 'en'): Service[] {
  const servicesPath = path.join(getLocaleDirectory(locale), 'services', 'services-list.json');
  
  if (!fs.existsSync(servicesPath)) {
    if (locale !== 'en') {
      return getAllServices('en');
    }
    return [];
  }

  try {
    const fileContents = fs.readFileSync(servicesPath, 'utf8');
    const services = JSON.parse(fileContents) as Array<Omit<Service, 'slug'> & { id: string }>;
    return services.map((service) => ({
      ...service,
      slug: service.id
    })) as Service[];
  } catch {
    if (locale !== 'en') {
      return getAllServices('en');
    }
    return [];
  }
}

export function getFeaturedServices(locale: string = 'en'): Service[] {
  return getAllServices(locale).filter(service => service.featured).slice(0, 6);
}

export function getServiceBySlug(slug: string, locale: string = 'en'): Service | null {
  const services = getAllServices(locale);
  return services.find(service => service.slug === slug) || null;
}

// Testimonials with locale support
export function getAllTestimonials(locale: string = 'en'): Testimonial[] {
  const testimonialsPath = path.join(getLocaleDirectory(locale), 'portfolio', 'testimonials.json');
  
  if (!fs.existsSync(testimonialsPath)) {
    if (locale !== 'en') {
      return getAllTestimonials('en');
    }
    return [];
  }

  try {
    const fileContents = fs.readFileSync(testimonialsPath, 'utf8');
    return JSON.parse(fileContents) as Testimonial[];
  } catch {
    if (locale !== 'en') {
      return getAllTestimonials('en');
    }
    return [];
  }
}

// About content with locale support
export function getAboutContent(locale: string = 'en'): AboutContent | null {
  const aboutPath = path.join(getLocaleDirectory(locale), 'about', 'about-content.json');
  
  if (!fs.existsSync(aboutPath)) {
    if (locale !== 'en') {
      return getAboutContent('en');
    }
    return null;
  }

  try {
    const fileContents = fs.readFileSync(aboutPath, 'utf8');
    return JSON.parse(fileContents) as AboutContent;
  } catch {
    if (locale !== 'en') {
      return getAboutContent('en');
    }
    return null;
  }
}

// Search functionality with locale support
export async function searchContent(query: string, locale: string = 'en'): Promise<Array<{
  type: 'post' | 'portfolio' | 'service';
  title: string;
  excerpt: string;
  href: string;
  category?: string;
  date?: string;
}>> {
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
  const posts = await getAllBlogPosts(locale);
  posts.forEach(post => {
    if (
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))
    ) {
      results.push({
        type: 'post',
        title: post.title,
        excerpt: post.excerpt,
        href: `/${locale}/blog/${post.slug}`,
        category: post.category,
        date: post.date,
      });
    }
  });

  // Search portfolio items
  getAllPortfolioItems(locale).forEach(item => {
    if (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      (item.content && item.content.toLowerCase().includes(searchTerm))
    ) {
      results.push({
        type: 'portfolio',
        title: item.title,
        excerpt: item.description,
        href: `/${locale}/portfolio/${item.slug}`,
        category: item.category,
        date: item.date,
      });
    }
  });

  // Search services
  getAllServices(locale).forEach(service => {
    if (
      service.title.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      (service.features && service.features.some(feature => feature.toLowerCase().includes(searchTerm)))
    ) {
      results.push({
        type: 'service',
        title: service.title,
        excerpt: service.description,
        href: `/${locale}/services/${service.slug}`,
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
