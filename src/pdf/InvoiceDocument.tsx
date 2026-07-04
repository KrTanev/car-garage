import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { InvoiceData } from '../types/invoice';
import { partsTotal, invoiceTotal, formatMoney } from '../types/invoice';
import type { Translations } from '../i18n/translations';
import { registerPdfFonts, PDF_FONT_FAMILY } from './fonts';
import { BUSINESS_INFO } from '../data/business';

registerPdfFonts();

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10,
    fontFamily: PDF_FONT_FAMILY,
    color: '#1a1a1a',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  brand: { fontSize: 18, fontWeight: 700 },
  brandSub: { fontSize: 9, color: '#555', marginTop: 2 },
  invoiceMeta: { textAlign: 'right' },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#555',
    marginBottom: 4,
    marginTop: 14,
  },
  row: { flexDirection: 'row', marginBottom: 2 },
  label: { width: 90, color: '#555' },
  value: { flex: 1 },
  table: { marginTop: 6, borderTop: '1 solid #ddd' },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #ddd',
    paddingVertical: 4,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #eee',
    paddingVertical: 4,
  },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: 'right' },
  colPrice: { flex: 1, textAlign: 'right' },
  colTotal: { flex: 1, textAlign: 'right' },
  totalsBlock: { marginTop: 10, alignItems: 'flex-end' },
  totalsRow: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  grandTotalRow: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 4,
    borderTop: '1 solid #1a1a1a',
    fontWeight: 700,
    fontSize: 12,
  },
  notes: { marginTop: 16, fontSize: 9, color: '#555' },
});

const money = formatMoney;

interface InvoiceDocumentProps {
  data: InvoiceData;
  t: Translations['pdf'];
}

export function InvoiceDocument({ data, t }: InvoiceDocumentProps) {
  const parts = partsTotal(data.items);
  const total = invoiceTotal(data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>{BUSINESS_INFO.name}</Text>
            <Text style={styles.brandSub}>{t.documentTitle}</Text>
          </View>
          <View style={styles.invoiceMeta}>
            <Text>
              {t.invoiceNumberLabel}
              {data.invoiceNumber || '—'}
            </Text>
            <Text>{data.date}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t.customerLabel}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>{t.nameLabel}</Text>
          <Text style={styles.value}>{data.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t.phoneLabel}</Text>
          <Text style={styles.value}>{data.customerPhone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t.emailLabel}</Text>
          <Text style={styles.value}>{data.customerEmail}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t.vehicleLabel}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>{t.makeModelLabel}</Text>
          <Text style={styles.value}>
            {data.vehicleMake} {data.vehicleModel}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t.plateLabel}</Text>
          <Text style={styles.value}>{data.vehiclePlate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t.vinLabel}</Text>
          <Text style={styles.value}>{data.vehicleVin}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t.odometerLabel}</Text>
          <Text style={styles.value}>{data.odometer}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t.workLabel}</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.colDesc}>{t.descriptionCol}</Text>
            <Text style={styles.colQty}>{t.qtyCol}</Text>
            <Text style={styles.colPrice}>{t.unitPriceCol}</Text>
            <Text style={styles.colTotal}>{t.totalCol}</Text>
          </View>
          {data.items.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.colDesc}>{item.description || '—'}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{money(item.unitPrice)}</Text>
              <Text style={styles.colTotal}>
                {money(item.quantity * item.unitPrice)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text>{t.partsLabel}</Text>
            <Text>{money(parts)}</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text>{t.laborLabel}</Text>
            <Text>{money(data.laborCost || 0)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text>{t.totalLabel}</Text>
            <Text>{money(total)}</Text>
          </View>
        </View>

        {data.notes ? (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>{t.notesLabel}</Text>
            <Text>{data.notes}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
