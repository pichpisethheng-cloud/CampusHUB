import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { UNIVERSITIES } from '../data/universities';
import { University } from '../types/spot';
import { Coffee, Plus, GraduationCap, Sun, Moon, ChevronDown } from 'lucide-react';

interface HeaderProps {
  selectedUniversity: University;
  onSelectUniversity: (uni: University) => void;
  onOpenSuggestModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedUniversity,
  onSelectUniversity,
  onOpenSuggestModal,
}) => {
  const { language, toggleLanguage, t, isKhmer } = useLanguage();
  const { setTheme, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-[#EDE7D9]/90 dark:bg-black/90 backdrop-blur-md border-b border-[#A49694]/25 dark:border-[#A49694]/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Brand Logo - Minimal, Clean & Classic */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none group">
            <div className="w-8 h-8 rounded-xl bg-[#052B39] text-[#EDE7D9] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-xs">
              <Coffee className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-[#4B4237] dark:text-[#EDE7D9]">
                Campus<span className="text-[#052B39] dark:text-[#4EA8C7]">HUB</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider text-[#736B60] dark:text-[#A49694] uppercase">
                Phnom Penh
              </span>
            </div>
          </div>

          {/* Center: Sleek University Pill Dropdown */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-2 bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] dark:bg-[#171513] dark:hover:bg-[#201D1A] border border-[#A49694]/30 dark:border-[#A49694]/20 rounded-full px-3 py-1.5 transition-all max-w-[155px] xs:max-w-[200px] sm:max-w-xs cursor-pointer group shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-[#052B39] dark:text-[#4EA8C7] shrink-0" />
              <select
                aria-label={t('studyingNear')}
                value={selectedUniversity.id}
                onChange={(e) => {
                  const found = UNIVERSITIES.find((u) => u.id === e.target.value);
                  if (found) onSelectUniversity(found);
                }}
                className="bg-transparent text-xs font-semibold text-[#4B4237] dark:text-[#EDE7D9] focus:outline-none cursor-pointer pr-4 appearance-none truncate w-full"
              >
                {UNIVERSITIES.map((uni) => (
                  <option key={uni.id} value={uni.id} className="text-[#4B4237] bg-[#FAF7F2] dark:bg-[#171513] dark:text-[#EDE7D9]">
                    {isKhmer ? uni.nameKh : uni.shortName + ' • ' + uni.name.split('(')[0].trim()}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-[#736B60] dark:text-[#A49694] pointer-events-none absolute right-3 shrink-0" />
            </div>
          </div>

          {/* Right Actions: Minimalist & Clean */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Segmented Light/Dark Switcher */}
            <div className="flex items-center bg-[#FAF7F2]/90 dark:bg-[#171513] p-0.5 rounded-full border border-[#A49694]/30 dark:border-[#A49694]/20 shadow-xs">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  !isDark
                    ? 'bg-[#EDE7D9] text-[#052B39] shadow-xs'
                    : 'text-[#A49694] hover:text-[#EDE7D9]'
                }`}
                title="Light mode"
                aria-label="Light mode"
              >
                <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-[#052B39]' : 'text-[#A49694]'}`} />
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#052B39] text-[#EDE7D9] shadow-xs'
                    : 'text-[#736B60] hover:text-[#4B4237]'
                }`}
                title="Dark mode"
                aria-label="Dark mode"
              >
                <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-[#EDE7D9]' : 'text-[#736B60]'}`} />
              </button>
            </div>

            {/* Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#4B4237] dark:text-[#EDE7D9] hover:bg-[#FAF7F2] dark:hover:bg-[#171513] border border-transparent hover:border-[#A49694]/20 transition"
              title="Toggle Language"
            >
              <span className="text-[11px] font-bold tracking-wider">
                {language === 'en' ? 'KH' : 'EN'}
              </span>
            </button>

            {/* Minimal Add Spot CTA */}
            <button
              type="button"
              onClick={onOpenSuggestModal}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#052B39] text-[#EDE7D9] hover:bg-[#031E28] dark:bg-[#052B39] dark:text-[#EDE7D9] dark:hover:bg-[#083E52] text-xs font-semibold transition active:scale-95 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">{t('suggestSpot')}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
