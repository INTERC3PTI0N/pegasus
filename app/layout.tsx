import type {Metadata} from 'next';
import { Barlow_Condensed } from 'next/font/google';
import './globals.css'; // Global styles
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CombCursor from '@/components/CombCursor';
import { getContent, isPreview } from '@/lib/cms';

// Brand typography (Guidelines §16): DIN Condensed for headlines, Helvetica for body.
// DIN Condensed is used where installed; Barlow Condensed is the web fallback.
const dinFallback = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-din-fallback',
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
    <html lang="en" className={dinFallback.variable}>
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
