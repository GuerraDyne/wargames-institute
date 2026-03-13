import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GridOverlay, Card } from '@/components/ui';
import { DetailBody } from '@/components/content';
import { getArticle, getArticles } from '@/lib/sanity/content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getArticles();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getArticle(slug);
  return item
    ? {
        title: `${item.title} | Blog | Wargames.Institute`,
        description: item.summary,
      }
    : {};
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getArticle(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="dots" opacity={0.06} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="font-mono text-xs uppercase tracking-widest text-tactical-amber mb-4">{'series' in item ? item.series : 'Article'}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
            <p className="text-xl text-muted">{item.summary}</p>
          </div>
          <Card hover={false} className="p-8">
            <DetailBody body={'body' in item ? item.body : undefined} />
          </Card>
        </div>
      </div>
    </div>
  );
}
