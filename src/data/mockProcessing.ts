import { PipelineStage } from '../types/investigation';

export const INITIAL_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'stage-1',
    name: 'SAR Acquisition',
    shortDesc: 'Ingesting Sentinel-1 C-SAR IW GRD Dual-Pol (VV/VH) L1 Product',
    status: 'pending',
    durationMs: 900,
    logMessages: [
      'Querying Copernicus Open Access Hub for AOI footprint [18.2N-19.5N, 70.5E-72.0E]',
      'Located orbit pass #147 (Descending node) acquired 08-SEP-2026 14:22:15 UTC',
      'Validating checksum SHA-256 for SAFE product package S1A_IW_GRDH_1SDV_20260908T142215',
      'SAR granule successfully downloaded (824 MB) and mounted into processing cache'
    ]
  },
  {
    id: 'stage-2',
    name: 'Radiometric Calibration',
    shortDesc: 'Converting raw Digital Numbers (DN) to Sigma Nought (σ₀ dB)',
    status: 'pending',
    durationMs: 800,
    logMessages: [
      'Extracting calibration lookup vectors from product XML annotations',
      'Computing Sigma Nought (σ₀) for VV and VH polarizations',
      'Applying thermal noise removal for cross-polarization channel',
      'Dynamic range standardized: VV [-26.4 dB to +2.1 dB], VH [-32.8 dB to -8.4 dB]'
    ]
  },
  {
    id: 'stage-3',
    name: 'Speckle Filtering',
    shortDesc: 'Refined Lee speckle suppression with edge preservation',
    status: 'pending',
    durationMs: 850,
    logMessages: [
      'Initializing Refined Lee adaptive spatial filter (7x7 window)',
      'Preserving linear sea-surface roughness boundaries and metallic point targets',
      'Equivalent Number of Looks (ENL) improved from 4.2 to 14.8',
      'Speckle noise index reduced by 68.2%'
    ]
  },
  {
    id: 'stage-4',
    name: 'Land Masking',
    shortDesc: 'GSHHG coastline buffer & bathymetric shoreline masking',
    status: 'pending',
    durationMs: 700,
    logMessages: [
      'Applying Global Self-consistent Hierarchical High-resolution Geography mask',
      'Adding 1.5 km seaward safety buffer along Maharashtra coastal baseline',
      'Masked 12,400 terrestrial pixels; 100% open water coverage retained in AOI',
      'SRTM 30m digital elevation model co-registered for shadow rejection'
    ]
  },
  {
    id: 'stage-5',
    name: 'Tiling & Pyramids',
    shortDesc: '512x512 multi-scale image tiling with 15% spatial overlap',
    status: 'pending',
    durationMs: 750,
    logMessages: [
      'Decomposing calibrated σ₀ raster into 64 inference tiles',
      'Spatial overlap parameter set to 64 pixels (12.5%) to eliminate tile boundary artifacts',
      'Building Cloud Optimized GeoTIFF (COG) overview pyramids',
      'Batch ready for deep learning inference'
    ]
  },
  {
    id: 'stage-6',
    name: 'Spill Detection',
    shortDesc: 'U-Net semantic segmentation for oil dampening anomalies',
    status: 'pending',
    durationMs: 1100,
    logMessages: [
      'Executing SAR-Segmentation-v1.4 deep residual U-Net model',
      'Evaluating low-backscatter dampening signature (capillary wave suppression)',
      'Segmented contiguous dark-spot anomaly: Area = 18.72 km²',
      'Mean backscatter damping contrast: -6.2 dB relative to ambient background',
      'Ensemble model confidence: 91.4% (Threshold: >80%)'
    ]
  },
  {
    id: 'stage-7',
    name: 'Environmental Analysis',
    shortDesc: 'INCOIS & ECMWF ERA5 wind/current Lagrangian backtracking',
    status: 'pending',
    durationMs: 950,
    logMessages: [
      'Fetching ECMWF ERA5 reanalysis: Surface wind 12.4 kts @ 240° (SW)',
      'Fetching INCOIS ocean current field: Surface vector 0.45 m/s @ 070° (ENE)',
      'Executing 8-hour backward Lagrangian trajectory particle dispersal model',
      'Estimated probable release centroid: 18°19.2\'N, 70°58.4\'E (Uncertainty ±6.4 km)',
      'Derived release window: 08-SEP-2026 06:00 to 10:00 UTC'
    ]
  },
  {
    id: 'stage-8',
    name: 'AIS Correlation',
    shortDesc: 'Correlating historical vessel trajectories through origin window',
    status: 'pending',
    durationMs: 1000,
    logMessages: [
      'Ingesting terrestrial & satellite AIS positional feeds for Arabian Sea corridor',
      'Screening 142 vessels active in AOI during 08-SEP-2026 04:00-14:00 UTC',
      'Spatial/temporal bounding box filter matched 3 commercial merchant vessels',
      'Extracted high-density GPS track waypoints and speed/course telemetry'
    ]
  },
  {
    id: 'stage-9',
    name: 'Evidence Generation',
    shortDesc: 'Multi-factor attribution scoring & dark contact CFAR extraction',
    status: 'pending',
    durationMs: 800,
    logMessages: [
      'Running Constant False Alarm Rate (CFAR) detector for non-AIS radar targets',
      'Identified 1 unmatched radar contact (#SAR-017) with high SNR (+14.8 dB)',
      'Synthesizing multi-factor attribution matrix for candidate vessels',
      'Generated forensic investigation package for Case IND-0261'
    ]
  }
];
