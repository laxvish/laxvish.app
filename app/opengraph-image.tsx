import { ImageResponse } from "next/og";

export const alt = "Laxvish — an AI operating system for Indian enterprises";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (AGENTS.md §1) — bound as constants so the image cannot drift
// from the design contract.
const OBSIDIAN = "#FAFAFA";
const VAULT_AMBER = "#EAEAEA";
const CHARCOAL = "#111111";
const NEON_CYAN = "#666666";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: OBSIDIAN,
          // Matches the 24px dot grain in app/globals.css.
          backgroundImage: `radial-gradient(${VAULT_AMBER} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      >
        {/* Overline */}
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.28em",
            color: NEON_CYAN,
          }}
        >
          LAXVISH THREAD
        </div>

        {/* Wordmark + structural thread rule */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: CHARCOAL,
              lineHeight: 1,
            }}
          >
            LAXVISH
          </div>

          {/* The "thread": a single hairline running the full measure. */}
          <div
            style={{
              display: "flex",
              height: 2,
              width: "100%",
              backgroundColor: CHARCOAL,
              marginTop: 40,
            }}
          />

          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 34,
              letterSpacing: "-0.01em",
              color: CHARCOAL,
            }}
          >
            An AI operating system for Indian enterprises.
          </div>
        </div>

        {/* Footer metadata */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.18em",
            color: NEON_CYAN,
          }}
        >
          <div>WORKERS · BRAIN · BRAKES</div>
          <div>LAXVISH.APP</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
