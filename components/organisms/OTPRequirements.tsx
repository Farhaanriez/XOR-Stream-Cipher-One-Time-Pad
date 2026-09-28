const RULES = [
  {
    icon: "🎲",
    title: "Truly Random",
    desc: "Kunci harus dihasilkan dari sumber acak sejati, bukan pola atau PRNG yang dapat ditebak.",
  },
  {
    icon: "📏",
    title: "As Long as Message",
    desc: "Panjang kunci minimal sama dengan panjang pesan agar tidak ada bagian pesan yang berulang.",
  },
  {
    icon: "🤫",
    title: "Kept Secret",
    desc: "Kunci hanya diketahui pengirim dan penerima. Jika bocor, seluruh pesan terbuka.",
  },
  {
    icon: "🚫",
    title: "Never Reused",
    desc: "Satu kunci untuk satu pesan saja. Pemakaian ulang menghasilkan Two-Time Pad yang rentan.",
  },
];

export default function OTPRequirements() {
  return (
    <section id="otp" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">📜 4 Syarat One-Time Pad</h2>
      <p className="mt-1 text-sm text-slate-500">
        OTP aman secara teoritis (perfect secrecy) hanya jika keempat syarat terpenuhi.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {RULES.map((r, i) => (
          <div
            key={r.title}
            className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden>{r.icon}</span>
              <h3 className="font-bold text-slate-900">
                {i + 1}. {r.title}
              </h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}