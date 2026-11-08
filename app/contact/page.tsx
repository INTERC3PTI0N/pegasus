import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import EnquiryForm from '@/components/EnquiryForm';
import { getContent } from '@/lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const c = (await getContent())['contact.page'];
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const c = (await getContent())['contact.page'];
  // Arriving from a comb's page pre-fills the enquiry with its model number.
  const product = (await searchParams).product?.replace(/[^\w-]/g, '').slice(0, 12) || undefined;

  return (
    <main className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <PageHeader kicker={c.kicker} title={c.title} intro={c.sub} />

      <div className="max-w-6xl mx-auto mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Mumbai — the only office */}
        <section className="lg:col-span-5 bg-mist border border-black/5 p-8 space-y-6">
          <div>
            <p className="mono-tag text-[10px] text-accent">{c.officeRole}</p>
            <h2 className="editorial-text text-3xl text-ink mt-2">{c.officeName}</h2>
          </div>
          <p className="flex gap-3 text-sm text-ink/80 leading-relaxed">
            <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {c.address}
          </p>
          <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="flex gap-3 text-sm text-ink/80 hover:text-accent">
            <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {c.phone}
          </a>
          <a href={`mailto:${c.email}`} className="flex gap-3 text-sm text-ink/80 hover:text-accent">
            <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {c.email}
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mono-tag text-[11px] text-ink border-b border-ink/30 hover:text-accent hover:border-accent"
          >
            Open in Google Maps
          </a>
        </section>

        <section className="lg:col-span-7">
          <EnquiryForm dealerText={c.dealerText} businessText={c.businessText} product={product} />
        </section>
      </div>
    </main>
  );
}
