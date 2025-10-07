import { getServiceBySlug, getAllServices } from '@/lib/content';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, DollarSign, ArrowRight, Star } from 'lucide-react';

interface ServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'vi'];
  const allParams: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    const services = getAllServices(locale);
    for (const service of services) {
      allParams.push({
        locale,
        slug: service.slug
      });
    }
  }
  
  return allParams;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug, locale);
  
  if (!service) {
    notFound();
  }

  const allServices = getAllServices(locale);
  const relatedServices = allServices
    .filter(s => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <PageLayout locale={locale} className="bg-white">
        {/* Back Button */}
        <div className="mb-8">
          <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>

        {/* Service Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-2xl">
                  {service.icon || '📝'}
                </span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Service Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Time</p>
                  <p className="font-semibold text-gray-900">{service.deliveryTime || '1-2 weeks'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Starting Price</p>
                  <p className="font-semibold text-gray-900">{service.price || 'Custom Quote'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Satisfaction</p>
                  <p className="font-semibold text-gray-900">100% Guaranteed</p>
                </div>
              </div>
            </div>
          </header>

          {/* Service Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: service.content?.replace(/\n/g, '<br>') || 
                `<p>${service.description}</p>
                
                <h3>What You Get</h3>
                <p>When you work with me on ${service.title.toLowerCase()}, you can expect:</p>
                
                <ul>
                  <li>Professional, high-quality content that aligns with your brand voice</li>
                  <li>Strategic approach based on your target audience and business goals</li>
                  <li>Clear communication throughout the project</li>
                  <li>Timely delivery that meets your deadlines</li>
                  <li>Revisions to ensure your complete satisfaction</li>
                </ul>
                
                <h3>Why Choose This Service</h3>
                <p>This service is perfect for businesses looking to ${service.description.toLowerCase()}. I bring years of experience and a proven track record of delivering results that exceed client expectations.</p>`
              }}
            />
          </div>

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Consultation',
                  description: 'We discuss your project requirements, goals, and timeline.'
                },
                {
                  step: '02',
                  title: 'Strategy',
                  description: 'I develop a content strategy tailored to your needs.'
                },
                {
                  step: '03',
                  title: 'Creation',
                  description: 'I craft your content with attention to detail and quality.'
                },
                {
                  step: '04',
                  title: 'Delivery',
                  description: 'You receive your content and can request revisions if needed.'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-600 font-bold">{step.step}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary-50 rounded-2xl p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
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
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: '2px solid transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  Start Your Project
                </button>
              </Link>
              <Link href="/portfolio">
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
                  View My Work
                </button>
              </Link>
            </div>
          </div>
        </article>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <Card key={relatedService.slug} hover className="h-full flex flex-col">
                  <CardHeader className="flex-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-primary-600 font-semibold text-lg">
                        {relatedService.icon || '📝'}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      {relatedService.title}
                    </CardTitle>
                    <CardDescription>
                      {relatedService.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={`/services/${relatedService.slug}`} className="w-full inline-block">
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
                          cursor: 'pointer',
                          gap: '8px'
                        }}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
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
          <Link href="/services">
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
              ← All Services
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
    </PageLayout>
  );
}
