import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, ArrowUpRight, Calendar, Clock, Car, Compass as CompassIcon } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

import churchVenueImg from '../assets/images/kamwangi_church_1790335887800.jpg';
import receptionVenueImg from '../assets/images/tropical_gardens_1790335900217.jpg';

export default function LocationMap() {
  const [activeVenue, setActiveVenue] = useState<'ceremony' | 'reception'>('ceremony');

  const venueInfo = activeVenue === 'ceremony' ? WEDDING_DETAILS.ceremony : WEDDING_DETAILS.reception;

  const getNavigationUrl = () => {
    const venueName = encodeURIComponent(venueInfo.venue + ' ' + venueInfo.address);
    return `https://www.google.com/maps/search/?api=1&query=${venueName}`;
  };

  return (
    <section className="relative py-24 bg-[#FAFBFD] text-stone-850 border-t border-navy-100" id="maps-section">
      {/* Subtle navy background radial vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-navy-900/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-navy-700 text-xs font-bold tracking-[0.25em] uppercase font-sans block mb-2">
            LOCATIONS &amp; VENUES
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-navy-950 mb-4">
            When &amp; Where
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-navy-600/50 to-transparent mx-auto" />
          <p className="text-stone-600 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
            Find directions, driving routes, and interactive maps for our wedding ceremony in Kamwangi and reception celebration at Tropical Gardens, Ruiru-Kimbo.
          </p>
        </div>

        {/* Date, Schedule, Venues Info Cards (Navy Blue & Pure White Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto bg-white border border-navy-100 p-6 rounded-3xl shadow-sm mb-8 relative z-10">
          {/* Calendar Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-11 h-11 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center mb-2.5 border border-navy-200 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">The Date</p>
            <p className="text-sm text-stone-800 font-serif font-medium">Saturday</p>
            <p className="text-base text-navy-900 font-serif font-semibold">12th December 2026</p>
          </div>

          {/* Time Card */}
          <div className="flex flex-col items-center text-center p-3 border-y sm:border-y-0 sm:border-x border-navy-100">
            <div className="w-11 h-11 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center mb-2.5 border border-navy-200 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">Schedule</p>
            <p className="text-sm text-navy-950 font-serif font-semibold">10:00 AM – 12:00 PM (Church)</p>
            <p className="text-xs text-stone-600 font-sans mt-1">1:00 PM – 5:00 PM (Reception)</p>
          </div>

          {/* Venue Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-11 h-11 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center mb-2.5 border border-navy-200 shadow-2xs">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">Venues</p>
            <p className="text-sm text-stone-800 font-serif font-medium leading-tight">Kamwangi &amp; Ruiru-Kimbo</p>
            <p className="text-xs text-navy-700 font-sans mt-1 font-semibold">Kiambu County, Kenya</p>
          </div>
        </div>

        {/* Travel Between Venues Notice: Gatundu - Kiganjo Road Route */}
        <div className="max-w-3xl mx-auto mb-10 bg-white border-2 border-navy-200/90 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-navy-950">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white flex items-center justify-center shrink-0 shadow-md">
              <Car className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase font-sans font-extrabold tracking-wider text-navy-700 bg-navy-50 px-2.5 py-0.5 rounded-full border border-navy-200 inline-block mb-1">
                Scenic Reception Route
              </span>
              <p className="font-serif text-base sm:text-lg text-navy-950 font-medium leading-snug">
                From Kamwangi to Tropical Gardens, guests will use a: <span className="font-semibold text-navy-900 underline decoration-navy-300 underline-offset-4">Scenic drive via Gatundu - Kiganjo road</span>.
              </p>
              <p className="text-xs font-sans text-stone-600 mt-1">
                A smooth and picturesque drive connecting Kamwangi Catholic Church directly towards Ruiru-Kimbo (~40 to 45 minutes).
              </p>
            </div>
          </div>
          <span className="px-4 py-2 bg-navy-50 text-navy-900 font-sans font-bold text-xs uppercase tracking-wider rounded-full border border-navy-200 shadow-2xs whitespace-nowrap shrink-0">
            ~40–45 Mins Drive
          </span>
        </div>

        {/* Location Toggle Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-navy-50/80 border border-navy-200 p-1.5 rounded-full shadow-inner flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveVenue('ceremony')}
              className={`px-6 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'ceremony' ? 'bg-navy-900 text-white shadow-md' : 'text-stone-600 hover:text-navy-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Church: Kamwangi Catholic (10 AM)</span>
            </button>
            <button
              onClick={() => setActiveVenue('reception')}
              className={`px-6 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'reception' ? 'bg-navy-900 text-white shadow-md' : 'text-stone-600 hover:text-navy-900'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>2. Reception: Tropical Gardens (1 PM)</span>
            </button>
          </div>
        </div>

        {/* Info + Map Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Venue Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-navy-150 rounded-3xl shadow-md relative overflow-hidden">
            {/* Venue Photo header */}
            <div className="relative h-48 w-full overflow-hidden border-b border-navy-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVenue}
                  src={activeVenue === 'ceremony' ? churchVenueImg : receptionVenueImg}
                  alt={venueInfo.venue}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-7 flex flex-col justify-between flex-1">
              <div className="space-y-5 z-10">
                <span className="text-[10px] tracking-widest uppercase font-sans font-bold px-3 py-1 rounded-full border inline-block text-navy-900 bg-navy-50 border-navy-200">
                  {activeVenue === 'ceremony' ? 'Part A: Holy Matrimony' : 'Part B: Reception & Celebration'}
                </span>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl lg:text-3xl text-navy-950 leading-tight font-medium">
                    {venueInfo.venue}
                  </h3>
                  <p className="text-stone-500 text-xs tracking-wider uppercase font-sans font-medium">
                    {activeVenue === 'ceremony' ? 'Sacrament of Holy Matrimony' : 'Luncheon, Feasting & Joyful Dancing'}
                  </p>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-navy-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-navy-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-sans font-bold">Address</p>
                      <p className="text-sm text-stone-700 leading-normal mt-0.5">{venueInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-navy-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-sans font-bold">Schedule</p>
                      <p className="text-sm text-stone-700 mt-0.5 font-medium">
                        {venueInfo.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driving navigation CTA button */}
              <div className="mt-8 pt-6 border-t border-navy-100 z-10">
                <a
                  href={getNavigationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-sans font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md group"
                >
                  <span>Open Directions in Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map Iframe */}
          <div className="lg:col-span-7 bg-white border border-navy-150 rounded-3xl overflow-hidden min-h-[380px] lg:min-h-auto flex shadow-md relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full min-h-[380px] flex"
              >
                <iframe
                  title={`Map of ${venueInfo.venue}`}
                  src={venueInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full min-h-[420px] border-0 filter contrast-[0.98] hover:contrast-100 transition-all duration-500"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
