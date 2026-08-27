import { Fragment } from "react";
import styles from "../documents.module.css";

type MatrixSection = {
  title: string;
  intro: string;
  headers: string[];
  rows: string[][];
  note?: string;
};

type Wireframe = { title: string; screen: string; blocks: string[] };
type OperationalArtifact = { label: string; path: string; description: string; action?: "download" | "open" };

const canPreviewArtifact = (path: string) => /\.(md|csv|json|css)$/i.test(path);
const artifactFileName = (path: string) => path.split("/").pop() ?? path;

type DocumentSpec = {
  code: string;
  title: string;
  english: string;
  owner: string;
  sources: string[];
  purpose: string[];
  sections: MatrixSection[];
  review: string[];
  reviewDecisions?: string[];
  version?: string;
  status?: "approved" | "pending";
  statusLabel?: string;
  approvalNote?: string;
  wireframes?: Wireframe[];
  artifacts?: OperationalArtifact[];
};

const specs: Record<string, DocumentSpec> = {
  "content-taxonomy": {
    code: "CON-01", title: "ມາດຕະຖານການຈັດໝວດ", english: "Content Taxonomy", owner: "Content Lead / System Analyst",
    version: "0.9", status: "pending", statusLabel: "ອະນຸມັດໂຄງສ້າງ · ລໍ District/Price Registry",
    approvalNote: "ໂຄງສ້າງ Category, Cuisine, Governance ແລະ Coverage Gate ຖືກອະນຸມັດແລ້ວ. ແຕ່ CON-01 ຍັງບໍ່ຂຶ້ນ 1.0 ຈົນກວ່າຈະລະບຸ Canonical District IDs ຂອງ 2–3 ເຂດ Pilot ແລະຈຳນວນເງິນຂັ້ນຕ່ຳ/ສູງຂອງ Price Band ₭, ₭₭, ₭₭₭. ຫ້າມ Developer ເດົາຄ່າສອງສ່ວນນີ້ເອງ.",
    sources: ["PRO-01 1.0", "PRO-02 1.0", "PRO-03 1.0", "PRO-04 0.9"],
    purpose: [
      "ເອກະສານນີ້ກຳນົດພາສາກາງສຳລັບຈັດໝວດ Place, Content Source ແລະ Search Filter. ຈຸດປະສົງແມ່ນໃຫ້ Content Team, Developer, Designer ແລະຜູ້ໃຊ້ເຂົ້າໃຈຄຳດຽວກັນ ແລະບໍ່ສ້າງ Tag ຊ້ຳຊ້ອນ.",
      "Pilot ຈຳກັດ Primary Category ເປັນ Restaurant ແລະ Café. Attraction, Accommodation ແລະ Service ຖືກກຳນົດໄວ້ໃນ Model ເພື່ອບໍ່ຕ້ອງຮື້ໂຄງສ້າງພາຍຫຼັງ ແຕ່ຍັງບໍ່ເປີດໃຊ້ໃນ Pilot."
    ],
    sections: [
      { title: "ໂຄງສ້າງການຈັດໝວດ", intro: "Taxonomy ແບ່ງເປັນ 4 ຊັ້ນ. ຊັ້ນເທິງຕ້ອງຄົງທີ່; ຊັ້ນລຸ່ມສາມາດຂະຫຍາຍຕາມຫຼັກຖານ.", headers: ["ຊັ້ນ", "ຈຸດປະສົງ", "ຕົວຢ່າງ", "ກົດ"], rows: [
        ["Primary Category", "ກຳນົດປະເພດ Place ຫຼັກ", "Restaurant, Café", "ໜຶ່ງ Place ມີ Primary Category ໜຶ່ງອັນພໍດີ"],
        ["Subcategory", "ອະທິບາຍຮູບແບບຮ້ານ", "Noodle shop, Bakery, Specialty coffee", "ເລືອກໄດ້ 1–3; ຕ້ອງມີ Canonical ID"],
        ["Attribute", "ຂໍ້ເທັດຈິງທີ່ໃຊ້ກອງ", "District, Price, Cuisine, Setting", "ຕ້ອງມີຄ່າທີ່ຄວບຄຸມ; ຫ້າມ Free-text ສຳລັບ Filter"],
        ["Editorial Tag", "ບໍລິບົດຊ່ວຍຄົ້ນພົບ", "Good for groups, Riverside, Late night", "ຕ້ອງມີ Evidence; ບໍ່ນຳໃຊ້ແທນຂໍ້ເທັດຈິງ"]
      ]},
      { title: "Attribute ແລະ Filter ສຳລັບ Pilot", intro: "Filter ຕ້ອງອີງຂໍ້ມູນທີ່ທີມຮັກສາໄດ້. ຖ້າ Field ບໍ່ຄົບພໍ ຫ້າມເປີດ Filter ໃຫ້ຜູ້ໃຊ້.", headers: ["Attribute", "ຄ່າທີ່ອະນຸຍາດ", "MVP UI", "ຄຸນນະພາບຂັ້ນຕ່ຳ"], rows: [
        ["District", "Canonical district IDs ສະເພາະເຂດ Pilot ທີ່ອະນຸມັດ", "Filter ແບບເລືອກໜຶ່ງ/ຫຼາຍ", "100% ຂອງ Published Places ມີຄ່າ"],
        ["Price band", "₭ · ₭₭ · ₭₭₭ · Unknown", "Filter + label", "ຫ້າມຄາດເດົາ; Unknown ຕ້ອງສະແດງ"],
        ["Cuisine / Product", "Lao, Thai, Vietnamese, Chinese, Western, Bakery, Coffee, Other", "Multi-select", "ອີງເມນູ ຫຼື Source ທີ່ກວດໄດ້"],
        ["Setting", "Indoor, Outdoor, Riverside, Garden, Takeaway", "Tag/Filter ພາຍຫຼັງ", "ໃຊ້ສະເພາະຄ່າທີ່ຢືນຢັນ"],
        ["Open now", "ຄຳນວນຈາກ Hours + timezone", "Later", "ຫ້າມເປີດຈົນກວ່າ Hours freshness ຜ່ານ"]
      ]},
      { title: "ຄຳຄົ້ນຫາ ແລະ Synonym", intro: "Search Vocabulary ຊ່ວຍໃຫ້ຄຳລາວ, ອັງກິດ, ການສະກົດຕ່າງກັນ ແລະຊື່ຫຍໍ້ຊີ້ໄປຫາ Canonical Term ດຽວ.", headers: ["ປະເພດຄຳ", "ຕົວຢ່າງ", "ການປະມວນຜົນ", "ການຄວບຄຸມ"], rows: [
        ["Canonical", "ຮ້ານກາເຟ / Café", "ເກັບເປັນ term ID ດຽວ", "Content Lead ອະນຸມັດ"],
        ["Synonym", "ຄາເຟ, coffee shop", "ແປໄປ Canonical ID", "ບັນທຶກທີ່ມາ ແລະວັນທີ"],
        ["Transliteration / typo", "Vientiane/Viengchan; ກາເຟ/ຄາເຟ", "Normalize ແຕ່ບໍ່ປ່ຽນຂໍ້ຄວາມຕົ້ນສະບັບ", "ອັບເດດຈາກ zero-result query"],
        ["Blocked term", "ຄຳທີ່ຫຼອກ, ດູຖູກ ຫຼືບໍ່ກ່ຽວ", "ບໍ່ເປັນ Public Tag", "ຕ້ອງມີ moderation reason"]
      ]},
      { title: "Governance ແລະ Change Control", intro: "Taxonomy ທີ່ບໍ່ມີ owner ຈະເກີດ Tag ຊ້ຳ ແລະ Filter ທີ່ບໍ່ມີຂໍ້ມູນ.", headers: ["ຂັ້ນຕອນ", "ຜູ້ຮັບຜິດຊອບ", "ຫຼັກຖານ", "ຜົນສົ່ງມອບ"], rows: [
        ["ສະເໜີ Term", "Content/Admin", "Search log, user request ຫຼື inventory gap", "Change request"],
        ["ກວດຊ້ຳ/ຜົນກະທົບ", "Content Lead + SA", "Existing term, data migration, UI/API impact", "Approve / merge / reject"],
        ["ປ່ອຍ Version", "Product Owner", "Updated dictionary + migration rule", "Taxonomy version"],
        ["ທົບທວນ", "Content Lead", "Zero-result, unused term, low coverage", "Monthly during Pilot"]
      ]},
      { title: "Canonical Term Registry", intro: "Registry ແມ່ນລາຍຊື່ຄຳທີ່ລະບົບອະນຸຍາດໃຫ້ເກັບ. ID ຄົງທີ່ແມ່ນຄ່າທີ່ Database/API ໃຊ້; ປ້າຍລາວ ແລະອັງກິດສາມາດແກ້ຄຳໄດ້ໂດຍບໍ່ປ່ຽນ ID.", headers: ["Canonical ID", "ປະເພດ", "ປ້າຍທີ່ສະແດງ", "ສະຖານະ/ກົດ"], rows: [
        ["CAT-RESTAURANT", "Primary category", "ຮ້ານອາຫານ / Restaurant", "Active ສຳລັບ Pilot"],
        ["CAT-CAFE", "Primary category", "ຮ້ານກາເຟ / Café", "Active ສຳລັບ Pilot"],
        ["CUI-LAO · CUI-THAI · CUI-VIETNAMESE · CUI-CHINESE", "Cuisine", "ອາຫານລາວ · ໄທ · ຫວຽດນາມ · ຈີນ", "Active; ຕ້ອງມີຫຼັກຖານຈາກເມນູ/Source"],
        ["CUI-WESTERN · CUI-BAKERY · CUI-COFFEE · CUI-OTHER", "Cuisine/Product", "Western · Bakery · Coffee · ອື່ນໆ", "Active; Other ຕ້ອງມີ note ອະທິບາຍ"],
        ["PRICE-LOW · PRICE-MID · PRICE-HIGH", "Price band", "₭ · ₭₭ · ₭₭₭", "ID ອະນຸມັດ; min/max amount ຍັງ Pending"],
        ["PRICE-UNKNOWN", "Price band", "ຍັງບໍ່ຮູ້ລາຄາ", "ໃຊ້ເມື່ອຫຼັກຖານລາຄາບໍ່ພໍ; ຫ້າມເດົາ"],
        ["DISTRICT-PENDING-01…03", "District", "ລໍລະບຸ 2–3 ເຂດ Pilot", "Placeholder ເທົ່ານັ້ນ; ຫ້າມ Publish/Filter"]
      ]},
      { title: "ຫຼັກການກຳນົດ Price Band", intro: "Price Band ຕ້ອງສະທ້ອນຄ່າໃຊ້ຈ່າຍປົກກະຕິຕໍ່ຄົນ ແລະຕ້ອງຄຳນວນດ້ວຍວິທີດຽວກັນ. ສະບັບນີ້ຍັງບໍ່ກຳນົດຈຳນວນກີບ ເພາະຕ້ອງເກັບຕົວຢ່າງລາຄາຈິງກ່ອນ.", headers: ["ຫົວຂໍ້", "ກົດວັດແທກ", "ຫຼັກຖານ", "ຈຸດທີ່ຍັງຄ້າງ"], rows: [
        ["Unit of measure", "ຄ່າໃຊ້ຈ່າຍທົ່ວໄປຂອງ 1 ຄົນສຳລັບ 1 ຄາບອາຫານ ຫຼື 1 ຄັ້ງເຂົ້າຮ້ານກາເຟ", "ລາຍການເມນູ 3–5 ລາຍການທີ່ເປັນຕົວແທນ", "ຈຳນວນກີບຂອງແຕ່ລະ Band"],
        ["Exclusion", "ບໍ່ນັບເຫຼົ້າ, ຄ່າສົ່ງ, ສ່ວນຫຼຸດຊົ່ວຄາວ ຫຼືງານພິເສດ", "Source URL/ຮູບເມນູ + checked_at", "ກົດສຳລັບ Set menu ແລະ Buffet"],
        ["Assignment", "ຈັດ Band ຈາກ median ຂອງຕົວຢ່າງ; ຖ້າ evidence ບໍ່ພໍໃຫ້ Unknown", "sample_items, calculated_amount, reviewer", "ຕ້ອງອະນຸມັດ Threshold ກ່ອນເປີດ Filter"],
        ["Review cadence", "ທົບທວນຫຼັງ Pilot 6 ອາທິດ ຫຼືເມື່ອລາຄາຕົວຢ່າງປ່ຽນຫຼາຍ", "ປະຫວັດ Price Registry", "ກຳນົດ trigger ຕົວເລກຫຼັງມີ baseline"]
      ], note: "ກ່ອນອະນຸມັດ Price Threshold ຕ້ອງເກັບລາຄາຈາກ Restaurant ແລະ Café ໃນເຂດ Pilot ຢ່າງໜ້ອຍກຸ່ມລະ 10 Places. ນີ້ເປັນເກນເກັບຫຼັກຖານ ບໍ່ແມ່ນການອະນຸມັດຊ່ວງລາຄາ."}
    ],
    review: ["ອະນຸມັດ Primary Category ຂອງ Pilot ເປັນ Restaurant ແລະ Café ຫຼືບໍ່?", "ອະນຸມັດ Price Band 3 ລະດັບ + Unknown ຫຼືຕ້ອງການຈຳນວນເງິນ?", "District ແລະ Cuisine ໃດຕ້ອງມີກ່ອນ 30 Places ທຳອິດ?", "ໃຜເປັນ Taxonomy Owner ແລະຜູ້ອະນຸມັດ Term?", "ຈະໃຊ້ coverage threshold 90% ກ່ອນເປີດ Public Filter ຫຼືປັບເປັນເທົ່າໃດ?"],
    reviewDecisions: ["ອະນຸມັດ Restaurant ແລະ Café ເປັນສອງ Primary Category ສຳລັບ Pilot.", "ຍັງຄ້າງ: ອະນຸມັດຮູບແບບ ₭, ₭₭, ₭₭₭ ແລະ Unknown ແລ້ວ ແຕ່ຍັງຕ້ອງກຳນົດຈຳນວນກີບຂັ້ນຕ່ຳ/ສູງຈາກຕົວຢ່າງລາຄາຈິງ.", "ຍັງຄ້າງ: District ໃຊ້ສະເພາະເຂດ Pilot ແຕ່ຍັງບໍ່ລະບຸຊື່; Cuisine ອະນຸມັດ Lao, Thai, Vietnamese, Chinese, Western, Bakery, Coffee ແລະ Other.", "Content Lead ເປັນ Taxonomy Owner; SA ກວດຜົນກະທົບ; Product Owner ອະນຸມັດ Primary Category ແລະ Schema Change.", "ກ່ອນເປີດ Filter: Category ແລະ District ຕ້ອງຄົບ 100%; Price Band ແລະ Cuisine ຕ້ອງຄົບຢ່າງໜ້ອຍ 90%."],
    artifacts: [{ label: "content-taxonomy.seed.json", path: "/templates/content-taxonomy.seed.json", description: "Seed Registry ສຳລັບ Category, Cuisine, Price Band ແລະ District placeholder; ຄ່າ Pending ຖືກໝາຍໄວ້ຊັດເຈນ." }]
  },

  "place-data-standard": {
    code: "CON-02", title: "ມາດຕະຖານຂໍ້ມູນສະຖານທີ່", english: "Place Data Standard", owner: "Data Steward / Content Lead",
    version: "1.0", status: "approved", statusLabel: "ອະນຸມັດແລ້ວ",
    approvalNote: "Baseline ນີ້ບັງຄັບກັບ Place ທຸກອັນກ່ອນ Publish. ຕ້ອງທົບທວນ Freshness Cadence ຫຼັງນຳໃຊ້ Pilot ຄົບ 6 ອາທິດ.",
    sources: ["CON-01 0.9 approved structure", "PRO-02 Entity Model", "PRO-03 MVP-001/004/008", "PRO-04 0.9"],
    purpose: ["ກຳນົດ Field Dictionary, Source Evidence, Verification State, Freshness ແລະ Correction Rule ສຳລັບ Place Record. ເປົ້າໝາຍແມ່ນໃຫ້ Public Place Page ບອກຂໍ້ມູນທີ່ຮູ້, ສິ່ງທີ່ຍັງບໍ່ຮູ້ ແລະວັນທີກວດຄັ້ງລ່າສຸດຢ່າງຊັດເຈນ.", "ມາດຕະຖານນີ້ບັງຄັບກັບ Place ທຸກອັນກ່ອນ Publish. ການຈ່າຍຄ່າ Founding Partner ບໍ່ຫຼຸດຂໍ້ກຳນົດ Data Quality ແລະບໍ່ຊື້ປ້າຍ Verified."],
    sections: [
      { title: "Field Dictionary ແລະ Publish Readiness", intro: "Required Field ຕ້ອງຄົບກ່ອນ Publish; Conditional Field ຕ້ອງຄົບເມື່ອມີສະພາບທີ່ກຳນົດ.", headers: ["Field", "ລະດັບ", "ກົດຂໍ້ມູນ", "Public behavior"], rows: [
        ["place_id / slug", "Required", "Unique, immutable ID; canonical URL", "ບໍ່ປ່ຽນເມື່ອແກ້ຊື່"],
        ["name_lao / display_name", "Required", "ຊື່ທາງການ ຫຼືຊື່ທີ່ຮ້ານໃຊ້", "ສະແດງເປັນຫົວຂໍ້"],
        ["primary_category", "Required", "Canonical ID ຈາກ CON-01", "ສະແດງ ແລະໃຊ້ Filter"],
        ["address + district", "Required", "ທີ່ຢູ່ອ່ານໄດ້ + District ID", "ສະແດງທີ່ຢູ່"],
        ["latitude / longitude", "Required", "ພິກັດຕ້ອງກວດກັບ Place", "ເປີດ Map Action"],
        ["phone / message_url", "Required: ຢ່າງໜຶ່ງ", "Normalize ແຕ່ຮັກສາ raw value", "ສະແດງ Action ທີ່ມີ"],
        ["opening_hours", "Conditional", "Structured weekly hours + exception", "Unknown ເມື່ອບໍ່ຢືນຢັນ"],
        ["price_band", "Conditional", "₭/₭₭/₭₭₭/Unknown", "ຫ້າມເດົາ"],
        ["source + checked_at", "Required", "ຢ່າງໜ້ອຍ 1 source ແລະວັນກວດ", "ສະແດງ Checked Date/Trust label"]
      ]},
      { title: "Source Evidence ແລະ Confidence", intro: "ທຸກ Field ສຳຄັນຕ້ອງຕາມກັບຫາ Source ໄດ້. Confidence ບອກຄຸນນະພາບຂອງຫຼັກຖານ ບໍ່ແມ່ນຄະແນນຮ້ານ.", headers: ["Source class", "ຕົວຢ່າງ", "Confidence", "ການນຳໃຊ້"], rows: [
        ["Owner-confirmed", "ຮ້ານຢືນຢັນຜ່ານຊ່ອງທາງທີ່ກວດໄດ້", "ສູງ", "Contact, Hours, Address"],
        ["Official public source", "Official Page, official map listing", "ສູງ/ກາງ", "Name, location, contact"],
        ["Independent creator source", "Review link ທີ່ລະບຸ Place ຊັດ", "ກາງ", "Context, product, setting; ບໍ່ໃຊ້ຢືນຢັນ Hours ຢ່າງດຽວ"],
        ["Unverified submission", "User/owner request ທີ່ຍັງບໍ່ມີ evidence", "ຕ່ຳ", "ເຂົ້າ review queue; ຫ້າມ auto-publish"]
      ]},
      { title: "Verification, Freshness ແລະ State", intro: "Checked Date ບໍ່ໝາຍຄວາມວ່າຂໍ້ມູນຈະຖືກຕະຫຼອດ. ມັນບອກວ່າກວດຫຍັງ, ເມື່ອໃດ ແລະຈາກ Source ໃດ.", headers: ["State", "ເຂົ້າ State ເມື່ອ", "Public behavior", "ການອອກຈາກ State"], rows: [
        ["Draft", "Record ຍັງບໍ່ຄົບ", "ບໍ່ Public", "Required fields + source ຄົບ"],
        ["Ready for review", "Validation ຜ່ານ", "ບໍ່ Public", "Reviewer approve/reject"],
        ["Published", "Reviewer ອະນຸມັດ", "Public + Checked Date", "Correction, stale, suspend, archive"],
        ["Stale", "Field ເກີນ cadence ຫຼື source conflict", "ສະແດງຄຳເຕືອນ/Unknown", "Re-verify"],
        ["Suspended", "ສົງໄສຂໍ້ມູນ/rights/safety", "ຖອນອອກຊົ່ວຄາວ", "Resolve + review"],
        ["Archived", "ປິດຖາວອນ/merged", "Redirect ຫຼື unavailable", "ບໍ່ restore ໂດຍບໍ່ມີ decision"]
      ], note: "ຄ່າ Freshness cadence ສຳລັບ Pilot: Contact/Hours 30 ວັນ; Address/Map 90 ວັນ; Category 180 ວັນ. ລະບົບຕ້ອງປ່ຽນເປັນ Stale ອັດຕະໂນມັດເມື່ອກາຍກຳນົດ ແລະທີມຕ້ອງທົບທວນ cadence ຫຼັງ Pilot 6 ອາທິດ."},
      { title: "Correction, Duplicate ແລະ Audit", intro: "ການແກ້ຂໍ້ມູນຕ້ອງຮັກສາຄ່າເກົ່າ, ຫຼັກຖານ, actor ແລະ reason.", headers: ["Process", "ຂັ້ນຕອນ", "ກົດຄວາມປອດໄພ", "Evidence"], rows: [
        ["Correction", "Receive → triage → verify item → approve/reject → publish", "ອະນຸມັດແຍກແຕ່ລະ Field; ຫ້າມທັບ Record ທັງໝົດ", "Request, source, before/after, actor"],
        ["Duplicate", "Detect → compare → confirm same place/branch → merge", "ຫ້າມ merge ພຽງເພາະຊື່ຄ້າຍ", "Match signals + decision"],
        ["Conflict", "Keep current → mark disputed → collect evidence → review", "ຫ້າມເລືອກ source ເພາະຜູ້ຈ່າຍ", "Conflict record"],
        ["Rollback", "Restore previous accepted version", "ຕ້ອງບັນທຶກ reason ແລະ actor", "Audit log + version ID"]
      ]},
      { title: "Place Data Entry Template", intro: "Template ນີ້ກຳນົດຮູບແບບຄ່າທີ່ Content Operator ຕ້ອງປ້ອນ ແລະ Developer ຕ້ອງ validate. ການມີ Field ໃນ Database ຢ່າງດຽວບໍ່ໝາຍຄວາມວ່າ Record ພ້ອມ Publish.", headers: ["ກຸ່ມ", "Field/format", "Validation", "ຜູ້ກວດ"], rows: [
        ["Identity", "place_id: UUID/server-generated; slug: lowercase unique; name_lao: 1–120 chars; name_en: optional", "place_id/slug ຫ້າມຊ້ຳ; ຊື່ຫ້າມມີແຕ່ whitespace", "Content Operator + system validation"],
        ["Classification", "primary_category_id; subcategory_ids 1–3; cuisine_ids[]", "ໃຊ້ສະເພາະ Active Canonical IDs; Other ຕ້ອງມີ note", "Content Lead"],
        ["Location", "address_lao; district_id; latitude/longitude", "District ຕ້ອງເປັນ Pilot ID; coordinate ຢູ່ໃນຂອບເຂດທີ່ກວດໄດ້", "Reviewer ເປີດ Map ກວດ"],
        ["Contact", "phone_raw + phone_normalized; message_url", "ຕ້ອງມີ phone ຫຼື message_url ຢ່າງໜ້ອຍໜຶ່ງ; URL/protocol ຖືກຕ້ອງ", "Reviewer ທົດສອບ action"],
        ["Hours/Price", "opening_hours structured ຫຼື unknown_reason; price_band_id ຫຼື PRICE-UNKNOWN", "ຫ້າມ null ແບບບໍ່ອະທິບາຍ; Price Threshold ອ້າງ CON-01 ເມື່ອອະນຸມັດ", "Data Steward"],
        ["Evidence", "source_ids[]; checked_at ISO date; confidence; curator_id; reviewer_id", "ມີ active source ຢ່າງໜ້ອຍ 1; curator ແລະ reviewer ຕ້ອງແຍກບົດບາດ", "Reviewer"],
        ["Lifecycle", "state; created_at/by; updated_at/by; published_at", "State transition ຕາມ PRO-02; ຫ້າມປ່ຽນເປັນ Published ໂດຍຂ້າມ Ready for review", "System + authorized admin"]
      ]},
      { title: "Publish Readiness Checklist", intro: "Checklist ຕ້ອງຖືກຕິກຄົບຕໍ່ Record ແລະເກັບກັບ Audit Log. ຖ້າຂໍ້ໃດບໍ່ຜ່ານ ຜົນລວມແມ່ນ Not Ready.", headers: ["Check ID", "ສິ່ງທີ່ກວດ", "Pass ເມື່ອ", "ຖ້າບໍ່ຜ່ານ"], rows: [
        ["PUB-01", "Identity", "ID/slug unique ແລະຊື່ສະແດງຖືກຕ້ອງ", "ກັບໄປ Draft"],
        ["PUB-02", "Category/District", "Canonical ID active; District ຢູ່ໃນ Pilot Registry", "ກັບໄປ Classification Queue"],
        ["PUB-03", "Map/Contact", "ພິກັດກົງ Place; ມີ action ທີ່ທົດສອບແລ້ວຢ່າງໜ້ອຍ 1", "ຫ້າມ Publish"],
        ["PUB-04", "Hours/Price", "ມີຄ່າທີ່ຢືນຢັນ ຫຼື Unknown + reason; ບໍ່ມີການເດົາ", "ແກ້ Field/Evidence"],
        ["PUB-05", "Source/Rights", "Original URL, attribution, availability ແລະ rights method ຖືກບັນທຶກ", "ຖອນ Source ຫຼືສົ່ງ Rights Review"],
        ["PUB-06", "Independent review", "Reviewer ກວດ before/after, checklist ແລະລົງ timestamp", "ຄ້າງ Ready for review"]
      ], note: "Publish gate = PUB-01 AND PUB-02 AND PUB-03 AND PUB-04 AND PUB-05 AND PUB-06. ບໍ່ໃຊ້ຄະແນນສະເລ່ຍເພື່ອກົບ Field ສຳຄັນທີ່ຂາດ."}
    ],
    review: ["Required Field ທີ່ລະບຸຄົບພໍສຳລັບ Pilot ຫຼືບໍ່?", "ອະນຸມັດ Source Confidence 4 ລະດັບ ຫຼືຕ້ອງການ Score?", "ອະນຸມັດ Freshness cadence 30/90/180 ວັນເປັນຄ່າທົດສອບຫຼືບໍ່?", "ໃຜເປັນ Data Steward ແລະ Reviewer ສຸດທ້າຍ?", "Public UI ຈະສະແດງ Unknown/Stale/Verified label ດ້ວຍຄຳໃດ?"],
    reviewDecisions: ["ອະນຸມັດ Required Fields; latitude/longitude ບັງຄັບ ແລະ phone ຫຼື message_url ຕ້ອງມີຢ່າງໜ້ອຍໜຶ່ງ. Hours/Price ເປັນ Unknown ໄດ້ແຕ່ຫ້າມປ່ອຍຫວ່າງ.", "ອະນຸມັດ Confidence 4 ລະດັບ; ບໍ່ໃຊ້ຄະແນນຕົວເລກໃນ Pilot.", "ອະນຸມັດ 30/90/180 ວັນເປັນ Pilot Baseline ແລະທົບທວນຫຼັງ 6 ອາທິດ.", "Content Lead ເຮັດໜ້າທີ່ Data Steward; Reviewer ຕ້ອງເປັນຄົນລະບົດບາດ. ຖ້າມີຄົນດຽວ ຕ້ອງແຍກຮອບຈັດຂໍ້ມູນ ແລະຮອບກວດພ້ອມ Checklist/Audit.", "ອະນຸມັດ “ກວດຂໍ້ມູນແລ້ວ”, “ກວດຫຼ້າສຸດ: [ວັນທີ]”, “ຂໍ້ມູນອາດເກົ່າ” ແລະ “ຍັງບໍ່ຢືນຢັນ”; ບໍ່ໃຊ້ Verified Place."],
    artifacts: [{ label: "place-data-entry.template.json", path: "/templates/place-data-entry.template.json", description: "ແບບຟອມ Place Record ທີ່ມີ Field, Evidence, State ແລະ Publish Checklist ຄົບ." }]
  },

  "content-acquisition": {
    code: "CON-03", title: "ແຜນຫາ Content ໄລຍະທຳອິດ", english: "Content Acquisition Plan", owner: "Content Lead / Founder",
    version: "0.9", status: "pending", statusLabel: "ອະນຸມັດເນື້ອຫາ · ລໍລະບຸເຂດ Pilot",
    approvalNote: "ຂໍ້ຕັດສິນ 4 ໃນ 5 ຂໍ້ຖືກອະນຸມັດແລ້ວ. ເອກະສານຈະຂຶ້ນ 1.0 ໄດ້ເມື່ອລະບຸຊື່ 2–3 ເຂດສຳລັບ 30 Places ທຳອິດ ໂດຍໃຊ້ເກນຄວາມໜາແໜ້ນຂອງຮ້ານ, Source ທີ່ມີ, ເວລາເດີນທາງ ແລະ Category Mix.",
    sources: ["BUS-04 Pilot Plan", "PRO-03 DEC-01/02/04", "CON-01 0.9", "CON-02 1.0"],
    purpose: ["ກຳນົດວິທີສ້າງ Supply ຈາກ 0 ໄປ 100 Places ໂດຍບໍ່ Copy ຫຼື Re-host ວິດີໂອ. ແຜນລວມ Place Inventory, Review Link, Creator Attribution, Owner Confirmation ແລະຕົ້ນທຶນການດຳເນີນງານ.", "Cold start ຕ້ອງພິສູດວ່າທີມສາມາດສ້າງ ແລະຮັກສາ Content ໄດ້ດ້ວຍກຳລັງຄົນຈິງ. ຫ້າມໃຊ້ຈຳນວນ Link ເປັນຄຸນນະພາບໂດຍບໍ່ກວດ Place Data ແລະ Rights."],
    sections: [
      { title: "Cold-start Inventory 30 → 60 → 100", intro: "ແຕ່ລະຂັ້ນມີຈຸດປະສົງຮຽນຮູ້ຕ່າງກັນ. ຫ້າມຂ້າມ Gate ເພາະຕ້ອງການຕົວເລກ 100 ໄວ.", headers: ["Stage", "ເປົ້າໝາຍ", "ສິ່ງທີ່ຕ້ອງພິສູດ", "Gate"], rows: [
        ["30 Places", "Restaurant/Café ໃນ 2–3 ເຂດທີ່ຈະລະບຸກ່ອນ 1.0; ສັດສ່ວນ 60:40 ±10%", "Field workflow, source linking, publish review, time-per-place", "≥90% required field; critical fields 100%; no unresolved rights issue"],
        ["60 Places", "ເພີ່ມຄວາມຫຼາກຫຼາຍ price/cuisine", "Search/filter usefulness, duplicate handling, correction volume", "Core search + place journey tested"],
        ["100 Places", "Inventory ພໍສຳລັບ Validation Pilot", "Freshness workload, owner response, creator/source coverage", "Release Gate G2/G3 evidence"]
      ]},
      { title: "Source Discovery ແລະ Selection", intro: "TikTok/Facebook ເປັນ Source ຫຼັກ; YouTube ເປັນ Source ເສີມ. Platform ເກັບ URL, attribution ແລະ metadata ທີ່ອະນຸຍາດເທົ່ານັ້ນ.", headers: ["ຂັ້ນ", "ການກວດ", "ຜ່ານເມື່ອ", "ບໍ່ຜ່ານເມື່ອ"], rows: [
        ["Discover", "ຊອກດ້ວຍ place/name/area/food term", "ພົບ original public source", "Repost ບໍ່ຮູ້ຕົ້ນສະບັບ"],
        ["Match", "ຊື່, ພິກັດ, ພາບ/ບໍລິບົດ", "ຊີ້ Place ດຽວຢ່າງໝັ້ນໃຈ", "ສາຂາບໍ່ຊັດ"],
        ["Rights/availability", "public URL, official embed, creator attribution", "ມີ link/fallback ແລະ takedown path", "ຕ້ອງ download/copy ຈຶ່ງໃຊ້ໄດ້"],
        ["Quality", "ເນື້ອຫາກ່ຽວ, ບໍ່ຫຼອກ, ບໍ່ຂັດ policy", "ຊ່ວຍຕັດສິນໃຈ", "ມີອັນຕະລາຍ/ຄວາມຜິດຊັດ"]
      ]},
      { title: "Creator ແລະ Place-owner Outreach", intro: "Pilot ບໍ່ບັງຄັບໃຫ້ Creator ຫຼືຮ້ານສ້າງ Account. Outreach ເລີ່ມເມື່ອມີປະມານ 20 Place Records ເພື່ອໃຫ້ Attribution/Opt-out Feedback ຖືກນຳໄປປັບກ່ອນຄົບ 30 Places.", headers: ["Audience", "Offer", "Call to action", "ສິ່ງທີ່ຫ້າມສັນຍາ"], rows: [
        ["Creator", "Attribution + link back + correction/takedown channel", "ຢືນຢັນ creator identity/source link; opt out ຫຼືຮ່ວມ", "ບໍ່ສັນຍາ reach/revenue"],
        ["Place owner", "Free listing verification; Founding Partner ເປັນທາງເລືອກ", "ຢືນຢັນ data; ທົດສອບ 200,000 ກີບ/ເດືອນ", "ການຈ່າຍບໍ່ຊື້ review score/verification"],
        ["Reviewer/user", "ຊ່ອງທາງແຈ້ງຂໍ້ມູນຜິດ", "ສົ່ງ evidence", "ບໍ່ publish ອັດຕະໂນມັດ"]
      ]},
      { title: "Supply Metrics ແລະ Workload", intro: "ທີມຕ້ອງວັດທັງ output, quality, rights ແລະ operation cost.", headers: ["Metric", "ສູດ/ວິທີນັບ", "ເປົ້າ Pilot", "ໃຊ້ຕັດສິນ"], rows: [
        ["Publish-ready rate", "Published records ÷ reviewed records", "≥80% ຫຼັງ 30 Places", "ຄຸນນະພາບ source process"],
        ["Required-field completeness", "required fields present ÷ required fields", "≥90%; critical fields 100%", "Pilot readiness"],
        ["Source coverage", "Places ມີ active review source ÷ Published Places", "≥80%", "Feed usefulness"],
        ["Time per place", "total curation/review minutes ÷ accepted places", "ບັນທຶກ baseline; ບໍ່ຟັນທົງກ່ອນ 30", "Staffing/automation"],
        ["Manual workload", "hours ທັງໝົດຕໍ່ອາທິດ", "ທົບທວນເມື່ອ >20h/week 2 ອາທິດ", "ຢຸດຂະຫຍາຍ/automate"]
      ]},
      { title: "Pilot Area Selection Register", intro: "ບໍ່ຄວນເລືອກເຂດຈາກຄວາມຄຸ້ນເຄີຍພຽງຢ່າງດຽວ. ຜູ້ກໍ່ຕັ້ງຕ້ອງປຽບທຽບ Candidate ດ້ວຍຫຼັກຖານຊຸດດຽວກັນ ແລະບັນທຶກເຫດຜົນກ່ອນອະນຸມັດ.", headers: ["Register item", "ຫຼັກຖານທີ່ຕ້ອງເກັບ", "ເກນຜ່ານ", "ສະຖານະ"], rows: [
        ["AREA-01", "ຊື່ເຂດ/ຂອບເຂດ, ຈຳນວນ Candidate Places, active review sources, ເວລາເດີນທາງ, category mix", "ມີ Inventory ພໍສຳລັບແບ່ງ 30 Places; ສາມາດກວດພື້ນທີ່ໄດ້; ບໍ່ມີ rights blocker", "Pending — ລໍຊື່ເຂດ"],
        ["AREA-02", "ໃຊ້ Field ແລະເກນດຽວກັບ AREA-01", "ບໍ່ຊ້ຳ coverage ທັງໝົດ; ຊ່ວຍທົດສອບ district filter", "Pending — ລໍຊື່ເຂດ"],
        ["AREA-03", "Optional; ໃຊ້ເມື່ອ 2 ເຂດທຳອິດບໍ່ຄົບ category/source mix", "ຜ່ານເກນດຽວກັນ ແລະບໍ່ເພີ່ມ travel workload ເກີນກຳລັງ", "Pending/Optional"]
      ], note: "ການໃສ່ຊື່ເຂດໃນ Register ຈະແກ້ CON-03 REV-01 ແລະເປີດໃຫ້ CON-01 ສ້າງ Canonical District IDs. ຫ້າມໃຊ້ຄຳວ່າ ‘ເຂດກາງເມືອງ’ ໂດຍບໍ່ລະບຸຂອບເຂດ."},
      { title: "Content Source Ledger", intro: "Ledger ແມ່ນທະບຽນຂອງ Link/Embed ທຸກອັນ. ມັນໃຊ້ຕອບວ່າ Content ມາຈາກໃສ, ຜູກກັບ Place ໃດ, ໃຜກວດ, ມີສິດນຳໃຊ້ດ້ວຍວິທີໃດ ແລະຖືກຖອນເມື່ອໃດ.", headers: ["Field group", "Fields", "ກົດ", "ຜົນຕໍ່ workflow"], rows: [
        ["Identity/Match", "source_id, place_id, original_url, provider, media_type", "original_url unique ຕໍ່ source; Place/branch ຕ້ອງຖືກ match", "Match ບໍ່ຊັດ → rejected ຫຼື review queue"],
        ["Creator/Attribution", "creator_display_name, creator_profile_url, attribution_copy", "ອ້າງ original public source; ຫ້າມໃຫ້ຄວາມໝາຍວ່າ creator endorse platform", "ຂາດ attribution → ຫ້າມ publish source"],
        ["Rights/Method", "public_available, use_method, rights_basis, checked_at", "use_method = redirect ຫຼື official_embed; re-host ຫ້າມໃນ MVP", "rights uncertain → redirect only/rights review"],
        ["Commercial", "source_disclosure, platform_campaign_id", "ຮັກສາ Paid Partnership ຂອງ source; ແຍກຈາກ campaign ຂອງ platform", "ຂາດ label → suspend"],
        ["Control", "status, curator_id, reviewer_id, moderation_case_id, removed_at/reason", "State = discovered → matched → rights_checked → approved; ຫຼື unavailable/takedown/rejected", "ທຸກ state change ມີ actor/timestamp"]
      ]}
    ],
    review: ["ເລືອກ 2–3 ເຂດໃດສຳລັບ 30 Places ທຳອິດ?", "ສັດສ່ວນ Restaurant:Café ຈະເປັນ 60:40 ຫຼືແບບໃດ?", "ໃຜຮັບຜິດຊອບ curation, review ແລະ owner outreach?", "Creator outreach ຈະເລີ່ມກ່ອນ ຫຼືຫຼັງ 30 Places?", "ອະນຸມັດ Supply target ແລະ workload threshold ທີ່ລະບຸຫຼືບໍ່?"],
    reviewDecisions: ["ຍັງຄ້າງ: ຕ້ອງລະບຸຊື່ ແລະຂອບເຂດ 2–3 ເຂດໃນ Pilot Area Selection Register ກ່ອນຂຶ້ນ 1.0.", "ອະນຸມັດ Restaurant:Café 60:40 ໂດຍຍອມໃຫ້ຄາດເຄື່ອນ ±10% ເພື່ອບໍ່ຫຼຸດຄຸນນະພາບ Source.", "Founder/Product Owner ຮັບຜິດຊອບລວມ; Content Operator ຈັດຂໍ້ມູນ; Reviewer ອະນຸມັດ; Founder ຕິດຕໍ່ຮ້ານ. ຖ້າມີຄົນດຽວຕ້ອງແຍກ Work Queue ແລະເວລາກວດ.", "ເລີ່ມ Creator Outreach ເມື່ອມີປະມານ 20 Records.", "ອະນຸມັດ ≥90% completeness, critical fields 100%, active source coverage ≥80% ແລະທົບທວນ Automation ເມື່ອ Manual Workload >20 ຊົ່ວໂມງ/ອາທິດຕິດກັນ 2 ອາທິດ; unresolved rights issue ເປັນ Stop Condition."],
    artifacts: [{ label: "content-source-ledger.template.csv", path: "/templates/content-source-ledger.template.csv", description: "CSV ສຳລັບບັນທຶກ Original URL, Place match, attribution, rights method, disclosure, reviewer ແລະ source state." }]
  },

  "creator-moderation": {
    code: "CON-04", title: "Creator ແລະ Content Moderation", english: "Creator & Moderation Guideline", owner: "Trust & Safety Owner",
    version: "1.0", status: "approved", statusLabel: "ອະນຸມັດແລ້ວ",
    approvalNote: "Founder/Product Owner ເປັນ Trust & Safety Owner ໃນ Pilot. P0–P3 ເປັນເປົ້າໝາຍດຳເນີນງານພາຍໃນ ບໍ່ແມ່ນຄຳຮັບປະກັນທາງກົດໝາຍ.",
    sources: ["CON-03 0.9", "PRO-02 Trust Workflows", "PRO-03 MVP-011/013", "PRO-04 TRU-01"],
    purpose: ["ກຳນົດມາດຕະຖານ Creator Attribution, Content Eligibility, Report, Takedown ແລະ Appeal. Platform ເປັນຜູ້ຈັດລະບຽບ link ແລະຂໍ້ມູນ Place; ບໍ່ໄດ້ເປັນເຈົ້າຂອງວິດີໂອຈາກ Social Platform.", "Moderation ຕ້ອງແຍກລະຫວ່າງ Content ບໍ່ເໝາະສົມ, Source unavailable, Rights complaint, Place data conflict ແລະ Sponsored disclosure. ແຕ່ລະປະເພດມີ workflow ຕ່າງກັນ."],
    sections: [
      { title: "Creator Identity ແລະ Attribution", intro: "Attribution ຕ້ອງຊີ້ໄປຫາ Original Source ແລະບໍ່ສ້າງຄວາມເຂົ້າໃຈວ່າ Creator ຮັບຮອງ Platform.", headers: ["Field/Element", "Required", "ກົດ", "Fallback"], rows: [
        ["Creator display name", "Yes", "ອ່ານຈາກ public source ຫຼື creator-confirmed", "ສະແດງ source platform ເມື່ອ name ບໍ່ມີ"],
        ["Original URL", "Yes", "ຕ້ອງຊີ້ content ຕົ້ນສະບັບ", "ຖອນ source ເມື່ອບໍ່ຮູ້ຕົ້ນສະບັບ"],
        ["Platform label", "Yes", "TikTok/Facebook/YouTube", "ຫ້າມໃຊ້ generic video label"],
        ["Commercial disclosure", "Conditional", "Sponsored/Paid partnership ຕ້ອງຮັກສາປ້າຍ", "ຢຸດ publish ເມື່ອບໍ່ຊັດ"]
      ]},
      { title: "Content Eligibility ແລະ Moderation Reasons", intro: "Content ທີ່ຜ່ານຕ້ອງກ່ຽວກັບ Place, ຊີ້ Place/ສາຂາໄດ້ ແລະມີ Source ທີ່ເປີດເບິ່ງໄດ້.", headers: ["Reason code", "ຄວາມໝາຍ", "ການດຳເນີນການ", "Public result"], rows: [
        ["MOD-IRRELEVANT", "ບໍ່ກ່ຽວກັບ Place/decision", "Reject/Unlink", "ບໍ່ສະແດງ"],
        ["MOD-MISMATCH", "ຜູກຜິດ Place ຫຼືສາຂາ", "Suspend + rematch", "Fallback ໄປ Place ໂດຍບໍ່ມີ source"],
        ["MOD-DECEPTIVE", "ຫຼອກລວງ/ປອມແປງຊັດເຈນ", "Remove + audit", "ບໍ່ສະແດງ"],
        ["MOD-RIGHTS", "Rights holder ແຈ້ງຖອນ", "Immediate public removal + case review", "ບໍ່ສະແດງລະຫວ່າງກວດ"],
        ["MOD-UNAVAILABLE", "Source ລົ້ມ/ລົບ/ຈຳກັດ", "Fallback + retry; confirm before permanent unlink", "Place ຍັງຢູ່"],
        ["MOD-UNSAFE", "ເນື້ອຫາສ່ຽງອັນຕະລາຍ/ລະເມີດຮ້າຍແຮງ", "Remove + escalate", "ບໍ່ສະແດງ"],
        ["MOD-PRIVACY", "ເປີດເຜີຍຂໍ້ມູນສ່ວນບຸກຄົນ", "Immediate removal + P0 review", "ບໍ່ສະແດງລະຫວ່າງກວດ"],
        ["MOD-SPAM", "Content ຊ້ຳ, ບໍ່ກ່ຽວ ຫຼືໂຄສະນາລົບກວນ", "Reject/Unlink", "ບໍ່ສະແດງ"],
        ["MOD-HARASSMENT", "ຂົ່ມຂູ່, ລົບກວນ ຫຼືໂຈມຕີບຸກຄົນ", "Remove + escalate", "ບໍ່ສະແດງ"]
      ]},
      { title: "Report, Review ແລະ Takedown", intro: "Report ຮັບຜ່ານ Web Form ແລະ Email ສະເພາະເປັນຊ່ອງທາງຫຼັກ; Messaging ເປັນພຽງຊ່ອງທາງສຳຮອງ. ທຸກ Report ຕ້ອງເຂົ້າ Case Queue ດຽວ, ມີ owner, priority, evidence ແລະ audit trail.", headers: ["Priority", "ຕົວຢ່າງ", "Initial action", "Pilot target"], rows: [
        ["P0", "Rights takedown, serious safety/privacy", "ຖອນ public source ທັນທີ + notify owner", "ຮັບຮູ້ພາຍໃນ 4 ຊົ່ວໂມງທຳການ"],
        ["P1", "Wrong place, deceptive content, active conflict", "Suspend + investigate", "1 ວັນທຳການ"],
        ["P2", "Attribution/name correction", "Queue by age", "3 ວັນທຳການ"],
        ["P3", "Suggestion/non-blocking quality", "Backlog", "7 ວັນທຳການ"]
      ], note: "SLA ນີ້ເປັນ Pilot operating target ບໍ່ແມ່ນຄຳຮັບປະກັນທາງກົດໝາຍ; ຕ້ອງປັບຕາມຈຳນວນຄົນແລະການທົບທວນກົດໝາຍ."},
      { title: "Appeal, Conflict of Interest ແລະ Audit", intro: "ຜູ້ແຈ້ງ, Creator ແລະ Place Owner ຕ້ອງມີທາງສົ່ງຫຼັກຖານເພີ່ມ. Reviewer ຄົນເກົ່າບໍ່ຄວນຕັດສິນ Appeal ຂອງຕົນເອງ.", headers: ["ຂັ້ນ", "ກົດ", "ຜູ້ຕັດສິນ", "ບັນທຶກ"], rows: [
        ["Submit appeal", "ອ້າງ case ID + new evidence", "Requester", "Timestamp + evidence"],
        ["Eligibility check", "ບໍ່ຮັບ duplicate ທີ່ບໍ່ມີຂໍ້ມູນໃໝ່", "Trust operator", "Accept/reject reason"],
        ["Independent review", "Reviewer ບໍ່ແມ່ນຜູ້ຕັດສິນຄັ້ງທຳອິດ", "Trust owner/Product Owner", "Decision + policy reference"],
        ["Restore/confirm removal", "ປ່ຽນ state ແບບ auditable", "Authorized admin", "Before/after + actor"]
      ]},
      { title: "Public Intake Forms", intro: "ຊ່ອງທາງ Web Form ຕ້ອງແຍກປະເພດຄຳຮ້ອງເພື່ອໃຫ້ລະບົບຈັດ Priority ແລະເກັບຫຼັກຖານຖືກ. ທຸກ Form ຕ້ອງສ້າງ Case ID ແລະສົ່ງຄຳຢືນຢັນໃຫ້ຜູ້ສົ່ງ.", headers: ["Form", "Required fields", "Optional/conditional", "Routing"], rows: [
        ["General content report", "place/source URL, reason code, description", "reporter contact, screenshot/evidence", "MOD-* → P1/P2/P3 ຕາມ reason"],
        ["Place data correction", "place_id/URL, field ທີ່ຜິດ, current value, proposed value, evidence", "requester relation to place, contact", "Data correction queue; ຫ້າມ auto-publish"],
        ["Rights/Privacy takedown", "claimant name/contact, authority, exact URL, claim, evidence, good-faith declaration, submitted_at", "authorized representative document", "P0; hide affected public source while reviewed"],
        ["Appeal", "case_id, disputed decision, new evidence, requested outcome", "representative/contact", "Independent reviewer; duplicate without new evidence may be closed"],
        ["Form notice", "purpose, who receives data, response channel, policy links", "consent choice ເມື່ອກົດໝາຍກຳນົດ", "Retention/access ອ້າງ CON-05 ແລະ TEC-06"]
      ]},
      { title: "Internal Moderation Decision Record", intro: "Case ທີ່ມີແຕ່ຜົນວ່າ ‘ລົບ’ ຫຼື ‘ບໍ່ລົບ’ ຍັງກວດສອບບໍ່ໄດ້. Internal Record ຕ້ອງບັນທຶກວ່າໃຜຕັດສິນ, ໃຊ້ Policy ໃດ, ເຫັນຫຼັກຖານຫຍັງ ແລະປ່ຽນ State ແນວໃດ.", headers: ["ກຸ່ມຂໍ້ມູນ", "Required fields", "ກົດ", "Audit result"], rows: [
        ["Case control", "case_id, case_type, priority, status, received_at, owner", "case_id immutable; priority change ຕ້ອງມີ reason", "ຕາມ SLA/age ໄດ້"],
        ["Evidence", "reported URLs, attachments/references, claimant statement, source snapshot metadata", "ຫ້າມເກັບສຳເນົາ media ເກີນ policy; access restricted", "ຮູ້ຫຼັກຖານທີ່ໃຊ້"],
        ["Decision", "reason_code, policy_reference, finding, action, before_state, after_state", "finding ຕ້ອງອະທິບາຍ; ຫ້າມໃຊ້ຄຳວ່າ ‘ຕາມເໝາະສົມ’ ຢ່າງດຽວ", "ທົບທວນຄືນໄດ້"],
        ["People/time", "decided_by/at, notified_at, appeal_reviewer, appeal_decided_at", "ຜູ້ຕັດສິນເດີມຫ້າມອະນຸມັດ appeal", "ກວດ conflict of interest ໄດ້"],
        ["Closure", "final_status, retention_class, deletion_due_at", "Retention class ຕ້ອງອ້າງ CON-05/TEC-06 ເມື່ອອະນຸມັດ", "ປິດ Case ໂດຍບໍ່ເສຍ audit"]
      ], note: "ກ່ອນ Public Pilot ຕ້ອງ configure URL ຂອງ Web Form, dedicated Trust & Safety email, mailbox owner ແລະ fallback contact ໃນ Deployment Configuration. ຄ່າຕິດຕໍ່ຈິງບໍ່ຄວນຖືກສົມມຸດໃນເອກະສານນີ້."}
    ],
    review: ["ໃຜເປັນ Trust & Safety Owner ໃນ Pilot?", "Reason Codes ຄົບກັບຄວາມສ່ຽງຫຼັກຫຼືບໍ່?", "ອະນຸມັດ P0–P3 operating target ຫຼືຕ້ອງປັບຕາມກຳລັງຄົນ?", "ຊ່ອງທາງ report/takedown ທຳອິດຈະໃຊ້ Email, Form ຫຼື Messaging?", "ໃຜເປັນ independent appeal reviewer ເມື່ອທີມຍັງນ້ອຍ?"],
    reviewDecisions: ["Founder/Product Owner ເປັນ Trust & Safety Owner ໃນ Pilot.", "ອະນຸມັດ Reason Codes ເດີມ ແລະເພີ່ມ MOD-PRIVACY, MOD-SPAM ແລະ MOD-HARASSMENT.", "ອະນຸມັດ P0–P3 ເປັນ Internal Operating Target; P0 ທີ່ນ່າເຊື່ອຖື/ສ່ຽງສູງຕ້ອງຖອນຈາກ Public ທັນທີ.", "ໃຊ້ Web Form + Dedicated Email ເປັນຊ່ອງທາງຫຼັກ; Messaging ເປັນ Fallback. URL/email ຕົວຈິງເປັນ Deployment Configuration ທີ່ຕ້ອງຕັ້ງກ່ອນ Public Pilot.", "ຜູ້ຕັດສິນເດີມຫ້າມອະນຸມັດ Appeal ຂອງຕົນ. ກໍລະນີ Rights/Privacy ສົ່ງ Legal Reviewer; ຖ້າມີຄົນດຽວຕ້ອງເຮັດ Second Review ແບບມີບັນທຶກ."],
    artifacts: [{ label: "moderation-case.template.json", path: "/templates/moderation-case.template.json", description: "ແບບຟອມກາງສຳລັບ Report, Correction, Rights/Privacy Takedown, Appeal ແລະ Internal Decision Record." }]
  },

  "legal-disclosure": {
    code: "CON-05", title: "ລິຂະສິດ ແລະການເປີດເຜີຍ", english: "Copyright & Sponsored Disclosure", owner: "Product Owner / Legal Reviewer",
    version: "0.9", status: "pending", statusLabel: "ອະນຸມັດດ້ານ Product · ລໍ Legal Review",
    approvalNote: "ນີ້ແມ່ນ Product Policy ບໍ່ແມ່ນຄຳແນະນຳທາງກົດໝາຍ. ກ່ອນຂຶ້ນ 1.0 ແລະກ່ອນ Public MVP ຕ້ອງຜ່ານການກວດຈາກນັກກົດໝາຍທີ່ມີອຳນາດໃນລາວ ພ້ອມກຳນົດ Analytics Consent ແລະ Data Retention ໃຫ້ສຳເລັດ.",
    sources: ["PRO-03 DEC-02/03", "CON-03 0.9", "CON-04 1.0", "BUS-06 Revenue Model"],
    purpose: ["ກຳນົດ Product Policy ສຳລັບ Linking, Official Embed, Attribution, Takedown, Sponsored Placement ແລະ User Consent. ເອກະສານນີ້ກຳນົດພຶດຕິກຳຂອງ Platform ແຕ່ບໍ່ແທນຄຳແນະນຳທາງກົດໝາຍ.", "ກ່ອນ Public MVP ຕ້ອງໃຫ້ທີ່ປຶກສາກົດໝາຍທີ່ມີອຳນາດໃນລາວກວດ Terms, Privacy Notice, consent, takedown ແລະ commercial disclosure ສະບັບສຸດທ້າຍ."],
    sections: [
      { title: "Linking, Embedding ແລະ Attribution Policy", intro: "Platform ຕ້ອງຊີ້ກັບຫາ Original Source ແລະຫ້າມເກັບສຳເນົາວິດີໂອໂດຍບໍ່ມີສິດ.", headers: ["ການກະທຳ", "ສະຖານະ", "ເງື່ອນໄຂ", "Fallback"], rows: [
        ["Redirect to original URL", "Allowed by product policy", "Public URL + attribution + source platform", "ສະແດງ Place ໂດຍບໍ່ມີ source ເມື່ອ link unavailable"],
        ["Official embed", "Allowed conditionally", "TikTok, Facebook ແລະ YouTube: ໃຊ້ສະເພາະ Public Content ແລະ Official Provider Mechanism; ບໍ່ຂ້າມ access control", "Preview + open original; ຖ້າບໍ່ແນ່ໃຈໃຫ້ Redirect ເທົ່ານັ້ນ"],
        ["Store permitted metadata", "Limited", "ເກັບສະເພາະ metadata ທີ່ຈຳເປັນ ແລະອະນຸຍາດ", "Manual title/attribution ຈາກ approved source"],
        ["Download/re-host/transcode", "Prohibited by MVP policy", "ຍົກເວັ້ນມີ written license ແລະ approval ໃໝ່", "Link/embed only"],
        ["Scraping beyond permission", "Prohibited", "ຫ້າມ bypass restriction/rate limit", "Manual curation"]
      ]},
      { title: "Takedown ແລະ Rights Complaint", intro: "Rights complaint ຮັບຜ່ານ Dedicated Web Form ແລະ Email ໂດຍ Trust & Safety Owner ເປັນເຈົ້າຂອງ Case. ລະບົບຕ້ອງຖອນ Public Exposure ໄດ້ໄວ ແລະຮັກສາ Evidence/Audit.", headers: ["ຂັ້ນ", "ຂໍ້ມູນທີ່ຕ້ອງຮັບ", "Platform action", "ຜົນ"], rows: [
        ["Receive", "Contact, URL, rights claim, evidence, declaration", "Create case + acknowledge", "Case ID"],
        ["Protect", "ກວດວ່າ source ໃດຖືກແຈ້ງ", "Remove/suspend public source ທັນທີເມື່ອຄວາມສ່ຽງສູງ", "Place record ບໍ່ຖືກລົບອັດຕະໂນມັດ"],
        ["Review", "Identity/authority, URL match, counter evidence", "Approve removal / request more / restore", "Reasoned decision"],
        ["Close", "Final decision + notification", "Update state/audit", "Retention per approved policy"]
      ]},
      { title: "Sponsored ແລະ Commercial Disclosure", intro: "ຜູ້ໃຊ້ຕ້ອງແຍກ Organic Source, Founding Partner ແລະ Sponsored Placement ອອກຈາກກັນໄດ້ໃນທັນທີ.", headers: ["Label", "ໝາຍເຖິງ", "ບໍ່ໝາຍເຖິງ", "UI rule"], rows: [
        ["ແຫຼ່ງຣີວິວ", "ມີ Review Source ຕົ້ນສະບັບ", "Platform ບໍ່ຮັບຮອງຄວາມເຫັນ", "ສະແດງ Creator + Platform + Link"],
        ["ກວດຂໍ້ມູນແລ້ວ", "Field ສຳຄັນຖືກກວດຕາມ CON-02", "ບໍ່ແມ່ນຄະແນນ/ຄຳຮັບປະກັນ", "ສະແດງ Checked Date"],
        ["ຮ້ານຮ່ວມທົດລອງ", "ຮ້ານຮ່ວມ Pilot ແລະຈ່າຍ Package", "ບໍ່ຊື້ Ranking, Review Score ຫຼື Verification", "ປ້າຍ Partner ແຍກຈາກ Sponsored"],
        ["ໂຄສະນາ", "ຮ້ານຈ່າຍເພື່ອ Placement ໃນຊ່ວງກຳນົດ", "ບໍ່ແມ່ນ Organic Ranking", "ສະແດງ “ໂຄສະນາ — ຮ້ານຈ່າຍເພື່ອສະແດງ” ໃກ້ Title/Action; ຫ້າມເຊື່ອງ"]
      ]},
      { title: "Consent, Analytics ແລະ Data Boundary", intro: "MVP ໃຊ້ Guest-first ແລະ Anonymous Session. ຕ້ອງເກັບຂໍ້ມູນເທົ່າທີ່ຈຳເປັນຕໍ່ essential operation ແລະ approved analytics.", headers: ["Data/Action", "Purpose", "Consent/notice", "ຂໍ້ຈຳກັດ"], rows: [
        ["Essential session", "Security, state, rate limiting", "Privacy notice", "ບໍ່ໃຊ້ marketing profile"],
        ["Analytics event", "Feed → Place → Intent funnel", "Consent choice ຕາມ approved policy", "Pseudonymous ID; dedupe; limited retention"],
        ["Map/Call/Message click", "Decision Intent", "ອະທິບາຍວ່າ click ບໍ່ເທົ່າ visit/sale", "ຫ້າມລາຍງານເກີນຫຼັກຖານ"],
        ["Correction/takedown contact", "Resolve request", "Form notice", "Access limited; retention decision required"]
      ]},
      { title: "Legal Review Checklist", intro: "Checklist ນີ້ບໍ່ແມ່ນຄຳຕອບທາງກົດໝາຍ. ມັນແມ່ນບັນຊີຄຳຖາມ ແລະຫຼັກຖານທີ່ Product Owner ຕ້ອງສົ່ງໃຫ້ນັກກົດໝາຍທີ່ມີອຳນາດໃນລາວກວດກ່ອນ Public MVP.", headers: ["Review ID", "ຂອບເຂດກວດ", "ຜົນສົ່ງມອບ", "ສະຖານະ"], rows: [
        ["LEG-01", "Terms of Use: ບົດບາດ platform, external content, user action, liability, complaint", "ຂໍ້ຄວາມທີ່ legal reviewer ອະນຸມັດ + version/effective date", "Pending legal review"],
        ["LEG-02", "Privacy Notice: data categories, purpose, access, provider, user rights, contact", "Approved notice + data map", "Pending legal review/TEC-06"],
        ["LEG-03", "Analytics consent, cookies/local storage, withdrawal", "Consent rule + UI copy + proof record", "Pending legal review/TEC-06"],
        ["LEG-04", "TikTok/Facebook/YouTube linking/embed/provider terms", "Provider-by-provider allowed method + fallback + review date", "Pending legal review and current provider verification"],
        ["LEG-05", "Copyright, attribution, takedown, counter-evidence/appeal", "Approved forms, response procedure, notice wording", "Pending legal review"],
        ["LEG-06", "Partner/Sponsored disclosure ແລະ commercial claims", "Approved Lao labels + placement rule", "Product labels approved; legal confirmation pending"],
        ["LEG-07", "Cross-border processor/vendor, hosting, access control", "Vendor register + contract/transfer requirements", "Pending TEC-06/legal review"],
        ["LEG-08", "Retention, deletion, security/audit logs, complaint records", "Approved retention schedule + deletion/hold rule", "Pending TEC-06/legal review"]
      ]},
      { title: "Consent & Retention Decision Register", intro: "ຫ້າມ Developer ເລືອກ consent default ຫຼືຈຳນວນວັນເກັບຂໍ້ມູນເອງ. Register ນີ້ແຍກສິ່ງທີ່ Product ສະເໜີອອກຈາກສິ່ງທີ່ Legal/TEC-06 ຕ້ອງອະນຸມັດ.", headers: ["Data class", "Product baseline", "ຈຸດທີ່ຕ້ອງຕັດສິນ", "Release behavior ລະຫວ່າງຄ້າງ"], rows: [
        ["Essential session/security", "ໃຊ້ສະເພາະ session state, abuse/rate-limit ແລະ security", "legal basis/notice; identifier; retention days", "ເກັບຂັ້ນຕ່ຳ; ບໍ່ສ້າງ marketing profile"],
        ["Non-essential analytics", "Feed → Place → Intent events ແບບ pseudonymous", "consent trigger, default, withdrawal, retention, vendor", "ປິດການເກັບທີ່ບໍ່ຈຳເປັນຈົນກວ່າຈະອະນຸມັດ"],
        ["Correction/takedown contact", "ໃຊ້ຕິດຕໍ່ ແລະແກ້ Case ເທົ່ານັ້ນ", "required/optional fields, restricted roles, retention/deletion, legal hold", "ຮັບສະເພາະ Field ຈຳເປັນ; access ຈຳກັດ"],
        ["Moderation/audit log", "ຮັກສາ state change, actor, reason ແລະ evidence reference", "retention class, security access, deletion/hold exception", "ບັນທຶກ metadata ຂັ້ນຕ່ຳ; ຫ້າມເກັບ media copy ໂດຍບໍ່ມີ rule"],
        ["Consent withdrawal/deletion request", "ຕ້ອງມີວິທີປ່ຽນ choice ແລະສົ່ງຄຳຮ້ອງ", "identity check, response time, deletion vs legal hold, proof of completion", "ບໍ່ Launch analytics ທີ່ຕ້ອງ consent ຖ້າ flow ນີ້ບໍ່ພ້ອມ"]
      ], note: "Gate ສຳລັບ CON-05 1.0: LEG-01 ຫາ LEG-08 ມີ reviewer/date/outcome ຄົບ, Consent & Retention Register ບໍ່ມີຄ່າ Pending, ແລະ Requirement/UX/TEC-06 ຖືກປັບໃຫ້ກົງກັນ. ຖ້າຍັງຄ້າງ ໃຫ້ປິດ non-essential analytics ແທນການເດົາ."}
    ],
    review: ["ຕົກລົງວ່າ CON-05 ເປັນ Product Policy ທີ່ຕ້ອງຜ່ານ Legal Review ກ່ອນ Public MVP ຫຼືບໍ່?", "Official Embed ຂອງ provider ໃດຈະອະນຸຍາດໃນ Pilot?", "Rights complaint ຈະຮັບຜ່ານຊ່ອງທາງໃດ ແລະໃຜເປັນ owner?", "ອະນຸມັດຄຳລາວສຳລັບ Partner, Sponsored ແລະ Verified label ຫຼືບໍ່?", "ຈະກຳນົດ analytics consent ແລະ data retention ໃນ TEC-06/Legal Review ກ່ອນ PRO-04 1.0 ຫຼືບໍ່?"],
    reviewDecisions: ["ອະນຸມັດເປັນ Product Policy; ຍັງຄ້າງ Legal Review Checklist LEG-01 ຫາ LEG-08 ກ່ອນ Public MVP ແລະກ່ອນຂຶ້ນ 1.0.", "ອະນຸຍາດ Official Embed ຂອງ TikTok, Facebook ແລະ YouTube ສະເພາະ Public Content ທີ່ Provider ຮອງຮັບ; ຖ້າບໍ່ແນ່ໃຈໃຫ້ Redirect ເທົ່ານັ້ນ. ຍັງຕ້ອງກວດ Provider terms ປັດຈຸບັນກ່ອນ Launch.", "ໃຊ້ Dedicated Form + Email; Trust & Safety Owner ເປັນ Owner ແລະໃຊ້ P0 Process ສຳລັບ Rights/Privacy.", "ອະນຸມັດ “ແຫຼ່ງຣີວິວ”, “ກວດຂໍ້ມູນແລ້ວ”, “ຮ້ານຮ່ວມທົດລອງ” ແລະ “ໂຄສະນາ — ຮ້ານຈ່າຍເພື່ອສະແດງ”; Legal Reviewer ຍັງຕ້ອງຢືນຢັນກ່ອນ Launch.", "ຍັງຄ້າງ: TEC-06 ແລະ Legal Review ຕ້ອງຕື່ມ Consent & Retention Decision Register ໃຫ້ບໍ່ມີ Pending ກ່ອນ CON-05 ແລະ PRO-04 ຂຶ້ນ 1.0."],
    artifacts: [{ label: "legal-review-checklist.template.json", path: "/templates/legal-review-checklist.template.json", description: "Decision Register ສຳລັບ Legal Reviewer, Product Owner ແລະ TEC-06 ບັນທຶກ outcome, owner, date, evidence ແລະ pending item." }]
  },

  "information-user-flow": {
    code: "UX-01", title: "ໂຄງສ້າງຂໍ້ມູນ ແລະ User Flow", english: "Information Architecture & User Flow", owner: "Product Designer / System Analyst",
    version: "1.0", status: "approved", statusLabel: "ອະນຸມັດແລ້ວ",
    approvalNote: "UX-01 ເປັນ Product-level navigation ແລະ route baseline. TEC-01/02 ຕ້ອງ map architecture/API ໃຫ້ກົງກັບ Screen ID ເຫຼົ່ານີ້; ຖ້າຈະປ່ຽນ route ຫຼື screen boundary ຕ້ອງມີ Change Record ແລະກວດ traceability ຄືນ.",
    sources: ["PRO-01 1.0", "PRO-02 1.0 Workflows", "PRO-03 1.0", "PRO-04 0.9", "CON-01 0.9", "CON-02 1.0", "CON-04 1.0"],
    purpose: ["ກຳນົດວ່າຜູ້ໃຊ້ພົບຂໍ້ມູນຢູ່ໃສ, ເຄື່ອນຈາກ Discover → Decide → Act ແນວໃດ ແລະລະບົບຕ້ອງຮັກສາ Context ແນວໃດເມື່ອເກີດ Empty, Error ຫຼື External Link fallback.", "MVP ໃຊ້ Guest-first navigation: ຜູ້ໃຊ້ເປີດ Feed, Search ແລະ Place Page ໄດ້ໂດຍບໍ່ສະໝັກ Account. Admin navigation ແຍກຈາກ Public experience ແລະຕ້ອງມີ authentication."],
    sections: [
      { title: "Navigation Model", intro: "Pilot ໃຊ້ Discover ແລະ Search ເປັນ Public destination ຫຼັກ. Saved ຖືກອອກແບບໄວ້ເປັນ Should-have ແຕ່ບໍ່ສະແດງໃນ navigation ຈົນກວ່າ local-device save ຈະພ້ອມ. Desktop ແລະ Mobile ຕ້ອງໃຊ້ຊື່ destination ດຽວກັນ.", headers: ["Destination", "ຈຸດປະສົງ", "Entry", "ການຮັກສາ Context"], rows: [
        ["Discover", "Full-screen video-first feed", "Default home/deep link", "ຈື່ feed position ເມື່ອກັບຈາກ Place"],
        ["Search", "ຄົ້ນດ້ວຍ query/filter", "Navigation/search affordance", "ຈື່ query, filter, result position"],
        ["Saved", "Local-device shortlist · Should", "ບໍ່ສະແດງໃນ Pilot nav ຈົນ feature ພ້ອມ", "No account; ອະທິບາຍ device-local; ຫ້າມສະແດງ dead navigation"],
        ["Place", "Canonical decision page", "Feed/Search/Saved/deep link", "Back ກັບ entry context"],
        ["Admin", "Manage data/source/case", "Protected URL", "ແຍກ session ແລະ authorization"]
      ]},
      { title: "Primary Guest Journeys", intro: "ທຸກ Journey ຈົບທີ່ການຕັດສິນໃຈ ຫຼືການກັບໄປຄົ້ນຕໍ່; ບໍ່ມີ Booking/Payment.", headers: ["Journey", "Flow", "Success", "Analytics boundary"], rows: [
        ["J-01 Discover", "Feed → select video/place → Place → Map/Call/Message", "Action ເປີດປາຍທາງຖືກ", "Intent click ບໍ່ເທົ່າ visit/sale"],
        ["J-02 Search", "Search → query/filter → results → Place → action", "ພົບ Place ຫຼືເຫັນ Empty guidance", "Track query category; protect personal text"],
        ["J-03 Source", "Feed/Place → creator/source → external original", "ກັບຫາ original source ໄດ້", "External open only"],
        ["J-04 Correction", "Place → lightweight internal form → confirmation", "Case/reference received", "No auto-publish; ອ້າງ CON-04 intake form"],
        ["J-05 Save/share", "Place → local save/share canonical URL", "ກັບເປີດ Place ໄດ້", "Should scope"]
      ]},
      { title: "Screen Inventory ແລະ Route Contract", intro: "Screen ID ເປັນຕົວອ້າງອີງລະຫວ່າງ UX, Requirement, API ແລະ Test.", headers: ["Screen ID", "Screen", "Route/entry", "ຂໍ້ມູນຫຼັກ"], rows: [
        ["SCR-G01", "Discovery Feed", "/ or /discover", "video/source/place preview/actions"],
        ["SCR-G02", "Search", "/search", "query, filters, result list, empty state"],
        ["SCR-G03", "Place Detail", "/places/:slug", "canonical place, sources, trust, map/contact"],
        ["SCR-G04", "Saved", "/saved", "device-local saved places"],
        ["SCR-G05", "Consent/Privacy", "entry banner + settings", "essential/analytics choice"],
        ["SCR-A01", "Admin home/queue", "/admin", "summary + ແຍກ Place/Data Queue ແລະ Trust/Case Queue"],
        ["SCR-A02", "Place editor", "/admin/places/:id", "fields, sources, readiness, audit"],
        ["SCR-A03", "Case detail", "/admin/cases/:id", "report/evidence/decision/history"]
      ]},
      { title: "Edge Cases ແລະ Recovery", intro: "Error state ຕ້ອງຮັກສາທາງໄປຕໍ່. ຫ້າມໃຫ້ external media failure ປິດກັ້ນ Place information.", headers: ["Case", "System response", "Primary action", "ຫ້າມ"], rows: [
        ["Video/embed fail", "ສະແດງ poster/source fallback + place summary", "Open original / View place", "Blank full screen"],
        ["No search result", "ບອກ filter/query ທີ່ໃຊ້", "Clear filter / suggest broader term", "ສະແດງ sponsored result ທີ່ບໍ່ກົງ"],
        ["Field unknown/stale", "ສະແດງ Unknown/Stale + checked date", "Contact place / report correction", "ສ້າງຄ່າປອມ"],
        ["Map/contact missing", "ປິດ action ທີ່ຂາດ; ຮັກສາ action ອື່ນ", "Choose available action", "Dead button"],
        ["Admin conflict", "ບໍ່ທັບ update; ສະແດງ latest version", "Reload/compare/reapply", "Silent overwrite"]
      ]}
    ],
    review: ["ອະນຸມັດ bottom navigation: Discover, Search, Saved ຫຼືບໍ່?", "Saved ເປັນ Should ຈະສະແດງໃນ nav ຕັ້ງແຕ່ Pilot ຫຼືລໍ?", "Route naming ແລະ Screen IDs ສອດຄ່ອງກັບ Technical Proposal ຫຼືຕ້ອງປັບ?", "Correction flow ຈະໃຊ້ external channel ຫຼື lightweight form?", "Admin queue ຄວນຮວມຢູ່ໜ້າດຽວ ຫຼືແຍກ Place/Case?"],
    reviewDecisions: ["ອະນຸມັດ Discover ແລະ Search ເປັນ Pilot navigation ຫຼັກ; Saved ຈະເພີ່ມເມື່ອ Should scope ພ້ອມ.", "ອອກແບບ Saved ໄວ້ໃນ Screen Inventory ແຕ່ບໍ່ສະແດງ dead entry ໃນ Pilot.", "ອະນຸມັດ Screen IDs ແລະ route names ເປັນ UX contract; TEC-01/02 ຕ້ອງ map ຕາມ ຫຼືສະເໜີ Change Record.", "ໃຊ້ Lightweight Internal Web Form ຕາມ CON-04; ທຸກ submission ສ້າງ Case ID ແລະບໍ່ auto-publish.", "Admin Home ສະແດງສະຫຼຸບລວມ ແຕ່ແຍກ Place/Data Queue ແລະ Trust/Moderation Case Queue."],
    artifacts: [{ label: "ux-navigation-route-register.json", path: "/templates/ux-navigation-route-register.json", description: "Machine-readable registry ຂອງ Screen ID, route, priority, entry, success outcome ແລະ dependency." }]
  },

  "ux-ui-wireframe": {
    code: "UX-02", title: "ໂຄງຮ່າງ UX/UI", english: "UX/UI Wireframe", owner: "Product Designer",
    version: "1.2", status: "approved", statusLabel: "ອະນຸມັດ Founder Review R2 Revision",
    approvalNote: "Founder Review R2 ວັນທີ 28 ສິງຫາ 2026 ຢືນຢັນວ່າ Video Search, Place decision page, Sponsored/source/freshness ແລະ MVP scope ຜ່ານ. ມີ Minor Revision 1 ຈຸດ: ເພີ່ມຮູບລາຍການໃນເມນູເພື່ອຊ່ວຍສ້າງຄວາມສົນໃຈ; ຖືກນຳໃຊ້ໃນ Prototype R2.1 ແລ້ວ. UX-02 1.2 ເປັນ Wireframe Baseline ທີ່ອະນຸມັດໂດຍ Founder; ບໍ່ແທນ external usability evidence.",
    sources: ["UX-01 1.0", "PRO-03 1.0", "PRO-04 0.9", "CON-01 0.9", "CON-02 1.0", "CON-04 1.0", "CON-05 0.9"],
    purpose: ["ກຳນົດ Layout, Information Hierarchy, Interaction ແລະ System State ກ່ອນເລືອກສີ ຫຼືຮູບພາບສຸດທ້າຍ. Wireframe ເນັ້ນວ່າຜູ້ໃຊ້ເຫັນຫຍັງກ່ອນ, ກົດຢູ່ໃສ ແລະກັບຄືນ Context ໄດ້ແນວໃດ.", "Mobile-first width ເປັນ baseline. Discovery Feed ໃຊ້ວິດີໂອເຕັມ viewport; Place identity, trust label ແລະ action ຕ້ອງອ່ານໄດ້ໂດຍບໍ່ບັງເນື້ອຫາຫຼັກ."],
    sections: [
      { title: "Discovery Feed Wireframe Contract", intro: "ໜຶ່ງ viewport ສະແດງໜຶ່ງ content item. Swipe ປ່ຽນ item; tap Place card ເປີດ Place Page; external source ເປັນ action ແຍກ.", headers: ["Zone", "ຕຳແໜ່ງ", "Content/Action", "ກົດ"], rows: [
        ["Media", "Full viewport background", "official embed/poster/fallback", "ບໍ່ auto-open external app"],
        ["Top bar", "Safe-area top", "logo, search, sound/state", "contrast ຜ່ານທຸກ media"],
        ["Place summary", "Bottom-left above nav", "name, category, district, price, trust", "2–3 ແຖວ; tap ເປີດ Place"],
        ["Actions", "Bottom action row ເໜືອ navigation", "Map, Call, Message ແລະ View Place", "ແຕ່ລະ action ≥44×44; ຂາດຂໍ້ມູນໃຫ້ disabled + reason; ບໍ່ວາງຊິດ swipe edge"],
        ["Navigation", "Safe-area bottom", "Discover/Search; Saved ເພີ່ມເມື່ອ Should scope ພ້ອມ", "ບໍ່ບັງ media control ແລະບໍ່ສະແດງ dead entry"]
      ]},
      { title: "Search, Filter ແລະ Result", intro: "Search ຕ້ອງຊ່ວຍຄົ້ນຫາຕາມເຈດຕະນາ ແລະສະແດງຜົນ Video-first; ບໍ່ຄວນເປັນ Search Box ກັບລາຍການທົ່ວໄປເທົ່ານັ້ນ.", headers: ["Element", "Behavior", "State", "Acceptance note"], rows: [
        ["Intent search", "ຄົ້ນຫາຊື່, ເຂດ ຫຼືຄວາມຕ້ອງການເຊັ່ນ ຄອບຄົວ/ເປີດເດິກ/ງົບ ₭₭", "idle, typing, suggestion, loading, error", "ມີ suggestion ທີ່ໃຊ້ໄດ້ທັນທີ; clear ຄຳຄົ້ນແຍກຈາກ filter"],
        ["Filter chips", "Category, district, price, distance, open now", "selected count + remove", "ສະແດງສະເພາະ filter ທີ່ມີ data coverage"],
        ["Result view", "ປ່ຽນ Video, List ແລະ Map ໂດຍຮັກສາ query/filter", "organic/sponsored/empty", "Video ເປັນ default; List ໃຊ້ປຽບທຽບ; Map ໃຊ້ກວດຕຳແໜ່ງ"],
        ["Result card", "Video poster + place facts + rating/source count + distance", "organic/sponsored label", "Sponsored ຕ້ອງມີປ້າຍຊັດ ແລະບໍ່ຖືກນຳໄປປົນກັບ ranking ປົກກະຕິ"],
        ["Empty state", "Explain no match", "query/filter retained", "Clear one/all; suggestion"],
        ["Pagination/load more", "Preserve order and scroll", "loading/retry", "No duplicate result"]
      ]},
      { title: "Place Page ແລະ Action Hierarchy", intro: "Place Page ເປັນ decision page ທີ່ຕ້ອງຕອບໄດ້ວ່າ ‘ໜ້າໄປບໍ, ເທົ່າໃດ, ຢູ່ໃສ ແລະຄົນອື່ນຣີວິວແນວໃດ?’", headers: ["Order", "Block", "ຂໍ້ມູນ", "Action"], rows: [
        ["1", "Hero video + identity", "primary review, name, category, district, rating/source count, price, distance, sponsored disclosure", "play review / open creator source"],
        ["2", "Primary action bar", "Map, Call, Message, Save", "disable unavailable action with reason"],
        ["3", "Decision summary", "open status, price band, distance, checked date", "report correction"],
        ["4", "Video review collection", "creator, platform, disclosure, multiple viewpoints", "open each original source"],
        ["5", "Category-specific details", "restaurant menu item image/name/price; hotel room photo/type/price band; attraction image/fee/time/facility", "view all details; show checked date; label prototype/demo image"],
        ["6", "Suitability + trust", "tags, data freshness, rating attribution, unavailable source", "understand who it suits and evidence limits"],
        ["7", "Related places", "same category/area/price", "continue discovery without losing context"]
      ]},
      { title: "Admin Wireframe Contract", intro: "Admin UI ຕ້ອງເນັ້ນ queue, validation, before/after, source evidence ແລະ audit; ບໍ່ເນັ້ນ marketing visuals.", headers: ["Screen", "Primary region", "Secondary region", "Critical control"], rows: [
        ["Queue", "filters + sortable cases/places", "workload/SLA summary", "claim/assign/open"],
        ["Place editor", "field form + inline validation", "source/evidence panel", "save draft / request review"],
        ["Review", "before/after + readiness failures", "audit/source history", "approve/reject with reason"],
        ["Case", "claim/evidence/timeline", "related place/source", "suspend/remove/restore with confirmation"]
      ]},
      { title: "Visual Review & Interaction Verification", intro: "ການກວດນີ້ເປັນ Internal Wireframe Review ກ່ອນສົ່ງໃຫ້ຜູ້ໃຊ້ຈິງ. ມັນຢືນຢັນວ່າ layout, state ແລະ interaction ຂັ້ນພື້ນຖານນຳໄປທົດສອບໄດ້; ບໍ່ໄດ້ອ້າງວ່າ usability ຜ່ານແລ້ວ.", headers: ["Review ID", "ຂອບເຂດທີ່ກວດ", "ຫຼັກຖານ/ຜົນ", "ສະຖານະ"], rows: [
        ["VR-01", "Mobile 390×844", "ບໍ່ມີ horizontal overflow; Feed, Search, Place, Consent ແລະ bottom navigation ບໍ່ຊ້ອນກັນ", "Passed · 27 Aug 2026"],
        ["VR-02", "Desktop 1440×900", "Prototype device 390×750 ຢູ່ກາງ viewport; header/task controls ແລະ status ສະແດງຄົບ", "Passed · 27 Aug 2026"],
        ["VR-03", "Discover → Place → Map/Call/Message", "Action ແຍກກັນ, accessible name ຊັດ ແລະ Prototype ບອກວ່າບໍ່ເປີດ external app", "Passed"],
        ["VR-04", "Search → Filter → Place → Back", "ຄຳຄົ້ນ, ຕົວກອງ ແລະ result context ຍັງຢູ່ຫຼັງກົດກັບ", "Passed after correction"],
        ["VR-05", "Sponsored comprehension surface", "ປ້າຍ ‘ໂຄສະນາ — ຮ້ານຈ່າຍເພື່ອສະແດງ’ ຢູ່ຕິດກັບ content; ບໍ່ໃຊ້ Verified ແທນ", "Passed"],
        ["VR-06", "Unavailable video fallback", "ສະແດງສາເຫດ, Place facts ແລະປຸ່ມໄປຕໍ່; ບໍ່ເປັນ dead end", "Passed"],
        ["VR-07", "Touch/accessibility baseline", "ປຸ່ມທີ່ສຳຄັນໃນ Mobile view ສູງຢ່າງໜ້ອຍ 44px; landmark, heading, label ແລະ role=status ຖືກລະບຸ", "Passed for prototype scope"]
      ]}
    ],
    wireframes: [
      { title: "SCR-G01 · Discovery Feed", screen: "MOBILE · FULL VIEWPORT", blocks: ["TOP/SAFE AREA: Brand · Search · Mute/Media state", "MEDIA: Official embed / poster / unavailable fallback", "PLACE: Name · category · district · price · checked date", "ACTIONS: Map · Call · Message · View Place (separate ≥44×44 targets)", "SOURCE: Creator · Provider · Original link · Sponsored label", "NAV: Discover · Search"] },
      { title: "SCR-G02 · Search", screen: "MOBILE · VIDEO-FIRST SCROLL", blocks: ["HEADER: Intent question · Search field · Clear", "SUGGESTIONS: Nearby · Open late · Family · Budget", "FILTER: Category · District · Price · Distance · Open now", "VIEW: Video default · List compare · Map location", "RESULT: Video poster · rating/source count · distance · freshness · Sponsored label", "STATE: Loading · Empty · Error · Retry · preserve query/filter"] },
      { title: "SCR-G03 · Place", screen: "MOBILE · DECISION PAGE", blocks: ["HERO: Primary review video · identity · rating/source count · disclosure", "STICKY ACTIONS: Map · Call · Message · Save", "DECISION: Open status · price · distance · checked date", "REVIEWS: Multiple creator videos + original-source links", "CATEGORY DETAILS: Menu item image/name/price · room photo/type/price · attraction image/fee/facility", "TRUST: Attribution · freshness · correction · unavailable source", "RELATED: same category/area/price → discovery"] },
      { title: "SCR-G04 · Saved", screen: "MOBILE · SHOULD/DEFERRED", blocks: ["NOTICE: Saved on this device; no account sync", "EMPTY: Explain + return to Discover/Search", "LIST: Saved place cards · remove", "STATE: Storage unavailable/cleared", "NAV ENTRY: hidden until feature is released"] },
      { title: "SCR-G05 · Consent/Privacy", screen: "MOBILE · REQUIRED", blocks: ["INITIAL: Essential-only vs optional analytics choice", "DETAIL: Purpose · categories · settings link", "SETTINGS: Change/withdraw choice", "STATE: Essential-only · analytics allowed · save error", "COPY: pending final CON-05 legal approval"] },
      { title: "SCR-A01 · Admin Home", screen: "DESKTOP/TABLET · PROTECTED", blocks: ["SUMMARY: assigned · due · P0/P1 · publish readiness", "QUEUE TABS: Place/Data · Trust/Cases", "FILTER: state · priority · owner · age", "ROW: ID · subject · blocker · SLA · assignee", "STATE: Empty · Load error · Unauthorized · Session expired"] },
      { title: "SCR-A02 · Place Editor", screen: "DESKTOP SPLIT · TABLET STACKED", blocks: ["LEFT/TOP: Field groups + inline validation", "RIGHT/BOTTOM: Source evidence + preview", "HEADER: State · owner · PUB-01—06 readiness", "ACTIONS: Save draft · Submit review · Reject with reason", "CONFLICT: Latest version · compare · reapply", "AUDIT: before/after · actor · reason"] },
      { title: "SCR-A03 · Moderation Case", screen: "DESKTOP SPLIT · PROTECTED", blocks: ["CASE: Type · P0—P3 · owner · SLA · current state", "CLAIM/EVIDENCE: URLs · reference · restricted access", "DECISION: Reason code · policy · finding · action", "TIMELINE: received · protected · reviewed · notified", "APPEAL: independent reviewer · new evidence", "STATE: Hide/restore · retain/delete pending CON-05"] }
    ],
    review: ["ອະນຸມັດ full-screen one-item-per-viewport Feed ຫຼືບໍ່?", "Map/Call/Message ຄວນຢູ່ Feed ຫຼືເປີດຫຼັງເຂົ້າ Place Page?", "Saved ເປັນ Should ຈະລວມໃນ Wireframe Pilot ຫຼືບໍ່?", "Search Result ຄວນເປັນ list card ຫຼື video grid ໃນ Mobile?", "Admin Place Editor ຄວນໃຊ້ split view ໃນ desktop ແລະ stacked view ໃນ tablet ຫຼືບໍ່?"],
    reviewDecisions: ["ອະນຸມັດ Feed ແບບ full-screen, one item per viewport.", "ສະແດງ Map/Call/Message ໃນ Feed ແລະ Place Page; Feed ຕ້ອງແຍກ touch target ຊັດເຈນ, disabled action ມີ reason ແລະບໍ່ຂັດ swipe.", "ອອກແບບ Saved ໄວ້ເປັນ Should/Deferred; ບໍ່ສະແດງໃນ Pilot navigation ຈົນ feature ພ້ອມ.", "ປັບຕາມ Founder Review 28 Aug 2026: Mobile Search Result ໃຊ້ Video-first ເປັນ default ແລະໃຫ້ປ່ຽນເປັນ List/Map ເພື່ອປຽບທຽບ ແລະກວດຕຳແໜ່ງ.", "Admin Place Editor ໃຊ້ split view ໃນ desktop ແລະ stacked view ໃນ tablet/ຈໍແຄບ."],
    artifacts: [{ label: "Interactive UX Prototype", path: "/prototype", action: "open", description: "Web prototype R2 ສຳລັບ Feed, intent-led Video Search, Place decision page, Trust label, category details ແລະ video fallback." }, { label: "ux-wireframe-screen-checklist.json", path: "/templates/ux-wireframe-screen-checklist.json", description: "Checklist ກວດ Screen, viewport, state, action, accessibility ແລະ sign-off ສຳລັບ UX-02 baseline." }]
  },

  "interactive-prototype": {
    code: "UX-03", title: "ຕົວຢ່າງໂຕ້ຕອບ ແລະການທົດສອບ", english: "Interactive Prototype & Usability Test", owner: "Product Designer / Research Lead",
    version: "0.9.2", status: "pending", statusLabel: "Founder Review R2 ຜ່ານ · Minor Revision ສຳເລັດ",
    approvalNote: "Founder Review R2 ວັນທີ 28 ສິງຫາ 2026 ຜ່ານທັງ 5 ຂໍ້: Product differentiation ຊັດ, Search ໃຊ້ໄດ້ດີໃນລະດັບໜຶ່ງ, Place Page ຂໍ້ມູນຄົບ, Trust labels ແຍກຊັດ ແລະ MVP scope ເໝາະສົມ. Minor Revision ຄືເພີ່ມຮູບໃນລາຍການເມນູ; ຖືກນຳໃຊ້ໃນ Prototype R2.1 ແລ້ວ. UX-03 ຍັງຄົງ 0.9.2 ເພາະ external usability evidence ຍັງບໍ່ທັນເລີ່ມ.",
    sources: ["UX-01 1.0", "UX-02 1.2", "PRO-03 G3", "PRO-04 0.9 UAT", "CON-04 1.0", "CON-05 0.9"],
    purpose: ["UX-03 ມີໜ້າທີ່ກວດວ່າ Prototype ຊ່ວຍໃຫ້ຄົນຊອກຫາສະຖານທີ່ ແລະຕັດສິນໃຈໄປສະຖານທີ່ໄດ້ຈິງຫຼືບໍ່. ຕອນນີ້ທ່ານບໍ່ຈຳເປັນຕ້ອງອ່ານ Metric ຫຼືຕາຕະລາງທັງໝົດກ່ອນ; ໃຫ້ເລີ່ມຈາກຫົວຂໍ້ ‘ສິ່ງທີ່ທ່ານຕ້ອງເຮັດຕໍ່ໄປ’.", "Founder Review ໃຊ້ເພື່ອກວດວ່າ Prototype ສະທ້ອນ Vision ຂອງ Product ຫຼືບໍ່. ມັນຊ່ວຍປັບແນວຄິດໄດ້ ແຕ່ບໍ່ນັບແທນການທົດສອບຜູ້ໃຊ້ພາຍນອກ."],
    sections: [
      { title: "ເລີ່ມຈາກນີ້ · ສະຖານະ ແລະວຽກຕໍ່ໄປ", intro: "Founder Review R2 ສຳເລັດແລ້ວ. ຕາຕະລາງນີ້ບອກວ່າອັນໃດສຳເລັດ ແລະອັນໃດຍັງລໍ.", headers: ["ລຳດັບ", "ວຽກ", "ຜົນ", "ສະຖານະ"], rows: [
        ["1", "Founder Review R2: ກວດ Product differentiation, Search, Place, Trust ແລະ MVP scope", "ຜ່ານທັງ 5 ຂໍ້", "ສຳເລັດ"],
        ["2", "Minor Revision: ເພີ່ມຮູບໃນລາຍການເມນູ", "Prototype R2.1 ສະແດງ thumbnail, ຊື່, ລາຄາ ແລະປ້າຍຮູບຕົວຢ່າງ", "ສຳເລັດ"],
        ["3", "ຢືນຢັນ Prototype R2.1 ຫຼັງກວດຮູບເມນູ", "ຖ້າບໍ່ມີ Feedback ເພີ່ມ ໃຫ້ຖືວ່າ Founder direction ປິດຮອບ", "ລໍການຢືນຢັນສຸດທ້າຍ"],
        ["4", "Formative test ກັບຜູ້ໃຊ້ພາຍນອກ 5 ຄົນ", "ເລີ່ມຫຼັງ Prototype R2.1 ຖືກຢືນຢັນ", "ຍັງບໍ່ເລີ່ມ"]
      ], note: "ວຽກດ່ວນທີ່ເຫຼືອມີພຽງກວດຮູບເມນູໃນ Prototype R2.1. ສ່ວນການ recruit 5 ຄົນແມ່ນຂັ້ນຖັດໄປ ແລະຍັງບໍ່ຖືກນັບວ່າສຳເລັດ."},
      { title: "ຜົນ 5 ຄຳຖາມ Founder Review R2", intro: "ຄຳຕອບຕໍ່ໄປນີ້ຖືກບັນທຶກຕາມ Feedback ຂອງ Founder ແລະໃຊ້ເປັນ Product Direction.", headers: ["ID", "ຫົວຂໍ້", "ຄຳຕອບ/ຫຼັກຖານ", "ຜົນ"], rows: [
        ["FR2-01", "Product differentiation", "ຮູ້ສຶກໄດ້ວ່າ Platform ແຕກຕ່າງຈາກ Facebook/TikTok/Google", "ຜ່ານ"],
        ["FR2-02", "Search value", "Search ຊ່ວຍຄົ້ນຕາມເຈດຕະນາ ແລະປຽບທຽບໄດ້ດີໃນລະດັບໜຶ່ງ", "ຜ່ານ · ຕິດຕາມໃນ external test"],
        ["FR2-03", "Place decision completeness", "ຂໍ້ມູນຄົບຖ້ວນ; ຂໍເພີ່ມຮູບລາຍການໃນເມນູເພື່ອສ້າງຄວາມສົນໃຈ", "ຜ່ານຫຼັງແກ້ · Implemented R2.1"],
        ["FR2-04", "Trust comprehension", "Sponsored, rating/source ແລະ checked date ແຍກກັນຊັດເຈນ", "ຜ່ານ"],
        ["FR2-05", "MVP scope", "ຂໍ້ມູນໂດຍລວມຄົບ ແລະຂອບເຂດເໝາະສົມ", "ຜ່ານ"]
      ], note: "Decision: Founder Review R2 ຜ່ານໂດຍມີ Minor Revision 1 ຈຸດ. ບໍ່ມີຂໍ້ປ່ຽນແປງ MVP scope ຫຼື Trust model."},
      { title: "Founder/Product Review R1 · ຜົນທີ່ບັນທຶກແລ້ວ", intro: "ຜົນນີ້ມາຈາກ Founder walkthrough ແລະໃຊ້ເປັນ Design Direction; ບໍ່ນັບເປັນ external usability evidence.", headers: ["Finding", "ຫຼັກຖານ/Feedback", "ຂໍ້ຕັດສິນ", "ສະຖານະ"], rows: [
        ["FR1-01 Search ທົ່ວໄປເກີນໄປ", "Search UI simple ແລະພົບໄດ້ທົ່ວໄປ; ບໍ່ສະແດງຈຸດເດັ່ນຂອງ platform", "ປັບເປັນ intent-led search ພ້ອມ Video/List/Map results", "Implemented in Prototype R2"],
        ["FR1-02 Place Page ບໍ່ດຶງດູດ", "ຂາດວິດີໂອຣີວິວ, related places, rating/comment ແລະ category-specific details", "ເພີ່ມ review collection, attributed rating, menu/price, freshness, suitability tags ແລະ related places", "Implemented in Prototype R2"],
        ["FR1-03 MVP boundary", "Native rating/comment ແລະ real-time price ສ້າງ moderation/data-maintenance burden", "MVP ສະແດງ attributed source rating ແລະ checked-date price; ຍັງບໍ່ເປີດ native review/booking", "Approved"]
      ]},
      { title: "Prototype Scope ແລະ Fidelity", intro: "Prototype ຕ້ອງກວມ Core Journey ແລະ failure state ທີ່ກະທົບການຕັດສິນໃຈ.", headers: ["Scenario", "Screens", "Interaction", "ບໍ່ຈຳເປັນ"], rows: [
        ["P-01 Feed discovery", "Feed → Place → Map", "swipe, tap, back, external handoff", "real video streaming"],
        ["P-02 Search", "Search → filters → results → Place", "type, select, clear, empty recovery", "live search index"],
        ["P-03 Trust/source", "Place → source/disclosure", "open source, interpret labels", "provider authentication"],
        ["P-04 Contact", "Place → Call/Message", "confirmation/external handoff", "real phone/message"],
        ["P-05 Failure", "embed fail / stale / no result", "fallback/retry/correction", "real outage"]
      ]},
      { title: "Participants ແລະ Recruitment", intro: "ກຸ່ມຕົວຢ່າງຕ້ອງສະທ້ອນຄົນທີ່ໃຊ້ Social Video ເພື່ອຊອກຫາຮ້ານ ແລະມີຄວາມຫຼາກຫຼາຍດ້ານອາຍຸ/ຄວາມຄຸ້ນເຄີຍ.", headers: ["Cohort", "ຈຳນວນ", "ເງື່ອນໄຂ", "ຈຸດສົນໃຈ"], rows: [
        ["Frequent social searcher", "8", "ຊອກຮ້ານຜ່ານ TikTok/Facebook ຢ່າງນ້ອຍ monthly", "Feed mental model"],
        ["Search/map-first", "6", "ໃຊ້ search/map ຫຼາຍກວ່າ video", "Search/filter/value comparison"],
        ["Occasional/low-confidence digital user", "4", "ໃຊ້ smartphone ແຕ່ບໍ່ຄ່ອງ", "Clarity/accessibility"],
        ["Place owner perspective", "2", "ຮ້ານອາຫານ/ຄາເຟ", "Trust label/contact/correction"]
      ]},
      { title: "Tasks ແລະ Measures", intro: "Moderator ບໍ່ຄວນບອກຊື່ປຸ່ມ ຫຼືສອນ Flow ກ່ອນ participant ລອງ.", headers: ["Task", "Success", "Measure", "Failure signal"], rows: [
        ["T-01 ຫາຮ້ານຄາເຟໃນເຂດ/ລາຄາ", "ເຂົ້າ Place ທີ່ກົງ constraint", "completion, time, wrong turns", "ກັບໄປ Social/search engine"],
        ["T-02 ກວດວ່າຮ້ານເປີດ ແລະຢູ່ໃສ", "ພົບ hours/map/checked date", "fact comprehension", "ຕີຄວາມ Unknown ເປັນ Closed"],
        ["T-03 ເປີດແຜນທີ່", "ກົດ Map ຖືກ", "task completion", "ກົດ source/share ຜິດ"],
        ["T-04 ຮູ້ວ່າອັນໃດ Sponsored", "ຊີ້ label ແລະອະທິບາຍໄດ້", "comprehension", "ຄິດວ່າ Sponsored = best/verified"],
        ["T-05 Recover from failed video", "ເຂົ້າ Place ຫຼື source fallback", "recovery rate", "dead end"]
      ]},
      { title: "Finding Severity ແລະ Revision", intro: "Finding ຕ້ອງອ້າງ task, evidence ແລະ screen; ຫ້າມປ່ຽນດີໄຊນ໌ຈາກຄຳເຫັນຄົນດຽວໂດຍບໍ່ກວດ behavior.", headers: ["Severity", "ຄວາມໝາຍ", "Action", "Retest"], rows: [
        ["S1 Critical", "ຈົບ Core Task ບໍ່ໄດ້/ເຂົ້າໃຈ trust ຜິດຮ້າຍແຮງ", "Fix before next round", "Mandatory"],
        ["S2 High", "ຫຼາຍຄົນຫຼົງ/ຊ້າ/ກົດຜິດ", "Fix in current iteration", "Mandatory"],
        ["S3 Medium", "ຈົບ task ໄດ້ແຕ່ friction ຊັດ", "Prioritize with scope", "Targeted"],
        ["S4 Low", "Cosmetic/preference ບໍ່ກະທົບ outcome", "Backlog", "Optional"]
      ]},
      { title: "Test Execution ແລະ Evidence Contract", intro: "Test Plan ບໍ່ແມ່ນ Test Result. ທຸກ Session ຕ້ອງມີ Participant ID ແບບບໍ່ເປີດເຜີຍຊື່, Prototype version, Task result, observation ແລະ consent record. ຫ້າມຂຶ້ນຜົນສຳເລັດກ່ອນທົດສອບຈິງ.", headers: ["Record", "Required fields", "Owner", "ສະຖານະປັດຈຸບັນ"], rows: [
        ["Session record", "participant_id, cohort, device, date, moderator, note_taker, consent_reference, prototype_version", "Research Lead", "Pending recruitment/testing"],
        ["Task result", "T-01—T-05, completed, time, wrong_turns, assistance, observation", "Note taker", "Pending testing"],
        ["Finding", "finding_id, task/screen, evidence, severity, frequency, recommended change", "Designer + Research Lead", "Pending testing"],
        ["Revision", "finding_id, design version before/after, decision, owner, changed_at", "Designer", "Pending findings"],
        ["Retest", "finding_id, participant/session, result, remaining risk", "Independent observer/Research Lead", "Pending S1/S2 fix"],
        ["UX-03 result", "task success rates, sponsored comprehension, unresolved S1/S2, decision", "Product Owner", "Not evaluated — no real-user evidence yet"]
      ], note: "Recommended pass gate: T-01/T-02/T-04/T-05 success ≥80%; T-03 Map action ≥90%; Sponsored comprehension ≥80%; unresolved S1 = 0; every S2 is fixed and retested. ຖ້າກຸ່ມໃດມີຜົນຕ່ຳຫຼາຍ ຫ້າມໃຊ້ຄ່າລວມປົກປິດບັນຫາ."},
      { title: "Formative Round 1 · ແຜນປະຕິບັດ 5 ຄົນ", intro: "ຮອບນີ້ເນັ້ນຫາບັນຫາຫຼັກກ່ອນ validation 20 ຄົນ. ຕ້ອງ recruit ຜູ້ໃຊ້ຈິງ; ການກວດດ້ວຍ Browser ຫຼືທີມພັດທະນາບໍ່ນັບເປັນ participant.", headers: ["ລຳດັບ", "ການດຳເນີນງານ", "ຜູ້ຮັບຜິດຊອບ", "ຫຼັກຖານ/Exit"], rows: [
        ["F-01 Recruitment", "2 frequent social searchers; 1 search/map-first; 1 low-confidence digital user; 1 place owner. ຫ້າມເອົາທີມສ້າງ Product ມາແທນ.", "Research Lead", "Screener ຄົບ 5 Participant IDs; ບໍ່ເກັບຊື່ໃນ result file"],
        ["F-02 Dry run", "ລອງ moderator script, task order, timer ແລະການບັນທຶກກັບຄົນທີ່ບໍ່ນັບໃນ sample", "Moderator + Note taker", "ລິ້ງ Prototype ແລະ template ເປີດໄດ້; wording ບໍ່ບອກປຸ່ມ"],
        ["F-03 Session", "30–40 ນາທີ/ຄົນ: consent, warm-up, T-01—T-05, short debrief. ຊ່ວຍເມື່ອ participant ຕິດ ແລະບັນທຶກ assistance_count.", "Moderator + Note taker", "5 session records + 25 task rows; observation ແຍກຈາກ interpretation"],
        ["F-04 Synthesis", "ລວມ finding ຕາມ task/screen; ໃຫ້ severity S1—S4 ຈາກ impact + frequency; ຢ່າສະຫຼຸບຈາກຄຳວ່າ ‘ມັກ’.", "Designer + Research Lead", "Finding register, evidence reference, recommended change ແລະ owner"],
        ["F-05 Decision", "ແກ້ S1/S2 ກ່ອນຮອບຖັດໄປ; S3 ຕັດສິນຕາມ scope; S4 ເຂົ້າ backlog.", "Product Owner", "Revision record; S1/S2 retest plan; go/repeat decision"],
        ["F-06 Status boundary", "ຊຸດເອກະສານພ້ອມສຳລັບ recruitment ແຕ່ຍັງບໍ່ມີ real-user result.", "Product Owner", "UX-03 ຄົງ 0.9.2 ຈົນ evidence ແລະ pass gate ຄົບ"]
      ]}
    ],
    review: ["ອະນຸມັດ participant mix 8/6/4/2 ຫຼືຕ້ອງປັບ?", "Prototype ຈະສ້າງດ້ວຍ Web ຫຼື design tool ໃດ?", "ໃຜເປັນ moderator ແລະ note taker?", "ອະນຸມັດ 5 mandatory tasks ແລະ severity model ຫຼືບໍ່?", "ກຳນົດ task-success threshold ເທົ່າໃດກ່ອນ UX-05 final design?"],
    reviewDecisions: ["ອະນຸມັດ validation mix 8 frequent social searchers, 6 search/map-first, 4 low-confidence digital users ແລະ 2 place owners; ກ່ອນນັ້ນເຮັດ formative round 5 ຄົນ.", "ໃຊ້ Web Prototype ເພື່ອທົດສອບ swipe/navigation, media fallback, trust label ແລະ external action ໃກ້ຄຽງຂອງຈິງ.", "Founder/Product Owner ເປັນ moderator ໃນ Pilot; note taker ຄວນເປັນອີກຄົນ. ຖ້າມີຄົນດຽວ ຕ້ອງຂໍ consent ບັນທຶກ session ແລະຕື່ມ observation ທັນທີຫຼັງ session.", "ອະນຸມັດ T-01—T-05 ແລະ S1—S4; S1/S2 ຕ້ອງແກ້ ແລະ retest.", "ອະນຸມັດ Core task ≥80%, Map action ≥90%, Sponsored comprehension ≥80%, unresolved S1 = 0 ແລະ S2 ທຸກອັນຕ້ອງ retest ກ່ອນ UX-05 final approval."],
    artifacts: [{ label: "Interactive UX Prototype R2.1", path: "/prototype", action: "open", description: "Prototype ຫຼັງ Founder Review R2: ເພີ່ມຮູບລາຍການໃນເມນູ ແລະພ້ອມໃຫ້ກວດ Minor Revision; ບໍ່ແມ່ນ Production MVP." }, { label: "formative-recruitment-message.md", path: "/templates/formative-recruitment-message.md", description: "ໃຊ້ພາຍຫຼັງ Founder Review R2 ຜ່ານ: ຂໍ້ຄວາມເຊີນຜູ້ທົດສອບພາຍນອກ." }, { label: "formative-participant-screener.csv", path: "/templates/formative-participant-screener.csv", description: "ໃຊ້ຄັດກອງ 5 participants ໂດຍໃຊ້ Participant ID ແທນຊື່." }, { label: "formative-session-tracker.csv", path: "/templates/formative-session-tracker.csv", description: "ໃຊ້ຫຼັງນັດໝາຍ: ຕິດຕາມການຕິດຕໍ່, ວັນເວລາ, consent ແລະ session." }, { label: "formative-consent-log.csv", path: "/templates/formative-consent-log.csv", description: "ໃຊ້ກ່ອນແຕ່ລະ session: ບັນທຶກການຍິນຍອມເຂົ້າຮ່ວມ ແລະການບັນທຶກຈໍ/ສຽງ." }, { label: "formative-usability-test-guide.md", path: "/templates/formative-usability-test-guide.md", description: "ໃຊ້ລະຫວ່າງ session: Moderator script, T-01—T-05, observation rule ແລະ session close." }, { label: "usability-test-record.template.csv", path: "/templates/usability-test-record.template.csv", description: "ໃຊ້ລະຫວ່າງ/ຫຼັງ session: ບັນທຶກ completion, time, wrong turns, assistance, finding ແລະ severity." }, { label: "formative-test-summary.template.json", path: "/templates/formative-test-summary.template.json", description: "ໃຊ້ຫຼັງຈົບທຸກ session: ລວມ task rate, findings, revision, retest ແລະ go/repeat decision." }]
  },

  "design-system": {
    code: "UX-04", title: "ລະບົບການອອກແບບ", english: "Design System", owner: "Design System Owner / Frontend Lead",
    version: "0.9.2", status: "pending", statusLabel: "ອະນຸມັດຂອບເຂດ Pilot · ລໍ Accessibility QA ກ່ອນ 1.0",
    approvalNote: "ວັນທີ 28 ສິງຫາ 2026 Product Owner ອະນຸມັດໃຫ້ UX-04 1.0 ຄຸ້ມຄອງ Guest/Pilot UI, ຂະຫຍາຍ Component Catalog ຕາມ Prototype R2.1, ສ້າງ Component Gallery, ຮັກສາ Noto Sans Lao ແລະ Palette ປັດຈຸບັນ. Admin Design System ຖືກແຍກເປັນ UX-04.1 ແລະບໍ່ຂວາງ Pilot. ສະບັບນີ້ຍັງເປັນ 0.9.2 ຈົນກວ່າ VoiceOver, Keyboard, Lao text 200%, Reduced Motion ແລະ State ຂອງ Pilot Component ຈະຜ່ານການທົດສອບຈິງ.",
    sources: ["UX-02 1.2", "UX-03 0.9.2", "Prototype R2.1", "PRO-04 0.9 NFR-01/02/04", "CON-02 1.0", "CON-04 1.0", "CON-05 0.9", "Brand direction"],
    purpose: ["ເອກະສານນີ້ເປັນສັນຍາການອອກແບບສຳລັບ Designer, Developer ແລະຜູ້ກວດຮັບມອບ. ມັນລະບຸຄ່າ Token, ໂຄງສ້າງ Component, ຂໍ້ມູນທີ່ຕ້ອງຮັບ, State, ພຶດຕິກຳ, Responsive Rule ແລະເກນ Accessibility ເພື່ອບໍ່ໃຫ້ແຕ່ລະໜ້າຖືກສ້າງຄົນລະແບບ.", "UX-04 1.0 ຈຳກັດສະເພາະ Guest Experience ທີ່ຈຳເປັນຕໍ່ Pilot: Discover, Search ແບບ Video/List/Map, Place Page, Review, Menu, Related Place, Contact, Consent ແລະ Feedback State. Admin Component ຈະຈັດທຳໃນ UX-04.1 ເມື່ອເລີ່ມ Admin UI.", "Design System ຕ້ອງຮອງຮັບພາສາລາວ, ຕົວເລກກີບ, ຂໍ້ຄວາມຍາວ, Full-screen Media, Low-bandwidth Fallback, Keyboard ແລະ Screen Reader. ສີບໍ່ສາມາດເປັນວິທີດຽວໃນການບອກ State."],
    sections: [
      { title: "ຂອບເຂດ UX-04 1.0 ແລະ UX-04.1", intro: "ການແຍກຂອບເຂດນີ້ເຮັດໃຫ້ທີມປິດ Guest Experience ສຳລັບ Pilot ໄດ້ໂດຍບໍ່ລໍ Admin UI ທີ່ຍັງບໍ່ເລີ່ມພັດທະນາ.", headers: ["ຂອບເຂດ", "ລວມຫຍັງ", "ບໍ່ລວມຫຍັງ", "ເງື່ອນໄຂປິດ"], rows: [
        ["UX-04 1.0 · Pilot Guest", "Discover; Video/List/Map Search; Place Page; Review Video; Menu; Related Place; Map/Call/Message/Share; Consent; Loading/Empty/Error", "Admin Queue, Data Editor, Moderation Decision, Audit Timeline", "Pilot Component ຄົບ State ແລະຜ່ານ Accessibility Gate"],
        ["UX-04.1 · Admin", "AdminField, QueueRow, Readiness Checklist, Decision Panel, Conflict Resolution, Audit Timeline", "ບໍ່ປ່ຽນ Guest Token ໂດຍບໍ່ມີ Change Request", "ຈັດທຳເມື່ອ Admin UI ເຂົ້າ Development Plan"],
        ["Shared contract", "Typography, Semantic Color, Spacing, Focus, Motion, Error Language", "Admin ບໍ່ສາມາດສ້າງ Palette ອີກຊຸດໂດຍບໍ່ມີເຫດຜົນ", "Token Change ຕ້ອງມີຜົນກະທົບ ແລະ Product Owner ອະນຸມັດ"]
      ], note: "ການເລື່ອນ Admin ໄປ UX-04.1 ບໍ່ໝາຍຄວາມວ່າຕັດ Admin ອອກຈາກ Product; ມັນໝາຍເຖິງ Admin State ບໍ່ແມ່ນເງື່ອນໄຂຂວາງ UX-04 1.0 ສຳລັບ Pilot."},
      { title: "Foundations ແລະ Design Tokens", intro: "Token ແມ່ນຊື່ກາງຂອງຄ່າອອກແບບ. Developer ຕ້ອງເອີ້ນໃຊ້ Token ແທນການກຳນົດສີ, ຂະໜາດ ຫຼື Animation ໃໝ່ໃນແຕ່ລະໜ້າ.", headers: ["Token group", "Baseline", "Usage", "ກົດ"], rows: [
        ["Typography", "Noto Sans Lao Variable; system sans fallback", "Lao/English UI and documents", "ທົດສອບ ປ/ຜ/ຝ, ວັນນະຍຸດ ແລະ line-height"],
        ["Type scale", "12, 14, 16, 20, 24, 32", "caption → body → heading", "Body mobile ≥16px ສຳລັບຂໍ້ຄວາມອ່ານ"],
        ["Spacing", "4px base: 4/8/12/16/24/32/48", "gap, padding, layout", "ຫ້າມ arbitrary spacing ໂດຍບໍ່ມີ token"],
        ["Radius", "4/8/12/full", "input/card/sheet/chip", "Media edge ແລະ action hierarchy ຕ້ອງຄົງທີ່"],
        ["Icon", "16/20/24/28px", "inline/status/navigation/action", "Icon-only Action ຕ້ອງມີ Accessible Name ແລະ Target 44px"],
        ["Media ratio", "9:16 / 4:3 / 1:1", "Full video / card / thumbnail", "ຮັກສາອັດຕາສ່ວນ; ຫ້າມບີບຮູບ"],
        ["Responsive", "0 / 768 / 1024 / 1440px", "Mobile / Tablet / Desktop / Wide", "ອອກແບບ Mobile ກ່ອນ; Content width ສູງສຸດ 1120px"],
        ["Layer", "0 / 10 / 20 / 30 / 40", "base/sticky/overlay/modal/toast", "Consent Modal ຕ້ອງຢູ່ເໜືອ Navigation ແລະປິດ Background Interaction"],
        ["Motion", "120/200/320ms", "feedback/transition/large transition", "Reduce Motion ປິດ non-essential animation, smooth scroll ແລະ auto-advance"],
        ["Focus/Skeleton", "3px ring + 2px offset; neutral loading pair", "Keyboard focus ແລະ loading placeholder", "Focus ຫ້າມຖືກ clip; Skeleton ຫ້າມສື່ຄວາມໝາຍແທນ label"]
      ]},
      { title: "Semantic Color", intro: "Palette ປັດຈຸບັນຖືກອະນຸມັດໃຫ້ໃຊ້ຕໍ່ໃນ Pilot. ຊື່ສີບອກໜ້າທີ່ຂອງມັນ; Developer ບໍ່ຄວນອ້າງສີດ້ວຍຊື່ທາງກາຍະພາບເຊັ່ນ orange ຫຼື green ໃນ Component API.", headers: ["Role", "Approved value", "Usage", "Accessibility rule"], rows: [
        ["Surface / inverse", "#FFFDF8 / #101928", "page, media overlay, admin", "text contrast ≥4.5:1"],
        ["Primary", "#17644F", "primary action, active state", "ມີ label/icon; focus visible"],
        ["Accent", "#F27A45 + on-accent #17221F", "highlight, selected marker", "ຫ້າມໃຊ້ສີຂາວເທິງ Accent; ຄູ່ທີ່ອະນຸມັດ = 5.95:1"],
        ["Info", "#284B8F", "link/info state", "underline for inline link"],
        ["Success/Warning/Error", "surface + text tokens ແຍກຄູ່", "validation, trust, failure", "ທຸກຄູ່ ≥7.74:1; icon + text + color"],
        ["Sponsored", "distinct disclosure token", "commercial label", "ຕ້ອງອ່ານຄຳວ່າ Sponsored/ໂຄສະນາ"]
      ]},
      { title: "Pilot Component Catalog", intro: "ລາຍການນີ້ກົງກັບ Prototype R2.1. ແຕ່ລະ Component ຕ້ອງອ້າງ Place ID ຫຼື Search State ດຽວກັນ ເພື່ອບໍ່ໃຫ້ Video, List ແລະ Map ສະແດງຂໍ້ມູນຂັດກັນ.", headers: ["ID / Component", "ໜ້າທີ່", "ຂໍ້ມູນ/ສ່ວນປະກອບ", "ພຶດຕິກຳ ແລະເກນຮັບມອບ"], rows: [
        ["DS-C01 · SearchField", "ຮັບຄຳຄົ້ນພາສາລາວ/ອັງກິດ ແລະສະເໜີ Intent", "label, value, suggestions, loading, error, clear, submit", "Enter ຄົ້ນຫາ; Escape ປິດ Suggestion; Arrow Key ເລືອກ; Clear ແລ້ວ Focus ກັບຄືນ; ປຸ່ມ ≥44px"],
        ["DS-C02 · IntentSuggestionChip", "ແປຄວາມຕ້ອງການເຊັ່ນງົບ, ເຂດ ຫຼືໂອກາດເປັນ Search Constraint", "label, constraint_id, selected, disabled", "ເລືອກແລ້ວອັບເດດຜົນ ແລະປະກາດ Result Count; State ບໍ່ອາໄສສີຢ່າງດຽວ"],
        ["DS-C03 · SearchViewSwitcher", "ປ່ຽນຜົນຊຸດດຽວລະຫວ່າງ Video/List/Map", "active_view, available_views, result_count", "ບໍ່ລຶບ Query/Filter; ບອກ Active View ດ້ວຍ Text/State ແລະ Keyboard ໃຊ້ໄດ້"],
        ["DS-C04 · VideoResultCard", "ສະແດງ Review-led Result ພ້ອມຂໍ້ມູນພໍໃຫ້ເປີດ Place Page", "poster/video, source, place, district, price, trust, sponsored", "Video ຜິດພາດຕ້ອງມີ Poster, ຄຳອະທິບາຍ ແລະ Recovery Action; Sponsored/Source ເຫັນກ່ອນກົດ"],
        ["DS-C05 · MapResult", "ເຊື່ອມ Marker ເຂົ້າກັບ Canonical Place", "place_id, coordinates, name, summary, selected", "Marker ເປີດ Summary; Card ເປີດ Place; ຕ້ອງມີ List ທີ່ Keyboard ເຂົ້າເຖິງແທນ Map"],
        ["DS-C06 · PlaceHero/ActionBar", "ສະແດງຕົວຕົນ Place ແລະ Map/Call/Message/Share", "name, category, hero, address, actions, checked_at", "Action ທີ່ບໍ່ມີຫ້າມປອມເປັນປຸ່ມໃຊ້ໄດ້; Core Fact ຕ້ອງເຫັນໄດ້ໂດຍບໍ່ຫຼິ້ນ Media"],
        ["DS-C07 · ReviewVideoRail", "ຮວບຮວມລິ້ງ Review ອິດສະຫຼະໂດຍຮັກສາ Attribution", "source_url, poster, creator, platform, published_at, rights_state", "ເປີດ Original Source; Content ຫາຍຕ້ອງມີ Fallback; ຫ້າມເຮັດໃຫ້ເຂົ້າໃຈວ່າ Platform ເປັນເຈົ້າຂອງ Review"],
        ["DS-C08 · DecisionSummaryCard", "ສະຫຼຸບລາຄາ, ເວລາ, ເຂດ ແລະຄວາມເໝາະສົມ", "price, hours_state, district/distance, suitable_for, checked_at", "Unknown/Stale ຕ້ອງຂຽນຕາມຈິງ; ຫ້າມຕີຄວາມ Unknown ເປັນ Closed ຫຼື Unavailable"],
        ["DS-C09 · MenuItemCard", "ສະແດງຮູບ, ຊື່, ລາຄາ ແລະວັນກວດຂອງລາຍການ", "item_name, price_kip, image_optional, source, checked_at", "ບໍ່ມີຮູບໃຊ້ Neutral Placeholder; ບໍ່ຮູ້ລາຄາຂຽນວ່າບໍ່ຮູ້ ບໍ່ໃຊ້ 0 ກີບ; ຮູບມີ Alt Text"],
        ["DS-C10 · RelatedPlaceCard", "ສະເໜີ Place ທີ່ຄ້າຍກັນຈາກ Category/ເຂດ/ລາຄາ", "place_id, name, reason_label, image, price, checked_at", "ຕ້ອງສະແດງເຫດຜົນທີ່ຄ້າຍ; Sponsored ແຍກຈາກ Organic Similarity"],
        ["DS-C11 · TrustAndDisclosure", "ອະທິບາຍ Source, Checked Date, Partner, Sponsored ແລະ Stale", "trust_type, label, detail, source, checked_at", "Partner ບໍ່ໝາຍເຖິງດີທີ່ສຸດ/Verified; Sponsored ຕ້ອງອ່ານໄດ້ ແລະໃຊ້ຄຳຕາມ CON-02/05"],
        ["DS-C12 · FeedbackState", "ຈັດການ Loading, Empty, Error ແລະ Recovery ໃນຮູບແບບດຽວກັນ", "state, title, explanation, recovery_action, priority", "Critical Error ບໍ່ Auto-dismiss; Retry ຮັກສາ Context; State Change ປະກາດຜ່ານ Live Region"]
      ]},
      { title: "Component Specification Contract", intro: "ທຸກ Component ໃນ Code ຕ້ອງມີ Specification ກ່ອນຖືວ່າພ້ອມສຳລັບ Development. ຂໍ້ກຳນົດນີ້ປ້ອງກັນການສ້າງ Component ທີ່ເບິ່ງຄ້າຍ Prototype ແຕ່ຂາດ Behavior ຫຼື Error Handling.", headers: ["ຫົວຂໍ້", "ຕ້ອງລະບຸ", "ຕົວຢ່າງ", "Definition of ready"], rows: [
        ["Purpose/Anatomy", "ໜ້າທີ່ ແລະສ່ວນປະກອບພາຍໃນ", "MenuItemCard = image + name + price + checked date", "ຜູ້ອ່ານຮູ້ວ່າ Component ແກ້ບັນຫາຫຍັງ"],
        ["Data contract", "Field ບັງຄັບ, Field ບໍ່ບັງຄັບ, format ແລະ source", "price_kip ເປັນຈຳນວນ; image ບໍ່ບັງຄັບ", "Missing Data ມີກົດສະແດງ; Developer ບໍ່ຕ້ອງເດົາ"],
        ["Variant/State", "default, loading, empty, error, disabled, sponsored, stale ທີ່ກ່ຽວຂ້ອງ", "Video Error ມີ Poster + Open Source", "ທຸກ State ມີຕົວຢ່າງ ແລະ Recovery"],
        ["Interaction", "Click, keyboard, focus, external destination, announcement", "Escape ປິດ Suggestion; Focus ກັບ SearchField", "Mouse, Touch ແລະ Keyboard ຈົບ Core Task ໄດ້"],
        ["Responsive", "ການຈັດວາງທີ່ 360/390/768/1024/1440px", "Menu 1 column → 2 columns; ActionBar sticky on mobile", "ບໍ່ clip ແລະບໍ່ມີ Horizontal Scroll ທີ່ບໍ່ຕັ້ງໃຈ"],
        ["Accessibility", "semantic role, label, alt text, focus, contrast, live region", "Sponsored ມີ Text Label; ບໍ່ອາໄສສີ", "ກວດ Keyboard/VoiceOver/Lao 200% ໄດ້"],
        ["Analytics hook", "Event ສະເພາະ Action ທີ່ຢູ່ໃນ DEL-04", "map_click, call_click, source_open", "ຫ້າມເກັບຂໍ້ມູນນອກ Consent/Privacy Scope"]
      ]},
      { title: "State Coverage Matrix", intro: "State ແມ່ນສະພາບທີ່ຜູ້ໃຊ້ພົບຂະນະໃຊ້ງານ. ຖ້າອອກແບບສະເພາະ Default, Developer ຈະຕ້ອງເດົາໜ້າ Loading ຫຼື Error ເອງ.", headers: ["State", "ຄວາມໝາຍ", "ການສະແດງ", "Recovery/Acceptance"], rows: [
        ["Default", "ຂໍ້ມູນພ້ອມ ແລະ Action ໃຊ້ໄດ້", "ສະແດງ Core Content ແລະ Primary Action", "ຈົບ Task ໄດ້ໂດຍບໍ່ຕ້ອງອ່ານຄູ່ມື"],
        ["Loading", "ກຳລັງຮັບຂໍ້ມູນ", "Skeleton ຕາມຮູບຮ່າງ; ບອກວ່າກຳລັງໂຫຼດ", "ບໍ່ຍ້າຍ Focus, ບໍ່ລົບ Query, ບໍ່ກະພິບຮຸນແຮງ"],
        ["Empty", "ລະບົບທຳງານແຕ່ບໍ່ພົບຂໍ້ມູນ", "ອະທິບາຍວ່າບໍ່ພົບ ແລະສະເໜີປ່ຽນ Query/Filter", "ບໍ່ໃຊ້ຄຳຄື Error; Clear Filter ໄດ້"],
        ["Error", "Request ຫຼື Media ລົ້ມເຫຼວ", "ບອກສິ່ງທີ່ເກີດໂດຍບໍ່ເປີດເຜີຍ Technical Detail", "ມີ Retry/Fallback; Context ຍັງຢູ່; Critical Error ບໍ່ຫາຍເອງ"],
        ["Disabled/Unavailable", "Action ບໍ່ສາມາດໃຊ້ໃນສະພາບນັ້ນ", "Disabled ເມື່ອຜູ້ໃຊ້ຕ້ອງຮູ້ວ່າ Action ມີ; ອື່ນໆໃຫ້ຊ່ອນ", "ຖ້າສະແດງຕ້ອງມີເຫດຜົນ; Contrast ຍັງອ່ານໄດ້"],
        ["Sponsored", "ລາຍການຈ່າຍຄ່າ Placement", "ປ້າຍ ‘Sponsored · ໂຄສະນາ’ ເຫັນກ່ອນ Action", "ບໍ່ປ່ຽນ Rating/Trust; Screen Reader ອ່ານປ້າຍໄດ້"],
        ["Stale/Unknown", "ຂໍ້ມູນເກີນ Freshness ຫຼືຍັງບໍ່ມີຫຼັກຖານ", "ລະບຸວັນກວດ ແລະຄຳວ່າຂໍ້ມູນອາດປ່ຽນ/ຍັງບໍ່ຮູ້", "ບໍ່ເດົາຄ່າ; ມີ Report/Contact ເມື່ອເໝາະສົມ"]
      ]},
      { title: "Accessibility ແລະ Quality Gate", intro: "Accessibility ເປັນເງື່ອນໄຂຮັບມອບ ບໍ່ແມ່ນການຕົບແຕ່ງພາຍຫຼັງ. VoiceOver ເປັນ Screen Reader Baseline ສຳລັບ Pilot; NVDA ຕ້ອງກວດກ່ອນເປີດໃຊ້ວົງກວ້າງ.", headers: ["Area", "Requirement", "Verification", "Blocker"], rows: [
        ["Keyboard", "ທຸກ action ເຂົ້າໄດ້; logical focus order", "manual + automated", "focus trap/lost focus"],
        ["Screen reader", "landmark, heading, label, dialog ແລະ state announcement", "VoiceOver ສຳລັບ Pilot; NVDA ກ່ອນ Wider Launch", "unlabeled critical action ຫຼື state ບໍ່ຖືກປະກາດ"],
        ["Contrast", "normal text ≥4.5:1; large ≥3:1", "token audit + UI test", "core text/action fail"],
        ["Touch", "target ≥44×44; spacing prevents mis-tap", "device test", "Map/Call/Message mis-tap risk"],
        ["Motion/media", "respect reduced motion; captions/source fallback where available", "preference test", "autoplay with sound"],
        ["Lao language", "no clipping/overlap at 200% text", "visual/text resize test", "meaning hidden/truncated"]
      ]},
      { title: "Development Order ແລະ Change Contract", intro: "Developer ຄວນເລີ່ມຈາກ Primitive ແລະ Search/Place Flow ກ່ອນ. Component Gallery ເປັນບ່ອນກວດຕົວຢ່າງ; ບໍ່ແມ່ນ Production Page ແລະບໍ່ສ້າງ Business Logic ແຍກຈາກ Product.", headers: ["Order", "Components/ວຽກ", "Definition of ready", "Change control"], rows: [
        ["DS-01 Tokens/Primitives", "Typography, Color, Spacing, Icon, Button, Link, Focus, Skeleton", "Token JSON/CSS ກົງກັນ; contrast ຜ່ານ", "Design System Owner + Frontend Lead"],
        ["DS-02 Search", "SearchField, IntentChip, ViewSwitcher, VideoResult, MapResult", "typing/loading/empty/error/selected/disabled; query ບໍ່ຫາຍເມື່ອປ່ຽນ View", "Product Designer owns behavior"],
        ["DS-03 Place decision", "PlaceHero, ActionBar, ReviewRail, DecisionSummary, MenuItem, RelatedPlace, TrustDisclosure", "default/loading/error/fallback/sponsored/stale; data contract ກົງ CON-02/05", "Designer + Content/Trust review"],
        ["DS-04 Feedback/Consent", "Alert, Toast, Empty, Error, Confirmation, Consent Dialog", "critical message persistent; recovery; live region; focus/inert", "Accessibility review required"],
        ["DS-05 Gallery/QA", "Component Gallery + State selector + viewport/accessibility checklist", "ຕົວຢ່າງ Pilot Component ຄົບ ແລະກວດໄດ້", "Product Owner accepts UX-04 1.0"],
        ["DS-06 Admin later", "Admin Component ໃນ UX-04.1", "ເລີ່ມຕາມ Development Plan; ບໍ່ຂວາງ Pilot", "SA + Trust owner review"],
        ["Token/component change", "change_id, old/new, rationale, affected screens, migration", "no orphan component; visual/interaction regression checked", "Product Owner approves breaking token/component change"]
      ], note: "UX-04 1.0 gate: token files ກົງກັບ document, Pilot Guest Component ຄົບ State, Keyboard/VoiceOver/Touch/Reduced Motion ຜ່ານ, Lao text ບໍ່ clip ທີ່ 200%, ແລະຄູ່ສີທີ່ໃຊ້ຈິງຜ່ານ contrast target. Admin State ບໍ່ແມ່ນ Gate ຂອງ UX-04 1.0."},
      { title: "Accessibility QA Evidence · 28 Aug 2026", intro: "ຕາຕະລາງນີ້ແຍກສິ່ງທີ່ກວດຜ່ານແລ້ວອອກຈາກສິ່ງທີ່ຍັງຕ້ອງກວດ. ຫ້າມນັບ Browser QA ຫຼືການມີ Code ເປັນຫຼັກຖານວ່າ Manual Accessibility Test ຜ່ານ.", headers: ["QA ID", "ການກວດ", "ຜົນ", "ສະຖານະ"], rows: [
        ["A11Y-01", "11 semantic text/background pairs", "ຜ່ານ 4.5:1 ສຳລັບ normal text; focus pair ຜ່ານ 3:1", "Passed"],
        ["A11Y-02", "White on Accent", "2.75:1 ບໍ່ຜ່ານ; ແກ້ໂດຍຫ້າມຄູ່ນີ້ ແລະໃຊ້ dark on-accent", "Resolved by token rule"],
        ["A11Y-03", "Consent keyboard/assistive structure", "role=dialog, aria-modal, labelled title, initial focus ແລະ background inert", "Passed internal browser retest"],
        ["A11Y-04", "Focus-visible ແລະ touch", "focus outline 3px; core Mobile action ≥44px", "Passed for Prototype scope"],
        ["A11Y-05", "Reduced motion", "Token Contract ປິດ non-essential animation, smooth scroll ແລະ auto-advance", "Implemented; manual retest pending"],
        ["A11Y-06", "Lao text 200%", "ຕ້ອງກວດ Discover/Search/Place/Consent/Gallery ບໍ່ clip ຫຼືເຊື່ອງຄວາມໝາຍ", "Pending · blocks 1.0"],
        ["A11Y-07", "VoiceOver", "ກວດ landmark, heading, label, dialog ແລະ status announcement ດ້ວຍ VoiceOver ຈິງ", "Pending · blocks 1.0"],
        ["A11Y-08", "NVDA", "ກວດ Windows Screen Reader ກ່ອນ Public/Wider Launch", "Deferred · does not block Pilot 1.0"],
        ["A11Y-09", "Pilot Guest Component States", "Default/Loading/Empty/Error/Disabled/Sponsored/Stale ຕ້ອງກວດໃນ Gallery ແລະ Product Flow", "Pending · blocks 1.0"],
        ["A11Y-10", "Admin Component States", "ຈັດທຳໃນ UX-04.1 ເມື່ອ Admin UI ເຂົ້າ Development", "Deferred · does not block Pilot 1.0"]
      ]}
    ],
    review: ["UX-04 1.0 ຄວນຄຸ້ມຄອງ Guest/Pilot UI ແລະແຍກ Admin UI ໄປ UX-04.1 ຫຼືບໍ່?", "ອະນຸມັດເພີ່ມ Component Catalog ໃຫ້ຄົບຕາມ Prototype R2.1 ຫຼືບໍ່?", "ອະນຸມັດສ້າງ Component Gallery ທີ່ພຣີວິວ ແລະປ່ຽນ State ໄດ້ຫຼືບໍ່?", "ຈະຮັກສາ Noto Sans Lao ແລະ Palette ປັດຈຸບັນໃນ Pilot ຫຼືເລີ່ມ Brand Exploration ໃໝ່?", "ອະນຸມັດ VoiceOver, Keyboard, Lao 200%, Reduced Motion ແລະ Contrast ເປັນ Gate ກ່ອນ UX-04 1.0 ຫຼືບໍ່?"],
    reviewDecisions: ["ອະນຸມັດ Guest/Pilot UI ເປັນຂອບເຂດ UX-04 1.0; Admin UI ແຍກເປັນ UX-04.1 ແລະບໍ່ຂວາງ Pilot.", "ອະນຸມັດ 12 Pilot Component Specifications ຕາມ Prototype R2.1 ແລະຕ້ອງມີ Data, Behavior, Responsive, State ແລະ Acceptance Contract.", "ອະນຸມັດ Component Gallery ເປັນ Web Documentation ສຳລັບກວດ Token, Component ແລະ State; ບໍ່ແມ່ນໜ້າໂຄສະນາ ຫຼື Production Product.", "ອະນຸມັດ Noto Sans Lao Variable ເປັນ Primary Font ແລະຮັກສາ Semantic Palette ປັດຈຸບັນ. ຫ້າມ White on Accent; ໃຊ້ on_accent #17221F.", "ອະນຸມັດ WCAG 2.2 AA Internal Target; VoiceOver, Keyboard, Lao 200%, Reduced Motion, Touch ແລະ Contrast ຂອງ Pilot Flow ຕ້ອງຜ່ານກ່ອນ 1.0. NVDA ຕ້ອງກວດກ່ອນ Wider Launch."],
    artifacts: [{ label: "Component Gallery", path: "/design-system", action: "open", description: "ໜ້າ Web Documentation ສຳລັບພຣີວິວ Token ແລະສະຫຼັບ Default/Loading/Empty/Error/Disabled/Sponsored/Stale State." }, { label: "ux-component-specifications.json", path: "/templates/ux-component-specifications.json", description: "Machine-readable Contract ຂອງ 12 Pilot Components: Purpose, Required Data, Behavior ແລະ Acceptance." }, { label: "ux-design-tokens.json", path: "/templates/ux-design-tokens.json", description: "Token source 0.9.2: Typography, Color, Spacing, Icon, Media Ratio, Breakpoint, Layer, Motion, Focus ແລະ Skeleton." }, { label: "ux-design-tokens.css", path: "/templates/ux-design-tokens.css", description: "CSS Custom Properties ທີ່ກົງກັບ Token 0.9.2 ແລະ Reduced-motion Contract." }, { label: "ux-accessibility-qa.json", path: "/templates/ux-accessibility-qa.json", description: "ຫຼັກຖານທີ່ຜ່ານ, ລາຍການທີ່ຍັງ Pending ແລະ Gate ທີ່ຂວາງ UX-04 1.0." }]
  },

  "full-ux-ui": {
    code: "UX-05", title: "ການອອກແບບ UX/UI ສົມບູນ", english: "Full UX/UI Design", owner: "Product Designer / Frontend Lead",
    version: "0.5", status: "pending", statusLabel: "Handoff contract ພ້ອມ · Final Design ຍັງບໍ່ສຳເລັດ",
    approvalNote: "ສະບັບ 0.5 ກຳນົດວ່າ Final Design Package ຕ້ອງມີຫຍັງ; ມັນຍັງບໍ່ແມ່ນ Final Screen ທີ່ອະນຸມັດ. Designer ສາມາດເລີ່ມ Happy path ໄດ້ ແຕ່ UX-05 ຫ້າມຂຶ້ນ 1.0 ຈົນ UX test, system states, technical constraints ແລະ sign-off evidence ຄົບ.",
    sources: ["UX-01 1.0", "UX-02 1.2", "UX-03 0.9.2", "UX-04 0.9.2", "PRO-04 0.9", "CON-01 0.9", "CON-02 1.0", "CON-03 0.9", "CON-04 1.0", "CON-05 0.9", "TEC-01/02 pending"],
    purpose: ["ກຳນົດຂອບເຂດ Final Screen, Responsive Behavior, System State, Prototype Link, Asset ແລະ Developer Handoff ທີ່ຕ້ອງຄົບກ່ອນເລີ່ມ Frontend implementation.", "UX-05 ບໍ່ຄວນຖືກອະນຸມັດຈາກ Happy-path screen ເທົ່ານັ້ນ. Loading, Empty, Error, Stale, Sponsored, Permission, Conflict ແລະ External Fallback ຕ້ອງຖືກອອກແບບ ແລະຜູກກັບ Requirement/Screen ID."],
    sections: [
      { title: "Final Screen Inventory", intro: "Screen ທີ່ລະບຸເປັນ Must ຕ້ອງມີ mobile final design, responsive rule, state set ແລະ annotation.", headers: ["Screen ID", "Screen", "Priority", "Required deliverables"], rows: [
        ["SCR-G01", "Discovery Feed", "Must", "mobile portrait final; fallback; sponsored/source/trust; gesture annotation"],
        ["SCR-G02", "Search & Filters", "Must", "query, filter sheet, result list, loading/empty/error"],
        ["SCR-G03", "Place Detail", "Must", "identity, facts, sticky actions, sources, stale/correction"],
        ["SCR-G04", "Saved", "Should", "empty/list/local-device notice"],
        ["SCR-G05", "Consent/Privacy", "Must", "initial choice, settings, essential-only state"],
        ["SCR-A01", "Admin Queue", "Must", "desktop/tablet, SLA/filter/assignment/empty/error"],
        ["SCR-A02", "Place Editor", "Must", "field/source/readiness/audit/conflict"],
        ["SCR-A03", "Case Detail", "Must", "report/takedown/correction/appeal timeline"],
        ["SCR-A04", "Partner/Campaign Manual Admin", "Should", "partner status, report export, sponsored window"]
      ]},
      { title: "Responsive Behavior", intro: "Responsive ບໍ່ແມ່ນພຽງຫຍໍ້ຂະໜາດ. Information priority ແລະ interaction ຕ້ອງປ່ຽນຕາມ viewport/input.", headers: ["Range", "Navigation/Layout", "Feed/Place", "Admin"], rows: [
        ["Mobile <768", "bottom nav; sheets; single column", "full viewport feed; sticky bottom actions", "limited review; stacked fields"],
        ["Tablet 768–1199", "adaptive nav; 2-column where useful", "feed max-width + context; place 2-column", "queue + detail split optional"],
        ["Desktop ≥1200", "top/side nav; max content width", "media/context split; keyboard controls", "persistent queue/sidebar + editor/evidence split"],
        ["Landscape/short viewport", "safe areas; compact controls", "no hidden place/action behind nav", "sticky header without covering errors"]
      ]},
      { title: "System State Coverage", intro: "ທຸກ component/screen ຕ້ອງລະບຸ data state ແລະ recovery action.", headers: ["State", "UI requirement", "Recovery", "Evidence link"], rows: [
        ["Loading", "skeleton/progress ທີ່ຮັກສາ layout", "cancel/retry when relevant", "NFR-02"],
        ["Empty", "ອະທິບາຍວ່າຫຍັງບໍ່ມີ", "clear filter/create/add", "USR-02"],
        ["Error", "plain-language message + error reference", "retry/fallback/contact", "NFR-03"],
        ["Offline/slow", "preserve last safe content; media fallback", "retry/open original", "NFR-02"],
        ["Unknown/Stale", "label + checked date", "contact/report correction", "CON-02"],
        ["Unauthorized/expired", "do not expose data; explain session", "sign in/retry", "ADM-01"],
        ["Conflict", "show latest + unsaved changes", "compare/reapply", "PRO-02 ERR-CONFLICT"],
        ["Sponsored", "visible label adjacent to placement", "disclosure detail", "CON-05"],
        ["Consent denied/withdrawn", "essential-only mode + settings status", "change choice without dark pattern", "CON-05/TEC-06"],
        ["Source removed/takedown", "remove media; preserve safe Place facts when allowed", "view place/report issue", "CON-04/05"],
        ["Map app unavailable", "explain external handoff failure", "copy address/try another map", "ACT-01"],
        ["Contact unavailable", "disable only missing action + reason", "use remaining action/report correction", "CON-02"],
        ["Validation failure", "field-level message + summary", "focus first error/preserve input", "ADM-02"],
        ["Rate limited/temporary external failure", "plain-language wait/retry state", "retry later/use Place fallback", "PRO-02 Error Contract"]
      ]},
      { title: "Developer Handoff Package", intro: "Handoff ຕ້ອງລົບການຄາດເດົາ: ທຸກ screen/component ຕ້ອງອ້າງ Requirement, State, Data ແລະ Interaction.", headers: ["Deliverable", "ລາຍລະອຽດ", "Owner", "Definition of ready"], rows: [
        ["Final screens", "mobile/tablet/desktop + state variants", "Designer", "Screen IDs/version/date"],
        ["Prototype", "core journeys + failure recovery", "Designer", "link + start points + scenario map"],
        ["Component spec", "token, variant, state, behavior, accessibility", "Design System Owner", "mapped to code component"],
        ["Content spec", "Lao/English copy, truncation, empty/error/disclosure", "Content/Product", "approved copy owner"],
        ["Data annotation", "field source, required/optional, unknown/stale", "SA/Data Steward", "mapped to entity/API"],
        ["Traceability", "screen/action → requirement/AC/event", "SA + QA", "no orphan Must screen/action"],
        ["Asset export", "icons/images/posters with license/source", "Designer/Trust", "format, size, ownership"],
        ["Review record", "open issue, deviation, approval", "Product Owner", "signed version baseline"]
      ]},
      { title: "Approval Gates ແລະ Sign-off", intro: "UX-05 1.0 ແມ່ນຄຳຢືນຢັນວ່າ package ພ້ອມໃຫ້ Developer ສ້າງໂດຍບໍ່ເດົາ. ການມີຮູບ Happy path ສວຍງາມບໍ່ພຽງພໍ.", headers: ["Gate", "ຕ້ອງມີ", "Signer", "ສະຖານະ"], rows: [
        ["G-UX1 Structure", "UX-01 1.0; UX-02 1.2; screen/route/state traceability", "Product Owner + SA", "Passed · UX-01 1.0 / UX-02 1.2"],
        ["G-UX2 Evidence", "UX-03 1.0; session/task/finding/retest records; pass thresholds", "Research Lead + Product Owner", "Pending real-user testing"],
        ["G-UX3 System", "UX-04 1.0; tokens/components/accessibility QA", "Design System Owner + Frontend Lead", "Pending VoiceOver/Lao 200%/Pilot state QA"],
        ["G-UX4 Content/Trust", "PRO-04 1.0; CON-02/04 1.0; UI-impact decisions from CON-01/03/05", "Content/Trust Owner", "Partially pending"],
        ["G-UX5 Technical", "TEC-01/02 route, auth, external action, media/fallback constraints mapped", "Technical Lead", "Pending TEC-01/02"],
        ["G-UX6 Final handoff", "final screens, responsive/state variants, assets, copy, annotations, open deviations", "Product Owner + Frontend Lead", "Pending final design"]
      ], note: "Final sign-off roles: Product Owner ຮັບຮອງ scope/design; Frontend Lead ຮັບຮອງ implementation readiness; Content/Trust Owner ຮັບຮອງ copy, source, disclosure ແລະ correction/takedown; Accessibility Reviewer/QA ຮັບຮອງ quality gates. ຄົນດຽວອາດຮັບຫຼາຍບົດບາດໄດ້ ແຕ່ຕ້ອງລົງນາມແຍກບົດບາດ."}
    ],
    review: ["Screen Inventory ຄົບກັບ MVP Must/Should ຫຼືບໍ່?", "ອະນຸມັດ responsive ranges <768, 768–1199, ≥1200 ຫຼືຕ້ອງອີງ device targets ອື່ນ?", "System State ໃດຍັງຂາດຈາກ Requirement/Error Contract?", "ເອກະສານໃດຕ້ອງອະນຸມັດກ່ອນ UX-05 ຂຶ້ນ 1.0—UX-01—04, CON-01—05, TEC-01/02 ຫຼືທັງໝົດ?", "ໃຜລົງນາມ final design, accessibility, content/trust ແລະ developer readiness?"],
    reviewDecisions: ["ອະນຸມັດ SCR-G01—G05 ແລະ SCR-A01—A03 ເປັນ Must; SCR-G04 Saved ແລະ SCR-A04 Partner/Campaign ເປັນ Should ແລະບໍ່ block Pilot Must.", "ອະນຸມັດ <768, 768–1199, ≥1200; ຕ້ອງກວດຢ່າງໜ້ອຍ 360, 390, 768, 1024 ແລະ 1440px ພ້ອມ short-landscape/safe-area.", "ເພີ່ມ Consent denied/withdrawn, Source removed/takedown, Map app unavailable, Contact unavailable, Validation failure ແລະ Rate-limited/temporary failure ເຂົ້າ State Coverage.", "ສາມາດເລີ່ມ Final Design ໄດ້ຈາກ baseline ປັດຈຸບັນ; ແຕ່ UX-05 1.0 ຕ້ອງຜ່ານ UX-01—04, PRO-04, CON-02/04, UI-impact decisions ຂອງ CON-01/03/05 ແລະ TEC-01/02.", "Sign-off ແຍກ 4 ບົດບາດ: Product Owner, Frontend Lead, Content/Trust Owner ແລະ Accessibility Reviewer/QA; ຖ້າຄົນດຽວຮັບຫຼາຍບົດບາດຕ້ອງລົງນາມແຍກ."],
    artifacts: [{ label: "ux-final-handoff-checklist.json", path: "/templates/ux-final-handoff-checklist.json", description: "Gate/checklist ສຳລັບ Screen, responsive, state, traceability, asset, accessibility, open deviation ແລະ 4-role sign-off." }]
  }
};

