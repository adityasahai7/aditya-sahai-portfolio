export type Video = { id: string; title: string; published: string };

/** Latest uploads from the channel's public RSS feed (no API key). Revalidated hourly. */
export async function latestVideos(channelId: string, since: string, limit = 6): Promise<Video[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    const decode = (t: string) => t.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    return entries
      .map((e) => ({
        id: e.match(/<yt:videoId>([^<]+)/)?.[1] ?? "",
        title: decode(e.match(/<title>([^<]+)/)?.[1] ?? ""),
        published: e.match(/<published>([^<]+)/)?.[1] ?? "",
      }))
      .filter((v) => /^[\w-]{11}$/.test(v.id) && v.published >= since)
      .slice(0, limit);
  } catch {
    return [];
  }
}
