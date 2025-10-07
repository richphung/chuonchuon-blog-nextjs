import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  locale: string;
  className?: string;
  containerClassName?: string;
}

export default function PageLayout({ 
  children, 
  locale,
  className = '',
  containerClassName = 'container mx-auto px-4 sm:px-6 lg:px-8 py-12'
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header locale={locale} />
      <main className="flex-1">
        {containerClassName ? (
          <div className={containerClassName}>
            {children}
          </div>
        ) : (
          children
        )}
      </main>
      <Footer locale={locale} />
    </div>
  );
}

