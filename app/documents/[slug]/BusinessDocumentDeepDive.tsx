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
type DetailSection = {
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
type DocumentDetail = { title: string; introduction: string[]; sections: DetailSection[] };

const documents: Partial<Record<"BUS-01" | "BUS-02" | "BUS-03" | "BUS-04" | "BUS-05" | "BUS-06", DocumentDetail>> = {
  "BUS-01": {
    title: "ຄຳອະທິບາຍ Product Vision ສະບັບເຕັມ",
    introduction: [
      "Product Vision ແມ່ນເອກະສານກຳນົດທິດທາງ: Platform ແກ້ບັນຫາຫຍັງ, ສ້າງໃຫ້ໃຜ, ຄຸນຄ່າຫຼັກແມ່ນຫຍັງ ແລະຂອບເຂດໃດທີ່ຍັງບໍ່ເຮັດ. ມັນບໍ່ແມ່ນລາຍການ Feature ຫຼືແຜນພັດທະນາ.",
      "ທຸກເອກະສານຫຼັງຈາກນີ້ຕ້ອງສອດຄ່ອງກັບ Vision. ຖ້າ Feature ໃດບໍ່ຊ່ວຍໃຫ້ຜູ້ໃຊ້ຄົ້ນພົບ, ຮູ້ຂໍ້ມູນພໍ ຫຼືກົດເພື່ອໄປ, Feature ນັ້ນບໍ່ຄວນເປັນຄວາມສຳຄັນໃນ MVP.",
    ],
    sections: [
      { id:"bus01-vision", label:"01 · VISION STATEMENT", title:"ຄວາມໝາຍຂອງວິໄສທັດ", question:"ຄຳວ່າ Video-first, Place-first ແລະ Decision-ready ລວມກັນແນວໃດ?", paragraphs:["Video-first ໝາຍເຖິງວິດີໂອເປັນຈຸດເລີ່ມຂອງການຄົ້ນພົບ ເພາະຊ່ວຍໃຫ້ເຫັນອາຫານ, ບັນຍາກາດ ແລະປະສົບການຈິງໄດ້ໄວ. ແຕ່ Platform ບໍ່ຈົບຢູ່ການເບິ່ງວິດີໂອ.","Place-first ໝາຍເຖິງທຸກ Content ຕ້ອງຈັບຄູ່ກັບສະຖານທີ່ຈິງໜຶ່ງແຫ່ງ. Decision-ready ໝາຍເຖິງໜ້າສະຖານທີ່ຕ້ອງມີຂໍ້ມູນພໍໃຫ້ເລືອກ ແລະມີປຸ່ມ Map, Call ຫຼື Message ເພື່ອລົງມືເຮັດ."], example:"ວິດີໂອ Creator 3 ຄົນທີ່ເວົ້າເຖິງຮ້ານດຽວກັນຕ້ອງເຊື່ອມເຂົ້າ Place Page ດຽວ, ບໍ່ສ້າງຮ້ານຊ້ຳ 3 ບັນທຶກ." },
      { id:"bus01-problem", label:"02 · PROBLEM", title:"ບັນຫາທີ່ Platform ຮັບຜິດຊອບ", question:"ບັນຫາແມ່ນການຂາດ Content ຫຼືການຂາດການຈັດລະບຽບ?", paragraphs:["Content ຣີວິວມີຢູ່ແລ້ວໃນຫຼາຍ Social Platform. ບັນຫາແມ່ນມັນກະແຈກກະຈາຍ, ຊອກຊ້ຳຍາກ, ຂໍ້ມູນຮ້ານບໍ່ຄົບ ແລະບໍ່ຮູ້ວ່າກວດຄັ້ງຫຼ້າສຸດເມື່ອໃດ.","Platform ຈຶ່ງບໍ່ຄວນໃຊ້ທຶນຫຼັກໄປຜະລິດ Content ແຂ່ງກັບ Creator. ໜ້າທີ່ຫຼັກແມ່ນຄັດເລືອກ Link, ຈັບຄູ່ກັບ Place, ກວດຂໍ້ມູນ ແລະສ້າງ Search/Filter ທີ່ຊ່ວຍຕັດສິນໃຈ."], implications:["ຕ້ອງມີ Canonical Place record", "ຕ້ອງມີ Source URL ແລະວັນກວດ", "ຕ້ອງວັດການເປີດ Place ແລະ Decision Action ບໍ່ແມ່ນຍອດ View ຢ່າງດຽວ"] },
      { id:"bus01-users", label:"03 · TARGET USERS", title:"ຜູ້ໃຊ້ຫຼັກ, ຝັ່ງຂໍ້ມູນ ແລະຜູ້ໃຊ້ອະນາຄົດ", question:"ເປັນຫຍັງບໍ່ສ້າງໃຫ້ທຸກຄົນພ້ອມກັນ?", paragraphs:["ຜູ້ໃຊ້ຫຼັກຂອງ Launch ແມ່ນຄົນໃນວຽງຈັນທີ່ຊອກຮ້ານອາຫານ ຫຼືຄາເຟຜ່ານ Social Media. ກຸ່ມນີ້ມີສະຖານະການໃຊ້ງານເກີດຊ້ຳ ແລະສາມາດທົດສອບຜົນ Map/Call/Message ໄດ້ງ່າຍ.","Place owner ແລະ Creator ແມ່ນຝັ່ງທີ່ໃຫ້ຂໍ້ມູນ/Content ແລະອາດເປັນລູກຄ້າ ຫຼືຄູ່ຮ່ວມ. ນັກທ່ອງທ່ຽວ, ທີ່ພັກ ແລະສະຖານທີ່ທ່ອງທ່ຽວເປັນ Phase ຕໍ່ໄປ ເພາະມີພາສາ, ຂໍ້ມູນ ແລະ Journey ຕ່າງອອກໄປ."], definitions:[{term:"Primary user",meaning:"ຄົນທີ່ Product ຕ້ອງແກ້ບັນຫາໃຫ້ດີທີ່ສຸດໃນ Launch."},{term:"Supply side",meaning:"ຮ້ານ ແລະ Creator ທີ່ຊ່ວຍໃຫ້ Platform ມີຂໍ້ມູນແລະ Content."},{term:"Future user",meaning:"ກຸ່ມທີ່ມີຄຸນຄ່າແຕ່ຍັງບໍ່ກຳນົດ Requirement ໃຫ້ໃນ MVP."}] },
      { id:"bus01-value", label:"04 · VALUE PROPOSITION", title:"Discover → Decide → Act", question:"Platform ຕ້ອງພາຜູ້ໃຊ້ຜ່ານ 3 ຂັ້ນແນວໃດ?", paragraphs:["Discover ແມ່ນການເຫັນຕົວເລືອກຜ່ານວິດີໂອ. Decide ແມ່ນການເປີດ Place Page ເພື່ອກວດສອບລາຄາ, ເວລາ, Location, ການຕິດຕໍ່ ແລະ Source. Act ແມ່ນການກົດແຜນທີ່, ໂທ ຫຼືສົ່ງຂໍ້ຄວາມ.","ຖ້າ Feed ມີວິດີໂອສວຍແຕ່ບໍ່ພາໄປ Place Page, Platform ເຮັດໄດ້ພຽງ Discover. ຖ້າ Place Page ມີຂໍ້ມູນແຕ່ປຸ່ມ Action ໃຊ້ບໍ່ໄດ້, Platform ຍັງບໍ່ສົ່ງມອບຄຸນຄ່າຄົບ."], example:"ຜູ້ໃຊ້ຄົ້ນ “ຄາເຟເຮັດວຽກ ລາຄາບໍ່ແພງ” → ເຫັນວິດີໂອ → ເປີດຮ້ານ → ກວດ Wi‑Fi/ລາຄາ/ເວລາ → ກົດ Map." },
      { id:"bus01-principles", label:"05 · PRODUCT PRINCIPLES", title:"ຫຼັກທີ່ໃຊ້ຕັດສິນເມື່ອມີຫຼາຍທາງເລືອກ", question:"Principle ຕ່າງຈາກ Feature ແນວໃດ?", paragraphs:["Feature ແມ່ນສິ່ງທີ່ລະບົບເຮັດ; Principle ແມ່ນກົດທີ່ໃຊ້ເລືອກວ່າຄວນເຮັດ Feature ແນວໃດ. Video-first ກຳນົດຈຸດເລີ່ມ, Place-first ກຳນົດໂຄງສ້າງຂໍ້ມູນ, Decision-ready ກຳນົດຂໍ້ມູນບັງຄັບ ແລະ Source-transparent ກຳນົດຄວາມໂປ່ງໃສ.","Contact-first MVP ປ້ອງກັນບໍ່ໃຫ້ Booking ກາຍເປັນ Roadblock. Simple before AI ປ້ອງກັນການໃຊ້ AI ກ່ອນມີຂໍ້ມູນພໍ; ໄລຍະທຳອິດໃຊ້ Category, Tag, Filter ແລະ Rule ທີ່ອະທິບາຍໄດ້."], implications:["ທຸກ Content ຕ້ອງມີ Place ປາຍທາງ", "Sponsored ຕ້ອງມີ Label", "ບໍ່ສ້າງ AI recommendation ຈົນກວ່າມີຂໍ້ມູນ ແລະ Baseline ພໍ"] },
      { id:"bus01-scope", label:"06 · MVP BOUNDARY", title:"ສິ່ງທີ່ເຮັດ ແລະສິ່ງທີ່ຕັ້ງໃຈບໍ່ເຮັດ", question:"ເປັນຫຍັງ Non-goal ຈຶ່ງສຳຄັນ?", paragraphs:["In scope ແມ່ນຄວາມສາມາດຕ່ຳສຸດທີ່ຕ້ອງມີເພື່ອທົດສອບ Journey: Feed, Search/Filter, Place Page, Source link, Map/Call/Message, Save/Share, Admin workflow ແລະ Analytics.","Non-goal ບໍ່ໄດ້ໝາຍວ່າ Feature ນັ້ນບໍ່ດີ. ມັນໝາຍເຖິງ Feature ນັ້ນບໍ່ຈຳເປັນຕໍ່ຫຼັກຖານທີ່ Pilot ຕ້ອງການ. Booking, Payment, Social network, Creator marketplace ແລະ AI ຊັບຊ້ອນຈະເພີ່ມຕົ້ນທຶນໂດຍຍັງບໍ່ຊ່ວຍຕອບຄຳຖາມຫຼັກ."], example:"ຖ້າ User ຂໍໃຫ້ຈອງໂຕະ, MVP ສາມາດໃຫ້ປຸ່ມ Call/Message ຫາຮ້ານ. ບໍ່ຈຳເປັນສ້າງ Calendar, Inventory ແລະ Payment ຂອງ Platform." },
      { id:"bus01-difference", label:"07–08 · DIFFERENTIATION & BUSINESS ALIGNMENT", title:"ຈຸດຕ່າງຈາກ Social Media ແລະການເຊື່ອມກັບລາຍຮັບ", question:"ເປັນຫຍັງ Platform ບໍ່ຄວນແຂ່ງດ້ານ Watch time?", paragraphs:["Social feed ຈັດໂຄງສ້າງຕາມ Content/Creator ແລະມັກພາໄປຫາວິດີໂອຕໍ່ໄປ. “ພ້ອມໄປ” ຈັດຕາມ Place/Category ແລະພາໄປ Map/Call/Message. ດັ່ງນັ້ນຍອດເບິ່ງດົນບໍ່ແມ່ນຜົນລັບຫຼັກ.","ລາຍຮັບຈະຍືນຍົງກໍ່ຕໍ່ເມື່ອຮ້ານເຫັນຫຼັກຖານການຕິດຕໍ່ ຫຼືເຈດຕະນາໄປຮ້ານ. Basic listing ສ້າງ Supply, Founding Partner/Pro ຂາຍບໍລິການຂໍ້ມູນແລະລາຍງານ, Sponsored ຂາຍ Visibility ທີ່ມີປ້າຍ."], definitions:[{term:"Organic result",meaning:"ຜົນທີ່ຈັດຕາມ Relevance/ກົດທຳມະຊາດ ໂດຍບໍ່ຮັບເງິນ."},{term:"Sponsored result",meaning:"ພື້ນທີ່ສະແດງທີ່ຮ້ານຈ່າຍເງິນ ແລະຕ້ອງມີປ້າຍຊັດເຈນ."},{term:"Decision Intent",meaning:"ການກົດ Map/Call/Message ທີ່ສະແດງເຈດຕະນາ ແຕ່ບໍ່ຢືນຢັນການຊື້."}] },
      { id:"bus01-proof", label:"09–12 · ASSUMPTIONS, SIGNALS & DECISIONS", title:"ຫຼັກຖານທີ່ Vision ຕ້ອງຜ່ານ", question:"ຈະຮູ້ໄດ້ແນວໃດວ່າ Vision ນີ້ຖືກທາງ?", paragraphs:["Vision ຍັງຕັ້ງຢູ່ເທິງສົມມຸດຖານ: ຫາ Content ໄດ້ພໍ, User ເຫັນວ່າຄົ້ນຫາງ່າຍກວ່າ, ຂໍ້ມູນຮັກສາໃຫ້ສົດໄດ້, ຮ້ານພ້ອມຈ່າຍ ແລະການໃຊ້ Link/Preview ໂປ່ງໃສ.","ສັນຍານບວກຕ້ອງປະກອບມີ Place ທີ່ກວດແລ້ວ, User ເປີດ Place ແລະກົດ Decision Action, User ກັບມາໃຊ້, ຮ້ານຮ່ວມແກ້ຂໍ້ມູນ ແລະມີຫຼັກຖານການຈ່າຍ. ຖ້າມີແຕ່ຍອດ View ສູງ Vision ຍັງບໍ່ຖືກພິສູດ."], implications:["Launch ວຽງຈັນ ແລະ 2 ໝວດ", "ບໍ່ Re-host ວິດີໂອຖ້າບໍ່ມີສິດ", "Platform ຮັກສາ Canonical Place record", "ແຍກ Source linked, Verified ແລະ Sponsored", "ຊື່ “ພ້ອມໄປ” ຍັງເປັນ Working name ຈົນກວ່າກວດ Brand/Domain/Legal"] },
    ],
  },
  "BUS-02": {
    title: "ຄຳອະທິບາຍ Market & Competitor Analysis ສະບັບເຕັມ",
    introduction: [
      "ເອກະສານນີ້ບໍ່ພຽງລຽງລາຍຊື່ຄູ່ແຂ່ງ. ມັນອະທິບາຍວ່າຜູ້ໃຊ້ແກ້ບັນຫາດ້ວຍວິທີໃດໃນປັດຈຸບັນ, ຂັ້ນໃດຍັງບໍ່ສະດວກ, Platform ຈະສ້າງຄຸນຄ່າຕ່າງຈາກທາງເລືອກເດີມແນວໃດ ແລະຫຼັກຖານໃດຈະເຮັດໃຫ້ຂໍ້ສັນນິຖານນີ້ເຊື່ອໄດ້.",
      "ສະບັບ 1.0 ແມ່ນ Pre-Pilot Baseline ທີ່ອະນຸມັດໃຫ້ນຳໄປທົດສອບ. ມັນລວມ Desk research, ຄູ່ແຂ່ງລາຍຊື່ຈິງ, ຂໍ້ມູນຕະຫຼາດເບື້ອງຕົ້ນ ແລະ Founder observation; ສິ່ງທີ່ຍັງບໍ່ຜ່ານ Pilot ຍັງຄົງປ້າຍ “ສົມມຸດຖານ” ຢ່າງຊັດເຈນ.",
    ],
    sections: [
      { id:"bus02-thesis", label:"01 · MARKET THESIS", title:"ຊ່ອງວ່າງແມ່ນການຈັດລະບຽບ ບໍ່ແມ່ນການຂາດ Content", question:"ບັນຫາຕະຫຼາດທີ່ Platform ຕ້ອງແກ້ແມ່ນຫຍັງ?", paragraphs:["ວິດີໂອຣີວິວຮ້ານອາຫານ ແລະຄາເຟມີຢູ່ແລ້ວໃນ TikTok, Facebook ແລະ YouTube. ສິ່ງທີ່ຂາດແມ່ນການຈັດວິດີໂອເຫຼົ່ານັ້ນເຂົ້າຫາ Place ດຽວ, ການຄົ້ນຕາມເຂດ/ປະເພດ/ລາຄາ ແລະຂໍ້ມູນທີ່ພາຈາກຄວາມສົນໃຈໄປສູ່ການເດີນທາງ.","ດັ່ງນັ້ນ Platform ບໍ່ຄວນວາງຕົວເປັນ Social network ໃໝ່. ມັນເປັນ Decision portal ທີ່ໃຊ້ Social content ເປັນຫຼັກຖານພາບ ແລະໃຊ້ Place data ເປັນຫຼັກຖານສຳລັບການໄປ."], implications:["ບໍ່ໃຊ້ງົບຫຼັກເພື່ອຜະລິດ Content ເອງ", "ທຸກວິດີໂອຕ້ອງຈັບຄູ່ກັບ Place", "ວັດ Map/Call/Message ເໜືອຍອດເບິ່ງ"] },
      { id:"bus02-boundary", label:"02 · MARKET BOUNDARY", title:"ຕະຫຼາດທີ່ເຂົ້າໄປ ແລະຕະຫຼາດທີ່ບໍ່ເຂົ້າໄປ", question:"Platform ກຳລັງແຂ່ງໃນຕະຫຼາດໃດ?", paragraphs:["ຕະຫຼາດຫຼັກແມ່ນການຊ່ວຍຄົນຄົ້ນພົບ, ກວດຂໍ້ມູນ ແລະເລືອກສະຖານທີ່. ຄູ່ແຂ່ງຈຶ່ງບໍ່ມີແຕ່ Website ຄ້າຍກັນ; ມັນລວມ Social search, Map, ໜ້າຮ້ານ ແລະການຖາມໝູ່.","ຕະຫຼາດທີ່ບໍ່ເຂົ້າໄປໃນ MVP ແມ່ນ Creator social network, Online Travel Agency, Booking, Payment ແລະ Delivery. ການລະບຸຂອບເຂດນີ້ປ້ອງກັນບໍ່ໃຫ້ການປຽບທຽບຄູ່ແຂ່ງຜິດປະເດັນ."], definitions:[{term:"Direct competitor",meaning:"ທາງເລືອກທີ່ແກ້ Task ດຽວກັນດ້ວຍ Flow ໃກ້ຄຽງກັນ."},{term:"Indirect competitor",meaning:"ທາງເລືອກຄົນລະຮູບແບບທີ່ຜູ້ໃຊ້ຍັງເລືອກເພື່ອໃຫ້ Task ສຳເລັດ."},{term:"Substitute",meaning:"ພຶດຕິກຳທົດແທນ ເຊັ່ນ ຖາມໝູ່ ຫຼືໄປຮ້ານເດີມ."}] },
      { id:"bus02-behavior", label:"03–04 · USER BEHAVIOR & JOBS TO BE DONE", title:"ຈາກ Discover ໄປຫາ Act", question:"ຜູ້ໃຊ້ກຳລັງພະຍາຍາມເຮັດຫຍັງ?", paragraphs:["User journey ມີ 3 ວຽກ: Discover ເມື່ອຍັງບໍ່ຮູ້ຈະໄປໃສ, Verify ເມື່ອເຫັນຮ້ານແລ້ວແຕ່ຕ້ອງກວດລາຄາ/ເວລາ/ທີ່ຕັ້ງ, ແລະ Act ເມື່ອພ້ອມກົດ Map, Call ຫຼື Message.","Social Media ເຮັດ Discover ໄດ້ດີ ແຕ່ Verify ແລະ Act ມັກຕ້ອງອອກໄປອີກ App. Platform ຈະມີຄຸນຄ່າກໍ່ເມື່ອຫຼຸດການຄົ້ນຊ້ຳ ແລະການສະຫຼັບ App ໄດ້."], example:"User ເຫັນວິດີໂອຄາເຟ → ຕ້ອງເຂົ້າ Facebook ຂອງຮ້ານຫາເວລາ → ເຂົ້າ Map ຫາພິກັດ → ກັບມາ Message. Platform ທີ່ດີຈະລວມຂໍ້ມູນແລະປຸ່ມເຫຼົ່ານີ້ໃນ Place Page ດຽວ." },
      { id:"bus02-alternatives", label:"05 · COMPETITIVE ALTERNATIVES", title:"ປຽບທຽບຕາມໜ້າທີ່ ບໍ່ແມ່ນຕາມຮູບຮ່າງໜ້າເວັບ", question:"ເປັນຫຍັງ TikTok, Map ແລະໜ້າຮ້ານຈຶ່ງເປັນຄູ່ແຂ່ງພ້ອມກັນ?", paragraphs:["TikTok/Facebook/YouTube ຊະນະດ້ານ Content ແລະການຄົ້ນພົບ. Map/Search ຊະນະດ້ານພິກັດ ແລະເສັ້ນທາງ. ໜ້າ Social ຂອງຮ້ານຊະນະດ້ານຂໍ້ມູນທາງການ. Directory ຊະນະດ້ານການຈັດໝວດ.","Platform ບໍ່ຄວນພະຍາຍາມຊະນະທຸກຈຸດ. ຈຸດຕ່າງຄືການເຊື່ອມຈຸດແຂງເຫຼົ່ານັ້ນເປັນ Video → Place → Action ພ້ອມບອກ Source ຢ່າງໂປ່ງໃສ."], implications:["ໃຊ້ Social platform ເປັນ Source ບໍ່ແມ່ນສັດຕູ", "ໃຊ້ Map ເປັນປາຍທາງການເດີນທາງ", "ບໍ່ອ້າງວ່າຂໍ້ມູນຈາກ Creator ເປັນຂໍ້ມູນທາງການຂອງຮ້ານ"] },
      { id:"bus02-gap", label:"06 · MARKET GAP", title:"ຄຸນຄ່າ 4 ຊັ້ນທີ່ຕ້ອງມີພ້ອມກັນ", question:"ສິ່ງໃດເຮັດໃຫ້ Platform ຕ່າງຢ່າງມີນ້ຳໜັກ?", paragraphs:["ຊັ້ນທີ 1 ແມ່ນ Video discovery; ຊັ້ນທີ 2 ແມ່ນ Canonical Place ທີ່ລວມຫຼາຍ Source; ຊັ້ນທີ 3 ແມ່ນຂໍ້ມູນຕັດສິນໃຈທີ່ກວດແລ້ວ; ຊັ້ນທີ 4 ແມ່ນ Action ທີ່ກົດໄດ້ທັນທີ.","ຖ້າຂາດຊັ້ນໃດຊັ້ນໜຶ່ງ Platform ຈະກາຍເປັນສິ່ງທີ່ມີຢູ່ແລ້ວ: ມີວິດີໂອແຕ່ບໍ່ມີ Place ກໍຄື Social feed; ມີ Place ແຕ່ບໍ່ມີ Video ກໍຄື Directory; ມີຂໍ້ມູນແຕ່ບໍ່ມີ Action ກໍຍັງບໍ່ຈົບ Journey."], definitions:[{term:"Canonical Place",meaning:"ບັນທຶກຫຼັກພຽງໜຶ່ງອັນຕໍ່ສະຖານທີ່ ເພື່ອບໍ່ໃຫ້ຂໍ້ມູນ ແລະຣີວິວແຕກເປັນຫຼາຍໜ້າ."},{term:"Decision-ready data",meaning:"ຂໍ້ມູນທີ່ຜູ້ໃຊ້ຕ້ອງຮູ້ກ່ອນໄປ ເຊັ່ນ ລາຄາ, ເວລາ, ທີ່ຕັ້ງ, ການຕິດຕໍ່ ແລະວັນກວດ."}] },
      { id:"bus02-entry", label:"07–08 · BEACHHEAD & TWO-SIDED MARKET", title:"ເລີ່ມນ້ອຍ ແຕ່ຕ້ອງສ້າງສອງຝັ່ງ", question:"ເປັນຫຍັງ Launch ຄວນຈຳກັດຢູ່ວຽງຈັນ ແລະ 2 ໝວດ?", paragraphs:["Beachhead market ແມ່ນຕະຫຼາດເລີ່ມຕົ້ນທີ່ແຄບພໍໃຫ້ຂໍ້ມູນໜາແໜ້ນ ແລະກວດຜົນໄດ້. ວຽງຈັນ + ຮ້ານອາຫານ/ຄາເຟມີການຕັດສິນໃຈເກີດຊ້ຳ ແລະການກົດ Map/Call/Message ວັດໄດ້ງ່າຍກວ່າ Journey ທ່ອງທ່ຽວເຕັມຮູບແບບ.","Two-sided market ໝາຍເຖິງຄຸນຄ່າຝັ່ງ User ຂຶ້ນກັບການມີ Place/Content ພໍ, ແລະຄຸນຄ່າຝັ່ງຮ້ານ/Creator ຂຶ້ນກັບການມີ User ທີ່ຕັ້ງໃຈໄປ. Pilot ຈຶ່ງຕ້ອງສ້າງ Supply ແລະ Demand ຄຽງຄູ່ກັນ."], implications:["ບໍ່ຂະຫຍາຍເມືອງ/ໝວດກ່ອນຂໍ້ມູນໃນ Beachhead ໜາແໜ້ນ", "ວັດທັງຈຳນວນ Place ທີ່ກວດແລ້ວ ແລະຈຳນວນ User ທີ່ສະແດງ Decision Intent"] },
      { id:"bus02-position", label:"09–10 · POSITIONING & DEFENSIBILITY", title:"ຕຳແໜ່ງທີ່ຕ້ອງສື່ ແລະຄວາມໄດ້ປຽບທີ່ຕ້ອງສ້າງ", question:"ຖ້າ Feed ຖືກລອກໄດ້ ອັນໃດຈະເປັນຄວາມໄດ້ປຽບ?", paragraphs:["Positioning ທີ່ຕ້ອງການແມ່ນ “ເບິ່ງຣີວິວ, ກວດຂໍ້ມູນ ແລະໄປຫາສະຖານທີ່ໄດ້ໃນ Flow ດຽວ.” ມັນບໍ່ໄດ້ສັນຍາວ່າມີ Content ຫຼາຍກວ່າ Social Media; ມັນສັນຍາວ່າຈັດ Content ໃຫ້ໃຊ້ຕັດສິນໃຈງ່າຍກວ່າ.","ຄວາມໄດ້ປຽບທີ່ສະສົມໄດ້ແມ່ນ Taxonomy ພາສາລາວ, Place graph, ປະຫວັດການກວດຂໍ້ມູນ, ການຈັບຄູ່ Content-Place, ຂໍ້ມູນ Decision Intent ແລະຄວາມສຳພັນກັບຮ້ານ/Creator. ສິ່ງເຫຼົ່ານີ້ສ້າງຊ້າແຕ່ລອກຍາກກວ່າ UI."], definitions:[{term:"Positioning",meaning:"ຄວາມໝາຍສັ້ນໆທີ່ຢາກໃຫ້ຜູ້ໃຊ້ຈື່ຈຳເມື່ອປຽບທຽບ Product ກັບທາງເລືອກອື່ນ."},{term:"Defensibility",meaning:"ຄວາມໄດ້ປຽບທີ່ຄູ່ແຂ່ງບໍ່ສາມາດສ້າງຕາມໄດ້ທັນທີດ້ວຍການລອກ Feature."}] },
      { id:"bus02-proof", label:"12–15 · RISKS, EVIDENCE & APPROVAL", title:"ສິ່ງທີ່ອາດເຮັດໃຫ້ Market thesis ຜິດ", question:"ຫຼັກຖານໃດຈະຊ່ວຍຢືນຢັນ, ປັບ ຫຼືປະຕິເສດຂໍ້ສັນນິຖານ?", paragraphs:["ຄວາມສ່ຽງຫຼັກຄື User ອາດພໍໃຈກັບ Social search ເດີມ, ຂໍ້ມູນອາດບໍ່ພໍ, User ອາດເບິ່ງວິດີໂອແຕ່ບໍ່ກົດໄປຮ້ານ, ແລະຮ້ານອາດບອກວ່າສົນໃຈແຕ່ບໍ່ຈ່າຍ.","ຫຼັກຖານຕ້ອງເກັບຈາກ Task test, Funnel event, ຈຳນວນ Place ທີ່ກວດແລ້ວ, ເວລາດູແລຂໍ້ມູນ, ການໃຊ້ຊ້ຳ ແລະ Payment/deposit. ຄຳຊົມ, Like ແລະຄຳວ່າ “ຈະໃຊ້” ບໍ່ຄວນໃຊ້ແທນພຶດຕິກຳຈິງ."], implications:["BUS-02 1.0 ເປັນ Baseline ທີ່ອະນຸມັດເພື່ອ Pilot ບໍ່ແມ່ນຄຳຢືນຢັນວ່າ Product-market fit ສຳເລັດແລ້ວ", "ຜົນ Pilot ອາດພາໄປສູ່ Go, Adjust ຫຼື No-go ແລະບັນທຶກໃນ 1.1", "ທຸກຫຼັກຖານຕ້ອງບັນທຶກວັນທີ, ແຫຼ່ງທີ່ມາ, Sample ແລະຂໍ້ຈຳກັດ"] },
    ],
  },
  "BUS-04": {
    title: "ຄຳອະທິບາຍ Feasibility Study ສະບັບເຕັມ",
    introduction: ["Feasibility Study ບໍ່ແມ່ນເອກະສານພິສູດວ່າໄອເດຍຈະສຳເລັດ. ມັນແມ່ນແຜນຫາຫຼັກຖານກ່ອນລົງທຶນຫຼາຍ: ທົດສອບຜູ້ໃຊ້, Content, Operation, Technology, Rights/Trust ແລະ Revenue.","ທຸກດ້ານຕ້ອງມີເກນ “ໄປຕໍ່”, “ປັບກ່ອນ” ແລະ “ຢຸດ”. ການມີຜົນດີດ້ານໜຶ່ງບໍ່ສາມາດຊົດເຊີຍຄວາມສ່ຽງຮ້າຍແຮງອີກດ້ານໜຶ່ງ."],
    sections: [
      { id:"bus04-verdict", label:"01–03 · VERDICT, BOUNDARY & SCORECARD", title:"ຂໍ້ສະຫຼຸບແບບມີເງື່ອນໄຂ", question:"ຄຳວ່າ “ເປັນໄປໄດ້ແບບມີເງື່ອນໄຂ” ໝາຍເຖິງຫຍັງ?", paragraphs:["ມັນໝາຍເຖິງແນວຄິດມີເຫດຜົນພໍໃຫ້ທົດສອບຕໍ່ ແຕ່ຍັງບໍ່ມີຫຼັກຖານພໍໃຫ້ສ້າງລະບົບເຕັມ, ຈ້າງທີມຖາວອນ ຫຼືເປີດທົ່ວປະເທດ. ການອະນຸມັດແມ່ນອະນຸມັດ Pilot ທີ່ຈຳກັດຂອບເຂດ.","Scorecard ແຍກສະຖານະແຕ່ລະດ້ານເພື່ອບໍ່ໃຫ້ຄວາມຕື່ນເຕັ້ນດ້ານ Product ປິດບັງບັນຫາດ້ານ Content rights, Cost ຫຼື Revenue. ສະຖານະຕ້ອງອັບເດດຈາກຫຼັກຖານ ບໍ່ແມ່ນຄວາມເຫັນ."], definitions:[{term:"Go",meaning:"ຫຼັກຖານຜ່ານເກນ ແລະອະນຸຍາດໃຫ້ເປີດງົບ/ຂັ້ນຕໍ່ໄປ."},{term:"Adjust",meaning:"ຍັງເຫັນຄຸນຄ່າ ແຕ່ຕ້ອງຫຼຸດຂອບເຂດ, ປ່ຽນ Flow, ລາຄາ ຫຼືວິທີດຳເນີນງານ."},{term:"No-go",meaning:"ຄວາມສ່ຽງ ຫຼືຜົນທົດສອບບອກວ່າບໍ່ຄວນໃຊ້ງົບຕໍ່ໃນຮູບແບບເດີມ."}] },
      { id:"bus04-market", label:"04 · MARKET FEASIBILITY", title:"ພິສູດວ່າບັນຫາມີຄ່າພໍໃຫ້ປ່ຽນພຶດຕິກຳ", question:"ການມີຄົນກົດ Like ຫຼືເບິ່ງວິດີໂອຫຼາຍພິສູດຕະຫຼາດຫຼືບໍ່?", paragraphs:["ບໍ່ພິສູດ. Market feasibility ຕ້ອງກວດວ່າ User ມີ Task ຈິງ—ເຊັ່ນ ຊອກຮ້ານໃນເຂດໃດໜຶ່ງ ພາຍໃນງົບກຳນົດ—ແລະວິທີປັດຈຸບັນຊ້າ, ສັບສົນ ຫຼືຂາດຂໍ້ມູນ.","ການທົດສອບຄວນໃຫ້ User ເຮັດ Task ດ້ວຍວິທີເດີມ ແລະ Prototype, ບັນທຶກເວລາ, ຈຸດຕິດຂັດ, ການເຮັດສຳເລັດ ແລະຄວາມຢາກໃຊ້ຊ້ຳ. ຄຳຖາມ “ມັກໄອເດຍບໍ?” ໃຫ້ຫຼັກຖານອ່ອນກວ່າພຶດຕິກຳຈິງ."], example:"ໃຫ້ 20 ຄົນຫາຄາເຟທີ່ເປີດແລງ, ຢູ່ເຂດສີສັດຕະນາກ ແລະລາຄາປານກາງ. ກວດວ່າເຂົາພົບຮ້ານ, ເຂົ້າໃຈຂໍ້ມູນ ແລະກົດ Map ໄດ້ໂດຍບໍ່ມີຜູ້ຊ່ວຍຫຼືບໍ່." },
      { id:"bus04-content", label:"05 · CONTENT & OPERATIONS", title:"Cold start ແລະຕົ້ນທຶນການຮັກສາຂໍ້ມູນ", question:"ສາມາດສ້າງຖານຂໍ້ມູນພໍໃຫ້ Platform ມີປະໂຫຍດໄດ້ຫຼືບໍ່?", paragraphs:["Cold start ໝາຍເຖິງໄລຍະທີ່ຍັງບໍ່ມີ Creator ຫຼື Shop ສົ່ງຂໍ້ມູນເຂົ້າລະບົບເອງ. ທີມຕ້ອງຄັດ Link, ສ້າງ Place, ຈັບຄູ່ Source, ກວດ Field ແລະແກ້ Duplicate ແບບ Manual.","ການມີ 100 Place records ບໍ່ພຽງພໍຖ້າຂໍ້ມູນບໍ່ຄົບ ຫຼືຕົ້ນທຶນຕໍ່ຮ້ານສູງເກີນໄປ. ຕ້ອງວັດນາທີຕໍ່ Record, ອັດຕາ Duplicate, ຈຳນວນ Link ທີ່ໃຊ້ໄດ້, ອັດຕາຂໍ້ມູນຂາດ ແລະຈຳນວນຄຳຮ້ອງແກ້ໄຂ."], implications:["ຖ້າ 100 Place ໃຫຍ່ເກີນໄປ ໃຫ້ຫຼຸດເຂດ ຫຼືໝວດ", "ທຸກ Field ສຳຄັນຕ້ອງມີ Source ແລະວັນກວດ", "ຕ້ອງມີ Workflow Correction/Takedown ກ່ອນ Public launch"] },
      { id:"bus04-tech", label:"06 · TECHNICAL FEASIBILITY", title:"ພິສູດ Journey ໂດຍບໍ່ສ້າງລະບົບເກີນຈຳເປັນ", question:"Technology ຕ້ອງພິສູດຫຍັງໃນ Pilot?", paragraphs:["Pilot ຕ້ອງພິສູດວ່າ Feed ໂຫຼດໃນ Mobile network ໄດ້, Search/Filter ພາຫາ Place ຖືກ, Official embed ຫຼື Preview ມີ Fallback, Map/Call/Message deep link ເປີດປາຍທາງໄດ້ ແລະ Analytics ນັບ Event ໄດ້ຖືກ.","ບໍ່ຕ້ອງພິສູດ Booking, Payment, Native app, AI recommendation ຊັບຊ້ອນ ຫຼືລະບົບ Creator marketplace. ການສ້າງສິ່ງເຫຼົ່ານີ້ກ່ອນຈະບໍ່ໃຫ້ຫຼັກຖານເພີ່ມກັບ Core Journey."], example:"ຖ້າ TikTok embed ໂຫຼດບໍ່ໄດ້, Page ຕ້ອງຍັງສະແດງຂໍ້ມູນ Place ແລະມີປຸ່ມໄປ Source; External content ບໍ່ຄວນຂັດຂວາງການກົດ Map." },
      { id:"bus04-trust", label:"07 · LEGAL & TRUST FEASIBILITY", title:"ສິດຂອງ Content ແລະຄວາມໂປ່ງໃສ", question:"Link ໄປຫາຕົ້ນສະບັບຊ່ວຍຫຼຸດຄວາມສ່ຽງແນວໃດ?", paragraphs:["Platform ຕ້ອງເກັບ Canonical URL, ຊື່ Creator, Source platform ແລະວັນກວດ. ໃຊ້ Official embed/Preview ເມື່ອເງື່ອນໄຂອະນຸຍາດ; ຖ້າໃຊ້ບໍ່ໄດ້ໃຫ້ສະແດງ Fallback + Link. ບໍ່ Download/Re-host ວິດີໂອໂດຍບໍ່ມີສິດ.","ຄວາມໜ້າເຊື່ອຖືຕ້ອງແຍກ 3 ປ້າຍ: Source linked ບອກວ່າມີລິ້ງຕົ້ນສະບັບ, Place verified ບອກວ່າຂໍ້ມູນຮ້ານຖືກກວດ, Sponsored ບອກວ່າຮ້ານຈ່າຍເພື່ອການສະແດງ. ສາມປ້າຍນີ້ບໍ່ສາມາດໃຊ້ແທນກັນ."], caution:"ເອກະສານນີ້ກຳນົດຫຼັກການ Product; ກ່ອນ Public launch ຕ້ອງໃຫ້ຜູ້ຊ່ຽວຊານກວດກົດໝາຍລາວ, Privacy, Advertising ແລະ Terms ຂອງແຕ່ລະ Platform." },
      { id:"bus04-finance", label:"08 · FINANCIAL FEASIBILITY", title:"ພິສູດວ່າຄຸນຄ່າມີຄົນພ້ອມຈ່າຍ", question:"ຄຳວ່າ “ສົນໃຈ” ຕ່າງຈາກຫຼັກຖານລາຍຮັບແນວໃດ?", paragraphs:["ຄຳເວົ້າວ່າ “ຖ້າເຮັດແລ້ວຈະໃຊ້” ເປັນ Feedback ແຕ່ບໍ່ແມ່ນລາຍຮັບ. ຫຼັກຖານທີ່ແຂງກວ່າແມ່ນການຊຳລະ, ມັດຈຳທີ່ມີເງື່ອນໄຂ, ຫຼືໜັງສືສະແດງເຈດຈຳນົງທີ່ລົງນາມ.","ເກນ Pilot ແມ່ນເຂົ້າຫາ 30 ຮ້ານ ແລະຕ້ອງໄດ້ຢ່າງໜ້ອຍ 3 ຮ້ານຊຳລະ/ວາງມັດຈຳ ບວກ 2 ໜັງສືສະແດງເຈດຈຳນົງ. ເກນນີ້ອະນຸຍາດໃຫ້ທົດສອບຕໍ່; ບໍ່ໄດ້ອະນຸຍາດໃຫ້ຂະຫຍາຍທີມ."], example:"ຖ້າ 20 ຮ້ານເວົ້າວ່າສົນໃຈ ແຕ່ບໍ່ມີຮ້ານໃດຈ່າຍ, ວາງມັດຈຳ ຫຼືລົງນາມ ເກນ Revenue ບໍ່ຜ່ານ." },
      { id:"bus04-plan", label:"09–10 · SIX-WEEK PLAN & PILOT CONTROL", title:"ແຜນ 6 ອາທິດ, ຜູ້ຮັບຜິດຊອບ ແລະງົບ", question:"ເປັນຫຍັງແບ່ງເປັນ 3 ງວດ?", paragraphs:["ແຕ່ລະງວດ 2 ອາທິດຕ້ອງຕອບຄຳຖາມທີ່ແຕກຕ່າງ: ງວດ 1 ກວດບັນຫາ ແລະຫາ Source/Place; ງວດ 2 ທົດສອບ Prototype ແລະ Core Journey; ງວດ 3 ທົດສອບຮ້ານ, ລາຄາ ແລະຫຼັກຖານລາຍຮັບ.","ງົບ 30%/35%/35% ແມ່ນຂີດຈຳກັດການອະນຸຍາດໃຊ້ເງິນ ບໍ່ແມ່ນເປົ້າວ່າຕ້ອງໃຊ້ໃຫ້ໝົດ. ງວດຕໍ່ໄປເປີດໄດ້ສະເພາະເມື່ອຫຼັກຖານງວດກ່ອນຜ່ານ Gate ແລະມີບັນທຶກຜູ້ອະນຸມັດ."], implications:["Founder ເປັນ Decision owner ໃນ Pilot", "ທຸກລາຍຈ່າຍຕ້ອງຜູກກັບຫຼັກຖານທີ່ຕ້ອງການ", "ຖ້າ Gate ບໍ່ຜ່ານ ຕ້ອງຢຸດງົບກ່ອນປັບແຜນ"] },
      { id:"bus04-gates", label:"11–14 · GATES, RISKS, EVIDENCE & PARAMETERS", title:"ວິທີຕັດສິນໃຈຈາກຫຼັກຖານ", question:"ຫຼັກຖານແຕ່ລະດ້ານນຳໄປສູ່ການຕັດສິນໃຈຫຍັງ?", paragraphs:["Gate ຕ້ອງເບິ່ງທັງ User value, Supply, Revenue, Economics ແລະ Trust/Rights. ຜ່ານໝົດຈຶ່ງອະນຸຍາດໃຫ້ໄປ MVP. ຖ້າບາງດ້ານຢູ່ສີເຫຼືອງ ໃຫ້ລະບຸການປັບແລະທົດສອບຊ້ຳ; ຖ້າດ້ານສິດ, ງົບ ຫຼືຄຸນຄ່າ User ບໍ່ຜ່ານຢ່າງຮ້າຍແຮງ ໃຫ້ No-go.","Evidence register ຕ້ອງບັນທຶກຄຳຖາມ, ວິທີເກັບ, Sample, ຜົນ, ວັນທີ, ຜູ້ຮັບຜິດຊອບ ແລະ Decision ທີ່ຕາມມາ. ນີ້ຊ່ວຍແຍກຄວາມຮູ້ທີ່ພິສູດແລ້ວອອກຈາກສົມມຸດຖານ."], definitions:[{term:"Evidence",meaning:"ຂໍ້ມູນທີ່ມີວິທີເກັບ, ກຸ່ມຕົວຢ່າງ ແລະຜົນທີ່ກວດກັບໄດ້."},{term:"Signal",meaning:"ຕົວເລກ ຫຼືພຶດຕິກຳທີ່ບອກທິດທາງ ແຕ່ອາດຍັງບໍ່ພຽງພໍໃຫ້ສະຫຼຸບ."},{term:"Decision record",meaning:"ບັນທຶກວ່າໃຜຕັດສິນຫຍັງ, ວັນທີໃດ, ອີງໃສ່ຫຼັກຖານໃດ ແລະມີຜົນຕໍ່ຂັ້ນຕໍ່ໄປແນວໃດ."}] },
    ],
  },
  "BUS-03": {
    title: "ຄຳອະທິບາຍ Business Model Canvas ສະບັບເຕັມ",
    introduction: [
      "ພາກນີ້ອະທິບາຍວ່າ Business Model Canvas ແຕ່ລະຫົວຂໍ້ໝາຍເຖິງຫຍັງ, ເກີດຂຶ້ນແນວໃດໃນ “ພ້ອມໄປ” ແລະມີຜົນຕໍ່ການພັດທະນາຫຍັງ. ຕາຕະລາງ Canvas ທີ່ຢູ່ພາກຫຼັງແມ່ນພຽງສະຫຼຸບສຳລັບອ້າງອີງ.",
      "ຈຸດສຳຄັນແມ່ນຕ້ອງແຍກ “ຜູ້ໃຊ້” ອອກຈາກ “ຜູ້ຈ່າຍ”. ຄົນຊອກຮ້ານແມ່ນຜູ້ໃຊ້ຫຼັກ ແລະໃຊ້ Platform ຟຣີ; ຮ້ານແມ່ນລູກຄ້າທີ່ອາດຈ່າຍຄ່າບໍລິການ ເມື່ອ Platform ພິສູດວ່າພາຄົນໄປຫາການຕິດຕໍ່ ຫຼືການເດີນທາງໄດ້.",
    ],
    sections: [
      {
        id: "bus03-model",
        label: "01 · BUSINESS MODEL STATEMENT",
        title: "ແນວຄິດທາງທຸລະກິດ",
        question: "Platform ສ້າງຄຸນຄ່າໃຫ້ໃຜ ແລະປ່ຽນຄຸນຄ່ານັ້ນເປັນລາຍຮັບແນວໃດ?",
        paragraphs: [
          "“ພ້ອມໄປ” ສ້າງຄຸນຄ່າໃຫ້ຜູ້ໃຊ້ດ້ວຍການຫຼຸດຈຳນວນຂັ້ນຕອນຈາກການເຫັນວິດີໂອຣີວິວ ໄປຫາການຮູ້ຂໍ້ມູນຮ້ານ ແລະກົດແຜນທີ່, ໂທ ຫຼືສົ່ງຂໍ້ຄວາມ. ຜູ້ໃຊ້ບໍ່ຈຳເປັນຕ້ອງສະຫຼັບຫຼາຍ App ຫຼືຄົ້ນຫາຂໍ້ມູນເດີມຊ້ຳ.",
          "Platform ສ້າງລາຍຮັບຈາກຮ້ານທີ່ຕ້ອງການຂໍ້ມູນທີ່ກວດແລ້ວ, ການຊ່ວຍດູແລ Profile, ລາຍງານພຶດຕິກຳການຕິດຕໍ່ ແລະການສະແດງຜົນແບບ Sponsored ທີ່ມີປ້າຍຊັດເຈນ. ລາຍຮັບບໍ່ຄວນມາຈາກການຂາຍຄະແນນ, ການປິດບັງຄຳເຫັນ ຫຼືການເຮັດໃຫ້ຜົນທຳມະຊາດເສຍຄວາມໜ້າເຊື່ອຖື.",
        ],
        example: "ຮ້ານໜຶ່ງມີລາຍຊື່ຟຣີ. ຫຼັງຈາກ Platform ສົ່ງຄົນເຂົ້າໜ້າຮ້ານ ແລະເກີດການກົດແຜນທີ່/ໂທ, ຮ້ານອາດເລືອກຈ່າຍຄ່າ Founding Partner ເພື່ອຮັບການກວດຂໍ້ມູນ ແລະລາຍງານຜົນ.",
      },
      {
        id: "bus03-canvas",
        label: "02 · THE CANVAS",
        title: "9 ອົງປະກອບຂອງ Business Model Canvas",
        question: "ແຕ່ລະຊ່ອງໃນ Canvas ອະທິບາຍສ່ວນໃດຂອງທຸລະກິດ?",
        paragraphs: [
          "Canvas ບໍ່ແມ່ນລາຍການ Feature. ມັນແມ່ນແຜນທີ່ຄວາມສຳພັນວ່າຈະຮັບໃຊ້ໃຜ, ສົ່ງມອບຄຸນຄ່າຫຍັງ, ເຂົ້າຫາລູກຄ້າຜ່ານໃສ, ຕ້ອງມີຊັບພະຍາກອນ/ວຽກ/ຄູ່ຮ່ວມຫຍັງ, ມີລາຍຈ່າຍຫຍັງ ແລະຮັບເງິນຈາກໃສ.",
          "ທັງ 9 ຊ່ອງຕ້ອງສອດຄ່ອງກັນ. ຕົວຢ່າງ: ຖ້າ Value Proposition ຮັບປາກວ່າຂໍ້ມູນຮ້ານຖືກຕ້ອງ, Key Activities ຕ້ອງມີການກວດຂໍ້ມູນ, Key Resources ຕ້ອງມີຖານຂໍ້ມູນ Place, ແລະ Cost Structure ຕ້ອງນັບຄ່າແຮງງານການກວດຂໍ້ມູນ.",
        ],
        definitions: [
          { term: "Customer Segments", meaning: "ກຸ່ມທີ່ Platform ຮັບໃຊ້. ປະກອບມີຜູ້ຊອກຮ້ານ, ເຈົ້າຂອງຮ້ານ ແລະ Creator; ແຕ່ບໍ່ແມ່ນທຸກກຸ່ມຈະຈ່າຍເງິນ." },
          { term: "Value Propositions", meaning: "ຜົນປະໂຫຍດທີ່ແຕ່ລະກຸ່ມໄດ້ຮັບ: ຜູ້ໃຊ້ຄົ້ນຫາງ່າຍ, ຮ້ານໄດ້ Traffic/Insight, Creator ໄດ້ Attribution." },
          { term: "Channels", meaning: "ຊ່ອງທາງທີ່ຜູ້ໃຊ້ພົບ ແລະເຂົ້າໃຊ້ Platform ເຊັ່ນ Web/PWA, Search, Link ທີ່ Share ແລະ QR." },
          { term: "Customer Relationships", meaning: "ຮູບແບບການດູແລແຕ່ລະກຸ່ມ: User ໃຊ້ງານເອງ, ສ່ວນຮ້ານ Pro ອາດມີ Onboarding ແລະ Support." },
          { term: "Revenue Streams", meaning: "ແຫຼ່ງເງິນເຂົ້າ. Pilot ເນັ້ນ Founding Partner; Sponsored, Pro ແລະ Commission ຈະເພີ່ມຕາມຫຼັກຖານ." },
          { term: "Key Resources", meaning: "ຊັບພະຍາກອນທີ່ຂາດບໍ່ໄດ້: Canonical Place database, Taxonomy, Workflow ກວດຂໍ້ມູນ, Technology ແລະຄວາມໜ້າເຊື່ອຖື." },
          { term: "Key Activities", meaning: "ວຽກທີ່ຕ້ອງເຮັດຊ້ຳ: ຫາ Source, ຈັບຄູ່ກັບ Place, ກວດຂໍ້ມູນ, Moderation, Analytics ແລະດູແລຮ້ານ." },
          { term: "Key Partners", meaning: "ພາກສ່ວນທີ່ຊ່ວຍໃຫ້ Platform ສົ່ງມອບຄຸນຄ່າ: Creator, ຮ້ານ, Map provider ແລະທີ່ປຶກສາດ້ານສິດ/ຂໍ້ມູນ." },
          { term: "Cost Structure", meaning: "ລາຍຈ່າຍທັງໝົດທີ່ເກີດຈາກຮູບແບບນີ້: ພັດທະນາ, Server, Search, ກວດ Content, Support, Sales, Legal ແລະ Administration." },
        ],
      },
      {
        id: "bus03-value",
        label: "03 · VALUE EXCHANGE",
        title: "ໃຜໃຫ້ຫຍັງ ແລະໄດ້ຫຍັງ",
        question: "ເປັນຫຍັງ User, Shop, Creator ແລະ Platform ຈຶ່ງຈະຍອມເຂົ້າຮ່ວມ?",
        paragraphs: [
          "ຮູບແບບທຸລະກິດຈະຢູ່ລອດໄດ້ກໍ່ຕໍ່ເມື່ອທຸກຝ່າຍໄດ້ຄຸນຄ່າທີ່ຊັດ. User ໃຫ້ເວລາ ແລະສັນຍານຄວາມສົນໃຈ; Shop ໃຫ້ຂໍ້ມູນ ແລະອາດຈ່າຍຄ່າບໍລິການ; Creator ໃຫ້ Content ຕົ້ນສະບັບຜ່ານ Link; Platform ໃຫ້ການຈັດລະບຽບ, ການກວດ ແລະການຄົ້ນພົບ.",
          "ການແລກປ່ຽນຕ້ອງບໍ່ເອົາປຽບຝ່າຍໃດ. Platform ຕ້ອງບໍ່ນຳວິດີໂອ Creator ມາເກັບໂດຍບໍ່ມີສິດ, ບໍ່ຂາຍຂໍ້ມູນສ່ວນຕົວຂອງ User ແລະບໍ່ໃຫ້ Shop ຈ່າຍເງິນເພື່ອປອມແປງຄະແນນຫຼືການຢືນຢັນ.",
        ],
        implications: ["Creator ຕ້ອງເຫັນຊື່, Source ແລະ Link ຕົ້ນສະບັບ", "Shop ທີ່ຈ່າຍຕ້ອງໄດ້ຮັບບໍລິການຕາມຂອບເຂດທີ່ຕົກລົງ", "User ຕ້ອງແຍກອອກວ່າຜົນໃດແມ່ນ Sponsored ແລະຜົນໃດແມ່ນທຳມະຊາດ"],
      },
      {
        id: "bus03-revenue",
        label: "04 · REVENUE LADDER",
        title: "ສ້າງລາຍຮັບຕາມຫຼັກຖານ",
        question: "ເປັນຫຍັງບໍ່ເປີດລາຍຮັບທຸກປະເພດພ້ອມກັນ?",
        paragraphs: [
          "Revenue Ladder ແມ່ນລຳດັບການເປີດຮູບແບບລາຍຮັບຕາມຄວາມສາມາດທີ່ Platform ພິສູດໄດ້. ໃນ Pilot, Platform ຍັງບໍ່ຄວນຮັບຈອງ ຫຼືຖືເງິນລູກຄ້າ ເພາະຈະເພີ່ມພາລະດ້ານ Payment, Refund, Support ແລະບັນຊີກ່ອນຈຳເປັນ.",
          "ລາຍຮັບຂັ້ນທຳອິດຈຶ່ງມາຈາກບໍລິການທີ່ດຳເນີນງານແບບ Manual ໄດ້: Founding Partner ແລະການທົດສອບ Sponsored Campaign. ຫຼັງຈາກຮູ້ວ່າຮ້ານເຫັນຄຸນຄ່າຫຍັງ ແລະຕໍ່ອາຍຸຫຼືບໍ່ ຈຶ່ງອອກແບບ Pro Subscription ແບບຖາວອນ.",
        ],
        definitions: [
          { term: "Launch revenue", meaning: "ເງິນຈາກ Founding Partner Pilot ຫຼື Campaign ຈຳນວນນ້ອຍ ທີ່ໃຊ້ພິສູດວ່າມີຄົນພ້ອມຈ່າຍ." },
          { term: "Recurring revenue", meaning: "ລາຍຮັບທີ່ຮ້ານຕໍ່ອາຍຸເປັນລາຍເດືອນ ເພາະຍັງໄດ້ຮັບຄຸນຄ່າຕໍ່ເນື່ອງ." },
          { term: "Transaction revenue", meaning: "ຄ່າທຳນຽມທີ່ເກີດສະເພາະເມື່ອການວ່າຈ້າງ, Affiliate ຫຼື Booking ສຳເລັດ." },
        ],
      },
      {
        id: "bus03-cost",
        label: "05 · COST LOGIC",
        title: "ລາຍຈ່າຍຄົງທີ່ ແລະລາຍຈ່າຍຜັນແປ",
        question: "ລາຍຈ່າຍໃດເກີດຂຶ້ນກ່ອນມີ User ແລະລາຍຈ່າຍໃດເພີ່ມຕາມການໃຊ້ງານ?",
        paragraphs: [
          "ລາຍຈ່າຍຄົງທີ່ ຫຼື Step cost ແມ່ນລາຍຈ່າຍທີ່ຕ້ອງຈ່າຍເຖິງແມ່ນມີ User ນ້ອຍ ເຊັ່ນ ຄ່າທີມຫຼັກ, Domain, ລະບົບ Admin, Monitoring ແລະ Legal setup. Step cost ອາດຄົງທີ່ໃນຊ່ວງໜຶ່ງ ແລ້ວເພີ່ມເປັນຂັ້ນເມື່ອຕ້ອງຈ້າງຄົນ ຫຼືເພີ່ມລະບົບ.",
          "ລາຍຈ່າຍຜັນແປເພີ່ມຕາມຈຳນວນ Place, Content, User ຫຼືຮ້ານລູກຄ້າ. ຕົວຢ່າງແມ່ນຄ່າກວດຂໍ້ມູນຕໍ່ຮ້ານ, API/Search usage, Support ແລະ Moderation. Platform ຈະຂະຫຍາຍໄດ້ກໍ່ຕໍ່ເມື່ອລາຍຮັບເພີ່ມໄວກວ່າລາຍຈ່າຍຜັນແປ.",
        ],
        example: "ຖ້າການກວດຮ້ານໜຶ່ງໃຊ້ 45 ນາທີ, 1,000 ຮ້ານຈະໃຊ້ 750 ຊົ່ວໂມງ. ດັ່ງນັ້ນຕ້ອງວັດເວລາຕໍ່ Place ແລະຫາວິທີຫຼຸດໂດຍບໍ່ເສຍຄຸນນະພາບ.",
      },
      {
        id: "bus03-assumptions",
        label: "06 · CRITICAL ASSUMPTIONS",
        title: "ສົມມຸດຖານທີ່ຍັງບໍ່ແມ່ນຄວາມຈິງ",
        question: "ມີຫຍັງແດ່ທີ່ Business Model ກຳລັງເຊື່ອ ແຕ່ຍັງບໍ່ມີຫຼັກຖານ?",
        paragraphs: [
          "Assumption ແມ່ນຂໍ້ຄາດທີ່ຖ້າຜິດແລ້ວ Business Model ອາດບໍ່ໄປຕໍ່. ສຳລັບ “ພ້ອມໄປ” ມີຢ່າງໜ້ອຍ 5 ດ້ານ: User ຢາກໃຊ້, ມີ Content/Place ພໍ, ຮ້ານພ້ອມຈ່າຍ, ການໃຊ້ Link/Preview ຍືນຍົງ ແລະລາຍຮັບສາມາດຮອງຮັບ Operation.",
          "ແຕ່ລະ Assumption ຕ້ອງມີວິທີທົດສອບ ແລະສັນຍານຕັດສິນ. ຄຳສຳພາດວ່າ “ນ່າສົນໃຈ” ບໍ່ພຽງພໍ; ຕ້ອງເບິ່ງວ່າ User ເຮັດ Task ສຳເລັດ, ກັບມາໃຊ້, ຮ້ານວາງມັດຈຳ ຫຼືມີຫຼັກຖານຜູກມັດຫຼືບໍ່.",
        ],
      },
      {
        id: "bus03-flywheel",
        label: "07 · OPERATING FLYWHEEL",
        title: "ວົງຈອນທີ່ຊ່ວຍໃຫ້ Platform ເຕີບໂຕ",
        question: "ເມື່ອສ່ວນໜຶ່ງດີຂຶ້ນ ມັນຈະຊ່ວຍໃຫ້ສ່ວນອື່ນດີຂຶ້ນແນວໃດ?",
        paragraphs: [
          "Flywheel ເລີ່ມຈາກການມີ Content ແລະ Place data ທີ່ດີ. ຂໍ້ມູນທີ່ດີເຮັດໃຫ້ User ຄົ້ນພົບຮ້ານທີ່ເໝາະສົມ, ເກີດການເປີດ Place Page ແລະ Decision Action. ສັນຍານເຫຼົ່ານີ້ຊ່ວຍໃຫ້ຮ້ານເຫັນຄຸນຄ່າ ແລະຢາກອັບເດດຂໍ້ມູນ ຫຼືຈ່າຍຄ່າບໍລິການ.",
          "ການເຕີບໂຕຈະບໍ່ເກີດຖ້າຂາດຂັ້ນໃດຂັ້ນໜຶ່ງ. ມີ Content ຫຼາຍແຕ່ Place data ຜິດ ຈະທຳລາຍ Trust; ມີ User ຫຼາຍແຕ່ບໍ່ເກີດ Decision Action ຈະຂາຍຄຸນຄ່າໃຫ້ຮ້ານຍາກ; ຮ້ານຈ່າຍແຕ່ Sponsored ບໍ່ໂປ່ງໃສ ຈະເຮັດໃຫ້ User ບໍ່ໄວ້ໃຈ.",
        ],
      },
      {
        id: "bus03-metrics",
        label: "08 · METRICS",
        title: "ສິ່ງທີ່ຕ້ອງວັດໃນແຕ່ລະຝັ່ງ",
        question: "ຕົວເລກໃດບອກວ່າ User, ຖານຂໍ້ມູນ ແລະທຸລະກິດມີສຸຂະພາບດີ?",
        paragraphs: [
          "ຕົວຊີ້ວັດຝັ່ງ User ຕ້ອງວັດຈາກການເຫັນໄປຫາການກະທຳ: ອັດຕາ Video → Place Page, ຈຳນວນຄົນກົດ Map/Call/Message, ການ Save ແລະການກັບມາໃຊ້. ຍອດ View ຢ່າງດຽວບໍ່ບອກວ່າ User ຕັດສິນໃຈໄດ້.",
          "ຝັ່ງ Supply ຕ້ອງວັດຈຳນວນ Place ທີ່ກວດແລ້ວ, ຄວາມຄົບ, ຈຳນວນ Source ຕໍ່ Place ແລະອາຍຸຂອງຂໍ້ມູນ. ຝັ່ງ Business ຕ້ອງວັດຮ້ານທີ່ຈ່າຍ, ການຕໍ່ອາຍຸ, ລາຍຮັບຕໍ່ຮ້ານ ແລະລາຍຮັບຫຼັງຫັກຄ່າດຳເນີນງານຜັນແປ.",
        ],
        implications: ["ທຸກ Metric ຕ້ອງມີຄຳນິຍາມວ່ານັບໃຜ, ນັບເມື່ອໃດ ແລະກັນການນັບຊ້ຳແນວໃດ", "ລາຍງານໃຫ້ຮ້ານຕ້ອງບໍ່ອ້າງ Decision Action ເປັນຍອດຂາຍ", "ຕົວເລກ Pilot ແມ່ນ Baseline ສຳລັບກຳນົດເປົ້າສະບັບຕໍ່ໄປ"],
      },
      {
        id: "bus03-decisions",
        label: "09 · RECOMMENDED DECISIONS",
        title: "ຂໍ້ຕັດສິນທີ່ຮູບແບບທຸລະກິດກຳນົດ",
        question: "ຂໍ້ສະຫຼຸບເຫຼົ່ານີ້ປ່ຽນວິທີພັດທະນາ Platform ແນວໃດ?",
        paragraphs: [
          "User ທົ່ວໄປ ແລະ Basic listing ຕ້ອງໃຊ້ຟຣີເພື່ອຫຼຸດອຸປະສັກຂອງທັງ Demand ແລະ Supply. Paying customer ຫຼັກແມ່ນ Place owner. ດັ່ງນັ້ນ MVP ຕ້ອງສ້າງປະໂຫຍດໃຫ້ User ກ່ອນ ແລ້ວຈຶ່ງສະແດງຫຼັກຖານຜົນຕໍ່ຮ້ານ.",
          "Creator Marketplace, Affiliate ແລະ Booking ບໍ່ແມ່ນ Dependency ຂອງ Launch. ຖ້າເພີ່ມໄວເກີນໄປ ທີມຈະແບ່ງຄວາມສົນໃຈໄປຫາ Payment, Contract, Dispute ແລະ Support ແທນການພິສູດວ່າ Discovery → Decision ມີຄຸນຄ່າຈິງ.",
        ],
      },
      {
        id: "bus03-validation",
        label: "10 · APPROVED VALIDATION RULES",
        title: "Founding Partner ໄດ້ຫຍັງ ແລະບໍ່ໄດ້ຫຍັງ",
        question: "ປະໂຫຍກ “verified profile, ສິດອັບເດດ, performance summary ແລະປ້າຍ partner” ໝາຍເຖິງຫຍັງແທ້?",
        paragraphs: [
          "Founding Partner ແມ່ນຮ້ານຈຳນວນຈຳກັດທີ່ຈ່າຍເງິນເພື່ອຮ່ວມທົດສອບການບໍລິການໃນໄລຍະ Pilot. ຄ່າບໍລິການ 200,000 ກີບຕໍ່ເດືອນບໍ່ແມ່ນຄ່າຊື້ອັນດັບ ຫຼືຄ່າຮັບປະກັນວ່າຈະມີຍອດຂາຍ. ມັນແມ່ນຄ່າທົດສອບຊຸດບໍລິການດ້ານຂໍ້ມູນ, Support ແລະລາຍງານ.",
          "ການຈ່າຍເງິນຕ້ອງບໍ່ປ່ຽນຄວາມເປັນກາງຂອງ Platform. ຮ້ານທີ່ຈ່າຍ ແລະຮ້ານທີ່ບໍ່ຈ່າຍຕ້ອງຢູ່ພາຍໃຕ້ມາດຕະຖານຂໍ້ມູນ, ການຢືນຢັນ ແລະການຈັດຜົນທຳມະຊາດດຽວກັນ. ຖ້າຮ້ານຈ່າຍເພື່ອໃຫ້ສະແດງຫຼາຍຂຶ້ນ ຕ້ອງແຍກເປັນ Sponsored Campaign ແລະຕິດປ້າຍ.",
        ],
        definitions: [
          { term: "Verified profile", meaning: "Admin ໄດ້ກວດ Field ສຳຄັນຂອງຮ້ານກັບແຫຼ່ງຂໍ້ມູນ ແລະບັນທຶກວັນທີກວດ. ປ້າຍນີ້ຢືນຢັນຂໍ້ມູນຮ້ານ; ບໍ່ໄດ້ຢືນຢັນຄຸນນະພາບອາຫານ ຫຼືຮັບຮອງຮ້ານ." },
          { term: "ສິດອັບເດດຂໍ້ມູນ", meaning: "ຮ້ານສາມາດສົ່ງຄຳຮ້ອງແກ້ຊື່, ເບີໂທ, ເວລາ, ພິກັດ ແລະຂໍ້ມູນອື່ນ. Admin ຕ້ອງກວດຫຼັກຖານກ່ອນເຜີຍແຜ່; ຮ້ານບໍ່ສາມາດແກ້ຂໍ້ມູນສາທາລະນະໂດຍບໍ່ຜ່ານການກວດ." },
          { term: "Performance summary", meaning: "ລາຍງານຕາມຊ່ວງເວລາທີ່ສະຫຼຸບຈຳນວນຄົນເປີດ Place Page, ກົດແຜນທີ່, ໂທ, Message, Save ຫຼື Share. ລາຍງານເປັນຕົວເລກລວມ, ບໍ່ສົ່ງຂໍ້ມູນສ່ວນຕົວ ແລະບໍ່ອ້າງວ່າ Click ເທົ່າກັບຍອດຂາຍ." },
          { term: "Founding Partner badge", meaning: "ປ້າຍບອກວ່າຮ້ານຮ່ວມທົດສອບກັບໂຄງການໃນໄລຍະເລີ່ມຕົ້ນ. ປ້າຍນີ້ບໍ່ແມ່ນຄະແນນ, ລາງວັນ, ການຮັບຮອງ ຫຼື Sponsored label." },
          { term: "ບໍ່ຊື້ຄະແນນຣີວິວ", meaning: "ການຈ່າຍເງິນບໍ່ເພີ່ມຄະແນນ, ບໍ່ລຶບຣີວິວລົບ, ບໍ່ເລືອກສະແດງແຕ່ຣີວິວດີ ແລະບໍ່ດັນຂຶ້ນອັນດັບທຳມະຊາດ." },
        ],
        example: "ຮ້ານ A ຈ່າຍ 200,000 ກີບ. Admin ກວດເບີໂທ, ເວລາ ແລະແຜນທີ່, ແກ້ຂໍ້ມູນຫຼັງຮ້ານສົ່ງຫຼັກຖານ, ແລະສົ່ງລາຍງານວ່າໃນເດືອນນັ້ນມີ 320 Place views, 24 Map clicks ແລະ 7 Call clicks. Platform ບໍ່ສາມາດບອກວ່າຮ້ານໄດ້ລູກຄ້າ 31 ຄົນ ເພາະ Click ເປັນພຽງເຈດຕະນາ.",
        implications: ["ຂອບເຂດບໍລິການຕ້ອງຂຽນໃນໃບສະເໜີ ຫຼືຂໍ້ຕົກລົງ Pilot", "ທຸກການແກ້ຂໍ້ມູນຕ້ອງມີຜູ້ຮ້ອງ, ຫຼັກຖານ, ຜູ້ອະນຸມັດ ແລະວັນທີ", "Performance summary ຕ້ອງໃຊ້ຄຳນິຍາມ Metric ດຽວກັບ BUS-06", "ປ້າຍ Founding Partner, Verified ແລະ Sponsored ຕ້ອງໃຊ້ຄົນລະຮູບແບບ ແລະມີຄຳອະທິບາຍ"],
      },
    ],
  },
  "BUS-05": {
    title: "ຄຳອະທິບາຍ Financial Structure ແລະສູດຄຳນວນ",
    introduction: ["Financial Structure ກຳນົດວ່າເງິນຈຳນວນໃດເປັນຂອງສ່ວນຕົວ, ຈຳນວນໃດໃຫ້ໂຄງການໃຊ້, ໃຊ້ເພື່ອພິສູດຫຍັງ ແລະເມື່ອໃດຕ້ອງຢຸດ.","ເຄື່ອງຄຳນວນພາກຫຼັງເປັນ Scenario tool. ຕົວເລກທີ່ປ່ຽນໄດ້ບາງສ່ວນເປັນສົມມຸດຖານ ບໍ່ແມ່ນລາຍຈ່າຍທີ່ອະນຸມັດ ຫຼືການຄາດຄະເນລາຍຮັບ."],
    sections: [
      { id:"bus05-capital", label:"01–02 · FINANCIAL POSITION & CAPITAL RULES", title:"ແຍກເງິນສ່ວນຕົວອອກຈາກເງິນໂຄງການ", question:"100 ລ້ານ, 75 ລ້ານ, 25 ລ້ານ ແລະ 15 ລ້ານກີບສຳພັນກັນແນວໃດ?", paragraphs:["ເງິນທັງໝົດ 100 ລ້ານກີບຖືກແບ່ງເປັນສ່ວນຕົວ 75 ລ້ານກີບ ແລະເພດານໂຄງການ 25 ລ້ານກີບ. 75 ລ້ານປະກອບດ້ວຍເງິນສຳຮອງຄ່າຄອງຊີບ 60 ລ້ານ ແລະພັນທະສ່ວນຕົວອື່ນ 15 ລ້ານ; ຫ້າມນຳມາໃຊ້ໃນໂຄງການ.","ພາຍໃນເພດານໂຄງການ 25 ລ້ານ ກັນ 15 ລ້ານເປັນຄ່າຄອງຊີບຜູ້ກໍ່ຕັ້ງສຳລັບ 6 ອາທິດ ແລະເຫຼືອສູງສຸດ 10 ລ້ານສຳລັບວຽກທົດລອງ. 15 ລ້ານນີ້ຢູ່ພາຍໃນ 25 ລ້ານ, ບໍ່ແມ່ນບວກເພີ່ມເປັນ 40 ລ້ານ."], definitions:[{term:"ເພດານງົບ",meaning:"ຈຳນວນສູງສຸດທີ່ຍອມໃຫ້ໂຄງການໃຊ້; ບໍ່ແມ່ນເປົ້າໃຫ້ໃຊ້ໝົດ."},{term:"ຄ່າຄອງຊີບຜູ້ກໍ່ຕັ້ງ",meaning:"ເງິນສຳລັບລາຍຈ່າຍຈຳເປັນໃນໄລຍະທີ່ເຮັດ Pilot ເຕັມເວລາ ເພາະບໍ່ມີລາຍຮັບອື່ນ."},{term:"Stop-loss",meaning:"ຂີດຈຳກັດທີ່ເມື່ອເຖິງແລ້ວຕ້ອງຢຸດລາຍຈ່າຍ ແລະບໍ່ນຳເງິນສ່ວນຕົວມາເພີ່ມ."}], example:"10 ລ້ານກີບຕໍ່ເດືອນ × 1.5 ເດືອນ = 15 ລ້ານກີບຄ່າຄອງຊີບສຳລັບ Pilot 6 ອາທິດ." },
      { id:"bus05-model", label:"03 · FINANCIAL MODEL", title:"ສູດລາຍຮັບ, ລາຍຈ່າຍ, Burn, Runway ແລະ Break-even", question:"ແຕ່ລະສູດໃຊ້ຕັດສິນຫຍັງ ແລະຄິດແນວໃດ?", paragraphs:["ສູດໃນເຄື່ອງຄຳນວນໃຊ້ສ້າງ Scenario ເພື່ອເຫັນຄວາມສຳພັນຂອງລາຍຮັບ, ລາຍຈ່າຍ ແລະເງິນຄົງເຫຼືອ. ຜົນຈະຖືກຕ້ອງກໍ່ຕໍ່ເມື່ອຕົວເລກນຳເຂົ້າມາຈາກລາຄາ ແລະຫຼັກຖານຈິງ.","ຕົວຢ່າງຂ້າງລຸ່ມໃຊ້ 10 ຮ້ານຈ່າຍ 200,000 ກີບ, 1 Campaign ລາຄາ 1 ລ້ານ, ຄ່າຄອງຊີບ 10 ລ້ານ, ລາຍຈ່າຍຄົງທີ່ອື່ນ 6 ລ້ານ ແລະລາຍຈ່າຍຜັນແປ 2 ລ້ານກີບຕໍ່ເດືອນ. ນີ້ເປັນຕົວຢ່າງຄຳນວນ, ບໍ່ແມ່ນ Forecast."], formulas:[
        {name:"ລາຍຮັບຕໍ່ເດືອນ",expression:"(ຮ້ານຈ່າຍ × ຄ່າສະມາຊິກ) + (Campaign × ລາຄາ Campaign)",purpose:"ຄຳນວນເງິນເຂົ້າຕໍ່ເດືອນຈາກສອງແຫຼ່ງທົດລອງ.",variables:["ຮ້ານຈ່າຍ = ຈຳນວນຮ້ານທີ່ຊຳລະຈິງ", "ຄ່າສະມາຊິກ = ລາຄາຕໍ່ຮ້ານຕໍ່ເດືອນ", "Campaign = ຈຳນວນ Campaign ທີ່ຂາຍ", "ລາຄາ Campaign = ເງິນທີ່ຮັບຕໍ່ Campaign"],example:["10 × 200,000 = 2,000,000 ກີບ", "1 × 1,000,000 = 1,000,000 ກີບ", "2,000,000 + 1,000,000 = 3,000,000 ກີບຕໍ່ເດືອນ"],interpretation:"Scenario ນີ້ມີລາຍຮັບ 3 ລ້ານກີບຕໍ່ເດືອນ.",caution:"ນັບສະເພາະເງິນທີ່ຊຳລະແລ້ວ; ຄຳວ່າສົນໃຈ ແລະ LOI ບໍ່ແມ່ນເງິນສົດ."},
        {name:"ລາຍຈ່າຍຕໍ່ເດືອນ",expression:"ຄ່າຄອງຊີບ + ລາຍຈ່າຍຄົງທີ່ + ລາຍຈ່າຍຜັນແປ",purpose:"ເຫັນເງິນອອກລວມຂອງໜຶ່ງເດືອນ.",variables:["ຄ່າຄອງຊີບ = 10 ລ້ານ", "ລາຍຈ່າຍຄົງທີ່ອື່ນ = 6 ລ້ານ", "ລາຍຈ່າຍຜັນແປ = 2 ລ້ານ"],example:["10,000,000 + 6,000,000 + 2,000,000", "ລວມ = 18,000,000 ກີບຕໍ່ເດືອນ"],interpretation:"ຕ້ອງມີເງິນ 18 ລ້ານກີບຕໍ່ເດືອນກ່ອນຫັກລາຍຮັບ.",caution:"6 ລ້ານ ແລະ 2 ລ້ານເປັນ Scenario input; ຕ້ອງແທນດ້ວຍໃບສະເໜີລາຄາ/ລາຍຈ່າຍຈິງ."},
        {name:"Net burn",expression:"max(ລາຍຈ່າຍ − ລາຍຮັບ, 0)",purpose:"ວັດວ່າເງິນທຶນຫຼຸດລົງເທົ່າໃດຕໍ່ເດືອນ.",variables:["ລາຍຈ່າຍ = 18 ລ້ານ", "ລາຍຮັບ = 3 ລ້ານ", "max(...,0) ໝາຍເຖິງບໍ່ສະແດງ Burn ຕິດລົບເມື່ອລາຍຮັບສູງກວ່າລາຍຈ່າຍ"],example:["18,000,000 − 3,000,000", "Net burn = 15,000,000 ກີບຕໍ່ເດືອນ"],interpretation:"ຖ້າ Scenario ບໍ່ປ່ຽນ ເງິນທຶນຈະຫຼຸດ 15 ລ້ານຕໍ່ເດືອນ."},
        {name:"Runway",expression:"ເງິນທີ່ໃຫ້ໂຄງການໃຊ້ ÷ Net burn",purpose:"ຄາດວ່າເງິນຮອງຮັບ Scenario ໄດ້ຈັກເດືອນ.",variables:["ເງິນໂຄງການ = 25 ລ້ານ", "Net burn = 15 ລ້ານຕໍ່ເດືອນ"],example:["25,000,000 ÷ 15,000,000", "Runway ≈ 1.67 ເດືອນ"],interpretation:"Scenario ນີ້ຮອງຮັບໄດ້ປະມານ 1.7 ເດືອນ; ຕ່ຳກວ່າເກນ 3 ເດືອນສຳລັບສືບຕໍ່ທົດສອບ.",caution:"Runway ເປັນ Scenario, ບໍ່ແມ່ນຄຳຮັບປະກັນ; ຕ້ອງອັບເດດຈາກ Cash ແລະລາຍຈ່າຍຈິງ."},
        {name:"Break-even partners",expression:"ceil((ລາຍຈ່າຍ − ລາຍຮັບ Campaign) ÷ ຄ່າສະມາຊິກ)",purpose:"ຄຳນວນຈຳນວນຮ້ານຈ່າຍຂັ້ນຕ່ຳທີ່ລາຍຮັບລວມຄຸ້ມລາຍຈ່າຍ.",variables:["ceil ໝາຍເຖິງປັດຂຶ້ນເປັນຈຳນວນເຕັມ", "ລາຍຈ່າຍ = 18 ລ້ານ", "Campaign revenue = 1 ລ້ານ", "Subscription = 200,000 ກີບ"],example:["18,000,000 − 1,000,000 = 17,000,000", "17,000,000 ÷ 200,000 = 85", "ຕ້ອງມີ 85 ຮ້ານຈ່າຍ"],interpretation:"ຖ້າລາຄາ 200,000 ກີບ ແລະ Cost ຕາມ Scenario, ຕ້ອງມີ 85 Partner ຈຶ່ງຄຸ້ມທຶນ.",caution:"ສູດງ່າຍນີ້ຍັງບໍ່ຫັກຕົ້ນທຶນຜັນແປຕໍ່ Partner; ໃຊ້ເພື່ອມອງຂະໜາດບັນຫາເບື້ອງຕົ້ນ."}
      ] },
      { id:"bus05-pilot", label:"04–05 · PILOT ALLOCATION & FUNDING STAGES", title:"10 ລ້ານສຳລັບວຽກ ແລະການເປີດງົບ 30%/35%/35%", question:"ງົບແບ່ງເປັນໝວດ ແລະງວດແນວໃດ?", paragraphs:["ຫຼັງກັນຄ່າຄອງຊີບ 15 ລ້ານ ເຫຼືອ 10 ລ້ານສຳລັບສຳພາດ/ເດີນທາງ, ສ້າງແລະກວດຂໍ້ມູນ, Prototype, User testing, Revenue testing, ບັນຊີ/ນະໂຍບາຍ ແລະສຳຮອງ. ແຜນໃຊ້ 7.9 ລ້ານ ແລະສຳຮອງ 2.1 ລ້ານ.","30%/35%/35% ຄິດຈາກເພດານ 25 ລ້ານ: 7.5 ລ້ານ, 8.75 ລ້ານ ແລະ 8.75 ລ້ານ. ແຕ່ແຕ່ລະງວດ 2 ອາທິດຕ້ອງກັນຄ່າຄອງຊີບ 5 ລ້ານກ່ອນ; ຈຶ່ງເຫຼືອງົບວຽກ 2.5 ລ້ານ, 3.75 ລ້ານ ແລະ 3.75 ລ້ານ. ງວດຕໍ່ໄປບໍ່ເປີດຖ້າ Gate ບໍ່ຜ່ານ."], example:"ງວດ 1: 25,000,000 × 30% = 7,500,000; ຫັກຄ່າຄອງຊີບ 5,000,000; ເຫຼືອງົບວຽກສູງສຸດ 2,500,000 ກີບ." },
      { id:"bus05-evidence", label:"06–07 · REVENUE EVIDENCE & CASH TRACKING", title:"ແຍກເງິນທີ່ຮັບແລ້ວອອກຈາກຄຳສັນຍາ", question:"ທຸກອາທິດຕ້ອງບັນທຶກຫຍັງ?", paragraphs:["ລາຍຮັບທີ່ຮັບແລ້ວຕ້ອງມີຫຼັກຖານໂອນ/ໃບຮັບເງິນ ແລະຂອບເຂດບໍລິການ. ເງິນມັດຈຳຕ້ອງແຍກວ່າຄືນໄດ້ຫຼືບໍ່; LOI ແມ່ນຂໍ້ຜູກມັດທີ່ບໍ່ແມ່ນ Cash; Verbal interest ເກັບເປັນ Feedback ເທົ່ານັ້ນ.","ລາຍງານອາທິດຕ້ອງມີ Cash opening, Cash received, Cash spent, Cash closing, ລາຍຈ່າຍຕາມໝວດ, ຫຼັກຖານຕິດກັບ, ພັນທະທີ່ຍັງຄ້າງ ແລະ Forecast ອາທິດຕໍ່ໄປ. ຕົວເລກຕ້ອງກວດກັບບັນຊີ/ສົມຸດເງິນໂຄງການ."], definitions:[{term:"Cash opening",meaning:"ເງິນທີ່ມີໃນຕົ້ນອາທິດ."},{term:"Cash closing",meaning:"Cash opening + ເງິນຮັບ − ເງິນຈ່າຍ."},{term:"Outstanding commitment",meaning:"ຈຳນວນທີ່ຕົກລົງຈະຈ່າຍ ຫຼືບໍລິການທີ່ຮັບເງິນແລ້ວແຕ່ຍັງສົ່ງບໍ່ຄົບ."}] },
      { id:"bus05-unit", label:"08–09 · UNIT ECONOMICS & FINANCIAL GATES", title:"ຕົ້ນທຶນຕໍ່ Place/Partner ແລະເກນໄປຕໍ່", question:"Break-even ຂອງບໍລິສັດຕ່າງຈາກກຳໄລຕໍ່ຮ້ານແນວໃດ?", paragraphs:["Unit economics ວັດຕໍ່ໜ່ວຍ: ຕົ້ນທຶນສ້າງ/ຮັກສາ Place, ຕົ້ນທຶນ Onboard/Support Partner ແລະລາຍຮັບຕໍ່ Partner. Contribution margin ຕໍ່ Partner = ລາຍຮັບຈາກ Partner − ລາຍຈ່າຍຜັນແປທີ່ເກີດເພາະ Partner ນັ້ນ.","Company break-even ເກີດເມື່ອ Contribution margin ຈາກທຸກ Partner/Campaign ລວມກັນຄຸ້ມລາຍຈ່າຍຄົງທີ່. ຖ້າຂາຍ 200,000 ແຕ່ຕ້ອງໃຊ້ແຮງງານ Support 250,000 ຕໍ່ຮ້ານ, ການມີ Partner ຫຼາຍຈະເຮັດໃຫ້ຂາດທຶນຫຼາຍຂຶ້ນ."], formulas:[{name:"Contribution margin ຕໍ່ Partner",expression:"ລາຍຮັບຕໍ່ Partner − ລາຍຈ່າຍຜັນແປຕໍ່ Partner",purpose:"ກວດວ່າລູກຄ້າໜຶ່ງລາຍຊ່ວຍຮອງຮັບຄ່າຄົງທີ່ ຫຼືເຮັດໃຫ້ຂາດທຶນເພີ່ມ.",variables:["ລາຍຮັບ = 200,000 ກີບ", "ຄ່າກວດ/Support/API ຕໍ່ຮ້ານ = ສົມມຸດ 80,000 ກີບ"],example:["200,000 − 80,000", "Contribution margin = 120,000 ກີບຕໍ່ Partner"],interpretation:"ແຕ່ລະ Partner ມີ 120,000 ກີບເຫຼືອໄປຮອງຮັບຄ່າຄົງທີ່.",caution:"80,000 ເປັນຕົວຢ່າງ; Pilot ຕ້ອງຈັບເວລາ ແລະລາຍຈ່າຍຈິງ."}] },
      { id:"bus05-control", label:"10–13 · ACCOUNTING, RISKS, RULES & PRICE EVIDENCE", title:"ການຄວບຄຸມ, ຫຼັກຖານລາຄາ ແລະບັນທຶກ", question:"ລາຍຈ່າຍໜຶ່ງລາຍການຕ້ອງມີຫຍັງຈຶ່ງກວດກັບໄດ້?", paragraphs:["ທຸກລາຍຈ່າຍຕ້ອງມີວັນທີ, ຜູ້ຮັບເງິນ, ໝວດລາຍຈ່າຍ, ຈຳນວນ, ຜູ້ອະນຸມັດ, ສິ່ງທີ່ຕ້ອງພິສູດ ແລະໃບຮັບເງິນ/ຫຼັກຖານ. ລາຍຈ່າຍຕັ້ງແຕ່ 1 ລ້ານກີບຂຶ້ນໄປຕ້ອງປຽບທຽບລາຄາຢ່າງໜ້ອຍ 2 ແຫຼ່ງ.","ລາຄາຈາກ Website ຫຼືໃບສະເໜີລາຄາມີວັນໝົດອາຍຸ. ຕ້ອງບັນທຶກວັນທີກວດ, ສະກຸນເງິນ, ພາສີ/ຄ່າທຳນຽມ ແລະສະຖານະວ່າເປັນ Estimate, Quote, Invoice ຫຼື Paid receipt. ຕົວເລກທີ່ຍັງບໍ່ຮູ້ໃຫ້ຂຽນວ່າ “ລໍຖ້າລາຄາຈິງ” ແທນການປະດິດ."], implications:["ແຍກບັນຊີ/ສົມຸດໂຄງການອອກຈາກສ່ວນຕົວ", "ກວດ Cash ທຸກອາທິດ ແລະ Gate ອາທິດ 2/4/6", "ການປ່ຽນເພດານງົບຕ້ອງມີ Decision record", "ກວດພາສີ, Invoice ແລະການລົງບັນຊີກັບນັກບັນຊີໃນລາວ"] },
    ],
  },
  "BUS-06": {
    title: "ຄຳອະທິບາຍ Revenue Model, KPI ແລະສູດຄຳນວນ",
    introduction: ["Revenue Model ອະທິບາຍວ່າໃຜຈ່າຍ, ຈ່າຍເພື່ອຫຍັງ, ເມື່ອໃດຈຶ່ງນັບເປັນລາຍຮັບ ແລະລາຍຮັບແຕ່ລະປະເພດເປີດໃນ Phase ໃດ.","KPI ອະທິບາຍວ່າ Platform ສ້າງຄຸນຄ່າແທ້ຫຼືບໍ່. ຕົວເລກຫຼັກຕ້ອງພາຈາກການເຫັນໄປຫາການຕັດສິນໃຈ ແລະຕ້ອງກັນການນັບຊ້ຳ."],
    sections: [
      { id:"bus06-revenue", label:"01–02 · POSITION & REVENUE STREAMS", title:"ລາຍຮັບ 3 ໄລຍະ", question:"ແຕ່ລະແຫຼ່ງລາຍຮັບເລີ່ມເມື່ອໃດ?", paragraphs:["Pilot ໃຊ້ Founding Partner 200,000 ກີບຕໍ່ເດືອນເພື່ອທົດສອບບໍລິການກວດຂໍ້ມູນ, Correction support, Onboarding ແລະ Performance summary. Sponsored Campaign 1 ລ້ານກີບຍັງເປັນ Price hypothesis ແລະຕ້ອງກຳນົດ Duration, Placement, Inventory ແລະ Report ກ່ອນຂາຍ.","ຫຼັງ Pilot ຈຶ່ງພິຈາລະນາ Pro Business subscription ເປັນລາຍຮັບປະຈຳ. Creator Marketplace, Affiliate ແລະ Booking ຈະນັບເປັນ Transaction revenue ເມື່ອມີທຸລະກຳສຳເລັດ; ຍັງບໍ່ຢູ່ໃນ MVP."], definitions:[{term:"Revenue stream",meaning:"ວິທີທີ່ເງິນເຂົ້າຈາກຄຸນຄ່າປະເພດໜຶ່ງ."},{term:"Price hypothesis",meaning:"ລາຄາທີ່ຕັ້ງເພື່ອທົດສອບ; ຍັງບໍ່ແມ່ນລາຄາຂາຍຖາວອນ."},{term:"MRR",meaning:"Monthly Recurring Revenue: ລາຍຮັບປະຈຳລາຍເດືອນຈາກສະມາຊິກທີ່ຍັງເປີດໃຊ້."},{term:"Commission",meaning:"ຄ່າທຳນຽມທີ່ Platform ໄດ້ເມື່ອທຸລະກຳຕາມເງື່ອນໄຂສຳເລັດ."}] },
      { id:"bus06-evidence", label:"03 · REVENUE EVIDENCE", title:"4 ລະດັບຫຼັກຖານລາຍຮັບ", question:"ລະດັບໃດນັບເປັນ Cash ແລະລະດັບໃດນັບພຽງຂໍ້ມູນປະກອບ?", paragraphs:["ຫຼັກຖານແຂງທີ່ສຸດແມ່ນເງິນທີ່ເຂົ້າບັນຊີແລ້ວ ແລະມີຫຼັກຖານ. ມັດຈຳສະແດງຄວາມພ້ອມຈ່າຍ ແຕ່ຕ້ອງແຍກພັນທະຄືນເງິນ. LOI ແມ່ນຂໍ້ຜູກມັດທີ່ຍັງບໍ່ແມ່ນ Cash. Verbal interest ບໍ່ນັບເປັນລາຍຮັບ.","ລາຍຮັບທາງບັນຊີອາດບໍ່ເທົ່າກັບ Cash received ຖ້າບໍລິການຍັງບໍ່ສົ່ງມອບ ຫຼືເງິນອາດຕ້ອງຄືນ. ການບັນທຶກຈິງຕ້ອງກວດກັບນັກບັນຊີ."], example:"ຮ້ານໂອນ 200,000 ກີບເພື່ອຮັບບໍລິການ 1 ເດືອນ: ມີ Cash received 200,000. ຖ້າການບໍລິການຍັງບໍ່ເລີ່ມ, ຕ້ອງບັນທຶກພັນທະສົ່ງມອບຄຽງຄູ່." },
      { id:"bus06-funnel", label:"04–05 · FUNNEL & NORTH-STAR", title:"ຈາກ Video view ໄປຫາ Decision Action", question:"ເປັນຫຍັງຕົວຊີ້ວັດຫຼັກບໍ່ແມ່ນຍອດເບິ່ງ?", paragraphs:["Funnel ມີ 3 ຂັ້ນຫຼັກ: User ເຫັນວິດີໂອ, ເປີດ Place Page ເພື່ອກວດຂໍ້ມູນ, ແລະກົດ Map/Call/Message. ການຫຼຸດລົງໃນແຕ່ລະຂັ້ນບອກບັນຫາຕ່າງກັນ: Content ບໍ່ກົງ, Place data ບໍ່ພໍ ຫຼື Action ຫາຍາກ.","North-star metric ແມ່ນ Weekly Unique Users with Decision Action: ຈຳນວນ User ບໍ່ຊ້ຳທີ່ກົດ Map, Call ຫຼື Message ຢ່າງໜ້ອຍໜຶ່ງຄັ້ງໃນ 7 ມື້. ຄົນໜຶ່ງກົດ 10 ຄັ້ງຍັງນັບເປັນ 1 Unique user ສຳລັບ North-star."], definitions:[{term:"Event",meaning:"ການກະທຳໜຶ່ງຄັ້ງທີ່ລະບົບບັນທຶກ ເຊັ່ນ Place open ຫຼື Map click."},{term:"Unique user",meaning:"ຜູ້ໃຊ້ທີ່ຖືກນັບຄັ້ງດຽວໃນຊ່ວງລາຍງານ ເຖິງແມ່ນຈະເຮັດ Event ຊ້ຳ."},{term:"Decision Intent",meaning:"ສັນຍານວ່າຜູ້ໃຊ້ອາດກຳລັງຈະໄປ ຫຼືຕິດຕໍ່; ບໍ່ແມ່ນຫຼັກຖານການໄປຮ້ານ ຫຼືຊື້."}] },
      { id:"bus06-formulas", label:"06–07 · CALCULATOR & METRIC DEFINITIONS", title:"ສູດຄຳນວນ Funnel ແລະຫຼັກຖານລູກຄ້າ", question:"ຕົວເລກໃນເຄື່ອງຄຳນວນມາຈາກໃສ?", paragraphs:["ທຸກອັດຕາໃຊ້ຈຳນວນບໍ່ຊ້ຳໃນຊ່ວງລາຍງານດຽວກັນ. ຖ້ານຳ Total events ໄປຫານ Unique users ຈະເຮັດໃຫ້ອັດຕາສູງຜິດຈິງ. ຕ້ອງລະບຸ Start/end date, ວິທີກັນ Bot/Test traffic ແລະການກັນ User ຊ້ຳ.","ຕົວຢ່າງໃຊ້ 1,000 Video viewers, 200 Place visitors, 40 Decision users, ເຂົ້າຫາ 30 ຮ້ານ, 3 Paid/Deposit ແລະ 2 LOI."], formulas:[
        {name:"Video → Place rate",expression:"Unique Place visitors ÷ Unique Video viewers × 100",purpose:"ວັດວ່າ Content ພາຄົນໄປຄົ້ນຂໍ້ມູນຮ້ານໄດ້ຫຼາຍປານໃດ.",variables:["Place visitors = 200", "Video viewers = 1,000"],example:["200 ÷ 1,000 = 0.20", "0.20 × 100 = 20%"],interpretation:"ຈາກ 100 ຄົນເຫັນວິດີໂອ ມີປະມານ 20 ຄົນເປີດ Place Page.",caution:"ບໍ່ບອກວ່າ 20 ຄົນໄປຮ້ານ; ພຽງບອກວ່າສົນໃຈຂໍ້ມູນເພີ່ມ."},
        {name:"Place → Decision rate",expression:"Unique Decision users ÷ Unique Place visitors × 100",purpose:"ວັດວ່າ Place Page ພາໄປຫາ Map/Call/Message ໄດ້ຫຼາຍປານໃດ.",variables:["Decision users = 40", "Place visitors = 200"],example:["40 ÷ 200 = 0.20", "0.20 × 100 = 20%"],interpretation:"ຈາກ 100 ຄົນທີ່ເປີດ Place Page ມີ 20 ຄົນກົດຢ່າງໜ້ອຍໜຶ່ງ Decision Action.",caution:"ຄົນດຽວທີ່ກົດ Map ແລະ Call ຕ້ອງນັບເປັນ 1 User ສຳລັບອັດຕານີ້."},
        {name:"Payment evidence rate",expression:"ຮ້ານຊຳລະ/ມັດຈຳ ÷ ຮ້ານທີ່ເຂົ້າຫາ × 100",purpose:"ວັດອັດຕາຮ້ານທີ່ສະແດງຄວາມພ້ອມຈ່າຍດ້ວຍເງິນ.",variables:["Paid/deposit = 3", "Contacted = 30"],example:["3 ÷ 30 = 0.10", "0.10 × 100 = 10%"],interpretation:"10% ຂອງຮ້ານທີ່ເຂົ້າຫາມີຫຼັກຖານເງິນ.",caution:"ຕ້ອງລະບຸເງື່ອນໄຂມັດຈຳ ແລະແຍກຈາກ Revenue recognition."},
        {name:"Commitment rate",expression:"(Paid/deposit + Signed LOI) ÷ Contacted shops × 100",purpose:"ວັດສັດສ່ວນຮ້ານທີ່ມີຫຼັກຖານຜູກມັດຮູບແບບໃດໜຶ່ງ.",variables:["Paid/deposit = 3", "Signed LOI = 2", "Contacted = 30"],example:["3 + 2 = 5", "5 ÷ 30 × 100 = 16.7%"],interpretation:"16.7% ມີ Commitment ແຕ່ໃນນັ້ນມີພຽງ 10% ທີ່ມີຫຼັກຖານເງິນ.",caution:"ຫ້າມນຳ 16.7% ໄປຮຽກວ່າ Paying conversion rate."},
        {name:"ເງິນຕາມແບບຈຳລອງ",expression:"Paid/deposit shops × Partner price + Campaigns × Campaign price",purpose:"ສະແດງເງິນຕາມ Input ຂອງ Pilot calculator.",variables:["3 ຮ້ານ × 200,000", "0 Campaign × 1,000,000"],example:["3 × 200,000 = 600,000", "0 × 1,000,000 = 0", "ລວມ = 600,000 ກີບ"],interpretation:"Calculator ສະແດງ 600,000 ກີບຕາມ Input.",caution:"ຖ້າຈຳນວນ 3 ລວມມັດຈຳທີ່ອາດຄືນ, 600,000 ບໍ່ຄວນເອີ້ນວ່າລາຍຮັບທີ່ໃຊ້ໄດ້ທັງໝົດ."}
      ] },
      { id:"bus06-pilot", label:"08 · SIX-WEEK PILOT TARGETS", title:"ເປົ້າໝາຍຂໍ້ມູນ, User, Shop ແລະງົບ", question:"ເປົ້າໝາຍໃດອະນຸຍາດໃຫ້ທົດສອບຕໍ່?", paragraphs:["Pilot ຕ້ອງສ້າງ 100 Place records ທີ່ຂໍ້ມູນຫຼັກຄົບ, ໃຫ້ 20 User ເຮັດ Task ຄົ້ນຮ້ານ ແລະກົດເພື່ອໄປ, ເຂົ້າຫາ 30 ຮ້ານເພື່ອຫາ 3 Paid/deposit + 2 LOI ແລະຄຸມລາຍຈ່າຍບໍ່ເກີນ 25 ລ້ານ.","ເປົ້າເຫຼົ່ານີ້ເປັນ Gate ຂັ້ນຕ່ຳສຳລັບຮຽນຮູ້, ບໍ່ແມ່ນຫຼັກຖານ Scale. ການຜ່ານ Gate ບໍ່ໄດ້ອະນຸຍາດໃຫ້ຈ້າງທີມຖາວອນ; ຍັງຕ້ອງກວດ Retention, Unit economics ແລະລາຍຮັບຊ້ຳ."], example:"ຖ້າເຂົ້າຫາພຽງ 20 ຮ້ານ ແລະໄດ້ 3 Paid + 2 LOI, Calculator ຍັງບອກ Gate ບໍ່ຜ່ານ ເພາະ Sample ຮ້ານທີ່ເຂົ້າຫາຍັງບໍ່ເຖິງ 30." },
      { id:"bus06-report", label:"09–12 · REPORTING, LIMITS, RISKS & DECISIONS", title:"ວິທີລາຍງານໂດຍບໍ່ໃຊ້ຕົວເລກຫຼອກຕົນເອງ", question:"ໃຜກວດ Metric ເມື່ອໃດ ແລະຫ້າມອ້າງຫຍັງ?", paragraphs:["ທຸກມື້ກວດວ່າ Event ຖືກສົ່ງ ແລະບໍ່ຂາດ. ທຸກອາທິດ Founder ທົບທວນ Funnel, Decision users, ຮ້ານທີ່ເຂົ້າຫາ, ຫຼັກຖານລາຍຮັບ ແລະລາຍຈ່າຍ. ທ້າຍອາທິດ 2, 4 ແລະ 6 ໃຊ້ຜົນເປີດງົບ, ປັບ ຫຼືຢຸດ.","ຫ້າມອ້າງ View ເປັນຄວາມສຳເລັດ, Click ເປັນລູກຄ້າ, LOI ເປັນ Revenue ຫຼື Sponsored ເປັນຜົນທຳມະຊາດ. ການໄປຮ້ານຈິງກວດແບບ Manual ເປັນຂໍ້ມູນປະກອບ; MVP ບໍ່ສ້າງ Location tracking ເພື່ອອ້າງ Conversion."], implications:["Report ທຸກສະບັບຕ້ອງມີຊ່ວງວັນທີ ແລະຄຳນິຍາມ Metric", "ແຍກ Unique users ອອກຈາກ Total events", "ແຍກ Paid, Deposit, LOI ແລະ Verbal interest", "ລາຍງານຮ້ານຕ້ອງມີ Disclaimer ວ່າ Decision Action ບໍ່ແມ່ນຍອດຂາຍ"] },
    ],
  },
};

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

export default function BusinessDocumentDeepDive({ code }: { code: keyof typeof documents }) {
  const document = documents[code];
  if (!document) return null;
  return (
    <div className={styles.documentDeepDive}>
      <header className={styles.documentReadingHeader}>
        <span>ສ່ວນທີ 1 · ເນື້ອຫາສະບັບລະອຽດ</span>
        <h2>{document.title}</h2>
        {document.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </header>
      <nav className={styles.documentToc} aria-label="ສາລະບານເນື້ອຫາລະອຽດ">
        <b>ສາລະບານ</b>
        <ol>{document.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
      </nav>
      {document.sections.map((section) => (
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
      <div className={styles.documentReferenceDivider}><span>ສ່ວນທີ 2</span><h2>ຕາຕະລາງ, ແຜນພາບ ແລະຂໍ້ຕັດສິນສຳລັບອ້າງອີງ</h2><p>ເນື້ອຫາຕໍ່ຈາກນີ້ເປັນສະຫຼຸບພາບລວມຈາກຄຳອະທິບາຍຂ້າງເທິງ.</p></div>
    </div>
  );
}
