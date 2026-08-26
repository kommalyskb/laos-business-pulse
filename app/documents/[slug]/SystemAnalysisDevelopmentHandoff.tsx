import styles from "../documents.module.css";
import { systemFunctionCatalog } from "./SystemAnalysisFunctionCatalog";

type WorkPackage = {
  id: string;
  title: string;
  goal: string;
  dependsOn: string;
  functionIds: string[];
  entities: string;
  deliverables: string[];
  entry: string;
  exit: string;
  evidence: string;
  parallel: string;
};

const range = (prefix: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => `${prefix}${String(from + index).padStart(3, "0")}`);

const workPackages: WorkPackage[] = [
  {
    id: "WP-01", title: "Access & Audit Foundation", goal: "ສ້າງຂອບເຂດສິດ Admin ແລະຫຼັກຖານການປ່ຽນຂໍ້ມູນ ກ່ອນເປີດໃຫ້ Module ອື່ນຂຽນຂໍ້ມູນ.",
    dependsOn: "Logical Data Model, Error Contract ແລະ Admin Identity Policy", functionIds: range("FN-ADM-", 1, 4),
    entities: "AdminUser, AdminSession, AuditLog", deliverables: ["Admin sign-in/session ແລະ authorization guard", "Audit writer ທີ່ບັນທຶກ actor, before/after, reason, trace ID", "ການທົດສອບວ່າ unauthorized request ປ່ຽນຂໍ້ມູນບໍ່ໄດ້"],
    entry: "ອະນຸມັດ identity policy, session lifetime ແລະລາຍການ action ທີ່ບັງຄັບ audit.", exit: "Admin ແຕ່ລະຄົນໃຊ້ account ຕົນເອງ; mutation ສຳຄັນບໍ່ສາມາດ commit ຖ້າ audit ລົ້ມ.",
    evidence: "Unit test authorization + integration test business write/audit atomicity + security log ທີ່ບໍ່ເປີດເຜີຍ secret.", parallel: "Frontend ສາມາດເຮັດ sign-in/error state ຈາກ contract; ຫ້າມເລີ່ມ mutation ອື່ນກ່ອນ guard ແລະ audit interface ຄົງທີ່.",
  },
  {
    id: "WP-02", title: "Place Draft Core", goal: "ໃຫ້ Admin ສ້າງ ແລະປັບ Place Draft ທີ່ມີ canonical identity, required data ແລະ duplicate warning.",
    dependsOn: "WP-01 + reference data for Category/Area/Price", functionIds: ["FN-PADM-001", "FN-PADM-002", "FN-PADM-003", "FN-PADM-004", "FN-PADM-008"],
    entities: "Place, PlaceContact, PlaceCategory, Category, Area, PriceRange, DuplicateCandidate", deliverables: ["Create/update draft service", "Required-field validator", "Duplicate candidate search", "Admin draft form ທີ່ບໍ່ສ້າງ Place ຊ້ຳແບບງຽບໆ"],
    entry: "WP-01 ຜ່ານ; field dictionary ແລະ canonical-place rule ຖືກຢືນຢັນ.", exit: "Draft ຖືກສ້າງ/ແກ້ໄຂພ້ອມ audit; validator ບອກ field ທີ່ຂາດ; duplicate candidate ຖືກເຕືອນແຕ່ບໍ່ merge ອັດຕະໂນມັດ.",
    evidence: "Schema constraint test + unit test validation/duplicate scoring + integration test create/edit draft + audit record.", parallel: "Reference-data seed, admin form ແລະ duplicate test fixture ເຮັດຄູ່ຂະໜານໄດ້ຫຼັງ contract ຄົງທີ່.",
  },
  {
    id: "WP-03", title: "Content Source Core", goal: "ຮັບ social review link, ກວດ URL/metadata, ອ້າງອີງ creator ແລະເຊື່ອມ Source ກັບ Canonical Place.",
    dependsOn: "WP-01 + WP-02 minimal Place Draft + external-platform spike", functionIds: range("FN-SRC-", 1, 5),
    entities: "ContentSource, Creator, SourceCheck, Place, AuditLog", deliverables: ["Register/validate/read permitted metadata", "Link Source to Place", "Publish/unpublish Source gate", "Fallback contract ໂດຍບໍ່ download ຫຼື re-host ວິດີໂອ"],
    entry: "ຮູ້ policy ຂອງແຕ່ລະ platform, URL normalization ແລະ metadata ທີ່ອະນຸຍາດໃຫ້ເກັບ.", exit: "Source ຊ້ຳຖືກປະຕິເສດ; validation ແຍກ invalid/temporary; Source ບໍ່ Published ຈົນກວ່າ attribution ແລະ Place link ຄົບ.",
    evidence: "Contract test ຕໍ່ platform adapter + fixture URLs + integration test source lifecycle + copyright/attribution checklist.", parallel: "Platform adapters ແຍກເຮັດໄດ້; ແຕ່ຕ້ອງໃຊ້ availability classification ແລະ normalized result ດຽວກັນ.",
  },
  {
    id: "WP-04", title: "Publish & Public Place", goal: "ປ່ຽນ Place/Source ທີ່ກວດຄົບໃຫ້ເປັນ public canonical page ພ້ອມ trust, freshness ແລະ contact action.",
    dependsOn: "WP-01, WP-02, WP-03", functionIds: ["FN-PADM-005", "FN-PADM-009", "FN-PADM-010", ...range("FN-PLC-", 1, 4)],
    entities: "Place, ContentSource, Verification, PlaceRedirect, Campaign, FreshnessStatus", deliverables: ["Publish-readiness evaluator", "Place publish/suspend/archive command", "Canonical Place detail query", "Independent Trust/Freshness/Partner/Sponsored labels", "Contact-action builder ແລະ redirect ຈາກ merged slug"],
    entry: "Place/Source state machine, required fields, trust-label rules ແລະ public response contract ຄົງທີ່.", exit: "ມີພຽງ Published Place ທີ່ public ເຫັນ; label ບໍ່ປະປົນ; suspended/archived ບໍ່ຮົ່ວໄປ search/feed contract.",
    evidence: "Publish-gate decision table + state-transition tests + public authorization tests + canonical redirect E2E.", parallel: "Public UI ໃຊ້ fixture ຈາກ approved PlaceDetail contract; backend publish/query ເຮັດຄູ່ຂະໜານໄດ້.",
  },
  {
    id: "WP-05", title: "Discovery & Search", goal: "ໃຫ້ Guest ຄົ້ນພົບ Published Place ຜ່ານ full-screen Feed, Search ແລະ Launch Filters ໂດຍບໍ່ພົບ data ທີ່ບໍ່ມີສິດ.",
    dependsOn: "WP-04 public eligibility contract; analytics sink ສາມາດເປັນ no-op ຊົ່ວຄາວ", functionIds: [...range("FN-FEED-", 1, 5), ...range("FN-SRCH-", 1, 5)],
    entities: "Place, ContentSource, Category, Area, Campaign, SearchDocument", deliverables: ["Eligible feed selection + cursor pagination", "Full-screen feed item/fallback", "Lao search normalization", "Category/Area/Price filter", "Empty-result guidance ແລະ sponsored label"],
    entry: "WP-04 ຜ່ານ; CON-01 search vocabulary ແລະ ordering tie-breaker ຖືກກຳນົດ.", exit: "Feed/Search ບໍ່ມີ Draft/Suspended/Unavailable; cursor ບໍ່ຊ້ຳ; empty state ມີທາງອອກ; media failure ບໍ່ຂັດຂວາງ Place journey.",
    evidence: "Query eligibility tests + pagination property tests + Lao keyword fixtures + responsive/accessibility E2E + fallback test.", parallel: "Feed UI, Search UI ແລະ query service ແຍກເຮັດໄດ້ຈາກ shared response contracts.",
  },
  {
    id: "WP-06", title: "Actions & Analytics Capture", goal: "ໃຫ້ Guest ເປີດ Map/Call/Message, Save/Share ແລະບັນທຶກ Decision Intent ແບບ anonymous ໂດຍບໍ່ອ້າງເປັນຍອດຂາຍ.",
    dependsOn: "WP-04 PlaceDetail/actions; consent policy and event taxonomy", functionIds: [...range("FN-ACT-", 1, 5), ...range("FN-ANA-", 1, 5)],
    entities: "AnalyticsConsent, AnonymousSession, AnalyticsEvent, DecisionIntent, Place", deliverables: ["Map/Call/Message with fallback", "Device-local save + canonical share", "Consent/session/event collector", "Deduped Decision Intent ແລະ event validation"],
    entry: "Action target normalization, consent modes, event names ແລະ dedupe key ຖືກອະນຸມັດ.", exit: "Core journey ໃຊ້ໄດ້ເມື່ອປະຕິເສດ optional analytics; event ບໍ່ມີ PII ເກີນຈຳເປັນ; action ເປີດປາຍທາງຖືກຕ້ອງ.",
    evidence: "Device/deep-link matrix + consent tests + event schema tests + dedupe/concurrency tests + QA event log ທຽບກັບ user action.", parallel: "Client action adapters ແລະ event collector ເຮັດຄູ່ຂະໜານໄດ້; event failure ຫ້າມ block action.",
  },
  {
    id: "WP-07", title: "Correction & Place Lifecycle", goal: "ຮັບ Correction/Takedown evidence, ຈັດ queue, ຕັດສິນ ແລະ suspend/archive Place ໂດຍຮັກສາ public-data integrity.",
    dependsOn: "WP-01, WP-02, WP-04", functionIds: ["FN-PADM-006", "FN-PADM-007", ...range("FN-REQ-", 1, 6)],
    entities: "CorrectionRequest, CorrectionEvidence, TakedownRequest, Place, AuditLog", deliverables: ["Request intake/acknowledgement/queue", "Evidence review and decision", "Approved correction application", "Suspend/archive Place ພ້ອມເຫດຜົນ"],
    entry: "SLA, urgency, evidence sufficiency ແລະ suspension/archive rules ຄົງທີ່.", exit: "Public data ບໍ່ປ່ຽນກ່ອນ approval; Needs Evidence ຢຸດ SLA; suspend/archive ຖອນ Place ຈາກ Feed/Search ແຕ່ຮັກສາປະຫວັດ.",
    evidence: "SLA clock tests + evidence/decision table + transaction rollback test + suspend/archive visibility E2E.", parallel: "Request UI/queue ເຮັດຈາກ workflow fixture; correction apply ຕ້ອງຮຽກ Place validation contract ດຽວກັນ.",
  },
  {
    id: "WP-08", title: "Data Quality & Source Recovery", goal: "ກວດຄວາມສົດຂອງ Place/Source, retry ຄວາມລົ້ມຊົ່ວຄາວ ແລະສ້າງ maintenance queue ທີ່ Admin ຈັດການໄດ້.",
    dependsOn: "WP-03, WP-04, WP-07 state/error contracts", functionIds: ["FN-SRC-006", "FN-SRC-007", ...range("FN-DQ-", 1, 6)],
    entities: "SourceCheck, FreshnessCheck, MaintenanceTask, RetryAttempt, TakedownRequest", deliverables: ["Scheduled freshness/source checks", "Retry/backoff ແລະ dead-letter/manual queue", "Freshness warning/suspension", "Immediate takedown handling", "Data-quality summary"],
    entry: "Freshness cadence, retry ceiling, idempotency key ແລະ error ownership ຖືກກຳນົດ.", exit: "Temporary failure ບໍ່ຖອນ content ທັນທີ; confirmed unavailable/takedown ຖືກຈັດການຕາມ rule; scheduled job ແລ່ນຊ້ຳໄດ້ໂດຍບໍ່ສ້າງ side effect ຊ້ຳ.",
    evidence: "Clock-controlled scheduler tests + retry/idempotency tests + unavailable/takedown E2E + operational queue evidence.", parallel: "Scheduler runner, Admin queue UI ແລະ provider check adapters ແຍກເຮັດໄດ້ຈາກ common task/error contract.",
  },
  {
    id: "WP-09", title: "Campaign & Performance Reporting", goal: "ໃຫ້ Admin ຈັດ Campaign ທີ່ມີ Sponsored label/ໄລຍະເວລາ ແລະສະຫຼຸບ performance ຈາກຂໍ້ມູນທີ່ກວດໄດ້.",
    dependsOn: "WP-04 public eligibility + WP-05 placement + WP-06 analytics capture", functionIds: [...range("FN-CMP-", 1, 5), "FN-ANA-006", "FN-ANA-007"],
    entities: "Campaign, CampaignPlacement, AnalyticsEvent, DecisionIntent, PerformanceSummary", deliverables: ["Campaign create/schedule/activate/pause/end", "Eligible sponsored placement with explicit label", "Founding Partner/Campaign summary", "Metric disclaimer: Decision Intent ບໍ່ແມ່ນ visit/sale"],
    entry: "Campaign price ອາດຍັງເປັນລາຄາທົດສອບ ແຕ່ placement, date, label ແລະ metric definitions ຕ້ອງຊັດ.", exit: "Campaign ບໍ່ active ນອກຊ່ວງເວລາ; paid status ບໍ່ຊື້ verification/review score; report ກັບໄປຫາ event definition ໄດ້.",
    evidence: "State/time-boundary tests + placement eligibility tests + report reconciliation against raw events + sponsored disclosure UAT.", parallel: "Campaign admin UI ແລະ report view ເຮັດຄູ່ຂະໜານໄດ້ຫຼັງ campaign/event read models ຄົງທີ່.",
  },
];

