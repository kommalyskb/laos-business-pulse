import type { Metadata } from "next";
import AdminPrototype from "./AdminPrototype";

export const metadata: Metadata = {
  title: "Admin Workflow Prototype R4.1 | ພ້ອມໄປ",
  description: "Admin Portal R4.1 ເພີ່ມ task-first Content intake ສຳລັບ Place ແລະ Review Source ພ້ອມ guided workflow.",
  openGraph: { title: "Admin Workflow Prototype R4.1", description: "Task-first Content intake for Places and review sources across fifty-five Admin views.", images: [] },
  twitter: { title: "Admin Workflow Prototype R4.1", description: "Task-first Content intake for Places and review sources across fifty-five Admin views.", images: [] },
};

export default function AdminPrototypePage() {
  return <AdminPrototype />;
}
