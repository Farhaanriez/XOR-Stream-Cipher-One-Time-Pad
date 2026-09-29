import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export default function Input({ hasError = false, className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md border bg-slate-950 px-3 py-2 font-mono text-sm text-emerald-300 caret-emerald-400 outline-none transition placeholder:text-slate-600 focus:ring-2 ${
        hasError
          ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/20"
          : "border-slate-700 focus:border-emerald-500/60 focus:ring-emerald-500/20"
      } ${className}`}
      {...props}
    />
  );
}