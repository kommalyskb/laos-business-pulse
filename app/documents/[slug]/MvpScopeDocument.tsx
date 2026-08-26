"use client";

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
  { id: "MVP-001", priority: "Must", milestone: "M1", capability: "Pilot inventory", scope: "ສ້າງ inventory ເປັນ 3 ຂັ້ນ 30 → 60 → 100 Place Records ໃນວຽງຈັນ ຈາກ 2 ໝວດທຳອິດ: ຮ້ານອາຫານ ແລະຄາເຟ; Required Field, Map, Contact, Source ແລະ Checked Date ຕ້ອງຄົບຕາມ policy.", reason: "ການແບ່ງ 30 → 60 → 100 ຊ່ວຍກວດ workflow ກ່ອນລົງແຮງຄົບ 100; inventory ຕ້ອງພໍທົດສອບ Search, Feed ແລະຄຸນຄ່າຕໍ່ຜູ້ໃຊ້.", source: "BUS-04 · PRO-01 · PRO-03 Decision 01" },
  { id: "MVP-002", priority: "Must", milestone: "M0/M1", capability: "Responsive Guest Web", scope: "Guest ເຂົ້າ Feed, Search, Place ແລະ Action ໄດ້ໃນ Mobile Web/PWA ໂດຍບໍ່ສະໝັກ Account.", reason: "ຫຼຸດອຸປະສັກກ່ອນພິສູດວ່າ Core Journey ມີຄຸນຄ່າ.", source: "USR-01—04 · NFR-01" },
  { id: "MVP-003", priority: "Must", milestone: "M0", capability: "Admin Access & Audit", scope: "Admin ແຕ່ລະຄົນໃຊ້ Account ຕົນເອງ; authorization ແລະ Audit Log ຕ້ອງມາກ່ອນ business mutation.", reason: "ຂໍ້ມູນ Public ຕ້ອງຕາມຮອຍຜູ້ປ່ຽນ ແລະເຫດຜົນໄດ້.", source: "ADM-01 · PRO-02 WP-01" },
  { id: "MVP-004", priority: "Must", milestone: "M0/M1", capability: "Place Data Admin", scope: "ສ້າງ/ແກ້ Place Draft, validate Required Field, ເຕືອນ Duplicate, ກວດ Publish Readiness ແລະ Publish/Suspend/Archive.", reason: "Admin workflow ແມ່ນກົນໄກຜະລິດ inventory ບໍ່ແມ່ນ back-office ເສີມ.", source: "ADM-01 · PRO-02 WP-02/04" },
  { id: "MVP-005", priority: "Must", milestone: "M0/M1", capability: "Content Source Curation", scope: "TikTok ແລະ Facebook ເປັນ Source ຫຼັກ; YouTube ເປັນ Source ເສີມ. ລະບົບລົງທະບຽນ, validate, ອ່ານ metadata ທີ່ອະນຸຍາດ, ເຊື່ອມ Source ກັບ Place ແລະ Publish ພ້ອມ Creator attribution; ທຸກ Source ຕ້ອງມີ External Link fallback.", reason: "ຈຳກັດ Source ຫຼັກເພື່ອຄວບຄຸມ Pilot; Platform ຕ້ອງຊີ້ກັບຫາຕົ້ນສະບັບ ແລະບໍ່ Re-host ວິດີໂອ.", source: "TRU-01 · PRO-02 WP-03 · PRO-03 Decision 02" },
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
  ["G3", "Validation evidence", "ທົດສອບ 20 ຄົນ, ສຳພາດ owner 15 ຮ້ານ, ເຂົ້າຫາ 30 ຮ້ານ; ມີຢ່າງໜ້ອຍ 3 paid/deposit + 2 LOI; supply workflow ຊ້ຳໄດ້; ລາຍຈ່າຍທົດລອງບໍ່ເກີນ 25 ລ້ານກີບ ແລະຕິດຕາມຄ່າຄອງຊີບຜູ້ກໍ່ຕັ້ງແຍກຕ່າງຫາກ.", "ມີພຽງ verbal interest, user ກັບໄປ social search, data/right cost ຮັບບໍ່ໄດ້, ວຽກ Manual ເກີນກຳລັງ ຫຼືລາຍຈ່າຍທົດລອງເກີນ 25 ລ້ານກີບ."],
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
  const counts = (value: Priority) => scopeItems.filter((item) => item.priority === value).length;

  return (
    <article className={`${styles.detailBody} ${styles.formalDocument}`}>
      <header className={styles.formalDocumentHeader}>
        <p>PRO-03 · PRODUCT &amp; ANALYSIS</p>
        <h1>MVP Scope &amp; Prioritization</h1>
        <h2>ຂອບເຂດ ແລະລຳດັບຄວາມສຳຄັນຂອງລະບົບສະບັບທຳອິດ</h2>
        <div className={styles.formalStatus}>ສະບັບ 1.0 · ອະນຸມັດແລ້ວ · 26 ສິງຫາ 2026</div>
      </header>

      <section className={styles.formalSection} id="mvp-control">
        <h2><span>1.</span> ຂໍ້ມູນຄວບຄຸມເອກະສານ</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
          <tr><th>ລະຫັດເອກະສານ</th><td>PRO-03</td><th>ສະບັບ</th><td>1.0</td></tr>
          <tr><th>ຊື່ເອກະສານ</th><td>MVP Scope &amp; Prioritization</td><th>ສະຖານະ</th><td>ອະນຸມັດແລ້ວ</td></tr>
          <tr><th>ເຈົ້າຂອງເອກະສານ</th><td>Product Owner</td><th>ວັນທີອະນຸມັດ</th><td>26 ສິງຫາ 2026</td></tr>
          <tr><th>ເອກະສານຕົ້ນທາງ</th><td colSpan={3}>PRO-01 1.0 · PRO-02 1.0 · BUS-04 1.0 · BUS-06 1.0</td></tr>
        </tbody></table></div>
        <h3>1.1 ປະຫວັດການແກ້ໄຂ</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ສະບັບ</th><th>ວັນທີ</th><th>ລາຍລະອຽດ</th><th>ສະຖານະ</th></tr></thead><tbody>
          <tr><td>0.1</td><td>25 ສິງຫາ 2026</td><td>ຮ່າງຂອບເຂດ ແລະລາຍການຈັດລຳດັບຄັ້ງທຳອິດ</td><td>ຍົກເລີກ</td></tr>
          <tr><td>0.2</td><td>26 ສິງຫາ 2026</td><td>ເພີ່ມ Release Gate, Manual Boundary ແລະ Decision Record</td><td>ທົບທວນແລ້ວ</td></tr>
          <tr><td>1.0</td><td>26 ສິງຫາ 2026</td><td>ອະນຸມັດ 5 ຂໍ້ຕັດສິນ ແລະກຳນົດເປັນ Scope Baseline</td><td>ອະນຸມັດ</td></tr>
        </tbody></table></div>
      </section>

      <nav className={styles.formalToc} aria-label="ສາລະບານ PRO-03"><h2>ສາລະບານ</h2><ol>
        <li><a href="#mvp-control">ຂໍ້ມູນຄວບຄຸມເອກະສານ</a></li>
        <li><a href="#mvp-purpose">ຈຸດປະສົງ ແລະຜູ້ນຳໃຊ້</a></li>
        <li><a href="#mvp-definition">ຄຳນິຍາມ ແລະກົດການຈັດລຳດັບ</a></li>
        <li><a href="#mvp-baseline">ຂອບເຂດພື້ນຖານທີ່ອະນຸມັດ</a></li>
        <li><a href="#mvp-catalog">ບັນຊີຂອບເຂດ 31 ລາຍການ</a></li>
        <li><a href="#mvp-milestones">ລຳດັບການພັດທະນາ</a></li>
        <li><a href="#mvp-manual">ຂອບເຂດວຽກ Manual ແລະ Automation</a></li>
        <li><a href="#mvp-release">ເງື່ອນໄຂການປ່ອຍລະບົບ</a></li>
        <li><a href="#mvp-change">ການຄວບຄຸມການປ່ຽນ Scope</a></li>
        <li><a href="#mvp-decisions">ບັນທຶກຂໍ້ຕັດສິນ</a></li>
      </ol></nav>

      <section className={styles.formalSection} id="mvp-purpose">
        <h2><span>2.</span> ຈຸດປະສົງ ແລະຜູ້ນຳໃຊ້ເອກະສານ</h2>
        <p>PRO-03 ໃຊ້ກຳນົດວ່າ Function ໃດຕ້ອງສ້າງໃນລະບົບສະບັບທຳອິດ, Function ໃດໃຊ້ຄົນດຳເນີນງານໄປກ່ອນ, Function ໃດເລື່ອນໄປພາຍຫຼັງ ແລະ Function ໃດບໍ່ຢູ່ໃນຂອບເຂດ. ເອກະສານນີ້ເປັນ Scope Baseline: ການເພີ່ມ ຫຼືຖອນລາຍການຕ້ອງຜ່ານຂັ້ນຕອນໃນຂໍ້ 9.</p>
        <p>Product Owner ໃຊ້ສຳລັບຄວບຄຸມຂອບເຂດ; SA ໃຊ້ກວດ Traceability; Developer ແລະ Designer ໃຊ້ຈັດລຳດັບການສົ່ງມອບ; QA ໃຊ້ກຳນົດຂອບເຂດ Test; ຜູ້ສະໜັບສະໜູນໃຊ້ກວດວ່າງົບແລະເວລາຖືກໃຊ້ກັບສິ່ງທີ່ອະນຸມັດ.</p>
        <div className={styles.formalNote}><strong>ຫຼັກການສຳຄັນ:</strong> ຄຳວ່າ MVP ໃນເອກະສານນີ້ໝາຍເຖິງລະບົບສະບັບນ້ອຍທີ່ສຸດແຕ່ໃຊ້ທົດສອບກັບຄົນຈິງໄດ້ຢ່າງປອດໄພ. ບໍ່ແມ່ນ Demo ແລະບໍ່ແມ່ນ Platform ສະບັບສົມບູນ.</div>
      </section>

      <section className={styles.formalSection} id="mvp-definition">
        <h2><span>3.</span> ຄຳນິຍາມ ແລະກົດການຈັດລຳດັບ</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ລະດັບ</th><th>ຄວາມໝາຍ</th><th>ເງື່ອນໄຂນຳໃຊ້</th><th>ຈຳນວນ</th></tr></thead><tbody>
          <tr><td><strong>Must</strong></td><td>ຂາດບໍ່ໄດ້</td><td>ຖ້າຂາດ ຈະທົດສອບ Core Journey ບໍ່ໄດ້, ກະທົບ Security/Trust ຫຼື Pilot ດຳເນີນບໍ່ໄດ້.</td><td>{counts("Must")}</td></tr>
          <tr><td><strong>Should</strong></td><td>ຄວນມີ ແຕ່ເລື່ອນໄດ້</td><td>ຊ່ວຍໃຫ້ Pilot ດີຂຶ້ນ ແຕ່ການເລື່ອນບໍ່ເຮັດໃຫ້ Core Journey ເສຍ.</td><td>{counts("Should")}</td></tr>
          <tr><td><strong>Later</strong></td><td>ເຮັດຫຼັງມີຫຼັກຖານ</td><td>ຕ້ອງລໍຂໍ້ມູນດ້ານປະລິມານວຽກ, ຜູ້ໃຊ້, ລາຍຮັບ ຫຼືຕົ້ນທຶນກ່ອນ.</td><td>{counts("Later")}</td></tr>
          <tr><td><strong>Out</strong></td><td>ບໍ່ຢູ່ໃນ MVP</td><td>ຫ້າມນຳໄປຄິດໄລ່ເວລາ, ງົບ ຫຼື Acceptance Criteria ຈົນກວ່າຈະອະນຸມັດ Scope Change.</td><td>{counts("Out")}</td></tr>
        </tbody></table></div>
      </section>

      <section className={styles.formalSection} id="mvp-baseline">
        <h2><span>4.</span> ຂອບເຂດພື້ນຖານທີ່ອະນຸມັດ</h2>
        <p>“ພ້ອມໄປ” ສະບັບທຳອິດແມ່ນ Mobile Web/PWA ສຳລັບຄົນທີ່ຊອກຫາຮ້ານອາຫານ ຫຼືຄາເຟໃນວຽງຈັນ. ຜູ້ໃຊ້ສາມາດເບິ່ງ Feed ວິດີໂອ, ຄົ້ນຫາ, ກວດຂໍ້ມູນ Place ແລະກົດ Map, Call ຫຼື Message ໄປຫາຮ້ານ. ຜູ້ໃຊ້ບໍ່ຕ້ອງສ້າງ Account.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
          <tr><th>ພື້ນທີ່ Pilot</th><td>ວຽງຈັນ</td><th>ໝວດທຳອິດ</th><td>ຮ້ານອາຫານ ແລະຄາເຟ</td></tr>
          <tr><th>Inventory</th><td>30 → 60 → 100 Place Records</td><th>Core Journey</th><td>Discover → Decide → Map/Call/Message</td></tr>
          <tr><th>Content Source</th><td>TikTok/Facebook ຫຼັກ; YouTube ເສີມ</td><th>ວິທີນຳໃຊ້</th><td>Link, Official Embed, Attribution ແລະ External Link fallback</td></tr>
          <tr><th>ທຸລະກຳ</th><td colSpan={3}>ບໍ່ມີ Booking, Order ຫຼື Payment; ຜູ້ໃຊ້ຕິດຕໍ່ຮ້ານໂດຍກົງ.</td></tr>
        </tbody></table></div>
        <h3>4.1 ຜົນທີ່ຜູ້ໃຊ້ຕ້ອງໄດ້ຮັບ</h3>
        <ol className={styles.formalNumberList}><li><strong>ຄົ້ນພົບ:</strong> ເບິ່ງ Feed ເຕັມຈໍ ຫຼືຄົ້ນຫາຕາມຊື່, ໝວດ, ເຂດ ແລະຊ່ວງລາຄາ.</li><li><strong>ຕັດສິນໃຈ:</strong> ເບິ່ງທີ່ຢູ່, Map, Contact, Hours, Price, Source, Creator ແລະ Checked Date ໃນ Place Page ດຽວ.</li><li><strong>ລົງມື:</strong> ກົດ Map, Call ຫຼື Message ໄປຫາປາຍທາງຖືກຕ້ອງ.</li></ol>
        <h3>4.2 ຂອບເຂດທີ່ຫ້າມເຮັດໃນ MVP</h3>
        <p>ບໍ່ສ້າງ Booking/Payment, Native iOS/Android, User Social Account, On-platform Review/Rating, Creator Marketplace ຫຼື AI Recommendation. ຫ້າມ Download, Copy, Scrape ຫຼື Re-host ວິດີໂອ/Metadata ເກີນສິດທີ່ Source ອະນຸຍາດ.</p>
      </section>

      <section className={styles.formalSection} id="mvp-catalog">
        <h2><span>5.</span> ບັນຊີຂອບເຂດ 31 ລາຍການ</h2>
        <p>ຕາຕະລາງນີ້ແມ່ນລາຍການອ້າງອີງທາງການ. ທຸກລາຍການສະແດງພ້ອມກັນເພື່ອໃຫ້ກວດ, ພິມ ແລະປຽບທຽບໄດ້ໂດຍບໍ່ຕ້ອງໃຊ້ Filter.</p>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Priority</th><th>Milestone</th><th>Capability</th><th>ຂອບເຂດ</th><th>ເຫດຜົນ</th><th>ອ້າງອີງ</th></tr></thead><tbody>
          {scopeItems.map((item) => <tr key={item.id}><td><code>{item.id}</code></td><td><span className={styles.formalPriority} data-priority={item.priority}>{priorityLabels[item.priority]}</span></td><td>{item.milestone}</td><td><strong>{item.capability}</strong></td><td>{item.scope}</td><td>{item.reason}</td><td><code>{item.source}</code></td></tr>)}
        </tbody></table></div>
      </section>

      <section className={styles.formalSection} id="mvp-milestones">
        <h2><span>6.</span> ລຳດັບການພັດທະນາ</h2>
        <p>ແຕ່ລະ Milestone ຕ້ອງສົ່ງຜົນທີ່ທົດສອບໄດ້ກ່ອນເລື່ອນໄປຂັ້ນຕໍ່ໄປ. M2 ແລະ M3 ບໍ່ແມ່ນຄຳສັນຍາວ່າຈະສ້າງ; ຕ້ອງອີງຫຼັກຖານຈາກ Pilot.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Milestone</th><th>ສະຖານະ/ໄລຍະ</th><th>ຜົນສົ່ງມອບ</th></tr></thead><tbody>{milestones.map(([id, name, status, detail]) => <tr key={id}><td><code>{id}</code></td><td><strong>{name}</strong></td><td>{status}</td><td>{detail}</td></tr>)}</tbody></table></div>
      </section>

      <section className={styles.formalSection} id="mvp-manual">
        <h2><span>7.</span> ຂອບເຂດວຽກ Manual ແລະ Automation</h2>
        <p>ໃນ Validation Pilot ໃຫ້ໃຊ້ຄົນດຳເນີນວຽກທີ່ຍັງບໍ່ຮູ້ປະລິມານ ຫຼື Exception ຊັດເຈນ. ຕ້ອງບັນທຶກ time-per-place, support load, correction volume, source failure ແລະ report preparation time. ຖ້າວຽກ Manual ລວມເກີນ 20 ຊົ່ວໂມງຕໍ່ອາທິດຕິດຕໍ່ກັນ 2 ອາທິດ ໃຫ້ຢຸດເພີ່ມ Inventory ຊົ່ວຄາວ ແລະທົບທວນ Automation.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ຂັ້ນຕອນ</th><th>M1: Manual/Concierge</th><th>M2+: Automation</th><th>ເງື່ອນໄຂໃຫ້ສ້າງ</th></tr></thead><tbody>{manualPlan.map(([process, manual, automated, trigger]) => <tr key={process}><td><strong>{process}</strong></td><td>{manual}</td><td>{automated}</td><td>{trigger}</td></tr>)}</tbody></table></div>
      </section>

      <section className={styles.formalSection} id="mvp-release">
        <h2><span>8.</span> ເງື່ອນໄຂການປ່ອຍລະບົບ</h2>
        <p>ການຂຽນ Code ສຳເລັດບໍ່ເທົ່າກັບການຜ່ານ Gate. ທຸກ Gate ຕ້ອງມີຫຼັກຖານຕາມຕາຕະລາງ; ຖ້າພົບ Stop/Pivot Condition ຕ້ອງຢຸດຂະຫຍາຍ Scope ແລະບັນທຶກຂໍ້ຕັດສິນ.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Gate</th><th>ຈຸດກວດ</th><th>ຫຼັກຖານທີ່ຖືວ່າຜ່ານ</th><th>ເງື່ອນໄຂຢຸດ/ປັບ</th></tr></thead><tbody>{releaseGates.map(([id, gate, pass, stop]) => <tr key={id}><td><code>{id}</code></td><td><strong>{gate}</strong></td><td>{pass}</td><td>{stop}</td></tr>)}</tbody></table></div>
      </section>

      <section className={styles.formalSection} id="mvp-change">
        <h2><span>9.</span> ການຄວບຄຸມການປ່ຽນ Scope</h2>
        <div className={styles.formalDecision}><strong>Function ໃໝ່ເຂົ້າ M1 ໄດ້ ເມື່ອຄົບ 4 ເງື່ອນໄຂ:</strong><p>(1) ພິສູດ Core Hypothesis ຫຼືປິດ Release Blocker; (2) ບໍ່ມີ Manual Fallback ທີ່ປອດໄພ; (3) Dependency, Test, Cost ແລະ Time ຊັດເຈນ; ແລະ (4) Product Owner ອະນຸມັດ.</p></div>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ຂັ້ນ</th><th>ຄຳຖາມບັງຄັບ</th><th>ລາຍລະອຽດ</th></tr></thead><tbody>{changeRules.map(([id, title, detail]) => <tr key={id}><td>{id}</td><td><strong>{title}</strong></td><td>{detail}</td></tr>)}</tbody></table></div>
      </section>

      <section className={styles.formalSection} id="mvp-decisions">
        <h2><span>10.</span> ບັນທຶກຂໍ້ຕັດສິນທີ່ອະນຸມັດ</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ຂໍ້ຕັດສິນ</th><th>ລາຍລະອຽດທີ່ມີຜົນບັງຄັບ</th></tr></thead><tbody>
          <tr><td>DEC-01</td><td><strong>Pilot Inventory</strong></td><td>ວຽງຈັນ; ຮ້ານອາຫານ/ຄາເຟ; 30 → 60 → 100 Places. Required Field, Map, Contact, Source ແລະ Checked Date ຕ້ອງຄົບ.</td></tr>
          <tr><td>DEC-02</td><td><strong>Social Sources</strong></td><td>TikTok/Facebook ເປັນ Source ຫຼັກ; YouTube ເປັນ Source ເສີມ. ໃຊ້ Link/Official Embed/Attribution/Fallback; ຫ້າມ Re-host ໂດຍບໍ່ມີສິດ.</td></tr>
          <tr><td>DEC-03</td><td><strong>Revenue Scope</strong></td><td>Founding Partner 200,000 ກີບ/ເດືອນ ແລະ Basic Performance Summary ເປັນ Must. Sponsored Campaign ເປັນ Should/Manual; 1,000,000 ກີບຍັງເປັນລາຄາທົດສອບ.</td></tr>
          <tr><td>DEC-04</td><td><strong>Manual Boundary</strong></td><td>Correction, verification, source recheck, partner onboarding/payment, report ແລະ sponsored placement ເຮັດແບບ Manual. ເມື່ອເກີນ 20 ຊົ່ວໂມງ/ອາທິດ 2 ອາທິດຕິດຕໍ່ກັນ ຕ້ອງທົບທວນ Automation.</td></tr>
          <tr><td>DEC-05</td><td><strong>Public MVP Gate</strong></td><td>100 Places; 20 user tests; 15 owner interviews; 30 sales outreach; 3 paid/deposit + 2 LOI; Core Journey/Trust/Supply ຜ່ານ; ລາຍຈ່າຍທົດລອງບໍ່ເກີນ 25 ລ້ານກີບ. ຄ່າຄອງຊີບຜູ້ກໍ່ຕັ້ງຕິດຕາມແຍກ; ຜົນແມ່ນ Go, Pivot ຫຼື No-go.</td></tr>
        </tbody></table></div>
        <div className={styles.formalApproval}><strong>ສະຖານະການອະນຸມັດ</strong><p>ຂໍ້ຕັດສິນ DEC-01 ຫາ DEC-05 ແມ່ນ Scope Baseline ຂອງ PRO-03 ສະບັບ 1.0. ການປ່ຽນແປງຕ້ອງປະຕິບັດຕາມຂໍ້ 9 ແລະອັບເດດ Traceability ໃນ PRO-02/PRO-04.</p></div>
      </section>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/system-analysis`}><small>← ເອກະສານຕົ້ນທາງ</small><strong>System Analysis 1.0</strong></a>
        <a href={`${basePath}/documents/requirements-acceptance`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>Requirements & Acceptance Criteria</strong></a>
      </nav>
    </article>
  );
}
