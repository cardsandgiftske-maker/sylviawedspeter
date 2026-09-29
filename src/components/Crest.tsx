import React from 'react';
import { motion } from 'motion/react';

interface CrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function Crest({ size = 'md', animated = true }: CrestProps) {
  const sizeClasses = {
    sm: 'w-32 h-30',
    md: 'w-52 h-48',
    lg: 'w-64 h-60',
    xl: 'w-80 h-74',
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const laurelVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.4,
        ease: 'easeOut',
      },
    },
  };

  const CrestContent = (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} select-none`} id="wedding-crest-container">
      {/* Delicate Navy & Champagne Golden Halo Glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-navy-200/40 via-amber-200/25 to-navy-100/30 blur-2xl" />

      <svg
        viewBox="0 0 260 240"
        className="relative w-full h-full text-navy-950 drop-shadow-[0_4px_12px_rgba(15,36,68,0.06)]"
        fill="none"
        id="wedding-crest-svg"
      >
        <defs>
          <linearGradient id="crestGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBF73" />
            <stop offset="45%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9C792B" />
          </linearGradient>

          <linearGradient id="crestNavyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1A30" />
            <stop offset="60%" stopColor="#0F2444" />
            <stop offset="100%" stopColor="#1E3E6B" />
          </linearGradient>

          <filter id="crestGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#C5A059" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 1. Delicate Laurel & Olive Botanical Wreath (Left Side) */}
        <g stroke="url(#crestGoldGradient)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Main Left Stem Curve */}
          <path d="M 130 206 C 80 206 42 165 42 118 C 42 74 74 38 120 31" />
          
          {/* Left Laurel Leaves */}
          <path d="M 120 31 C 114 26 106 28 104 35 C 109 37 116 35 120 31 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 102 38 C 94 33 87 36 86 44 C 91 45 98 42 102 38 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 83 50 C 74 46 67 51 68 59 C 74 59 79 55 83 50 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 67 66 C 58 64 52 70 54 78 C 60 77 64 72 67 66 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 54 87 C 46 87 41 95 44 102 C 50 100 53 94 54 87 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 46 110 C 39 113 36 122 41 128 C 46 125 47 118 46 110 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 46 134 C 41 139 40 148 46 153 C 51 149 50 141 46 134 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 54 156 C 50 162 52 171 59 174 C 63 169 60 161 54 156 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 68 175 C 66 182 71 190 79 191 C 82 185 77 178 68 175 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 87 190 C 88 197 96 203 104 201 C 105 194 98 189 87 190 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 110 200 C 113 206 122 208 128 204 C 127 197 119 194 110 200 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />

          {/* Golden Berries (Left) */}
          <circle cx="89" cy="40" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="60" cy="74" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="43" cy="119" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="53" cy="165" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="98" cy="198" r="1.8" fill="url(#crestGoldGradient)" />
        </g>

        {/* 2. Delicate Laurel & Olive Botanical Wreath (Right Side) */}
        <g stroke="url(#crestGoldGradient)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Main Right Stem Curve */}
          <path d="M 130 206 C 180 206 218 165 218 118 C 218 74 186 38 140 31" />

          {/* Right Laurel Leaves */}
          <path d="M 140 31 C 146 26 154 28 156 35 C 151 37 144 35 140 31 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 158 38 C 166 33 173 36 174 44 C 169 45 162 42 158 38 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 177 50 C 186 46 193 51 192 59 C 186 59 181 55 177 50 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 193 66 C 202 64 208 70 206 78 C 200 77 196 72 193 66 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 206 87 C 214 87 219 95 216 102 C 210 100 207 94 206 87 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 214 110 C 221 113 224 122 219 128 C 214 125 213 118 214 110 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 214 134 C 219 139 220 148 214 153 C 209 149 210 141 214 134 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 206 156 C 210 162 208 171 201 174 C 197 169 200 161 206 156 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 192 175 C 194 182 189 190 181 191 C 178 185 183 178 192 175 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 173 190 C 172 197 164 203 156 201 C 155 194 162 189 173 190 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />
          <path d="M 150 200 C 147 206 138 208 132 204 C 133 197 141 194 150 200 Z" fill="url(#crestGoldGradient)" fillOpacity="0.25" />

          {/* Golden Berries (Right) */}
          <circle cx="171" cy="40" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="200" cy="74" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="217" cy="119" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="207" cy="165" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="162" cy="198" r="1.8" fill="url(#crestGoldGradient)" />
        </g>

        {/* 3. Top Flourish Crown / Bow knot */}
        <g stroke="url(#crestGoldGradient)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 122 28 C 127 21 133 21 138 28" />
          <path d="M 120 25 C 124 16 130 16 130 24 C 130 16 136 16 140 25" />
          <circle cx="130" cy="15" r="1.8" fill="url(#crestGoldGradient)" />
          <circle cx="122" cy="19" r="1.2" fill="url(#crestGoldGradient)" />
          <circle cx="138" cy="19" r="1.2" fill="url(#crestGoldGradient)" />
        </g>

        {/* 4. Elegant Inner Oval Filigree Frame */}
        <ellipse
          cx="130"
          cy="118"
          rx="74"
          ry="78"
          stroke="#C5A059"
          strokeWidth="0.8"
          strokeDasharray="2.5 3.5"
          opacity="0.6"
        />
        <ellipse
          cx="130"
          cy="118"
          rx="70"
          ry="74"
          stroke="#0F2444"
          strokeWidth="0.6"
          opacity="0.25"
        />

        {/* 5. Central Calligraphy Monogram & Interlocking Elements */}
        {animated ? (
          <motion.g variants={textVariants}>
            {/* Sylvia 'S' in Calligraphy Font */}
            <text
              x="86"
              y="136"
              textAnchor="middle"
              className="fill-current text-navy-950 select-none"
              style={{
                fontFamily: "'Great Vibes', 'Alex Brush', 'Pinyon Script', cursive",
                fontSize: '84px',
                fontWeight: 400,
              }}
            >
              S
            </text>

            {/* Central Interlocking Wedding Rings & Diamond in Champagne Gold */}
            <g className="text-[#C5A059]" filter="url(#crestGlow)">
              {/* Left Wedding Ring */}
              <circle cx="122" cy="116" r="12.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
              {/* Right Wedding Ring */}
              <circle cx="138" cy="116" r="12.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
              {/* Interlocking Arch Overlap */}
              <path d="M 127 106 A 12.5 12.5 0 0 1 133 118" stroke="currentColor" strokeWidth="2.2" fill="none" />
              {/* Solitaire Diamond Gem on Top of Right Ring */}
              <path d="M 138 98 L 142 103 L 138 107 L 134 103 Z" fill="currentColor" />
            </g>

            {/* Peter 'P' in Calligraphy Font */}
            <text
              x="174"
              y="136"
              textAnchor="middle"
              className="fill-current text-navy-950 select-none"
              style={{
                fontFamily: "'Great Vibes', 'Alex Brush', 'Pinyon Script', cursive",
                fontSize: '84px',
                fontWeight: 400,
              }}
            >
              P
            </text>

            {/* Date Ribbon / Roman Numerals at bottom of crest */}
            <g>
              <line x1="90" y1="168" x2="110" y2="168" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
              <circle cx="114" cy="168" r="1.5" fill="#C5A059" />
              <text
                x="130"
                y="171"
                textAnchor="middle"
                className="font-serif select-none"
                style={{
                  fontSize: '9.5px',
                  letterSpacing: '0.28em',
                  fontWeight: 600,
                  fill: '#172F50',
                }}
              >
                12 • 12 • 2026
              </text>
              <circle cx="146" cy="168" r="1.5" fill="#C5A059" />
              <line x1="150" y1="168" x2="170" y2="168" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
            </g>
          </motion.g>
        ) : (
          <g>
            {/* Sylvia 'S' in Calligraphy Font */}
            <text
              x="86"
              y="136"
              textAnchor="middle"
              className="fill-current text-navy-950 select-none"
              style={{
                fontFamily: "'Great Vibes', 'Alex Brush', 'Pinyon Script', cursive",
                fontSize: '84px',
                fontWeight: 400,
              }}
            >
              S
            </text>

            {/* Central Interlocking Wedding Rings & Diamond in Champagne Gold */}
            <g className="text-[#C5A059]" filter="url(#crestGlow)">
              {/* Left Wedding Ring */}
              <circle cx="122" cy="116" r="12.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
              {/* Right Wedding Ring */}
              <circle cx="138" cy="116" r="12.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
              {/* Interlocking Arch Overlap */}
              <path d="M 127 106 A 12.5 12.5 0 0 1 133 118" stroke="currentColor" strokeWidth="2.2" fill="none" />
              {/* Solitaire Diamond Gem on Top of Right Ring */}
              <path d="M 138 98 L 142 103 L 138 107 L 134 103 Z" fill="currentColor" />
            </g>

            {/* Peter 'P' in Calligraphy Font */}
            <text
              x="174"
              y="136"
              textAnchor="middle"
              className="fill-current text-navy-950 select-none"
              style={{
                fontFamily: "'Great Vibes', 'Alex Brush', 'Pinyon Script', cursive",
                fontSize: '84px',
                fontWeight: 400,
              }}
            >
              P
            </text>

            {/* Date Ribbon / Roman Numerals at bottom of crest */}
            <g>
              <line x1="90" y1="168" x2="110" y2="168" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
              <circle cx="114" cy="168" r="1.5" fill="#C5A059" />
              <text
                x="130"
                y="171"
                textAnchor="middle"
                className="font-serif select-none"
                style={{
                  fontSize: '9.5px',
                  letterSpacing: '0.28em',
                  fontWeight: 600,
                  fill: '#172F50',
                }}
              >
                12 • 12 • 2026
              </text>
              <circle cx="146" cy="168" r="1.5" fill="#C5A059" />
              <line x1="150" y1="168" x2="170" y2="168" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
            </g>
          </g>
        )}

        {/* 6. Bottom Flourish Ribbon Knot */}
        <g stroke="url(#crestGoldGradient)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 124 207 C 120 215 116 220 110 223" />
          <path d="M 136 207 C 140 215 144 220 150 223" />
          <path d="M 125 210 C 130 206 135 206 140 210" />
          <circle cx="130" cy="207" r="2.2" fill="url(#crestGoldGradient)" />
        </g>
      </svg>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className="flex items-center justify-center"
      >
        {CrestContent}
      </motion.div>
    );
  }

  return CrestContent;
}
