import { useState } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

export function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: "#f6c916" }}
        >
          <X size={20} />
          <span style={{ fontFamily: "Doran, sans-serif" }}>Close</span>
        </button>
        <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p
          className="mt-3 text-center text-sm"
          style={{ color: "#f6c916", fontFamily: "Doran, sans-serif" }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

interface VideoCardProps {
  videoId: string;
  title: string;
  thumbnail: string;
  channelName: string;
  publishedAt: string;
  isShort?: boolean;
}

export function VideoCard({
  videoId,
  title,
  thumbnail,
  channelName,
  publishedAt,
  isShort = false,
}: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const date = publishedAt
    ? (() => {
        const ordinals: Record<number, string> = {
          1: "اول",
          2: "دوم",
          3: "سوم",
          4: "چهارم",
          5: "پنجم",
          6: "ششم",
          7: "هفتم",
          8: "هشتم",
          9: "نهم",
          10: "دهم",
          11: "یازدهم",
          12: "دوازدهم",
          13: "سیزدهم",
          14: "چهاردهم",
          15: "پانزدهم",
          16: "شانزدهم",
          17: "هفدهم",
          18: "هجدهم",
          19: "نوزدهم",
          20: "بیستم",
          21: "بیست‌ویکم",
          22: "بیست‌ودوم",
          23: "بیست‌وسوم",
          24: "بیست‌وچهارم",
          25: "بیست‌وپنجم",
          26: "بیست‌وششم",
          27: "بیست‌وهفتم",
          28: "بیست‌وهشتم",
          29: "بیست‌ونهم",
          30: "سی‌ام",
          31: "سی‌ویکم",
        };

        const d = new Date(publishedAt);
        const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).formatToParts(d);

        const dayStr = parts.find((p) => p.type === "day")?.value ?? "";
        const month = parts.find((p) => p.type === "month")?.value ?? "";
        const year = parts.find((p) => p.type === "year")?.value ?? "";

        if (!dayStr || !month || !year) {
          return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(d);
        }

        const latinDay = Number(
          dayStr
            .replace(/۰/g, "0")
            .replace(/۱/g, "1")
            .replace(/۲/g, "2")
            .replace(/۳/g, "3")
            .replace(/۴/g, "4")
            .replace(/۵/g, "5")
            .replace(/۶/g, "6")
            .replace(/۷/g, "7")
            .replace(/۸/g, "8")
            .replace(/۹/g, "9")
        );

        const ordinal = ordinals[latinDay];
        if (!ordinal) {
          return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(d);
        }

        return `${ordinal} ${month} ${year}`;
      })()
    : "";

  const thumbSrc = imgErr
    ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
    : thumbnail;

  return (
    <>
      {open && (
        <VideoModal videoId={videoId} title={title} onClose={() => setOpen(false)} />
      )}
      <div
        className="group cursor-pointer overflow-hidden rounded-lg transition-all duration-300"
        style={{
          backgroundColor: "hsl(0 0% 9%)",
          border: "1px solid hsl(0 0% 18%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
        }}
        onClick={() => setOpen(true)}
      >
        <div
          className="relative overflow-hidden"
          style={{ paddingTop: isShort ? "177.78%" : "56.25%" }}
        >
          <img
            src={thumbSrc}
            alt={title}
            onError={() => setImgErr(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gold overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: "rgba(246,201,22,0.08)" }}
          />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgba(246,201,22,0.9)",
                boxShadow: "0 0 20px rgba(246,201,22,0.5)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="hsl(0 0% 6%)"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
          {isShort && (
            <span
              className="absolute bottom-2 left-2 rounded px-2 py-0.5 text-xs font-bold"
              style={{
                backgroundColor: "#f6c916",
                color: "#101010",
                fontFamily: "Doran, sans-serif",
              }}
            >
              Shorts
            </span>
          )}
        </div>
        <div className="p-3">
          <p
            className="line-clamp-2 text-sm font-medium leading-snug"
            style={{ color: "#f6c916", fontFamily: "Doran, sans-serif" }}
          >
            {title}
          </p>
          <div className="mt-1.5 flex items-center justify-between">
            <span
              className="text-xs"
              style={{ color: "hsl(46 50% 45%)", fontFamily: "Doran, sans-serif" }}
            >
              {channelName}
            </span>
            {date && (
              <span
                className="text-xs"
                style={{ color: "hsl(0 0% 40%)" }}
              >
                {date}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
