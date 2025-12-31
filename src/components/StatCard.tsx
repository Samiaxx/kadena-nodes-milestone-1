"use client";

type StatCardProps = {
  title: string;
  value?: number | string | null;
};

export default function StatCard({ title, value }: StatCardProps) {
  const displayValue =
    typeof value === "number"
      ? value.toLocaleString()
      : value ?? "—";

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-1 text-xl font-bold text-white">
        {displayValue}
      </p>
    </div>
  );
}
