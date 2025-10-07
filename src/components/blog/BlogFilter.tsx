'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, Calendar, Clock } from 'lucide-react';
import { Category, BlogPost } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import CategoryMultiSelect from './CategoryMultiSelect';
import { useTranslations } from 'next-intl';

interface BlogFilterProps {
  categories: Category[];
  posts: BlogPost[];
  locale: string;
}

export default function BlogFilter({ categories, posts, locale }: BlogFilterProps) {
  const t = useTranslations('blog');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Calculate post counts for each category
  const postCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category.slug] = posts.filter(post => post.category === category.name).length;
    });
    return counts;
  }, [categories, posts]);

  // Sort categories by popularity (most posts first) and filter out empty ones
  const sortedCategories = useMemo(() => {
    return categories
      .filter(category => postCounts[category.slug] > 0)
      .sort((a, b) => postCounts[b.slug] - postCounts[a.slug]);
  }, [categories, postCounts]);

  // Filter posts based on search and selected categories
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by categories (show posts from ANY selected category)
    if (selectedCategories.length > 0) {
      const selectedCategoryNames = selectedCategories
        .map(slug => categories.find(cat => cat.slug === slug)?.name)
        .filter(Boolean) as string[];
      
      filtered = filtered.filter(post => 
        selectedCategoryNames.includes(post.category)
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(lowerSearch) ||
        post.excerpt.toLowerCase().includes(lowerSearch) ||
        post.content.toLowerCase().includes(lowerSearch) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerSearch)) ||
        post.category.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [posts, selectedCategories, searchTerm, categories]);

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Multi-Select Dropdown */}
            <div className="w-full md:w-72 flex-shrink-0">
              <CategoryMultiSelect
                categories={sortedCategories}
                postCounts={postCounts}
                selectedCategories={selectedCategories}
                onSelectionChange={setSelectedCategories}
              />
            </div>
          </div>

          {/* Quick Category Pills - Show top 5 most popular categories */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSearchTerm('');
              }}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategories.length === 0 && !searchTerm
                  ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('allCategories')}
            </button>
            {sortedCategories.slice(0, 5).map((category) => {
              const count = postCounts[category.slug] || 0;
              const isSelected = selectedCategories.includes(category.slug);
              
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedCategories(selectedCategories.filter(slug => slug !== category.slug));
                    } else {
                      setSelectedCategories([...selectedCategories, category.slug]);
                    }
                  }}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                  title={`${count} ${count === 1 ? 'post' : 'posts'}`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {category.name}
                </button>
              );
            })}
            {sortedCategories.length > 5 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-500">
                +{sortedCategories.length - 5} more in dropdown
              </span>
            )}
          </div>

          {/* Results count */}
          {(searchTerm || selectedCategories.length > 0) && (
            <div className="mt-4 text-center md:text-left">
              <p className="text-sm text-gray-600">
                Found <span className="font-semibold text-primary-600">{filteredPosts.length}</span> 
                {filteredPosts.length === 1 ? ' post' : ' posts'}
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedCategories.length > 0 && searchTerm && ' in '}
                {selectedCategories.length === 1 && (
                  <span className="font-semibold">
                    {sortedCategories.find(cat => cat.slug === selectedCategories[0])?.name}
                  </span>
                )}
                {selectedCategories.length > 1 && (
                  <span className="font-semibold">
                    {selectedCategories.length} categories
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
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
              <Link href={`/${locale}/blog/${post.slug}`} className="w-full inline-block">
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
                  {t('readMore')}
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Posts Message */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noResults')}</h3>
          <p className="text-gray-600">{t('noResultsMessage')}</p>
        </div>
      )}
    </>
  );
}

