import React from 'react';
import { CandidateVessel } from '../../types/vessel';
import { Ship, ChevronRight, Eye } from 'lucide-react';

interface VesselRankingTableProps {
  vessels: CandidateVessel[];
  selectedVesselId: string;
  onSelectVessel: (vesselId: string) => void;
}

export const VesselRankingTable: React.FC<VesselRankingTableProps> = ({
  vessels,
  selectedVesselId,
  onSelectVessel
}) => {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '16px 20px', margin: 0 }}>
        <div>
          <div className="card-title">
            <Ship size={16} color="var(--accent-cyan)" />
            <span>Correlated Candidate Vessels (Ranked by Evidence)</span>
          </div>
          <div className="card-subtitle">
            Filtered from 142 vessels active in AOI during release window (08 Sept 06:00–10:00 UTC)
          </div>
        </div>
        <span className="badge badge-cyan">{vessels.length} Correlated Candidates</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>Rank</th>
              <th>Vessel Identity & Type</th>
              <th>Flag</th>
              <th>Closest Approach</th>
              <th style={{ textAlign: 'center' }}>Spatial (30%)</th>
              <th style={{ textAlign: 'center' }}>Temporal (25%)</th>
              <th style={{ textAlign: 'center' }}>Drift (25%)</th>
              <th style={{ textAlign: 'center' }}>Track (20%)</th>
              <th style={{ textAlign: 'right' }}>Attribution / Evidence Score</th>
              <th style={{ textAlign: 'center', width: '90px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {vessels.map((vessel, index) => {
              const isSelected = selectedVesselId === vessel.id;
              const isTop = index === 0;

              return (
                <tr
                  key={vessel.id}
                  className={isSelected ? 'selected' : ''}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelectVessel(vessel.id)}
                >
                  <td className="mono" style={{ fontWeight: 700, color: isTop ? 'var(--accent-amber)' : 'var(--text-secondary)' }}>
                    #{index + 1}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: vessel.color, display: 'inline-block' }} />
                      <span>{vessel.name}</span>
                    </div>
                    <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {vessel.imo} • {vessel.type}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px' }}>{vessel.flag}</span>
                  </td>
                  <td>
                    <div className="mono" style={{ fontSize: '12px', fontWeight: 600, color: isTop ? 'var(--accent-amber)' : 'var(--text-primary)' }}>
                      {vessel.closestApproachDistanceKm} km
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {vessel.closestApproachTime}
                    </div>
                  </td>
                  <td className="mono" style={{ textAlign: 'center', color: vessel.factorScores.spatialProximity >= 90 ? 'var(--accent-amber)' : 'inherit' }}>
                    {vessel.factorScores.spatialProximity}
                  </td>
                  <td className="mono" style={{ textAlign: 'center', color: vessel.factorScores.temporalCompatibility >= 85 ? 'var(--accent-amber)' : 'inherit' }}>
                    {vessel.factorScores.temporalCompatibility}
                  </td>
                  <td className="mono" style={{ textAlign: 'center', color: vessel.factorScores.driftConsistency >= 90 ? 'var(--accent-amber)' : 'inherit' }}>
                    {vessel.factorScores.driftConsistency}
                  </td>
                  <td className="mono" style={{ textAlign: 'center' }}>
                    {vessel.factorScores.trajectoryConsistency}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ fontSize: '18px', fontWeight: 800, color: isTop ? 'var(--accent-amber)' : 'var(--text-primary)' }}>
                      {vessel.attributionScore}
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}> / 100</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVessel(vessel.id);
                      }}
                      style={{ padding: '3px 8px', fontSize: '11px' }}
                    >
                      <Eye size={12} />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
