'use server';

export interface EnquiryInput {
  kind: 'brochure' | 'dealer' | 'business';
  name?: string;
  email: string;
  company?: string;
  country?: string;
  role?: string;
  interest?: string;
  message?: string;
  marketingConsent?: boolean;
}

/** Forwards brochure / dealer / business enquiries to the Pegasus admin inbox. */
export async function submitEnquiry(input: EnquiryInput): Promise<{ ok: boolean; error?: string }> {
  const cms = process.env.CMS_URL?.replace(/\/$/, '');
  if (!cms || !process.env.SITE_SECRET) return { ok: false, error: 'Enquiries are temporarily unavailable. Please email us instead.' };
  try {
    const res = await fetch(`${cms}/api/site/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-site-secret': process.env.SITE_SECRET },
      body: JSON.stringify(input),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) return { ok: true };
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: body?.error ?? 'Something went wrong. Please try again.' };
  } catch {
    return { ok: false, error: 'Could not reach our servers. Please try again in a moment.' };
  }
}
