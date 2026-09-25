import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { ChicagoMap } from "@/components/chicago-map";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { facilities, metroPins, pipelineOutside } from "@/lib/content";
import { readTips, saveTip, type FacilityTip } from "@/lib/tips";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map")({ component: MapPage });

function MapPage() {
  const [tips, setTips] = useState<FacilityTip[]>([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [source, setSource] = useState("");
  const [saved, setSaved] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setTips(readTips());
  }, []);

  function select(id: string) {
    setActive(id);
    document.getElementById(`pin-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !city.trim()) return;
    const tip = {
      name: name.trim(),
      city: city.trim(),
      note: note.trim(),
      source: source.trim(),
      at: new Date().toISOString(),
    };
    saveTip(tip);
    setTips(readTips());
    setName("");
    setCity("");
    setNote("");
    setSource("");
    setSaved(true);
  }

  const also = facilities.filter((f) => f.id === "uiuc" || f.id === "paws");

  return (
    <PageShell
      kicker="Map"
      title="Chicago wants to end animal testing"
      lead="These pins are labs in this metro. You already help pay for the system that keeps animal testing open. NIH is federal tax money. Public universities are state tax money. The receipt we can quote is the University of Chicago: about $4.9 million in NIH funds for dogs to be given strokes and killed. The other pins are not in another state. They are here."
    >
      <ChicagoMap active={active} onSelect={select} />

      <div className="mt-8 grid gap-4">
        {metroPins.map((f) => (
          <article
            key={f.id}
            id={`pin-${f.id}`}
            className={cn(
              "rounded-lg bg-panel p-5 shadow-border",
              active === f.id && "shadow-[0_0_0_2px_var(--color-flag)]",
            )}
          >
            <p className="text-xs uppercase tracking-[0.16em] text-flag">Lab</p>
            <h2 className="mt-1 font-display text-2xl tracking-wide">{f.name}</h2>
            <p className="text-sm text-mute">{f.place}</p>
            <p className="mt-3 text-sm text-cream">{f.body}</p>
            {f.source ? <p className="mt-2 text-xs text-mute">{f.source}</p> : null}
            {f.href ? (
              <a
                href={f.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-flag hover:text-flag-hot"
              >
                Source
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-3xl tracking-wide">Also on the record</h2>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Outside this metro crop, or not a lab. Still part of the story.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {also.map((f) => (
            <article key={f.id} className="rounded-lg bg-panel p-5 shadow-border">
              <h3 className="font-display text-2xl tracking-wide">{f.name}</h3>
              <p className="text-sm text-mute">{f.city}</p>
              <p className="mt-3 text-sm text-cream">{f.body}</p>
              <a
                href={f.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-flag hover:text-flag-hot"
              >
                Source
                <ArrowUpRight className="size-3.5" />
              </a>
            </article>
          ))}
          {pipelineOutside
            .filter((p) => p.name !== "Marshall BioResources")
            .map((p) => (
              <article key={p.name} className="rounded-lg bg-raised p-5 shadow-border">
                <p className="text-xs uppercase tracking-[0.16em] text-star">{p.status}</p>
                <h3 className="mt-1 font-display text-2xl tracking-wide">{p.name}</h3>
                <p className="text-sm text-mute">{p.place}</p>
                <p className="mt-3 text-sm text-cream">{p.body}</p>
              </article>
            ))}
        </div>
      </div>

      <div className="mt-12 grid items-start gap-8 md:grid-cols-2">
        <form onSubmit={submit} className="rounded-lg bg-panel p-6 shadow-border">
          <h2 className="font-display text-2xl tracking-wide">Add a pin</h2>
          <p className="mt-2 text-sm text-mute">
            Name, city, and a source if you have one. This draft keeps tips on
            this device until the chapter has a shared list.
          </p>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-mute">
                Facility
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full rounded-md bg-ink px-3 text-paper shadow-border outline-none focus-visible:shadow-[0_0_0_2px_var(--color-flag)]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-mute">
                City
              </span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 w-full rounded-md bg-ink px-3 text-paper shadow-border outline-none focus-visible:shadow-[0_0_0_2px_var(--color-flag)]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-mute">
                What we know
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full rounded-md bg-ink px-3 py-3 text-paper shadow-border outline-none focus-visible:shadow-[0_0_0_2px_var(--color-flag)]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-mute">
                Source URL (optional)
              </span>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="h-12 w-full rounded-md bg-ink px-3 text-paper shadow-border outline-none focus-visible:shadow-[0_0_0_2px_var(--color-flag)]"
              />
            </label>
          </div>
          <Button type="submit" className="mt-5">
            Save pin
          </Button>
          {saved ? (
            <p className="mt-3 text-sm text-flag">Saved on this device.</p>
          ) : null}
        </form>
        <div>
          <h2 className="font-display text-2xl tracking-wide">Tips from this device</h2>
          {tips.length === 0 ? (
            <p className="mt-3 text-sm text-mute">None yet.</p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {tips.map((t) => (
                <li key={t.at} className="rounded-lg bg-raised p-4 shadow-border">
                  <p className="font-display text-xl tracking-wide">{t.name}</p>
                  <p className="text-sm text-mute">{t.city}</p>
                  {t.note ? <p className="mt-2 text-sm text-cream">{t.note}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageShell>
  );
}
