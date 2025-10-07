import { getAllBlogPosts, getAllCategories } from '@/lib/content';
import PageLayout from '@/components/layout/PageLayout';
import BlogFilter from '@/components/blog/BlogFilter';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getAllBlogPosts(locale);
  const categories = getAllCategories(locale);

  return (
    <PageLayout locale={locale} className="bg-gradient-to-b from-primary-50 to-white" containerClassName="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
      <BlogFilter categories={categories} posts={posts} locale={locale} />
    </PageLayout>
  );
}
