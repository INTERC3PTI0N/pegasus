import { collectionRoute } from '@/lib/collection-route';

const route = collectionRoute('collection.hard-rubber', '/collections/hard-rubber');
export const generateMetadata = route.generateMetadata;
export default route.Page;
