import type { Metadata } from 'next';
import CollectionPage, { CollectionPageData } from '@/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Cellulose Acetate Combs — GlamLock Technology | PEGASUS',
  description:
    'Pegasus Cellulose Acetate combs crafted with GlamLock technology. Seamless, hand-polished teeth that detangle easily, stimulate the scalp and make hair smooth and shiny.',
};

const data: CollectionPageData = {
  tag: 'CELLULOSE ACETATE RANGE',
  title: 'The Cellulose Acetate Collection',
  subtitle: 'Seamless. Hand Polished. Scalp Friendly.',
  heroImage: '/images/pegasus_cellulose.jpg',
  intro:
    'Each Cellulose Acetate comb is saw-cut, then hand polished and buffed to ensure smooth, rounded teeth that massage your scalp — a class apart from other combs in the market.',
  benefits: [
    'Seamless teeth detangle hair easily without snagging',
    'Stimulates the scalp for healthy blood circulation',
    'Spreads natural oils evenly from roots to tips',
    'Hair and scalp friendly, plant-derived material',
  ],
  techName: 'GLAMLOCK',
  techTagline: 'Smooth. Shiny. Seamless.',
  techDesc:
    'Ordinary combs have sharp teeth which can roughen the hair and cause scalp damage. Pegasus Cellulose Acetate combs are crafted with GlamLock technology, wherein seamless teeth detangle hair easily and stimulate the scalp — making hair smooth and shiny.',
  features: [
    {
      title: 'Seamless Rounded Teeth',
      desc: 'Hand-finished tips free of moulding seams glide through wet or dry hair without scraping the cuticle.',
    },
    {
      title: 'Natural Oil Distribution',
      desc: 'Smooth rounded teeth evenly spread the hair’s natural oils from the roots to the tips for natural shine.',
    },
    {
      title: 'Scalp Stimulation',
      desc: 'Massaging tooth profiles encourage healthy blood circulation with every pass.',
    },
    {
      title: 'Handcrafted Quality',
      desc: 'Saw-cut, hand polished and buffed — tactile, body-temperature-adaptive material with an elegant finish.',
    },
  ],
  otherCollections: [
    { label: 'Hard Rubber · Flexinite', href: '/collections/hard-rubber' },
    { label: 'Ecowood', href: '/collections/ecowood' },
  ],
};

export default function CellulosePage() {
  return <CollectionPage data={data} />;
}
