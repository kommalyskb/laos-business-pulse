import styles from "../documents.module.css";
import { productRequirementIds } from "./ProductRequirementsDocument";
import { systemFunctionCatalog } from "./SystemAnalysisFunctionCatalog";
import { systemEntityIds } from "./SystemAnalysisDataModel";
import { systemWorkflowIds } from "./SystemAnalysisWorkflows";
import { systemErrorCodes, systemStateMachineIds } from "./SystemAnalysisStateErrors";

type TraceRow = {
  id: string;
  priority: "Must" | "Should";
  kind: "Functional" | "Non-functional";
  title: string;
  requirement: string;
  rationale: string;
  useCases: string[];
  rules: string[];
  functionIds: string[];
  entityIds: string[];
  workflowIds: string[];
  stateIds: string[];
  errorCodes: string[];
  acceptance: string[];
  evidence: string[];
  downstream: string[];
};

const functionsByModule = (...moduleIds: string[]) => systemFunctionCatalog.filter((fn) => moduleIds.includes(fn.moduleId)).map((fn) => fn.id);
const unique = (items: string[]) => Array.from(new Set(items));

const traceRows: TraceRow[] = [
  {
    id: "USR-01", priority: "Must", kind: "Functional", title: "Discovery Feed",
    requirement: "ສະແດງວິດີໂອ/Preview ແນວຕັ້ງເຕັມຈໍ ພ້ອມຊື່ຮ້ານ, Source, Creator/Attribution ແລະປຸ່ມໄປ Place Page.",
    rationale: "Feed ເປັນຈຸດເຂົ້າຫຼັກຂອງ Guest. ວິດີໂອຊ່ວຍການຄົ້ນພົບ ແຕ່ Place Data ແລະ Source Link ຕ້ອງຍັງໃຊ້ໄດ້ເມື່ອ Embed ລົ້ມ.",
    useCases: ["UC-USR-01 · ຄົ້ນພົບຜ່ານ Feed"],
    rules: ["BR-02 Publish Gate", "BR-04 Content Attribution", "BR-05 Separate Trust Labels", "BR-07 Sponsored Period", "BR-15 Source Availability"],
    functionIds: functionsByModule("MOD-01"),
    entityIds: ["ENT-001", "ENT-010", "ENT-011", "ENT-021", "ENT-022", "ENT-026"],
    workflowIds: ["WF-01-01"], stateIds: ["SM-01", "SM-03", "SM-04", "SM-06"],
    errorCodes: ["ERR-PLACE-NOT-PUBLIC", "ERR-SOURCE-VALIDATION", "ERR-SOURCE-PUBLISH-BLOCKED", "ERR-SOURCE-TAKEDOWN-HOLD", "ERR-DEPENDENCY-TIMEOUT", "ERR-RATE-LIMITED", "ERR-UNEXPECTED"],
    acceptance: ["AC-USR-01-01 · Given ມີ Published Place/Source, when Guest ເປີດ Feed, then ເຫັນ Feed Item ພ້ອມ Place, Creator, Source ແລະ label ທີ່ຖືກ.", "AC-USR-01-02 · Given External Embed ຊ້າ/ລົ້ມ, when Card render, then ສະແດງ Preview/Fallback ແລະເປີດ Place Page/Source link ໄດ້.", "AC-USR-01-03 · Given ມີຫຼາຍໜ້າ, when ໃຊ້ nextCursor, then Item ບໍ່ຊ້ຳໃນ Session ດຽວ."],
    evidence: ["E2E Mobile test: Feed → Place", "Contract test: eligibility + cursor", "Fallback test: timeout/removed embed", "Event evidence: feed_view, place_open"],
    downstream: ["UX: Full-screen Feed/Media Fallback", "TEC: Feed Query/Eligibility/Cache", "QA: TC-USR-01-*", "DEL: MOD-01 backlog"],
  },
  {
    id: "USR-02", priority: "Must", kind: "Functional", title: "Search & Filter",
    requirement: "Guest ຄົ້ນດ້ວຍຊື່ຮ້ານ ຫຼືຄຳສຳຄັນ ແລະກອງຕາມໝວດ, ເຂດ ແລະຊ່ວງລາຄາທີ່ອະນຸມັດສຳລັບ Launch.",
    rationale: "ຜູ້ໃຊ້ທີ່ມີເຈດຕະນາຊັດຕ້ອງຫາ Place ໄດ້ໄວ ໂດຍຜົນຄົ້ນຫ້າມປົນ Draft/Suspended ຫຼື Sponsored ທີ່ບໍ່ມີປ້າຍ.",
    useCases: ["UC-USR-02 · Search/Filter"],
    rules: ["BR-02 Publish Gate", "BR-05 Separate Trust Labels", "BR-07 Sponsored Period", "CON-01 Search Vocabulary"],
    functionIds: functionsByModule("MOD-02"),
    entityIds: ["ENT-001", "ENT-002", "ENT-003", "ENT-004", "ENT-005", "ENT-008", "ENT-022", "ENT-026"],
    workflowIds: ["WF-02-01"], stateIds: ["SM-01", "SM-06"],
    errorCodes: ["ERR-VALIDATION", "ERR-PLACE-NOT-PUBLIC", "ERR-NOT-FOUND", "ERR-DEPENDENCY-TIMEOUT", "ERR-RATE-LIMITED", "ERR-UNEXPECTED"],
    acceptance: ["AC-USR-02-01 · Search ດ້ວຍຊື່/Alias/keyword ສົ່ງສະເພາະ Published Place ທີ່ກົງ.", "AC-USR-02-02 · Category + Area + Price Filter ໃຊ້ຮ່ວມກັນ ແລະ Clear Filter ຄືນຜົນທຳມະດາ.", "AC-USR-02-03 · Empty Result ບອກ query/filter ທີ່ໃຊ້ ແລະສະເໜີທາງອອກ; ບໍ່ສອດແຊກຜົນບໍ່ກົງ."],
    evidence: ["Search relevance fixture", "Filter combination tests", "Published-only database/contract test", "Event evidence: search, filter, empty_result"],
    downstream: ["UX: Search/Filter/Empty State", "CON-01: taxonomy/vocabulary", "TEC: search query/index", "QA: TC-USR-02-*"],
  },
  {
    id: "USR-03", priority: "Must", kind: "Functional", title: "Place Page",
    requirement: "Place Page ລວມຂໍ້ມູນຕັດສິນໃຈ, Review Source, Creator, ວັນກວດ, Freshness ແລະ Trust Label ໄວ້ໃນ Canonical Page ດຽວ.",
    rationale: "Page ຕ້ອງແປ Review ທີ່ກະຈາຍຢູ່ Social Media ໃຫ້ເປັນຂໍ້ມູນທີ່ໃຊ້ຕັດສິນໃຈໄດ້ ໂດຍບອກຊັດວ່າ Field ໃດກວດແລ້ວ ຫຼືຍັງບໍ່ຢືນຢັນ.",
    useCases: ["UC-USR-03 · ເປີດ Place Page"],
    rules: ["BR-01 Canonical Place", "BR-03 Unknown Data", "BR-04 Attribution", "BR-05 Trust Labels", "BR-13 Data Freshness", "BR-14 Duplicate Merge"],
    functionIds: ["FN-PLC-001", "FN-PLC-002", "FN-PLC-003", "FN-PLC-004", "FN-PADM-010", "FN-DQ-002"],
    entityIds: ["ENT-001", "ENT-003", "ENT-004", "ENT-005", "ENT-006", "ENT-007", "ENT-008", "ENT-009", "ENT-010", "ENT-011", "ENT-014", "ENT-021", "ENT-022", "ENT-026"],
    workflowIds: ["WF-03-01", "WF-10-01"], stateIds: ["SM-01", "SM-02", "SM-03", "SM-04", "SM-06"],
    errorCodes: ["ERR-NOT-FOUND", "ERR-PLACE-NOT-PUBLIC", "ERR-SOURCE-TAKEDOWN-HOLD", "ERR-DEPENDENCY-TIMEOUT", "ERR-UNEXPECTED"],
    acceptance: ["AC-USR-03-01 · Published Place ສະແດງ identity, category, address/map, contact, hours, price ແລະ source ຕາມຂໍ້ມູນທີ່ມີ.", "AC-USR-03-02 · Unknown/Stale Field ມີປ້າຍຕາມຄວາມຈິງ; ຫ້າມຄາດເດົາຄ່າ.", "AC-USR-03-03 · URL ຂອງ Merged Place redirect ໄປ Canonical Page; Archived/Non-public Place ບໍ່ຮົ່ວ Public Data."],
    evidence: ["Place fixture completeness test", "Trust/Freshness label matrix", "Redirect/not-found contract test", "Event evidence: place_open, source_click"],
    downstream: ["UX: Place Detail + Trust Labels", "CON-02: Place Data Standard", "TEC: Place aggregate/redirect", "QA: TC-USR-03-*"],
  },
  {
    id: "USR-04", priority: "Must", kind: "Functional", title: "Decision Actions",
    requirement: "Guest ກົດ Map, Call ຫຼື Message ໄດ້, ໄປຫາປາຍທາງທີ່ກົງ Place ແລະບັນທຶກ Decision Intent ແບບບໍ່ນັບຊ້ຳ.",
    rationale: "Platform ສ້າງຄຸນຄ່າເມື່ອພາຄົນຈາກການເບິ່ງໄປສູ່ການຕິດຕໍ່/ເດີນທາງ; ແຕ່ Intent ບໍ່ແມ່ນ Visit ຫຼື Sale.",
    useCases: ["UC-USR-04 · Map/Call/Message"],
    rules: ["BR-08 Anonymous Analytics", "BR-09 Decision Intent", "BR-10 No Transaction"],
    functionIds: ["FN-PLC-004", "FN-ACT-001", "FN-ACT-002", "FN-ACT-003", "FN-ANA-002", "FN-ANA-003", "FN-ANA-004", "FN-ANA-005"],
    entityIds: ["ENT-001", "ENT-006", "ENT-025", "ENT-026", "ENT-027"],
    workflowIds: ["WF-03-02", "WF-09-01"], stateIds: [],
    errorCodes: ["ERR-VALIDATION", "ERR-EXTERNAL-ACTION-UNAVAILABLE", "ERR-EVENT-SCHEMA", "ERR-DEPENDENCY-TIMEOUT", "ERR-RATE-LIMITED", "ERR-UNEXPECTED"],
    acceptance: ["AC-USR-04-01 · Map ເປີດ coordinates/map URL ຂອງ Place ຖືກ ແລະມີ Web fallback.", "AC-USR-04-02 · Call/Message ໃຊ້ Published Contact ທີ່ normalized; ຖ້າ App ບໍ່ມີໃຫ້ Copy/Web fallback.", "AC-USR-04-03 · Rapid repeat ຈາກ session + place + action + window ດຽວສ້າງ Unique Decision Intent ພຽງ 1."],
    evidence: ["Mobile deep-link tests", "Fallback tests without target app", "Event/Intent dedupe database test", "Metric reconciliation against test log"],
    downstream: ["UX: Action bar + fallback", "TEC: deep-link/event ingest", "DEL-04: event dictionary/dedupe window", "QA: TC-USR-04-*"],
  },
  {
    id: "USR-05", priority: "Should", kind: "Functional", title: "Save & Share",
    requirement: "Guest Save Place ໃນອຸປະກອນໂດຍບໍ່ມີ Account ແລະ Share Canonical Place Link ໄດ້.",
    rationale: "Guest-first ຫຼຸດອຸປະສັກກ່ອນ Pilot. Save ເປັນ local preference; Share ຕ້ອງຮັກສາ Canonical URL ເພື່ອບໍ່ກະຈາຍ duplicate link.",
    useCases: ["UC-USR-05 · Save/Share"], rules: ["BR-01 Canonical Place", "BR-08 Anonymous Analytics", "BR-14 Duplicate Merge"],
    functionIds: ["FN-ACT-004", "FN-ACT-005", "FN-ANA-003", "FN-ANA-004"],
    entityIds: ["ENT-001", "ENT-009", "ENT-025", "ENT-026"],
    workflowIds: ["WF-03-02", "WF-09-01"], stateIds: [],
    errorCodes: ["ERR-EXTERNAL-ACTION-UNAVAILABLE", "ERR-EVENT-SCHEMA", "ERR-UNEXPECTED"],
    acceptance: ["AC-USR-05-01 · Save/Unsave ຄົງຢູ່ຫຼັງ reload ໃນ browser/device ດຽວ ແລະບໍ່ຕ້ອງ Login.", "AC-USR-05-02 · Share ໃຊ້ Canonical URL; ຖ້າ Web Share ບໍ່ມີໃຫ້ Copy Link.", "AC-USR-05-03 · Old merged URL ເປີດແລ້ວ redirect ຫາ Canonical Place."],
    evidence: ["Browser storage test", "Native share/copy fallback test", "Canonical redirect E2E", "Optional save/share event test"],
    downstream: ["UX: Save state + Share feedback", "TEC: canonical URL/local storage", "QA: TC-USR-05-*"],
  },
  {
    id: "BUS-01", priority: "Must", kind: "Functional", title: "Correction Request",
    requirement: "ຮ້ານສົ່ງຄຳຮ້ອງແກ້ຂໍ້ມູນ; Admin ກວດ Evidence, ຕັດສິນລາຍ Item ແລະປ່ຽນ Public Data ສະເພາະຫຼັງອະນຸມັດ.",
    rationale: "ຮ້ານເປັນແຫຼ່ງການແກ້ໄຂທີ່ສຳຄັນ ແຕ່ການໃຫ້ແກ້ Public Data ໂດຍກົງຈະທຳລາຍ Verification/Audit.",
    useCases: ["UC-BUS-01 · ສະເໜີແກ້ໄຂ"],
    rules: ["BR-06 Correction Approval", "BR-11 Admin Identity", "BR-12 Correction SLA", "BR-13 Data Freshness"],
    functionIds: unique([...functionsByModule("MOD-06"), "FN-PADM-002", "FN-PADM-003", "FN-PADM-004", "FN-ADM-004"]),
    entityIds: ["ENT-001", "ENT-014", "ENT-015", "ENT-016", "ENT-017", "ENT-018", "ENT-020", "ENT-023", "ENT-024"],
    workflowIds: ["WF-06-01", "WF-08-01"], stateIds: ["SM-01", "SM-02", "SM-05", "SM-07"],
    errorCodes: ["ERR-VALIDATION", "ERR-AUTHENTICATION-REQUIRED", "ERR-FORBIDDEN", "ERR-INVALID-STATE", "ERR-CONCURRENCY-CONFLICT", "ERR-IDEMPOTENCY-CONFLICT", "ERR-EVIDENCE-REQUIRED", "ERR-VERIFICATION-INCOMPLETE", "ERR-REQUEST-VALUE-CONFLICT", "ERR-REQUEST-NOT-READY-TO-CLOSE", "ERR-AUDIT-WRITE-FAILED", "ERR-UNEXPECTED"],
    acceptance: ["AC-BUS-01-01 · Request ໜຶ່ງມີຫຼາຍ Item/Evidence ແລະ received_at/SLA ຖືກບັນທຶກ.", "AC-BUS-01-02 · NeedsEvidence ຢຸດ SLA; ເມື່ອ Evidence valid ຈຶ່ງ resume ດ້ວຍເວລາທີ່ເຫຼືອ.", "AC-BUS-01-03 · Approve ບາງ Item ປ່ຽນສະເພາະ Item ນັ້ນ; Place update + Verification + Request decision + Audit commit/rollback ພ້ອມກັນ.", "AC-BUS-01-04 · Reject ບັງຄັບ reason ແລະ Public Data ບໍ່ປ່ຽນ."],
    evidence: ["Request lifecycle/state tests", "SLA pause/resume clock test", "Approval transaction rollback test", "Audit/communication history", "Manual Pilot log against SLA"],
    downstream: ["UX: Correction form/status", "TEC: request transaction/SLA", "ADM: queue/runbook", "QA: TC-BUS-01-*"],
  },
  {
    id: "ADM-01", priority: "Must", kind: "Functional", title: "Place & Content Administration",
    requirement: "Admin ເພີ່ມ, ແກ້, ກວດ, ເຜີຍແຜ່, ຈັບຄູ່/ຖອນ Source, ຄວບຄຸມ Place/Campaign ແລະຮັກສາ Data Quality/Audit ໄດ້.",
    rationale: "MVP ຍັງບໍ່ມີ Owner/Creator Dashboard; Admin Operations ເປັນຈຸດຄວບຄຸມ Public Data, Attribution, Takedown, Sponsored ແລະ Freshness.",
    useCases: ["UC-ADM-01—04 · Place, Source, Request, Campaign Operations"],
    rules: ["BR-01—07", "BR-11—15", "NFR-04 Privacy/Security Boundary"],
    functionIds: functionsByModule("MOD-04", "MOD-05", "MOD-07", "MOD-08", "MOD-10"),
    entityIds: ["ENT-001", "ENT-002", "ENT-003", "ENT-004", "ENT-005", "ENT-006", "ENT-007", "ENT-008", "ENT-009", "ENT-010", "ENT-011", "ENT-012", "ENT-013", "ENT-014", "ENT-019", "ENT-020", "ENT-021", "ENT-022", "ENT-023", "ENT-024"],
    workflowIds: ["WF-04-01", "WF-04-02", "WF-05-01", "WF-05-02", "WF-05-03", "WF-07-01", "WF-08-01", "WF-10-01", "WF-10-02"],
    stateIds: ["SM-01", "SM-02", "SM-03", "SM-04", "SM-06", "SM-07"],
    errorCodes: ["ERR-AUTHENTICATION-REQUIRED", "ERR-FORBIDDEN", "ERR-VALIDATION", "ERR-INVALID-STATE", "ERR-CONCURRENCY-CONFLICT", "ERR-IDEMPOTENCY-CONFLICT", "ERR-PLACE-PUBLISH-BLOCKED", "ERR-DUPLICATE-REVIEW-REQUIRED", "ERR-MERGE-CONFLICT", "ERR-SOURCE-URL-DUPLICATE", "ERR-SOURCE-VALIDATION", "ERR-SOURCE-PUBLISH-BLOCKED", "ERR-SOURCE-TAKEDOWN-HOLD", "ERR-EVIDENCE-REQUIRED", "ERR-VERIFICATION-INCOMPLETE", "ERR-CAMPAIGN-INELIGIBLE", "ERR-CAMPAIGN-WINDOW", "ERR-JOB-LEASE-CONFLICT", "ERR-WORK-OUTCOME-MISSING", "ERR-DEPENDENCY-TIMEOUT", "ERR-AUDIT-WRITE-FAILED", "ERR-UNEXPECTED"],
    acceptance: ["AC-ADM-01-01 · Admin ແຕ່ລະຄົນ login ດ້ວຍ Account ຕົນເອງ; privileged command ຖືກ authorize ກ່ອນ domain write.", "AC-ADM-01-02 · Place/Source ບໍ່ Publish ຖ້າ gate ບໍ່ຄົບ; blocker ຖືກສົ່ງກັບແບບລະອຽດ.", "AC-ADM-01-03 · Merge ຍ້າຍ relation + redirect + state + Audit ແບບ atomic; failure ໃດໜຶ່ງ rollback ທັງໝົດ.", "AC-ADM-01-04 · Work Queue ຈັດ urgent/overdue ກ່ອນ, claim ບໍ່ຊ້ຳ ແລະ completed item ມີ outcome.", "AC-ADM-01-05 · Takedown ຖອນ Source ຈາກ Public View ທັນທີ ແລະຫ້າມ Auto-restore."],
    evidence: ["Admin authorization tests", "Publish/merge/takedown transaction tests", "Work queue lease/concurrency tests", "Audit completeness query", "Operational Pilot checklist"],
    downstream: ["UX: Admin console/queue", "TEC: auth/domain transactions/jobs", "ADM: SOP & incident runbook", "QA: TC-ADM-01-*"],
  },
  {
    id: "TRU-01", priority: "Must", kind: "Functional", title: "Trust Labels",
    requirement: "Source linked, Creator attribution, Place verified/Freshness, Founding Partner ແລະ Sponsored ຕ້ອງເປັນ Label ຄົນລະປະເພດ ແລະມາຈາກ Evidence/State ຄົນລະຊຸດ.",
    rationale: "ລາຍຮັບຈາກ Partner/Sponsored ຈະທຳລາຍຄວາມເຊື່ອໝັ້ນຖ້າຜູ້ໃຊ້ເຂົ້າໃຈວ່າການຈ່າຍເງິນຊື້ Verification ຫຼືຄະແນນ Review ໄດ້.",
    useCases: ["UC-USR-01", "UC-USR-03", "UC-ADM-01—04"],
    rules: ["BR-03 Unknown Data", "BR-04 Attribution", "BR-05 Separate Trust Labels", "BR-07 Sponsored Period", "BR-13 Freshness", "BR-15 Availability"],
    functionIds: ["FN-FEED-002", "FN-FEED-003", "FN-SRCH-004", "FN-PLC-002", "FN-PLC-003", "FN-SRC-002", "FN-SRC-003", "FN-SRC-005", "FN-PADM-003", "FN-PADM-004", "FN-PADM-005", "FN-CMP-001", "FN-CMP-002", "FN-CMP-003", "FN-CMP-004", "FN-DQ-001", "FN-DQ-002", "FN-DQ-003", "FN-DQ-004"],
    entityIds: ["ENT-001", "ENT-010", "ENT-011", "ENT-012", "ENT-014", "ENT-021", "ENT-022", "ENT-024"],
    workflowIds: ["WF-01-01", "WF-02-01", "WF-03-01", "WF-04-01", "WF-04-02", "WF-07-01", "WF-10-01", "WF-10-02"],
    stateIds: ["SM-01", "SM-02", "SM-03", "SM-04", "SM-06"],
    errorCodes: ["ERR-PLACE-PUBLISH-BLOCKED", "ERR-SOURCE-VALIDATION", "ERR-SOURCE-PUBLISH-BLOCKED", "ERR-SOURCE-TAKEDOWN-HOLD", "ERR-VERIFICATION-INCOMPLETE", "ERR-CAMPAIGN-INELIGIBLE", "ERR-CAMPAIGN-WINDOW"],
    acceptance: ["AC-TRU-01-01 · Source label ອ້າງ canonical URL/Creator; Verified label ອ້າງ latest valid Verification; Partner label ອ້າງ Membership; Sponsored label ອ້າງ Active Campaign.", "AC-TRU-01-02 · ປ້າຍທັງ 4 ປາກົດ/ຫາຍໄປຕາມ State ຂອງຕົນ ໂດຍບໍ່ປ່ຽນອີກປ້າຍໜຶ່ງ.", "AC-TRU-01-03 · Sponsored Placement ປາກົດສະເພາະ Active window ແລະມີ Disclosure ທຸກຈຸດ."],
    evidence: ["Label truth-table tests", "Campaign time-boundary tests", "Freshness expiry tests", "Attribution/takedown content audit"],
    downstream: ["UX: label/disclosure system", "CON-05: copyright/sponsored policy", "TEC: label resolver", "QA: TC-TRU-01-*"],
  },
  {
    id: "ANA-01", priority: "Must", kind: "Functional", title: "Product Analytics",
    requirement: "ບັນທຶກ Feed View, Place Open, Search, Filter, Map, Call, Message, Save ແລະ Share ຕາມ Consent/Event Dictionary ແລະສະຫຼຸບ Funnel/Performance ໂດຍບໍ່ອ້າງ Intent ເປັນ Visit/Sale.",
    rationale: "Pilot ຕ້ອງພິສູດ Decision Intent ແລະມູນຄ່າໃຫ້ຮ້ານ, ແຕ່ການວັດຕ້ອງບໍ່ລະເມີດ Guest-first/Privacy ຫຼືອ້າງເກີນຫຼັກຖານ.",
    useCases: ["UC-USR-01—05", "UC-ADM-01—04"], rules: ["BR-08 Anonymous Analytics", "BR-09 Decision Intent", "BR-10 No Transaction"],
    functionIds: functionsByModule("MOD-09"),
    entityIds: ["ENT-001", "ENT-011", "ENT-022", "ENT-025", "ENT-026", "ENT-027"],
    workflowIds: ["WF-09-01", "WF-09-02"], stateIds: [],
    errorCodes: ["ERR-VALIDATION", "ERR-EVENT-SCHEMA", "ERR-REPORT-DEFINITION-CONFLICT", "ERR-RATE-LIMITED", "ERR-UNEXPECTED"],
    acceptance: ["AC-ANA-01-01 · Optional Event ຖືກຮັບສະເພາະເມື່ອ consent = AnalyticsAllowed; Core Journey ຍັງໃຊ້ໄດ້ເມື່ອ EssentialOnly.", "AC-ANA-01-02 · Event name/property ຢູ່ allowlist, server timestamp/version ຖືກບັນທຶກ ແລະ payload ບໍ່ມີ PII.", "AC-ANA-01-03 · event_id ກັນ ingest retry ຊ້ຳ; dedupe_key ກັນ Decision Intent ຊ້ຳ.", "AC-ANA-01-04 · Report ມີ period, definition version, data-quality flag ແລະລະບຸຊັດວ່າ Intent ບໍ່ແມ່ນ Visit/Sale."],
    evidence: ["Event schema/PII negative tests", "Consent-mode E2E", "Event/intent dedupe test", "Funnel reconciliation query", "Partner report review"],
    downstream: ["DEL-04: Analytics Plan", "TEC: event ingest/reporting", "Privacy notice", "QA: TC-ANA-01-*"],
  },
  {
    id: "NFR-01", priority: "Must", kind: "Non-functional", title: "Mobile-first Usability",
    requirement: "Feed, Search, Place ແລະ Decision Action ຕ້ອງໃຊ້ງານໄດ້ໃນ Mobile viewport ແລະ Core Journey ໃຊ້ດ້ວຍມືດຽວໄດ້ກ່ອນ Desktop.",
    rationale: "ການຄົ້ນພົບ/ເດີນທາງເກີດໃນໂທລະສັບ; Function ທີ່ຖືກແຕ່ UI ໃຊ້ບໍ່ໄດ້ໃນ Mobile ຖືວ່າ Requirement ບໍ່ຜ່ານ.",
    useCases: ["UC-USR-01—05"], rules: ["Mobile-first UX baseline", "Guest-first core journey"],
    functionIds: unique([...functionsByModule("MOD-01", "MOD-02"), "FN-PLC-001", "FN-PLC-004", "FN-ACT-001", "FN-ACT-002", "FN-ACT-003", "FN-ACT-004", "FN-ACT-005"]),
    entityIds: ["ENT-001", "ENT-006", "ENT-010", "ENT-011"], workflowIds: ["WF-01-01", "WF-02-01", "WF-03-01", "WF-03-02"], stateIds: [],
    errorCodes: ["ERR-EXTERNAL-ACTION-UNAVAILABLE", "ERR-DEPENDENCY-TIMEOUT"],
    acceptance: ["AC-NFR-01-01 · Core Journey Feed → Place → Map/Call/Message ສຳເລັດທີ່ viewport 360×640 ໂດຍບໍ່ມີ horizontal page scroll.", "AC-NFR-01-02 · Primary action ຢູ່ໃນ thumb-reachable area ຫຼື sticky action area; text/input ບໍ່ຖືກ keyboard ບັງ.", "AC-NFR-01-03 · Orientation/viewport change ບໍ່ເສຍ current Place, query, filters ຫຼື save state."],
    evidence: ["Responsive E2E: 360×640, 390×844, 768×1024", "Real-device Pilot checklist", "Touch target/overflow automated checks"],
    downstream: ["UX: responsive wireframes", "Design system: spacing/touch targets", "QA: TC-NFR-01-*"],
  },
  {
    id: "NFR-02", priority: "Must", kind: "Non-functional", title: "Performance & Resilience",
    requirement: "Core content ແລະ Place Data ຕ້ອງໂຫຼດໄດ້ໃນ Mobile Network; Preview/External Embed ຊ້າຫຼືລົ້ມຕ້ອງມີ Placeholder/Fallback ແລະບໍ່ block Journey.",
    rationale: "Platform ພຶ່ງພາ Social Source ແລະ External App ທີ່ຄວບຄຸມບໍ່ໄດ້. Resilience ຈຶ່ງເປັນ Core Behavior ບໍ່ແມ່ນການປັບສວຍພາຍຫຼັງ.",
    useCases: ["UC-USR-01—04", "UC-ADM-01—04"], rules: ["BR-15 Source Availability", "Bounded retry", "External call outside DB transaction"],
    functionIds: ["FN-FEED-001", "FN-FEED-004", "FN-FEED-005", "FN-SRCH-002", "FN-PLC-001", "FN-SRC-002", "FN-SRC-003", "FN-SRC-006", "FN-DQ-005", "FN-DQ-006"],
    entityIds: ["ENT-001", "ENT-011", "ENT-012", "ENT-020"], workflowIds: ["WF-01-01", "WF-03-01", "WF-04-02", "WF-10-02"], stateIds: ["SM-03", "SM-04", "SM-07"],
    errorCodes: ["ERR-RATE-LIMITED", "ERR-DEPENDENCY-TIMEOUT", "ERR-JOB-LEASE-CONFLICT", "ERR-UNEXPECTED"],
    acceptance: ["AC-NFR-02-01 · Media timeout ບໍ່ block Place text/action; fallback ປາກົດພ້ອມ Source link.", "AC-NFR-02-02 · Public Query ມີ bounded retry ສູງສຸດ 2 ຄັ້ງ; Source Job ມີ max attempts/lease ແລະບໍ່ສ້າງ result ຊ້ຳ.", "AC-NFR-02-03 · Failure ຄັ້ງດຽວປ່ຽນ availability ເປັນ TemporaryFailure ບໍ່ແມ່ນ ConfirmedUnavailable.", "AC-NFR-02-04 · Performance budget/target ຂັ້ນສຸດທ້າຍຕ້ອງຖືກລະບຸໃນ Technical Proposal ແລະ Release Gate ກ່ອນ Pilot."],
    evidence: ["Network throttling test", "Embed timeout/failure injection", "Retry/idempotency test", "Load/performance report from Technical Proposal"],
    downstream: ["TEC: performance budget/cache/timeout", "UX: skeleton/fallback", "Monitoring: latency/error rate", "QA: TC-NFR-02-*"],
  },
  {
    id: "NFR-03", priority: "Must", kind: "Non-functional", title: "Accessibility",
    requirement: "ຂໍ້ຄວາມມີ Contrast, Interactive Element ມີ Accessible Name, Keyboard ໃຊ້ໄດ້, Focus ເຫັນຊັດ ແລະສະຖານະບໍ່ພຶ່ງສີພຽງຢ່າງດຽວ.",
    rationale: "Feed/Action/Trust Label ທີ່ສື່ຄວາມໝາຍຜ່ານຮູບຫຼືສີຢ່າງດຽວຈະກີດກັ້ນຜູ້ໃຊ້ ແລະເຮັດໃຫ້ Disclosure ບໍ່ຊັດ.",
    useCases: ["UC-USR-01—05"], rules: ["Semantic control", "Visible focus", "Text + icon/state label", "Motion preference"],
    functionIds: ["FN-FEED-005", "FN-SRCH-005", "FN-PLC-003", "FN-PLC-004", "FN-ACT-001", "FN-ACT-002", "FN-ACT-003", "FN-ACT-004", "FN-ACT-005"],
    entityIds: ["ENT-001", "ENT-006", "ENT-011", "ENT-022"], workflowIds: ["WF-01-01", "WF-02-01", "WF-03-01", "WF-03-02"], stateIds: [],
    errorCodes: ["ERR-EXTERNAL-ACTION-UNAVAILABLE", "ERR-VALIDATION", "ERR-NOT-FOUND"],
    acceptance: ["AC-NFR-03-01 · Feed, Search, Place ແລະ Action ໃຊ້ Keyboard ໄດ້ຕາມລຳດັບສົມເຫດຜົນ; Focus ບໍ່ຖືກຊ່ອນ.", "AC-NFR-03-02 · Button/Input/Link ມີ accessible name; Media ມີ fallback text; status/error ຖືກປະກາດຕາມຄວາມເໝາະສົມ.", "AC-NFR-03-03 · Trust/Sponsored/Freshness ມີຂໍ້ຄວາມ ຫຼື icon+label; ບໍ່ໃຊ້ສີພຽງຢ່າງດຽວ.", "AC-NFR-03-04 · Automated accessibility scan ບໍ່ມີ Critical/Serious issue ໃນ Core Screens; manual keyboard/screen-reader smoke test ຜ່ານ."],
    evidence: ["Automated accessibility report", "Keyboard test recording/checklist", "Screen-reader smoke test", "Contrast/touch target audit"],
    downstream: ["UX/UI accessibility annotations", "Design system tokens/components", "QA: TC-NFR-03-*"],
  },
  {
    id: "NFR-04", priority: "Must", kind: "Non-functional", title: "Privacy & Data Minimization",
    requirement: "Core Journey ບໍ່ບັງຄັບ Account, ບໍ່ເກັບ continuous location, ເກັບ Optional Analytics ຕາມ Consent, ປົກປ້ອງ ProtectedText ແລະບໍ່ອ້າງ Decision Intent ເປັນ Visit/Sale.",
    rationale: "Guest-first ແລະຄວາມເຊື່ອໝັ້ນຂອງຜູ້ໃຊ້/ຮ້ານຂຶ້ນກັບການເກັບຂໍ້ມູນເທົ່າທີ່ຈຳເປັນ ແລະການລາຍງານຕາມຫຼັກຖານ.",
    useCases: ["UC-USR-01—05", "UC-BUS-01", "UC-ADM-01—04"],
    rules: ["BR-08 Anonymous Analytics", "BR-09 Decision Intent", "BR-10 No Transaction", "BR-11 Admin Identity"],
    functionIds: unique([...functionsByModule("MOD-09"), "FN-ACT-001", "FN-ACT-002", "FN-ACT-003", "FN-ACT-004", "FN-ACT-005", "FN-REQ-001", "FN-REQ-003", "FN-ADM-001", "FN-ADM-002", "FN-ADM-004"]),
    entityIds: ["ENT-015", "ENT-017", "ENT-018", "ENT-023", "ENT-024", "ENT-025", "ENT-026", "ENT-027"],
    workflowIds: ["WF-03-02", "WF-06-01", "WF-08-01", "WF-09-01", "WF-09-02"], stateIds: ["SM-05"],
    errorCodes: ["ERR-AUTHENTICATION-REQUIRED", "ERR-FORBIDDEN", "ERR-EVENT-SCHEMA", "ERR-REPORT-DEFINITION-CONFLICT", "ERR-AUDIT-WRITE-FAILED", "ERR-UNEXPECTED"],
    acceptance: ["AC-NFR-04-01 · Guest ໃຊ້ Feed/Search/Place/Action ໄດ້ໂດຍບໍ່ມີ Account ແລະເມື່ອປະຕິເສດ Optional Analytics.", "AC-NFR-04-02 · Analytics payload/schema ບໍ່ຮັບຊື່, ເບີໂທ, requester contact, precise continuous location ຫຼື field ນອກ allowlist.", "AC-NFR-04-03 · Error/Log/Audit ບໍ່ມີ password, token, raw credential ຫຼື ProtectedText; access ກັບ Request/Admin data ຖືກ authorize.", "AC-NFR-04-04 · Funnel/Partner/Campaign report ລະບຸ Decision Intent ວ່າບໍ່ແມ່ນ Visit/Sale ແລະບໍ່ສົ່ງ individual session rows."],
    evidence: ["Consent/no-account E2E", "PII payload negative tests", "Log redaction/security review", "Report content/privacy review"],
    downstream: ["Privacy notice/data retention", "TEC-06 security design", "DEL-04 analytics", "QA: TC-NFR-04-*"],
  },
];

