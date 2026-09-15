import { cn } from "@/lib/utils";

/** Six-pointed Chicago flag star. */
export function ChicagoStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("fill-star", className)}
      aria-hidden="true"
    >
      <polygon points="50,2 60,32.7 91.6,26 70,50 91.6,74 60,67.3 50,98 40,67.3 8.4,74 30,50 8.4,26 40,32.7" />
    </svg>
  );
}

export function ChicagoStars({
  count = 4,
  className,
  starClass,
}: {
  count?: number;
  className?: string;
  starClass?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <ChicagoStar key={i} className={cn("size-3.5", starClass)} />
      ))}
    </span>
  );
}
