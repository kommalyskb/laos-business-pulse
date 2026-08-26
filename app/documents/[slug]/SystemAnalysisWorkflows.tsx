import styles from "../documents.module.css";
import { systemFunctionIds } from "./SystemAnalysisFunctionCatalog";

type SequenceStep = {
  actor: string;
  functionId: string;
  action: string;
  data: string;
  result: string;
  boundary: string;
};

type AlternateFlow = {
  code: string;
  condition: string;
  response: string;
  continuation: string;
};

type Workflow = {
  id: string;
  module: string;
  title: string;
  lao: string;
  goal: string;
  trigger: string;
  preconditions: string[];
  participants: string[];
  functionIds: string[];
  steps: SequenceStep[];
  transaction: string;
  idempotency: string;
  alternates: AlternateFlow[];
  postconditions: string[];
};

const s = (actor: string, functionId: string, action: string, data: string, result: string, boundary: string): SequenceStep => ({ actor, functionId, action, data, result, boundary });
const x = (code: string, condition: string, response: string, continuation: string): AlternateFlow => ({ code, condition, response, continuation });

const workflows: Workflow[] = [
  {
    id: "WF-01-01", module: "MOD-01 · DISCOVERY FEED", title: "Load Discovery Feed", lao: "ໂຫຼດ ແລະເລື່ອນ Feed",
    goal: "ສົ່ງ Feed Page ທີ່ມີແຕ່ Place/Source ມີສິດສະແດງ, ບໍ່ຊ້ຳໃນ Session ແລະຍັງໃຊ້ໄດ້ເມື່ອ Embed ລົ້ມ.",
    trigger: "Guest ເປີດ Feed ຫຼືຮ້ອງຂໍ nextCursor.",
    preconditions: ["ມີ Published Place ຢ່າງໜ້ອຍ 1", "Content Source ມີ Canonical URL ແລະ Attribution", "Cursor ບໍ່ຖືກແກ້ໄຂຈາກ Client"],
    participants: ["Guest Web", "Feed Module", "Eligibility Control", "Place/Content Store", "Analytics"],
    functionIds: ["FN-FEED-001", "FN-FEED-002", "FN-FEED-003", "FN-FEED-004", "FN-FEED-005"],
    steps: [
      s("Guest Web", "FN-FEED-001 / 004", "ສົ່ງ cursor, pageSize ແລະ optional category", "Input ຖືກ validate; pageSize ຖືກຈຳກັດ", "Feed request ທີ່ normalize ແລ້ວ", "READ"),
      s("Feed Module", "FN-FEED-002", "ອ່ານ candidate Place/Source/Campaign", "Published Place + Published/Available Source; Active Campaign ເທົ່ານັ້ນ", "Eligible ordered candidates", "READ"),
      s("Feed Module", "FN-FEED-003", "ປະກອບ FeedItem ແຕ່ລະລາຍການ", "Place summary, Creator attribution, Trust/Freshness/Sponsored labels", "Normalized FeedItem", "READ"),
      s("Feed Module", "FN-FEED-001 / 004", "ຕັດ Page ແລະສ້າງ opaque nextCursor", "Cursor ອ້າງ ordering key ບໍ່ແມ່ນ client offset", "feedItems + nextCursor/null", "READ"),
      s("Guest Web", "FN-FEED-005", "Render official embed ຫຼື fallback", "ບໍ່ download/re-host media; fallback ມີ creator + source link", "Feed ທີ່ເລື່ອນໄດ້", "CLIENT"),
      s("Guest Web", "FN-ANA-003", "ສົ່ງ FeedView event ເມື່ອຜ່ານ Consent", "Event ບໍ່ block Feed response", "Accepted/rejected telemetry", "ASYNC"),
    ],
    transaction: "Read-only query. ບໍ່ເປີດ Database Transaction ຍາວຕະຫຼອດການ render media; Analytics ແຍກ request.",
    idempotency: "Cursor ດຽວ + eligibility snapshot ດຽວຄວນສົ່ງ ordering ຄົງທີ່. FeedView event ໃຊ້ event ID ເພື່ອກັນ retry ຊ້ຳ.",
    alternates: [
      x("A1", "Cursor ຜິດ/ໝົດອາຍຸ", "ປະຕິເສດ cursor ແລະສົ່ງ restart instruction", "Client ໂຫຼດ page ທຳອິດ"),
      x("A2", "Source embed ລົ້ມຄັ້ງດຽວ", "Render fallback; ບໍ່ປ່ຽນ Source status", "Journey ສືບຕໍ່ຫາ Place Page"),
      x("A3", "ບໍ່ມີ eligible item", "ສະແດງ end/empty state", "ບໍ່ສ້າງ item ຄາດເດົາ"),
    ],
    postconditions: ["Guest ໄດ້ຮັບ Feed ທີ່ບໍ່ມີ Draft/Unavailable Source", "Sponsored item ມີປ້າຍ", "ບໍ່ມີ Business State ຖືກປ່ຽນ"],
  },
  {
    id: "WF-02-01", module: "MOD-02 · SEARCH & FILTER", title: "Search Published Places", lao: "ຄົ້ນຫາ ແລະກອງ Place",
    goal: "ສົ່ງ Place ທີ່ກົງ query/category/area/price ໂດຍຮັກສາ Organic relevance ແລະແຍກ Sponsored ຊັດເຈນ.",
    trigger: "Guest ພິມຄຳຄົ້ນ, ເລືອກ Filter ຫຼືລ້າງ Filter.",
    preconditions: ["Searchable Place ຕ້ອງ Published", "Category/Area filter ID ຕ້ອງ active", "MVP ບໍ່ຮອງຮັບ Near me/Open now"],
    participants: ["Guest Web", "Search Module", "Place Catalog", "Campaign Module", "Analytics"],
    functionIds: ["FN-SRCH-001", "FN-SRCH-002", "FN-SRCH-003", "FN-SRCH-004", "FN-SRCH-005"],
    steps: [
      s("Guest Web", "FN-SRCH-002 / 003", "ສົ່ງ query + filters + cursor", "Client ສົ່ງ raw values", "Search request", "READ"),
      s("Search Module", "FN-SRCH-001", "Normalize query", "Trim/normalize ໂດຍບໍ່ປ່ຽນຄວາມໝາຍ", "tokens + normalized query", "CONTROL"),
      s("Search Module", "FN-SRCH-002", "Match display name, alias ແລະ searchable terms", "ຕັດ Draft/Suspended/Archived", "Matching Place IDs", "READ"),
      s("Search Module", "FN-SRCH-003", "Apply category/area/price filters", "AND ລະຫວ່າງ filter groups; OR ພາຍໃນ group ຕາມ UI contract", "Filtered candidates", "READ"),
      s("Search Module", "FN-SRCH-004", "ຈັດລຳດັບ relevance ແລະ sponsored slots", "Sponsored ບໍ່ປ່ຽນ verified status", "Ordered result page", "CONTROL"),
      s("Search Module", "FN-SRCH-005", "ສ້າງ empty suggestion ຖ້າ count = 0", "Clear-filter action + suggested categories", "Result/empty response", "READ"),
      s("Guest Web", "FN-ANA-003", "ບັນທຶກ Search/Filter event ຕາມ consent", "ບໍ່ສົ່ງ raw PII", "Telemetry result", "ASYNC"),
    ],
    transaction: "Read-only. Search index ອາດເປັນ Physical Read Model ແຕ່ response ຕ້ອງ recheck Published/Active status ກ່ອນສົ່ງ.",
    idempotency: "Request parameters + cursor ດຽວຄວນໄດ້ deterministic ordering ພາຍໃນ index version ດຽວ.",
    alternates: [x("A1", "Query ຫວ່າງ", "ປະຕິບັດເປັນ browse/filter ບໍ່ແມ່ນ validation error", "ສົ່ງ filtered popular/recent order ຕາມ policy"), x("A2", "Filter ID ບໍ່ຖືກຕ້ອງ", "ສົ່ງ validation error ລະບຸ field", "Client ຖອນ filter ຫຼືໃຫ້ເລືອກໃໝ່"), x("A3", "ບໍ່ພົບຜົນ", "ສົ່ງ empty state; ຫ້າມສະແດງຜົນບໍ່ກົງໂດຍບໍ່ບອກ", "Guest ລ້າງ/ປ່ຽນ filter")],
    postconditions: ["ຜົນທຸກອັນ Published", "Query/filter state ສາມາດສະແດງຄືນໃນ UI", "ບໍ່ມີ Business State ຖືກປ່ຽນ"],
  },
  {
    id: "WF-03-01", module: "MOD-03 · PLACE DETAIL", title: "Open Canonical Place Detail", lao: "ເປີດ Place Page ແລະປະກອບຂໍ້ມູນ",
    goal: "Resolve slug/redirect ແລະສົ່ງ Composite Place Detail ທີ່ມີ Source, Trust/Freshness labels ແລະ Actions.",
    trigger: "Guest ເປີດ Place URL ຈາກ Feed, Search, Shared Link ຫຼື Saved Place.",
    preconditions: ["slug/ID ຜ່ານ format validation", "Public response ຮັບສະເພາະ Published Place"],
    participants: ["Guest Web", "Place Detail Module", "Place Catalog", "Content Module", "Quality/Campaign"],
    functionIds: ["FN-PLC-001", "FN-PLC-002", "FN-PLC-003", "FN-PLC-004"],
    steps: [
      s("Place Detail Module", "FN-PADM-010", "Resolve slug/placeId", "ກວດ current Place ຫຼື PlaceRedirect", "Canonical Place ID / redirect / not-found", "READ"),
      s("Place Detail Module", "FN-PLC-001", "ອ່ານ Place + catalog children", "Place, Category, Area, Contact, Hours, Price", "Base PlaceDetail", "READ"),
      s("Place Detail Module", "FN-PLC-002", "ອ່ານ Published/Available Sources", "Content Source + Creator attribution", "Attributed source list", "READ"),
      s("Place Detail Module", "FN-PLC-003", "Resolve independent labels", "Verification/Freshness + Partner Membership + Campaign", "Verified/Partner/Sponsored/Freshness labels", "CONTROL"),
      s("Place Detail Module", "FN-PLC-004", "Build Map/Call/Message actions", "ສ້າງສະເພາະ action ທີ່ມີ target", "Available actions + fallbacks", "CONTROL"),
      s("Guest Web", "FN-ANA-003", "ບັນທຶກ PlaceOpen ຕາມ consent", "Canonical place_id ເທົ່ານັ້ນ", "Telemetry result", "ASYNC"),
    ],
    transaction: "Read-only composite query. ທຸກ child query ຕ້ອງອ້າງ Canonical Place ID ດຽວ; ບໍ່ລໍຖ້າ Analytics ກ່ອນ render.",
    idempotency: "Canonical URL ດຽວສົ່ງ Place ດຽວ. Old slug ຕ້ອງ redirect ແບບຄົງທີ່.",
    alternates: [x("A1", "Old merged slug", "ສົ່ງ redirect ໄປ canonical slug", "Browser ໂຫຼດ Place ປາຍທາງ"), x("A2", "Place ບໍ່ Published", "ສົ່ງ not-found/unavailable ຕາມ public policy", "ບໍ່ຮົ່ວ Draft data"), x("A3", "ບໍ່ມີ Source ໃຊ້ໄດ້", "ຍັງສະແດງ Place data ຖ້າ Publish Gate ຍັງຜ່ານ", "ສະແດງສະຖານະ Content ຕາມຈິງ")],
    postconditions: ["Guest ເຫັນ Canonical Place", "Label ສີ່ປະເພດບໍ່ຖືກປົນກັນ", "Action ທຸກອັນມີ target ແລະ fallback"],
  },
  {
    id: "WF-03-02", module: "MOD-03 · DECISION ACTIONS", title: "Execute Decision Action, Save or Share", lao: "ເປີດ Map/Call/Message ແລະ Save/Share",
    goal: "ສົ່ງ Guest ໄປ External App ຫຼືບັນທຶກ Local action ໂດຍບໍ່ອ້າງ Intent ເປັນ Visit/Sale.",
    trigger: "Guest ກົດ Map, Call, Message, Save ຫຼື Share.",
    preconditions: ["Place Page ຖືກ resolve ເປັນ Canonical Place", "Action target ມາຈາກ published contact/map data"],
    participants: ["Guest Web", "Action Builder", "Device/External App", "Analytics"],
    functionIds: ["FN-ACT-001", "FN-ACT-002", "FN-ACT-003", "FN-ACT-004", "FN-ACT-005"],
    steps: [
      s("Guest Web", "FN-PLC-004", "ເລືອກ action ຈາກ allowlisted action payload", "Client ບໍ່ສ້າງ phone/url ຈາກ raw user input", "Validated action intent", "CLIENT"),
      s("Guest Web", "FN-ACT-001 / 002 / 003", "ສ້າງ deep link ສຳລັບ Map/Call/Message", "Normalize target + choose native/web fallback", "External launch request", "EXTERNAL"),
      s("Device/External App", "FN-ACT-001 / 002 / 003", "ພະຍາຍາມເປີດປາຍທາງ", "Platform ຄວບຄຸມຜົນຫຼັງ handoff", "Launch/fallback", "EXTERNAL"),
      s("Guest Web", "FN-ACT-004", "Save/Unsave place_id ໃນ device storage", "ບໍ່ສ້າງ server profile", "Local saved state", "CLIENT"),
      s("Guest Web", "FN-ACT-005", "Share canonical URL ຜ່ານ native share/copy", "ຫ້າມ share duplicate slug", "Share/copy result", "CLIENT"),
      s("Guest Web", "FN-ANA-003 / 005", "ບັນທຶກ action event; deduplicate Map/Call/Message", "Telemetry failure ບໍ່ block action", "Unique DecisionIntent ຫຼື non-unique repeat", "ASYNC"),
    ],
    transaction: "External app call ຢູ່ນອກ Database Transaction. Analytics Event/DecisionIntent ຂຽນໃນ transaction ສັ້ນຂອງຕົນ.",
    idempotency: "Save ໃຊ້ set semantics; Share ບໍ່ປ່ຽນ server state; Decision Intent ໃຊ້ dedupe key/window.",
    alternates: [x("A1", "ອຸປະກອນບໍ່ມີ app", "ໃຊ້ Web URL ຫຼື Copy target", "Guest ຍັງມີທາງອອກ"), x("A2", "Contact target ຫາຍ/ບໍ່ valid", "ບໍ່ render action ຫຼື disable ພ້ອມຄຳອະທິບາຍ", "ແຈ້ງ correction ໄດ້"), x("A3", "Analytics ຖືກປະຕິເສດ", "ບໍ່ສົ່ງ optional event", "External action ຍັງເຮັດວຽກ")],
    postconditions: ["External handoff ຫຼື fallback ເກີດຂຶ້ນ", "Save ຢູ່ໃນ device", "Decision Intent ບໍ່ຖືກນັບເປັນ Sale/Visit"],
  },
  {
    id: "WF-04-01", module: "MOD-04 · CONTENT SOURCE", title: "Register, Validate and Publish Source", lao: "ລົງທະບຽນ ແລະເຜີຍແຜ່ Source",
    goal: "ຮັບ Social URL, ກວດ platform/availability/attribution, ຈັບຄູ່ Canonical Place ແລະ Publish ໂດຍບໍ່ re-host media.",
    trigger: "Admin ເພີ່ມ Review URL ໃໝ່.",
    preconditions: ["Admin authenticated/authorized", "URL scheme/domain ຢູ່ allowlist", "Admin ຄົ້ນ canonical URL ຊ້ຳກ່ອນ"],
    participants: ["Admin", "Content Module", "Social Platform", "Place Module", "Audit"],
    functionIds: ["FN-SRC-001", "FN-SRC-002", "FN-SRC-003", "FN-SRC-004", "FN-SRC-005"],
    steps: [
      s("Admin", "FN-ADM-001 / 002", "ຜ່ານ authentication/authorization", "Admin ID ຂອງຕົນເອງ", "Authorized action", "CONTROL"),
      s("Content Module", "FN-SRC-001", "Normalize URL ແລະສ້າງ Proposed Source", "canonical_url unique; creator ສ້າງ/resolve", "source_id = Proposed", "TX-SRC-REGISTER"),
      s("Content Module", "FN-SRC-002", "ກວດ URL ກັບ Platform", "External call ນອກ transaction; classify result", "Availability check result", "EXTERNAL"),
      s("Content Module", "FN-SRC-003", "ອ່ານ metadata ທີ່ອະນຸຍາດ", "Creator/title/preview/embed reference; ບໍ່ download video", "Permitted metadata", "EXTERNAL"),
      s("Admin", "FN-SRC-004", "ເລືອກ Canonical Place", "ກວດ Place duplicate/branch ກ່ອນ link", "content_source.place_id", "TX-SRC-LINK"),
      s("Content Module", "FN-SRC-005", "ກວດ publish gate ແລະປ່ຽນ status", "Valid URL + attribution + place link", "Published Source", "TX-SRC-PUBLISH"),
      s("Audit", "FN-ADM-004", "ບັນທຶກ register/link/publish changes", "actor, before/after, reason", "Audit records", "SAME TX"),
    ],
    transaction: "ຫ້າມຖື DB transaction ລະຫວ່າງລໍຖ້າ Social Platform. Register, Link ແລະ Publish ເປັນ transaction ສັ້ນແຍກກັນພ້ອມ Audit.",
    idempotency: "canonical_url unique. Retry metadata/check ເພີ່ມ Check record ໃໝ່ແຕ່ບໍ່ສ້າງ Content Source ຊ້ຳ.",
    alternates: [x("A1", "canonical URL ມີແລ້ວ", "ສົ່ງ existing source ແລະຫ້າມ create ຊ້ຳ", "Admin ເປີດ record ເກົ່າ"), x("A2", "Platform ລົ້ມຊົ່ວຄາວ", "ເກັບ Proposed + TemporaryFailure + next check", "ບໍ່ Publish ຈົນກວ່າກວດຜ່ານ"), x("A3", "ບໍ່ພົບ Canonical Place", "ຢຸດ link/publish", "Admin ໃຊ້ Place creation workflow ກ່ອນ")],
    postconditions: ["Published Source ມີ Creator + Canonical URL + Place", "Media ບໍ່ຖືກສຳເນົາ", "Privileged change ມີ Audit"],
  },
  {
    id: "WF-04-02", module: "MOD-04 · SOURCE LIFECYCLE", title: "Check Availability and Process Takedown", lao: "ກວດ Source ແລະຮັບຄຳຮ້ອງຖອນ",
    goal: "ແຍກ Temporary Failure/Confirmed Unavailable/Takedown ແລະຖອນ Public View ຕາມຄວາມເລັ່ງດ່ວນ.",
    trigger: "Scheduler ກວດ Source, Admin ກົດ recheck ຫຼືມີ Takedown Request.",
    preconditions: ["Source record ຍັງມີ canonical URL", "Takedown request ມີ requester contact/reason"],
    participants: ["Scheduler/Admin", "Content Module", "Social Platform", "Request Module", "Audit"],
    functionIds: ["FN-SRC-006", "FN-SRC-007"],
    steps: [
      s("Scheduler/Admin", "FN-SRC-006", "ເລືອກ Source ຄົບກຳນົດ", "Lock/claim work item ເພື່ອກັນ worker ຊ້ຳ", "Source check job", "TX-CLAIM"),
      s("Content Module", "FN-SRC-002", "ກວດ URL ກັບ Platform", "Classify Available/Temporary/Confirmed", "SourceAvailabilityCheck", "EXTERNAL + TX-RESULT"),
      s("Content Module", "FN-SRC-006", "ປັບ current availability/next check", "Temporary = retry; Confirmed = ຖອນ Feed", "Updated source status", "TX-SOURCE-STATUS"),
      s("Request Module", "FN-SRC-007", "ເມື່ອຮັບ Takedown ໃຫ້ hide public ກ່ອນ", "Takedown status ຕ່າງຈາກ availability failure", "Source hidden + request UnderReview", "TX-TAKEDOWN-HOLD"),
      s("Admin", "FN-SRC-007", "ກວດສິດ/ຫຼັກຖານ ແລະຕັດສິນ", "Approve = Removed; Reject = restore previous eligible state", "Request decision + source state", "TX-TAKEDOWN-DECISION"),
      s("Audit", "FN-ADM-004", "ບັນທຶກ state change", "reason ບັງຄັບ", "Audit record", "SAME TX"),
    ],
    transaction: "External check ຢູ່ນອກ transaction. Work claim, check result, current status ແລະ takedown decision ເປັນ transaction ສັ້ນ; state change ຕ້ອງຄູ່ Audit.",
    idempotency: "Job claim key ປ້ອງກັນ concurrent recheck. Takedown decision command ຕ້ອງຮັບ expected current status/version.",
    alternates: [x("A1", "Network timeout ຄັ້ງດຽວ", "TemporaryFailure; ບໍ່ຖອນ Source", "ສ້າງ retry"), x("A2", "404/Removed/Private ຢືນຢັນ", "ConfirmedUnavailable; ຖອນຈາກ Feed", "Recheck ພາຍໃນ 7 ວັນ"), x("A3", "Takedown ເຂົ້າຂະນະ recheck", "Takedown hold ມີລຳດັບສູງກວ່າ availability result", "ຫ້າມ auto-restore")],
    postconditions: ["Source current status ກົງກັບຫຼັກຖານຫຼ້າສຸດ", "Takedown ບໍ່ປາກົດ Public ລະຫວ່າງກວດ", "Place ບໍ່ຖືກລົບອັດຕະໂນມັດ"],
  },
  {
    id: "WF-05-01", module: "MOD-05 · PLACE DATA", title: "Create, Review and Publish Place", lao: "ສ້າງ Draft ແລະຜ່ານ Publish Gate",
    goal: "ສ້າງ Canonical Place ໂດຍກວດ duplicate ກ່ອນ, ບັນທຶກຫຼັກຖານ ແລະ Publish ສະເພາະເມື່ອ gate ຜ່ານ.",
    trigger: "Admin ຕ້ອງການສ້າງ Place ໃໝ່ ຫຼືຕື່ມ Field ຂອງ Draft.",
    preconditions: ["Admin authorized", "Category/Area reference active", "ມີ source/evidence ສຳລັບ critical fields"],
    participants: ["Admin", "Place Module", "Duplicate Control", "Content Module", "Audit"],
    functionIds: ["FN-PADM-001", "FN-PADM-002", "FN-PADM-003", "FN-PADM-004", "FN-PADM-005", "FN-PADM-008"],
    steps: [
      s("Place Module", "FN-PADM-008", "ກວດ candidate ຈາກ name/phone/coordinate/social", "ສົ່ງ score + signals; ຫ້າມ auto-merge", "Duplicate candidates", "READ/CONTROL"),
      s("Admin", "FN-PADM-001", "ຢືນຢັນສ້າງໃໝ່ ຫຼືເລືອກ existing Place", "ສ້າງ Draft ເມື່ອບໍ່ແມ່ນ duplicate", "place_id + Draft", "TX-PLACE-CREATE"),
      s("Admin", "FN-PADM-002", "ປ້ອນ/ແກ້ identity, category, location, contact, hours, price", "Critical field ມີ source/evidence/reason", "Updated draft + verification records", "TX-PLACE-UPDATE"),
      s("Place Module", "FN-PADM-003", "Validate field/format/completeness", "Unknown ໃຊ້ Null + label; ຫ້າມຄາດເດົາ", "Errors + warnings", "CONTROL"),
      s("Place Module", "FN-PADM-004", "Check publish readiness", "Required fields + valid source + duplicate resolved + admin approval", "ready / blockers", "READ/CONTROL"),
      s("Admin", "FN-PADM-005", "ຢືນຢັນ Publish ພ້ອມ reason", "Compare expected version ກ່ອນ state change", "Published + canonical URL", "TX-PLACE-PUBLISH"),
      s("Audit", "FN-ADM-004", "ບັນທຶກ create/update/publish", "before/after + reason", "Audit records", "SAME TX"),
    ],
    transaction: "ແຕ່ລະ Command ເປັນ transaction ສັ້ນ. Publish transaction ຕ້ອງ recheck gate ພາຍໃນ transaction ເພື່ອກັນ data ປ່ຽນລະຫວ່າງ preview ແລະ confirm.",
    idempotency: "Create command ໃຊ້ client request key. Update ໃຊ້ entity version. Publish Published Place ຊ້ຳສົ່ງ current result ບໍ່ສ້າງ event/status ຊ້ຳ.",
    alternates: [x("A1", "Duplicate candidate ນ່າເຊື່ອ", "ຢຸດ create ແລະໃຫ້ Admin ທົບທວນ", "ເລືອກ existing ຫຼື mark NotDuplicate"), x("A2", "Required field/source ບໍ່ຄົບ", "ສົ່ງ blockers; ຄົງ Draft/InReview", "Admin ແກ້ຂໍ້ມູນ"), x("A3", "Record version ປ່ຽນກ່ອນ Publish", "ປະຕິເສດ stale confirmation", "Reload ແລະ review ໃໝ່")],
    postconditions: ["Published Place ຜ່ານ gate", "Canonical slug unique", "ການປ່ຽນ critical fields ມີ Verification/Audit"],
  },
  {
    id: "WF-05-02", module: "MOD-05 · PLACE LIFECYCLE", title: "Suspend or Archive Place", lao: "ຢຸດຊົ່ວຄາວ ຫຼືເກັບ Place",
    goal: "ຖອນ Place ຈາກ Feed/Search ໂດຍບໍ່ລົບປະຫວັດ ແລະແຍກປິດຊົ່ວຄາວຈາກປິດຖາວອນ.",
    trigger: "Admin/Quality Control ຢືນຢັນ stale risk, ຂໍ້ມູນອັນຕະລາຍ, ປິດຊົ່ວຄາວ ຫຼືປິດຖາວອນ.",
    preconditions: ["Place ບໍ່ແມ່ນ merged source", "ມີ reason/evidence", "Admin authorized"],
    participants: ["Admin/Quality", "Place Module", "Feed/Search", "Audit"],
    functionIds: ["FN-PADM-006", "FN-PADM-007"],
    steps: [s("Place Module", "FN-PADM-003", "Validate request reason/evidence", "ແຍກ temporary vs permanent", "Allowed target state", "CONTROL"), s("Admin/Quality", "FN-PADM-006", "Suspend Place", "status = Suspended; optionalUntil/reason", "Place ຖືກຖອນ Public discovery", "TX-PLACE-STATUS"), s("Admin", "FN-PADM-007", "Archive Place ເມື່ອປິດຖາວອນ", "status = Archived; closed_at", "Archived Place", "TX-PLACE-STATUS"), s("Audit", "FN-ADM-004", "ບັນທຶກ before/after/reason", "ຢູ່ transaction ດຽວກັບ status", "Audit record", "SAME TX"), s("Feed/Search", "FN-FEED-002 / FN-SRCH-002", "ບໍ່ຮັບ Place ທີ່ບໍ່ Published", "Cache/index invalidation ຕາມ technical contract", "Public removal", "ASYNC INVALIDATION")],
    transaction: "State + Audit ເປັນ transaction ດຽວ. Search/feed cache invalidation ອາດ async ແຕ່ query ຕ້ອງ recheck status.",
    idempotency: "Target status ດຽວກັນຊ້ຳສົ່ງ current state. Status command ຕ້ອງມີ expected version.",
    alternates: [x("A1", "ຫຼັກຖານປິດຖາວອນບໍ່ພໍ", "Suspend ແທນ Archive", "ສ້າງ Work Item ເພື່ອກວດຄືນ"), x("A2", "Place ມີ Active Campaign", "ປິດ/ຢຸດ campaign ຕາມ rule ກ່ອນ/ພ້ອມ state change", "ຫ້າມ sponsored placement ຂອງ non-published Place")],
    postconditions: ["Place ບໍ່ປາກົດ Feed/Search", "Child/history ຍັງຢູ່", "Reason ແລະ actor ກວດຍ້ອນໄດ້"],
  },
  {
    id: "WF-05-03", module: "MOD-05 · DUPLICATE MERGE", title: "Review and Merge Duplicate Places", lao: "ລວມ Place ຊ້ຳ ແລະສ້າງ Redirect",
    goal: "ໃຫ້ Admin ຕັດສິນ duplicate ແລະຍ້າຍ relationship ທັງໝົດແບບ atomic ໄປ Canonical Place.",
    trigger: "Duplicate Candidate ຖືກສ້າງຈາກ Create/Update/Import ຫຼື Admin ແຈ້ງ.",
    preconditions: ["Place A/B ບໍ່ແມ່ນ record ດຽວ", "Admin ກວດວ່າບໍ່ແມ່ນຄົນລະສາຂາ", "Canonical target Published/Draft ແຕ່ບໍ່ Archived-as-merged"],
    participants: ["Admin", "Duplicate Control", "Place Module", "Related Domains", "Audit"],
    functionIds: ["FN-PADM-008", "FN-PADM-009", "FN-PADM-010"],
    steps: [s("Duplicate Control", "FN-PADM-008", "ສະແດງ signals ແລະ score", "Name/phone/coordinate/social; score ເປັນຄຳແນະນຳ", "Candidate review", "READ"), s("Admin", "FN-PADM-009", "ເລືອກ sourcePlace ແລະ canonicalPlace", "ຢືນຢັນ branch/evidence/reason", "Merge command", "CONTROL"), s("Place Module", "FN-PADM-009", "Lock ສອງ Place ແລະ revalidate", "Canonical lock ordering ກັນ deadlock", "Validated merge pair", "TX-MERGE"), s("Related Domains", "FN-PADM-009", "Reassign Source, Contact, Category, Request, Campaign, Verification, Analytics", "Resolve duplicate child keys ຕາມ merge policy", "Relations ຊີ້ canonical ID", "SAME TX"), s("Place Module", "FN-PADM-009", "ສ້າງ PlaceRedirect ແລະ mark source as Merged/Archived", "old slug unique; source ບໍ່ Published ອີກ", "Redirect + source state", "SAME TX"), s("Audit", "FN-ADM-004", "ບັນທຶກ merge summary/correlation", "before/after + moved counts + reason", "Audit records", "SAME TX"), s("Public Route", "FN-PADM-010", "Resolve old slug", "PlaceRedirect → canonical Place", "Permanent canonical redirect", "READ")],
    transaction: "ການຍ້າຍ relations, ສ້າງ redirect, ປ່ຽນ source status ແລະ Audit ຕ້ອງສຳເລັດຫຼື rollback ພ້ອມກັນ.",
    idempotency: "Merge source_place_id ເກົ່າຊ້ຳຕ້ອງສົ່ງ canonical target ເກົ່າ. ຫ້າມ merge ໄປ target ໃໝ່ໂດຍບໍ່ມີ explicit chain review.",
    alternates: [x("A1", "Admin ຕັດສິນ NotDuplicate", "ປິດ candidate ໂດຍບໍ່ປ່ຽນ Place", "ເກັບ review evidence"), x("A2", "Child unique conflict", "ຢຸດ merge ແລະສົ່ງ conflict list", "Admin ແກ້ contact/category/source conflict"), x("A3", "Place ຖືກປ່ຽນຂະນະ review", "Version check ລົ້ມ; rollback", "Reload ແລະ review ໃໝ່")],
    postconditions: ["Relation ບໍ່ຊີ້ source Place", "Old URL redirect", "Merge ກວດຍ້ອນໄດ້ດ້ວຍ correlation ID"],
  },
  {
    id: "WF-06-01", module: "MOD-06 · CORRECTION REQUEST", title: "Receive, Review and Decide Correction", lao: "ຮັບ ແລະຕັດສິນຄຳຮ້ອງແກ້ໄຂ",
    goal: "ຮັບຄຳຮ້ອງເປັນ Request/Items, ຄວບຄຸມ SLA, ຂໍຫຼັກຖານ ແລະປ່ຽນສະເພາະ Item ທີ່ອະນຸມັດ.",
    trigger: "Owner/Representative ແຈ້ງຂໍ້ມູນຜິດຜ່ານ external channel; Admin ລົງທະບຽນ.",
    preconditions: ["Canonical Place ຖືກ resolve", "ມີ requester contact", "ມີຢ່າງໜ້ອຍ 1 proposed field change"],
    participants: ["Requester", "Admin", "Request Module", "Place Module", "Audit"],
    functionIds: ["FN-REQ-001", "FN-REQ-002", "FN-REQ-003", "FN-REQ-004", "FN-REQ-005", "FN-REQ-006"],
    steps: [s("Admin", "FN-REQ-001", "ສ້າງ Request + Items + Evidence references", "received_at + requester/contact + current value snapshots", "Submitted request", "TX-REQUEST-CREATE"), s("Request Module", "FN-REQ-002", "Validate completeness ແລະ triage priority", "Urgent: map/phone/closed/takedown; compute SLA", "UnderReview ຫຼື NeedsEvidence", "TX-REQUEST-TRIAGE"), s("Admin", "FN-REQ-003", "ຂໍ Evidence ເພີ່ມຖ້າຂາດ", "ບັນທຶກ communication + pause SLA", "NeedsEvidence + notice", "TX-REQUEST-PAUSE"), s("Admin", "FN-REQ-004 / 005", "ຕັດສິນແຕ່ລະ Item", "reason ຕໍ່ approved/rejected item", "Item decisions", "TX-REQUEST-DECIDE"), s("Place Module", "FN-PADM-002—004", "Apply approved item values ແລະ revalidate Place", "ສ້າງ Verification; rejected values ບໍ່ປ່ຽນ", "Updated Place or blockers", "SAME TX"), s("Audit", "FN-ADM-004", "ບັນທຶກ request decision + place changes", "correlation ID ດຽວ", "Audit records", "SAME TX"), s("Request Module", "FN-REQ-006", "Close ຫຼັງ action/notice ຄົບ", "final outcome + closed_at", "Closed request", "TX-REQUEST-CLOSE")],
    transaction: "Approve transaction ລວມ Item decisions, Place update, Verification, Request outcome ແລະ Audit. Notification/External message ສົ່ງຫຼັງ commit ແລະບັນທຶກ Communication ແຍກ.",
    idempotency: "Request create ໃຊ້ source-channel reference. Decision ໃຊ້ expected Request status/version; Closed request ຫ້າມ apply ຊ້ຳ.",
    alternates: [x("A1", "Evidence ບໍ່ຄົບ", "NeedsEvidence + pause decision clock", "Resume ເມື່ອ evidence valid"), x("A2", "ອະນຸມັດບາງ Item", "Apply ສະເພາະ approved items; Header status = Approved ເມື່ອມີຢ່າງໜ້ອຍ 1 Item ຖືກອະນຸມັດ", "ຜົນທີ່ລະອຽດອ່ານຈາກ Item decisions; ຖ້າທຸກ Item ຖືກປະຕິເສດ Header = Rejected"), x("A3", "Proposed value ເກົ່າກວ່າ current value", "ບໍ່ overwrite; mark conflict", "Admin reload ແລະຕັດສິນໃໝ່")],
    postconditions: ["Public data ປ່ຽນສະເພາະຫຼັງ approval", "SLA pause/resume ກວດໄດ້", "Requester ມີ final outcome"],
  },
  {
    id: "WF-07-01", module: "MOD-07 · SPONSORED CAMPAIGN", title: "Create, Schedule, Run and Report Campaign", lao: "ຄວບຄຸມ Campaign ຕັ້ງແຕ່ Draft ຫາ Ended",
    goal: "ເຮັດໃຫ້ Sponsored Placement ປາກົດສະເພາະໄລຍະ/Place ທີ່ມີສິດ ແລະລາຍງານຜົນຕາມຄຳນິຍາມ.",
    trigger: "Admin ບັນທຶກຂໍ້ຕົກລົງ Campaign.",
    preconditions: ["Place ມີ Canonical record", "Placement code/label ຢູ່ allowlist", "start_at < end_at"],
    participants: ["Admin", "Campaign Module", "Scheduler", "Feed/Search", "Analytics"],
    functionIds: ["FN-CMP-001", "FN-CMP-002", "FN-CMP-003", "FN-CMP-004", "FN-CMP-005"],
    steps: [s("Admin", "FN-CMP-001", "ສ້າງ Campaign Draft", "place, placement, label, dates, price/reference", "campaign_id + Draft", "TX-CAMPAIGN-CREATE"), s("Campaign Module", "FN-CMP-002", "Validate eligibility", "Place Published; dates valid; label complete", "eligible / blockers", "CONTROL"), s("Admin", "FN-CMP-003", "Schedule Campaign", "eligibility ຕ້ອງຜ່ານ", "Scheduled", "TX-CAMPAIGN-STATUS"), s("Scheduler", "FN-CMP-004", "Activate ເມື່ອ start_at ຮອດ", "Recheck Place Published + expected status", "Active", "TX-CAMPAIGN-STATUS"), s("Feed/Search", "FN-FEED-002 / FN-SRCH-004", "ເລືອກ Active Campaign ເຂົ້າ sponsored slot", "label ຕ້ອງສະແດງ", "Sponsored impression opportunity", "READ"), s("Scheduler/Admin", "FN-CMP-004", "Pause/End ຕາມ reason/end_at", "Ended ບໍ່ກັບມາ Active", "Paused/Ended", "TX-CAMPAIGN-STATUS"), s("Reporting", "FN-CMP-005", "ສ້າງ Performance Summary", "impression, place open, unique intent", "Campaign summary", "READ/REPORT")],
    transaction: "Create/Status change + Audit ເປັນ transaction ສັ້ນ. Scheduler process ແຕ່ລະ Campaign ແຍກກັນ; reporting ເປັນ read-only.",
    idempotency: "State transition ຮັບ expected current state. Scheduler Activate/End ຊ້ຳບໍ່ສ້າງ transition ຊ້ຳ.",
    alternates: [x("A1", "Place ບໍ່ Published ໃນວັນ Activate", "ບໍ່ Activate; ສ້າງ blocker/work item", "Admin ແກ້ Place ຫຼື cancel"), x("A2", "Admin Pause", "ຖອນ placement ທັນທີຫຼັງ status commit", "Resume ໄດ້ຖ້າຍັງຢູ່ໄລຍະ"), x("A3", "Analytics ບໍ່ຄົບ", "ລາຍງານ data quality flag", "ຫ້າມຄາດເດົາ visit/sale")],
    postconditions: ["Active ສະເພາະໃນໄລຍະ", "Sponsored label ຊັດເຈນ", "Performance Summary ບໍ່ອ້າງ Intent ເປັນ Sale"],
  },
  {
    id: "WF-08-01", module: "MOD-08 · ADMIN & AUDIT", title: "Authenticate, Authorize and Execute Admin Work", lao: "ເຂົ້າລະບົບ, ກວດສິດ ແລະບັນທຶກ Audit",
    goal: "ໃຫ້ Admin ແຕ່ລະຄົນເຮັດ privileged command ຜ່ານ identity/authorization ແລະມີ Audit ຢູ່ transaction ດຽວ.",
    trigger: "Admin login, ເປີດ work queue ຫຼືສົ່ງ privileged command.",
    preconditions: ["Admin User = Active", "ຫ້າມ Shared Account", "Request ມີ session proof"],
    participants: ["Admin Client", "Auth Provider", "Authorization", "Domain Module", "Audit Store"],
    functionIds: ["FN-ADM-001", "FN-ADM-002", "FN-ADM-003", "FN-ADM-004"],
    steps: [s("Admin Client", "FN-ADM-001", "ພິສູດ identity ກັບ Auth Provider", "credential/token ບໍ່ເກັບໃນ business tables", "Authenticated admin subject", "SECURITY"), s("Admin Module", "FN-ADM-001", "Resolve Admin User/status", "auth_subject unique + Active", "Admin context/session", "READ"), s("Admin Client", "FN-ADM-003", "ຂໍ work queue ຕາມ type/status/due", "Urgent/SLA overdue ກ່ອນ; paginate", "Work items", "READ"), s("Authorization", "FN-ADM-002", "ກວດ action/resource", "Pilot FullAdmin; deny inactive/stale session", "Allow/deny + reason", "CONTROL"), s("Domain Module", "Domain Command", "Validate ແລະປ່ຽນ business state", "expected version + domain rules", "New entity state", "DOMAIN TX"), s("Audit Store", "FN-ADM-004", "Write actor/action/before/after/reason", "ໃຊ້ transaction/correlation ດຽວ", "audit_id", "SAME TX"), s("Admin Client", "—", "ຮັບ response ຫຼັງ commit", "ບໍ່ສະແດງ success ກ່ອນ commit", "Confirmed result", "—")],
    transaction: "Authentication ບໍ່ຢູ່ໃນ domain transaction. Domain change + required Audit ຕ້ອງ commit/rollback ພ້ອມກັນ.",
    idempotency: "Privileged command ໃຊ້ request key + expected entity version. Audit ID ຜູກກັບ command correlation ID ບໍ່ສ້າງຊ້ຳ.",
    alternates: [x("A1", "Session ໝົດອາຍຸ", "ປະຕິເສດກ່ອນ domain call", "Admin login ໃໝ່"), x("A2", "Unauthorized action", "ສົ່ງ deny ໂດຍບໍ່ເປີດເຜີຍ data", "ອາດບັນທຶກ security event"), x("A3", "Audit write ລົ້ມ", "Rollback domain change", "Retry command ດ້ວຍ idempotency key ເກົ່າ")],
    postconditions: ["ທຸກ privileged change ມີ actor/reason", "Denied request ບໍ່ປ່ຽນ data", "Admin account ແຍກຄົນ"],
  },
  {
    id: "WF-09-01", module: "MOD-09 · ANALYTICS CAPTURE", title: "Consent, Session, Event and Intent", lao: "ຮັບ Consent ແລະບັນທຶກ Event",
    goal: "ບັນທຶກ allowlisted product events ແບບ anonymous ແລະ deduplicate Decision Intent ໂດຍ Core Journey ບໍ່ຖືກ block.",
    trigger: "Guest ເລືອກ consent ຫຼືເກີດ Feed/Search/Place/Action event.",
    preconditions: ["Event dictionary ມີ version", "Optional event ຕ້ອງ AnalyticsAllowed", "Payload ຫ້າມມີ PII"],
    participants: ["Guest Web", "Consent/Session", "Event API", "Validator", "Intent Deduplicator"],
    functionIds: ["FN-ANA-001", "FN-ANA-002", "FN-ANA-003", "FN-ANA-004", "FN-ANA-005"],
    steps: [s("Guest Web", "FN-ANA-001", "ເກັບ consent choice ໃນ device", "EssentialOnly ຫຼື AnalyticsAllowed", "Consent mode", "CLIENT"), s("Guest Web", "FN-ANA-002", "Get/Create random anonymous session", "ບໍ່ຜູກຊື່/ເບີ; ມີ expiry", "session_id", "CLIENT / TX-SESSION"), s("Event API", "FN-ANA-003", "ຮັບ event ID + payload", "Server ຮັບໄວ; ບໍ່ block product action", "Accepted/rejected", "TX-EVENT"), s("Validator", "FN-ANA-004", "Validate event name/fields/entity references/consent", "Allowlist properties; server timestamp ເປັນຫຼັກ", "Valid event or validation error", "SAME TX"), s("Event Store", "FN-ANA-003", "Insert AnalyticsEvent", "event_id unique ກັນ retry", "Stored event", "SAME TX"), s("Intent Deduplicator", "FN-ANA-005", "ສຳລັບ Map/Call/Message ຄຳນວນ dedupe key", "session + place + action + window + definition version", "DecisionIntent or duplicate", "SAME TX"), s("Event API", "—", "ສົ່ງ minimal result", "ບໍ່ສົ່ງ individual history", "accepted / duplicate / rejected", "—")],
    transaction: "Event validation + event insert + optional DecisionIntent insert ເປັນ transaction ດຽວ. Client action ບໍ່ລໍຖ້າ transaction ນີ້.",
    idempotency: "analytics_event_id unique; DecisionIntent.dedupe_key unique ຕາມ definition window.",
    alternates: [x("A1", "Consent = EssentialOnly", "ປະຕິເສດ optional analytics ແບບ silent/minimal", "Core Journey ສືບຕໍ່"), x("A2", "Unknown event/property", "Reject ແລະບັນທຶກ validation metric ທີ່ບໍ່ມີ payload PII", "Developer ປັບ client taxonomy"), x("A3", "Rapid repeated action", "ເກັບ event ຕາມ policy ແຕ່ບໍ່ສ້າງ Unique Intent ໃໝ່", "Report ນັບ unique ເທົ່ານັ້ນ")],
    postconditions: ["Event valid ມີ server timestamp/version", "Intent unique ຕາມ dedupe rule", "Analytics ບໍ່ມີ PII"],
  },
  {
    id: "WF-09-02", module: "MOD-09 · ANALYTICS REPORTING", title: "Aggregate Funnel and Place Performance", lao: "ສະຫຼຸບ Funnel ແລະຜົນຂອງ Place",
    goal: "ສະຫຼຸບ Feed → Place → Decision Intent ດ້ວຍນິຍາມດຽວ ແລະບໍ່ເປີດ individual session.",
    trigger: "Admin/Reporting Job ຮ້ອງຂໍ report ຕາມ period/place/campaign.",
    preconditions: ["period/time zone valid", "reporter authorized", "event definition version ຖືກລະບຸ"],
    participants: ["Admin/Job", "Reporting Module", "Event/Intent Store", "Campaign/Place"],
    functionIds: ["FN-ANA-006", "FN-ANA-007"],
    steps: [s("Reporting Module", "FN-ANA-006", "Validate period/filters/definition", "ໃຊ້ server received_at ແລະ unique definitions", "Report query plan", "READ"), s("Reporting Module", "FN-ANA-006", "Aggregate FeedView/PlaceOpen/DecisionIntent", "Count distinct ຕາມ metric dictionary", "Counts + conversion rates", "READ/REPORT"), s("Reporting Module", "FN-ANA-006", "ຄຳນວນ data quality flags", "missing events, low volume, version change", "Qualified funnel", "CONTROL"), s("Reporting Module", "FN-ANA-007", "Filter/aggregate ຕາມ place_id", "reach, opens, actions by Map/Call/Message", "Place Performance Summary", "READ/REPORT"), s("Admin/Job", "—", "ຮັບ aggregate ພ້ອມ definitions", "ບໍ່ສົ່ງ session/event-level rows ໃຫ້ Partner", "Report", "—")],
    transaction: "Read-only reporting query/snapshot. ຖ້າສ້າງ aggregate cache ແມ່ນ derived data ແລະຕ້ອງ version/refresh ຕາມ Technical Design.",
    idempotency: "period + filters + definition version + data snapshot ດຽວຕ້ອງສົ່ງຜົນດຽວ.",
    alternates: [x("A1", "ຂໍ້ມູນນ້ອຍ/ບໍ່ຄົບ", "ສົ່ງ data quality flag ແລະຫຼີກລ່ຽງ rate ທີ່ຊວນເຂົ້າໃຈຜິດ", "ລາຍງານ counts ທີ່ກວດໄດ້"), x("A2", "Metric definition ປ່ຽນກາງ period", "ແຍກ version ຫຼືປະຕິເສດ mixed comparison", "ເລືອກ period/version ໃໝ່")],
    postconditions: ["Report ມີ period/definition/data quality", "ບໍ່ເປີດ individual session", "Intent ລະບຸຊັດວ່າບໍ່ແມ່ນ Visit/Sale"],
  },
  {
    id: "WF-10-01", module: "MOD-10 · PLACE DATA QUALITY", title: "Schedule and Complete Freshness Review", lao: "ກວດຄວາມສົດໃໝ່ 30/60 ວັນ",
    goal: "ສ້າງ Work Item ສຳລັບ critical fields ຄົບກຳນົດ, ສະແດງ stale label ແລະບັນທຶກ Verification ໃໝ່.",
    trigger: "Daily scheduler ຫຼື Admin ກົດ review Place.",
    preconditions: ["Place ບໍ່ Archived/Merged", "Partner tier ກຳນົດ 30 ວັນ; Free = 60 ວັນ", "Critical field list ຖືກອະນຸມັດ"],
    participants: ["Scheduler", "Quality Module", "Work Queue", "Admin", "Place Module"],
    functionIds: ["FN-DQ-001", "FN-DQ-002", "FN-DQ-003", "FN-DQ-004"],
    steps: [s("Scheduler", "FN-DQ-001", "ເລືອກ Place/field ຄົບກຳນົດ", "latest Verification expires_at + partner tier", "Due candidates", "READ"), s("Quality Module", "FN-DQ-002", "ຄຳນວນ Fresh/Due/Stale", "currentDate - checkedAt ຕາມ 30/60-day rule", "freshness status + due date", "CONTROL"), s("Quality Module", "FN-DQ-001 / 003", "Upsert Work Item ແລະ flag quality status", "ບໍ່ສ້າງ open work item ຊ້ຳສຳລັບ subject/field", "Work item + stale label", "TX-DQ-SCHEDULE"), s("Admin", "FN-ADM-003", "ເລືອກ urgent/overdue work", "Claim/assign work item", "Assigned review", "TX-WORK-CLAIM"), s("Admin", "FN-DQ-004", "ກວດ Contact/Map/Hours/Status/Price ພ້ອມ evidence", "ຜົນແຍກຕາມ field", "Verification checks", "TX-VERIFY"), s("Quality Module", "FN-DQ-002 / 004", "Recalculate place quality ແລະ complete Work Item", "ຖ້າຍັງມີ stale field ໃຫ້ຄົງ label", "Fresh/partial/stale + completed work", "SAME TX"), s("Audit", "FN-ADM-004", "ບັນທຶກ verification/status", "actor/evidence/reason", "Audit record", "SAME TX")],
    transaction: "Scheduler process ແຕ່ລະ Place ແຍກ transaction. Verification + quality status + Work Item completion + Audit commit ພ້ອມກັນ.",
    idempotency: "Open Work Item unique ຕາມ work_type + subject + field. Verification submit ໃຊ້ request key ແລະ place version.",
    alternates: [x("A1", "ກວດບາງ field ບໍ່ໄດ້", "ບັນທຶກ Unverified/Conflicting ແລະຄົງ Work Item/label", "ຈັດກຳນົດຕິດຕາມ"), x("A2", "Stale ຫຼາຍແລະຢືນຢັນບໍ່ໄດ້", "ສົ່ງ Suspend candidate ໃຫ້ Admin", "ໃຊ້ WF-05-02; ບໍ່ auto-suspend ຖ້າ rule ບໍ່ອະນຸມັດ"), x("A3", "Scheduler ແລ່ນຊ້ຳ", "Unique open-work rule ປ້ອງກັນວຽກຊ້ຳ", "Update due/priority ຖ້າຈຳເປັນ")],
    postconditions: ["Place ມີ freshness status ຕາມ evidence", "Work queue ບໍ່ຊ້ຳ", "Verification history ບໍ່ຖືກ overwrite"],
  },
  {
    id: "WF-10-02", module: "MOD-10 · SOURCE RECHECK", title: "Recheck and Restore Source", lao: "ກວດຄືນ Source ທີ່ Unavailable",
    goal: "ກວດ Source ຄືນພາຍໃນ 7 ວັນ ແລະ restore ສະເພາະເມື່ອ URL, attribution ແລະ Place link ກັບມາ valid.",
    trigger: "Source availability = ConfirmedUnavailable ແລະ next_check_at ຮອດກຳນົດ.",
    preconditions: ["Source ບໍ່ຢູ່ Takedown/Removed", "ມີ canonical URL", "Work Item ບໍ່ຖືກ claim ໂດຍ worker ອື່ນ"],
    participants: ["Scheduler/Admin", "Quality Module", "Content Module", "Social Platform", "Audit"],
    functionIds: ["FN-DQ-005", "FN-DQ-006"],
    steps: [s("Scheduler", "FN-DQ-005", "Claim due Source recheck", "ຈັດລຳດັບ next_check_at", "Claimed job", "TX-CLAIM"), s("Content Module", "FN-SRC-002", "Validate canonical URL ອີກຄັ້ງ", "External call ນອກ transaction", "Available/Unavailable result", "EXTERNAL"), s("Quality Module", "FN-DQ-005", "ບັນທຶກ SourceAvailabilityCheck", "ຜົນ/ເຫດຜົນ/checked_at/next_check", "Check history", "TX-CHECK-RESULT"), s("Quality Module", "FN-DQ-006", "ຖ້າ Available ໃຫ້ revalidate attribution/place link", "Creator + URL + canonical Place ຕ້ອງຄົບ", "Restore-ready or blockers", "CONTROL"), s("Quality Module", "FN-DQ-006", "ປ່ຽນ Source ເປັນ Checked/Published ຕາມ previous eligibility", "Takedown ຫ້າມ auto-restore", "Restored source", "TX-SOURCE-RESTORE"), s("Audit", "FN-ADM-004", "ບັນທຶກ restoration", "successful evidence + actor/system", "Audit record", "SAME TX")],
    transaction: "External URL check ນອກ transaction. Check history ແລະ restore state ແຍກ transaction; restore + Audit ພ້ອມກັນ.",
    idempotency: "Job claim prevents concurrent execution. Restore Available Source ຊ້ຳສົ່ງ current status; check ແຕ່ລະຄັ້ງມີ unique attempt ID.",
    alternates: [x("A1", "ຍັງ Unavailable", "ຄົງ status ແລະກຳນົດ next action ຕາມ policy", "ບໍ່ປາກົດ Feed"), x("A2", "URL Available ແຕ່ attribution/place link ບໍ່ຄົບ", "ບໍ່ restore; ສ້າງ Admin Work Item", "Admin ແກ້ metadata/link"), x("A3", "ມີ Takedown hold", "ຢຸດ auto-restore ແມ່ນແຕ່ URL Available", "ລໍຖ້າ Takedown decision")],
    postconditions: ["Check history ຖືກເພີ່ມ", "Restored Source ຜ່ານ gate", "Takedown ບໍ່ຖືກ override"],
  },
];