const dependencyStages = [
  ["0", "Contract & Technical Spikes", "ລັອກ logical contract, error/state IDs, Lao search normalization, social embed/metadata, mobile deep link, anonymous dedupe ແລະ audit atomicity."],
  ["1", "Core Walking Skeleton", "WP-01 → WP-02 → WP-03 → WP-04 ສ້າງເສັ້ນທາງ Admin ສ້າງ Place/Source ຫາ Public Place."],
  ["2", "User Journey & Measurement", "WP-05 ແລະ WP-06 ເພີ່ມ Feed/Search/Action ພ້ອມ event ທີ່ບໍ່ block journey."],
  ["3", "Pilot Operations", "WP-07 ແລະ WP-08 ຮອງຮັບ Correction, Takedown, Freshness, Retry ແລະ daily queue."],
  ["4", "Commercial & Reporting", "WP-09 ເປີດ Sponsored Campaign ແລະ Performance Summary ຫຼັງ public/measurement ນິ່ງ."],
  ["5", "Hardening & Pilot Release", "Regression, performance, security, accessibility, backup/rollback, UAT ແລະ release evidence."],
] as const;

const verticalSlice = [
  "ສ້າງ core schema constraints ແລະ reference data ທີ່ Place ຕ້ອງໃຊ້.",
  "Admin sign-in → authorization → audit context ໃຫ້ຜ່ານ.",
  "Admin ສ້າງ Place Draft ພ້ອມ required-field/duplicate feedback.",
  "ລົງທະບຽນ, validate ແລະ link Content Source ກັບ Place.",
  "ກວດ publish readiness ແລະ publish Source/Place ພ້ອມ audit.",
  "Guest ເປີດ Canonical Place Detail ພ້ອມ source/trust/contact.",
  "Feed ສະແດງ eligible item ໜຶ່ງອັນ ແລະເຊື່ອມໄປ Place Detail.",
  "Guest ກົດ Map; ຖ້າ native app ບໍ່ມີ ໃຫ້ໃຊ້ web fallback.",
  "Consent/session/event/Decision Intent ຖືກບັນທຶກແບບ anonymous ແລະ dedupe.",
  "E2E test ພິສູດເສັ້ນທາງ Admin create → publish → Guest discover → decide → Map intent.",
] as const;

