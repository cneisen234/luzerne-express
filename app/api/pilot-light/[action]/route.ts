import { pilotLightRoute } from "@/lib/pilot-light";

// Answers Pilot Light's signed calls (Pilot Light's docs/site-module.md). One
// entry per site action declared with `npm run site:actions`; `ping` is built in.
// The site has no site actions yet: Pilot Light edits its hours, specials and
// menu straight in its database.
export const POST = pilotLightRoute({});
