import { Metadata } from 'next';
import { GridOverlay, TacticalDivider, Card } from '@/components/ui';
import { serviceAreas } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'About | Wargames.Institute',
  description: 'Learn about our mission to turn complex problems into playable systems through model abstraction and strategic simulation.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="hex" opacity={0.05} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              About the Institute
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Turning Complex Problems Into <span className="text-tactical-cyan">Playable Systems</span>
            </h1>
            <p className="text-xl text-muted">
              A research and education platform dedicated to the study and application of model abstraction through simulations and strategic games.
            </p>
          </div>

          <TacticalDivider variant="gradient" />

          {/* Core Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-tactical-amber">&gt;</span>
              Core Mission
            </h2>
            <Card variant="briefing" className="mb-8">
              <p className="text-lg leading-relaxed mb-4">
                Wargames.Institute is a <strong className="text-tactical-cyan">public education project</strong> dedicated to teaching how wargames work, what they model, and why they're valuable tools for thinking and learning.
              </p>
              <p className="text-muted leading-relaxed">
                We focus on helping wargamers ask better questions:
              </p>
              <ul className="mt-4 space-y-2 text-muted">
                <li className="flex items-start"><span className="text-tactical-cyan mr-3">&gt;</span> What is this mechanic actually modeling?</li>
                <li className="flex items-start"><span className="text-tactical-cyan mr-3">&gt;</span> Why did the designer choose this rule over alternatives?</li>
                <li className="flex items-start"><span className="text-tactical-cyan mr-3">&gt;</span> How can I learn complex games without getting overwhelmed?</li>
                <li className="flex items-start"><span className="text-tactical-cyan mr-3">&gt;</span> What can wargames teach about real-world strategic problems?</li>
              </ul>
            </Card>
          </section>

          <TacticalDivider variant="dashed" />

          {/* What We Do */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-tactical-amber">&gt;</span>
              What the Institute Does
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {serviceAreas.map((area) => (
                <Card key={area.title} hover={false}>
                  <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-3">{area.title}</h3>
                  <p className="text-sm text-muted mb-3">{area.summary}</p>
                  <ul className="space-y-2 text-xs text-muted">
                    {area.details.map((detail) => (
                      <li key={detail} className="flex items-start">
                        <span className="text-tactical-cyan mr-2">&gt;</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
              <Card hover={false}>
                <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-3">Content Philosophy</h3>
                <p className="text-sm text-muted">
                  We write game guides, mechanics analyses, and research pieces that treat wargaming as a serious intellectual activity, not just entertainment.
                </p>
              </Card>
            </div>
          </section>

          <TacticalDivider variant="dashed" />

          {/* Core Philosophy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-tactical-amber">&gt;</span>
              Core Philosophy
            </h2>
            <div className="bg-background-secondary border-l-4 border-tactical-cyan p-8">
              <p className="text-xl mb-4">
                <strong className="text-tactical-cyan">Reality is too complex to fully understand.</strong>
              </p>
              <p className="text-muted mb-4">
                The solution is <strong className="text-foreground">abstraction</strong>.
              </p>
              <p className="text-muted mb-4">
                By simplifying systems into models and interacting with them through games and simulations, we can experiment with strategies, observe consequences, and gain insight into how systems behave.
              </p>
              <p className="text-lg text-tactical-amber">
                <strong>Playable models become thinking tools.</strong>
              </p>
            </div>
          </section>

          <TacticalDivider variant="dashed" />

          {/* Long-term Vision */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-tactical-amber">&gt;</span>
              Long-Term Vision
            </h2>
            <Card variant="tactical">
              <p className="text-lg leading-relaxed mb-4">
                Build a comprehensive public resource for wargamers who want to understand the hobby more deeply—covering everything from <strong className="text-tactical-cyan">how to play complex games</strong> to <strong className="text-tactical-cyan">using wargames as research tools</strong> to <strong className="text-tactical-cyan">identifying new pedagogical methods</strong> that emerge from how wargames teach.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted mb-6">
                <div className="flex items-center gap-2"><span className="text-tactical-cyan">•</span> Game Guides</div>
                <div className="flex items-center gap-2"><span className="text-tactical-cyan">•</span> Mechanics Analysis</div>
                <div className="flex items-center gap-2"><span className="text-tactical-cyan">•</span> Teaching Resources</div>
                <div className="flex items-center gap-2"><span className="text-tactical-cyan">•</span> Design Methods</div>
                <div className="flex items-center gap-2"><span className="text-tactical-cyan">•</span> Research Applications</div>
                <div className="flex items-center gap-2"><span className="text-tactical-cyan">•</span> Pedagogical Innovation</div>
              </div>
              <p className="text-lg text-tactical-amber">
                The goal is to make wargaming more accessible to newcomers while providing depth for experienced players who want to understand <strong>why mechanics work</strong> and <strong>what they teach</strong>.
              </p>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
