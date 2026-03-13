import { Metadata } from 'next';
import { GridOverlay, TacticalDivider } from '@/components/ui';
import { CounterSystemDemo, HexGridMap, StrategicWargame, SystemAbstractionViz } from '@/components/interactive';

export const metadata: Metadata = {
  title: 'Wargames | Wargames.Institute',
  description: 'Explore playable wargame demos that teach core mechanics, abstraction, and decision-making through interaction.',
};

export default function WargamesPage() {
  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="hex" opacity={0.05} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Interactive Wargames
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-cyan">Playable</span> Wargame Lessons
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              These demos are built to teach. Each one isolates a core wargaming idea and makes the mechanic visible through interaction.
            </p>
          </div>

          {/* System Abstraction Visualizer */}
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <span className="text-tactical-amber">&gt;</span>
                How Wargames Make Reality Playable
              </h2>
              <p className="text-muted">
                See how a messy real-world situation gets simplified into a playable model without losing the structure that makes decisions meaningful.
              </p>
            </div>
            <SystemAbstractionViz />
          </section>

          <TacticalDivider variant="gradient" />

          {/* Strategic Wargame - NEW */}
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <span className="text-tactical-amber">&gt;</span>
                Strategic Territory Control
              </h2>
              <p className="text-muted mb-3">
                A demo of action economy, objectives, terrain, and force concentration. You are learning how operational wargames make position and timing matter more than simple attrition.
              </p>
              <div className="bg-background-tertiary border-l-2 border-tactical-cyan p-3 text-sm">
                <strong className="text-tactical-cyan">Educational Focus:</strong> This demo teaches <strong>objective play, action limits, supply, and combined arms</strong>. It exists to show how a ruleset can make players prioritize decisive ground and sequencing instead of simply chasing fights.
              </div>
            </div>
            <StrategicWargame />
          </section>

          <TacticalDivider variant="gradient" />

          {/* Hex Grid Map */}
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <span className="text-tactical-amber">&gt;</span>
                Tactical Hex Skirmish
              </h2>
              <p className="text-muted">
                A demo of hex-based maneuver. It teaches adjacency, terrain friction, local force ratios, and how initiative shifts when you spend actions badly.
              </p>
            </div>
            <HexGridMap />
          </section>

          <TacticalDivider variant="gradient" />

          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <span className="text-tactical-amber">&gt;</span>
                Hex and Counter Primer
              </h2>
              <p className="text-muted">
                A compact explainer for classic hex-and-counter systems. It shows how counters encode movement, combat, and battlefield role directly in their printed values.
              </p>
            </div>
            <CounterSystemDemo />
          </section>

          {/* Mechanics Summary */}
          <div className="bg-background-secondary border-l-4 border-tactical-cyan p-8 mt-16">
            <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-3">
              Mechanics on Display
            </h3>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                These are small teaching demos. They are not full wargames, and they are not meant to claim more than they actually show.
              </p>
              <p>
                What each one is demonstrating:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-3">•</span>
                  <span><strong className="text-foreground">Reality to Playable Model:</strong> variable selection, simplification, and the move from messy reality to a rule-bound system.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-3">•</span>
                  <span><strong className="text-foreground">Strategic Territory Control:</strong> action economy, reinforcement, objectives, terrain modifiers, and force concentration on a node map.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-3">•</span>
                  <span><strong className="text-foreground">Tactical Hex Skirmish:</strong> hex adjacency, movement costs by terrain, reserve reinforcement, and local superiority at the point of contact.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-3">•</span>
                  <span><strong className="text-foreground">Hex and Counter Primer:</strong> how traditional counters encode movement, attack, defense, and battlefield role directly on the piece.</span>
                </li>
              </ul>
              <p className="pt-2 border-t border-tactical-cyan/20">
                The point of this page is to make the underlying mechanics legible. Larger lessons only emerge when those mechanics are embedded in a fuller scenario, ruleset, and adjudication model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
