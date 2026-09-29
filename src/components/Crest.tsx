import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import defaultCrestImg from '../assets/images/sp_wreath_crest_1790681210706.jpg';

interface CrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function Crest({ size = 'md', animated = true }: CrestProps) {
  const [transparentImg, setTransparentImg] = useState<string | null>(null);

  // Background removal: dynamically process pixels on an offscreen canvas
  // to ensure 100% transparent PNG with NO shadow, NO backlight, and NO background
  useEffect(() => {
    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = defaultCrestImg;

    img.onload = () => {
      if (isCancelled) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 600;
        canvas.height = img.naturalHeight || 600;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        // Strip out white/light background completely
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const minVal = Math.min(r, g, b);

          if (minVal > 210) {
            // Smoothly feather away light background pixels to 0 alpha
            const factor = (minVal - 210) / (255 - 210);
            d[i + 3] = Math.max(0, Math.round(255 * (1 - factor * factor)));
          }
        }

        ctx.putImageData(imgData, 0, 0);
        if (!isCancelled) {
          setTransparentImg(canvas.toDataURL('image/png'));
        }
      } catch {
        // Fallback gracefully
      }
    };

    return () => {
      isCancelled = true;
    };
  }, []);

  // Proportional sizing for the 1:1 circular crest
  const sizeClasses = {
    sm: 'w-36 h-36',
    md: 'w-56 h-56 sm:w-64 sm:h-64',
    lg: 'w-72 h-72 sm:w-80 sm:h-80',
    xl: 'w-88 h-88 sm:w-96 sm:h-96',
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Pure crest artwork with zero backlight, zero shadow, zero background, and no image upload controls
  const CrestContent = (
    <div
      className={`relative flex items-center justify-center ${sizeClasses[size]} select-none my-1 bg-transparent`}
      id="wedding-crest-container"
    >
      <div className="relative w-full h-full flex items-center justify-center p-2 bg-transparent">
        <img
          src={transparentImg || defaultCrestImg}
          alt="Sylvia & Dr. Peter Wedding Crest"
          className="w-full h-full object-contain bg-transparent border-0 outline-none select-none pointer-events-none"
          style={{
            mixBlendMode: transparentImg ? 'normal' : 'multiply',
            filter: 'none',
            boxShadow: 'none',
          }}
        />
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className="flex items-center justify-center w-full bg-transparent"
      >
        {CrestContent}
      </motion.div>
    );
  }

  return CrestContent;
}
