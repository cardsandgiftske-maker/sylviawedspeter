import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Award, Compass, Music, MessageCircle, Gift, Cake, Utensils, Navigation, Heart, Car } from 'lucide-react';
import { PROGRAM_ITEMS } from '../data';

export default function Program() {
  const [activeTab, setActiveTab] = useState<'all' | 'church' | 'reception'>('all');

  const filteredItems = PROGRAM_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'church') return item.isChurch;
    return !item.isChurch;
  });

  const getIconForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('matrimony') || t.includes('mass') || t.includes('church')) return <Award className="w-4 h-4 text-navy-800" />;
    if (t.includes('drive') || t.includes('journey') || t.includes('transit')) return <Car className="w-4 h-4 text-navy-700" />;
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

        {/* Tab Filters */}
        <div className="flex justify-center mb-12">
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
              {/* Timeline Node in Navy */}
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

                {/* Bullets if available */}
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Card */}
        <div className="mt-14 text-center bg-white border border-navy-150 p-6 rounded-3xl max-w-xl mx-auto shadow-xs">
          <p className="font-serif text-stone-900 italic text-base">
            “With grateful hearts, we eagerly look forward to sharing every precious moment of our wedding day with you.”
          </p>
          <p className="text-xs text-navy-900 font-sans font-bold uppercase tracking-wider mt-2">
            Sylvia &amp; Dr. Peter
          </p>
        </div>
      </div>
    </section>
  );
}
