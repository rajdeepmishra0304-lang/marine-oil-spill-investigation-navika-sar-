export type InvestigationStatus = 'Ready' | 'Processing' | 'Analysis Available' | 'Report Generated';
export type CasePriority = 'Critical' | 'Elevated' | 'Standard';

export interface AOIDefinition {
  name: string;
  region: string;
  bounds: [[number, number], [number, number]]; // [SW, NE]
  center: [number, number];
  areaSqKm: number;
}

export interface SensorConfig {
  id: string;
  name: string;
  mode: string;
  orbit: string;
  resolution: string;
  polarization: string;
  incidenceAngle: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  shortDesc: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  durationMs: number;
  logMessages: string[];
}

export interface InvestigationCase {
  id: string;
  title: string;
  region: string;
  status: InvestigationStatus;
  priority: CasePriority;
  createdAt: string;
  incidentDate: string;
  timeWindow: {
    start: string;
    end: string;
  };
  aoi: AOIDefinition;
  sensor: SensorConfig;
  pipelineStages: PipelineStage[];
  currentStageIndex: number;
  isProcessed: boolean;
  isVerified: boolean;
}
