// Line icons for the store's departments. Stroke follows currentColor.

type P = { size?: number };
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ProduceIcon = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M12 7c-3-2-8-1-8 5 0 5 3 9 6 9 1 0 1.5-.5 2-.5s1 .5 2 .5c3 0 6-4 6-9 0-6-5-7-8-5Z" />
    <path d="M12 7c0-2 1-4 3-4" />
  </svg>
);

export const DairyIcon = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M8 3h8v3l2 3v12H6V9l2-3V3Z" />
    <path d="M6 9h12" />
    <path d="M10 14h4" />
  </svg>
);

export const FrozenIcon = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M12 2v20M4 7l16 10M20 7 4 17" />
    <path d="m9 4 3 2 3-2M9 20l3-2 3 2" />
  </svg>
);

export const PantryIcon = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <ellipse cx="12" cy="5" rx="6" ry="2" />
    <path d="M6 5v14c0 1.1 2.7 2 6 2s6-.9 6-2V5" />
    <path d="M6 10c0 1.1 2.7 2 6 2s6-.9 6-2" />
  </svg>
);

export const TentIcon = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M3 20 12 4l9 16H3Z" />
    <path d="M9 20l3-6 3 6" />
  </svg>
);

export const WrenchIcon = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M14.5 5.5a4 4 0 0 0 5 5L12 18a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 1-2-2Z" />
    <path d="M5 21 3 19" />
  </svg>
);

export const ShowerIcon = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M4 20V8a4 4 0 0 1 8 0" />
    <path d="M9 8h6" />
    <path d="M10 12v1M13 12v1M16 12v1M11 16v1M14 16v1M12 20v1M15 20v1" />
  </svg>
);

export const WasherIcon = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <circle cx="12" cy="13" r="4.5" />
    <path d="M7 6h2" />
  </svg>
);

/** A big bare footprint — a nod to the Sasquatch shirts. */
export const FootprintIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.5 9.5c2.7-.6 5.6.8 6 4.5.4 3.5-1 7.6-4.5 7.9-3 .3-4.1-2.4-4-5 .1-2.4-.9-6.7 2.5-7.4Z" />
    <circle cx="7.6" cy="6.6" r="1.6" />
    <circle cx="10.6" cy="4.9" r="1.4" />
    <circle cx="13.6" cy="4.7" r="1.25" />
    <circle cx="16.2" cy="5.9" r="1.1" />
    <circle cx="18" cy="8.1" r="1" />
  </svg>
);
