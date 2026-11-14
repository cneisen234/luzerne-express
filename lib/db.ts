// The site content the owner manages in Pilot Light (CMS): hours, the breakfast
// buffet, the nightly specials and the menu, read from the store's own database
// (db/schema.sql). Read fresh on each request, never cached, so a change saved in
// Pilot Light shows on the next page load. Server-side only; once per request
// (React `cache`), however many components ask.

import { cache } from "react";
import { connection } from "next/server";
import { neon } from "@neondatabase/serverless";

export type DayHours = { open: number; close: number } | null;
/** 0 = Sunday … 6 = Saturday; open/close in decimal hours, Luzerne (Eastern) time. */
export type WeekHours = Record<number, DayHours>;
export type Special = { day: number; name: string; price: string };
export type MenuItem = { name: string; price: string | null };
export type MenuSection = "breakfast" | "grill" | "pizza" | "subs" | "bakery";

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const db = () => {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL isn't set.");
  return neon(process.env.DATABASE_URL);
};

const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

/** Hours and the weekend breakfast buffet. */
export const getSiteInfo = cache(async (): Promise<{ hours: WeekHours; buffet: { days: string; time: string } }> => {
  await connection();
  const [row] = await db()`select hours, buffet_days, buffet_time from site_settings where id = 1`;
  return { hours: (row?.hours ?? {}) as WeekHours, buffet: { days: row?.buffet_days ?? "", time: row?.buffet_time ?? "" } };
});

/** One special per night of the week. */
export const getSpecials = cache(async (): Promise<Special[]> => {
  await connection();
  const rows = await db()`select day, name, price_cents from nightly_specials`;
  return rows.map((r) => ({ day: DAYS.indexOf(r.day), name: r.name, price: dollars(r.price_cents) }));
});

/** The menu's available items by section, in their order. Two sizes read "$11.99 / $15.99". */
export const getMenu = cache(async (): Promise<Record<MenuSection, MenuItem[]>> => {
  await connection();
  const rows = await db()`select section, name, price_cents, large_price_cents from menu_items where available order by sort_order, id`;
  const menu: Record<MenuSection, MenuItem[]> = { breakfast: [], grill: [], pizza: [], subs: [], bakery: [] };
  for (const r of rows) {
    const price = r.price_cents == null ? null : r.large_price_cents == null ? dollars(r.price_cents) : `${dollars(r.price_cents)} / ${dollars(r.large_price_cents)}`;
    menu[r.section as MenuSection]?.push({ name: r.name, price });
  }
  return menu;
});