const allFunctionIds = systemFunctionCatalog.map((fn) => fn.id);
const coveredRequirementIds = unique(traceRows.map((row) => row.id));
const coveredFunctionIds = unique(traceRows.flatMap((row) => row.functionIds));
const coveredEntityIds = unique(traceRows.flatMap((row) => row.entityIds));
const coveredWorkflowIds = unique(traceRows.flatMap((row) => row.workflowIds));
const coveredStateIds = unique(traceRows.flatMap((row) => row.stateIds));
const coveredErrorCodes = unique(traceRows.flatMap((row) => row.errorCodes));

const missingRequirementIds = productRequirementIds.filter((id) => !coveredRequirementIds.includes(id));
const unknownRequirementIds = coveredRequirementIds.filter((id) => !productRequirementIds.includes(id));
const missingFunctionIds = allFunctionIds.filter((id) => !coveredFunctionIds.includes(id));
const unknownFunctionIds = coveredFunctionIds.filter((id) => !allFunctionIds.includes(id));
const missingEntityIds = systemEntityIds.filter((id) => !coveredEntityIds.includes(id));
const unknownEntityIds = coveredEntityIds.filter((id) => !systemEntityIds.includes(id));
const missingWorkflowIds = systemWorkflowIds.filter((id) => !coveredWorkflowIds.includes(id));
const unknownWorkflowIds = coveredWorkflowIds.filter((id) => !systemWorkflowIds.includes(id));
const missingStateIds = systemStateMachineIds.filter((id) => !coveredStateIds.includes(id));
const unknownStateIds = coveredStateIds.filter((id) => !systemStateMachineIds.includes(id));
const missingErrorCodes = systemErrorCodes.filter((id) => !coveredErrorCodes.includes(id));
const unknownErrorCodes = coveredErrorCodes.filter((id) => !systemErrorCodes.includes(id));

