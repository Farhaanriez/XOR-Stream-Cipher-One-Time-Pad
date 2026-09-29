import { ReactNode } from "react";

type AlertVariant = "error" | "success" | "info";

const styles: Record<AlertVariant, { box: string; tag: string }> = {
  error: { box: "border-red-500/30 bg-red-500/5 text-red-300", tag: "[ERROR]" },
  success: { box: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300", tag: "[OK]" },
  info: { box: "border-cyan-500/30 bg-cyan-500/5 text-cyan-300", tag: "[INFO]" },
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
    <div role="alert" className={`rounded-md border p-3 font-mono text-sm ${s.box}`}>
      <p className="font-bold tracking-widest">
        {s.tag} {title}
      </p>
      <div className="mt-1 text-slate-300/90">{children}</div>
    </div>
  );
}