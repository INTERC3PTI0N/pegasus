import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { getContent } from '@/lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const a = (await getContent())['about.page'];
  return { title: a.seoTitle, description: a.seoDescription };
}

export default async function AboutPage() {
  const a = (await getContent())['about.page'];

  return (
    <main className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <PageHeader kicker={a.kicker} title={a.title} />

      {/* Brand belief */}
      <section className="max-w-6xl mx-auto mt-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7 space-y-5">
          {a.belief.split(/\n\s*\n/).map((p, i) => (
            <p key={i} className={i === 0 ? 'text-xl md:text-2xl text-ink leading-[1.6]' : 'text-sm md:text-base text-silver leading-[1.9]'}>
              {p}
            </p>
          ))}
        </div>
        <div className="lg:col-span-5 aspect-[4/5] overflow-hidden">
          <img src={a.image} alt="" className="w-full h-full object-cover" draggable={false} />
        </div>
      </section>

      {/* Brand statement */}
      <section className="max-w-6xl mx-auto mt-24 bg-ink text-white p-8 md:p-14">
        <span className="mono-tag text-xs text-accent">{a.statementTitle}</span>
        <p className="text-lg md:text-2xl leading-[1.6] mt-5">{a.statement}</p>
      </section>

      {/* Our story */}
      <section className="max-w-6xl mx-auto mt-24">
        <h2 className="editorial-text text-4xl md:text-5xl text-ink mb-12">{a.timelineTitle}</h2>
        <ol className="relative border-l border-black/10 ml-2 space-y-10">
          {a.timeline.map((t) => (
            <li key={t.year} className="relative pl-8 md:pl-12">
              <span className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-accent" />
              <p className="editorial-text text-3xl md:text-4xl text-accent">{t.year}</p>
              <p className="text-sm md:text-base text-ink/80 leading-relaxed mt-1 max-w-2xl">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="max-w-6xl mx-auto mt-20 flex flex-wrap gap-4">
        <Link href="/products" className="inline-flex items-center gap-2 bg-ink text-white hover:bg-accent px-8 py-4 mono-tag text-xs transition-colors">
          Find your comb <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/flexinite" className="inline-flex items-center gap-2 border border-ink/20 hover:bg-ink hover:text-white px-8 py-4 mono-tag text-xs transition-colors">
          Flexinite® Technology
        </Link>
      </div>
    </main>
  );
}
