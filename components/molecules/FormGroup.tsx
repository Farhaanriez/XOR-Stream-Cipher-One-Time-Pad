import { InputHTMLAttributes } from "react";
import Input from "@/components/atoms/Input";

interface FormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  hint?: string;
  hasError?: boolean;
  mono?: boolean;
}

export default function FormGroup({
  label,
  id,
  hint,
  hasError,
  mono,
  ...inputProps
}: FormGroupProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <Input id={id} hasError={hasError} mono={mono} {...inputProps} />
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}