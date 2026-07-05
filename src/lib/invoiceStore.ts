// Firestore-backed invoice storage: numbering, create, read, update, delete.
// Every field of the invoice form is stored (not just a summary) so a past
// invoice can be re-downloaded as an identical PDF or edited later. Access
// control is entirely in firestore.rules — see that file for the actual
// security story.

import {
  collection,
  doc,
  runTransaction,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from './firebase';
import type { InvoiceData } from '../types/invoice';

const MAX_HISTORY = 200;

export interface InvoiceRecord extends InvoiceData {
  id: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

// Sequential per calendar year: INV-2026-0001, INV-2026-0002, ... resets
// to 0001 when the year rolls over. The increment happens inside a
// Firestore transaction, so it stays correct even if two devices generate
// an invoice at the same moment.
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

// Creates a brand-new invoice document. Only for genuinely new invoices —
// use updateInvoice() to edit an existing one (it keeps the same id, so
// editing never touches the invoice-number counter).
export async function createInvoice(data: InvoiceData): Promise<string> {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Cannot create an invoice while signed out.');
  const docRef = await addDoc(collection(db, 'invoices'), {
    ...data,
    createdBy: uid,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateInvoice(
  id: string,
  data: InvoiceData,
): Promise<void> {
  await updateDoc(doc(db, 'invoices', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Soft delete: marks the invoice as deleted instead of removing the
// Firestore document. Keeps the record recoverable (manually, via the
// Firestore console) and preserves it for any future audit/accounting
// need — deleting from the UI just hides it from the table.
export async function deleteInvoice(id: string): Promise<void> {
  await updateDoc(doc(db, 'invoices', id), {
    deletedAt: serverTimestamp(),
  });
}

export async function getInvoiceHistory(): Promise<InvoiceRecord[]> {
  const q = query(
    collection(db, 'invoices'),
    orderBy('createdAt', 'desc'),
    limit(MAX_HISTORY),
  );
  const snap = await getDocs(q);
  return snap.docs
    .filter((docSnap) => !docSnap.data().deletedAt)
    .map((docSnap) => {
      const data = docSnap.data();
      const createdAt =
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date();
      const updatedAt =
        data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate()
          : undefined;
      // Defensive defaults: invoices created before the full-data-model
      // migration only have the old summary shape (number/vehicle/total,
      // no items array). Falling back here means old rows render (blank/
      // zero for fields they never had) instead of crashing the page — you
      // can then just delete them from the table if they're stale test data.
      return {
        id: docSnap.id,
        invoiceNumber: data.invoiceNumber ?? data.number ?? '',
        date: data.date ?? '',
        customerName: data.customerName ?? '',
        customerPhone: data.customerPhone ?? '',
        customerEmail: data.customerEmail ?? '',
        vehicleMake: data.vehicleMake ?? data.vehicle ?? '',
        vehicleModel: data.vehicleModel ?? '',
        vehiclePlate: data.vehiclePlate ?? '',
        vehicleVin: data.vehicleVin ?? '',
        odometer: data.odometer ?? '',
        items: Array.isArray(data.items) ? data.items : [],
        notes: data.notes ?? '',
        createdBy: data.createdBy,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt?.toISOString(),
      };
    });
}
