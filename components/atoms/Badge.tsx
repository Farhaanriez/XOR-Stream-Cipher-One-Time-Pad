import { ReactNode } from "react";

type BadgeVariant = "pass" | "fail" | "info" | "neutral";

const styles: Record<BadgeVariant, string> = {
  pass: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  fail: "bg-red-500/10 text-red-400 ring-red-500/30",
  info: "bg-cyan-500/10 text-cyan-400 ring-cyan-500/30",
  neutral: "bg-slate-800 text-slate-400 ring-slate-700",
};

export default function Badge({
  variant = "neutral",
  children,
}: {
  variant?: BadgeVariant;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest ring-1 ring-inset ${styles[variant]}`}
    >
      {children}
    </span>
  );
}