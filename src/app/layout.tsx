import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GrowthDesk | Enterprise SEO Suite & AI Assistant',
  description:
    'Full-stack production-grade SEO intelligence suite, SERP analytics, live backlink explorer, technical site audit, and bilingual AI SEO assistant.',
  keywords: ['SEO Suite', 'Ahrefs Alternative', 'DataForSEO', 'Technical Site Audit', 'Core Web Vitals', 'GrowthDesk'],
  authors: [{ name: 'GrowthDesk Systems' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#0b0f19] text-gray-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
