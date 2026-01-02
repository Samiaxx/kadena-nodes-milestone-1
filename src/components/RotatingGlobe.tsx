"use client";

import { useEffect, useRef } from "react";

export default function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.crossOrigin = "anonymous";
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg";

    let rotation = 0;

    img.onload = () => {
      const draw = () => {
        const size = canvas.width;
        const r = size / 2;

        ctx.clearRect(0, 0, size, size);

        ctx.save();
        ctx.translate(r, r);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(
          img,
          -rotation,
          -r,
          size * 2,
          size
        );

        ctx.restore();

        // Glow
        ctx.beginPath();
        ctx.arc(r, r, r - 2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34,197,94,0.4)";
        ctx.lineWidth = 4;
        ctx.stroke();

        rotation += 0.3;
        requestAnimationFrame(draw);
      };

      draw();
    };
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{
          display: "block",
          margin: "0 auto",
          borderRadius: "50%",
          background: "#020617",
          boxShadow: "0 0 80px rgba(34,197,94,0.25)",
        }}
      />
    </div>
  );
}
