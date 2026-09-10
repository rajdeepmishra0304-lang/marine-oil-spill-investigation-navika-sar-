import { InvestigationCase } from '../types/investigation';
import { INITIAL_PIPELINE_STAGES } from './mockProcessing';

export const MOCK_CASES: InvestigationCase[] = [
  {
    id: 'IND-0261',
    title: 'Arabian Sea Offshore Corridor Discharge',
    region: 'Arabian Sea (West Coast EEZ)',
    status: 'Ready',
    priority: 'Critical',
    createdAt: '2026-09-08 15:30 UTC',
    incidentDate: '2026-09-08',
    timeWindow: {
      start: '2026-09-08 04:00 UTC',
      end: '2026-09-08 16:00 UTC'
    },
    aoi: {
      name: 'Mumbai High - Saurashtra Offshore Sector',
      region: 'Arabian Sea',
      bounds: [
        [18.0, 70.4],
        [19.2, 71.8]
      ],
      center: [18.52, 71.18],
      areaSqKm: 14850
    },
    sensor: {
      id: 'S1A-IW',
      name: 'Sentinel-1A C-SAR',
      mode: 'Interferometric Wide Swath (IW GRD)',
      orbit: 'Pass 147 (Descending)',
      resolution: '10m x 10m Ground Resolution',
      polarization: 'VV + VH Dual-Pol',
      incidenceAngle: '34.2° Mid-Swath'
    },
    pipelineStages: INITIAL_PIPELINE_STAGES,
    currentStageIndex: 0,
    isProcessed: false,
    isVerified: false
  },
  {
    id: 'IND-0258',
    title: 'Paradip Port Approaches Sheen',
    region: 'Bay of Bengal (East Coast)',
    status: 'Report Generated',
    priority: 'Standard',
    createdAt: '2026-09-02 09:12 UTC',
    incidentDate: '2026-09-02',
    timeWindow: {
      start: '2026-09-02 00:00 UTC',
      end: '2026-09-02 12:00 UTC'
    },
    aoi: {
      name: 'Paradip Port Anchorage',
      region: 'Bay of Bengal',
      bounds: [
        [19.8, 86.4],
        [20.5, 87.2]
      ],
      center: [20.15, 86.8],
      areaSqKm: 6200
    },
    sensor: {
      id: 'RISAT-1A',
      name: 'EOS-04 / RISAT-1A',
      mode: 'Fine Resolution Stripmap (FRS-1)',
      orbit: 'Pass 082 (Ascending)',
      resolution: '3m Spatial Resolution',
      polarization: 'Hybrid Polarimetric (RH/RV)',
      incidenceAngle: '38.5°'
    },
    pipelineStages: INITIAL_PIPELINE_STAGES.map(s => ({ ...s, status: 'completed' })),
    currentStageIndex: 8,
    isProcessed: true,
    isVerified: true
  },
  {
    id: 'IND-0249',
    title: 'Tuticorin Shipping Channel Anomaly',
    region: 'Gulf of Mannar',
    status: 'Report Generated',
    priority: 'Elevated',
    createdAt: '2026-08-27 18:40 UTC',
    incidentDate: '2026-08-27',
    timeWindow: {
      start: '2026-08-27 12:00 UTC',
      end: '2026-08-27 23:59 UTC'
    },
    aoi: {
      name: 'Gulf of Mannar Deepwater Route',
      region: 'Gulf of Mannar',
      bounds: [
        [8.4, 78.2],
        [9.1, 78.9]
      ],
      center: [8.75, 78.55],
      areaSqKm: 4800
    },
    sensor: {
      id: 'S1B-IW',
      name: 'Sentinel-1B C-SAR',
      mode: 'Interferometric Wide Swath (IW GRD)',
      orbit: 'Pass 034 (Descending)',
      resolution: '10m x 10m',
      polarization: 'VV + VH',
      incidenceAngle: '36.8°'
    },
    pipelineStages: INITIAL_PIPELINE_STAGES.map(s => ({ ...s, status: 'completed' })),
    currentStageIndex: 8,
    isProcessed: true,
    isVerified: true
  }
];