const moduleSummaries = [
  ["MOD-01", "WF-01-01", "Guest opens/scrolls Feed", "FeedItems + cursor", "MOD-03, MOD-09"],
  ["MOD-02", "WF-02-01", "Guest searches/filters", "Published ordered results", "MOD-03, MOD-09"],
  ["MOD-03", "WF-03-01, WF-03-02", "Place URL / action click", "PlaceDetail / external handoff / local state", "MOD-04, MOD-05, MOD-09"],
  ["MOD-04", "WF-04-01, WF-04-02", "Admin source URL / scheduled check / takedown", "Published/hidden/unavailable Source", "MOD-05, MOD-06, MOD-08, MOD-10"],
  ["MOD-05", "WF-05-01—03", "Admin create/update/status/merge", "Canonical Place + redirect + audit", "MOD-04, MOD-08, MOD-10"],
  ["MOD-06", "WF-06-01", "Correction request", "Approved fields / rejection / closure", "MOD-05, MOD-08"],
  ["MOD-07", "WF-07-01", "Campaign agreement/date", "Scheduled/Active/Ended + report", "MOD-01, MOD-02, MOD-09"],
  ["MOD-08", "WF-08-01", "Admin session/command", "Authorized change + audit", "All command modules"],
  ["MOD-09", "WF-09-01, WF-09-02", "Product event / report request", "Anonymous event, intent, aggregates", "Public modules, MOD-07"],
  ["MOD-10", "WF-10-01, WF-10-02", "Daily schedule / manual review", "Work items, verification, restored source", "MOD-04, MOD-05, MOD-08"],
] as const;

