import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { StudySpot, University } from '../types/spot';
import { useLanguage } from '../i18n/LanguageContext';
import { LocateFixed } from 'lucide-react';

interface MapViewProps {
  spots: StudySpot[];
  university: University;
  selectedSpot: StudySpot | null;
  onSelectSpot: (spot: StudySpot) => void;
  className?: string;
}

export const MapView: React.FC<MapViewProps> = ({
  spots,
  university,
  selectedSpot,
  onSelectSpot,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const { isKhmer, t } = useLanguage();

  // Unified Map Lifecycle: initialize & update
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Safety check for React 18 StrictMode: remove previous map if container is re-used
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    if ((container as any)._leaflet_id) {
      delete (container as any)._leaflet_id;
    }

    // Initialize Map with OpenStreetMap Standard Layer (Zero API keys required)
    const map = L.map(container, {
      center: [university.lat, university.lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    // Zoom Control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Official OpenStreetMap tiles - 100% Free, NO API KEY NEEDED
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Create markers layer
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    // Invalidate size immediately and after layout settles
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 80);
    const t2 = setTimeout(() => map.invalidateSize(), 250);

    // Resize listener
    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if ((container as any)._leaflet_id) {
        delete (container as any)._leaflet_id;
      }
    };
  }, []);

  // Update markers whenever spots, university, selectedSpot, or language changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    // 1. Minimal University Marker with #052B39 Deep Navy Accent
    const uniIcon = L.divIcon({
      className: 'custom-uni-marker',
      html: `
        <div style="transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div style="background-color: #052B39; color: #EDE7D9; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(5,43,57,0.4); border: 2px solid #EDE7D9;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
          </div>
          <div style="background-color: #052B39; color: #EDE7D9; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 9999px; margin-top: 3px; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.25); border: 1px solid rgba(237,231,217,0.35);">
            🎓 ${university.shortName}
          </div>
        </div>
      `,
      iconSize: [40, 48],
      iconAnchor: [20, 24],
    });

    const uniMarker = L.marker([university.lat, university.lng], { icon: uniIcon })
      .bindPopup(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; padding: 4px; background: #FAF7F2;">
          <strong style="color: #052B39; font-size: 13px;">${isKhmer ? university.nameKh : university.name}</strong>
          <div style="color: #736B60; margin-top: 2px;">Campus Center</div>
        </div>
      `);
    layer.addLayer(uniMarker);

    // 2. Minimalist Study Spot Markers with #052B39
    spots.forEach((spot) => {
      const isSelected = selectedSpot?.id === spot.id;

      const spotIcon = L.divIcon({
        className: 'custom-spot-marker',
        html: `
          <div style="transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <div style="background-color: ${isSelected ? '#052B39' : '#FAF7F2'}; color: ${isSelected ? '#EDE7D9' : '#052B39'}; width: ${isSelected ? '34px' : '28px'}; height: ${isSelected ? '34px' : '28px'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 10px rgba(0,0,0,0.25); border: 2px solid ${isSelected ? '#EDE7D9' : '#052B39'}; transition: all 0.2s;">
              <svg width="${isSelected ? '16' : '13'}" height="${isSelected ? '16' : '13'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>
            </div>
            <div style="background-color: ${isSelected ? '#052B39' : '#FAF7F2'}; color: ${isSelected ? '#EDE7D9' : '#052B39'}; font-size: 10px; font-weight: 700; padding: 1.5px 6px; border-radius: 9999px; margin-top: 2px; white-space: nowrap; box-shadow: 0 2px 5px rgba(0,0,0,0.15); border: 1px solid ${isSelected ? '#EDE7D9' : 'rgba(5,43,57,0.3)'};">
              ${spot.priceLevel} · ${spot.wifiSpeedMbps}M
            </div>
          </div>
        `,
        iconSize: [36, 46],
        iconAnchor: [18, 23],
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: spotIcon });

      marker.on('click', () => {
        onSelectSpot(spot);
      });

      layer.addLayer(marker);
    });

    // Auto-fit bounds
    if (spots.length > 0) {
      const bounds = L.latLngBounds([
        [university.lat, university.lng],
        ...spots.map((s) => [s.lat, s.lng] as [number, number]),
      ]);
      map.fitBounds(bounds, { padding: [45, 45], maxZoom: 15 });
    } else {
      map.setView([university.lat, university.lng], 14);
    }

    map.invalidateSize();
  }, [spots, university, selectedSpot, isKhmer]);

  // Recenter handler
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([university.lat, university.lng], 14, { animate: true });
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[350px] rounded-2xl overflow-hidden border border-[#A49694]/30 dark:border-[#A49694]/20 shadow-clean bg-[#EDE7D9] dark:bg-black ${className}`}>
      {/* Actual Map DOM Node */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[350px] z-10" />

      {/* Floating Top Header Pill */}
      <div className="absolute top-3.5 left-3.5 z-20 bg-[#FAF7F2]/90 dark:bg-[#121110]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#A49694]/30 dark:border-[#A49694]/20 shadow-clean flex items-center gap-2 text-xs">
        <span className="w-2 h-2 rounded-full bg-[#052B39] dark:bg-[#4EA8C7]" />
        <span className="font-semibold text-[#4B4237] dark:text-[#EDE7D9]">
          {university.shortName}
        </span>
        <span className="text-[#736B60] dark:text-[#A49694] text-[11px] hidden sm:inline">
          · {spots.length} spots
        </span>
      </div>

      {/* Floating Recenter Button */}
      <button
        type="button"
        onClick={handleRecenter}
        className="absolute top-3.5 right-3.5 z-20 bg-[#FAF7F2]/90 dark:bg-[#121110]/90 hover:bg-[#FAF7F2] dark:hover:bg-[#1A1816] text-[#736B60] dark:text-[#A49694] hover:text-[#052B39] dark:hover:text-[#4EA8C7] p-2 rounded-full border border-[#A49694]/30 dark:border-[#A49694]/20 shadow-clean transition flex items-center justify-center cursor-pointer"
        title="Recenter"
      >
        <LocateFixed className="w-4 h-4 stroke-[2]" />
      </button>

      {/* Bottom overlay preview if a spot is highlighted */}
      {selectedSpot && (
        <div className="absolute bottom-3 left-3 right-14 z-20 bg-[#FAF7F2]/95 dark:bg-[#121110]/95 backdrop-blur-md p-2.5 rounded-2xl border border-[#A49694]/30 dark:border-[#A49694]/20 shadow-clean-md flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={selectedSpot.images[0]}
              alt={selectedSpot.name}
              className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#A49694]/20"
            />
            <div className="min-w-0">
              <h4 className="font-semibold text-xs sm:text-sm text-[#4B4237] dark:text-[#EDE7D9] truncate">
                {isKhmer ? selectedSpot.nameKh : selectedSpot.name}
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] text-[#736B60] dark:text-[#A49694]">
                <span className="text-[#052B39] dark:text-[#4EA8C7] font-bold">{selectedSpot.priceLevel}</span>
                <span>·</span>
                <span>⚡ {selectedSpot.wifiSpeedMbps} Mbps</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectSpot(selectedSpot)}
            className="px-3 py-1.5 rounded-xl bg-[#052B39] text-[#EDE7D9] hover:bg-[#031E28] dark:bg-[#052B39] dark:hover:bg-[#083E52] dark:text-[#EDE7D9] text-xs font-semibold shrink-0 transition cursor-pointer"
          >
            {t('viewDetails')}
          </button>
        </div>
      )}
    </div>
  );
};
