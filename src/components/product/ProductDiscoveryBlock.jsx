import { useTranslation } from '@/lib/i18n';
import { parseYouTubeVideoId, youtubeEmbedUrl, youtubeWatchUrl } from '@/lib/youtubeEmbed';

/**
 * PDP “discovery” block: answer-style copy + optional official video for AEO / GEO
 * (visible text + embed; pair with VideoObject in ProductJsonLd when videoUrl is set).
 */
export default function ProductDiscoveryBlock({ product }) {
  const { dynamicT } = useTranslation();
  if (!product) return null;

  const paragraph = product.discoveryParagraph;
  const videoUrl = product.videoUrl;
  const videoId = videoUrl ? parseYouTubeVideoId(videoUrl) : null;

  if (!paragraph && !videoId) return null;

  return (
    <section
      id="product-discovery"
      className="mt-14 w-full border-y border-[#111]/10 bg-[#FAFAFA] scroll-mt-[var(--site-header-height)]"
      aria-labelledby="product-discovery-heading"
    >
      <div className="py-10 lg:py-12">
        <h2
          id="product-discovery-heading"
          className="text-xs uppercase tracking-[0.25em] font-bold text-[#111]/40 mb-4"
        >
          {product.discoveryHeading || 'Why practices consider this'}
        </h2>

        {paragraph && (
          <p className="text-sm sm:text-base text-[#111]/75 font-body leading-relaxed mb-8">
            {dynamicT(paragraph)}
          </p>
        )}

        {videoId && (
          <div>
            <h3 className="text-[11px] uppercase tracking-widest font-bold text-[#111]/50 mb-3">
              See it in use
            </h3>
            <div className="aspect-video w-full rounded-card border border-[#111]/10 bg-black overflow-hidden shadow-card">
              <iframe
                title={`${dynamicT(product.name)} — product video`}
                src={`${youtubeEmbedUrl(videoId)}?rel=0`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="mt-3 text-xs text-[#111]/50 font-body">
              <a
                href={youtubeWatchUrl(videoId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold hover:underline"
              >
                Open on YouTube
              </a>
              {videoUrl && videoUrl !== youtubeWatchUrl(videoId) && (
                <>
                  {' · '}
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Original link
                  </a>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
