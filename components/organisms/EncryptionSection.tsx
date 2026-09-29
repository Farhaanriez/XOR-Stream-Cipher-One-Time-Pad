"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormGroup from "@/components/molecules/FormGroup";
import Alert from "@/components/molecules/Alert";
import ResultField from "@/components/molecules/ResultField";
import StepsTable from "@/components/molecules/StepsTable";
import { XorStep, buildSteps, bytesToHex, stringToBytes, validateEncrypt, xorBytes } from "@/utils/crypto";

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
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <header className="border-b border-slate-800 pb-3">
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-500">Module 01</p>
        <h2 className="font-mono text-xl font-bold text-slate-100">Encryption Engine</h2>
        <p className="mt-1 font-mono text-xs text-slate-500">Plaintext ⊕ Keystream = Ciphertext (Hex)</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <FormGroup id="enc-plaintext" label="Plaintext" value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)} placeholder="Ketik pesan..." hasError={!!error} />
        <FormGroup id="enc-key" label="Key" value={key} onChange={(e) => setKey(e.target.value)}
          placeholder="Minimal sepanjang pesan"
          hint={`key_len=${key.length}  msg_len=${plaintext.length}`} hasError={!!error} />
      </div>

      <Button onClick={handleEncrypt}>Run Encrypt</Button>

      {error && <Alert variant="error" title="Validation Failed">{error}</Alert>}

      {result && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ResultField label="Keystream (Hex)" value={result.keystreamHex} />
            <ResultField label="Ciphertext (Hex)" value={result.cipherHex} tone="accent" />
          </div>
          <StepsTable steps={result.steps} inputLabel="Plaintext" outputLabel="Ciphertext" />
        </div>
      )}
    </div>
  );
}