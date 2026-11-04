import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterState } from '../types/spot';
import { RotateCcw, Map, List, Bike, Wifi, Volume2 } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  viewMode: 'list' | 'map';
  onToggleViewMode: (mode: 'list' | 'map') => void;
  spotsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  activeFilterCount,
  viewMode,
  onToggleViewMode,
  spotsCount,
}) => {
  const { t } = useLanguage();

  const districts = [
    { id: 'all', labelKey: 'allDistricts', value: '' },
    { id: 'tk', label: 'Toul Kork', value: 'Toul Kork' },
    { id: 'bkk', label: 'BKK', value: 'Boeng Keng Kang (BKK)' },
    { id: 'sen-sok', label: 'Sen Sok', value: 'Sen Sok' },
    { id: 'ttp', label: 'TTP / Russian Market', value: 'Chamkarmon / TTP' },
    { id: 'daun-penh', label: 'Daun Penh', value: 'Daun Penh' },
  ];

  return (
    <div className="bg-[#EDE7D9]/95 dark:bg-black/95 backdrop-blur-md border-b border-[#A49694]/25 dark:border-[#A49694]/15 sticky top-16 sm:top-18 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2.5">
        
        {/* District Row + View Mode Switcher */}
        <div className="flex items-center justify-between gap-3">
          {/* District Horizontal Scroll Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
            {districts.map((d) => {
              const isSelected = filters.district === d.value;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onUpdateFilters({ district: d.value })}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] font-semibold shadow-xs'
                      : 'text-[#736B60] dark:text-[#A49694] hover:text-[#052B39] dark:hover:text-[#EDE7D9] hover:bg-[#FAF7F2] dark:hover:bg-[#171513]'
                  }`}
                >
                  {d.label || t(d.labelKey as any)}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle Pill (Mobile & Desktop) */}
          <div className="flex items-center shrink-0 bg-[#FAF7F2] dark:bg-[#171513] p-0.5 rounded-full border border-[#A49694]/30 dark:border-[#A49694]/20 shadow-xs">
            <button
              type="button"
              onClick={() => onToggleViewMode('list')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#EDE7D9] text-[#052B39] dark:bg-[#201D1A] dark:text-[#EDE7D9] shadow-xs font-semibold'
                  : 'text-[#736B60] hover:text-[#052B39] dark:text-[#A49694] dark:hover:text-[#EDE7D9]'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('switchList')}</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('map')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-[#EDE7D9] text-[#052B39] dark:bg-[#201D1A] dark:text-[#EDE7D9] shadow-xs font-semibold'
                  : 'text-[#736B60] hover:text-[#052B39] dark:text-[#A49694] dark:hover:text-[#EDE7D9]'
              }`}
              title="Map View"
            >
              <Map className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('switchMap')}</span>
            </button>
          </div>
        </div>

        {/* Secondary Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#A49694]/20 dark:border-[#A49694]/15 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Price Segmented Pill */}
            <div className="flex items-center bg-[#FAF7F2] dark:bg-[#171513] rounded-full p-0.5 border border-[#A49694]/30 dark:border-[#A49694]/20">
              {(['', '$', '$$', '$$$'] as const).map((p) => (
                <button
                  key={p || 'all'}
                  type="button"
                  onClick={() => onUpdateFilters({ priceLevel: p })}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
                    filters.priceLevel === p
                      ? 'bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] shadow-xs font-bold'
                      : 'text-[#736B60] hover:text-[#052B39] dark:text-[#A49694] dark:hover:text-[#EDE7D9]'
                  }`}
                >
                  {p === '' ? t('allPrices') : p}
                </button>
              ))}
            </div>

            {/* Noise Level Minimal Select */}
            <div className="flex items-center bg-[#FAF7F2] dark:bg-[#171513] rounded-full px-2.5 py-1 border border-[#A49694]/30 dark:border-[#A49694]/20">
              <Volume2 className="w-3 h-3 text-[#736B60] dark:text-[#A49694] mr-1.5 shrink-0" />
              <select
                aria-label={t('filterByNoise')}
                value={filters.noiseLevel}
                onChange={(e) => onUpdateFilters({ noiseLevel: e.target.value })}
                className="bg-transparent text-[11px] font-medium text-[#4B4237] dark:text-[#EDE7D9] focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-[#FAF7F2] dark:bg-[#171513]">{t('allNoise')}</option>
                <option value="quiet" className="bg-[#FAF7F2] dark:bg-[#171513]">{t('noiseQuiet')}</option>
                <option value="moderate" className="bg-[#FAF7F2] dark:bg-[#171513]">{t('noiseModerate')}</option>
                <option value="lively" className="bg-[#FAF7F2] dark:bg-[#171513]">{t('noiseLively')}</option>
              </select>
            </div>

            {/* Wi-Fi Speed Filter */}
            <div className="flex items-center bg-[#FAF7F2] dark:bg-[#171513] rounded-full px-2.5 py-1 border border-[#A49694]/30 dark:border-[#A49694]/20">
              <Wifi className="w-3 h-3 text-[#052B39] dark:text-[#4EA8C7] mr-1.5 shrink-0" />
              <select
                aria-label={t('filterByWifi')}
                value={filters.minWifiSpeed}
                onChange={(e) => onUpdateFilters({ minWifiSpeed: Number(e.target.value) })}
                className="bg-transparent text-[11px] font-medium text-[#4B4237] dark:text-[#EDE7D9] focus:outline-none cursor-pointer"
              >
                <option value={0} className="bg-[#FAF7F2] dark:bg-[#171513]">{t('wifiAny')}</option>
                <option value={50} className="bg-[#FAF7F2] dark:bg-[#171513]">{t('wifi50')}</option>
                <option value={100} className="bg-[#FAF7F2] dark:bg-[#171513]">{t('wifi100')}</option>
              </select>
            </div>

            {/* Free Moto Parking Minimal Toggle */}
            <button
              type="button"
              onClick={() => onUpdateFilters({ onlyFreeMotoParking: !filters.onlyFreeMotoParking })}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-medium transition cursor-pointer ${
                filters.onlyFreeMotoParking
                  ? 'bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] border-transparent font-semibold shadow-xs'
                  : 'bg-[#FAF7F2] text-[#736B60] dark:bg-[#171513] dark:text-[#A49694] border-[#A49694]/30 dark:border-[#A49694]/20 hover:text-[#052B39]'
              }`}
            >
              <Bike className="w-3 h-3 stroke-[2]" />
              <span>{t('onlyFreeMoto')}</span>
            </button>
          </div>

          {/* Active Filter Clear & Count */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-[#736B60] dark:text-[#A49694]">
              <strong className="text-[#4B4237] dark:text-[#EDE7D9] font-semibold">{spotsCount}</strong> {t('spotsFound')}
            </span>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#052B39] dark:text-[#4EA8C7] hover:underline transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('clearFilters')} ({activeFilterCount})</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
