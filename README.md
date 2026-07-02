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

## Login (placeholder auth)

There's no backend, so the login is currently a single shared access code
checked in the browser (`src/context/authProvider.ts`). This is **not real
security** — the code ships in the JS bundle — it exists only so the
login → protected page flow works end-to-end.

- Default code: `solidcars`
- Override it locally with a `.env.local` file: `VITE_ACCESS_CODE=yourcode`

**To do later:** replace `authProvider.ts` with a real provider (Firebase
Auth, Clerk, Supabase Auth, etc. — all free tier, all backend-free from your
side). The rest of the app (`AuthContext`, `ProtectedRoute`) doesn't need to
change.

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

## Invoice numbering (local-only — read before relying on this)

Invoice numbers are auto-generated (`INV-2026-0001`, sequential per calendar
year, resets each January) by `src/lib/invoiceStore.ts`. A "Recent invoices"
list on the Documents page shows what's been generated.

**This is stored in `localStorage` — one browser, one device.** It is not
synced anywhere. Two people generating invoices from two different
computers will each have their own counter and can produce the same
number. This is fine if invoicing only ever happens from one shop
computer; it is not fine for multi-device use.

**Planned fix:** migrate `invoiceStore.ts` to a shared backend (Firebase or
Supabase, free tier) so the counter and history live in one place every
device reads from — this is also the natural moment to replace the
placeholder login with that backend's real auth. Nothing outside
`invoiceStore.ts` should need to change when that happens; `Documents.tsx`
only calls `getNextInvoiceNumber()` / `recordInvoice()` / `getInvoiceHistory()`.

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
