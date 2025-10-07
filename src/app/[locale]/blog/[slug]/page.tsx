import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);
  const t = await getTranslations('blog');
  const tCommon = await getTranslations('common');
  
  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts(locale);
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <PageLayout locale={locale} className="bg-white">
        {/* Back Button */}
        <div className="mb-8">
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t('backToBlog')}
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            {/* Category and Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>{post.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8">
              {post.excerpt}
            </p>

            {/* Author and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-t border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {post.author?.split(' ').map(n => n[0]).join('') || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">Copywriter & Content Creator</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                    cursor: 'pointer',
                    gap: '8px'
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  {t('share')}
                </button>
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
                    cursor: 'pointer',
                    gap: '8px'
                  }}
                >
                  <Bookmark className="w-4 h-4" />
                  {t('save')}
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="w-full h-64 md:h-96 relative rounded-lg mb-8 overflow-hidden">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Featured Image</span>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-semibold text-lg">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('aboutAuthor')} {post.author}</h3>
                <p className="text-gray-600 mb-4">
                  {t('authorBio')}
                </p>
                <Link href={`/${locale}/about`}>
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
                      backgroundColor: 'white',
                      color: '#059669',
                      border: '2px solid #10b981',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {tCommon('learnMore')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('relatedPosts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} hover className="h-full flex flex-col">
                  <CardHeader className="flex-1">
                    <div className="w-full h-32 relative rounded-lg mb-4 overflow-hidden">
                      {relatedPost.image ? (
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Blog Image</span>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">
                      {relatedPost.title}
                    </CardTitle>
                    <CardDescription>
                      {relatedPost.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={`/${locale}/blog/${relatedPost.slug}`} className="w-full inline-block">
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
                        {tCommon('readMore')}
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-16 flex flex-col sm:flex-row justify-between gap-4">
          <Link href={`/${locale}/blog`}>
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
              ← {t('allPosts')}
            </button>
          </Link>
          <Link href={`/${locale}/contact`}>
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
              {t('getInTouch')}
            </button>
          </Link>
        </div>
    </PageLayout>
  );
}
