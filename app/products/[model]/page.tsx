import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getContent, type Catalogue } from '@/lib/cms';
import { findProduct, productName } from '@/lib/products';

const catalogue = async () => (await getContent())['products.catalogue'] as Catalogue;

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const c = await catalogue();
  const p = findProduct(c, decodeURIComponent((await params).model));
  if (!p) return {};
  const fn = c.functions.find((f) => f.id === p.function);
  return {
    title: `${productName(p)}${fn ? ` — ${fn.name}` : ''} | PEGASUS® Hard Rubber Combs`,
    description: p.description || fn?.purpose || c.seoDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ model: string }> }) {
  const c = await catalogue();
  const p = findProduct(c, decodeURIComponent((await params).model));
  if (!p) notFound();

  const fn = c.functions.find((f) => f.id === p.function);
  const hair = c.hairTypes.filter((h) => p.hairTypes.includes(h.id));
  const related = fn ? c.products.filter((x) => x.function === fn.id && x.model !== p.model).slice(0, 4) : [];

  return (
    <main className="pt-28 md:pt-36 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <Link
          href={fn ? `/products?function=${fn.id}` : '/products'}
          className="inline-flex items-center gap-2 mono-tag text-xs text-silver hover:text-ink transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {fn ? fn.name : 'All combs'}
        </Link>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-6 aspect-square bg-white border border-black/5 flex items-center justify-center overflow-hidden">
            <img src={p.image} alt={productName(p)} className="h-[90%] w-auto object-contain rotate-[30deg]" draggable={false} />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="mono-tag text-xs text-accent">PEGASUS® Hard Rubber (Ebonite) · Model {p.model}</p>
              <h1 className="editorial-text text-5xl md:text-6xl text-ink mt-3">{productName(p)}</h1>
              {p.size && <p className="text-sm text-silver mt-2">{p.size}</p>}
            </div>

            {p.description && <p className="text-base text-ink/80 leading-[1.8]">{p.description}</p>}

            {fn && (
              <div className="border-t border-black/10 pt-5">
                <p className="mono-tag text-[10px] text-silver">Function</p>
                <Link href={`/products?function=${fn.id}`} className="editorial-text text-2xl text-ink hover:text-accent mt-1 inline-block">
                  {fn.name}
                </Link>
                <p className="text-sm text-silver mt-1">{fn.purpose}</p>
              </div>
            )}

            {hair.length > 0 && (
              <div className="border-t border-black/10 pt-5">
                <p className="mono-tag text-[10px] text-silver mb-3">Hair type</p>
                <ul className="space-y-2">
                  {hair.map((h) => (
                    <li key={h.id} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span><strong className="font-medium">{h.name}</strong> — <span className="text-silver">{h.desc}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-black/10 pt-5 space-y-3">
              {c.advantages.map((a) => (
                <p key={a.title} className="text-sm">
                  <strong className="font-medium">{a.title}.</strong> <span className="text-silver">{a.text}</span>
                </p>
              ))}
            </div>

            <Link
              href={`/contact?product=${encodeURIComponent(p.model)}`}
              className="inline-flex items-center gap-2 bg-ink text-white hover:bg-accent px-8 py-4 mono-tag text-xs transition-colors"
            >
              {c.enquiryLabel} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="editorial-text text-3xl md:text-4xl text-ink mb-8">More for {fn!.name}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((r) => (
                <ProductCard key={r.model} product={r} catalogue={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
