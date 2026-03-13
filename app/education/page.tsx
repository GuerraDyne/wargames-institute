import { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';
import { getEducationPrograms } from '@/lib/sanity/content';

export const metadata: Metadata = {
  title: 'Education | Wargames.Institute',
  description: 'Study wargaming, mechanics, model abstraction, and research-oriented play through our educational programs.',
};

export default async function EducationPage() {
  const educationPrograms = await getEducationPrograms();

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="hex" opacity={0.08} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Education Programs
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-cyan">Wargaming</span> Education
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Learn how wargames work, how scenarios and mechanics are built, and how structured play can support analysis, research, and better questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {educationPrograms.map((program) => (
              <Card key={program.title} variant="briefing">
                <div className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">
                  {'learningPath' in program ? program.learningPath : 'Learning Path'}
                </div>
                <h2 className="text-2xl font-bold mb-3">{program.title}</h2>
                <p className="text-sm text-muted mb-4">{program.summary}</p>
                <ul className="space-y-2 text-xs text-muted">
                  {('topics' in program ? program.topics : []).map((topic) => (
                    <li key={topic} className="flex items-start">
                      <span className="text-tactical-cyan mr-2">&gt;</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
