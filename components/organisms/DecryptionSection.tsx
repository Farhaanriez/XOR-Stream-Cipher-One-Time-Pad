"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormGroup from "@/components/molecules/FormGroup";
import Alert from "@/components/molecules/Alert";
import ResultField from "@/components/molecules/ResultField";
import StepsTable from "@/components/molecules/StepsTable";
import {
  XorStep, buildSteps, bytesToHex, bytesToString, hexToBytes, stringToBytes, validateDecrypt, xorBytes,
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
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <header className="border-b border-slate-800 pb-3">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-500">Module 02</p>
        <h2 className="font-mono text-xl font-bold text-slate-100">Decryption Engine</h2>
        <p className="mt-1 font-mono text-xs text-slate-500">Ciphertext (Hex) ⊕ Keystream = Plaintext</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <FormGroup id="dec-cipher" label="Ciphertext (Hex)" value={cipherHex}
          onChange={(e) => setCipherHex(e.target.value)} placeholder="cth: 3c3133435747" hasError={!!error} />
        <FormGroup id="dec-key" label="Key" value={key} onChange={(e) => setKey(e.target.value)} hasError={!!error} />
      </div>

      <Button variant="ghost" onClick={handleDecrypt}>Run Decrypt</Button>

      {error && <Alert variant="error" title="Validation Failed">{error}</Alert>}

      {result && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ResultField label="Keystream (Hex)" value={result.keystreamHex} />
            <ResultField label="Plaintext" value={result.plaintext} tone="success" />
          </div>
          <StepsTable steps={result.steps} inputLabel="Ciphertext" outputLabel="Plaintext" />
        </div>
      )}
    </div>
  );
}