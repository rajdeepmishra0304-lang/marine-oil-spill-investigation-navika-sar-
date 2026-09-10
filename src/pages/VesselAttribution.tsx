import React, { useState } from 'react';
import { useInvestigation } from '../context/InvestigationContext';
import { investigationService } from '../services/mockInvestigationService';
import { WorkflowBreadcrumb } from '../components/investigation/WorkflowBreadcrumb';
import { MaritimeMap } from '../components/maps/MaritimeMap';
import { VesselRankingTable } from '../components/tables/VesselRankingTable';
import { AttributionScoreCard } from '../components/evidence/AttributionScoreCard';
import { UnmatchedContactCard } from '../components/evidence/UnmatchedContactCard';
import { TelemetryTable } from '../components/tables/TelemetryTable';
import { 
  Ship, 
  Crosshair, 
  FileText, 
  ArrowRight, 
  Layers, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const VesselAttribution: React.FC = () => {
  const { activeCase, setActivePage } = useInvestigation();
  const spill = investigationService.getSpillData(activeCase.id);
  const metocean = investigationService.getMetoceanData(activeCase.id);
  const vessels = investigationService.getCandidateVessels(activeCase.id);
  const contacts = investigationService.getUnmatchedContacts(activeCase.id);

  const [selectedVesselId, setSelectedVesselId] = useState<string>('vessel-a');
  const selectedVessel = vessels.find(v => v.id === selectedVesselId) || vessels[0];

  return (
    <div className="page-wrapper">
      <WorkflowBreadcrumb />

      {/* Screen Title & Technical Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-amber">CORRELATION MATRIX ACTIVE</span>
            <span className="badge badge-rose">1 UNMATCHED LEAD FLAGGED</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
            AIS Vessel Trajectory Correlation & Dark Contact Analysis
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Spatial-temporal correlation against probable origin window (08 Sept 06:00–10:00 UTC) with CFAR non-AIS target screening
          </p>
        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={() => setActivePage('report')}
        >
          <FileText size={16} />
          <span>Generate Investigation Dossier</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Primary Workspace Grid: Maritime Map + Explainability Score Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div>
          <MaritimeMap
            spill={spill}
            metocean={metocean}
            vessels={vessels}
            unmatchedContacts={contacts}
            selectedVesselId={selectedVesselId}
            onSelectVessel={setSelectedVesselId}
            showBacktrack={true}
            showVessels={true}
            showContacts={true}
            height="560px"
          />
        </div>

        <div>
          <AttributionScoreCard vessel={selectedVessel} />
        </div>
      </div>

      {/* Unmatched SAR Contact Section (Dark Contact Lead) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Crosshair size={18} color="#EF4444" />
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
            SAR Radar Target Screening — Non-AIS Contact Lead
          </h2>
        </div>
        <UnmatchedContactCard contact={contacts[0]} />
      </div>

      {/* Candidate Vessels Ranking Table */}
      <div style={{ marginBottom: '24px' }}>
        <VesselRankingTable
          vessels={vessels}
          selectedVesselId={selectedVesselId}
          onSelectVessel={setSelectedVesselId}
        />
      </div>

      {/* Selected Vessel Telemetry Waypoints */}
      <div>
        <TelemetryTable vessel={selectedVessel} />
      </div>
    </div>
  );
};
