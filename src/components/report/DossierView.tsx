import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Compass, 
  Calendar, 
  Ship, 
  Info,
  Check
} from 'lucide-react';
import { InvestigationReportData } from '../../types/evidence';
import { StatusBadge } from '../common/StatusBadge';

interface DossierViewProps {
  report: InvestigationReportData;
}

export const DossierView: React.FC<DossierViewProps> = ({ report }) => {
  const [downloaded, setDownloaded] = useState(false);
  const topVessel = report.rankedVessels[0];

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `INVESTIGATION_DOSSIER_${report.caseInfo.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Dossier Control Header */}
      <div className="no-print card" style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)',
        borderLeft: '4px solid var(--accent-cyan)'
      }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--accent-cyan)" />
            <span>Forensic Investigation Dossier — Case {report.caseInfo.id}</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Official decision-support summary prepared for maritime & environmental law enforcement authorities
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={15} />
            <span>Print Dossier</span>
          </button>
          <button className="btn btn-primary" onClick={handleExportJSON}>
            {downloaded ? <Check size={15} /> : <Download size={15} />}
            <span>{downloaded ? 'Bundle Downloaded' : 'Export JSON Audit Bundle'}</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Container */}
      <div className="card" style={{
        padding: '36px 40px',
        backgroundColor: '#0E1522',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Document Header with Seal */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingBottom: '24px',
          borderBottom: '2px solid var(--border-subtle)',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <ShieldCheck size={26} color="#0284C7" />
              <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.04em', color: '#F1F5F9' }}>
                MESIA MARITIME INCIDENT REPORT
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Maritime Environmental Surveillance & Intelligence Authority • Government of India
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent-amber)' }}>
              CASE REF: {report.caseInfo.id}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Classification: <strong style={{ color: 'var(--accent-cyan)' }}>OFFICIAL FORENSIC INTELLIGENCE</strong>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Generated: {report.generatedAt}
            </div>
          </div>
        </div>

        {/* Executive Incident Statement */}
        <div style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(56, 189, 248, 0.06)',
          borderLeft: '4px solid var(--accent-cyan)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '28px'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--accent-cyan)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '6px' }}>
            Executive Intelligence Summary
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
            {report.investigativeSummary}
          </p>
        </div>

        {/* Primary Case Parameters Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Region & AOI
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {report.caseInfo.region}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{report.caseInfo.aoi.name}</div>
          </div>

          <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Spill Detection
            </div>
            <div className="mono" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-amber)', marginTop: '4px' }}>
              {report.spill.areaKm2} km² (91% Conf)
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Damping: {report.spill.backscatterContrastDb} dB</div>
          </div>

          <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Release Window
            </div>
            <div className="mono" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              08 Sept 2026, 06:00–10:00 UTC
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Origin Centroid: 18°19.2'N, 70°58.4'E</div>
          </div>

          <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Top Candidate Vessel
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-amber)', marginTop: '4px' }}>
              {topVessel.name.split(' (')[0]}
            </div>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Attribution Score: <strong style={{ color: 'var(--accent-amber)' }}>{topVessel.attributionScore}/100</strong>
            </div>
          </div>
        </div>

        {/* Section: Evidentiary Chain */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>1. Corroborated Evidentiary Chain</span>
          </div>

          <table className="data-table" style={{ border: '1px solid var(--border-subtle)' }}>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Forensic Stage</th>
                <th style={{ width: '30%' }}>Evaluation Metric</th>
                <th>Observed Analytical Finding</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {report.evidentiaryChain.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{row.step}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.factor}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{row.finding}</td>
                  <td style={{ textAlign: 'center' }}>
                    <StatusBadge status={row.confidenceLevel} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section: Candidate Vessel Attribution Matrix */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>2. Correlated AIS Vessel Attribution Matrix</span>
          </div>

          <table className="data-table" style={{ border: '1px solid var(--border-subtle)' }}>
            <thead>
              <tr>
                <th>Vessel Identity</th>
                <th>Type / Flag</th>
                <th>Closest Approach</th>
                <th style={{ textAlign: 'center' }}>Spatial</th>
                <th style={{ textAlign: 'center' }}>Temporal</th>
                <th style={{ textAlign: 'center' }}>Drift</th>
                <th style={{ textAlign: 'center' }}>Track</th>
                <th style={{ textAlign: 'right' }}>Attribution Score</th>
              </tr>
            </thead>
            <tbody>
              {report.rankedVessels.map((v, i) => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 600, color: i === 0 ? 'var(--accent-amber)' : 'inherit' }}>
                    {v.name}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{v.type} ({v.flag})</td>
                  <td className="mono">{v.closestApproachDistanceKm} km ({v.closestApproachTime})</td>
                  <td className="mono" style={{ textAlign: 'center' }}>{v.factorScores.spatialProximity}</td>
                  <td className="mono" style={{ textAlign: 'center' }}>{v.factorScores.temporalCompatibility}</td>
                  <td className="mono" style={{ textAlign: 'center' }}>{v.factorScores.driftConsistency}</td>
                  <td className="mono" style={{ textAlign: 'center' }}>{v.factorScores.trajectoryConsistency}</td>
                  <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: i === 0 ? 'var(--accent-amber)' : 'inherit' }}>
                    {v.attributionScore} / 100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section: Unmatched SAR Contacts (Dark Contact Leads) */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
            3. Unmatched SAR Radar Contacts (Investigation Leads)
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="mono" style={{ fontWeight: 700, color: '#EF4444' }}>CONTACT #{report.unmatchedContacts[0].code}</span>
                <span className="badge badge-rose">AIS MATCH: NONE</span>
              </div>
              <span className="badge badge-amber">{report.unmatchedContacts[0].status}</span>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '10px' }}>
              {report.unmatchedContacts[0].investigatorNotes}
            </p>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              <strong>Operational Note: </strong> Under standard operating procedures, this contact is classified as an active lead requiring surface patrol verification and does not automatically imply non-compliance or illicit discharge.
            </div>
          </div>
        </div>

        {/* Section: Statutory Disclaimers and Limitations */}
        <div style={{
          padding: '16px 20px',
          backgroundColor: 'var(--bg-card-muted)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '11px',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={13} color="var(--accent-amber)" />
            <span>Evidentiary Scope & Statutory Limitations</span>
          </div>
          <ul style={{ paddingLeft: '18px', lineHeight: '1.6' }}>
            {report.statutoryLimitations.map((limitation, i) => (
              <li key={i}>{limitation}</li>
            ))}
          </ul>
        </div>

        {/* Investigator Sign-off Stamp */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: '36px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Investigating Officer</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {report.leadInvestigator}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Marine Forensic Intelligence Branch, {report.authorityAgency}
            </div>
          </div>

          <div style={{
            padding: '8px 16px',
            border: '2px dashed rgba(16, 185, 129, 0.4)',
            borderRadius: '4px',
            color: '#10B981',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: '11px',
            textAlign: 'center'
          }}>
            INTELLIGENCE DOSSIER CERTIFIED<br/>
            HASH: 8F2A-44C9-981D-E0261
          </div>
        </div>
      </div>
    </div>
  );
};
