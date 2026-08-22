"use client";

import { useState } from "react";

type Theme = "all" | "system" | "business" | "risk";

const sources = [
  {
    id: "wb-jun26",
    org: "World Bank",
    year: "2026",
    title: "Lao Economic Monitor, June 2026: Consolidating Reform Momentum Amid Volatility",
    url: "https://www.worldbank.org/en/country/lao/publication/lao-economic-monitor-jun-2026-consolidating-reform-momentum-amid-volatility-key-findings",
    use: "GDP, ເງິນເຟີ້, ໜີ້ສິນ, ແຮງງານ ແລະແນວໂນ້ມ 2026",
  },
  {
    id: "wb-private26",
    org: "World Bank",
    year: "2026",
    title: "Lao PDR Country Climate and Development Report — Private Sector Evidence",
    url: "https://documents1.worldbank.org/curated/en/099020526142540696/pdf/P506862-2c52568a-d435-4b1d-a922-03554a83fd13.pdf",
    use: "ໂຄງສ້າງວິສາຫະກິດ ແລະ Enterprise Survey 2024",
  },
  {
    id: "wb-dec25",
    org: "World Bank",
    year: "2025",
    title: "Lao Economic Monitor, December 2025",
    url: "https://documents1.worldbank.org/curated/en/099121025042011365/pdf/P507388-ccb616a9-aed0-43a7-81ed-97aebf126ada.pdf",
    use: "ການຍ້າຍແຮງງານ, ວຽກຮັບຄ່າຈ້າງ ແລະການກັບຄືນກະສິກຳ",
  },
  {
    id: "wb-may25",
    org: "World Bank",
    year: "2025",
    title: "Lao Economic Monitor, May 2025: Weathering Risks",
    url: "https://www.worldbank.org/en/country/lao/publication/lao-economic-monitor-may-2025-weathering-risks-key-findings",
    use: "MSME, ການເຂົ້າເຖິງທຶນ ແລະຄວາມສ່ຽງທະນາຄານ",
  },
  {
    id: "imf26",
    org: "IMF",
    year: "2026",
    title: "Lao PDR: 2025 Article IV Consultation",
    url: "https://www.imf.org/en/publications/cr/issues/2026/02/20/lao-peoples-democratic-republic-2025-article-iv-consultation-press-release-staff-report-574181",
    use: "ຖານະມະຫາພາກ, ລະບົບທະນາຄານ, ໜີ້ສິນ ແລະການບໍລິຫານ",
  },
  {
    id: "adb-profit26",
    org: "ADB",
    year: "2026",
    title: "Provincial Facilitation for Investment and Trade Index, Third Edition",
    url: "https://www.adb.org/publications/economic-governance-business-development-lao-pdr-3rd",
    use: "ການເລີ່ມທຸລະກິດ, ຄວາມໂປ່ງໃສ, ຄ່ານອກລະບົບ ແລະນະໂຍບາຍແຂວງ",
  },
  {
    id: "cpi25",
    org: "Transparency International",
    year: "2026",
    title: "Corruption Perceptions Index 2025",
    url: "https://www.transparency.org/en/cpi/2025",
    use: "ດັດຊະນີການຮັບຮູ້ການທຸຈະລິດຂອງພາກລັດ",
  },
  {
    id: "ilo25",
    org: "ILO",
    year: "2025",
    title: "Fair recruitment of Lao migrant workers",
    url: "https://www.ilo.org/node/716386",
    use: "ການຈັດຫາງານຂ້າມແດນ, ຄ່າທຳນຽມ ແລະການຄຸ້ມຄອງແຮງງານ",
  },
  {
    id: "bol25",
    org: "Bank of the Lao P.D.R.",
    year: "2026",
    title: "Annual Economic Report 2025",
    url: "https://bol.gov.la/en/fileupload/30-06-2026_1782819835.pdf",
    use: "ລະບົບຊຳລະເງິນ, QR ຂ້າມແດນ, ການຊຳລະອອນລາຍ ແລະຕະຫຼາດທຶນ",
  },
  {
    id: "adb-integration",
    org: "ADB",
    year: "2022",
    title: "Leveraging Benefits of Regional Economic Integration",
    url: "https://www.adb.org/publications/regional-economic-integration-lao-pdr-gms",
    use: "ການເຊື່ອມຕໍ່ GMS, ການສົ່ງອອກ ແລະການຫັນເປັນປະເທດເຊື່ອມໂຍງ",
  },
  {
    id: "lsc-issuers",
    org: "Lao Securities Commission",
    year: "2026",
    title: "Issuer Information",
    url: "https://lsc2.gov.la/EN/issuance/issuer_info.php",
    use: "ລາຍຊື່ 12 ບໍລິສັດອອກຫຼັກຊັບໃນລາວ",
  },
  {
    id: "lsc-securities",
    org: "Lao Securities Commission",
    year: "2026",
    title: "Securities Companies",
    url: "https://lsc2.gov.la/EN/securities/index.php",
    use: "ລາຍຊື່ບໍລິສັດຫຼັກຊັບທີ່ຢູ່ພາຍໃຕ້ການກຳກັບ",
  },
  {
    id: "lsx-disclosure",
    org: "Lao Securities Exchange",
    year: "2026",
    title: "Disclosure Information",
    url: "https://lsx.com.la/en/disclosure/disclosure",
    use: "ບົດບາດຂອງການເປີດເຜີຍຂໍ້ມູນຕໍ່ນັກລົງທຶນ ແລະຕະຫຼາດ",
  },
  {
    id: "set-lsx",
    org: "Stock Exchange of Thailand",
    year: "2026",
    title: "GMS Exchanges Overview: Lao Securities Exchange",
    url: "https://www.set.or.th/en/market/index/gms-exchanges/overview",
    use: "ໂຄງສ້າງຜູ້ຖືຮຸ້ນ, ຜະລິດຕະພັນ ແລະການຊຳລະແບບ T+2 ຂອງ LSX",
  },
  {
    id: "adb-capital26",
    org: "ADB",
    year: "2026",
    title: "ADB Launches $6 Billion Initiative to Deepen ASEAN Capital Markets",
    url: "https://www.adb.org/news/adb-launches-6-billion-initiative-and-institutional-support-deepen-asean-capital-markets",
    use: "ບໍລິບົດການພັດທະນາພັນທະບັດ ແລະຕະຫຼາດທຶນໃນ ASEAN",
  },
  {
    id: "bol-gold-rules",
    org: "Bank of the Lao P.D.R.",
    year: "2024",
    title: "ພິທີເປີດທະນາຄານຄຳລາວຢ່າງເປັນທາງການ",
    url: "https://www.bol.gov.la/fileupload/18-12-2024_1734507235.pdf",
    use: "ຂອບກົດໝາຍເລກທີ 1277/ທຫລ, ການກຳກັບ ແລະບົດບາດທະນາຄານຄຳ",
  },
  {
    id: "lbb-certificate",
    org: "Lao Bullion Bank",
    year: "2026",
    title: "Gold Certificate of Lao Bullion Bank",
    url: "https://laobullionbank.com/product/38d3f9c2-3ca0-48b8-9e28-0a7dff162f4c",
    use: "ການນຳໃບຢັ້ງຢືນຄຳເປັນຫຼັກຄ້ຳ ແລະຍອດຝາກຄຳຂັ້ນຕ່ຳ 15 ກຣາມ",
  },
  {
    id: "kpl-gold-bank",
    org: "Lao News Agency (KPL)",
    year: "2024",
    title: "BOL Addresses Economic Concerns, Outlines Strategic Measures for 2024",
    url: "https://kpl.gov.la/En/detail.aspx/detail.aspx?id=87567",
    use: "ບັນຊີອອມຄຳ, ສິນເຊື່ອຄ້ຳດ້ວຍຄຳ ແລະເປົ້າໝາຍຂະຫຍາຍການເຂົ້າເຖິງທຶນ",
  },
  {
    id: "adb-outlook26",
    org: "ADB",
    year: "2026",
    title: "Lao PDR’s Economic Growth Moderates Amid External Risks",
    url: "https://www.adb.org/news/lao-pdr-economic-growth-moderates-amid-external-risks",
    use: "ແນວໂນ້ມທ່ອງທ່ຽວ, ຂົນສົ່ງ, ໂລຈິສຕິກ ແລະພະລັງງານປີ 2026–2027",
  },
  {
    id: "wb-poverty26",
    org: "World Bank",
    year: "2026",
    title: "Poverty Falls in Laos, but Quality Jobs Remain Scarce",
    url: "https://www.worldbank.org/en/country/lao/publication/poverty-falls-in-laos-but-quality-jobs-remain-scarce",
    use: "ກຳລັງຊື້, ກະສິກຳເຊີງການຄ້າ, ການແປຮູບ, ທັກສະ ແລະວຽກຄຸນນະພາບ",
  },
];

const barriers = [
  { label: "ທັກສະແຮງງານບໍ່ພຽງພໍ", value: 36 },
  { label: "ເຂົ້າເຖິງແຫຼ່ງທຶນ", value: 15 },
  { label: "ການແຂ່ງຂັນນອກລະບົບ", value: 11 },
  { label: "ໄຟຟ້າ", value: 9 },
  { label: "ການຂົນສົ່ງ", value: 7 },
  { label: "ອັດຕາພາສີ", value: 5 },
];

