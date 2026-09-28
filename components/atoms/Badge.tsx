import { ReactNode } from "react";

type BadgeVariant = "pass" | "fail" | "info" | "neutral";

const styles: Record<BadgeVariant, string> = {
  pass: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  fail: "bg-rose-100 text-rose-700 ring-rose-200",
  info: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  neutral: "bg-slate-100 text-slate-600 ring-slate-200",
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
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide ring-1 ring-inset ${styles[variant]}`}
    >
      {children}
    </span>
  );
}