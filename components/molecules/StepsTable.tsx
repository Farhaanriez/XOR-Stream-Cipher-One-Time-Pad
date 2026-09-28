import { XorStep, displayChar, toBinary, toHexByte } from "@/utils/crypto";

interface StepsTableProps {
  steps: XorStep[];
  inputLabel: string;
  outputLabel: string;
}

export default function StepsTable({ steps, inputLabel, outputLabel }: StepsTableProps) {
  const headers = [
    "#",
    inputLabel,
    "Keystream",
    `${inputLabel} (bin)`,
    "Keystream (bin)",
    "XOR (bin)",
    outputLabel,
  ];
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {headers.map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-mono">
          {steps.map((s, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="px-3 py-2 text-slate-400">{i + 1}</td>
              <td className="px-3 py-2">
                {displayChar(s.input)} <span className="text-slate-400">({toHexByte(s.input)})</span>
              </td>
              <td className="px-3 py-2">
                {displayChar(s.key)} <span className="text-slate-400">({toHexByte(s.key)})</span>
              </td>
              <td className="px-3 py-2">{toBinary(s.input)}</td>
              <td className="px-3 py-2">{toBinary(s.key)}</td>
              <td className="px-3 py-2 font-semibold text-indigo-700">{toBinary(s.output)}</td>
              <td className="px-3 py-2 font-semibold">
                {toHexByte(s.output)}{" "}
                <span className="text-slate-400">({displayChar(s.output)})</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}