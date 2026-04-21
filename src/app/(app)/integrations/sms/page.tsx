export default function SmsIntegrationPage() {
  return (
    <div className="px-8 py-8 max-w-2xl mx-auto anim-page">
      <div className="heat-glow -mx-8 -mt-8 px-8 pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">SMS</h1>
        <p className="text-sm text-[var(--muted)]">
          Skonfiguruj wysyłkę SMS do leadów — szybkie powiadomienia i follow-upy.
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
              <rect x="5" y="2" width="12" height="18" rx="2.5" stroke="var(--accent)" strokeWidth="1.6" />
              <circle cx="11" cy="17" r="1.1" fill="var(--accent)" />
              <path d="M8 6h6M8 9h4" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="font-medium">Integracja SMS</div>
            <div className="text-sm text-[var(--muted)]">Twilio · SMSAPI · SerwerSMS · Vonage</div>
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
            Po skonfigurowaniu będziesz mógł wysyłać SMS-y bezpośrednio do leadów —
            automatyczne powiadomienia, przypomnienia o spotkaniach i follow-upy.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm" style={{ color: "var(--muted)" }}>
          <p className="font-medium" style={{ color: "var(--text)" }}>Planowane funkcje:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Konfiguracja dostawcy SMS (Twilio, SMSAPI, SerwerSMS)</li>
            <li>Automatyczne SMS przy zmianie etapu leada</li>
            <li>Szablony wiadomości z personalizacją (imię, termin)</li>
            <li>Historia wysłanych SMS w timeline leada</li>
          </ul>
        </div>

        <button
          disabled
          className="rounded-lg py-2.5 text-sm font-semibold opacity-40 cursor-not-allowed"
          style={{ background: "var(--metal)", color: "#fff" }}
        >
          Konfiguruj SMS
        </button>
      </div>
    </div>
  );
}
