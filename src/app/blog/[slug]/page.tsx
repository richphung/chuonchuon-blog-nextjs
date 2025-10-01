import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Bookmark } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
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
                  Share
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
                  Save
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
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About {post.author}</h3>
                <p className="text-gray-600 mb-4">
                  Professional copywriter and content creator helping businesses turn ideas into words that convert. 
                  With expertise across multiple industries and writing styles, I bring a strategic approach to every project.
                </p>
                <Link href="/about">
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
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
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
                    <Link href={`/blog/${relatedPost.slug}`} className="w-full inline-block">
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
          </section>
        )}

        {/* Navigation */}
        <div className="mt-16 flex flex-col sm:flex-row justify-between gap-4">
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
              ← All Posts
            </button>
          </Link>
          <Link href="/contact">
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
              Get In Touch
            </button>
          </Link>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
