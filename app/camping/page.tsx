import type { Metadata } from "next";
import Link from "next/link";
import { express, camping } from "@/lib/express";
import { Arrow, PageHero, Photo, Seam } from "@/components/Bits";
import { TentIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `Camping — ${express.name} | ${express.townShort}`,
  description: "Wooded camper and tent sites with water and electric, rustic camping, horse corrals, and cabins and campers to rent behind the store in Luzerne, Michigan.",
};

// The campground as sign panels: the site rates on a board (red), the cabins
// and campers (birch), and how a stay works (pine). Everything here is from
// the campground's own rate sheet.

export default function CampingPage() {
  return (
    <>
      <PageHero label="Camping" title="Pitch it, park it," accent="or rent a cabin." photo="/photos/cabin-exterior.webp">
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href={express.campPhoneHref} className="btn btn-ember">
            Call to book {express.campPhone}
          </a>
          <span className="label" style={{ color: "var(--pine-mist)" }}>Check in at the store</span>
        </div>
      </PageHero>

      <Seam />

      {/* ---- Site rates -------------------------------------------------- */}
      <section style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>Sites</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Pick your spot.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {camping.siteNotes.map((n) => (
                <li
                  key={n}
                  className="rounded-lg px-3.5 py-2 text-sm font-bold"
                  style={{ background: "rgba(244, 239, 228, 0.14)", color: "var(--birch)" }}
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full overflow-hidden" style={{ borderRadius: "0.75rem", background: "var(--birch)" }}>
            <div className="flex items-center gap-2 px-5 py-3" style={{ background: "var(--pine)", color: "var(--gold)" }}>
              <TentIcon size={20} />
              <span className="label">Site rates</span>
            </div>
            <div className="seam" aria-hidden="true" />
            <ul className="px-5 py-1">
              {camping.sites.map((s, i) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-4 py-3.5"
                  style={{ borderTop: i ? "1px solid var(--hairline)" : "none" }}
                >
                  <span>
                    <span className="heading block text-xl" style={{ color: "var(--bark)" }}>{s.name}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--ash)" }}>{s.detail}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="heading text-3xl" style={{ color: "var(--pine)" }}>{s.price}</span>
                    <span className="block text-xs font-bold" style={{ color: "var(--stone)" }}>per {s.per}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Cabins & campers -------------------------------------------- */}
      <section style={{ background: "var(--birch)" }}>
        <div className="container-x py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label" style={{ color: "var(--stone)" }}>Rentals</span>
              <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--ember)" }}>
                Cabins &amp; campers.
              </h2>
            </div>
            <dl className="flex flex-wrap gap-3">
              {camping.rentalRates.map((r) => (
                <div key={r.per} className="rounded-lg px-4 py-3" style={{ background: "var(--pine)" }}>
                  <dt className="sr-only">Per {r.per}</dt>
                  <dd className="heading text-2xl" style={{ color: "var(--gold)" }}>
                    {r.price}
                    <span className="text-base" style={{ color: "var(--pine-mist)" }}> /{r.per}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 grid items-start gap-5 md:grid-cols-2">
            {camping.rentals.map((r) => (
              <div key={r.id} className="overflow-hidden rounded-xl" style={{ background: "var(--paper)", border: "1px solid var(--hairline)" }}>
                {r.id === "cabins" ? (
                  <Photo
                    src="/photos/cabin-interior.webp"
                    alt="Inside a rental cabin"
                    className="aspect-[16/9] rounded-none"
                    sizes="(min-width: 768px) 540px, 100vw"
                  />
                ) : null}
                <div className="px-6 pt-5 pb-4" style={{ background: "var(--pine)" }}>
                  <h3 className="text-3xl" style={{ color: "var(--birch)" }}>{r.name}</h3>
                  <p className="label mt-1.5" style={{ color: "var(--gold)" }}>Sleeps {r.sleeps}</p>
                </div>
                <div className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
                <ul className="px-6 py-4">
                  {r.has.map((h, i) => (
                    <li
                      key={h}
                      className="flex items-center gap-3 py-2 font-semibold"
                      style={{ color: "var(--bark)", borderTop: i ? "1px solid var(--hairline)" : "none" }}
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--ember)" }} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {camping.extras.map((x) => (
              <li key={x} className="price-tag">{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <Seam />

      {/* ---- How a stay works -------------------------------------------- */}
      <section style={{ background: "var(--pine)" }}>
        <div className="container-x py-16 md:py-20">
          <span className="label" style={{ color: "var(--gold)" }}>Your stay</span>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
            How to book.
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { n: "1", t: "Call to book", d: express.campPhone, href: express.campPhoneHref },
              { n: "2", t: "Check in at the store", d: `Till ${camping.checkInUntil}` },
              { n: "3", t: "Pay at check-in", d: camping.payment },
            ].map((s) => (
              <li key={s.n} className="overflow-hidden rounded-xl" style={{ background: "var(--birch)" }}>
                <div className="flex items-center gap-3 px-5 pt-5 pb-4">
                  <span
                    className="heading flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl"
                    style={{ background: "var(--ember)", color: "var(--birch)" }}
                  >
                    {s.n}
                  </span>
                  <span className="heading text-2xl" style={{ color: "var(--pine)" }}>{s.t}</span>
                </div>
                <div className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
                <p className="px-5 py-3 font-bold" style={{ background: "var(--paper)", color: "var(--ash)" }}>
                  {s.href ? (
                    <a href={s.href} className="hover:underline" style={{ color: "var(--ember)" }}>{s.d}</a>
                  ) : (
                    s.d
                  )}
                </p>
              </li>
            ))}
          </ol>
          <Link href="/store#showers" className="link-arrow mt-9" style={{ color: "var(--gold)" }}>
            Showers &amp; laundry at the store <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
