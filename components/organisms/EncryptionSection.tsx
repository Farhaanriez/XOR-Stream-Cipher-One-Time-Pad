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
  stringToBytes,
  validateEncrypt,
  xorBytes,
} from "@/utils/crypto";

interface Result {
  keystreamHex: string;
  cipherHex: string;
  steps: XorStep[];
}

export default function EncryptionSection() {
  const [plaintext, setPlaintext] = useState("HELLO WORLD");
  const [key, setKey] = useState("SECRETKEYAB");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const handleEncrypt = () => {
    const v = validateEncrypt(plaintext, key);
    if (!v.valid) {
      setError(v.message ?? "Input tidak valid.");
      setResult(null);
      return;
    }
    setError(null);
    const data = stringToBytes(plaintext);
    const keystream = stringToBytes(key).slice(0, data.length);
    setResult({
      keystreamHex: bytesToHex(keystream),
      cipherHex: bytesToHex(xorBytes(data, keystream)),
      steps: buildSteps(data, keystream),
    });
  };

  return (
    <section id="encrypt" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">🔒 Enkripsi</h2>
      <p className="mt-1 text-sm text-slate-500">Plaintext ⊕ Keystream → Ciphertext (Hex)</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <FormGroup
          id="enc-plaintext"
          label="Plaintext"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          placeholder="Ketik pesan..."
          hasError={!!error}
        />
        <FormGroup
          id="enc-key"
          label="Kunci"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Minimal sepanjang pesan"
          hint={`Panjang kunci: ${key.length} | Panjang pesan: ${plaintext.length}`}
          hasError={!!error}
        />
      </div>

      <div className="mt-4">
        <Button onClick={handleEncrypt}>Enkripsi</Button>
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
            <ResultField label="Ciphertext (Hex)" value={result.cipherHex} tone="accent" />
          </div>
          <StepsTable steps={result.steps} inputLabel="Plaintext" outputLabel="Ciphertext" />
        </div>
      )}
    </section>
  );
}