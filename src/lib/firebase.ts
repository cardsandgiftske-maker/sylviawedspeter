import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc,
  getDocFromServer
} from 'firebase/firestore';
import { RsvpGuest } from '../types';
import firebaseAppletConfig from '../../firebase-applet-config.json';

// Read Firebase configuration from config file and environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseAppletConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseAppletConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseAppletConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseAppletConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseAppletConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseAppletConfig.appId,
  firestoreDatabaseId: firebaseAppletConfig.firestoreDatabaseId
};

// Check if Firebase is configured
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'MY_FIREBASE_API_KEY'
);

let dbInstance: any = null;

// Initialize Firebase and Firestore
export function getDb() {
  if (!isFirebaseConfigured) {
    return null;
  }
  
  if (!dbInstance) {
    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      dbInstance = firebaseConfig.firestoreDatabaseId
        ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
        : getFirestore(app);

      // Validate connection asynchronously in background
      testConnection(dbInstance);
    } catch (error) {
      console.error('Firebase initialization error:', error);
      return null;
    }
  }
  return dbInstance;
}

async function testConnection(db: any) {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or starting up.');
    }
  }
}

// ==========================================
// 1. CAROUSEL PHOTOS CLOUD STORAGE API
// ==========================================

export interface CloudCarouselPhoto {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  order?: number;
  createdAt?: string;
  isUserUploaded?: boolean;
}

const CAROUSEL_COLLECTION = 'carousel_photos';
const CAROUSEL_LOCAL_KEY = 'sylvia_peter_carousel_uploaded_photos_v2';

const getLocalCarouselPhotos = (): CloudCarouselPhoto[] => {
  try {
    return JSON.parse(localStorage.getItem(CAROUSEL_LOCAL_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveLocalCarouselPhotos = (photos: CloudCarouselPhoto[]) => {
  try {
    localStorage.setItem(CAROUSEL_LOCAL_KEY, JSON.stringify(photos));
    window.dispatchEvent(new Event('carousel_photos_database_updated'));
  } catch (e) {
    console.warn('localStorage limit reached for carousel photos:', e);
  }
};

/**
 * Fetch all carousel photos from Cloud Firestore (falls back to localStorage)
 */
export async function fetchCarouselPhotos(): Promise<CloudCarouselPhoto[]> {
  const db = getDb();
  if (db) {
    try {
      const q = query(collection(db, CAROUSEL_COLLECTION), orderBy('createdAt', 'asc'));
      const snapshot = await getDocs(q);
      const cloudPhotos: CloudCarouselPhoto[] = [];
      snapshot.forEach((docSnap) => {
        cloudPhotos.push(docSnap.data() as CloudCarouselPhoto);
      });

      if (cloudPhotos.length > 0) {
        saveLocalCarouselPhotos(cloudPhotos);
        return cloudPhotos;
      }
    } catch (error) {
      console.warn('Failed to fetch carousel photos from Cloud Firestore, using local cache:', error);
    }
  }
  return getLocalCarouselPhotos();
}

/**
 * Save a new or edited photo to Cloud Firestore & localStorage
 */
export async function saveCarouselPhoto(photo: CloudCarouselPhoto): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      const docRef = doc(db, CAROUSEL_COLLECTION, photo.id);
      await setDoc(docRef, photo);
    } catch (error) {
      console.warn('Failed to save photo to Cloud Firestore, saving locally:', error);
    }
  }

  // Always update local cache
  const local = getLocalCarouselPhotos();
  const index = local.findIndex((p) => p.id === photo.id);
  let updated: CloudCarouselPhoto[];
  if (index >= 0) {
    updated = [...local];
    updated[index] = photo;
  } else {
    updated = [...local, photo];
  }
  saveLocalCarouselPhotos(updated);
}

/**
 * Delete a photo from Cloud Firestore & localStorage
 */
export async function deleteCarouselPhoto(id: string): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await deleteDoc(doc(db, CAROUSEL_COLLECTION, id));
    } catch (error) {
      console.warn('Failed to delete photo from Cloud Firestore, deleting locally:', error);
    }
  }

  const local = getLocalCarouselPhotos();
  const updated = local.filter((p) => p.id !== id);
  saveLocalCarouselPhotos(updated);
}

