import React from 'react';
import { StudySpot, University } from '../types/spot';
import { useLanguage } from '../i18n/LanguageContext';
import { calculateDistanceKm, formatDistance, getEstimatedTime } from '../utils/distance';
import {
  Zap,
  Wifi,
  Navigation,
  Send,
  Star,
  Bike,
  ChevronRight,
  Heart,
  Volume2
} from 'lucide-react';

interface SpotCardProps {
  spot: StudySpot;
  university: University;
  onSelect: (spot: StudySpot) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (spotId: string) => void;
}

export const SpotCard: React.FC<SpotCardProps> = ({
  spot,
  university,
  onSelect,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const { isKhmer, t } = useLanguage();

  const distanceKm = calculateDistanceKm(
    spot.lat,
    spot.lng,
    university.lat,
    university.lng
  );
  const formattedDist = formatDistance(distanceKm, isKhmer);
  const travelTime = getEstimatedTime(distanceKm, isKhmer);

  // Check if spot is currently open
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const isOpen = spot.isOpen24Hours || (currentHour >= spot.openTime && currentHour <= spot.closeTime);

  // Deep links
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`;
  const telegramShareText = encodeURIComponent(
    `☕ Study Spot in Phnom Penh: ${spot.name} (${spot.district})\n⚡ Wi-Fi: ${spot.wifiSpeedMbps} Mbps | 🔌 Plugs: ${spot.plugRating}\n📍 Distance: ${formattedDist} from ${university.shortName}\nCheck it on CampusHUB!`
  );
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${telegramShareText}`;

  return (
    <div className="group bg-[#FAF7F2] dark:bg-[#121110] rounded-2xl border border-[#A49694]/30 dark:border-[#A49694]/20 hover:border-[#052B39]/80 dark:hover:border-[#4EA8C7]/80 shadow-clean hover:shadow-clean-md transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Photo Header */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-[#EDE7D9] dark:bg-[#171513] cursor-pointer"
        onClick={() => onSelect(spot)}
      >
        <img
          src={spot.images[0]}
          alt={spot.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Minimal gradient scrim for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Minimal Status Dot */}
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-md text-white flex items-center gap-1.5 border border-white/10">
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-zinc-400'}`} />
              <span>{isOpen ? (isKhmer ? 'កំពុងបើក' : 'Open') : (isKhmer ? 'បានបិទ' : 'Closed')}</span>
            </span>

            {/* Price Badge */}
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#052B39]/85 backdrop-blur-md text-[#EDE7D9] border border-white/15">
              {spot.priceLevel}
            </span>
          </div>

          {/* Minimal Favorite Button */}
          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(spot.id);
              }}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition pointer-events-auto border border-white/10 cursor-pointer"
              title="Bookmark spot"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white/90'
                }`}
              />
            </button>
          )}
        </div>

        {/* Bottom Image Overlay: Proximity & Wi-Fi Speed */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
          <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-medium">
            {formattedDist} • {university.shortName} <span className="text-zinc-300">({travelTime.walk})</span>
          </span>

          <span className="bg-[#052B39]/85 backdrop-blur-md px-2 py-1 rounded-lg border border-white/15 font-bold text-[#EDE7D9] flex items-center gap-1">
            <Wifi className="w-3 h-3 stroke-[2.5] text-[#4EA8C7]" />
            <span>{spot.wifiSpeedMbps}M</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div onClick={() => onSelect(spot)} className="cursor-pointer space-y-1.5">
          
          {/* District & Star Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#736B60] dark:text-[#A49694]">
              {spot.district}
            </span>
            <div className="flex items-center gap-1 text-[#4B4237] dark:text-[#EDE7D9] font-bold">
              <Star className="w-3.5 h-3.5 fill-[#052B39] text-[#052B39] dark:fill-[#4EA8C7] dark:text-[#4EA8C7]" />
              <span>{spot.rating}</span>
              <span className="text-[#A49694] font-normal">({spot.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg text-[#4B4237] dark:text-[#EDE7D9] group-hover:text-[#052B39] dark:group-hover:text-[#4EA8C7] transition line-clamp-1">
            {isKhmer ? spot.nameKh : spot.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#736B60] dark:text-[#A49694] line-clamp-2 leading-relaxed">
            {isKhmer ? spot.taglineKh : spot.tagline}
          </p>

          {/* Minimalist Feature Chips (Classic & Clean) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
            {/* Plugs */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EDE7D9]/80 dark:bg-[#1A1816] text-[#4B4237] dark:text-[#EDE7D9] border border-[#A49694]/25 dark:border-[#A49694]/15 font-medium">
              <Zap className="w-3 h-3 text-[#052B39] dark:text-[#4EA8C7]" />
              <span>{spot.plugRating === 'plenty' ? (isKhmer ? 'ព្រីភ្លើងច្រើន' : 'Plenty of Plugs') : (isKhmer ? 'ព្រីភ្លើងល្មម' : 'Wall Plugs')}</span>
            </span>

            {/* Noise */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EDE7D9]/80 dark:bg-[#1A1816] text-[#4B4237] dark:text-[#EDE7D9] border border-[#A49694]/25 dark:border-[#A49694]/15 font-medium">
              <Volume2 className="w-3 h-3 text-[#736B60] dark:text-[#A49694]" />
              <span>{spot.noiseLevel === 'quiet' ? (isKhmer ? 'ស្ងាត់ល្អ' : 'Quiet') : (isKhmer ? 'កម្រិតមធ្យម' : 'Moderate')}</span>
            </span>

            {/* Price */}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EDE7D9]/80 dark:bg-[#1A1816] text-[#4B4237] dark:text-[#EDE7D9] border border-[#A49694]/25 dark:border-[#A49694]/15 font-medium">
              {spot.coffeePriceRange}
            </span>

            {/* Free moto parking */}
            {spot.parking.moto === 'free' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EDE7D9]/80 dark:bg-[#1A1816] text-[#4B4237] dark:text-[#EDE7D9] border border-[#A49694]/25 dark:border-[#A49694]/15 font-medium">
                <Bike className="w-3 h-3 text-[#736B60] dark:text-[#A49694]" />
                <span>{isKhmer ? 'ចតម៉ូតូ' : 'Free Moto'}</span>
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-[#A49694]/20 dark:border-[#A49694]/15 flex items-center justify-between gap-2">
          {/* View Details Primary Action */}
          <button
            type="button"
            onClick={() => onSelect(spot)}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[#052B39] hover:bg-[#031E28] dark:bg-[#052B39] dark:hover:bg-[#083E52] text-[#EDE7D9] text-xs font-semibold transition active:scale-98 cursor-pointer shadow-xs"
          >
            <span>{t('viewDetails')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Quick Directions Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-[#A49694]/30 dark:border-[#A49694]/20 hover:border-[#052B39] dark:hover:border-[#4EA8C7] text-[#4B4237] dark:text-[#EDE7D9] hover:bg-[#EDE7D9] dark:hover:bg-[#1A1816] transition flex items-center justify-center shrink-0 cursor-pointer"
            title={t('getDirections')}
          >
            <Navigation className="w-4 h-4 text-[#052B39] dark:text-[#4EA8C7]" />
          </a>

          {/* Quick Telegram Share */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-[#A49694]/30 dark:border-[#A49694]/20 hover:border-sky-400 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition flex items-center justify-center shrink-0 cursor-pointer"
            title={t('shareTelegram')}
          >
            <Send className="w-4 h-4 text-sky-500" />
          </a>
        </div>

      </div>
    </div>
  );
};
