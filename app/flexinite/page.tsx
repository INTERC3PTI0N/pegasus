import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { getContent } from '@/lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const f = (await getContent())['flexinite.page'];
  return { title: f.seoTitle, description: f.seoDescription };
}

/** The Flexinite® Q&A — the house-standard explanation from the Brand Guidelines (section 6). */
export default async function FlexinitePage() {
  const f = (await getContent())['flexinite.page'];

  return (
    <main className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <PageHeader kicker={f.kicker} title={f.title} intro={f.intro} />

      <section className="max-w-6xl mx-auto mt-14 aspect-[21/9] overflow-hidden">
        <img src={f.image} alt="A PEGASUS® comb in use while cutting" className="w-full h-full object-cover" draggable={false} />
      </section>

      <section className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-x-12 gap-y-12">
        {f.qa.map((item, i) => (
          <div key={item.q} className="border-t border-black/10 pt-6">
            <span className="mono-tag text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="editorial-text text-2xl md:text-3xl text-ink mt-3">{item.q}</h2>
            <p className="text-sm md:text-base text-silver leading-[1.9] mt-3">{item.a}</p>
          </div>
        ))}
      </section>

      <div className="max-w-6xl mx-auto mt-20">
        <Link href="/products" className="inline-flex items-center gap-2 bg-ink text-white hover:bg-accent px-8 py-4 mono-tag text-xs transition-colors">
          Find your comb <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </main>
  );
}
