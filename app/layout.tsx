import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ທຸລະກິດລາວ ກຳລັງຢູ່ຈຸດໃດ? | Laos Business Pulse",
  description: "ບົດລາຍງານເຊີງວິເຄາະກ່ຽວກັບທຸລະກິດ, ແຮງງານ, ແຫຼ່ງທຶນ, governance ແລະໂອກາດໃນ ສປປ ລາວ — ສິງຫາ 2026.",
  openGraph: {
    title: "ທຸລະກິດລາວ ກຳລັງຢູ່ຈຸດໃດ?",
    description: "ບົດວິເຄາະ · ສິງຫາ 2026",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ທຸລະກິດລາວ ກຳລັງຢູ່ຈຸດໃດ?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ທຸລະກິດລາວ ກຳລັງຢູ່ຈຸດໃດ?",
    description: "ບົດວິເຄາະ · ສິງຫາ 2026",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lo">
      <body>{children}</body>
    </html>
  );
}
