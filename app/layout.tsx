import type { Metadata } from "next";
import "./globals.css";
import { withBasePath } from "./site-paths";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL("https://lice201.github.io/Takamatsu-Travel-Public/"),
  title: "Takamatsu Travel Log | 3 Nights / 4 Days",
  description: "실제 이동과 사진 121장으로 정리한 2026년 8월 다카마쓰·쇼도시마 3박 4일 여행기",
  openGraph: {
    title: "Takamatsu Travel Log",
    description: "24–27 August 2026 · Kagawa & Shodoshima",
    images: [{ url: withBasePath("/og-v12.png"), width: 1200, height: 630, alt: "다카마쓰 3박 4일 여행 기록" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takamatsu Travel Log",
    description: "2026년 8월 다카마쓰·쇼도시마 실제 여행 기록",
    images: [withBasePath("/og-v12.png")],
  },
  icons: {
    icon: withBasePath("/favicon.svg"),
    shortcut: withBasePath("/favicon.svg"),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
