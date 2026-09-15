import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { foundingPack } from "@/lib/content";
import { readPack, type PackMember } from "@/lib/promise";

function label(m: { name: string; place: string }) {
  return m.place ? `${m.name} · ${m.place}` : m.name;
}

export function PromiseTicker() {
  const [local, setLocal] = useState<PackMember[]>([]);

  useEffect(() => {
    setLocal(readPack());
  }, []);

  const names = useMemo(() => {
    const seen = new Set<string>();
    const ordered: { name: string; place: string }[] = [];
    for (const m of [...local, ...foundingPack]) {
      const key = `${m.name.toLowerCase()}|${m.place.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      ordered.push({ name: m.name, place: m.place });
    }
    return ordered;
  }, [local]);

  const loop = [...names, ...names];

  return (
    <div className="ticker" aria-label="Chi-Town Promise Pack">
      <Link
        to="/pack"
        className="shrink-0 bg-star px-3 py-2 font-display text-sm tracking-wide text-paper"
      >
        Promise Pack
      </Link>
      <div className="ticker-mask">
        <div className="ticker-track">
          {loop.map((m, i) => (
            <span key={`${m.name}-${i}`} className="ticker-item">
              {label(m)}
            </span>
          ))}
        </div>
      </div>
      <Link
        to="/promise"
        className="hidden shrink-0 px-3 py-2 text-xs uppercase tracking-[0.16em] text-flag sm:block"
      >
        Add your name
      </Link>
    </div>
  );
}
