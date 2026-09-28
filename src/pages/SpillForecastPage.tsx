import React, { useState } from 'react';
import { useInvestigation } from '../context/InvestigationContext';
import { investigationService } from '../services/mockInvestigationService';
import { WorkflowBreadcrumb } from '../components/investigation/WorkflowBreadcrumb';
import { MaritimeMap } from '../components/maps/MaritimeMap';
import { MetricCard } from '../components/common/MetricCard';
import {
  Wind,
  Clock,
  ArrowRight,
  Map,
  Zap,
  TrendingUp,
  ShieldAlert,
  Activity,
} from 'lucide-react';

const horizonColors = {
  6:  { label: 'T+6h',  color: '#10B981', bg: 'rgba(16,185,129,0.10)' },
  12: { label: 'T+12h', color: '#38BDF8', bg: 'rgba(56,189,248,0.10)' },
  24: { label: 'T+24h', color: '#F59E0B', bg: 'rgba(245,158,11,0.10)' },
  48: { label: 'T+48h', color: '#EF4444', bg: 'rgba(239,68,68,0.10)'  },
} as const;

const riskColors = {
  critical: { border: '#EF4444', bg: 'rgba(239,68,68,0.10)',   badge: 'badge-rose'  },
  high:     { border: '#F59E0B', bg: 'rgba(245,158,11,0.10)',  badge: 'badge-amber' },
  moderate: { border: '#38BDF8', bg: 'rgba(56,189,248,0.10)',  badge: 'badge-cyan'  },
} as const;

