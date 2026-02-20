import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FAFAF7",
          color: "#1F2A24",
          fontFamily: "Inter, Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 10%, #F2F4EF 0%, transparent 48%), radial-gradient(circle at 90% 100%, #E3E7DD 0%, transparent 44%)",
          }}
        />
        <div
          style={{
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            padding: "68px 84px",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 28,
                background: "#5A675B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  border: "4px solid #FAFAF7",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
            <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: -1 }}>
              Pacific Naturals
            </div>
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#4B5A52",
              maxWidth: 980,
              lineHeight: 1.3,
            }}
          >
            Science-backed longevity supplements with a clean, premium formulation philosophy.
          </div>
        </div>
      </div>
    ),
    size
  );
}
