export const org = {
  name: "Save the Dogs Chi-Town",
  tagline: "Stand up. Speak out. Make a difference.",
  kicker: "For the dogs. For all animals.",
  mission:
    "Save the Dogs Chi-Town is a grassroots movement dedicated to ending animal testing.",
  headline: "You don't need to rescue dogs to save them.",
  subhead:
    "Saving them doesn't look the same for everyone. It looks like you.",
  instagram: "https://www.instagram.com/chitownsavethedogs/",
  instagramHandle: "@chitownsavethedogs",
  facebook: "https://www.facebook.com/share/g/1BdK6E1Myr/",
  coalition: "https://savethedogs.io",
  coalitionUk: "https://savethedogs.uk",
  petition: "https://savethedogs.io/petition",
  march: "https://marchforanimals.org",
  leapingBunny: "https://www.leapingbunny.org/",
  /** Official fundraising URL. Empty until the chapter pastes a clean link — never the old GoFundMe. */
  donate: "",
  pawsBeagles:
    "https://www.pawschicago.org/news-resources/news-features/paws-chicago-news/paws-chicago-news-item/showarticle/25-beagles-get-a-second-chance",
  cbsBeagles:
    "https://www.cbsnews.com/chicago/news/25-beagles-bought-from-wisconsin-research-breeder-coming-to-paws-chicago/",
  apRidglan:
    "https://apnews.com/article/animal-welfare-protest-wisconsin-beagles-de056e8a356fa6798f4f08f5a56d4329",
  uchicago:
    "https://worldanimalnews.com/2026/02/20/millions-wasted-on-barbaric-dog-stroke-experiments-by-nih-nsf-at-uchicago-urgent-action-needed/",
};

export const promisePledges = [
  "I will stand up for dogs used in laboratory testing — and for all animals who cannot speak for themselves.",
  "I will speak out when silence is easier, in Chicago and beyond.",
  "I will shop cruelty-free whenever I can, and ask brands to do better.",
  "I will show up: booths, conversations, votes, and the everyday choices that add up.",
  "I will treat this as action, not a like — and carry the Chi-Town Promise as a public commitment.",
];

export const events = [
  {
    id: "tails-on-trails",
    status: "past" as "upcoming" | "soon" | "past",
    title: "Tails on Trails",
    when: "Sunday, September 13, 2026",
    time: "9:00 AM – 4:00 PM (expo); dogs on trails until sunset",
    where: "The Morton Arboretum",
    address: "4100 Illinois Route 53, Lisle, IL 60532",
    booth: "Pet expo: Arbor Court and the south side of Meadow Lake, East Side",
    blurb:
      "We were at the Morton Arboretum pet expo. White tent, the Promise standee, raffle baskets, and a lot of dogs on the paths. The photos are in the gallery.",
    perks: ["Pup cups", "Raffles", "Chi-Town Promise", "Education table"],
    href: "https://mortonarb.org/explore/activities/events/tails-on-the-trails/",
    note: "Past. Photos from the day are in the gallery.",
    image: "/gallery/tails-6225.jpg",
  },
  {
    id: "border-tails",
    status: "soon" as "upcoming" | "soon" | "past",
    title: "Collaboration with Border Tails Rescue",
    when: "Dates after September 20",
    time: "Planning call on the 20th",
    where: "Chicagoland",
    address: "Location to be announced",
    booth: "",
    blurb:
      "Border Tails Rescue is a local shelter that also partners with the Chicago Wolves on Adopt-a-Dog nights. We have a call on the 20th to lock upcoming events. This page will update when a date and place are real.",
    perks: ["Joint booth", "Education", "Promise"],
    href: "https://www.bordertailsrescue.org/",
    note: "Not confirmed. Do not travel on this listing.",
  },
  {
    id: "bark-in-the-park",
    status: "past" as "upcoming" | "soon" | "past",
    title: "Bark in the Park",
    when: "August 30, 2026",
    time: "11:00 AM – 3:00 PM",
    where: "Al Hattendorf Park",
    address: "225 E. Elk Grove Blvd, Elk Grove Village, IL",
    booth: "Booth #37",
    blurb:
      "Non-dairy pup cups, raffles, goodie bags, the Chi-Town standee, and a table of materials on testing happening in this region. Thank you, Elk Grove.",
    perks: ["Pup cups", "Raffles", "Goodie bags", "Standee"],
    href: "https://www.elkgroveparks.org/event/bark-in-the-park-2/",
    note: "",
    image: "/gallery/bark-5972.jpg",
  },
  {
    id: "dog-days",
    status: "past" as "upcoming" | "soon" | "past",
    title: "Dog Days of Summer",
    when: "July 11, 2026",
    time: "",
    where: "Libertyville, Illinois",
    address: "Libertyville, IL",
    booth: "",
    blurb: "First public booth of the summer.",
    perks: [],
    href: "",
    note: "",
  },
];

