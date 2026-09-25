import React from 'react';
import { Sparkles, Shirt, CheckCircle2, Heart } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function DressCode() {
  return (
    <section className="relative py-24 bg-[#FAF9F6] text-stone-850 border-t border-stone-200/60" id="dress-code-section">
      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        {/* Section Header */}
        <span className="text-sapphire-700 text-[11px] font-bold tracking-[0.2em] uppercase font-sans block mb-2">
          WEDDING ATTIRE
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 tracking-tight">
          Dress Code
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent mx-auto my-4" />

        {/* Main Dress Code Banner */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 md:p-12 shadow-sm mt-6 max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-5 border border-emerald-200 shadow-2xs">
            <Shirt className="w-7 h-7 text-emerald-850" />
          </div>

          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-sapphire-50 via-emerald-50 to-ocean-50 border border-emerald-200/80 shadow-2xs mb-5">
            <Sparkles className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-serif text-xl md:text-2xl text-stone-900 font-semibold tracking-wide">
              {WEDDING_DETAILS.dressCode.guideline}
            </span>
          </div>

          <p className="text-stone-700 text-sm md:text-base max-w-xl mx-auto italic font-serif leading-relaxed">
            {WEDDING_DETAILS.dressCode.description}
          </p>

          {/* Style Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-8 text-left">
            <div className="bg-sapphire-50/40 border border-sapphire-150 rounded-2xl p-5 shadow-2xs">
              <h4 className="font-serif font-bold text-sapphire-900 text-base mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sapphire-700 shrink-0" />
                <span>Ladies</span>
              </h4>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Vibrant midi or maxi gowns, chic cocktail dresses, or elegant pant suits styled with radiant and celebratory sophistication.
              </p>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-150 rounded-2xl p-5 shadow-2xs">
              <h4 className="font-serif font-bold text-emerald-950 text-base mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Gentlemen</span>
              </h4>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Tailored suits, crisp blazers, formal trousers, or stylish celebratory attire styled with sharp, distinguished elegance.
              </p>
            </div>
          </div>

          {/* Note from couple */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-stone-500 text-xs font-serif italic">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>We cannot wait to see everyone looking festive, lively, and wonderful!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
