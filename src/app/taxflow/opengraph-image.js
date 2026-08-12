import { ImageResponse } from "next/og";

/* Branded 1200x630 share image for all /taxflow routes.
   Dark navy, TaxFlowAI wordmark, tagline, the current as a gradient line. */

export const alt = "TaxFlowAI — Australia's AI-powered tax portal";
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
            background: "linear-gradient(90deg, #39B2B2, #00FCB8)",
            marginBottom: "48px",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", fontSize: "88px", fontWeight: 700 }}>
          <span style={{ color: "#FFFFFF" }}>TaxFlow</span>
          <span style={{ color: "#00FCB8" }}>AI</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "36px",
            color: "#94A3B8",
          }}
        >
          Your tax, under control.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "56px",
            fontSize: "24px",
            color: "#64748B",
          }}
        >
          Snap receipts · Track ATO deadlines · Work with Registered Tax Agents · Free to sign up
        </div>
      </div>
    ),
    { ...size }
  );
}
