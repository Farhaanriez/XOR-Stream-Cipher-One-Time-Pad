import { XorStep, displayChar, toBinary, toHexByte } from "@/utils/crypto";

interface StepsTableProps {
  steps: XorStep[];
  inputLabel: string;
  outputLabel: string;
}

export default function StepsTable({ steps, inputLabel, outputLabel }: StepsTableProps) {
  const headers = ["#", inputLabel, "Keystream", `${inputLabel} (bin)`, "Keystream (bin)", "XOR (bin)", outputLabel];
  return (
    <div className="overflow-x-auto rounded-md border border-slate-800">
      <table className="min-w-full font-mono text-xs">
        <thead className="bg-slate-900 uppercase tracking-widest text-slate-500">
          <tr>
            {headers.map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {steps.map((s, i) => (
            <tr key={i} className="hover:bg-slate-900/60">
              <td className="px-3 py-2 text-slate-600">{i + 1}</td>
              <td className="px-3 py-2 text-slate-300">
                {displayChar(s.input)} <span className="text-slate-600">({toHexByte(s.input)})</span>
              </td>
              <td className="px-3 py-2 text-slate-300">
                {displayChar(s.key)} <span className="text-slate-600">({toHexByte(s.key)})</span>
              </td>
              <td className="px-3 py-2 text-slate-500">{toBinary(s.input)}</td>
              <td className="px-3 py-2 text-slate-500">{toBinary(s.key)}</td>
              <td className="px-3 py-2 text-cyan-400">{toBinary(s.output)}</td>
              <td className="px-3 py-2 font-bold text-emerald-400">
                {toHexByte(s.output)} <span className="font-normal text-slate-600">({displayChar(s.output)})</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}