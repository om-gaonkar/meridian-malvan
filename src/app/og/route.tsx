import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Brand card used for Open Graph and Twitter/X. Swap for a real photograph in /public/images
// (and point createMetadata at it) once licensed photography is available.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #031a21 0%, #062c36 45%, #0a5c66 100%)",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 340 }}>
          <div style={{ display: "flex", width: 180, height: 90, overflow: "hidden", marginLeft: 80 }}>
            <div style={{ width: 180, height: 180, borderRadius: 90, background: "#ffb26b" }} />
          </div>
          <div style={{ display: "flex", width: 340, height: 3, background: "#2dd4bf" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 100, letterSpacing: -3, fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 38, marginTop: 14, color: "#9fe8dd" }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
