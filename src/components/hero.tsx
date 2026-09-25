import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DonateButton } from "@/components/donate-button";
import { Button } from "@/components/ui/button";
import { events, org } from "@/lib/content";

function HeroVideo({
  className,
  poster,
}: {
  className?: string;
  poster: string;
}) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduce) {
    return (
      <img
        src={poster}
        alt="Beagle wearing a Save the Dogs Chi-Town bandana, tennis ball at his paws"
        className={className}
      />
    );
  }

  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-label="Beagle in a Save the Dogs Chi-Town bandana at the water, Chicago behind him"
    >
      <source src="/brand/hero.mp4" type="video/mp4" />
    </video>
  );
}

export function Hero() {
  const next = events.find((e) => e.status === "upcoming");

  return (
    <section className="bg-ink">
      <div className="flex flex-col sm:flex-row sm:items-stretch lg:block">
        <h1 className="sr-only hidden lg:block">Calling all Chi-Town</h1>
        <div className="relative hidden lg:block">
          <HeroVideo
            poster="/brand/hero-wide.jpg"
            className="block aspect-video h-auto w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent px-gutter py-8">
            <p className="font-display text-5xl tracking-wide">
              Calling all Chi-Town
            </p>
            <p className="mt-2 max-w-xl text-lg text-cream">
              Stand up. Speak out. Make a difference.
            </p>
            <p className="mt-1 font-display text-3xl tracking-wide text-star">
              For the dogs. For all animals.
            </p>
            <p className="mt-3 max-w-3xl text-xl font-semibold leading-snug text-paper sm:text-2xl">
              {org.mission}
            </p>
          </div>
        </div>
        <HeroVideo
          poster="/brand/hero-dog.jpg"
          className="block h-auto w-full max-h-hero-photo object-cover object-[80%_center] sm:order-2 sm:max-h-none sm:w-1/2 lg:hidden"
        />
        <div className="flex flex-1 flex-col justify-center bg-paper sm:order-1 sm:w-1/2 lg:hidden">
          <div className="flag-stripe h-1.5 w-full sm:hidden" />
          <div className="poster-copy px-gutter py-6 sm:py-8">
            <h1 className="poster-headline">
              Calling all
              <span className="block">Chi-Town</span>
            </h1>
            <p className="poster-tag">
              Stand up. Speak out.
              <br />
              Make a difference.
            </p>
            <p className="poster-close">For the dogs. For all animals.</p>
            <p className="poster-mission">{org.mission}</p>
          </div>
        </div>
      </div>

      <div className="border-y border-line bg-panel">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-gutter py-4 sm:flex-row sm:flex-wrap sm:items-center">
          <p className="text-sm text-cream sm:mr-auto">
            Chicago chapter · Against animal testing · Five on the board
          </p>
          <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/promise">Take the Promise</Link>
            </Button>
            <DonateButton className="w-full sm:w-auto" />
            <Button asChild variant="flag" className="w-full sm:w-auto">
              <Link to="/events">
                {next ? `${next.title} — Sept 13` : "Events"}
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/act">Volunteer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
