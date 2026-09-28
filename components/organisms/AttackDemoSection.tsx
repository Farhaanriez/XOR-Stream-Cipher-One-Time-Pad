"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormGroup from "@/components/molecules/FormGroup";
import Alert from "@/components/molecules/Alert";
import ResultField from "@/components/molecules/ResultField";
import {
  bytesToHex,
  bytesToString,
  stringToBytes,
  validateAttack,
  xorBytes,
} from "@/utils/crypto";

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
      // Jika penyerang tahu M1 (crib), M2 terbongkar tanpa kunci
      recovered: bytesToString(xorBytes(c1xc2, b1)),
    });
  };

  return (
    <section id="attack" className="rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">💥 Serangan Key Reuse (Two-Time Pad)</h2>
      <p className="mt-1 text-sm text-slate-500">
        Kunci yang sama dipakai dua kali → kunci &ldquo;hilang&rdquo; saat C1 ⊕ C2, sisanya M1 ⊕ M2.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <FormGroup id="atk-m1" label="Message 1 (M1)" value={m1}
          onChange={(e) => setM1(e.target.value)} hasError={!!error} />
        <FormGroup id="atk-m2" label="Message 2 (M2)" value={m2}
          onChange={(e) => setM2(e.target.value)} hasError={!!error} />
        <FormGroup id="atk-key" label="Kunci (dipakai ulang)" value={key}
          onChange={(e) => setKey(e.target.value)} hasError={!!error} />
      </div>

      <div className="mt-4">
        <Button variant="danger" onClick={handleAttack}>Jalankan Serangan</Button>
      </div>

      {error && (
        <div className="mt-4">
          <Alert variant="error" title="Validasi gagal">{error}</Alert>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ResultField label="C1 = M1 ⊕ K (Hex)" value={result.c1} />
            <ResultField label="C2 = M2 ⊕ K (Hex)" value={result.c2} />
            <ResultField label="C1 ⊕ C2 (Hex)" value={result.c1xc2} tone="accent" />
            <ResultField label="M1 ⊕ M2 (Hex)" value={result.m1xm2} tone="accent" />
          </div>

          <Alert
            variant={result.equal ? "success" : "error"}
            title={result.equal ? "TERBUKTI: C1 ⊕ C2 == M1 ⊕ M2" : "Tidak sama"}
          >
            {result.equal
              ? "Kunci saling menghilangkan. Penyerang bisa menganalisis M1 ⊕ M2 tanpa mengetahui kunci."
              : "Hasil tidak identik (seharusnya tidak terjadi)."}
          </Alert>

          <ResultField
            label="Crib attack: (C1 ⊕ C2) ⊕ M1 → M2 terbongkar"
            value={result.recovered}
            tone="success"
          />
        </div>
      )}
    </section>
  );
}