import React, { useState } from 'react';

const ORGANS_DB = [
  {
    id: 'brain',
    name: 'Gehirn',
    latin: 'Cerebrum',
    system: 'Nervensystem',
    x: 100, y: 35, r: 16,
    color: '#ec4899',
    description: 'Zentrale Steuereinheit des Körpers. Verarbeitet Sinnesreize, steuert Bewegungen und ermöglicht Bewusstsein und Gedächtnis.',
    stats: { weight: '1.400 g', cells: '86 Mrd. Neuronen', function: 'Signalverarbeitung' }
  },
  {
    id: 'thyroid',
    name: 'Schilddrüse',
    latin: 'Glandula thyroidea',
    system: 'Hormonsystem',
    x: 100, y: 65, r: 9,
    color: '#a855f7',
    description: 'Produziert wichtige Hormone (T3 & T4), die den gesamten Energieumsatz und Stoffwechsel steuern.',
    stats: { weight: '25 g', cells: 'Follikelzellen', function: 'Hormonregulation' }
  },
  {
    id: 'lungs',
    name: 'Lunge',
    latin: 'Pulmo',
    system: 'Atmungssystem',
    x: 100, y: 95, r: 20,
    color: '#3b82f6',
    description: 'Sorgt für den kontinuierlichen Gasaustausch: nimmt Sauerstoff auf und scheidet Kohlendioxid aus.',
    stats: { weight: '1.000 g', cells: 'Pneumozyten', function: 'Gasaustausch' }
  },
  {
    id: 'heart',
    name: 'Herz',
    latin: 'Cor',
    system: 'Herz-Kreislauf',
    x: 108, y: 102, r: 14,
    color: '#ef4444',
    description: 'Hohlorgan und Pumpe des Blutkreislaufs. Befördert Sauerstoff und Nährstoffe durch das Adernnetzwerk.',
    stats: { weight: '300 g', cells: 'Kardiomyozyten', function: 'Blutzirkulation' }
  },
  {
    id: 'liver',
    name: 'Leber',
    latin: 'Hepar',
    system: 'Stoffwechsel',
    x: 88, y: 130, r: 15,
    color: '#f59e0b',
    description: 'Größte Stoffwechseldrüse des Körpers. Speichert Energie, filtert Giftstoffe und produziert Galle.',
    stats: { weight: '1.500 g', cells: 'Hepatozyten', function: 'Entgiftung & Galle' }
  },
  {
    id: 'stomach',
    name: 'Magen',
    latin: 'Venter',
    system: 'Verdauungssystem',
    x: 112, y: 135, r: 14,
    color: '#10b981',
    description: 'Verdaut die Nahrung durch Magensäure und Enzyme vor und leitet sie in den Darm weiter.',
    stats: { weight: '150 g', cells: 'Parietalzellen', function: 'Nahrungszersetzung' }
  },
  {
    id: 'pancreas',
    name: 'Bauchspeicheldrüse',
    latin: 'Pancreas',
    system: 'Hormonsystem',
    x: 102, y: 142, r: 10,
    color: '#eab308',
    description: 'Produziert verdauungsfördernde Enzyme sowie die Hormone Insulin und Glukagon zur Blutzuckerregulation.',
    stats: { weight: '80 g', cells: 'Langerhans-Inseln', function: 'Insulinproduktion' }
  },
  {
    id: 'kidneys',
    name: 'Nieren',
    latin: 'Renes',
    system: 'Exkretionssystem',
    x: 100, y: 155, r: 13,
    color: '#8b5cf6',
    description: 'Filtern kontinuierlich das Blut, scheiden Stoffwechselendprodukte aus und steuern den Wasserhaushalt.',
    stats: { weight: '300 g', cells: 'Nephrone', function: 'Blutfiltration' }
  },
  {
    id: 'intestines',
    name: 'Darm',
    latin: 'Intestinum',
    system: 'Verdauungssystem',
    x: 100, y: 172, r: 16,
    color: '#06b6d4',
    description: 'Nimmt Nährstoffe und Wasser auf und schützt das Immunsystem über das Mikrobiom.',
    stats: { weight: '2.000 g', cells: 'Enterozyten', function: 'Nährstoffaufnahme' }
  }
];

