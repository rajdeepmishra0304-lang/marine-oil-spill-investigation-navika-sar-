import { MetoceanConditions } from '../types/spill';

export const MOCK_METOCEAN_IND_0261: MetoceanConditions = {
  windSpeedKts: 12.4,
  windDirectionDeg: 240, // From 240° (South-West) pushing towards 060° (North-East)
  windSource: 'ECMWF ERA5 Reanalysis (08-SEP-2026 06:00-14:00 UTC)',
  currentSpeedMs: 0.45,  // Surface currents ~0.9 knots
  currentDirectionDeg: 70, // Towards 070° (East-North-East)
  currentSource: 'INCOIS High-Resolution Coastal Ocean Dynamics Model',
  waterTemperatureC: 28.4,
  seaState: 'Moderate Sea (Beaufort 3-4, Significant Wave Height 1.2m)',
  originUncertaintyKm: 6.4,
  estimatedReleaseWindow: {
    start: '08 Sept 2026, 06:00 UTC',
    end: '08 Sept 2026, 10:00 UTC'
  },
  // Backtracked upstream origin centroid (~32 km southwest of detection center)
  probableOriginCenter: [18.32, 70.97],
  probableOriginEllipse: {
    semiMajorKm: 6.4,
    semiMinorKm: 3.8,
    rotationDeg: 55 // aligned with wind/current vector
  },
  // Backward trajectory particles from detection time (14:22 UTC) back to release (06:00 UTC)
  driftParticles: [
    { id: 1, stepHours: 0, timestamp: '14:22 UTC (Detection)', lat: 18.520, lng: 71.180, varianceRadiusKm: 0.8 },
    { id: 2, stepHours: -2, timestamp: '12:00 UTC (T-2h)', lat: 18.472, lng: 71.130, varianceRadiusKm: 1.9 },
    { id: 3, stepHours: -4, timestamp: '10:00 UTC (T-4h, Release Window End)', lat: 18.420, lng: 71.078, varianceRadiusKm: 3.2 },
    { id: 4, stepHours: -6, timestamp: '08:00 UTC (T-6h, Median Release)', lat: 18.368, lng: 71.025, varianceRadiusKm: 4.8 },
    { id: 5, stepHours: -8, timestamp: '06:00 UTC (T-8h, Release Window Start)', lat: 18.320, lng: 70.970, varianceRadiusKm: 6.4 }
  ]
};
