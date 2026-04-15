/** Extract YouTube video id from common URL shapes. */
export function parseYouTubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  const u = url.trim();
  const watch = u.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (watch) return watch[1];
  const short = u.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (short) return short[1];
  const embed = u.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embed) return embed[1];
  return null;
}

export function youtubeEmbedUrl(videoId) {
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}`;
}

export function youtubeWatchUrl(videoId) {
  if (!videoId) return '';
  return `https://www.youtube.com/watch?v=${videoId}`;
}
