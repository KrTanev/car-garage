import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase's web config values are NOT secret — they identify the project,
// they don't grant access to it. Every Firebase web app ships these in its
// public JS bundle, by design. Actual access control lives entirely in
// firestore.rules (and which accounts exist in Firebase Authentication),
// not in hiding these values.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Point at the local Firebase Emulator Suite (`firebase emulators:start`)
// instead of a real project — for local dev/testing only. Guarded against
// running twice (e.g. Vite HMR re-executing this module), since connecting
// an already-connected instance throws.
declare global {
  // eslint-disable-next-line no-var
  var __firebaseEmulatorConnected__: boolean | undefined;
}

if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' && !globalThis.__firebaseEmulatorConnected__) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  globalThis.__firebaseEmulatorConnected__ = true;
}
