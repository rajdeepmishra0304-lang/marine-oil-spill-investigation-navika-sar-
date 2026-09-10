import React from 'react';
import { SARContact } from '../../types/contact';
import { AlertCircle, Radio, Crosshair, HelpCircle, Shield } from 'lucide-react';

interface UnmatchedContactCardProps {
  contact: SARContact;
}

export const UnmatchedContactCard: React.FC<UnmatchedContactCardProps> = ({ contact }) => {
  return (
    <div className="card" style={{ borderLeft: '3px solid #EF4444', backgroundColor: 'var(--bg-card)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '4px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444'
          }}>
            <Crosshair size={18} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>SAR CONTACT #{contact.code}</span>
              <span className="badge badge-rose">UNMATCHED TARGET</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              CFAR Radar Hard-Target Detection | Position: {contact.position[0]}°N, {contact.position[1]}°E
            </div>
          </div>
        </div>

        <span className="badge badge-amber">{contact.status}</span>
      </div>

      {/* Telemetry Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'var(--bg-card-muted)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: '14px'
      }}>
        <div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            AIS Correlation
          </div>
          <div className="mono" style={{ fontSize: '13px', fontWeight: 700, color: '#EF4444', marginTop: '2px' }}>
            NONE RECORDED
          </div>
        </div>

        <div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Signal Confidence
          </div>
          <div className="mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-emerald)', marginTop: '2px' }}>
            {contact.signalConfidence}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Radar Cross Section
          </div>
          <div className="mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
            {contact.radarCrossSectionM2} m² (~{contact.estimatedLengthM}m)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Origin Proximity
          </div>
          <div className="mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-amber)', marginTop: '2px' }}>
            {contact.distanceToOriginKm} km from centroid
          </div>
        </div>
      </div>

      {/* Forensic Lead Context & Possible Explanations */}
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        <p style={{ marginBottom: '8px' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Investigative Lead Summary: </strong>
          {contact.investigatorNotes}
        </p>
      </div>

      <div style={{
        padding: '10px 14px',
        backgroundColor: 'rgba(56, 189, 248, 0.05)',
        border: '1px solid rgba(56, 189, 248, 0.15)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '11px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <HelpCircle size={13} />
          <span>Plausible Explanations (Non-Accusatory Protocol)</span>
        </div>
        <ul style={{ paddingLeft: '16px', lineHeight: '1.6' }}>
          {contact.possibleExplanations.map((exp, i) => (
            <li key={i}>{exp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
