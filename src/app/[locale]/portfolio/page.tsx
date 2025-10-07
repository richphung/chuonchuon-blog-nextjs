import { getAllPortfolioItems, getAllTestimonials } from '@/lib/content';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import { ExternalLink, Star, Quote } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const portfolioItems = getAllPortfolioItems(locale);
  const testimonials = getAllTestimonials(locale);

  return (
    <PageLayout locale={locale} className="bg-gray-50">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of my writing work, client success stories, and the results I&apos;ve helped businesses achieve.
          </p>
        </div>

        {/* Writing Samples */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Writing Samples
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore my diverse portfolio of copywriting and content writing projects across different industries and formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <Card key={item.slug} hover className="h-full flex flex-col">
                <CardHeader className="flex-1">
                  <div className="w-full h-48 relative rounded-lg mb-4 overflow-hidden">
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
                  <div className="flex items-center gap-2 text-sm text-primary-600 mb-2">
                    <span className="px-2 py-1 bg-primary-100 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Link href={`/portfolio/${item.slug}`} className="flex-1">
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
                    {item.link && (
                      <Link href={item.link} target="_blank" rel="noopener noreferrer">
                        <button 
                          style={{
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '12px',
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
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {portfolioItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No portfolio items yet</h3>
              <p className="text-gray-600">Check back soon for new writing samples!</p>
            </div>
          )}
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Client Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what my clients have to say about working with me and the results we&apos;ve achieved together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={`testimonial-${index}`} hover className="h-full flex flex-col">
                <CardContent className="flex-1 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary-200 mb-4" />
                  <blockquote className="text-gray-700 mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {testimonial.author?.split(' ').map(n => n[0]).join('') || 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Quote className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-600">Client feedback will appear here as projects are completed.</p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="bg-primary-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project and create content that drives real results for your business.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/contact">
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
                Get In Touch
              </button>
            </Link>
            <Link href="/services">
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
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                View Services
              </button>
            </Link>
          </div>
        </section>
    </PageLayout>
  );
}
