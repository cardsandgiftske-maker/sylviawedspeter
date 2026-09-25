import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Trash2, 
  Maximize2, 
  X, 
  Sparkles, 
  Image as ImageIcon,
  Play,
  Pause,
  CheckCircle2,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export interface CarouselPhoto {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  isUserUploaded?: boolean;
}

const STORAGE_KEY = 'sylvia_peter_carousel_uploaded_photos_v2';
const AUTH_KEY = 'sylvia_peter_admin_auth';

// Helper to compress images so they fit efficiently into browser storage
function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.88));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

export default function PhotoCarousel() {
  // Start with completely blank photos list (no sample photos)
  const [photos, setPhotos] = useState<CarouselPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CarouselPhoto[];
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed reading carousel photos:', e);
    }
    return [];
  });

  // Couple authentication state (private uploading)
  const [isCoupleAuthenticated, setIsCoupleAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<CarouselPhoto | null>(null);
  
  // Upload flow states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<{ url: string; name: string }[]>([]);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Private Passcode Modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with AdminPanel authentication if already logged in elsewhere
  useEffect(() => {
    const handleAuthSync = () => {
      setIsCoupleAuthenticated(true);
    };
    window.addEventListener('sylvia_peter_admin_authenticated', handleAuthSync);
    return () => window.removeEventListener('sylvia_peter_admin_authenticated', handleAuthSync);
  }, []);

  // Auto-play timer when photos exist
  useEffect(() => {
    if (photos.length <= 1 || !isPlaying || isHovered || lightboxPhoto !== null || showUploadModal || showAuthModal) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, photos.length, lightboxPhoto, showUploadModal, showAuthModal]);

  const handleNext = () => {
    if (photos.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    if (photos.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Trigger upload (guarded by private authentication)
  const handleInitiateUpload = () => {
    if (isCoupleAuthenticated) {
      fileInputRef.current?.click();
    } else {
      setPasscodeInput('');
      setPasscodeError('');
      setShowAuthModal(true);
    }
  };

  // Passcode verification
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError('');

    const lower = passcodeInput.trim().toLowerCase();
    if (
      lower === 'sylviapeter2026' ||
      lower === 'sylviapeter' ||
      lower === 'sylvia' ||
      lower === 'peter' ||
      lower === 'peterkamau' ||
      lower === 'kamau' ||
      lower === '2026'
    ) {
      setIsCoupleAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch (err) {
        console.error(err);
      }
      setShowAuthModal(false);
      setPasscodeInput('');
      
      // Notify other components
      window.dispatchEvent(new Event('sylvia_peter_admin_authenticated'));

      setUploadSuccessToast('Unlocked! Couple access verified.');
      setTimeout(() => setUploadSuccessToast(null), 3000);

      // Immediately open file picker for convenience
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 350);
    } else {
      setPasscodeError('Incorrect passcode. Please enter the couple passcode to upload.');
    }
  };

  const handleLockPrivateMode = () => {
    setIsCoupleAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch (err) {
      console.error(err);
    }
    setUploadSuccessToast('Private upload locked.');
    setTimeout(() => setUploadSuccessToast(null), 2500);
  };

  const processFiles = async (files: FileList | File[]) => {
    if (!isCoupleAuthenticated) {
      handleInitiateUpload();
      return;
    }

    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      alert('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    const compressedResults = await Promise.all(
      validFiles.map(async (file) => {
        const compressedUrl = await compressImage(file);
        return {
          url: compressedUrl,
          name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        };
      })
    );

    const validResults = compressedResults.filter(item => item.url && item.url.length > 0);
    if (validResults.length === 0) return;

    setPendingUploads(validResults);
    if (validResults.length === 1) {
      setUploadCaption(validResults[0].name);
    } else {
      setUploadCaption('');
    }
    setShowUploadModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isCoupleAuthenticated) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isCoupleAuthenticated) {
      handleInitiateUpload();
      return;
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleConfirmUpload = () => {
    if (pendingUploads.length === 0) return;

    const newPhotos: CarouselPhoto[] = pendingUploads.map((item, idx) => ({
      id: 'upload-' + Date.now() + '-' + idx,
      url: item.url,
      title: uploadCaption.trim() || item.name || 'Wedding Photo',
      subtitle: `Added by couple on ${new Date().toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      isUserUploaded: true,
    }));

    const updated = [...photos, ...newPhotos];
    setPhotos(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage limit reached or failed:', e);
    }

    setCurrentIndex(updated.length - newPhotos.length);
    setShowUploadModal(false);
    setPendingUploads([]);
    setUploadCaption('');

    setUploadSuccessToast('Photo(s) added to carousel successfully!');
    setTimeout(() => setUploadSuccessToast(null), 3500);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCoupleAuthenticated) {
      handleInitiateUpload();
      return;
    }
    if (window.confirm('Delete this photo from the carousel?')) {
      const filtered = photos.filter(p => p.id !== id);
      setPhotos(filtered);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (err) {
        console.error(err);
      }
      if (currentIndex >= filtered.length) {
        setCurrentIndex(Math.max(0, filtered.length - 1));
      }
    }
  };

  const handleClearAllPhotos = () => {
    if (!isCoupleAuthenticated) {
      handleInitiateUpload();
      return;
    }
    if (window.confirm('Clear all photos and reset the carousel to blank?')) {
      setPhotos([]);
      localStorage.removeItem(STORAGE_KEY);
      setCurrentIndex(0);
    }
  };

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-2 sm:px-4 select-none">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sapphire-50 border border-sapphire-200 flex items-center justify-center text-sapphire-800">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg md:text-xl font-medium text-stone-900 leading-tight">
                Photo Showcase
              </h3>
              {isCoupleAuthenticated && (
                <span className="flex items-center gap-1 text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Couple Mode</span>
                </span>
              )}
            </div>
            <p className="text-[11px] font-sans text-stone-500">
              {photos.length === 0 
                ? (isCoupleAuthenticated ? 'Upload photos for your wedding carousel' : 'Private wedding photo gallery') 
                : `${photos.length} photo${photos.length !== 1 ? 's' : ''} in gallery`}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {photos.length > 0 && (
            <>
              {isCoupleAuthenticated && (
                <button
                  onClick={handleClearAllPhotos}
                  className="px-3 py-1.5 text-stone-400 hover:text-rose-600 text-xs font-sans font-medium transition-colors cursor-pointer"
                  title="Clear all photos"
                >
                  Clear all
                </button>
              )}

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 shadow-2xs transition-colors cursor-pointer"
                title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </>
          )}

          {/* Private Upload Button with Lock/Unlock Status */}
          {isCoupleAuthenticated ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleInitiateUpload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sapphire-800 to-emerald-800 hover:from-sapphire-900 hover:to-emerald-900 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
                title="Upload photo(s)"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </button>
              <button
                onClick={handleLockPrivateMode}
                className="p-2 rounded-full bg-white hover:bg-rose-50 border border-stone-200 text-stone-500 hover:text-rose-600 shadow-2xs transition-colors cursor-pointer"
                title="Lock Private Mode"
              >
                <Unlock className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleInitiateUpload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-250 text-stone-700 font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-2xs transition-all cursor-pointer"
              title="Private couple upload portal"
            >
              <Lock className="w-3.5 h-3.5 text-sapphire-700" />
              <span>Couple Upload</span>
            </button>
          )}
        </div>
      </div>

      {/* When blank: Private placeholder state */}
      {photos.length === 0 ? (
        <div
          onClick={handleInitiateUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] min-h-[260px] rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer group shadow-xs overflow-hidden ${
            isCoupleAuthenticated
              ? (isDragging 
                  ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01] border-dashed' 
                  : 'border-dashed border-emerald-400/80 bg-white hover:bg-emerald-50/20')
              : 'border-stone-250 bg-white/80 hover:bg-white hover:border-sapphire-300'
          }`}
        >
          {/* Subtle background gradient glow */}
          <div className="absolute inset-0 bg-radial-gradient from-sapphire-500/[0.03] to-transparent pointer-events-none rounded-3xl" />

          {/* Central Private Visual */}
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full bg-sapphire-50/80 border border-sapphire-200/80 text-sapphire-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all">
              {isCoupleAuthenticated ? (
                <Upload className="w-7 h-7 text-emerald-700" />
              ) : (
                <Lock className="w-7 h-7 text-sapphire-800" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-3 h-3 text-champagne-300" />
            </div>
          </div>

          <h4 className="font-serif text-xl sm:text-2xl text-stone-900 font-medium mb-1.5">
            Sylvia &amp; Dr. Peter's Photo Showcase
          </h4>

          {isCoupleAuthenticated ? (
            <>
              <p className="text-stone-600 font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-5">
                You are in <strong>Couple Admin Mode</strong>. Click here or drag and drop your wedding pictures to add them to the top showcase.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-sm group-hover:shadow-md transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>Select Photos to Upload</span>
              </div>
            </>
          ) : (
            <>
              <p className="text-stone-500 font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-5">
                Photo uploading is private to the couple. Official wedding photographs will be showcased here by Sylvia &amp; Dr. Peter.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-sapphire-50 border border-stone-250 hover:border-sapphire-300 text-stone-700 hover:text-sapphire-900 font-sans font-bold text-xs uppercase tracking-wider transition-all">
                <KeyRound className="w-3.5 h-3.5 text-sapphire-700" />
                <span>Couple Login to Upload</span>
              </div>
            </>
          )}

          <p className="text-[10px] text-stone-400 font-sans uppercase tracking-widest mt-4">
            Private Gallery • Saturday, 12th December 2026
          </p>
        </div>
      ) : (
        /* When photos exist: Full interactive carousel */
        <>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] bg-stone-900 rounded-3xl overflow-hidden shadow-xl border-2 border-emerald-900/20 group"
          >
            {/* Animated Image Slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => setLightboxPhoto(currentPhoto)}
              >
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Cinematic Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-sapphire-950/30 via-transparent to-emerald-950/30 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Top Badges & Actions */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-white font-sans text-[11px] font-bold tracking-wider rounded-full pointer-events-auto">
                {currentIndex + 1} / {photos.length}
              </span>

              <div className="flex items-center gap-2 pointer-events-auto">
                {/* Delete button only visible to authorized couple */}
                {isCoupleAuthenticated && (
                  <button
                    onClick={(e) => handleDeletePhoto(currentPhoto.id, e)}
                    className="p-2 rounded-full bg-black/40 hover:bg-rose-900/80 backdrop-blur-md border border-white/25 text-white hover:text-rose-200 transition-all cursor-pointer shadow-sm"
                    title="Remove this photo (Couple Admin)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => setLightboxPhoto(currentPhoto)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/25 text-white transition-all cursor-pointer shadow-sm"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Previous Button (if multiple photos) */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20 active:scale-95 shadow-lg group-hover:opacity-100 opacity-80"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20 active:scale-95 shadow-lg group-hover:opacity-100 opacity-80"
                  title="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom Title & Subtitle Overlay */}
            <div className="absolute bottom-3 inset-x-4 z-20 pointer-events-none text-left">
              <div className="max-w-xl">
                <h4 className="font-serif text-lg sm:text-2xl text-white font-medium drop-shadow-md leading-snug">
                  {currentPhoto.title}
                </h4>
                {currentPhoto.subtitle && (
                  <p className="font-sans text-xs sm:text-sm text-stone-200 drop-shadow-sm mt-0.5 line-clamp-2">
                    {currentPhoto.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnails Navigation Row */}
          <div className="flex items-center justify-center gap-2 mt-3 overflow-x-auto py-1 px-2 no-scrollbar">
            {photos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shrink-0 ${
                  currentIndex === idx
                    ? 'w-14 sm:w-16 h-10 border-2 border-emerald-500 scale-105 shadow-md ring-2 ring-emerald-500/20'
                    : 'w-10 sm:w-12 h-8 border border-stone-200 opacity-60 hover:opacity-100 hover:scale-100'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

            {/* Add Photo Button (Available when in couple mode) */}
            {isCoupleAuthenticated && (
              <button
                onClick={handleInitiateUpload}
                className="w-10 sm:w-12 h-8 rounded-xl border border-dashed border-emerald-500/60 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-2xs"
                title="Upload another photo"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </>
      )}

      {/* Private Authentication Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 border border-stone-200 shadow-2xl relative text-center">
              <button
                onClick={() => { setShowAuthModal(false); setPasscodeInput(''); setPasscodeError(''); }}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-sapphire-50 border border-sapphire-200 flex items-center justify-center mx-auto mb-4 text-sapphire-800 shadow-xs">
                <Lock className="w-7 h-7" />
              </div>

              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-sapphire-800 bg-sapphire-50 border border-sapphire-200 px-3 py-1 rounded-full">
                Couple Private Portal
              </span>

              <h3 className="font-serif text-2xl text-stone-900 font-medium mt-3 mb-1">
                Private Photo Upload
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-5">
                Photo uploading is private to <strong>Sylvia &amp; Dr. Peter</strong>. Please enter the passcode to access upload controls.
              </p>

              <form onSubmit={handleVerifyPasscode} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter Couple Passcode"
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-sapphire-700 rounded-xl pl-4 pr-11 py-3 text-sm text-stone-900 text-center outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {passcodeError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center justify-center gap-1.5 text-left">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{passcodeError}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { setShowAuthModal(false); setPasscodeInput(''); setPasscodeError(''); }}
                    className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-sans font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-sapphire-800 hover:bg-sapphire-900 text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Confirmation & Caption Modal */}
      <AnimatePresence>
        {showUploadModal && pendingUploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-stone-200 shadow-2xl relative">
              <button
                onClick={() => { setShowUploadModal(false); setPendingUploads([]); }}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-4">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-sapphire-800 bg-sapphire-50 border border-sapphire-200 px-3 py-1 rounded-full">
                  Wedding Photo Showcase
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-medium mt-2">
                  {pendingUploads.length === 1 ? 'Preview & Add Photo' : `Add ${pendingUploads.length} Photos`}
                </h3>
              </div>

              {/* Preview image */}
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-stone-200 mb-4 bg-stone-100 shadow-inner">
                <img
                  src={pendingUploads[0].url}
                  alt="Upload Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption field */}
              <div className="space-y-1.5 mb-5 text-left">
                <label className="text-xs uppercase tracking-wider font-sans font-bold text-stone-500">
                  {pendingUploads.length === 1 ? 'Caption or Title' : 'Batch Caption / Album Name'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sylvia & Dr. Peter Celebration"
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-sapphire-600 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => { setShowUploadModal(false); setPendingUploads([]); }}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-sans font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmUpload}
                  className="flex-1 py-3 bg-sapphire-800 hover:bg-sapphire-900 text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Add to Carousel</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {uploadSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900 border border-emerald-400 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-sans font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{uploadSuccessToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              title="Close Fullscreen"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            >
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <div className="mt-4 text-center text-white">
                <h4 className="font-serif text-2xl font-medium">{lightboxPhoto.title}</h4>
                {lightboxPhoto.subtitle && (
                  <p className="font-sans text-xs text-stone-300 mt-1">{lightboxPhoto.subtitle}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
