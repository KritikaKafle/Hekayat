import { Youtube, Facebook, Moon, Star } from "lucide-react";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        backgroundColor: "rgba(16,16,16,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid hsl(0 0% 18%)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Moon
            size={22}
            style={{ color: "#f6c916", filter: "drop-shadow(0 0 6px rgba(246,201,22,0.5))" }}
          />
          <div>
            <h1
              className="text-xl font-bold leading-none"
              style={{
                fontFamily: "Doran, sans-serif",
                color: "#f6c916",
                textShadow: "0 0 20px rgba(246,201,22,0.4)",
              }}
            >
              HekayatShab
            </h1>
            <p
              className="text-xs leading-none"
              style={{
                color: "hsl(46 50% 50%)",
                fontFamily: "Doran, sans-serif",
              }}
            >
              حکایت شب
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          {[
            { label: "Videos", href: "#featured" },
            { label: "Shorts", href: "#shorts" },
            { label: "Deklemeh", href: "#Deklemeh" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors hover:opacity-80"
              style={{
                color: "#f6c916",
                fontFamily: "Doran, sans-serif",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.youtube.com/@HekayatShab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:opacity-80"
            style={{
              backgroundColor: "rgba(246,201,22,0.1)",
              border: "1px solid rgba(246,201,22,0.3)",
            }}
            title="YouTube"
          >
            <Youtube size={16} style={{ color: "#f6c916" }} />
          </a>
          <a
            href="https://www.youtube.com/@HekayatShabShorts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:opacity-80"
            style={{
              backgroundColor: "rgba(246,201,22,0.1)",
              border: "1px solid rgba(246,201,22,0.3)",
            }}
            title="YouTube Shorts"
          >
            <Youtube size={16} style={{ color: "#f6c916" }} />
          </a>
          <a
            href="https://www.youtube.com/@deklemeh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:opacity-80"
            style={{
              backgroundColor: "rgba(246,201,22,0.1)",
              border: "1px solid rgba(246,201,22,0.3)",
            }}
            title="YouTube Deklemeh"
          >
            <Youtube size={16} style={{ color: "#f6c916" }} />
          </a>
          <a
            href="https://www.facebook.com/HekayatShab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:opacity-80"
            style={{
              backgroundColor: "rgba(246,201,22,0.1)",
              border: "1px solid rgba(246,201,22,0.3)",
            }}
            title="Facebook"
          >
            <Facebook size={16} style={{ color: "#f6c916" }} />
          </a>
        </div>
      </div>
    </header>
  );
}
