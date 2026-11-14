import { TIME_ZONE } from "@/lib/express";
import type { WeekHours } from "@/lib/db";

// The store's local day + decimal hour, wherever the visitor is.
export function storeNow(date = new Date()): { day: number; dec: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days.indexOf(get("weekday")),
    dec: Number(get("hour")) + Number(get("minute")) / 60,
  };
}

export function to12h(dec: number): string {
  const h = Math.floor(dec);
  const m = Math.round((dec - h) * 60);
  const hour = h % 12 || 12;
  const suffix = h >= 12 ? "PM" : "AM";
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type Status = { open: boolean; line: string };

export function storeStatus(hours: WeekHours, date = new Date()): Status {
  const { day, dec } = storeNow(date);
  const today = hours[day];
  if (today && dec >= today.open && dec < today.close) {
    return { open: true, line: `Till ${to12h(today.close)} tonight` };
  }
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const h = hours[d];
    if (!h) continue;
    if (i === 0 && dec < h.open) return { open: false, line: `Opens at ${to12h(h.open)}` };
    if (i === 1) return { open: false, line: `Opens ${to12h(h.open)} tomorrow` };
    if (i > 1) return { open: false, line: `Opens ${DAY_NAMES[d]} ${to12h(h.open)}` };
  }
  return { open: false, line: "" };
}

/** The week's hours in short lines, Monday first, days with the same hours run together ("Mon – Thu: 6 AM – 8 PM"). */
export function hoursLines(hours: WeekHours): { label: string; value: string }[] {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const value = (d: number) => (hours[d] ? `${to12h(hours[d]!.open)} – ${to12h(hours[d]!.close)}` : "Closed");
  const lines: { label: string; value: string }[] = [];
  for (let i = 0; i < order.length; ) {
    let j = i;
    while (j + 1 < order.length && value(order[j + 1]) === value(order[i])) j++;
    const label = i === j ? DAY_NAMES[order[i]] : `${SHORT[order[i]]} – ${SHORT[order[j]]}`;
    lines.push({ label, value: value(order[i]) });
    i = j + 1;
  }
  return lines;
}
