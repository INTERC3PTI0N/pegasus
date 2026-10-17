import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { isValidPreviewToken } from '@/lib/site-secret';

/** Entered from the admin's "Preview draft" button: shows unpublished drafts in this browser only. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  if (!isValidPreviewToken(params.get('token'))) return new Response('Preview link expired or invalid', { status: 401 });
  (await draftMode()).enable();
  const path = params.get('path') ?? '/';
  redirect(path.startsWith('/') && !path.startsWith('//') ? path : '/'); // same-site paths only
}
