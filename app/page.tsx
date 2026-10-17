import HomePage from '@/components/HomePage';
import { getContent } from '@/lib/cms';

export default async function Home() {
  return <HomePage content={await getContent()} />;
}
