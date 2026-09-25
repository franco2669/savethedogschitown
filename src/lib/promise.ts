import { foundingPack } from "@/lib/content";

const KEY = "chi-town-promise";
const PACK_KEY = "chi-town-promise-pack";
const PACK_EVENT = "chi-town-pack-updated";

export type PromiseRecord = {
  name: string;
  zip: string;
  at: string;
};

export type PackMember = {
  name: string;
  place: string;
  at: string;
};

export type PackEntry = {
  name: string;
  place: string;
  justJoined: boolean;
};

export function readPromise(): PromiseRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PromiseRecord;
  } catch {
    return null;
  }
}

export function readPack(): PackMember[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PACK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PackMember[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Newest local signups first, then Marie, Michelle, and Eddie. */
export function listPack(local: PackMember[] = readPack()): PackEntry[] {
  const seen = new Set<string>();
  const ordered: PackEntry[] = [];
  const newest = local[0];
  const newestKey = newest
    ? `${newest.name.toLowerCase()}|${newest.place.toLowerCase()}`
    : "";
  for (const m of [...local, ...foundingPack]) {
    const key = `${m.name.toLowerCase()}|${m.place.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    ordered.push({
      name: m.name,
      place: m.place,
      justJoined: key === newestKey,
    });
  }
  return ordered;
}

export function savePromise(record: PromiseRecord) {
  localStorage.setItem(KEY, JSON.stringify(record));
  const pack = readPack();
  const next: PackMember = {
    name: record.name,
    place: record.zip || "Chi-Town",
    at: record.at,
  };
  const exists = pack.some(
    (m) =>
      m.name.toLowerCase() === next.name.toLowerCase() && m.place === next.place,
  );
  if (!exists) {
    localStorage.setItem(PACK_KEY, JSON.stringify([next, ...pack]));
  }
  window.dispatchEvent(new Event(PACK_EVENT));
}

export function subscribePack(onChange: (members: PackMember[]) => void) {
  const sync = () => onChange(readPack());
  const onStorage = (event: StorageEvent) => {
    if (event.key === PACK_KEY || event.key === null) sync();
  };
  window.addEventListener(PACK_EVENT, sync);
  window.addEventListener("storage", onStorage);
  sync();
  return () => {
    window.removeEventListener(PACK_EVENT, sync);
    window.removeEventListener("storage", onStorage);
  };
}

export function clearPromise() {
  localStorage.removeItem(KEY);
}
