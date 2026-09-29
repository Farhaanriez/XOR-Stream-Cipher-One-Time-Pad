const RULES = [
  { code: "R1", title: "Truly Random", desc: "Kunci harus berasal dari sumber acak sejati, bukan pola atau PRNG yang dapat ditebak." },
  { code: "R2", title: "As Long as Message", desc: "Panjang kunci minimal sama dengan panjang pesan agar tidak ada bagian yang berulang." },
  { code: "R3", title: "Kept Secret", desc: "Kunci hanya diketahui pengirim dan penerima. Jika bocor, seluruh pesan terbuka." },
  { code: "R4", title: "Never Reused", desc: "Satu kunci untuk satu pesan. Pemakaian ulang menghasilkan Two-Time Pad yang rentan." },
];

export default function OTPRequirements() {
  return (
    <div className="mt-10">
      <div className="border-b border-slate-800 pb-3">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-500">Suite B</p>
        <h3 className="font-mono text-lg font-bold text-slate-100">OTP Requirements (Perfect Secrecy)</h3>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {RULES.map((r) => (
          <div key={r.code} className="rounded-md border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-2 font-mono">
              <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-xs font-bold text-cyan-400 ring-1 ring-inset ring-cyan-500/30">
                {r.code}
              </span>
              <h4 className="font-bold text-slate-100">{r.title}</h4>
            </div>
            <p className="mt-2 font-mono text-xs leading-relaxed text-slate-500">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}