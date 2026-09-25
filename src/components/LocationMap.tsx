import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, ArrowUpRight, Calendar, Clock, Car } from 'lucide-react';
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
    <section className="relative py-24 bg-[#FAF9F6] text-stone-850 border-t border-stone-200/60" id="maps-section">
      <div className="absolute inset-0 bg-radial-gradient from-emerald-400/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sapphire-700 text-xs font-bold tracking-[0.2em] uppercase font-sans block mb-2">
            LOCATIONS &amp; VENUES
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mb-4">When &amp; Where</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto" />
          <p className="text-stone-600 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
            Find directions, driving routes, and interactive maps for our wedding ceremony in Kamwangi and celebration at Tropical Gardens, Ruiru-Kimbo.
          </p>
        </div>

        {/* Date, Location, Time Info Panel (When & Where) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto bg-white border border-stone-200/80 p-6 rounded-2xl shadow-sm mb-8 relative z-10">
          {/* Calendar Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-sapphire-50 text-sapphire-700 flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">The Date</p>
            <p className="text-sm text-stone-800 font-serif font-medium">Saturday</p>
            <p className="text-base text-sapphire-800 font-serif font-semibold">12th December 2026</p>
          </div>

          {/* Time Card */}
          <div className="flex flex-col items-center text-center p-3 border-y sm:border-y-0 sm:border-x border-stone-150">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">Schedule</p>
            <p className="text-sm text-stone-800 font-serif font-semibold">10:00 AM – 12:00 PM (Church)</p>
            <p className="text-xs text-stone-600 font-sans mt-1">1:00 PM – 5:00 PM (Reception)</p>
          </div>

          {/* Venue Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-ocean-50 text-ocean-800 flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">Venues</p>
            <p className="text-sm text-stone-800 font-serif font-medium leading-tight">Kamwangi &amp; Ruiru-Kimbo</p>
            <p className="text-xs text-emerald-800 font-sans mt-1 font-medium">Kiambu County, Kenya</p>
          </div>
        </div>

        {/* Travel Between Venues Notice */}
        <div className="max-w-3xl mx-auto mb-10 bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-950 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-900">
                Church to Reception Driving Distance
              </p>
              <p className="font-serif text-sm text-emerald-800 mt-0.5">
                Approximately <strong>40 to 45 minutes drive</strong> from Kamwangi Catholic Church to Tropical Gardens Ruiru-Kimbo.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white text-emerald-800 font-sans font-bold text-[11px] rounded-full border border-emerald-300 shadow-2xs whitespace-nowrap">
            ~40–45 Mins Drive
          </span>
        </div>

        {/* Location Toggle Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-stone-100 border border-stone-250 p-1.5 rounded-full shadow-inner flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveVenue('ceremony')}
              className={`px-5 py-2.5 text-xs md:text-sm font-sans font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'ceremony' ? 'bg-sapphire-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Church: Kamwangi Catholic (10 AM)</span>
            </button>
            <button
              onClick={() => setActiveVenue('reception')}
              className={`px-5 py-2.5 text-xs md:text-sm font-sans font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'reception' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
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
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-stone-200/60 rounded-2xl shadow-md relative overflow-hidden">
            {/* Venue Photo header */}
            <div className="relative h-48 w-full overflow-hidden border-b border-stone-150">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-7 flex flex-col justify-between flex-1">
              <div className="space-y-5 z-10">
                <span className={`text-[10px] tracking-widest uppercase font-sans font-bold px-3 py-1 rounded-full border inline-block ${
                  activeVenue === 'ceremony' 
                    ? 'text-sapphire-800 bg-sapphire-50 border-sapphire-200' 
                    : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                }`}>
                  {activeVenue === 'ceremony' ? 'Part A: Holy Matrimony' : 'Part B: Reception & Celebration'}
                </span>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl lg:text-3xl text-stone-900 leading-tight font-medium">
                    {venueInfo.venue}
                  </h3>
                  <p className="text-stone-500 text-xs tracking-wider uppercase font-sans font-medium">
                    {activeVenue === 'ceremony' ? 'Sacrament of Holy Matrimony' : 'Luncheon, Feasting & Joyful Dancing'}
                  </p>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-stone-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sapphire-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-sans font-bold">Address</p>
                      <p className="text-sm text-stone-700 leading-normal mt-0.5">{venueInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-sans font-bold">Time</p>
                      <p className="text-sm text-stone-700 mt-0.5 font-medium">
                        {venueInfo.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driving navigation CTA button */}
              <div className="mt-8 pt-6 border-t border-stone-100 z-10">
                <a
                  href={getNavigationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-50 border border-stone-200 hover:bg-sapphire-800 hover:text-white font-sans font-bold uppercase tracking-wider text-xs text-stone-850 rounded-xl transition-all shadow-xs group"
                >
                  <span>Open Directions in Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map Iframe */}
          <div className="lg:col-span-7 bg-white border border-stone-200/60 rounded-2xl overflow-hidden min-h-[380px] lg:min-h-auto flex shadow-md relative">
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
