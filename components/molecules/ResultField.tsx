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
    default: "border-slate-800 bg-slate-950 text-slate-300",
    accent: "border-cyan-500/30 bg-cyan-500/5 text-cyan-300",
    success: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
  };
  return (
    <div>
      <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-slate-600">{label}</p>
      <p className={`break-all rounded-md border px-3 py-2 font-mono text-sm ${tones[tone]}`}>
        {value || "—"}
      </p>
    </div>
  );
}