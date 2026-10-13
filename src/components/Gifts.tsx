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
                      Paybill
                    </p>
                    <p className="font-mono text-base font-bold text-navy-950">
                      {WEDDING_DETAILS.gifts.mpesa.paybill}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(WEDDING_DETAILS.gifts.mpesa.paybill, 'paybill')}
                    className="px-3 py-1.5 bg-white hover:bg-navy-50 border border-navy-200 text-xs font-sans font-bold rounded-lg text-navy-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                    title="Copy Paybill Number"
                  >
                    {copiedType === 'paybill' ? (
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

                <div className="pt-2 border-t border-navy-150 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-bold">
                      Account Number
                    </p>
                    <p className="font-mono text-base font-bold text-navy-950">
                      {WEDDING_DETAILS.gifts.mpesa.accountNumber}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-bold mt-2">
                      Account Name
                    </p>
                    <p className="text-sm font-bold text-navy-950">
                      {WEDDING_DETAILS.gifts.mpesa.accountName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(WEDDING_DETAILS.gifts.mpesa.accountNumber, 'account')}
                    className="px-3 py-1.5 bg-white hover:bg-navy-50 border border-navy-200 text-xs font-sans font-bold rounded-lg text-navy-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                    title="Copy Account Number"
                  >
                    {copiedType === 'account' ? (
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
