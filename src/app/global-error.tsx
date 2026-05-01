"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="mn">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#1a1625",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Чухал алдаа
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>
            Аппликейшнд гэнэтийн алдаа гарлаа. Хуудсыг дахин ачаалахыг хичээнэ
            үү.
          </p>
          {error.digest ? (
            <p
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.5rem",
                fontFamily: "monospace",
              }}
            >
              Ref: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#ec4899",
              color: "white",
              border: "none",
              padding: "0.875rem 2rem",
              borderRadius: "1rem",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Дахин оролдох
          </button>
        </div>
      </body>
    </html>
  );
}
