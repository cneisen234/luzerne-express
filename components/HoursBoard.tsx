"use client";

import { useSyncExternalStore } from "react";
import type { WeekHours } from "@/lib/db";
import { storeNow, to12h } from "@/lib/time";

// The week's store hours on a letter board — pine header, gold seam, one row
// per day with today lit up. "Today" is Luzerne's today; nothing is lit on the
// server, so nothing flickers. Hours come from the store's database (null while
// they load: the rows show without times).

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const ORDER = [1, 2, 3, 4, 5, 6, 0];

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

export default function HoursBoard({ hours }: { hours: WeekHours | null }) {
  const today = useSyncExternalStore(subscribe, () => storeNow().day, () => -1);

  return (
    <div className="w-full overflow-hidden" style={{ borderRadius: "0.75rem", background: "var(--birch)" }}>
      <div className="px-5 py-3" style={{ background: "var(--pine)" }}>
        <span className="label" style={{ color: "var(--gold)" }}>Store hours</span>
      </div>
      <div className="seam" aria-hidden="true" />
      <ul>
        {ORDER.map((d, i) => {
          const h = hours?.[d];
          const lit = d === today;
          return (
            <li
              key={d}
              className="flex items-center justify-between gap-4 px-5 py-3"
              style={{
                background: lit ? "var(--pine)" : "transparent",
                color: lit ? "var(--birch)" : "var(--bark)",
                borderTop: i && !lit ? "1px solid var(--hairline)" : "1px solid transparent",
              }}
              aria-current={lit ? "date" : undefined}
            >
              <span className="heading text-lg">
                {DAYS[d]}
                {lit ? (
                  <span className="label ml-3" style={{ color: "var(--gold)" }}>Today</span>
                ) : null}
              </span>
              <span className="font-extrabold tabular-nums" style={{ color: lit ? "var(--gold)" : "var(--pine)" }}>
                {!hours ? " " : h ? `${to12h(h.open)} – ${to12h(h.close)}` : "Closed"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