const coverageChecks = [
  ["PRO-01 REQUIREMENTS", coveredRequirementIds.length, productRequirementIds.length, missingRequirementIds, unknownRequirementIds],
  ["FUNCTIONS", coveredFunctionIds.length, allFunctionIds.length, missingFunctionIds, unknownFunctionIds],
  ["ENTITIES", coveredEntityIds.length, systemEntityIds.length, missingEntityIds, unknownEntityIds],
  ["WORKFLOWS", coveredWorkflowIds.length, systemWorkflowIds.length, missingWorkflowIds, unknownWorkflowIds],
  ["STATE MACHINES", coveredStateIds.length, systemStateMachineIds.length, missingStateIds, unknownStateIds],
  ["ERROR CODES", coveredErrorCodes.length, systemErrorCodes.length, missingErrorCodes, unknownErrorCodes],
] as const;

const coveragePass = coverageChecks.every(([, covered, total, missing, unknown]) => covered === total && missing.length === 0 && unknown.length === 0);

const moduleCoverage = Array.from(new Set(systemFunctionCatalog.map((fn) => fn.moduleId))).map((moduleId) => {
  const functions = systemFunctionCatalog.filter((fn) => fn.moduleId === moduleId);
  const requirements = traceRows.filter((row) => row.functionIds.some((id) => functions.some((fn) => fn.id === id))).map((row) => row.id);
  return { moduleId, moduleName: functions[0]?.moduleName ?? "", functions: functions.map((fn) => fn.id), requirements };
});

