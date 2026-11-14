import Link from "next/link";
import { express, navLinks } from "@/lib/express";
import { SignPanel } from "./Logo";
import { LiveHoursList } from "./Live";

// Site footer: the sign-panel logo, the header's six links under "Explore"
// (Pilot Light's docs/site-conventions.md §4), how to reach the store, and
// the hours.

// The copyright year, cached with the page (Cache Components won't prerender a
// bare \`new Date()\`); it refreshes whenever the cache does.
async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await copyrightYear();

  return (
    <footer className="mt-auto">
      <div className="seam" aria-hidden="true" />
      <div style={{ background: "var(--pine-deep)", color: "var(--birch)" }}>
        <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
          <div>
            <Link href="/" aria-label={`${express.name} home`} className="inline-block">
              <SignPanel tone="birch" size={1} />
            </Link>
            <p className="mt-5 text-sm font-semibold leading-relaxed" style={{ color: "var(--pine-mist)" }}>
              {express.address}
              <br />
              {express.cityStateZip}
            </p>
            <a
              href={express.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow mt-3 text-sm"
              style={{ color: "var(--gold)" }}
            >
              Directions
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div>
            <h2 className="label" style={{ color: "var(--gold)" }}>
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-bold hover:text-[var(--gold)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label" style={{ color: "var(--gold)" }}>
              Call or follow
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block" style={{ color: "var(--pine-mist)" }}>Store</span>
                <a href={express.storePhoneHref} className="font-bold hover:underline">{express.storePhone}</a>
              </li>
              <li>
                <span className="block" style={{ color: "var(--pine-mist)" }}>Campground</span>
                <a href={express.campPhoneHref} className="font-bold hover:underline">{express.campPhone}</a>
              </li>
              <li>
                <a href={express.facebook} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="label" style={{ color: "var(--gold)" }}>
              Hours
            </h2>
            <ul className="mt-4 space-y-2 text-sm max-w-[15rem]">
              <LiveHoursList />
            </ul>
          </div>
        </div>

        <div className="container-x">
          <div
            className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: "1px solid rgba(244, 239, 228, 0.14)", color: "var(--pine-mist)" }}
          >
            <p>&copy; {year} {express.name}</p>
            <p>
              Website by{" "}
              <a
                href="https://www.kindlingdigital.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
                style={{ color: "var(--gold)" }}
              >
                Kindling Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
