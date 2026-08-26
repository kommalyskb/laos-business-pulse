"use client";

import { useState } from "react";
import styles from "../documents.module.css";

type Priority = "Must" | "Should" | "Later" | "Out";
type ScopeItem = {
  id: string;
  priority: Priority;
  milestone: string;
  capability: string;
  scope: string;
  reason: string;
  source: string;
};

const scopeItems: ScopeItem[] = [
  { id: "MVP-001", priority: "Must", milestone: "M1", capability: "Pilot inventory", scope: "ມີ 100 Place Records ໃນວຽງຈັນ ຈາກ 2 ໝວດທຳອິດ: ຮ້ານອາຫານ ແລະຄາເຟ; Required Field, Source ແລະ Checked Date ຕ້ອງຄົບຕາມ policy.", reason: "ຖ້າ inventory ບໍ່ພໍ ຈະທົດສອບ Search, Feed ແລະຄຸນຄ່າຕໍ່ຜູ້ໃຊ້ບໍ່ໄດ້.", source: "BUS-04 · PRO-01" },
  { id: "MVP-002", priority: "Must", milestone: "M0/M1", capability: "Responsive Guest Web", scope: "Guest ເຂົ້າ Feed, Search, Place ແລະ Action ໄດ້ໃນ Mobile Web/PWA ໂດຍບໍ່ສະໝັກ Account.", reason: "ຫຼຸດອຸປະສັກກ່ອນພິສູດວ່າ Core Journey ມີຄຸນຄ່າ.", source: "USR-01—04 · NFR-01" },
  { id: "MVP-003", priority: "Must", milestone: "M0", capability: "Admin Access & Audit", scope: "Admin ແຕ່ລະຄົນໃຊ້ Account ຕົນເອງ; authorization ແລະ Audit Log ຕ້ອງມາກ່ອນ business mutation.", reason: "ຂໍ້ມູນ Public ຕ້ອງຕາມຮອຍຜູ້ປ່ຽນ ແລະເຫດຜົນໄດ້.", source: "ADM-01 · PRO-02 WP-01" },
  { id: "MVP-004", priority: "Must", milestone: "M0/M1", capability: "Place Data Admin", scope: "ສ້າງ/ແກ້ Place Draft, validate Required Field, ເຕືອນ Duplicate, ກວດ Publish Readiness ແລະ Publish/Suspend/Archive.", reason: "Admin workflow ແມ່ນກົນໄກຜະລິດ inventory ບໍ່ແມ່ນ back-office ເສີມ.", source: "ADM-01 · PRO-02 WP-02/04" },
  { id: "MVP-005", priority: "Must", milestone: "M0/M1", capability: "Content Source Curation", scope: "ລົງທະບຽນ, validate, ອ່ານ metadata ທີ່ອະນຸຍາດ, ເຊື່ອມ Source ກັບ Place ແລະ Publish ພ້ອມ Creator attribution.", reason: "Platform ຕ້ອງຊີ້ກັບຫາຕົ້ນສະບັບ ແລະບໍ່ Re-host ວິດີໂອ.", source: "TRU-01 · PRO-02 WP-03" },
  { id: "MVP-006", priority: "Must", milestone: "M0/M1", capability: "Full-screen Discovery Feed", scope: "Feed ແນວຕັ້ງເຕັມຈໍໃນ Mobile, ສະແດງ Source/Creator/Place ແລະມີ Preview/Fallback ເມື່ອ official embed ລົ້ມ.", reason: "Video-first ແມ່ນຈຸດດຶງຄວາມສົນໃຈ ແຕ່ Card ຕ້ອງພາໄປ Place Page.", source: "USR-01 · NFR-02" },
  { id: "MVP-007", priority: "Must", milestone: "M1", capability: "Search & Launch Filters", scope: "ຄົ້ນດ້ວຍຊື່/ຄຳສຳຄັນ ແລະກອງດ້ວຍໝວດ, ເຂດ ແລະຊ່ວງລາຄາ; ມີ Empty State ແລະ Clear Filter.", reason: "ແກ້ pain point ທີ່ຄົ້ນ Review ໃນ Social Platform ຍາກ.", source: "USR-02 · PRO-01 Decision 03" },
  { id: "MVP-008", priority: "Must", milestone: "M0/M1", capability: "Canonical Place Page", scope: "ໜຶ່ງ Place ມີໜ້າຫຼັກດຽວ ລວມຊື່, ໝວດ, ທີ່ຢູ່, Map, Contact, Hours, Price, Sources, Checked Date ແລະ Trust Labels.", reason: "ເປັນຈຸດປ່ຽນຈາກການເບິ່ງ Content ໄປຫາການຕັດສິນໃຈ.", source: "USR-03 · TRU-01" },
  { id: "MVP-009", priority: "Must", milestone: "M0/M1", capability: "Map, Call & Message", scope: "Place Page ເປີດ Map, Call ແລະ Message ໄປຫາປາຍທາງຖືກຕ້ອງ; Map ເຂົ້າ First Vertical Slice, Call/Message ເຂົ້າ Validation Pilot.", reason: "Action ແມ່ນຫຼັກຖານ Decision Intent ທີ່ໃກ້ການໄປຮ້ານທີ່ສຸດໃນ MVP.", source: "USR-04 · ANA-01" },
  { id: "MVP-010", priority: "Must", milestone: "M0/M1", capability: "Consent & Decision Analytics", scope: "ແຈ້ງ consent, ສ້າງ Anonymous Session, validate Event ແລະ deduplicate Feed → Place → Map/Call/Message; Analytics failure ຫ້າມ block Journey.", reason: "ບໍ່ມີ Event ທີ່ກວດໄດ້ ກໍບໍ່ສາມາດພິສູດ user value ຫຼືລາຍງານຮ້ານ.", source: "ANA-01 · NFR-04" },
  { id: "MVP-011", priority: "Must", milestone: "M1", capability: "Trust & Rights Controls", scope: "Source linked, Place verified, Founding Partner ແລະ Sponsored ໃຊ້ປ້າຍແຍກກັນ; ມີ attribution, fallback ແລະ takedown path.", reason: "ການຈ່າຍເງິນບໍ່ສາມາດຊື້ verification ຫຼືຄະແນນ Review.", source: "TRU-01 · BR-04—07" },
  { id: "MVP-012", priority: "Must", milestone: "M1", capability: "Correction Request — Concierge", scope: "ປຸ່ມແຈ້ງແກ້ໄຂພາໄປຊ່ອງທາງພາຍນອກພ້ອມຂໍ້ຄວາມມາດຕະຖານ; Admin ບັນທຶກ, ກວດຫຼັກຖານ ແລະອະນຸມັດແບບ Manual.", reason: "ໃຫ້ຮ້ານແກ້ຂໍ້ມູນໄດ້ໂດຍບໍ່ສ້າງ Business Portal ໃນ Pilot.", source: "BUS-01 · PRO-01 Decision 04" },
  { id: "MVP-013", priority: "Must", milestone: "M1", capability: "Takedown & Source Unavailable", scope: "Admin ຖອນ Source ຈາກ Public View ທັນທີເມື່ອມີ Takedown; Temporary Failure ໃຊ້ fallback/retry ແລະບໍ່ລົບ Place ອັດຕະໂນມັດ.", reason: "ປົກປ້ອງສິດ Content ແລະບໍ່ໃຫ້ Source ເສຍຄັ້ງດຽວທຳລາຍ Place Page.", source: "TRU-01 · PRO-02 WP-07/08" },
  { id: "MVP-014", priority: "Must", milestone: "M1", capability: "Founding Partner Pilot", scope: "ຮ້ານທີ່ຈ່າຍ 200,000 ກີບ/ເດືອນ ໄດ້ Verified Business Information, Correction Support, Performance Summary ແລະປ້າຍ Partner; ຂັ້ນຕອນຂາຍ/ຊຳລະເຮັດນອກ Platform.", reason: "ເປັນການພິສູດ willingness-to-pay ໂດຍບໍ່ເພີ່ມ payment system.", source: "BUS-06 · Revenue Decision" },
  { id: "MVP-015", priority: "Must", milestone: "M1", capability: "Basic Performance Summary", scope: "ສະຫຼຸບ Reach, Place Open ແລະ Map/Call/Message ຕາມໄລຍະເວລາ; ສາມາດສົ່ງເປັນ report ແບບ Manual ແລະຕ້ອງລະບຸວ່າ Intent ບໍ່ແມ່ນ Visit/Sale.", reason: "ເປັນສິ່ງທີ່ Founding Partner ຈ່າຍເພື່ອຮັບ ແລະຕ້ອງອີງ Event ທີ່ກວດໄດ້.", source: "BUS-06 · ANA-01" },
  { id: "MVP-016", priority: "Must", milestone: "M1", capability: "Minimum Quality & Recovery", scope: "Mobile core flow, external-media fallback, privacy notice, admin recovery, error logging, backup/rollback ແລະ accessibility ຂັ້ນພື້ນຖານຕ້ອງຜ່ານ Release Gate.", reason: "MVP ໝາຍເຖິງສິ່ງທີ່ໃຊ້ທົດສອບໄດ້ຢ່າງປອດໄພ ບໍ່ແມ່ນພຽງ Demo.", source: "NFR-01—04 · PRO-02 GATE-06" },
  { id: "MVP-017", priority: "Should", milestone: "M1", capability: "Save & Share", scope: "Save Place ໃນອຸປະກອນ ແລະ Share Canonical Link ໂດຍບໍ່ມີ Account.", reason: "ມີຄຸນຄ່າຕໍ່ Journey ແຕ່ Map/Call/Message ພິສູດສົມມຸດຖານໄດ້ໂດຍບໍ່ຕ້ອງລໍ Feature ນີ້.", source: "USR-05" },
  { id: "MVP-018", priority: "Should", milestone: "M1", capability: "Duplicate Merge & Redirect", scope: "Admin merge Duplicate Place, ຍ້າຍ Source/Request/Analytics ແລະ redirect URL ເກົ່າ; ເຮັດຫຼັງ First Place Publish.", reason: "ຈຳເປັນເມື່ອ inventory ເລີ່ມຫຼາຍ ແຕ່ບໍ່ຄວນຂັດຂວາງ First Vertical Slice.", source: "PRO-02 DEV-018" },
  { id: "MVP-019", priority: "Should", milestone: "M1", capability: "Sponsored Campaign — Manual", scope: "Admin ຕັ້ງ placement, start/end ແລະ Sponsored label ໃຫ້ campaign ທົດສອບ; 1,000,000 ກີບຍັງເປັນ Price Hypothesis.", reason: "ທົດສອບລາຍຮັບອີກແບບໄດ້ ແຕ່ Revenue Gate ຫຼັກຍັງໃຊ້ Paid/Deposit ແລະ LOI.", source: "BUS-06 · PRO-02 WP-09" },
  { id: "MVP-020", priority: "Should", milestone: "M1", capability: "Basic Funnel Reconciliation", scope: "Admin ກວດ Feed View → Place Open → Unique Intent ກັບ Test Log ແລະສະແດງ data-quality flag.", reason: "ຊ່ວຍກວດ Event ກ່ອນນຳໄປສ້າງ Partner Report.", source: "ANA-01 · PRO-02 WP-06/09" },
  { id: "MVP-021", priority: "Later", milestone: "M2", capability: "Automated Freshness & Source Monitoring", scope: "Scheduler, retry/backoff, stale queue, provider monitoring ແລະ automatic reminders.", reason: "Pilot ໃຊ້ manual queue ເພື່ອຮຽນຮູ້ cadence ແລະ exception ກ່ອນ automate.", source: "PRO-02 WP-08" },
  { id: "MVP-022", priority: "Later", milestone: "M2", capability: "Business Self-service", scope: "Business account, claim flow, edit suggestion dashboard, subscription view ແລະ report dashboard.", reason: "Concierge workflow ພິສູດ demand ໄດ້ໂດຍບໍ່ເພີ່ມ identity/support complexity.", source: "BUS-01 · Growth" },
  { id: "MVP-023", priority: "Later", milestone: "M2", capability: "Near me & Open now", scope: "Filter ຕາມຕຳແໜ່ງ ແລະເວລາເປີດປັດຈຸບັນ.", reason: "ຕ້ອງມີ Hours/Location ທີ່ຄົບ ແລະສົດພໍກ່ອນຈຶ່ງບໍ່ຫຼອກຜູ້ໃຊ້.", source: "PRO-01 Decision 03" },
  { id: "MVP-024", priority: "Later", milestone: "M3", capability: "Creator Accounts & Marketplace", scope: "Creator profile, upload/submission, campaign matching, contract ແລະ commission.", reason: "ເປັນ two-sided marketplace ທີ່ຕ້ອງມີ demand/supply ພຽງພໍກ່ອນ.", source: "BUS-06 Future Revenue" },
  { id: "MVP-025", priority: "Later", milestone: "M3", capability: "AI Recommendation", scope: "Personalized recommendation ຈາກ behavior/context ແລະ evaluation safeguards.", reason: "ຕ້ອງມີ inventory, event quality ແລະ baseline search ກ່ອນ; rule-based ordering ພຽງພໍສຳລັບ Pilot.", source: "TEC-05 Future" },
  { id: "MVP-026", priority: "Later", milestone: "M2", capability: "Multi-role Admin", scope: "ແຍກ curator, reviewer, campaign, finance ແລະ administrator permissions.", reason: "Pilot ໃຊ້ Full Admin Role ດຽວພ້ອມ individual account/audit ໄດ້.", source: "PRO-02 BR-11" },
  { id: "MVP-027", priority: "Out", milestone: "Not in MVP", capability: "Booking, Order & Payment", scope: "Booking calendar, inventory, checkout, payment, refund, dispute ແລະ order management.", reason: "ເພີ່ມ transaction liability, merchant integration ແລະ support ໂດຍບໍ່ຈຳເປັນຕໍ່ Core Journey.", source: "BR-10 · Approved Non-goal" },
  { id: "MVP-028", priority: "Out", milestone: "Not in MVP", capability: "Native Mobile Apps", scope: "Native iOS/Android application ແລະ app-store release.", reason: "Responsive Web/PWA ທົດສອບ Mobile Journey ໄດ້ດ້ວຍຕົ້ນທຶນ/ການດູແລຕ່ຳກວ່າ.", source: "PRO-01 Non-goal" },
  { id: "MVP-029", priority: "Out", milestone: "Not in MVP", capability: "User Social Accounts", scope: "User profile, follow, comment, cross-device save, notification ແລະ social graph.", reason: "ບໍ່ຈຳເປັນຕໍ່ Guest-first discovery ແລະເພີ່ມ privacy/moderation burden.", source: "PRO-01 Non-goal" },
  { id: "MVP-030", priority: "Out", milestone: "Not in MVP", capability: "On-platform Reviews & Ratings", scope: "ຂຽນ Review, rating score, comment, response ແລະ moderation ໃນ Platform.", reason: "ທິດທາງ MVP ແມ່ນລວມ Social Review Sources ບໍ່ແມ່ນສ້າງ review network ໃໝ່.", source: "Product Boundary" },
  { id: "MVP-031", priority: "Out", milestone: "Prohibited", capability: "Video Re-hosting / Scraping", scope: "Download, copy, store, transcode ຫຼື scrape ວິດີໂອ/metadata ເກີນສິດທີ່ Source ອະນຸຍາດ.", reason: "ຂັດກັບ link/embed/attribution model ແລະເພີ່ມຄວາມສ່ຽງດ້ານສິດ/Server cost.", source: "BR-04 · Trust & Rights" },
];

