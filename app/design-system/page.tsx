import type { Metadata } from "next";
import DesignSystemGallery from "./DesignSystemGallery";

export const metadata: Metadata = {
  title: "UX-04 Component Gallery | ພ້ອມໄປ Docs",
  description: "ໜ້າພຣີວິວ Design Tokens, Pilot Components ແລະ UI States ຂອງ UX-04.",
  openGraph: { title: "UX-04 Component Gallery", description: "Design System documentation for the Pilot guest experience.", images: [] },
  twitter: { title: "UX-04 Component Gallery", description: "Design System documentation for the Pilot guest experience.", images: [] },
};

export default function DesignSystemPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return <DesignSystemGallery basePath={basePath} />;
}
