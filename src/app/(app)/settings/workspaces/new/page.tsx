import { NewWorkspaceForm } from "./form";

export default function NewWorkspacePage() {
  return (
    <div className="px-8 py-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Nowy klient</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Każdy klient ma osobny workspace — leady, integracje i pipeline&apos;y są odizolowane.
      </p>
      <NewWorkspaceForm />
    </div>
  );
}
