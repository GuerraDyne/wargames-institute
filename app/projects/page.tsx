import { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';
import { getProjects } from '@/lib/sanity/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects | Wargames.Institute',
  description: 'Game guides, mechanics breakdowns, and original educational wargames.',
};

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function ProjectsPage() {
  const projectProfiles = await getProjects();

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="square" opacity={0.08} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Learning Resources
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-cyan">Projects</span> & Guides
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Game guides, teaching resources, and original wargames designed to help you learn complex systems and understand why mechanics matter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projectProfiles.map((project) => (
              <Card key={project.title} variant="tactical">
                <div className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">{'type' in project ? project.type : 'Project'}</div>
                <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                <p className="text-sm text-muted mb-4">{project.summary}</p>
                {'tags' in project && project.tags ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 border border-tactical-cyan/30 text-tactical-amber">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                {'slug' in project ? (
                  <Link href={`/projects/${project.slug}`} className="inline-block mt-6 font-mono text-xs uppercase tracking-wider text-tactical-cyan">
                    View Guide →
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
