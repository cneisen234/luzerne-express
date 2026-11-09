// Luzerne Express brand marks.
//
//  • SignPanel — the primary logo: the store's roadside sign distilled into one
//    panel. Wordmark on top, a thin gold seam, then the red sub-panel with
//    "FUEL · GROCERY · CAMP". Built in HTML (sized in em) so it stays crisp and
//    scales from the header to the footer with one `size` prop. `tone="pine"`
//    sits on birch; `tone="birch"` sits on pine.
//  • TrailBadge — the secondary mark: a round badge (red ring, gold seam, jack
//    pine over the Au Sable) for the outdoors side of the business.
//  • PineMark — the badge simplified to its pine, for the favicon and tiny sizes.

type Tone = "pine" | "birch";

export function SignPanel({
  size = 1,
  tone = "pine",
  tagline = true,
  className = "",
}: {
  /** Base size in rem — everything inside scales from it. */
  size?: number;
  tone?: Tone;
  /** Show the "FUEL · GROCERY · CAMP" lettering in the red sub-panel. */
  tagline?: boolean;
  className?: string;
}) {
  const field = tone === "pine" ? "var(--pine)" : "var(--birch)";
  const word = tone === "pine" ? "var(--birch)" : "var(--pine)";
  const express = tone === "pine" ? "var(--gold)" : "var(--ember)";

  return (
    <span
      className={`inline-flex flex-col overflow-hidden ${className}`}
      style={{ fontSize: `${size}rem`, borderRadius: "0.32em", background: field }}
    >
      <span
        style={{
          padding: "0.34em 0.62em 0.3em",
          fontFamily: "var(--font-bree-serif), Georgia, serif",
          fontSize: "1.55em",
          lineHeight: 1,
          color: word,
          whiteSpace: "nowrap",
        }}
      >
        Luzerne <span style={{ color: express }}>Express</span>
      </span>
      <span aria-hidden="true" style={{ height: "0.13em", background: "var(--gold)" }} />
      <span
        aria-hidden={!tagline}
        style={{
          background: "var(--ember)",
          color: "var(--birch)",
          textAlign: "center",
          fontWeight: 800,
          fontSize: "0.48em",
          letterSpacing: "0.32em",
          lineHeight: 1,
          padding: tagline ? "0.7em 0.6em 0.7em 0.92em" : "0.42em 0",
          whiteSpace: "nowrap",
        }}
      >
        {tagline ? "FUEL · GROCERY · CAMP" : null}
      </span>
    </span>
  );
}

// A simple jack pine in a 100×100 box.
const PINE_PATH =
  "M50 16 L61 34 L55 34 L66 52 L59 52 L71 72 L29 72 L41 52 L34 52 L45 34 L39 34 Z";

export function TrailBadge({
  size = 160,
  idPrefix = "lx-badge",
  className = "",
}: {
  size?: number;
  /** Unique per badge on a page (the arc text paths need ids). */
  idPrefix?: string;
  className?: string;
}) {
  const top = `${idPrefix}-top`;
  const bottom = `${idPrefix}-bottom`;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="Luzerne Express badge"
      className={className}
    >
      <defs>
        <path id={top} d="M21 100 A79 79 0 0 1 179 100" />
        <path id={bottom} d="M12 100 A88 88 0 0 0 188 100" />
      </defs>
      <circle cx="100" cy="100" r="97" fill="var(--ember)" />
      <circle cx="100" cy="100" r="69" fill="var(--pine)" />
      <circle cx="100" cy="100" r="70.5" fill="none" stroke="var(--gold)" strokeWidth="3" />
      <text
        fontSize="17"
        letterSpacing="2"
        fill="var(--birch)"
        style={{ fontFamily: "var(--font-bree-serif), Georgia, serif" }}
      >
        <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
          LUZERNE EXPRESS
        </textPath>
      </text>
      <text
        fontSize="11"
        fontWeight="800"
        letterSpacing="3"
        fill="var(--birch)"
        style={{ fontFamily: "var(--font-nunito-sans), sans-serif" }}
      >
        <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">
          FUEL · GROCERY · CAMP
        </textPath>
      </text>
      <path
        d="M100 50 L111 68 L105 68 L117 86 L110 86 L124 108 L76 108 L90 86 L83 86 L95 68 L89 68 Z"
        fill="var(--gold)"
      />
      <rect x="97" y="108" width="6" height="9" fill="var(--gold)" />
      <path
        d="M58 128 Q72 120 86 128 T114 128 T142 128"
        fill="none"
        stroke="var(--birch)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M66 140 Q78 133 90 140 T114 140 T134 140"
        fill="none"
        stroke="var(--birch)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function PineMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="49" fill="var(--ember)" />
      <circle cx="50" cy="50" r="40" fill="var(--pine)" />
      <circle cx="50" cy="50" r="41.5" fill="none" stroke="var(--gold)" strokeWidth="3.5" />
      <path d={PINE_PATH} fill="var(--gold)" />
      <rect x="47" y="72" width="6" height="8" fill="var(--gold)" />
    </svg>
  );
}
