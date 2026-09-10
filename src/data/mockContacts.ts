import { SARContact } from '../types/contact';

export const MOCK_CONTACTS_IND_0261: SARContact[] = [
  {
    id: 'contact-sar-017',
    code: 'SAR-017',
    detectionType: 'CFAR Radar Hard-Target Anomaly',
    position: [18.402, 71.085], // Located in the corridor between the origin and the slick
    aisMatch: 'None',
    signalConfidence: 'High (SNR +14.8 dB)',
    radarCrossSectionM2: 485,
    estimatedLengthM: 85,
    detectedTime: '08 Sept 2026, 14:22:15 UTC',
    status: 'Requires Investigation',
    distanceToOriginKm: 9.8,
    possibleExplanations: [
      'AIS transmission coverage gap or temporal slot collision',
      'Receiver antenna height limitation or terrestrial dead zone',
      'Non-cooperative craft / transponder intentionally inactive',
      'Stationary offshore service craft or uncrewed platform support vessel'
    ],
    investigatorNotes: 'Hard radar return confirmed across both VV and VH channels. Zero AIS broadcasts registered within a 25 km radius across the preceding 12-hour surveillance window. Flagged as a priority investigative lead; requires corroboration with optical/patrol assets.'
  }
];
