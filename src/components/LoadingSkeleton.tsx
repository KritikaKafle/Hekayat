import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  count?: number;
  isShort?: boolean;
}

export function LoadingSkeleton({ count = 6, isShort = false }: LoadingSkeletonProps) {
  return (
    <div
      className={
        isShort ? "grid grid-cols-2 gap-3 sm:grid-cols-3" : "flex flex-col gap-5"
      }
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-lg"
          style={{
            backgroundColor: "hsl(0 0% 9%)",
            border: "1px solid hsl(0 0% 18%)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{ paddingTop: isShort ? "177.78%" : "56.25%" }}
          >
            <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-[hsl(0_0%_14%)]" />
          </div>
          <div className="p-3">
            <Skeleton className="h-4 w-11/12 bg-[hsl(0_0%_14%)]" />
            <div className="mt-2 flex items-center justify-between gap-3">
              <Skeleton className="h-3 w-24 bg-[hsl(0_0%_14%)]" />
              <Skeleton className="h-3 w-16 bg-[hsl(0_0%_14%)]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

