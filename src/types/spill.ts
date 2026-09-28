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

export interface ForecastZone {
  id: string;
  label: string; // e.g. '6h High Probability'
  probabilityPercent: number; // 0-100
  tier: 'high' | 'medium' | 'low'; // probability tier
  timestepHours: number; // +6, +12, +24, +48
  centerCoordinates: [number, number]; // [lat, lng]
  radiusKm: number; // spread radius for this zone
  areaKm2: number;
}

export interface ForecastParticle {
  id: number;
  timestepHours: number; // +6, +12, +24, +48
  timestamp: string;
  lat: number;
  lng: number;
  spreadRadiusKm: number;
  probabilityPercent: number;
}

export interface SpillForecast {
  generatedAt: string;
  modelName: string;
  originCenter: [number, number]; // starting point (= current spill detection center)
  forecastHorizons: number[]; // [6, 12, 24, 48]
  particles: ForecastParticle[];
  zones: ForecastZone[];
  estimatedTotalAreaKm2At48h: number;
  dominantDriftDirection: string; // e.g. 'ENE (067°)'
  environmentalHazards: {
    label: string;
    distance: string;
    risk: 'critical' | 'high' | 'moderate';
  }[];
}
