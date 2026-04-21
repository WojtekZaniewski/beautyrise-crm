export default function EmailIntegrationPage() {
  return (
    <div className="px-8 py-8 max-w-2xl mx-auto anim-page">
      <div className="heat-glow -mx-8 -mt-8 px-8 pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Email</h1>
        <p className="text-sm text-[var(--muted)]">
          Skonfiguruj wysyłkę e-mail do leadów — powiadomienia, follow-upy i kampanie.
        </p>
      </div>

      <div
        className="rounded-xl p-6 flex flex-col gap-5"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        {/* Provider row */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--accent-subtle)", border: "1px solid rgba(255,76,0,0.15)" }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <rect x="2" y="5" width="18" height="13" rx="2.5" stroke="var(--accent)" strokeWidth="1.6" />
              <path d="M2 8l9 6 9-6" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="font-medium">Integracja Email</div>
            <div className="text-sm text-[var(--muted)]">SMTP · SendGrid · Resend · Mailgun</div>
          </div>
          <span
            className="ml-auto text-xs px-2 py-1 rounded-full"
            style={{ color: "var(--muted)", background: "var(--ba-6)", border: "1px solid var(--border-strong)" }}
          >
            Wkrótce
          </span>
        </div>

        <div
          className="rounded-lg p-4 text-sm"
          style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}
        >
          <p className="font-medium mb-2" style={{ color: "var(--text)" }}>Ta integracja jest w przygotowaniu.</p>
          <p style={{ color: "var(--muted)" }}>
            Po skonfigurowaniu będziesz mógł wysyłać automatyczne e-maile do leadów —
            potwierdzenia, follow-upy oraz kampanie e-mail bezpośrednio z CRM.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm" style={{ color: "var(--muted)" }}>
          <p className="font-medium" style={{ color: "var(--text)" }}>Planowane funkcje:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Konfiguracja dostawcy SMTP lub API (SendGrid, Resend, Mailgun)</li>
            <li>Automatyczne powiadomienia przy dodaniu nowego leada</li>
            <li>Szablony wiadomości z personalizacją (imię, etap, tagi)</li>
            <li>Historia wysłanych wiadomości w timeline leada</li>
          </ul>
        </div>

        <button
          disabled
          className="rounded-lg py-2.5 text-sm font-semibold opacity-40 cursor-not-allowed"
          style={{ background: "var(--metal)", color: "#fff" }}
        >
          Konfiguruj Email
        </button>
      </div>
    </div>
  );
}
