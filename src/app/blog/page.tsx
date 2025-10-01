import { getAllBlogPosts, getAllCategories } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and strategies to help you create content that converts and grows your business.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="ghost" className="text-primary-600 border-primary-200">
              All Posts
            </Button>
            {categories.map((category) => (
              <Button key={category.id} variant="ghost">
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
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

        {/* No Posts Message */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
