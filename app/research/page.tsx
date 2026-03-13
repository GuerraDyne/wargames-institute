import { Metadata } from 'next';
import { GridOverlay, Card, TacticalDivider } from '@/components/ui';
import { getResearchBriefs } from '@/lib/sanity/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Research | Wargames.Institute',
  description: 'Explore our research on wargames, simulations, and strategic model abstraction.',
};

export default async function ResearchPage() {
  const researchBriefs = await getResearchBriefs();

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="square" opacity={0.08} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Research Division
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-cyan">Research</span> & Analysis
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Publish essays, mechanics breakdowns, and scenario-based analysis that show how wargames can clarify systems, decisions, and real-world problems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {researchBriefs.map((brief) => (
              <Card key={brief.title} variant="briefing">
                <div className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">{brief.category}</div>
                <h2 className="text-2xl font-bold mb-3">{brief.title}</h2>
                <p className="text-sm text-muted mb-3">{brief.summary}</p>
                {'signal' in brief && brief.signal ? (
                  <p className="text-xs text-tactical-amber mb-4">{brief.signal}</p>
                ) : null}
                {'slug' in brief ? (
                  <Link href={`/research/${brief.slug}`} className="font-mono text-xs uppercase tracking-wider text-tactical-cyan">
                    Read Brief
                  </Link>
                ) : null}
              </Card>
            ))}
          </div>

          <TacticalDivider variant="gradient" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Card hover={false}>
              <h2 className="font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-3">Publishing Pillars</h2>
              <ul className="space-y-3 text-sm text-muted">
                <li>Strategic briefs on actors, incentives, and plausible moves.</li>
                <li>Operational studies on logistics, readiness, sustainment, and tempo.</li>
                <li>Methods notes explaining how models were built and what they can or cannot say.</li>
                <li>Flagship estimates that synthesize indicators, scenarios, and decision implications.</li>
              </ul>
            </Card>
            <Card hover={false}>
              <h2 className="font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-3">Sanity-Compatible Structure</h2>
              <p className="text-sm text-muted mb-3">
                This page is intentionally driven by structured content objects. Later, each brief can map cleanly to a Sanity document with fields such as `title`, `category`, `summary`, `signals`, `slug`, and `publishedAt`.
              </p>
              <p className="text-sm text-muted">
                The visual layout can remain stable while the data source changes from local arrays to GROQ queries.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
