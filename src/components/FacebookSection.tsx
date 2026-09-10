import { Facebook, Youtube, ExternalLink } from "lucide-react";

export function FacebookSection() {
  return (
    <section
      className="py-16"
      style={{ borderTop: "1px solid hsl(0 0% 18%)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="overflow-hidden rounded-2xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, hsl(0 0% 9%), hsl(0 0% 12%))",
            border: "1px solid rgba(246,201,22,0.2)",
            boxShadow: "0 0 40px rgba(246,201,22,0.05)",
          }}
        >
          <Facebook
            size={48}
            className="mx-auto mb-4"
            style={{
              color: "#f6c916",
              filter: "drop-shadow(0 0 12px rgba(246,201,22,0.4))",
            }}
          />
          <h3
            className="mb-2 text-2xl font-bold"
            style={{ fontFamily: "Doran, sans-serif", color: "#f6c916" }}
          >
            Follow on Facebook
          </h3>
          <p
            className="mb-6 text-sm"
            style={{
              color: "hsl(46 50% 50%)",
              fontFamily: "Doran, sans-serif",
            }}
          >
            صفحه فیسبوک حکایت شب را دنبال کنید
          </p>
          <a
            href="https://www.facebook.com/HekayatShab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:opacity-80 active:scale-95"
            style={{
              backgroundColor: "#f6c916",
              color: "#101010",
              fontFamily: "Doran, sans-serif",
              boxShadow: "0 0 20px rgba(246,201,22,0.3)",
            }}
          >
            <Facebook size={18} />
            HekayatShab
            <ExternalLink size={14} />
          </a>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              {
                label: "HekayatShab",
                url: "https://www.youtube.com/@hekayatshab?sub_confirmation=1",
                sub: "حکایت شب",
              },
              {
                label: "HekayatShabShorts",
                url: "https://www.youtube.com/@hekayatshabshorts?sub_confirmation=1",
                sub: "شورتس",
              },
              {
                label: "Deklemeh",
                url: "https://www.youtube.com/@deklemeh?sub_confirmation=1",
                sub: "دکلمه",
              },
            ].map((ch) => (
              <a
                key={ch.label}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-all hover:opacity-80"
                style={{
                  backgroundColor: "hsl(0 0% 9%)",
                  border: "1px solid rgba(246,201,22,0.2)",
                  color: "#f6c916",
                  fontFamily: "Doran, sans-serif",
                }}
              >
                <Youtube size={16} style={{ color: "hsl(0 62% 50%)" }} />
                <div className="text-left">
                  <div className="text-xs font-semibold">{ch.label}</div>
                  <div
                    className="text-xs"
                    style={{ color: "hsl(46 50% 50%)", fontFamily: "Doran, sans-serif" }}
                  >
                    {ch.sub}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