export const board: Array<
  | {
      listed: true;
      name: string;
      place: string;
      title: string;
      quote: string;
    }
  | { listed: false; seat: string }
> = [
  {
    listed: true,
    name: "Marie",
    place: "Park Ridge",
    title: "Promise for protection",
    quote:
      "Learning what happens to dogs and other animals in laboratories changed the way I see the world. Protecting them isn't just something I deeply care about, it's something I believe we all have a responsibility to do. All animals deserve lives defined by love, not suffering.",
  },
  {
    listed: true,
    name: "Michelle",
    place: "Elmhurst",
    title: "A voice for the ignored",
    quote:
      "Discovering the truth about animal testing at Ridglan and MBR Acres broke my heart — but it also ignited a fire. I'm turning my heartbreak into empowerment to give a voice to the ignored. Animals bring nothing but pure joy and love into this world. I refuse to stop fighting until every cage is empty, and I urge everyone to join us by taking the Chi-Town Promise.",
  },
  {
    listed: true,
    name: "Eddie",
    place: "Chi-Town",
    title: "My life changed forever",
    quote:
      "They have never been animals to me. They are my family, my kids, our angels. Here to show us what unconditional love and loyalty actually feel like. It's because of what they've given me that I will fight to save them all.",
  },
  { listed: false, seat: "Board" },
  { listed: false, seat: "Board" },
];

export const fightFacts = [
  {
    stat: "2,000+",
    label: "Beagles released from Ridglan Farms in 2026",
  },
  {
    stat: "25",
    label: "Ridglan beagles received by PAWS Chicago on May 2",
  },
  {
    stat: "16,000",
    label: "Dogs still confined at Marshall BioResources, the last major U.S. lab-dog breeder",
  },
  {
    stat: "$4.9M",
    label: "NIH funding documented for University of Chicago dog-stroke experiments",
  },
];

export const timeline = [
  {
    date: "2017–2025",
    title: "Ridglan is documented",
    body: "Investigators, whistleblowers, and Direct Action Everywhere / Simple Heart organizers spend a decade on Ridglan Farms in Blue Mounds, Wisconsin — then the second-largest U.S. breeder of beagles for laboratories. State filings later cite 300+ animal-welfare violations, including surgeries and vocal-cord cuts on conscious dogs.",
  },
  {
    date: "January 2025",
    title: "Felony-cruelty finding",
    body: "A Wisconsin judge finds probable cause for felony animal cruelty. The facility remains open. The campaign does not.",
  },
  {
    date: "March–April 2026",
    title: "Open rescue, then a deal",
    body: "Activists remove 30 dogs in March. Later protests are met with tear gas and rubber bullets. In April, Center for a Humane Economy and Big Dog Ranch Rescue reach an agreement to take 1,500 of Ridglan's roughly 2,000 beagles. CBS Chicago reports 25 of them are coming to PAWS.",
  },
  {
    date: "May 2, 2026",
    title: "Twenty-five beagles reach Chicago",
    body: "PAWS Chicago's rescue van collects 25 dogs, ages 10 months to 3 years, from a Madison staging area and brings them to the Kocourek Medical Center. By June 1, nine have been adopted. These are not Chi-Town's dogs — they are Chicago's proof that the pipeline ended here, in homes.",
  },
  {
    date: "June–August 2026",
    title: "Ridglan shuts down",
    body: "The remaining 475 dogs are scheduled out. AP reports Big Dog Ranch taking the last of them. The final 155 leave in August. A Chi-Town volunteer meets that bus, holds a four-month-old who still has a number tattooed in his ear, and writes the only first-person Chicago account we have of that day.",
  },
  {
    date: "Now",
    title: "Marshall is next. Chicago is not done.",
    body: "Marshall BioResources in North Rose, New York, is the last major commercial breeder of dogs for U.S. labs — on the order of 16,000 animals. The national campaign has a petition and a 207-mile march from Albany (Sept 12–26, 2026). Chi-Town's work is here: the Promise, the booth, and the fact that NIH-funded dog experiments have also been documented at the University of Chicago.",
  },
];

