const KEY = "chi-town-facility-tips";

export type FacilityTip = {
  name: string;
  city: string;
  note: string;
  source: string;
  at: string;
};

export function readTips(): FacilityTip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FacilityTip[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTip(tip: FacilityTip) {
  const next = [tip, ...readTips()];
  localStorage.setItem(KEY, JSON.stringify(next));
}
