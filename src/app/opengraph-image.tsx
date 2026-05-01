import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "МонгоКарт — Монголын №1 party карт тоглоом";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1a1625 0%, #2d1b4e 50%, #1a1625 100%)",
          color: "white",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            background: "rgba(236,72,153,0.15)",
            border: "2px solid rgba(236,72,153,0.4)",
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 24,
            fontWeight: 700,
            color: "#f9a8d4",
            marginBottom: 32,
          }}
        >
          ✨ Монголын №1 party тоглоом
        </div>

        <div
          style={{
            fontSize: 160,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: -4,
            display: "flex",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #ec4899, #f59e0b)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Монго
          </span>
          <span style={{ color: "#fafafa" }}>Карт</span>
        </div>

        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.75)",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Найзуудтайгаа тоглох карт тоглоомын цуглуулга — үнэгүй, бүртгэлгүй,
          шууд утсан дээрээ.
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 56,
            fontSize: 56,
          }}
        >
          <span>🎭</span>
          <span>🍺</span>
          <span>✋</span>
          <span>🤔</span>
          <span>🔥</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          mongocard.mn
        </div>
      </div>
    ),
    { ...size },
  );
}
