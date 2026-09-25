import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { DonateButton } from "@/components/donate-button";
import { Button } from "@/components/ui/button";
import { org } from "@/lib/content";
import { cn } from "@/lib/utils";

const links = [
  { to: "/fight" as const, label: "The fight" },
  { to: "/promise" as const, label: "The Promise" },
  { to: "/events" as const, label: "Events" },
  { to: "/gallery" as const, label: "Gallery" },
  { to: "/learn" as const, label: "Learn" },
  { to: "/grassroots" as const, label: "Grassroots" },
  { to: "/act" as const, label: "Take action" },
  { to: "/about" as const, label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="flag-stripe h-1.5 w-full" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-gutter">
        <Link
          to="/"
          className="flex min-h-11 min-w-0 items-center gap-3 text-paper"
          onClick={() => setOpen(false)}
        >
          <img
            src="/brand/badge.jpg"
            alt=""
            className="size-10 rounded-sm object-cover shadow-border"
          />
          <span className="min-w-0">
            <span className="block font-display text-lg leading-none tracking-wide">
              Save the Dogs
            </span>
            <span className="mt-0.5 block text-xs uppercase tracking-[0.2em] text-flag">
              Chi-Town
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-(--motion-quick) hover:text-flag",
                pathname === l.to ? "text-flag" : "text-cream/80",
              )}
            >
              {l.label}
            </Link>
          ))}
          <DonateButton />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <DonateButton />
          <Button
            variant="outline"
            size="icon"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-line bg-panel lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-gutter py-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center font-display text-xl tracking-wide text-paper"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild className="mt-2" size="lg" variant="flag">
            <Link to="/promise" onClick={() => setOpen(false)}>
              Take the Promise
            </Link>
          </Button>
          <a
            href={org.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex min-h-11 items-center text-sm text-flag"
          >
            {org.instagramHandle}
          </a>
        </nav>
      </div>
    </header>
  );
}