const backlog = [
  ["DEV-001", "ລັອກ API/domain contract, state ແລະ error IDs", "—", "Contract examples + invalid examples ຜ່ານ review"],
  ["DEV-002", "ສ້າງ core schema constraints/reference data", "DEV-001", "Migration/seed ແລ່ນຈາກຖານເປົ່າ ແລະ rollback ໄດ້"],
  ["DEV-003", "Admin identity, session ແລະ authorization", "DEV-001", "Authorized/expired/forbidden tests ຜ່ານ"],
  ["DEV-004", "Audit writer ແລະ business-write atomicity", "DEV-002, DEV-003", "Mutation/audit commit ພ້ອມກັນ ຫຼື rollback ພ້ອມກັນ"],
  ["DEV-005", "Create/update Place Draft", "DEV-002—004", "Draft + audit integration test"],
  ["DEV-006", "Required fields ແລະ duplicate candidate", "DEV-005", "Decision-table/unit fixtures ຜ່ານ"],
  ["DEV-007", "Register/validate Source", "DEV-004, DEV-005", "Adapter contract + URL fixtures ຜ່ານ"],
  ["DEV-008", "Read metadata, link ແລະ publish Source", "DEV-007", "Attribution/place-link gate ຜ່ານ"],
  ["DEV-009", "Place publish-readiness, lifecycle, merge ແລະ redirect", "DEV-006, DEV-008", "Transition/authorization/audit + referential-integrity tests ຜ່ານ"],
  ["DEV-010", "Public canonical Place Detail", "DEV-009", "Published-only query + redirect E2E"],
  ["DEV-011", "Feed eligible item ແລະ media fallback", "DEV-010", "First-card E2E + unavailable preview fallback"],
  ["DEV-012", "Map action ແລະ fallback", "DEV-010", "Device/deep-link matrix ຜ່ານ"],
  ["DEV-013", "Consent ແລະ anonymous session", "DEV-001", "Opt-in/opt-out/expiry tests ຜ່ານ"],
  ["DEV-014", "Event/Decision Intent capture ແລະ dedupe", "DEV-012, DEV-013", "Event reconciliation ກັບ manual action log"],
  ["DEV-015", "First Vertical Slice automated E2E", "DEV-002—014", "10 ຂັ້ນຂອງ slice ຜ່ານໃນ test environment"],
  ["DEV-016", "Search, filter ແລະ feed pagination", "DEV-015", "Lao fixtures + no-leak + cursor tests"],
  ["DEV-017", "Correction, evidence, suspend ແລະ archive", "DEV-015", "SLA/transaction/public-visibility E2E"],
  ["DEV-018", "Freshness, source retry ແລະ maintenance queue", "DEV-017", "Clock/idempotency/retry tests"],
  ["DEV-019", "Campaign lifecycle, placement ແລະ report", "DEV-016, DEV-014", "Time-boundary + sponsored label + report reconciliation"],
] as const;

