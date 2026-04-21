import { createServiceClient } from "@/lib/supabase/server";
import { ImportForm } from "./import-form";

export default async function ImportPage() {
  const supabase = createServiceClient();
  const { data: stages } = await supabase
    .from("pipeline_stages")
    .select("id, name")
    .order("order");

  return (
    <div className="px-8 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Import CSV</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Wczytaj plik CSV i zmapuj kolumny. Leady trafią do pipeline&apos;u ze źródłem <code className="bg-[var(--ba-8)] px-1 rounded text-[var(--text)]">import</code>.
      </p>
      <ImportForm stages={stages ?? []} />
    </div>
  );
}
