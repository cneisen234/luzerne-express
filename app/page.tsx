import Image from "next/image";
import Link from "next/link";
import { Arrow, Photo, Seam } from "@/components/Bits";
import { mainAction, campingFrom } from "@/lib/express";
import specials from "@/data/specials.json";
import FuelBoard from "@/components/FuelBoard";
import TonightSpecial from "@/components/TonightSpecial";
import { OpenSign } from "@/components/OpenStatus";
import { TrailBadge } from "@/components/Logo";

// Home reads like the store's pylon sign: a pine hero in the woods, then the
// business stacked as panels — red, birch, red — each divided by a gold seam,
// ending back in the pines with the outdoors.

export default function Home() {
  return (
    <>
      {/* ---- Hero: in the pines, with the fuel board ---------------------- */}
      <section className="relative overflow-hidden" style={{ background: "var(--pine)" }}>
        <Image
          src="/photos/hero-pine-forest.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(35, 64, 47, 0.8)" }} aria-hidden="true" />

        <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <span className="label inline-block rounded px-3 py-1.5" style={{ background: "var(--ember)", color: "var(--birch)" }}>
              Fuel · Grocery · Camp
            </span>
            <h1 className="mt-6 text-[2.75rem] sm:text-6xl lg:text-[4.5rem]" style={{ color: "var(--birch)" }}>
              Gas up, stock up,
              <br />
              <span style={{ color: "var(--gold)" }}>head for the river.</span>
            </h1>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/store" className="btn btn-ember">
                See the store
              </Link>
              <Link href={mainAction.href} className="btn btn-gold-line">
                {mainAction.label}
              </Link>
            </div>
            <div className="mt-10">
              <OpenSign />
            </div>
          </div>

          <div className="flex lg:justify-end">
            <FuelBoard />
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Store (red panel — the sign's "Fresh Meats & Deli") ----------- */}
      <section style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>The store</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Fresh-cut meat, and everything else.
            </h2>
            <p className="mt-4 max-w-md text-lg" style={{ color: "var(--ember-soft)" }}>
              A butcher counter, groceries, and beer, wine and liquor.
            </p>
            <Link href="/store" className="link-arrow mt-7" style={{ color: "var(--birch)" }}>
              See the store <Arrow />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Photo src="/photos/store-meat-case.webp" alt="The fresh meat case" className="col-span-2 aspect-[16/9]" sizes="(min-width: 1024px) 560px, 100vw" />
            <Photo src="/photos/store-aisle.webp" alt="Grocery aisles inside the store" className="aspect-[4/3]" sizes="(min-width: 1024px) 280px, 50vw" />
            <Photo src="/photos/store-liquor.webp" alt="The liquor wall" className="aspect-[4/3]" sizes="(min-width: 1024px) 280px, 50vw" />
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Kitchen & deli (birch panel) --------------------------------- */}
      <section style={{ background: "var(--birch)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <Photo
            src="/photos/deli-hot-case.webp"
            alt="The deli hot case"
            className="order-2 lg:order-1 aspect-[4/5] max-h-[520px] w-full max-w-md justify-self-center"
            sizes="(min-width: 1024px) 420px, 90vw"
          />
          <div className="order-1 lg:order-2">
            <span className="label" style={{ color: "var(--stone)" }}>Kitchen &amp; deli</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--ember)" }}>
              Hot food, open to close.
            </h2>
            <p className="mt-4 max-w-md text-lg" style={{ color: "var(--ash)" }}>
              Breakfast, burgers, pizza and subs.
            </p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end">
              <TonightSpecial />
              <p className="text-sm font-bold" style={{ color: "var(--pine)" }}>
                Breakfast buffet
                <br />
                <span style={{ color: "var(--ash)" }}>
                  {specials.buffet.days} · {specials.buffet.time}
                </span>
              </p>
            </div>
            <Link href="/kitchen" className="link-arrow mt-8" style={{ color: "var(--ember)" }}>
              See the menu <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Camping (red panel) ------------------------------------------ */}
      <section style={{ background: "var(--ember)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <span className="label" style={{ color: "var(--ember-soft)" }}>Camping</span>
            <h2 className="mt-3 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Camp out back.
            </h2>
            <p className="mt-4 max-w-md text-lg" style={{ color: "var(--ember-soft)" }}>
              Wooded sites with water and electric, and cabins to rent.
            </p>
            <dl className="mt-7 flex flex-wrap gap-3">
              {[
                { k: "Sites from", v: campingFrom.site },
                { k: "Cabins from", v: campingFrom.cabin },
              ].map((r) => (
                <div key={r.k} className="rounded-lg px-4 py-3" style={{ background: "var(--birch)" }}>
                  <dt className="label" style={{ color: "var(--stone)" }}>{r.k}</dt>
                  <dd className="heading mt-1 text-2xl" style={{ color: "var(--pine)" }}>
                    {r.v}
                    <span className="text-base" style={{ color: "var(--ash)" }}> /night</span>
                  </dd>
                </div>
              ))}
            </dl>
            <Link href={mainAction.href} className="btn btn-birch mt-8">
              {mainAction.label}
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-3">
            <Photo src="/photos/cabin-exterior.webp" alt="A red rental cabin" className="col-span-3 aspect-[4/5]" sizes="(min-width: 1024px) 340px, 60vw" />
            <Photo src="/photos/cabin-interior.webp" alt="Inside a rental cabin" className="col-span-2 aspect-[2/3] self-end" sizes="(min-width: 1024px) 220px, 40vw" />
          </div>
        </div>
      </section>

      <Seam />

      {/* ---- Outdoors (back in the pines) --------------------------------- */}
      <section style={{ background: "var(--pine)" }}>
        <div className="container-x grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid grid-cols-2 gap-3 order-2 lg:order-1">
            <Photo src="/photos/side-by-side.webp" alt="A side-by-side by the river" className="col-span-2 aspect-[16/9]" sizes="(min-width: 1024px) 640px, 100vw" />
            <Photo src="/photos/kayaks-au-sable.webp" alt="Kayaks on the Au Sable River" className="aspect-[4/3]" sizes="(min-width: 1024px) 320px, 50vw" />
            <Photo src="/photos/coopersville.webp" alt="Coopersville, the wild-west town near Luzerne" className="aspect-[4/3]" sizes="(min-width: 1024px) 320px, 50vw" />
          </div>
          <div className="order-1 lg:order-2">
            <TrailBadge size={112} idPrefix="home-badge" />
            <h2 className="mt-6 text-4xl md:text-5xl" style={{ color: "var(--birch)" }}>
              Trails out the door.
              <br />
              <span style={{ color: "var(--gold)" }}>River down the road.</span>
            </h2>
            <p className="mt-4 max-w-md text-lg" style={{ color: "var(--pine-mist)" }}>
              Rent a side-by-side or paddle the Au Sable.
            </p>
            <Link href="/outdoors" className="link-arrow mt-7" style={{ color: "var(--gold)" }}>
              Plan a day out <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