export const fieldNote = {
  date: "August 2026",
  kicker: "From the bus",
  title: "155 beagles. One number in an ear.",
  body: [
    "A Chi-Town volunteer was on the last Ridglan transport. One hundred fifty-five beagles came off a Big Dog Ranch bus. She held many of them. One she could not walk away from.",
    "She did not know his name. She knew the number tattooed inside his ear. Four months old. A cage, and not one moment of love. She stayed more than an hour — talked, prayed, let him not have to be brave. Then she put him back on the bus, the next step toward a home.",
    "If she finds him again, his name will be Victor. For victory. For freedom. For the life he was always meant to live. Until then the work is the rest of the pipeline.",
  ],
  source: "First-person account posted by @chitownsavethedogs, August 2026.",
};

export const chicagoCase = [
  {
    title: "PAWS Chicago, May 2026",
    body: "Twenty-five Ridglan beagles arrived at PAWS Chicago's Kocourek Medical Center on May 2. They had lived in wire cages. Many had never walked on grass. PAWS spent weeks on medical and behavioral intake before foster and adoption. CBS Chicago, FOX 32, and PAWS' own newsroom covered it. Chi-Town did not run that rescue. We exist because people in this city now know those dogs' names.",
    href: org.pawsBeagles,
    linkLabel: "PAWS: 25 beagles get a second chance",
  },
  {
    title: "University of Chicago, 2026",
    body: "In February 2026, White Coat Waste published FOIA records on NIH- and NSF-funded work at the University of Chicago in which dogs are given severe strokes — coils inserted into arteries — then killed. Lab records obtained by WCW admit the animals are \"at risk of significant suffering.\" About $4.9 million in NIH money on that project, plus NSF grant support, with additional years scheduled unless the grants are stopped. Testing is not only a Wisconsin field.",
    href: org.uchicago,
    linkLabel: "White Coat Waste / World Animal News on the UChicago lab",
  },
];

export const actions: Array<
  | {
      title: string;
      body: string;
      label: string;
      external: false;
      to: "/promise" | "/events" | "/act" | "/fight" | "/learn" | "/pack" | "/gallery" | "/map" | "/grassroots";
    }
  | {
      title: string;
      body: string;
      label: string;
      external: true;
      href: string;
    }
> = [
  {
    title: "The Chi-Town Promise",
    body: "Five lines. The first one is that you will stand up for dogs in laboratories — including the ones your taxes already pay for.",
    to: "/promise" as const,
    external: false,
    label: "Take the Promise",
  },
  {
    title: "Grassroots pressure",
    body: "Your ZIP. The offices that spend the money. Call and say it plain: stop paying for dogs to be bred and used in labs. The script is written. You still have to dial.",
    to: "/grassroots" as const,
    external: false,
    label: "Find your offices",
  },
  {
    title: "Tails on Trails",
    body: "September 13 at the Morton Arboretum. The tent is down. The photos from that day, and from Bark in the Park, are in the gallery.",
    to: "/gallery" as const,
    external: false,
    label: "See the photos",
  },
  {
    title: "National petition",
    body: "Marshall still breeds the dogs. Labs still buy them, often with public grants. Put your name on the national ask.",
    href: org.petition,
    external: true,
    label: "Sign the petition",
  },
  {
    title: "March to Abolish Animal Testing",
    body: "September 12–26, 2026. Two hundred seven miles from Albany, New York, to Marshall BioResources. Walk a day, a leg, or the whole way.",
    href: org.march,
    external: true,
    label: "March details",
  },
  {
    title: "Volunteer",
    body: "The booth is where a stranger finds out their paycheck is in this. Name, email, neighborhood, and what you can actually do.",
    to: "/act" as const,
    external: false,
    label: "Volunteer signup",
  },
];

