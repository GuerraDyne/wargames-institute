import { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </div>
  );
}
