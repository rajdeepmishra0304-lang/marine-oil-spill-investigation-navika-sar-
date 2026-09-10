import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Clock, 
  MapPin, 
  Satellite, 
  FolderOpen,
  ChevronDown
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const TopBar: React.FC = () => {
  const { activeCase, allCases, selectCase } = useInvestigation();
  const [showCaseMenu, setShowCaseMenu] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="topbar" style={{
      height: '56px',
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      zIndex: 10
    }}>
      {/* Left Area: Active Case Selector & Coordinates */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowCaseMenu(!showCaseMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-card-muted)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <FolderOpen size={15} color="var(--accent-cyan)" />
            <span>Case: {activeCase.id}</span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {showCaseMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              width: '320px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100,
              padding: '6px'
            }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', padding: '6px 8px', fontWeight: 600 }}>
                Select Incident Case
              </div>
              {allCases.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    selectCase(c.id);
                    setShowCaseMenu(false);
                  }}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    backgroundColor: c.id === activeCase.id ? 'var(--bg-card-hover)' : 'transparent',
                    marginBottom: '2px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontWeight: 600, color: c.id === activeCase.id ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                      {c.id}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.incidentDate}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {c.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <MapPin size={14} color="var(--accent-amber)" />
          <span className="mono">
            {activeCase.aoi.name} ({activeCase.aoi.center[0]}°N, {activeCase.aoi.center[1]}°E)
          </span>
        </div>
      </div>

      {/* Right Area: Sensor Metadata & Realtime Sync */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <Satellite size={15} color="var(--accent-cyan)" />
          <span>{activeCase.sensor.name}</span>
          <span style={{ color: 'var(--text-muted)' }}>({activeCase.sensor.mode})</span>
        </div>

        <div style={{ height: '16px', width: '1px', backgroundColor: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-primary)' }}>
          <Clock size={14} color="var(--text-muted)" />
          <span className="mono" style={{ fontWeight: 500 }}>{utcTime}</span>
        </div>

        <div style={{ height: '16px', width: '1px', backgroundColor: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#10B981' }}>
          <Radio size={13} className="animate-pulse" />
          <span style={{ fontWeight: 600, letterSpacing: '0.04em' }}>TELEMETRY ONLINE</span>
        </div>
      </div>
    </header>
  );
};
