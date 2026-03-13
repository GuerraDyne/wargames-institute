import type { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Terms of Service | Wargames.Institute',
  description: 'Terms of service for Wargames.Institute.',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="square" opacity={0.06} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Legal
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted">
              This website is provided for informational, research, and business-development purposes.
            </p>
          </div>
          <Card hover={false} className="p-8">
            <div className="space-y-6 text-sm text-muted leading-relaxed">
              <p>
                Content on this site may not be reproduced, republished, or redistributed without permission unless otherwise stated.
              </p>
              <p>
                Material published here is intended for general informational use and does not constitute legal, operational, or financial advice.
              </p>
              <p>
                By using the site, you agree not to misuse the services, interfere with availability, or attempt unauthorized access to the application or CMS.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