const ready = ["ມີ Requirement/Function ID ແລະອ້າງເອກະສານຕົ້ນທາງ", "Input, output, precondition, algorithm, business rule ແລະ acceptance ຊັດ", "Entity, state transition ແລະ error/fallback ທີ່ກ່ຽວຂ້ອງຖືກລະບຸ", "Dependency ພ້ອມ ຫຼືມີ approved mock/adapter contract", "ມີ test scenario, expected evidence ແລະ owner ຮັບຄຳຕອບ", "ປະເມີນ privacy, security, accessibility ແລະ performance impact"];
const done = ["Implementation ແລະ code review ຜ່ານຕາມ acceptance", "Unit/integration/E2E test ຕາມຄວາມສ່ຽງຜ່ານ", "Migration/data contract ແລະ backward/rollback path ຖືກທົດສອບ", "Authorization, audit, error/fallback ແລະ observability ຄົບ", "ບໍ່ຮົ່ວ PII/secret; trace ID ຕາມຫາ error ໄດ້", "Acceptance evidence ຖືກແນບ ແລະ Traceability Matrix ອັບເດດ", "Feature flag/config/rollback ແລະ operation note ພ້ອມ", "Product Owner/SA/QA ຍອມຮັບໃນ gate ທີ່ກ່ຽວຂ້ອງ"];

