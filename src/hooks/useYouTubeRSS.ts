import { useState, useEffect } from "react";

export interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  channelName: string;
  channelHandle: string;
}

// Channel IDs for HekayatShab channels
const CHANNEL_IDS: Record<string, { id: string; name: string; handle: string }> = {
  HekayatShab: {
    id: "UCmzjU_FLI3fbCyrQEXcL8NQ",
    name: "حکایت شب",
    handle: "@HekayatShab",
  },
  HekayatShabShorts: {
    id: "UCMvGcu5ASjNd0ltPLhAgGHQ",
    name: "حکایت شب - شورتس",
    handle: "@HekayatShabShorts",
  },
  Deklamation: {
    id: "UCT81gNGP4JzSgz_g6nvyaag",
    name: "دکلمیشن",
    handle: "@Deklamation",
  },
  // Same channel as Deklamation, different key for Index
  Deklemeh: {
    id: "UCT81gNGP4JzSgz_g6nvyaag",
    name: "دکلمه",
    handle: "@Deklemeh",
  },
};

// Playlist-based sources (RSS uses playlist_id instead of channel_id)
const PLAYLIST_IDS: Record<string, { id: string; name: string; handle: string }> = {
  HekayatShabFeatured: {
    id: "PLTBw0TZODdKW0tml5K-X6K9h4hSjtg-_4",
    name: "حکایت شب - Featured Stories",
    handle: "@HekayatShab",
  },
};

// Use YOUR DOMAIN proxy endpoint (PHP)
const PROXY_URL = "https://youtube.jafarfrotan.workers.dev/p?url=";

function parseRSSFeed(xmlText: string, channelKey: string): YouTubeVideo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");
  const entries = Array.from(doc.querySelectorAll("entry"));
  const ch = CHANNEL_IDS[channelKey] ?? PLAYLIST_IDS[channelKey];

  const limits: Record<string, number> = {
    HekayatShabFeatured: 3,
    Deklemeh: 8,
  };
  const limit = limits[channelKey] ?? 12;
  return entries.slice(0, limit).map((entry) => {
    const videoId =
      entry.querySelector("videoId")?.textContent ||
      entry.querySelector("id")?.textContent?.replace("yt:video:", "") ||
      "";
    const title = entry.querySelector("title")?.textContent || "";
    const published = entry.querySelector("published")?.textContent || "";
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return {
      id: videoId,
      title,
      publishedAt: published,
      thumbnail,
      channelName: ch?.name || channelKey,
      channelHandle: ch?.handle || "",
    };
  });
}

async function fetchChannelVideos(channelKey: string): Promise<YouTubeVideo[]> {
  const ch = CHANNEL_IDS[channelKey];
  const playlist = PLAYLIST_IDS[channelKey];
  if (!ch && !playlist) return [];

  const rssUrl = ch
    ? `https://www.youtube.com/feeds/videos.xml?channel_id=${ch.id}`
    : `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlist!.id}`;
  const proxyUrl = `${PROXY_URL}${encodeURIComponent(rssUrl)}`;

  try {
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error(`Proxy failed: ${res.status}`);

    const json = await res.json();
    const xmlText = json.contents as string;

    return parseRSSFeed(xmlText, channelKey);
  } catch (error) {
    console.error(`Failed to fetch ${channelKey}:`, error);

    // Fallback proxy (corsproxy.io)
    try {
      const fallbackUrl = `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const xmlText = await fallbackRes.text();
        return parseRSSFeed(xmlText, channelKey);
      }
    } catch (fallbackErr) {
      console.error("Fallback also failed");
    }

    return [];
  }
}

export function useYouTubeVideos(channelKeys: string[]) {
  const [videos, setVideos] = useState<Record<string, YouTubeVideo[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all(
      channelKeys.map(async (key) => {
        const vids = await fetchChannelVideos(key);
        return { key, vids };
      })
    ).then((results) => {
      if (cancelled) return;
      const map: Record<string, YouTubeVideo[]> = {};
      let hasError = false;
      results.forEach(({ key, vids }) => {
        map[key] = vids;
        if (vids.length === 0) hasError = true;
      });
      setVideos(map);
      setLoading(false);
      if (hasError) {
        setError("Some channels failed to load. Check console.");
      }
    }).catch((err) => {
      if (cancelled) return;
      console.error("YouTube fetch error:", err);
      setError("Failed to load videos. Proxy may be down.");
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [channelKeys]);  // Re-run if channels change

  return { videos, loading, error };
}