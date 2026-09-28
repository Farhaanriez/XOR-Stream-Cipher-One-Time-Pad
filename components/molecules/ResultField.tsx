export default function ResultField({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "accent" | "success";
}) {
  const tones = {
    default: "border-slate-200 bg-slate-50 text-slate-800",
    accent: "border-indigo-200 bg-indigo-50 text-indigo-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`break-all rounded-lg border px-3 py-2 font-mono text-sm ${tones[tone]}`}>
        {value || "—"}
      </p>
    </div>
  );
}