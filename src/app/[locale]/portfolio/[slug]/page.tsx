import { getPortfolioItemBySlug, getAllPortfolioItems } from '@/lib/content';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';

interface PortfolioItemPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function PortfolioItemPage({ params }: PortfolioItemPageProps) {
  const { locale, slug } = await params;
  const item = getPortfolioItemBySlug(slug, locale);
  
  if (!item) {
    notFound();
  }

  const allItems = getAllPortfolioItems(locale);
  const relatedItems = allItems
    .filter(i => i.slug !== item.slug && i.category === item.category)
    .slice(0, 3);

  return (
    <PageLayout locale={locale} className="bg-white">
        {/* Back Button */}
        <div className="mb-8">
          <Link href={`/${locale}/portfolio`} className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>

        {/* Portfolio Item Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            {/* Category and Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{item.date || 'Recent Project'}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {item.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8">
              {item.description}
            </p>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Project Type</h3>
                <p className="text-gray-600">{item.category}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Client</h3>
                <p className="text-gray-600">{item.client || 'Confidential'}</p>
              </div>
              {item.timeline && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                  <p className="text-gray-600">{item.timeline}</p>
                </div>
              )}
              {item.results && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Results</h3>
                  <p className="text-gray-600">{item.results}</p>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          <div className="w-full h-64 md:h-96 relative rounded-lg mb-8 overflow-hidden">
            {item.image ? (
              <SafeImage
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                placeholder="Portfolio Image"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Portfolio Image</span>
              </div>
            )}
          </div>

          {/* Project Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: item.content?.replace(/\n/g, '<br>') || 
                `<p>This project showcases my expertise in ${item.category.toLowerCase()}. The work demonstrates my ability to create compelling content that resonates with target audiences and drives measurable results.</p>
                
                <h3>Project Overview</h3>
                <p>${item.description}</p>
                
                <h3>Approach</h3>
                <p>I approached this project with a strategic mindset, focusing on understanding the client's goals, target audience, and brand voice. Through careful research and creative execution, I delivered content that exceeded expectations.</p>
                
                <h3>Key Features</h3>
                <ul>
                  <li>Strategic content planning and development</li>
                  <li>Audience-focused messaging</li>
                  <li>Brand-consistent voice and tone</li>
                  <li>SEO optimization where applicable</li>
                  <li>Clear call-to-action implementation</li>
                </ul>`
              }}
            />
          </div>

          {/* Project Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {item.link && (
              <Link href={item.link} target="_blank" rel="noopener noreferrer">
                <button 
                  style={{
                    width: '180px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '500',
                    borderRadius: '8px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: '2px solid transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    gap: '8px'
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Project
                </button>
              </Link>
            )}
            <Link href="/contact">
              <button 
                style={{
                  width: '180px',
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
                Discuss Similar Project
              </button>
            </Link>
          </div>

          {/* Skills Used */}
          {item.skills && item.skills.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Used</h3>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Projects */}
        {relatedItems.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem) => (
                <Card key={relatedItem.slug} hover className="h-full flex flex-col">
                  <CardHeader className="flex-1">
                    <div className="w-full h-32 relative rounded-lg mb-4 overflow-hidden">
                      {relatedItem.image ? (
                        <SafeImage
                          src={relatedItem.image}
                          alt={relatedItem.title}
                          fill
                          className="object-cover"
                          placeholder="Portfolio Image"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Portfolio Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary-600 mb-2">
                      <span className="px-2 py-1 bg-primary-100 rounded-full">
                        {relatedItem.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      {relatedItem.title}
                    </CardTitle>
                    <CardDescription>
                      {relatedItem.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={`/portfolio/${relatedItem.slug}`} className="w-full inline-block">
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
                        View Details
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
          <Link href="/portfolio">
            <button 
              style={{
                width: '180px',
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
              ← All Portfolio Items
            </button>
          </Link>
          <Link href="/contact">
            <button 
              style={{
                width: '180px',
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
              Start Your Project
            </button>
          </Link>
        </div>
    </PageLayout>
  );
}
