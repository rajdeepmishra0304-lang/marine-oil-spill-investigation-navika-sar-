import { SpillForecast } from '../types/spill';

/**
 * Forward Lagrangian oil spill spread forecast.
 * Starting from spill detection center [18.520, 71.180] at T+0 (14:22 UTC 08-Sep-2026).
 * Drift velocity: 1.18 kts (0.61 m/s) at 067° ENE.
 * Wind leeway: 3% of 12.4 kts = 0.37 kts, direction 060°.
 * Surface current: 0.45 m/s @ 070°.
 * Combined: 0.61 m/s = 2.196 km/h → used to compute forward displacement.
 */
export const MOCK_FORECAST_IND_0261: SpillForecast = {
  generatedAt: '08 Sept 2026, 14:22 UTC (Detection Timestamp)',
  modelName: 'INCOIS-OPENDRIFT / NOAA GNOME (v2.1.4) — Lagrangian Ensemble (100 particles)',
  originCenter: [18.520, 71.180],
  forecastHorizons: [6, 12, 24, 48],

  // Forward drift nodes from detection center along 067° ENE at 2.196 km/h
  particles: [
    { id: 1,  timestepHours: 0,  timestamp: '14:22 UTC  (T+0h — Detection)',          lat: 18.520, lng: 71.180, spreadRadiusKm: 0.8,  probabilityPercent: 100 },
    { id: 2,  timestepHours: 6,  timestamp: '20:22 UTC  (T+6h)',                       lat: 18.568, lng: 71.267, spreadRadiusKm: 4.2,  probabilityPercent: 82  },
    { id: 3,  timestepHours: 12, timestamp: '09 Sept 02:22 UTC  (T+12h)',              lat: 18.617, lng: 71.354, spreadRadiusKm: 8.1,  probabilityPercent: 64  },
    { id: 4,  timestepHours: 24, timestamp: '09 Sept 14:22 UTC  (T+24h)',              lat: 18.714, lng: 71.528, spreadRadiusKm: 14.6, probabilityPercent: 42  },
    { id: 5,  timestepHours: 48, timestamp: '10 Sept 14:22 UTC  (T+48h)',              lat: 18.908, lng: 71.876, spreadRadiusKm: 24.2, probabilityPercent: 21  },
  ],

  // Probability contour zones — three concentric tiers per forecast horizon
  zones: [
    // T+6h
    { id: 'z6-high',   label: 'T+6h — High Probability (≥70%)',    probabilityPercent: 82, tier: 'high',   timestepHours: 6,  centerCoordinates: [18.568, 71.267], radiusKm: 4.2,  areaKm2: 55.4  },
    { id: 'z6-med',    label: 'T+6h — Medium Probability (40–70%)', probabilityPercent: 60, tier: 'medium', timestepHours: 6,  centerCoordinates: [18.568, 71.267], radiusKm: 7.8,  areaKm2: 191.1 },
    { id: 'z6-low',    label: 'T+6h — Low Probability (15–40%)',    probabilityPercent: 28, tier: 'low',    timestepHours: 6,  centerCoordinates: [18.568, 71.267], radiusKm: 12.0, areaKm2: 452.4 },

    // T+12h
    { id: 'z12-high',  label: 'T+12h — High Probability (≥70%)',    probabilityPercent: 70, tier: 'high',   timestepHours: 12, centerCoordinates: [18.617, 71.354], radiusKm: 8.1,  areaKm2: 206.1 },
    { id: 'z12-med',   label: 'T+12h — Medium Probability (40–70%)', probabilityPercent: 50, tier: 'medium', timestepHours: 12, centerCoordinates: [18.617, 71.354], radiusKm: 14.4, areaKm2: 651.4 },
    { id: 'z12-low',   label: 'T+12h — Low Probability (15–40%)',    probabilityPercent: 25, tier: 'low',    timestepHours: 12, centerCoordinates: [18.617, 71.354], radiusKm: 20.5, areaKm2: 1320.5 },

    // T+24h
    { id: 'z24-high',  label: 'T+24h — High Probability (≥70%)',    probabilityPercent: 58, tier: 'high',   timestepHours: 24, centerCoordinates: [18.714, 71.528], radiusKm: 14.6, areaKm2: 669.5 },
    { id: 'z24-med',   label: 'T+24h — Medium Probability (40–70%)', probabilityPercent: 38, tier: 'medium', timestepHours: 24, centerCoordinates: [18.714, 71.528], radiusKm: 24.0, areaKm2: 1809.6 },
    { id: 'z24-low',   label: 'T+24h — Low Probability (15–40%)',    probabilityPercent: 18, tier: 'low',    timestepHours: 24, centerCoordinates: [18.714, 71.528], radiusKm: 34.0, areaKm2: 3631.7 },

    // T+48h
    { id: 'z48-high',  label: 'T+48h — High Probability (≥70%)',    probabilityPercent: 38, tier: 'high',   timestepHours: 48, centerCoordinates: [18.908, 71.876], radiusKm: 24.2, areaKm2: 1840.9 },
    { id: 'z48-med',   label: 'T+48h — Medium Probability (40–70%)', probabilityPercent: 22, tier: 'medium', timestepHours: 48, centerCoordinates: [18.908, 71.876], radiusKm: 38.0, areaKm2: 4536.5 },
    { id: 'z48-low',   label: 'T+48h — Low Probability (15–40%)',    probabilityPercent: 11, tier: 'low',    timestepHours: 48, centerCoordinates: [18.908, 71.876], radiusKm: 52.0, areaKm2: 8494.9 },
  ],

  estimatedTotalAreaKm2At48h: 8494.9,
  dominantDriftDirection: 'ENE (067°)',

  environmentalHazards: [
    { label: 'Khanderi Island Biosphere Reserve',     distance: '~42 km ENE (within T+24h zone)', risk: 'critical' },
    { label: 'Alibag Coastal Fishing Zone (MH-RJ)',   distance: '~61 km NNE (within T+48h zone)', risk: 'high'     },
    { label: 'Mumbai Harbour Shipping Lanes',          distance: '~74 km N (within T+48h low zone)', risk: 'high'   },
    { label: 'Rewas-Mandwa Ferry Corridor',            distance: '~58 km NE (within T+36h zone)', risk: 'moderate'  },
  ]
};
