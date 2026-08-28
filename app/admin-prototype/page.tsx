import type { Metadata } from "next";
import AdminPrototype from "./AdminPrototype";

export const metadata: Metadata = {
  title: "Admin Workflow Prototype R4.0 | ພ້ອມໄປ",
  description: "Admin Portal R4.0 ມີ 10 Modules, 55 functional views, contextual guidance, workflow, evidence, audit ແລະ session persistence.",
  openGraph: { title: "Admin Workflow Prototype R4.0", description: "Fifty-five functional Admin views with contextual workflows and evidence controls.", images: [] },
  twitter: { title: "Admin Workflow Prototype R4.0", description: "Fifty-five functional Admin views with contextual workflows and evidence controls.", images: [] },
};

export default function AdminPrototypePage() {
  return <AdminPrototype />;
}