export default function App() {
  const [selectedOrgan, setSelectedOrgan] = useState(ORGANS_DB[0]);
  const [selectedSystem, setSelectedSystem] = useState('ALL');
  const [showVessels, setShowVessels] = useState(true);

  const filteredOrgans = selectedSystem === 'ALL' 
    ? ORGANS_DB 
    : ORGANS_DB.filter(o => o.system === selectedSystem);

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        borderRadius: '16px',
        padding: '20px 24px',
        marginBottom: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '12px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            🫀
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 style={{
              margin: 0,
              fontSize: '1.75rem',
              fontWeight: '800',
              background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              Human Corps Visualizer
            </h1>
            <span style={{
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              letterSpacing: '0.5px'
            }}>
              PRO DEMO
            </span>
          </div>
        </div>

        <button 
          onClick={() => setShowVessels(!showVessels)}
          style={{
            backgroundColor: showVessels ? 'rgba(239, 68, 68, 0.2)' : '#334155',
            color: showVessels ? '#fca5a5' : '#94a3b8',
            border: showVessels ? '1px solid #ef4444' : '1px solid #475569',
            padding: '10px 18px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>{showVessels ? '🩸' : '⚪'}</span>
          {showVessels ? 'Adern verbergen' : 'Adern einblenden'}
        </button>
      </header>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        
        {/* Linke Seite: Körper Modell */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
          
          <div style={{ marginBottom: '16px', textAlign: 'left' }}>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Filter nach System:</label>
            <select 
              value={selectedSystem} 
              onChange={(e) => setSelectedSystem(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #475569' }}
            >
              <option value="ALL">Alle Körpersysteme</option>
              <option value="Nervensystem">Nervensystem</option>
              <option value="Herz-Kreislauf">Herz-Kreislauf</option>
              <option value="Atmungssystem">Atmungssystem</option>
              <option value="Stoffwechsel">Stoffwechsel</option>
              <option value="Verdauungssystem">Verdauungssystem</option>
              <option value="Hormonsystem">Hormonsystem</option>
              <option value="Exkretionssystem">Exkretionssystem</option>
            </select>
          </div>

          <svg viewBox="0 0 200 300" style={{ width: '100%', maxHeight: '430px' }}>
            <circle cx="100" cy="35" r="22" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <rect x="94" y="55" width="12" height="15" rx="3" fill="#1e293b" stroke="#475569" />
            <path d="M 65 70 Q 100 65 135 70 L 128 180 Q 100 185 72 180 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <path d="M 65 70 L 45 140" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
            <path d="M 135 70 L 155 140" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
            <path d="M 80 180 L 75 280" stroke="#475569" strokeWidth="14" strokeLinecap="round" />
            <path d="M 120 180 L 125 280" stroke="#475569" strokeWidth="14" strokeLinecap="round" />

            {showVessels && (
              <g opacity="0.6">
                <path d="M 108 102 C 108 70, 95 65, 95 40" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                <path d="M 108 102 L 105 180 M 105 180 L 80 270 M 105 180 L 123 270" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                <path d="M 108 102 L 50 135 M 108 102 L 150 135" stroke="#ef4444" strokeWidth="2" fill="none" />

                <path d="M 100 38 L 100 102" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="3,2" />
                <path d="M 100 102 L 98 180 M 98 180 L 72 270 M 98 180 L 118 270" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="3,2" />
                <path d="M 100 102 L 44 135 M 100 102 L 154 135" stroke="#3b82f6" strokeWidth="1.8" fill="none" strokeDasharray="3,2" />
              </g>
            )}

            {filteredOrgans.map((organ) => {
              const isSelected = selectedOrgan.id === organ.id;
              return (
                <g key={organ.id} onClick={() => setSelectedOrgan(organ)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={organ.x}
                    cy={organ.y}
                    r={organ.r}
                    fill={organ.color}
                    opacity={isSelected ? 1 : 0.75}
                    stroke={isSelected ? '#ffffff' : '#0f172a'}
                    strokeWidth={isSelected ? '3' : '1.5'}
                  />
                  <text
                    x={organ.x}
                    y={organ.y + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {organ.name[0]}
                  </text>
                </g>
              );
            })}
          </svg>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>Klicke auf ein Organ zum Auswählen</p>
        </div>

        {/* Rechte Seite: Organ Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: `6px solid ${selectedOrgan.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>
                {selectedOrgan.name} <span style={{ color: '#94a3b8', fontSize: '0.8em' }}>({selectedOrgan.latin})</span>
              </h2>
              <span style={{ backgroundColor: selectedOrgan.color, padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {selectedOrgan.system}
              </span>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#cbd5e1', marginTop: '16px' }}>
              {selectedOrgan.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Durchschnittsgewicht</div>
                <div style={{ fontWeight: 'bold', color: '#38bdf8', marginTop: '6px', fontSize: '1.1rem' }}>{selectedOrgan.stats.weight}</div>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Zelltyp / Struktur</div>
                <div style={{ fontWeight: 'bold', color: '#38bdf8', marginTop: '6px', fontSize: '1.1rem' }}>{selectedOrgan.stats.cells}</div>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hauptfunktion</div>
                <div style={{ fontWeight: 'bold', color: '#38bdf8', marginTop: '6px', fontSize: '1.1rem' }}>{selectedOrgan.stats.function}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}