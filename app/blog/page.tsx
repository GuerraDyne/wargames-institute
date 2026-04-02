import { Metadata } from 'next';
import { GridOverlay, Card } from '@/components/ui';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Wargames.Institute',
  description: 'Strategic analysis, wargaming commentary, and research from Wargames.Institute. Subscribe on Substack for regular updates.',
};

// ISR: Revalidate every 60 seconds to fetch latest Substack posts
export const revalidate = 60;

const SUBSTACK_URL = 'https://wargamesinstitute.substack.com';
const SUBSTACK_RSS_URL = 'https://wargamesinstitute.substack.com/feed';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
}

async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const response = await fetch(SUBSTACK_RSS_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Failed to fetch Substack RSS');
      return [];
    }

    const xmlText = await response.text();

    // Basic XML parsing - extract items
    const items = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];

    return items.map(item => {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                   item.match(/<title>(.*?)<\/title>/)?.[1] || 'Untitled';
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
                         item.match(/<description>(.*?)<\/description>/)?.[1] || '';
      const guid = item.match(/<guid.*?>(.*?)<\/guid>/)?.[1] || link;

      // Strip HTML from description for excerpt
      const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 200) + '...';

      return {
        title,
        link,
        pubDate,
        description: cleanDescription,
        guid,
      };
    });
  } catch (error) {
    console.error('Error fetching Substack posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getSubstackPosts();
  const featuredPost = posts[0]; // Most recent post as featured
  const regularPosts = posts.slice(1);

  return (
    <div className="pt-32 pb-20">
      <GridOverlay pattern="dots" opacity={0.08} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block font-mono text-xs text-tactical-amber uppercase tracking-widest mb-4 border border-tactical-amber/30 px-4 py-2">
              Strategic Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tactical-amber">Blog</span> & Commentary
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto mb-6">
              Strategic analysis, wargaming research, and commentary on how strategy manifests on the tabletop.
              All content published on Substack.
            </p>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-tactical-amber/10 border border-tactical-amber/30 hover:bg-tactical-amber/20 transition-colors font-mono text-sm uppercase tracking-wider text-tactical-amber"
            >
              Subscribe on Substack
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {posts.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-3">Content Coming Soon</h2>
              <p className="text-muted mb-6">
                Subscribe on Substack to be notified when new strategic analysis and wargaming commentary is published.
              </p>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-tactical-amber/10 border border-tactical-amber/30 hover:bg-tactical-amber/20 transition-colors font-mono text-sm uppercase tracking-wider text-tactical-amber"
              >
                Visit Substack
              </a>
            </Card>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <div className="font-mono text-xs uppercase tracking-wider text-tactical-amber mb-4 flex items-center gap-2">
                    <span className="px-2 py-1 border border-tactical-amber/30 bg-tactical-amber/10">Featured</span>
                    Latest Post
                  </div>
                  <Card hover={true} className="p-8 border-2 border-tactical-amber/30">
                    <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-muted mb-4 leading-relaxed">{featuredPost.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted font-mono">
                        {new Date(featuredPost.pubDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <a
                        href={featuredPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-tactical-amber/10 border border-tactical-amber/30 hover:bg-tactical-amber/20 transition-colors font-mono text-xs uppercase tracking-wider text-tactical-amber"
                      >
                        Read on Substack
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </Card>
                </div>
              )}

              {/* Recent Posts */}
              {regularPosts.length > 0 && (
                <>
                  <div className="font-mono text-xs uppercase tracking-wider text-tactical-amber mb-6">
                    Recent Posts
                  </div>
                  <div className="space-y-6">
                    {regularPosts.map((post) => (
                      <Card key={post.guid} hover={true} className="p-6">
                        <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                        <p className="text-sm text-muted mb-4">{post.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted font-mono">
                            {new Date(post.pubDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-tactical-amber hover:text-tactical-cyan transition-colors"
                          >
                            Read on Substack
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {/* Subscribe CTA */}
              <div className="mt-12 bg-background-secondary border-l-4 border-tactical-amber p-8">
                <h3 className="font-mono text-sm uppercase tracking-wider text-tactical-amber mb-3">
                  Subscribe for Regular Updates
                </h3>
                <p className="text-muted mb-4">
                  Get strategic analysis, wargaming commentary, and research delivered directly to your inbox.
                  Free and premium subscriptions available.
                </p>
                <a
                  href={`${SUBSTACK_URL}/subscribe`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-tactical-amber/10 border border-tactical-amber/30 hover:bg-tactical-amber/20 transition-colors font-mono text-sm uppercase tracking-wider text-tactical-amber"
                >
                  Subscribe on Substack
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