const pillarData = [
  {
    id: "governance",
    tag: "system" as Theme,
    no: "01",
    title: "ການແຂ່ງຂັນ ແລະການບໍລິຫານທີ່ດີ",
    risk: "ສູງ",
    summary: "ຄວາມບໍ່ແນ່ນອນຂອງກົດກາ, ຄ່າໃຊ້ຈ່າຍນອກລະບົບ ແລະໂອກາດທີ່ອາໄສເຄືອຂ່າຍ ເຮັດໃຫ້ຕົ້ນທຶນທີ່ແທ້ຈິງຄາດຄະເນຍາກ.",
    evidence: [
      "ADB ProFIT ຕິດຕາມ 6 ມິຕິ: ການເລີ່ມທຸລະກິດ, ຄວາມໂປ່ງໃສ, ພາລະກົດລະບຽບ, ຄ່ານອກລະບົບ, ຄວາມສະໝ່ຳສະເໝີຂອງນະໂຍບາຍ ແລະການບໍລິຫານທີ່ເປັນມິດ.",
      "CPI 2025 ໃຫ້ລາວ 34/100 ຄະແນນ, ອັນດັບ 109. ນີ້ແມ່ນດັດຊະນີການຮັບຮູ້—ບໍ່ແມ່ນການນັບຄະດີໂດຍກົງ.",
      "IMF ປະເມີນວ່າຊ່ອງຫວ່າງດ້ານການບໍລິຫານ ແລະກົດລະບຽບທຸລະກິດ ຍັງຈຳກັດສັກກະຍະພາບການເຕີບໂຕ.",
    ],
    impact: "ຂັ້ນຕອນບໍ່ແນ່ນອນ → ຕົ້ນທຶນລັບເພີ່ມ → ຜູ້ລົງທຶນຄິດຄ່າຄວາມສ່ຽງເພີ່ມ → SME ເສຍປຽບ",
    response: "ໃຊ້ລະບົບອະນຸຍາດ ແລະຈັດຊື້ອອນລາຍ, ເປີດເຜີຍຜູ້ໄດ້ຮັບສັນຍາ, ກຳນົດເວລາອະນຸມັດ ແລະມີຊ່ອງທາງອຸທອນທີ່ກວດສອບໄດ້.",
    refs: ["adb-profit26", "cpi25", "imf26"],
  },
  {
    id: "labor",
    tag: "business" as Theme,
    no: "02",
    title: "ແຮງງານ ແລະທັກສະ",
    risk: "ສູງຫຼາຍ",
    summary: "ບໍ່ແມ່ນພຽງຂາດຄົນ; ລາວກຳລັງຂາດວຽກທີ່ລາຍຮັບ, ສະຫວັດດີການ ແລະອະນາຄົດ ພຽງພໍໃຫ້ຄົນເກັ່ງຢູ່ຕໍ່.",
    evidence: [
      "ແຮງງານລາວທີ່ມີເອກະສານໃນໄທມີຫຼາຍກວ່າ 324,000 ຄົນໃນເດືອນກຸມພາ 2025; ເກົາຫຼີໃຕ້ປະມານ 17,000 ຄົນ.",
      "ສັດສ່ວນວຽກຮັບຄ່າຈ້າງຫຼຸດຈາກ 43.7% ໃນພຶດສະພາ 2022 ເປັນ 36.1% ໃນມິຖຸນາ 2024.",
      "ການສຳຫຼວດວິສາຫະກິດ 2024: 36% ຂອງບໍລິສັດລະບຸວ່າທັກສະແຮງງານເປັນອຸປະສັກອັນດັບໜຶ່ງ.",
    ],
    impact: "ຄ່າແຮງແທ້ຈິງຫຼຸດ → ແຮງງານຍ້າຍອອກ → ບໍລິສັດຫາຄົນຍາກ → ຜະລິດຕະພາບຕ່ຳ → ຂຶ້ນຄ່າແຮງຍາກ",
    response: "ໃຫ້ຄ່າຕອບແທນອີງທັກສະ, ສ້າງເສັ້ນທາງຄວາມກ້າວໜ້າໃນອາຊີບ, ຝຶກງານຮ່ວມລັດ–ເອກະຊົນ ແລະຮັບຮອງທັກສະຂອງແຮງງານທີ່ກັບຄືນຈາກຕ່າງປະເທດ.",
    refs: ["wb-dec25", "wb-private26", "ilo25"],
  },
  {
    id: "finance",
    tag: "business" as Theme,
    no: "03",
    title: "ແຫຼ່ງທຶນ ແລະສະພາບຄ່ອງ",
    risk: "ສູງ",
    summary: "ລະບົບການເງິນອີງທະນາຄານເປັນຫຼັກ; ທຸລະກິດນ້ອຍທີ່ບໍ່ມີດິນຄ້ຳ ຫຼືບັນຊີມາດຕະຖານ ຖືກຕັດອອກຈາກສິນເຊື່ອ.",
    evidence: [
      "15% ຂອງບໍລິສັດໃນການສຳຫຼວດວິສາຫະກິດ 2024 ເລືອກການເຂົ້າເຖິງແຫຼ່ງທຶນເປັນອຸປະສັກຫຼັກ.",
      "World Bank ພົບວ່າ MSME ສ່ວນໃຫຍ່ອາໄສເງິນຕົນເອງ; ບັນຫາແມ່ນຫຼັກຄ້ຳ, ລາຍຮັບບໍ່ສະໝ່ຳສະເໝີ, ການຢູ່ນອກລະບົບ ແລະບັນຊີບໍ່ໜ້າເຊື່ອຖື.",
      "ການກູ້ຂອງລັດແລະບໍລິສັດໃຫຍ່ ອາດເຮັດໃຫ້ສິນເຊື່ອທີ່ເຫຼືອສຳລັບທຸລະກິດນ້ອຍຫຼຸດລົງ.",
    ],
    impact: "ບໍ່ມີຫຼັກຄ້ຳ → ບໍ່ໄດ້ສິນເຊື່ອ → ຂະຫຍາຍບໍ່ໄດ້ → ບັນຊີແລະກະແສເງິນສົດຍັງນ້ອຍ → ກູ້ຍາກຕໍ່ໄປ",
    response: "ສ້າງສູນຂໍ້ມູນສິນເຊື່ອທີ່ເຂັ້ມແຂງ, ໃຫ້ກູ້ຕາມກະແສເງິນສົດ, ຮັບຊັບສິນເຄື່ອນຍ້າຍເປັນຫຼັກຄ້ຳ, ໃຫ້ທຶນຕາມໃບແຈ້ງໜີ້ ແລະສ້າງກອງທຶນ MSME ອິດສະຫຼະທີ່ກວດສອບໄດ້.",
    refs: ["wb-may25", "wb-private26", "imf26"],
  },
  {
    id: "macro",
    tag: "risk" as Theme,
    no: "04",
    title: "ມະຫາພາກ ແລະກຳລັງຊື້",
    risk: "ສູງ",
    summary: "ການຟື້ນຕົວເປັນຈິງ ແຕ່ບອບບາງ: ຄ່ານ້ຳມັນ, ໜີ້ສິນ, ເງິນຕາ ແລະການຊະລໍຕົວຂອງຄູ່ຄ້າ ສາມາດກະທົບທຸລະກິດຢ່າງໄວ.",
    evidence: [
      "GDP ເຕີບ 4.8% ໃນ 2025 ແຕ່ World Bank ຄາດ 3.8% ໃນ 2026.",
      "ເງິນສຳຮອງສາກົນຂຶ້ນເຖິງ $4.2 ຕື້ໃນມີນາ 2026, ເທົ່າກັບ 3.8 ເດືອນຂອງການນຳເຂົ້າ.",
      "World Bank ປະເມີນພາລະຊຳລະໜີ້ 2026 ປະມານ 13% ຂອງ GDP, ຈຳກັດງົບລົງທຶນສາທາລະນະ.",
    ],
    impact: "ຕົ້ນທຶນນຳເຂົ້າສູງ → ລາຄາຂາຍສູງ → ກຳລັງຊື້ຫຼຸດ → ຍອດຂາຍຊ້າ → ກະແສເງິນສົດຕຶງ",
    response: "ທຸລະກິດຄວນຫຼຸດຊ່ອງຫວ່າງລະຫວ່າງສະກຸນເງິນລາຍຮັບກັບໜີ້, ວາງແຜນກະແສເງິນສົດ 3 ສະຖານະການ, ເພີ່ມວັດຖຸດິບພາຍໃນ ແລະຫາລາຍຮັບສະກຸນເງິນທີ່ແຂງກວ່າ.",
    refs: ["wb-jun26", "imf26"],
  },
  {
    id: "capital-market",
    tag: "business" as Theme,
    no: "05",
    title: "ຕະຫຼາດທຶນ ແລະ LSX",
    risk: "ປານກາງ–ສູງ",
    summary: "LSX ເປັນຊ່ອງທາງທຶນທີ່ສຳຄັນ ແຕ່ຈຳນວນຜູ້ອອກຫຼັກຊັບ, ສະພາບຄ່ອງ ແລະຄວາມພ້ອມກ່ອນຈົດທະບຽນ ຍັງຈຳກັດການເຂົ້າເຖິງ.",
    evidence: [
      "BOL ລາຍງານວ່າ LSX ມີ 12 ບໍລິສັດຈົດທະບຽນ ແລະມູນຄ່າຊື້ຂາຍປີ 2025 ຢູ່ທີ່ 216.76 ຕື້ກີບ.",
      "ທຶນສະສົມຈາກຮຸ້ນ, ພັນທະບັດບໍລິສັດ ແລະພັນທະບັດລັດ ບັນລຸ 67,815.55 ຕື້ກີບ ຫຼື 21% ຂອງ GDP ປີ 2024.",
      "LSX ລະບຸວ່າຂໍ້ມູນສຳຄັນຕ້ອງຖືກເປີດເຜີຍຕໍ່ຕະຫຼາດແລະສາທາລະນະຕາມລະບຽບຫຼັກຊັບ.",
    ],
    impact: "ຕົ້ນທຶນການກຽມບັນຊີແລະການບໍລິຫານສູງ → SME ບໍ່ພ້ອມຈົດທະບຽນ → ຜູ້ອອກຫຼັກຊັບໜ້ອຍ → ສະພາບຄ່ອງຕ່ຳ → ນັກລົງທຶນສົນໃຈຈຳກັດ",
    response: "ສ້າງກະດານສຳລັບ SME, ໂຄງການກຽມຄວາມພ້ອມຈົດທະບຽນ, ຕະຫຼາດພັນທະບັດບໍລິສັດ, ນັກລົງທຶນສະຖາບັນ ແລະການເປີດເຜີຍທີ່ທັນເວລາ—ໂດຍບໍ່ຫຼຸດມາດຕະຖານຄຸ້ມຄອງ.",
    refs: ["bol25", "lsc-issuers", "lsx-disclosure"],
  },
  {
    id: "gold-banking",
    tag: "business" as Theme,
    no: "06",
    title: "ທະນາຄານຄຳ ແລະສິນເຊື່ອຄ້ຳດ້ວຍຄຳ",
    risk: "ປານກາງ–ສູງ",
    summary: "ທະນາຄານຄຳສາມາດປ່ຽນຄຳທີ່ຖືຄອງເປັນຫຼັກຄ້ຳໃນລະບົບການເງິນ—ແຕ່ມູນຄ່າກູ້, ດອກເບ້ຍ, ສ່ວນຫຼຸດມູນຄ່າຫຼັກຄ້ຳ ແລະສິດຂາຍຫຼັກຄ້ຳຕ້ອງອ່ານຈາກສັນຍາ.",
    evidence: [
      "BOL ອອກຂໍ້ຕົກລົງເລກທີ 1277/ທຫລ ລົງວັນທີ 29 ພະຈິກ 2024 ເພື່ອກຳນົດຫຼັກການ ແລະມາດຕະການຂອງທຸລະກິດທະນາຄານຄຳ.",
      "Lao Bullion Bank ລະບຸວ່າ Gold Certificate ສາມາດໃຊ້ຄ້ຳສິນເຊື່ອກັບທະນາຄານທຸລະກິດ ແລະສະຖາບັນການເງິນໃນລາວໄດ້.",
      "ເວັບທະນາຄານລະບຸຍອດຝາກຄຳຂັ້ນຕ່ຳ 15 ກຣາມ ສຳລັບການໄດ້ຮັບ Gold Certificate.",
    ],
    impact: "ຝາກຄຳ → ກວດຄຸນນະພາບ → ອອກໃບຢັ້ງຢືນ → ປະເມີນມູນຄ່າຫຼັງຫັກສ່ວນກັນຄວາມສ່ຽງ → ກູ້ເງິນໄດ້ໂດຍບໍ່ຕ້ອງຂາຍຄຳ",
    response: "ຜູ້ກູ້ຄວນປຽບທຽບ LTV, ດອກເບ້ຍແລະຄ່າທຳນຽມລວມ, ວິທີຕີລາຄາ, ເງື່ອນໄຂເອີ້ນເງິນເພີ່ມ, ສິດຂາຍຄຳເມື່ອຜິດນັດ, ການປະກັນໄພຄັງ ແລະຂັ້ນຕອນຮ້ອງຮຽນ.",
    refs: ["bol-gold-rules", "lbb-certificate", "kpl-gold-bank"],
  },
];

