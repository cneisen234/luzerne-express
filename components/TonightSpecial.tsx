"use client";

import { useSyncExternalStore } from "react";
import specials from "@/data/specials.json";
import { storeNow } from "@/lib/time";

// Tonight's special as a little sign panel: pine top with the dish, gold seam,
// red strip with the price. Picks the night in Luzerne's time; neutral on the
// server so nothing flickers. Specials come from data/specials.json.

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

export default function TonightSpecial() {
  const day = useSyncExternalStore(subscribe, () => storeNow().day, () => -1);
  const special = specials.nightly.find((s) => s.day === day);

  return (
    <div className="w-full max-w-sm overflow-hidden" style={{ borderRadius: "0.6rem" }}>
      <div className="px-5 pt-3.5 pb-3" style={{ background: "var(--pine)" }}>
        <span className="label" style={{ color: "var(--gold)" }}>
          Tonight&apos;s special
        </span>
        <p className="heading mt-1.5 text-[1.6rem] min-h-[1.75rem]" style={{ color: "var(--birch)" }}>
          {special?.name ?? " "}
        </p>
      </div>
      <div className="h-[3px]" style={{ background: "var(--gold)" }} aria-hidden="true" />
      <div className="flex items-center justify-between px-5 py-2.5" style={{ background: "var(--ember)", color: "var(--birch)" }}>
        <span className="label">Dine in or to go</span>
        <span className="font-extrabold">{special?.price ?? ""}</span>
      </div>
    </div>
  );
}
