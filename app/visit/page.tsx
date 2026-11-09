import type { Metadata } from "next";
import { express, outdoors } from "@/lib/express";
import HoursBoard from "@/components/HoursBoard";
import { OpenSign } from "@/components/OpenStatus";
import { Arrow, PageHero, Seam } from "@/components/Bits";

export const metadata: Metadata = {
  title: `Visit — ${express.name} | ${express.townShort}`,
  description: "Hours, directions and phone numbers for Luzerne Express, 3535 W Park Rd, Luzerne, Michigan.",
};

// The practical page: the address up top, the week's hours (red), the map
// (birch), and who to call (pine).

const calls = [
  { who: "Store", what: "Groceries, deli, fuel", phone: express.storePhone, href: express.storePhoneHref },
  { who: "Campground", what: "Sites, cabins, side-by-sides", phone: express.campPhone, href: express.campPhoneHref },
  { who: outdoors.river.from, what: "Canoes, kayaks, tubes", phone: outdoors.river.phone, href: outdoors.river.phoneHref },
];

export default function VisitPage() {
  return (
    <>
      <PageHero label="Visit" title={express.address} accent={express.townShort + "."} photo="/photos/hero-pine-forest.webp">
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={express.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-ember">
            Directions
          </a>
          <a href={express.storePhoneHref} className="btn btn-gold-line">
            Call {express.storePhone}
          </a>
        </div>
        <div className="mt-10">
          <OpenSign />
        </div>
      </PageHero>

      <Seam />

      {/* ---- Hours -------------------------------------------------------- */}
      <section style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>Hours</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Open every day.
            </h2>
            <p className="mt-6 max-w-sm text-sm font-semibold" style={{ color: "var(--ember-soft)" }}>
              Showers and laundry close an hour before the store.
            </p>
          </div>
          <HoursBoard />
        </div>
      </section>

      <Seam />

      {/* ---- Map ---------------------------------------------------------- */}
      <section style={{ background: "var(--birch)" }}>
        <div className="container-x grid items-center gap-8 py-16 md:py-20 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="photo aspect-[4/3] w-full md:aspect-[16/10]" style={{ background: "var(--hairline)" }}>
            <iframe
              src={express.mapsEmbed}
              title={`Map to ${express.name}`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="inline-flex flex-col self-start overflow-hidden lg:self-center" style={{ borderRadius: "0.6rem" }}>
            <div className="px-6 pt-5 pb-4" style={{ background: "var(--pine)" }}>
              <span className="heading block text-2xl" style={{ color: "var(--birch)" }}>{express.name}</span>
              <span className="mt-2 block font-semibold leading-relaxed" style={{ color: "var(--pine-mist)" }}>
                {express.address}
                <br />
                {express.cityStateZip}
              </span>
            </div>
            <div className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
            <a
              href={express.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow px-6 py-3 no-underline"
              style={{ background: "var(--ember)", color: "var(--birch)", textDecoration: "none" }}
            >
              Directions <Arrow />
            </a>
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Call ahead --------------------------------------------------- */}
      <section style={{ background: "var(--pine)" }}>
        <div className="container-x py-16 md:py-20">
          <span className="label" style={{ color: "var(--gold)" }}>Contact</span>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
            Give us a call.
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {calls.map((c) => (
              <li key={c.who} className="overflow-hidden rounded-xl" style={{ background: "var(--birch)" }}>
                <div className="px-5 pt-5 pb-4">
                  <span className="heading block text-2xl" style={{ color: "var(--pine)" }}>{c.who}</span>
                  <span className="mt-1 block text-sm font-semibold" style={{ color: "var(--ash)" }}>{c.what}</span>
                </div>
                <div className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
                <a
                  href={c.href}
                  className="block px-5 py-3 font-extrabold hover:underline"
                  style={{ background: "var(--ember)", color: "var(--birch)" }}
                >
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-bold" style={{ color: "var(--birch)" }}>
            <a href={express.facebook} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ color: "var(--gold)" }}>
              Facebook <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