function Cite({ id }: { id: string }) {
  const index = sources.findIndex((source) => source.id === id) + 1;
  return <a className="cite" href={`#source-${id}`} aria-label={`ແຫຼ່ງຂໍ້ມູນ ${index}`}>[{index}]</a>;
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("all");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const visiblePillars = theme === "all" ? pillarData : pillarData.filter((item) => item.tag === theme);

  return (
    <main>
      <header className="hero" id="top">
        <nav className="topbar" aria-label="ນຳທາງຫຼັກ">
          <a className="brand" href="#top">
            <span className="brand-mark">ລ</span>
            <span>LAOS BUSINESS PULSE</span>
          </a>
          <div className="nav-links">
            <a href="#reader-guide">ເລືອກອ່ານ</a>
            <a href="#diagnosis">ບັນຫາ</a>
            <a href="#sectors">ຂະແໜງ</a>
            <a href="#opportunities">ໂອກາດ</a>
            <a href="#capital-market">ຕະຫຼາດທຶນ</a>
            <a href="#gold-banking">ທະນາຄານຄຳ</a>
            <a href="#actions">ຂໍ້ສະເໜີ</a>
            <a href="#sources">ແຫຼ່ງຂໍ້ມູນ</a>
          </div>
          <span className="report-date">ສິງຫາ 2026</span>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">ບົດລາຍງານເຊີງວິເຄາະ</p>
            <h1>ທຸລະກິດລາວ<br />ກຳລັງຢູ່ຈຸດໃດ?</h1>
            <p className="lede">
              ເສດຖະກິດຟື້ນຕົວ ແຕ່ຜູ້ປະກອບການຍັງຕິດຢູ່ລະຫວ່າງ
              ຕົ້ນທຶນສູງ, ແຮງງານຫາຍາກ, ທຶນຈຳກັດ ແລະການແຂ່ງຂັນທີ່ບໍ່ເທົ່າທຽມ.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#summary">ອ່ານບົດສະຫຼຸບ</a>
              <a className="text-action" href="#reader-guide">ເລືອກຫົວຂໍ້ທີ່ສົນໃຈ ↓</a>
            </div>
          </div>
          <aside className="hero-note">
            <span className="note-label">ໃຈຄວາມຫຼັກ</span>
            <strong>ບັນຫາບໍ່ແມ່ນ “ບໍ່ມີເງິນ”</strong>
            <p>ແຕ່ແມ່ນເງິນ, ໂອກາດ ແລະອຳນາດຕະຫຼາດ ກະຈຸກຕົວຢູ່ບາງຂະແໜງ.</p>
            <div className="hero-source">ອີງໃສ່ World Bank, IMF, ADB, ILO, BOL, LSC, LSX, KPL ແລະ Transparency International</div>
          </aside>
        </div>
        <figure className="hero-photo">
          <img src={`${basePath}/laos-freight.jpg`} alt="ການຂົນສົ່ງສິນຄ້າຜ່ານຂົວມິດຕະພາບໃນລາວ" />
          <figcaption>ການເຊື່ອມຕໍ່ແມ່ນທ່າແຮງ—ແຕ່ຕ້ອງປ່ຽນຈາກ “ທາງຜ່ານ” ເປັນມູນຄ່າພາຍໃນ. ຮູບ: World Bank / Phoonsab Thevongsa</figcaption>
        </figure>
      </header>

      <section className="section summary-section" id="summary">
        <div className="section-heading">
          <p className="eyebrow">00 · ບົດສະຫຼຸບ</p>
          <div>
            <h2>ສະຫຼຸບໃນ 90 ວິນາທີ</h2>
            <p className="section-intro">ການເຕີບໂຕຂອງ GDP ບໍ່ໄດ້ໝາຍຄວາມວ່າທຸລະກິດນ້ອຍເຕີບໂຕຕາມ. ການກະຈາຍໂອກາດແມ່ນຄຳຖາມຫຼັກ.</p>
          </div>
        </div>
        <div className="summary-grid">
          <article className="summary-lead">
            <span className="kicker">ຄຳວິນິດໄສ</span>
            <p>
              ເສດຖະກິດລາວມີສອງຄວາມຈິງພ້ອມກັນ: ການທ່ອງທ່ຽວ, ຂົນສົ່ງ, ພະລັງງານ ແລະການລົງທຶນຊັບພະຍາກອນຊ່ວຍໃຫ້ຕົວເລກລວມຟື້ນຕົວ; ແຕ່ SME ຍັງຖືກບີບຈາກກຳລັງຊື້, ແຮງງານ, ສິນເຊື່ອ ແລະຄວາມບໍ່ແນ່ນອນ. <Cite id="wb-jun26" /><Cite id="wb-may25" />
            </p>
          </article>
          <div className="summary-points">
            <article><b>1</b><div><strong>ຂະໜາດນ້ອຍບໍ່ແມ່ນຈຸດອ່ອນໂດຍຕົວມັນເອງ</strong><p>ຈຸດອ່ອນແມ່ນຜະລິດຕະພາບຕ່ຳ ແລະຍັງປ່ຽນຈາກປະເທດທາງຜ່ານ ເປັນລາຍຮັບພາຍໃນໄດ້ບໍ່ເຕັມທີ່.</p></div></article>
            <article><b>2</b><div><strong>ຂາດແຮງງານ ແຕ່ກໍຂາດວຽກຄຸນນະພາບ</strong><p>ຄ່າແຮງແທ້ຈິງ ແລະເສັ້ນທາງຄວາມກ້າວໜ້າໃນອາຊີບ ເປັນຕົວກຳນົດວ່າຄົນຈະຢູ່ ຫຼືຍ້າຍອອກ.</p></div></article>
            <article><b>3</b><div><strong>ທຶນມີ—ແຕ່ບໍ່ໄຫຼຫາຄົນທີ່ບໍ່ມີຫຼັກຄ້ຳ</strong><p>ລະບົບທີ່ອີງດິນຄ້ຳ ບໍ່ເໝາະກັບທຸລະກິດເລີ່ມໃໝ່, ບໍລິການດິຈິຕອນ ແລະທຸລະກິດຄົນຮຸ່ນໃໝ່.</p></div></article>
            <article><b>4</b><div><strong>ທຸລະກິດທີ່ “ເຫັນຊັດ” ບໍ່ເທົ່າກັບທີ່ “ຢູ່ລອດທັງໝົດ”</strong><p>ຂະແໜງມີໃບອະນຸຍາດ ແລະໂຄງການລັດອາດຖືກເວົ້າເຖິງຫຼາຍ, ແຕ່ທຸລະກິດຈຳເປັນຈຳນວນຫຼາຍຢູ່ລອດແບບບໍ່ໂດດເດັ່ນ.</p></div></article>
            <article><b>5</b><div><strong>ຕະຫຼາດທຶນມີ—ແຕ່ຍັງບໍ່ເປີດກວ້າງ</strong><p>LSX ມີ 12 ບໍລິສັດອອກຫຼັກຊັບ; ຕະຫຼາດມີຄວາມໝາຍຕໍ່ທຶນໄລຍະຍາວ ແຕ່ SME ສ່ວນໃຫຍ່ຍັງບໍ່ພ້ອມເຂົ້າເຖິງ. <Cite id="bol25" /></p></div></article>
            <article><b>6</b><div><strong>ຄຳກຳລັງກາຍເປັນຫຼັກຄ້ຳທາງການເງິນ</strong><p>ໃບຢັ້ງຢືນຄຳເປີດທາງໃຫ້ຜູ້ຖືຄຳຂໍສິນເຊື່ອໂດຍບໍ່ຕ້ອງຂາຍຄຳ; ແຕ່ບໍ່ແມ່ນທຸກບັນຊີຄຳຈະໄດ້ສິນເຊື່ອອັດຕະໂນມັດ. <Cite id="lbb-certificate" /></p></div></article>
          </div>
        </div>
      </section>

      <section className="section reader-guide" id="reader-guide">
        <div className="section-heading">
          <p className="eyebrow">ເລືອກອ່ານ</p>
          <div>
            <h2>ບໍ່ຈຳເປັນຕ້ອງອ່ານທັງໝົດ</h2>
            <p className="section-intro">ເລືອກເລີ່ມຈາກຄຳຖາມທີ່ທ່ານສົນໃຈ ແລ້ວກົດໄປຫາພາກນັ້ນໄດ້ເລີຍ.</p>
          </div>
        </div>
        <div className="reader-guide-grid">
          <a href="#diagnosis"><span>01</span><strong>ທຸລະກິດລາວຕິດບັນຫາຫຍັງ?</strong><small>ເບິ່ງ 6 ບັນຫາຫຼັກ ແລະທາງອອກ</small></a>
          <a href="#sectors"><span>02</span><strong>ຂະແໜງໃດຢູ່ລອດ?</strong><small>ແຍກຄວາມໂດດເດັ່ນອອກຈາກຄວາມຍືນຍົງ</small></a>
          <a href="#opportunities"><span>03</span><strong>ທຸລະກິດໃດໜ້າເຮັດ?</strong><small>ແບ່ງ 3 ໝວດ: ອາຊີບສ່ວນຕົວ, ທຸລະກິດນ້ອຍ ແລະ entrepreneur</small></a>
          <a href="#capital-market"><span>04</span><strong>LSX ຊ່ວຍລະດົມທຶນແນວໃດ?</strong><small>ຮູ້ຈັກໂອກາດ, ຂັ້ນຕອນ ແລະຂໍ້ຈຳກັດ</small></a>
          <a href="#gold-banking"><span>05</span><strong>ເອົາຄຳໄປຄ້ຳກູ້ໄດ້ແນວໃດ?</strong><small>ອ່ານຂັ້ນຕອນ, ຄວາມສ່ຽງ ແລະ 7 ຄຳຖາມກ່ອນກູ້</small></a>
          <a href="#scam-check"><span>06</span><strong>ແຍກທຸລະກິດຈິງອອກຈາກການຫຼອກລວງແນວໃດ?</strong><small>ກວດສັນຍານແດງ ແລະຫຼັກຖານທີ່ຄວນມີ</small></a>
          <a href="#actions"><span>07</span><strong>ແຕ່ລະຝ່າຍຄວນເຮັດຫຍັງ?</strong><small>ຂໍ້ສະເໜີສຳລັບລັດ, ທະນາຄານ, ທຸລະກິດ ແລະນັກລົງທຶນ</small></a>
        </div>

        <div className="plain-language">
          <div className="plain-language-heading">
            <span>ຄຳສັບທີ່ຄວນຮູ້</span>
            <p>ຄຳອັງກິດບາງຄຳຖືກໃຊ້ໃນວົງການທຸລະກິດໂດຍກົງ. ຄວາມໝາຍໃນບົດນີ້ມີດັ່ງນີ້:</p>
          </div>
          <dl className="term-grid">
            <div><dt>SME / MSME</dt><dd>ທຸລະກິດຂະໜາດຈຸນລະພາກ, ນ້ອຍ ແລະກາງ</dd></div>
            <div><dt>Cash flow</dt><dd>ກະແສເງິນສົດທີ່ເຂົ້າ ແລະອອກຈາກທຸລະກິດ</dd></div>
            <div><dt>Governance</dt><dd>ການບໍລິຫານ, ກົດກາ ແລະການກວດສອບທີ່ໂປ່ງໃສ</dd></div>
            <div><dt>Disclosure</dt><dd>ການເປີດເຜີຍຂໍ້ມູນສຳຄັນໃຫ້ຜູ້ລົງທຶນຮັບຮູ້</dd></div>
            <div><dt>Liquidity</dt><dd>ຄວາມສາມາດປ່ຽນຊັບສິນເປັນເງິນ ຫຼືຊຳລະໜີ້ໄດ້ທັນເວລາ</dd></div>
            <div><dt>LTV</dt><dd>ສັດສ່ວນເງິນກູ້ທຽບກັບມູນຄ່າຫຼັກຄ້ຳ</dd></div>
            <div><dt>Haircut</dt><dd>ສ່ວນຫຼຸດຈາກມູນຄ່າຫຼັກຄ້ຳ ເພື່ອກັນຄວາມສ່ຽງດ້ານລາຄາ</dd></div>
            <div><dt>APR</dt><dd>ຕົ້ນທຶນການກູ້ລວມຕໍ່ປີ ທີ່ລວມດອກເບ້ຍ ແລະຄ່າທຳນຽມ</dd></div>
          </dl>
        </div>
      </section>

      <section className="section snapshot" aria-labelledby="snapshot-title">
        <div className="section-heading">
          <p className="eyebrow">ຕົວເລກສຳຄັນ</p>
          <div>
            <h2 id="snapshot-title">ພາບລວມຈາກຕົວເລກ</h2>
            <p className="section-intro">ຕົວເລກແຕ່ລະອັນເຊື່ອມໄປຫາແຫຼ່ງຂໍ້ມູນດ້ານລຸ່ມ.</p>
          </div>
        </div>
        <div className="metric-grid">
          <article className="metric"><span className="metric-tag">ການເຕີບໂຕ</span><b>4.8%</b><span>GDP ເຕີບໂຕໃນ 2025 <Cite id="wb-jun26" /></span></article>
          <article className="metric"><span className="metric-tag">ໂຄງສ້າງ</span><b>94%</b><span>ວິສາຫະກິດຈົດທະບຽນເປັນລາຍຍ່ອຍ <Cite id="wb-private26" /></span></article>
          <article className="metric"><span className="metric-tag">ທັກສະ</span><b>36%</b><span>ບໍລິສັດເລືອກທັກສະແຮງງານເປັນບັນຫາຫຼັກ <Cite id="wb-private26" /></span></article>
          <article className="metric"><span className="metric-tag">ການຍ້າຍຖິ່ນ</span><b>324k+</b><span>ແຮງງານລາວມີເອກະສານຢູ່ໄທ <Cite id="wb-dec25" /></span></article>
          <article className="metric"><span className="metric-tag">ໜີ້ສິນ</span><b>13%</b><span>ປະມານການພາລະຊຳລະໜີ້ຕໍ່ GDP ໃນ 2026 <Cite id="wb-jun26" /></span></article>
          <article className="metric"><span className="metric-tag">ຄວາມເຊື່ອໝັ້ນ</span><b>34/100</b><span>CPI 2025; ດັດຊະນີການຮັບຮູ້ <Cite id="cpi25" /></span></article>
        </div>
      </section>

      <section className="section data-story">
        <div className="section-heading">
          <p className="eyebrow">ຂໍ້ມູນບອກຫຍັງ</p>
          <h2>ເຕີບໂຕ—ແຕ່ຂໍ້ຈຳກັດຍັງຢູ່</h2>
        </div>
        <div className="chart-grid">
          <article className="chart-card growth-chart">
            <header><span>ການເຕີບໂຕຂອງ GDP ແທ້ຈິງ</span><small>% ຕໍ່ປີ</small></header>
            <div className="columns" aria-label="GDP ເຕີບໂຕ 2024 ຫາ 2026">
              <div className="column-item"><span>4.1%</span><div style={{ height: "68%" }}></div><small>2024</small></div>
              <div className="column-item highlight"><span>4.8%</span><div style={{ height: "80%" }}></div><small>2025</small></div>
              <div className="column-item projected"><span>3.8%</span><div style={{ height: "63%" }}></div><small>2026*</small></div>
            </div>
            <footer>* ປີ 2026 ເປັນຄາດຄະເນ. <Cite id="wb-jun26" /></footer>
          </article>
          <article className="chart-card barrier-chart">
            <header><span>ອຸປະສັກອັນດັບໜຶ່ງຂອງບໍລິສັດ</span><small>% ຂອງບໍລິສັດ</small></header>
            <div className="bars">
              {barriers.map((item) => (
                <div className="bar-row" key={item.label}>
                  <span>{item.label}</span>
                  <div className="bar-track"><i style={{ width: `${(item.value / 40) * 100}%` }}></i></div>
                  <b>{item.value}%</b>
                </div>
              ))}
            </div>
            <footer>World Bank Enterprise Survey 2024. <Cite id="wb-private26" /></footer>
          </article>
        </div>
      </section>

      <section className="section diagnosis" id="diagnosis">
        <div className="section-heading">
          <p className="eyebrow">01 · ວິນິດໄສບັນຫາ</p>
          <div>
            <h2>ກົດເປີດເບິ່ງບັນຫາແຕ່ລະຊັ້ນ</h2>
            <p className="section-intro">ເລືອກມຸມມອງ ຫຼືເປີດອ່ານການວິນິດໄສ, ຫຼັກຖານ, ວົງຈອນຜົນກະທົບ ແລະທາງອອກ.</p>
          </div>
        </div>
        <div className="filter-row" role="group" aria-label="ກັ່ນຕອງປະເດັນ">
          {([
            ["all", "ທັງໝົດ"],
            ["system", "ລະບົບ"],
            ["business", "ຜູ້ປະກອບການ"],
            ["risk", "ຄວາມສ່ຽງ"],
          ] as [Theme, string][]).map(([key, label]) => (
            <button key={key} className={theme === key ? "active" : ""} onClick={() => setTheme(key)}>{label}</button>
          ))}
        </div>
        <div className="accordion-list">
          {visiblePillars.map((pillar, index) => (
            <details className="pillar" key={pillar.id} open={theme !== "all" || index === 0}>
              <summary>
                <span className="pillar-no">{pillar.no}</span>
                <span className="pillar-title">{pillar.title}<small>{pillar.summary}</small></span>
                <span className="risk-pill">ຄວາມສ່ຽງ {pillar.risk}</span>
                <span className="plus" aria-hidden="true">＋</span>
              </summary>
              <div className="pillar-body">
                <div className="evidence-block">
                  <h3>ຫຼັກຖານ</h3>
                  <ul>{pillar.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                  <div className="inline-refs">ອ້າງອີງ: {pillar.refs.map((ref) => <Cite id={ref} key={ref} />)}</div>
                </div>
                <div className="impact-block">
                  <h3>ວົງຈອນຜົນກະທົບ</h3>
                  <p>{pillar.impact}</p>
                </div>
                <div className="response-block">
                  <h3>ທາງຕອບສະໜອງ</h3>
                  <p>{pillar.response}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="photo-break">
        <img src={`${basePath}/laos-weaver.jpg`} alt="ແຮງງານລາວກຳລັງທໍຜ້າດ້ວຍເຄື່ອງ" />
        <div className="photo-overlay">
          <p>“ທຸລະກິດບໍ່ໄດ້ແຂ່ງຂັນພຽງລາຄາ—ແຕ່ແຂ່ງຂັນເພື່ອຮັກສາຄົນ.”</p>
          <span>ຮູບ: World Bank / Stanislas Fradelizi</span>
        </div>
      </section>

      <section className="section sectors" id="sectors">
        <div className="section-heading">
          <p className="eyebrow">02 · ໃຜຢູ່ລອດ?</p>
          <div>
            <h2>ເປັນຫຍັງບາງທຸລະກິດຈຶ່ງເຫັນວ່າຢູ່ລອດ</h2>
            <p className="section-intro">ຄຳວ່າ “ຢູ່ລອດ” ຄວນແຍກລະຫວ່າງກະແສເງິນສົດດີ, ກຳໄລຍືນຍົງ, ມີການປົກປ້ອງ ແລະສ້າງມູນຄ່າໃຫ້ເສດຖະກິດ.</p>
          </div>
        </div>
        <div className="sector-grid">
          <article className="sector-card dark">
            <span className="sector-index">A</span>
            <h3>ຫວຍ / ການພະນັນ</h3>
            <p>ຮັບເງິນສົດໄວ ແລະຄວາມຕ້ອງການອາດບໍ່ຫຼຸດຕາມລາຍຮັບ. ແຕ່ສ້າງຜະລິດຕະພາບແລະວຽກຄຸນນະພາບຈຳກັດ.</p>
            <div className="sector-score"><span>ກະແສເງິນສົດ</span><i className="high"></i><span>ປະໂຫຍດສາທາລະນະ</span><i className="low"></i></div>
          </article>
          <article className="sector-card">
            <span className="sector-index">B</span>
            <h3>ທະນາຄານ / ການເງິນ</h3>
            <p>ເປັນໂຄງລ່າງຈຳເປັນຂອງເສດຖະກິດ. ແຕ່ລະບົບຍັງກະຈຸກຕົວ ແລະມີຄວາມສ່ຽງດ້ານສະພາບຄ່ອງ, ອັດຕາແລກປ່ຽນ, ສິນເຊື່ອ ແລະເງິນກອງທຶນ. <Cite id="imf26" /></p>
            <div className="sector-score"><span>ຂໍ້ກີດຂວາງການເຂົ້າ</span><i className="high"></i><span>ບົດບາດຕໍ່ລະບົບ</span><i className="high"></i></div>
          </article>
          <article className="sector-card warn">
            <span className="sector-index">C</span>
            <h3>ລະດົມທຶນ</h3>
            <p>ບໍ່ແມ່ນທຸກການລະດົມທຶນເປັນການຫຼອກລວງ. ບັນຫາແມ່ນການເປີດເຜີຍຂໍ້ມູນ, ໃບອະນຸຍາດ, ການນຳເງິນໄປໃຊ້ ແລະຜົນຕອບແທນທີ່ຮັບປະກັນ.</p>
            <div className="sector-score"><span>ຄວາມສ່ຽງດ້ານຄວາມເຊື່ອໝັ້ນ</span><i className="high"></i><span>ມູນຄ່າທີ່ອາດສ້າງໄດ້</span><i className="mid"></i></div>
          </article>
          <article className="sector-card">
            <span className="sector-index">D</span>
            <h3>ໂຄງການລັດ / ດິຈິຕອນ</h3>
            <p>ມູນຄ່າສັນຍາສູງ ແລະສ້າງໂຄງລ່າງໄດ້. ຄວາມສ່ຽງຢູ່ທີ່ການປະມູນ, ການຈ່າຍຊ້າ, ການຜູກຂາດກັບຜູ້ສະໜອງລາຍດຽວ ແລະເຄືອຂ່າຍ.</p>
            <div className="sector-score"><span>ຂະໜາດສັນຍາ</span><i className="high"></i><span>ຄວາມເທົ່າທຽມໃນການເຂົ້າເຖິງ</span><i className="low"></i></div>
          </article>
        </div>

        <aside className="reality-check">
          <div><span>ອີກດ້ານຂອງຄວາມຈິງ</span><h3>ຂະແໜງທີ່ຢູ່ລອດແບບ “ບໍ່ດັງ”</h3></div>
          <ul>
            <li>ອາຫານແລະສິນຄ້າຈຳເປັນ</li>
            <li>ສ້ອມແປງແລະບຳລຸງຮັກສາ</li>
            <li>ກະສິກຳແປຮູບ ແລະລະບົບຮັກສາຄວາມເຢັນ</li>
            <li>ການຂົນສົ່ງສະເພາະທາງ</li>
            <li>ສຸຂະພາບແລະການສຶກສາ</li>
            <li>ບໍລິການດິຈິຕອນໃຫ້ທຸລະກິດ ແລະບໍລິການສົ່ງອອກ</li>
          </ul>
        </aside>
      </section>

      <section className="section opportunities" id="opportunities">
        <div className="section-heading">
          <p className="eyebrow">03 · ໂອກາດທຸລະກິດ</p>
          <div>
            <h2>6 ທຸລະກິດທີ່ພໍມີໂອກາດເຕີບໂຕໃນລາວ</h2>
            <p className="section-intro">ບັນຊີນີ້ບໍ່ແມ່ນການຮັບປະກັນກຳໄລ. ມັນແມ່ນການຄັດເລືອກຈາກຄວາມຕ້ອງການຈຳເປັນ, ທ່າແຮງຂອງຂະແໜງ ແລະຂໍ້ຈຳກັດດ້ານກຳລັງຊື້, ເງິນຕາ ແລະແຮງງານ. <Cite id="wb-jun26" /><Cite id="adb-outlook26" /></p>
          </div>
        </div>

        <div className="business-categories" aria-label="3 ໝວດຮູບແບບທຸລະກິດ">
          <article className="category-self">
            <span>ໝວດ 01</span>
            <h3>ອາຊີບສ່ວນຕົວ</h3>
            <p>ເຈົ້າຂອງຂາຍທັກສະ ແລະເວລາຂອງຕົນເອງ. ເລີ່ມງ່າຍ ແຕ່ລາຍຮັບສ່ວນໃຫຍ່ຢຸດເມື່ອເຈົ້າຂອງພັກ.</p>
            <b>Holiday test: ລາຍຮັບຢຸດ</b>
          </article>
          <article className="category-small">
            <span>ໝວດ 02</span>
            <h3>ທຸລະກິດນ້ອຍ</h3>
            <p>ມີທີມງານ, ໜ້າທີ່ ແລະຂັ້ນຕອນພື້ນຖານ. ເຈົ້າຂອງພັກໄດ້ໄລຍະສັ້ນ ແຕ່ຍັງຕ້ອງກັບມາຕັດສິນໃຈຫຼາຍເລື່ອງ.</p>
            <b>Holiday test: ຍັງຂາຍໄດ້ໄລຍະສັ້ນ</b>
          </article>
          <article className="category-entrepreneur">
            <span>ໝວດ 03</span>
            <h3>ທຸລະກິດແບບ entrepreneur</h3>
            <p>ລາຍຮັບມາຈາກລະບົບ, ທີມ, ຍີ່ຫໍ້, ຂໍ້ມູນ, ເທັກໂນໂລຊີ ຫຼືເຄືອຂ່າຍ ແລະສາມາດຂະຫຍາຍໂດຍບໍ່ເພີ່ມເວລາເຈົ້າຂອງຕາມສັດສ່ວນ.</p>
            <b>30-day test: ລະບົບຍັງເຮັດວຽກ</b>
          </article>
        </div>

        <div className="opportunity-rules" aria-label="ຫຼັກຄັດເລືອກໂອກາດທຸລະກິດ">
          <article><b>01</b><strong>ແກ້ບັນຫາຈຳເປັນ</strong><span>ລູກຄ້າຍັງຕ້ອງໃຊ້ ເຖິງແມ່ນກຳລັງຊື້ຈະອ່ອນລົງ</span></article>
          <article><b>02</b><strong>ຮັບເງິນໄວ</strong><span>ຮອບເງິນສັ້ນ ແລະບໍ່ປ່ອຍເຄຣດິດຍາວເກີນໄປ</span></article>
          <article><b>03</b><strong>ພຶ່ງນຳເຂົ້າໜ້ອຍ</strong><span>ໃຊ້ວັດຖຸດິບພາຍໃນ ຫຼືມີລາຍຮັບເງິນຕາຕ່າງປະເທດ</span></article>
          <article><b>04</b><strong>ເລີ່ມນ້ອຍໄດ້</strong><span>ຄ່າເຊົ່າ, ໜີ້ ແລະຈຳນວນພະນັກງານຄວນຢູ່ໃນລະດັບຄວບຄຸມໄດ້</span></article>
        </div>

        <div className="opportunity-grid">
          <article className="opportunity-card featured">
            <header><span>01 · ເໝາະກັບຜູ້ເລີ່ມຕົ້ນ</span><b className="category-chip">ອາຊີບສ່ວນຕົວ</b></header>
            <h3>ສ້ອມແປງ ແລະບຳລຸງຮັກສາ</h3>
            <p>ແອ, ຕູ້ເຢັນ, ປ້ຳນ້ຳ, ເຄື່ອງຈັກກະສິກຳ, ລະບົບໄຟ, ໂຊລາ ແລະລົດໄຟຟ້າ ລ້ວນຕ້ອງການຊ່າງທີ່ໄວ້ໃຈໄດ້.</p>
            <dl><div><dt>ເລີ່ມແນວໃດ</dt><dd>ເລືອກຊ່າງສະເພາະ 1 ຢ່າງ, ອອກບໍລິການນອກສະຖານທີ່ ແລະຂາຍສັນຍາບຳລຸງລາຍປີ.</dd></div><div><dt>ລະວັງ</dt><dd>ອາໄຫຼ່ປອມ, ການຮັບປະກັນງານ ແລະການຫາຊ່າງຝີມື.</dd></div></dl>
          </article>

          <article className="opportunity-card">
            <header><span>02 · ສ້າງມູນຄ່າໃນລາວ</span><b className="category-chip">ທຸລະກິດນ້ອຍ</b></header>
            <h3>ກະສິກຳແປຮູບ ແລະບັນຈຸຫີບຫໍ່</h3>
            <p>ການຄັດຂະໜາດ, ຕາກແຫ້ງ, ແຊ່ເຢັນ, ບັນຈຸ ແລະສົ່ງຫາຕະຫຼາດ ຊ່ວຍຫຼຸດການເສຍຫາຍ ແລະເພີ່ມລາຄາໃຫ້ຜົນຜະລິດ. <Cite id="wb-poverty26" /><Cite id="wb-private26" /></p>
            <dl><div><dt>ເລີ່ມແນວໃດ</dt><dd>ຫາຜູ້ຊື້ກ່ອນ, ເລືອກພືດພຽງ 1–2 ຊະນິດ ແລະຈ້າງຜະລິດກ່ອນຊື້ເຄື່ອງ.</dd></div><div><dt>ລະວັງ</dt><dd>ຄຸນນະພາບບໍ່ຄົງທີ່, ລະດູການ, ມາດຕະຖານອາຫານ ແລະການຮັບຊື້ທີ່ບໍ່ມີສັນຍາ.</dd></div></dl>
          </article>

          <article className="opportunity-card">
            <header><span>03 · ລົງທຶນຄົງທີ່ຕ່ຳ</span><b className="category-chip">ທຸລະກິດນ້ອຍ</b></header>
            <h3>ບໍລິການຫຼັງບ້ານໃຫ້ SME</h3>
            <p>ຮັບເຮັດບັນຊີ, ພາສີ, ເງິນເດືອນ, ຄຸ້ມສະຕັອກ, POS, ກວດຍອດ QR ແລະວາງແຜນກະແສເງິນສົດ.</p>
            <dl><div><dt>ເລີ່ມແນວໃດ</dt><dd>ສ້າງແພັກເກດລາຍເດືອນສຳລັບຮ້ານນ້ອຍ ແລະລາຍງານຜົນແບບອ່ານງ່າຍ.</dd></div><div><dt>ລະວັງ</dt><dd>ຄວາມລັບຂອງລູກຄ້າ, ຄວາມຖືກຕ້ອງທາງພາສີ ແລະການເກັບຄ່າບໍລິການ.</dd></div></dl>
          </article>

          <article className="opportunity-card">
            <header><span>04 · ເກາະຕາມການເຊື່ອມຕໍ່</span><b className="category-chip">ທຸລະກິດນ້ອຍ</b></header>
            <h3>ໂລຈິສຕິກສະເພາະທາງ</h3>
            <p>ຮວບຮວມສິນຄ້າ, ສາງຂະໜາດນ້ອຍ, ເອກະສານຂ້າມແດນ, ຂົນສົ່ງເຢັນ ແລະສົ່ງຮອບສຸດທ້າຍ ມີໂອກາດຕາມການຄ້າແລະລົດໄຟ. <Cite id="adb-outlook26" /><Cite id="adb-integration" /></p>
            <dl><div><dt>ເລີ່ມແນວໃດ</dt><dd>ຈັບລູກຄ້າກຸ່ມດຽວ ແລະເຊົ່າລົດຕາມຖ້ຽວ ກ່ອນຊື້ລົດຈຳນວນຫຼາຍ.</dd></div><div><dt>ລະວັງ</dt><dd>ນ້ຳມັນ, ຖ້ຽວກັບບໍ່ມີສິນຄ້າ, ພາສີ–ດ່ານ ແລະໜີ້ຊື້ລົດ.</dd></div></dl>
          </article>

          <article className="opportunity-card">
            <header><span>05 · ລາຍຮັບຈາກນັກທ່ອງທ່ຽວ</span><b className="category-chip">ທຸລະກິດນ້ອຍ</b></header>
            <h3>ບໍລິການໜູນທ່ອງທ່ຽວ</h3>
            <p>ປະສົບການທ້ອງຖິ່ນ, ຈອງອອນລາຍ, ເນື້ອຫາຫຼາຍພາສາ, ລົດຮັບສົ່ງ ແລະສິນຄ້າສະໜອງໂຮງແຮມ ສາມາດເກາະກັບການຟື້ນຕົວຂອງການທ່ອງທ່ຽວ. <Cite id="wb-jun26" /><Cite id="adb-outlook26" /></p>
            <dl><div><dt>ເລີ່ມແນວໃດ</dt><dd>ຮ່ວມກັບໂຮງແຮມ 3–5 ແຫ່ງ, ທົດລອງທົວສັ້ນ ຫຼືສິນຄ້າສະໜອງພຽງຢ່າງດຽວ.</dd></div><div><dt>ລະວັງ</dt><dd>ລະດູການ, ຣີວິວອອນລາຍ, ຄວາມປອດໄພ ແລະການພຶ່ງຕະຫຼາດດຽວ.</dd></div></dl>
          </article>

          <article className="opportunity-card">
            <header><span>06 · ແກ້ບັນຫາຂາດຄົນ</span><b className="category-chip">ທຸລະກິດນ້ອຍ</b></header>
            <h3>ຝຶກອາຊີບທີ່ເຊື່ອມກັບວຽກ</h3>
            <p>ຫຼັກສູດຊ່າງໄຟ, ຄວາມເຢັນ, ບັນຊີ, ຂາຍ, ໂຮງແຮມ ແລະພາສາ ມີຄຸນຄ່າເມື່ອຜູ້ຮຽນເຫັນທາງໄປຫາວຽກຈິງ. <Cite id="wb-private26" /><Cite id="wb-poverty26" /></p>
            <dl><div><dt>ເລີ່ມແນວໃດ</dt><dd>ຫານາຍຈ້າງຮ່ວມອອກຫຼັກສູດ ແລະຮັບຝຶກງານ ກ່ອນເປີດຮັບນັກຮຽນ.</dd></div><div><dt>ລະວັງ</dt><dd>ຢ່າຮັບປະກັນວຽກຖ້າບໍ່ມີສັນຍາ; ຕ້ອງວັດຜົນຈາກການໄດ້ວຽກແລະລາຍຮັບ.</dd></div></dl>
          </article>
        </div>

        <div className="entrepreneur-path">
          <div className="entrepreneur-heading">
            <span>ໝວດ 03 · ENTREPRENEUR</span>
            <div>
              <h3>ບໍ່ຈຳເປັນຕ້ອງປ່ຽນຂະແໜງ—ແຕ່ຕ້ອງປ່ຽນຈາກ “ເຮັດເອງ” ເປັນ “ສ້າງລະບົບ”</h3>
              <p>6 ແນວຄິດເດີມສາມາດພັດທະນາໄປເປັນທຸລະກິດແບບ entrepreneur ໄດ້ ຖ້າລາຍຮັບຜູກກັບລະບົບ ແທນທີ່ຈະຜູກກັບເວລາຂອງຜູ້ກໍ່ຕັ້ງ.</p>
            </div>
          </div>
          <div className="entrepreneur-grid">
            <article><b>01</b><h4>ເຄືອຂ່າຍຊ່າງມາດຕະຖານ</h4><p>ລະບົບຈອງ, ກຳນົດລາຄາ, ກວດຄຸນນະພາບ ແລະສັນຍາບຳລຸງລາຍປີ.</p><small>ລາຍຮັບ: ຄ່າສະມາຊິກ + ສ່ວນແບ່ງຈາກງານ</small></article>
            <article><b>02</b><h4>ຍີ່ຫໍ້ກະສິກຳແລະເຄືອຂ່າຍຮັບຊື້</h4><p>ມາດຕະຖານຜົນຜະລິດ, ຄູ່ສັນຍາຊາວກະສິກອນ, ຜະລິດ, ບັນຈຸ ແລະກະຈາຍພາຍໃຕ້ຍີ່ຫໍ້ດຽວ.</p><small>ລາຍຮັບ: ອັດຕາກຳໄລຈາກຍີ່ຫໍ້ແລະການກະຈາຍ</small></article>
            <article><b>03</b><h4>ຊອບແວບໍລິຫານ SME</h4><p>ປ່ຽນບັນຊີ, POS, ສະຕັອກ, QR ແລະເງິນເດືອນ ເປັນບໍລິການມາດຕະຖານທີ່ລູກຄ້າໃຊ້ເອງໄດ້.</p><small>ລາຍຮັບ: subscription ລາຍເດືອນ</small></article>
            <article><b>04</b><h4>ແພລດຟອມປະສານໂລຈິສຕິກ</h4><p>ເຊື່ອມຜູ້ມີສິນຄ້າ, ລົດ, ສາງ ແລະບໍລິການດ່ານ ໂດຍບໍ່ຈຳເປັນຕ້ອງຖືຄອງລົດທຸກຄັນ.</p><small>ລາຍຮັບ: ຄ່າທຳນຽມຕໍ່ທຸລະກຳ</small></article>
            <article><b>05</b><h4>ຕະຫຼາດຈອງທ່ອງທ່ຽວລາວ</h4><p>ລວບລວມທີ່ພັກ, ລົດ, ຜູ້ນຳທ່ຽວ ແລະປະສົບການທ້ອງຖິ່ນ ໃຫ້ຈອງແລະຈ່າຍໃນຈຸດດຽວ.</p><small>ລາຍຮັບ: commission ຈາກການຈອງ</small></article>
            <article><b>06</b><h4>ລະບົບຝຶກທັກສະແລະຈັດຫາງານ</h4><p>ຫຼັກສູດມາດຕະຖານ, ຄູຝຶກ, ໃບຮັບຮອງ ແລະເຄືອຂ່າຍນາຍຈ້າງທີ່ຮັບຄົນຈາກລະບົບ.</p><small>ລາຍຮັບ: ຄ່າຮຽນ + ຄ່າຈັດຫາຄົນ</small></article>
          </div>
          <aside className="founder-test"><strong>Founder-independence test</strong><span>ຖ້າຜູ້ກໍ່ຕັ້ງພັກ 30 ມື້ ທີມຍັງຂາຍ, ສົ່ງມອບ, ເກັບເງິນ ແລະແກ້ບັນຫາໄດ້ບໍ?</span></aside>
        </div>

        <div className="opportunity-bottom">
          <article className="starter-picks">
            <span>ຖ້າເລີ່ມເປັນຄັ້ງທຳອິດ</span>
            <h3>3 ອັນທີ່ຄວນທົດລອງກ່ອນ</h3>
            <ol><li><b>ສ້ອມແປງ</b> — ເຫັນຄວາມຕ້ອງການຊັດ ແລະຮັບເງິນໄວ</li><li><b>ບໍລິການ SME</b> — ໃຊ້ທັກສະຫຼາຍກວ່າເງິນລົງທຶນ</li><li><b>ກະສິກຳແປຮູບ</b> — ເລີ່ມເມື່ອມີຜູ້ຊື້ທີ່ຢືນຢັນແລ້ວ</li></ol>
          </article>
          <article className="caution-list">
            <span>ຄວນລະວັງ</span>
            <h3>ຢ່າເລີ່ມຈາກຕົ້ນທຶນໃຫຍ່</h3>
            <ul><li>ຮ້ານກາເຟ ຫຼືຮ້ານອາຫານທົ່ວໄປທີ່ບໍ່ມີຈຸດຕ່າງ</li><li>ຂາຍຍ່ອຍທີ່ສະຕັອກຂອງນຳເຂົ້າຫຼາຍ</li><li>ຊື້ລົດ ຫຼືສ້າງໂຮງງານດ້ວຍໜີ້ ກ່ອນມີສັນຍາລູກຄ້າ</li><li>ທຸລະກິດໃຊ້ຄົນຫຼາຍແຕ່ກຳໄລບາງ</li><li>ລະດົມທຶນ, ປ່ອຍກູ້ ຫຼື fintech ໂດຍບໍ່ມີໃບອະນຸຍາດ</li></ul>
          </article>
        </div>

        <aside className="validation-strip">
          <strong>ກ່ອນລົງເງິນ:</strong>
          <span>ສຳພາດລູກຄ້າ 15–20 ຄົນ</span><i>→</i><span>ທົດລອງຂາຍແບບນ້ອຍ</span><i>→</i><span>ເກັບຄຳສັ່ງຊື້ ຫຼືເງິນມັດຈຳ</span><i>→</i><span>ຈຶ່ງຊື້ອຸປະກອນໃຫຍ່</span>
        </aside>
        <p className="opportunity-note">ຂໍ້ມູນນີ້ເປັນກອບຄິດເບື້ອງຕົ້ນ ບໍ່ແມ່ນຄຳແນະນຳການລົງທຶນ. ຜົນຈິງຂຶ້ນກັບແຂວງ, ລູກຄ້າ, ຄູ່ແຂ່ງ, ໃບອະນຸຍາດ ແລະຄວາມສາມາດຂອງຜູ້ປະກອບການ.</p>
      </section>

      <section className="section capital-market" id="capital-market">
        <div className="section-heading">
          <p className="eyebrow">ຕະຫຼາດທຶນ · LSX</p>
          <div>
            <h2>ຕະຫຼາດທຶນລາວ: ຊ່ອງທາງລະດົມທຶນທີ່ຍັງບໍ່ເຕັມສັກກະຍະພາບ</h2>
            <p className="section-intro">ການມີຕະຫຼາດຫຼັກຊັບບໍ່ໄດ້ໝາຍຄວາມວ່າທຸລະກິດທຸກຂະໜາດສາມາດເຂົ້າເຖິງທຶນໄດ້. ຄຳຖາມຫຼັກແມ່ນ: ໃຜພ້ອມອອກຫຼັກຊັບ, ໃຜພ້ອມລົງທຶນ ແລະຕະຫຼາດຮອງມີສະພາບຄ່ອງພຽງໃດ.</p>
          </div>
        </div>

        <div className="capital-thesis">
          <span>ຂໍ້ຄົ້ນພົບຫຼັກ</span>
          <p>LSX ເປັນຊ່ອງທາງທຶນທີ່ສຳຄັນ ແຕ່ຍັງບໍ່ແມ່ນຊ່ອງທາງທຶນທີ່ເປີດກວ້າງສຳລັບຜູ້ປະກອບການລາວສ່ວນໃຫຍ່.</p>
        </div>

        <div className="capital-stat-grid">
          <article>
            <span>ຜູ້ອອກຫຼັກຊັບ</span>
            <b>12</b>
            <p>ຈຳນວນບໍລິສັດອອກຫຼັກຊັບທີ່ LSC ແລະ BOL ລາຍງານ. <Cite id="lsc-issuers" /></p>
          </article>
          <article className="capital-stat-feature">
            <span>ທຶນສະສົມ</span>
            <b>67,815.55</b>
            <small>ຕື້ກີບ · 21% ຂອງ GDP ປີ 2024</small>
            <p>ທຶນສະສົມຈາກຮຸ້ນ, ພັນທະບັດບໍລິສັດ ແລະພັນທະບັດລັດ. <Cite id="bol25" /></p>
          </article>
          <article>
            <span>ມູນຄ່າຊື້ຂາຍປີ 2025</span>
            <b>216.76</b>
            <small>ຕື້ກີບ · ເພີ່ມ 628.07% ຈາກປີກ່ອນ</small>
            <p>ການເຕີບໄວແມ່ນສັນຍານບວກ, ແຕ່ອາດສະທ້ອນຖານປຽບທຽບທີ່ຕ່ຳ. <Cite id="bol25" /></p>
          </article>
          <article>
            <span>ສັດສ່ວນນັກລົງທຶນຕ່າງປະເທດ</span>
            <b>17.84%</b>
            <p>ສັດສ່ວນການຊື້ຂາຍຂອງນັກລົງທຶນຕ່າງປະເທດໃນມູນຄ່າຊື້ຂາຍລວມປີ 2025. <Cite id="bol25" /></p>
          </article>
        </div>

        <div className="capital-columns">
          <article className="capital-case">
            <span>ເປັນຫຍັງຈຶ່ງສຳຄັນ</span>
            <h3>ຕະຫຼາດທຶນຊ່ວຍແກ້ຈຸດອ່ອນຂອງລະບົບທີ່ອີງທະນາຄານ</h3>
            <ul>
              <li>ເພີ່ມທຶນໄລຍະຍາວ ໂດຍບໍ່ຕ້ອງອີງດິນຄ້ຳຢ່າງດຽວ</li>
              <li>ຊ່ວຍໃຫ້ລັດແລະບໍລິສັດກະຈາຍແຫຼ່ງລະດົມທຶນ</li>
              <li>ຜັກດັນບັນຊີ, ການກວດສອບ, ການບໍລິຫານ ແລະການເປີດເຜີຍຂໍ້ມູນໃຫ້ເປັນລະບົບ</li>
              <li>ສ້າງລາຄາອ້າງອີງຂອງທຶນ ແລະພັນທະບັດໃນປະເທດ</li>
            </ul>
          </article>
          <article className="capital-friction">
            <span>ເປັນຫຍັງການເຂົ້າເຖິງຍັງຈຳກັດ</span>
            <h3>ຊ່ອງຫວ່າງບໍ່ໄດ້ຢູ່ທີ່ຕະຫຼາດພຽງຢ່າງດຽວ</h3>
            <ul>
              <li>SME ຫຼາຍແຫ່ງຍັງບໍ່ມີບັນຊີມາດຕະຖານ ຫຼືງົບທີ່ກວດສອບໄດ້</li>
              <li>ຄ່າກວດສອບບັນຊີ, ກົດໝາຍ, ທີ່ປຶກສາ ແລະການເປີດເຜີຍຕໍ່ເນື່ອງ ອາດສູງເມື່ອທຽບກັບຂະໜາດກິດຈະການ</li>
              <li>ຈຳນວນຫຼັກຊັບໜ້ອຍ ແລະຖານນັກລົງທຶນຈຳກັດ ກະທົບການຊື້ຂາຍຕໍ່ເນື່ອງ</li>
              <li>+628.07% ເປັນອັດຕາເຕີບໂຕ; ບໍ່ຄວນອ່ານເປັນຫຼັກຖານວ່າສະພາບຄ່ອງສູງແລ້ວ</li>
            </ul>
          </article>
        </div>

        <div className="capital-path" aria-label="ເສັ້ນທາງການລະດົມທຶນທີ່ມີການກຳກັບ">
          <article><b>01</b><h3>ເຂົ້າລະບົບ</h3><p>ແຍກບັນຊີ, ພາສີ, ຄວາມເປັນເຈົ້າຂອງ ແລະກະແສເງິນສົດໃຫ້ຊັດ.</p></article>
          <article><b>02</b><h3>ກຽມຄວາມພ້ອມ</h3><p>ກວດສອບງົບ, ການບໍລິຫານ, ຄະນະບໍລິຫານ ແລະລະບົບກວດກາພາຍໃນ.</p></article>
          <article><b>03</b><h3>ຂໍອະນຸມັດ</h3><p>ຈັດເຮັດເອກະສານສະເໜີຂາຍ ແລະຜ່ານຂັ້ນຕອນຜູ້ກຳກັບ.</p></article>
          <article><b>04</b><h3>ອອກຫຼັກຊັບ</h3><p>ອອກຮຸ້ນ ຫຼືພັນທະບັດຜ່ານຕົວກາງທີ່ມີໃບອະນຸຍາດ.</p></article>
          <article><b>05</b><h3>ເປີດເຜີຍຂໍ້ມູນ</h3><p>ເປີດເຜີຍຜົນງານແລະເຫດການສຳຄັນຢ່າງຕໍ່ເນື່ອງ.</p></article>
        </div>

        <div className="capital-regulated">
          <article>
            <span>ການລະດົມທຶນທີ່ມີການກຳກັບ</span>
            <h3>ຄວາມຊອບທຳບໍ່ໄດ້ມາຈາກຄຳໂຄສະນາ</h3>
            <p>ຄວນມີໜັງສືຊີ້ຊວນ ຫຼືເອກະສານສະເໜີຂາຍ, ການອະນຸມັດ, ຕົວກາງທີ່ມີໃບອະນຸຍາດ, ລະບົບຮັກສາຊັບສິນ ແລະການເປີດເຜີຍຕໍ່ເນື່ອງ. <Cite id="lsc-securities" /><Cite id="lsx-disclosure" /></p>
          </article>
          <article>
            <span>ໂຄງລ່າງຕະຫຼາດ</span>
            <h3>LSX ແມ່ນສະຖາບັນຮ່ວມລາວ–ເກົາຫຼີ</h3>
            <p>LSX ເລີ່ມຕັ້ງໃນປີ 2010; BOL ຖື 51% ແລະ Korea Exchange ຖື 49%. ຜະລິດຕະພັນລວມມີຮຸ້ນແລະພັນທະບັດລັດ, ດ້ວຍການຊຳລະແບບ T+2. <Cite id="set-lsx" /></p>
          </article>
        </div>

        <div className="capital-agenda">
          <article><b>01</b><h3>ກະດານສຳລັບ SME</h3><p>ກຳນົດຂັ້ນຕອນທີ່ເໝາະກັບບໍລິສັດກາງ ໂດຍຍັງຮັກສາການເປີດເຜີຍ ແລະການຄຸ້ມຄອງນັກລົງທຶນ.</p></article>
          <article><b>02</b><h3>ກຽມຄວາມພ້ອມຈົດທະບຽນ</h3><p>ຊ່ວຍບໍລິສັດກຽມບັນຊີ, ການກວດສອບ, ການບໍລິຫານ ແລະຄັງເອກະສານກ່ອນເຂົ້າຕະຫຼາດ.</p></article>
          <article><b>03</b><h3>ພັນທະບັດບໍລິສັດ</h3><p>ພັດທະນາການຈັດອັນດັບຄວາມໜ້າເຊື່ອຖື, ຜູ້ແທນຜູ້ຖືພັນທະບັດ, ເງື່ອນໄຂສັນຍາ ແລະຂໍ້ມູນລາຄາ. <Cite id="adb-capital26" /></p></article>
          <article><b>04</b><h3>ນັກລົງທຶນສະຖາບັນ</h3><p>ຂະຫຍາຍກອງທຶນ, ປະກັນໄພ ແລະເງິນບຳນານທີ່ລົງທຶນໄລຍະຍາວຕາມກອບຄວາມສ່ຽງ.</p></article>
          <article><b>05</b><h3>ຂໍ້ມູນຕະຫຼາດ</h3><p>ເປີດຂໍ້ມູນການຊື້ຂາຍ, ການເປີດເຜີຍ, ເຫດການສຳຄັນຂອງບໍລິສັດ ແລະບົດຄົ້ນຄວ້າໃຫ້ຄົ້ນຫາງ່າຍ.</p></article>
          <article><b>06</b><h3>ຄວາມເຊື່ອໝັ້ນ ແລະການບັງຄັບ</h3><p>ບັງຄັບການເປີດເຜີຍ, ກົດກາທຸລະກຳກັບພາກສ່ວນກ່ຽວຂ້ອງ ແລະການບໍລິຫານຢ່າງສະໝ່ຳສະເໝີ.</p></article>
        </div>

        <p className="capital-note"><b>ຂໍ້ຄວນລະວັງ:</b> ຕົວເລກ +628.07% ແມ່ນຂໍ້ມູນທາງການ; ການຕີຄວາມວ່າອາດມາຈາກຖານປຽບທຽບທີ່ຕ່ຳແມ່ນຂໍ້ວິເຄາະຂອງຜູ້ຂຽນ. ບົດນີ້ບໍ່ແມ່ນຄຳແນະນຳຊື້–ຂາຍຫຼັກຊັບ.</p>
      </section>

      <section className="section gold-banking" id="gold-banking">
        <div className="section-heading">
          <p className="eyebrow">ທະນາຄານຄຳ · ຫຼັກຄ້ຳ</p>
          <div>
            <h2>ທະນາຄານຄຳ: ປ່ຽນຊັບສິນທີ່ເກັບໄວ້ ເປັນຫຼັກຄ້ຳສິນເຊື່ອ</h2>
            <p className="section-intro">ນີ້ແມ່ນນະວັດຕະກຳທາງການເງິນທີ່ໜ້າຈັບຕາ: ຄຳທີ່ເຄີຍນອນຢູ່ນອກລະບົບ ສາມາດຖືກກວດ, ຝາກ, ອອກໃບຢັ້ງຢືນ ແລະນຳໄປຄ້ຳສິນເຊື່ອ. ແຕ່ສິນເຊື່ອຍັງຂຶ້ນກັບການອະນຸມັດແລະສັນຍາຂອງຜູ້ໃຫ້ກູ້.</p>
          </div>
        </div>

        <div className="gold-thesis">
          <div>
            <span>ສິ່ງທີ່ຢືນຢັນໄດ້</span>
            <h3>ໃບຢັ້ງຢືນຄຳສາມາດໃຊ້ເປັນຫຼັກຄ້ຳໄດ້</h3>
          </div>
          <p>ຂໍ້ມູນສາທາລະນະຂອງ Lao Bullion Bank ລະບຸສະເພາະໃບຢັ້ງຢືນຄຳ (Gold Certificate)—ບໍ່ໄດ້ຢືນຢັນວ່າຍອດໃນ “ບັນຊີຄຳ” ທຸກປະເພດຈະຄ້ຳກູ້ໄດ້ອັດຕະໂນມັດ. <Cite id="lbb-certificate" /></p>
        </div>

        <div className="gold-facts">
          <article>
            <span>ພື້ນຖານທາງກົດໝາຍ</span>
            <b>1277/ທຫລ</b>
            <p>ຂໍ້ຕົກລົງຂອງ BOL ລົງວັນທີ 29 ພະຈິກ 2024 ກຳນົດຫຼັກການ, ລະບຽບການ ແລະມາດຕະການຂອງທຸລະກິດທະນາຄານຄຳ. <Cite id="bol-gold-rules" /></p>
          </article>
          <article className="gold-fact-main">
            <span>ຍອດຝາກຄຳຂັ້ນຕ່ຳ</span>
            <b>15g</b>
            <p>ຍອດຝາກຄຳຂັ້ນຕ່ຳທີ່ເວັບ Lao Bullion Bank ລະບຸສຳລັບການໄດ້ຮັບໃບຢັ້ງຢືນຄຳ. <Cite id="lbb-certificate" /></p>
          </article>
          <article>
            <span>ການນຳໃຊ້</span>
            <b>ຄ້ຳກູ້</b>
            <p>ໃບຢັ້ງຢືນສາມາດນຳໄປຄ້ຳສິນເຊື່ອກັບທະນາຄານທຸລະກິດ ແລະສະຖາບັນການເງິນໃນລາວ. <Cite id="lbb-certificate" /></p>
          </article>
        </div>

        <div className="gold-flow" aria-label="ຂັ້ນຕອນຈາກການຝາກຄຳເຖິງສິນເຊື່ອ">
          <article><b>01</b><h3>ຝາກຄຳ</h3><p>ລູກຄ້ານຳຄຳເຂົ້າສູ່ລະບົບຂອງທະນາຄານຄຳ.</p></article>
          <article><b>02</b><h3>ກວດມາດຕະຖານ</h3><p>ກວດນ້ຳໜັກ, ຄວາມບໍລິສຸດ, ທີ່ມາ ແລະມູນຄ່າ.</p></article>
          <article><b>03</b><h3>ອອກໃບຢັ້ງຢືນ</h3><p>ອອກເອກະສານຮັບຮອງຊັບສິນທີ່ມີຄວາມໃຊ້ໄດ້ທາງກົດໝາຍ.</p></article>
          <article><b>04</b><h3>ປະເມີນວົງເງິນກູ້</h3><p>ຜູ້ໃຫ້ກູ້ຕີລາຄາ ແລະຫັກສ່ວນກັນຄວາມສ່ຽງ ເພື່ອຮອງຮັບລາຄາຜັນຜວນ.</p></article>
          <article><b>05</b><h3>ຮັບ–ຊຳລະສິນເຊື່ອ</h3><p>ໄດ້ເງິນກູ້ໂດຍບໍ່ຂາຍຄຳ; ຄຳຍັງຕິດພາລະຈົນຊຳລະຄົບ.</p></article>
        </div>

        <div className="gold-balance">
          <article className="gold-opportunity">
            <span>ໂອກາດ</span>
            <h3>ເພີ່ມຫຼັກຄ້ຳໃຫ້ຄົນທີ່ບໍ່ມີດິນ</h3>
            <ul>
              <li>ເປີດທາງໃຫ້ຄົວເຮືອນແລະທຸລະກິດນ້ອຍນຳຊັບສິນອື່ນມາຄ້ຳ</li>
              <li>ສ້າງເງິນໝູນໃຊ້ໂດຍບໍ່ຕ້ອງຂາຍຄຳໃນເວລາທີ່ບໍ່ເໝາະ</li>
              <li>ນຳຄຳຈາກນອກລະບົບເຂົ້າສູ່ການກວດມາດຕະຖານ ແລະການເກັບຮັກສາ</li>
              <li>ສາມາດສະໜັບສະໜູນທຶນໝູນວຽນຂອງ SME ໄດ້ໄວກວ່າການຈຳນອງອະສັງຫາ</li>
            </ul>
          </article>
          <article className="gold-risk">
            <span>ຄວາມສ່ຽງ</span>
            <h3>ຄຳເປັນຫຼັກຄ້ຳ—ບໍ່ແມ່ນການລົບຄວາມສ່ຽງ</h3>
            <ul>
              <li><b>ຄວາມສ່ຽງດ້ານລາຄາ:</b> ລາຄາຄຳຫຼຸດອາດເຮັດໃຫ້ LTV ສູງ ຫຼືຖືກເອີ້ນເງິນເພີ່ມ</li>
              <li><b>ຄວາມສ່ຽງດ້ານການຕີລາຄາ:</b> ລາຄາອ້າງອີງ, ຄວາມບໍລິສຸດ, ສ່ວນຕ່າງລາຄາ ແລະສ່ວນຫຼຸດຫຼັກຄ້ຳອາດຕ່າງກັນ</li>
              <li><b>ຄວາມສ່ຽງດ້ານການເກັບຮັກສາ:</b> ຕ້ອງຮູ້ວ່າຄຳຖືກເກັບຢູ່ໃສ, ມີປະກັນໄພ ແລະການກວດສອບຫຼືບໍ່</li>
              <li><b>ຄວາມສ່ຽງດ້ານການຜິດນັດ:</b> ຖ້າຜິດນັດ ຜູ້ໃຫ້ກູ້ອາດມີສິດຂາຍຄຳຕາມເງື່ອນໄຂສັນຍາ</li>
              <li><b>ຄວາມສ່ຽງດ້ານຄ່າໃຊ້ຈ່າຍ:</b> ດອກເບ້ຍ, ຄ່າກວດຄຳ, ຄ່າຝາກ, ຄ່າໃບຢັ້ງຢືນ ແລະຄ່າປິດບັນຊີຕ້ອງຄິດລວມ</li>
            </ul>
          </article>
        </div>

        <div className="gold-checklist">
          <div>
            <span>ກ່ອນຕັດສິນໃຈກູ້</span>
            <h3>7 ຄຳຖາມທີ່ຄວນຖາມກ່ອນເອົາຄຳຄ້ຳ</h3>
          </div>
          <ol>
            <li>ທະນາຄານໃຊ້ລາຄາໃດ ແລະປັບລາຄາເລື້ອຍປານໃດ?</li>
            <li>LTV ແລະ haircut ເທົ່າໃດ?</li>
            <li>APR ຫຼືຕົ້ນທຶນລວມຫຼັງຄ່າທຳນຽມແມ່ນເທົ່າໃດ?</li>
            <li>ລາຄາຄຳຫຼຸດເຖິງຈຸດໃດຈຶ່ງຖືກເອີ້ນເງິນເພີ່ມ?</li>
            <li>ເມື່ອຜິດນັດ ມີໄລຍະຜ່ອນຜັນ ແລະແຈ້ງເຕືອນກ່ອນຂາຍຄຳຫຼືບໍ່?</li>
            <li>ຄຳຢູ່ໃນຄັງໃດ, ມີປະກັນໄພ ແລະການກວດສອບອິດສະຫຼະຫຼືບໍ່?</li>
            <li>ສາມາດໄຖ່ຖອນເປັນຄຳແທ້ໄດ້ຫຼືບໍ່ ແລະໃຊ້ເວລາຈັກມື້?</li>
          </ol>
        </div>

        <p className="gold-note"><b>ຂໍ້ຈຳກັດຂອງຂໍ້ມູນ:</b> ແຫຼ່ງສາທາລະນະຢືນຢັນການໃຊ້ໃບຢັ້ງຢືນຄຳເປັນຫຼັກຄ້ຳ ແລະຍອດຝາກຂັ້ນຕ່ຳ 15 ກຣາມ; ແຕ່ບໍ່ໄດ້ເຜີຍແຜ່ LTV, ດອກເບ້ຍ, ສ່ວນຫຼຸດຫຼັກຄ້ຳ ຫຼືຄ່າທຳນຽມສຳລັບທຸກກໍລະນີ. ລູກຄ້າຄວນຂໍໃບສະເໜີເງື່ອນໄຂ ແລະສັນຍາສະບັບເຕັມກ່ອນຕັດສິນໃຈ. <Cite id="lbb-certificate" /><Cite id="kpl-gold-bank" /></p>
      </section>

      <section className="section digital">
        <div className="section-heading">
          <p className="eyebrow">ເສດຖະກິດດິຈິຕອນ</p>
          <div>
            <h2>ດິຈິຕອນແມ່ນໂອກາດ—ບໍ່ແມ່ນຄຳຕອບອັດຕະໂນມັດ</h2>
            <p className="section-intro">ລະບົບຊຳລະເງິນເຕີບໄວ ແຕ່ມູນຄ່າຈະເກີດຂຶ້ນກໍ່ຕໍ່ເມື່ອ SME ເຂົ້າໃຊ້, ຂໍ້ມູນເຊື່ອມກັນ ແລະການຈັດຊື້ເປີດກວ້າງ.</p>
          </div>
        </div>
        <div className="digital-grid">
          <article className="digital-stat"><span>ມູນຄ່າການຊຳລະເງິນອອນລາຍ</span><b>+43.61%</b><small>ທຽບກັບ 2024</small></article>
          <article className="digital-stat accent"><span>ຈຳນວນທຸລະກຳ</span><b>+66.49%</b><small>ທຽບກັບ 2024</small></article>
          <article className="digital-text">
            <h3>ສິ່ງທີ່ຄວນຕໍ່ຍອດ</h3>
            <ul>
              <li>QR ຂ້າມແດນໃຫ້ກາຍເປັນລາຍຮັບຂອງຮ້ານນ້ອຍ</li>
              <li>ໃບແຈ້ງໜີ້ອອນລາຍ ແລະປະຫວັດທຸລະກຳ ໃຊ້ປະເມີນສິນເຊື່ອ</li>
              <li>ມາດຕະຖານເປີດ ຫຼຸດການຜູກຂາດກັບຜູ້ສະໜອງລາຍດຽວໃນໂຄງການລັດ</li>
              <li>ຄວາມປອດໄພທາງໄຊເບີ ແລະການຄຸ້ມຄອງຜູ້ບໍລິໂພກ ຕ້ອງເຕີບຄູ່ກັນ</li>
            </ul>
            <p>ແຫຼ່ງ: BOL Annual Economic Report 2025 <Cite id="bol25" /></p>
          </article>
        </div>
      </section>

      <section className="section scam-section" id="scam-check">
        <div className="section-heading">
          <p className="eyebrow">03 · ຄວາມເຊື່ອໝັ້ນ ແລະການຫຼອກລວງ</p>
          <div>
            <h2>ການລະດົມທຶນ: ແຍກທຸລະກິດຈິງອອກຈາກກົນລະຍຸດຫຼອກລວງ</h2>
            <p className="section-intro">ລາຍການນີ້ເປັນເຄື່ອງມືກວດສອບເບື້ອງຕົ້ນ—ບໍ່ແທນຄຳແນະນຳກົດໝາຍ ຫຼືການກວດສອບໂດຍຜູ້ຊ່ຽວຊານ.</p>
          </div>
        </div>
        <div className="scam-grid">
          <article className="checklist red">
            <header><span>ສັນຍານແດງ</span><b>ຢຸດກ່ອນ</b></header>
            <ul>
              <li>ຮັບປະກັນກຳໄລສູງ ຫຼື “ບໍ່ມີຄວາມສ່ຽງ”</li>
              <li>ລາຍຮັບຫຼັກມາຈາກການຊັກຊວນສະມາຊິກໃໝ່</li>
              <li>ບໍ່ສະແດງໃບອະນຸຍາດ ຫຼືຜູ້ຄວບຄຸມ</li>
              <li>ບໍ່ມີງົບການເງິນທີ່ກວດສອບໄດ້</li>
              <li>ອະທິບາຍບໍ່ໄດ້ວ່າກຳໄລເກີດຈາກໃສ</li>
              <li>ກົດດັນໃຫ້ໂອນເງິນດ່ວນ ຫຼືຖອນເງິນຍາກ</li>
            </ul>
          </article>
          <article className="checklist green">
            <header><span>ຫຼັກຖານທີ່ຄວນມີ</span><b>ກວດສອບ</b></header>
            <ul>
              <li>ນິຕິບຸກຄົນ, ໃບອະນຸຍາດ ແລະທີ່ຢູ່ກວດສອບໄດ້</li>
              <li>ລາຍຊື່ຜູ້ຖືຮຸ້ນ ແລະເຈົ້າຂອງຜົນປະໂຫຍດຕົວຈິງ</li>
              <li>ງົບການເງິນ, ໃບແຈ້ງຍອດທະນາຄານ ແລະພາສີສອດຄ່ອງ</li>
              <li>ສິນຄ້າ, ລູກຄ້າ, ລາຍຮັບ ແລະຕົ້ນທຶນຕໍ່ໜ່ວຍເປັນຈິງ</li>
              <li>ສັນຍາລະບຸສິດ, ຄວາມສ່ຽງ ແລະທາງອອກ</li>
              <li>ເງິນນັກລົງທຶນແຍກຈາກເງິນບໍລິສັດ</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section scenarios">
        <div className="section-heading">
          <p className="eyebrow">04 · ສາມສະຖານະການ</p>
          <div>
            <h2>ສາມເສັ້ນທາງສຳລັບ 2026–2028</h2>
            <p className="section-intro">ນີ້ແມ່ນສະຖານະການວິເຄາະຂອງຜູ້ຂຽນ—ບໍ່ແມ່ນການຄາດຄະເນທາງການ.</p>
          </div>
        </div>
        <div className="scenario-grid">
          <article><span className="scenario-label base">ແນວໂນ້ມເດີມ</span><h3>ຟື້ນຊ້າ ແລະບໍ່ເທົ່າທຽມ</h3><p>ການທ່ອງທ່ຽວ, ຂົນສົ່ງ, ພະລັງງານ ແລະບາງໂຄງການເຕີບ; SME ຍັງຕິດທຶນແລະແຮງງານ. ຄວາມສະຖຽນດີຂຶ້ນ ແຕ່ບອບບາງ.</p><b>ຜູ້ຊະນະ:</b><small>ທຸລະກິດທີ່ມີກະແສເງິນສົດໄວ, ລາຍຮັບເງິນຕາຕ່າງປະເທດ ແລະສິນຄ້າຈຳເປັນ</small></article>
          <article className="preferred"><span className="scenario-label reform">ປະຕິຮູບ</span><h3>ເປີດການແຂ່ງຂັນ</h3><p>ການຈັດຊື້ອອນລາຍ, ໂຄງລ່າງຂໍ້ມູນສິນເຊື່ອ, ການຝຶກທັກສະ ແລະການອະນຸຍາດທີ່ຄາດຄະເນໄດ້ ດຶງທຶນເຂົ້າກິດຈະການຜະລິດ.</p><b>ຜູ້ຊະນະ:</b><small>MSME ທີ່ຢູ່ໃນລະບົບ, ກະສິກຳແປຮູບ, ບໍລິການດິຈິຕອນໃຫ້ທຸລະກິດ ແລະຜູ້ສົ່ງອອກ</small></article>
          <article><span className="scenario-label downside">ຄວາມສ່ຽງລົງ</span><h3>ຄວາມຜັນຜວນກັບຄືນ</h3><p>ລາຄານ້ຳມັນ, ອັດຕາແລກປ່ຽນ, ໜີ້ສິນ ຫຼືອຸປະສົງຈາກຄູ່ຄ້າອ່ອນລົງ ກະທົບຕົ້ນທຶນແລະກຳລັງຊື້ພ້ອມກັນ.</p><b>ຜູ້ຢູ່ລອດ:</b><small>ທຸລະກິດໜີ້ຕ່ຳ, ສິນຄ້າໝູນໄວ ແລະລູກຄ້າຫຼາກຫຼາຍ</small></article>
        </div>
      </section>

      <section className="section actions" id="actions">
        <div className="section-heading">
          <p className="eyebrow">05 · ຂໍ້ສະເໜີເພື່ອລົງມື</p>
          <div>
            <h2>ຈາກການວິນິດໄສ ສູ່ການລົງມື</h2>
            <p className="section-intro">ບັນຫາໂຄງສ້າງຕ້ອງແກ້ຫຼາຍຝ່າຍ; ບໍ່ມີມາດຕະການດຽວທີ່ແກ້ທຸກຢ່າງ.</p>
          </div>
        </div>
        <div className="action-grid">
          <article>
            <span>ລັດ / ຜູ້ກຳກັບ</span>
            <h3>ເຮັດໃຫ້ກົດກາຄາດຄະເນໄດ້</h3>
            <ol><li>ການຈັດຊື້ອອນລາຍ ແລະການເປີດເຜີຍສັນຍາ</li><li>ເວລາອະນຸຍາດທີ່ຊັດເຈນ</li><li>ນະໂຍບາຍການແຂ່ງຂັນທີ່ບັງຄັບໃຊ້ໄດ້</li><li>ກອງທຶນ MSME ອິດສະຫຼະ</li></ol>
          </article>
          <article>
            <span>ທະນາຄານ / ຜູ້ໃຫ້ທຶນ</span>
            <h3>ປ່ຽນຈາກດິນຄ້ຳ ສູ່ຂໍ້ມູນ</h3>
            <ol><li>ໃຫ້ກູ້ຕາມກະແສເງິນສົດ</li><li>ໃຫ້ທຶນຕາມໃບແຈ້ງໜີ້ ແລະໃບສັ່ງຊື້</li><li>ຮັບຊັບສິນເຄື່ອນຍ້າຍເປັນຫຼັກຄ້ຳ</li><li>ເປີດເຜີຍ APR ແລະຄ່າທຳນຽມລວມ</li></ol>
          </article>
          <article>
            <span>ຜູ້ປະກອບການ</span>
            <h3>ເຕີບແບບກະຊັບ ແລະໂປ່ງໃສ</h3>
            <ol><li>ແຍກບັນຊີສ່ວນຕົວ–ບໍລິສັດ</li><li>ຄຸ້ມຄອງກະແສເງິນສົດລ່ວງໜ້າ 13 ອາທິດ</li><li>ຫາລູກຄ້ານອກປະເທດ</li><li>ສ້າງລະບົບງານໃຫ້ໃຊ້ຄົນໜ້ອຍລົງ</li></ol>
          </article>
          <article>
            <span>ນັກລົງທຶນ</span>
            <h3>ກວດທັງໂຄງການ ແລະການບໍລິຫານ</h3>
            <ol><li>ກວດໃບອະນຸຍາດ ແລະຄວາມເປັນເຈົ້າຂອງ</li><li>ກວດກະແສເງິນສົດ ບໍ່ແມ່ນເບິ່ງແຕ່ເອກະສານນຳສະເໜີ</li><li>ທົດສອບຄວາມສ່ຽງດ້ານອັດຕາແລກປ່ຽນ ແລະສະຖານະການທີ່ບໍ່ດີ</li><li>ກຳນົດສິດຮັບລາຍງານໃນສັນຍາ</li></ol>
          </article>
        </div>
      </section>

      <section className="section conclusion">
        <p className="eyebrow light">ບົດສະຫຼຸບທ້າຍ</p>
        <h2>ທຸລະກິດທີ່ມີໂອກາດຢູ່ລອດ ບໍ່ຈຳເປັນຕ້ອງໃຫຍ່.</h2>
        <p>ແຕ່ຄວນມີຕົ້ນທຶນຄົງທີ່ຕ່ຳ, ກະແສເງິນສົດໄວ, ແກ້ບັນຫາຈຳເປັນ, ບໍ່ອາໄສແຮງງານຫຼາຍ, ມີລາຍຮັບຫຼາຍກວ່າໜຶ່ງຕະຫຼາດ ແລະພິສູດຄວາມໂປ່ງໃສໄດ້.</p>
      </section>

      <section className="section methodology" id="methodology">
        <div className="section-heading">
          <p className="eyebrow">ວິທີຈັດເຮັດ</p>
          <div>
            <h2>ວິທີອ່ານລາຍງານນີ້</h2>
            <p className="section-intro">ຂໍ້ມູນຖືກນຳມາປະກອບກັບການວິເຄາະ; ບາງຂໍ້ມູນອາດມີປີອ້າງອີງຕ່າງກັນ.</p>
          </div>
        </div>
        <div className="method-grid">
          <article><b>1</b><h3>ຫຼັກຖານ</h3><p>ເນັ້ນ World Bank, IMF, ADB, ILO, BOL, LSC, LSX ແລະດັດຊະນີທີ່ເຜີຍແຜ່ວິທີການ.</p></article>
          <article><b>2</b><h3>ປຽບທຽບຫຼາຍແຫຼ່ງ</h3><p>ບໍ່ໃຊ້ຕົວເລກດຽວສະຫຼຸບທັງລະບົບ; ປຽບທຽບຫຼາຍແຫຼ່ງແລະຫຼາຍຊ່ວງເວລາ.</p></article>
          <article><b>3</b><h3>ຂໍ້ຈຳກັດ</h3><p>CPI ແມ່ນດັດຊະນີການຮັບຮູ້; ສະຖານະການ 2026–2028 ແມ່ນຂໍ້ວິເຄາະ; ບໍ່ແມ່ນການກ່າວຫາອົງການໃດ.</p></article>
        </div>
      </section>

      <section className="section sources" id="sources">
        <div className="section-heading">
          <p className="eyebrow">ແຫຼ່ງຂໍ້ມູນ</p>
          <div>
            <h2>ແຫຼ່ງຂໍ້ມູນ</h2>
            <p className="section-intro">ກົດເປີດເອກະສານຕົ້ນສະບັບ. ກວດຄັ້ງຫຼ້າສຸດ: 22 ສິງຫາ 2026.</p>
          </div>
        </div>
        <div className="source-list">
          {sources.map((source, index) => (
            <article id={`source-${source.id}`} key={source.id}>
              <span className="source-no">{String(index + 1).padStart(2, "0")}</span>
              <div><p>{source.org} · {source.year}</p><h3>{source.title}</h3><small>ນຳໃຊ້ສຳລັບ: {source.use}</small></div>
              <a href={source.url} target="_blank" rel="noreferrer">ເປີດແຫຼ່ງ ↗</a>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="brand"><span className="brand-mark">ລ</span><span>LAOS BUSINESS PULSE</span></div>
        <p>ບົດວິເຄາະນີ້ບໍ່ແມ່ນຄຳແນະນຳການລົງທຶນ ຫຼືການກ່າວຫາບຸກຄົນ/ອົງການ.</p>
        <a href="#top">ກັບຄືນຂຶ້ນເທິງ ↑</a>
      </footer>
    </main>
  );
}
