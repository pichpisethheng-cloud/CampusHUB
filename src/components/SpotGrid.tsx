import React from 'react';
import { StudySpot, University, FilterState } from '../types/spot';
import { SpotCard } from './SpotCard';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowUpDown, RotateCcw, SearchX } from 'lucide-react';

interface SpotGridProps {
  spots: StudySpot[];
  university: University;
  onSelectSpot: (spot: StudySpot) => void;
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const SpotGrid: React.FC<SpotGridProps> = ({
  spots,
  university,
  onSelectSpot,
  filters,
  onUpdateFilters,
  onResetFilters,
  favorites,
  onToggleFavorite,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Top Sorting Bar */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold text-[#736B60] dark:text-[#A49694] tracking-wider uppercase">
          {t('spotsFound')}: <span className="text-[#4B4237] dark:text-[#EDE7D9] font-bold">{spots.length}</span>
        </h2>

        <div className="flex items-center gap-1.5 text-xs text-[#736B60] dark:text-[#A49694]">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#052B39] dark:text-[#4EA8C7]" />
          <span className="hidden sm:inline font-medium">{t('sortBy')}:</span>
          <select
            aria-label={t('sortBy')}
            value={filters.sortBy}
            onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
            className="bg-transparent font-semibold text-[#4B4237] dark:text-[#EDE7D9] border-b border-[#A49694]/30 dark:border-[#A49694]/20 pb-0.5 focus:outline-none cursor-pointer"
          >
            <option value="distance" className="bg-[#FAF7F2] dark:bg-[#171513]">{t('sortDistance')}</option>
            <option value="wifi" className="bg-[#FAF7F2] dark:bg-[#171513]">{t('sortWifi')}</option>
            <option value="price" className="bg-[#FAF7F2] dark:bg-[#171513]">{t('sortPrice')}</option>
            <option value="rating" className="bg-[#FAF7F2] dark:bg-[#171513]">{t('sortRating')}</option>
          </select>
        </div>
      </div>

      {/* Grid or Clean Empty State */}
      {spots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {spots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              university={university}
              onSelect={onSelectSpot}
              isFavorite={favorites.includes(spot.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        /* Minimal Empty State */
        <div className="text-center py-20 px-4 bg-[#FAF7F2] dark:bg-[#121110] rounded-2xl border border-[#A49694]/30 dark:border-[#A49694]/20 shadow-clean space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#EDE7D9] dark:bg-[#171513] flex items-center justify-center text-[#736B60] dark:text-[#A49694]">
            <SearchX className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h3 className="text-base font-bold text-[#4B4237] dark:text-[#EDE7D9]">
            {t('noSpotsTitle')}
          </h3>
          <p className="text-xs text-[#736B60] dark:text-[#A49694] max-w-sm mx-auto leading-relaxed">
            {t('noSpotsDesc')}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#052B39] text-[#EDE7D9] hover:bg-[#031E28] dark:bg-[#052B39] dark:hover:bg-[#083E52] dark:text-[#EDE7D9] text-xs font-semibold transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('resetAllFilters')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
