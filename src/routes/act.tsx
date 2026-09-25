import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { DonateButton } from "@/components/donate-button";
import { EmailSignup } from "@/components/email-signup";
import { PageShell } from "@/components/page-shell";
import { VolunteerForm } from "@/components/volunteer-form";
import { Button } from "@/components/ui/button";
import { actions, metroPins, org } from "@/lib/content";

export const Route = createFileRoute("/act")({ component: ActPage });

function ActPage() {
  return (
    <PageShell
      kicker="Take action"
      title="You are already paying for this"
      lead="Animal testing here is not a rumor from another state. The labs are on the Chicago map. A share of the bill is taxes: NIH grants, public universities, federal contracts. Open your eyes. Then move."
    >
      <section className="rounded-lg bg-panel p-6 shadow-border md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-star">The bill</p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          Your taxes. These labs.
        </h2>
        <p className="mt-3 max-w-3xl text-cream">
          You did not vote to stroke a dog and kill it. You still paid. The
          clearest receipt is Hyde Park: about $4.9 million in NIH money —
          federal taxes — for dog experiments at the University of Chicago.
          UIC is a public university. The other pins are in the same metro,
          inside the same grant economy. This is the map.
        </p>
        <ul className="mt-6 grid gap-3">
          {metroPins.map((pin) => (
            <li key={pin.id} className="rounded-md bg-ink px-4 py-4 shadow-border">
              <p className="font-display text-2xl tracking-wide">{pin.name}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-flag">{pin.place}</p>
              <p className="mt-2 text-sm text-cream">{pin.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="flag">
            <Link to="/map">
              See them on the map
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/grassroots">Call the people who spend it</Link>
          </Button>
        </div>
      </section>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {actions.map((a) => (
          <article
            key={a.title}
            className="flex flex-col rounded-lg bg-panel p-6 shadow-border"
          >
            <h2 className="font-display text-2xl tracking-wide">{a.title}</h2>
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
                <Button asChild>
                  <Link to={a.to}>{a.label}</Link>
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
        <VolunteerForm />
        <EmailSignup />
      </div>

      <div
        id="donate"
        className="mt-12 scroll-mt-24 rounded-lg bg-panel p-6 shadow-border md:p-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-star">Fundraising</p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          You already fund the labs
        </h2>
        {org.donate ? (
          <>
            <p className="mt-3 max-w-2xl text-cream">
              This is the other check: the chapter, not the experiment. Official
              link only. Not the old GoFundMe.
            </p>
            <div className="mt-6">
              <DonateButton size="lg" />
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 max-w-2xl text-cream">
              The labs are getting paid. We are not, until the board pastes a
              clean fundraising link. We will not use the old GoFundMe. When
              the real URL exists, this button turns on the same hour.
            </p>
            <p className="mt-4 text-sm text-mute">
              Until then the useful thing is pressure: a call, a shift at the
              table, two friends in your ZIP. Follow {org.instagramHandle} so
              you see the link when it is live.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button disabled variant="primary" size="lg">
                Donate — link coming
              </Button>
              <Button asChild variant="outline">
                <Link to="/grassroots">Call an office instead</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
