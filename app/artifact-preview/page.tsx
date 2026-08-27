import type { Metadata } from "next";
import ArtifactPreviewClient from "./ArtifactPreviewClient";

export const metadata: Metadata = {
  title: "ພຣີວິວແບບຟອມ | ພ້ອມໄປ Docs",
  description: "ອ່ານແບບຟອມ ແລະໄຟລ໌ນຳໃຊ້ຂອງໂຄງການຜ່ານໜ້າເວັບ.",
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function ArtifactPreviewPage() {
  return <ArtifactPreviewClient />;
}
