import Link from 'next/link';
import { Hero } from "@/components/sections/Hero";
import { MissionStatement } from "@/components/sections/MissionStatement";
import { Card, Button } from "@/components/ui";
import { homeFeatured, serviceAreas } from '@/lib/site-content';
import { getArticles, getProjects, getResearchBriefs } from '@/lib/sanity/content';

export default async function Home() {
  const [featuredResearch, featuredArticles, featuredProjects] = await Promise.all([
    getResearchBriefs(),
    getArticles(),
    getProjects(),
  ]);

  return (
    <>
      <Hero />
      <MissionStatement />

      {/* Interactive Wargames Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Learn Through <span className="text-tactical-cyan">Interactive</span> Demos
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Use small playable examples to study how turns, objectives, counters, terrain, and force ratios actually work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card variant="briefing">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-2 text-sm">
                  Reality into Game
                </h3>
                <p className="text-xs text-muted mb-4">
                  Watch a real-world problem become a playable system through abstraction
                </p>
              </Card>

              <Card variant="briefing">
                <div className="text-3xl mb-4">⚔️</div>
                <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-2 text-sm">
                  Objective Control
                </h3>
                <p className="text-xs text-muted mb-4">
                  A demo of objectives, terrain effects, force concentration, and limited actions
                </p>
              </Card>

              <Card variant="briefing">
                <div className="text-3xl mb-4">⬡</div>
                <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-2 text-sm">
                  Hex Maneuver
                </h3>
                <p className="text-xs text-muted mb-4">
                  A skirmish demo showing adjacency, terrain, objectives, and tempo on a hex map
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/resources">
                <Button variant="primary" size="lg">
                  EXPLORE RESOURCES & DEMOS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder sections - to be developed */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You Can <span className="text-tactical-cyan">Study Here</span>
              </h2>
              <p className="text-center text-muted max-w-3xl mx-auto">
                The site is organized around public education in wargaming: how games work, what their mechanics imply, and how they can be used as tools for analysis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceAreas.map((area) => (
                <Card key={area.title} variant="briefing">
                  <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-3 text-sm">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted mb-4">{area.summary}</p>
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
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
              <div>
                <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
                  Articles & Analysis
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  For <span className="text-tactical-amber">Wargamers Who Want to Understand Why</span>
                </h2>
                <p className="text-muted max-w-2xl">
                  Game guides that teach complex systems step-by-step. Mechanics breakdowns that explain what rules are modeling. Research using wargames to explore strategic questions.
                </p>
              </div>
              <div className="grid gap-4">
                {homeFeatured.map((item) => (
                  <Card key={item.title} hover={false} className="p-5">
                    <div className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">{item.label}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted mb-4">{item.summary}</p>
                    <Link href={item.href} className="font-mono text-xs uppercase tracking-wider text-tactical-amber">
                      View Section
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                {featuredResearch.slice(0, 3).map((brief) => (
                  <Card key={brief.title} hover={false} className="p-5">
                    <div className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">{brief.category}</div>
                    <h3 className="text-lg font-bold mb-2">{brief.title}</h3>
                    <p className="text-sm text-muted mb-2">{brief.summary}</p>
                    <p className="text-xs text-tactical-amber">{brief.signal}</p>
                    {'slug' in brief ? (
                      <Link href={`/research/${brief.slug}`} className="inline-block mt-4 font-mono text-xs uppercase tracking-wider text-tactical-cyan">
                        Open Brief
                      </Link>
                    ) : null}
                  </Card>
                ))}
              </div>
              <div className="space-y-4">
                {featuredArticles.slice(0, 3).map((article) => (
                  <Card key={article.title} hover={false} className="p-5">
                    <div className="font-mono text-xs uppercase tracking-wider text-tactical-amber mb-2">{'series' in article ? article.series : 'Article'}</div>
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.slice(0, 3).map((project) => (
                <Card key={project.title} variant="tactical" className="p-6">
                  <div className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">
                    {'type' in project ? project.type : 'Project'}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-sm text-muted mb-4">{project.summary}</p>
                  {'tags' in project && project.tags ? (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 border border-tactical-cyan/30 text-tactical-amber">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {'slug' in project ? (
                    <Link href={`/projects/${project.slug}`} className="inline-block mt-4 font-mono text-xs uppercase tracking-wider text-tactical-cyan">
                      View Guide →
                    </Link>
                  ) : null}
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  READ ARTICLES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
