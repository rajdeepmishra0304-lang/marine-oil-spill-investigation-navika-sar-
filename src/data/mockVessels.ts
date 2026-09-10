import { CandidateVessel } from '../types/vessel';

export const MOCK_VESSELS_IND_0261: CandidateVessel[] = [
  {
    id: 'vessel-a',
    name: 'Vessel A (MT Ocean Glory)',
    imo: 'IMO 9482154',
    mmsi: '354891000',
    flag: 'Panama',
    flagCode: 'PA',
    type: 'Crude Oil Tanker (VLCC)',
    lengthM: 333,
    draughtM: 20.5,
    destination: 'Sikka Terminal, India',
    attributionScore: 89, // Overall evidence score
    factorScores: {
      spatialProximity: 92,
      temporalCompatibility: 88,
      driftConsistency: 94,
      trajectoryConsistency: 79
    },
    closestApproachDistanceKm: 1.2,
    closestApproachTime: '08 Sept 2026, 07:45 UTC',
    currentSpeedKnots: 13.8,
    currentHeadingDeg: 332,
    courseAnomalyNotes: 'Minor 14° course adjustment recorded at 07:52 UTC immediately following passage through origin centroid; engine rpm dipped momentarily.',
    evidenceSummary: [
      'Spatial Proximity (92/100): Direct track intersection within 1.2 km of probable release centroid.',
      'Temporal Alignment (88/100): Transit occurred at 07:45 UTC, directly inside the 06:00–10:00 UTC release window.',
      'Drift Consistency (94/100): Vessel vector intersects the upstream origin of the slick modeled by backward Lagrangian dispersal.',
      'Trajectory Consistency (79/100): Continuous broadcast on AIS, but shows minor throttle & course variation (+14°) near the spill origin zone.'
    ],
    color: '#F59E0B', // Amber
    trajectory: [
      { timestamp: '08 Sept 04:00 UTC', lat: 18.020, lng: 70.680, speedKnots: 14.1, headingDeg: 328, distanceToOriginKm: 42.1 },
      { timestamp: '08 Sept 05:30 UTC', lat: 18.180, lng: 70.820, speedKnots: 13.9, headingDeg: 330, distanceToOriginKm: 21.4 },
      { timestamp: '08 Sept 07:00 UTC', lat: 18.285, lng: 70.930, speedKnots: 13.8, headingDeg: 332, distanceToOriginKm: 5.6 },
      { timestamp: '08 Sept 07:45 UTC', lat: 18.328, lng: 70.978, speedKnots: 12.9, headingDeg: 332, distanceToOriginKm: 1.2 }, // Closest approach
      { timestamp: '08 Sept 08:30 UTC', lat: 18.390, lng: 71.010, speedKnots: 13.2, headingDeg: 346, distanceToOriginKm: 9.1 }, // Course alteration
      { timestamp: '08 Sept 10:00 UTC', lat: 18.540, lng: 71.090, speedKnots: 14.0, headingDeg: 335, distanceToOriginKm: 27.5 },
      { timestamp: '08 Sept 12:00 UTC', lat: 18.720, lng: 71.210, speedKnots: 14.2, headingDeg: 332, distanceToOriginKm: 50.8 },
      { timestamp: '08 Sept 14:22 UTC', lat: 18.910, lng: 71.340, speedKnots: 14.1, headingDeg: 330, distanceToOriginKm: 76.2 }
    ]
  },
  {
    id: 'vessel-b',
    name: 'Vessel B (MV Star Trader)',
    imo: 'IMO 9310874',
    mmsi: '636014298',
    flag: 'Liberia',
    flagCode: 'LR',
    type: 'Capesize Bulk Carrier',
    lengthM: 289,
    draughtM: 17.8,
    destination: 'Mormugao, India',
    attributionScore: 78,
    factorScores: {
      spatialProximity: 74,
      temporalCompatibility: 82,
      driftConsistency: 76,
      trajectoryConsistency: 80
    },
    closestApproachDistanceKm: 7.8,
    closestApproachTime: '08 Sept 2026, 09:15 UTC',
    currentSpeedKnots: 11.5,
    currentHeadingDeg: 148,
    courseAnomalyNotes: 'Steady course down the southbound shipping separation scheme; no notable trajectory deviations detected.',
    evidenceSummary: [
      'Spatial Proximity (74/100): Passed within 7.8 km of origin boundary on southbound transit corridor.',
      'Temporal Alignment (82/100): Reached closest point of approach at 09:15 UTC (towards end of release window).',
      'Drift Consistency (76/100): Moderate alignment with outer diffusion boundary of the drift plume.',
      'Trajectory Consistency (80/100): Highly steady heading and speed throughout surveillance passage.'
    ],
    color: '#38BDF8', // Cyan
    trajectory: [
      { timestamp: '08 Sept 06:00 UTC', lat: 18.620, lng: 70.820, speedKnots: 11.4, headingDeg: 148, distanceToOriginKm: 37.0 },
      { timestamp: '08 Sept 07:30 UTC', lat: 18.490, lng: 70.920, speedKnots: 11.6, headingDeg: 148, distanceToOriginKm: 19.5 },
      { timestamp: '08 Sept 09:15 UTC', lat: 18.365, lng: 71.035, speedKnots: 11.5, headingDeg: 148, distanceToOriginKm: 7.8 }, // Closest approach
      { timestamp: '08 Sept 11:00 UTC', lat: 18.220, lng: 71.140, speedKnots: 11.5, headingDeg: 148, distanceToOriginKm: 20.1 },
      { timestamp: '08 Sept 13:00 UTC', lat: 18.060, lng: 71.260, speedKnots: 11.6, headingDeg: 148, distanceToOriginKm: 41.2 },
      { timestamp: '08 Sept 14:22 UTC', lat: 17.950, lng: 71.350, speedKnots: 11.4, headingDeg: 148, distanceToOriginKm: 56.4 }
    ]
  },
  {
    id: 'vessel-c',
    name: 'Vessel C (MT Caspian Tide)',
    imo: 'IMO 9621142',
    mmsi: '538006812',
    flag: 'Marshall Islands',
    flagCode: 'MH',
    type: 'Product / Chemical Tanker',
    lengthM: 183,
    draughtM: 11.2,
    destination: 'Jebel Ali, UAE',
    attributionScore: 68,
    factorScores: {
      spatialProximity: 60,
      temporalCompatibility: 70,
      driftConsistency: 72,
      trajectoryConsistency: 70
    },
    closestApproachDistanceKm: 14.2,
    closestApproachTime: '08 Sept 2026, 06:20 UTC',
    currentSpeedKnots: 12.2,
    currentHeadingDeg: 285,
    courseAnomalyNotes: 'Crossed outer western periphery of AOI; standard deep-draft passage.',
    evidenceSummary: [
      'Spatial Proximity (60/100): Closest approach 14.2 km west of probable origin zone.',
      'Temporal Alignment (70/100): Passed at 06:20 UTC, at the very beginning of the calculated release window.',
      'Drift Consistency (72/100): Cross-wind heading; oil drift trajectory makes primary release from this vessel less probable.',
      'Trajectory Consistency (70/100): Consistent speed and direction on standard transit lane.'
    ],
    color: '#A855F7', // Purple
    trajectory: [
      { timestamp: '08 Sept 04:30 UTC', lat: 18.150, lng: 71.180, speedKnots: 12.1, headingDeg: 285, distanceToOriginKm: 28.6 },
      { timestamp: '08 Sept 06:20 UTC', lat: 18.250, lng: 70.840, speedKnots: 12.2, headingDeg: 285, distanceToOriginKm: 14.2 }, // Closest approach
      { timestamp: '08 Sept 08:00 UTC', lat: 18.320, lng: 70.520, speedKnots: 12.3, headingDeg: 285, distanceToOriginKm: 47.5 },
      { timestamp: '08 Sept 10:00 UTC', lat: 18.420, lng: 70.120, speedKnots: 12.2, headingDeg: 285, distanceToOriginKm: 90.1 },
      { timestamp: '08 Sept 14:22 UTC', lat: 18.600, lng: 69.350, speedKnots: 12.4, headingDeg: 285, distanceToOriginKm: 172.0 }
    ]
  }
];
