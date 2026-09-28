import { ReactNode } from "react";

type AlertVariant = "error" | "success" | "info" | "warning";

const styles: Record<AlertVariant, { box: string; icon: string }> = {
  error: { box: "border-rose-200 bg-rose-50 text-rose-800", icon: "⛔" },
  success: { box: "border-emerald-200 bg-emerald-50 text-emerald-800", icon: "✅" },
  info: { box: "border-indigo-200 bg-indigo-50 text-indigo-800", icon: "ℹ️" },
  warning: { box: "border-amber-200 bg-amber-50 text-amber-800", icon: "⚠️" },
};

export default function Alert({
  variant = "error",
  title,
  children,
}: {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[variant];
  return (
    <div role="alert" className={`flex gap-3 rounded-lg border p-3 text-sm ${s.box}`}>
      <span aria-hidden>{s.icon}</span>
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}