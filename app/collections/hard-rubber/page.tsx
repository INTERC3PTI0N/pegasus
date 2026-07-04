import type { Metadata } from 'next';
import CollectionPage, { CollectionPageData } from '@/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Hard Rubber Combs — Flexinite Technology | PEGASUS',
  description:
    'Pegasus Hard Rubber combs powered by Flexinite Technology. Precision cutting and styling for professionals — high-heat and chemical resistant, flexible, strong and durable.',
};

const data: CollectionPageData = {
  tag: 'HARD RUBBER RANGE — 100% EBONITE',
  title: 'Hard Rubber Combs Powered by Flexinite Technology',
  subtitle: 'Precision Cutting & Styling. For Professionals.',
  heroImage: '/images/pegasus_hard_rubber.jpg',
  intro:
    'The only professional combs that provide precision, quality and sustainability along with glamour and funk — to groom all hair types.',
  benefits: [
    'Designed specifically for professional hairdressers globally',
    'High-heat and chemical resistant',
    'Flexible, strong and durable construction',
    'Infinite styling possibilities for all hair types',
  ],
  techName: 'FLEXINITE',
  techTagline: 'A Truly Versatile Experience',
  techDesc:
    'Made from 100% hard rubber (Ebonite) with proprietary Flexinite Technology, developed after extensive research examining global hair textures and climate conditions. The material responds to temperature changes, enabling versatile temperature-sensitive performance across cutting, colouring and heat-styling applications.',
  features: [
    {
      title: 'Thermo-Responsive Body',
      desc: 'Responds intelligently to temperature changes under dryers and irons, keeping the glide frictionless where ordinary polymers snag.',
    },
    {
      title: 'Chemical Tolerance',
      desc: 'Virtually impervious to bleach, colour and peroxide — built for the daily chemistry of the professional salon backwash.',
    },
    {
      title: 'Saw-Cut & Hand Polished',
      desc: 'Every tooth is individually saw-cut, then hand-bevelled and polished so no raw seam ever touches the hair cuticle.',
    },
    {
      title: 'Professional Balance',
      desc: 'Weighted and profiled for precision sectioning, cutting and styling in high-volume session work.',
    },
  ],
  otherCollections: [
    { label: 'Cellulose Acetate', href: '/collections/cellulose' },
    { label: 'Ecowood', href: '/collections/ecowood' },
  ],
};

export default function HardRubberPage() {
  return <CollectionPage data={data} />;
}
