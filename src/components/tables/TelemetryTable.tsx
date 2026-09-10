import React from 'react';
import { CandidateVessel } from '../../types/vessel';
import { Navigation, Clock } from 'lucide-react';

interface TelemetryTableProps {
  vessel: CandidateVessel;
}

export const TelemetryTable: React.FC<TelemetryTableProps> = ({ vessel }) => {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '14px 18px', margin: 0 }}>
        <div>
          <div className="card-title" style={{ fontSize: '13px' }}>
            <Navigation size={14} color={vessel.color} />
            <span>AIS Trajectory Waypoints — {vessel.name}</span>
          </div>
          <div className="card-subtitle">
            Temporal GPS track log reconstructed across the AOI transit
          </div>
        </div>
        <span className="badge badge-muted mono">{vessel.trajectory.length} Fixes</span>
      </div>

      <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
        <table className="data-table" style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th>Timestamp (UTC)</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Speed (kts)</th>
              <th>Heading</th>
              <th style={{ textAlign: 'right' }}>Dist to Origin</th>
            </tr>
          </thead>
          <tbody>
            {vessel.trajectory.map((wp, i) => {
              const isClosest = wp.distanceToOriginKm === vessel.closestApproachDistanceKm;
              return (
                <tr key={i} style={{ backgroundColor: isClosest ? 'rgba(245, 158, 11, 0.1)' : 'transparent' }}>
                  <td className="mono" style={{ color: isClosest ? 'var(--accent-amber)' : 'inherit', fontWeight: isClosest ? 600 : 400 }}>
                    {wp.timestamp} {isClosest && '★ CPA'}
                  </td>
                  <td className="mono">{wp.lat.toFixed(3)}°N</td>
                  <td className="mono">{wp.lng.toFixed(3)}°E</td>
                  <td className="mono">{wp.speedKnots} kts</td>
                  <td className="mono">{wp.headingDeg}°</td>
                  <td className="mono" style={{ textAlign: 'right', fontWeight: isClosest ? 700 : 400, color: isClosest ? 'var(--accent-amber)' : 'inherit' }}>
                    {wp.distanceToOriginKm} km
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
