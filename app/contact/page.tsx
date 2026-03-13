import { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';
import { ContactForm } from '@/components/contact';
import { inquiryTracks } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Contact | Wargames.Institute',
  description: 'Get in touch with Wargames.Institute for collaboration, research inquiries, or educational partnerships.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="dots" opacity={0.08} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Communications Channel
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-cyan">Contact</span> the Institute
            </h1>
            <p className="text-xl text-muted">
              Reach out with questions, collaboration ideas, teaching inquiries, or research proposals related to wargames and model abstraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {inquiryTracks.map((track) => (
              <Card key={track.title} hover={false}>
                <h2 className="font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-3">{track.title}</h2>
                <p className="text-sm text-muted">{track.description}</p>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card variant="tactical">
            <ContactForm />
          </Card>

          {/* Contact Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover={false} className="text-center">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Email</h3>
              <a href="mailto:contact@wargames.institute" className="text-sm text-muted hover:text-foreground transition-colors">
                contact@wargames.institute
              </a>
            </Card>
            <Card hover={false} className="text-center">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Social</h3>
              <p className="text-sm text-muted">LinkedIn • Twitter • GitHub</p>
            </Card>
            <Card hover={false} className="text-center">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Response Time</h3>
              <p className="text-sm text-muted">24-48 hours</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
