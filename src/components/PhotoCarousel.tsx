import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Trash2, 
  Maximize2, 
  X, 
  Play, 
  Pause, 
  CheckCircle2, 
  Unlock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { 
  subscribeToCarouselPhotos, 
  saveCarouselPhoto, 
  deleteCarouselPhoto, 
  clearAllCarouselPhotos, 
  CloudCarouselPhoto 
} from '../lib/firebase';

export interface CarouselPhoto {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  isUserUploaded?: boolean;
}

const AUTH_KEY = 'sylvia_peter_admin_auth';

// Helper to compress images so they fit efficiently into cloud database storage
function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1280;
        const MAX_HEIGHT = 960;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
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
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

export default function PhotoCarousel() {
  const [photos, setPhotos] = useState<CarouselPhoto[]>([]);
  const [isSavingToCloud, setIsSavingToCloud] = useState(false);

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

  // Private Passcode Modal states (accessible if couple uses keyboard shortcut or couple tools)
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Subscribe to real-time Cloud Firestore updates for carousel photos
  useEffect(() => {
    const unsubscribe = subscribeToCarouselPhotos((cloudPhotos: CloudCarouselPhoto[]) => {
      setPhotos(cloudPhotos);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  // Passcode verification for couple
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
      
      window.dispatchEvent(new Event('sylvia_peter_admin_authenticated'));
      setUploadSuccessToast('Couple access verified.');
      setTimeout(() => setUploadSuccessToast(null), 3000);

      setTimeout(() => {
        fileInputRef.current?.click();
      }, 350);
    } else {
      setPasscodeError('Incorrect passcode.');
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

  const handleConfirmUpload = async () => {
    if (pendingUploads.length === 0) return;

    setIsSavingToCloud(true);
    try {
      for (let idx = 0; idx < pendingUploads.length; idx++) {
        const item = pendingUploads[idx];
        const newPhoto: CloudCarouselPhoto = {
          id: 'cloud-photo-' + Date.now() + '-' + idx,
          url: item.url,
          title: uploadCaption.trim() || item.name || 'Wedding Photo',
          order: photos.length + idx,
          createdAt: new Date().toISOString(),
          isUserUploaded: true,
        };

        await saveCarouselPhoto(newPhoto);
      }

      setShowUploadModal(false);
      setPendingUploads([]);
      setUploadCaption('');
      setUploadSuccessToast('Photo(s) saved to cloud storage.');
      setTimeout(() => setUploadSuccessToast(null), 3000);
      setCurrentIndex(photos.length);
    } catch (err) {
      console.error('Failed to save photos to cloud:', err);
      setUploadSuccessToast('Upload error. Please try again.');
      setTimeout(() => setUploadSuccessToast(null), 3000);
    } finally {
      setIsSavingToCloud(false);
    }
  };

  const handleDeletePhoto = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this photo from cloud storage?')) {
      await deleteCarouselPhoto(id);
      setUploadSuccessToast('Photo removed.');
      setTimeout(() => setUploadSuccessToast(null), 2500);
      if (currentIndex >= photos.length - 1) {
        setCurrentIndex(Math.max(0, photos.length - 2));
      }
    }
  };

  const handleClearAllPhotos = async () => {
    if (window.confirm('Clear all photos from cloud storage and reset the carousel?')) {
      await clearAllCarouselPhotos();
      setCurrentIndex(0);
      setUploadSuccessToast('All photos removed.');
      setTimeout(() => setUploadSuccessToast(null), 2500);
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

      {/* Couple Management Bar (Only rendered when couple is authenticated) */}
      {isCoupleAuthenticated && (
        <div className="flex items-center justify-between gap-2 mb-3 px-2 py-1.5 bg-navy-50/80 border border-navy-200 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs text-navy-900 font-sans font-semibold">
            <ShieldCheck className="w-4 h-4 text-navy-700" />
            <span>Couple Mode Active</span>
          </div>
          <div className="flex items-center gap-2">
            {photos.length > 0 && (
              <button
                onClick={handleClearAllPhotos}
                className="px-2.5 py-1 text-stone-500 hover:text-rose-600 text-xs font-sans transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-navy-900 hover:bg-navy-800 text-white rounded-full text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
            >
              <Upload className="w-3 h-3" />
              <span>Add Photo</span>
            </button>
            <button
              onClick={handleLockPrivateMode}
              className="p-1 text-stone-400 hover:text-rose-600 cursor-pointer"
              title="Lock Couple Mode"
            >
              <Unlock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Carousel Display */}
      {photos.length > 0 && (
        <>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] min-h-[300px] rounded-3xl overflow-hidden bg-stone-900 shadow-xl border border-stone-200 group"
          >
            {/* Main Active Image with AnimatePresence */}
            <AnimatePresence mode="wait">
              {currentPhoto && (
                <motion.div
                  key={currentPhoto.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-stone-950/30" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5 -ml-0.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight className="w-5 h-5 -mr-0.5" />
                </button>
              </>
            )}

            {/* Top Right Quick Controls: Play/Pause, Fullscreen & (Couple Delete if authenticated) */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2 z-20">
              {photos.length > 1 && (
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 sm:p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white backdrop-blur-md transition-colors cursor-pointer shadow-md"
                  title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              )}

              <button
                onClick={() => setLightboxPhoto(currentPhoto)}
                className="p-2 sm:p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white backdrop-blur-md transition-colors cursor-pointer shadow-md"
                title="View Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {isCoupleAuthenticated && (
                <button
                  onClick={(e) => handleDeletePhoto(currentPhoto.id, e)}
                  className="p-2 sm:p-2.5 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white backdrop-blur-md transition-colors cursor-pointer shadow-md"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Bottom Caption Overlay: Only photo title, without subtitle or 'added by couple' */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white text-left z-20 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase tracking-wider font-sans font-bold bg-white/20 backdrop-blur-md text-amber-200 px-2.5 py-0.5 rounded-full">
                  Photo {currentIndex + 1} of {photos.length}
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal drop-shadow-sm text-white">
                {currentPhoto.title}
              </h4>
            </div>

            {/* Progress indicator bar on autoplay */}
            {isPlaying && photos.length > 1 && !isHovered && (
              <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-20">
                <motion.div
                  key={currentIndex}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4.5, ease: 'linear' }}
                  className="h-full bg-amber-400"
                />
              </div>
            )}
          </div>

          {/* Thumbnails Navigation Strip */}
          <div className="flex items-center justify-center gap-2 mt-3 overflow-x-auto py-1 px-2 no-scrollbar">
            {photos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shrink-0 ${
                  currentIndex === idx
                    ? 'w-14 sm:w-16 h-10 border-2 border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/20'
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

            {isCoupleAuthenticated && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-10 sm:w-12 h-8 rounded-xl border border-dashed border-navy-300 bg-navy-50/70 hover:bg-navy-100 text-navy-800 flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-2xs"
                title="Add photo"
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

              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-navy-800 bg-navy-50 border border-navy-200 px-3 py-1 rounded-full">
                Couple Portal
              </span>

              <h3 className="font-serif text-2xl text-navy-950 font-medium mt-3 mb-1">
                Enter Passcode
              </h3>

              <form onSubmit={handleVerifyPasscode} className="space-y-4 mt-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter Couple Passcode"
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    className="w-full bg-navy-50/30 border border-navy-200 focus:border-navy-800 rounded-xl pl-4 pr-11 py-3 text-sm text-stone-900 text-center outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-stone-400 hover:text-navy-900 transition-colors cursor-pointer"
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
                    className="flex-1 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
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
                <h3 className="font-serif text-2xl text-navy-950 font-medium mt-2">
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
                  className="w-full bg-stone-50 border border-stone-200 focus:border-navy-700 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isSavingToCloud}
                  onClick={() => { setShowUploadModal(false); setPendingUploads([]); }}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-sans font-bold text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSavingToCloud}
                  onClick={handleConfirmUpload}
                  className="flex-1 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-75"
                >
                  {isSavingToCloud ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Save Photo</span>
                    </>
                  )}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-navy-950 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border border-navy-800 text-xs sm:text-sm font-sans"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{uploadSuccessToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal (Clean, no subtitle) */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[90vh] flex flex-col items-center"
            >
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <h4 className="font-serif text-2xl font-light">{lightboxPhoto.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
