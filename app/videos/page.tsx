import { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Videos | Wargames.Institute',
  description: 'Video tutorials, strategic analysis, and wargame playthroughs from Wargames.Institute.',
};

// Placeholder - we'll integrate YouTube API or RSS feed
const YOUTUBE_CHANNEL_ID = 'UCYourChannelID'; // Update with actual channel ID
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@WargamesInstitute';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

// For now, manually curated videos - we can automate this with YouTube Data API later
const videos: Video[] = [
  // Add your videos here as you publish them
  // Example format:
  // {
  //   id: 'VIDEO_ID',
  //   title: 'Video Title',
  //   description: 'Video description',
  //   thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  //   publishedAt: '2024-03-15',
  // }
];

export default function VideosPage() {
  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="hex" opacity={0.08} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Video Library
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-cyan">Videos</span> & Tutorials
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto mb-6">
              Strategic analysis, game tutorials, and wargaming lessons. Watch how strategic theory manifests on the tabletop.
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-tactical-cyan/10 border border-tactical-cyan/30 hover:bg-tactical-cyan/20 transition-colors font-mono text-sm uppercase tracking-wider text-tactical-cyan"
            >
              Subscribe on YouTube
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>

          {/* Video Grid */}
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} hover={true} className="overflow-hidden">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="aspect-video bg-background-tertiary relative overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-muted line-clamp-2">{video.description}</p>
                      <div className="text-xs text-tactical-cyan font-mono mt-3">
                        {new Date(video.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Card className="max-w-2xl mx-auto p-12">
                <div className="text-6xl mb-6">🎥</div>
                <h2 className="text-2xl font-bold mb-4">Videos Coming Soon</h2>
                <p className="text-muted mb-6">
                  Subscribe to the YouTube channel to be notified when new strategic analysis and wargaming tutorials are published.
                </p>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-tactical-cyan/10 border border-tactical-cyan/30 hover:bg-tactical-cyan/20 transition-colors font-mono text-sm uppercase tracking-wider text-tactical-cyan"
                >
                  Visit YouTube Channel
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </Card>
            </div>
          )}

          {/* Note about YouTube API integration */}
          <div className="mt-12 bg-background-secondary border-l-4 border-tactical-cyan p-6">
            <h3 className="font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-2">
              About This Page
            </h3>
            <p className="text-sm text-muted">
              This page will automatically display videos from the{' '}
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-tactical-cyan hover:underline">
                Wargames Institute YouTube channel
              </a>
              . Videos are added manually for now, but can be automated with YouTube Data API integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
