import { getBlogPostsByCategory, getCategoryBySlug, getAllCategories } from '@/lib/content';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug, locale);
  
  if (!category) {
    notFound();
  }

  const posts = await getBlogPostsByCategory(category.name, locale);
  const allCategories = getAllCategories(locale);

  return (
    <PageLayout locale={locale} className="bg-gray-50">
        {/* Back Button */}
        <div className="mb-8">
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ 
              backgroundColor: `${category.color}20`,
              color: category.color 
            }}
          >
            <Tag className="w-4 h-4 mr-2" />
            {category.name}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/blog">
              <button 
                style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: '2px solid #d1d5db',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                All Posts
              </button>
            </Link>
            {allCategories.map((cat) => (
              <Link key={cat.id} href={`/blog/category/${cat.slug}`}>
                <button 
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderRadius: '6px',
                    backgroundColor: cat.slug === category.slug ? 'white' : 'transparent',
                    color: cat.slug === category.slug ? '#059669' : '#6b7280',
                    border: cat.slug === category.slug ? '2px solid #10b981' : '2px solid #d1d5db',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {cat.name}
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} hover className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <div className="w-full h-48 relative rounded-lg mb-4 overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Blog Image</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Tag className="w-4 h-4" />
                  <span>{post.category}</span>
                </div>
                <CardTitle className="text-xl mb-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`} className="w-full inline-block">
                  <button 
                    style={{
                      width: '100%',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '500',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#6b7280',
                      border: '2px solid #d1d5db',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    Read More
                  </button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Posts Message */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts in this category yet</h3>
            <p className="text-gray-600 mb-4">Check back soon for new content in {category.name}!</p>
            <Link href="/blog">
              <button 
                style={{
                  width: '140px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#059669',
                  border: '2px solid #10b981',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                View All Posts
              </button>
            </Link>
          </div>
        )}

        {/* Load More Button */}
        {posts.length > 6 && (
          <div className="text-center mt-12">
            <button 
              style={{
                width: '180px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '500',
                borderRadius: '8px',
                backgroundColor: 'white',
                color: '#059669',
                border: '2px solid #10b981',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              Load More Posts
            </button>
          </div>
        )}
    </PageLayout>
  );
}
