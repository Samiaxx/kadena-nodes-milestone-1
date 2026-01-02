"use client";

export default function Dashboard({
  view,
  setView,
}: {
  view: "map" | "globe";
  setView: (v: "map" | "globe") => void;
}) {
  return (
    <div className="p-6 bg-gradient-to-b from-[#020617] to-transparent">
      <div className="grid grid-cols-4 gap-6 text-sm mb-4">
        <div>TPS<br /><span className="text-2xl font-bold">25</span></div>
        <div>24h TX<br /><span className="text-2xl font-bold">2,160,000</span></div>
        <div>Block Time<br /><span className="text-2xl font-bold">30s</span></div>
        <div>Active Nodes<br /><span className="text-2xl font-bold">10</span></div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setView("map")}
          className={`px-4 py-1 rounded ${view === "map" ? "bg-white text-black" : "bg-black/30"}`}
        >
          Map
        </button>
        <button
          onClick={() => setView("globe")}
          className={`px-4 py-1 rounded ${view === "globe" ? "bg-white text-black" : "bg-black/30"}`}
        >
          Globe
        </button>
      </div>
    </div>
  );
}
