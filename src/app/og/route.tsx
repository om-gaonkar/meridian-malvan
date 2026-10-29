import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "58px 76px",
        background:
          "linear-gradient(120deg, #031a21 0%, #062a31 58%, #0a454b 100%)",
        color: "#f7f2e8",
        fontFamily: "sans-serif",
      }}
    >
      {/* Decorative ocean-inspired shapes */}
      <div
        style={{
          position: "absolute",
          right: -115,
          top: -235,
          width: 590,
          height: 590,
          borderRadius: "50%",
          border: "1px solid rgba(159,232,221,0.22)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -45,
          top: -165,
          width: 450,
          height: 450,
          borderRadius: "50%",
          border: "1px solid rgba(159,232,221,0.16)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 85,
          top: -70,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(3,26,33,0))",
          display: "flex",
        }}
      />

      {/* Brand mark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            border: "1px solid #c9ad7a",
            borderRadius: 27,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e2c89a",
            fontSize: 21,
            letterSpacing: -2,
          }}
        >
          MM
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: 5,
              color: "#f7f2e8",
            }}
          >
            MERIDIAN
          </div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 5,
              color: "#c9ad7a",
            }}
          >
            MALVAN
          </div>
        </div>

        <div
          style={{
            marginLeft: "auto",
            border: "1px solid rgba(201,173,122,0.55)",
            borderRadius: 30,
            padding: "10px 17px",
            color: "#e2c89a",
            fontSize: 12,
            letterSpacing: 2,
          }}
        >
          KONKAN COAST
        </div>
      </div>

      {/* Main editorial typography */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#9fe8dd",
            fontSize: 13,
            letterSpacing: 4,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 30,
              height: 1,
              background: "#c9ad7a",
              display: "flex",
            }}
          />
          A COASTAL ESCAPE
        </div>

        <div
          style={{
            fontSize: 76,
            lineHeight: 1.08,
            letterSpacing: -3,
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 23,
            lineHeight: 1.4,
            color: "#c4d9d5",
            maxWidth: 760,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>

      {/* Minimal footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(159,232,221,0.22)",
          paddingTop: 20,
          color: "#b9cbc7",
          fontSize: 14,
          letterSpacing: 1,
        }}
      >
        <div>Malvan, Maharashtra, India</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#e2c89a",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              background: "#c9ad7a",
              display: "flex",
            }}
          />
          YOUR COASTAL RETREAT
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
