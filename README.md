# Solid Cars

Frontend-only web app for Solid Cars garage: a public landing page (logo,
location map, staff login) and a protected page where staff fill out a
repair/service invoice and download it as a PDF. No backend — everything
runs in the browser.

**Stack:** Vite + React + TypeScript, `react-router-dom` (HashRouter),
`react-leaflet` (OpenStreetMap tiles), `@react-pdf/renderer`.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. On mobile, use your phone on the same network
and Vite's `--host` flag, or just resize your browser — the layout is
responsive down to phone widths.

## Backend: Firebase

There's no custom server, but staff login and invoice data are backed by a
real [Firebase](https://firebase.google.com) project (free "Spark" tier
covers this app's usage comfortably):

- **Firebase Authentication** (Email/Password provider) — real staff logins,
  replacing the old shared-passcode placeholder.
- **Firestore** — the shared invoice counter and invoice history, replacing
  the old `localStorage`-only tracking. Every device now reads/writes the
  same data.

### One-time Firebase project setup

1. Go to the [Firebase console](https://console.firebase.google.com) →
   create a project (Google Analytics not needed).
2. **Build → Authentication → Get started → Sign-in method → Email/Password
   → enable.**
3. **Build → Authentication → Users → Add user** for each staff member who
   should be able to log in. There is **no public sign-up** — accounts are
   only ever created here, manually, by whoever administers the project. Any
   account that exists is trusted staff.
4. **Build → Firestore Database → Create database** (production mode,
   pick a region).
5. Deploy the security rules in this repo (`firestore.rules`) — either paste
   them into the Firestore **Rules** tab in the console, or run
   `firebase deploy --only firestore:rules` with the [Firebase
   CLI](https://firebase.google.com/docs/cli) (`npm install -g
   firebase-tools`, `firebase login`, `firebase use --add`).
6. **Project settings (gear icon) → General → Your apps → Add app → Web**.
   Copy the resulting config values — you'll need all six for the next step.

### Local environment variables

Create a `.env.local` file (already gitignored) with the six values from
step 6 above:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

These values aren't secret in the traditional sense — every Firebase web app
ships them in its public JS bundle by design. Real access control lives in
`firestore.rules`, not in hiding these values.

### Local emulator (optional, no real Firebase project needed)

To develop without touching real cloud data, run the [Firebase Local
Emulator Suite](https://firebase.google.com/docs/emulator-suite) (requires
Java): `firebase emulators:start --only auth,firestore` (config in
`firebase.json`), and set `VITE_USE_FIREBASE_EMULATOR=true` in `.env.local`
so `src/lib/firebase.ts` connects to it instead of production.

### GitHub Actions secrets

For the deploy workflow to build with these values, add the same six as
repo secrets: **Settings → Secrets and variables → Actions → New repository
secret**, one per `VITE_FIREBASE_*` name above. See
`.github/workflows/deploy.yml`.

## Map location

The map pin is set in `src/components/GarageMap.tsx` (`GARAGE_COORDS`),
currently `42.644444, 24.800456`. Update that constant if the location ever
changes.

## Logo

`src/components/Logo.tsx` renders the real logo image (`src/assets/logo-full.png`).

## Invoice PDF

Fields and layout live in:
- `src/types/invoice.ts` — data shape + `formatMoney` (currency display, currently EUR)
- `src/pages/Documents.tsx` — the form
- `src/pdf/InvoiceDocument.tsx` — the generated PDF layout
- `src/data/carCatalog.ts` — make/model dropdown options (falls back to a
  free-text "Other" field for anything not listed)

Add more document types by following the same pattern (a data type, a form,
a `@react-pdf/renderer` document component) and a new route in `src/App.tsx`.

## Invoice numbering (Firestore-backed)

Invoice numbers are auto-generated (`INV-2026-0001`, sequential per calendar
year, resets each January) by `src/lib/invoiceStore.ts`, using a Firestore
transaction (`counters/{year}`) so concurrent staff on different devices
never collide. A "Recent invoices" list on the Documents page reads the
last 20 invoices from the shared `invoices` collection.

Every invoice is written to Firestore with `createdBy` set to the creating
staff member's UID, but any signed-in staff member can edit or delete any
invoice afterward — same trust model as everything else here (any account
that exists is trusted staff). The one thing `firestore.rules` blocks is
reassigning an invoice's `createdBy` to someone else on update. See
`firestore.rules` for the full rule set, and the Firebase setup section
above for how to deploy it.

The Documents page (`src/pages/Documents.tsx`) is a table of all invoices
with row actions to edit, download, or delete, plus a "+ New invoice"
button that opens the same form for creating one. Editing preserves the
original invoice number; deleting is immediate (no undo) after a
confirmation prompt.

## Deployment

Deploys automatically to GitHub Pages on every push to `main` via
`.github/workflows/deploy.yml`. One-time setup in the GitHub repo:

1. Settings → Pages → Source: **GitHub Actions**.
2. Push to `main` (or merge a PR into it) — the workflow builds and deploys.
3. Site will be live at `https://<your-github-username>.github.io/car-garage/`.

The Vite `base` in `vite.config.ts` is set to `/car-garage/` to match that
URL path — update it if the repo is ever renamed.

## Notes

- Currency is EUR, formatted by `formatMoney()` in `src/types/invoice.ts` —
  change it there if needed (both the form and the PDF read from it).
- The PDF library (`@react-pdf/renderer`) is lazy-loaded on the `/documents`
  route only, so the public landing page stays light.
- Generated PDFs need a Cyrillic-capable font (`src/pdf/fonts.ts`,
  bundled Noto Sans) — the default PDF fonts don't cover Bulgarian text.
