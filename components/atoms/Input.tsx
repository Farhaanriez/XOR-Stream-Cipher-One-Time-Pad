import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  mono?: boolean;
}

export default function Input({
  hasError = false,
  mono = true,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
        mono ? "font-mono" : ""
      } ${
        hasError
          ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
          : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
      } ${className}`}
      {...props}
    />
  );
}