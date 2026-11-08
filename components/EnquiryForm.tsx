'use client';

import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { submitEnquiry } from '@/app/actions';

/** Trade / salon enquiry form. Submissions arrive in the Pegasus admin → Enquiries. */
export default function EnquiryForm({
  dealerText,
  businessText,
  product,
}: {
  dealerText: string;
  businessText: string;
  product?: string;
}) {
  const [kind, setKind] = useState<'dealer' | 'business'>('business');
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    message: product ? `I'd like more information about the PEGASUS® ${product} comb.` : '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const res = await submitEnquiry({ kind, ...form, interest: product });
    setSending(false);
    if (res.ok) setSent(true);
    else setError(res.error ?? 'Something went wrong. Please try again.');
  };

  if (sent) {
    return (
      <div className="border border-accent bg-accent/5 p-8 text-center">
        <Check className="mx-auto w-6 h-6 text-accent" />
        <p className="editorial-text text-2xl text-ink mt-3">Thank you, we&rsquo;ll be in touch</p>
        <p className="text-sm text-silver mt-2">We&rsquo;ll reply to {form.email}.</p>
      </div>
    );
  }

  const label = 'mono-tag text-[10px] text-silver';
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex gap-2" role="tablist">
        {([['business', 'Salon & education'], ['dealer', 'Trade & distribution']] as const).map(([k, l]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={kind === k}
            onClick={() => setKind(k)}
            className={`flex-1 py-2.5 mono-tag text-[11px] border transition-colors ${kind === k ? 'border-ink bg-ink text-white' : 'border-black/10 text-ink/70 hover:text-ink'}`}
          >
            {l}
          </button>
        ))}
      </div>
      <p className="text-xs text-silver leading-relaxed">{kind === 'dealer' ? dealerText : businessText}</p>

      <label className="block space-y-1.5">
        <span className={label}>Company / salon</span>
        <input name="company" required value={form.company} onChange={change} className="w-full p-3 custom-input text-sm" autoComplete="organization" />
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className={label}>Your name</span>
          <input name="name" required value={form.name} onChange={change} className="w-full p-3 custom-input text-sm" autoComplete="name" />
        </label>
        <label className="block space-y-1.5">
          <span className={label}>Email</span>
          <input name="email" type="email" required value={form.email} onChange={change} className="w-full p-3 custom-input text-sm" autoComplete="email" />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className={label}>Message</span>
        <textarea name="message" required rows={5} value={form.message} onChange={change} className="w-full p-3 custom-input text-sm resize-y" />
      </label>

      {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full py-4 bg-ink text-white hover:bg-accent transition-colors mono-tag text-xs inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {sending ? 'Sending…' : 'Send enquiry'} <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
