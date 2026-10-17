import { revalidateTag } from 'next/cache';
import { CONTENT_TAG } from '@/lib/cms';
import { hasSiteSecret } from '@/lib/site-secret';

/** Called by the admin after a publish so new content shows immediately. */
export async function POST(request: Request) {
  if (!hasSiteSecret(request)) return new Response('Forbidden', { status: 403 });
  revalidateTag(CONTENT_TAG);
  return Response.json({ revalidated: true });
}
