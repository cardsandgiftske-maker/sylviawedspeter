import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, AlertCircle, Sparkles, User, Phone, Check, QrCode, Download, Users, Baby, Plus, Minus, Image as ImageIcon, Calendar } from 'lucide-react';
import { toPng } from 'html-to-image';
import { RsvpGuest } from '../types';
import { WEDDING_DETAILS } from '../data';
import { saveRsvp, isFirebaseConfigured, hasPhoneAlreadyRsvped } from '../lib/firebase';
import portraitImg from '../assets/images/sylvia_peter_1790335913583.jpg';

export default function RsvpForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [submittedGuest, setSubmittedGuest] = useState<RsvpGuest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);

  // Floating button state
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowFloatingBtn(false);
        } else {
          setShowFloatingBtn(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadECard = async () => {
    if (!cardRef.current || !submittedGuest) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#FAF9F6'
      });
      const link = document.createElement('a');
      const safeName = submittedGuest.fullName.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `Sylvia_Peter_Wedding_ECard_${safeName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate downloadable e-card image:', err);
    } finally {
      setDownloading(false);
    }
  };

  const generateInvitationCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'SP-26-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    setLoading(true);

    try {
      // Check if phone number has already submitted an RSVP
      const alreadySubmitted = await hasPhoneAlreadyRsvped(phoneNumber.trim());
      if (alreadySubmitted) {
        setErrorMessage('This phone number has already submitted an RSVP. Each phone number can only RSVP once. Please contact Sylvia or Dr. Peter if you need to update your attendance details.');
        setLoading(false);
        return;
      }

      const newGuest: RsvpGuest = {
        id: 'rsvp-' + Date.now(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        willAttend,
        adultsCount: willAttend === 'yes' ? adultsCount : 0,
        childrenCount: willAttend === 'yes' ? childrenCount : 0,
        submittedAt: new Date().toISOString(),
        eCardCode: generateInvitationCode(),
        notes: notes.trim() || undefined,
      };

      // Save to Firebase (with transparent localStorage fallback inside)
      await saveRsvp(newGuest);

      setSubmittedGuest(newGuest);
      setLoading(false);

      // Reset fields
      setFullName('');
      setPhoneNumber('');
      setWillAttend('yes');
      setAdultsCount(1);
      setChildrenCount(0);
      setNotes('');

      // Dispatches custom event to notify Admin Panel to reload
      window.dispatchEvent(new Event('rsvp_database_updated'));
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const scrollToRsvp = () => {
    const element = document.getElementById('rsvp-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative py-24 bg-[#FAF7F2] text-stone-850 border-t border-stone-200/60" id="rsvp-section">
        {/* Decorative backdrop glow */}
        <div className="absolute inset-0 bg-radial-gradient from-sapphire-500/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-sapphire-700 text-[11px] font-bold tracking-[0.2em] uppercase font-sans block mb-2">
              CONFIRM ATTENDANCE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 tracking-tight mb-3">
              RSVP
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent mx-auto mb-6" />
            
            {/* Prominent Callout Banner for RSVP Deadline */}
            <div className="inline-block w-full max-w-xl mx-auto bg-white border border-emerald-300 shadow-sm rounded-3xl p-6 text-stone-900 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sapphire-600 via-emerald-500 to-ocean-500" />
              <div className="flex items-center justify-center gap-2 mb-2 text-sapphire-800 font-sans font-bold text-xs uppercase tracking-widest">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>RSVP Deadline: {WEDDING_DETAILS.rsvpDeadline}</span>
              </div>
              <p className="text-base md:text-lg font-serif font-medium text-stone-900 leading-relaxed">
                {WEDDING_DETAILS.rsvpNote}
              </p>
              <p className="text-xs text-stone-500 font-sans mt-2 italic">
                We eagerly await celebrating our special day with you!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="md:col-span-6 bg-white border border-stone-200/60 p-8 rounded-3xl shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-stone-900 flex items-center gap-2 font-medium">
                  <Mail className="w-5 h-5 text-sapphire-700" />
                  <span>RSVP Form</span>
                </h3>
                {isFirebaseConfigured ? (
                  <span className="flex items-center gap-1.5 text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider shadow-2xs">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                    <span>Cloud Live</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] text-stone-500 bg-stone-100 border border-stone-250 px-2.5 py-0.5 rounded-full font-sans font-semibold uppercase tracking-wider" title="Local sandbox mode active.">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span>Ready</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-5" id="rsvp-wedding-form">
                {/* Full Name input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Full Names</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel & Grace Kariuki"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-sapphire-600 focus:ring-1 focus:ring-sapphire-600/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all"
                  />
                </div>

                {/* Phone Number input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +254 700 000 000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-sapphire-600 focus:ring-1 focus:ring-sapphire-600/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all"
                  />
                </div>

                {/* Will Attend toggle radio */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                    Will you attend?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWillAttend('yes')}
                      className={`py-3.5 text-xs uppercase tracking-wider font-sans font-bold border rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        willAttend === 'yes'
                          ? 'bg-sapphire-800 border-sapphire-800 text-white shadow-md'
                          : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Yes, with joy!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWillAttend('no')}
                      className={`py-3.5 text-xs uppercase tracking-wider font-sans font-bold border rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        willAttend === 'no'
                          ? 'bg-stone-200 border-stone-300 text-stone-800 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Regretfully declines</span>
                    </button>
                  </div>
                </div>

                {/* Number of Adults & Children Attending */}
                <AnimatePresence>
                  {willAttend === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pt-2 pb-1 overflow-hidden"
                    >
                      <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                        Number of Guests Attending
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Adults Input */}
                        <div className="bg-stone-50/70 border border-stone-200 p-3.5 rounded-xl space-y-2">
                          <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans font-bold flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-sapphire-700" />
                              <span>Adults</span>
                            </span>
                            <span className="text-[10px] font-normal text-stone-400 capitalize">(Age 13+)</span>
                          </label>
                          <div className="flex items-center justify-between bg-white border border-stone-200 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                              className="w-8 h-8 rounded-md bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 font-bold flex items-center justify-center cursor-pointer transition-all"
                              title="Decrease adults count"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="20"
                              value={adultsCount}
                              onChange={(e) => setAdultsCount(Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-12 text-center font-serif text-base font-semibold text-stone-900 outline-none bg-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setAdultsCount(adultsCount + 1)}
                              className="w-8 h-8 rounded-md bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 font-bold flex items-center justify-center cursor-pointer transition-all"
                              title="Increase adults count"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Children Input */}
                        <div className="bg-stone-50/70 border border-stone-200 p-3.5 rounded-xl space-y-2">
                          <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans font-bold flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Baby className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Children</span>
                            </span>
                            <span className="text-[10px] font-normal text-stone-400 capitalize">(Under 13)</span>
                          </label>
                          <div className="flex items-center justify-between bg-white border border-stone-200 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                              className="w-8 h-8 rounded-md bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 font-bold flex items-center justify-center cursor-pointer transition-all"
                              title="Decrease children count"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={childrenCount}
                              onChange={(e) => setChildrenCount(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-12 text-center font-serif text-base font-semibold text-stone-900 outline-none bg-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setChildrenCount(childrenCount + 1)}
                              className="w-8 h-8 rounded-md bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 font-bold flex items-center justify-center cursor-pointer transition-all"
                              title="Increase children count"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 text-[11px] text-emerald-900 font-sans flex items-center justify-between">
                        <span>Total seats reserved:</span>
                        <span className="font-bold font-serif text-xs text-emerald-950">
                          {adultsCount + childrenCount} {adultsCount + childrenCount === 1 ? 'Guest' : 'Guests'} ({adultsCount} {adultsCount === 1 ? 'Adult' : 'Adults'}{childrenCount > 0 ? `, ${childrenCount} ${childrenCount === 1 ? 'Child' : 'Children'}` : ''})
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Custom Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                    Special Notes / Dietary / Congratulations
                  </label>
                  <textarea
                    placeholder="Optional message (e.g., Congratulations Sylvia & Dr. Peter!, or dietary requirements)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-sapphire-600 focus:ring-1 focus:ring-sapphire-600/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all resize-none"
                  />
                </div>

                {/* Errors display */}
                {errorMessage && (
                  <div className="p-3.5 bg-rose-50 border border-rose-250 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-sapphire-800 hover:bg-sapphire-900 active:scale-98 disabled:opacity-50 text-white font-sans font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span>Confirm &amp; Generate E-Card</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* E-Invitation Display Column */}
            <div className="md:col-span-6 flex flex-col items-center">
              <AnimatePresence mode="wait">
                {submittedGuest ? (
                  /* Success / Downloadable E-Card */
                  <div className="w-full max-w-[380px] flex flex-col items-center space-y-4">
                    {/* Visual Printable/Downloadable E-Card Element */}
                    <div
                      ref={cardRef}
                      id="downloadable-wedding-ecard"
                      className="w-full bg-[#FAF9F6] border-2 border-champagne-400 rounded-3xl p-6 shadow-xl relative flex flex-col overflow-hidden text-stone-800"
                    >
                      {/* Decorative Gold & Blue/Green Accents */}
                      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-sapphire-700 via-emerald-600 to-ocean-500" />
                      <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-300/15 rounded-full blur-xl pointer-events-none" />
                      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-sapphire-400/15 rounded-full blur-xl pointer-events-none" />

                      {/* Top Monogram & Header */}
                      <div className="text-center pb-3 border-b border-stone-200/80">
                        <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-sapphire-800 bg-sapphire-50 border border-sapphire-200 px-3 py-1 rounded-full inline-block mb-1.5">
                          Official Admittance E-Card
                        </span>
                        <h4 className="font-serif text-2xl font-normal text-stone-900 tracking-tight">
                          Sylvia &amp; Dr. Peter
                        </h4>
                        <p className="text-[9px] font-serif italic text-stone-500 mt-0.5 leading-tight">
                          Families of Mr &amp; Mrs Francis Mwangi Kamau and Late Mr Charles Muchiri Njau &amp; Mrs Lucy Wanjiku Muchiri
                        </p>
                      </div>

                      {/* Couple Photo Section */}
                      <div className="my-3 relative rounded-2xl overflow-hidden border border-emerald-300/40 shadow-2xs">
                        <img
                          src={portraitImg}
                          alt="Sylvia & Dr. Peter Kamau Mwangi Wedding Portrait"
                          className="w-full h-44 object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-2.5">
                          <p className="text-white text-xs font-serif italic font-light tracking-wide">
                            “Two are better than one...” — Eccl. 4:9
                          </p>
                        </div>
                      </div>

                      {/* Wedding Details */}
                      <div className="bg-white/90 border border-stone-200/70 rounded-2xl p-3.5 space-y-2 text-center shadow-2xs">
                        <div className="space-y-0.5">
                          <p className="text-[9px] text-stone-400 font-sans font-bold uppercase tracking-widest">Date &amp; Schedule</p>
                          <p className="font-serif text-sm font-semibold text-stone-900">Saturday, 12th December 2026</p>
                        </div>
                        <div className="border-t border-stone-100 pt-1.5 space-y-0.5">
                          <p className="text-[9px] text-stone-400 font-sans font-bold uppercase tracking-widest">Venues</p>
                          <p className="text-xs font-serif font-medium text-stone-850">
                            <strong>Church:</strong> Kamwangi Catholic Church (10:00 AM)
                          </p>
                          <p className="text-xs font-serif font-medium text-stone-850">
                            <strong>Reception:</strong> Tropical Gardens Ruiru-Kimbo (1:00 PM)
                          </p>
                        </div>
                      </div>

                      {/* Guest Details Section */}
                      <div className="mt-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-center space-y-1.5">
                        <p className="text-[9px] text-emerald-800 uppercase tracking-widest font-sans font-bold">Admit Guest / RSVP Record</p>
                        <p className="font-serif text-base font-semibold text-stone-900">{submittedGuest.fullName}</p>
                        
                        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                          <span className={`text-[10px] uppercase font-sans font-bold px-2.5 py-0.5 rounded-full ${
                            submittedGuest.willAttend === 'yes' ? 'bg-sapphire-800 text-white' : 'bg-stone-300 text-stone-700'
                          }`}>
                            {submittedGuest.willAttend === 'yes' ? 'Attending' : 'Declined'}
                          </span>
                          {submittedGuest.willAttend === 'yes' && (
                            <span className="text-[10px] font-sans font-medium text-stone-800 bg-white border border-emerald-300 px-2.5 py-0.5 rounded-full">
                              {submittedGuest.adultsCount} Adult{submittedGuest.adultsCount !== 1 ? 's' : ''}
                              {(submittedGuest.childrenCount ?? 0) > 0 ? `, ${submittedGuest.childrenCount} Child${submittedGuest.childrenCount !== 1 ? 'ren' : ''}` : ''}
                            </span>
                          )}
                        </div>

                        {/* Invitation Code & Verification QR */}
                        <div className="pt-2 flex items-center justify-between border-t border-emerald-200/80 text-left">
                          <div>
                            <p className="text-[9px] text-stone-400 uppercase font-bold tracking-wider">Verification Code</p>
                            <p className="font-mono text-xs font-bold text-sapphire-800">{submittedGuest.eCardCode}</p>
                          </div>
                          <div className="w-10 h-10 bg-white border border-stone-200 rounded-lg p-1 flex items-center justify-center">
                            <QrCode className="w-full h-full text-stone-800" />
                          </div>
                        </div>
                      </div>

                      {/* Dress Code banner */}
                      <div className="text-center mt-2.5 bg-sapphire-50/60 border border-sapphire-200/60 rounded-xl p-2">
                        <p className="text-[9px] text-sapphire-900 font-sans font-bold uppercase tracking-wider">
                          Dress Code: Colorful, Vibrant, and Elegant ✨
                        </p>
                      </div>
                    </div>

                    {/* Download & Share Action Buttons */}
                    <div className="w-full space-y-2.5 pt-2">
                      <button
                        onClick={handleDownloadECard}
                        disabled={downloading}
                        className="w-full py-3.5 bg-sapphire-800 hover:bg-sapphire-900 active:scale-98 disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        {downloading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Generating Image...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download E-Card (PNG)</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSubmittedGuest(null)}
                        className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 font-semibold tracking-wide block text-center cursor-pointer transition-colors"
                      >
                        ← Submit Another RSVP
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard / Instruction Side Card */
                  <motion.div
                    key="standard-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-[360px] bg-white border border-stone-200 shadow-xs rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-5 relative overflow-hidden group"
                  >
                    {/* Couple Portrait Preview */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden border border-stone-200 relative shadow-inner">
                      <img
                        src={portraitImg}
                        alt="Sylvia & Dr. Peter Wedding Preview"
                        className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-2">
                        <span className="text-[10px] text-white font-serif uppercase tracking-widest">Sylvia &amp; Dr. Peter</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-serif text-lg text-stone-850 font-medium">Downloadable E-Card Admittance</h4>
                      <p className="text-xs text-stone-500 leading-relaxed max-w-[260px] mx-auto">
                        Kindly confirm your attendance with your full names by 30th November 2026 to reserve your seat and instantly receive your wedding admittance e-card.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 w-full text-[10px] text-stone-400 uppercase tracking-widest font-sans font-bold flex items-center justify-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Instant Digital Admittance Pass</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            id="floating-rsvp-button-wrapper"
          >
            <button
              onClick={scrollToRsvp}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-sapphire-800 hover:bg-sapphire-900 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>RSVP by 30th Nov</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
