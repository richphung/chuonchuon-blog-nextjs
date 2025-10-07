import { getAllServices } from '@/lib/content';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const services = getAllServices(locale);

  return (
    <PageLayout locale={locale} className="bg-gray-50">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive writing services to help your business grow, engage your audience, and drive conversions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.slug} hover className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-semibold text-lg">
                    {service.icon || '📝'}
                  </span>
                </div>
                <CardTitle className="text-xl mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {service.features && service.features.length > 0 && (
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{service.deliveryTime || '1-2 weeks'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>{service.price || 'Custom Quote'}</span>
                  </div>
                </div>
                <Link href={`/services/${service.slug}`} className="w-full inline-block">
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

        {/* Process Section */}
        <section className="bg-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              My Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven approach that ensures your project is delivered on time, on budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We discuss your goals, target audience, and project requirements in detail.'
              },
              {
                step: '02',
                title: 'Strategy',
                description: 'I develop a content strategy and outline that aligns with your business objectives.'
              },
              {
                step: '03',
                title: 'Creation',
                description: 'I craft compelling content that resonates with your audience and drives action.'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'You receive polished, ready-to-publish content that exceeds your expectations.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-primary-500 rounded-2xl p-8 md:p-12 mb-16 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Flexible Pricing Options
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Choose the pricing model that works best for your project and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Per Project</h3>
              <p className="text-primary-100 text-sm mb-4">
                Fixed price for complete projects with clear deliverables and timelines.
              </p>
              <div className="text-2xl font-bold mb-2">$500 - $5,000</div>
              <p className="text-primary-100 text-sm">Based on scope and complexity</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Per Hour</h3>
              <p className="text-primary-100 text-sm mb-4">
                Hourly rate for ongoing work, consultations, and revisions.
              </p>
              <div className="text-2xl font-bold mb-2">$75 - $150</div>
              <p className="text-primary-100 text-sm">Per hour of work</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Retainer</h3>
              <p className="text-primary-100 text-sm mb-4">
                Monthly retainer for ongoing content needs and priority support.
              </p>
              <div className="text-2xl font-bold mb-2">$2,000+</div>
              <p className="text-primary-100 text-sm">Per month</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
                Get In Touch
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
        </section>
    </PageLayout>
  );
}
