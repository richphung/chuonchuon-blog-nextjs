import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { SocialLinks } from '@/components/SocialLinks';
import { getFeaturedBlogPosts, getFeaturedServices, getAboutContent } from '@/lib/content';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const featuredPosts = await getFeaturedBlogPosts(locale);
  const featuredServices = getFeaturedServices(locale);
  const aboutContent = getAboutContent(locale);
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  return (
    <PageLayout locale={locale} containerClassName="">
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-200 via-primary-100 to-primary-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {aboutContent?.name || 'Dang Thi Quynh Huong'}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                &ldquo;{aboutContent?.tagline || t('hero.tagline')}&rdquo;
              </p>
              <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                {aboutContent?.bio || t('hero.description')}
              </p>
              
              <div className="mb-12">
                <div className="flex justify-center space-x-4">
                  <Link href={`/${locale}/portfolio`}>
                    <Button variant="teal-solid" size="lg">
                      {t('hero.cta.viewWork')}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/contact`}>
                    <Button variant="teal-outline" size="lg">
                      {t('hero.cta.hireMe')}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/blog`}>
                    <Button variant="teal-light" size="lg">
                      {t('hero.cta.readBlog')}
                    </Button>
                  </Link>
                </div>
              </div>

              <SocialLinks variant="hero" className="justify-center" />
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-20 bg-gradient-to-b from-primary-50 to-primary-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('featuredPosts.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('featuredPosts.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.length > 0 ? featuredPosts.slice(0, 3).map((post, index) => (
                <Card key={`post-${post.slug}-${index}`} hover>
                  <CardHeader>
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
                          <span className="text-gray-500">{t('featuredPosts.blogImage')}</span>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Link href={`/${locale}/blog/${post.slug}`} className="w-full inline-block">
                      <Button variant="ghost" className="w-full">
                        {tCommon('readMore')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )) : (
                // Fallback placeholder content
                [1, 2, 3].map((i) => (
                  <Card key={`fallback-post-${i}`} hover>
                    <CardHeader>
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-500">Blog Image {i}</span>
                      </div>
                      <CardTitle className="text-xl">
                        Sample Blog Post {i}
                      </CardTitle>
                      <CardDescription>
                        This is a sample blog post excerpt that demonstrates the content style and layout...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>Copywriting</span>
                        <span>5 min read</span>
                      </div>
                      <Button variant="ghost" className="w-full">
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/blog`}>
                <Button variant="secondary" size="lg">{tCommon('viewAllPosts')}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gradient-to-br from-primary-100 via-accent-coral-light to-primary-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('services.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('services.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.length > 0 ? featuredServices.slice(0, 6).map((service, index) => (
                <Card key={`service-${service.slug}-${index}`} hover>
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-primary-600 font-medium mb-3">
                      {service.price}
                    </div>
                    <Link href={`/${locale}/services/${service.slug}`} className="w-full inline-block">
                      <Button variant="ghost" className="w-full">
                        {tCommon('learnMore')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )) : (
                // Fallback placeholder content
                [
                  { title: 'Blog Writing', desc: 'SEO-optimized, engaging blog posts that drive traffic and engagement.' },
                  { title: 'Website Copy', desc: 'Compelling homepage, about, and services pages that convert visitors.' },
                  { title: 'Email Marketing', desc: 'Newsletters, promotional emails, and sequences that nurture leads.' },
                  { title: 'Social Media Content', desc: 'Posts, captions, and stories that build your brand presence.' },
                  { title: 'Product Descriptions', desc: 'E-commerce copy that highlights benefits and drives sales.' },
                  { title: 'Sales Copy', desc: 'Landing pages and sales letters that turn prospects into customers.' },
                ].map((service, i) => (
                  <Card key={`fallback-${i}`} hover>
                    <CardHeader>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription>{service.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/services`}>
                <Button size="lg">{tCommon('viewAllServices')}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="py-20 bg-gradient-to-t from-primary-100 to-primary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-32 h-32 relative rounded-full mx-auto mb-8 overflow-hidden">
                {aboutContent?.image ? (
                  <Image
                    src={`/images/about/${aboutContent.image}`}
                    alt={aboutContent.name || 'Professional Headshot'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Professional Headshot</span>
                  </div>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {aboutContent?.bio || t('about.defaultBio')}
              </p>
              <Link href={`/${locale}/about`}>
                <Button variant="secondary" size="lg">{t('about.readFullStory')}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex justify-center space-x-4">
              <Link href={`/${locale}/contact`}>
                <Button variant="secondary" size="lg">
                  {t('cta.getInTouch')}
                </Button>
              </Link>
              <Link href={`/${locale}/portfolio`}>
                <Button variant="ghost" size="lg" className="bg-white/20 text-white border-white hover:bg-white/30">
                  {t('cta.viewPortfolio')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
