'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Props {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const links = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { label: 'Email', href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable - ignore */
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
        Share
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.label === 'Email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg border border-border text-xs font-bold text-foreground hover:border-primary hover:text-primary transition-colors min-h-[36px] inline-flex items-center"
          >
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          className="px-3 py-2 rounded-lg border border-border text-xs font-bold text-foreground hover:border-primary hover:text-primary transition-colors min-h-[36px] inline-flex items-center gap-1.5"
        >
          <Icon name={copied ? 'CheckIcon' : 'LinkIcon'} size={14} />
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
