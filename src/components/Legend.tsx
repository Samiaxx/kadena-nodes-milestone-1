"use client";

export default function Legend() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "#0f172a",
        padding: "10px 12px",
        borderRadius: 8,
        fontSize: 12,
      }}
    >
      <div>
        <span style={{ color: "#22c55e" }}>●</span> Online Node
      </div>
      <div>
        <span style={{ color: "#ef4444" }}>●</span> Offline Node
      </div>
    </div>
  );
}
