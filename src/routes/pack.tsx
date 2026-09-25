import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { listPack, subscribePack, type PackMember } from "@/lib/promise";

export const Route = createFileRoute("/pack")({ component: PackPage });

function PackPage() {
  const [local, setLocal] = useState<PackMember[]>([]);
  useEffect(() => subscribePack(setLocal), []);

  const members = useMemo(() => listPack(local), [local]);

  return (
    <PageShell
      kicker="The Chi-Town Promise Pack"
      title="Names on the tape"
      lead="Take the Promise and your name lands here and on the ticker at the bottom of every page. Marie, Michelle, and Eddie opened it."
    >
      <p className="text-sm text-mute">
        {members.length} on the pack. New names from this device join the
        founding three right away.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <li
            key={`${m.name}-${m.place}`}
            className="rounded-lg bg-panel px-5 py-4 shadow-border"
          >
            <p className="font-display text-2xl tracking-wide">{m.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-flag">
              {m.place}
              {m.justJoined ? " · just joined" : ""}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button asChild>
          <Link to="/promise">Take the Promise</Link>
        </Button>
      </div>
    </PageShell>
  );
}
