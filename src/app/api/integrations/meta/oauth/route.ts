import { NextResponse } from "next/server";
import { buildOAuthUrl } from "@/lib/meta/client";
import { randomBytes } from "crypto";

export async function GET() {
  if (!process.env.META_APP_ID || !process.env.META_APP_SECRET) {
    return NextResponse.json(
      { error: "Meta App nie jest skonfigurowany. Dodaj META_APP_ID i META_APP_SECRET do .env.local i zobacz docs/meta-setup.md" },
      { status: 500 },
    );
  }

  const state = randomBytes(16).toString("hex");

  const res = NextResponse.redirect(buildOAuthUrl(state));
  res.cookies.set("meta_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600, // 10 min
  });
  return res;
}
