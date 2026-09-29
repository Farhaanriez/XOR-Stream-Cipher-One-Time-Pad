"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormGroup from "@/components/molecules/FormGroup";
import Alert from "@/components/molecules/Alert";
import ResultField from "@/components/molecules/ResultField";
import { bytesToHex, bytesToString, stringToBytes, validateAttack, xorBytes } from "@/utils/crypto";

interface Result {
  c1: string;
  c2: string;
  c1xc2: string;
  m1xm2: string;
  equal: boolean;
  recovered: string;
}

export default function AttackDemoSection() {
  const [m1, setM1] = useState("ATTACK AT DAWN");
  const [m2, setM2] = useState("RETREAT AT ONE");
  const [key, setKey] = useState("SECRETKEY123XY");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const handleAttack = () => {
    const v = validateAttack(m1, m2, key);
    if (!v.valid) {
      setError(v.message ?? "Input tidak valid.");
      setResult(null);
      return;
    }
    setError(null);
    const b1 = stringToBytes(m1);
    const b2 = stringToBytes(m2);
    const k = stringToBytes(key);
    const c1 = xorBytes(b1, k);
    const c2 = xorBytes(b2, k);
    const c1xc2 = xorBytes(c1, c2);
    const m1xm2 = xorBytes(b1, b2);
    setResult({
      c1: bytesToHex(c1),
      c2: bytesToHex(c2),
      c1xc2: bytesToHex(c1xc2),
      m1xm2: bytesToHex(m1xm2),
      equal: bytesToHex(c1xc2) === bytesToHex(m1xm2),
      recovered: bytesToString(xorBytes(c1xc2, b1)),
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <header className="border-b border-slate-800 pb-3">
        <p className="font-mono text-xs uppercase tracking-widest text-red-500">Module 03</p>
        <h2 className="font-mono text-xl font-bold text-slate-100">Key-Reuse Exploit (Two-Time Pad)</h2>
        <p className="mt-1 font-mono text-xs text-slate-500">
          C1 ⊕ C2 = M1 ⊕ M2 — kunci saling menghilangkan saat dipakai ulang.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <FormGroup id="atk-m1" label="Message 1" value={m1} onChange={(e) => setM1(e.target.value)} hasError={!!error} />
        <FormGroup id="atk-m2" label="Message 2" value={m2} onChange={(e) => setM2(e.target.value)} hasError={!!error} />
        <FormGroup id="atk-key" label="Reused Key" value={key} onChange={(e) => setKey(e.target.value)} hasError={!!error} />
      </div>

      <Button variant="danger" onClick={handleAttack}>Run Exploit</Button>

      {error && <Alert variant="error" title="Validation Failed">{error}</Alert>}

      {result && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ResultField label="C1 = M1 ⊕ K" value={result.c1} />
            <ResultField label="C2 = M2 ⊕ K" value={result.c2} />
            <ResultField label="C1 ⊕ C2" value={result.c1xc2} tone="accent" />
            <ResultField label="M1 ⊕ M2" value={result.m1xm2} tone="accent" />
          </div>

          <Alert variant={result.equal ? "success" : "error"} title={result.equal ? "Proven: C1 ⊕ C2 == M1 ⊕ M2" : "Mismatch"}>
            {result.equal
              ? "Kunci berhasil dihilangkan tanpa diketahui. Penyerang bisa menganalisis M1 ⊕ M2 secara statistik (crib-dragging)."
              : "Hasil tidak identik — seharusnya tidak terjadi jika kunci benar sama."}
          </Alert>

          <ResultField label="Crib attack: (C1 ⊕ C2) ⊕ M1 → M2 terbongkar" value={result.recovered} tone="success" />
        </div>
      )}
    </div>
  );
}