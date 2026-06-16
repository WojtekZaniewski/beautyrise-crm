// Resolve a human display name for an authenticated user (FOS task attribution etc.).
type AuthUserish = { email?: string | null; user_metadata?: { full_name?: string; name?: string } | null };

export function displayName(u: AuthUserish): string {
  const meta = u.user_metadata ?? {};
  const n = (meta.full_name || meta.name || "").trim();
  if (n) return n;
  const local = (u.email ?? "").split("@")[0] || "Użytkownik";
  return local.charAt(0).toUpperCase() + local.slice(1);
}
