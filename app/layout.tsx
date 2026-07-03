import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PEGASUS Hair Tools — INFINITE STYLING',
  description: 'The official premium digital platform for Pegasus Hair Tools, engineering professional styling tools since 1961. Experience the craftsmanship of Flexinite technology.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
