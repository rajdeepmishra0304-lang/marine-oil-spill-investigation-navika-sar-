import React from 'react';
import { useInvestigation } from '../context/InvestigationContext';
import { investigationService } from '../services/mockInvestigationService';
import { WorkflowBreadcrumb } from '../components/investigation/WorkflowBreadcrumb';
import { MaritimeMap } from '../components/maps/MaritimeMap';
import { 
  Wind, 
  Compass, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';

export const IncidentAnalysis: React.FC = () => {
  const { activeCase, setActivePage } = useInvestigation();
  const spill = investigationService.getSpillData(activeCase.id);
  const metocean = investigationService.getMetoceanData(activeCase.id);

  return (
    <div className="page-wrapper">
      <WorkflowBreadcrumb />

      {/* Screen Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-emerald">SPILL VERIFIED</span>
            <span className="badge badge-cyan">METOCEAN INVERSION ACTIVE</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Metocean Drift & Lagrangian Origin Backtracking
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Reconstructing upstream particle trajectory from detection timestamp back to probable discharge window
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setActivePage('spill-forecast')}
          >
            <TrendingDown size={15} />
            <span>View Spread Forecast</span>
            <ArrowRight size={14} />
          </button>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setActivePage('vessel-attribution')}
          >
            <span>Correlate AIS Vessel Trajectories</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Uncertainty & Window Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <MetricCard
          label="Probable Origin Centroid"
          value="18°19.2'N"
          unit="70°58.4'E"
          subtext="Centroid of reconstructed release ellipse"
          icon={<Compass size={18} />}
          variant="highlight"
        />
        <MetricCard
          label="Origin Uncertainty Area"
          value="± 6.4"
          unit="km"
          subtext="Hydrodynamic dispersion variance"
          icon={<AlertCircle size={18} />}
          variant="amber"
        />
        <MetricCard
          label="Estimated Release Window"
          value="06:00 – 10:00"
          unit="UTC"
          subtext="08 Sept 2026 (T-8.4h to T-4.4h)"
          icon={<Clock size={18} />}
          variant="emerald"
        />
        <MetricCard
          label="Total Drift Displacement"
          value="31.8"
          unit="km"
          subtext="Vector: 058° towards ENE"
          icon={<Wind size={18} />}
        />
      </div>

      {/* Main Map & Analysis Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Interactive Map with Origin Ellipse and Lagrangian Drift */}
        <div>
          <MaritimeMap
            spill={spill}
            metocean={metocean}
            showBacktrack={true}
            showVessels={false}
            showContacts={false}
            height="520px"
          />
        </div>

        {/* Metocean & Lagrangian Inversion Telemetry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Hydrodynamic Conditions Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '13px' }}>
                <Wind size={15} color="var(--accent-cyan)" />
                <span>Assimilation Metocean Data (INCOIS + ECMWF)</span>
              </div>
              <span className="badge badge-cyan">Hourly Reanalysis</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '10px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Surface Wind Field</div>
                <div className="mono" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {metocean.windSpeedKts} kts @ {metocean.windDirectionDeg}°
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>From SW (ECMWF ERA5)</div>
              </div>

              <div style={{ padding: '10px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Surface Ocean Current</div>
                <div className="mono" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {metocean.currentSpeedMs} m/s @ {metocean.currentDirectionDeg}°
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Towards ENE (INCOIS ROMS)</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              <strong>Net Slick Velocity Vector: </strong> 3% wind leeway drift (0.19 m/s @ 060°) compounded with 100% surface current (0.45 m/s @ 070°) produces a combined drift velocity of <strong>1.18 kts (0.61 m/s) at 067°</strong>.
            </div>
          </div>

          {/* Temporal Comparison & Uncertainty Representation */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '13px' }}>
                <Clock size={15} color="var(--accent-amber)" />
                <span>Lagrangian Backtrack Dispersal Timeline</span>
              </div>
              <span className="badge badge-amber mono">Uncertainty Bounds</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {metocean.driftParticles.map((particle, idx) => (
                <div
                  key={particle.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: idx === metocean.driftParticles.length - 1 ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg-card-muted)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: idx === metocean.driftParticles.length - 1 ? '3px solid #EF4444' : '3px solid var(--border-medium)',
                    fontSize: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: idx === metocean.driftParticles.length - 1 ? '#F87171' : 'var(--text-primary)' }}>
                      {particle.timestamp}
                    </div>
                    <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Fix: {particle.lat.toFixed(3)}°N, {particle.lng.toFixed(3)}°E
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--accent-amber)', fontWeight: 600 }}>
                      ±{particle.varianceRadiusKm} km
                    </span>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {idx === metocean.driftParticles.length - 1 ? 'Estimated Origin' : 'Trajectory Node'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <strong>Scientific Protocol Note: </strong> Rather than a fictitious point source, the release zone is formally represented as an uncertainty ellipse (±6.4 km) reflecting turbulent sea diffusion and wind shear.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
