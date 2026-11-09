// ---------------------------------------------------------------------------
// Luzerne Express — Luzerne, MI — single source of truth.
//
// Every business fact the site renders lives here. Presentation never hardcodes
// a phone number, an address or an hour — it imports from this module. Facts
// come from the store's own website, its Facebook pages (the winter-hours
// post), and its listings.
// ---------------------------------------------------------------------------

export const express = {
  name: "Luzerne Express",
  tagline: "Fuel · Grocery · Camp",
  town: "Luzerne, Michigan",
  townShort: "Luzerne, MI",

  blurb:
    "Gas, groceries, fresh-cut meats, a full kitchen, and a campground out back — in the jack pines of Luzerne, Michigan.",

  address: "3535 W Park Rd",
  cityStateZip: "Luzerne, MI 48636",

  storePhone: "(989) 555-0101",
  storePhoneHref: "tel:+19895550101",
  campPhone: "(989) 555-0102",
  campPhoneHref: "tel:+19895550102",

  facebook: "https://www.facebook.com/LuzerneExpress/",

  // Keyless Google Maps links (work with no API key).
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Luzerne+Express+3535+W+Park+Rd+Luzerne+MI+48636",
  mapsEmbed:
    "https://www.google.com/maps?q=Luzerne+Express,+3535+W+Park+Rd,+Luzerne,+MI+48636&output=embed",
} as const;

// ---- Navigation -------------------------------------------------------------
// Six links, so every one is a plain link (Pilot Light docs/site-conventions.md
// §4). The header's main button isn't part of the menu.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/kitchen", label: "Kitchen & Deli" },
  { href: "/camping", label: "Camping" },
  { href: "/outdoors", label: "Outdoors" },
  { href: "/visit", label: "Visit" },
] as const;

export const mainAction = { href: "/camping", label: "Book a site" } as const;

// ---- Hours ------------------------------------------------------------------
// 0 = Sun … 6 = Sat. open/close are 24h decimal hours, Luzerne (Eastern) time.
// From the store's posted winter hours.
export type DayHours = { open: number; close: number } | null;

export const hours: Record<number, DayHours> = {
  0: { open: 7, close: 20 }, // Sun 7–8
  1: { open: 6, close: 20 }, // Mon 6–8
  2: { open: 6, close: 20 }, // Tue 6–8
  3: { open: 6, close: 20 }, // Wed 6–8
  4: { open: 6, close: 20 }, // Thu 6–8
  5: { open: 6, close: 21 }, // Fri 6–9
  6: { open: 7, close: 21 }, // Sat 7–9
};

export const hoursDisplay = [
  { label: "Mon – Thu", value: "6 AM – 8 PM" },
  { label: "Friday", value: "6 AM – 9 PM" },
  { label: "Saturday", value: "7 AM – 9 PM" },
  { label: "Sunday", value: "7 AM – 8 PM" },
] as const;

export const TIME_ZONE = "America/Detroit";

// ---- Camping (from the campground's own rate sheet) -------------------------
export const campingFrom = {
  site: "$30",   // tent site, per night (camper sites with water + electric $40)
  cabin: "$80",  // cabins and campers, per night
} as const;

// ---- Store (from the store's own site and listings) -------------------------
export const store = {
  showers: { price: "$2", minutes: 6, extra: "$1 per 2 more minutes", coins: "Quarters" },
  attire: { leadTime: "3 weeks", deposit: "20%", shipping: "$5 per item" },
} as const;

// ---- Campground (from the campground's own rate sheet) ----------------------
export const camping = {
  sites: [
    { id: "camper", name: "Camper site", detail: "Water + 50/30-amp electric", price: "$40", per: "night" },
    { id: "tent", name: "Tent site", detail: "Electric", price: "$30", per: "night" },
    { id: "rustic", name: "Rustic", detail: "No hookups", price: "$8", per: "person" },
    { id: "horse", name: "Horse corral", detail: "Per horse", price: "$10", per: "night" },
  ],
  siteNotes: ["Pull-throughs on request", "Lots average 40′", "Up to 6 per site", "Camper, ORV & horse loops"],
  rentalRates: [
    { price: "$80", per: "night" },
    { price: "$300", per: "week" },
    { price: "$600", per: "month" },
  ],
  rentals: [
    {
      id: "campers",
      name: "Campers",
      sleeps: "2 adults + 4 kids, or 4 adults",
      has: ["Water + full electric", "Bathroom", "Heat & AC", "Coffee pot + basic cookware"],
    },
    {
      id: "cabins",
      name: "Cabins",
      sleeps: "Parties of 4",
      has: ["Electric", "Heat & AC", "Small fridge + coffee pot", "Bathrooms nearby, cleaned daily"],
    },
  ],
  extras: ["Linens $15", "Pets welcome $25", "$100 deposit, back after checkout"],
  checkInUntil: "9 PM",
  payment: "Cash, debit or card",
} as const;

// ---- Outdoors (from the campground's own site + Facebook) -------------------
export const outdoors = {
  sideBySides: {
    durations: ["1 hour", "4 hours", "6 hours", "24 hours"],
    units: [
      { id: "two", name: "Side-by-side", prices: ["$100", "$300", "$400", "$600"] },
      { id: "four", name: "4-seater", prices: ["$150", "$400", "$500", "$700"] },
    ],
    perks: ["Hundreds of miles of trail", "Thousands of acres", "2- and 4-seaters", "Right from your campsite"],
    toRent: "To rent: 25 or older, driver's license and credit card, $1,000 deposit.",
  },
  river: {
    boats: ["Canoes", "Kayaks", "Tubes"],
    perk: "Free shuttle with any rental",
    // River rentals run from the store's sister shop at Parmalee Bridge.
    from: "Parmalee Trading Post",
    where: "At Parmalee Bridge",
    phone: "(989) 555-0103",
    phoneHref: "tel:+19895550103",
  },
  nearby: [
    { id: "boardwalk", name: "Luzerne Boardwalk", detail: "Big Creek and a log bridge" },
    { id: "coopersville", name: "Coopersville", detail: "A wild-west town to wander", photo: "/photos/coopersville.webp" },
    { id: "funpark", name: "Wild Frontier Fun Park", detail: "Rides and mini golf, 30 min" },
    { id: "july4", name: "Fourth of July", detail: "Parade, fireworks from your site" },
    { id: "local", name: "Local fare", detail: "Honey, maple syrup, the Amish creamery" },
  ],
  wildlife: "Deer, eagles, turkeys, porcupines… maybe Bigfoot.",
} as const;
