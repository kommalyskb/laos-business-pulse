import type { Metadata } from "next";
import AdminPrototype from "./AdminPrototype";

export const metadata: Metadata = {
  title: "Admin Workflow Prototype R3.2 | ພ້ອມໄປ",
  description: "Admin Portal R3.2 ເລືອກ Main Module ຈາກ Application Launcher ແລະໃຊ້ Header ສະເພາະ Sub-Menu ຂອງ Module ປັດຈຸບັນ.",
  openGraph: { title: "Admin Workflow Prototype R3.2", description: "Application-based modules and one-level contextual header navigation.", images: [] },
  twitter: { title: "Admin Workflow Prototype R3.2", description: "Application-based modules and one-level contextual header navigation.", images: [] },
};

export default function AdminPrototypePage() {
  return <AdminPrototype />;
}
