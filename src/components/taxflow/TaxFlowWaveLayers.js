/* Multi-layer wave divider: three translucent crests in the brand aqua, teal
   and blue stacked over the section colour below. `from` paints behind the
   waves (the section above), `to` is the front wave's fill (the section
   below). Same geometry family as WaveDivider, so it sits alongside the
   single waves elsewhere on the page. */
export default function TaxFlowWaveLayers({ from = "#0A1628", to = "#0A1628" }) {
  return (
    <div aria-hidden className="relative w-full overflow-hidden leading-none" style={{ background: from }}>
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-20 w-full min-w-[1440px] md:h-28 lg:h-32"
      >
        {/* back: aqua haze */}
        <path
          d="M0 62C160 22 340 18 520 54C700 90 880 112 1060 78C1240 44 1340 34 1440 52V140H0Z"
          fill="#00FCB8"
          fillOpacity="0.16"
        />
        {/* middle: teal */}
        <path
          d="M0 92C220 128 470 44 720 70C970 96 1200 132 1440 82V140H0Z"
          fill="#39B2B2"
          fillOpacity="0.55"
        />
        {/* front-mid: brand blue */}
        <path
          d="M0 108C240 64 480 138 720 104C960 70 1200 74 1440 112V140H0Z"
          fill="#1C5472"
        />
        {/* glowing crest line on the blue wave */}
        <path
          d="M0 108C240 64 480 138 720 104C960 70 1200 74 1440 112"
          fill="none"
          stroke="#00FCB8"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        {/* front: section colour below */}
        <path
          d="M0 126C240 100 480 146 720 124C960 102 1200 108 1440 128V140H0Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
