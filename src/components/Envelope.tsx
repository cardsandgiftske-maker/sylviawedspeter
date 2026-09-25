import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSealed, setIsSealed] = useState(true);

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);
    
    if (onSealBreak) {
      onSealBreak();
    }
    
    // Stagger the opening of the envelope flaps after the seal breaks
    setTimeout(() => {
      setIsOpened(true);
    }, 800);

    // Call parent onOpen after envelope slides/fades away
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: 'blur(8px)',
        transition: { duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#0B1E28] to-[#041510] p-4 md:p-6"
    >
      {/* Ambient background flora/glow simulation with Sapphire and Emerald */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-sapphire-600/35 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-600/30 blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />
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
        className="relative w-full max-w-[430px] aspect-[9/16] max-h-[90vh] bg-stone-950/50 backdrop-blur-md rounded-[40px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-stone-800/70 flex items-center justify-center overflow-hidden"
      >
        {/* Phone screen boundary or card viewport with subtle blue-green undertone */}
        <div className="relative w-full h-full bg-gradient-to-b from-[#FCFDFD] via-[#F4F9F7] to-[#EDF6F3] rounded-[32px] overflow-hidden shadow-inner flex flex-col justify-between border border-emerald-900/10">
          
          {/* Top header on the invitation screen */}
          <div className="w-full text-center pt-8 px-6 z-10">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-extrabold text-sapphire-900 bg-sapphire-50/80 border border-sapphire-200/70 px-3 py-1 rounded-full inline-block shadow-2xs">
              Wedding Invitation
            </span>
            <h1 className="font-serif text-2xl tracking-[0.1em] text-stone-900 font-semibold mt-2">
              SYLVIA &amp; DR. PETER
            </h1>
            <p className="text-xs font-serif italic text-emerald-800 mt-0.5 font-medium">
              Saturday, 12th December 2026
            </p>
          </div>

          {/* Central Envelope Area */}
          <div className="relative flex-1 w-full flex items-center justify-center px-4">
            
            {/* The Envelope Base - Styled in Shades of Blue and Green */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#0F2D4A] via-[#0D4438] to-[#062820] rounded-2xl shadow-[0_16px_40px_rgba(5,25,35,0.45)] border border-[#1E6B56]/50 overflow-hidden flex items-center justify-center">
              
              {/* Backing Inner Lining (Deep Sapphire & Emerald with golden monogram S & P) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A2244] via-[#08382E] to-[#041D17] flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full border border-champagne-300/40 flex items-center justify-center opacity-85 shadow-inner">
                  <span className="font-serif text-champagne-200 text-sm tracking-widest font-semibold">S &amp; P</span>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent opacity-80" />
              </div>

              {/* Envelope Flaps Wrapper */}
              <div className="absolute inset-0 overflow-hidden">
                
                {/* 1. Left Flap - Rich Sapphire Royal Blue */}
                <motion.svg 
                  animate={isOpened ? { x: '-100%', opacity: 0 } : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[5px_0_10px_rgba(0,0,0,0.35)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flap-sapphire-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#142B4E" />
                      <stop offset="60%" stopColor="#1A3B68" />
                      <stop offset="100%" stopColor="#1E477D" />
                    </linearGradient>
                  </defs>
                  
                  {/* Flap Body */}
                  <path d="M0 0 L200 150 L0 300 Z" fill="url(#flap-sapphire-left)" />
                  <path d="M0 0 L200 150 L0 300" stroke="#38779E" strokeWidth="1" strokeOpacity="0.7" />
                  
                  {/* Delicate embossed botanical lines in gold and mint */}
                  <path d="M15 35 C 30 50, 45 45, 50 60 C 55 75, 40 90, 60 105" stroke="#F5D882" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
                  <path d="M10 210 C 25 195, 40 200, 45 185 C 50 170, 35 155, 55 140" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
                  <circle cx="50" cy="60" r="1.5" fill="#F5D882" opacity="0.6" />
                  <circle cx="45" cy="185" r="1.5" fill="#A7F3D0" opacity="0.6" />
                </motion.svg>

                {/* 2. Right Flap - Deep Ocean Teal */}
                <motion.svg 
                  animate={isOpened ? { x: '100%', opacity: 0 } : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[-5px_0_10px_rgba(0,0,0,0.35)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flap-teal-right" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0B3736" />
                      <stop offset="60%" stopColor="#0F4C47" />
                      <stop offset="100%" stopColor="#145C56" />
                    </linearGradient>
                  </defs>

                  {/* Flap Body */}
                  <path d="M400 0 L200 150 L400 300 Z" fill="url(#flap-teal-right)" />
                  <path d="M400 0 L200 150 L400 300" stroke="#258E83" strokeWidth="1" strokeOpacity="0.7" />
                  
                  {/* Delicate embossed floral pattern lines */}
                  <path d="M385 35 C 370 50, 355 45, 350 60 C 345 75, 360 90, 340 105" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
                  <path d="M390 210 C 375 195, 360 200, 355 185 C 350 170, 365 155, 345 140" stroke="#F5D882" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
                  <circle cx="350" cy="60" r="1.5" fill="#A7F3D0" opacity="0.6" />
                  <circle cx="355" cy="185" r="1.5" fill="#F5D882" opacity="0.6" />
                </motion.svg>

                {/* 3. Bottom Flap - Rich Emerald Jewel Green */}
                <motion.svg 
                  animate={isOpened ? { y: '100%', opacity: 0 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_-8px_12px_rgba(0,0,0,0.3)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flap-emerald-bottom" x1="0%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#052E23" />
                      <stop offset="50%" stopColor="#084534" />
                      <stop offset="100%" stopColor="#0D5943" />
                    </linearGradient>
                  </defs>

                  {/* Flap Body */}
                  <path d="M0 300 L200 150 L400 300 Z" fill="url(#flap-emerald-bottom)" opacity="0.98" />
                  <path d="M0 300 L200 150 L400 300" stroke="#1A7C60" strokeWidth="1" strokeOpacity="0.75" />
                  
                  {/* Elegant decorative center leaf stem on bottom flap in Gold and Mint */}
                  <path d="M200 280 L200 210" stroke="#F5D882" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.6" />
                  <path d="M190 240 C 195 235, 198 235, 200 240" stroke="#86EFAC" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
                  <path d="M210 240 C 205 235, 202 235, 200 240" stroke="#86EFAC" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
                  <path d="M185 260 C 192 255, 195 255, 200 260" stroke="#F5D882" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
                  <path d="M215 260 C 208 255, 205 255, 200 260" stroke="#F5D882" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
                </motion.svg>

                {/* 4. Top Flap - Harmonious Blend of Sapphire Blue & Emerald Green */}
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
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flap-top-blend" x1="0%" y1="0%" x2="100%" y2="80%">
                      <stop offset="0%" stopColor="#16375E" />
                      <stop offset="45%" stopColor="#104E54" />
                      <stop offset="100%" stopColor="#0B4737" />
                    </linearGradient>
                  </defs>

                  {/* Flap Body */}
                  <path d="M0 0 L200 150 L400 0 Z" fill="url(#flap-top-blend)" />
                  <path d="M0 0 L200 150 L400 0" stroke="#C49C5E" strokeWidth="1.2" strokeOpacity="0.85" />
                  
                  {/* Subtle gilded leafy ornaments on the top flap */}
                  <path d="M140 30 C 170 60, 230 60, 260 30" stroke="#F5D882" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M160 45 C 180 55, 220 55, 240 45" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                  <circle cx="200" cy="55" r="2.2" fill="#F5D882" opacity="0.8" />
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
                    className="absolute z-30 cursor-pointer select-none group"
                    style={{ transformPerspective: 1000 }}
                  >
                    {/* Glowing Backlight Halo Glow in Radiant Gold */}
                    <div className="absolute -inset-6 rounded-full bg-amber-400/40 blur-xl group-hover:bg-amber-300/60 transition-all duration-300 animate-pulse" style={{ animationDuration: '3s' }} />

                    {/* Realistic 3D Wax Seal Body in Radiant Metallic Gold */}
                    <div className="relative w-28 h-28 rounded-full flex items-center justify-center p-1 bg-gradient-to-br from-[#F5D882] via-[#D4AF37] to-[#8C6D1F] shadow-[0_12px_28px_rgba(180,135,30,0.55),_inset_0_3px_5px_rgba(255,255,255,0.7),_inset_0_-4px_8px_rgba(70,50,10,0.55)] border border-[#C59E36] transition-transform duration-300 active:scale-95 group-hover:scale-105">
                      
                      {/* Organic wavy/dripping edge border layer in rich gold */}
                      <div className="absolute -inset-1.5 rounded-full border-[3px] border-[#B88E2D]/70 opacity-90" />
                      
                      {/* Inner Circular Well of the golden crest */}
                      <div className="w-22 h-22 rounded-full bg-gradient-to-tl from-[#9C7A23] via-[#C8A13B] to-[#E9CB72] flex items-center justify-center shadow-[inset_0_4px_8px_rgba(70,50,10,0.6),_0_2px_2px_rgba(255,255,255,0.35)] border border-[#7D5E16] relative overflow-hidden">
                        
                        {/* Golden monograms inside the wax seal */}
                        <div className="flex flex-col items-center justify-center text-center select-none pointer-events-none">
                          {/* Fine luxury gold circular border line */}
                          <div className="absolute inset-2.5 rounded-full border border-amber-100/60" />
                          
                          {/* Stylized Gold monogram lettering S & P */}
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
                            
                            {/* Handcrafted Serif Calligraphy monogram SP */}
                            <g filter="url(#subtle-shadow)">
                              {/* Letter S */}
                              <text 
                                x="33" 
                                y="58" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="33" 
                                fontWeight="light"
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                textAnchor="middle"
                              >
                                S
                              </text>
                              {/* Intertwining ampersand symbol */}
                              <text 
                                x="49" 
                                y="53" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="17" 
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                opacity="0.9"
                                textAnchor="middle"
                              >
                                &amp;
                              </text>
                              {/* Letter P */}
                              <text 
                                x="66" 
                                y="58" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="33" 
                                fontWeight="light"
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                textAnchor="middle"
                              >
                                P
                              </text>
                            </g>
                          </svg>
                        </div>
                        
                        {/* Realistic glass-like highlight reflect overlay */}
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent -rotate-12 transform origin-top-left scale-150 pointer-events-none" />
                      </div>
                    </div>

                    {/* Interactive feedback indicator */}
                    <div className="absolute top-full mt-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-center z-40">
                      <p className="font-sans font-bold text-xs uppercase tracking-widest text-stone-900 bg-white/95 border-2 border-amber-400 px-4 py-1.5 rounded-full shadow-lg flex items-center justify-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
                        <span className="text-stone-900">Tap Wax Seal to Open</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Bottom Footer Details */}
          <div className="w-full text-center pb-10 px-6 z-10 flex flex-col items-center gap-1">
            <p className="font-serif text-[13px] text-stone-700 tracking-wide italic">
              Sacrament of Holy Matrimony &amp; Wedding Celebration
            </p>
            <p className="font-sans text-[10px] text-emerald-800 uppercase tracking-widest font-semibold">
              Kamwangi Catholic Church &amp; Tropical Gardens Ruiru
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
