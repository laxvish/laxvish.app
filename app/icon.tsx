import { ImageResponse } from "next/og";

export const alt = "Laxvish";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

const OBSIDIAN = "#FAFAFA";
const CHARCOAL = "#111111";
const NEON_CYAN = "#666666";

/**
 * Favicon / PWA icon and the Organization JSON-LD `logo` target.
 * Served by Next at /icon.png. The mark is the "thread": a hairline crossing a
 * solid field, with a single node — industrial, monochrome, no glyph clichés.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: OBSIDIAN,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 340,
            height: 6,
            backgroundColor: CHARCOAL,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 54,
              height: 54,
              backgroundColor: CHARCOAL,
              marginLeft: 143,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 64,
            fontSize: 46,
            letterSpacing: "0.22em",
            color: NEON_CYAN,
          }}
        >
          L
        </div>
      </div>
    ),
    { ...size },
  );
}
