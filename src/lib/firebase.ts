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
  updateDoc 
} from 'firebase/firestore';
import { RsvpGuest } from '../types';

// Read Firebase configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase is fully configured
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'MY_FIREBASE_API_KEY'
);

let dbInstance: any = null;

// Lazy initialize Firebase and Firestore to prevent startup crashes if keys are empty or misconfigured
export function getDb() {
  if (!isFirebaseConfigured) {
    return null;
  }
  
  if (!dbInstance) {
    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      dbInstance = getFirestore(app);
    } catch (error) {
      console.error('Firebase initialization error:', error);
      return null;
    }
  }
  return dbInstance;
}

// COLLECTION NAME
const COLLECTION_NAME = 'rsvps';

// LOCAL STORAGE FALLBACK HELPERS
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

// EXPORTED CORE API FUNCTIONS (SFC / transparent dual database logic)

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
  const normInput = normalizePhoneNumber(phone);
  if (!normInput || normInput.length < 5) return false;
  
  const allRsvps = await getRsvps();
  return allRsvps.some((r) => normalizePhoneNumber(r.phoneNumber) === normInput);
}

/**
 * Save or update an RSVP entry
 */
export async function saveRsvp(rsvp: RsvpGuest): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, rsvp.id);
      await setDoc(docRef, rsvp);
      return;
    } catch (error) {
      console.warn('Failed to save to Firebase, saving to localStorage instead:', error);
    }
  }
  
  // Local storage fallback
  const existing = getLocalRsvps();
  const updated = existing.filter((item) => item.id !== rsvp.id && item.phoneNumber !== rsvp.phoneNumber);
  updated.push(rsvp);
  saveLocalRsvps(updated);
}

/**
 * Fetch all RSVPs. Returns seed data if empty and saves it.
 */
export async function getRsvps(): Promise<RsvpGuest[]> {
  const db = getDb();
  if (db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const rsvps: RsvpGuest[] = [];
      querySnapshot.forEach((doc) => {
        rsvps.push(doc.data() as RsvpGuest);
      });
      
      // If Firestore database is brand new and completely empty, auto-seed it
      if (rsvps.length === 0) {
        const seed = getSeedData();
        for (const item of seed) {
          await setDoc(doc(db, COLLECTION_NAME, item.id), item);
          rsvps.push(item);
        }
      }
      return rsvps;
    } catch (error) {
      console.warn('Failed to fetch from Firebase, reading from localStorage instead:', error);
    }
  }
  
  // Local storage fallback
  let local = getLocalRsvps();
  if (local.length === 0) {
    local = getSeedData();
    saveLocalRsvps(local);
  }
  return local.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

/**
 * Delete an RSVP entry
 */
export async function deleteRsvp(id: string): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return;
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
      const docRef = doc(db, COLLECTION_NAME, id);
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
 * Real-time RSVP updates subscription
 */
export function subscribeToRsvps(onUpdate: (rsvps: RsvpGuest[]) => void): () => void {
  const db = getDb();
  if (db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const rsvps: RsvpGuest[] = [];
        snapshot.forEach((doc) => {
          rsvps.push(doc.data() as RsvpGuest);
        });
        if (rsvps.length > 0) {
          onUpdate(rsvps);
        } else {
          // If Firestore exists but is empty, trigger getRsvps to seed it
          getRsvps().then(onUpdate);
        }
      }, (error) => {
        console.warn('Firebase snapshot subscription failed:', error);
      });
    } catch (e) {
      console.warn('Could not subscribe in real-time, relying on polling:', e);
    }
  }
  
  // Local storage listener fallback
  const handleLocalUpdate = () => {
    onUpdate(getLocalRsvps().sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()));
  };
  
  window.addEventListener('rsvp_database_updated', handleLocalUpdate);
  
  // Trigger initial callback
  handleLocalUpdate();
  
  return () => {
    window.removeEventListener('rsvp_database_updated', handleLocalUpdate);
  };
}
