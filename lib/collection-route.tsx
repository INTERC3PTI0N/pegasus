import type { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getContent, type SiteContent } from '@/lib/cms';

type CollectionKey = Extract<keyof SiteContent, `collection.${string}`>;

/** Page + metadata for a collection whose copy is managed in the admin. */
export function collectionRoute(key: CollectionKey, href: string) {
  return {
    async generateMetadata(): Promise<Metadata> {
      const c = (await getContent())[key];
      return { title: c.seoTitle, description: c.seoDescription };
    },
    async Page() {
      const content = await getContent();
      const { seoTitle, seoDescription, ...data } = content[key]; // eslint-disable-line @typescript-eslint/no-unused-vars
      const otherCollections = content['global.header'].collectionLinks.filter((l) => l.href !== href);
      return <CollectionPage data={{ ...data, otherCollections }} />;
    },
  };
}
