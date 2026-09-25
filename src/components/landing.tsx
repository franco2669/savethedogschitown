import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BoardGrid } from "@/components/board";
import { Hero } from "@/components/hero";
import { PromiseForm } from "@/components/promise-form";
import { Button } from "@/components/ui/button";
import {
  actions,
  chicagoCase,
  events,
  fieldNote,
  fightFacts,
  org,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export function Landing() {
  const next = events.find((e) => e.status === "upcoming");

  return (
    <div>
      <Hero />

      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-6xl px-gutter py-section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-star">
                The record
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-wide">
                Ridglan closed. The pipeline did not.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/fight">
                Full story
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid-auto-cards">
            {fightFacts.map((f) => (
              <div key={f.label} className="rounded-lg bg-raised p-5 shadow-border">
                <p className="font-display text-4xl tracking-wide text-flag tabular-nums">
                  {f.stat}
                </p>
                <p className="mt-2 text-sm text-mute">{f.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {chicagoCase.map((item) => (
              <article
                key={item.title}
                className="rounded-lg bg-raised p-5 shadow-border"
              >
                <h2 className="font-display text-2xl tracking-wide">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream">
                  {item.body}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-flag hover:text-flag-hot"
                >
                  {item.linkLabel}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img
          src="/brand/graffiti.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-gutter py-section md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-star">
              {fieldNote.kicker} · {fieldNote.date}
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-wide">
              {fieldNote.title}
            </h2>
          </div>
          <div className="space-y-4 text-cream">
            {fieldNote.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-sm text-mute">{fieldNote.source}</p>
          </div>
        </div>
      </section>

      <section
        id="promise"
        className="mx-auto grid max-w-6xl items-start gap-8 px-gutter py-section md:grid-cols-2"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-flag">
            The Chi-Town Promise
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide">
            A public commitment, not a like
          </h2>
          <p className="mt-4 text-cream">
            Promise to do your part so animal experimenting ends. The old Google
            Form was tiny type and a checkbox you could not find at a booth.
            This one is large enough to tap with a leash in your other hand.
            Name optional.
          </p>
          <img
            src="/brand/stamp.jpg"
            alt="I made the Chi-Town Promise"
            className="mt-6 w-40 rounded-full bg-paper p-2"
          />
        </div>
        <PromiseForm />
      </section>

      {next ? (
        <section id="events" className="border-y border-line bg-panel">
          <div className="mx-auto grid max-w-6xl gap-8 px-gutter py-section md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-star">
                Next booth · This Sunday
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-wide">
                {next.title}
              </h2>
              <p className="mt-3 text-lg text-cream">
                {next.when}
                {next.time ? ` · ${next.time}` : ""}
              </p>
              <p className="mt-1 text-mute">
                {next.where}
                <br />
                {next.address}
              </p>
              <p className="mt-4 text-cream">{next.blurb}</p>
              <p className="mt-3 text-sm text-mute">{next.note}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={next.href} target="_blank" rel="noreferrer">
                    Arboretum event page
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/events">All events</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg bg-raised p-6 shadow-border">
              <p className="text-xs uppercase tracking-[0.2em] text-flag">
                Same week, national
              </p>
              <h3 className="mt-3 font-display text-3xl tracking-wide">
                March to Abolish Animal Testing
              </h3>
              <p className="mt-3 text-cream">
                September 12–26. Two hundred seven miles from Albany, New York,
                to Marshall BioResources. Walk a day, a leg, or the whole way.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <a href={org.march} target="_blank" rel="noreferrer">
                  marchforanimals.org
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <img
                src="/brand/wordmark.jpg"
                alt="Save the Dogs Chi-Town skyline wordmark"
                className="mt-6 w-full rounded-md shadow-border"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-gutter py-section">
        <BoardGrid compact withLink />
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-gutter py-section">
          <p className="text-xs uppercase tracking-[0.2em] text-star">
            Take action
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide">
            What you can do from here
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {actions.map((a) => (
              <article
                key={a.title}
                className="flex flex-col rounded-lg bg-raised p-5 shadow-border"
              >
                <h3 className="font-display text-2xl tracking-wide">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm text-cream">{a.body}</p>
                <div className="mt-5">
                  {a.external ? (
                    <Button asChild variant="outline">
                      <a href={a.href} target="_blank" rel="noreferrer">
                        {a.label}
                        <ArrowUpRight className="size-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button asChild variant="outline">
                      <Link to={a.to}>{a.label}</Link>
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-gutter py-section text-center">
        <h2 className="font-display text-4xl tracking-wide">
          Home base here. Day to day on Instagram.
        </h2>
        <p className="mt-4 text-cream">
          Booth photos, transports, and the standee live at {org.instagramHandle}.
          This site is the page you can type into a phone at a table.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="flag">
            <a href={org.instagram} target="_blank" rel="noreferrer">
              {org.instagramHandle}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={org.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/act">Volunteer</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/learn">Learn</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export function EventList({
  includePast = true,
}: {
  includePast?: boolean;
}) {
  const list = includePast
    ? events
    : events.filter((e) => e.status !== "past");
  return (
    <div className="grid gap-6">
      {list.map((event) => (
        <article
          key={event.id}
          className={cn(
            "grid gap-6 rounded-lg bg-raised p-5 shadow-border md:grid-cols-[1fr_1.3fr] md:p-7",
            event.status === "past" && "opacity-75",
          )}
        >
          <div>
            <span
              className={cn(
                "inline-block px-2 py-1 font-display text-sm tracking-wide",
                event.status === "upcoming" && "bg-star text-paper",
                event.status === "soon" && "bg-flag text-ink",
                event.status === "past" && "bg-ink text-mute shadow-border",
              )}
            >
              {event.status === "upcoming"
                ? "This Sunday"
                : event.status === "soon"
                  ? "Pending"
                  : "Past"}
            </span>
            <h3 className="mt-3 font-display text-3xl tracking-wide">
              {event.title}
            </h3>
            {"image" in event && event.image ? (
              <img
                src={event.image}
                alt=""
                className="mt-4 aspect-[4/3] w-full rounded-md object-cover"
              />
            ) : null}
            <p className="mt-3 text-sm text-cream">
              {event.when}
              {event.time ? ` · ${event.time}` : ""}
            </p>
            <p className="mt-2 text-sm text-mute">
              {event.where}
              <br />
              {event.address}
              {event.booth ? (
                <>
                  <br />
                  {event.booth}
                </>
              ) : null}
            </p>
          </div>
          <div>
            <p className="text-cream">{event.blurb}</p>
            {event.perks.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {event.perks.map((p) => (
                  <li
                    key={p}
                    className="bg-ink px-2 py-1 text-xs uppercase tracking-[0.12em] text-flag shadow-border"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
            {event.note ? (
              <p className="mt-4 text-sm text-mute">{event.note}</p>
            ) : null}
            {event.href ? (
              <Button asChild variant="outline" className="mt-5">
                <a href={event.href} target="_blank" rel="noreferrer">
                  Event details
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
