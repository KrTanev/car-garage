import { useEffect, useRef, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  emptyInvoice,
  emptyLineItem,
  partsTotal,
  invoiceTotal,
  formatMoney,
  type InvoiceData,
} from '../types/invoice';
import { CAR_MAKES, CAR_MODELS, type CarMake } from '../data/carCatalog';
import { InvoiceDocument } from '../pdf/InvoiceDocument';
import { useLanguage } from '../context/LanguageContext';
import { getNextInvoiceNumber, recordInvoice, getInvoiceHistory, type InvoiceRecord } from '../lib/invoiceStore';

const OTHER = 'other';

function isCarMake(value: string): value is CarMake {
  return (CAR_MAKES as readonly string[]).includes(value);
}

export function Documents() {
  const [invoice, setInvoice] = useState<InvoiceData>(emptyInvoice());
  const [history, setHistory] = useState<InvoiceRecord[]>(() => getInvoiceHistory());
  // Guards against React StrictMode's double-invoke in dev, which would
  // otherwise burn two numbers off the counter for a single mount.
  const numberAssigned = useRef(false);
  // Tracks the raw <select> value ('', a known make/model, or 'other') —
  // decoupled from invoice.vehicleMake/vehicleModel because when "Other" is
  // selected, the select shows 'other' while the invoice holds whatever the
  // user types into the accompanying text field.
  const [makeChoice, setMakeChoice] = useState('');
  const [modelChoice, setModelChoice] = useState('');
  const { t } = useLanguage();
  const d = t.documents;

  function updateField<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    setInvoice((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    if (numberAssigned.current) return;
    numberAssigned.current = true;
    setInvoice((prev) => ({ ...prev, invoiceNumber: getNextInvoiceNumber() }));
  }, []);

  function handleDownloadClick() {
    recordInvoice({
      number: invoice.invoiceNumber,
      date: invoice.date,
      customerName: invoice.customerName,
      vehicle: [invoice.vehicleMake, invoice.vehicleModel].filter(Boolean).join(' '),
      total: invoiceTotal(invoice),
      createdAt: new Date().toISOString(),
    });
    setHistory(getInvoiceHistory());
  }

  function handleMakeChange(value: string) {
    setMakeChoice(value);
    setModelChoice('');
    updateField('vehicleMake', value === OTHER ? '' : value);
    updateField('vehicleModel', '');
  }

  function handleModelChange(value: string) {
    setModelChoice(value);
    updateField('vehicleModel', value === OTHER ? '' : value);
  }

  const knownMake = isCarMake(makeChoice) ? makeChoice : null;

  function updateItem(id: string, patch: Partial<InvoiceData['items'][number]>) {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    setInvoice((prev) => ({ ...prev, items: [...prev.items, emptyLineItem()] }));
  }

  function removeItem(id: string) {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }));
  }

  const fileName = `invoice-${invoice.invoiceNumber || 'draft'}.pdf`;

  return (
    <main className="documents">
      <header className="documents-header">
        <h1>{d.newInvoiceTitle}</h1>
      </header>

      <form className="invoice-form" onSubmit={(e) => e.preventDefault()}>
        <section>
          <h2>{d.invoiceSection}</h2>
          <div className="field-grid">
            <label>
              {d.invoiceNumber}
              <input value={invoice.invoiceNumber} readOnly />
            </label>
            <label>
              {d.date}
              <input
                type="date"
                value={invoice.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </label>
          </div>
        </section>

        <section>
          <h2>{d.customerSection}</h2>
          <div className="field-grid">
            <label>
              {d.name}
              <input
                value={invoice.customerName}
                onChange={(e) => updateField('customerName', e.target.value)}
              />
            </label>
            <label>
              {d.phone}
              <input
                value={invoice.customerPhone}
                onChange={(e) => updateField('customerPhone', e.target.value)}
              />
            </label>
            <label>
              {d.email}
              <input
                type="email"
                value={invoice.customerEmail}
                onChange={(e) => updateField('customerEmail', e.target.value)}
              />
            </label>
          </div>
        </section>

        <section>
          <h2>{d.vehicleSection}</h2>
          <div className="field-grid">
            <label>
              {d.make}
              <select value={makeChoice} onChange={(e) => handleMakeChange(e.target.value)}>
                <option value="">{d.selectMakePlaceholder}</option>
                {CAR_MAKES.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
                <option value={OTHER}>{d.otherOption}</option>
              </select>
              {makeChoice === OTHER && (
                <input
                  placeholder={d.otherMakePlaceholder}
                  value={invoice.vehicleMake}
                  onChange={(e) => updateField('vehicleMake', e.target.value)}
                />
              )}
            </label>
            <label>
              {d.model}
              {knownMake ? (
                <>
                  <select value={modelChoice} onChange={(e) => handleModelChange(e.target.value)}>
                    <option value="">{d.selectModelPlaceholder}</option>
                    {CAR_MODELS[knownMake].map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                    <option value={OTHER}>{d.otherOption}</option>
                  </select>
                  {modelChoice === OTHER && (
                    <input
                      placeholder={d.otherModelPlaceholder}
                      value={invoice.vehicleModel}
                      onChange={(e) => updateField('vehicleModel', e.target.value)}
                    />
                  )}
                </>
              ) : (
                <input
                  placeholder={d.otherModelPlaceholder}
                  value={invoice.vehicleModel}
                  onChange={(e) => updateField('vehicleModel', e.target.value)}
                />
              )}
            </label>
            <label>
              {d.plate}
              <input
                value={invoice.vehiclePlate}
                onChange={(e) => updateField('vehiclePlate', e.target.value)}
              />
            </label>
            <label>
              {d.vin}
              <input
                value={invoice.vehicleVin}
                onChange={(e) => updateField('vehicleVin', e.target.value)}
              />
            </label>
            <label>
              {d.odometer}
              <input
                value={invoice.odometer}
                onChange={(e) => updateField('odometer', e.target.value)}
              />
            </label>
          </div>
        </section>

        <section>
          <h2>{d.workSection}</h2>
          <div className="items-table">
            <div className="items-header">
              <span>{t.pdf.descriptionCol}</span>
              <span>{d.qty}</span>
              <span>{d.unitPrice}</span>
              <span></span>
            </div>
            {invoice.items.map((item) => (
              <div className="items-row" key={item.id}>
                <input
                  placeholder={d.descriptionPlaceholder}
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                />
                <input
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value) })}
                />
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => removeItem(item.id)}
                  aria-label={d.removeItem}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="secondary" onClick={addItem}>
            {d.addItem}
          </button>
        </section>

        <section>
          <div className="field-grid">
            <label>
              {d.laborCost}
              <input
                type="number"
                min={0}
                step="0.01"
                value={invoice.laborCost}
                onChange={(e) => updateField('laborCost', Number(e.target.value))}
              />
            </label>
          </div>
          <label className="notes-label">
            {d.notes}
            <textarea
              rows={3}
              value={invoice.notes}
              onChange={(e) => updateField('notes', e.target.value)}
            />
          </label>
        </section>

        <div className="totals-summary">
          <span>{d.partsTotal(formatMoney(partsTotal(invoice.items)))}</span>
          <span>{d.laborTotal(formatMoney(invoice.laborCost || 0))}</span>
          <strong>{d.total(formatMoney(invoiceTotal(invoice)))}</strong>
        </div>

        <PDFDownloadLink
          document={<InvoiceDocument data={invoice} t={t.pdf} />}
          fileName={fileName}
          className="primary download-button"
          onClick={handleDownloadClick}
        >
          {({ loading }) => (loading ? d.preparingPdf : d.downloadButton)}
        </PDFDownloadLink>
      </form>

      <section className="invoice-history">
        <h2>{d.historyTitle}</h2>
        {history.length === 0 ? (
          <p className="history-empty">{d.historyEmpty}</p>
        ) : (
          <ul className="history-list">
            {history.map((record) => (
              <li className="history-item" key={record.createdAt}>
                <div>
                  <span className="history-number">{record.number}</span>
                  <span className="history-meta">
                    {record.date}
                    {record.customerName ? ` · ${record.customerName}` : ''}
                    {record.vehicle ? ` · ${record.vehicle}` : ''}
                  </span>
                </div>
                <strong>{formatMoney(record.total)}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
