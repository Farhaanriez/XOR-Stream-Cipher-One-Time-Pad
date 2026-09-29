export interface TabItem {
  id: string;
  label: string;
  code: string; // penomoran ala terminal, misalnya "01"
}

export default function TabNav({
  tabs,
  activeId,
  onChange,
}: {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <nav className="flex overflow-x-auto border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex-shrink-0 px-5 py-3 font-mono text-xs uppercase tracking-widest transition ${
              active ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className="mr-2 text-slate-600">{tab.code}</span>
            {tab.label}
            {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
          </button>
        );
      })}
    </nav>
  );
}