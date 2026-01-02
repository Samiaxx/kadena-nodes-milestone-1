'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { NODES } from '@/data/nodes';

const ClientMap = dynamic(() => import('@/components/ClientMap'), { ssr: false });
const ClientGlobe = dynamic(() => import('@/components/ClientGlobe'), { ssr: false });

type View = 'map' | 'globe';
type Theme = 'light' | 'dark';

export default function Page() {
  const [view, setView] = useState<View>('map');
  const [theme, setTheme] = useState<Theme>('dark');
  const [region, setRegion] = useState('ALL');
  const [type, setType] = useState('ALL');

  const dark = theme === 'dark';

  const filteredNodes = useMemo(() => {
    return NODES.filter((n) => {
      const regionMatch = region === 'ALL' || n.region === region;
      const typeMatch = type === 'ALL' || n.type === type;
      return regionMatch && typeMatch;
    });
  }, [region, type]);

  return (
    <main
      className={`min-h-screen transition-colors ${
        dark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* ================= HEADER ================= */}
      <header
        className={`sticky top-0 z-20 border-b backdrop-blur ${
          dark
            ? 'border-slate-800 bg-slate-950/90'
            : 'border-slate-200 bg-white/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Kadena Nodes
          </h1>

          {/* ===== STATS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat dark={dark} title="Current TPS" value="0" />
            <Stat dark={dark} title="24h Transactions" value="0" />
            <Stat dark={dark} title="Avg Block Time" value="1.5s" />
            <Stat dark={dark} title="Active Nodes" value={filteredNodes.length} />
          </div>

          {/* ===== CONTROLS ===== */}
          <div className="flex flex-wrap gap-3 items-center">
            <Tab dark={dark} active={view === 'map'} onClick={() => setView('map')}>
              Map
            </Tab>
            <Tab dark={dark} active={view === 'globe'} onClick={() => setView('globe')}>
              Globe
            </Tab>

            <button
              onClick={() => setTheme(dark ? 'light' : 'dark')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                dark
                  ? 'bg-slate-800 hover:bg-slate-700'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
            >
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>

            <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass(dark)}>
              <option value="ALL">All Regions</option>
              <option value="NA">North America</option>
              <option value="EU">Europe</option>
              <option value="AS">Asia</option>
              <option value="AF">Africa</option>
              <option value="SA">South America</option>
              <option value="OC">Oceania</option>
            </select>

            <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass(dark)}>
              <option value="ALL">All Types</option>
              <option value="validator">Validator</option>
              <option value="full">Full Node</option>
            </select>
          </div>
        </div>
      </header>

      {/* ================= MAP / GLOBE ================= */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div
          className={`h-[70vh] rounded-2xl overflow-hidden border shadow-xl ${
            dark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          {view === 'map' ? (
            <ClientMap nodes={filteredNodes} theme={theme} />
          ) : (
            <ClientGlobe nodes={filteredNodes} theme={theme} />
          )}
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Stat({
  title,
  value,
  dark,
}: {
  title: string;
  value: any;
  dark: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border transition ${
        dark
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-3xl font-bold mt-1 text-emerald-400">
        {value}
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
  dark,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dark: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
        active
          ? 'bg-emerald-500 text-black'
          : dark
          ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
      }`}
    >
      {children}
    </button>
  );
}

function selectClass(dark: boolean) {
  return `px-3 py-2 rounded-lg text-sm border transition ${
    dark
      ? 'bg-slate-900 border-slate-700 text-slate-100'
      : 'bg-white border-slate-300 text-slate-900'
  }`;
}
