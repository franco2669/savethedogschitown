import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { listPack, subscribePack, type PackMember } from "@/lib/promise";
import { cn } from "@/lib/utils";

function label(m: { name: string; place: string }) {
  return m.place ? `${m.name} · ${m.place}` : m.name;
}

export function PromiseTicker() {
  const [local, setLocal] = useState<PackMember[]>([]);

  useEffect(() => subscribePack(setLocal), []);

  const names = useMemo(() => listPack(local), [local]);
  const loop = [...names, ...names];
  const trackKey = names.map((m) => `${m.name}-${m.place}`).join("|");

  return (
    <div className="ticker" aria-label="Chi-Town Promise Pack">
      <Link
        to="/pack"
        className="flex shrink-0 flex-col justify-center bg-star px-3 py-1.5 text-paper"
      >
        <span className="font-display text-sm tracking-wide">Promise Pack</span>
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-paper/80">
          {names.length} in
        </span>
      </Link>
      <div className="ticker-mask">
        <div className="ticker-track" key={trackKey}>
          {loop.map((m, i) => (
            <span
              key={`${m.name}-${m.place}-${i}`}
              className={cn("ticker-item", m.justJoined && i < names.length && "is-new")}
            >
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
