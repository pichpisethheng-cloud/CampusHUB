import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Coffee, Heart, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#A49694]/25 dark:border-[#A49694]/15 bg-[#EDE7D9] dark:bg-black py-10 px-4 sm:px-6 lg:px-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        {/* Brand info */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#052B39] text-[#EDE7D9] flex items-center justify-center font-bold shadow-xs">
            <Coffee className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-bold text-sm text-[#4B4237] dark:text-[#EDE7D9]">
              Campus<span className="text-[#052B39] dark:text-[#4EA8C7]">HUB</span>
            </span>
            <span className="text-[#736B60] dark:text-[#A49694] text-xs ml-2">
              Phnom Penh
            </span>
          </div>
        </div>

        {/* Telegram Community Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://t.me/share/url?url=https://campushub-phnompenh.local&text=Discover%20the%20best%20student%20study%20spots%20in%20Phnom%20Penh!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 dark:bg-[#171513] dark:hover:bg-[#201D1A] text-[#4B4237] dark:text-[#EDE7D9] border border-[#A49694]/30 dark:border-[#A49694]/20 text-xs font-medium transition cursor-pointer"
          >
            <Send className="w-3 h-3 text-sky-500" />
            <span>Join Telegram</span>
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-[#A49694]/20 dark:border-[#A49694]/15 mt-6 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#736B60] dark:text-[#A49694]">
        <div>{t('disclaimer')}</div>
        <div className="flex items-center gap-1">
          <span>Made for Phnom Penh Students</span>
          <Heart className="w-3 h-3 text-[#052B39] fill-[#052B39] dark:text-[#4EA8C7] dark:fill-[#4EA8C7]" />
        </div>
      </div>
    </footer>
  );
};
