import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

// Route segment config + metadata Next wires into <meta og:image> / twitter:image.
export const alt = "Nachhilfe Leon Weimann – Mathe, Informatik und Physik";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Brand social-share card. Mirrors the hero ("Lernen, bis es klick macht.") on
 * the cream/navy/coral palette. The logo is read from /public at build time and
 * inlined as a data URL (Satori can't resolve relative image paths). Uses the
 * built-in font (no network fetch at build).
 */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo-icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#faf6f0",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img
          src={logoSrc}
          width={72}
          height={72}
          style={{ borderRadius: 18 }}
          alt=""
        />
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 700,
            color: "#16293d",
          }}
        >
          Nachhilfe Leon Weimann
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 66,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#16293d",
          }}
        >
          <span>Lernen, bis es&nbsp;</span>
          <span style={{ color: "#ff6a45" }}>klick</span>
          <span>&nbsp;macht.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            color: "#55677a",
          }}
        >
          Mathematik · Informatik · Physik
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 26,
          color: "#55677a",
        }}
      >
        <div style={{ display: "flex" }}>
          30 € · 60 Minuten · online · ohne Mindestlaufzeit
        </div>
        <div style={{ display: "flex", color: "#ff6a45", fontWeight: 700 }}>
          nachhilfe.leonweimann.de
        </div>
      </div>
    </div>,
    { ...size },
  );
}
