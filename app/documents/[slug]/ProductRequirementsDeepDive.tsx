import styles from "../documents.module.css";

type Definition = { term: string; meaning: string };
type Formula = {
  name: string;
  expression: string;
  purpose: string;
  variables: string[];
  example: string[];
  interpretation: string;
  caution?: string;
};
type Section = {
  id: string;
  label: string;
  title: string;
  question: string;
  paragraphs: string[];
  definitions?: Definition[];
  example?: string;
  caution?: string;
  implications?: string[];
  formulas?: Formula[];
};

const sections: Section[] = [
  {
    id: "pro01-role",
    label: "01 · ROLE OF THE PRD",
    title: "PRD ແປແນວຄິດທຸລະກິດໃຫ້ເປັນສິ່ງທີ່ສ້າງ ແລະກວດຮັບໄດ້",
    question: "ເອກະສານນີ້ຕ່າງຈາກ Product Vision, System Analysis ແລະ UX/UI ແນວໃດ?",
    paragraphs: [
      "Product Vision ບອກວ່າ Platform ຄວນໄປທາງໃດ; PRD ຫຼື Product Requirements Document ບອກວ່າ MVP ຕ້ອງເຮັດຫຍັງໃຫ້ໄດ້. ມັນເຊື່ອມຄວາມຕ້ອງການຂອງຜູ້ໃຊ້ກັບ Feature, ຂໍ້ມູນ, ກົດການເຮັດວຽກ ແລະຫຼັກຖານທີ່ໃຊ້ຮັບມອບ.",
      "PRD ບໍ່ໄດ້ເລືອກ Programming Language, Database ຫຼື Server. ຂໍ້ເຫຼົ່ານັ້ນເປັນໜ້າທີ່ຂອງເອກະສານ Technical. PRD ກໍບໍ່ກຳນົດຮູບຮ່າງທຸກ Pixel; UX/UI ຈະແປ Requirement ເປັນໜ້າຈໍ ແລະ Interaction ພາຍຫຼັງ.",
      "ເມື່ອມີຄຳສະເໜີ Feature ໃໝ່, ທີມຕ້ອງກັບມາກວດກັບ PRD: Feature ນັ້ນຊ່ວຍ Discover, Decide ຫຼື Act ຫຼືບໍ່; ຖ້າບໍ່ຊ່ວຍ ມັນຄວນຖືກເລື່ອນອອກຈາກ MVP.",
    ],
    definitions: [
      { term: "Requirement", meaning: "ຂໍ້ກຳນົດທີ່ອະທິບາຍພຶດຕິກຳ ຫຼືຄຸນນະພາບທີ່ລະບົບຕ້ອງມີ." },
      { term: "Acceptance Criteria", meaning: "ເງື່ອນໄຂທີ່ກວດໄດ້ ເພື່ອຕັດສິນວ່າ Requirement ສຳເລັດ ຫຼືຍັງບໍ່ສຳເລັດ." },
      { term: "MVP", meaning: "ຜະລິດຕະພັນລຸ້ນນ້ອຍສຸດທີ່ຍັງໃຫ້ຄຸນຄ່າຄົບ ແລະນຳໄປທົດສອບສົມມຸດຖານຫຼັກໄດ້." },
    ],
  },
  {
    id: "pro01-outcome",
    label: "02 · PRODUCT OUTCOME",
    title: "ຜົນທີ່ Product ຕ້ອງສ້າງ: ຈາກວິດີໂອໄປຫາການຕັດສິນໃຈ",
    question: "ເປົ້າໝາຍແມ່ນໃຫ້ຄົນເບິ່ງວິດີໂອຫຼາຍ ຫຼືໃຫ້ຄົນຕັດສິນໃຈໄດ້?",
    paragraphs: [
      "ເປົ້າໝາຍຫຼັກບໍ່ແມ່ນ Watch Time. ວິດີໂອແມ່ນສື່ທີ່ດຶງຄວາມສົນໃຈ ແລະຊ່ວຍໃຫ້ເຫັນປະສົບການຈິງ; ແຕ່ຄຸນຄ່າຂອງ “ພ້ອມໄປ” ແມ່ນການເຊື່ອມວິດີໂອນັ້ນກັບ Place Page ທີ່ມີຂໍ້ມູນພໍສຳລັບຕັດສິນໃຈ.",
      "Journey ຫຼັກຈຶ່ງແມ່ນ Video → Place → Action. Video ຊ່ວຍໃຫ້ຄົ້ນພົບ, Place Page ຊ່ວຍໃຫ້ປຽບທຽບ ແລະກວດຂໍ້ມູນ, ສ່ວນ Map, Call ແລະ Message ແມ່ນທາງອອກໄປຫາການກະທຳຈິງ.",
      "MVP ບັນທຶກການກົດ Action ເປັນ Decision Intent ຫຼືເຈດຕະນາທີ່ຈະຕັດສິນໃຈ. ມັນບໍ່ແມ່ນຫຼັກຖານວ່າຜູ້ໃຊ້ໄດ້ໄປຮ້ານ ຫຼືຊື້ຈິງ; ການຢືນຢັນການໄປຮ້ານໃນ Pilot ຈະໃຊ້ການກວດແບບ Manual ເປັນຂໍ້ມູນປະກອບ.",
    ],
    example: "ຜູ້ໃຊ້ເຫັນວິດີໂອເຂົ້າປຽກຮ້ານໜຶ່ງ, ແຕະເຂົ້າ Place Page, ເຫັນຊ່ວງລາຄາ ແລະເວລາເປີດ, ແລ້ວກົດ Map. Journey ນີ້ສ້າງ Decision Intent 1 ຄັ້ງ; ບໍ່ຄວນລາຍງານວ່າຮ້ານໄດ້ລູກຄ້າ 1 ຄົນແລ້ວ.",
  },
  {
    id: "pro01-users",
    label: "03 · USERS AND ACTORS",
    title: "ຜູ້ໃຊ້ 4 ກຸ່ມມີເປົ້າໝາຍ ແລະສິດບໍ່ຄືກັນ",
    question: "ເປັນຫຍັງ PRD ຈຶ່ງບໍ່ຂຽນພຽງແຕ່ຄຳວ່າ “User”?",
    paragraphs: [
      "ຜູ້ຊອກຮ້ານແມ່ນ Primary User: ເຂົ້າເບິ່ງ Feed, ຄົ້ນຫາ, ກອງຜົນ, ເປີດ Place Page ແລະກົດ Action ໄດ້ໂດຍບໍ່ຕ້ອງມີ Account. ການບໍ່ບັງຄັບສະໝັກຊ່ວຍຫຼຸດອຸປະສັກໃນໄລຍະທົດລອງ.",
      "ເຈົ້າຂອງຮ້ານແມ່ນ Business Actor: ມີສິດສະເໜີແກ້ຂໍ້ມູນ ແຕ່ບໍ່ຄວນແກ້ແລ້ວເຜີຍແຜ່ໄດ້ທັນທີໂດຍບໍ່ຜ່ານ Admin. Creator ແມ່ນ Content Source: ໃນ MVP ຍັງບໍ່ຕ້ອງມີ Creator Account, ແຕ່ທຸກ Content ຕ້ອງລະບຸຊື່, Source ແລະລິ້ງກັບຕົ້ນສະບັບ.",
      "Admin ແມ່ນ Operator ທີ່ຮັບຜິດຊອບຄຸນນະພາບຂໍ້ມູນ, ການຈັບຄູ່ Content ກັບ Place, Correction, Takedown ແລະ Sponsored Label. ດັ່ງນັ້ນ Admin workflow ບໍ່ແມ່ນ Back-office ເສີມ; ມັນແມ່ນສ່ວນຈຳເປັນຂອງ MVP.",
    ],
    implications: [
      "Guest ຕ້ອງໃຊ້ Core Journey ໄດ້ໂດຍບໍ່ສະໝັກ Account.",
      "ການແກ້ຂໍ້ມູນຈາກຮ້ານຕ້ອງມີຫຼັກຖານ ແລະການອະນຸມັດ.",
      "Creator Attribution ຕ້ອງເຫັນໄດ້ທັງໃນ Feed ແລະ Place Page.",
    ],
  },
  {
    id: "pro01-journey",
    label: "04 · CORE JOURNEY",
    title: "Discover → Decide → Act ຕ້ອງເປັນເສັ້ນທາງດຽວທີ່ບໍ່ຂາດຕອນ",
    question: "ແຕ່ລະຂັ້ນມີໜ້າທີ່ຫຍັງ ແລະຈະຮູ້ໄດ້ແນວໃດວ່າຂັ້ນນັ້ນເຮັດວຽກ?",
    paragraphs: [
      "Discover ແມ່ນຂັ້ນຄົ້ນພົບ: Feed, Search ແລະ Filter ຕ້ອງຊ່ວຍໃຫ້ຜູ້ໃຊ້ພົບຮ້ານທີ່ກົງກັບຄວາມຕ້ອງການ. Feed ເປັນ Full-screen vertical video ໃນ Mobile ເພື່ອໃຫ້ເຫັນ Content ຊັດ, ແຕ່ຕ້ອງມີປຸ່ມໄປ Place Page ຢ່າງເຫັນໄດ້ຊັດ.",
      "Decide ແມ່ນຂັ້ນກວດຂໍ້ມູນ. Place Page ໜຶ່ງໜ້າເປັນບັນທຶກຫຼັກຂອງສະຖານທີ່ໜຶ່ງແຫ່ງ ແລະລວມ Content Source ຫຼາຍອັນໄດ້. ຜູ້ໃຊ້ຄວນຮູ້ສະຖານທີ່, ຊ່ອງທາງຕິດຕໍ່, ເວລາ, ຊ່ວງລາຄາ, ແຫຼ່ງທີ່ມາ ແລະວັນທີກວດຂໍ້ມູນ.",
      "Act ແມ່ນຂັ້ນອອກຈາກ Platform ໄປຫາແຜນທີ່, ການໂທ ຫຼືການສົ່ງຂໍ້ຄວາມ. MVP ບໍ່ຄວນສ້າງ Booking ຫຼື Payment ເອງ; ເຈົ້າຂອງຮ້ານ ແລະຜູ້ໃຊ້ຈະຕິດຕໍ່ກັນໂດຍກົງ.",
      "Operate ແມ່ນ Journey ພາຍໃນສຳລັບ Admin. ຖ້າ Admin ບໍ່ສາມາດເພີ່ມ, ກວດ, ແກ້, ປິດ ແລະບັນທຶກ Source ໄດ້, Core Journey ຂອງຜູ້ໃຊ້ກໍຈະມີຂໍ້ມູນບໍ່ຄົບ ຫຼືບໍ່ໜ້າເຊື່ອຖື.",
    ],
    formulas: [
      {
        name: "Core Journey Completion Rate",
        expression: "ຈຳນວນຜູ້ທົດສອບທີ່ສຳເລັດ Feed → Place → Action ÷ ຈຳນວນຜູ້ທົດສອບທັງໝົດ × 100",
        purpose: "ກວດວ່າຜູ້ໃຊ້ສາມາດຜ່ານ Journey ຫຼັກໄດ້ໂດຍບໍ່ຕິດຂັດ.",
        variables: ["ຜູ້ສຳເລັດ = ຜູ້ທີ່ເລີ່ມຈາກ Feed, ເປີດ Place Page ແລະກົດ Map/Call/Message ໄດ້.", "ຜູ້ທົດສອບທັງໝົດ = ທຸກຄົນທີ່ໄດ້ຮັບ Scenario ດຽວກັນ ແລະເລີ່ມທົດສອບ."],
        example: ["ມີຜູ້ທົດສອບ 10 ຄົນ.", "8 ຄົນຜ່ານ Feed → Place → Action ໄດ້.", "8 ÷ 10 × 100 = 80%."],
        interpretation: "80% ໝາຍເຖິງ 8 ໃນ 10 ຄົນສຳເລັດ Journey. ອີກ 2 ຄົນຕ້ອງຖືກກວດວ່າຕິດຂັດຢູ່ Discover, Decide ຫຼື Act.",
        caution: "ຕົວເລກນີ້ວັດຄວາມສາມາດໃນການໃຊ້ Flow; ບໍ່ໄດ້ພິສູດວ່າຜູ້ໃຊ້ຈະໄປຮ້ານຈິງ.",
      },
    ],
  },
  {
    id: "pro01-functional",
    label: "05 · FUNCTIONAL REQUIREMENTS",
    title: "Functional Requirement ຕ້ອງລະບຸພຶດຕິກຳທີ່ກວດໄດ້",
    question: "ປະໂຫຍກວ່າ “ມີ Search” ພຽງພໍສຳລັບການພັດທະນາຫຼືບໍ່?",
    paragraphs: [
      "ຄຳວ່າ “ມີ Search” ຍັງບໍ່ພຽງພໍ. Requirement ທີ່ດີຕ້ອງບອກວ່າໃຜໃຊ້, ໃສ່ຂໍ້ມູນຫຍັງ, ລະບົບຕ້ອງຕອບສະໜອງແນວໃດ, ແລະຈະກວດຮັບແນວໃດ. ຕົວຢ່າງ USR-02 ຈຶ່ງກຳນົດວ່າ Guest ຄົ້ນດ້ວຍຊື່ຮ້ານ ຫຼືຄຳສຳຄັນ ແລະກອງຕາມໝວດ, ເຂດ ແລະຊ່ວງລາຄາໄດ້.",
      "Requirement ID ບອກກຸ່ມຂອງ Requirement: USR ສຳລັບຜູ້ໃຊ້ທົ່ວໄປ, BUS ສຳລັບຮ້ານ, ADM ສຳລັບ Admin, TRU ສຳລັບຄວາມໜ້າເຊື່ອຖື ແລະ ANA ສຳລັບ Analytics. ID ຈະຖືກອ້າງອີງຕໍ່ໃນ System Analysis, Wireframe, Test Case ແລະ Development Task.",
      "Priority ໃຊ້ Must ແລະ Should. Must ແມ່ນຂາດບໍ່ໄດ້ສຳລັບ Pilot; Should ແມ່ນມີຄຸນຄ່າ ແຕ່ສາມາດເລື່ອນໄດ້ຖ້າເວລາ ຫຼືງົບບໍ່ພຽງພໍ. ການເລື່ອນ Must ຕ້ອງຜ່ານການປ່ຽນ Scope ຢ່າງເປັນທາງການ.",
    ],
    example: "USR-04 ບໍ່ໄດ້ຈົບທີ່ “ມີປຸ່ມ Map”. ການກວດຮັບຕ້ອງຢືນຢັນວ່າປຸ່ມເປີດຈຸດໝາຍຖືກຮ້ານ, ໃຊ້ໄດ້ໃນ Mobile ແລະບັນທຶກ Event ພ້ອມ Place ID ແລະ Action Type ຖືກຕ້ອງ.",
  },
  {
    id: "pro01-scope",
    label: "06 · MVP SCOPE AND NON-GOALS",
    title: "ຂອບເຂດ MVP ປ້ອງກັນບໍ່ໃຫ້ Feature ທີ່ດີແຕ່ບໍ່ຈຳເປັນຂັດຂວາງ Pilot",
    question: "ເປັນຫຍັງ Booking, Payment, AI ແລະ Native App ຈຶ່ງຍັງບໍ່ຢູ່ໃນ MVP?",
    paragraphs: [
      "MVP ຮອງຮັບ Responsive Web/PWA, Feed, Search/Filter ພື້ນຖານ, Place Page, Source Link, Map/Call/Message, Save/Share, Correction Request, Admin Workflow ແລະ Analytics. ຊຸດນີ້ພຽງພໍສຳລັບກວດສົມມຸດຖານວ່າຜູ້ໃຊ້ຈະໃຊ້ Content ເພື່ອໄປຫາການຕັດສິນໃຈຫຼືບໍ່.",
      "Booking ແລະ Payment ຈະເພີ່ມການເຊື່ອມລະບົບຮ້ານ, ການຮັບຜິດຊອບທຸລະກຳ, Refund ແລະ Support. Native App ເພີ່ມສອງ Codebase ຫຼືຄວາມຊັບຊ້ອນການປ່ອຍ App. AI Recommendation ຈຳເປັນຕ້ອງມີຂໍ້ມູນພຶດຕິກຳທີ່ພຽງພໍ. ທັງໝົດນີ້ຍັງບໍ່ຈຳເປັນຕໍ່ການພິສູດ Core Journey.",
      "Non-goal ບໍ່ໄດ້ໝາຍຄວາມວ່າຈະບໍ່ເຮັດຕະຫຼອດໄປ. ມັນໝາຍເຖິງບໍ່ສັນຍາ, ບໍ່ອອກແບບເປັນ Requirement ຂອງ Pilot ແລະບໍ່ໃຊ້ເປັນເງື່ອນໄຂຮັບມອບ MVP.",
    ],
    caution: "ການເພີ່ມ Feature ໃໝ່ໃນ MVP ຕ້ອງລະບຸວ່າຈະຕັດຫຍັງອອກ, ເພີ່ມງົບເທົ່າໃດ ຫຼືຂະຫຍາຍເວລາເທົ່າໃດ; ຫ້າມເພີ່ມ Scope ໂດຍບໍ່ປະເມີນຜົນກະທົບ.",
  },
  {
    id: "pro01-data-trust",
    label: "07 · PLACE DATA AND TRUST",
    title: "Place Page ໜ້າດຽວຕ້ອງແຍກ Source, Verification ແລະ Sponsored ອອກຈາກກັນ",
    question: "ສາມປ້າຍນີ້ຕ່າງກັນແນວໃດ ແລະເປັນຫຍັງຫ້າມໃຊ້ແທນກັນ?",
    paragraphs: [
      "Source linked ໝາຍເຖິງ Platform ລະບຸແຫຼ່ງ Content ແລະ Creator ພ້ອມລິ້ງໄປຫາຕົ້ນສະບັບ. ປ້າຍນີ້ບອກທີ່ມາຂອງ Content; ບໍ່ໄດ້ຢືນຢັນວ່າທຸກຄຳເວົ້າໃນ Review ຖືກຕ້ອງ.",
      "Place verified ໝາຍເຖິງຂໍ້ມູນຫຼັກຂອງຮ້ານຖືກກວດຕາມ Workflow ແລະມີວັນທີກວດ. ມັນບໍ່ແມ່ນຄະແນນຄຸນນະພາບ ແລະບໍ່ໄດ້ຮັບປະກັນປະສົບການຂອງລູກຄ້າ.",
      "Sponsored ໝາຍເຖິງຮ້ານຈ່າຍຄ່າ Campaign ເພື່ອຮັບພື້ນທີ່ສະແດງຜົນ. ການຈ່າຍບໍ່ສາມາດຊື້ Verified Status, ຄະແນນ Review ຫຼືການລົບຄຳເຫັນທີ່ຊອບທຳໄດ້.",
      "ກ່ອນເຜີຍແຜ່ Place ຕ້ອງມີຊື່, ໝວດ, ເຂດ, ພິກັດແຜນທີ່, ຊ່ອງທາງຕິດຕໍ່ຢ່າງໜ້ອຍໜຶ່ງຊ່ອງທາງ, Source Link, ວັນທີກວດ ແລະ Admin Approval. Field ທີ່ຍັງກວດບໍ່ໄດ້ຕ້ອງສະແດງ “ຍັງບໍ່ຢືນຢັນ” ແທນການຄາດເດົາ.",
    ],
    formulas: [
      {
        name: "Required-field Completeness",
        expression: "ຈຳນວນ Required Field ທີ່ຄົບ ÷ ຈຳນວນ Required Field ທັງໝົດ × 100",
        purpose: "ກວດວ່າ Place Record ໜຶ່ງມີຂໍ້ມູນພື້ນຖານຄົບພໍກ່ອນເຜີຍແຜ່.",
        variables: ["Required Field ທີ່ຄົບ = Field ທີ່ມີຄ່າ, ຮູບແບບຖືກ ແລະຜ່ານການກວດຕາມກົດ.", "Required Field ທັງໝົດ = Field ບັງຄັບທີ່ກຳນົດໃນ PRD; ບໍ່ລວມ Optional Field."],
        example: ["ກຳນົດ Required Field 8 ລາຍການ.", "ຮ້ານ A ມີຂໍ້ມູນຖືກຕ້ອງ 7 ລາຍການ.", "7 ÷ 8 × 100 = 87.5%."],
        interpretation: "87.5% ໝາຍເຖິງຍັງຂາດ 1 Required Field. ຖ້າ Policy ກຳນົດ 100% ກ່ອນເຜີຍແຜ່, Place ນີ້ຍັງຢູ່ສະຖານະ Draft.",
        caution: "ຄວາມຄົບບໍ່ເທົ່າກັບຄວາມຖືກຕ້ອງ. Field ອາດມີຄ່າຄົບແຕ່ເປັນຂໍ້ມູນເກົ່າ; ຈຶ່ງຕ້ອງກວດ Source ແລະ Verified Date ຄູ່ກັນ.",
      },
    ],
  },
  {
    id: "pro01-content",
    label: "08 · CONTENT HANDLING",
    title: "Platform ເຊື່ອມໄປຫາ Content ຕົ້ນສະບັບ ແລະຕ້ອງມີ Fallback",
    question: "ຖ້າວິດີໂອຈາກ Social Platform ຝັງບໍ່ໄດ້ ຫຼືຖືກລົບ ລະບົບຄວນເຮັດແນວໃດ?",
    paragraphs: [
      "ທາງເລືອກທຳອິດແມ່ນໃຊ້ Official Embed ເມື່ອ Source ອະນຸຍາດ. ຖ້າ Embed ບໍ່ຮອງຮັບ, ໂຫຼດບໍ່ໄດ້ ຫຼືກະທົບ Performance, Platform ສະແດງ Preview ຫຼືຮູບສຳຮອງ, ຊື່ Creator, Source ແລະປຸ່ມໄປຫາຕົ້ນສະບັບ.",
      "MVP ບໍ່ Download, Re-host ຫຼື Transcode ວິດີໂອຂອງ Creator ໂດຍບໍ່ມີສິດ. ກົດນີ້ຫຼຸດທັງຄວາມສ່ຽງດ້ານຊັບສິນທາງປັນຍາ ແລະຄ່າ Server/Bandwidth ໃນໄລຍະທຳອິດ.",
      "ຖ້າ Source ຖືກລົບ, ລິ້ງເສຍ ຫຼືມີ Takedown Request, Admin ຕ້ອງປິດ Content Link ໂດຍບໍ່ຈຳເປັນລົບ Place Page ທັງໝົດ. Place ໜຶ່ງສາມາດມີຫຼາຍ Source; ການເສຍ Source ໜຶ່ງບໍ່ຄວນເຮັດໃຫ້ຂໍ້ມູນຮ້ານທັງໝົດຫາຍໄປ.",
    ],
    example: "ຖ້າ TikTok ຕົ້ນສະບັບຖືກລົບ, Card ຂອງ Content ນັ້ນບໍ່ຄວນສະແດງປຸ່ມ Play ທີ່ເສຍ. Admin ປ່ຽນສະຖານະ Source ເປັນ Unavailable, ສ່ວນ Place Page ຍັງສະແດງໄດ້ຖ້າຂໍ້ມູນຮ້ານຍັງຜ່ານເກນ.",
  },
  {
    id: "pro01-quality",
    label: "09 · NON-FUNCTIONAL REQUIREMENTS",
    title: "Product ທີ່ມີ Feature ຄົບແຕ່ຊ້າ, ອ່ານບໍ່ໄດ້ ຫຼືບໍ່ເຄົາລົບ Privacy ຍັງຖືວ່າບໍ່ສຳເລັດ",
    question: "Non-functional Requirement ແມ່ນຫຍັງ ແລະຄວນແປເປັນການກວດແນວໃດ?",
    paragraphs: [
      "Functional Requirement ບອກວ່າລະບົບເຮັດຫຍັງ; Non-functional Requirement ບອກວ່າລະບົບຕ້ອງເຮັດໄດ້ດີເທົ່າໃດ ແລະຢູ່ພາຍໃຕ້ຂໍ້ຈຳກັດຫຍັງ. PRO-01 ກຳນົດ 4 ດ້ານຫຼັກ: Mobile-first, Performance, Accessibility ແລະ Privacy.",
      "Mobile-first ໝາຍເຖິງ Journey ຫຼັກຕ້ອງອອກແບບ ແລະທົດສອບໃນໜ້າຈໍ Mobile ກ່ອນ. Performance ໝາຍເຖິງ External Embed ທີ່ຊ້າບໍ່ຄວນກັ້ນການເບິ່ງຂໍ້ມູນ Place. Accessibility ໝາຍເຖິງປຸ່ມມີຊື່, ສີມີ Contrast, Keyboard ໃຊ້ໄດ້ ແລະບໍ່ສື່ຄວາມໝາຍດ້ວຍສີພຽງຢ່າງດຽວ.",
      "Privacy ໝາຍເຖິງເກັບຂໍ້ມູນເທົ່າທີ່ຈຳເປັນ, ບໍ່ຕິດຕາມຕຳແໜ່ງແບບຕໍ່ເນື່ອງ ແລະແຈ້ງ Anonymous Product Analytics ກ່ອນເກັບ. ຖ້າຜູ້ໃຊ້ເລືອກສະເພາະຟັງຊັນຈຳເປັນ, Core Journey ຕ້ອງຍັງໃຊ້ໄດ້.",
      "ຕົວເລກ Performance ແບບສຸດທ້າຍ, ອຸປະກອນທົດສອບ ແລະ Accessibility Checklist ຈະຖືກຂະຫຍາຍໃນ PRO-04 ແລະ DEL-02. PRO-01 ກຳນົດທິດທາງ ແຕ່ບໍ່ຄາດເດົາຕົວເລກທີ່ຍັງບໍ່ຜ່ານການທົດສອບ.",
    ],
  },
  {
    id: "pro01-analytics",
    label: "10 · ANALYTICS AND EVENT MEANING",
    title: "Analytics ຕ້ອງບອກວ່າຜູ້ໃຊ້ຢູ່ຂັ້ນໃດ ແລະຫຼຸດອອກຢູ່ຈຸດໃດ",
    question: "ເປັນຫຍັງຕ້ອງກຳນົດ Event ໃນ PRD ກ່ອນເລີ່ມ Development?",
    paragraphs: [
      "Event ທີ່ຈຳເປັນປະກອບມີ Feed View, Place Open, Search, Filter, Map, Call, Message, Save ແລະ Share. ຖ້າບໍ່ກຳນົດກ່ອນ, Developer ອາດບັນທຶກຊື່ Event ແລະຄ່າປະກອບບໍ່ຄືກັນ, ເຮັດໃຫ້ລາຍງານ Funnel ໃຊ້ບໍ່ໄດ້.",
      "ທຸກ Core Event ຄວນມີ Event Name, Anonymous Session ID, Place ID ຫຼື Content ID ທີ່ກ່ຽວຂ້ອງ, Timestamp ແລະ Action Type. ບໍ່ຄວນສົ່ງຊື່, ເບີໂທ ຫຼືຂໍ້ມູນລະບຸບຸກຄົນເຂົ້າ Product Analytics ໂດຍບໍ່ຈຳເປັນ.",
      "ການນັບ Unique Decision Intent ຕ້ອງຫຼຸດ Event ຊ້ຳຈາກການກົດຫຼາຍຄັ້ງໃນ Session ດຽວຕາມນິຍາມທີ່ອະນຸມັດ. Test Log ຄວນບັນທຶກການກົດທີ່ຮູ້ຈຳນວນແນ່ນອນ ແລ້ວປຽບທຽບກັບລາຍງານ Analytics ກ່ອນ Pilot.",
    ],
    caution: "Analytics ສະແດງພຶດຕິກຳໃນ Platform. ມັນບໍ່ຄວນຖືກໃຊ້ອ້າງວ່າເກີດຍອດຂາຍ ຫຼືການໄປຮ້ານຈິງ ຖ້າບໍ່ມີຫຼັກຖານອື່ນປະກອບ.",
  },
  {
    id: "pro01-acceptance",
    label: "11 · ACCEPTANCE AND RELEASE",
    title: "ການຮັບມອບຕ້ອງອີງໃສ່ຫຼັກຖານ ບໍ່ແມ່ນຄວາມຮູ້ສຶກວ່າ “ເບິ່ງຄືສຳເລັດ”",
    question: "ກ່ອນປ່ອຍ Pilot ຕ້ອງກວດຫຍັງ ແລະຜົນແບບໃດຖືວ່າຫ້າມປ່ອຍ?",
    paragraphs: [
      "Core Journey ຕ້ອງທົດສອບໄດ້ຈາກ Feed ຫາ Place ແລະ Action ໃນ Mobile. ທຸກ Content Card ຕ້ອງພາໄປ Place ຖືກແຫ່ງ, Source/Creator ຕ້ອງສະແດງ, ແລະ Map/Call/Message ຕ້ອງເປີດປາຍທາງຖືກຕ້ອງ.",
      "Place Data Gate ກຳນົດວ່າ 100 Place Records ສຳລັບ Pilot ຕ້ອງມີ Required Field ຄົບ ຫຼືສະແດງ Field ທີ່ຍັງບໍ່ຢືນຢັນຕາມ Policy. Trust Gate ກວດວ່າ Source, Creator, Verified ແລະ Sponsored ຖືກສະແດງຄົນລະຄວາມໝາຍ.",
      "Analytics Gate ກວດ Event ກັບ Test Log. Admin Gate ກວດວ່າສາມາດສ້າງ Place, ຈັບຄູ່ Source, ແກ້ຂໍ້ມູນ, ປິດ Content ແລະບັນທຶກ Correction/Takedown ໄດ້. ຖ້າເປີດ Place ຫຼື Action ບໍ່ໄດ້, ຂໍ້ມູນສຳຄັນຜິດ ຫຼືຕ້ອງ Re-host Content ໂດຍບໍ່ມີສິດ, ຖືວ່າຫ້າມປ່ອຍ.",
      "PRO-01 ກຳນົດ Core Acceptance ໃນລະດັບ Product. PRO-04 ຈະແຕກແຕ່ລະ Requirement ເປັນ Given/When/Then ຫຼື Testable Criteria, ແລະ DEL-02 ຈະກຳນົດ Test Case, ຜູ້ທົດສອບ, ຫຼັກຖານ ແລະຂັ້ນຕອນ UAT.",
    ],
    implications: [
      "ທຸກ Must Requirement ຕ້ອງມີຢ່າງໜ້ອຍ 1 Test Case ກ່ອນ Pilot.",
      "Defect ທີ່ຂັດຂວາງ Core Journey, Trust ຫຼືສິດໃນ Content ເປັນ Release Blocker.",
      "ຫຼັກຖານຮັບມອບຕ້ອງເກັບເປັນ Test Result, Screenshot/Log ຫຼືບັນທຶກການກວດທີ່ທວນຄືນໄດ້.",
    ],
  },
  {
    id: "pro01-traceability",
    label: "12 · TRACEABILITY AND CHANGE CONTROL",
    title: "Requirement ແຕ່ລະຂໍ້ຕ້ອງຕາມຮອຍໄປຫາ Design, Development ແລະ Test ໄດ້",
    question: "ເມື່ອເອກະສານຫຼາຍຂຶ້ນ ຈະຮູ້ໄດ້ແນວໃດວ່າ Requirement ໃດຖືກສ້າງ ແລະທົດສອບແລ້ວ?",
    paragraphs: [
      "Traceability ໝາຍເຖິງການເຊື່ອມ Requirement ID ໄປຫາ Use Case, Business Rule, Screen, API/Data, Development Task ແລະ Test Case. ຕົວຢ່າງ USR-04 ຄວນປາກົດໃນ Place Page Wireframe, Event Tracking Plan ແລະ Test Case ຂອງ Map/Call/Message.",
      "PRO-01 ເປັນ Product Baseline ສຳລັບເອກະສານຕໍ່ໄປ. PRO-02 ຈະວິເຄາະ Actor, Process ແລະ Business Rule; PRO-03 ຈະຄວບຄຸມ Scope ແລະ Priority; PRO-04 ຈະເຮັດ Acceptance Criteria ໃຫ້ລະອຽດ. UX, Technical ແລະ Delivery Documents ຕ້ອງອ້າງ Requirement ID ກັບຄືນມາ.",
      "ຖ້າຕ້ອງປ່ຽນ Requirement ທີ່ອະນຸມັດແລ້ວ, ຕ້ອງບັນທຶກເຫດຜົນ, ຜົນກະທົບຕໍ່ Scope/Cost/Time/Data ແລະເອກະສານທີ່ຕ້ອງປັບຕາມ. ການປ່ຽນຄຳໃນ PRD ໂດຍບໍ່ປັບ Test ຫຼື Design ຈະສ້າງເອກະສານທີ່ຂັດກັນ.",
    ],
    example: "ຖ້າຈະເພີ່ມ Filter “ເປີດຢູ່ຕອນນີ້”, Change Record ຕ້ອງກວດວ່າ Hours Data ຄົບ ແລະໃໝ່ພໍຫຼືບໍ່, ຕ້ອງປັບ Taxonomy, Search Logic, UI, Analytics ແລະ Test Case ຫຍັງແດ່, ກ່ອນປ່ຽນສະຖານະຈາກ Future ເປັນ MVP.",
  },
];

