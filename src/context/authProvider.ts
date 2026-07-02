// Real authentication, via Firebase Auth — replaces the earlier
// shared-passcode placeholder.
//
// Admin model: there is no sign-up flow anywhere in this app. Every
// account that can sign in was created by hand in the Firebase Console
// (Authentication → Users → Add user). Being able to sign in at all is
// what makes someone "staff" — there's no separate roles/permissions
// layer on top of that, which matches this being a small, single-shop
// tool rather than a multi-tenant product.

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export interface AuthCredentials {
  email: string;
  password: string;
}

export async function login(credentials: AuthCredentials): Promise<boolean> {
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    return true;
  } catch {
    // Wrong email/password, disabled account, unknown user, etc. — the UI
    // only needs a pass/fail signal, not which Firebase error code it was.
    return false;
  }
}

export async function logout(): Promise<void> {
  await firebaseSignOut(auth);
}

// Fires immediately with the current state, then again whenever sign-in
// state changes (including Firebase restoring a persisted session on page
// load). Returns the unsubscribe function.
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}
