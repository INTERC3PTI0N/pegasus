import type { Catalogue, Product } from './cms';

/** Display name for a comb: its catalogue name, else "PEGASUS® 514A". */
export const productName = (p: Product) => p.name || `PEGASUS® ${p.model}`;

export const productHref = (p: Product) => `/products/${encodeURIComponent(p.model)}`;

export const findProduct = (c: Catalogue, model: string) =>
  c.products.find((p) => p.model.toLowerCase() === model.toLowerCase());

/** Hair-type tags a comb carries, resolved to their names (unknown ids are dropped). */
export const hairTypeNames = (c: Catalogue, p: Product) =>
  p.hairTypes.map((id) => c.hairTypes.find((h) => h.id === id.toLowerCase())?.name).filter(Boolean) as string[];
