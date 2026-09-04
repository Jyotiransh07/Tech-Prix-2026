import Image from "next/image";

export default function Sponsors() {
  return (
    <section
      style={{
        padding: "64px 24px",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "64px",
          flexWrap: "wrap",
        }}
      >
        <Image
          src="/logos/BINA.jpeg"
          alt="BINA"
          width={300}
          height={150}
          style={{
            objectFit: "contain",
            opacity: 0.85,
            borderRadius: "8px",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1)"; }}
        />
        <Image
          src="/logos/PrePark.jpeg"
          alt="PrePark"
          width={300}
          height={150}
          style={{
            objectFit: "contain",
            opacity: 0.85,
            borderRadius: "8px",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1)"; }}
        />
      </div>
    </section>
  );
}
