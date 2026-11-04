import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterState } from '../types/spot';
import { Search, X, Zap, VolumeX, DollarSign, Moon, Armchair } from 'lucide-react';

interface HeroProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
}

export const Hero: React.FC<HeroProps> = ({ filters, onUpdateFilters }) => {
  const { t, isKhmer } = useLanguage();

  return (
    <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#A49694]/25 dark:border-[#A49694]/15 bg-[#EDE7D9]/40 dark:bg-black/40 transition-colors">
      <div className="max-w-3xl mx-auto text-center space-y-5">
        
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#171513] text-[#736B60] dark:text-[#A49694] text-xs font-medium border border-[#A49694]/30 dark:border-[#A49694]/20 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#052B39] dark:bg-[#4EA8C7]" />
          <span>{isKhmer ? 'កន្លែងសិក្សាសម្រាប់និស្សិត' : 'Curated Phnom Penh Study Spaces'}</span>
        </div>

        {/* Clean Editorial Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4B4237] dark:text-[#EDE7D9] tracking-tight leading-tight">
          {isKhmer ? (
            'កន្លែងរៀន និងធ្វើការស្ងប់ស្ងាត់'
          ) : (
            <>
              Find your flow in <span className="underline decoration-[#052B39] dark:decoration-[#4EA8C7] decoration-wavy decoration-2 underline-offset-4">Phnom Penh</span>.
            </>
          )}
        </h1>

        {/* Minimal Subtitle */}
        <p className="text-sm sm:text-base text-[#736B60] dark:text-[#A49694] max-w-xl mx-auto font-normal leading-relaxed">
          {isKhmer
            ? 'ស្វែងរកហាងកាហ្វេ និងបណ្ណាល័យដែលមាន Wi-Fi លឿន ព្រីភ្លើងច្រើន និងតម្លៃសមរម្យជិតសាលារបស់អ្នក។'
            : 'Quiet tables, verified high-speed Wi-Fi, and abundant power outlets near your university campus.'}
        </p>

        {/* Minimal Search Input */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative flex items-center bg-[#FAF7F2] dark:bg-[#171513] rounded-2xl shadow-clean border border-[#A49694]/35 dark:border-[#A49694]/25 focus-within:border-[#052B39] dark:focus-within:border-[#4EA8C7] focus-within:ring-2 focus-within:ring-[#052B39]/20 transition-all">
            <div className="pl-4 text-[#736B60] dark:text-[#A49694]">
              <Search className="w-4 h-4 stroke-[2.2]" />
            </div>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
              placeholder={isKhmer ? 'ស្វែងរកតាមឈ្មោះហាង ឬតំបន់ (ឧ. Brown, Toul Kork, RUPP)...' : 'Search by name, district, or street (e.g. Toul Kork, Brown, RUPP)...'}
              className="w-full py-3.5 pl-3 pr-10 bg-transparent text-sm text-[#4B4237] dark:text-[#EDE7D9] placeholder:text-[#A49694] focus:outline-none"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => onUpdateFilters({ searchQuery: '' })}
                className="pr-4 text-[#A49694] hover:text-[#4B4237] dark:hover:text-[#EDE7D9] transition cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Modern Tactile Quick Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {/* Plenty of Plugs */}
          <button
            type="button"
            onClick={() => onUpdateFilters({ onlyPlugs: !filters.onlyPlugs })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              filters.onlyPlugs
                ? 'bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] font-semibold shadow-xs'
                : 'bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-[#4B4237] dark:bg-[#171513] dark:text-[#EDE7D9] dark:hover:bg-[#201D1A] border border-[#A49694]/30 dark:border-[#A49694]/20'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${filters.onlyPlugs ? 'text-[#4EA8C7]' : 'text-[#736B60] dark:text-[#A49694]'}`} />
            <span>{t('plugsCategory')}</span>
          </button>

          {/* Quiet & AC */}
          <button
            type="button"
            onClick={() => onUpdateFilters({ onlyQuiet: !filters.onlyQuiet })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              filters.onlyQuiet
                ? 'bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] font-semibold shadow-xs'
                : 'bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-[#4B4237] dark:bg-[#171513] dark:text-[#EDE7D9] dark:hover:bg-[#201D1A] border border-[#A49694]/30 dark:border-[#A49694]/20'
            }`}
          >
            <VolumeX className={`w-3.5 h-3.5 ${filters.onlyQuiet ? 'text-[#4EA8C7]' : 'text-[#736B60] dark:text-[#A49694]'}`} />
            <span>{t('quietCategory')}</span>
          </button>

          {/* Under $2 Coffee */}
          <button
            type="button"
            onClick={() => onUpdateFilters({ onlyUnder2: !filters.onlyUnder2 })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              filters.onlyUnder2
                ? 'bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] font-semibold shadow-xs'
                : 'bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-[#4B4237] dark:bg-[#171513] dark:text-[#EDE7D9] dark:hover:bg-[#201D1A] border border-[#A49694]/30 dark:border-[#A49694]/20'
            }`}
          >
            <DollarSign className={`w-3.5 h-3.5 ${filters.onlyUnder2 ? 'text-[#4EA8C7]' : 'text-[#736B60] dark:text-[#A49694]'}`} />
            <span>{t('budgetCategory')}</span>
          </button>

          {/* Late Night Open */}
          <button
            type="button"
            onClick={() => onUpdateFilters({ onlyLateNight: !filters.onlyLateNight })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              filters.onlyLateNight
                ? 'bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] font-semibold shadow-xs'
                : 'bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-[#4B4237] dark:bg-[#171513] dark:text-[#EDE7D9] dark:hover:bg-[#201D1A] border border-[#A49694]/30 dark:border-[#A49694]/20'
            }`}
          >
            <Moon className={`w-3.5 h-3.5 ${filters.onlyLateNight ? 'text-[#4EA8C7]' : 'text-[#736B60] dark:text-[#A49694]'}`} />
            <span>{t('lateNightCategory')}</span>
          </button>

          {/* Ergonomic Chairs */}
          <button
            type="button"
            onClick={() => onUpdateFilters({ onlyErgonomic: !filters.onlyErgonomic })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              filters.onlyErgonomic
                ? 'bg-[#052B39] text-[#EDE7D9] dark:bg-[#052B39] dark:text-[#EDE7D9] font-semibold shadow-xs'
                : 'bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-[#4B4237] dark:bg-[#171513] dark:text-[#EDE7D9] dark:hover:bg-[#201D1A] border border-[#A49694]/30 dark:border-[#A49694]/20'
            }`}
          >
            <Armchair className={`w-3.5 h-3.5 ${filters.onlyErgonomic ? 'text-[#4EA8C7]' : 'text-[#736B60] dark:text-[#A49694]'}`} />
            <span>{t('ergonomicCategory')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
