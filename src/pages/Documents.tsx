import { useCallback, useEffect, useState } from 'react';
import {
  emptyInvoice,
  emptyLineItem,
  partsTotal,
  invoiceTotal,
  formatMoney,
  type InvoiceData,
} from '../types/invoice';
import { CAR_MAKES, CAR_MODELS, type CarMake } from '../data/carCatalog';
import { useLanguage } from '../context/LanguageContext';
import { downloadInvoicePdf } from '../pdf/downloadInvoicePdf';
import { ConfirmDialog } from '../components/ConfirmDialog';
import {
  getNextInvoiceNumber,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceHistory,
  type InvoiceRecord,
} from '../lib/invoiceStore';

const OTHER = 'other';

function isCarMake(value: string): value is CarMake {
  return (CAR_MAKES as readonly string[]).includes(value);
}

// Given a saved make/model value, figures out what a <select> should show:
// the known option, "other" (with the raw value living in the text field
// next to it), or blank.
function choiceFor(value: string, options: readonly string[]): string {
  if (!value) return '';
  return options.includes(value) ? value : OTHER;
}

type View = 'list' | 'form';

export function Documents() {
  const [view, setView] = useState<View>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<InvoiceData>(emptyInvoice());
  const [history, setHistory] = useState<InvoiceRecord[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [rowBusyId, setRowBusyId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InvoiceRecord | null>(null);
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

  const refreshHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      setHistory(await getInvoiceHistory());
    } catch (err) {
      console.error('Failed to load invoice history', err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  async function openNewInvoice() {
    setInvoice(emptyInvoice());
    setMakeChoice('');
    setModelChoice('');
    setEditingId(null);
    setView('form');
    try {
      const number = await getNextInvoiceNumber();
      setInvoice((prev) => ({ ...prev, invoiceNumber: number }));
    } catch (err) {
      console.error('Failed to generate invoice number', err);
    }
  }

  function openEditInvoice(record: InvoiceRecord) {
    // Pick out just the editable invoice fields — record also carries
    // Firestore metadata (id, createdBy, createdAt, updatedAt) that
    // shouldn't end up back in the form state.
    const data: InvoiceData = {
      invoiceNumber: record.invoiceNumber,
      date: record.date,
      customerName: record.customerName,
      customerPhone: record.customerPhone,
      customerEmail: record.customerEmail,
      vehicleMake: record.vehicleMake,
      vehicleModel: record.vehicleModel,
      vehiclePlate: record.vehiclePlate,
      vehicleVin: record.vehicleVin,
      odometer: record.odometer,
      items: record.items,
      laborCost: record.laborCost,
      notes: record.notes,
    };
    setInvoice(data);
    setMakeChoice(choiceFor(data.vehicleMake, CAR_MAKES));
    const knownMake = isCarMake(data.vehicleMake) ? data.vehicleMake : null;
    setModelChoice(knownMake ? choiceFor(data.vehicleModel, CAR_MODELS[knownMake]) : '');
    setEditingId(record.id);
    setView('form');
  }

  function cancelForm() {
    setView('list');
    setEditingId(null);
    setInvoice(emptyInvoice());
  }

  async function handleCreateAndDownload() {
    setIsSaving(true);
    try {
      await createInvoice(invoice);
      await downloadInvoicePdf(invoice, t.pdf);
      await refreshHistory();
      setView('list');
      setEditingId(null);
      setInvoice(emptyInvoice());
    } catch (err) {
      console.error('Failed to create invoice', err);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveChanges() {
    if (!editingId) return;
    setIsSaving(true);
    try {
      await updateInvoice(editingId, invoice);
      await refreshHistory();
      setView('list');
      setEditingId(null);
      setInvoice(emptyInvoice());
    } catch (err) {
      console.error('Failed to save invoice', err);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDownloadCurrent() {
    setIsSaving(true);
    try {
      await downloadInvoicePdf(invoice, t.pdf);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleRowDownload(record: InvoiceRecord) {
    setRowBusyId(record.id);
    try {
      await downloadInvoicePdf(record, t.pdf);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setRowBusyId(null);
    }
  }

  function requestDelete(record: InvoiceRecord) {
    setDeleteTarget(record);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const record = deleteTarget;
    setRowBusyId(record.id);
    try {
      await deleteInvoice(record.id);
      await refreshHistory();
    } catch (err) {
      console.error('Failed to delete invoice', err);
    } finally {
      setRowBusyId(null);
      setDeleteTarget(null);
    }
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

  if (view === 'list') {
    return (
      <>
      <main className="max-w-[880px] mx-auto px-4 pt-6 pb-16">
        <header className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <h1 className="text-[1.6rem] font-semibold text-text mb-3">{d.title}</h1>
          <button type="button" className="btn-primary w-auto" onClick={openNewInvoice}>
            {d.newInvoiceButton}
          </button>
        </header>

        {isLoadingHistory ? (
          <p className="text-text-muted text-sm text-center py-10">…</p>
        ) : history.length === 0 ? (
          <p className="text-text-muted text-[0.9rem]">{d.tableEmpty}</p>
        ) : (
          <div className="overflow-x-auto border border-border rounded-card bg-surface">
            <table className="w-full border-collapse text-[0.9rem]">
              <thead>
                <tr>
                  <th className="py-2.5 px-3.5 text-left whitespace-nowrap text-[0.75rem] uppercase tracking-[0.3px] text-text-muted border-b border-border">
                    {d.colNumber}
                  </th>
                  <th className="py-2.5 px-3.5 text-left whitespace-nowrap text-[0.75rem] uppercase tracking-[0.3px] text-text-muted border-b border-border">
                    {d.colDate}
                  </th>
                  <th className="py-2.5 px-3.5 text-left whitespace-nowrap text-[0.75rem] uppercase tracking-[0.3px] text-text-muted border-b border-border">
                    {d.colCustomer}
                  </th>
                  <th className="py-2.5 px-3.5 text-left whitespace-nowrap text-[0.75rem] uppercase tracking-[0.3px] text-text-muted border-b border-border">
                    {d.colVehicle}
                  </th>
                  <th className="py-2.5 px-3.5 text-left whitespace-nowrap text-[0.75rem] uppercase tracking-[0.3px] text-text-muted border-b border-border">
                    {d.colTotal}
                  </th>
                  <th className="py-2.5 px-3.5 text-left whitespace-nowrap text-[0.75rem] uppercase tracking-[0.3px] text-text-muted border-b border-border">
                    {d.colActions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((record) => {
                  const busy = rowBusyId === record.id;
                  return (
                    <tr key={record.id} className="last:border-b-0 border-b border-border">
                      <td className="py-2.5 px-3.5 whitespace-nowrap">{record.invoiceNumber}</td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">{record.date}</td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        {record.customerName || '—'}
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        {[record.vehicleMake, record.vehicleModel].filter(Boolean).join(' ') || '—'}
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        {formatMoney(invoiceTotal(record))}
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap flex gap-1.5">
                        <button
                          type="button"
                          className="btn-icon"
                          disabled={busy}
                          onClick={() => openEditInvoice(record)}
                          aria-label={d.editAction}
                          title={d.editAction}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          className="btn-icon"
                          disabled={busy}
                          onClick={() => handleRowDownload(record)}
                          aria-label={d.downloadAction}
                          title={d.downloadAction}
                        >
                          ⬇
                        </button>
                        <button
                          type="button"
                          className="btn-icon-danger"
                          disabled={busy}
                          onClick={() => requestDelete(record)}
                          aria-label={d.deleteAction}
                          title={d.deleteAction}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {deleteTarget && (
        <ConfirmDialog
          title={d.deleteDialogTitle}
          message={d.deleteConfirm(deleteTarget.invoiceNumber)}
          confirmLabel={d.deleteAction}
          cancelLabel={d.cancelButton}
          busy={rowBusyId === deleteTarget.id}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      </>
    );
  }

  return (
    <main className="max-w-[880px] mx-auto px-4 pt-6 pb-16">
      <header className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <h1 className="text-[1.6rem] font-semibold text-text mb-3">
          {editingId ? d.editInvoiceTitle(invoice.invoiceNumber) : d.newInvoiceTitle}
        </h1>
        <button type="button" className="btn-secondary" onClick={cancelForm}>
          {d.cancelButton}
        </button>
      </header>

      <form className="card w-full" onSubmit={(e) => e.preventDefault()}>
        <section className="mb-5 pb-5 border-b border-border [&:last-of-type]:border-b-0">
          <h2 className="text-[1.1rem] font-semibold text-text mb-3">{d.invoiceSection}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4">
            <label className="form-label">
              {d.invoiceNumber}
              <input
                className="form-input read-only:bg-surface read-only:text-text-muted"
                value={invoice.invoiceNumber}
                readOnly
              />
            </label>
            <label className="form-label">
              {d.date}
              <input
                type="date"
                className="form-input"
                value={invoice.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="mb-5 pb-5 border-b border-border [&:last-of-type]:border-b-0">
          <h2 className="text-[1.1rem] font-semibold text-text mb-3">{d.customerSection}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4">
            <label className="form-label">
              {d.name}
              <input
                className="form-input"
                value={invoice.customerName}
                onChange={(e) => updateField('customerName', e.target.value)}
              />
            </label>
            <label className="form-label">
              {d.phone}
              <input
                className="form-input"
                value={invoice.customerPhone}
                onChange={(e) => updateField('customerPhone', e.target.value)}
              />
            </label>
            <label className="form-label">
              {d.email}
              <input
                type="email"
                className="form-input"
                value={invoice.customerEmail}
                onChange={(e) => updateField('customerEmail', e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="mb-5 pb-5 border-b border-border [&:last-of-type]:border-b-0">
          <h2 className="text-[1.1rem] font-semibold text-text mb-3">{d.vehicleSection}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4">
            <label className="form-label">
              {d.make}
              <select
                className="form-input"
                value={makeChoice}
                onChange={(e) => handleMakeChange(e.target.value)}
              >
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
                  className="form-input"
                  placeholder={d.otherMakePlaceholder}
                  value={invoice.vehicleMake}
                  onChange={(e) => updateField('vehicleMake', e.target.value)}
                />
              )}
            </label>
            <label className="form-label">
              {d.model}
              {knownMake ? (
                <>
                  <select
                    className="form-input"
                    value={modelChoice}
                    onChange={(e) => handleModelChange(e.target.value)}
                  >
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
                      className="form-input"
                      placeholder={d.otherModelPlaceholder}
                      value={invoice.vehicleModel}
                      onChange={(e) => updateField('vehicleModel', e.target.value)}
                    />
                  )}
                </>
              ) : (
                <input
                  className="form-input"
                  placeholder={d.otherModelPlaceholder}
                  value={invoice.vehicleModel}
                  onChange={(e) => updateField('vehicleModel', e.target.value)}
                />
              )}
            </label>
            <label className="form-label">
              {d.plate}
              <input
                className="form-input"
                value={invoice.vehiclePlate}
                onChange={(e) => updateField('vehiclePlate', e.target.value)}
              />
            </label>
            <label className="form-label">
              {d.vin}
              <input
                className="form-input"
                value={invoice.vehicleVin}
                onChange={(e) => updateField('vehicleVin', e.target.value)}
              />
            </label>
            <label className="form-label">
              {d.odometer}
              <input
                className="form-input"
                value={invoice.odometer}
                onChange={(e) => updateField('odometer', e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="mb-5 pb-5 border-b border-border [&:last-of-type]:border-b-0">
          <h2 className="text-[1.1rem] font-semibold text-text mb-3">{d.workSection}</h2>
          <div className="flex flex-col gap-2 mb-3">
            <div className="grid grid-cols-[1fr_60px_90px_32px] gap-2 items-center text-xs text-text-muted uppercase tracking-[0.3px]">
              <span>{t.pdf.descriptionCol}</span>
              <span>{d.qty}</span>
              <span>{d.unitPrice}</span>
              <span></span>
            </div>
            {invoice.items.map((item) => (
              <div className="grid grid-cols-[1fr_60px_90px_32px] gap-2 items-center" key={item.id}>
                <input
                  className="form-input"
                  placeholder={d.descriptionPlaceholder}
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                />
                <input
                  type="number"
                  min={0}
                  className="form-input"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  className="form-input"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value) })}
                />
                <button
                  type="button"
                  className="btn-icon-danger"
                  onClick={() => removeItem(item.id)}
                  aria-label={d.removeItem}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="btn-secondary" onClick={addItem}>
            {d.addItem}
          </button>
        </section>

        <section className="mb-5 pb-5 border-b border-border [&:last-of-type]:border-b-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4">
            <label className="form-label">
              {d.laborCost}
              <input
                type="number"
                min={0}
                step="0.01"
                className="form-input"
                value={invoice.laborCost}
                onChange={(e) => updateField('laborCost', Number(e.target.value))}
              />
            </label>
          </div>
          <label className="form-label mt-2">
            {d.notes}
            <textarea
              rows={3}
              className="form-input"
              value={invoice.notes}
              onChange={(e) => updateField('notes', e.target.value)}
            />
          </label>
        </section>

        <div className="flex flex-col items-end gap-1 my-4 text-[0.95rem]">
          <span>{d.partsTotal(formatMoney(partsTotal(invoice.items)))}</span>
          <span>{d.laborTotal(formatMoney(invoice.laborCost || 0))}</span>
          <strong className="text-[1.1rem]">{d.total(formatMoney(invoiceTotal(invoice)))}</strong>
        </div>

        <div className="flex gap-3 [&>*]:flex-1 [&>*]:w-auto">
          {editingId ? (
            <>
              <button
                type="button"
                className="btn-primary"
                disabled={isSaving}
                onClick={handleSaveChanges}
              >
                {isSaving ? d.saving : d.saveChangesButton}
              </button>
              <button
                type="button"
                className="btn-secondary"
                disabled={isSaving}
                onClick={handleDownloadCurrent}
              >
                {isSaving ? d.preparingPdf : d.downloadButton}
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-primary"
              disabled={isSaving}
              onClick={handleCreateAndDownload}
            >
              {isSaving ? d.preparingPdf : d.downloadButton}
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
