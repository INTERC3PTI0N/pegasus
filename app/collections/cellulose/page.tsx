import { collectionRoute } from '@/lib/collection-route';

const route = collectionRoute('collection.cellulose', '/collections/cellulose');
export const generateMetadata = route.generateMetadata;
export default route.Page;
