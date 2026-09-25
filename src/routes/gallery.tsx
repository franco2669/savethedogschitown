import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { gallery, org } from "@/lib/content";

export const Route = createFileRoute("/gallery")({ component: GalleryPage });

function GalleryPage() {
  const albums: string[] = [];
  for (const shot of gallery) {
    if (!albums.includes(shot.album)) albums.push(shot.album);
  }

  return (
    <PageShell
      kicker="Gallery"
      title="A living record"
      lead="Photos and a few short clips from the booths."
    >
      {albums.map((album) => (
        <section key={album} className="mt-10 first:mt-0">
          <h2 className="font-display text-3xl tracking-wide">{album}</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {gallery
              .filter((shot) => shot.album === album)
              .map((shot) => (
                <figure
                  key={shot.src}
                  className="overflow-hidden rounded-lg bg-panel shadow-border"
                >
                  {"video" in shot && shot.video ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={shot.src}
                      className="max-h-[36rem] w-full bg-ink"
                    >
                      <source src={shot.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  )}
                  <figcaption className="p-4">
                    <h3 className="font-display text-2xl tracking-wide">{shot.title}</h3>
                    <p className="mt-2 text-sm text-mute">{shot.caption}</p>
                  </figcaption>
                </figure>
              ))}
          </div>
        </section>
      ))}
      <p className="mt-10 text-sm text-mute">
        Follow{" "}
        <a href={org.instagram} className="text-flag hover:text-flag-hot">
          {org.instagramHandle}
        </a>{" "}
        for the daily roll.{" "}
        <Link to="/events" className="text-flag hover:text-flag-hot">
          Events
        </Link>
      </p>
    </PageShell>
  );
}
