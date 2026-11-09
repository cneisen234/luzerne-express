import type { Metadata } from "next";
import { express, outdoors } from "@/lib/express";
import { PageHero, Photo, Seam } from "@/components/Bits";
import { TrailBadge } from "@/components/Logo";
import { FootprintIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `Outdoors — ${express.name} | ${express.townShort}`,
  description: "Side-by-side rentals onto the state trails, canoes, kayaks and tubes on the Au Sable with a free shuttle, and what to do around Luzerne, Michigan.",
};

// The outdoors side, as panels: side-by-sides on a rate board (red), the river
// (birch), and what's around Luzerne (pine, with the trail badge). Rates and
// rules are from the campground's own site.

const { sideBySides, river } = outdoors;

export default function OutdoorsPage() {
  return (
    <>
      <PageHero label="Outdoors" title="Miles of trail," accent="and the Au Sable." photo="/photos/side-by-side.webp" />

      <Seam />

      {/* ---- Side-by-sides ----------------------------------------------- */}
      <section style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>Side-by-sides</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Hit the state trails.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {sideBySides.perks.map((r) => (
                <li
                  key={r}
                  className="rounded-lg px-3.5 py-2 text-sm font-bold"
                  style={{ background: "rgba(244, 239, 228, 0.14)", color: "var(--birch)" }}
                >
                  {r}
                </li>
              ))}
            </ul>
            <a href={express.campPhoneHref} className="btn btn-birch mt-8">
              Call {express.campPhone}
            </a>
            <p className="mt-4 max-w-sm text-sm font-semibold" style={{ color: "var(--ember-soft)" }}>
              {sideBySides.toRent}
            </p>
          </div>

          <div className="w-full overflow-hidden" style={{ borderRadius: "0.75rem", background: "var(--birch)" }}>
            <table className="w-full border-separate border-spacing-0">
              <caption className="sr-only">Side-by-side rental rates</caption>
              <thead>
                <tr>
                  <th scope="col" className="label px-4 py-3 text-left md:px-5" style={{ color: "var(--gold)", background: "var(--pine)", letterSpacing: "0.14em" }}>Rates</th>
                  {sideBySides.units.map((u) => (
                    <th key={u.id} scope="col" className="label whitespace-nowrap py-3 pr-4 text-right md:pr-5" style={{ color: "var(--birch)", background: "var(--pine)", letterSpacing: "0.14em" }}>
                      {u.name}
                    </th>
                  ))}
                </tr>
                <tr aria-hidden="true">
                  <td colSpan={sideBySides.units.length + 1} className="seam p-0" />
                </tr>
              </thead>
              <tbody>
                {sideBySides.durations.map((d, i) => (
                  <tr key={d}>
                    <th scope="row" className="heading whitespace-nowrap px-4 py-3.5 text-left text-lg font-normal md:px-5 md:text-xl" style={{ color: "var(--bark)", borderTop: i ? "1px solid var(--hairline)" : "none" }}>
                      {d}
                    </th>
                    {sideBySides.units.map((u) => (
                      <td key={u.id} className="heading py-3.5 pr-4 text-right text-xl md:pr-5 md:text-2xl" style={{ color: "var(--pine)", borderTop: i ? "1px solid var(--hairline)" : "none" }}>
                        {u.prices[i]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- The river --------------------------------------------------- */}
      <section style={{ background: "var(--birch)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
          <Photo
            src="/photos/kayaks-au-sable.webp"
            alt="Kayaks on the Au Sable River"
            className="order-2 lg:order-1 aspect-[16/10]"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
          <div className="order-1 lg:order-2">
            <span className="label" style={{ color: "var(--stone)" }}>The river</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--ember)" }}>
              Paddle the Au Sable.
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {river.boats.map((b) => (
                <span key={b} className="butcher-tag butcher-tag-kraft">{b}</span>
              ))}
            </div>
            <p className="mt-6 text-lg font-bold" style={{ color: "var(--pine)" }}>{river.perk}</p>
            <div className="mt-6 inline-flex flex-col overflow-hidden" style={{ borderRadius: "0.6rem" }}>
              <span className="px-5 pt-3.5 pb-3" style={{ background: "var(--pine)" }}>
                <span className="heading block text-2xl" style={{ color: "var(--birch)" }}>{river.from}</span>
                <span className="label" style={{ color: "var(--gold)" }}>{river.where}</span>
              </span>
              <span className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
              <a
                href={river.phoneHref}
                className="px-5 py-2.5 font-extrabold hover:underline"
                style={{ background: "var(--ember)", color: "var(--birch)" }}
              >
                {river.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Around Luzerne ---------------------------------------------- */}
      <section style={{ background: "var(--pine)" }}>
        <div className="container-x py-16 md:py-20">
          <div className="flex items-center gap-6">
            <TrailBadge size={96} idPrefix="outdoors-badge" className="shrink-0" />
            <div>
              <span className="label" style={{ color: "var(--gold)" }}>Around Luzerne</span>
              <h2 className="mt-2 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
                Out here.
              </h2>
            </div>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outdoors.nearby.map((n) => (
              <li
                key={n.id}
                className={`overflow-hidden rounded-xl ${"photo" in n ? "sm:row-span-2" : ""}`}
                style={{ background: "var(--birch)" }}
              >
                {"photo" in n && n.photo ? (
                  <Photo src={n.photo} alt={n.name} className="aspect-[4/3] rounded-none" sizes="(min-width: 1024px) 380px, 50vw" />
                ) : null}
                <div className="px-5 py-4">
                  <span className="heading block text-2xl" style={{ color: "var(--pine)" }}>{n.name}</span>
                  <span className="mt-1 block font-semibold" style={{ color: "var(--ash)" }}>{n.detail}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10 inline-flex items-center gap-2.5 font-bold" style={{ color: "var(--pine-mist)" }}>
            <span style={{ color: "var(--gold)" }}><FootprintIcon /></span>
            {outdoors.wildlife}
          </p>
        </div>
      </section>
    </>
  );
}
