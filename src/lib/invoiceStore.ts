// Local, browser-only invoice numbering + history.
//
// LIMITATION: this is stored in this browser's localStorage only. Numbers
// and history do NOT sync across devices — two computers generating
// invoices independently can produce the same number. That's an accepted
// tradeoff for now (see README); the planned fix is migrating this module
// to a shared backend (Firebase/Supabase) so the counter and history live
// in one place every device reads from. Nothing outside this file should
// need to change when that happens — callers just get numbers/records.

const COUNTER_KEY = 'car-garage-invoice-counter';
const HISTORY_KEY = 'car-garage-invoice-history';
const MAX_HISTORY = 200; // keep localStorage usage bounded

export interface InvoiceRecord {
  number: string;
  date: string;
  customerName: string;
  vehicle: string;
  total: number;
  createdAt: string;
}

interface CounterState {
  year: number;
  lastNumber: number;
}

function readCounter(): CounterState {
  try {
    const raw = localStorage.getItem(COUNTER_KEY);
    if (raw) return JSON.parse(raw) as CounterState;
  } catch {
    // malformed/corrupt storage — fall through to a fresh counter rather
    // than throwing, since a wrong-but-working number beats a crash
  }
  return { year: new Date().getFullYear(), lastNumber: 0 };
}

function writeCounter(state: CounterState) {
  localStorage.setItem(COUNTER_KEY, JSON.stringify(state));
}

// Sequential per calendar year: INV-2026-0001, INV-2026-0002, ... resets to
// 0001 when the year rolls over. Call exactly once per new invoice draft.
export function getNextInvoiceNumber(): string {
  const currentYear = new Date().getFullYear();
  const state = readCounter();
  const next = state.year === currentYear ? state.lastNumber + 1 : 1;
  writeCounter({ year: currentYear, lastNumber: next });
  return `INV-${currentYear}-${String(next).padStart(4, '0')}`;
}

export function recordInvoice(record: InvoiceRecord) {
  const history = getInvoiceHistory();
  history.unshift(record);
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getInvoiceHistory(): InvoiceRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw) as InvoiceRecord[];
  } catch {
    // malformed/corrupt storage — treat as empty rather than throwing
  }
  return [];
}