const milestones = [
  ["M0", "First Vertical Slice", "Internal technical proof", "Admin → Place Draft → Source → Publish → Public Place → Feed item → Map → Decision Intent. ບໍ່ລວມ Search, Correction, Campaign ຫຼື Merge."],
  ["M1", "Validation Pilot", "6 ອາທິດ · ວຽງຈັນ", "100 Places, ອາຫານ/ຄາເຟ, Guest core journey, concierge operations, Founding Partner test ແລະ evidence gates."],
  ["M2", "Public MVP", "Conditional Go only", "ເປີດກວ້າງຫຼັງ User Value, Supply, Revenue, Economics ແລະ Trust gates ຜ່ານ; ຈຶ່ງ automate ວຽກທີ່ພິສູດແລ້ວ."],
  ["M3", "Growth", "Evidence-led expansion", "Creator marketplace, AI recommendation, ໝວດ/ເຂດໃໝ່ ແລະຮູບແບບລາຍຮັບເພີ່ມຕາມຫຼັກຖານ."],
] as const;

const manualPlan = [
  ["Correction", "ປຸ່ມເປີດຊ່ອງທາງພາຍນອກ; Admin ສ້າງ Request ແລະກວດຫຼັກຖານ.", "Business Portal + status tracking", "ເມື່ອປະລິມານ Request ເກີນ SLA ທີ່ທີມຮັບໄດ້"],
  ["Place verification", "Admin ກວດ field/source ແລະບັນທຶກ Checked Date.", "Scheduled reminder + owner confirmation", "ເມື່ອຮູ້ cadence ແລະ exception ຈາກ 100 Places"],
  ["Source availability", "Fallback, manual recheck ແລະ takedown ທັນທີ.", "Background monitor + retry/backoff queue", "ເມື່ອມີ Source ຫຼາຍຈົນ manual check ບໍ່ທັນ"],
  ["Partner onboarding/payment", "ຂາຍ, ຮັບຫຼັກຖານຈ່າຍ ແລະ support ນອກ Platform.", "Subscription billing + self-service", "ຫຼັງ price/package ແລະ renewal behavior ຖືກພິສູດ"],
  ["Performance summary", "Export/aggregate ແລະ Admin ກວດກ່ອນສົ່ງ.", "Partner dashboard", "ເມື່ອ metric definition ແລະ data quality ຄົງທີ່"],
  ["Sponsored campaign", "Admin ຕັ້ງ placement/date/label ແລະປິດຕາມກຳນົດ.", "Self-service campaign manager", "ຫຼັງມີ paid campaign ແລະຮູ້ operation cost ຈິງ"],
] as const;

