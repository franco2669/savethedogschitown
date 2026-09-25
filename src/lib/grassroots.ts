import { createServerFn } from "@tanstack/react-start";

export type FederalOffice = {
  id: string;
  role: "U.S. Senator" | "U.S. Representative";
  name: string;
  party: string | null;
  state: string;
  district: number | null;
  phone: string | null;
  url: string | null;
  contactForm: string | null;
  possible: boolean;
};

export type StateOffice = {
  id: string;
  role: "State Senator" | "State Representative" | "Governor";
  name: string;
  party: string | null;
  district: string | null;
  email: string | null;
  phones: { where: string; phone: string }[];
  url: string | null;
};

export type OfficeLookup = {
  zip: string;
  state: string | null;
  ambiguous: boolean;
  federal: FederalOffice[];
  stateOffices: StateOffice[];
  stateNote: string | null;
};

type IlPerson = {
  name: string;
  party: string | null;
  district: string;
  chamber: "senate" | "house";
  email: string | null;
  phones: { where: string; phone: string }[];
  url: string | null;
};

type IlFile = {
  senate: Record<string, IlPerson>;
  house: Record<string, IlPerson>;
  governor: {
    name: string;
    party: string | null;
    phone: string;
    url: string;
  };
};

const ASK =
  "oppose the breeding and use of dogs in laboratory testing, and send a written position";

export function contactScripts(office: { name: string; role: string }, zip: string) {
  const last = office.name.replace(/\./g, "").split(" ").slice(-1)[0];
  const title =
    office.role === "Governor"
      ? "Governor"
      : office.role.includes("Senator")
        ? "Senator"
        : "Representative";
  const dear = `${title} ${last}`;
  const subject = `Constituent in ${zip}: end the use of dogs in laboratory testing`;
  const email = `Dear ${dear},

I live in ZIP ${zip}. I am asking you to ${ASK}.

Dogs are still bred as inventory for U.S. laboratories. Chicago is part of that system: university and contract labs here use animals, and the supply chain still runs through commercial breeders. Marshall BioResources in New York still holds tens of thousands of beagles for this purpose.

Please tell me where you stand, and what you will do. I will follow up.

Your name
ZIP ${zip}`;

  const call = `Hello, my name is [your name]. I am a constituent in ZIP ${zip}.

I am asking ${dear} to ${ASK}.

Please log this call. Thank you.`;

  const text = `Constituent in ZIP ${zip}. Please log this: I am asking ${dear} to ${ASK}. Thank you.`;

  return { subject, email, call, text, dear };
}

export const impactSteps = [
  {
    title: "Say you live here",
    body: "Give your name and ZIP. Offices count contacts from their own people. A call from somewhere else is easy to ignore.",
  },
  {
    title: "One ask",
    body: "Oppose the breeding and use of dogs in laboratory testing, and put the office’s position in writing. One sentence. Do not bring a list.",
  },
  {
    title: "Stay short",
    body: "Under a minute on the phone. Ten lines in an email. Staff log the ask. They do not log a speech.",
  },
  {
    title: "Stay civil",
    body: "The person who answers is staff. Insults get a note that says hostile, not a note that says dogs. Pressure is volume and repetition, not a threat.",
  },
  {
    title: "Use the public office",
    body: "Call the number on this page. Use the contact form or the official email. Do not text or call a home or a cell you found somewhere else.",
  },
  {
    title: "Leave the voicemail",
    body: "If no one picks up, leave the same script: name, ZIP, the ask, and that you want it logged.",
  },
  {
    title: "Two records",
    body: "Call, then send the email or the form the same day. Two contacts from one person are harder to file as a maybe.",
  },
  {
    title: "Bring two more",
    body: "The point of a grassroots push is that the next person in your ZIP does it this week. Text them the link. Do not do this alone and call it pressure.",
  },
];