/**
 * Clear all photos from Cloud Firestore & localStorage
 */
export async function clearAllCarouselPhotos(): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      const snapshot = await getDocs(collection(db, CAROUSEL_COLLECTION));
      const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.warn('Failed to clear photos from Cloud Firestore:', error);
    }
  }

  localStorage.removeItem(CAROUSEL_LOCAL_KEY);
  window.dispatchEvent(new Event('carousel_photos_database_updated'));
}

/**
 * Subscribe to real-time carousel photo updates across devices
 */
export function subscribeToCarouselPhotos(onUpdate: (photos: CloudCarouselPhoto[]) => void): () => void {
  const db = getDb();
  if (db) {
    try {
      const q = query(collection(db, CAROUSEL_COLLECTION), orderBy('createdAt', 'asc'));
      return onSnapshot(
        q,
        (snapshot) => {
          const photos: CloudCarouselPhoto[] = [];
          snapshot.forEach((docSnap) => {
            photos.push(docSnap.data() as CloudCarouselPhoto);
          });
          saveLocalCarouselPhotos(photos);
          onUpdate(photos);
        },
        (error) => {
          console.warn('Firestore carousel photo snapshot error:', error);
        }
      );
    } catch (e) {
      console.warn('Could not subscribe to cloud carousel photos, using local updates:', e);
    }
  }

  // Local storage fallback event listener
  const handleLocalUpdate = () => {
    onUpdate(getLocalCarouselPhotos());
  };
  window.addEventListener('carousel_photos_database_updated', handleLocalUpdate);
  handleLocalUpdate();

  return () => {
    window.removeEventListener('carousel_photos_database_updated', handleLocalUpdate);
  };
}

// ==========================================
// 2. RSVP DATABASE API
// ==========================================

const RSVP_COLLECTION = 'rsvps';

const getLocalRsvps = (): RsvpGuest[] => {
  return JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
};

const saveLocalRsvps = (rsvps: RsvpGuest[]) => {
  localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
  window.dispatchEvent(new Event('rsvp_database_updated'));
};

const getSeedData = (): RsvpGuest[] => {
  return [
    {
      id: 'seed-1',
      fullName: 'Christopher Mwangi',
      phoneNumber: '+254 712 345 678',
      willAttend: 'yes',
      adultsCount: 2,
      childrenCount: 1,
      submittedAt: '2026-07-15T12:30:00.000Z',
      eCardCode: 'SP-26-X83A',
      notes: 'Looking forward to delivering the vote of thanks!'
    },
    {
      id: 'seed-2',
      fullName: 'Mercy Wanjiku',
      phoneNumber: '+254 722 987 654',
      willAttend: 'yes',
      adultsCount: 1,
      childrenCount: 0,
      submittedAt: '2026-07-16T09:15:00.000Z',
      eCardCode: 'SP-26-K92B',
      notes: 'Gluten-free / vegetarian dietary preference please.'
    },
    {
      id: 'seed-3',
      fullName: 'David Omondi',
      phoneNumber: '+254 733 444 555',
      willAttend: 'no',
      adultsCount: 0,
      childrenCount: 0,
      submittedAt: '2026-07-18T16:45:00.000Z',
      eCardCode: 'SP-26-R15C',
      notes: 'Sending love! Traveling out of the country on that weekend.'
    }
  ];
};

/**
 * Clean and normalize phone numbers for deduplication checks
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return '';
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+254')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('254')) {
    cleaned = '0' + cleaned.slice(3);
  }
  return cleaned;
}

/**
 * Check if a phone number has already submitted an RSVP
 */
export async function hasPhoneAlreadyRsvped(phone: string): Promise<boolean> {
  const normTarget = normalizePhoneNumber(phone);
  if (!normTarget) return false;

  const currentRsvps = await getRsvps();
  return currentRsvps.some((r) => normalizePhoneNumber(r.phoneNumber) === normTarget);
}

