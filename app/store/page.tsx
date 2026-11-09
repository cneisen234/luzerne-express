import type { Metadata } from "next";
import { express, store } from "@/lib/express";
import FuelBoard from "@/components/FuelBoard";
import { PageHero, Photo, Seam } from "@/components/Bits";
import { TrailBadge } from "@/components/Logo";
import {
  DairyIcon,
  FootprintIcon,
  FrozenIcon,
  PantryIcon,
  ProduceIcon,
  ShowerIcon,
  TentIcon,
  WasherIcon,
  WrenchIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: `The Store — ${express.name} | ${express.townShort}`,
  description: "Fresh-cut meat, a full grocery, beer, wine and liquor, fuel, showers and laundry in Luzerne, Michigan.",
};

// The store as its sign reads: one department per panel, red and birch,
// divided by gold seams. The hero's chips jump straight to each one.

const departments = [
  { id: "meat", label: "Meat counter" },
  { id: "grocery", label: "Grocery" },
  { id: "liquor", label: "Beer, wine & liquor" },
  { id: "fuel", label: "Fuel" },
  { id: "showers", label: "Showers & laundry" },
  { id: "shirts", label: "Shirt shop" },
];

const aisles = [
  { Icon: ProduceIcon, label: "Produce" },
  { Icon: DairyIcon, label: "Dairy" },
  { Icon: FrozenIcon, label: "Frozen" },
  { Icon: PantryIcon, label: "Pantry" },
  { Icon: TentIcon, label: "Camping" },
  { Icon: WrenchIcon, label: "Auto & pet" },
];

