import type { Metadata } from "next";
import { Suspense } from "react";
import { express, menuSections } from "@/lib/express";
import { getMenu } from "@/lib/db";
import { PageHero, Seam } from "@/components/Bits";
import { LiveBuffet, LiveSpecialsBoard } from "@/components/Live";

export const metadata: Metadata = {
  title: `Kitchen & Deli — ${express.name} | ${express.townShort}`,
  description: "Breakfast, burgers, pizza and subs, a different special every night, a weekend breakfast buffet, and homemade baked goods.",
};

// The kitchen as sign panels: the nightly specials board on red, the menu on
// birch with kraft price tags, the weekend buffet back in the pines, and the
// baked goods on red. Menu, specials and the buffet come from the store's
// database (managed in Pilot Light), read at request time.

async function MenuCards() {
  const menu = await getMenu();
  return (
    <>
      {menuSections.map((sec) => (
        <div
          key={sec.id}
          className="rounded-xl p-6"
          style={{ background: "var(--paper)", border: "1px solid var(--hairline)" }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-2xl" style={{ color: "var(--pine)" }}>{sec.title}</h3>
            {"note" in sec && sec.note ? (
              <span className="label" style={{ color: "var(--stone)" }}>{sec.note}</span>
            ) : null}
          </div>
          <div className="mt-3 h-[3px] w-12" style={{ background: "var(--gold)" }} aria-hidden="true" />
          <ul className="mt-3">
            {menu[sec.id].map((it, i) => (
              <li
                key={it.name}
                className="flex items-center justify-between gap-4 py-2.5"
                style={{ borderTop: i ? "1px solid var(--hairline)" : "none" }}
              >
                <span className="font-semibold" style={{ color: "var(--bark)" }}>{it.name}</span>
                {it.price ? <span className="price-tag">{it.price}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

async function BakedGoods() {
  const { bakery } = await getMenu();
  return (
    <>
      {bakery.map((b) => (
        <span key={b.name} className="butcher-tag">{b.name}</span>
      ))}
    </>
  );
}

export default function KitchenPage() {
  return (
    <>
      <PageHero label="Kitchen & deli" title="Breakfast through" accent="dinner." photo="/photos/deli-hot-case.webp">
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href={express.storePhoneHref} className="btn btn-ember">
            Call ahead {express.storePhone}
          </a>
          <span className="label" style={{ color: "var(--pine-mist)" }}>Eat in · To go</span>
        </div>
      </PageHero>

      <Seam />

      {/* ---- Nightly specials ------------------------------------------- */}
      <section style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>Nightly specials</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              A different dinner every night.
            </h2>
          </div>
          <LiveSpecialsBoard />
        </div>
      </section>

      <Seam />

      {/* ---- Menu --------------------------------------------------------- */}
      <section style={{ background: "var(--birch)" }}>
        <div className="container-x py-16 md:py-20">
          <span className="label" style={{ color: "var(--stone)" }}>Menu</span>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--ember)" }}>
            Made to order.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Suspense fallback={<div className="min-h-[36rem] md:col-span-2" />}>
              <MenuCards />
            </Suspense>
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Weekend breakfast buffet ----------------------------------- */}
      <section style={{ background: "var(--pine)" }}>
        <div className="container-x flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <span className="label" style={{ color: "var(--gold)" }}>Weekends</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Breakfast buffet.
            </h2>
          </div>
          <div className="inline-flex flex-col self-start overflow-hidden md:self-auto" style={{ borderRadius: "0.6rem" }}>
            <span className="heading px-6 pt-4 pb-3 text-3xl" style={{ background: "var(--birch)", color: "var(--pine)" }}>
              <LiveBuffet part="days" />
            </span>
            <span className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
            <span className="label px-6 py-2.5" style={{ background: "var(--ember)", color: "var(--birch)" }}>
              <LiveBuffet part="time" />
            </span>
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Baked goods -------------------------------------------------- */}
      <section style={{ background: "var(--ember)" }}>
        <div className="container-x py-16 md:py-20">
          <span className="label" style={{ color: "var(--ember-soft)" }}>Bakery</span>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
            Baked here.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Suspense fallback={null}>
              <BakedGoods />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
