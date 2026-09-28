import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Eye, Crosshair, Ship, Wind } from 'lucide-react';
import { SpillFeature, MetoceanConditions, SpillForecast, ForecastZone } from '../../types/spill';
import { CandidateVessel } from '../../types/vessel';
import { SARContact } from '../../types/contact';


interface MaritimeMapProps {
  spill?: SpillFeature;
  metocean?: MetoceanConditions;
  forecast?: SpillForecast;
  vessels?: CandidateVessel[];
  unmatchedContacts?: SARContact[];
  selectedVesselId?: string;
  onSelectVessel?: (vesselId: string) => void;
  showBacktrack?: boolean;
  showVessels?: boolean;
  showContacts?: boolean;
  showForecast?: boolean;
  height?: string;
}


export const MaritimeMap: React.FC<MaritimeMapProps> = ({
  spill,
  metocean,
  forecast,
  vessels = [],
  unmatchedContacts = [],
  selectedVesselId,
  onSelectVessel,
  showBacktrack = true,
  showVessels = true,
  showContacts = true,
  showForecast = false,
  height = '580px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [layersVisible, setLayersVisible] = useState({
    spill: true,
    originEllipse: true,
    driftParticles: showBacktrack,
    aisTracks: showVessels,
    darkContacts: showContacts,
    forecastZones: showForecast,
  });

  // Selected forecast horizon for map display
  const [activeForecastHorizon, setActiveForecastHorizon] = useState<number>(24);


  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered around Arabian Sea AOI [18.42, 71.08]
    const map = L.map(mapContainerRef.current, {
      center: [18.42, 71.08],
      zoom: 9,
      zoomControl: true,
      attributionControl: true
    });

    // Dark Basemap (CartoDB Dark Matter with robust fallback)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Layers dynamically when props or visibility toggles change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // 1. Draw Spill Polygon
    if (spill && layersVisible.spill) {
      const spillPoly = L.polygon(spill.polygonCoordinates, {
        color: '#F59E0B',
        weight: 2,
        fillColor: '#F59E0B',
        fillOpacity: 0.45,
        dashArray: '3, 6'
      }).bindTooltip(
        `<b>Suspected Spill: ${spill.id}</b><br/>Area: ${spill.areaKm2} km²<br/>Confidence: ${spill.confidencePercent}%`,
        { permanent: false, direction: 'top', className: 'map-custom-tooltip' }
      );
      layerGroup.addLayer(spillPoly);

      // Spill Center Marker
      const centerCircle = L.circleMarker(spill.centerCoordinates, {
        radius: 5,
        color: '#F59E0B',
        fillColor: '#FFFFFF',
        fillOpacity: 0.9,
        weight: 2
      });
      layerGroup.addLayer(centerCircle);
    }

    // 2. Draw Probable Origin Uncertainty Ellipse & Center
    if (metocean && layersVisible.originEllipse) {
      // Circular approximation of the ±6.4 km uncertainty area
      const originCircle = L.circle(metocean.probableOriginCenter, {
        radius: metocean.originUncertaintyKm * 1000,
        color: '#EF4444',
        weight: 2,
        dashArray: '5, 8',
        fillColor: '#EF4444',
        fillOpacity: 0.12
      }).bindTooltip(
        `<b>Estimated Probable Origin</b><br/>Uncertainty: ±${metocean.originUncertaintyKm} km<br/>Release Window: ${metocean.estimatedReleaseWindow.start} – ${metocean.estimatedReleaseWindow.end}`,
        { permanent: false, direction: 'right', className: 'map-custom-tooltip' }
      );
      layerGroup.addLayer(originCircle);

      // Origin Centroid Marker
      const originMarker = L.circleMarker(metocean.probableOriginCenter, {
        radius: 6,
        color: '#EF4444',
        fillColor: '#EF4444',
        fillOpacity: 1,
        weight: 2
      }).bindTooltip(`<b>Origin Centroid</b><br/>18°19.2'N, 70°58.4'E`, { permanent: false });
      layerGroup.addLayer(originMarker);
    }

    // 3. Draw Backward Lagrangian Drift Particles
    if (metocean && layersVisible.driftParticles) {
      const driftLatLngs = metocean.driftParticles.map(p => [p.lat, p.lng] as [number, number]);
      const driftLine = L.polyline(driftLatLngs, {
        color: '#38BDF8',
        weight: 2,
        dashArray: '4, 4',
        opacity: 0.8
      });
      layerGroup.addLayer(driftLine);

      metocean.driftParticles.forEach(p => {
        const particleMarker = L.circleMarker([p.lat, p.lng], {
          radius: 4,
          color: '#38BDF8',
          fillColor: '#090D14',
          fillOpacity: 0.9,
          weight: 1.5
        }).bindTooltip(`<b>Lagrangian Drift Node</b><br/>Time: ${p.timestamp}<br/>Dispersion Radius: ±${p.varianceRadiusKm} km`, { permanent: false });
        layerGroup.addLayer(particleMarker);
      });
    }

    // 4. Draw Candidate AIS Vessel Tracks
    if (layersVisible.aisTracks && vessels.length > 0) {
      vessels.forEach(vessel => {
        const isSelected = selectedVesselId === vessel.id;
        const trackLatLngs = vessel.trajectory.map(w => [w.lat, w.lng] as [number, number]);

        // Vessel Polyline
        const trackLine = L.polyline(trackLatLngs, {
          color: vessel.color,
          weight: isSelected ? 4 : 2,
          opacity: isSelected ? 1 : 0.65
        });

        trackLine.on('click', () => {
          if (onSelectVessel) onSelectVessel(vessel.id);
        });

        layerGroup.addLayer(trackLine);

        // Vessel Current/Detection Position (Last Waypoint)
        const lastWp = vessel.trajectory[vessel.trajectory.length - 1];
        const vesselIcon = L.divIcon({
          className: 'vessel-div-icon',
          html: `
            <div style="
              width: 22px; 
              height: 22px; 
              border-radius: 50%; 
              background-color: ${vessel.color}; 
              border: 2px solid #FFFFFF; 
              box-shadow: 0 0 10px ${vessel.color};
              display: flex;
              align-items: center;
              justify-content: center;
              color: #090D14;
              font-size: 10px;
              font-weight: 800;
              cursor: pointer;
            ">
              ${vessel.id === 'vessel-a' ? 'A' : vessel.id === 'vessel-b' ? 'B' : 'C'}
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        const marker = L.marker([lastWp.lat, lastWp.lng], { icon: vesselIcon });
        marker.bindTooltip(
          `<b>${vessel.name}</b><br/>Score: ${vessel.attributionScore}/100<br/>Closest Approach: ${vessel.closestApproachDistanceKm} km at ${vessel.closestApproachTime}`,
          { direction: 'top' }
        );
        marker.on('click', () => {
          if (onSelectVessel) onSelectVessel(vessel.id);
        });
        layerGroup.addLayer(marker);

        // Highlight Closest Approach Point for selected or top vessel
        if (isSelected || vessel.id === 'vessel-a') {
          const closestWp = vessel.trajectory.reduce((prev, curr) => 
            (curr.distanceToOriginKm || 999) < (prev.distanceToOriginKm || 999) ? curr : prev
          );

          const cpaMarker = L.circleMarker([closestWp.lat, closestWp.lng], {
            radius: 7,
            color: '#FFFFFF',
            fillColor: vessel.color,
            fillOpacity: 1,
            weight: 2
          }).bindTooltip(`<b>CPA Point: ${vessel.name}</b><br/>Time: ${vessel.closestApproachTime}<br/>Dist to origin: ${vessel.closestApproachDistanceKm} km`, { permanent: false });
          layerGroup.addLayer(cpaMarker);
        }
      });
    }

    // 5. Draw Unmatched SAR Contact #SAR-017
    if (layersVisible.darkContacts && unmatchedContacts.length > 0) {
      unmatchedContacts.forEach(contact => {
        const contactIcon = L.divIcon({
          className: 'contact-div-icon',
          html: `
            <div style="
              width: 24px; 
              height: 24px; 
              border: 2px solid #EF4444; 
              box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
              background-color: rgba(239, 68, 68, 0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #EF4444;
              font-family: monospace;
              font-size: 10px;
              font-weight: 700;
              cursor: pointer;
            ">
              +
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const contactMarker = L.marker(contact.position, { icon: contactIcon });
        contactMarker.bindTooltip(
          `<b>UNMATCHED SAR CONTACT: #${contact.code}</b><br/>AIS Match: None<br/>Confidence: ${contact.signalConfidence}<br/>Status: ${contact.status}`,
          { direction: 'top' }
        );
        layerGroup.addLayer(contactMarker);
      });
    }

    // 6. Draw Forward Forecast Probability Zones
    if (forecast && layersVisible.forecastZones) {
      const horizonZones = forecast.zones.filter(z => z.timestepHours === activeForecastHorizon);

      // Color map by tier
      const tierColors: Record<ForecastZone['tier'], { stroke: string; fill: string; opacity: number }> = {
        high:   { stroke: '#10B981', fill: '#10B981', opacity: 0.22 },
        medium: { stroke: '#F59E0B', fill: '#F59E0B', opacity: 0.14 },
        low:    { stroke: '#38BDF8', fill: '#38BDF8', opacity: 0.07 },
      };

      // Draw from outermost (low) → innermost (high) so high sits on top
      [...horizonZones].reverse().forEach(zone => {
        const colors = tierColors[zone.tier];
        const zoneCircle = L.circle(zone.centerCoordinates, {
          radius: zone.radiusKm * 1000,
          color: colors.stroke,
          weight: zone.tier === 'high' ? 2 : 1,
          dashArray: zone.tier === 'low' ? '4, 8' : zone.tier === 'medium' ? '6, 5' : undefined,
          fillColor: colors.fill,
          fillOpacity: colors.opacity
        }).bindTooltip(
          `<b>🌊 ${zone.label}</b><br/>Probability: <strong>${zone.probabilityPercent}%</strong><br/>Spread Radius: ${zone.radiusKm} km<br/>Coverage Area: ${zone.areaKm2.toLocaleString()} km²`,
          { permanent: false, direction: 'right', className: 'map-custom-tooltip' }
        );
        layerGroup.addLayer(zoneCircle);
      });

      // Draw forward drift track
      const fwdParticles = forecast.particles.filter(p => p.timestepHours <= activeForecastHorizon);
      const fwdLatLngs = fwdParticles.map(p => [p.lat, p.lng] as [number, number]);
      if (fwdLatLngs.length > 1) {
        const fwdLine = L.polyline(fwdLatLngs, {
          color: '#10B981',
          weight: 2,
          dashArray: '6, 4',
          opacity: 0.9
        });
        layerGroup.addLayer(fwdLine);
      }

      // Draw forecast centroid nodes
      fwdParticles.forEach(p => {
        const pMarker = L.circleMarker([p.lat, p.lng], {
          radius: p.timestepHours === 0 ? 6 : 5,
          color: '#10B981',
          fillColor: p.timestepHours === activeForecastHorizon ? '#10B981' : '#090D14',
          fillOpacity: p.timestepHours === activeForecastHorizon ? 0.9 : 0.8,
          weight: 2
        }).bindTooltip(
          `<b>Forecast Node T+${p.timestepHours}h</b><br/>${p.timestamp}<br/>Probability: ${p.probabilityPercent}%<br/>Spread Radius: ±${p.spreadRadiusKm} km`,
          { permanent: false }
        );
        layerGroup.addLayer(pMarker);
      });
    }

  }, [spill, metocean, forecast, vessels, unmatchedContacts, selectedVesselId, layersVisible, activeForecastHorizon]);


  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
      {/* Layer Visibility Floating Control Bar */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 500,
        backgroundColor: 'rgba(13, 19, 31, 0.92)',
        backdropFilter: 'blur(4px)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-sm)',
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        fontSize: '11px'
      }}>
        <div style={{ fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={13} color="var(--accent-cyan)" />
          <span>Investigation Layers</span>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>
          <input
            type="checkbox"
            checked={layersVisible.spill}
            onChange={(e) => setLayersVisible({ ...layersVisible, spill: e.target.checked })}
            style={{ accentColor: 'var(--accent-amber)' }}
          />
          <span style={{ color: '#F59E0B' }}>●</span> Suspected Spill Polygon (18.7 km²)
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>
          <input
            type="checkbox"
            checked={layersVisible.originEllipse}
            onChange={(e) => setLayersVisible({ ...layersVisible, originEllipse: e.target.checked })}
            style={{ accentColor: '#EF4444' }}
          />
          <span style={{ color: '#EF4444' }}>◌</span> Probable Origin (±6.4 km)
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>
          <input
            type="checkbox"
            checked={layersVisible.driftParticles}
            onChange={(e) => setLayersVisible({ ...layersVisible, driftParticles: e.target.checked })}
            style={{ accentColor: 'var(--accent-cyan)' }}
          />
          <span style={{ color: '#38BDF8' }}>--</span> Lagrangian Drift Vector
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>
          <input
            type="checkbox"
            checked={layersVisible.aisTracks}
            onChange={(e) => setLayersVisible({ ...layersVisible, aisTracks: e.target.checked })}
            style={{ accentColor: '#38BDF8' }}
          />
          <span>🚢</span> AIS Candidate Trajectories
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>
          <input
            type="checkbox"
            checked={layersVisible.darkContacts}
            onChange={(e) => setLayersVisible({ ...layersVisible, darkContacts: e.target.checked })}
            style={{ accentColor: '#EF4444' }}
          />
          <span style={{ color: '#EF4444' }}>✛</span> Unmatched Contact (#SAR-017)
        </label>

        {forecast && (
          <>
            <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '4px', paddingTop: '4px', fontSize: '10px', color: 'var(--accent-emerald)', fontWeight: 600, textTransform: 'uppercase' }}>
              🌊 Forecast Spread
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                checked={layersVisible.forecastZones}
                onChange={(e) => setLayersVisible({ ...layersVisible, forecastZones: e.target.checked })}
                style={{ accentColor: '#10B981' }}
              />
              <span style={{ color: '#10B981' }}>◎</span> Probability Zones
            </label>
            {layersVisible.forecastZones && (
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '2px' }}>
                {forecast.forecastHorizons.map(h => (
                  <button
                    key={h}
                    onClick={() => setActiveForecastHorizon(h)}
                    style={{
                      padding: '2px 6px',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      backgroundColor: activeForecastHorizon === h ? '#10B981' : 'var(--bg-card-muted)',
                      color: activeForecastHorizon === h ? '#090D14' : 'var(--text-secondary)',
                      border: '1px solid ' + (activeForecastHorizon === h ? '#10B981' : 'var(--border-medium)'),
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontWeight: activeForecastHorizon === h ? 700 : 400
                    }}
                  >
                    T+{h}h
                  </button>
                ))}
              </div>
            )}
          </>
        )}

      </div>

      {/* Map Element */}
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: height,
          backgroundColor: '#0A0F18'
        }}
      />
    </div>
  );
};
