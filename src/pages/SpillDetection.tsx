import React from 'react';
import { useInvestigation } from '../context/InvestigationContext';
import { investigationService } from '../services/mockInvestigationService';
import { WorkflowBreadcrumb } from '../components/investigation/WorkflowBreadcrumb';
import { SARViewer } from '../components/maps/SARViewer';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Maximize2,
  Wind,
  ArrowRight
} from 'lucide-react';

export const SpillDetection: React.FC = () => {
  const { activeCase, verifySpill, setActivePage } = useInvestigation();
  const spill = investigationService.getSpillData(activeCase.id);

  return (
    <div className="page-wrapper">
      <WorkflowBreadcrumb />

      {/* Screen Title & Technical Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-rose">SAR ANOMALY ISOLATED</span>
            <span className="mono" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Product: S1A_IW_GRDH_1SDV_20260908T142215
            </span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Spill Segmentation & Backscatter Verification
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Deep residual U-Net oil-spill segmentation over dual-polarized radar backscatter (VV channel)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setActivePage('incident-analysis')}
          >
            <span>Skip to Drift Analysis</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Hero SAR Viewer Component */}
      <div style={{ marginBottom: '24px' }}>
        <SARViewer
          spill={spill}
          onVerify={verifySpill}
          isVerified={activeCase.isVerified}
        />
      </div>

      {/* Analytical Evidence Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {/* Radar Backscatter Damping Profile */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '13px' }}>
              <Layers size={15} color="var(--accent-cyan)" />
              <span>Backscatter Damping Signature</span>
            </div>
            <span className="badge badge-amber mono">-6.2 dB Contrast</span>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '8px' }}>
              Capillary and short gravity waves on the sea surface are suppressed by the surfactant viscoelastic film, causing strong specular forward reflection and reduced radar backscatter towards the satellite sensor.
            </p>
            <div style={{ padding: '8px 12px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Ambient Ocean Backscatter (σ₀):</span>
                <strong className="mono" style={{ color: 'var(--text-primary)' }}>-14.8 dB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Anomaly Center Backscatter:</span>
                <strong className="mono" style={{ color: '#F87171' }}>-21.0 dB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Net Damping Delta:</span>
                <strong className="mono" style={{ color: 'var(--accent-amber)' }}>-6.2 dB (Verified)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Morphological Slick Parameters */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '13px' }}>
              <Compass size={15} color="var(--accent-amber)" />
              <span>Geometric & Morphological Metrics</span>
            </div>
            <span className="badge badge-muted mono">Polygon v1.4</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Continuous Slick Area:</span>
              <strong className="mono" style={{ color: 'var(--text-primary)', fontSize: '13px' }}>18.7 km²</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Perimeter Distance:</span>
              <strong className="mono" style={{ color: 'var(--text-primary)' }}>34.2 km</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Elongation Ratio (L/W):</span>
              <strong className="mono" style={{ color: 'var(--text-primary)' }}>4.82 : 1 (Strong Wind/Current Shearing)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Slick Volume Index:</span>
              <strong className="mono" style={{ color: 'var(--accent-cyan)' }}>Heavy Sheen / 240–380 m³</strong>
            </div>
          </div>
        </div>

        {/* Environmental Feasibility Check */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '13px' }}>
              <Wind size={15} color="#10B981" />
              <span>Wind-Speed Feasibility Baseline</span>
            </div>
            <span className="badge badge-emerald">Valid SAR Window</span>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '10px' }}>
              SAR oil spill detection is physically valid between <strong>3.0 m/s and 12.0 m/s</strong> (6 to 24 kts). Below 3 m/s, natural low winds create false-positive lookalikes; above 12 m/s, sea waves disperse the film.
            </p>
            <div style={{ padding: '8px 12px', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ color: 'var(--text-primary)' }}>Observed Wind at Acquisition:</span>
                <strong className="mono" style={{ color: '#34D399' }}>12.4 kts (6.38 m/s)</strong>
              </div>
              <div style={{ fontSize: '11px', color: '#10B981' }}>
                ✓ Optimal Detection Conditions (False-positive lookalike probability &lt; 4%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
