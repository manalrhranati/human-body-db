import React, { useState } from 'react';
import { Activity, Database, Info, Heart, Brain, Wind, Droplet } from 'lucide-react';

const ORGANS_DB = [
  {
    id: 'brain',
    name: 'Gehirn',
    latin: 'Cerebrum',
    system: 'Nervensystem',
    x: 100, y: 35, r: 18,
    color: '#ec4899',
    description: 'Das Steuerungsorgan des Körpers. Es verarbeitet Sinnesreize, steuert Bewegungen und ermöglicht Denken sowie Gedächtnis.',
    sql_query: "SELECT * FROM organs WHERE system = 'Nervensystem';",
    stats: { weight: '1.400 g', cells: '86 Mrd. Neuronen', function: 'Informationsverarbeitung' }
  },
  {
    id: 'lungs',
    name: 'Lunge',
    latin: 'Pulmo',
    system: 'Atmungssystem',
    x: 100, y: 95, r: 22,
    color: '#3b82f6',
    description: 'Nimmt Sauerstoff aus der eingeatmeten Luft auf und gibt Kohlendioxid aus dem Blutkreislauf an die Umwelt ab.',
    sql_query: "SELECT * FROM organs WHERE system = 'Atmungssystem';",
    stats: { weight: '1.000 g', cells: 'Pneumozyten', function: 'Gasaustausch (O2 / CO2)' }
  },
  {
    id: 'heart',
    name: 'Herz',
    latin: 'Cor',
    system: 'Herz-Kreislauf-System',
    x: 108, y: 102, r: 14,
    color: '#ef4444',
    description: 'Ein leistungsstarker Muskel, der kontinuierlich Blut durch den gesamten Körper pumpt, um Nährstoffe zu verteilen.',
    sql_query: "SELECT * FROM vital_signs WHERE organ = 'Herz' AND bpm > 60;",
    stats: { weight: '300 g', cells: 'Kardiomyozyten', function: 'Blutzirkulation' }
  },
  {
    id: 'liver',
    name: 'Leber',
    latin: 'Hepar',
    system: 'Stoffwechselsystem',
    x: 88, y: 130, r: 16,
    color: '#f59e0b',
    description: 'Die zentrale Entgiftungsstation. Sie baut Giftstoffe ab, verarbeitet Nährstoffe und produziert Gallenflüssigkeit.',
    sql_query: "SELECT * FROM organs WHERE function LIKE '%Entgiftung%';",
    stats: { weight: '1.500 g', cells: 'Hepatozyten', function: 'Entgiftung & Stoffwechsel' }
  },
  {
    id: 'stomach',
    name: 'Magen',
    latin: 'Venter',
    system: 'Verdauungssystem',
    x: 112, y: 135, r: 15,
    color: '#10b981',
    description: 'Zersetzt die aufgenommene Nahrung mithilfe von Magensäure und Enzymen in einen verdaulichen Speisebrei.',
    sql_query: "SELECT * FROM organs WHERE system = 'Verdauungssystem';",
    stats: { weight: '150 g', cells: 'Parietalzellen', function: 'Nahrungszersetzung' }
  },
  {
    id: 'kidneys',
    name: 'Nieren',
    latin: 'Renes',
    system: 'Exkretionssystem',
    x: 100, y: 155, r: 14,
    color: '#8b5cf6',
    description: 'Filtern Stoffwechselabfälle und überschüssiges Wasser aus dem Blut und regulieren den Blutdruck.',
    sql_query: "SELECT * FROM organs WHERE system = 'Exkretionssystem';",
    stats: { weight: '300 g (paarig)', cells: 'Nephrone', function: 'Blutfiltration' }
  }
];

export default function App() {
  const [selectedOrgan, setSelectedOrgan] = useState(ORGANS_DB[0]);

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #334155', paddingBottom: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Activity color="#38bdf8" size={32} />
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#38bdf8' }}>Human Corps Visualizer</h1>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8' }}>Klicke auf die Organe im Körper, um die Erklärung und Datenbank-Daten zu sehen.</p>
        </div>
      </header>

      {/* Grid: Links Körper, Rechts Detailansicht */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Interaktiver Körper (SVG) */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
          <h3 style={{ marginTop: 0, color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Interaktives Anatomie-Modell</h3>
          
          <svg viewBox="0 0 200 300" style={{ width: '100%', maxHeight: '420px' }}>
            {/* Körper Silhouette */}
            {/* Kopf */}
            <circle cx="100" cy="35" r="22" fill="#334155" stroke="#475569" strokeWidth="2" />
            {/* Hals */}
            <rect x="94" y="55" width="12" height="15" rx="3" fill="#334155" />
            {/* Torso */}
            <path d="M 65 70 Q 100 65 135 70 L 128 180 Q 100 185 72 180 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
            {/* Arme */}
            <path d="M 65 70 L 45 140" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
            <path d="M 135 70 L 155 140" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
            {/* Beine */}
            <path d="M 80 180 L 75 280" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
            <path d="M 120 180 L 125 280" stroke="#334155" strokeWidth="16" strokeLinecap="round" />

            {/* Anklickbare Organe (Hotspots) */}
            {ORGANS_DB.map((organ) => {
              const isSelected = selectedOrgan.id === organ.id;
              return (
                <g key={organ.id} onClick={() => setSelectedOrgan(organ)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={organ.x}
                    cy={organ.y}
                    r={organ.r}
                    fill={organ.color}
                    opacity={isSelected ? 0.9 : 0.5}
                    stroke={isSelected ? '#ffffff' : 'transparent'}
                    strokeWidth={isSelected ? '2.5' : '0'}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  <text
                    x={organ.x}
                    y={organ.y + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {organ.name[0]}
                  </text>
                </g>
              );
            })}
          </svg>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>Tippe ein Organ an, um es auszuwählen</p>
        </div>

        {/* Rechte Seite: Organ-Details & SQL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Organ-Erklärung Card */}
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: `2px solid ${selectedOrgan.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, color: '#f8fafc' }}>
                {selectedOrgan.name} <span style={{ color: '#94a3b8', fontSize: '0.9em', fontWeight: 'normal' }}>({selectedOrgan.latin})</span>
              </h2>
              <span style={{ backgroundColor: selectedOrgan.color, padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {selectedOrgan.system}
              </span>
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#cbd5e1', marginTop: '16px' }}>
              {selectedOrgan.description}
            </p>

            {/* Datenblatt-Tabelle */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Gewicht</div>
                <div style={{ fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>{selectedOrgan.stats.weight}</div>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Zelltyp</div>
                <div style={{ fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>{selectedOrgan.stats.cells}</div>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hauptaufgabe</div>
                <div style={{ fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>{selectedOrgan.stats.function}</div>
              </div>
            </div>
          </div>

          {/* SQL Datenbank Integration */}
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '10px' }}>
              <Database size={20} />
              <h3 style={{ margin: 0 }}>Simulierte SQL-Abfrage</h3>
            </div>
            <pre style={{ backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', color: '#4ade80', margin: 0, fontFamily: 'monospace' }}>
              <code>{selectedOrgan.sql_query}</code>
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
}