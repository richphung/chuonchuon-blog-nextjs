import { getAboutContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin, ExternalLink, Award, Users, Clock, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const aboutContent = {
    name: 'Dang Thi Quynh Huong',
    tagline: 'Turning Ideas Into Words That Convert',
    introduction: 'Hello! I\'m a passionate and dedicated freelance copywriter and content creator.',
    bio: 'Professional copywriter and content creator helping businesses turn ideas into words that convert.',
    skills: ['Copywriting', 'Content Writing', 'SEO Optimization', 'Email Marketing', 'Social Media Content', 'Technical Writing', 'Editing & Proofreading', 'Content Strategy'],
    experience: [
      {
        title: 'Freelance Copywriter & Content Creator',
        company: 'Self-Employed',
        years: '2023 - Present',
        description: 'Helping businesses create compelling content that drives results and builds brand awareness.'
      },
      {
        title: 'Marketing Specialist',
        company: 'Global Marketing Agency',
        years: '2020 - 2023',
        description: 'Developed and executed content strategies for B2B and B2C clients across various industries.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
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
                <span className="text-gray-500 text-lg">Professional Headshot</span>
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {aboutContent?.name || 'Dang Thi Quynh Huong'}
          </h1>
          <p className="text-xl text-primary-600 mb-6">
            {aboutContent?.tagline || 'Turning Ideas Into Words That Convert'}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {aboutContent?.introduction || 'Hello! I&apos;m a passionate and dedicated freelance copywriter and content creator. My mission is to help businesses like yours articulate their vision, connect with their audience, and achieve their goals through the power of compelling words.'}
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

        {/* Bio Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Story</h2>
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: aboutContent?.bio?.replace(/\n/g, '<br>') || 
                  `<p>With a background in marketing and a keen eye for detail, I specialize in crafting content that not only informs and engages but also drives measurable results. Whether it&apos;s a captivating blog post, a high-converting sales page, or an engaging email campaign, I bring a strategic and creative approach to every project.</p>
                  
                  <p>I believe that every brand has a unique story to tell, and I&apos;m here to help you tell yours in the most impactful way possible. Let&apos;s collaborate to transform your ideas into words that truly convert!</p>
                  
                  <p>When I&apos;m not writing, you can find me exploring new coffee shops, reading about the latest marketing trends, or spending time with my family. I&apos;m passionate about continuous learning and staying up-to-date with the ever-evolving world of digital marketing and content creation.</p>`
                }}
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {aboutContent.skills.map((skill, index) => (
                <div key={`skill-${index}`} className="bg-primary-50 rounded-lg p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <span className="text-gray-900 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Experience</h2>
            <div className="space-y-8">
              {aboutContent.experience.map((exp, index) => (
                <Card key={`experience-${index}`} hover>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-primary-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-gray-500 text-sm mt-2 md:mt-0">
                        {exp.years}
                      </div>
                    </div>
                    <p className="text-gray-600">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="w-8 h-8 text-primary-500" />,
                  title: 'Client-Focused',
                  description: 'Your success is my success. I prioritize understanding your goals and delivering results that exceed expectations.'
                },
                {
                  icon: <Award className="w-8 h-8 text-primary-500" />,
                  title: 'Quality First',
                  description: 'I never compromise on quality. Every piece of content is crafted with attention to detail and strategic thinking.'
                },
                {
                  icon: <Clock className="w-8 h-8 text-primary-500" />,
                  title: 'Reliable Delivery',
                  description: 'I understand the importance of deadlines and always deliver on time, keeping you informed throughout the process.'
                }
              ].map((value, index) => (
                <Card key={`value-${index}`} hover>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Fun Facts About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Coffee Enthusiast</h3>
                  <p className="text-gray-600">I start every day with a perfect cup of coffee and believe it&apos;s the secret to great writing.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Lifelong Learner</h3>
                  <p className="text-gray-600">I&apos;m constantly reading, taking courses, and staying updated with the latest marketing trends.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Detail-Oriented</h3>
                  <p className="text-gray-600">I have a keen eye for detail and believe that small things make a big difference in content quality.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Collaborative Spirit</h3>
                  <p className="text-gray-600">I love working closely with clients and consider myself an extension of their team.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-primary-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Ready to transform your ideas into compelling content? I&apos;d love to hear about your project and discuss how we can achieve your goals together.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
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
                Start Your Project
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
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:contact@dangquynhhuong.com"
              className="text-primary-100 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/dangquynhhuong"
              className="text-primary-100 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://upwork.com/freelancers/dangquynhhuong"
              className="text-primary-100 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork"
            >
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
