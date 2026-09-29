"use client";

import { useState } from "react";
import TabNav, { TabItem } from "@/components/molecules/TabNav";
import EncryptionSection from "@/components/organisms/EncryptionSection";
import DecryptionSection from "@/components/organisms/DecryptionSection";
import AttackDemoSection from "@/components/organisms/AttackDemoSection";
import TestCaseSection from "@/components/organisms/TestCaseSection";
import OTPRequirements from "@/components/organisms/OTPRequirements";

const TABS: TabItem[] = [
  { id: "encrypt", label: "Encrypt", code: "01" },
  { id: "decrypt", label: "Decrypt", code: "02" },
  { id: "attack", label: "Attack", code: "03" },
  { id: "verify", label: "Verify", code: "04" },
];

export default function CipherDashboard() {
  const [active, setActive] = useState(TABS[0].id);
  const index = TABS.findIndex((t) => t.id === active);

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-slate-200">
      <header className="border-b border-slate-800 bg-neutral-950 px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-600">Kelompok 3 - Kriptografi dan Keamanan Informasi KOM-A</p>
        <h1 className="font-mono text-lg font-bold text-slate-100">
          XOR Stream Cipher <span className="text-slate-600">/</span> One-Time Pad
        </h1>
      </header>

      <TabNav tabs={TABS} activeId={active} onChange={setActive} />

      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          <div className="h-full w-full flex-shrink-0 overflow-y-auto">
            <EncryptionSection />
          </div>
          <div className="h-full w-full flex-shrink-0 overflow-y-auto">
            <DecryptionSection />
          </div>
          <div className="h-full w-full flex-shrink-0 overflow-y-auto">
            <AttackDemoSection />
          </div>
          <div className="h-full w-full flex-shrink-0 overflow-y-auto p-6">
            <TestCaseSection />
            <OTPRequirements />
          </div>
        </div>
      </div>
    </div>
  );
}