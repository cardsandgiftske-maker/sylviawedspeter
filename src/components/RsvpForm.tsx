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
        backgroundColor: '#FFFFFF'
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
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setErrorMessage('Failed to submit RSVP. Please verify your connection and try again.');
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
      <section className="relative py-24 bg-[#FAFBFD] text-stone-850 border-t border-navy-100" id="rsvp-section">
        {/* Decorative backdrop glow in Navy */}
        <div className="absolute inset-0 bg-radial-gradient from-navy-900/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-navy-700 text-[11px] font-bold tracking-[0.25em] uppercase font-sans block mb-2">
              CONFIRM ATTENDANCE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-navy-950 tracking-tight mb-3">
              RSVP
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-navy-600/50 to-transparent mx-auto mb-6" />
            
            {/* Prominent Callout Banner for RSVP Deadline */}
            <div className="inline-block w-full max-w-xl mx-auto bg-white border-2 border-navy-200/90 shadow-sm rounded-3xl p-6 text-navy-950 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy-900 via-navy-700 to-navy-950" />
              <div className="flex items-center justify-center gap-2 mb-2 text-navy-900 font-sans font-bold text-xs uppercase tracking-widest">
                <Calendar className="w-4 h-4 text-navy-700" />
                <span>RSVP Deadline: {WEDDING_DETAILS.rsvpDeadline}</span>
              </div>
              <p className="text-base md:text-lg font-serif font-medium text-navy-950 leading-relaxed">
                {WEDDING_DETAILS.rsvpNote}
              </p>
              <p className="text-xs text-stone-500 font-sans mt-2 italic">
                We eagerly await celebrating our special day with you!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="md:col-span-6 bg-white border border-navy-150 p-8 rounded-3xl shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-navy-950 flex items-center gap-2 font-medium">
                  <Mail className="w-5 h-5 text-navy-800" />
                  <span>RSVP Form</span>
                </h3>
                {isFirebaseConfigured ? (
                  <span className="flex items-center gap-1.5 text-[9px] text-navy-900 bg-navy-50 border border-navy-200 px-2.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider shadow-2xs">
                    <span className="w-1.5 h-1.5 bg-navy-700 rounded-full animate-pulse" />
                    <span>Cloud Live</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] text-stone-500 bg-stone-100 border border-stone-250 px-2.5 py-0.5 rounded-full font-sans font-semibold uppercase tracking-wider" title="Local sandbox mode active.">
                    <span className="w-1.5 h-1.5 bg-navy-700 rounded-full" />
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
                    className="w-full bg-navy-50/30 border border-navy-150 focus:border-navy-800 focus:ring-1 focus:ring-navy-800/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all"
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
                    className="w-full bg-navy-50/30 border border-navy-150 focus:border-navy-800 focus:ring-1 focus:ring-navy-800/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all"
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
                          ? 'bg-navy-900 border-navy-900 text-white shadow-md'
                          : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-navy-900 hover:border-navy-300'
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
                {willAttend === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-1"
                  >
                    {/* Adults counter */}
                    <div className="p-3.5 bg-navy-50/40 border border-navy-150 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-navy-800" />
                        <div>
                          <p className="text-xs font-sans font-bold text-navy-950 uppercase tracking-wider">Number of Adults</p>
                          <p className="text-[11px] text-stone-500 font-sans">Including yourself</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                          className="w-8 h-8 rounded-full bg-white border border-navy-200 hover:bg-navy-50 text-navy-900 flex items-center justify-center cursor-pointer shadow-2xs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-base font-bold text-navy-950 w-6 text-center">
                          {adultsCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdultsCount(Math.min(10, adultsCount + 1))}
                          className="w-8 h-8 rounded-full bg-white border border-navy-200 hover:bg-navy-50 text-navy-900 flex items-center justify-center cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Children counter */}
                    <div className="p-3.5 bg-navy-50/40 border border-navy-150 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Baby className="w-4 h-4 text-navy-800" />
                        <div>
                          <p className="text-xs font-sans font-bold text-navy-950 uppercase tracking-wider">Children</p>
                          <p className="text-[11px] text-stone-500 font-sans">Under 12 years</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-8 h-8 rounded-full bg-white border border-navy-200 hover:bg-navy-50 text-navy-900 flex items-center justify-center cursor-pointer shadow-2xs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-base font-bold text-navy-950 w-6 text-center">
                          {childrenCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.min(10, childrenCount + 1))}
                          className="w-8 h-8 rounded-full bg-white border border-navy-200 hover:bg-navy-50 text-navy-900 flex items-center justify-center cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Warm wishes / dietary note */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                    Warm Wishes or Dietary Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Share a sweet note with Sylvia & Dr. Peter or dietary preference..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-navy-50/30 border border-navy-150 focus:border-navy-800 focus:ring-1 focus:ring-navy-800/20 rounded-xl px-4 py-2.5 text-sm text-stone-900 outline-none transition-all"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-navy-900 hover:bg-navy-800 active:scale-98 disabled:opacity-50 text-white font-sans font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-champagne-300" />
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
                  /* Success / Downloadable E-Card in Navy Blue and Pure White */
                  <div className="w-full max-w-[380px] flex flex-col items-center space-y-4">
                    {/* Visual Printable/Downloadable E-Card Element */}
                    <div
                      ref={cardRef}
                      id="downloadable-wedding-ecard"
                      className="w-full bg-white border-2 border-navy-300 rounded-3xl p-6 shadow-xl relative flex flex-col overflow-hidden text-stone-850"
                    >
                      {/* Decorative Navy Accents */}
                      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-navy-950 via-navy-800 to-navy-900" />
                      <div className="absolute -top-12 -right-12 w-28 h-28 bg-navy-300/15 rounded-full blur-xl pointer-events-none" />
                      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-navy-400/15 rounded-full blur-xl pointer-events-none" />

                      {/* Top Monogram & Header */}
                      <div className="text-center pb-3 border-b border-navy-100">
                        <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-navy-900 bg-navy-50 border border-navy-200 px-3 py-1 rounded-full inline-block mb-1.5">
                          Official Admittance E-Card
                        </span>
                        <h4 className="font-serif text-2xl font-normal text-navy-950 tracking-tight">
                          Sylvia &amp; Dr. Peter
                        </h4>
                        <p className="text-[9px] font-serif italic text-stone-500 mt-0.5 leading-tight">
                          Families of Mr &amp; Mrs Francis Mwangi Kamau and Late Mr Charles Muchiri Njau &amp; Mrs Lucy Wanjiku Muchiri
                        </p>
                      </div>

                      {/* Couple Photo Section */}
                      <div className="my-3 relative rounded-2xl overflow-hidden border border-navy-200 shadow-2xs">
                        <img
                          src={portraitImg}
                          alt="Sylvia & Dr. Peter Kamau Mwangi Wedding Portrait"
                          className="w-full h-44 object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent flex items-end p-2.5">
                          <p className="text-white text-xs font-serif italic font-light tracking-wide">
                            “Two are better than one...” — Eccl. 4:9
                          </p>
                        </div>
                      </div>

                      {/* Wedding Details */}
                      <div className="bg-navy-50/50 border border-navy-150 rounded-2xl p-3.5 space-y-2 text-center shadow-2xs">
                        <div className="space-y-0.5">
                          <p className="text-[9px] text-stone-400 font-sans font-bold uppercase tracking-widest">Date &amp; Schedule</p>
                          <p className="font-serif text-sm font-semibold text-navy-950">Saturday, 12th December 2026</p>
                        </div>
                        <div className="border-t border-navy-150 pt-1.5 space-y-0.5">
                          <p className="text-[9px] text-stone-400 font-sans font-bold uppercase tracking-widest">Venues</p>
                          <p className="text-xs font-serif font-medium text-navy-950">
                            <strong>Church:</strong> Kamwangi Catholic Church (10:00 AM)
                          </p>
                          <p className="text-xs font-serif font-medium text-navy-950">
                            <strong>Reception:</strong> Tropical Gardens Ruiru-Kimbo (1:00 PM)
                          </p>
                        </div>
                      </div>

                      {/* Guest Details Section */}
                      <div className="mt-3 bg-white border border-navy-200 rounded-2xl p-3.5 text-center space-y-1.5 shadow-2xs">
                        <p className="text-[9px] text-navy-800 uppercase tracking-widest font-sans font-bold">Admit Guest / RSVP Record</p>
                        <p className="font-serif text-base font-semibold text-navy-950">{submittedGuest.fullName}</p>
                        
                        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                          <span className={`text-[10px] uppercase font-sans font-bold px-2.5 py-0.5 rounded-full ${
                            submittedGuest.willAttend === 'yes' ? 'bg-navy-900 text-white' : 'bg-stone-300 text-stone-700'
                          }`}>
                            {submittedGuest.willAttend === 'yes' ? 'Attending' : 'Declined'}
                          </span>
                          {submittedGuest.willAttend === 'yes' && (
                            <span className="text-[10px] font-sans font-medium text-stone-800 bg-white border border-navy-200 px-2.5 py-0.5 rounded-full">
                              {submittedGuest.adultsCount} Adult{submittedGuest.adultsCount !== 1 ? 's' : ''}
                              {(submittedGuest.childrenCount ?? 0) > 0 ? `, ${submittedGuest.childrenCount} Child${submittedGuest.childrenCount !== 1 ? 'ren' : ''}` : ''}
                            </span>
                          )}
                        </div>

                        {/* Invitation Code & Verification QR */}
                        <div className="pt-2 flex items-center justify-between border-t border-navy-100 text-left">
                          <div>
                            <p className="text-[9px] text-stone-400 uppercase font-bold tracking-wider">Verification Code</p>
                            <p className="font-mono text-xs font-bold text-navy-900">{submittedGuest.eCardCode}</p>
                          </div>
                          <div className="w-10 h-10 bg-white border border-navy-200 rounded-lg p-1 flex items-center justify-center">
                            <QrCode className="w-full h-full text-navy-950" />
                          </div>
                        </div>
                      </div>

                      {/* Dress Code banner */}
                      <div className="text-center mt-2.5 bg-navy-50/70 border border-navy-200 rounded-xl p-2">
                        <p className="text-[9px] text-navy-900 font-sans font-bold uppercase tracking-wider">
                          Dress Code: Colorful, Vibrant, and Elegant ✨
                        </p>
                      </div>
                    </div>

                    {/* Download & Share Action Buttons */}
                    <div className="w-full space-y-2.5 pt-2">
                      <button
                        onClick={handleDownloadECard}
                        disabled={downloading}
                        className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 active:scale-98 disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
                        className="w-full py-2.5 text-xs text-stone-500 hover:text-navy-900 font-semibold tracking-wide block text-center cursor-pointer transition-colors"
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
                    className="w-full max-w-[360px] bg-white border border-navy-150 shadow-xs rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-5 relative overflow-hidden group"
                  >
                    {/* Couple Portrait Preview */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden border border-navy-200 relative shadow-inner">
                      <img
                        src={portraitImg}
                        alt="Sylvia & Dr. Peter Wedding Preview"
                        className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent flex items-end justify-center p-2">
                        <span className="text-[10px] text-white font-serif uppercase tracking-widest">Sylvia &amp; Dr. Peter</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-serif text-lg text-navy-950 font-medium">Downloadable E-Card Admittance</h4>
                      <p className="text-xs text-stone-500 leading-relaxed max-w-[260px] mx-auto">
                        Kindly confirm your attendance with your full names by 30th November 2026 to reserve your seat and instantly receive your wedding admittance e-card.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-navy-100 w-full text-[10px] text-navy-700 uppercase tracking-widest font-sans font-bold flex items-center justify-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-navy-800" />
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
              className="flex items-center gap-2.5 px-6 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-champagne-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>RSVP by 30th Nov</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
