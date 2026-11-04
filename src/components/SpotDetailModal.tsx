import React, { useState } from 'react';
import { StudySpot, University } from '../types/spot';
import { useLanguage } from '../i18n/LanguageContext';
import { calculateDistanceKm, formatDistance, getEstimatedTime } from '../utils/distance';
import {
  X,
  Navigation,
  Send,
  Wifi,
  Zap,
  Clock,
  DollarSign,
  Volume2,
  Armchair,
  Bike,
  MapPin,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

interface SpotDetailModalProps {
  spot: StudySpot | null;
  university: University;
  onClose: () => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  university,
  onClose,
}) => {
  const { isKhmer, t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!spot) return null;

  const distanceKm = calculateDistanceKm(
    spot.lat,
    spot.lng,
    university.lat,
    university.lng
  );
  const formattedDist = formatDistance(distanceKm, isKhmer);
  const travelTime = getEstimatedTime(distanceKm, isKhmer);

  // Check if open
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const isOpen = spot.isOpen24Hours || (currentHour >= spot.openTime && currentHour <= spot.closeTime);

  // Deep Links
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`;
  const shareMessage = encodeURIComponent(
    `☕ Study Spot in Phnom Penh: ${spot.name} (${spot.district})\n⚡ Wi-Fi: ${spot.wifiSpeedMbps} Mbps | 🔌 Plugs: ${spot.plugRating}\n📍 ${formattedDist} from ${university.shortName} (${travelTime.walk})\n☕ Avg Price: ${spot.coffeePriceRange}\nCheck details on CampusHUB!`
  );
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${shareMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#FAF7F2] dark:bg-[#0E0D0C] rounded-2xl shadow-clean-lg border border-[#A49694]/30 dark:border-[#A49694]/20 overflow-hidden my-6 max-h-[90vh] flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title & Close Button */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#A49694]/20 dark:border-[#A49694]/15 bg-[#FAF7F2]/90 dark:bg-[#0E0D0C]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="w-2 h-2 rounded-full bg-[#052B39] dark:bg-[#4EA8C7] shrink-0" />
            <h2 className="font-bold text-base sm:text-lg text-[#4B4237] dark:text-[#EDE7D9] truncate">
              {isKhmer ? spot.nameKh : spot.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EDE7D9] hover:bg-[#E2DBCB] dark:bg-[#1A1816] dark:hover:bg-[#25221F] text-[#4B4237] dark:text-[#EDE7D9] flex items-center justify-center transition cursor-pointer shrink-0"
            title={t('closeModal')}
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Main Photo Gallery */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#EDE7D9] dark:bg-[#171513] border border-[#A49694]/25 dark:border-[#A49694]/20">
              <img
                src={spot.images[selectedImageIndex] || spot.images[0]}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white flex items-center gap-1.5 border border-white/10">
                  <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-zinc-400'}`} />
                  <span>{isOpen ? (isKhmer ? 'កំពុងបើក' : 'Open Now') : (isKhmer ? 'បានបិទ' : 'Closed')}</span>
                </span>

                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#052B39]/85 backdrop-blur-md text-[#EDE7D9] border border-white/15">
                  {spot.priceLevel}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {spot.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {spot.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#052B39] dark:border-[#4EA8C7] ring-1 ring-[#052B39] dark:ring-[#4EA8C7]'
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* District, Address & Proximity */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-[#EDE7D9]/60 dark:bg-[#171513] border border-[#A49694]/25 dark:border-[#A49694]/20 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#052B39] dark:text-[#4EA8C7] mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#4B4237] dark:text-[#EDE7D9]">
                  {isKhmer ? spot.addressKh : spot.address}
                </p>
                <p className="text-[#736B60] dark:text-[#A49694] text-[11px]">
                  {spot.district}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-black border border-[#A49694]/30 dark:border-[#A49694]/20 text-xs font-medium text-[#4B4237] dark:text-[#EDE7D9]">
              <span>📍 {formattedDist} from {university.shortName}</span>
              <span className="text-[#052B39] dark:text-[#4EA8C7] font-semibold">({travelTime.walk})</span>
            </div>
          </div>

          {/* Key Metrics Grid - Minimalist 4 Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Wi-Fi Speed */}
            <div className="p-3 rounded-xl bg-[#EDE7D9]/50 dark:bg-[#171513]/70 border border-[#A49694]/25 dark:border-[#A49694]/20 space-y-1">
              <div className="flex items-center justify-between text-[#736B60] dark:text-[#A49694] text-xs font-medium">
                <span className="flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-[#052B39] dark:text-[#4EA8C7]" />
                  <span>Wi-Fi</span>
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-lg font-bold text-[#4B4237] dark:text-[#EDE7D9]">
                {spot.wifiSpeedMbps} <span className="text-xs font-normal text-[#736B60] dark:text-[#A49694]">Mbps</span>
              </div>
              <div className="text-[10px] text-[#A49694]">
                Ping: {spot.wifiPingMs}ms
              </div>
            </div>

            {/* Plugs */}
            <div className="p-3 rounded-xl bg-[#EDE7D9]/50 dark:bg-[#171513]/70 border border-[#A49694]/25 dark:border-[#A49694]/20 space-y-1">
              <div className="flex items-center gap-1 text-[#736B60] dark:text-[#A49694] text-xs font-medium">
                <Zap className="w-3.5 h-3.5 text-[#052B39] dark:text-[#4EA8C7]" />
                <span>Outlets</span>
              </div>
              <div className="text-sm font-bold text-[#4B4237] dark:text-[#EDE7D9] capitalize">
                {spot.plugRating === 'plenty' ? 'Plenty' : 'Moderate'}
              </div>
              <div className="text-[10px] text-[#736B60] dark:text-[#A49694] truncate">
                {isKhmer ? spot.plugDescriptionKh : spot.plugDescription}
              </div>
            </div>

            {/* Price */}
            <div className="p-3 rounded-xl bg-[#EDE7D9]/50 dark:bg-[#171513]/70 border border-[#A49694]/25 dark:border-[#A49694]/20 space-y-1">
              <div className="flex items-center gap-1 text-[#736B60] dark:text-[#A49694] text-xs font-medium">
                <DollarSign className="w-3.5 h-3.5 text-[#052B39] dark:text-[#4EA8C7]" />
                <span>Drinks</span>
              </div>
              <div className="text-sm font-bold text-[#4B4237] dark:text-[#EDE7D9]">
                {spot.coffeePriceRange}
              </div>
              <div className="text-[10px] text-[#736B60] dark:text-[#A49694] truncate">
                Avg {spot.avgDrinkPrice}
              </div>
            </div>

            {/* Noise */}
            <div className="p-3 rounded-xl bg-[#EDE7D9]/50 dark:bg-[#171513]/70 border border-[#A49694]/25 dark:border-[#A49694]/20 space-y-1">
              <div className="flex items-center gap-1 text-[#736B60] dark:text-[#A49694] text-xs font-medium">
                <Volume2 className="w-3.5 h-3.5 text-[#736B60] dark:text-[#A49694]" />
                <span>Noise</span>
              </div>
              <div className="text-sm font-bold text-[#4B4237] dark:text-[#EDE7D9] capitalize">
                {spot.noiseLevel === 'quiet' ? 'Quiet focus' : 'Moderate'}
              </div>
              <div className="text-[10px] text-[#A49694]">
                Ideal for study
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-2.5">
            <h3 className="font-semibold text-xs text-[#736B60] dark:text-[#A49694] uppercase tracking-wider">
              {t('workEnvironment')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* Hours */}
              <div className="p-3 rounded-xl border border-[#A49694]/25 dark:border-[#A49694]/20 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#736B60] dark:text-[#A49694] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#4B4237] dark:text-[#EDE7D9] block">
                    {t('operatingHours')}
                  </span>
                  <span className="text-[#736B60] dark:text-[#A49694]">
                    {isKhmer ? spot.openingHoursTextKh : spot.openingHoursText}
                  </span>
                </div>
              </div>

              {/* Parking */}
              <div className="p-3 rounded-xl border border-[#A49694]/25 dark:border-[#A49694]/20 flex items-start gap-2.5">
                <Bike className="w-4 h-4 text-[#736B60] dark:text-[#A49694] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#4B4237] dark:text-[#EDE7D9] block">
                    {t('parkingInfo')}
                  </span>
                  <span className="text-[#736B60] dark:text-[#A49694]">
                    {isKhmer ? spot.parking.notesKh : spot.parking.notes}
                  </span>
                </div>
              </div>

              {/* Seating */}
              <div className="p-3 rounded-xl border border-[#A49694]/25 dark:border-[#A49694]/20 flex items-start gap-2.5">
                <Armchair className="w-4 h-4 text-[#736B60] dark:text-[#A49694] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#4B4237] dark:text-[#EDE7D9] block">
                    Seating
                  </span>
                  <span className="text-[#736B60] dark:text-[#A49694]">
                    ~{spot.seatingCapacity} seats • {spot.seatingStyle}
                  </span>
                </div>
              </div>

              {/* Plugs Details */}
              <div className="p-3 rounded-xl border border-[#A49694]/25 dark:border-[#A49694]/20 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#736B60] dark:text-[#A49694] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#4B4237] dark:text-[#EDE7D9] block">
                    {t('powerAndPlugs')}
                  </span>
                  <span className="text-[#736B60] dark:text-[#A49694]">
                    {isKhmer ? spot.plugDescriptionKh : spot.plugDescription}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Reviews & Tips */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xs text-[#736B60] dark:text-[#A49694] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#052B39] dark:text-[#4EA8C7]" />
                <span>{t('studentTips')}</span>
              </h3>
              <span className="text-xs text-[#736B60] dark:text-[#A49694] font-medium">
                ⭐ {spot.rating} ({spot.reviewCount} {t('reviews')})
              </span>
            </div>

            <div className="space-y-2">
              {spot.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl bg-[#EDE7D9]/50 dark:bg-[#171513]/70 border border-[#A49694]/25 dark:border-[#A49694]/20 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#4B4237] dark:text-[#EDE7D9]">{rev.author}</span>
                    <span className="text-[10px] text-[#A49694]">{rev.date}</span>
                  </div>
                  <div className="text-[11px] font-medium text-[#052B39] dark:text-[#4EA8C7]">
                    🎓 {rev.university}
                  </div>
                  <p className="text-[#4B4237]/90 dark:text-[#EDE7D9]/90 text-xs leading-relaxed">
                    "{isKhmer && rev.commentKh ? rev.commentKh : rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2]/95 dark:bg-[#0E0D0C]/95 border-t border-[#A49694]/20 dark:border-[#A49694]/15 flex flex-col sm:flex-row items-center justify-between gap-2.5 sticky bottom-0 z-20">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#052B39] hover:bg-[#031E28] dark:bg-[#052B39] dark:hover:bg-[#083E52] text-[#EDE7D9] font-semibold text-xs sm:text-sm transition cursor-pointer shadow-xs"
          >
            <Navigation className="w-4 h-4 text-[#4EA8C7]" />
            <span>{t('getDirections')}</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm transition cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span>{t('shareTelegram')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
