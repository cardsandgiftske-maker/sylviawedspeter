import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Award, 
  Compass, 
  Music, 
  MessageCircle, 
  Gift, 
  Cake, 
  Utensils, 
  Navigation, 
  Heart, 
  Car, 
  MapPin, 
  ExternalLink,
  QrCode,
  Download,
  Copy,
  Check,
  X
} from 'lucide-react';
import * as QRCode from 'qrcode';
import { PROGRAM_ITEMS } from '../data';

export default function Program() {
  const [activeTab, setActiveTab] = useState<'all' | 'church' | 'reception'>('all');
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('/wedding_programme_qr.png');

  const getProgrammeUrl = () => {
    if (typeof window !== 'undefined') {
      const base = window.location.origin + window.location.pathname;
      return base.replace(/\/$/, '') + '#program-section';
    }
    return 'https://ais-pre-b47vgsimmxxv7t7srqzibv-351758827303.europe-west2.run.app/#program-section';
  };

  useEffect(() => {
    const url = getProgrammeUrl();
    QRCode.toDataURL(url, {
      width: 700,
      margin: 2,
      color: {
        dark: '#0F2444',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
      .then((dataUrl) => {
        setQrDataUrl(dataUrl);
      })
      .catch((err) => {
        console.warn('QR code generation error:', err);
      });
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getProgrammeUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl || '/wedding_programme_qr.png';
    link.download = 'Sylvia_and_Dr_Peter_Wedding_Programme_QR.png';
    link.click();
  };

  const filteredItems = PROGRAM_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'church') return item.isChurch;
    return !item.isChurch;
  });

  const getIconForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('matrimony') || t.includes('mass') || t.includes('church')) return <Award className="w-4 h-4 text-navy-800" />;
    if (t.includes('route') || t.includes('drive') || t.includes('journey') || t.includes('transit') || t.includes('scenic')) return <Car className="w-4 h-4 text-navy-700" />;
    if (t.includes('arrival') || t.includes('refreshment')) return <Navigation className="w-4 h-4 text-navy-800" />;
    if (t.includes('lunch') || t.includes('feast') || t.includes('culinary')) return <Utensils className="w-4 h-4 text-[#C49C5E]" />;
    if (t.includes('photo') || t.includes('portrait')) return <Compass className="w-4 h-4 text-navy-800" />;
    if (t.includes('entrance') || t.includes('dancing')) return <Music className="w-4 h-4 text-navy-800" />;
    if (t.includes('speech') || t.includes('blessing')) return <MessageCircle className="w-4 h-4 text-stone-700" />;
    if (t.includes('cake')) return <Cake className="w-4 h-4 text-[#C49C5E]" />;
    if (t.includes('thanks') || t.includes('bouquet') || t.includes('vote')) return <Gift className="w-4 h-4 text-navy-800" />;
    if (t.includes('prayer') || t.includes('benediction') || t.includes('closing')) return <Heart className="w-4 h-4 text-navy-800" />;
    return <Clock className="w-4 h-4 text-navy-700" />;
  };

  return (
    <section className="relative py-24 bg-[#FAFBFD] text-stone-850 border-t border-navy-100" id="program-section">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-navy-700 text-xs font-bold tracking-[0.25em] uppercase font-sans">The Wedding Schedule</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-navy-950 mt-2 mb-4">Wedding Programme</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-navy-600/50 to-transparent mx-auto" />
          <p className="text-stone-600 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
            “Two are better than one, because they have a good return for their labor.” <br />
            <span className="text-navy-900 uppercase font-sans text-xs tracking-wider font-semibold not-italic block mt-1">— Ecclesiastes 4:9</span>
          </p>
        </div>

        {/* Tab Filters & QR Code Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <div className="inline-flex bg-navy-50/70 border border-navy-200 p-1.5 rounded-full shadow-xs gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-navy-900 text-white shadow-xs' : 'text-stone-600 hover:text-navy-900'
              }`}
            >
              Full Schedule
            </button>
            <button
              onClick={() => setActiveTab('church')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'church' ? 'bg-navy-900 text-white shadow-xs' : 'text-stone-600 hover:text-navy-900'
              }`}
            >
              Church (10 AM)
            </button>
            <button
              onClick={() => setActiveTab('reception')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'reception' ? 'bg-navy-900 text-white shadow-xs' : 'text-stone-600 hover:text-navy-900'
              }`}
            >
              Reception (1 PM – 5 PM)
            </button>
          </div>

          {/* Quick QR Button */}
          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-navy-50 border border-navy-300 hover:border-navy-500 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-navy-950 shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
            title="Scan or print QR code for the Wedding Programme"
          >
            <QrCode className="w-4 h-4 text-navy-800" />
            <span>Programme QR Code</span>
          </button>
        </div>

        {/* Program Timeline */}
        <div className="relative border-l-2 border-navy-300 ml-5 md:ml-10 pl-6 md:pl-10 space-y-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`program-item-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="relative"
            >
              {/* Timeline Node */}
              <div className="absolute -left-[45px] md:-left-[61px] top-1.5 w-9 h-9 rounded-full bg-white border-2 border-navy-900 flex items-center justify-center shadow-xs z-10">
                {getIconForTitle(item.title)}
              </div>

              {/* Program Detail Card */}
              <div className="bg-white border border-navy-150 rounded-2xl p-5 md:p-6 hover:border-navy-400 transition-all shadow-xs hover:shadow-md group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-navy-100 mb-3">
                  {/* Time Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-navy-50 text-navy-950 border border-navy-200 px-3 py-1 rounded-full text-xs font-sans font-bold tracking-wide">
                      <Clock className="w-3.5 h-3.5 text-navy-700" />
                      <span>{item.time}</span>
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans font-medium">({item.duration})</span>
                  </div>

                  {/* Category Pill */}
                  <span className={`text-[9px] uppercase tracking-wider font-sans font-bold px-2.5 py-1 rounded-full self-start sm:self-auto ${
                    item.isChurch 
                      ? 'bg-navy-50 text-navy-900 border border-navy-200' 
                      : 'bg-white text-navy-950 border border-navy-300'
                  }`}>
                    {item.isChurch ? 'Church Ceremony' : 'Tropical Gardens Reception'}
                  </span>
                </div>

                {/* Title and Description */}
                <h4 className="text-lg md:text-xl font-serif font-medium text-navy-950 group-hover:text-navy-700 transition-colors">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="text-stone-600 text-xs md:text-sm mt-1.5 leading-relaxed font-sans">
                    {item.description}
                  </p>
                )}

                {/* Bullets */}
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600 font-sans">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-navy-700" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Dedicated Route Navigation Action */}
                {(item.title.toLowerCase().includes('scenic') || item.title.toLowerCase().includes('route')) && (
                  <div className="mt-4 pt-3.5 border-t border-navy-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-navy-50/50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 text-xs font-sans text-navy-900 font-medium">
                      <MapPin className="w-4 h-4 text-navy-700 shrink-0" />
                      <span>Via Gatundu - Kiganjo Road (~40–45 min drive)</span>
                    </div>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&origin=Our+Lady+of+the+Holy+Rosary+Kamwangi+Catholic+Church&destination=Tropical+Gardens+Ruiru+Kimbo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-navy-900 hover:bg-navy-800 text-white rounded-full text-xs font-sans font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
                    >
                      <Navigation className="w-3.5 h-3.5 text-amber-300" />
                      <span>Open GPS Route</span>
                      <ExternalLink className="w-3 h-3 text-stone-300" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* QR Code Quick Banner Card */}
        <div className="mt-14 bg-white border border-navy-200/90 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-navy-50 border border-navy-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
              <img
                src={qrDataUrl}
                alt="Programme QR Code Preview"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg text-navy-950 font-semibold">
                Wedding Programme QR Code
              </h4>
              <p className="text-xs text-stone-600 font-sans mt-0.5 max-w-md">
                Guests can scan this code to follow the order of events on their phones. Download the high-res PNG for church bulletins or table cards.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-full text-xs font-sans font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <QrCode className="w-4 h-4 text-amber-300" />
            <span>View / Download QR</span>
          </button>
        </div>

        {/* Closing Card */}
        <div className="mt-10 text-center bg-white border border-navy-150 p-6 rounded-3xl max-w-xl mx-auto shadow-xs">
          <p className="font-serif text-stone-900 italic text-base">
            “With grateful hearts, we eagerly look forward to sharing every precious moment of our wedding day with you.”
          </p>
          <p className="text-xs text-navy-900 font-sans font-bold uppercase tracking-wider mt-2">
            Sylvia &amp; Dr. Peter
          </p>
        </div>
      </div>

      {/* QR Code Modal Dialog */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-navy-200 relative text-center"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-navy-900 hover:bg-navy-50 rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-navy-800 bg-navy-50 border border-navy-200 px-3 py-1 rounded-full inline-block mb-2">
                Digital Guest Programme
              </span>

              <h3 className="font-serif text-2xl text-navy-950 font-medium">
                Wedding Programme QR Code
              </h3>
              <p className="text-xs text-stone-600 font-sans mt-1 mb-5">
                Scan with any smartphone camera to open the live schedule directly.
              </p>

              {/* QR Code Container */}
              <div className="bg-white border-2 border-navy-900/90 rounded-2xl p-4 inline-block shadow-md mb-5 mx-auto">
                <img
                  src={qrDataUrl}
                  alt="Sylvia & Dr. Peter Wedding Programme QR Code"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto"
                />
                <div className="mt-2 text-[10px] font-mono text-stone-500 font-medium tracking-tight break-all max-w-[240px] truncate mx-auto">
                  {getProgrammeUrl()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownloadQr}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download PNG</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-navy-50 border border-navy-200 text-navy-900 rounded-xl text-xs font-sans font-bold uppercase tracking-wider shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-stone-500 font-sans mt-4 italic">
                Tip: Perfect for church bulletin inserts, reception welcome signage, and table place cards.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
