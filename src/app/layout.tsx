import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

// Root layout with HTML structure
export default function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