export const lookupOffices = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") {
      throw new Error("Enter a 5-digit ZIP code.");
    }
    const raw = input as { zip?: unknown; street?: unknown };
    const zip = String(raw.zip ?? "")
      .replace(/\D/g, "")
      .slice(0, 5);
    const street = String(raw.street ?? "")
      .trim()
      .slice(0, 120);
    if (zip.length !== 5) throw new Error("Enter a 5-digit ZIP code.");
    return { zip, street };
  })
  .handler(async ({ data }): Promise<OfficeLookup> => {
    const congress = (await import("./congress.json")).default as {
      house: Record<
        string,
        {
          name: string;
          party: string | null;
          state: string;
          district: number;
          phone: string | null;
          url: string | null;
          contactForm: string | null;
        }
      >;
      senate: Record<
        string,
        Array<{
          name: string;
          party: string | null;
          state: string;
          phone: string | null;
          url: string | null;
          contactForm: string | null;
        }>
      >;
      zips: Record<string, string[]>;
    };

    const districts = congress.zips[data.zip] ?? [];
    if (districts.length === 0) {
      throw new Error("No congressional district is on file for that ZIP. Check the number.");
    }

    const state = congress.house[districts[0]]?.state ?? null;
    let ambiguous = districts.length > 1;
    const federal: FederalOffice[] = [];

    for (const senator of congress.senate[state ?? ""] ?? []) {
      federal.push({
        id: `sen-${senator.name}`,
        role: "U.S. Senator",
        name: senator.name,
        party: senator.party,
        state: senator.state,
        district: null,
        phone: senator.phone,
        url: senator.url,
        contactForm: senator.contactForm,
        possible: false,
      });
    }

    for (const code of districts) {
      const rep = congress.house[code];
      if (!rep) continue;
      federal.push({
        id: `rep-${code}`,
        role: "U.S. Representative",
        name: rep.name,
        party: rep.party,
        state: rep.state,
        district: rep.district,
        phone: rep.phone,
        url: rep.url,
        contactForm: rep.contactForm,
        possible: ambiguous,
      });
    }

    if (federal.length === 0) {
      throw new Error("No U.S. House or Senate office came back for that ZIP. Check the number.");
    }

    const geo = data.street
      ? await illinoisDistricts(`${data.street}, ${data.zip}`)
      : null;
    if (geo?.congress) {
      const narrowed = federal.filter(
        (office) => office.role !== "U.S. Representative" || office.district === geo.congress,
      );
      if (narrowed.some((office) => office.role === "U.S. Representative")) {
        federal.length = 0;
        federal.push(...narrowed.map((office) => ({ ...office, possible: false })));
        ambiguous = false;
      }
    }

    const stateOffices: StateOffice[] = [];
    let stateNote: string | null = null;

    if (state === "IL") {
      const file = (await import("./il-officials.json")).default as IlFile;
      stateOffices.push({
        id: "il-governor",
        role: "Governor",
        name: file.governor.name,
        party: file.governor.party,
        district: null,
        email: null,
        phones: [{ where: "capitol", phone: file.governor.phone }],
        url: file.governor.url,
      });

      if (!data.street) {
        stateNote =
          "Add a street address to get your Illinois state senator and representative. A ZIP alone often covers more than one district. The governor is statewide, so that office is listed either way.";
      } else if (!geo?.senate || !geo?.house) {
          stateNote =
            "That street did not match an Illinois state district. Check the spelling, or look up your state senator and representative at ilga.gov. Your federal offices and the governor are still listed.";
        } else {
          const senator = file.senate[String(geo.senate)];
          const rep = file.house[String(geo.house)];
          if (senator) {
            stateOffices.push({
              id: `il-senate-${geo.senate}`,
              role: "State Senator",
              name: senator.name,
              party: senator.party,
              district: senator.district,
              email: senator.email,
              phones: senator.phones,
              url: senator.url,
            });
          }
          if (rep) {
            stateOffices.push({
              id: `il-house-${geo.house}`,
              role: "State Representative",
              name: rep.name,
              party: rep.party,
              district: rep.district,
              email: rep.email,
              phones: rep.phones,
              url: rep.url,
            });
          }
          if (!senator || !rep) {
            stateNote =
              "Part of the state match did not line up with the current member list. Use ilga.gov for anyone missing below.";
          }
        }
    }

    return { zip: data.zip, state, ambiguous, federal, stateOffices, stateNote };
  });

async function illinoisDistricts(address: string) {
  try {
    const url = new URL(
      "https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress",
    );
    url.searchParams.set("address", address);
    url.searchParams.set("benchmark", "Public_AR_Current");
    url.searchParams.set("vintage", "Current_Current");
    url.searchParams.set("layers", "54,56,58");
    url.searchParams.set("format", "json");
    const res = await fetch(url, {
      headers: { "User-Agent": "SaveTheDogsChiTown/1.0" },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      result?: {
        addressMatches?: Array<{ geographies?: Record<string, Array<Record<string, string>>> }>;
      };
    };
    const geos = json.result?.addressMatches?.[0]?.geographies;
    if (!geos) return null;
    let senate: number | null = null;
    let house: number | null = null;
    let congress: number | null = null;
    for (const [key, rows] of Object.entries(geos)) {
      const row = rows?.[0];
      if (!row) continue;
      const num = Number.parseInt(row.BASENAME ?? row.CD120 ?? row.CD119 ?? "", 10);
      if (!Number.isFinite(num)) continue;
      if (key.includes("Congressional")) congress = num;
      if (key.includes("Upper")) senate = num;
      if (key.includes("Lower")) house = num;
    }
    if (!senate && !house && !congress) return null;
    return { senate, house, congress };
  } catch {
    return null;
  }
}