const changeRules = [
  ["01 · PROPOSE", "ບັນທຶກ Change Request ພ້ອມ Requirement ID, ເຫດຜົນ, owner, priority ແລະຜົນທີ່ຄາດ. ຫ້າມແກ້ Function/Entity ໂດຍບໍ່ຮູ້ Source Requirement."],
  ["02 · IMPACT", "ເປີດ Trace Row ແລະລວບລວມ Use Case/Rule, Function, Entity, Workflow, State/Error, Acceptance, UX/Technical/QA/Delivery artifact ທີ່ຖືກກະທົບ."],
  ["03 · DECIDE", "Product Owner ອະນຸມັດ Scope/Priority; SA ອະນຸມັດ Logic/Data impact; Technical/UX/QA owner ຢືນຢັນ estimate ແລະ risk ກ່ອນຮັບ change."],
  ["04 · UPDATE", "ປັບ PRO-01 ກ່ອນ ຫຼືພ້ອມ PRO-02. ຖ້າ split/merge ID ຕ້ອງຮັກສາ mapping ແລະຫ້າມນຳ ID ທີ່ຍົກເລີກກັບມາໃຊ້ໃໝ່."],
  ["05 · VERIFY", "ອັບເດດ Acceptance/Test, ແລ່ນ Coverage Gate ໃຫ້ບໍ່ມີ Missing/Unknown ID ແລະກວດຫຼັກຖານຂອງ Regression ທີ່ Matrix ຊີ້."],
  ["06 · BASELINE", "ບັນທຶກ version/date/decision, ແຈ້ງ owner ຂອງ downstream artifact ແລະປິດ change ເມື່ອ Documentation + Implementation + Evidence ສອດຄ່ອງ."],
] as const;

