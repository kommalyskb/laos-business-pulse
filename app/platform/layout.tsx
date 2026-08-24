import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ພ້ອມໄປ — Video discovery platform ສຳລັບລາວ",
  description:
    "ບົດນຳສະເໜີແນວຄິດ platform ທີ່ປ່ຽນວິດີໂອຣີວິວໃຫ້ເປັນຂໍ້ມູນສຳລັບຕັດສິນໃຈ ແລະຕິດຕໍ່ສະຖານທີ່ໄດ້ທັນທີ.",
  openGraph: {
    title: "ພ້ອມໄປ — ຈາກການເບິ່ງ ສູ່ການອອກເດີນທາງ",
    description: "Video discovery → Decision → Direct contact",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "ພ້ອມໄປ — Video discovery platform ສຳລັບລາວ",
    description: "Video discovery → Decision → Direct contact",
    images: [],
  },
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return children;
}
