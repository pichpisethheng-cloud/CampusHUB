import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { UNIVERSITIES } from '../data/universities';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface SuggestSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (newSpot: any) => void;
}

export const SuggestSpotModal: React.FC<SuggestSpotModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Toul Kork');
  const [nearestUni, setNearestUni] = useState('RUPP');
  const [price, setPrice] = useState('$1.50 - $2.50');
  const [wifiSpeed, setWifiSpeed] = useState('80 Mbps');
  const [tip, setTip] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setTip('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-md bg-[#FAF7F2] dark:bg-[#0E0D0C] rounded-2xl shadow-clean-lg border border-[#A49694]/30 dark:border-[#A49694]/20 overflow-hidden my-6 p-6 sm:p-7 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EDE7D9] hover:bg-[#E2DBCB] dark:bg-[#1A1816] dark:hover:bg-[#25221F] text-[#4B4237] dark:text-[#EDE7D9] flex items-center justify-center transition cursor-pointer"
          title={t('closeModal')}
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#4B4237] dark:text-[#EDE7D9]">
              {t('suggestSuccess')}
            </h3>
            <p className="text-xs text-[#736B60] dark:text-[#A49694]">
              Your recommendation has been submitted to the directory.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1 mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EDE7D9] dark:bg-[#171513] text-[#736B60] dark:text-[#A49694] text-[11px] font-semibold border border-[#A49694]/25 dark:border-[#A49694]/20">
                <Sparkles className="w-3 h-3 text-[#052B39] dark:text-[#4EA8C7]" />
                <span>Student Community</span>
              </div>
              <h2 className="text-xl font-bold text-[#4B4237] dark:text-[#EDE7D9] tracking-tight">
                {t('suggestModalTitle')}
              </h2>
              <p className="text-xs text-[#736B60] dark:text-[#A49694] font-normal">
                {t('suggestModalSubtitle')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {/* Spot Name */}
              <div>
                <label className="block font-medium text-[#4B4237] dark:text-[#EDE7D9] mb-1">
                  {t('spotNameLabel')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Co-Coffee TK or Tube Cafe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#A49694]/30 dark:border-[#A49694]/20 bg-[#FAF7F2] dark:bg-[#171513] text-[#4B4237] dark:text-[#EDE7D9] placeholder:text-[#A49694] focus:border-[#052B39] dark:focus:border-[#4EA8C7] focus:ring-1 focus:ring-[#052B39]/20 focus:outline-none transition"
                />
              </div>

              {/* District & University Row */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-medium text-[#4B4237] dark:text-[#EDE7D9] mb-1">
                    {t('districtLabel')}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#A49694]/30 dark:border-[#A49694]/20 bg-[#FAF7F2] dark:bg-[#171513] text-[#4B4237] dark:text-[#EDE7D9] focus:outline-none cursor-pointer"
                  >
                    <option value="Toul Kork">Toul Kork</option>
                    <option value="Boeng Keng Kang (BKK)">BKK</option>
                    <option value="Sen Sok">Sen Sok</option>
                    <option value="Chamkarmon / TTP">TTP / Russian Mkt</option>
                    <option value="Daun Penh">Daun Penh</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#4B4237] dark:text-[#EDE7D9] mb-1">
                    {t('universityNearLabel')}
                  </label>
                  <select
                    value={nearestUni}
                    onChange={(e) => setNearestUni(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#A49694]/30 dark:border-[#A49694]/20 bg-[#FAF7F2] dark:bg-[#171513] text-[#4B4237] dark:text-[#EDE7D9] focus:outline-none cursor-pointer"
                  >
                    {UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.shortName}>
                        {u.shortName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Wi-Fi Row */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-medium text-[#4B4237] dark:text-[#EDE7D9] mb-1">
                    {t('priceEstimateLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $1.50 - $2.20"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#A49694]/30 dark:border-[#A49694]/20 bg-[#FAF7F2] dark:bg-[#171513] text-[#4B4237] dark:text-[#EDE7D9] placeholder:text-[#A49694] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#4B4237] dark:text-[#EDE7D9] mb-1">
                    {t('wifiSpeedEstimateLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 80 Mbps"
                    value={wifiSpeed}
                    onChange={(e) => setWifiSpeed(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#A49694]/30 dark:border-[#A49694]/20 bg-[#FAF7F2] dark:bg-[#171513] text-[#4B4237] dark:text-[#EDE7D9] placeholder:text-[#A49694] focus:outline-none"
                  />
                </div>
              </div>

              {/* Student Tip */}
              <div>
                <label className="block font-medium text-[#4B4237] dark:text-[#EDE7D9] mb-1">
                  {t('studentTipLabel')}
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 2nd floor has outlets at every table and cold AC!"
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#A49694]/30 dark:border-[#A49694]/20 bg-[#FAF7F2] dark:bg-[#171513] text-[#4B4237] dark:text-[#EDE7D9] placeholder:text-[#A49694] focus:border-[#052B39] dark:focus:border-[#4EA8C7] focus:ring-1 focus:ring-[#052B39]/20 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#052B39] hover:bg-[#031E28] dark:bg-[#052B39] dark:hover:bg-[#083E52] text-[#EDE7D9] font-semibold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
              >
                <Send className="w-3.5 h-3.5 text-[#4EA8C7]" />
                <span>{t('submitSpotButton')}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
