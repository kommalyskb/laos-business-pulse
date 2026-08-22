import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-lao/wght.css";
import "./globals.css";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const siteUrl = isGitHubPages
  ? "https://kommalyskb.github.io/laos-business-pulse/"
  : "https://laos-business-pulse-2026.kommalyskb.chatgpt.site/";
const socialImageUrl = `${siteUrl}og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ທຸລະກິດລາວ ກຳລັງຢູ່ຈຸດໃດ? | Laos Business Pulse",
  description: "ບົດລາຍງານເຊີງວິເຄາະກ່ຽວກັບທຸລະກິດ, ແຮງງານ, ແຫຼ່ງທຶນ, governance ແລະໂອກາດໃນ ສປປ ລາວ — ສິງຫາ 2026.",
  openGraph: {
    title: "ທຸລະກິດລາວ ກຳລັງຢູ່ຈຸດໃດ?",
    description: "ບົດວິເຄາະ · ສິງຫາ 2026",
    type: "website",
    url: siteUrl,
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: "ທຸລະກິດລາວ ກຳລັງຢູ່ຈຸດໃດ?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ທຸລະກິດລາວ ກຳລັງຢູ່ຈຸດໃດ?",
    description: "ບົດວິເຄາະ · ສິງຫາ 2026",
    images: [socialImageUrl],
  },
  icons: {
    icon: isGitHubPages ? "/laos-business-pulse/favicon.svg" : "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lo">
      <body>{children}</body>
    </html>
  );
}
