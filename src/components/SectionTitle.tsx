import { Moon } from "lucide-react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function SectionTitle({ title, subtitle, badge }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Moon
            size={16}
            style={{
              color: "#f6c916",
              filter: "drop-shadow(0 0 8px rgba(246,201,22,0.35))",
            }}
          />
          <h2
            className="text-xl font-bold"
            style={{
              fontFamily: "Doran, sans-serif",
              color: "#f6c916",
              textShadow: "0 0 18px rgba(246,201,22,0.25)",
            }}
          >
            {title}
          </h2>
        </div>
        {badge && (
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide"
            style={{
              backgroundColor: "rgba(246,201,22,0.12)",
              border: "1px solid rgba(246,201,22,0.35)",
              color: "#f6c916",
              fontFamily: "Doran, sans-serif",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <p
          className="mt-1 text-sm"
          style={{
            color: "hsl(46 50% 50%)",
            fontFamily: "Doran, sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}