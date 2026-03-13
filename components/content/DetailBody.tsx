import { PortableContent } from './PortableContent';
import type { PortableTextBlock } from '@/lib/sanity/types';

export interface DetailBodyProps {
  body?: PortableTextBlock[] | string[];
}

export function DetailBody({ body }: DetailBodyProps) {
  if (body && body.length > 0) {
    const firstItem = body[0];

    if (typeof firstItem !== 'string') {
      return <PortableContent value={body as PortableTextBlock[]} />;
    }
  }

  if (!body || body.length === 0) {
    return null;
  }

  const paragraphs = body as string[];

  return (
    <div>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mb-4 leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
