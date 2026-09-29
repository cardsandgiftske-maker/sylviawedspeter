import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Mail, Smartphone, Check, Copy, Heart, Sparkles, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function Gifts() {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [copiedWishlistId, setCopiedWishlistId] = useState<number | null>(null);

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
        <div className="text-center mb-14">
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

        {/* Home Registry Wishlist Section */}
        <div className="mb-16">
          <div className="bg-white border-2 border-navy-200/90 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
            {/* Header for Wishlist */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-900 text-xs font-sans font-bold uppercase tracking-wider mb-3">
                <ShoppingBag className="w-4 h-4 text-navy-700" />
                <span>Home Registry Wishlist</span>
              </div>
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

            <div className="mt-8 pt-6 border-t border-navy-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-sans">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-navy-700" />
                <span>Tap the copy icon on any item to copy its exact model name</span>
              </span>
              <span className="italic font-serif text-stone-600">
                Any equivalent models or brands are also warmly appreciated!
              </span>
            </div>
          </div>
        </div>

        {/* Giving Channels: Envelope & M-Pesa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
}
