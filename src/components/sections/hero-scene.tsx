// Deterministic star field (no Math.random, so server and client always agree).
const STARS: ReadonlyArray<readonly [number, number, number]> = [
  [120, 90, 1.6], [260, 200, 1.2], [380, 70, 1.4], [520, 150, 1.8], [640, 60, 1.2],
  [760, 210, 1.5], [900, 100, 1.3], [1040, 60, 1.7], [1160, 180, 1.2], [1280, 90, 1.5],
  [1360, 230, 1.3], [200, 310, 1.1], [470, 290, 1.2], [1100, 300, 1.1], [60, 190, 1.2],
];

const SHIMMER: ReadonlyArray<readonly [number, number, number]> = [
  [652, 642, 4], [700, 664, 0.7], [620, 690, 2.2], [730, 722, 1.4], [680, 752, 3],
];

const WAVE = "T720 0 T1080 0 T1440 0 T1800 0 T2160 0 T2520 0 T2880 0";

/**
 * Animated stand-in for the hero photograph: a sun rising over the Arabian Sea, with
 * drifting waves and shimmer. Replaced automatically once heroImage is set in src/data/media.ts.
 */
export function HeroScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#031a21" />
          <stop offset=".5" stopColor="#0a4a55" />
          <stop offset=".82" stopColor="#c8573a" />
          <stop offset="1" stopColor="#ffb26b" />
        </linearGradient>
        <radialGradient id="hs-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffb26b" stopOpacity=".85" />
          <stop offset="1" stopColor="#ffb26b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a5c66" />
          <stop offset="1" stopColor="#031a21" />
        </linearGradient>
      </defs>

      <rect width="1440" height="620" fill="url(#hs-sky)" />

      {STARS.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill="#fff"
          className="scene-star"
          style={{ animationDelay: `${(i % 7) * 0.5}s` }}
        />
      ))}

      <circle cx="860" cy="620" r="440" fill="url(#hs-glow)" className="scene-glow" style={{ transformOrigin: "860px 620px" }} />
      <path d="M860 0V620" stroke="#fff" strokeOpacity=".22" strokeWidth="1.5" />

      <g className="scene-sun">
        <circle cx="860" cy="620" r="118" fill="#ffb26b" />
        <circle cx="860" cy="620" r="84" fill="#ffe3bd" />
      </g>

      <rect y="620" width="1440" height="280" fill="url(#hs-sea)" />

      {SHIMMER.map(([x, y, delay], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={220 - i * 28}
          height="5"
          rx="2.5"
          fill="#ffb26b"
          className="scene-shimmer"
          style={{ animationDelay: `-${delay}s` }}
        />
      ))}

      <g className="scene-wave" style={{ animationDuration: "30s" }} transform="translate(0 640)">
        <path d={`M0 0 Q180 -30 360 0 ${WAVE} V300 H0 Z`} fill="#0a5c66" fillOpacity=".5" />
      </g>
      <g className="scene-wave" style={{ animationDuration: "22s", animationDirection: "reverse" }} transform="translate(0 700)">
        <path d={`M0 0 Q180 -40 360 0 ${WAVE} V300 H0 Z`} fill="#08404a" fillOpacity=".85" />
      </g>
      <g className="scene-wave" style={{ animationDuration: "15s" }} transform="translate(0 770)">
        <path d={`M0 0 Q180 -34 360 0 ${WAVE} V300 H0 Z`} fill="#031a21" />
      </g>
    </svg>
  );
}
