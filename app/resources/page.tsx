import { Metadata } from 'next';
import { GridOverlay, Card, TacticalDivider } from '@/components/ui';
import { CounterSystemDemo, SystemAbstractionViz, CombatResultsTableDemo } from '@/components/interactive';
import { getResources } from '@/lib/sanity/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resources | Wargames.Institute',
  description: 'Educational materials, frameworks, and tools for strategic simulation and model abstraction.',
};

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function ResourcesPage() {
  const resourceItems = await getResources();

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="square" opacity={0.08} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-amber uppercase tracking-widest mb-4 border border-tactical-amber/30 px-4 py-2">
              Resource Library
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-amber">Resources</span> & Downloads
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Publish reusable frameworks, reading maps, templates, and debrief tools that support the institute&apos;s methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {resourceItems.map((resource) => (
              <Card key={resource.title} hover={false}>
                <div className="font-mono text-xs uppercase tracking-wider text-tactical-amber mb-2">{'format' in resource ? resource.format : 'Resource'}</div>
                <h2 className="text-2xl font-bold mb-3">{resource.title}</h2>
                <p className="text-sm text-muted">{resource.summary}</p>
                {'slug' in resource ? (
                  <Link href={`/resources/${resource.slug}`} className="inline-block mt-4 font-mono text-xs uppercase tracking-wider text-tactical-amber">
                    Open Resource
                  </Link>
                ) : null}
              </Card>
            ))}
          </div>

          <TacticalDivider variant="gradient" />

          {/* Interactive Wargame Lessons */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
                Interactive Lessons
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="text-tactical-cyan">Playable</span> Wargame Mechanics
              </h2>
              <p className="text-lg text-muted max-w-3xl mx-auto">
                These demos are built to teach. Each one isolates a core wargaming idea and makes the mechanic visible through interaction.
              </p>
            </div>

            {/* System Abstraction Visualizer */}
            <section className="mb-16">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-tactical-amber">&gt;</span>
                  How Wargames Make Reality Playable
                </h3>
                <p className="text-muted">
                  See how a messy real-world situation gets simplified into a playable model without losing the structure that makes decisions meaningful.
                </p>
              </div>
              <SystemAbstractionViz />
            </section>

            <TacticalDivider variant="gradient" />

            {/* Combat Results Table Demo */}
            <section className="mb-16">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-tactical-amber">&gt;</span>
                  Combat Results Table (CRT)
                </h3>
                <p className="text-muted mb-3">
                  The classic odds-based combat system used in most traditional wargames. Attack strength vs defense strength creates odds ratios (3:1, 2:1, etc.), terrain shifts the column left, and dice determine the result.
                </p>
                <div className="bg-background-tertiary border-l-2 border-tactical-cyan p-3 text-sm">
                  <strong className="text-tactical-cyan">Educational Focus:</strong> The CRT teaches <strong>force concentration, combined arms, when to attack vs defend, and how terrain affects combat odds</strong>. This mechanic makes planning and preparation matter more than dice luck.
                </div>
              </div>
              <CombatResultsTableDemo />
            </section>

            <TacticalDivider variant="gradient" />

            <section className="mb-16">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-tactical-amber">&gt;</span>
                  Hex and Counter Primer
                </h3>
                <p className="text-muted">
                  A compact explainer for classic hex-and-counter systems. It shows how counters encode movement, combat, and battlefield role directly in their printed values.
                </p>
              </div>
              <CounterSystemDemo />
            </section>

            {/* Teaching Summary */}
            <div className="bg-background-secondary border-l-4 border-tactical-cyan p-8 mt-16">
              <h4 className="font-mono text-tactical-cyan uppercase tracking-wider mb-3">
                What These Demos Teach
              </h4>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  These are focused teaching tools, not full wargames. Each one isolates a core concept and makes it visible through interaction.
                </p>
                <p>
                  What you&apos;re learning:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-tactical-cyan mr-3">•</span>
                    <span><strong className="text-foreground">Reality to Playable Model:</strong> How complex real-world situations get simplified into playable systems without losing the structure that makes decisions meaningful.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tactical-cyan mr-3">•</span>
                    <span><strong className="text-foreground">Combat Results Table (CRT):</strong> The classic odds-based combat system. Learn why force concentration matters, how terrain affects combat, and when to attack vs defend. This mechanic makes planning and preparation matter more than dice luck.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tactical-cyan mr-3">•</span>
                    <span><strong className="text-foreground">Hex and Counter Primer:</strong> How traditional wargame counters encode movement, attack strength, defense strength, and battlefield role directly on the piece. This is the information-dense design language of classic wargames.</span>
                  </li>
                </ul>
                <p className="pt-2 border-t border-tactical-cyan/20">
                  These mechanics are building blocks. Real wargames combine them with scenarios, historical context, and adjudication rules to explore specific questions about conflict, strategy, and decision-making under uncertainty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
