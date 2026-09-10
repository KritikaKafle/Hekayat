import { Loader2, Youtube, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { VideoCard } from "@/components/VideoCard";
import { FacebookSection } from "@/components/FacebookSection";
import { useYouTubeVideos } from "@/hooks/useYouTubeRSS";
import heroBg from "@/assets/heroBg.svg";

const CHANNEL_KEYS: string[] = [
  "HekayatShab",
  "HekayatShabShorts",
  "Deklemeh",
  "HekayatShabFeatured",
];

export default function Index() {
  // فقط همین یک‌بار هوک را صدا می‌زنیم
  const { videos, loading, error } = useYouTubeVideos(CHANNEL_KEYS);

  // وقتی هنوز در حال لود است، اصلاً نرو سراغ longVideos و ...
  if (loading) {
    return (
      <div style={{ backgroundColor: "#101010", minHeight: "100vh" }}>
        <SiteHeader />

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ minHeight: "420px", height: "480px" }}>
          <img
            src={heroBg}
            alt="HekayatShab Hero"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,16,16,0.3) 0%, rgba(16,16,16,0.7) 60%, #101010 100%)",
            }}
          />

          <div className="relative flex h-full flex-col items-center justify-center text-center px-4">
            <h1
              className="mb-3 text-4xl font-black md:text-6xl"
              style={{
                fontFamily: "Doran, sans-serif",
                color: "#f6c916",
                textShadow: "0 0 40px rgba(246,201,22,0.5), 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              HekayatShab
            </h1>
            <p
              className="mb-2 text-2xl md:text-3xl"
              style={{
                fontFamily: "Doran, sans-serif",
                color: "hsl(46 80% 72%)",
                textShadow: "0 0 20px rgba(246,201,22,0.3)",
              }}
            >
              حکایت شب
            </p>
            <p
              className="max-w-lg text-sm"
              style={{ color: "hsl(46 40% 55%)", fontFamily: "Doran, sans-serif" }}
            >
              قصه‌ها، دکلمه‌ها و روایت‌های شب
            </p>

            <a
              href="https://deklemeh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#f6c916] focus:ring-offset-2 focus:ring-offset-[#101010]"
              style={{
                backgroundColor: "#f6c916",
                color: "#101010",
                fontFamily: "Doran, sans-serif",
              }}
            >
              دیوان کامل شاعران پارسی
            </a>

            <div className="mt-6 flex items-center gap-2" style={{ color: "hsl(46 50% 50%)" }}>
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm" style={{ fontFamily: "Doran, sans-serif" }}>
                Loading latest videos…
              </span>
            </div>
            {error && (
              <p className="mt-3 text-xs" style={{ color: "hsl(0 0% 70%)" }}>
                {error}
              </p>
            )}
          </div>
        </section>

        {/* اسکلت‌های لودینگ */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div id="featured" className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionTitle title="Featured Stories" subtitle="حکایت‌ها" />
              <LoadingSkeleton count={3} isShort={false} />
            </div>

            <div id="shorts">
              <SectionTitle title="Shorts" subtitle="شورتس‌های حکایت شب" />
              <LoadingSkeleton count={9} isShort={true} />
            </div>
          </div>

          <section id="Deklemeh" className="mt-20">
            <div className="mb-8 overflow-hidden rounded-2xl p-6" />
            <LoadingSkeleton count={8} isShort={true} />
          </section>
        </div>

        <FacebookSection />
        {/* فوتر هم اگر دوست داری می‌توانی اینجا بگذاری */}
      </div>
    );
  }

  // از اینجا به بعد یعنی ویدیوها لود شده‌اند (یا خالی‌اند ولی آبجکت هست)

  const longVideos = (videos["HekayatShabFeatured"] || []).slice(0, 3);

  const shortVideos = [
    ...(videos["HekayatShab"] || []),
    ...(videos["HekayatShabShorts"] || []),
  ]
    .sort((a, b) => {
      const ad = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bd = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bd - ad;
    })
    .slice(0, 9);

  const DeklemehVideos = (videos["Deklemeh"] || []).slice(0, 8);

  return (
    <div style={{ backgroundColor: "#101010", minHeight: "100vh" }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px", height: "480px" }}>
        <img
          src={heroBg}
          alt="HekayatShab Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(16,16,16,0.3) 0%, rgba(16,16,16,0.7) 60%, #101010 100%)",
          }}
        />

        <div className="relative flex h-full flex-col items-center justify-center text-center px-4">
          <h1
            className="mb-3 text-4xl font-black md:text-6xl"
            style={{
              fontFamily: "Doran, sans-serif",
              color: "#f6c916",
              textShadow: "0 0 40px rgba(246,201,22,0.5), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            HekayatShab
          </h1>
          <p
            className="mb-2 text-2xl md:text-3xl"
            style={{
              fontFamily: "Doran, sans-serif",
              color: "hsl(46 80% 72%)",
              textShadow: "0 0 20px rgba(246,201,22,0.3)",
            }}
          >
            حکایت شب
          </p>

          <a
            href="https://deklemeh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#f6c916] focus:ring-offset-2 focus:ring-offset-[#101010]"
            style={{
              backgroundColor: "#f6c916",
              color: "#101010",
              fontFamily: "Doran, sans-serif",
            }}
          >
            دیوان کامل شاعران پارسی
          </a>

          {error && (
            <p className="mt-3 text-xs" style={{ color: "hsl(0 0% 70%)" }}>
              {error}
            </p>
          )}
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Featured Long Videos + Shorts Grid side by side */}
        <div id="featured" className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: 3 Featured Long Videos */}
          <div>
            <SectionTitle title="Featured Stories" subtitle="حکایت‌ها" />

            <div className="flex flex-col gap-5">
              {longVideos.length > 0 ? (
                longVideos.map((v) => (
                  <VideoCard
                    key={v.id}
                    videoId={v.id}
                    title={v.title}
                    thumbnail={v.thumbnail}
                    channelName={v.channelName}
                    publishedAt={v.publishedAt}
                  />
                ))
              ) : (
                <div
                  className="flex flex-col items-center gap-4 rounded-xl p-10 text-center"
                  style={{
                    backgroundColor: "hsl(0 0% 9%)",
                    border: "1px solid hsl(0 0% 18%)",
                  }}
                >
                  <Youtube size={40} style={{ color: "#f6c916" }} />
                  <a
                    href="https://www.youtube.com/@hekayatshab?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "#f6c916",
                      color: "#101010",
                      fontFamily: "Doran, sans-serif",
                    }}
                  >
                    <Youtube size={16} />
                    Visit Channel
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* Channel links */}
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  {
                    label: "HekayatShab",
                    url: "https://www.youtube.com/@hekayatshab?sub_confirmation=1",
                  },
                  {
                    label: "HekayatShabShorts",
                    url: "https://www.youtube.com/@hekayatshabshorts?sub_confirmation=1",
                  },
                ].map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "hsl(0 0% 9%)",
                      border: "1px solid rgba(246,201,22,0.3)",
                      color: "#f6c916",
                      fontFamily: "Doran, sans-serif",
                    }}
                  >
                    <Youtube size={12} style={{ color: "hsl(0 62% 50%)" }} />
                    {ch.label}
                    <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Shorts Grid */}
          <div id="shorts">
            <SectionTitle
              title="Shorts"
              subtitle="شورتس‌های حکایت شب"
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {shortVideos.length > 0 ? (
                shortVideos.map((v, i) => (
                  <div
                    key={`${v.id}-${i}`}
                    className={i === shortVideos.length - 1 ? "hidden sm:block" : undefined}
                  >
                    <VideoCard
                      videoId={v.id}
                      title={v.title}
                      thumbnail={v.thumbnail}
                      channelName={v.channelName}
                      publishedAt={v.publishedAt}
                      isShort
                    />
                  </div>
                ))
              ) : (
                <div
                  className="col-span-3 flex flex-col items-center gap-4 rounded-xl p-10 text-center"
                  style={{
                    backgroundColor: "hsl(0 0% 9%)",
                    border: "1px solid hsl(0 0% 18%)",
                  }}
                >
                  <Youtube size={40} style={{ color: "#f6c916" }} />
                  <a
                    href="https://www.youtube.com/@hekayatshabshorts?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "#f6c916",
                      color: "#101010",
                      fontFamily: "Doran, sans-serif",
                    }}
                  >
                    <Youtube size={16} />
                    HekayatShabShorts
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Deklemeh Section */}
        <section id="Deklemeh" className="mt-20">
          <div
            className="mb-8 overflow-hidden rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, hsl(0 0% 9%), hsl(46 20% 8%))",
              border: "1px solid rgba(246,201,22,0.15)",
            }}
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <SectionTitle
                  title="Deklemeh"
                  subtitle="دکلمه - کانال جدید"
                  badge="NEW CHANNEL"
                />
              </div>
              <a
                href="https://www.youtube.com/channel/UCT81gNGP4JzSgz_g6nvyaag"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:opacity-80"
                style={{
                  backgroundColor: "rgba(246,201,22,0.1)",
                  border: "1px solid rgba(246,201,22,0.3)",
                  color: "#f6c916",
                  fontFamily: "Doran, sans-serif",
                }}
              >
                <Youtube size={16} style={{ color: "hsl(0 62% 50%)" }} />
                Subscribe
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {DeklemehVideos.length > 0 ? (
                DeklemehVideos.map((v, i) => (
                  <VideoCard
                    key={`dek-${v.id}-${i}`}
                    videoId={v.id}
                    title={v.title}
                    thumbnail={v.thumbnail}
                    channelName={v.channelName}
                    publishedAt={v.publishedAt}
                    isShort
                  />
                ))
              ) : (
                <div
                  className="col-span-4 flex flex-col items-center gap-4 rounded-xl p-10 text-center"
                  style={{
                    backgroundColor: "hsl(0 0% 9%)",
                    border: "1px solid hsl(0 0% 18%)",
                  }}
                >
                  <Youtube size={40} style={{ color: "#f6c916" }} />
                  <p
                    style={{
                      color: "hsl(46 50% 50%)",
                      fontFamily: "Doran, sans-serif",
                    }}
                  >
                    کانال دکلمه — به‌زودی محتوای بیشتر
                  </p>
                  <a
                    href="https://www.youtube.com/channel/UCT81gNGP4JzSgz_g6nvyaag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "#f6c916",
                      color: "#101010",
                      fontFamily: "Doran, sans-serif",
                    }}
                  >
                    <Youtube size={16} />
                    Visit Deklemeh
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Facebook Section */}
      <FacebookSection />

      {/* Footer */}
      <footer
        className="py-8 text-center"
        style={{
          borderTop: "1px solid hsl(0 0% 14%)",
          backgroundColor: "hsl(0 0% 5%)",
        }}
      >
        <p
          className="text-sm"
          style={{
            color: "hsl(46 40% 40%)",
            fontFamily: "Doran, sans-serif",
          }}
        >
          © {new Date().getFullYear()} HekayatShab · All rights reserved
        </p>

        <p
          className="mt-1 text-xs"
          style={{
            color: "hsl(0 0% 30%)",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          powered by{" "}
          <a
            href="https://zeytoonict.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "hsl(0 0% 30%)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "olive")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(0 0% 30%)")}
          >
            Zeytoon ICT
          </a>
        </p>

      </footer>
    </div>
  );
}
