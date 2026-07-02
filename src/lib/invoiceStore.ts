// Firestore-backed invoice numbering + history — replaces the earlier
// localStorage version. This is what makes the counter and history truly
// shared across every device/browser, which localStorage never could.
//
// Function names/shapes are kept the same as the old module on purpose
// (just async now) so callers barely changed. Access control is entirely
// in firestore.rules — see that file for the actual security story.

import {
  collection,
  doc,
  runTransaction,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from './firebase';

const MAX_HISTORY = 200;

export interface InvoiceRecord {
  id: string;
  number: string;
  date: string;
  customerName: string;
  vehicle: string;
  total: number;
  createdAt: string;
}

// Sequential per calendar year: INV-2026-0001, INV-2026-0002, ... resets
// to 0001 when the year rolls over. The increment happens inside a
// Firestore transaction, so it stays correct even if two devices generate
// an invoice at the same moment — the old localStorage version had no way
// to guarantee that.
export async function getNextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const counterRef = doc(db, 'counters', String(year));

  const next = await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(counterRef);
    const current = (snap.data()?.lastNumber as number | undefined) ?? 0;
    const updated = current + 1;
    transaction.set(counterRef, { lastNumber: updated });
    return updated;
  });

  return `INV-${year}-${String(next).padStart(4, '0')}`;
}

export async function recordInvoice(
  record: Omit<InvoiceRecord, 'id' | 'createdAt'>,
): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Cannot record an invoice while signed out.');
  await addDoc(collection(db, 'invoices'), {
    ...record,
    createdBy: uid,
    createdAt: serverTimestamp(),
  });
}

export async function getInvoiceHistory(): Promise<InvoiceRecord[]> {
  const q = query(collection(db, 'invoices'), orderBy('createdAt', 'desc'), limit(MAX_HISTORY));
  const snap = await getDocs(q);
  return snap.docs.map((docSnap) => {
    const data = docSnap.data();
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();
    return {
      id: docSnap.id,
      number: data.number,
      date: data.date,
      customerName: data.customerName,
      vehicle: data.vehicle,
      total: data.total,
      createdAt: createdAt.toISOString(),
    };
  });
}
