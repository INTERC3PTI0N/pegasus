import type {Metadata} from 'next';
import { Jost, Cormorant_Garamond } from 'next/font/google';
import './globals.css'; // Global styles

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

export const metadata: Metadata = {
  title: 'PEGASUS Hair Tools — INFINITE STYLING',
  description: 'The official premium digital platform for Pegasus Hair Tools, engineering professional styling tools since 1961. Experience the craftsmanship of Flexinite technology.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning className="bg-white text-ink antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
