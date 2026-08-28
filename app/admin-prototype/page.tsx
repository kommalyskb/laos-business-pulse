import type { Metadata } from "next";
import AdminPrototype from "./AdminPrototype";

export const metadata: Metadata = {
  title: "Admin Workflow Prototype | ພ້ອມໄປ",
  description: "Standalone high-fidelity Admin Portal prototype ສຳລັບທົດລອງ workflow ຈາກ queue ຫາ record, decision ແລະ audit.",
  openGraph: { title: "Admin Workflow Prototype", description: "Interactive operating portal prototype.", images: [] },
  twitter: { title: "Admin Workflow Prototype", description: "Interactive operating portal prototype.", images: [] },
};

export default function AdminPrototypePage() {
  return <AdminPrototype />;
}
