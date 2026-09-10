import React from 'react';
import { 
  Compass, 
  PlusCircle, 
  Satellite, 
  AlertTriangle, 
  Wind, 
  Ship, 
  FileText, 
  Activity, 
  ShieldCheck,
  ChevronRight,
  Database
} from 'lucide-react';
import { useInvestigation, NavigationPage } from '../../context/InvestigationContext';
import { StatusBadge } from '../common/StatusBadge';

export const Sidebar: React.FC = () => {
  const { activeCase, activePage, setActivePage } = useInvestigation();

  const navItems: Array<{ id: NavigationPage; label: string; icon: React.ReactNode; group?: string }> = [
    { id: 'dashboard', label: 'Command Dashboard', icon: <Activity size={18} /> },
    { id: 'new-investigation', label: 'New Investigation', icon: <PlusCircle size={18} /> },
    
    // Investigation Chain
    { id: 'processing', label: '1. SAR Processing', icon: <Satellite size={18} />, group: 'Active Investigation' },
    { id: 'spill-detection', label: '2. Spill Detection', icon: <AlertTriangle size={18} />, group: 'Active Investigation' },
    { id: 'incident-analysis', label: '3. Drift & Origin', icon: <Wind size={18} />, group: 'Active Investigation' },
    { id: 'vessel-attribution', label: '4. Vessel Attribution', icon: <Ship size={18} />, group: 'Active Investigation' },
    { id: 'report', label: '5. Investigation Dossier', icon: <FileText size={18} />, group: 'Active Investigation' },
  ];

  return (
    <aside className="app-sidebar" style={{
      width: '280px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
      userSelect: 'none'
    }}>
      {/* Platform Branding */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '6px',
          backgroundColor: '#0284C7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: '0 0 15px rgba(2, 132, 199, 0.4)'
        }}>
          <Compass size={22} />
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.04em', color: '#F1F5F9' }}>
            NAVIKA-SAR
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Maritime Forensic Platform
          </div>
        </div>
      </div>

      {/* Active Case Pill */}
      <div style={{
        padding: '14px 18px',
        margin: '14px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            Active Case
          </span>
          <StatusBadge status={activeCase.status} size="sm" />
        </div>
        <div className="mono" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {activeCase.id}
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 400 }}>
            ({activeCase.region.split(' ')[0]})
          </span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {activeCase.title}
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 10px', fontWeight: 600 }}>
          Surveillance & Command
        </div>
        {navItems.filter(i => !i.group).map(item => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                textAlign: 'left',
                cursor: 'pointer',
                marginBottom: '4px',
                transition: 'all 0.12s'
              }}
            >
              <span style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {isActive && <ChevronRight size={14} />}
            </button>
          );
        })}

        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '16px 10px 8px', fontWeight: 600 }}>
          Investigation Chain
        </div>
        {navItems.filter(i => i.group === 'Active Investigation').map(item => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                textAlign: 'left',
                cursor: 'pointer',
                marginBottom: '4px',
                transition: 'all 0.12s'
              }}
            >
              <span style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {isActive && <ChevronRight size={14} />}
            </button>
          );
        })}
      </nav>

      {/* Authority Identity Footer */}
      <div style={{
        padding: '14px 18px',
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-card-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10B981'
        }}>
          <ShieldCheck size={18} />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            MESIA / INCOIS-ICG
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            CDR R. K. Sharma (Forensic)
          </div>
        </div>
      </div>
    </aside>
  );
};
