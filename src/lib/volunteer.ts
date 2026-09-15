const KEY = "chi-town-volunteer";

export type VolunteerRecord = {
  name: string;
  email: string;
  city: string;
  help: string;
  at: string;
};

export function readVolunteer(): VolunteerRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VolunteerRecord;
  } catch {
    return null;
  }
}

export function saveVolunteer(record: VolunteerRecord) {
  localStorage.setItem(KEY, JSON.stringify(record));
}
