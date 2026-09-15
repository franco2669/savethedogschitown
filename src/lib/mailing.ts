const KEY = "chi-town-mailing";

export type MailingRecord = {
  email: string;
  name: string;
  zip: string;
  at: string;
};

export function readMailing(): MailingRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MailingRecord;
  } catch {
    return null;
  }
}

export function saveMailing(record: MailingRecord) {
  localStorage.setItem(KEY, JSON.stringify(record));
}