function FormulaBlock({ formula }: { formula: Formula }) {
  return (
    <div className={styles.documentFormula}>
      <header><b>{formula.name}</b><code>{formula.expression}</code></header>
      <p><strong>ໃຊ້ເພື່ອ:</strong> {formula.purpose}</p>
      <div><b>ຄວາມໝາຍຂອງຕົວແປ</b><ul>{formula.variables.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div><b>ຕົວຢ່າງຄຳນວນທີລະຂັ້ນ</b><ol>{formula.example.map((item) => <li key={item}>{item}</li>)}</ol></div>
      <p><strong>ວິທີອ່ານຜົນ:</strong> {formula.interpretation}</p>
      {formula.caution ? <p className={styles.documentCaution}><strong>ຂໍ້ຈຳກັດ:</strong> {formula.caution}</p> : null}
    </div>
  );
}

export default function ProductRequirementsDeepDive() {
  return (
    <div className={styles.documentDeepDive}>
      <header className={styles.documentReadingHeader}>
        <span>ສ່ວນທີ 1 · ເນື້ອຫາສະບັບລະອຽດ</span>
        <h2>ຄຳອະທິບາຍ Product Requirements Document ສະບັບເຕັມ</h2>
        <p>PRO-01 ກຳນົດວ່າ MVP ຂອງ “ພ້ອມໄປ” ຕ້ອງສ້າງຄຸນຄ່າໃຫ້ໃຜ, ຮອງຮັບ Journey ໃດ, ມີ Feature ແລະຂໍ້ມູນຫຍັງ, ມີຂອບເຂດຢູ່ໃສ ແລະຈະໃຊ້ຫຼັກຖານໃດຮັບມອບ.</p>
        <p>ເອກະສານນີ້ຮັກສາຂໍ້ຕັດສິນທີ່ອະນຸມັດແລ້ວ: Launch ທີ່ວຽງຈັນ, ເນັ້ນຮ້ານອາຫານ ແລະຄາເຟ, Video-first + Place-first, Guest-first, ໃຊ້ Map/Call/Message ແລະບໍ່ມີ Booking/Payment ໃນ MVP.</p>
      </header>

      <nav className={styles.documentToc} aria-label="ສາລະບານ PRO-01 ສະບັບລະອຽດ">
        <b>ສາລະບານ</b>
        <ol>{sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
      </nav>

      {sections.map((section) => (
        <section className={styles.documentArticleSection} id={section.id} key={section.id}>
          <span>{section.label}</span>
          <h2>{section.title}</h2>
          <p className={styles.documentQuestion}>{section.question}</p>
          <div className={styles.documentProse}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          {section.definitions ? <dl className={styles.documentDefinitions}>{section.definitions.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.meaning}</dd></div>)}</dl> : null}
          {section.example ? <aside className={styles.documentExample}><b>ຕົວຢ່າງ</b><p>{section.example}</p></aside> : null}
          {section.formulas?.map((formula) => <FormulaBlock formula={formula} key={formula.name} />)}
          {section.caution ? <p className={styles.documentSectionCaution}><strong>ຂໍ້ຈຳກັດ:</strong> {section.caution}</p> : null}
          {section.implications ? <div className={styles.documentImplications}><b>ຜົນຕໍ່ການດຳເນີນງານ</b><ul>{section.implications.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
        </section>
      ))}

      <div className={styles.documentReferenceDivider}>
        <span>ສ່ວນທີ 2</span>
        <h2>ຕາຕະລາງ, Journey ແບບ Interactive ແລະຂໍ້ຕັດສິນສຳລັບອ້າງອີງ</h2>
        <p>ເນື້ອຫາຕໍ່ຈາກນີ້ສະຫຼຸບ Requirement, Priority, Scope, Acceptance, Risk ແລະຂໍ້ຕັດສິນທີ່ອະນຸມັດ ເພື່ອໃຫ້ທີມງານຄົ້ນແລະອ້າງອີງໄດ້ໄວ.</p>
      </div>
    </div>
  );
}
