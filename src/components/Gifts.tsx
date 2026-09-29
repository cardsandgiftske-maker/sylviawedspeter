import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Mail, Smartphone, Check, Copy, Heart, Sparkles, ShoppingBag, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function Gifts() {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [copiedWishlistId, setCopiedWishlistId] = useState<number | null>(null);
  const [showWishlist, setShowWishlist] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyWishlistItem = (itemText: string, id: number) => {
    navigator.clipboard.writeText(itemText);
    setCopiedWishlistId(id);
    setTimeout(() => setCopiedWishlistId(null), 2500);
  };

  return (
    <section className="relative py-24 bg-[#FAFBFD] text-stone-850 border-t border-navy-100" id="gifts-section">
      {/* Subtle navy background radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-900/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-navy-700 text-xs font-bold tracking-[0.25em] uppercase font-sans block mb-2">
            REGISTRY &amp; BLESSINGS
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-navy-950 mb-4">
            Wedding Gifts &amp; Registry
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-navy-600/50 to-transparent mx-auto" />
          
          {/* Couple's Grateful Message */}
          <div className="max-w-2xl mx-auto mt-6 bg-white border border-navy-100 rounded-3xl p-6 md:p-8 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-navy-50 text-navy-800 flex items-center justify-center mx-auto mb-4 border border-navy-200">
              <Heart className="w-5 h-5 fill-navy-800 text-navy-800" />
            </div>
            <p className="font-serif italic text-base md:text-lg text-stone-850 leading-relaxed">
              “{WEDDING_DETAILS.gifts.message}”
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-sans font-bold text-navy-900 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
              <span>With Love, Sylvia &amp; Dr. Peter</span>
            </div>
          </div>
        </div>

        {/* Primary Giving Channels: Envelope & M-Pesa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Option 1: Gift in an Envelope */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-navy-150 rounded-3xl p-7 shadow-xs hover:border-navy-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-navy-50 border border-navy-200 text-navy-800 flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-navy-800 bg-navy-50 px-2.5 py-1 rounded-full border border-navy-200 inline-block mb-3">
                Traditional Blessing
              </span>
              <h3 className="font-serif text-2xl text-navy-950 font-medium mb-3">
                {WEDDING_DETAILS.gifts.envelope.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-sans mb-6">
                {WEDDING_DETAILS.gifts.envelope.instruction}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center gap-3 text-xs text-stone-500 font-sans">
              <span className="w-2 h-2 rounded-full bg-navy-700 shrink-0" />
              <span>Stationed at Tropical Gardens Ruiru-Kimbo</span>
            </div>
          </motion.div>

          {/* Option 2: M-Pesa Digital Gift */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white border border-navy-150 rounded-3xl p-7 shadow-xs hover:border-navy-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-navy-50 border border-navy-200 text-navy-800 flex items-center justify-center mb-5">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-navy-800 bg-navy-50 px-2.5 py-1 rounded-full border border-navy-200 inline-block mb-3">
                Mobile Transfer (M-Pesa)
              </span>
              <h3 className="font-serif text-2xl text-navy-950 font-medium mb-3">
                {WEDDING_DETAILS.gifts.mpesa.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-sans mb-5">
                {WEDDING_DETAILS.gifts.mpesa.instruction}
              </p>

              {/* M-Pesa Details Box */}
              <div className="bg-navy-50/50 border border-navy-150 rounded-2xl p-4 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-bold">
                      Account / Recipient
                    </p>
                    <p className="text-sm font-serif font-semibold text-navy-950">
                      {WEDDING_DETAILS.gifts.mpesa.recipientName}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-navy-150 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-bold">
                      M-Pesa Number
                    </p>
                    <p className="font-mono text-sm font-bold text-navy-900">
                      {WEDDING_DETAILS.gifts.mpesa.number}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(WEDDING_DETAILS.gifts.mpesa.number, 'phone')}
                    className="px-3 py-1.5 bg-white hover:bg-navy-50 border border-navy-200 text-xs font-sans font-bold rounded-lg text-navy-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                    title="Copy Phone Number"
                  >
                    {copiedType === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-stone-500 font-sans">
              <Gift className="w-3.5 h-3.5 text-navy-700 shrink-0" />
              <span>We are deeply touched by your generosity and love.</span>
            </div>
          </motion.div>
        </div>

        {/* Curated Home Registry Wishlist: Placed discreetly so only interested guests click to see it */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-navy-200/80 rounded-3xl p-6 sm:p-8 shadow-xs text-center">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 border border-navy-200 text-navy-800 flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-5 h-5 text-navy-800" />
            </div>

            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-navy-800 bg-navy-50 border border-navy-200 px-3 py-1 rounded-full inline-block mb-2">
              Physical Gift Option
            </span>

            <h3 className="font-serif text-xl sm:text-2xl text-navy-950 font-normal">
              Home Registry Wishlist
            </h3>

            <p className="text-stone-600 font-sans text-xs sm:text-sm max-w-lg mx-auto mt-2 mb-5 leading-relaxed">
              Prefer to bless our new home with a specific household item? We have curated a short wishlist of things we'd love.
            </p>

            {/* Click to Reveal Wishlist Button */}
            <button
              onClick={() => setShowWishlist(!showWishlist)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-900 hover:bg-navy-800 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>{showWishlist ? 'Hide Wishlist' : 'View Home Registry Wishlist (12 Items)'}</span>
              {showWishlist ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Animated Expandable Wishlist Drawer */}
          <AnimatePresence>
            {showWishlist && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mt-6"
              >
                <div className="bg-white border-2 border-navy-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-md">
                  {/* Header inside Wishlist */}
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <h3 className="font-serif text-2xl md:text-3xl text-navy-950 font-normal">
                      Things We'd Love For Our New Home
                    </h3>
                    <p className="text-stone-600 font-sans text-sm md:text-base mt-2 leading-relaxed italic">
                      “{WEDDING_DETAILS.gifts.wishlistIntro}”
                    </p>
                  </div>

                  {/* 12 Wishlist Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WEDDING_DETAILS.gifts.wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="bg-navy-50/40 hover:bg-white border border-navy-150 hover:border-navy-400 rounded-2xl p-4 sm:p-5 transition-all flex items-start justify-between gap-3 shadow-2xs group"
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Item Number Badge */}
                          <div className="w-8 h-8 rounded-xl bg-navy-900 text-white font-sans font-bold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                            {item.id}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-navy-700 bg-white border border-navy-200 px-2 py-0.5 rounded-md">
                                {item.brand}
                              </span>
                              <span className="text-[10px] font-sans text-stone-500">
                                {item.category}
                              </span>
                            </div>

                            <h4 className="font-serif text-base sm:text-lg text-navy-950 font-semibold leading-snug">
                              {item.name}
                            </h4>

                            {item.notes && (
                              <p className="text-xs text-stone-600 font-sans">
                                {item.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Copy Button to facilitate shopping */}
                        <button
                          onClick={() => handleCopyWishlistItem(item.name + (item.notes ? ` (${item.notes})` : ''), item.id)}
                          className="shrink-0 p-2 text-navy-700 hover:text-navy-950 bg-white border border-navy-200 hover:border-navy-400 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                          title="Copy item name for shopping"
                        >
                          {copiedWishlistId === item.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Footnote and close button */}
                  <div className="mt-8 pt-6 border-t border-navy-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-navy-700 shrink-0" />
                      <span>Tap the copy icon on any item to copy its name for shopping</span>
                    </span>
                    <button
                      onClick={() => setShowWishlist(false)}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Close Wishlist ↑
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
