import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { regionalPledges } from '../data/regionalPledges';

import namyangjuGeoJson from '../data/namyangju.json';

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const VWORLD_KEY = '4495C881-6BD2-35F5-85E2-BD7991D2B1F6';

interface MapComponentProps {
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
}

// Coordinate for Namyangju center
const NAMYANGJU_CENTER: [number, number] = [37.636, 127.216];

function MapController({ selectedRegion }: { selectedRegion: string | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedRegion && namyangjuGeoJson && namyangjuGeoJson.features) {
      const feature = (namyangjuGeoJson as any).features.find((f: any) => {
         const name = f.properties.temp; // "남양주시 와부읍"
         return name.includes(selectedRegion);
      });
      if (feature) {
        const layer = L.geoJSON(feature);
        const bounds = layer.getBounds();
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      }
    } else if (!selectedRegion) {
       map.setView(NAMYANGJU_CENTER, 11);
    }
  }, [selectedRegion, map]);
  
  return null;
}

export function MapComponent({ selectedRegion, onRegionSelect }: MapComponentProps) {
  const regionColors: Record<string, string> = {
    '진접읍': '#06b6d4',
    '오남읍': '#8b5cf6',
    '수동면': '#f97316',
    '별내면': '#14b8a6',
    '별내동': '#6366f1',
    '퇴계원읍': '#ec4899',
    '진건읍': '#ef4444',
    '다산1동': '#f59e0b',
    '다산2동': '#3b82f6',
    '양정동': '#10b981',
    '금곡동': '#14b8a6',
    '평내동': '#f59e0b',
    '호평동': '#6366f1',
    '화도읍': '#84cc16',
    '와부읍': '#3b82f6',
    '조안면': '#10b981',
  };

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const rawName: string = feature.properties.temp || ''; // e.g. "남양주시 와부읍"
    const name = rawName.replace('남양주시 ', '');
    
    // Bind tooltip
    layer.bindTooltip(name, {
      permanent: true,
      direction: 'center',
      className: 'map-label'
    });

    layer.on({
      click: () => {
        // Find matching region in our data
        const matched = regionalPledges.find(r => r.region.includes(name) || name.includes(r.region));
        if (matched) {
          onRegionSelect(matched.region);
        }
      },
      mouseover: (e) => {
         const l = e.target as L.Path;
         const baseColor = regionColors[name] || '#3b82f6';
         l.setStyle({
           weight: 3,
           color: baseColor,
           fillOpacity: 0.5
         });
         l.bringToFront();
      },
      mouseout: (e) => {
        const l = e.target as L.Path;
        const isSelected = selectedRegion ? (selectedRegion.includes(name) || name.includes(selectedRegion)) : false;
        const baseColor = regionColors[name] || '#64748b';
        l.setStyle({
          weight: isSelected ? 3 : 2,
          color: baseColor,
          fillOpacity: isSelected ? 0.4 : 0.1
        });
      }
    });
  };

  const style = (feature: any) => {
    const rawName: string = feature.properties.temp || '';
    const name = rawName.replace('남양주시 ', '');
    const isSelected = selectedRegion ? (selectedRegion.includes(name) || name.includes(selectedRegion)) : false;
    const baseColor = regionColors[name] || '#64748b';
    
    return {
      fillColor: baseColor,
      weight: isSelected ? 3 : 2,
      opacity: 1,
      color: baseColor,
      fillOpacity: isSelected ? 0.4 : 0.1
    };
  };

  return (
    <div className="w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 z-10 relative">
      <MapContainer 
        center={NAMYANGJU_CENTER} 
        zoom={11} 
        scrollWheelZoom={false}
        className="w-full h-full z-0 font-sans"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.vworld.kr/">VWorld</a>'
          url={`https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Base/{z}/{y}/{x}.png`}
        />
        <GeoJSON 
          data={namyangjuGeoJson as any} 
          style={style} 
          onEachFeature={onEachFeature}
        />
        <MapController selectedRegion={selectedRegion} />
      </MapContainer>
    </div>
  );
}
