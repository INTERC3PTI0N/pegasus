/** Heading block for inner pages (About, Flexinite®, Products, Contact). */
export default function PageHeader({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <header className="max-w-6xl mx-auto">
      <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-6 block w-fit">{kicker}</span>
      <h1 className="editorial-text text-5xl md:text-6xl lg:text-7xl text-ink max-w-4xl">{title}</h1>
      {intro && <p className="text-base md:text-lg text-silver leading-relaxed mt-5 max-w-2xl">{intro}</p>}
    </header>
  );
}
