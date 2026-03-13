import type { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wargames.Institute',
  description: 'Privacy policy for Wargames.Institute.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="dots" opacity={0.06} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Legal
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted">
              Wargames.Institute collects only the information required to respond to inquiries, operate the website, and improve editorial performance.
            </p>
          </div>
          <Card hover={false} className="p-8">
            <div className="space-y-6 text-sm text-muted leading-relaxed">
              <p>
                We may collect contact details you voluntarily provide, standard analytics data, and technical logs required to operate and secure the site.
              </p>
              <p>
                We do not sell personal information. Information submitted through contact channels is used only for response, relationship management, and service delivery.
              </p>
              <p>
                If you need deletion or correction of submitted information, contact <a className="text-tactical-cyan underline underline-offset-4" href="mailto:contact@wargames.institute">contact@wargames.institute</a>.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
