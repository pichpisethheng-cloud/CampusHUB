import React, { useState, useMemo } from 'react';
import { STUDY_SPOTS } from './data/spots';
import { UNIVERSITIES } from './data/universities';
import { StudySpot, University, FilterState } from './types/spot';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { SpotGrid } from './components/SpotGrid';
import { MapView } from './components/MapView';
import { SpotDetailModal } from './components/SpotDetailModal';
import { SuggestSpotModal } from './components/SuggestSpotModal';
import { Footer } from './components/Footer';
import { calculateDistanceKm } from './utils/distance';
import { useLanguage } from './i18n/LanguageContext';
import { Map, List, MapPin } from 'lucide-react';

const initialFilters: FilterState = {
  searchQuery: '',
  district: '',
  priceLevel: '',
  noiseLevel: '',
  minWifiSpeed: 0,
  onlyPlugs: false,
  onlyQuiet: false,
  onlyUnder2: false,
  onlyLateNight: false,
  onlyAc: false,
  onlyFreeMotoParking: false,
  onlyErgonomic: false,
  sortBy: 'distance',
};

export const App: React.FC = () => {
  const { t, isKhmer } = useLanguage();
  const [selectedUniversity, setSelectedUniversity] = useState<University>(UNIVERSITIES[0]); // RUPP
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedSpot, setSelectedSpot] = useState<StudySpot | null>(null);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [showInlineMap, setShowInlineMap] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campushub_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (spotId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(spotId)
        ? prev.filter((id) => id !== spotId)
        : [...prev, spotId];
      localStorage.setItem('campushub_favs', JSON.stringify(next));
      return next;
    });
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Compute active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.district) count++;
    if (filters.priceLevel) count++;
    if (filters.noiseLevel) count++;
    if (filters.minWifiSpeed > 0) count++;
    if (filters.onlyPlugs) count++;
    if (filters.onlyQuiet) count++;
    if (filters.onlyUnder2) count++;
    if (filters.onlyLateNight) count++;
    if (filters.onlyFreeMotoParking) count++;
    if (filters.onlyErgonomic) count++;
    return count;
  }, [filters]);

  // Filtered & Sorted Study Spots
  const filteredSpots = useMemo(() => {
    return STUDY_SPOTS.filter((spot) => {
      // 1. Search Query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = spot.name.toLowerCase().includes(query);
        const matchesKh = spot.nameKh.includes(query);
        const matchesDistrict = spot.district.toLowerCase().includes(query);
        const matchesAddress = spot.address.toLowerCase().includes(query);
        const matchesTagline = spot.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesKh && !matchesDistrict && !matchesAddress && !matchesTagline) {
          return false;
        }
      }

      // 2. District
      if (filters.district && spot.district !== filters.district) {
        return false;
      }

      // 3. Price Level
      if (filters.priceLevel && spot.priceLevel !== filters.priceLevel) {
        return false;
      }

      // 4. Noise Level
      if (filters.noiseLevel && spot.noiseLevel !== filters.noiseLevel) {
        return false;
      }

      // 5. Min Wi-Fi Speed
      if (filters.minWifiSpeed > 0 && spot.wifiSpeedMbps < filters.minWifiSpeed) {
        return false;
      }

      // 6. Plugs
      if (filters.onlyPlugs && spot.plugRating !== 'plenty') {
        return false;
      }

      // 7. Quiet & AC
      if (filters.onlyQuiet && (spot.noiseLevel !== 'quiet' || !spot.airConditioning)) {
        return false;
      }

      // 8. Under $2 Coffee
      if (filters.onlyUnder2 && spot.priceLevel !== '$') {
        return false;
      }

      // 9. Late Night
      if (filters.onlyLateNight && !spot.lateNight && !spot.isOpen24Hours) {
        return false;
      }

      // 10. Free Moto Parking
      if (filters.onlyFreeMotoParking && spot.parking.moto !== 'free') {
        return false;
      }

      // 11. Ergonomic Chairs
      if (filters.onlyErgonomic && spot.seatingStyle !== 'ergonomic') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'distance') {
        const distA = calculateDistanceKm(a.lat, a.lng, selectedUniversity.lat, selectedUniversity.lng);
        const distB = calculateDistanceKm(b.lat, b.lng, selectedUniversity.lat, selectedUniversity.lng);
        return distA - distB;
      }
      if (filters.sortBy === 'wifi') {
        return b.wifiSpeedMbps - a.wifiSpeedMbps;
      }
      if (filters.sortBy === 'price') {
        const priceOrder = { '$': 1, '$$': 2, '$$$': 3 };
        return priceOrder[a.priceLevel] - priceOrder[b.priceLevel];
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [filters, selectedUniversity]);

  return (
    <div className="min-h-screen flex flex-col bg-[#EDE7D9] dark:bg-black text-[#4B4237] dark:text-[#EDE7D9] relative transition-colors">
      {/* 1. Header with University Selector, Theme Switcher & Language Switcher */}
      <Header
        selectedUniversity={selectedUniversity}
        onSelectUniversity={setSelectedUniversity}
        onOpenSuggestModal={() => setIsSuggestModalOpen(true)}
      />

      {/* 2. Hero Section with Search & Quick Category Chips */}
      <Hero
        filters={filters}
        onUpdateFilters={updateFilters}
      />

      {/* 3. Sticky Filter Bar with District Pills & View Switcher */}
      <FilterBar
        filters={filters}
        onUpdateFilters={updateFilters}
        onResetFilters={resetFilters}
        activeFilterCount={activeFilterCount}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        spotsCount={filteredSpots.length}
      />

      {/* 4. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Desktop Split View (Screen width >= 1024px) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Directory Cards (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <SpotGrid
              spots={filteredSpots}
              university={selectedUniversity}
              onSelectSpot={setSelectedSpot}
              filters={filters}
              onUpdateFilters={updateFilters}
              onResetFilters={resetFilters}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>

          {/* Right Column: Sticky Interactive Leaflet Map (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 sticky top-36 h-[calc(100vh-170px)] min-h-[520px]">
            <MapView
              spots={filteredSpots}
              university={selectedUniversity}
              selectedSpot={selectedSpot}
              onSelectSpot={setSelectedSpot}
            />
          </div>
        </div>

        {/* Mobile & Tablet Layout (Screen width < 1024px) */}
        <div className="lg:hidden space-y-5">
          {viewMode === 'map' ? (
            /* Full Mobile Map View */
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-semibold text-[#736B60] dark:text-[#A49694] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#052B39] dark:text-[#4EA8C7]" />
                  <span>{isKhmer ? 'ផែនទីសិក្សាភ្នំពេញ' : 'Phnom Penh Map'}</span>
                  <span className="font-normal">({filteredSpots.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="text-xs font-semibold text-[#4B4237] dark:text-[#EDE7D9] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>{t('switchList')}</span>
                </button>
              </div>

              <div className="h-[75vh] min-h-[460px]">
                <MapView
                  spots={filteredSpots}
                  university={selectedUniversity}
                  selectedSpot={selectedSpot}
                  onSelectSpot={setSelectedSpot}
                />
              </div>
            </div>
          ) : (
            /* Mobile List View with Quick Interactive Map Section */
            <div className="space-y-5">
              {/* Optional Inline Map Preview Toggle */}
              <div className="rounded-2xl border border-[#A49694]/30 dark:border-[#A49694]/20 overflow-hidden bg-[#FAF7F2] dark:bg-[#121110] shadow-clean p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#052B39] dark:bg-[#4EA8C7]" />
                    <h3 className="font-semibold text-xs text-[#4B4237] dark:text-[#EDE7D9]">
                      {isKhmer ? 'ផែនទីជុំវិញសាកលវិទ្យាល័យ' : 'Map near campus'}
                    </h3>
                    <span className="text-[11px] text-[#736B60] dark:text-[#A49694]">
                      ({selectedUniversity.shortName})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowInlineMap(!showInlineMap)}
                    className="text-xs font-semibold text-[#052B39] dark:text-[#4EA8C7] hover:underline transition cursor-pointer"
                  >
                    {showInlineMap ? (isKhmer ? 'លាក់ផែនទី' : 'Hide Map') : (isKhmer ? 'បង្ហាញផែនទី' : 'Show Map')}
                  </button>
                </div>

                {showInlineMap && (
                  <div className="h-[280px] w-full rounded-xl overflow-hidden border border-[#A49694]/25 dark:border-[#A49694]/20">
                    <MapView
                      spots={filteredSpots}
                      university={selectedUniversity}
                      selectedSpot={selectedSpot}
                      onSelectSpot={setSelectedSpot}
                    />
                  </div>
                )}
              </div>

              {/* Cards Grid */}
              <SpotGrid
                spots={filteredSpots}
                university={selectedUniversity}
                onSelectSpot={setSelectedSpot}
                filters={filters}
                onUpdateFilters={updateFilters}
                onResetFilters={resetFilters}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          )}
        </div>
      </main>

      {/* Floating Bottom View Switcher Button (Mobile Only) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden flex items-center">
        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] font-semibold text-xs shadow-clean-lg border border-[#EDE7D9]/20 dark:border-[#A49694]/20 active:scale-95 transition cursor-pointer"
        >
          {viewMode === 'map' ? (
            <>
              <List className="w-3.5 h-3.5" />
              <span>{t('switchList')}</span>
            </>
          ) : (
            <>
              <Map className="w-3.5 h-3.5 text-[#4EA8C7]" />
              <span>{t('switchMap')} ({filteredSpots.length})</span>
            </>
          )}
        </button>
      </div>

      {/* 5. Spot Detail Modal */}
      <SpotDetailModal
        spot={selectedSpot}
        university={selectedUniversity}
        onClose={() => setSelectedSpot(null)}
      />

      {/* 6. Suggest Spot Modal */}
      <SuggestSpotModal
        isOpen={isSuggestModalOpen}
        onClose={() => setIsSuggestModalOpen(false)}
      />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

export default App;