/**
 * Fetch all RSVPs. Auto-seeds default entries if database is empty.
 */
export async function getRsvps(): Promise<RsvpGuest[]> {
  const db = getDb();
  if (db) {
    try {
      const q = query(collection(db, RSVP_COLLECTION), orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);
      const cloudRsvps: RsvpGuest[] = [];
      snapshot.forEach((docSnap) => {
        cloudRsvps.push(docSnap.data() as RsvpGuest);
      });
      
      if (cloudRsvps.length > 0) {
        saveLocalRsvps(cloudRsvps);
        return cloudRsvps;
      }
    } catch (error) {
      console.warn('Failed to fetch from Firebase, using local cache:', error);
    }
  }
  
  let local = getLocalRsvps();
  if (local.length === 0) {
    local = getSeedData();
    saveLocalRsvps(local);
  }
  return local.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

/**
 * Save or update an RSVP entry
 */
export async function saveRsvp(guest: Omit<RsvpGuest, 'id' | 'submittedAt'> | RsvpGuest): Promise<RsvpGuest> {
  const newGuest: RsvpGuest = {
    ...guest,
    id: 'id' in guest ? guest.id : 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    submittedAt: 'submittedAt' in guest ? guest.submittedAt : new Date().toISOString()
  };
  
  const db = getDb();
  if (db) {
    try {
      const docRef = doc(db, RSVP_COLLECTION, newGuest.id);
      await setDoc(docRef, newGuest);
    } catch (error) {
      console.warn('Failed to write to Firebase, saving to localStorage:', error);
    }
  }
  
  const existing = getLocalRsvps();
  const updated = [newGuest, ...existing.filter((item) => item.id !== newGuest.id)];
  saveLocalRsvps(updated);
  
  return newGuest;
}

/**
 * Delete an RSVP entry
 */
export async function deleteRsvp(id: string): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await deleteDoc(doc(db, RSVP_COLLECTION, id));
    } catch (error) {
      console.warn('Failed to delete from Firebase, removing from localStorage:', error);
    }
  }
  
  const existing = getLocalRsvps();
  const updated = existing.filter((item) => item.id !== id);
  saveLocalRsvps(updated);
}

/**
 * Toggle RSVP attendance status or change seat count
 */
export async function updateRsvpStatus(
  id: string, 
  willAttend: 'yes' | 'no', 
  adultsCount: number, 
  childrenCount: number = 0
): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      const docRef = doc(db, RSVP_COLLECTION, id);
      await updateDoc(docRef, {
        willAttend,
        adultsCount,
        childrenCount
      });
      return;
    } catch (error) {
      console.warn('Failed to update Firebase, updating localStorage:', error);
    }
  }
  
  const existing = getLocalRsvps();
  const updated = existing.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        willAttend,
        adultsCount,
        childrenCount
      };
    }
    return item;
  });
  saveLocalRsvps(updated);
}

/**
 * Real-time RSVP updates subscription across clients
 */
export function subscribeToRsvps(onUpdate: (rsvps: RsvpGuest[]) => void): () => void {
  const db = getDb();
  if (db) {
    try {
      const q = query(collection(db, RSVP_COLLECTION), orderBy('submittedAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const rsvps: RsvpGuest[] = [];
        snapshot.forEach((docSnap) => {
          rsvps.push(docSnap.data() as RsvpGuest);
        });
        if (rsvps.length > 0) {
          onUpdate(rsvps);
        } else {
          getRsvps().then(onUpdate);
        }
      }, (error) => {
        console.warn('Firebase snapshot subscription failed:', error);
      });
    } catch (e) {
      console.warn('Could not subscribe in real-time, relying on polling:', e);
    }
  }
  
  const handleLocalUpdate = () => {
    onUpdate(getLocalRsvps().sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()));
  };
  
  window.addEventListener('rsvp_database_updated', handleLocalUpdate);
  handleLocalUpdate();
  
  return () => {
    window.removeEventListener('rsvp_database_updated', handleLocalUpdate);
  };
}