const releaseGates = [
  ["GATE-01", "Contract & Data", "DEV-001—004", "Contract, migration, access ແລະ audit atomicity ຜ່ານ; ຈຶ່ງເປີດ business mutation."],
  ["GATE-02", "First Place Publish", "DEV-005—010", "Place/Source ຈາກ Draft ຫາ Public ໄດ້ ແລະ public data ບໍ່ຮົ່ວ."],
  ["GATE-03", "Core Journey", "DEV-011—016", "Discover → Decide → Map intent ຜ່ານ E2E; analytics failure ບໍ່ block journey."],
  ["GATE-04", "Pilot Operations", "DEV-017—018", "Correction, takedown, retry, freshness ແລະ daily queue ດຳເນີນງານໄດ້."],
  ["GATE-05", "Commercial", "DEV-019", "Sponsored label/time/eligibility/report reconciliation ຜ່ານ; ບໍ່ປະປົນ paid ກັບ verification."],
  ["GATE-06", "Release Candidate", "All", "Regression, performance, security, accessibility, backup/rollback ແລະ UAT evidence ຜ່ານ."],
] as const;

const owners = [
  ["Product Owner", "ອະນຸມັດ scope, priority, metric meaning ແລະ gate decision; ບໍ່ໃຫ້ເພີ່ມ feature ນອກ MVP ໂດຍບໍ່ປະເມີນ."],
  ["System Analyst", "ຮັກສາ Function/Workflow/State/Error/Traceability ແລະຕອບ ambiguity ກ່ອນ developer ຄາດເດົາ."],
  ["Tech Lead / Architect", "ແປ logical SA ເປັນ architecture, API, physical schema, security ແລະ migration decision records."],
  ["Backend", "ສ້າງ domain/data/integration/background functions ພ້ອມ transaction, audit, retry ແລະ observability."],
  ["Frontend / UX", "ສ້າງ user/admin flow ຕາມ contract ພ້ອມ loading, empty, error, fallback ແລະ accessibility."],
  ["QA", "ສ້າງ test ຈາກ acceptance/state/error/traceability ແລະຮັກສາ evidence ຂອງແຕ່ລະ gate."],
  ["Pilot Operations", "ກວດວ່າ queue, SLA, correction, takedown, source/freshness ແລະ campaign ໃຊ້ງານຈິງໄດ້."],
] as const;

const assigned = workPackages.flatMap((item) => item.functionIds);
const known = new Set(systemFunctionCatalog.map((item) => item.id));
const assignedSet = new Set(assigned);
const missing = systemFunctionCatalog.filter((item) => !assignedSet.has(item.id)).map((item) => item.id);
const unknown = [...assignedSet].filter((id) => !known.has(id));
const duplicates = [...new Set(assigned.filter((id, index) => assigned.indexOf(id) !== index))];
const coveragePass = missing.length === 0 && unknown.length === 0 && duplicates.length === 0 && assigned.length === systemFunctionCatalog.length;

