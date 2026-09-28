import EncryptionSection from "@/components/organisms/EncryptionSection";
import DecryptionSection from "@/components/organisms/DecryptionSection";
import AttackDemoSection from "@/components/organisms/AttackDemoSection";
import TestCaseSection from "@/components/organisms/TestCaseSection";
import OTPRequirements from "@/components/organisms/OTPRequirements";

const NAV = [
  ["#encrypt", "Enkripsi"],
  ["#decrypt", "Dekripsi"],
  ["#attack", "Serangan"],
  ["#tests", "Test Cases"],
  ["#otp", "Syarat OTP"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-gradient-to-r from-indigo-700 to-violet-700 text-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
            Demo Kelompok 3 - Kriptografi dan Keamanan Informasi KOM-A
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            XOR Stream Cipher &amp; One-Time Pad
          </h1>
          <p className="mt-2 max-w-2xl text-indigo-100">
            Visualisasi enkripsi, dekripsi, dan serangan key reuse (Two-Time Pad) secara interaktif.
          </p>
          <nav className="mt-5 flex flex-wrap gap-2">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium hover:bg-white/25"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <EncryptionSection />
        <DecryptionSection />
        <AttackDemoSection />
        <TestCaseSection />
        <OTPRequirements />
      </div>

      <footer className="pb-8 text-center text-xs text-slate-500">
        Untuk keperluan tugas. Jangan gunakan XOR sederhana untuk data nyata ya guys.
      </footer>
    </main>
  );
}