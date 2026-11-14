-- Luzerne Express: the site content Pilot Light manages (CMS add-on).
-- Hours and the breakfast buffet (one row), the nightly specials, and the menu.
-- Applied by `npm run db:setup` (scripts/db-setup.mjs), one statement at a time.
-- Money is in whole cents. Hours are Pilot Light's week_hours shape: keys "0"-"6"
-- (Sunday = 0), each null (closed) or { "open": <decimal hour>, "close": <decimal hour> }.

DO $$ BEGIN CREATE TYPE weekday AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE menu_section AS ENUM ('breakfast', 'grill', 'pizza', 'subs', 'bakery'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hours jsonb NOT NULL,
  buffet_days text NOT NULL,
  buffet_time text NOT NULL
);

CREATE TABLE IF NOT EXISTS nightly_specials (
  id serial PRIMARY KEY,
  day weekday NOT NULL UNIQUE,
  name text NOT NULL,
  price_cents integer NOT NULL CHECK (price_cents >= 0)
);

CREATE TABLE IF NOT EXISTS menu_items (
  id serial PRIMARY KEY,
  section menu_section NOT NULL,
  name text NOT NULL,
  price_cents integer CHECK (price_cents >= 0),
  large_price_cents integer CHECK (large_price_cents >= 0),
  sort_order integer NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true
);
