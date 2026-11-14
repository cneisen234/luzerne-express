// Creates the site's tables (db/schema.sql) and, when they're empty, fills them
// with the store's starting content. Safe to run again: it never overwrites what
// the owner has changed.  npm run db:setup  (reads DATABASE_URL from .env.local)

import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL isn't set (put it in .env.local).");
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);

// The schema, statement by statement (Neon runs one at a time).
const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8")
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .split(/;\s*\n/)
  .map((s) => s.trim())
  .filter(Boolean);
for (const statement of schema) await sql.query(statement);

// ---- Starting content (the store's posted winter hours, specials and menu) ----

const HOURS = {
  0: { open: 7, close: 20 },
  1: { open: 6, close: 20 },
  2: { open: 6, close: 20 },
  3: { open: 6, close: 20 },
  4: { open: 6, close: 20 },
  5: { open: 6, close: 21 },
  6: { open: 7, close: 21 },
};

const SPECIALS = [
  ["sunday", "Broasted chicken dinner", 1399],
  ["monday", "Burger & fries basket", 1099],
  ["tuesday", "Taco night", 999],
  ["wednesday", "Spaghetti & garlic bread", 1099],
  ["thursday", "Barbecue ribs", 1599],
  ["friday", "Friday fish fry", 1499],
  ["saturday", "Large one-topping pizza", 1399],
];

// [section, name, price, large price]
const MENU = [
  ["breakfast", "Two eggs, hash browns & toast", 799],
  ["breakfast", "Biscuits & gravy", 699],
  ["breakfast", "Breakfast sandwich", 499],
  ["breakfast", "Breakfast burrito", 649],
  ["breakfast", "Pancake stack", 699],
  ["grill", "Express burger & fries", 1099],
  ["grill", "Bacon cheeseburger basket", 1199],
  ["grill", "Grilled chicken sandwich", 1049],
  ["grill", "Chicken tenders & fries", 999],
  ["pizza", "Cheese", 1199, 1599],
  ["pizza", "Pepperoni", 1299, 1699],
  ["pizza", "Supreme", 1599, 2099],
  ["pizza", "Meat lover's", 1599, 2099],
  ["subs", "Italian", 949],
  ["subs", "Turkey club", 949],
  ["subs", "Ham & cheese", 899],
  ["subs", "Steak & cheese", 1049],
  ["bakery", "Cinnamon rolls"],
  ["bakery", "Cookies"],
  ["bakery", "Fruit pies"],
  ["bakery", "Muffins"],
];

const count = async (table) => (await sql.query(`select count(*)::int as n from ${table}`))[0].n;

if ((await count("site_settings")) === 0) {
  await sql`insert into site_settings (id, hours, buffet_days, buffet_time) values (1, ${JSON.stringify(HOURS)}::jsonb, 'Sat & Sun', '8 – 11 AM')`;
  console.log("site_settings: filled");
}
if ((await count("nightly_specials")) === 0) {
  for (const [day, name, price] of SPECIALS) await sql`insert into nightly_specials (day, name, price_cents) values (${day}, ${name}, ${price})`;
  console.log(`nightly_specials: ${SPECIALS.length} filled`);
}
if ((await count("menu_items")) === 0) {
  let order = 0;
  for (const [section, name, price = null, large = null] of MENU) {
    await sql`insert into menu_items (section, name, price_cents, large_price_cents, sort_order) values (${section}, ${name}, ${price}, ${large}, ${order++})`;
  }
  console.log(`menu_items: ${MENU.length} filled`);
}
console.log("Database ready.");
