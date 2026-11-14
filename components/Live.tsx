// The parts of the site that show what the owner manages in Pilot Light (hours,
// specials, the breakfast buffet). Each reads the store's database at request
// time inside its own <Suspense> (Cache Components: fresh data streams in), and
// shows its neutral, data-less look until it arrives.

import { Suspense } from "react";
import { getSiteInfo, getSpecials } from "@/lib/db";
import { hoursLines } from "@/lib/time";
import Navigation from "./Navigation";
import HoursBoard from "./HoursBoard";
import SpecialsBoard from "./SpecialsBoard";
import TonightSpecial from "./TonightSpecial";
import { OpenSign } from "./OpenStatus";

async function HeaderWithHours() {
  const { hours } = await getSiteInfo();
  return <Navigation hours={hours} />;
}
export function SiteHeader() {
  return (
    <Suspense fallback={<Navigation hours={null} />}>
      <HeaderWithHours />
    </Suspense>
  );
}

async function OpenSignWithHours() {
  const { hours } = await getSiteInfo();
  return <OpenSign hours={hours} />;
}
export function LiveOpenSign() {
  return (
    <Suspense fallback={<OpenSign hours={null} />}>
      <OpenSignWithHours />
    </Suspense>
  );
}

async function HoursBoardWithHours() {
  const { hours } = await getSiteInfo();
  return <HoursBoard hours={hours} />;
}
export function LiveHoursBoard() {
  return (
    <Suspense fallback={<HoursBoard hours={null} />}>
      <HoursBoardWithHours />
    </Suspense>
  );
}

async function TonightWithSpecials() {
  return <TonightSpecial specials={await getSpecials()} />;
}
export function LiveTonightSpecial() {
  return (
    <Suspense fallback={<TonightSpecial specials={[]} />}>
      <TonightWithSpecials />
    </Suspense>
  );
}

async function BoardWithSpecials() {
  return <SpecialsBoard specials={await getSpecials()} />;
}
export function LiveSpecialsBoard() {
  return (
    <Suspense fallback={<SpecialsBoard specials={[]} />}>
      <BoardWithSpecials />
    </Suspense>
  );
}

async function BuffetText({ part }: { part: "days" | "time" }) {
  const { buffet } = await getSiteInfo();
  return <>{buffet[part]}</>;
}
/** The weekend buffet's days or time, as plain text. */
export function LiveBuffet({ part }: { part: "days" | "time" }) {
  return (
    <Suspense fallback={<>&nbsp;</>}>
      <BuffetText part={part} />
    </Suspense>
  );
}

async function HoursList() {
  const { hours } = await getSiteInfo();
  return (
    <>
      {hoursLines(hours).map((h) => (
        <li key={h.label} className="flex justify-between gap-4">
          <span style={{ color: "var(--pine-mist)" }}>{h.label}</span>
          <span className="font-bold">{h.value}</span>
        </li>
      ))}
    </>
  );
}
/** The footer's hours: one line per run of days with the same hours. */
export function LiveHoursList() {
  return (
    <Suspense fallback={null}>
      <HoursList />
    </Suspense>
  );
}
