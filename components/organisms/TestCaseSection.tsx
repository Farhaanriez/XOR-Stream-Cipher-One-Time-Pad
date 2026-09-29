"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { decrypt, encrypt } from "@/utils/crypto";

const TEST_CASES = [
  { name: "Equal-length key", plaintext: "HELLO", key: "KEYKE", expected: "030015070a" },
  { name: "Short message", plaintext: "Hi", key: "AB", expected: "092b" },
  { name: "Alphanumeric", plaintext: "OTP123", key: "secret", expected: "3c3133435747" },
];

interface Row {
  actual: string;
  decrypted: string;
  pass: boolean;
}

export default function TestCaseSection() {
  const [rows, setRows] = useState<Row[] | null>(null);

  const runTests = () => {
    setRows(
      TEST_CASES.map((t) => {
        const actual = encrypt(t.plaintext, t.key);
        const decrypted = decrypt(actual, t.key);
        return { actual, decrypted, pass: actual === t.expected && decrypted === t.plaintext };
      })
    );
  };

  const passed = rows?.filter((r) => r.pass).length ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-500">Suite A</p>
          <h3 className="font-mono text-lg font-bold text-slate-100">Test Cases</h3>
        </div>
        <div className="flex items-center gap-3">
          {rows && <Badge variant={passed === TEST_CASES.length ? "pass" : "fail"}>{passed}/{TEST_CASES.length} PASSED</Badge>}
          <Button size="sm" onClick={runTests}>Run Tests</Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-md border border-slate-800">
        <table className="min-w-full font-mono text-xs">
          <thead className="bg-slate-900 uppercase tracking-widest text-slate-500">
            <tr>
              {["#", "Name", "Plaintext", "Key", "Expected", "Actual", "Decrypted", "Status"].map((h) => (
                <th key={h} className="whitespace-nowrap px-3 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {TEST_CASES.map((t, i) => {
              const r = rows?.[i];
              return (
                <tr key={t.name} className="hover:bg-slate-900/60">
                  <td className="px-3 py-2 text-slate-600">{i + 1}</td>
                  <td className="px-3 py-2 text-slate-300">{t.name}</td>
                  <td className="px-3 py-2 text-slate-400">{t.plaintext}</td>
                  <td className="px-3 py-2 text-slate-400">{t.key}</td>
                  <td className="px-3 py-2 text-slate-400">{t.expected}</td>
                  <td className="px-3 py-2 text-slate-400">{r?.actual ?? "—"}</td>
                  <td className="px-3 py-2 text-slate-400">{r?.decrypted ?? "—"}</td>
                  <td className="px-3 py-2">
                    {r ? <Badge variant={r.pass ? "pass" : "fail"}>{r.pass ? "PASS" : "FAIL"}</Badge> : <Badge variant="neutral">PENDING</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}