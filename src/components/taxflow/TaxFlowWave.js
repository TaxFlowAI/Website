import WaveDivider from "@/components/WaveDivider";

/* The Frontline Financial wave, on TaxFlowAI's dark palette.
   `from` is the colour of the section above (painted behind the wave),
   `to` is the colour of the section below (the wave's fill). */
export default function TaxFlowWave({ from = "#0A1628", to = "#060D1A" }) {
  return (
    <div aria-hidden style={{ background: from }}>
      <WaveDivider fill={to} />
    </div>
  );
}
