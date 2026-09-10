import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Satellite, 
  Play, 
  Layers, 
  Sliders, 
  Info,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { AOIDefinition, SensorConfig } from '../types/investigation';

export const NewInvestigation: React.FC = () => {
  const { startNewInvestigation } = useInvestigation();

  const [selectedAOI, setSelectedAOI] = useState<string>('mumbai-high');
  const [incidentDate, setIncidentDate] = useState<string>('2026-09-08');
  const [startTime, setStartTime] = useState<string>('04:00');
  const [endTime, setEndTime] = useState<string>('16:00');
  const [investigationMode, setInvestigationMode] = useState<string>('comprehensive');
  const [sensorId, setSensorId] = useState<string>('s1a-iw');

  const aoiPresets: Record<string, AOIDefinition> = {
    'mumbai-high': {
      name: 'Mumbai High - Saurashtra Offshore Sector',
      region: 'Arabian Sea (West Coast EEZ)',
      bounds: [[18.0, 70.4], [19.2, 71.8]],
      center: [18.52, 71.18],
      areaSqKm: 14850
    },
    'paradip': {
      name: 'Paradip Port Approaches',
      region: 'Bay of Bengal (East Coast)',
      bounds: [[19.8, 86.4], [20.5, 87.2]],
      center: [20.15, 86.8],
      areaSqKm: 6200
    },
    'tuticorin': {
      name: 'Gulf of Mannar Deepwater Route',
      region: 'Gulf of Mannar',
      bounds: [[8.4, 78.2], [9.1, 78.9]],
      center: [8.75, 78.55],
      areaSqKm: 4800
    }
  };

  const sensorOptions: Record<string, SensorConfig> = {
    's1a-iw': {
      id: 'S1A-IW',
      name: 'Sentinel-1A C-SAR (Copernicus)',
      mode: 'Interferometric Wide Swath (IW GRD)',
      orbit: 'Pass 147 (Descending)',
      resolution: '10m x 10m Spatial Resolution',
      polarization: 'VV + VH Dual-Pol',
      incidenceAngle: '34.2° Mid-Swath'
    },
    'risat-1a': {
      id: 'RISAT-1A',
      name: 'EOS-04 / RISAT-1A (ISRO)',
      mode: 'Fine Resolution Stripmap (FRS-1)',
      orbit: 'Pass 082 (Ascending)',
      resolution: '3m Spatial Resolution',
      polarization: 'Circular Hybrid Polarimetry',
      incidenceAngle: '38.5°'
    }
  };

  const currentAOI = aoiPresets[selectedAOI];
  const currentSensor = sensorOptions[sensorId];

  const handleStart = () => {
    startNewInvestigation({
      aoi: currentAOI,
      timeWindow: {
        start: `${incidentDate} ${startTime} UTC`,
        end: `${incidentDate} ${endTime} UTC`
      },
      sensor: currentSensor
    });
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Initiate New Satellite Investigation Case
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Define the surveillance Area of Interest (AOI), temporal parameters, SAR sensor mode, and analysis pipeline
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left Column: Form Configuration */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Sliders size={16} color="var(--accent-cyan)" />
              <span>Surveillance Parameters</span>
            </div>
            <span className="badge badge-cyan">CASE ID: IND-0261 (AUTO)</span>
          </div>

          {/* AOI Selection */}
          <div className="form-group">
            <label className="form-label">Surveillance Area of Interest (AOI)</label>
            <select
              className="form-control"
              value={selectedAOI}
              onChange={(e) => setSelectedAOI(e.target.value)}
            >
              <option value="mumbai-high">Arabian Sea: Mumbai High - Saurashtra Corridor (Primary)</option>
              <option value="paradip">Bay of Bengal: Paradip Port Approaches</option>
              <option value="tuticorin">Gulf of Mannar: Tuticorin Shipping Lane</option>
            </select>
          </div>

          {/* Temporal Window */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Incident Date</label>
              <input
                type="date"
                className="form-control"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Window Start</label>
              <input
                type="text"
                className="form-control mono"
                value={startTime + ' UTC'}
                onChange={(e) => setStartTime(e.target.value.replace(' UTC', ''))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Window End</label>
              <input
                type="text"
                className="form-control mono"
                value={endTime + ' UTC'}
                onChange={(e) => setEndTime(e.target.value.replace(' UTC', ''))}
              />
            </div>
          </div>

          {/* SAR Imagery / Sensor Source */}
          <div className="form-group">
            <label className="form-label">Satellite SAR Data Source</label>
            <select
              className="form-control"
              value={sensorId}
              onChange={(e) => setSensorId(e.target.value)}
            >
              <option value="s1a-iw">Sentinel-1A C-SAR — Interferometric Wide (IW GRD L1)</option>
              <option value="risat-1a">ISRO EOS-04 / RISAT-1A — Fine Resolution Stripmap (FRS-1)</option>
            </select>
          </div>

          {/* Investigation Mode */}
          <div className="form-group">
            <label className="form-label">Forensic Analysis Mode</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="mode"
                  checked={investigationMode === 'comprehensive'}
                  onChange={() => setInvestigationMode('comprehensive')}
                  style={{ accentColor: 'var(--accent-cyan)', marginTop: '3px' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    End-to-End Forensic Attribution (Recommended)
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Includes SAR radiometric calibration, U-Net spill segmentation, metocean Lagrangian backtracking, AIS trajectory correlation, and CFAR dark contact analysis.
                  </div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="mode"
                  checked={investigationMode === 'rapid'}
                  onChange={() => setInvestigationMode('rapid')}
                  style={{ accentColor: 'var(--accent-cyan)', marginTop: '3px' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Rapid Anomaly Verification Only
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Generates spill segmentation mask and damping metrics without deep vessel track correlation.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              onClick={handleStart}
            >
              <Play size={16} fill="currentColor" />
              <span>START INVESTIGATION (CASE IND-0261)</span>
            </button>
          </div>
        </div>

        {/* Right Column: AOI Geospatial Preview & Sensor Specifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* AOI Bounding Box Simulation Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <MapPin size={16} color="var(--accent-amber)" />
                <span>Geographic Extent Preview</span>
              </div>
              <span className="badge badge-muted mono">{currentAOI.areaSqKm.toLocaleString()} km²</span>
            </div>

            <div style={{
              height: '240px',
              backgroundColor: '#070B12',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-medium)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Simulated Map Graticule Grid */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />

              {/* Bounding Box Outline */}
              <div style={{
                width: '180px',
                height: '140px',
                border: '2px dashed var(--accent-cyan)',
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <Compass size={24} color="var(--accent-cyan)" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px' }}>
                  {currentAOI.region}
                </span>
                <span className="mono" style={{ fontSize: '10px', color: 'var(--accent-amber)' }}>
                  Centroid: {currentAOI.center[0]}°N, {currentAOI.center[1]}°E
                </span>

                {/* Corner Coordinates */}
                <span className="mono" style={{ position: 'absolute', top: -14, left: -4, fontSize: '9px', color: 'var(--text-muted)' }}>
                  {currentAOI.bounds[1][0]}°N, {currentAOI.bounds[0][1]}°E
                </span>
                <span className="mono" style={{ position: 'absolute', bottom: -14, right: -4, fontSize: '9px', color: 'var(--text-muted)' }}>
                  {currentAOI.bounds[0][0]}°N, {currentAOI.bounds[1][1]}°E
                </span>
              </div>
            </div>

            <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <strong>Coverage Sector: </strong> {currentAOI.name} covers primary deep-draft tanker navigation corridor off Western India.
            </div>
          </div>

          {/* Sensor Telemetry Specs */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Satellite size={16} color="var(--accent-cyan)" />
                <span>Sensor Product Specifications</span>
              </div>
              <span className="badge badge-emerald">Calibrated</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Satellite Payload</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{currentSensor.name}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Acquisition Mode</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{currentSensor.mode}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Polarization Channels</span>
                <div className="mono" style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{currentSensor.polarization}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Ground Resolution</span>
                <div className="mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{currentSensor.resolution}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
