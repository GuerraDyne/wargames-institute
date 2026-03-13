'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

export function ContactForm() {
  const [emailLink, setEmailLink] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n');

    const href = `mailto:contact@wargames.institute?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailLink(href);
    window.location.href = href;
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-2">
            Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-background border border-tactical-blue focus:border-tactical-cyan outline-none transition-colors font-mono text-sm"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-2">
            Email <span className="text-error">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-background border border-tactical-blue focus:border-tactical-cyan outline-none transition-colors font-mono text-sm"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-2">
          Subject <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 bg-background border border-tactical-blue focus:border-tactical-cyan outline-none transition-colors font-mono text-sm"
          placeholder="Brief subject line"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-2">
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={8}
          className="w-full px-4 py-3 bg-background border border-tactical-blue focus:border-tactical-cyan outline-none transition-colors font-mono text-sm resize-none"
          placeholder="Your message..."
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          SEND MESSAGE
        </Button>
        <p className="text-xs text-muted font-mono text-center sm:text-left">
          Opens your email client with a prefilled inquiry.
        </p>
      </div>

      {emailLink ? (
        <p className="text-xs text-muted font-mono">
          If your email client did not open, use{' '}
          <a href={emailLink} className="text-tactical-cyan underline underline-offset-4">
            this direct mail link
          </a>.
        </p>
      ) : null}
    </form>
  );
}