export const SpillForecastPage: React.FC = () => {
  const { activeCase, setActivePage } = useInvestigation();
  const spill    = investigationService.getSpillData(activeCase.id);
  const metocean = investigationService.getMetoceanData(activeCase.id);
  const forecast = investigationService.getForecastData(activeCase.id);

  const [activeHorizon, setActiveHorizon] = useState<6 | 12 | 24 | 48>(24);

  const activeZones    = forecast.zones.filter(z => z.timestepHours === activeHorizon);
  const highZone       = activeZones.find(z => z.tier === 'high');
  const lowZone        = activeZones.find(z => z.tier === 'low');
  const activeParticle = forecast.particles.find(p => p.timestepHours === activeHorizon);

  return (
    <div className="page-wrapper">
      <WorkflowBreadcrumb />

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-emerald">FORECAST ACTIVE</span>
            <span className="badge badge-cyan">LAGRANGIAN ENSEMBLE — 100 PARTICLES</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Oil Spill Spread Forecast &amp; Environmental Impact Projection
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Forward Lagrangian ensemble trajectory — probabilistic spread zones at T+6h, T+12h, T+24h, T+48h from detection
          </p>
        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={() => setActivePage('vessel-attribution')}
        >
          <span>Correlate AIS Trajectories</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Horizon Selector Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {([6, 12, 24, 48] as const).map(h => {
          const hc = horizonColors[h];
          const isActive = activeHorizon === h;
          const particle = forecast.particles.find(p => p.timestepHours === h);
          return (
            <button
              key={h}
              onClick={() => setActiveHorizon(h)}
              style={{
                flex: 1,
                padding: '14px 16px',
                backgroundColor: isActive ? hc.bg : 'var(--bg-card)',
                border: `1.5px solid ${isActive ? hc.color : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.18s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: '13px', fontWeight: 700, color: isActive ? hc.color : 'var(--text-primary)' }}>
                  {hc.label}
                </span>
                {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: hc.color }} />}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {particle?.timestamp.split('(')[1]?.replace(')', '') ?? ''}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 600 }}>
                {particle?.probabilityPercent}% confidence &middot; &plusmn;{particle?.spreadRadiusKm} km spread
              </div>
            </button>
          );
        })}
      </div>

      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <MetricCard
          label="Forecast Centroid (ENE Drift)"
          value={`${activeParticle?.lat.toFixed(3) ?? '\u2014'}\u00b0N`}
          unit={`${activeParticle?.lng.toFixed(3) ?? '\u2014'}\u00b0E`}
          subtext={`At T+${activeHorizon}h from detection`}
          icon={<Map size={18} />}
          variant="highlight"
        />
        <MetricCard
          label="High-Probability Spread"
          value={highZone ? `${highZone.probabilityPercent}%` : '\u2014'}
          unit={`r = ${highZone?.radiusKm} km`}
          subtext={`${highZone?.areaKm2.toLocaleString()} km\u00b2 coverage`}
          icon={<Activity size={18} />}
          variant="emerald"
        />
        <MetricCard
          label="Total Slick Coverage (Low P)"
          value={lowZone ? `${lowZone.areaKm2.toLocaleString()}` : '\u2014'}
          unit="km\u00b2"
          subtext="Outer 15\u201340% probability contour"
          icon={<TrendingUp size={18} />}
          variant="amber"
        />
        <MetricCard
          label="Ensemble Drift Velocity"
          value="1.18"
          unit="kts"
          subtext={`Direction: ${forecast.dominantDriftDirection}`}
          icon={<Wind size={18} />}
        />
      </div>

      {/* Main Map + Probability Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Map with Forecast Layers ON */}
        <div>
          <MaritimeMap
            spill={spill}
            metocean={metocean}
            forecast={forecast}
            showBacktrack={false}
            showVessels={false}
            showContacts={false}
            showForecast={true}
            height="560px"
          />
        </div>

        {/* Right Panel: Probability Breakdown + Hazards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Probability Tier Breakdown */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '13px' }}>
                <Activity size={15} color="var(--accent-emerald)" />
                <span>Probability Contour Breakdown &mdash; T+{activeHorizon}h</span>
              </div>
              <span className="badge badge-emerald mono">Ensemble P-Zones</span>
            </div>

            {activeZones.map(zone => {
              const colors = zone.tier === 'high'
                ? { color: '#10B981', bg: 'rgba(16,185,129,0.10)', border: '#10B981' }
                : zone.tier === 'medium'
                ? { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: '#F59E0B' }
                : { color: '#38BDF8', bg: 'rgba(56,189,248,0.07)', border: '#38BDF8' };

              const tierLabel = zone.tier === 'high' ? '\u226570% (High)' : zone.tier === 'medium' ? '40\u201370% (Medium)' : '15\u201340% (Low)';

              return (
                <div
                  key={zone.id}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: colors.bg,
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: `3px solid ${colors.border}`,
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: colors.color }}>{tierLabel}</span>
                    <span className="mono" style={{ fontSize: '13px', fontWeight: 800, color: colors.color }}>
                      {zone.probabilityPercent}%
                    </span>
                  </div>
                  {/* Probability bar */}
                  <div style={{ height: '5px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', marginBottom: '8px' }}>
                    <div style={{ height: '100%', width: `${zone.probabilityPercent}%`, backgroundColor: colors.color, borderRadius: '3px', transition: 'width 0.4s ease' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase' }}>Radius</div>
                      <div className="mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{zone.radiusKm} km</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase' }}>Area</div>
                      <div className="mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{zone.areaKm2.toLocaleString()} km\u00b2</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Environmental Hazards at Risk */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '13px' }}>
                <ShieldAlert size={15} color="#EF4444" />
                <span>Environmental Assets at Risk</span>
              </div>
              <span className="badge badge-rose">4 Zones Affected</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {forecast.environmentalHazards.map((hazard, idx) => {
                const rc = riskColors[hazard.risk];
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: rc.bg,
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: `3px solid ${rc.border}`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                          {hazard.label}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{hazard.distance}</div>
                      </div>
                      <span className={`badge ${rc.badge}`} style={{ fontSize: '10px', marginLeft: '8px', flexShrink: 0 }}>
                        {hazard.risk.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: 'rgba(239,68,68,0.06)', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--text-secondary)', borderLeft: '3px solid rgba(239,68,68,0.4)' }}>
              <strong>Estimated T+48h Footprint:</strong> {forecast.estimatedTotalAreaKm2At48h.toLocaleString()} km\u00b2 (outer 15% probability envelope). Immediate maritime contamination alert recommended for KHANDERI island biosphere zone.
            </div>
          </div>
        </div>
      </div>

      {/* Horizon Timeline Table */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <div className="card-title" style={{ fontSize: '13px' }}>
            <Clock size={15} color="var(--accent-cyan)" />
            <span>Forward Lagrangian Particle Trajectory &mdash; All Horizons</span>
          </div>
          <span className="badge badge-cyan mono">INCOIS-OPENDRIFT Ensemble</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-medium)' }}>
                {['Horizon', 'Timestamp', 'Centroid Lat', 'Centroid Lng', 'Ensemble Probability', 'Spread Radius', 'High-P Zone Area', 'Low-P Zone Area'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forecast.particles.map(p => {
                const hc = horizonColors[p.timestepHours as keyof typeof horizonColors];
                const hZones = forecast.zones.filter(z => z.timestepHours === p.timestepHours);
                const hiArea = hZones.find(z => z.tier === 'high')?.areaKm2;
                const loArea = hZones.find(z => z.tier === 'low')?.areaKm2;
                const isRow = activeHorizon === p.timestepHours;
                return (
                  <tr
                    key={p.id}
                    onClick={() => p.timestepHours > 0 && setActiveHorizon(p.timestepHours as 6 | 12 | 24 | 48)}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      cursor: p.timestepHours > 0 ? 'pointer' : 'default',
                      backgroundColor: isRow ? (hc?.bg ?? 'transparent') : 'transparent',
                      transition: 'background 0.15s'
                    }}
                  >
                    <td style={{ padding: '10px 12px' }}>
                      <span className="mono" style={{ fontWeight: 700, color: hc?.color ?? 'var(--text-secondary)', fontSize: '13px' }}>
                        {p.timestepHours === 0 ? 'T+0 (Detection)' : `T+${p.timestepHours}h`}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{p.timestamp}</td>
                    <td className="mono" style={{ padding: '10px 12px', color: 'var(--text-primary)' }}>{p.lat.toFixed(3)}&deg;N</td>
                    <td className="mono" style={{ padding: '10px 12px', color: 'var(--text-primary)' }}>{p.lng.toFixed(3)}&deg;E</td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '5px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', minWidth: '60px' }}>
                          <div style={{ height: '100%', width: `${p.probabilityPercent}%`, backgroundColor: hc?.color ?? '#38BDF8', borderRadius: '3px' }} />
                        </div>
                        <span className="mono" style={{ fontWeight: 600, color: hc?.color ?? 'var(--text-primary)', fontSize: '12px' }}>
                          {p.probabilityPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="mono" style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>
                      {p.spreadRadiusKm > 0 ? `\u00b1${p.spreadRadiusKm} km` : '\u2014'}
                    </td>
                    <td className="mono" style={{ padding: '10px 12px', color: 'var(--accent-emerald)' }}>
                      {hiArea ? `${hiArea.toLocaleString()} km\u00b2` : '\u2014'}
                    </td>
                    <td className="mono" style={{ padding: '10px 12px', color: 'var(--accent-cyan)' }}>
                      {loArea ? `${loArea.toLocaleString()} km\u00b2` : '\u2014'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: 'rgba(56,189,248,0.06)', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--text-secondary)' }}>
          <strong>Model Note:</strong> Forward ensemble (100 particles) driven by ECMWF ERA5 wind field (12.4 kts @ 240&deg;) and INCOIS ROMS surface current (0.45 m/s @ 070&deg;). Uncertainty envelope grows with increasing timestep due to turbulent diffusion (horizontal diffusivity K&#8320; = 20 m&sup2;/s). Click any row to update the map horizon.
        </div>
      </div>

      {/* Model Info Footer */}
      <div className="card">
        <div className="card-header">
          <div className="card-title" style={{ fontSize: '13px' }}>
            <Zap size={15} color="var(--accent-amber)" />
            <span>Forecast Model Configuration</span>
          </div>
          <span className="badge badge-amber">Operational</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '12px' }}>
          {[
            { label: 'Model Engine',           value: 'INCOIS-OPENDRIFT / NOAA GNOME v2.1.4' },
            { label: 'Ensemble Size',           value: '100 Monte Carlo Particles' },
            { label: 'Drift Velocity',          value: '1.18 kts (0.61 m/s) @ 067\u00b0 ENE' },
            { label: 'Wind Leeway Factor',       value: '3% of wind speed (standard oil sheen)' },
            { label: 'Horizontal Diffusivity',  value: 'Kh = 20 m\u00b2/s (turbulent ocean)' },
            { label: 'Forecast Generated',      value: forecast.generatedAt },
          ].map(item => (
            <div key={item.label} style={{ padding: '10px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
              <div className="mono" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '11px', lineHeight: '1.4' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
