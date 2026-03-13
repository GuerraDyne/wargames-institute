import { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';
import { getCaseStudies } from '@/lib/sanity/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies | Wargames.Institute',
  description: 'Game analyses, mechanics breakdowns, and research using wargames to explore real-world questions.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="hex" opacity={0.08} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Deep Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-cyan">Case Studies</span> & Analysis
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Exploring what specific wargames teach, how their mechanics work, and using games to understand historical and strategic questions.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <Card key={study.title} variant="briefing">
                <div className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">
                  {'studyType' in study ? study.studyType : 'Analysis'}
                </div>
                {'gameAnalyzed' in study && study.gameAnalyzed ? (
                  <div className="text-xs text-tactical-amber mb-2">Game: {study.gameAnalyzed}</div>
                ) : null}
                <h2 className="text-2xl font-bold mb-4">{study.title}</h2>
                <div className="space-y-3 text-sm">
                  {'question' in study && study.question ? (
                    <p><span className="text-tactical-amber font-semibold">Question:</span> <span className="text-muted">{study.question}</span></p>
                  ) : null}
                  {'approach' in study && study.approach ? (
                    <p><span className="text-tactical-amber font-semibold">Approach:</span> <span className="text-muted">{study.approach}</span></p>
                  ) : null}
                  {'findings' in study && study.findings ? (
                    <p><span className="text-tactical-amber font-semibold">Findings:</span> <span className="text-muted">{study.findings}</span></p>
                  ) : null}
                </div>
                {'slug' in study ? (
                  <Link href={`/case-studies/${study.slug}`} className="inline-block mt-4 font-mono text-xs uppercase tracking-wider text-tactical-cyan">
                    Read Analysis →
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
