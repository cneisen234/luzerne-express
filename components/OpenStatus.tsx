"use client";

import { useSyncExternalStore } from "react";
import type { WeekHours } from "@/lib/db";
import { storeStatus, type Status } from "@/lib/time";

// Live open/closed, always in Luzerne's time zone, from the hours in the store's
// database (passed in; null while they load). Renders a neutral state on the
// server and fills in on the client, so the clock can't cause a mismatch.

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

function useStatus(hours: WeekHours | null): Status | null {
  const snap = useSyncExternalStore(
    subscribe,
    () => (hours ? JSON.stringify(storeStatus(hours)) : ""),
    () => "",
  );
  return snap ? (JSON.parse(snap) as Status) : null;
}

/** Compact header version: a dot and a word (plus the time on wider screens). */
export function OpenChip({ hours, showLine = true }: { hours: WeekHours | null; showLine?: boolean }) {
  const s = useStatus(hours);
  const open = s?.open ?? false;
  return (
    <span className="inline-flex flex-col leading-tight" aria-live="polite">
      <span className="inline-flex items-center gap-2 text-sm font-extrabold" style={{ color: "var(--birch)" }}>
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: s ? (open ? "var(--gold)" : "var(--ember)") : "var(--pine-mist)" }}
        />
        {s ? (open ? "Open now" : "Closed") : "Hours"}
      </span>
      {showLine && s?.line ? (
        <span className="text-xs font-semibold" style={{ color: "var(--pine-mist)" }}>
          {s.line}
        </span>
      ) : null}
    </span>
  );
}

/** The sign's changeable-letter panel: OPEN / CLOSED over a red strip with the time. */
export function OpenSign({ hours }: { hours: WeekHours | null }) {
  const s = useStatus(hours);
  const open = s?.open ?? false;
  return (
    <span
      className="inline-flex flex-col overflow-hidden min-w-[13rem]"
      style={{ borderRadius: "0.5rem", background: "var(--birch)" }}
      aria-live="polite"
    >
      <span
        className="heading px-5 pt-3 pb-2 text-[2rem] leading-none"
        style={{ color: s ? (open ? "var(--pine)" : "var(--ember)") : "var(--stone)" }}
      >
        {s ? (open ? "Open" : "Closed") : "· · ·"}
      </span>
      <span aria-hidden="true" className="h-[3px]" style={{ background: "var(--gold)" }} />
      <span className="label px-5 py-2" style={{ background: "var(--ember)", color: "var(--birch)" }}>
        {s?.line || "Today's hours"}
      </span>
    </span>
  );
}
