import { SpillFeature } from '../types/spill';

export const MOCK_SPILL_IND_0261: SpillFeature = {
  id: 'SPILL-IND-0261-A',
  caseId: 'IND-0261',
  areaKm2: 18.7,
  confidencePercent: 91,
  modelIdentifier: 'SAR-Segmentation-v1',
  slickType: 'Heavy Hydrocarbon / Bilge or Cargo Discharge',
  backscatterContrastDb: -6.2,
  perimeterKm: 34.2,
  acquisitionTime: '08 Sept 2026, 14:22:15 UTC',
  centerCoordinates: [18.52, 71.18],
  bounds: [
    [18.42, 71.05],
    [18.62, 71.30]
  ],
  // Realistic elongated morphometry shaped by wind and sea currents
  polygonCoordinates: [
    [18.442, 71.065],
    [18.471, 71.092],
    [18.498, 71.125],
    [18.535, 71.168],
    [18.572, 71.218],
    [18.595, 71.258],
    [18.608, 71.285],
    [18.592, 71.295],
    [18.568, 71.272],
    [18.538, 71.232],
    [18.502, 71.182],
    [18.470, 71.140],
    [18.448, 71.100],
    [18.432, 71.074],
    [18.442, 71.065]
  ]
};
