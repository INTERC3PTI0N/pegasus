import type { Metadata } from 'next';
import CollectionPage, { CollectionPageData } from '@/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Ecowood Combs — StaticBlock Technology | PEGASUS',
  description:
    'Pegasus Ecowood combs backed by StaticBlock Technology. Sustainable, natural and eco-friendly — they prevent fly-aways, reduce frizz and glide gently through your hair.',
};

const data: CollectionPageData = {
  tag: 'ECO MADE RANGE',
  title: 'Ecowood Combs Backed by StaticBlock Technology',
  subtitle: 'Sustainable. Natural. Eco-Friendly.',
  heroImage: '/images/pegasus_ecowood.jpg',
  intro:
    'Completely earth and scalp friendly. Inspired by nature, the secret to happy hair and a nourished scalp lies in this ultimate comb — handcrafted for perfection.',
  benefits: [
    'Prevents fly-aways and reduces frizz',
    'Smooth, polished teeth for a gentle glide',
    'Naturally anti-static and anti-bacterial',
    'Perfect for sensitive scalps — no scraping or bruising',
  ],
  techName: 'STATICBLOCK',
  techTagline: 'Calm Hair. Naturally.',
  techDesc:
    'Pegasus Ecowood combs with StaticBlock Technology prevent fly-aways and reduce frizz. Their teeth are smooth and polished, ensuring a gentle glide through your hair, while the natural element of the comb is both anti-static and anti-bacterial.',
  features: [
    {
      title: 'Static Dissipation',
      desc: 'The natural wood body neutralises the electrical charge that friction builds during dry combing — no more fly-aways.',
    },
    {
      title: 'Gentle Rounded Tips',
      desc: 'Smooth rounded tips prevent scraping or bruising, making Ecowood perfect for sensitive scalps.',
    },
    {
      title: 'Anti-Bacterial by Nature',
      desc: 'The organic material is naturally anti-bacterial, keeping the tool hygienic between salon services.',
    },
    {
      title: 'Earth Friendly',
      desc: 'Sustainably sourced and handcrafted for perfection — a comb that cares for your hair and the planet.',
    },
  ],
  otherCollections: [
    { label: 'Hard Rubber · Flexinite', href: '/collections/hard-rubber' },
    { label: 'Cellulose Acetate', href: '/collections/cellulose' },
  ],
};

export default function EcowoodPage() {
  return <CollectionPage data={data} />;
}
