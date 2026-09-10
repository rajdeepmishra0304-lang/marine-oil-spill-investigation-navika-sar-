import React from 'react';
import { CandidateVessel } from '../../types/vessel';
import { ShieldAlert, Compass, Clock, Navigation, CheckCircle2 } from 'lucide-react';

interface AttributionScoreCardProps {
  vessel: CandidateVessel;
}

export const AttributionScoreCard: React.FC<AttributionScoreCardProps> = ({ vessel }) => {
  const { factorScores } = vessel;

  const factors = [
    { label: 'Spatial Proximity', score: factorScores.spatialProximity, weight: '30%', icon: <Compass size={14} /> },
    { label: 'Temporal Compatibility', score: factorScores.temporalCompatibility, weight: '25%', icon: <Clock size={14} /> },
    { label: 'Drift Consistency', score: factorScores.driftConsistency, weight: '25%', icon: <Navigation size={14} /> },
    { label: 'Trajectory Consistency', score: factorScores.trajectoryConsistency, weight: '20%', icon: <ShieldAlert size={14} /> },
  ];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div>
          <div className="card-title">
            <span>Evidence & Attribution Analysis</span>
          </div>
          <div className="card-subtitle">
            Evaluating evidentiary association for {vessel.name}
          </div>
        </div>
        <span className="badge badge-amber">Top Candidate Lead</span>
      </div>

      {/* Main Score Hero */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        backgroundColor: 'var(--bg-card-muted)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        marginBottom: '16px'
      }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            Attribution / Evidence Score
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Multi-factor evidentiary correlation index
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span className="mono" style={{ fontSize: '38px', fontWeight: 800, color: 'var(--accent-amber)' }}>
            {vessel.attributionScore}
          </span>
          <span style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: 600 }}>/ 100</span>
        </div>
      </div>

      {/* Factor Breakdown Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {factors.map(f => (
          <div key={f.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                {f.icon}
                <span>{f.label}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>({f.weight})</span>
              </span>
              <span className="mono" style={{ fontWeight: 600, color: f.score >= 85 ? 'var(--accent-amber)' : 'var(--text-secondary)' }}>
                {f.score} / 100
              </span>
            </div>

            {/* Progress Track */}
            <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${f.score}%`,
                  height: '100%',
                  backgroundColor: f.score >= 85 ? 'var(--accent-amber)' : '#0284C7',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Primary Evidentiary Findings */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
          Key Evidentiary Points
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {vessel.evidenceSummary.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={14} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