export default function StorePage() {
  return (
    <>
      <PageHero label="The store" title="Stocked for" accent="up north." photo="/photos/store-aisle.webp">
        <nav aria-label="Departments" className="mt-9 flex flex-wrap gap-2">
          {departments.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              className="inline-flex min-h-[44px] items-center rounded-lg px-4 text-sm font-extrabold transition-colors hover:bg-[var(--gold)] hover:text-[var(--bark)]"
              style={{ background: "rgba(244, 239, 228, 0.1)", color: "var(--birch)" }}
            >
              {d.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <Seam />

      {/* ---- Meat counter --------------------------------------------------- */}
      <section id="meat" style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>Meat counter</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Cut right here.
            </h2>
            <p className="mt-4 max-w-md text-lg" style={{ color: "var(--ember-soft)" }}>
              Cut fresh on-site, right behind the counter.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="butcher-tag">Homemade brats</span>
              <span className="butcher-tag">Ground bologna</span>
            </div>
          </div>
          <Photo
            src="/photos/store-meat-case.webp"
            alt="The fresh meat case"
            className="aspect-[16/10]"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </section>

      <Seam />

      {/* ---- Grocery -------------------------------------------------------- */}
      <section id="grocery" style={{ background: "var(--birch)" }}>
        <div className="container-x py-16 md:py-20">
          <span className="label" style={{ color: "var(--stone)" }}>Grocery</span>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--ember)" }}>
            Everything on the list.
          </h2>
          <ul className="mt-9 grid grid-cols-3 gap-3 md:grid-cols-6">
            {aisles.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-2.5 rounded-lg px-2 py-6 text-center text-sm font-extrabold"
                style={{ background: "var(--paper)", color: "var(--pine)", border: "1px solid var(--hairline)" }}
              >
                <Icon size={34} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Seam />

      {/* ---- Beer, wine & liquor ------------------------------------------- */}
      <section id="liquor" style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>Beer, wine &amp; liquor</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Fill the cooler.
            </h2>
            <p className="mt-4 max-w-md text-lg" style={{ color: "var(--ember-soft)" }}>
              A full liquor wall, wine, and a walk-in beer cave.
            </p>
          </div>
          <Photo
            src="/photos/store-liquor.webp"
            alt="The liquor wall"
            className="aspect-[16/10]"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </section>

      <Seam />

      {/* ---- Fuel ------------------------------------------------------------ */}
      <section id="fuel" style={{ background: "var(--pine)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <span className="label" style={{ color: "var(--gold)" }}>Fuel</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Fill up on the way in.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2 max-w-md">
              {["Pay at the pump", "Ethanol-free Rec 90", "Diesel", "Air", "ATM"].map((t) => (
                <li
                  key={t}
                  className="rounded-lg px-3.5 py-2 text-sm font-bold"
                  style={{ background: "rgba(244, 239, 228, 0.1)", color: "var(--birch)" }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex lg:justify-end">
            <FuelBoard />
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Showers & laundry --------------------------------------------- */}
      <section id="showers" style={{ background: "var(--birch)" }}>
        <div className="container-x py-16 md:py-20">
          <span className="label" style={{ color: "var(--stone)" }}>Showers &amp; laundry</span>
          <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--ember)" }}>
            Clean up after the trail.
          </h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 max-w-3xl">
            <div className="overflow-hidden rounded-xl" style={{ background: "var(--pine)", color: "var(--birch)" }}>
              <div className="flex items-center gap-3 px-6 pt-6">
                <span style={{ color: "var(--gold)" }}><ShowerIcon size={32} /></span>
                <span className="heading text-2xl">Showers</span>
              </div>
              <p className="px-6 pt-3 pb-6">
                <span className="heading text-4xl" style={{ color: "var(--gold)" }}>{store.showers.price}</span>
                <span className="ml-2 font-bold">for {store.showers.minutes} minutes</span>
              </p>
              <div className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
              <p className="label px-6 py-3" style={{ background: "var(--ember)" }}>
                {store.showers.coins} · {store.showers.extra}
              </p>
            </div>
            <div className="overflow-hidden rounded-xl" style={{ background: "var(--pine)", color: "var(--birch)" }}>
              <div className="flex items-center gap-3 px-6 pt-6">
                <span style={{ color: "var(--gold)" }}><WasherIcon size={32} /></span>
                <span className="heading text-2xl">Laundry</span>
              </div>
              <p className="px-6 pt-3 pb-6 font-bold">
                <span className="heading text-4xl" style={{ color: "var(--gold)" }}>Coin-op</span>
                <span className="ml-2">washers &amp; dryers</span>
              </p>
              <div className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
              <p className="label px-6 py-3" style={{ background: "var(--ember)" }}>
                Open till an hour before close
              </p>
            </div>
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Shirt shop (Luzerne Attire) ----------------------------------- */}
      <section id="shirts" style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>Shirt shop</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Take a little Luzerne home.
            </h2>
            <p className="mt-4 max-w-md text-lg" style={{ color: "var(--ember-soft)" }}>
              Tees, hoodies and tanks, or custom shirts for your group.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 font-bold" style={{ color: "var(--birch)" }}>
              <FootprintIcon /> Yes, the Sasquatch shirts.
            </p>
            <dl className="mt-8 flex flex-wrap gap-3">
              {[
                { k: "Custom orders", v: `${store.attire.leadTime} ahead` },
                { k: "Deposit", v: store.attire.deposit },
                { k: "We ship", v: store.attire.shipping },
              ].map((r) => (
                <div key={r.k} className="rounded-lg px-4 py-3" style={{ background: "var(--birch)" }}>
                  <dt className="label" style={{ color: "var(--stone)" }}>{r.k}</dt>
                  <dd className="heading mt-1 text-xl" style={{ color: "var(--pine)" }}>{r.v}</dd>
                </div>
              ))}
            </dl>
            <a href={express.storePhoneHref} className="btn btn-birch mt-8">
              Call {express.storePhone}
            </a>
          </div>
          <div className="justify-self-center lg:justify-self-end">
            <div className="rounded-full p-2" style={{ background: "var(--birch)" }}>
              <TrailBadge size={220} idPrefix="shirt-badge" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