export const whatWeAreNot = [
  "We are not a shelter and we do not pull dogs from Chicago Animal Care and Control.",
  "We are not a 501(c)(3) yet. Donations will be tax-deductible when the paperwork is real, not before.",
  "We are not the national Save the Dogs campaign. We are a Chicago chapter that showed up for Ridglan and stayed.",
  "We are not linking the old GoFundMe pages. The Donate button is already on the site; the official URL goes in when the crew is ready.",
];

export const dailyWork = [
  "Every conversation.",
  "Every cruelty-free purchase.",
  "Every event.",
  "Every phone call.",
  "Every promise.",
];

export const sources = [
  {
    label: "AP: Wisconsin beagle facility closing",
    href: org.apRidglan,
  },
  {
    label: "CBS Chicago: 25 beagles coming to PAWS",
    href: org.cbsBeagles,
  },
  {
    label: "PAWS Chicago: 25 beagles get a second chance",
    href: org.pawsBeagles,
  },
  {
    label: "White Coat Waste on UChicago dog-stroke experiments",
    href: org.uchicago,
  },
  {
    label: "Save the Dogs US — national campaign",
    href: org.coalition,
  },
  {
    label: "Petition to end dog testing",
    href: org.petition,
  },
  {
    label: "March to Abolish Animal Testing",
    href: org.march,
  },
  {
    label: "Leaping Bunny — cruelty-free shopping",
    href: org.leapingBunny,
  },
];

export const foundingPack = [
  { name: "Marie", place: "Park Ridge" },
  { name: "Michelle", place: "Elmhurst" },
  { name: "Eddie", place: "Chi-Town" },
];

export const gallery = [
  {
    src: "/gallery/tails-6239-poster.jpg",
    video: "/gallery/tails-6239.mp4",
    album: "Tails on Trails",
    title: "Pup cup",
    caption: "Tails on Trails, September 13, Morton Arboretum.",
  },
  {
    src: "/gallery/tails-6225.jpg",
    album: "Tails on Trails",
    title: "The booth",
    caption: "The Save the Dogs table under the tents at the Morton Arboretum.",
  },
  {
    src: "/gallery/tails-6244.jpg",
    album: "Tails on Trails",
    title: "The Promise standee",
    caption: "The Chi-Town Promise cutout at the Tails on Trails booth.",
  },
  {
    src: "/gallery/tails-6266.jpg",
    album: "Tails on Trails",
    title: "Chapter shirts",
    caption: "At the Tails on Trails booth.",
  },
  {
    src: "/gallery/tails-6273.jpg",
    album: "Tails on Trails",
    title: "Baskets",
    caption: "Wrapped baskets and a beagle at Tails on Trails.",
  },
  {
    src: "/gallery/bark-5956-poster.jpg",
    video: "/gallery/bark-5956.mp4",
    album: "Bark in the Park",
    title: "Pup cups",
    caption: "Bark in the Park, August 30, Elk Grove Village.",
  },
  {
    src: "/gallery/bark-5930.jpg",
    album: "Bark in the Park",
    title: "The booth",
    caption: "Bark in the Park at Al Hattendorf Park.",
  },
  {
    src: "/gallery/bark-5959.jpg",
    album: "Bark in the Park",
    title: "The banner",
    caption: "Under the Save the Dogs banner at Bark in the Park.",
  },
  {
    src: "/gallery/bark-5972.jpg",
    album: "Bark in the Park",
    title: "The Promise standee",
    caption: "The Chi-Town Promise standee at Bark in the Park.",
  },
  {
    src: "/gallery/bark-5973.jpg",
    album: "Bark in the Park",
    title: "Booth 37",
    caption: "The Bark in the Park table.",
  },
  {
    src: "/gallery/bark-5986.jpg",
    album: "Bark in the Park",
    title: "A puppy",
    caption: "Holding a puppy at Bark in the Park.",
  },
];

