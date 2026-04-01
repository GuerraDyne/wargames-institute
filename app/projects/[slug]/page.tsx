import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GridOverlay, Card } from '@/components/ui';
import { DetailBody } from '@/components/content';
import { getProject, getProjects } from '@/lib/sanity/content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const items = await getProjects();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getProject(slug);
  return item
    ? {
        title: `${item.title} | Projects | Wargames.Institute`,
        description: item.summary,
      }
    : {};
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getProject(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="square" opacity={0.06} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="font-mono text-xs uppercase tracking-widest text-tactical-cyan mb-4">{'type' in item ? item.type : 'Project'}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
            <p className="text-xl text-muted mb-6">{item.summary}</p>
            {'tags' in item && item.tags?.length ? (
              <ul className="space-y-2 text-sm text-muted mb-6">
                {item.tags.map((tag) => (
                  <li key={tag} className="flex items-start">
                    <span className="text-tactical-amber mr-2">•</span>
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <Card hover={false} className="p-8">
            <DetailBody body={'body' in item ? item.body : undefined} />
          </Card>
        </div>
      </div>
    </div>
  );
}
