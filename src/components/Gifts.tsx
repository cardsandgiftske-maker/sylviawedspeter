import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Mail, Smartphone, Check, Copy, Heart, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function Gifts() {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section className="relative py-24 bg-[#F8FAF8] text-stone-850 border-t border-stone-200/60" id="gifts-section">
      {/* Subtle organic green and blue gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ocean-500/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-sapphire-700 text-xs font-bold tracking-[0.2em] uppercase font-sans block mb-2">
            REGISTRY &amp; BLESSINGS
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mb-4">
            Wedding Gifts
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto" />
          
          {/* Couple's Grateful Message */}
          <div className="max-w-2xl mx-auto mt-6 bg-white/90 border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <Heart className="w-5 h-5 fill-emerald-600 text-emerald-600" />
            </div>
            <p className="font-serif italic text-base md:text-lg text-stone-850 leading-relaxed">
              “{WEDDING_DETAILS.gifts.message}”
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-sans font-bold text-sapphire-800 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
              <span>With Love, Sylvia &amp; Dr. Peter</span>
            </div>
          </div>
        </div>

        {/* Two Giving Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Option 1: Gift in an Envelope */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-stone-200/80 rounded-3xl p-7 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sapphire-50 border border-sapphire-200 text-sapphire-700 flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-sapphire-700 bg-sapphire-50 px-2.5 py-1 rounded-full border border-sapphire-200 inline-block mb-3">
                Traditional Blessing
              </span>
              <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
                {WEDDING_DETAILS.gifts.envelope.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-sans mb-6">
                {WEDDING_DETAILS.gifts.envelope.instruction}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center gap-3 text-xs text-stone-500 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Stationed at Tropical Gardens Ruiru-Kimbo</span>
            </div>
          </motion.div>

          {/* Option 2: M-Pesa Digital Gift */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white border border-stone-200/80 rounded-3xl p-7 shadow-xs hover:border-sapphire-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-5">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mb-3">
                Mobile Transfer (M-Pesa)
              </span>
              <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
                {WEDDING_DETAILS.gifts.mpesa.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-sans mb-5">
                {WEDDING_DETAILS.gifts.mpesa.instruction}
              </p>

              {/* M-Pesa Details Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-bold">
                      Account / Recipient
                    </p>
                    <p className="text-sm font-serif font-semibold text-stone-900">
                      {WEDDING_DETAILS.gifts.mpesa.recipientName}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-bold">
                      M-Pesa Number
                    </p>
                    <p className="font-mono text-sm font-bold text-emerald-800">
                      {WEDDING_DETAILS.gifts.mpesa.number}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(WEDDING_DETAILS.gifts.mpesa.number, 'phone')}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-xs font-sans font-bold rounded-lg text-emerald-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
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
              <Gift className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
              <span>We are deeply touched by your generosity and love.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
