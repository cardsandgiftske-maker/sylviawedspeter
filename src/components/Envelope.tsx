import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSealed, setIsSealed] = useState(true);
  const [isCardExtracted, setIsCardExtracted] = useState(false);

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);
    
    if (onSealBreak) {
      onSealBreak();
    }
    
    // Step 1: Flaps fold open
    setTimeout(() => {
      setIsOpened(true);
    }, 700);

    // Step 2: The crisp white invitation card rises out of the navy envelope
    setTimeout(() => {
      setIsCardExtracted(true);
    }, 1300);

    // Step 3: Transition to main applet
    setTimeout(() => {
      onOpen();
    }, 3600);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: 'blur(8px)',
        transition: { duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A1628] via-[#060D18] to-[#02050A] p-4 md:p-6"
    >
      {/* Ambient background navy blue glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-navy-600/35 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-700/25 blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />
      </div>

      {/* Main interactive container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ 
          opacity: 0, 
          scale: 1.15, 
          y: -30, 
          transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] } 
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[440px] aspect-[9/16] max-h-[92vh] bg-navy-950/60 backdrop-blur-md rounded-[40px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-navy-800/80 flex items-center justify-center overflow-hidden"
      >
        {/* Crisp White & Navy Blue invitation viewport */}
        <div className="relative w-full h-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFD] to-[#EDF2F9] rounded-[32px] overflow-hidden shadow-inner flex flex-col justify-between border border-navy-200">
          
          {/* Top header on the invitation screen */}
          <div className="w-full text-center pt-8 px-6 z-10">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-extrabold text-navy-900 bg-navy-50 border border-navy-200 px-3 py-1 rounded-full inline-block shadow-2xs">
              Official Wedding Invitation
            </span>
            <h1 className="font-serif text-2xl tracking-[0.1em] text-navy-950 font-semibold mt-2">
              SYLVIA &amp; DR. PETER
            </h1>
            <p className="text-xs font-serif italic text-navy-700 mt-0.5 font-medium">
              Saturday, 12th December 2026
            </p>
          </div>

          {/* Central Envelope & Card Stage */}
          <div className="relative flex-1 w-full flex items-center justify-center px-4 overflow-visible">
            
            {/* The Outer Navy Blue Envelope Base */}
            <div className="relative w-full aspect-[4/3] max-w-[360px] flex items-center justify-center">
              
              {/* Backing Envelope Pocket Liner (Deep Navy Blue & Gold Monogram) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B1E38] via-[#0E2442] to-[#071324] rounded-2xl shadow-[0_16px_40px_rgba(3,12,24,0.5)] border border-navy-700/60 overflow-hidden flex items-center justify-center z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent opacity-80" />
                <div className="w-16 h-16 rounded-full border border-champagne-300/40 flex items-center justify-center opacity-85 shadow-inner">
                  <span className="font-serif text-champagne-200 text-sm tracking-widest font-semibold">S &amp; P</span>
                </div>
              </div>

              {/* THE CRISP WHITE WEDDING INVITATION CARD (Sliding out of the envelope) */}
              <motion.div
                initial={{ y: 0, scale: 0.95, opacity: 0.9 }}
                animate={isCardExtracted ? { 
                  y: -125, 
                  scale: 1.05, 
                  opacity: 1,
                  boxShadow: '0 25px 40px -10px rgba(6, 20, 42, 0.4)'
                } : { 
                  y: 0, 
                  scale: 0.95, 
                  opacity: 0.9 
                }}
                transition={{ 
                  duration: 1.3, 
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.1
                }}
                className="absolute inset-x-3 bottom-2 h-[88%] bg-white rounded-2xl border-2 border-navy-300 p-5 flex flex-col justify-between text-center z-20 shadow-lg"
              >
                {/* Gold foil & Navy decorative corner flourishes */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]" />

                {/* Card Content in Crisp White and Navy */}
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-navy-800 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em]">Holy Matrimony</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-navy-950 tracking-tight leading-tight">
                    Sylvia <span className="font-display italic text-[#C49C5E]">&amp;</span> Dr. Peter
                  </h3>
                  <p className="font-serif italic text-[11px] text-stone-600">
                    Joyfully invite you to celebrate their wedding
                  </p>
                </div>

                <div className="my-2 py-2 border-y border-navy-100 space-y-1.5">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-semibold text-navy-900">
                    <Calendar className="w-3.5 h-3.5 text-navy-700" />
                    <span>Saturday, 12th December 2026</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-sans text-navy-800">
                    <MapPin className="w-3 h-3 text-navy-600" />
                    <span>Kamwangi Church &amp; Tropical Gardens</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-serif italic text-[10px] text-stone-500">
                    “Therefore what God has joined together, let no one separate.”
                  </p>
                  <p className="font-sans text-[8.5px] font-bold uppercase tracking-wider text-[#B88E2D]">
                    Mark 10:9
                  </p>
                </div>

                {/* Instant Action Button */}
                {isCardExtracted && (
                  <motion.button
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={onOpen}
                    className="mt-2 py-1.5 px-4 bg-navy-900 hover:bg-navy-800 text-white rounded-full text-[10px] font-sans font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>View Wedding Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                )}
              </motion.div>

              {/* Envelope Flaps (Navy Blue and White Trim) */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-30">
                
                {/* 1. Left Flap - Navy Blue */}
                <motion.svg 
                  animate={isOpened ? { x: '-105%', opacity: 0 } : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[5px_0_10px_rgba(0,0,0,0.45)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flap-navy-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0B1A30" />
                      <stop offset="60%" stopColor="#122744" />
                      <stop offset="100%" stopColor="#18345C" />
                    </linearGradient>
                  </defs>
                  
                  <path d="M0 0 L200 150 L0 300 Z" fill="url(#flap-navy-left)" />
                  <path d="M0 0 L200 150 L0 300" stroke="#3A608F" strokeWidth="1" strokeOpacity="0.75" />
                  
                  {/* Crisp white / silver botanical embossing lines */}
                  <path d="M15 35 C 30 50, 45 45, 50 60 C 55 75, 40 90, 60 105" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                  <path d="M10 210 C 25 195, 40 200, 45 185 C 50 170, 35 155, 55 140" stroke="#F5D882" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                  <circle cx="50" cy="60" r="1.5" fill="#FFFFFF" opacity="0.6" />
                  <circle cx="45" cy="185" r="1.5" fill="#F5D882" opacity="0.6" />
                </motion.svg>

                {/* 2. Right Flap - Navy Blue */}
                <motion.svg 
                  animate={isOpened ? { x: '105%', opacity: 0 } : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[-5px_0_10px_rgba(0,0,0,0.45)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flap-navy-right" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0B1A30" />
                      <stop offset="60%" stopColor="#122744" />
                      <stop offset="100%" stopColor="#18345C" />
                    </linearGradient>
                  </defs>

                  <path d="M400 0 L200 150 L400 300 Z" fill="url(#flap-navy-right)" />
                  <path d="M400 0 L200 150 L400 300" stroke="#3A608F" strokeWidth="1" strokeOpacity="0.75" />
                  
                  <path d="M385 35 C 370 50, 355 45, 350 60 C 345 75, 360 90, 340 105" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                  <path d="M390 210 C 375 195, 360 200, 355 185 C 350 170, 365 155, 345 140" stroke="#F5D882" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                  <circle cx="350" cy="60" r="1.5" fill="#FFFFFF" opacity="0.6" />
                  <circle cx="355" cy="185" r="1.5" fill="#F5D882" opacity="0.6" />
                </motion.svg>

                {/* 3. Bottom Flap - Deep Midnight Navy Blue */}
                <motion.svg 
                  animate={isOpened ? { y: '105%', opacity: 0 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_-8px_14px_rgba(0,0,0,0.4)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flap-navy-bottom" x1="0%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#081426" />
                      <stop offset="50%" stopColor="#0E223D" />
                      <stop offset="100%" stopColor="#142F54" />
                    </linearGradient>
                  </defs>

                  <path d="M0 300 L200 150 L400 300 Z" fill="url(#flap-navy-bottom)" opacity="0.99" />
                  <path d="M0 300 L200 150 L400 300" stroke="#2D507B" strokeWidth="1" strokeOpacity="0.8" />
                  
                  {/* Decorative stem in crisp white and gold */}
                  <path d="M200 280 L200 210" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.5" />
                  <path d="M190 240 C 195 235, 198 235, 200 240" stroke="#F5D882" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
                  <path d="M210 240 C 205 235, 202 235, 200 240" stroke="#F5D882" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
                  <path d="M185 260 C 192 255, 195 255, 200 260" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
                  <path d="M215 260 C 208 255, 205 255, 200 260" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
                </motion.svg>

                {/* 4. Top Flap - Royal Navy Blue with Gold Trim */}
                <motion.svg 
                  animate={isOpened ? { 
                    rotateX: 180, 
                    transformOrigin: 'top',
                    y: '-10%',
                    opacity: 0,
                    zIndex: 0
                  } : { 
                    rotateX: 0,
                    transformOrigin: 'top',
                    y: 0,
                    opacity: 1,
                    zIndex: 20
                  }}
                  transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flap-navy-top" x1="0%" y1="0%" x2="100%" y2="80%">
                      <stop offset="0%" stopColor="#0B1A30" />
                      <stop offset="50%" stopColor="#122744" />
                      <stop offset="100%" stopColor="#18365E" />
                    </linearGradient>
                  </defs>

                  <path d="M0 0 L200 150 L400 0 Z" fill="url(#flap-navy-top)" />
                  <path d="M0 0 L200 150 L400 0" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.85" />
                  
                  {/* Subtle gilded leafy ornaments on top flap */}
                  <path d="M140 30 C 170 60, 230 60, 260 30" stroke="#F5D882" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M160 45 C 180 55, 220 55, 240 45" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                  <circle cx="200" cy="55" r="2.2" fill="#F5D882" opacity="0.85" />
                </motion.svg>

              </div>

              {/* 5. Luxury Golden Wax Seal / Crest Overlay with S & P Monogram */}
              <AnimatePresence>
                {isSealed && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ 
                      scale: 1.6, 
                      opacity: 0,
                      rotate: 15,
                      filter: 'blur(4px)'
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 150,
                      damping: 15,
                      exit: { duration: 0.7, ease: 'easeIn' }
                    }}
                    onClick={handleOpen}
                    className="absolute z-40 cursor-pointer select-none group"
                    style={{ transformPerspective: 1000 }}
                  >
                    {/* Glowing Backlight Halo Glow in Radiant Gold */}
                    <div className="absolute -inset-6 rounded-full bg-amber-400/40 blur-xl group-hover:bg-amber-300/60 transition-all duration-300 animate-pulse" style={{ animationDuration: '3s' }} />

                    {/* Realistic 3D Wax Seal Body in Radiant Metallic Gold */}
                    <div className="relative w-28 h-28 rounded-full flex items-center justify-center p-1 bg-gradient-to-br from-[#F5D882] via-[#D4AF37] to-[#8C6D1F] shadow-[0_12px_28px_rgba(180,135,30,0.55),_inset_0_3px_5px_rgba(255,255,255,0.7),_inset_0_-4px_8px_rgba(70,50,10,0.55)] border border-[#C59E36] transition-transform duration-300 active:scale-95 group-hover:scale-105">
                      
                      {/* Organic wavy/dripping edge border layer in rich gold */}
                      <div className="absolute -inset-1.5 rounded-full border-[3px] border-[#B88E2D]/70 opacity-90" />
                      
                      {/* Inner Circular Well of golden crest */}
                      <div className="w-22 h-22 rounded-full bg-gradient-to-tl from-[#9C7A23] via-[#C8A13B] to-[#E9CB72] flex items-center justify-center shadow-[inset_0_4px_8px_rgba(70,50,10,0.6),_0_2px_2px_rgba(255,255,255,0.35)] border border-[#7D5E16] relative overflow-hidden">
                        
                        {/* Golden monogram letters S & P */}
                        <div className="flex flex-col items-center justify-center text-center select-none pointer-events-none">
                          <div className="absolute inset-2.5 rounded-full border border-amber-100/60" />
                          
                          <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                            <defs>
                              <linearGradient id="gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="25%" stopColor="#FFF2D1" />
                                <stop offset="60%" stopColor="#F5DC8C" />
                                <stop offset="100%" stopColor="#C99E37" />
                              </linearGradient>
                              <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="1" dy="2" stdDeviation="1.2" floodColor="#422E06" floodOpacity="0.65" />
                              </filter>
                            </defs>
                            
                            <g filter="url(#subtle-shadow)">
                              <text 
                                x="32" 
                                y="59" 
                                fontFamily="'Great Vibes', 'Alex Brush', 'Pinyon Script', cursive" 
                                fontSize="40" 
                                fontWeight="normal"
                                fill="url(#gold-seal)"
                                textAnchor="middle"
                              >
                                S
                              </text>
                              <text 
                                x="49" 
                                y="53" 
                                fontFamily="'Playfair Display', 'Cormorant Garamond', serif" 
                                fontSize="16" 
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                opacity="0.9"
                                textAnchor="middle"
                              >
                                &amp;
                              </text>
                              <text 
                                x="67" 
                                y="59" 
                                fontFamily="'Great Vibes', 'Alex Brush', 'Pinyon Script', cursive" 
                                fontSize="40" 
                                fontWeight="normal"
                                fill="url(#gold-seal)"
                                textAnchor="middle"
                              >
                                P
                              </text>
                            </g>
                          </svg>
                        </div>
                        
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent -rotate-12 transform origin-top-left scale-150 pointer-events-none" />
                      </div>
                    </div>

                    {/* Interactive feedback indicator */}
                    <div className="absolute top-full mt-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-center z-40">
                      <p className="font-sans font-bold text-xs uppercase tracking-widest text-navy-950 bg-white/95 border-2 border-amber-400 px-4 py-1.5 rounded-full shadow-lg flex items-center justify-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
                        <span className="text-navy-950">Tap Wax Seal to Open</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Bottom Footer Details */}
          <div className="w-full text-center pb-8 px-6 z-10 flex flex-col items-center gap-1">
            <p className="font-serif text-[13px] text-stone-700 tracking-wide italic">
              Sacrament of Holy Matrimony &amp; Wedding Celebration
            </p>
            <p className="font-sans text-[10px] text-navy-800 uppercase tracking-widest font-bold">
              Kamwangi Catholic Church &amp; Tropical Gardens Ruiru
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
