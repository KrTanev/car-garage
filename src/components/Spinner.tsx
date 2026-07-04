// Centered accent-colored loading spinner, used for every async loading
// state (route lazy-load, auth init, invoice history) so loading looks the
// same everywhere instead of ad-hoc "…" / "Loading…" text.
export function Spinner({ label }: { label?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-2 py-10 text-text-muted text-sm"
      role="status"
    >
      <span className="spinner" aria-hidden="true" />
      {label && <span>{label}</span>}
    </div>
  );
}
