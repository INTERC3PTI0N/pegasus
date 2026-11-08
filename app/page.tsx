import HomePage from '@/components/HomePage';
import { getContent, type Catalogue } from '@/lib/cms';

export default async function Home() {
  const content = await getContent();
  return <HomePage content={content} catalogue={content['products.catalogue'] as Catalogue} />;
}
