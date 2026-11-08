import { NextResponse } from 'next/server';

/**
 * Menu → Masterclass: the customer portal's "How to start" page (scratch card → code → account),
 * served by the same Pegasus admin app as the CMS. MASTERCLASS_URL overrides it if the portal moves.
 */
export function GET(request: Request) {
  const portal = process.env.MASTERCLASS_URL || (process.env.CMS_URL ? `${process.env.CMS_URL.replace(/\/$/, '')}/start` : '');
  return NextResponse.redirect(portal || new URL('/#masterclass', request.url));
}
