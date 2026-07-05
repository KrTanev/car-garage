export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleVin: string;
  odometer: string;
  items: InvoiceLineItem[];
  notes: string;
}

export const emptyLineItem = (): InvoiceLineItem => ({
  id: crypto.randomUUID(),
  description: '',
  quantity: 1,
  unitPrice: 0,
});

export const emptyInvoice = (): InvoiceData => ({
  invoiceNumber: '',
  date: new Date().toISOString().slice(0, 10),
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  vehicleMake: '',
  vehicleModel: '',
  vehiclePlate: '',
  vehicleVin: '',
  odometer: '',
  items: [emptyLineItem()],
  notes: '',
});

export const partsTotal = (items: InvoiceLineItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

export const invoiceTotal = (data: InvoiceData): number =>
  partsTotal(data.items);

// Single source of truth for how money is displayed on the invoice (form
// and PDF). Change the currency here if it ever needs to change again.
export const formatMoney = (n: number): string => `€${n.toFixed(2)}`;
