import type { ReactNode } from "react";

export function PageShell({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main>
      <div className="border-b border-line bg-panel">
        <div className="mx-auto max-w-6xl px-gutter py-section">
          <p className="text-xs uppercase tracking-[0.2em] text-flag">{kicker}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl tracking-wide">
            {title}
          </h1>
          {lead ? (
            <div className="mt-5 max-w-2xl text-lg leading-relaxed text-cream">
              {lead}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-gutter py-section">{children}</div>
    </main>
  );
}
