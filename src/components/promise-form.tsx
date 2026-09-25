import { Check } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { ChicagoStars } from "@/components/chicago-star";
import { Button } from "@/components/ui/button";
import { org, promisePledges } from "@/lib/content";
import {
  listPack,
  readPromise,
  savePromise,
  subscribePack,
  type PackMember,
  type PromiseRecord,
} from "@/lib/promise";
import { cn } from "@/lib/utils";

export function PromiseForm({ compact = false }: { compact?: boolean }) {
  const [checks, setChecks] = useState<boolean[]>(() =>
    promisePledges.map(() => false),
  );
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [done, setDone] = useState<PromiseRecord | null>(null);
  const [error, setError] = useState("");
  const [local, setLocal] = useState<PackMember[]>([]);

  useEffect(() => {
    const existing = readPromise();
    if (existing) {
      setDone(existing);
      setName(existing.name === "Chi-Town" ? "" : existing.name);
      setZip(existing.zip);
      setChecks(promisePledges.map(() => true));
    }
  }, []);

  useEffect(() => subscribePack(setLocal), []);

  const pack = useMemo(() => listPack(local), [local]);
  const shown = pack.slice(0, 6);

  function toggle(i: number) {
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    setError("");
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (checks.some((c) => !c)) {
      setError("Check every line. That is the whole Promise, not a menu.");
      return;
    }
    const record = {
      name: name.trim() || "Chi-Town",
      zip: zip.trim(),
      at: new Date().toISOString(),
    };
    savePromise(record);
    setDone(record);
  }

  const proof = (
    <p className="text-sm text-cream">
      <span className="font-display tracking-wide text-star">
        {pack.length} already in.
      </span>{" "}
      {shown.map((m) => (m.place ? `${m.name} · ${m.place}` : m.name)).join(" · ")}
      {pack.length > shown.length ? " · and more" : ""}
    </p>
  );

  if (done) {
    return (
      <div className="overflow-hidden rounded-lg bg-raised p-6 shadow-border md:p-8">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <img
            src="/brand/stamp.jpg"
            alt="I made the Chi-Town Promise"
            className="size-44 rounded-full bg-paper object-contain p-2 shadow-border md:size-52"
          />
          <div className="text-center md:text-left">
            <ChicagoStars />
            <h3 className="mt-3 font-display text-3xl tracking-wide">
              You made the Chi-Town Promise
            </h3>
            <p className="mt-2 text-cream">
              {done.name}, you are on the pack. Your name is on the ticker at
              the bottom of the page. Shop cruelty-free. Speak. Show up.
            </p>
            <p className="mt-3 text-sm text-mute">
              Screenshot the stamp if you want it on your phone at the booth.
            </p>
            {proof}
            <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button asChild variant="flag">
                <a href="/pack">See the Pack</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/events">See the next event</a>
              </Button>
              <Button asChild variant="outline">
                <a href={org.instagram} target="_blank" rel="noreferrer">
                  {org.instagramHandle}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        "rounded-lg bg-raised p-5 shadow-border md:p-8",
        compact && "p-4",
      )}
    >
      <p className="font-display text-sm tracking-[0.2em] text-flag">
        The Chi-Town Promise
      </p>
      <h3 className="mt-1 font-display text-3xl tracking-wide">
        Five lines. Check all of them.
      </h3>
      <div className="mt-3 max-w-2xl rounded-md bg-ink px-3 py-2.5 shadow-border">
        {proof}
      </div>
      <p className="mt-2 max-w-2xl text-sm text-mute">
        Built to be readable at a booth. Name is optional — we like knowing who
        we are standing with. Your name joins the ticker the moment you submit.
      </p>

      <ul className="mt-6 space-y-3">
        {promisePledges.map((line, i) => {
          const on = checks[i];
          return (
            <li key={line}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(i)}
                className={cn(
                  "flex w-full min-h-14 items-start gap-3 rounded-md px-3 py-3 text-left shadow-border transition-[background-color,box-shadow] duration-(--motion-quick)",
                  on ? "bg-flag/12 shadow-border-hover" : "bg-ink hover:bg-panel",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm border-2",
                    on
                      ? "border-flag bg-flag text-ink"
                      : "border-cream/40 bg-transparent",
                  )}
                >
                  {on ? <Check className="size-4 stroke-[3]" /> : null}
                </span>
                <span className="text-base leading-snug text-paper">{line}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-mute">
            Name (optional)
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-12 w-full rounded-md bg-ink px-3 text-paper shadow-border outline-none placeholder:text-mute focus:shadow-[0_0_0_2px_var(--color-flag)]"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-mute">
            Neighborhood or ZIP (optional)
          </span>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Chi-Town"
            className="h-12 w-full rounded-md bg-ink px-3 text-paper shadow-border outline-none placeholder:text-mute focus:shadow-[0_0_0_2px_var(--color-flag)]"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-star" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="xl" className="mt-6 w-full md:w-auto">
        I make the Chi-Town Promise
      </Button>
    </form>
  );
}
