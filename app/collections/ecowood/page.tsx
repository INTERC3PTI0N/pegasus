import { collectionRoute } from '@/lib/collection-route';

const route = collectionRoute('collection.ecowood', '/collections/ecowood');
export const generateMetadata = route.generateMetadata;
export default route.Page;
