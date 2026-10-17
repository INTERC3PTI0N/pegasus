import { draftMode } from 'next/headers';
import defaults from '@/content/defaults.json';

/**
 * Site copy is managed in the Pegasus admin (CMS_URL). Published content is cached and
 * refreshed when the admin publishes (it calls /api/revalidate), or at most every 5 minutes.
 * If the admin is unreachable the site falls back to content/defaults.json — it never breaks.
 */

export type SiteContent = typeof defaults;
export type Link = { label: string; href: string };
export type FooterColumn = { heading: string; links: Link[] };
export type Article = SiteContent['home.journal']['articles'][number];
export type Location = SiteContent['home.contact']['locations'][number];
export type CollectionContent = SiteContent['collection.hard-rubber'];

export const CONTENT_TAG = 'site-content';

export async function getContent(): Promise<SiteContent> {
  const cms = process.env.CMS_URL?.replace(/\/$/, '');
  if (!cms) return defaults;

  const { isEnabled: preview } = await draftMode();
  try {
    const res = await fetch(`${cms}/api/site/content${preview ? '?draft=1' : ''}`, {
      headers: preview ? { 'x-site-secret': process.env.SITE_SECRET ?? '' } : undefined,
      ...(preview ? { cache: 'no-store' } : { next: { tags: [CONTENT_TAG], revalidate: 300 } }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    const remote = (await res.json()) as Partial<SiteContent>;
    // Block by block, so a missing block still renders from defaults.
    return Object.fromEntries(
      Object.keys(defaults).map((k) => [k, { ...defaults[k as keyof SiteContent], ...(remote[k as keyof SiteContent] ?? {}) }])
    ) as SiteContent;
  } catch (e) {
    console.error('[cms] falling back to built-in content:', e);
    return defaults;
  }
}

export async function isPreview(): Promise<boolean> {
  return (await draftMode()).isEnabled;
}
