export interface Waypoint {
  timestamp: string;
  lat: number;
  lng: number;
  speedKnots: number;
  headingDeg: number;
  distanceToOriginKm?: number;
}

export interface FactorScores {
  spatialProximity: number;     // 0-100
  temporalCompatibility: number;// 0-100
  driftConsistency: number;     // 0-100
  trajectoryConsistency: number;// 0-100
}

export interface CandidateVessel {
  id: string;
  name: string;
  imo: string;
  mmsi: string;
  flag: string;
  flagCode: string;
  type: string;
  lengthM: number;
  draughtM: number;
  destination: string;
  attributionScore: number;     // 0-100, composite evidence score
  factorScores: FactorScores;
  closestApproachDistanceKm: number;
  closestApproachTime: string;
  currentSpeedKnots: number;
  currentHeadingDeg: number;
  courseAnomalyNotes: string;
  evidenceSummary: string[];
  trajectory: Waypoint[];
  color: string;
}
