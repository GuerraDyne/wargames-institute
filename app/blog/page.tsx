import { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';
import { getArticles } from '@/lib/sanity/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Wargames.Institute',
  description: 'Insights on wargaming, strategic thinking, and model abstraction.',
};

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
  const articlePreviews = await getArticles();

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="dots" opacity={0.08} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-amber uppercase tracking-widest mb-4 border border-tactical-amber/30 px-4 py-2">
              Knowledge Base
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-amber">Blog</span> & Articles
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Support the flagship research output with methods essays, analyst training notes, and commentary on serious wargaming practice.
            </p>
          </div>

          <div className="space-y-6">
            {articlePreviews.map((article) => (
              <Card key={article.title} hover={false} className="p-8">
                <div className="font-mono text-xs uppercase tracking-wider text-tactical-amber mb-2">{'series' in article ? article.series : 'Article'}</div>
                <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
                <p className="text-sm text-muted">{article.summary}</p>
                {'slug' in article ? (
                  <Link href={`/blog/${article.slug}`} className="inline-block mt-4 font-mono text-xs uppercase tracking-wider text-tactical-amber">
                    Read Article
                  </Link>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
