// Pluggable auth provider.
//
// This is a placeholder implementation: it checks a single shared passcode
// client-side. There is no real security here (the code is visible in the
// bundled JS) — it only exists so the login flow works end-to-end.
//
// To swap in real authentication later (Firebase Auth / Clerk / Supabase
// Auth, etc.), replace the body of `login` below with a call to that
// provider's SDK and keep the same function signature. Nothing else in the
// app needs to change.

const PLACEHOLDER_ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE ?? 'solidcars';

export interface AuthCredentials {
  passcode: string;
}

export async function login(credentials: AuthCredentials): Promise<boolean> {
  // Simulate an async call so the calling code already handles loading /
  // error states correctly once real auth is wired in.
  await new Promise((resolve) => setTimeout(resolve, 150));
  return credentials.passcode === PLACEHOLDER_ACCESS_CODE;
}

export async function logout(): Promise<void> {
  // No-op for the placeholder provider.
}
