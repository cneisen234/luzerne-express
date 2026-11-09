"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { express, navLinks, mainAction } from "@/lib/express";
import { SignPanel } from "./Logo";
import { OpenChip } from "./OpenStatus";

// Site header. Six links, so every one is a plain link (Pilot Light's
// docs/site-conventions.md §4); the main button isn't part of the menu.
// Desktop: the sign-panel logo, the links, open status + phone, main button.
// Phone: open status + menu button, opening the full-screen menu — links
// stacked like sign panels between thin gold seams, main button and contact
// at the bottom.

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // A gold seam appears under the header once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen menu is open; Escape closes it.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50" style={{ background: "var(--pine)" }}>
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <Link href="/" onClick={close} aria-label={`${express.name} home`} className="shrink-0">
            <SignPanel tone="birch" size={0.78} tagline={false} />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className="relative block px-3 py-2 text-[0.95rem] font-extrabold transition-colors hover:text-[var(--gold)]"
                      style={{ color: active ? "var(--gold)" : "var(--birch)" }}
                    >
                      {l.label}
                      <span
                        aria-hidden="true"
                        className="absolute left-3 right-3 -bottom-0.5 h-[3px] rounded-full transition-opacity"
                        style={{ background: "var(--gold)", opacity: active ? 1 : 0 }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop right: open status + phone, main button */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex flex-col items-end gap-0.5">
              <OpenChip showLine={false} />
              <a href={express.storePhoneHref} className="text-xs font-bold hover:underline" style={{ color: "var(--pine-mist)" }}>
                {express.storePhone}
              </a>
            </div>
            <Link href={mainAction.href} className="btn btn-ember">
              {mainAction.label}
            </Link>
          </div>

          {/* Phone: open status + menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <OpenChip showLine={false} />
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-lg transition-colors"
              style={{ background: isOpen ? "var(--ember)" : "rgba(244, 239, 228, 0.1)" }}
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="phone-menu"
            >
              <span className="relative flex h-4 w-5 flex-col justify-between" aria-hidden="true">
                <span
                  className="block h-0.5 w-full rounded-full transition-transform origin-center"
                  style={{ background: "var(--birch)", transform: isOpen ? "rotate(45deg) translate(4px, 5px)" : "none" }}
                />
                <span
                  className="block h-0.5 w-full rounded-full transition-opacity"
                  style={{ background: "var(--birch)", opacity: isOpen ? 0 : 1 }}
                />
                <span
                  className="block h-0.5 w-full rounded-full transition-transform origin-center"
                  style={{ background: "var(--birch)", transform: isOpen ? "rotate(-45deg) translate(4px, -5px)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="h-[3px] transition-opacity"
          style={{ background: "var(--gold)", opacity: scrolled && !isOpen ? 1 : 0 }}
        />
      </header>

      {/* Full-screen phone menu */}
      <div
        id="phone-menu"
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "var(--pine)" }}
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col px-6 pt-[100px] pb-8">
          <nav aria-label="Main" className="flex flex-1 flex-col justify-center">
            <ul style={{ borderTop: "1px solid rgba(217, 164, 65, 0.4)" }}>
              {navLinks.map((l, idx) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href} style={{ borderBottom: "1px solid rgba(217, 164, 65, 0.4)" }}>
                    <div className={isOpen ? "fade-in-up" : ""} style={{ animationDelay: `${idx * 55}ms` }}>
                      <Link
                        href={l.href}
                        onClick={close}
                        tabIndex={isOpen ? 0 : -1}
                        aria-current={active ? "page" : undefined}
                        className="heading block py-3.5 text-[2rem]"
                        style={{ color: active ? "var(--gold)" : "var(--birch)" }}
                      >
                        {l.label}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-8">
            <Link
              href={mainAction.href}
              onClick={close}
              tabIndex={isOpen ? 0 : -1}
              className="btn btn-ember w-full text-lg py-4"
            >
              {mainAction.label}
            </Link>
            <div className="mt-5 space-y-1 text-center text-sm font-semibold" style={{ color: "var(--pine-mist)" }}>
              <a href={express.storePhoneHref} tabIndex={isOpen ? 0 : -1} className="block hover:underline">
                {express.storePhone}
              </a>
              <p>
                {express.address} · {express.townShort}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