export const learnPages = [
  {
    title: "What this fight is",
    body: "Dogs are still bred as inventory for U.S. laboratories. Ridglan Farms in Wisconsin was the second-largest commercial beagle mill for labs. It closed in 2026 after a decade of pressure. Marshall BioResources in New York still holds on the order of 16,000 dogs. Chi-Town’s work is the Chicago end of that pipeline: the Promise, the booth, and the labs in this state.",
  },
  {
    title: "How a dog gets into a lab",
    body: "Commercial breeders raise dogs in cages and sell them to universities, contract labs, and agencies. A number in the ear is not a name. USDA registers research facilities under Animal Welfare Act numbers (Illinois examples start with 33-R-). Those registrations are public. They are a map, not a verdict.",
  },
  {
    title: "Chicago is on the map",
    body: "Twenty-five Ridglan beagles arrived at PAWS Chicago on May 2, 2026. The same year, White Coat Waste published FOIA records on NIH-funded dog-stroke experiments at the University of Chicago — coils in arteries, then the dogs are killed. About $4.9 million in NIH money on that project. Testing is not only a Wisconsin field.",
  },
];

export type FacilityKind = "documented-dog-lab" | "usda-registered" | "rescue";

export const facilities: Array<{
  id: string;
  name: string;
  city: string;
  kind: FacilityKind;
  x: number;
  y: number;
  body: string;
  href: string;
  source: string;
}> = [
  {
    id: "uchicago",
    name: "University of Chicago",
    city: "Hyde Park, Chicago",
    kind: "documented-dog-lab",
    x: 78,
    y: 12,
    body: "FOIA records published in 2026 describe NIH- and NSF-funded work in which dogs are given severe strokes — coils inserted into arteries — then killed. Lab records obtained by White Coat Waste admit the animals are “at risk of significant suffering.” About $4.9 million in NIH funding on that project.",
    href: org.uchicago,
    source: "White Coat Waste / World Animal News, February 2026",
  },
  {
    id: "uic",
    name: "University of Illinois Chicago",
    city: "Illinois Medical District, Chicago",
    kind: "usda-registered",
    x: 74,
    y: 16,
    body: "USDA registration 33-R-0018. Public APHIS and Rise for Animals records for this campus include dogs. We pin USDA-registered Illinois research facilities as we confirm them. A registration is not the same as the UChicago FOIA file — we say so on the pin.",
    href: "https://arlo.riseforanimals.org/entity/university-of-illinois-chicago-il-1491",
    source: "USDA APHIS / Rise for Animals ARLO",
  },
  {
    id: "uiuc",
    name: "University of Illinois Urbana-Champaign",
    city: "Urbana, Illinois",
    kind: "usda-registered",
    x: 62,
    y: 58,
    body: "USDA registration 33-R-0029. AAALAC-accredited campus animal-care program. Pinned as a registered Illinois research facility. We have not independently documented dog-testing protocols here the way White Coat Waste documented the UChicago stroke lab.",
    href: "https://animalcare.illinois.edu/about/institutional-information",
    source: "University of Illinois Division of Animal Resources",
  },
  {
    id: "paws",
    name: "PAWS Chicago — Kocourek Medical Center",
    city: "Chicago",
    kind: "rescue",
    x: 76,
    y: 20,
    body: "Not a laboratory. Twenty-five Ridglan beagles arrived here on May 2, 2026. We pin it so the map holds both ends of the story: where dogs were used, and where twenty-five of them landed.",
    href: org.pawsBeagles,
    source: "PAWS Chicago, May 2026",
  },
];

export const pipelineOutside = [
  {
    name: "Ridglan Farms",
    place: "Blue Mounds, Wisconsin",
    status: "Closed, 2026",
    body: "Second-largest U.S. commercial breeder of beagles for laboratories. Not Illinois — the reason this chapter exists.",
  },
  {
    name: "Marshall BioResources",
    place: "North Rose, New York",
    status: "Active",
    body: "Last major commercial breeder of dogs for U.S. labs. The chapter flyer puts it above 20,000 beagles. National petition and march.",
  },
];

export type MapPinKind = "lab" | "farm" | "dealer";

/** Tile window of public/brand/chicago-metro.jpg (Web Mercator, zoom 11). */
export const metroMap = {
  src: "/brand/chicago-metro.jpg",
  x0: 521.557333,
  y0: 757.334788,
  x1: 527.36,
  y1: 763.913217,
};

export const mapLegend: { kind: MapPinKind; label: string; color: string }[] = [
  { kind: "lab", label: "Labs", color: "#7c3aed" },
  { kind: "farm", label: "Farms / Breeders", color: "#f5c518" },
  { kind: "dealer", label: "Dealers", color: "#e8871a" },
];

