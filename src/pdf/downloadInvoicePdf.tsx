// Imperative PDF generation + download, used both by the invoice form
// (create/edit) and by the per-row "Download" action in the invoice table.
// Deliberately not <PDFDownloadLink> — that renders a hidden PDF instance
// per link, which doesn't scale to "one per table row". This only ever
// renders a PDF when the user actually clicks Download.
import { pdf } from '@react-pdf/renderer';
import { InvoiceDocument } from './InvoiceDocument';
import type { InvoiceData } from '../types/invoice';
import type { Translations } from '../i18n/translations';

export async function downloadInvoicePdf(
  data: InvoiceData,
  t: Translations['pdf'],
): Promise<void> {
  const blob = await pdf(<InvoiceDocument data={data} t={t} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${data.invoiceNumber || 'draft'}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
