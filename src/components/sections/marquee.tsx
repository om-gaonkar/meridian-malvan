const PLACES = [
  "Sindhudurg Fort",
  "Tarkarli beach",
  "Devbag sangam",
  "Malvani cooking",
  "Snorkelling and scuba",
  "The Konkan coast",
];

function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className={`flex shrink-0 items-center ${duplicate ? "marquee-dup" : ""}`}>
      {PLACES.map((place) => (
        <li key={place} className="flex items-center">
          <span className="px-8 font-display text-3xl font-semibold tracking-tight text-white/90 sm:text-5xl">
            {place}
          </span>
          <span className="size-2.5 rounded-full bg-lagoon" />
        </li>
      ))}
    </ul>
  );
}

/** Decorative band of destination names; hidden from assistive technology. */
export function Marquee() {
  return (
    <div aria-hidden="true" className="on-dark mesh-dark overflow-hidden py-9 sm:py-12">
      <div className="marquee">
        <div className="marquee-track">
          <Row />
          <Row duplicate />
        </div>
      </div>
    </div>
  );
}
