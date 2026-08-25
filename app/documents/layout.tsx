import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ສູນລວມເອກະສານໂຄງການ | ພ້ອມໄປ",
  description: "Document Directory ສຳລັບໂຄງການ video discovery platform ໃນລາວ.",
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function DocumentsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

