"use client";

import { useSyncExternalStore } from "react";
import type { Special } from "@/lib/db";
import { storeNow } from "@/lib/time";

// The week's nightly specials on a letter board: a pine header strip, a gold
// seam, then one row per night — tonight's row lit up in pine. "Tonight" is
// worked out in Luzerne's time; on the server no row is lit, so nothing
// flickers. Specials come from the store's database.

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Show the week starting Monday.
const ORDER = [1, 2, 3, 4, 5, 6, 0];

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

export default function SpecialsBoard({ specials }: { specials: Special[] }) {
  const today = useSyncExternalStore(subscribe, () => storeNow().day, () => -1);

  return (
    <div className="w-full overflow-hidden" style={{ borderRadius: "0.75rem", background: "var(--birch)" }}>
      <div className="px-5 py-3" style={{ background: "var(--pine)" }}>
        <span className="label" style={{ color: "var(--gold)" }}>Nightly specials</span>
      </div>
      <div className="seam" aria-hidden="true" />
      <ul>
        {ORDER.map((d, i) => {
          const s = specials.find((x) => x.day === d);
          if (!s) return null;
          const lit = d === today;
          return (
            <li
              key={d}
              className="flex items-center gap-4 px-5 py-3"
              style={{
                background: lit ? "var(--pine)" : "transparent",
                color: lit ? "var(--birch)" : "var(--bark)",
                borderTop: i && !lit ? "1px solid var(--hairline)" : "1px solid transparent",
              }}
              aria-current={lit ? "date" : undefined}
            >
              <span className="label w-[5.5rem] shrink-0" style={{ color: lit ? "var(--gold)" : "var(--stone)" }}>
                {lit ? "Tonight" : DAYS[d].slice(0, 3)}
              </span>
              <span className="heading flex-1 text-lg">{s.name}</span>
              <span className="font-extrabold" style={{ color: lit ? "var(--gold)" : "var(--ember)" }}>
                {s.price}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
