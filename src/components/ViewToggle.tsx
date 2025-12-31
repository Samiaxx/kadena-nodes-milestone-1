"use client";

type Props = {
  view: "map" | "globe";
  onChange: (v: "map" | "globe") => void;
};

export default function ViewToggle({ view, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("map")}
        className={`px-3 py-1 rounded ${
          view === "map" ? "bg-blue-600" : "bg-slate-700"
        }`}
      >
        Map
      </button>

      <button
        onClick={() => onChange("globe")}
        className={`px-3 py-1 rounded ${
          view === "globe" ? "bg-blue-600" : "bg-slate-700"
        }`}
      >
        Globe
      </button>
    </div>
  );
}
