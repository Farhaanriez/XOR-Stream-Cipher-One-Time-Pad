"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormGroup from "@/components/molecules/FormGroup";
import Alert from "@/components/molecules/Alert";
import ResultField from "@/components/molecules/ResultField";
import StepsTable from "@/components/molecules/StepsTable";
import {
  XorStep,
  buildSteps,
  bytesToHex,
  bytesToString,
  hexToBytes,
  stringToBytes,
  validateDecrypt,
  xorBytes,
} from "@/utils/crypto";

interface Result {
  keystreamHex: string;
  plaintext: string;
  steps: XorStep[];
}

export default function DecryptionSection() {
  const [cipherHex, setCipherHex] = useState("3c3133435747");
  const [key, setKey] = useState("secret");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const handleDecrypt = () => {
    const v = validateDecrypt(cipherHex, key);
    if (!v.valid) {
      setError(v.message ?? "Input tidak valid.");
      setResult(null);
      return;
    }
    setError(null);
    const data = hexToBytes(cipherHex);
    const keystream = stringToBytes(key).slice(0, data.length);
    setResult({
      keystreamHex: bytesToHex(keystream),
      plaintext: bytesToString(xorBytes(data, keystream)),
      steps: buildSteps(data, keystream),
    });
  };

  return (
    <section id="decrypt" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">🔓 Dekripsi</h2>
      <p className="mt-1 text-sm text-slate-500">Ciphertext (Hex) ⊕ Keystream → Plaintext</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <FormGroup
          id="dec-cipher"
          label="Ciphertext (Hex)"
          value={cipherHex}
          onChange={(e) => setCipherHex(e.target.value)}
          placeholder="contoh: 3c3133435747"
          hasError={!!error}
        />
        <FormGroup
          id="dec-key"
          label="Kunci"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          hasError={!!error}
        />
      </div>

      <div className="mt-4">
        <Button variant="secondary" onClick={handleDecrypt}>Dekripsi</Button>
      </div>

      {error && (
        <div className="mt-4">
          <Alert variant="error" title="Validasi gagal">{error}</Alert>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ResultField label="Keystream (Hex)" value={result.keystreamHex} />
            <ResultField label="Plaintext" value={result.plaintext} tone="success" />
          </div>
          <StepsTable steps={result.steps} inputLabel="Ciphertext" outputLabel="Plaintext" />
        </div>
      )}
    </section>
  );
}