const coveredFunctions = Array.from(new Set(workflows.flatMap((workflow) => workflow.functionIds)));
const missingFunctions = systemFunctionIds.filter((functionId) => !coveredFunctions.includes(functionId));
const totalSteps = workflows.reduce((sum, workflow) => sum + workflow.steps.length, 0);
const coveragePercent = Math.round((coveredFunctions.length / systemFunctionIds.length) * 100);
export const systemWorkflowIds = workflows.map((workflow) => workflow.id);

export default function SystemAnalysisWorkflows() {
  return (
    <section className={styles.saWorkflows} id="sa-workflows">
      <header className={styles.saPartHeader}>
        <span>ພາກ D · ຂັ້ນ 3 ຂອງ SA</span>
        <h2>Module Workflow & Sequence Specification</h2>
        <p>ພາກນີ້ນຳ 10 Modules, 64 Functions ແລະ 27 Logical Entities ມາຈັດເປັນ {workflows.length} End-to-end Workflows ແລະ {totalSteps} Sequence Steps. Workflow ບອກວ່າໃຜເລີ່ມ, Function ໃດຖືກເອີ້ນກ່ອນ–ຫຼັງ, Data ຖືກອ່ານ/ປ່ຽນຢູ່ໃສ, ຂັ້ນໃດຕ້ອງ commit ພ້ອມກັນ ແລະຈະໄປຕໍ່ແນວໃດເມື່ອເງື່ອນໄຂບໍ່ຜ່ານ.</p>
        <p>ຂັ້ນນີ້ລະບຸ Orchestration ແລະ Transaction Boundary; ຍັງບໍ່ລົງ Pseudocode/Formula ພາຍໃນ Function ເພາະເປັນຂັ້ນ 4. Error Code, Retry Contract ແລະ State Transition Table ແບບລະອຽດຈະຢູ່ຂັ້ນ 5.</p>
      </header>

      <div className={styles.saCatalogSummary}>
        <article><small>MODULES COVERED</small><strong>10</strong><p>ທຸກ Module ມີ entry/exit workflow</p></article>
        <article><small>WORKFLOWS</small><strong>{workflows.length}</strong><p>Public, Admin, Background ແລະ Reporting journeys</p></article>
        <article><small>SEQUENCE STEPS</small><strong>{totalSteps}</strong><p>Actor → Function → Data → Result → Boundary</p></article>
        <article><small>FUNCTION COVERAGE</small><strong>{coveragePercent}%</strong><p>{coveredFunctions.length}/{systemFunctionIds.length} Function IDs ຖືກອ້າງອີງ</p></article>
      </div>

      <section className={styles.documentArticleSection}>
        <span>D1 · SEQUENCE CONVENTION</span>
        <h2>ວິທີອ່ານ Workflow ແລະ Transaction Boundary</h2>
        <div className={styles.saModelRules}>
          <article><b>TRIGGER</b><strong>Entry Event</strong><p>ເຫດການທີ່ເລີ່ມ workflow; ບໍ່ແມ່ນຊື່ໜ້າຈໍ.</p></article>
          <article><b>PRECONDITION</b><strong>Must Be True</strong><p>ເງື່ອນໄຂກ່ອນ Step 1. ຖ້າບໍ່ຜ່ານໃຫ້ໃຊ້ Alternate Flow.</p></article>
          <article><b>SEQUENCE</b><strong>Call Order</strong><p>ລຳດັບ Actor/Module Call ພ້ອມ Function ID, Data ແລະ Result.</p></article>
          <article><b>TX / SAME TX</b><strong>Atomic Change</strong><p>Step ທີ່ຕ້ອງ commit ຫຼື rollback ພ້ອມກັນ. External call ຫ້າມຢູ່ໃນ long transaction.</p></article>
          <article><b>IDEMPOTENCY</b><strong>Safe Retry</strong><p>ກົດປ້ອງກັນ retry/concurrent request ສ້າງ data ຫຼື state transition ຊ້ຳ.</p></article>
          <article><b>POSTCONDITION</b><strong>Exit Guarantee</strong><p>ສິ່ງທີ່ຕ້ອງເປັນຈິງຫຼັງ workflow ສຳເລັດ.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>D2 · MODULE WORKFLOW MAP</span>
        <h2>Entry, Exit ແລະ Cross-module Dependency</h2>
        <div className={styles.saWorkflowMap} role="table" aria-label="Module workflow map">
          <div role="row"><b>MODULE</b><b>WORKFLOW</b><b>ENTRY</b><b>EXIT</b><b>DOWNSTREAM / DEPENDENCY</b></div>
          {moduleSummaries.map(([module, workflow, entry, exit, dependency]) => <div role="row" key={module}><b>{module}</b><strong>{workflow}</strong><p>{entry}</p><p>{exit}</p><p>{dependency}</p></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>D3 · WORKFLOW & SEQUENCE CATALOG</span>
        <h2>{workflows.length} End-to-end Workflows</h2>
        <p className={styles.documentQuestion}>Developer ຈະຮູ້ໄດ້ແນວໃດວ່າ Function ໃດຖືກເອີ້ນຕອນໃດ ແລະ Data ຈະຄົງສອດຄ່ອງເມື່ອບາງ Step ລົ້ມ?</p>
        <div className={styles.saWorkflowCatalog}>
          {workflows.map((workflow, workflowIndex) => <details key={workflow.id} open={workflowIndex === 0}>
            <summary><span>{workflow.id}</span><div><small>{workflow.module}</small><strong>{workflow.title} — {workflow.lao}</strong></div><em>{workflow.steps.length} Steps</em></summary>
            <div className={styles.saWorkflowIntro}>
              <p>{workflow.goal}</p>
              <div><b>TRIGGER</b><span>{workflow.trigger}</span></div>
              <div><b>FUNCTIONS</b><span>{workflow.functionIds.join(" · ")}</span></div>
            </div>
            <div className={styles.saParticipantFlow} aria-label={`${workflow.id} participants`}>{workflow.participants.map((participant, index) => <div key={participant}><strong>{participant}</strong>{index < workflow.participants.length - 1 && <i>→</i>}</div>)}</div>
            <div className={styles.saWorkflowConditions}><div><b>PRECONDITIONS</b><ul>{workflow.preconditions.map((item) => <li key={item}>{item}</li>)}</ul></div><div><b>POSTCONDITIONS</b><ul>{workflow.postconditions.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
            <div className={styles.saSequenceTable} role="table" aria-label={`${workflow.id} sequence`}>
              <div role="row"><b>STEP</b><b>ACTOR / FUNCTION</b><b>ACTION</b><b>DATA / RULE</b><b>RESULT</b><b>BOUNDARY</b></div>
              {workflow.steps.map((step, stepIndex) => <div role="row" key={`${workflow.id}-${stepIndex}`}><b>{String(stepIndex + 1).padStart(2, "0")}</b><div><strong>{step.actor}</strong><code>{step.functionId}</code></div><p>{step.action}</p><p>{step.data}</p><p>{step.result}</p><span>{step.boundary}</span></div>)}
            </div>
            <div className={styles.saTransactionNotes}><div><b>TRANSACTION BOUNDARY</b><p>{workflow.transaction}</p></div><div><b>IDEMPOTENCY / CONCURRENCY</b><p>{workflow.idempotency}</p></div></div>
            <div className={styles.saAlternateTable} role="table" aria-label={`${workflow.id} alternate flows`}>
              <div role="row"><b>ALT</b><b>CONDITION</b><b>SYSTEM RESPONSE</b><b>CONTINUATION</b></div>
              {workflow.alternates.map((alternate) => <div role="row" key={alternate.code}><b>{alternate.code}</b><p>{alternate.condition}</p><p>{alternate.response}</p><p>{alternate.continuation}</p></div>)}
            </div>
          </details>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>D4 · CROSS-CUTTING SEQUENCE RULES</span>
        <h2>ກົດທີ່ໃຊ້ກັບຫຼາຍ Workflow</h2>
        <ol className={styles.reviewDecisions}>
          <li><b>01 · EXTERNAL CALL</b><div><strong>ຫ້າມຖື transaction ລໍຖ້າພາຍນອກ:</strong><p>Social Platform, Map, Dialer, Messaging ແລະ Auth Provider ອາດຊ້າ/ລົ້ມ. ໃຫ້ validate/claim ກ່ອນ, ປິດ transaction, ເອີ້ນ external ແລ້ວເປີດ transaction ສັ້ນເພື່ອບັນທຶກຜົນ.</p></div></li>
          <li><b>02 · AUDIT CO-COMMIT</b><div><strong>Privileged state change + Audit:</strong><p>Publish, Suspend, Archive, Merge, Request Decision, Campaign State ແລະ Restore Source ຕ້ອງ commit/rollback ພ້ອມ Audit. ຖ້າ Audit write ລົ້ມ ຖືວ່າ Command ລົ້ມ.</p></div></li>
          <li><b>03 · OPTIMISTIC CONCURRENCY</b><div><strong>ປ້ອງກັນ stale update:</strong><p>Admin command ທີ່ປ່ຽນ record ຕ້ອງສົ່ງ expected version/updated_at. ຖ້າບໍ່ກົງ ໃຫ້ reload ແລະ review ກ່ອນສົ່ງໃໝ່.</p></div></li>
          <li><b>04 · BACKGROUND CLAIM</b><div><strong>ໜຶ່ງ Job ຕໍ່ Work Item:</strong><p>Scheduler/worker ຕ້ອງ claim ວຽກດ້ວຍ unique key/lease ກ່ອນເຮັດ. Retry ຕ້ອງໃຊ້ attempt ID ແລະບໍ່ສ້າງ state change ຊ້ຳ.</p></div></li>
          <li><b>05 · ANALYTICS NON-BLOCKING</b><div><strong>Core Journey ສຳຄັນກວ່າ telemetry:</strong><p>Feed/Search/Place/Action ບໍ່ລໍຖ້າ optional analytics. Event API ລົ້ມຫ້າມຂັດຂວາງ Guest ແລະຫ້າມ client ສົ່ງ payload ບໍ່ຈຳກັດ.</p></div></li>
          <li><b>06 · CANONICAL ID</b><div><strong>Resolve ກ່ອນອ່ານ/ຂຽນ:</strong><p>Public route, Correction, Campaign ແລະ Analytics ຕ້ອງ resolve PlaceRedirect ກ່ອນໃຊ້ place_id ເພື່ອບໍ່ໃຫ້ data ໃໝ່ກັບໄປຜູກກັບ merged source.</p></div></li>
        </ol>
      </section>

      <section className={styles.documentArticleSection}>
        <span>D5 · FUNCTION COVERAGE GATE</span>
        <h2>Function Catalog → Workflow Coverage</h2>
        <div className={missingFunctions.length === 0 ? styles.saCoveragePass : styles.saCoverageFail}>
          <strong>{coveredFunctions.length}/{systemFunctionIds.length}</strong>
          <div><b>{missingFunctions.length === 0 ? "PASS — ALL FUNCTIONS MAPPED" : "MISSING FUNCTION IDS"}</b><p>{missingFunctions.length === 0 ? "Function Catalog ທັງໝົດຖືກອ້າງອີງຢູ່ຢ່າງໜ້ອຍໜຶ່ງ End-to-end Workflow." : missingFunctions.join(", ")}</p></div>
        </div>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>10 Modules ມີ Entry/Exit Workflow ແລະລະບຸ Cross-module dependency.</span></li>
          <li><b>02</b><span>64 Functions ຖືກອ້າງອີງຢູ່ Workflow ຢ່າງໜ້ອຍ 1 ອັນ.</span></li>
          <li><b>03</b><span>Workflow ທຸກອັນມີ Trigger, Preconditions, Participants, Ordered Steps, Alternate Flows ແລະ Postconditions.</span></li>
          <li><b>04</b><span>State-changing workflow ລະບຸ Transaction Boundary, Audit co-commit ແລະ Idempotency/Concurrency rule.</span></li>
          <li><b>05</b><span>External call ແລະ Analytics ບໍ່ຖືກລວມເຂົ້າ long-running domain transaction.</span></li>
          <li><b>06</b><span>Alternate Flow ບອກ Continuation ຊັດເຈນ; ບໍ່ຈົບດ້ວຍ “ສະແດງ Error” ເທົ່ານັ້ນ.</span></li>
        </ul>
      </section>

      <aside className={styles.saNextStep}>
        <small>ສະຖານະ SA</small><h2>ຂັ້ນ 1–3 ຈັດເຮັດແລ້ວ · ອ່ານຕໍ່ຂັ້ນ 4 Function Specification & Algorithm</h2>
        <p>ພາກ E ດ້ານລຸ່ມຈະເປີດ Function Catalog ແຕ່ລະອັນແລ້ວກຳນົດ Preconditions, Input/Output Contract, Processing Algorithm, Data Operation, Security/Performance ແລະ Testable Result. Workflow ໃນພາກ D ເປັນ Caller/Call-order baseline ຂອງ Specification ເຫຼົ່ານັ້ນ.</p>
      </aside>
    </section>
  );
}
