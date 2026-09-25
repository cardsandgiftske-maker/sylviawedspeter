import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { WEDDING_DATE, WEDDING_DETAILS } from '../data';
import Crest from './Crest';
import PhotoCarousel from './PhotoCarousel';
import sylviaPeterImg from '../assets/images/sylvia_peter_1790335913583.jpg';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const verses = WEDDING_DETAILS.bibleVerses.slice(0, 3);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF9F6] text-stone-850 py-16" id="hero-section">
      {/* Background Image with Warm Paper Vignette/Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={sylviaPeterImg}
          alt="Sylvia & Dr. Peter Kamau Wedding Celebration"
          className="w-full h-full object-cover object-center opacity-[0.22] scale-105 filter brightness-[1.02] contrast-[0.98]"
          referrerPolicy="no-referrer"
        />
        {/* Gradients tailored to Shades of Blue, Green & Champagne */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/85 to-[#FAF9F6]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FAF9F6]/45 to-[#FAF9F6]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center max-w-4xl pt-4">
        {/* Photo Uploading Carousel at the Top of Hero Page */}
        <PhotoCarousel />

        {/* Elegant Crest at the top of the hero */}
        <div className="mb-4">
          <Crest size="md" animated={true} />
        </div>

        {/* Family Names & Formal Invitation Lead-In */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-5 bg-white/80 backdrop-blur-xs border border-champagne-300/70 rounded-3xl px-6 py-4 shadow-xs"
        >
          <p className="text-sapphire-800 font-sans tracking-[0.2em] text-[10px] md:text-xs uppercase font-extrabold mb-1.5">
            {WEDDING_DETAILS.families.leadIn}
          </p>
          <div className="text-stone-800 font-serif text-xs md:text-sm leading-relaxed">
            <p>
              <span className="font-semibold text-stone-900">{WEDDING_DETAILS.families.groomFamily}</span>
              <span className="text-[11px] font-sans text-stone-500 font-medium ml-1.5">(Groom’s Family)</span>
            </p>
            <p className="text-champagne-600 font-serif italic text-sm my-0.5">&amp;</p>
            <p>
              <span className="font-semibold text-stone-900">{WEDDING_DETAILS.families.brideFamily}</span>
              <span className="text-[11px] font-sans text-stone-500 font-medium ml-1.5">(Bride’s Family)</span>
            </p>
          </div>
          <p className="text-emerald-800 font-serif text-xs md:text-sm mt-2 italic font-medium">
            Joyfully invite you to witness and celebrate the Holy Matrimony and wedding reception of their beloved children
          </p>
        </motion.div>

        {/* Main Title: Sylvia & Dr. Peter */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight text-stone-900 mb-2"
        >
          <span className="block mb-1 md:inline md:mb-0 text-sapphire-900 font-medium">Sylvia</span>
          <span className="font-display font-light text-champagne-500 mx-3 md:mx-4 text-4xl md:text-6xl italic">&amp;</span>
          <span className="block mt-1 md:inline md:mt-0 text-emerald-850 font-medium">Dr. Peter</span>
        </motion.h1>

        {/* Full Names Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-stone-600 text-sm md:text-base tracking-widest uppercase mb-6 font-medium"
        >
          Sylvia Waithira Muchiri &amp; Dr. Peter Kamau Mwangi
        </motion.p>

        {/* Date, Time & Venue Key Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2.5 px-6 py-3 bg-white/90 border border-emerald-200/90 rounded-full text-stone-850 text-xs md:text-sm font-sans font-semibold tracking-wider uppercase mb-8 shadow-xs"
        >
          <div className="flex items-center gap-1.5 text-sapphire-800">
            <Calendar className="w-4 h-4 text-sapphire-600" />
            <span>Saturday, 12th December 2026</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 hidden sm:inline-block" />
          <div className="flex items-center gap-1.5 text-emerald-800">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>10:00 AM at Kamwangi Church</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 hidden sm:inline-block" />
          <div className="flex items-center gap-1.5 text-ocean-800">
            <MapPin className="w-4 h-4 text-ocean-600" />
            <span>1:00 PM at Tropical Gardens</span>
          </div>
        </motion.div>

        {/* Biblical Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full mx-auto mb-10"
        >
          {verses.map((verse, idx) => (
            <div
              key={`hero-verse-${idx}`}
              className="bg-white/90 border border-stone-200/90 rounded-2xl p-4 md:p-5 flex flex-col justify-between text-center shadow-xs hover:border-emerald-300 transition-all"
            >
              <p className="font-serif italic text-stone-800 text-sm md:text-base leading-relaxed mb-3">
                “{verse.text}”
              </p>
              <p className="text-sapphire-700 font-sans text-[11px] font-bold tracking-widest uppercase not-italic">
                — {verse.reference}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col items-center mb-6"
        >
          <h3 className="text-[10px] text-stone-500 uppercase tracking-widest font-sans font-bold mb-4">
            Countdown to Saturday, 12th December 2026
          </h3>
          
          <div className="flex gap-3 md:gap-4 text-center">
            {/* Days block */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-xs">
              <span className="text-2xl md:text-4xl font-serif font-light text-sapphire-800">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Days</span>
            </div>

            {/* Hours block */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-xs">
              <span className="text-2xl md:text-4xl font-serif font-light text-sapphire-800">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Hours</span>
            </div>

            {/* Minutes block */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-xs">
              <span className="text-2xl md:text-4xl font-serif font-light text-sapphire-800">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Mins</span>
            </div>

            {/* Seconds block */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-xs">
              <span className="text-2xl md:text-4xl font-serif font-light text-sapphire-800">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Secs</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Subtle fade overlay */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF9F6] to-transparent pointer-events-none" />
    </section>
  );
}
