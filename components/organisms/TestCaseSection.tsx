"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { decrypt, encrypt } from "@/utils/crypto";

const TEST_CASES = [
  { name: "Kunci sama panjang", plaintext: "HELLO", key: "KEYKE", expected: "030015070a" },
  { name: "Pesan pendek", plaintext: "Hi", key: "AB", expected: "092b" },
  { name: "Alfanumerik", plaintext: "OTP123", key: "secret", expected: "3c3133435747" },
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
        return {
          actual,
          decrypted,
          pass: actual === t.expected && decrypted === t.plaintext,
        };
      })
    );
  };

  const passed = rows?.filter((r) => r.pass).length ?? 0;

  return (
    <section id="tests" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">🧪 Test Cases</h2>
          <p className="mt-1 text-sm text-slate-500">
            Setiap kasus diuji: enkripsi cocok dengan expected <em>dan</em> dekripsi kembali ke plaintext.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {rows && (
            <Badge variant={passed === TEST_CASES.length ? "pass" : "fail"}>
              {passed}/{TEST_CASES.length} LULUS
            </Badge>
          )}
          <Button onClick={runTests}>Jalankan Test</Button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {["#", "Nama", "Plaintext", "Key", "Expected (Hex)", "Actual (Hex)", "Dekripsi", "Status"].map(
                (h) => (
                  <th key={h} className="whitespace-nowrap px-3 py-2 text-left font-semibold">{h}</th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TEST_CASES.map((t, i) => {
              const r = rows?.[i];
              return (
                <tr key={t.name} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-slate-400">{i + 1}</td>
                  <td className="px-3 py-2 font-medium text-slate-800">{t.name}</td>
                  <td className="px-3 py-2 font-mono">{t.plaintext}</td>
                  <td className="px-3 py-2 font-mono">{t.key}</td>
                  <td className="px-3 py-2 font-mono">{t.expected}</td>
                  <td className="px-3 py-2 font-mono">{r?.actual ?? "—"}</td>
                  <td className="px-3 py-2 font-mono">{r?.decrypted ?? "—"}</td>
                  <td className="px-3 py-2">
                    {r ? (
                      <Badge variant={r.pass ? "pass" : "fail"}>{r.pass ? "PASS" : "FAIL"}</Badge>
                    ) : (
                      <Badge variant="neutral">PENDING</Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}