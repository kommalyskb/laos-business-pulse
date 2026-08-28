import type { Metadata } from "next";
import FinalDesignGallery from "./FinalDesignGallery";

export const metadata: Metadata = {
  title: "UX-05 Final Design Gallery | ພ້ອມໄປ Docs",
  description: "Final UX/UI design baseline ສຳລັບ Guest/Pilot ແລະ Admin screens ພ້ອມ responsive ແລະ system states.",
  openGraph: { title: "UX-05 Final Design Gallery", description: "Developer-ready screen, state and responsive design baseline.", images: [] },
  twitter: { title: "UX-05 Final Design Gallery", description: "Developer-ready screen, state and responsive design baseline.", images: [] },
};

export default function FinalDesignPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return <FinalDesignGallery basePath={basePath} />;
}
