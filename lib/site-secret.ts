import { createHmac, timingSafeEqual } from 'crypto';

/** Shared with the Pegasus admin (same SITE_SECRET on both deployments). */
function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function hasSiteSecret(request: Request): boolean {
  const secret = process.env.SITE_SECRET;
  const given = request.headers.get('x-site-secret');
  return !!secret && !!given && safeEqual(given, secret);
}

/** Preview links from the admin carry `<expiry ms>.<hmac>` instead of the secret itself. */
export function isValidPreviewToken(token: string | null): boolean {
  const secret = process.env.SITE_SECRET;
  if (!secret || !token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || !(Number(exp) > Date.now())) return false;
  const expected = createHmac('sha256', secret).update(`preview:${exp}`).digest('base64url');
  return safeEqual(sig, expected);
}
