import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import { getContent, type Catalogue } from '@/lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const c = (await getContent())['products.catalogue'];
  return { title: c.seoTitle, description: c.seoDescription };
}

const chip = (active: boolean) =>
  `mono-tag text-[11px] px-4 py-2 border transition-colors whitespace-nowrap ${
    active ? 'border-ink bg-ink text-white' : 'border-black/10 text-ink/70 hover:border-accent hover:text-accent'
  }`;

/** PEGASUS® Hard Rubber (Ebonite) combs, organised by function and filtered by hair type. */
export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ function?: string; hair?: string }> }) {
  const c = (await getContent())['products.catalogue'] as Catalogue;
  const params = await searchParams;
  const fn = c.functions.find((f) => f.id === params.function);
  const hair = c.hairTypes.find((h) => h.id === params.hair);

  const href = (next: { function?: string; hair?: string }) => {
    const q = new URLSearchParams();
    const f = 'function' in next ? next.function : fn?.id;
    const h = 'hair' in next ? next.hair : hair?.id;
    if (f) q.set('function', f);
    if (h) q.set('hair', h);
    return `/products${q.size ? `?${q}` : ''}`;
  };

  // "All hair types" combs suit any hair, so they stay in every hair-type filter.
  const matchesHair = (types: string[]) => !hair || types.includes(hair.id) || (hair.id !== 'all' && types.includes('all'));
  const products = c.products.filter((p) => (!fn || p.function === fn.id) && matchesHair(p.hairTypes));
  const count = (id: string) => c.products.filter((p) => p.function === id).length;

  return (
    <main className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <PageHeader kicker={c.kicker} title={c.title} intro={c.intro} />

      {/* What every comb shares */}
      <section className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-px bg-black/10 border border-black/10">
        {c.advantages.map((a) => (
          <div key={a.title} className="bg-white p-6">
            <h2 className="editorial-text text-xl text-ink">{a.title}</h2>
            <p className="text-xs text-silver leading-relaxed mt-2">{a.text}</p>
          </div>
        ))}
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto mt-14 space-y-5">
        <div>
          <p className="mono-tag text-[10px] text-silver mb-3">Function</p>
          <div className="flex flex-wrap gap-2">
            <Link href={href({ function: undefined })} className={chip(!fn)} scroll={false}>All · {c.products.length}</Link>
            {c.functions.map((f) => (
              <Link key={f.id} href={href({ function: f.id })} className={chip(fn?.id === f.id)} scroll={false}>
                {f.name}{count(f.id) > 0 && ` · ${count(f.id)}`}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mono-tag text-[10px] text-silver mb-3">Hair type</p>
          <div className="flex flex-wrap gap-2">
            <Link href={href({ hair: undefined })} className={chip(!hair)} scroll={false}>Any</Link>
            {c.hairTypes.map((h) => (
              <Link key={h.id} href={href({ hair: h.id })} className={chip(hair?.id === h.id)} scroll={false} title={h.desc}>
                {h.name}
              </Link>
            ))}
          </div>
        </div>
        {(fn || hair) && (
          <div className="border-l-2 border-accent pl-4 py-1 space-y-1">
            {fn && <p className="text-sm text-ink"><strong className="font-medium">{fn.name}:</strong> {fn.purpose}</p>}
            {hair && <p className="text-sm text-ink"><strong className="font-medium">{hair.name}:</strong> {hair.desc}</p>}
          </div>
        )}
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto mt-10">
        {products.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.model} product={p} catalogue={c} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-silver py-16 text-center border border-dashed border-black/10">
            No combs match this filter yet. <Link href="/products" className="text-accent hover:underline">Show all combs</Link>
          </p>
        )}
      </section>
    </main>
  );
}
