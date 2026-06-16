import Link from "next/link";
import pkg from "../../../../package.json";

const REPO = "WojtekZaniewski/beautyrise-crm";
const GH_API = `https://api.github.com/repos/${REPO}`;

// Public repo — unauthenticated works; GITHUB_TOKEN (optional) raises rate limits
function ghHeaders(): HeadersInit {
  const h: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

type GhCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
};

type GhDeployment = { id: number; sha: string; created_at: string };
type GhDeploymentStatus = { state: string; created_at: string };

type CommitTypeInfo = { label: string; color: string; bg: string };

const COMMIT_TYPES: Record<string, CommitTypeInfo> = {
  feat:     { label: "Nowość",      color: "#FF4C00", bg: "rgba(255,76,0,0.12)" },
  fix:      { label: "Poprawka",    color: "#FF8C42", bg: "rgba(255,140,66,0.12)" },
  ci:       { label: "Techniczne",  color: "#78716C", bg: "var(--ba-4)" },
  chore:    { label: "Techniczne",  color: "#78716C", bg: "var(--ba-4)" },
  refactor: { label: "Techniczne",  color: "#78716C", bg: "var(--ba-4)" },
  docs:     { label: "Dokumentacja", color: "#78716C", bg: "var(--ba-4)" },
  style:    { label: "Wygląd",      color: "#FF4C00", bg: "rgba(255,76,0,0.12)" },
  perf:     { label: "Wydajność",   color: "#FF4C00", bg: "rgba(255,76,0,0.12)" },
};
const DEFAULT_TYPE: CommitTypeInfo = { label: "Zmiana", color: "var(--muted)", bg: "var(--ba-4)" };

function parseCommit(message: string) {
  const firstLine = message.split("\n")[0];
  const m = firstLine.match(/^(\w+)(?:\([^)]*\))?!?:\s*(.+)$/);
  if (m && COMMIT_TYPES[m[1]]) {
    return { type: COMMIT_TYPES[m[1]], text: m[2] };
  }
  return { type: DEFAULT_TYPE, text: firstLine };
}

const DEPLOY_STATES: Record<string, { label: string; color: string }> = {
  success:     { label: "✓ Wdrożono",   color: "#FF4C00" },
  error:       { label: "✗ Błąd",       color: "#1C1917" },
  failure:     { label: "✗ Błąd",       color: "#1C1917" },
  in_progress: { label: "⏳ W trakcie",  color: "#FF8C42" },
  queued:      { label: "⏳ W kolejce",  color: "#FF8C42" },
  pending:     { label: "⏳ Oczekuje",   color: "#FF8C42" },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("pl-PL", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function LogsPage() {
  // Cached 2 min — keeps "live enough" sync without burning GitHub rate limits
  const fetchOpts = { headers: ghHeaders(), next: { revalidate: 120 } };

  let commits: GhCommit[] = [];
  let deployStateBySha = new Map<string, string>();
  let fetchError = false;

  try {
    const [commitsRes, deploymentsRes] = await Promise.all([
      fetch(`${GH_API}/commits?per_page=20`, fetchOpts),
      fetch(`${GH_API}/deployments?per_page=8`, fetchOpts),
    ]);
    if (!commitsRes.ok) throw new Error(`GitHub ${commitsRes.status}`);
    commits = (await commitsRes.json()) as GhCommit[];

    if (deploymentsRes.ok) {
      const deployments = (await deploymentsRes.json()) as GhDeployment[];
      // Newest deployment per commit sha; fetch its latest status
      const seen = new Set<string>();
      const toCheck = deployments.filter((d) => {
        if (seen.has(d.sha)) return false;
        seen.add(d.sha);
        return true;
      }).slice(0, 6);

      const statuses = await Promise.all(
        toCheck.map((d) =>
          fetch(`${GH_API}/deployments/${d.id}/statuses?per_page=1`, fetchOpts)
            .then((r) => (r.ok ? (r.json() as Promise<GhDeploymentStatus[]>) : []))
            .catch(() => [] as GhDeploymentStatus[]),
        ),
      );
      deployStateBySha = new Map(
        toCheck.map((d, i) => [d.sha, statuses[i][0]?.state ?? "pending"]),
      );
    }
  } catch {
    fetchError = true;
  }

  const latest = commits[0];
  const latestDeployState = latest ? deployStateBySha.get(latest.sha) : undefined;
  const latestDeploy = latestDeployState ? DEPLOY_STATES[latestDeployState] : undefined;

  const summary = [
    { label: "Wersja", value: `v${pkg.version}` },
    { label: "Build", value: latest ? latest.sha.slice(0, 7) : "—" },
    {
      label: "Ostatni deploy",
      value: latestDeploy?.label ?? "—",
      color: latestDeploy?.color,
    },
    { label: "Ostatnia zmiana", value: latest ? fmtDate(latest.commit.author.date) : "—" },
  ];

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 w-full anim-page">
      <div className="heat-glow -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 px-4 sm:px-8 pt-4 sm:pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Logi systemu</h1>
        <p className="text-sm text-[var(--muted)]">
          Najnowsze zmiany w CRM — synchronizowane z repozytorium na bieżąco
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {summary.map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-4"
            style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
          >
            <div className="text-[10.5px] font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              {s.label}
            </div>
            <div className="text-[16px] font-semibold leading-none" style={s.color ? { color: s.color } : undefined}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Changelog */}
      <section
        className="rounded-lg p-5"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13.5px] font-semibold tracking-tight">Historia zmian</h2>
          <Link
            href={`https://github.com/${REPO}/commits/main`}
            target="_blank"
            className="text-[12px] font-medium"
            style={{ color: "var(--accent-2)" }}
          >
            GitHub →
          </Link>
        </div>

        {fetchError ? (
          <p className="text-[13px] text-[var(--muted)]">
            Nie udało się pobrać logów z GitHuba. Spróbuj odświeżyć za chwilę.
          </p>
        ) : commits.length === 0 ? (
          <p className="text-[13px] text-[var(--muted)]">Brak zmian.</p>
        ) : (
          <div className="flex flex-col">
            {commits.map((c, i) => {
              const { type, text } = parseCommit(c.commit.message);
              const deployState = deployStateBySha.get(c.sha);
              const deploy = deployState ? DEPLOY_STATES[deployState] : undefined;
              return (
                <div
                  key={c.sha}
                  className="flex items-start gap-3 py-3"
                  style={i < commits.length - 1 ? { borderBottom: "1px solid var(--border)" } : undefined}
                >
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 mt-0.5"
                    style={{ background: type.bg, color: type.color }}
                  >
                    {type.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium leading-snug break-words">{text}</div>
                    <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                      <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                        {fmtDate(c.commit.author.date)}
                      </span>
                      <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                        {c.commit.author.name}
                      </span>
                      <Link
                        href={c.html_url}
                        target="_blank"
                        className="text-[11px] font-mono hover:underline"
                        style={{ color: "var(--accent-2)" }}
                      >
                        {c.sha.slice(0, 7)}
                      </Link>
                      {deploy && (
                        <span className="text-[11px] font-medium" style={{ color: deploy.color }}>
                          {deploy.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
