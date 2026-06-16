import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM — BeautyRise",
  description: "Własny CRM: leady + Meta Ads",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
