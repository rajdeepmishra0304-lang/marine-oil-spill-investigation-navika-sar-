import React from 'react';
import { 
  AlertTriangle, 
  Activity, 
  PlusCircle, 
  Satellite, 
  Ship, 
  ArrowRight, 
  ShieldAlert, 
  Compass, 
  Radio, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';

export const Dashboard: React.FC = () => {
  const { allCases, selectCase, setActivePage } = useInvestigation();
  const heroCase = allCases.find(c => c.id === 'IND-0261') || allCases[0];

  return (
    <div className="page-wrapper">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Maritime Oil-Spill Investigation & Attribution Command
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Operational surveillance, satellite SAR anomaly detection, metocean backtracking, and AIS forensic attribution
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setActivePage('new-investigation')}
        >
          <PlusCircle size={16} />
          <span>New Investigation</span>
        </button>
      </div>

      {/* Operational Metrics Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <MetricCard
          label="Active AOI Corridors"
          value="4"
          unit="Sectors"
          subtext="West Coast & Bay of Bengal EEZ"
          icon={<Compass size={18} />}
        />
        <MetricCard
          label="SAR Passes Today"
          value="12"
          unit="Granules"
          subtext="Sentinel-1 & RISAT Overpasses"
          icon={<Satellite size={18} />}
          variant="highlight"
        />
        <MetricCard
          label="Suspected Discharges"
          value="1"
          unit="Active"
          subtext="Case IND-0261 (Arabian Sea)"
          icon={<AlertTriangle size={18} />}
          variant="amber"
        />
        <MetricCard
          label="Unmatched Dark Leads"
          value="1"
          unit="Contact"
          subtext="#SAR-017 under review"
          icon={<Ship size={18} />}
          variant="highlight"
        />
      </div>

      {/* Priority Active Investigation Banner (Hero Case IND-0261) */}
      <div className="card" style={{
        borderLeft: '4px solid var(--accent-amber)',
        backgroundColor: 'var(--bg-card)',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-rose">ACTIVE INCIDENT ALERT</span>
              <span className="mono" style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent-amber)' }}>
                {heroCase.id}
              </span>
              <StatusBadge status={heroCase.status} />
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              {heroCase.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>Region: <strong style={{ color: 'var(--text-primary)' }}>{heroCase.region}</strong></span>
              <span>•</span>
              <span>Coordinates: <span className="mono">{heroCase.aoi.center[0]}°N, {heroCase.aoi.center[1]}°E</span></span>
              <span>•</span>
              <span>Sensor: <strong>{heroCase.sensor.name} ({heroCase.sensor.mode})</strong></span>
            </div>

            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '900px' }}>
              Suspected heavy hydrocarbon slick detected across 18.7 km² area with -6.2 dB radar damping contrast. Lagrangian drift model has backtracked an upstream release window to 08 Sept 06:00–10:00 UTC. 3 AIS candidate merchant vessels correlated, with Vessel A exhibiting 89/100 attribution score.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TOP ATTRIBUTION SCORE</div>
              <div className="mono" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-amber)' }}>
                89 / 100
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => selectCase(heroCase.id)}
              >
                <span>Open Investigation Workflow</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Case Registry Table & Recent Telemetry Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Cases Registry */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="card-header" style={{ padding: '16px 20px', margin: 0 }}>
            <div>
              <div className="card-title">
                <Activity size={16} color="var(--accent-cyan)" />
                <span>Maritime Investigation Registry</span>
              </div>
              <div className="card-subtitle">
                Current and archived satellite-detected spill investigations
              </div>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Region / AOI</th>
                <th>Incident Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {allCases.map(c => (
                <tr key={c.id}>
                  <td className="mono" style={{ fontWeight: 700, color: c.id === 'IND-0261' ? 'var(--accent-amber)' : 'var(--accent-cyan)' }}>
                    {c.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.aoi.name}</div>
                  </td>
                  <td className="mono" style={{ fontSize: '12px' }}>{c.incidentDate}</td>
                  <td>
                    <StatusBadge status={c.priority} size="sm" />
                  </td>
                  <td>
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => selectCase(c.id)}
                    >
                      <span>Inspect</span>
                      <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Operational Realtime Alerts Feed */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Radio size={16} color="var(--accent-cyan)" />
                <span>Surveillance Telemetry Feed</span>
              </div>
              <div className="card-subtitle">Real-time alerts from coastal downlinks</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #EF4444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                <strong style={{ color: '#EF4444' }}>UNMATCHED CONTACT</strong>
                <span className="mono" style={{ color: 'var(--text-muted)' }}>14:28 UTC</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                CFAR radar target #SAR-017 isolated in Arabian Sea sector with zero AIS response.
              </div>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-amber)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                <strong style={{ color: 'var(--accent-amber)' }}>ANOMALY CONFIRMED</strong>
                <span className="mono" style={{ color: 'var(--text-muted)' }}>14:24 UTC</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                Sentinel-1A L1 GRD tile inference completed. 18.7 km² slick segmented.
              </div>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #10B981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                <strong style={{ color: '#10B981' }}>METOCEAN SYNCED</strong>
                <span className="mono" style={{ color: 'var(--text-muted)' }}>14:15 UTC</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                ECMWF ERA5 wind & INCOIS current vectors ingested for Lagrangian backtracking.
              </div>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                <strong style={{ color: 'var(--accent-cyan)' }}>SAR DOWNLINK</strong>
                <span className="mono" style={{ color: 'var(--text-muted)' }}>13:58 UTC</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                Shadnagar Ground Station received Sentinel-1 pass #147. Checksum verified.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
