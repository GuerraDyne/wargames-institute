import { Metadata } from 'next';
import { GridOverlay, TacticalDivider } from '@/components/ui';
import { CounterSystemDemo, SystemAbstractionViz, ZoneOfControlDemo, CombatResultsTableDemo, SupplyLinesDemo } from '@/components/interactive';

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

          {/* Zone of Control Demo */}
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <span className="text-tactical-amber">&gt;</span>
                Zone of Control (ZOC)
              </h2>
              <p className="text-muted mb-3">
                How wargames model front lines and positional control. Units exert control over adjacent hexes, forcing enemies to stop when entering their zone. This creates realistic friction and forces players to screen, flank, or breakthrough.
              </p>
              <div className="bg-background-tertiary border-l-2 border-tactical-cyan p-3 text-sm">
                <strong className="text-tactical-cyan">Educational Focus:</strong> ZOC teaches <strong>positional play, screening, breakthrough tactics, and why you can't just walk past enemy units</strong>. This is the foundation of tactical movement in hex-based wargames.
              </div>
            </div>
            <ZoneOfControlDemo />
          </section>

          <TacticalDivider variant="gradient" />

          {/* Combat Results Table Demo */}
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <span className="text-tactical-amber">&gt;</span>
                Combat Results Table (CRT)
              </h2>
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

          {/* Supply Lines Demo */}
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <span className="text-tactical-amber">&gt;</span>
                Supply Lines & Logistics
              </h2>
              <p className="text-muted mb-3">
                Units must trace a path back to a supply source to remain effective. Cutting enemy supply lines (interdiction) is often more decisive than direct combat. This mechanic creates strategic depth beyond the front line.
              </p>
              <div className="bg-background-tertiary border-l-2 border-tactical-cyan p-3 text-sm">
                <strong className="text-tactical-cyan">Educational Focus:</strong> Supply teaches <strong>logistics, rear-area security, interdiction, and why operational depth matters</strong>. Professional wargames model supply because it's often the limiting factor in real campaigns.
              </div>
            </div>
            <SupplyLinesDemo />
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
                  <span><strong className="text-foreground">Zone of Control (ZOC):</strong> how units exert control over adjacent hexes, creating front lines and forcing movement decisions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-3">•</span>
                  <span><strong className="text-foreground">Combat Results Table (CRT):</strong> odds-based combat resolution with force ratios, terrain modifiers, and probabilistic outcomes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-3">•</span>
                  <span><strong className="text-foreground">Supply Lines:</strong> logistical constraints, supply tracing, interdiction, and the importance of rear-area security.</span>
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