const order = ["content-taxonomy", "place-data-standard", "content-acquisition", "creator-moderation", "legal-disclosure", "information-user-flow", "ux-ui-wireframe", "interactive-prototype", "design-system", "full-ux-ui"];

export default function ContentDesignDocument({ slug, basePath }: { slug: string; basePath: string }) {
  const spec = specs[slug];
  if (!spec) return null;
  const currentIndex = order.indexOf(slug);
  const previous = currentIndex > 0 ? order[currentIndex - 1] : "requirements-acceptance";
  const next = currentIndex < order.length - 1 ? order[currentIndex + 1] : "system-architecture";
  const previousSpec = specs[previous];
  const nextSpec = specs[next];
  const category = spec.code.startsWith("CON-") ? "CONTENT & TRUST" : "UX/UI DESIGN";
  const version = spec.version ?? "0.1";
  const isApproved = spec.status === "approved";
  const statusLabel = spec.statusLabel ?? "ຮ່າງສຳລັບທົບທວນ";
  const documentDate = slug === "ux-ui-wireframe" || slug === "interactive-prototype" || slug === "design-system" ? "28 ສິງຫາ 2026" : spec.version ? "27 ສິງຫາ 2026" : "26 ສິງຫາ 2026";
  const wireframeNumber = spec.sections.length + 3;
  const artifactNumber = wireframeNumber + (spec.wireframes ? 1 : 0);
  const reviewNumber = artifactNumber + (spec.artifacts ? 1 : 0);

  return <article className={`${styles.detailBody} ${styles.formalDocument}`}>
    <header className={styles.formalDocumentHeader}>
      <p>{spec.code} · {category}</p><h1>{spec.english}</h1><h2>{spec.title}</h2>
      <div className={`${styles.formalStatus} ${isApproved ? "" : styles.formalDraftStatus}`}>ສະບັບ {version} · {statusLabel} · {documentDate}</div>
    </header>

    <section className={styles.formalSection} id="document-control"><h2><span>1.</span> ຂໍ້ມູນຄວບຄຸມເອກະສານ</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
        <tr><th>ລະຫັດ</th><td>{spec.code}</td><th>ສະບັບ</th><td>{version}</td></tr>
        <tr><th>ຊື່</th><td>{spec.english}</td><th>ສະຖານະ</th><td>{statusLabel}</td></tr>
        <tr><th>Owner</th><td>{spec.owner}</td><th>ວັນທີ</th><td>{documentDate}</td></tr>
        <tr><th>Source documents</th><td colSpan={3}>{spec.sources.join(" · ")}</td></tr>
      </tbody></table></div>
      <h3>1.1 ປະຫວັດການແກ້ໄຂ</h3>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ສະບັບ</th><th>ວັນທີ</th><th>ລາຍລະອຽດ</th><th>ສະຖານະ</th></tr></thead><tbody>
        <tr><td>0.1</td><td>26 ສິງຫາ 2026</td><td>ຈັດທຳ baseline, policy/matrix ແລະຄຳຖາມສຳລັບການທົບທວນຄັ້ງທຳອິດ</td><td>ຮ່າງ</td></tr>
        {spec.version ? <tr><td>{version}</td><td>{documentDate}</td><td>{slug === "ux-ui-wireframe" || slug === "interactive-prototype" ? "ບັນທຶກ Founder Review R1/R2, ປັບ Search/Place direction ແລະເພີ່ມຮູບເມນູໃນ Prototype R2.1" : slug === "design-system" ? "ອະນຸມັດ Guest/Pilot Scope, ແຍກ Admin UX-04.1, ຂະຫຍາຍ Token/Component Contract ແລະສ້າງ Component Gallery" : "ບັນທຶກ REV-01 ຫາ REV-05 ແລະປັບ Policy, Threshold ແລະ Ownership ຕາມທີ່ອະນຸມັດ"}</td><td>{statusLabel}</td></tr> : null}
      </tbody></table></div>
    </section>

    <nav className={styles.formalToc} aria-label={`ສາລະບານ ${spec.code}`}><h2>ສາລະບານ</h2><ol>
      <li><a href="#document-control">ຂໍ້ມູນຄວບຄຸມ</a></li><li><a href="#purpose">ຈຸດປະສົງ ແລະຂອບເຂດ</a></li>
      {spec.sections.map((section, index) => <li key={section.title}><a href={`#section-${index + 3}`}>{section.title}</a></li>)}
      {spec.wireframes ? <li><a href="#wireframes">Low-fidelity Wireframes</a></li> : null}
      {spec.artifacts ? <li><a href="#artifacts">ແບບຟອມ ແລະໄຟລ໌ນຳໃຊ້</a></li> : null}
      <li><a href="#review">ຂໍ້ຕ້ອງທົບທວນ</a></li>
    </ol></nav>

    <section className={styles.formalSection} id="purpose"><h2><span>2.</span> ຈຸດປະສົງ ແລະຂອບເຂດ</h2>{spec.purpose.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <div className={styles.formalNote}><strong>ສະຖານະຂອງເນື້ອຫາ</strong>{spec.approvalNote ?? "ຂໍ້ກຳນົດ, target ແລະ threshold ໃນສະບັບ 0.1 ແມ່ນ baseline ສຳລັບການທົບທວນ. ຍັງບໍ່ມີຜົນບັງຄັບເປັນ 1.0 ຈົນກວ່າຂໍ້ຕ້ອງຕັດສິນຈະຖືກອະນຸມັດ."}</div>
    </section>

    {spec.sections.map((section, index) => <section className={styles.formalSection} id={`section-${index + 3}`} key={section.title}>
      <h2><span>{index + 3}.</span> {section.title}</h2><p>{section.intro}</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr>{section.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.rows.map((row, rowIndex) => <tr key={`${section.title}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cellIndex === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody></table></div>
      {section.note ? <div className={styles.formalDecision}><strong>ຂໍ້ສັງເກດ</strong><p>{section.note}</p></div> : null}
    </section>)}

    {spec.wireframes ? <section className={styles.formalSection} id="wireframes"><h2><span>{wireframeNumber}.</span> Low-fidelity Wireframes</h2><p>ແຜນຜັງຕໍ່ໄປນີ້ສະແດງລຳດັບຂໍ້ມູນ ແລະ interaction zone; ບໍ່ແມ່ນ visual design ສຸດທ້າຍ.</p><div className={styles.formalWireframeGrid}>{spec.wireframes.map((wireframe) => <figure className={styles.formalWireframe} key={wireframe.title}><figcaption><strong>{wireframe.title}</strong><span>{wireframe.screen}</span></figcaption><div>{wireframe.blocks.map((block) => <p key={block}>{block}</p>)}</div></figure>)}</div></section> : null}

    {spec.artifacts ? <section className={styles.formalSection} id="artifacts"><h2><span>{artifactNumber}.</span> ແບບຟອມ ແລະໄຟລ໌ນຳໃຊ້</h2><p>ໄຟລ໌ເຫຼົ່ານີ້ແປງຂໍ້ກຳນົດໃນເອກະສານໃຫ້ເປັນແບບຟອມທີ່ Content Team, Trust &amp; Safety, Designer ແລະ Developer ສາມາດນຳໄປໃຊ້ໄດ້. ກົດ “ພຣີວິວ” ເພື່ອອ່ານ Markdown, CSV, JSON ຫຼື CSS ໃນໜ້າເວັບກ່ອນດາວໂຫຼດ. ຄ່າທີ່ຂຽນວ່າ pending ຍັງຫ້າມນຳໄປໃຊ້ເປັນ Production Rule.</p><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ໄຟລ໌/ຕົວຢ່າງ</th><th>ຈຸດປະສົງ</th><th>ການນຳໃຊ້</th></tr></thead><tbody>{spec.artifacts.map((artifact) => <tr key={artifact.path}><td><strong>{artifact.label}</strong></td><td>{artifact.description}</td><td><div className={styles.artifactActions}>{artifact.action === "open" ? <a href={`${basePath}${artifact.path}`}>ເປີດເບິ່ງ</a> : <Fragment>{canPreviewArtifact(artifact.path) ? <a href={`${basePath}/artifact-preview?file=${encodeURIComponent(artifactFileName(artifact.path))}&from=${encodeURIComponent(slug)}`}>ພຣີວິວ</a> : null}<a href={`${basePath}${artifact.path}`} download>ດາວໂຫຼດ</a></Fragment>}</div></td></tr>)}</tbody></table></div></section> : null}

    <section className={styles.formalSection} id="review"><h2><span>{reviewNumber}.</span> {spec.reviewDecisions ? "ບັນທຶກຂໍ້ຕັດສິນ" : "ຂໍ້ຕ້ອງທົບທວນກ່ອນຂຶ້ນສະບັບ 1.0"}</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ຫົວຂໍ້ທົບທວນ</th>{spec.reviewDecisions ? <th>ຂໍ້ຕັດສິນ</th> : null}<th>ສະຖານະ</th></tr></thead><tbody>{spec.review.map((item, index) => { const decision = spec.reviewDecisions?.[index]; const pending = decision?.includes("ຍັງຄ້າງ"); return <tr key={item}><td>REV-{String(index + 1).padStart(2, "0")}</td><td>{item}</td>{spec.reviewDecisions ? <td>{decision}</td> : null}<td>{decision ? (pending ? "ຍັງຄ້າງ" : "ອະນຸມັດ") : "ລໍທົບທວນ"}</td></tr>; })}</tbody></table></div>
      <div className={isApproved ? styles.formalDecision : styles.formalDraftNotice}><strong>{spec.code} · {version}</strong><p>{isApproved ? `REV-01 ຫາ REV-05 ຖືກຕັດສິນຄົບ ແລະເອກະສານນີ້ເປັນ Baseline ${version} ທີ່ອະນຸມັດແລ້ວ.` : spec.approvalNote ?? "ເອກະສານມີ baseline ສຳລັບຣີວິວແລ້ວ ແຕ່ຍັງບໍ່ອະນຸມັດ."}</p></div>
    </section>

    <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
      <a href={`${basePath}/documents/${previous}`}><small>← ເອກະສານກ່ອນໜ້າ</small><strong>{previousSpec?.english ?? "Requirements & Acceptance Criteria"}</strong></a>
      <a href={`${basePath}/documents/${next}`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>{nextSpec?.english ?? "System Architecture"}</strong></a>
    </nav>
  </article>;
}
