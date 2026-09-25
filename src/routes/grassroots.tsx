import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import {
  contactScripts,
  impactSteps,
  lookupOffices,
  type FederalOffice,
  type StateOffice,
} from "@/lib/grassroots";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/grassroots")({ component: GrassrootsPage });

type Office = FederalOffice | StateOffice;

function phoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

function CopyBlock({
  id,
  label,
  text,
  copied,
  onCopy,
}: {
  id: string;
  label: string;
  text: string;
  copied: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  return (
    <div className="rounded-md bg-ink p-4 shadow-border">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.16em] text-flag">{label}</p>
        <button
          type="button"
          onClick={() => onCopy(id, text)}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-cream hover:text-flag"
        >
          {copied === id ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied === id ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-paper">
        {text}
      </pre>
    </div>
  );
}

function OfficeCard({
  office,
  zip,
  open,
  onToggle,
  copied,
  onCopy,
}: {
  office: Office;
  zip: string;
  open: boolean;
  onToggle: () => void;
  copied: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  const scripts = contactScripts(office, zip);
  const phones = "phones" in office ? office.phones : office.phone ? [{ where: "office", phone: office.phone }] : [];
  const primary = phones[0]?.phone ?? null;
  const email = "email" in office ? office.email : null;
  const contactForm = "contactForm" in office ? office.contactForm : null;
  const site = office.url;
  const possible = "possible" in office && office.possible;

  return (
    <article className="rounded-lg bg-panel p-5 shadow-border">
      <p className="text-xs uppercase tracking-[0.16em] text-flag">{office.role}</p>
      <h2 className="mt-1 font-display text-3xl tracking-wide">{office.name}</h2>
      <p className="mt-1 text-sm text-mute">
        {[office.party, office.district != null ? `District ${office.district}` : null, possible ? "This ZIP crosses districts — confirm with a street" : null]
          .filter(Boolean)
          .join(" · ")}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {primary ? (
          <Button asChild size="md">
            <a href={phoneHref(primary)}>
              <Phone className="size-4" />
              {primary}
            </a>
          </Button>
        ) : null}
        {phones.slice(1).map((p) => (
          <Button key={p.phone} asChild size="md" variant="outline">
            <a href={phoneHref(p.phone)}>
              {p.where === "district" ? "District" : "Office"} {p.phone}
            </a>
          </Button>
        ))}
        {email ? (
          <Button asChild size="md" variant="outline">
            <a href={`mailto:${email}?subject=${encodeURIComponent(scripts.subject)}`}>Email</a>
          </Button>
        ) : null}
        {contactForm ? (
          <Button asChild size="md" variant="flag">
            <a href={contactForm} target="_blank" rel="noreferrer">
              Contact form
            </a>
          </Button>
        ) : null}
        {site ? (
          <Button asChild size="md" variant="ghost">
            <a href={site} target="_blank" rel="noreferrer">
              Office site
            </a>
          </Button>
        ) : null}
        <Button type="button" size="md" variant="outline" onClick={onToggle}>
          {open ? "Hide scripts" : "Email, call, text"}
        </Button>
      </div>
      {open ? (
        <div className="mt-4 grid gap-3">
          <CopyBlock
            id={`${office.id}-email`}
            label={email ? "Email" : "Email or contact form"}
            text={`Subject: ${scripts.subject}\n\n${scripts.email}`}
            copied={copied}
            onCopy={onCopy}
          />
          <CopyBlock
            id={`${office.id}-call`}
            label="Call"
            text={scripts.call}
            copied={copied}
            onCopy={onCopy}
          />
          <CopyBlock
            id={`${office.id}-text`}
            label="Text — only if this office published a text line"
            text={scripts.text}
            copied={copied}
            onCopy={onCopy}
          />
        </div>
      ) : null}
    </article>
  );
}

function GrassrootsPage() {
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Awaited<ReturnType<typeof lookupOffices>> | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function onCopy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
    } catch {
      setCopied(null);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const next = await lookupOffices({ data: { zip, street } });
      setResult(next);
      const first = next.federal[0]?.id ?? next.stateOffices[0]?.id ?? null;
      setOpenId(first);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setPending(false);
    }
  }

  const friendText =
    "Save the Dogs Chi-Town is asking people to contact their own offices about dog testing. Open the Grassroots page, enter your ZIP, and use the script. Two minutes.";

  return (
    <PageShell
      kicker="Grassroots"
      title="Your ZIP. Their office."
      lead="Save the Dogs Chi-Town is a grassroots movement dedicated to ending animal testing. Enter a ZIP. We look up the public offices that answer to that ZIP, then give you the email, the call, and the text."
    >
      <form onSubmit={submit} className="rounded-lg bg-panel p-5 shadow-border md:p-6">
        <div className="grid gap-4 md:grid-cols-[10rem_1fr_auto] md:items-end">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-mute">
              ZIP code
            </span>
            <input
              inputMode="numeric"
              autoComplete="postal-code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="60614"
              className="h-12 w-full rounded-md bg-ink px-3 text-paper shadow-border outline-none placeholder:text-mute focus:shadow-[0_0_0_2px_var(--color-flag)]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-mute">
              Street address (optional)
            </span>
            <input
              autoComplete="street-address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Needed if your ZIP crosses districts"
              className="h-12 w-full rounded-md bg-ink px-3 text-paper shadow-border outline-none placeholder:text-mute focus:shadow-[0_0_0_2px_var(--color-flag)]"
            />
          </label>
          <Button type="submit" size="lg" disabled={pending} className="w-full md:w-auto">
            {pending ? "Looking up…" : "Find offices"}
          </Button>
        </div>
        <p className="mt-3 text-sm text-mute">
          A street is how we tell U.S. House districts apart, and how Illinois gets a
          state senator and state representative. We do not save the address.
        </p>
        {error ? (
          <p className="mt-3 text-sm text-star" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {result ? (
        <div className="mt-8 grid gap-4">
          {result.ambiguous ? (
            <p className="rounded-md bg-raised px-4 py-3 text-sm text-cream shadow-border">
              ZIP {result.zip} covers more than one U.S. House district. Both senators
              are yours. Add a street before you call a House office, or you may reach
              someone who does not represent you.
            </p>
          ) : null}
          {result.stateNote ? (
            <p className="rounded-md bg-raised px-4 py-3 text-sm text-cream shadow-border">
              {result.stateNote}{" "}
              <a
                href="https://www.ilga.gov/"
                target="_blank"
                rel="noreferrer"
                className="text-flag hover:text-flag-hot"
              >
                ilga.gov
              </a>
            </p>
          ) : null}
          {result.federal.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              zip={result.zip}
              open={openId === office.id}
              onToggle={() => setOpenId((id) => (id === office.id ? null : office.id))}
              copied={copied}
              onCopy={onCopy}
            />
          ))}
          {result.stateOffices.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              zip={result.zip}
              open={openId === office.id}
              onToggle={() => setOpenId((id) => (id === office.id ? null : office.id))}
              copied={copied}
              onCopy={onCopy}
            />
          ))}
          <div className="rounded-lg bg-raised p-5 shadow-border">
            <p className="text-xs uppercase tracking-[0.16em] text-flag">Text a friend</p>
            <p className="mt-2 text-sm text-cream">
              Offices rarely take a policy text. The text that moves this is the one you
              send to two people in the same ZIP.
            </p>
            <div className="mt-3">
              <CopyBlock
                id="friend"
                label="Text"
                text={friendText}
                copied={copied}
                onCopy={onCopy}
              />
            </div>
          </div>
        </div>
      ) : null}

      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-wide">How to make it count</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {impactSteps.map((step, i) => (
            <li key={step.title} className={cn("rounded-lg bg-panel p-5 shadow-border")}>
              <p className="font-display text-2xl tracking-wide text-flag">{i + 1}</p>
              <h3 className="mt-1 font-display text-2xl tracking-wide">{step.title}</h3>
              <p className="mt-2 text-sm text-cream">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
