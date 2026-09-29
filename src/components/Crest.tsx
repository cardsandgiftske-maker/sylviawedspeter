import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload } from 'lucide-react';
import defaultCrestImg from '../assets/images/sp_wreath_crest_1790681210706.jpg';

interface CrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function Crest({ size = 'md', animated = true }: CrestProps) {
  const [customCrest, setCustomCrest] = useState<string | null>(null);
  const [transparentImg, setTransparentImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom crest from localStorage if previously uploaded
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sylvia_peter_custom_crest');
      if (stored) {
        setCustomCrest(stored);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const imageToDisplay = customCrest || defaultCrestImg;

  // Background removal: dynamically process pixels on an offscreen canvas
  // to remove all background (white/off-white) and output a 100% transparent PNG with NO shadow or backlight
  useEffect(() => {
    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageToDisplay;

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
  }, [imageToDisplay]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomCrest(result);
          try {
            localStorage.setItem('sylvia_peter_custom_crest', result);
          } catch {
            // Storage quota fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  // Pure crest artwork with zero backlight, zero shadow, zero background
  const CrestContent = (
    <div
      className={`relative group flex items-center justify-center ${sizeClasses[size]} select-none my-1 bg-transparent`}
      id="wedding-crest-container"
    >
      <div className="relative w-full h-full flex items-center justify-center p-2 bg-transparent">
        <img
          src={transparentImg || imageToDisplay}
          alt="Sylvia & Dr. Peter Wedding Crest"
          className="w-full h-full object-contain bg-transparent border-0 outline-none select-none pointer-events-none"
          style={{
            mixBlendMode: transparentImg ? 'normal' : 'multiply',
            filter: 'none',
            boxShadow: 'none',
          }}
        />
      </div>

      {/* Hidden file input to allow selecting exact local image */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Subtle hover upload badge for replacing or fine-tuning the crest image */}
      <button
        onClick={() => fileInputRef.current?.click()}
        type="button"
        className="absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-1 bg-white hover:bg-stone-50 text-stone-700 hover:text-navy-950 border border-stone-200 text-[10px] font-sans font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer z-20 shadow-xs"
        title="Upload or change crest image"
      >
        <Upload className="w-3 h-3 text-champagne-600" />
        <span>Change Crest Image</span>
      </button>

      {/* Reset button if custom crest is set */}
      {customCrest && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCustomCrest(null);
            localStorage.removeItem('sylvia_peter_custom_crest');
          }}
          type="button"
          className="absolute -top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-stone-500 hover:text-red-600 border border-stone-200 rounded-full p-1 text-[10px] z-20"
          title="Reset to default crest"
        >
          ✕
        </button>
      )}
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
