import { Link } from "@tanstack/react-router";
import { metroMap, metroPins, mapLegend, org, type MapPinKind } from "@/lib/content";
import { cn } from "@/lib/utils";

const N = 2048;

function point(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * N;
  const latRad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * N;
  return {
    left: ((x - metroMap.x0) / (metroMap.x1 - metroMap.x0)) * 100,
    top: ((y - metroMap.y0) / (metroMap.y1 - metroMap.y0)) * 100,
  };
}

function Paw({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="32" cy="42" rx="13" ry="11" fill="currentColor" />
      <ellipse cx="14" cy="28" rx="6.5" ry="8" fill="currentColor" />
      <ellipse cx="25" cy="16" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="39" cy="16" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="50" cy="28" rx="6.5" ry="8" fill="currentColor" />
    </svg>
  );
}

const pinColor: Record<MapPinKind, string> = {
  lab: "#7c3aed",
  farm: "#f5c518",
  dealer: "#e8871a",
};

export function ChicagoMap({
  active,
  onSelect,
}: {
  active: string | null;
  onSelect: (id: string) => void;
}) {
  const spots = metroPins.flatMap((pin) => {
    const main = { pin, ...point(pin.lat, pin.lng), key: pin.id };
    if (!pin.also) return [main];
    return [main, { pin, ...point(pin.also.lat, pin.also.lng), key: `${pin.id}-b` }];
  });

  return (
    <figure className="overflow-hidden bg-ink shadow-border">
      <div className="border-4 border-flag bg-ink px-4 py-4 text-center sm:px-8 sm:py-5">
        <h2 className="font-display text-4xl tracking-wide text-paper sm:text-5xl">
          Chicago Wants to End Animal Testing
        </h2>
        <Link
          to="/promise"
          className="mt-2 inline-flex items-center justify-center gap-2 text-flag hover:text-flag-hot"
        >
          <Paw className="size-7 text-star sm:size-8" />
          <span className="font-display text-3xl tracking-wide sm:text-4xl">
            Take the Chi Town Promise
          </span>
          <Paw className="size-7 text-star sm:size-8" />
        </Link>
      </div>

      <div className="relative">
        <img
          src={metroMap.src}
          alt="Map of the Chicago area with laboratories marked"
          className="block w-full"
        />
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {metroPins.map((pin) => {
            const from = point(pin.lat, pin.lng);
            const extra = pin.also ? point(pin.also.lat, pin.also.lng) : null;
            const anchorX = pin.box.side === "left" ? pin.box.left + 18 : pin.box.left;
            const anchorY = pin.box.top + 3.2;
            return (
              <g key={pin.id}>
                <line
                  x1={from.left}
                  y1={from.top}
                  x2={anchorX}
                  y2={anchorY}
                  stroke="#1d4ed8"
                  strokeWidth="0.35"
                  vectorEffect="non-scaling-stroke"
                />
                {extra ? (
                  <line
                    x1={extra.left}
                    y1={extra.top}
                    x2={anchorX}
                    y2={anchorY}
                    stroke="#1d4ed8"
                    strokeWidth="0.35"
                    vectorEffect="non-scaling-stroke"
                  />
                ) : null}
              </g>
            );
          })}
        </svg>

        {spots.map((spot) => (
          <button
            key={spot.key}
            type="button"
            onClick={() => onSelect(spot.pin.id)}
            aria-label={spot.pin.name}
            className="absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${spot.left}%`, top: `${spot.top}%` }}
          >
            <span
              className={cn(
                "block size-4 rounded-full border-2 border-white shadow-md sm:size-5",
                active === spot.pin.id && "scale-125 ring-2 ring-ink",
              )}
              style={{ background: pinColor[spot.pin.kind] }}
            />
          </button>
        ))}

        {metroPins.map((pin) => (
          <button
            key={pin.id}
            type="button"
            onClick={() => onSelect(pin.id)}
            className={cn(
              "absolute z-10 hidden rounded-sm bg-[#2563eb] px-2 py-1 text-left text-[11px] font-semibold leading-tight text-white shadow-md md:block",
              active === pin.id && "bg-[#1d4ed8] ring-2 ring-paper",
            )}
            style={{ left: `${pin.box.left}%`, top: `${pin.box.top}%`, width: "18%" }}
          >
            {pin.label.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </button>
        ))}

        <ul className="absolute bottom-3 left-3 z-10 rounded-sm bg-paper px-3 py-2 text-ink shadow-md sm:bottom-4 sm:left-4">
          {mapLegend.map((item) => (
            <li key={item.kind} className="flex items-center gap-2 py-0.5 text-sm font-semibold">
              <span
                className="size-3.5 rounded-full border border-ink/20"
                style={{ background: item.color }}
              />
              {item.label}
            </li>
          ))}
        </ul>
        <p className="absolute right-2 bottom-1 z-10 text-[10px] text-ink/70">© Esri</p>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line bg-ink p-3 md:hidden">
        {metroPins.map((pin) => (
          <button
            key={pin.id}
            type="button"
            onClick={() => onSelect(pin.id)}
            className={cn(
              "rounded-full bg-[#2563eb] px-3 py-1.5 text-left text-xs font-semibold text-white",
              active === pin.id && "ring-2 ring-paper",
            )}
          >
            {pin.label[0]}
          </button>
        ))}
      </div>

      <a
        href={org.petition}
        target="_blank"
        rel="noreferrer"
        className="block border-4 border-star bg-ink px-4 py-4 text-center text-paper hover:bg-raised sm:px-8 sm:py-5"
      >
        <p className="font-display text-3xl tracking-wide sm:text-4xl">
          NEXT: Help us shut down Marshall BioResources
        </p>
        <p className="mt-1 font-display text-2xl tracking-wide sm:text-3xl">
          in New York and save <span className="text-star">20,000+</span> beagles.
        </p>
        <span className="mt-2 inline-flex justify-center gap-2 text-star">
          <Paw className="size-6" />
          <Paw className="size-6" />
        </span>
      </a>
    </figure>
  );
}
