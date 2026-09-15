const KEY = "chi-town-promise";
const PACK_KEY = "chi-town-promise-pack";

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

export function savePromise(record: PromiseRecord) {
  localStorage.setItem(KEY, JSON.stringify(record));
  const pack = readPack();
  const next: PackMember = {
    name: record.name,
    place: record.zip || "Chi-Town",
    at: record.at,
  };
  const exists = pack.some(
    (m) => m.name.toLowerCase() === next.name.toLowerCase() && m.place === next.place,
  );
  if (!exists) {
    localStorage.setItem(PACK_KEY, JSON.stringify([next, ...pack]));
  }
}

export function clearPromise() {
  localStorage.removeItem(KEY);
}