const releaseGates = [
  ["G0", "Scope baseline", "PRO-01 1.0 ແລະ PRO-02 1.0 ອະນຸມັດ; Must/Should/Later/Out ມີ owner ແລະ trace ID.", "ຍັງມີ Feature ບໍ່ຮູ້ວ່າຈຳເປັນຕໍ່ Pilot ຫຼືບໍ່."],
  ["G1", "First Vertical Slice", "10 ຂັ້ນ Admin → Map Intent ຜ່ານ automated E2E; audit/event failure ຈັດການຕາມ contract.", "Place ເຜີຍແຜ່ບໍ່ໄດ້, Public ເຫັນ data ຜິດ ຫຼື Map/Event ບໍ່ຖືກ."],
  ["G2", "Pilot readiness", "Must scope ທັງໝົດມີ test; 100 Places ຄົບ; Mobile Feed → Place → Action ໃຊ້ໄດ້; Source/Trust/Takedown/Analytics/Admin gates ຜ່ານ.", "Core Journey ຂາດ, critical place data ຜິດ, attribution/rights ບໍ່ຊັດ ຫຼື event ກວດບໍ່ໄດ້."],
  ["G3", "Validation evidence", "ທົດສອບ 20 ຄົນ, ສຳພາດ owner 15 ຮ້ານ, ເຂົ້າຫາ 30 ຮ້ານ; ມີຢ່າງໜ້ອຍ 3 paid/deposit + 2 LOI; supply workflow ຊ້ຳໄດ້ ແລະຢູ່ໃນ stop-loss.", "ມີພຽງ verbal interest, user ກັບໄປ social search, data/right cost ຮັບບໍ່ໄດ້ ຫຼືເກີນ stop-loss."],
  ["G4", "Public MVP authorization", "Product Owner ບັນທຶກ Go/Pivot/No-go ຈາກ 5 gates: User Value, Supply, Revenue, Economics, Trust & Rights.", "ຫ້າມໃຊ້ການສ້າງ software ສຳເລັດເປັນເຫດຜົນດຽວໃນການເປີດ Public MVP."],
] as const;

