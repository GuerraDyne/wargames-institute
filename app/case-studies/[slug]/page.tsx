import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GridOverlay, Card } from '@/components/ui';
import { DetailBody } from '@/components/content';
import { getCaseStudies, getCaseStudy } from '@/lib/sanity/content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getCaseStudies();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseStudy(slug);
  return item
    ? {
        title: `${item.title} | Case Studies | Wargames.Institute`,
        description: ('question' in item ? item.question : item.title),
      }
    : {};
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getCaseStudy(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="hex" opacity={0.06} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="font-mono text-xs uppercase tracking-widest text-tactical-cyan mb-4">
              {'studyType' in item ? item.studyType : 'Analysis'}
            </div>
            {'gameAnalyzed' in item && item.gameAnalyzed ? (
              <div className="text-sm text-tactical-amber mb-4">Game Analyzed: {item.gameAnalyzed}</div>
            ) : null}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{item.title}</h1>
            {'question' in item && item.question ? (
              <p className="text-lg text-muted mb-3"><span className="text-tactical-amber font-semibold">Question:</span> {item.question}</p>
            ) : null}
            {'approach' in item && item.approach ? (
              <p className="text-lg text-muted mb-3"><span className="text-tactical-amber font-semibold">Approach:</span> {item.approach}</p>
            ) : null}
            {'findings' in item && item.findings ? (
              <p className="text-lg text-muted mb-6"><span className="text-tactical-amber font-semibold">Findings:</span> {item.findings}</p>
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
