import Link from 'next/link';
import type { Catalogue, Product } from '@/lib/cms';
import { hairTypeNames, productHref, productName } from '@/lib/products';

export default function ProductCard({ product: p, catalogue }: { product: Product; catalogue: Catalogue }) {
  const fn = catalogue.functions.find((f) => f.id === p.function);
  const hair = hairTypeNames(catalogue, p);

  return (
    <Link href={productHref(p)} className="group flex flex-col bg-white border border-black/5 hover:border-accent/40 transition-colors">
      {/* White panel: most source photos have a white (not transparent) background. */}
      <div className="relative aspect-square bg-white border-b border-black/5 flex items-center justify-center overflow-hidden">
        <img
          src={p.image}
          alt={productName(p)}
          loading="lazy"
          className="h-[86%] w-auto object-contain rotate-[30deg] transition-transform duration-700 group-hover:rotate-[24deg] group-hover:scale-105"
          draggable={false}
        />
        <span className="absolute top-3 left-3 mono-tag text-[10px] text-ink/60">{p.model}</span>
      </div>
      <div className="p-4 space-y-1.5">
        <h3 className="editorial-text text-xl text-ink group-hover:text-accent transition-colors leading-tight">{productName(p)}</h3>
        {fn && <p className="mono-tag text-[10px] text-accent">{fn.name}</p>}
        {(hair.length > 0 || p.size) && (
          <p className="text-[11px] text-silver leading-snug">{[p.size, hair.join(' · ')].filter(Boolean).join(' — ')}</p>
        )}
      </div>
    </Link>
  );
}