export default function SystemAnalysisDevelopmentHandoff() {
  return (
    <section className={`${styles.documentArticleSection} ${styles.saDevelopmentHandoff}`} id="sa-development-handoff">
      <span>PART H · STEP 7 OF 7</span>
      <h2>Development Starting Point & Dependency Order</h2>
      <p className={styles.documentQuestion}>Developer ຄວນເລີ່ມຈາກຈຸດໃດ, ວຽກໃດຕ້ອງມາກ່ອນ ແລະຫຼັກຖານໃດຈຶ່ງຖືວ່າສົ່ງມອບໄດ້?</p>
      <div className={styles.documentProse}>
        <p>ພາກນີ້ບໍ່ແມ່ນ Sprint Plan ຫຼືການຄາດຄະເນຈຳນວນມື້. ມັນແມ່ນແຜນ handoff ທາງ logic ທີ່ຈັດ 64 Functions ໃຫ້ເປັນຊຸດວຽກ, ລະບຸ dependency, entry/exit criteria ແລະຫຼັກຖານການທົດສອບ. DEL-01 ຈຶ່ງຈະນຳຊຸດວຽກນີ້ໄປວາງ milestone, sprint, ຄົນ ແລະເວລາ.</p>
        <p>ຫຼັກສຳຄັນຄືສ້າງ First Vertical Slice ທີ່ເດີນທາງຄົບຈາກ Admin ຫາ Guest ແລະ Decision Intent ກ່ອນຂະຫຍາຍ feature ອອກກວ້າງ. ວິທີນີ້ພິສູດ data, access, audit, external link, public query ແລະ measurement ໃນເສັ້ນທາງດຽວ.</p>
      </div>

      <div className={styles.saCatalogSummary} aria-label="Development handoff summary">
        <article><small>WORK PACKAGES</small><strong>{workPackages.length}</strong><b>ຊຸດວຽກທີ່ມີ entry/exit</b></article>
        <article><small>FUNCTION ASSIGNMENT</small><strong>{assignedSet.size}/{systemFunctionCatalog.length}</strong><b>Functions ຖືກຈັດຄົບ</b></article>
        <article><small>DELIVERY STAGES</small><strong>{dependencyStages.length}</strong><b>ຈາກ contract ຫາ pilot release</b></article>
        <article><small>FIRST SLICE</small><strong>{verticalSlice.length}</strong><b>ຂັ້ນຈາກ Admin ຫາ intent</b></article>
      </div>

      <h3 className={styles.documentSubheading}>Dependency Graph ແລະວິທີຕັດວົງຈອນ</h3>
      <div className={styles.saDependencyGraph}>
        <div><b>FOUNDATION</b><strong>WP-01 Access & Audit</strong><p>Contract · identity · authorization · audit · core schema</p></div><i>→</i>
        <div><b>CORE DATA</b><strong>WP-02 Place Draft<br/>WP-03 Source Core</strong><p>ສ້າງ Place ຂັ້ນຕ່ຳ → link Source → publish gate</p></div><i>→</i>
        <div><b>PUBLIC CORE</b><strong>WP-04 Public Place</strong><p>Canonical detail · trust · contact actions</p></div><i>→</i>
        <div><b>EXPERIENCE</b><strong>WP-05 + WP-06</strong><p>Feed/Search · action · anonymous measurement</p></div><i>→</i>
        <div><b>OPERATE & EARN</b><strong>WP-07—09</strong><p>Correction · quality · campaign · reporting</p></div>
      </div>
      <div className={styles.saCycleTable} role="table" aria-label="Circular dependency resolution">
        <div role="row"><b>DEPENDENCY ທີ່ເບິ່ງຄືວົງຈອນ</b><b>ວິທີຕັດວົງຈອນ</b><b>ກົດປ້ອງກັນ</b></div>
        <div role="row"><strong>MOD-04 Source ↔ MOD-05 Place</strong><p>ສ້າງ Place Draft ຂັ້ນຕ່ຳກ່ອນ, ແລ້ວ register/validate/link Source, ຈາກນັ້ນຈຶ່ງກວດ Publish Readiness.</p><span>Draft ມີໄດ້ໂດຍຍັງບໍ່ມີ Source; Published ບໍ່ໄດ້ຈົນ Source/attribution ຄົບ.</span></div>
        <div role="row"><strong>MOD-01/02 Public ↔ MOD-09 Analytics</strong><p>ໃຊ້ async/no-op event sink ໃນຊ່ວງທຳອິດ; ສ້າງ event contract ກ່ອນລະບົບເກັບສົມບູນ.</p><span>Feed/Search/Action ຕ້ອງສຳເລັດແມ່ນວ່າ analytics ລົ້ມ.</span></div>
        <div role="row"><strong>MOD-07 Campaign ↔ MOD-09 Reporting</strong><p>ສ້າງ campaign lifecycle/eligibility ກ່ອນ; ຈຶ່ງສ້າງ summary ຈາກ event pipeline ທີ່ຜ່ານ QA.</p><span>Campaign ບໍ່ຕ້ອງລໍ report ເພື່ອປ່ຽນ state; report ຕ້ອງ trace ຫາ raw events.</span></div>
        <div role="row"><strong>MOD-10 Quality ↔ MOD-04/05 Core</strong><p>ລັອກ Place/Source state ແລະ error classification ກ່ອນ; scheduler/recheck ຈຶ່ງຮຽກ core command ຜ່ານ contract.</p><span>Scheduled job ບໍ່ຂຽນ state ໂດຍກົງ ແລະຕ້ອງ idempotent.</span></div>
      </div>

      <h3 className={styles.documentSubheading}>9 Work Packages ທີ່ Developer ຮັບໄປສ້າງໄດ້</h3>
      <div className={styles.saWorkPackages}>
        {workPackages.map((item, index) => (
          <details key={item.id} open={index === 0}>
            <summary><span>{item.id}</span><div><small>DEPENDS ON · {item.dependsOn}</small><strong>{item.title}</strong></div><em>{item.functionIds.length} FUNCTIONS</em></summary>
            <div className={styles.saWorkPackageIntro}><article><b>GOAL</b><p>{item.goal}</p></article><article><b>PRIMARY ENTITIES</b><p>{item.entities}</p></article></div>
            <div className={styles.saPackageFunctions}><b>FUNCTION IDS — ແຕ່ລະ Function ຢູ່ໃນ Work Package ດຽວ</b><p>{item.functionIds.join(" · ")}</p></div>
            <div className={styles.saPackageCriteria}>
              <article><b>DELIVERABLES</b><ul>{item.deliverables.map((value) => <li key={value}>{value}</li>)}</ul></article>
              <article><b>ENTRY CRITERIA</b><p>{item.entry}</p><b>EXIT CRITERIA</b><p>{item.exit}</p></article>
              <article><b>TEST / EVIDENCE</b><p>{item.evidence}</p><b>SAFE PARALLEL WORK</b><p>{item.parallel}</p></article>
            </div>
          </details>
        ))}
      </div>

      <div className={coveragePass ? styles.saCoveragePass : styles.saCoverageFail}>
        <div><b>{coveragePass ? "PASS — WORK PACKAGE COVERAGE" : "FAIL — COVERAGE GAP"}</b><strong>{assignedSet.size}/{systemFunctionCatalog.length} Functions</strong></div>
        <p>{coveragePass ? "Function Catalog ທັງ 64 ອັນຖືກຈັດໃສ່ 9 Work Packages ຄົບ ແລະແຕ່ລະ ID ປາກົດພຽງໜຶ່ງຄັ້ງ. ຈຶ່ງບໍ່ມີ Function ຕົກຫຼົ່ນ ຫຼືມີ owner ຊ້ອນ." : `Missing: ${missing.join(", ") || "—"}; Unknown: ${unknown.join(", ") || "—"}; Duplicates: ${duplicates.join(", ") || "—"}.`}</p>
      </div>

      <h3 className={styles.documentSubheading}>Delivery Stages: ລຳດັບຜົນງານ ບໍ່ແມ່ນກຳນົດຈຳນວນມື້</h3>
      <div className={styles.saDeliveryStages}>{dependencyStages.map(([no, title, detail]) => <article key={no}><span>{no}</span><div><b>{title}</b><p>{detail}</p></div></article>)}</div>

      <h3 className={styles.documentSubheading}>First Vertical Slice — ຈຸດເລີ່ມພັດທະນາທີ່ຕ້ອງເຮັດໃຫ້ຄົບກ່ອນ</h3>
      <div className={styles.saVerticalSlice}><ol>{verticalSlice.map((item) => <li key={item}>{item}</li>)}</ol><aside><b>WHY THIS SLICE</b><p>ມັນພິສູດສ່ວນສ່ຽງສູງທີ່ສຸດພ້ອມກັນ: Admin access, data constraints, social source, publication, public read, mobile action ແລະ analytics. ຖ້າ slice ນີ້ບໍ່ຜ່ານ ບໍ່ຄວນຂະຫຍາຍ Search, Correction ຫຼື Campaign.</p></aside></div>

      <h3 className={styles.documentSubheading}>Initial Developer Backlog ແລະ dependency ລະດັບ task</h3>
      <div className={styles.saBacklogTable} role="table" aria-label="Initial developer backlog">
        <div role="row"><b>ID</b><b>WORK ITEM</b><b>DEPENDS ON</b><b>DONE EVIDENCE</b></div>
        {backlog.map(([id, item, depends, evidence]) => <div role="row" key={id}><strong>{id}</strong><p>{item}</p><code>{depends}</code><span>{evidence}</span></div>)}
      </div>

      <h3 className={styles.documentSubheading}>Definition of Ready ແລະ Definition of Done</h3>
      <div className={styles.saReadyDone}>
        <article><b>DEFINITION OF READY · ກ່ອນເລີ່ມ CODE</b><p>Work item ຈະເຂົ້າ development ໄດ້ເມື່ອຄຳຖາມສຳຄັນຖືກຕອບແລ້ວ.</p><ul>{ready.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><b>DEFINITION OF DONE · ກ່ອນປິດວຽກ</b><p>“Code ແລ້ວ” ຍັງບໍ່ເທົ່າກັບ “ສົ່ງມອບແລ້ວ”.</p><ul>{done.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>

      <h3 className={styles.documentSubheading}>Release Gates — ຫ້າມຂ້າມຫຼັກຖານເພື່ອໄປຂັ້ນຖັດໄປ</h3>
      <div className={styles.saReleaseGates} role="table" aria-label="Release gates"><div role="row"><b>GATE</b><b>CHECKPOINT</b><b>SCOPE</b><b>ຫຼັກຖານທີ່ຕ້ອງຜ່ານ</b></div>{releaseGates.map(([id, title, scope, criteria]) => <div role="row" key={id}><strong>{id}</strong><b>{title}</b><code>{scope}</code><p>{criteria}</p></div>)}</div>

      <h3 className={styles.documentSubheading}>Handoff Ownership ແລະການເຮັດວຽກຄູ່ຂະໜານ</h3>
      <div className={styles.saOwnershipTable}>{owners.map(([role, responsibility]) => <article key={role}><b>{role}</b><p>{responsibility}</p></article>)}</div>
      <div className={styles.documentSectionCaution}><b>ກົດຂອງການເຮັດຄູ່ຂະໜານ:</b> ທີມສາມາດແຍກ Frontend, Backend, Adapter ແລະ QA ໄດ້ຫຼັງ shared contract ຜ່ານ GATE-01. Frontend ໃຊ້ fixture ຈາກ contract, QA ຂຽນ test ຈາກ acceptance ໄດ້ທັນທີ, ແຕ່ຫ້າມແຕ່ລະທີມສ້າງຊື່ state/error/field ຂອງຕົນເອງ.</div>

      <h3 className={styles.documentSubheading}>5 ຈຸດທີ່ຕ້ອງທົບທວນກ່ອນອະນຸມັດ PRO-02 1.0</h3>
      <ol className={styles.saReviewChecklist}>
        <li><b>Work Package Order:</b><p>ເຫັນດີຫຼືບໍ່ວ່າ Access/Audit → Place/Source → Public → Discovery/Measurement → Operations/Commercial ແມ່ນລຳດັບທີ່ຖືກຕ້ອງ?</p></li>
        <li><b>First Vertical Slice:</b><p>10 ຂັ້ນ Admin create ຫາ Map Decision Intent ພໍດີສຳລັບພິສູດ architecture ຫຼືຄວນຕັດ/ເພີ່ມຫຍັງ?</p></li>
        <li><b>Access & Audit First:</b><p>ຢືນຢັນວ່າ Admin identity, authorization ແລະ audit atomicity ຕ້ອງມາກ່ອນ business mutation ທັງໝົດ.</p></li>
        <li><b>Analytics Boundary:</b><p>ເຫັນດີໃຫ້ event contract/capture ເຂົ້າໄວໃນ vertical slice ແຕ່ຍ້າຍ performance reporting ໄປ WP-09 ຫຼືບໍ່?</p></li>
        <li><b>Approval Status:</b><p>ຖ້າ 4 ຂໍ້ຂ້າງເທິງບໍ່ມີການປ່ຽນສາລະສຳຄັນ ຈຶ່ງອະນຸມັດ PRO-02 ຈາກ 0.9 “ພ້ອມທົບທວນ” ເປັນ 1.0 “ອະນຸມັດແລ້ວ”.</p></li>
      </ol>
    </section>
  );
}
