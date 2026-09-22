import { ImageResponse } from "next/og";

/* 1200x630 share image. TODO(Hassan): when the real hero photo (tradie's ute /
   small truck, no plates) is supplied, rebuild this with the photo behind the
   headline. Until then: brand navy with the headline. */

export const alt = "Commercial vehicle finance, sorted. Free assessment — Frontline Financial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A1628",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "160px",
            height: "6px",
            borderRadius: "3px",
            background: "#00FCB8",
            marginBottom: "48px",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", fontSize: "76px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }}>
          <span>Commercial vehicle</span>
          <span style={{ display: "flex" }}>
            finance,&nbsp;<span style={{ color: "#00FCB8" }}>sorted.</span>
          </span>
        </div>
        <div style={{ display: "flex", marginTop: "36px", fontSize: "30px", color: "#94A3B8" }}>
          Free, no obligation assessment against 30+ lenders.
        </div>
        <div style={{ display: "flex", marginTop: "48px", fontSize: "24px", color: "#39B2B2" }}>
          ★ 5.0 on Google · 100+ reviews · Frontline Financial
        </div>
      </div>
    ),
    { ...size }
  );
}
