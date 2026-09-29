import { InputHTMLAttributes } from "react";
import Input from "@/components/atoms/Input";

interface FormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  hint?: string;
  hasError?: boolean;
}

export default function FormGroup({ label, id, hint, hasError, ...inputProps }: FormGroupProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block font-mono text-xs uppercase tracking-widest text-slate-500">
        {label}
      </label>
      <Input id={id} hasError={hasError} {...inputProps} />
      {hint && <p className="font-mono text-[11px] text-slate-600">{hint}</p>}
    </div>
  );
}