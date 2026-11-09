import fuel from "@/data/fuel.json";

// The price board off the store's pylon sign: a red header strip, a gold seam,
// then the grades in big changeable-letter numbers — tenths in a small "9"
// like every gas sign up north. Prices come from data/fuel.json.

function PumpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 20h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 7h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FuelBoard() {
  return (
    <div className="w-full max-w-sm overflow-hidden" style={{ borderRadius: "0.75rem", background: "var(--birch)" }}>
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: "var(--ember)", color: "var(--birch)" }}>
        <PumpIcon />
        <span className="label">Fuel</span>
      </div>
      <div className="seam" aria-hidden="true" />
      <ul className="px-5 py-2">
        {fuel.grades.map((g, i) => {
          const [dollars, cents] = g.price.toFixed(2).split(".");
          return (
            <li
              key={g.id}
              className="flex items-baseline justify-between py-2.5"
              style={{ borderTop: i ? "1px solid var(--hairline)" : "none" }}
            >
              <span className="label" style={{ color: "var(--bark)", fontSize: "0.8rem" }}>
                {g.name}
              </span>
              <span
                className="heading tabular-nums leading-none"
                style={{ color: "var(--pine)", fontSize: "2rem" }}
                aria-label={`$${g.price.toFixed(2)} and 9 tenths per gallon`}
              >
                {dollars}.{cents}
                <sup className="text-[0.95rem] align-super ml-0.5">9</sup>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="px-5 pb-4 text-sm font-semibold" style={{ color: "var(--ash)" }}>
        {fuel.inside}
      </p>
    </div>
  );
}
