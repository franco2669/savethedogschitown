import { Link } from "@tanstack/react-router";
import { EmailSignup } from "@/components/email-signup";
import { org } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="flag-stripe h-1.5 w-full" />
      <div className="mx-auto grid max-w-6xl gap-8 px-gutter py-section md:grid-cols-2 lg:grid-cols-4 md:gap-10">
        <div>
          <p className="font-display text-2xl tracking-wide">
            Save the Dogs Chi-Town
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
            Chicago chapter of the campaign to end the breeding and use of dogs
            in laboratories. The Chi-Town Promise is how we take that fight to
            neighborhoods, parks, and kitchen tables.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-flag">Site</p>
          <ul className="mt-3 space-y-0 text-sm">
            <li>
              <Link to="/fight" className="inline-flex min-h-11 items-center hover:text-flag">
                The fight
              </Link>
            </li>
            <li>
              <Link to="/promise" className="inline-flex min-h-11 items-center hover:text-flag">
                The Chi-Town Promise
              </Link>
            </li>
            <li>
              <Link to="/pack" className="inline-flex min-h-11 items-center hover:text-flag">
                Promise Pack
              </Link>
            </li>
            <li>
              <Link to="/events" className="inline-flex min-h-11 items-center hover:text-flag">
                Events
              </Link>
            </li>
            <li>
              <Link to="/learn" className="inline-flex min-h-11 items-center hover:text-flag">
                Learn
              </Link>
            </li>
            <li>
              <Link to="/grassroots" className="inline-flex min-h-11 items-center hover:text-flag">
                Grassroots
              </Link>
            </li>
            <li>
              <Link to="/map" className="inline-flex min-h-11 items-center hover:text-flag">
                Illinois map
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="inline-flex min-h-11 items-center hover:text-flag">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/act" className="inline-flex min-h-11 items-center hover:text-flag">
                Volunteer / donate
              </Link>
            </li>
            <li>
              <Link to="/about" className="inline-flex min-h-11 items-center hover:text-flag">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-flag">
            Elsewhere
          </p>
          <ul className="mt-3 space-y-0 text-sm">
            <li>
              <a href={org.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-flag">
                Instagram {org.instagramHandle}
              </a>
            </li>
            <li>
              <a href={org.facebook} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-flag">
                Facebook community
              </a>
            </li>
            <li>
              <a href={org.coalition} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-flag">
                Save the Dogs US
              </a>
            </li>
            <li>
              <a href={org.petition} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-flag">
                National petition
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-flag">
            Event notes
          </p>
          <p className="mt-3 text-sm text-mute">
            Booths, transports, last-minute calls.
          </p>
          <div className="mt-4">
            <EmailSignup compact />
          </div>
        </div>
      </div>
      <div className="border-t border-line px-gutter py-5 text-center text-xs tracking-[0.16em] text-mute uppercase">
        For the dogs. For all animals.
      </div>
    </footer>
  );
}
