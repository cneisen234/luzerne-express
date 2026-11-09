import Image from "next/image";

// Small shared pieces every page uses.

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A photo in a plain rounded frame; the frame sets the shape. */
export function Photo({
  src,
  alt,
  className = "",
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

/** The gold seam between sign panels. */
export function Seam() {
  return <div className="seam" aria-hidden="true" />;
}

/** A page's opening band: a photo under the pine tint (same as Home's hero),
 *  a small label, the title, and room for more. */
export function PageHero({
  label,
  title,
  accent,
  photo,
  children,
}: {
  label: string;
  title: string;
  /** Optional second line of the title, in gold. */
  accent?: string;
  /** The page's photo, under the pine tint. */
  photo: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--pine)" }}>
      <Image src={photo} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ background: "rgba(35, 64, 47, 0.8)" }} aria-hidden="true" />
      <div className="container-x relative py-16 md:py-24">
        <span className="label inline-block rounded px-3 py-1.5" style={{ background: "var(--ember)", color: "var(--birch)" }}>
          {label}
        </span>
        <h1 className="mt-6 text-5xl md:text-6xl" style={{ color: "var(--birch)" }}>
          {title}
          {accent ? (
            <>
              <br />
              <span style={{ color: "var(--gold)" }}>{accent}</span>
            </>
          ) : null}
        </h1>
        {children}
      </div>
    </section>
  );
}
