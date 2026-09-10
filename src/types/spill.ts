export interface SpillFeature {
  id: string;
  caseId: string;
  areaKm2: number;
  confidencePercent: number;
  modelIdentifier: string;
  slickType: string;
  backscatterContrastDb: number;
  perimeterKm: number;
  acquisitionTime: string;
  centerCoordinates: [number, number]; // [lat, lng]
  polygonCoordinates: [number, number][]; // [lat, lng] array
  bounds: [[number, number], [number, number]];
}

export interface LagrangianParticle {
  id: number;
  stepHours: number;
  timestamp: string;
  lat: number;
  lng: number;
  varianceRadiusKm: number;
}

export interface MetoceanConditions {
  windSpeedKts: number;
  windDirectionDeg: number;
  windSource: string;
  currentSpeedMs: number;
  currentDirectionDeg: number;
  currentSource: string;
  waterTemperatureC: number;
  seaState: string;
  originUncertaintyKm: number;
  estimatedReleaseWindow: {
    start: string;
    end: string;
  };
  probableOriginCenter: [number, number];
  probableOriginEllipse: {
    semiMajorKm: number;
    semiMinorKm: number;
    rotationDeg: number;
  };
  driftParticles: LagrangianParticle[];
}