const changeRules = [
  ["01", "ພິສູດຫຍັງ", "Feature ໃໝ່ຕ້ອງຊີ້ວ່າມັນພິສູດ User Value, Supply, Revenue, Trust ຫຼືຄວາມປອດໄພຂໍ້ໃດ."],
  ["02", "ມີ Manual Fallback ຫຼືບໍ່", "ຖ້າ concierge/manual ສາມາດທົດສອບສົມມຸດຖານໄດ້ຢ່າງປອດໄພ Feature automation ຕ້ອງຢູ່ Later."],
  ["03", "ກະທົບຫຍັງ", "ລະບຸ Requirement, Function, Entity, Workflow, Test, Cost, Time ແລະ Operation ທີ່ຕ້ອງປ່ຽນ."],
  ["04", "ແລກກັບຫຍັງ", "ຫາກເພີ່ມ Feature ໃນ M1 ຕ້ອງລະບຸ Must/Should ລາຍການໃດຖືກເລື່ອນ ຫຼືງົບ/ເວລາເພີ່ມເທົ່າໃດ."],
  ["05", "ໃຜອະນຸມັດ", "Product Owner ອະນຸມັດ scope; SA ກວດ traceability; Tech Lead/QA ຢືນຢັນ dependency ແລະ evidence."],
] as const;

const priorityLabels: Record<Priority | "All", string> = {
  All: "ທັງໝົດ",
  Must: "Must · ຂາດບໍ່ໄດ້",
  Should: "Should · ເລື່ອນໄດ້",
  Later: "Later · ຫຼັງຫຼັກຖານ",
  Out: "Out · ບໍ່ຢູ່ໃນ MVP",
};

