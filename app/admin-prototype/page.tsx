import type { Metadata } from "next";
import AdminPrototype from "./AdminPrototype";

export const metadata: Metadata = {
  title: "Admin Workflow Prototype R3.1 | ພ້ອມໄປ",
  description: "Admin Portal R3.1 ມີ 10 Main Modules, contextual Sub-Menu ແລະ detailed record workspace ສຳລັບ workflow, evidence, decision ແລະ audit.",
  openGraph: { title: "Admin Workflow Prototype R3.1", description: "Contextual sub-navigation and detailed operating workspaces.", images: [] },
  twitter: { title: "Admin Workflow Prototype R3.1", description: "Contextual sub-navigation and detailed operating workspaces.", images: [] },
};

export default function AdminPrototypePage() {
  return <AdminPrototype />;
}
