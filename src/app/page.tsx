import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Linkedin, ExternalLink, Mail } from 'lucide-react';
import { getFeaturedBlogPosts, getFeaturedServices, getAboutContent } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const featuredPosts = await getFeaturedBlogPosts();
  const featuredServices = getFeaturedServices();
  const aboutContent = getAboutContent();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {aboutContent?.name || 'Dang Thi Quynh Huong'}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                &ldquo;{aboutContent?.tagline || 'Turning Ideas Into Words That Convert'}&rdquo;
              </p>
              <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                {aboutContent?.bio || 'Professional copywriter and content creator helping businesses transform their ideas into compelling content that drives results.'}
              </p>
              
              <div className="mb-12">
                <div className="flex justify-center space-x-4">
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
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: '2px solid transparent',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      View My Work
                    </button>
                  </Link>
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
                      Hire Me
                    </button>
                  </Link>
                  <Link href="/blog">
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
                        color: '#6b7280',
                        border: '2px solid #d1d5db',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      Read Blog
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center space-x-6">
                <a
                  href="https://linkedin.com/in/dangquynhhuong"
                  className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
                  <Linkedin className="h-6 w-6" />
          </a>
          <a
                  href="https://upwork.com/freelancers/dangquynhhuong"
                  className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
                  <ExternalLink className="h-6 w-6" />
                </a>
                <a
                  href="mailto:contact@dangquynhhuong.com"
                  className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                >
                  <Mail className="h-6 w-6" />
          </a>
        </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Insights, tips, and strategies to help you create content that converts.
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
                          <span className="text-gray-500">Blog Image</span>
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
                    <Link href={`/blog/${post.slug}`} className="w-full inline-block">
                      <Button variant="ghost" className="w-full">
                        Read More
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
              <Link href="/blog">
                <Button variant="secondary" size="lg">View All Posts</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What I Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive writing services to help your business grow and convert.
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
                    <Link href={`/services/${service.slug}`} className="w-full inline-block">
                      <Button variant="ghost" className="w-full">
                        Learn More
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
              <Link href="/services">
                <Button size="lg">View All Services</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="py-20 bg-white">
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
                About Me
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {aboutContent?.bio || 'I\'m a passionate copywriter and content creator with a proven track record of helping businesses transform their ideas into compelling content that drives results. With expertise across multiple industries and writing styles, I bring a strategic approach to every project.'}
              </p>
              <Link href="/about">
                <Button variant="secondary" size="lg">Read My Full Story</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-primary-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Content?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s work together to create content that converts and grows your business.
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
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '2px solid white',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  View Portfolio
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