export default function MvpScopeDocument({ basePath }: { basePath: string }) {
  const [priority, setPriority] = useState<Priority | "All">("All");
  const visibleItems = priority === "All" ? scopeItems : scopeItems.filter((item) => item.priority === priority);
  const counts = (value: Priority) => scopeItems.filter((item) => item.priority === value).length;

  return (
    <article className={`${styles.detailBody} ${styles.businessDocument} ${styles.mvpScopeBody}`}>
      <section className={styles.documentControl}>
        <div><small>ສະບັບ</small><strong>0.2</strong></div>
        <div><small>ສະຖານະ</small><strong>ຮ່າງສຳລັບທົບທວນ</strong></div>
        <div><small>ວັນທີປັບປຸງ</small><strong>26 ສິງຫາ 2026</strong></div>
        <div><small>ເອກະສານຕົ້ນທາງ</small><strong>PRO-01 1.0 + PRO-02 1.0 + BUS-04/06 1.0</strong></div>
      </section>

      <header className={styles.documentReadingHeader}>
        <span>PRO-03 · MVP SCOPE & PRIORITIZATION</span>
        <h2>ສະບັບທຳອິດຂອງ “ພ້ອມໄປ” ຈະເຮັດຫຍັງ ແລະຍັງບໍ່ເຮັດຫຍັງ</h2>
        <p>ເອກະສານນີ້ໃຊ້ກຳນົດຂອບເຂດການພັດທະນາສະບັບທຳອິດ: Function ໃດຕ້ອງມີ, Function ໃດໃຊ້ຄົນຈັດການໄປກ່ອນໄດ້, Function ໃດຄວນເຮັດພາຍຫຼັງ ແລະຫຼັກຖານແບບໃດຈຶ່ງອະນຸຍາດໃຫ້ໂຄງການຂະຫຍາຍຕໍ່.</p>
        <p>ເປົ້າໝາຍບໍ່ແມ່ນສ້າງ Platform ໃຫ້ຄົບທຸກແນວຄິດ. ເປົ້າໝາຍແມ່ນສ້າງສ່ວນທີ່ພຽງພໍໃຫ້ຜູ້ໃຊ້ທົດລອງໄດ້ຈິງ, ຮ້ານເຫັນຄຸນຄ່າ ແລະທີມວັດໄດ້ວ່າຄວນໄປຕໍ່ ຫຼືປັບແນວທາງ.</p>
      </header>

      <nav className={styles.documentToc} aria-label="ສາລະບານ PRO-03"><b>ສາລະບານ</b><ol>
        <li><a href="#mvp-purpose">ເອກະສານນີ້ໃຊ້ເພື່ອຫຍັງ</a></li><li><a href="#mvp-first-version">ພາບລວມສະບັບທຳອິດ</a></li><li><a href="#mvp-user">ຜູ້ໃຊ້ເຮັດຫຍັງໄດ້</a></li><li><a href="#mvp-build">ທີມຕ້ອງສ້າງຫຍັງ</a></li><li><a href="#mvp-not-now">ສິ່ງທີ່ຍັງບໍ່ສ້າງ</a></li><li><a href="#mvp-milestones">ລຳດັບການພັດທະນາ</a></li><li><a href="#mvp-evidence">ເງື່ອນໄຂການໄປຕໍ່</a></li><li><a href="#mvp-reference">ພາກລາຍລະອຽດອ້າງອີງ</a></li><li><a href="#mvp-review">5 ຈຸດທົບທວນ</a></li>
      </ol></nav>

      <section className={styles.documentArticleSection} id="mvp-purpose">
        <span>01 · PURPOSE</span><h2>PRO-03 ແມ່ນເອກະສານສຳລັບ “ຈຳກັດ ແລະຈັດລຳດັບວຽກ”</h2>
        <blockquote className={styles.mvpPurposeStatement}>ເອກະສານນີ້ຕ້ອງເຮັດໃຫ້ Product Owner, Developer, Designer ແລະຜູ້ສະໜັບສະໜູນເຂົ້າໃຈກົງກັນວ່າ: <strong>ສະບັບທຳອິດຈະສ້າງຫຍັງ, ບໍ່ສ້າງຫຍັງ ແລະໃຊ້ຫຼັກຖານໃດຕັດສິນການພັດທະນາຕໍ່.</strong></blockquote>
        <div className={styles.mvpDocumentMap}>
          <article><b>PRO-01</b><h3>ຕ້ອງການຫຍັງ?</h3><p>ອະທິບາຍບັນຫາ, ຜູ້ໃຊ້ ແລະຄວາມຕ້ອງການຂອງ Platform.</p></article>
          <article><b>PRO-02</b><h3>ລະບົບເຮັດວຽກແນວໃດ?</h3><p>ອະທິບາຍ Function, Workflow, Data, Algorithm ແລະລຳດັບສຳລັບ Developer.</p></article>
          <article><b>PRO-03</b><h3>ສິ່ງໃດເຮັດກ່ອນ?</h3><p>ເລືອກສ່ວນທີ່ຈະສ້າງໃນສະບັບທຳອິດ ແລະກັນສ່ວນທີ່ຍັງບໍ່ຈຳເປັນອອກ.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-first-version">
        <span>02 · FIRST VERSION AT A GLANCE</span><h2>ພາບລວມລະບົບສະບັບທຳອິດ</h2>
        <div className={styles.documentProse}><p>“ພ້ອມໄປ” ສະບັບທຳອິດແມ່ນ Mobile Web ສຳລັບຄົນທີ່ກຳລັງຊອກຫາຮ້ານອາຫານ ຫຼືຄາເຟໃນວຽງຈັນ. ຜູ້ໃຊ້ເບິ່ງວິດີໂອຣີວິວ, ກວດຂໍ້ມູນຮ້ານ ແລະຕິດຕໍ່ ຫຼືເປີດແຜນທີ່ໄປຮ້ານໄດ້. Platform ບໍ່ຮັບຈອງ ແລະບໍ່ຮັບເງິນໃນໄລຍະນີ້.</p></div>
        <div className={styles.mvpBaselineGrid}>
          <article><b>WHERE</b><strong>ວຽງຈັນ</strong><p>ບໍ່ Launch ຫຼາຍແຂວງພ້ອມກັນ.</p></article>
          <article><b>WHAT</b><strong>ອາຫານ + ຄາເຟ</strong><p>2 ໝວດທຳອິດ; inventory 30 → 60 → 100.</p></article>
          <article><b>WHO</b><strong>Guest-first</strong><p>ຜູ້ຊອກຮ້ານບໍ່ຕ້ອງມີ Account; Admin ໃຊ້ individual account.</p></article>
          <article><b>CORE JOURNEY</b><strong>Discover → Decide → Act</strong><p>Full-screen Feed/Search → Place Page → Map/Call/Message.</p></article>
          <article><b>CONTENT MODEL</b><strong>Link / Embed / Attribution</strong><p>ບໍ່ Download ຫຼື Re-host ວິດີໂອໂດຍບໍ່ມີສິດ.</p></article>
          <article><b>TRANSACTION</b><strong>No Booking / Payment</strong><p>ຜູ້ໃຊ້ ແລະຮ້ານຕິດຕໍ່ກັນໂດຍກົງ.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-user">
        <span>03 · USER EXPERIENCE</span><h2>ຜູ້ໃຊ້ຈະເຮັດຫຍັງໄດ້ໃນສະບັບທຳອິດ</h2>
        <div className={styles.mvpJourneyFlow}>
          <article><b>01 · ຄົ້ນພົບ</b><h3>ເບິ່ງ ຫຼືຄົ້ນຫາ</h3><p>ເບິ່ງ Feed ວິດີໂອເຕັມຈໍ ຫຼືຄົ້ນຫາຕາມຊື່, ໝວດ, ເຂດ ແລະຊ່ວງລາຄາ.</p></article><i>→</i>
          <article><b>02 · ຕັດສິນໃຈ</b><h3>ເບິ່ງຂໍ້ມູນຮ້ານ</h3><p>ເບິ່ງທີ່ຢູ່, ເວລາເປີດ, ລາຄາ, ແຫຼ່ງຣີວິວ ແລະວັນທີກວດຂໍ້ມູນລ່າສຸດ.</p></article><i>→</i>
          <article><b>03 · ລົງມື</b><h3>Map, Call ຫຼື Message</h3><p>ເປີດແຜນທີ່, ໂທ ຫຼືສົ່ງຂໍ້ຄວາມຫາຮ້ານໂດຍກົງ. ບໍ່ຕ້ອງສະໝັກ Account.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-build">
        <span>04 · WHAT THE TEAM BUILDS</span><h2>ສິ່ງທີ່ທີມຕ້ອງສ້າງໃຫ້ຄົບກ່ອນທົດລອງ</h2>
        <div className={styles.mvpBuildScope}>
          <article><b>ສ່ວນຜູ້ໃຊ້</b><h3>Feed, Search, Place, Action</h3><p>ສ້າງເສັ້ນທາງຫຼັກຕັ້ງແຕ່ຄົ້ນພົບວິດີໂອ ຈົນເຖິງກົດ Map, Call ຫຼື Message.</p></article>
          <article><b>ສ່ວນຂໍ້ມູນ</b><h3>100 ຮ້ານທີ່ກວດແລ້ວ</h3><p>ຮ້ານອາຫານ ແລະຄາເຟໃນວຽງຈັນ ຕ້ອງມີຂໍ້ມູນຫຼັກ, ແຫຼ່ງອ້າງອີງ ແລະວັນທີກວດ.</p></article>
          <article><b>ສ່ວນບໍລິຫານ</b><h3>Admin ຈັດການຮ້ານ ແລະ Source</h3><p>ສ້າງ, ແກ້, ກວດ, ເຜີຍແຜ່, ລະງັບ ແລະຖອນຂໍ້ມູນໄດ້ ພ້ອມປະຫວັດການປ່ຽນແປງ.</p></article>
          <article><b>ສ່ວນຄວາມໜ້າເຊື່ອຖື</b><h3>Source, Attribution ແລະ Takedown</h3><p>ຊີ້ກັບຫາຕົ້ນສະບັບ, ບໍ່ Re-host ວິດີໂອ ແລະມີວິທີຖອນ Content ເມື່ອມີການແຈ້ງ.</p></article>
          <article><b>ສ່ວນວັດຜົນ</b><h3>Decision Intent Analytics</h3><p>ວັດ Feed View, Place Open, Map, Call ແລະ Message ໂດຍບໍ່ນັບວ່າ Click ເທົ່າກັບການໄປຮ້ານ ຫຼືການຊື້.</p></article>
          <article><b>ສ່ວນທົດສອບລາຍຮັບ</b><h3>Founding Partner Pilot</h3><p>ຮ້ານຈ່າຍ 200,000 ກີບ/ເດືອນ ເພື່ອຮັບການກວດຂໍ້ມູນ, ຊ່ວຍແກ້ໄຂ ແລະລາຍງານຜົນພື້ນຖານ.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-not-now">
        <span>05 · NOT IN THE FIRST VERSION</span><h2>ສິ່ງທີ່ຍັງບໍ່ສ້າງ ແລະເຫດຜົນ</h2>
        <div className={styles.documentProse}><p>ລາຍການຕໍ່ໄປບໍ່ແມ່ນໄອເດຍທີ່ບໍ່ດີ. ແຕ່ຍັງບໍ່ຈຳເປັນຕໍ່ການພິສູດວ່າຜູ້ໃຊ້ຕ້ອງການ Platform ແລະຮ້ານຍອມຈ່າຍ. ການສ້າງໄວເກີນໄປຈະເພີ່ມເວລາ, ຕົ້ນທຶນ ແລະພາລະການດູແລ.</p></div>
        <div className={styles.mvpExcludedList}>
          <article><b>01</b><div><h3>Booking, Order ແລະ Payment</h3><p>ໄລຍະທຳອິດໃຫ້ຜູ້ໃຊ້ຕິດຕໍ່ຮ້ານໂດຍກົງ; ຫຼີກລ້ຽງລະບົບຊຳລະ, refund ແລະ dispute.</p></div></article>
          <article><b>02</b><div><h3>Native Mobile Application</h3><p>Mobile Web ພຽງພໍສຳລັບທົດສອບ; ບໍ່ຕ້ອງສ້າງ iOS ແລະ Android ແຍກກັນ.</p></div></article>
          <article><b>03</b><div><h3>User Account ແລະ Social Features</h3><p>ຜູ້ໃຊ້ບໍ່ຕ້ອງມີ Profile, Follow, Comment ຫຼື Notification ເພື່ອຄົ້ນຫາຮ້ານ.</p></div></article>
          <article><b>04</b><div><h3>AI Recommendation</h3><p>ໃຊ້ການຈັດລຳດັບພື້ນຖານໄປກ່ອນ; AI ຕ້ອງລໍໃຫ້ມີຂໍ້ມູນ ແລະພຶດຕິກຳຜູ້ໃຊ້ພຽງພໍ.</p></div></article>
          <article><b>05</b><div><h3>Creator Marketplace</h3><p>ຕ້ອງລໍໃຫ້ມີທັງຮ້ານ ແລະ Creator ພຽງພໍກ່ອນສ້າງຕະຫຼາດເຊື່ອມສອງຝ່າຍ.</p></div></article>
          <article><b>06</b><div><h3>ການ Copy ຫຼື Re-host ວິດີໂອ</h3><p>ບໍ່ດາວໂຫຼດ ຫຼືເກັບວິດີໂອຂອງຜູ້ອື່ນ; ໃຊ້ Link, Embed ແລະ Attribution ຕາມສິດທີ່ອະນຸຍາດ.</p></div></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-milestones">
        <span>06 · DEVELOPMENT ORDER</span><h2>ລຳດັບການພັດທະນາ: ຈາກທົດສອບພາຍໃນ ໄປຫາການຂະຫຍາຍ</h2>
        <div className={styles.documentProse}><p>ທີມບໍ່ຄວນສ້າງທຸກສ່ວນພ້ອມກັນ. ແຕ່ລະຂັ້ນຕ້ອງສົ່ງຜົນທີ່ທົດສອບໄດ້ ແລ້ວຈຶ່ງຂະຫຍາຍໄປຂັ້ນຕໍ່ໄປ.</p></div>
        <div className={styles.mvpMilestones}>{milestones.map(([id, name, status, detail]) => <article key={id}><b>{id}</b><div><small>{status}</small><h3>{name}</h3><p>{detail}</p></div></article>)}</div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-evidence">
        <span>07 · CONTINUE OR STOP</span><h2>ຕ້ອງເຫັນຫຼັກຖານຫຍັງ ຈຶ່ງພັດທະນາຕໍ່</h2>
        <p className={styles.documentQuestion}>ການສ້າງ Software ສຳເລັດ ບໍ່ແມ່ນຫຼັກຖານວ່າທຸລະກິດຈະສຳເລັດ. ໂຄງການຄວນໄປຕໍ່ເມື່ອພົບ 3 ຫຼັກຖານຕໍ່ໄປນີ້.</p>
        <div className={styles.mvpProofGrid}>
          <article><b>ຜູ້ໃຊ້</b><h3>ໃຊ້ແລ້ວຊ່ວຍຕັດສິນໃຈ</h3><p>ທົດສອບກັບ 20 ຄົນ ແລະພົບວ່າສາມາດໄປຈາກວິດີໂອ → ຂໍ້ມູນຮ້ານ → Map/Call/Message ໂດຍບໍ່ກັບໄປຄົ້ນ Social ຊ້ຳ.</p></article>
          <article><b>ການດຳເນີນງານ</b><h3>100 ຮ້ານທີ່ຮັກສາໄດ້</h3><p>ທີມສາມາດສ້າງ, ກວດ, ແກ້ ແລະຮັກສາຂໍ້ມູນຮ້ານໄດ້ໂດຍຕົ້ນທຶນ ແລະເວລາບໍ່ເກີນຂອບເຂດ.</p></article>
          <article><b>ລາຍຮັບ</b><h3>ມີການຈ່າຍ ບໍ່ແມ່ນພຽງຄຳວ່າສົນໃຈ</h3><p>ເຂົ້າຫາ 30 ຮ້ານ ແລະຕ້ອງມີຢ່າງໜ້ອຍ 3 ຮ້ານຈ່າຍ/ວາງມັດຈຳ ພ້ອມ 2 ຮ້ານເຊັນໜັງສືຢືນຢັນຄວາມຕັ້ງໃຈ.</p></article>
        </div>
      </section>

      <div className={styles.mvpReferenceDivider} id="mvp-reference"><span>ພາກລາຍລະອຽດອ້າງອີງ</span><h2>ສຳລັບ Product Owner, SA, Developer ແລະ QA</h2><p>ສ່ວນຕໍ່ໄປນີ້ໃຊ້ກວດລາຍການລະອຽດ. ຜູ້ອ່ານທີ່ຕ້ອງການພຽງພາບລວມສາມາດຂ້າມໄປຫາ “5 ຈຸດທົບທວນ” ໄດ້.</p></div>

      <section className={styles.documentArticleSection} id="mvp-priority">
        <span>A · PRIORITY POLICY</span><h2>ວິທີອ່ານ Must, Should, Later ແລະ Out</h2>
        <div className={styles.mvpPriorityGrid}>
          <article data-priority="Must"><b>MUST</b><h3>ຂາດບໍ່ໄດ້</h3><p>ຖ້າຂາດ ຈະທົດສອບຄຸນຄ່າຫຼັກບໍ່ໄດ້, ລະບົບບໍ່ປອດໄພ ຫຼື Pilot ດຳເນີນງານບໍ່ໄດ້.</p></article>
          <article data-priority="Should"><b>SHOULD</b><h3>ຄວນມີ ແຕ່ເລື່ອນໄດ້</h3><p>ຊ່ວຍໃຫ້ Pilot ດີຂຶ້ນ ແຕ່ຖ້າເວລາ ຫຼືງົບບໍ່ພໍ ສາມາດເລື່ອນໄດ້.</p></article>
          <article data-priority="Later"><b>LATER</b><h3>ເຮັດຫຼັງມີຫຼັກຖານ</h3><p>ລໍໃຫ້ຮູ້ປະລິມານວຽກ, ພຶດຕິກຳຜູ້ໃຊ້ ຫຼືຄວາມຕ້ອງການຈິງກ່ອນ.</p></article>
          <article data-priority="Out"><b>OUT</b><h3>ບໍ່ຢູ່ໃນສະບັບທຳອິດ</h3><p>ບໍ່ນຳໄປຄິດໄລ່ເວລາ, ງົບ ຫຼືເກນຮັບມອບ ຈົນກວ່າຈະອະນຸມັດໃໝ່.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-catalog">
        <span>B · SCOPE CATALOG</span><h2>31 ລາຍການລະອຽດສຳລັບອ້າງອີງ</h2>
        <p className={styles.documentQuestion}>ກົດ Filter ເພື່ອເບິ່ງສະເພາະລາຍການຂອງແຕ່ລະ Priority.</p>
        <div className={styles.mvpScopeFilters} role="tablist" aria-label="Filter MVP scope by priority">
          {(["All", "Must", "Should", "Later", "Out"] as const).map((value) => <button key={value} type="button" role="tab" aria-selected={priority === value} className={priority === value ? styles.mvpScopeFilterActive : ""} onClick={() => setPriority(value)}><b>{priorityLabels[value]}</b><span>{value === "All" ? scopeItems.length : counts(value)}</span></button>)}
        </div>
        <div className={styles.mvpScopeTable} role="table" aria-label="MVP scope catalog">
          <div role="row"><b>ID / PRIORITY</b><b>MILESTONE / CAPABILITY</b><b>ຂອບເຂດທີ່ຕ້ອງເຮັດ</b><b>ເຫດຜົນ</b><b>SOURCE</b></div>
          {visibleItems.map((item) => <div role="row" key={item.id}><div><strong>{item.id}</strong><span data-priority={item.priority}>{item.priority}</span></div><div><small>{item.milestone}</small><b>{item.capability}</b></div><p>{item.scope}</p><p>{item.reason}</p><code>{item.source}</code></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-manual">
        <span>C · MANUAL VS AUTOMATION</span><h2>ວຽກໃດໃຊ້ຄົນຈັດການໄປກ່ອນ ແລະວຽກໃດຈຶ່ງສ້າງລະບົບພາຍຫຼັງ</h2>
        <div className={styles.documentProse}><p>Validation Pilot ຕ້ອງບັນທຶກ time-per-place, support load, correction volume, source failure ແລະ report preparation time. ຂໍ້ມູນນີ້ຈະບອກວ່າຄວນ automate ຈຸດໃດ ບໍ່ແມ່ນຄາດເດົາກ່ອນເລີ່ມ.</p></div>
        <div className={styles.mvpManualTable} role="table" aria-label="Manual and automated scope"><div role="row"><b>PROCESS</b><b>M1 · MANUAL/CONCIERGE</b><b>M2+ · AUTOMATION</b><b>TRIGGER</b></div>{manualPlan.map(([process, manual, automated, trigger]) => <div role="row" key={process}><strong>{process}</strong><p>{manual}</p><p>{automated}</p><span>{trigger}</span></div>)}</div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-release">
        <span>D · RELEASE GATES</span><h2>ລາຍລະອຽດຈຸດກວດກ່ອນເປີດໃຫ້ຄົນທົ່ວໄປໃຊ້</h2>
        <div className={styles.mvpReleaseTable} role="table" aria-label="MVP release gates"><div role="row"><b>GATE</b><b>ຈຸດກວດ</b><b>PASS EVIDENCE</b><b>STOP / PIVOT CONDITION</b></div>{releaseGates.map(([id, gate, pass, stop]) => <div role="row" key={id}><strong>{id}</strong><b>{gate}</b><p>{pass}</p><em>{stop}</em></div>)}</div>
      </section>

      <section className={styles.documentArticleSection} id="mvp-change">
        <span>E · CHANGE CONTROL</span><h2>ຖ້າຈະເພີ່ມ Function ໃໝ່ ຕ້ອງຕັດສິນແນວໃດ</h2>
        <div className={styles.mvpChangeFormula}><b>ເຂົ້າ M1 ໄດ້ ເມື່ອ</b><code>(ພິສູດ Core Hypothesis ຫຼືປິດ Release Blocker) + (ບໍ່ມີ Manual Fallback ທີ່ປອດໄພ) + (Dependency/Test/Cost ຊັດ) + (Product Owner ອະນຸມັດ)</code><p>ຖ້າບໍ່ຄົບ 4 ເງື່ອນໄຂ ໃຫ້ຢູ່ Should, Later ຫຼື Out ຕາມຫຼັກຖານ.</p></div>
        <ol className={styles.mvpChangeRules}>{changeRules.map(([id, title, detail]) => <li key={id}><b>{id}</b><div><strong>{title}</strong><p>{detail}</p></div></li>)}</ol>
      </section>

      <section className={styles.documentArticleSection} id="mvp-review">
        <span>08 · REVIEW REQUIRED</span><h2>5 ຈຸດທີ່ຕ້ອງຕັດສິນກ່ອນ PRO-03 ຂຶ້ນເປັນ 1.0</h2>
        <ol className={styles.saReviewChecklist}>
          <li><b>Pilot Inventory:</b><p>ຢືນຢັນ 100 Places, ວຽງຈັນ, 2 ໝວດ “ອາຫານ ແລະຄາເຟ” ເປັນ M1 Baseline ຫຼືຈະປັບຈຳນວນ/ເຂດ/ໝວດ?</p></li>
          <li><b>Supported Social Sources:</b><p>ຈະເລີ່ມ TikTok, Facebook ແລະ YouTube ພ້ອມກັນ ຫຼືຈຳກັດ platform ຕາມຜົນ Technical/Rights Spike?</p></li>
          <li><b>Revenue Scope:</b><p>ຢືນຢັນ Founding Partner + Basic Performance Summary ເປັນ Must; Sponsored Campaign ເປັນ Should ແລະດຳເນີນງານແບບ Manual ໃນ Pilot.</p></li>
          <li><b>Manual Operation Boundary:</b><p>ຢືນຢັນ Correction, verification, source recheck, partner onboarding/payment ແລະ report delivery ເຮັດແບບ Concierge ກ່ອນ; Automation ເຂົ້າ M2 ຫຼັງຮູ້ volume/cost.</p></li>
          <li><b>Public MVP Gate:</b><p>ຢືນຢັນວ່າ G3 ຕ້ອງມີ 20 user tests, 15 owner interviews, 30 sales outreach, 3 paid/deposit + 2 LOI, supply workflow ຊ້ຳໄດ້ ແລະບໍ່ເກີນ stop-loss ກ່ອນອະນຸຍາດ M2.</p></li>
        </ol>
      </section>

      <aside className={styles.draftApprovalGate}><div><span>ຮ່າງສຳລັບທົບທວນ</span><h2>PRO-03 · MVP Scope 0.2</h2><p>ສະບັບ 0.2 ຮຽບຮຽງໃໝ່ໃຫ້ເຫັນຈຸດປະສົງ, ພາບລວມສະບັບທຳອິດ, ສິ່ງທີ່ຜູ້ໃຊ້ເຮັດໄດ້, ສິ່ງທີ່ທີມຕ້ອງສ້າງ ແລະສິ່ງທີ່ຍັງບໍ່ສ້າງ. ລາຍການທາງເຕັກນິກຖືກຍ້າຍໄປພາກອ້າງອີງ.</p></div><ul><li>ຈຸດປະສົງ — ອະທິບາຍແລ້ວ</li><li>ຂອບເຂດສະບັບທຳອິດ — ອະທິບາຍແລ້ວ</li><li>ສິ່ງທີ່ບໍ່ເຮັດ — ອະທິບາຍແລ້ວ</li><li>31 ລາຍການ — ຢູ່ພາກອ້າງອີງ</li><li>5 ຈຸດທົບທວນ — ລໍການອະນຸມັດ</li></ul></aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/system-analysis`}><small>← ເອກະສານຕົ້ນທາງ</small><strong>System Analysis 1.0</strong></a>
        <a href={`${basePath}/documents/requirements-acceptance`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>Requirements & Acceptance Criteria</strong></a>
      </nav>
    </article>
  );
}