export const metroPins: Array<{
  id: string;
  name: string;
  label: string[];
  place: string;
  kind: MapPinKind;
  lat: number;
  lng: number;
  also?: { lat: number; lng: number };
  box: { left: number; top: number; side: "left" | "right" };
  body: string;
  source?: string;
  href?: string;
}> = [
  {
    id: "abbott",
    name: "Abbott Laboratories",
    label: ["Abbott Laboratories:", "Abbott Park & North Chicago"],
    place: "Abbott Park & North Chicago",
    kind: "lab",
    lat: 42.3065,
    lng: -87.889,
    also: { lat: 42.322, lng: -87.848 },
    box: { left: 56, top: 12, side: "right" },
    body: "Abbott Park and North Chicago. Two lab sites on the chapter map, a short drive from the city. Private campuses still sit inside a system paid for with public money: the agencies, the grants, and the dogs bred for labs.",
  },
  {
    id: "wheaton",
    name: "Wheaton College",
    label: ["Wheaton College", "Meyer Science Building"],
    place: "Wheaton",
    kind: "lab",
    lat: 41.8693,
    lng: -88.0982,
    box: { left: 2, top: 50, side: "left" },
    body: "Meyer Science Building, Wheaton. A college lab on the map, in a suburb people treat as separate from this fight. It is not separate. Federal research money is tax money, and this campus is in the system.",
  },
  {
    id: "midwestern",
    name: "Midwestern University",
    label: ["Midwestern University", "(Downers Grove Campus)"],
    place: "Downers Grove",
    kind: "lab",
    lat: 41.8296,
    lng: -88.0088,
    box: { left: 16, top: 70, side: "left" },
    body: "Downers Grove campus. On the map as a lab. The suburbs are not a safe distance from animal testing. They are one of the pins.",
  },
  {
    id: "northwestern",
    name: "Northwestern University Feinberg School of Medicine",
    label: ["Northwestern University", "Feinberg School of Medicine"],
    place: "Streeterville, Chicago",
    kind: "lab",
    lat: 41.8956,
    lng: -87.6215,
    box: { left: 74, top: 48, side: "right" },
    body: "Feinberg School of Medicine, Streeterville. A downtown medical school, on the map as a lab. American medical schools run animal research on NIH grants. NIH is your federal taxes.",
  },
  {
    id: "uic",
    name: "University of Illinois Chicago — Biologic Resources Laboratory",
    label: ["University of Illinois", "Chicago (UIC)", "Biologic Resources Laboratory"],
    place: "Illinois Medical District, Chicago",
    kind: "lab",
    lat: 41.8692,
    lng: -87.6728,
    box: { left: 74, top: 56, side: "right" },
    body: "A public university. State taxes help run this campus. Federal taxes fund the grants. The Biologic Resources Laboratory at 1840 W. Taylor is USDA-registered, 33-R-0018, and public records for this campus include dogs. That is your money, in the Illinois Medical District.",
    source: "USDA APHIS / Rise for Animals ARLO",
    href: "https://arlo.riseforanimals.org/entity/university-of-illinois-chicago-il-1491",
  },
  {
    id: "iitri",
    name: "IIT Research Institute (IITRI)",
    label: ["IIT Research Institute", "(IITRI)"],
    place: "Bronzeville, Chicago",
    kind: "lab",
    lat: 41.831,
    lng: -87.6272,
    box: { left: 74, top: 66, side: "right" },
    body: "IIT Research Institute, near 35th Street. A contract lab on the South Side of Chicago. Contract labs do the work a sponsor pays for, and a lot of those sponsors are federal. This pin is not in another time zone. It is in Bronzeville.",
  },
  {
    id: "uchicago",
    name: "University of Chicago — Carlson Large Animal Facility",
    label: ["The University of Chicago", "Carlson Large Animal Facility"],
    place: "Hyde Park, Chicago",
    kind: "lab",
    lat: 41.7904,
    lng: -87.6046,
    box: { left: 74, top: 74, side: "right" },
    body: "Hyde Park. This is the receipt. FOIA records published in 2026 describe NIH- and NSF-funded work in which dogs are given severe strokes — coils in arteries — then killed. Lab records admit the animals are at risk of significant suffering. About $4.9 million in NIH money on that project. Not a gift. Your taxes.",
    source: "White Coat Waste / World Animal News, February 2026",
    href: org.uchicago,
  },
];
