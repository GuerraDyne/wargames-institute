import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@/lib/sanity/types';

export interface PortableContentProps {
  value?: PortableTextBlock[];
}

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-muted">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold mt-8 mb-3">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 ml-5 list-disc text-muted space-y-2">{children}</ul>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        className="text-tactical-cyan underline underline-offset-4"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export function PortableContent({ value }: PortableContentProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
