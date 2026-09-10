import React, { useState, useRef, useEffect } from 'react';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RefreshCcw, 
  Sliders, 
  Eye, 
  Info,
  Maximize2
} from 'lucide-react';
import { SpillFeature } from '../../types/spill';

interface SARViewerProps {
  spill: SpillFeature;
  onVerify?: () => void;
  isVerified?: boolean;
}

export const SARViewer: React.FC<SARViewerProps> = ({ spill, onVerify, isVerified }) => {
  const [viewMode, setViewMode] = useState<'original' | 'detection' | 'overlay'>('overlay');
  const [maskOpacity, setMaskOpacity] = useState<number>(0.75);
  const [contrastBoost, setContrastBoost] = useState<number>(1.2);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Procedural SAR Backscatter and Slick Generator on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 1. Create Base Sea Surface Speckle (Rayleigh Distributed Radar Returns)
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Center coordinates for slick in pixel space
    const cx = width * 0.52;
    const cy = height * 0.48;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;

        // Base ocean clutter: Mean ~110 with speckle noise
        let noise = (Math.random() + Math.random() + Math.random()) / 3;
        let ambient = (105 + noise * 60) * contrastBoost;

        // Long swell waves simulation (direction 240 deg)
        const swell = Math.sin((x * 0.04 + y * 0.02) * Math.PI) * 12;
        ambient += swell;

        // Distance from slick center (elongated ellipse shape)
        const dx = (x - cx) * 0.85 + (y - cy) * 0.55;
        const dy = -(x - cx) * 0.55 + (y - cy) * 0.85;
        const normDist = Math.sqrt((dx / 180) ** 2 + (dy / 70) ** 2);

        // Slick damping calculation
        let isInsideSlick = normDist < 1.0;
        let edgeSoftness = Math.max(0, Math.min(1, (1.2 - normDist) / 0.2));

        if (viewMode === 'original') {
          // In raw SAR, oil dampens capillary waves -> significant backscatter reduction (-6 dB)
          if (normDist < 1.0) {
            ambient = ambient * (0.35 + (normDist * 0.15)); // Dark anomaly
          }
          data[idx] = ambient;
          data[idx + 1] = ambient;
          data[idx + 2] = ambient;
          data[idx + 3] = 255;
        } else if (viewMode === 'detection') {
          // Binary / False-Color segmentation mask
          if (isInsideSlick) {
            data[idx] = 245;      // Amber-orange high contrast mask
            data[idx + 1] = 158;
            data[idx + 2] = 11;
            data[idx + 3] = Math.floor(255 * edgeSoftness);
          } else {
            data[idx] = 15;
            data[idx + 1] = 23;
            data[idx + 2] = 42;
            data[idx + 3] = 255;
          }
        } else {
          // 'overlay': Blended radar backscatter + fluorescent segmentation overlay
          let gray = ambient;
          if (normDist < 1.0) {
            gray = ambient * (0.35 + (normDist * 0.15));
          }

          if (isInsideSlick) {
            // Blend amber overlay
            data[idx] = Math.min(255, gray * (1 - maskOpacity) + 245 * maskOpacity);
            data[idx + 1] = Math.min(255, gray * (1 - maskOpacity) + 158 * maskOpacity);
            data[idx + 2] = Math.min(255, gray * (1 - maskOpacity) + 11 * maskOpacity);
          } else {
            data[idx] = gray;
            data[idx + 1] = gray;
            data[idx + 2] = gray;
          }
          data[idx + 3] = 255;
        }

        // Add bright point targets (ships / offshore rigs) as high-intensity pixels
        if (
          (Math.abs(x - 280) < 3 && Math.abs(y - 180) < 3) ||
          (Math.abs(x - 620) < 3 && Math.abs(y - 390) < 3)
        ) {
          data[idx] = 255;
          data[idx + 1] = 255;
          data[idx + 2] = 255;
          data[idx + 3] = 255;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Draw Vector Contours when overlay is active
    if (viewMode === 'overlay' || viewMode === 'detection') {
      ctx.save();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, 180, 70, Math.PI / 5.5, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Spill Label Marker
      ctx.fillStyle = '#0B0F17';
      ctx.fillRect(cx - 70, cy - 85, 140, 24);
      ctx.strokeStyle = '#F59E0B';
      ctx.setLineDash([]);
      ctx.strokeRect(cx - 70, cy - 85, 140, 24);

      ctx.fillStyle = '#F59E0B';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ANOMALY: 18.7 km²', cx, cy - 69);
      ctx.restore();
    }

  }, [viewMode, maskOpacity, contrastBoost]);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Viewer Header Controls */}
      <div style={{
        padding: '12px 18px',
        backgroundColor: 'var(--bg-card-muted)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            SAR Imagery Viewer (Sentinel-1 C-SAR IW GRD)
          </span>
          <span className="badge badge-cyan" style={{ marginLeft: '6px' }}>VV Polarized σ₀</span>
        </div>

        {/* Mode Selector Pill Buttons */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--bg-app)',
          padding: '3px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            className={`btn btn-sm ${viewMode === 'original' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', padding: '4px 12px' }}
            onClick={() => setViewMode('original')}
          >
            Original SAR
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'detection' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', padding: '4px 12px' }}
            onClick={() => setViewMode('detection')}
          >
            Detection Mask
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'overlay' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', padding: '4px 12px' }}
            onClick={() => setViewMode('overlay')}
          >
            Blended Overlay
          </button>
        </div>

        {/* Adjustments */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {viewMode === 'overlay' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span>Opacity:</span>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={maskOpacity}
                onChange={(e) => setMaskOpacity(parseFloat(e.target.value))}
                style={{ width: '80px', accentColor: 'var(--accent-amber)' }}
              />
              <span className="mono">{Math.round(maskOpacity * 100)}%</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2.0))}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => { setZoomLevel(1); setContrastBoost(1.2); }}
              title="Reset View"
            >
              <RefreshCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '520px',
        backgroundColor: '#070B12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.15s ease-out',
          boxShadow: '0 0 40px rgba(0,0,0,0.8)',
          position: 'relative'
        }}>
          <canvas
            ref={canvasRef}
            width={840}
            height={500}
            style={{
              display: 'block',
              maxWidth: '100%',
              borderRadius: '2px',
              border: '1px solid var(--border-medium)'
            }}
          />

          {/* Graticule Coordinates HUD Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            backgroundColor: 'rgba(9, 13, 20, 0.85)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 10px',
            fontSize: '11px',
            color: 'var(--text-secondary)'
          }}>
            <div className="mono">Acquisition: {spill.acquisitionTime}</div>
            <div className="mono" style={{ color: 'var(--accent-amber)' }}>
              Center: {spill.centerCoordinates[0]}°N, {spill.centerCoordinates[1]}°E
            </div>
          </div>

          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(9, 13, 20, 0.85)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 10px',
            fontSize: '11px',
            color: 'var(--text-secondary)'
          }}>
            <div className="mono">Contrast: <span style={{ color: '#F43F5E' }}>{spill.backscatterContrastDb} dB</span></div>
            <div className="mono">Model: <span style={{ color: 'var(--accent-cyan)' }}>{spill.modelIdentifier}</span></div>
          </div>
        </div>
      </div>

      {/* Hero Metrics & Verification Footer Bar */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Status
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block' }} />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#F87171' }}>
                SUSPECTED SPILL DETECTED
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Spill Area
            </div>
            <div className="mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {spill.areaKm2} <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>km²</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Detection Confidence
            </div>
            <div className="mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '2px' }}>
              {spill.confidencePercent}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Model
            </div>
            <div className="mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-cyan)', marginTop: '4px' }}>
              {spill.modelIdentifier}
            </div>
          </div>
        </div>

        {/* Verification Action Button */}
        <div>
          {onVerify && (
            <button
              className={`btn btn-lg ${isVerified ? 'btn-emerald' : 'btn-amber'}`}
              onClick={onVerify}
            >
              <Eye size={18} />
              <span>{isVerified ? 'INCIDENT VERIFIED ✓ (PROCEED TO BACKTRACK)' : 'VERIFY INCIDENT'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
