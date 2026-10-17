import type {Metadata} from 'next';
import { Jost, Cormorant_Garamond } from 'next/font/google';
import './globals.css'; // Global styles
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CombCursor from '@/components/CombCursor';
import { getContent, isPreview } from '@/lib/cms';

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { 'global.seo': seo } = await getContent();
  return { title: seo.siteTitle, description: seo.siteDescription };
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const content = await getContent();
  const preview = await isPreview();

  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning className="bg-white text-ink antialiased overflow-x-hidden">
        {preview && (
          <div className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 flex items-center gap-3 bg-ink text-white px-4 py-2 mono-tag text-[11px] shadow-lg">
            Preview — showing unpublished drafts
            <a href="/api/preview/exit" className="underline hover:text-accent">Exit preview</a>
          </div>
        )}
        <CombCursor />
        <SiteHeader content={content['global.header']} />
        {children}
        <SiteFooter content={content['global.footer']} header={content['global.header']} />
      </body>
    </html>
  );
}