export default function SystemAnalysisTraceability() {
  return (
    <section className={styles.saTraceability} id="sa-full-traceability">
      <header className={styles.saPartHeader}>
        <span>ພາກ G · ຂັ້ນ 6 ຂອງ SA</span>
        <h2>Requirement Traceability Matrix</h2>
        <p>Traceability ໃນພາກນີ້ບໍ່ແມ່ນພຽງຕາຕະລາງບອກວ່າ Requirement “ມີແລ້ວ”. ແຕ່ລະ PRO-01 ID ຖືກເຊື່ອມໄປຫາ Use Case/Business Rule, Function, Entity, Workflow, State/Error, Acceptance, Test Evidence ແລະ downstream document ທີ່ຕ້ອງຮັບຜິດຊອບ.</p>
        <p>Matrix ໃຊ້ເພື່ອຕອບ 3 ຄຳຖາມ: (1) ມີ Requirement ໃດຕົກຫຼົ່ນບໍ່, (2) Function/Data/Workflow ໃດບໍ່ມີ Requirement ຮອງຮັບ, ແລະ (3) ເມື່ອ Requirement ປ່ຽນ ຕ້ອງທົບທວນຫຍັງແດ່.</p>
      </header>

      <div className={styles.saCatalogSummary}>
        <article><small>PRO-01 BASELINE</small><strong>{productRequirementIds.length}</strong><p>9 Functional + 4 Non-functional Requirements</p></article>
        <article><small>FUNCTIONS</small><strong>{coveredFunctionIds.length}/{allFunctionIds.length}</strong><p>Forward coverage ຈາກ Requirement ຫາ Function Catalog</p></article>
        <article><small>DESIGN OBJECTS</small><strong>{coveredEntityIds.length + coveredWorkflowIds.length}</strong><p>{coveredEntityIds.length} Entities + {coveredWorkflowIds.length} Workflows</p></article>
        <article><small>CONTROL OBJECTS</small><strong>{coveredStateIds.length + coveredErrorCodes.length}</strong><p>{coveredStateIds.length} State Machines + {coveredErrorCodes.length} Error Codes</p></article>
      </div>

      <section className={styles.documentArticleSection}>
        <span>G1 · TRACEABILITY MODEL</span>
        <h2>ຕິດຕາມຈາກ “ເປັນຫຍັງ” ຫາ “ພິສູດແນວໃດ”</h2>
        <p className={styles.documentQuestion}>Trace Row ໜຶ່ງອັນຕ້ອງມີຫຍັງຈຶ່ງຊ່ວຍ Developer, UX ແລະ Tester ໄດ້?</p>
        <div className={styles.saTraceFlow}>
          <div><b>01 · SOURCE</b><strong>PRO-01 Requirement</strong><p>ID, priority, requirement, rationale</p></div><i>→</i>
          <div><b>02 · ANALYSIS</b><strong>Use Case & Rule</strong><p>Actor, workflow intent, business constraint</p></div><i>→</i>
          <div><b>03 · SYSTEM</b><strong>Function & Data</strong><p>Logical function, entity, relationship</p></div><i>→</i>
          <div><b>04 · CONTROL</b><strong>Workflow, State & Error</strong><p>sequence, transition, guard, failure</p></div><i>→</i>
          <div><b>05 · PROOF</b><strong>Acceptance & Evidence</strong><p>Given/When/Then, test, event, report</p></div>
        </div>
        <div className={styles.saTracePrinciples}>
          <article><b>FORWARD TRACE</b><h3>Requirement → Build</h3><p>ທຸກ Requirement ຕ້ອງມີຢ່າງໜ້ອຍ 1 Function/Workflow ຫຼື quality control ແລະ 1 Acceptance Evidence.</p></article>
          <article><b>BACKWARD TRACE</b><h3>Build → Reason</h3><p>ທຸກ Function, Entity, Workflow, State/Error ຕ້ອງຊີ້ກັບໄປ Requirement ຢ່າງໜ້ອຍ 1 ຂໍ້; ຖ້າບໍ່ມີອາດເປັນ Scope Creep.</p></article>
          <article><b>VERIFICATION TRACE</b><h3>Requirement → Proof</h3><p>Acceptance ບອກ expected behavior; Evidence ບອກ artifact/log/report ທີ່ຢືນຢັນວ່າ behavior ເກີດຈິງ.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>G2 · COVERAGE GATES</span>
        <h2>ບໍ່ມີ Missing ID, Unknown ID ຫຼື Orphan System Object</h2>
        <div className={coveragePass ? styles.saCoveragePass : styles.saCoverageFail}>
          <strong>{coveragePass ? "PASS" : "FAIL"}</strong><div><b>{coveragePass ? "FULL TRACEABILITY COVERAGE" : "TRACEABILITY MISMATCH"}</b><p>{coveragePass ? `PRO-01 ${productRequirementIds.length} Requirements ເຊື່ອມຄົບຫາ ${allFunctionIds.length} Functions, ${systemEntityIds.length} Entities, ${systemWorkflowIds.length} Workflows, ${systemStateMachineIds.length} State Machines ແລະ ${systemErrorCodes.length} Error Codes.` : "ມີ Missing/Unknown ID; ຫ້າມນຳ Matrix ໄປເປັນ baseline ຈົນກວ່າຈະແກ້ຄົບ."}</p></div>
        </div>
        <div className={styles.saTraceCoverageGrid}>
          {coverageChecks.map(([label, covered, total, missing, unknown]) => {
            const pass = covered === total && missing.length === 0 && unknown.length === 0;
            return <article key={label} className={pass ? styles.saTraceCheckPass : styles.saTraceCheckFail}><small>{label}</small><strong>{covered}/{total}</strong><b>{pass ? "PASS" : "REVIEW"}</b><p>Missing: {missing.join(", ") || "—"}<br />Unknown: {unknown.join(", ") || "—"}</p></article>;
          })}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>G3 · MASTER MATRIX</span>
        <h2>13 PRO-01 Requirements ກັບ System Responsibility ແລະ Proof</h2>
        <p className={styles.documentQuestion}>ຕາຕະລາງລວມຈະຊ່ວຍຄົ້ນ Requirement ແລະເຫັນຂອບເຂດການກະທົບໄດ້ແນວໃດ?</p>
        <div className={styles.saTraceMasterTable} role="table" aria-label="Master requirement traceability matrix">
          <div role="row"><b>PRO-01 / PRIORITY</b><b>REQUIREMENT</b><b>FUNCTIONS</b><b>DATA / WORKFLOW</b><b>STATE / ERROR</b><b>ACCEPTANCE / EVIDENCE</b></div>
          {traceRows.map((row) => <div role="row" key={row.id}>
            <div><b>{row.id}</b><span>{row.priority} · {row.kind}</span></div>
            <div><strong>{row.title}</strong><p>{row.requirement}</p></div>
            <p>{row.functionIds.length} Functions<br /><code>{row.functionIds.join(" · ")}</code></p>
            <p>{row.entityIds.length} Entities · {row.workflowIds.length} Workflows<br /><code>{[...row.entityIds, ...row.workflowIds].join(" · ")}</code></p>
            <p>{row.stateIds.length} State Machines · {row.errorCodes.length} Errors<br /><code>{[...row.stateIds, ...row.errorCodes].join(" · ") || "—"}</code></p>
            <p>{row.acceptance.length} Acceptance Scenarios · {row.evidence.length} Evidence Types</p>
          </div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>G4 · REQUIREMENT TRACE RECORDS</span>
        <h2>ລາຍລະອຽດຈາກ Rationale ຫາ Test Evidence ແຍກແຕ່ລະ Requirement</h2>
        <div className={styles.saTraceRecords}>
          {traceRows.map((row, index) => <details key={row.id} open={index === 0}>
            <summary><span>{row.id}</span><div><small>{row.priority} · {row.kind}</small><strong>{row.title}</strong></div><em>{row.functionIds.length} FN · {row.acceptance.length} AC</em></summary>
            <div className={styles.saTraceRequirement}><div><b>REQUIREMENT</b><p>{row.requirement}</p></div><div><b>WHY / RATIONALE</b><p>{row.rationale}</p></div></div>
            <div className={styles.saTraceAnalysis}><div><b>USE CASES</b><p>{row.useCases.join(" · ")}</p></div><div><b>BUSINESS / QUALITY RULES</b><p>{row.rules.join(" · ")}</p></div></div>
            <div className={styles.saTraceSystemGrid}>
              <div><b>FUNCTIONS</b><p>{row.functionIds.join(" · ")}</p></div>
              <div><b>ENTITIES</b><p>{row.entityIds.join(" · ") || "—"}</p></div>
              <div><b>WORKFLOWS</b><p>{row.workflowIds.join(" · ") || "—"}</p></div>
              <div><b>STATE MACHINES</b><p>{row.stateIds.join(" · ") || "Not stateful / covered through function contract"}</p></div>
              <div><b>ERROR CODES</b><p>{row.errorCodes.join(" · ")}</p></div>
              <div><b>DOWNSTREAM OWNERSHIP</b><p>{row.downstream.join(" · ")}</p></div>
            </div>
            <div className={styles.saTraceAcceptance}><div><b>ACCEPTANCE SCENARIOS</b><ol>{row.acceptance.map((item) => <li key={item}>{item}</li>)}</ol></div><div><b>REQUIRED EVIDENCE</b><ul>{row.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
          </details>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>G5 · REVERSE FUNCTION COVERAGE</span>
        <h2>10 Modules ແລະ 64 Functions ຊີ້ກັບໄປ PRO-01 ໄດ້</h2>
        <p className={styles.documentQuestion}>ຈະກວດ Scope Creep ຫຼື Function ທີ່ບໍ່ມີ Requirement ຮອງຮັບແນວໃດ?</p>
        <div className={styles.saReverseCoverage}>
          {moduleCoverage.map((module) => <details key={module.moduleId}>
            <summary><span>{module.moduleId}</span><strong>{module.moduleName}</strong><em>{module.functions.length} Functions · {module.requirements.length} Requirements</em></summary>
            <div><b>FUNCTION IDS</b><p>{module.functions.join(" · ")}</p></div>
            <div><b>SOURCE REQUIREMENTS</b><p>{module.requirements.join(" · ")}</p></div>
            <div><b>INTERPRETATION</b><p>Requirement ໜຶ່ງອາດຮອງຮັບຫຼາຍ Functions ແລະ Function ໜຶ່ງອາດຮອງຮັບຫຼາຍ Requirements. “Covered” ໝາຍເຖິງມີເຫດຜົນ/Acceptance ຮອງຮັບ; ບໍ່ໄດ້ໝາຍຄວາມວ່າ Function ຖືກພັດທະນາແລ້ວ.</p></div>
          </details>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>G6 · CHANGE IMPACT CONTROL</span>
        <h2>Requirement ປ່ຽນໜຶ່ງຂໍ້ ຕ້ອງປັບທຸກ Artifact ທີ່ Matrix ຊີ້</h2>
        <p className={styles.documentQuestion}>ຈະປ້ອງກັນ PRD, SA, UX, Technical Design, Code ແລະ Test ບໍ່ກົງກັນຫຼັງມີ Change Request ແນວໃດ?</p>
        <ol className={styles.saChangeRules}>{changeRules.map(([step, detail]) => <li key={step}><b>{step}</b><p>{detail}</p></li>)}</ol>
        <div className={styles.saTraceChangeExample}>
          <b>ຕົວຢ່າງ · ຖ້າ USR-04 ເພີ່ມ “ຈອງໂຕະ”</b>
          <p>ບໍ່ສາມາດເພີ່ມປຸ່ມໃນ UX ຢ່າງດຽວ. Change ຈະກະທົບ BR-10 No Transaction, Function Catalog ຂອງ MOD-03, Entity/Relationship ສຳລັບ Booking, Workflow/State/Error ຂອງທຸລະກຳ, Privacy/Analytics, Technical Scope, Financial/Operational risk ແລະ Test/UAT. ດັ່ງນັ້ນ Matrix ຊີ້ວ່ານີ້ແມ່ນ Scope Expansion ບໍ່ແມ່ນ UI Change ຂະໜາດນ້ອຍ.</p>
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>G7 · BASELINE DECISION</span>
        <h2>ຂັ້ນ 6 ສຳເລັດ ແຕ່ Traceability ຍັງບໍ່ແທນ Acceptance Criteria/Test Plan ສະບັບເຕັມ</h2>
        <div className={styles.saWorkflowConditions}>
          <div><b>WHAT IS BASELINED</b><ul><li>PRO-01 13 Requirements ມີ Forward/Backward Trace.</li><li>64 Functions, 27 Entities, 16 Workflows, 7 State Machines ແລະ 30 Error Codes ບໍ່ມີ orphan.</li><li>ທຸກ Requirement ມີ Acceptance Scenario ແລະ Evidence Type ເບື້ອງຕົ້ນ.</li><li>Change Impact Process ແລະ downstream ownership ຖືກກຳນົດ.</li></ul></div>
          <div><b>WHAT REMAINS</b><ul><li>PRO-04 ຈະແຕກ Acceptance ເປັນ Test Case/Boundary/Negative Case ສະບັບເຕັມ.</li><li>UX/UI ຈະອ້າງ Requirement/Function/State ກັບ Screen/Component.</li><li>Technical Proposal/Data & API/Security ຈະອ້າງ Function/Entity/Error Contract.</li><li>Development Plan ຈະອ້າງ Dependency Order ແລະ Definition of Done.</li></ul></div>
        </div>
        <aside className={styles.saNextStep}><small>NEXT · STEP 7</small><h2>Development Starting Point & Dependency Order</h2><p>ຂັ້ນສຸດທ້າຍຂອງ PRO-02 ຈະແປ 10 Modules, 64 Functions, 27 Entities, 16 Workflows, State/Error ແລະ Traceability ໃຫ້ເປັນ Dependency Graph, implementation slices, starting point, Definition of Ready/Done ແລະ Developer Handoff checklist.</p></aside>
      </section>
    </section>
  );
}
