export interface SARContact {
  id: string;
  code: string;
  detectionType: string;        // e.g. "CFAR Radar Hard-Target"
  position: [number, number];   // [lat, lng]
  aisMatch: 'None' | 'Correlated' | 'Ambiguous';
  signalConfidence: string;     // e.g. "High (SNR +14.8 dB)"
  radarCrossSectionM2: number;  // RCS estimate
  estimatedLengthM: number;
  detectedTime: string;
  status: 'Requires Investigation' | 'Correlated' | 'Dismissed';
  distanceToOriginKm: number;
  possibleExplanations: string[];
  investigatorNotes: string;
}
