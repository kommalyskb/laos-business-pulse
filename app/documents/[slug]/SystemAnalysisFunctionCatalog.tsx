import styles from "../documents.module.css";

type FunctionType = "Query" | "Command" | "Client" | "Integration" | "Background" | "Report" | "Control";
type FunctionItem = {
  id: string;
  type: FunctionType;
  name: string;
  caller: string;
  input: string;
  output: string;
  data: string;
  rules: string;
  dependencies: string;
};
type Module = {
  id: string;
  domain: string;
  name: string;
  lao: string;
  goal: string;
  responsibilities: string[];
  prd: string;
  dependencies: string;
  functions: FunctionItem[];
};

const f = (id: string, type: FunctionType, name: string, caller: string, input: string, output: string, data: string, rules: string, dependencies: string): FunctionItem => ({ id, type, name, caller, input, output, data, rules, dependencies });

const modules: Module[] = [
  {
    id: "MOD-01", domain: "PUBLIC EXPERIENCE", name: "Discovery Feed", lao: "ການຄົ້ນພົບຜ່ານ Feed",
    goal: "ສົ່ງ Content Card ທີ່ເຜີຍແຜ່ແລ້ວໃຫ້ Guest ເລື່ອນເບິ່ງ ແລະເຂົ້າ Place Page ໄດ້ ໂດຍ Media ພາຍນອກບໍ່ຂັດຂວາງ Journey.",
    responsibilities: ["ຄັດສະເພາະ Place/Source ທີ່ມີສິດສະແດງ", "ຈັດຮູບ Content Card ແລະ Pagination", "ຮອງຮັບ Preview/Fallback ເມື່ອ Media ລົ້ມ"],
    prd: "USR-01, TRU-01, ANA-01", dependencies: "MOD-03, MOD-04, MOD-09, MOD-10",
    functions: [
      f("FN-FEED-001", "Query", "Load Discovery Feed", "Guest/Web Client", "cursor, pageSize, optional category", "feedItems, nextCursor", "R: Place, ContentSource, Campaign", "BR-02, BR-04, BR-05, BR-07", "FN-FEED-002, FN-FEED-003"),
      f("FN-FEED-002", "Control", "Select Eligible Feed Items", "FN-FEED-001", "candidate places/sources, currentTime", "eligible ordered candidates", "R: Place.status, Source.status, Campaign.status", "ສະແດງສະເພາະ Published; Sponsored ຕ້ອງ Active", "MOD-04, MOD-05, MOD-07"),
      f("FN-FEED-003", "Control", "Build Feed Item", "FN-FEED-001", "placeId, sourceId, campaignId?", "normalized FeedItem", "R: Place, Source, Creator, Campaign", "Attribution/Trust/Sponsored label ຕ້ອງແຍກ", "FN-PLC-003, FN-SRC-003"),
      f("FN-FEED-004", "Query", "Load Next Feed Page", "Web Client", "nextCursor", "next feedItems, nextCursor", "R: Feed candidate set", "Cursor ຕ້ອງບໍ່ສ້າງ item ຊ້ຳໃນ Session ດຽວ", "FN-FEED-001"),
      f("FN-FEED-005", "Client", "Render Media Fallback", "Feed UI", "embedStatus, preview metadata", "playable embed ຫຼື fallback card", "R: Source canonicalUrl/creator", "Temporary Failure ບໍ່ຖອນ Source; ຫ້າມ Re-host", "FN-SRC-006, External Social Platform"),
    ],
  },
  {
    id: "MOD-02", domain: "PUBLIC EXPERIENCE", name: "Search & Filter", lao: "ການຄົ້ນຫາ ແລະກອງຜົນ",
    goal: "ຄົ້ນ Published Place ດ້ວຍຊື່/ຄຳສຳຄັນ ແລະກອງຕາມໝວດ, ເຂດ ແລະຊ່ວງລາຄາສຳລັບ MVP.",
    responsibilities: ["Normalize ຄຳຄົ້ນ", "Query ແລະ Filter ຂໍ້ມູນທີ່ Published", "ສົ່ງ Empty State ທີ່ມີທາງເລືອກ"],
    prd: "USR-02, ANA-01", dependencies: "MOD-05, MOD-09, CON-01",
    functions: [
      f("FN-SRCH-001", "Control", "Normalize Search Query", "FN-SRCH-002", "rawQuery, locale", "normalizedQuery, tokens", "No write", "ຕັດ whitespace/ຮູບແບບທີ່ບໍ່ຈຳເປັນ; ຫ້າມປ່ຽນຄວາມໝາຍ", "Search vocabulary"),
      f("FN-SRCH-002", "Query", "Search Published Places", "Guest/Web Client", "query, cursor, pageSize", "place summaries, nextCursor", "R: Place, Category, Area, searchable terms", "ບໍ່ສະແດງ Draft/Suspended/Archived", "FN-SRCH-001, FN-SRCH-004"),
      f("FN-SRCH-003", "Query", "Apply Launch Filters", "Guest/Web Client", "categoryIds, areaIds, priceRange", "filtered place set", "R: Place category/area/price", "MVP ບໍ່ມີ Near me/Open now", "FN-SRCH-002"),
      f("FN-SRCH-004", "Control", "Order Search Results", "FN-SRCH-002", "matching places, sponsored context", "ordered results", "R: relevance fields, Campaign", "Sponsored ຕ້ອງມີ Label; ບໍ່ປ່ຽນ Verified status", "MOD-07"),
      f("FN-SRCH-005", "Control", "Build Empty-result Suggestions", "Search UI", "query, activeFilters", "clear-filter action, suggested categories", "R: Category", "ບໍ່ສະແດງຜົນທີ່ບໍ່ກົງໂດຍບໍ່ບອກ", "FN-SRCH-002, FN-SRCH-003"),
    ],
  },
  {
    id: "MOD-03", domain: "PUBLIC EXPERIENCE", name: "Place Detail & Decision Actions", lao: "ຂໍ້ມູນຮ້ານ ແລະການລົງມືເຮັດ",
    goal: "ສະແດງ Canonical Place ພ້ອມຂໍ້ມູນຕັດສິນໃຈ ແລະເປີດ Map/Call/Message ໄປຫາປາຍທາງທີ່ຖືກຕ້ອງ.",
    responsibilities: ["ປະກອບ Place Detail ຈາກຫຼາຍ Entity", "ຄຳນວນ Trust/Freshness Label", "ສ້າງ External Action", "Save ແບບ Local ແລະ Share Canonical URL"],
    prd: "USR-03, USR-04, USR-05, TRU-01, ANA-01", dependencies: "MOD-04, MOD-05, MOD-09, MOD-10",
    functions: [
      f("FN-PLC-001", "Query", "Get Public Place Detail", "Guest/Web Client", "placeSlug or placeId", "PlaceDetail or redirect/not-found", "R: Place and related entities", "Published only; old merged ID ຕ້ອງ Redirect", "FN-PLC-002, FN-PLC-003, FN-PLC-004, FN-PADM-010"),
      f("FN-PLC-002", "Query", "List Published Place Sources", "FN-PLC-001", "placeId", "attributed source list", "R: ContentSource, Creator", "Published/available only; canonical URL ບັງຄັບ", "MOD-04"),
      f("FN-PLC-003", "Control", "Resolve Trust & Freshness Labels", "FN-PLC-001/FN-FEED-003", "place verification, source, campaign, freshness", "independent labels", "R: Verification, Campaign, freshness status", "Source/Verified/Partner/Sponsored ຫ້າມໃຊ້ແທນກັນ", "BR-05, BR-13"),
      f("FN-PLC-004", "Control", "Build Contact Actions", "FN-PLC-001", "contacts, coordinates, device capabilities", "available Map/Call/Message actions", "R: PlaceContact, coordinates", "ສະແດງສະເພາະ Action ທີ່ມີຂໍ້ມູນປາຍທາງ", "No external call yet"),
      f("FN-ACT-001", "Integration", "Open Map Action", "Guest/Web Client", "placeId, coordinates/mapUrl", "external map launch result", "No business write; analytics event", "ພິກັດຕ້ອງກົງ Place; ມີ web fallback", "Map Provider, FN-ANA-005"),
      f("FN-ACT-002", "Integration", "Open Call Action", "Guest/Web Client", "placeId, phone", "dialer launch or copy fallback", "No business write; analytics event", "Normalize phone; ຫ້າມໂທເບີທີ່ບໍ່ຢືນຢັນໂດຍບໍ່ມີ label", "Device Dialer, FN-ANA-005"),
      f("FN-ACT-003", "Integration", "Open Message Action", "Guest/Web Client", "placeId, channel, target", "message app/web launch result", "No business write; analytics event", "ໃຊ້ channel ທີ່ Place ເຜີຍແຜ່; ມີ fallback", "Messaging App, FN-ANA-005"),
      f("FN-ACT-004", "Client", "Save Place on Device", "Guest/Web Client", "placeId", "saved/unsaved local state", "W: browser/device storage only", "Guest-first; ບໍ່ sync ຂ້າມອຸປະກອນໃນ MVP", "FN-ANA-003 when consented"),
      f("FN-ACT-005", "Client", "Share Canonical Place Link", "Guest/Web Client", "place canonicalUrl, share metadata", "native share/copy result", "No business write; analytics event", "ຕ້ອງ Share Canonical URL ບໍ່ແມ່ນ duplicate URL", "Web Share/Clipboard, FN-ANA-003"),
    ],
  },
  {
    id: "MOD-04", domain: "CONTENT OPERATIONS", name: "Content Source Management", lao: "ການຈັດການແຫຼ່ງ Content",
    goal: "ລົງທະບຽນ, ກວດ, ຈັບຄູ່ ແລະຄວບຄຸມ Lifecycle ຂອງ Social Content Link ໂດຍຮັກສາ Attribution ແລະ Takedown.",
    responsibilities: ["Validate URL/Platform/Creator", "ຈັບຄູ່ Source ກັບ Canonical Place", "Publish/Unavailable/Remove", "ປະມວນ Takedown"],
    prd: "ADM-01, TRU-01, USR-01, USR-03", dependencies: "MOD-05, MOD-06, MOD-08, External Social Platforms",
    functions: [
      f("FN-SRC-001", "Command", "Register Content Source", "Admin", "canonicalUrl, platform, creator, proposedPlace", "sourceId in Proposed", "W: ContentSource, Creator?", "URL ແລະ Platform ບັງຄັບ; ຫ້າມສ້າງ canonicalUrl ຊ້ຳ", "FN-SRC-002, FN-ADM-004"),
      f("FN-SRC-002", "Integration", "Validate Source URL", "Admin/Background", "sourceId or URL", "validity, availability class, reason", "R/W: Source check result", "ແຍກ Temporary/Confirmed/Takedown; ຫ້າມ Download video", "External Social Platform"),
      f("FN-SRC-003", "Integration", "Read Permitted Source Metadata", "Admin", "validated URL", "creator/title/preview/embed metadata", "W: permitted metadata only", "ເກັບສະເພາະ Metadata ທີ່ Source ອະນຸຍາດ", "FN-SRC-002"),
      f("FN-SRC-004", "Command", "Link Source to Canonical Place", "Admin", "sourceId, placeId", "linked source", "W: PlaceSource relation", "Source ໜຶ່ງຊີ້ Place ຫຼັກໜຶ່ງໃນ MVP", "FN-PADM-008"),
      f("FN-SRC-005", "Command", "Publish or Unpublish Source", "Admin", "sourceId, targetStatus, reason", "new source status", "W: ContentSource.status, AuditLog", "Publish ຕ້ອງຜ່ານ URL/Attribution/Place checks", "FN-SRC-002—004, FN-ADM-004"),
      f("FN-SRC-006", "Background", "Check Source Availability", "Scheduler/Admin", "sourceId", "availability status, checkedAt, nextAction", "R/W: ContentSource availability", "Temporary ໃຊ້ Retry; Confirmed ຖອນ Feed; recheck 7 ວັນ", "FN-SRC-002, MOD-10"),
      f("FN-SRC-007", "Command", "Process Source Takedown", "Admin", "requestId, sourceId, decision", "source hidden/removed, request result", "W: Source, TakedownRequest, AuditLog", "ຖອນ Public View ທັນທີໃນລະຫວ່າງກວດ", "MOD-06, FN-ADM-004"),
    ],
  },
  {
    id: "MOD-05", domain: "PLACE OPERATIONS", name: "Place Data Management", lao: "ການຈັດການຂໍ້ມູນສະຖານທີ່",
    goal: "ຮັກສາ Canonical Place ຕັ້ງແຕ່ Draft ຫາ Published/Suspended/Archived ພ້ອມ Publish Gate, Duplicate Control ແລະ Redirect.",
    responsibilities: ["Create/Update/Validate Place", "Publish lifecycle", "Detect/Merge duplicate", "ຮັກສາ Canonical URL ແລະ Audit"],
    prd: "USR-03, ADM-01, TRU-01, BUS-01", dependencies: "MOD-04, MOD-08, MOD-10, CON-01, CON-02",
    functions: [
      f("FN-PADM-001", "Command", "Create Place Draft", "Admin", "name, category, area, coordinates, source?", "placeId, Draft", "W: Place and initial relations", "ຄົ້ນ Duplicate Candidate ກ່ອນສ້າງ", "FN-PADM-008, FN-ADM-004"),
      f("FN-PADM-002", "Command", "Update Place Field", "Admin/FN-REQ-004", "placeId, field, value, source/evidence, reason", "updated draft/review record", "W: Place/related entity, Verification, AuditLog", "Field ສຳຄັນຕ້ອງມີ source/evidence", "FN-PADM-003, FN-ADM-004"),
      f("FN-PADM-003", "Control", "Validate Place Data", "Admin/Publish/Correction", "placeId or candidate values", "field errors, warnings, completeness", "R: Place and data standard", "Unknown ຕ້ອງ label; ຫ້າມຄາດເດົາ", "CON-02"),
      f("FN-PADM-004", "Control", "Check Publish Readiness", "FN-PADM-005", "placeId", "ready boolean, blockers", "R: Place, Source, duplicate review, approval", "Required fields + valid source + no unresolved duplicate + admin approval", "FN-PADM-003, FN-SRC-002, FN-PADM-008"),
      f("FN-PADM-005", "Command", "Publish Place", "Admin", "placeId, approval reason", "Published Place, canonicalUrl", "W: Place.status, publishedAt, AuditLog", "ປ່ຽນໄດ້ສະເພາະເມື່ອ Publish Readiness = true", "FN-PADM-004, FN-ADM-004"),
      f("FN-PADM-006", "Command", "Suspend Place", "Admin/Quality Control", "placeId, reason, optionalUntil", "Suspended Place", "W: Place.status, AuditLog", "ຖອນຈາກ Feed/Search; ບໍ່ລົບປະຫວັດ", "FN-ADM-004"),
      f("FN-PADM-007", "Command", "Archive Place", "Admin", "placeId, closure evidence, reason", "Archived Place", "W: Place.status, closedAt, AuditLog", "ໃຊ້ເມື່ອປິດຖາວອນ; ບໍ່ Hard Delete", "FN-ADM-004"),
      f("FN-PADM-008", "Control", "Detect Duplicate Place Candidates", "Create/Update/Import", "name, phone, coordinates, socialPage", "ranked duplicate candidates with signals", "R: Place identity/contact/location", "ເປັນ Candidate ເທົ່ານັ້ນ; ຫ້າມ Auto-merge", "No dependency on merge"),
      f("FN-PADM-009", "Command", "Merge Duplicate Places", "Admin", "sourcePlaceId, canonicalPlaceId, reason", "merged relations, redirect", "W: Place, Source, Request, Campaign, Analytics reference, Redirect, AuditLog", "Admin-only; ຕ້ອງກວດສາຂາ; ຮັກສາປະຫວັດ", "FN-PADM-008, FN-ADM-004"),
      f("FN-PADM-010", "Query", "Resolve Canonical Place Redirect", "Public Place route", "slug/placeId", "canonical place or not-found", "R: PlaceRedirect, Place", "Old merged URL ຕ້ອງ Redirect; archived policy ກຳນົດພາຍຫຼັງ", "FN-PADM-009"),
    ],
  },
  {
    id: "MOD-06", domain: "PLACE OPERATIONS", name: "Correction & Request Management", lao: "ຄຳຮ້ອງແກ້ໄຂ ແລະຫຼັກຖານ",
    goal: "ຮັບ Correction/Takedown, ກວດຄວາມຄົບ, ຄວບຄຸມ SLA ແລະປ່ຽນ Public Data ສະເພາະຫຼັງ Admin Decision.",
    responsibilities: ["Register/triage request", "Needs Evidence", "Approve/Reject/Close", "Urgent handling ແລະ SLA"],
    prd: "BUS-01, ADM-01, TRU-01", dependencies: "MOD-04, MOD-05, MOD-08, MOD-10",
    functions: [
      f("FN-REQ-001", "Command", "Register Correction Request", "Place Owner/Admin", "placeId, requested changes, contact, evidence", "requestId, Submitted", "W: CorrectionRequest, RequestItem, Evidence reference", "ບັນທຶກ receivedAt; Pilot ອາດຮັບຈາກ external channel", "FN-REQ-002"),
      f("FN-REQ-002", "Control", "Validate & Triage Request", "Admin", "requestId", "priority, completeness, SLA clock", "R/W: Request status/priority", "Urgent: map/phone/closed/takedown; incomplete → Needs Evidence", "BR-12"),
      f("FN-REQ-003", "Command", "Request Additional Evidence", "Admin", "requestId, missing evidence, message", "Needs Evidence, requester notice", "W: Request status, communication log", "3-day decision clock ຢຸດຈົນຫຼັກຖານຄົບ", "FN-REQ-002, FN-ADM-004"),
      f("FN-REQ-004", "Command", "Approve Correction", "Admin", "requestId, approved items, reason", "Place updated, Approved", "W: Place fields, Verification, Request, AuditLog", "ແກ້ສະເພາະ approved items; revalidate publish state", "FN-PADM-002—004, FN-ADM-004"),
      f("FN-REQ-005", "Command", "Reject Correction", "Admin", "requestId, rejected items, reason", "Rejected request, requester notice", "W: Request decision, AuditLog", "Reason ບັງຄັບ; Public Data ບໍ່ປ່ຽນ", "FN-ADM-004"),
      f("FN-REQ-006", "Command", "Close Request", "Admin/System", "requestId, final outcome", "Closed request", "W: Request.closedAt/status", "Close ຫຼັງ decision/action ແລະບັນທຶກຜົນຄົບ", "FN-REQ-004/005 or FN-SRC-007"),
    ],
  },
  {
    id: "MOD-07", domain: "MONETIZATION", name: "Sponsored Campaign", lao: "ການສະແດງຜົນແບບມີຜູ້ອຸປະຖຳ",
    goal: "ຄວບຄຸມ Sponsored Placement ໃຫ້ມີ Place ທີ່ມີສິດ, ໄລຍະ, Label, State ແລະ Performance Summary ທີ່ກວດໄດ້.",
    responsibilities: ["Create/validate campaign", "Schedule/activate/change state", "ສົ່ງຂໍ້ມູນສຳລັບ placement", "Campaign summary"],
    prd: "TRU-01, ANA-01; BUS-06 Revenue", dependencies: "MOD-01, MOD-02, MOD-05, MOD-09",
    functions: [
      f("FN-CMP-001", "Command", "Create Campaign Draft", "Admin", "placeId, placement, start/end, agreed price/reference", "campaignId, Draft", "W: Campaign", "ບໍ່ປ່ຽນ Place verified/review score", "FN-CMP-002, FN-ADM-004"),
      f("FN-CMP-002", "Control", "Validate Campaign Eligibility", "Admin/Scheduler", "campaignId, currentTime", "eligible, blockers", "R: Campaign, Place status, placement rules", "Place ຕ້ອງ Published; start < end; label configuration ຄົບ", "MOD-05"),
      f("FN-CMP-003", "Command", "Schedule Campaign", "Admin", "campaignId", "Scheduled campaign", "W: Campaign.status", "Eligibility ຕ້ອງຜ່ານ", "FN-CMP-002, FN-ADM-004"),
      f("FN-CMP-004", "Command", "Change Campaign State", "Admin/Scheduler", "campaignId, targetState, reason", "Active/Paused/Ended", "W: Campaign status/timestamps, AuditLog", "Active ສະເພາະໃນໄລຍະ; End ຫຼັງໝົດກຳນົດ", "FN-CMP-002, FN-ADM-004"),
      f("FN-CMP-005", "Report", "Build Campaign Performance Summary", "Admin/Business Reporting", "campaignId, period", "impressions, place opens, decision intents with definitions", "R: Campaign, Analytics aggregates", "ຫ້າມລາຍງານ intent ເປັນ visit/sale", "MOD-09"),
    ],
  },
  {
    id: "MOD-08", domain: "PLATFORM CONTROL", name: "Admin Access & Audit", lao: "ສິດ Admin ແລະປະຫວັດການປ່ຽນ",
    goal: "ຢືນຢັນ Admin, ກວດສິດ, ຈັດ Work Queue ແລະບັນທຶກການປ່ຽນທີ່ກະທົບ Public Data.",
    responsibilities: ["Authentication/Authorization boundary", "Operational work queue", "Immutable-style audit record"],
    prd: "ADM-01, NFR-04", dependencies: "Security design (TEC-06), all command modules",
    functions: [
      f("FN-ADM-001", "Control", "Authenticate Admin", "Admin Client", "credentials/session proof", "admin session or auth error", "R: AdminUser/session store", "ຫ້າມ Shared Account; method ກຳນົດໃນ Technical Design", "TEC-06"),
      f("FN-ADM-002", "Control", "Authorize Admin Action", "All Admin Commands", "adminId, action, resource", "allow/deny + reason", "R: Admin role/status", "Pilot Full Admin; ກະກຽມແຍກ Operator/Approver", "FN-ADM-001"),
      f("FN-ADM-003", "Query", "List Admin Work Queue", "Admin", "queue type, status, due/priority", "requests/sources/places/campaigns requiring action", "R: operational entities", "Urgent/SLA overdue ກ່ອນ; result ຕ້ອງ paginate", "MOD-04/05/06/07/10"),
      f("FN-ADM-004", "Command", "Write Audit Log", "All privileged Commands", "actor, entity, action, before/after, reason", "auditId", "W: AuditLog", "ຫ້າມຂ້າມສຳລັບ publish/status/merge/decision/campaign", "FN-ADM-002"),
    ],
  },
  {
    id: "MOD-09", domain: "MEASUREMENT", name: "Analytics & Reporting", lao: "ການເກັບ Event ແລະລາຍງານ",
    goal: "ເກັບ Product Event ແບບ Anonymous ຕາມ Consent, ລົດ Event ຊ້ຳ ແລະສະຫຼຸບ Funnel/Performance ໂດຍບໍ່ອ້າງເກີນຫຼັກຖານ.",
    responsibilities: ["Consent/session", "Event validation/recording", "Decision Intent deduplication", "Funnel ແລະ partner/campaign summary"],
    prd: "ANA-01, NFR-04", dependencies: "Public modules, consent policy, DEL-04",
    functions: [
      f("FN-ANA-001", "Client", "Set Analytics Consent", "Guest/Web Client", "consent choice", "stored consent mode", "W: device consent preference; optional server consent event", "Core Journey ຕ້ອງໃຊ້ໄດ້ເມື່ອປະຕິເສດ", "Privacy notice"),
      f("FN-ANA-002", "Client", "Get or Create Anonymous Session", "Web Client", "consent mode, existing session", "anonymous sessionId", "W: device/session storage", "ບໍ່ຜູກກັບຊື່/ເບີໂທ; expiry ກຳນົດໃນ DEL-04", "FN-ANA-001"),
      f("FN-ANA-003", "Command", "Record Product Event", "Web Client/Public Modules", "event payload", "accepted/rejected", "W: AnalyticsEvent", "Optional event ຕ້ອງມີ consent; server timestamp ເປັນຫຼັກ", "FN-ANA-004"),
      f("FN-ANA-004", "Control", "Validate Event Payload", "FN-ANA-003", "eventName, sessionId, place/source/campaign IDs, properties", "valid payload or validation error", "R: event dictionary/entity existence", "ອະນຸຍາດສະເພາະ field ທີ່ນິຍາມ; ຫ້າມ PII", "DEL-04 event taxonomy"),
      f("FN-ANA-005", "Control", "Deduplicate Decision Intent", "FN-ANA-003", "sessionId, placeId, actionType, timestamp", "uniqueIntent boolean, dedupeKey", "R/W: DecisionIntent or dedupe store", "ນິຍາມ window ສຸດທ້າຍຢູ່ DEL-04; ຫ້າມນັບ rapid repeat", "FN-ANA-002/004"),
      f("FN-ANA-006", "Report", "Aggregate Product Funnel", "Admin/Reporting Job", "period, segment filters", "Feed→Place→Intent counts/rates", "R: AnalyticsEvent/DecisionIntent", "ໃຊ້ນິຍາມ Unique ດຽວ; ສະແດງ data quality flag", "FN-ANA-003—005"),
      f("FN-ANA-007", "Report", "Build Place Performance Summary", "Admin/Founding Partner report", "placeId, period", "reach, place opens, actions by type", "R: aggregated analytics", "Decision Intent ບໍ່ແມ່ນ visit/sale; ບໍ່ເປີດເຜີຍ individual session", "FN-ANA-006"),
    ],
  },
  {
    id: "MOD-10", domain: "PLATFORM CONTROL", name: "Data Quality & Scheduled Maintenance", lao: "ຄຸນນະພາບຂໍ້ມູນ ແລະວຽກຕາມກຳນົດ",
    goal: "ຕິດຕາມ Freshness, ສ້າງວຽກກວດຄືນ, ຄວບຄຸມ Place ທີ່ Stale ແລະ Recheck/Restore Source ຕາມກົດ 30/60/7 ວັນ.",
    responsibilities: ["Freshness calculation/schedule", "Stale flag/Suspend candidate", "Source recheck/restore", "Admin work item"],
    prd: "USR-03, ADM-01, TRU-01; BR-13, BR-15", dependencies: "MOD-04, MOD-05, MOD-08, Scheduler",
    functions: [
      f("FN-DQ-001", "Background", "Schedule Place Freshness Review", "Scheduler", "currentDate", "due review work items", "R: Place tier/verifiedAt; W: WorkItem", "Partner 30 ວັນ; Free 60 ວັນ", "FN-DQ-002, FN-ADM-003"),
      f("FN-DQ-002", "Control", "Calculate Place Freshness Status", "Public/Admin/Background", "tier, field checked dates, currentDate", "fresh/due/stale + dueDate", "R: Verification/Place tier", "ຄຳນວນສະເພາະ critical fields ທີ່ອະນຸມັດ", "BR-13"),
      f("FN-DQ-003", "Command", "Flag Stale Place Data", "Background/Admin", "placeId, stale fields", "review label/work item", "W: Place quality status, WorkItem", "ກາຍກຳນົດບໍ່ລົບທັນທີ; label “ຄວນກວດຄືນ”", "FN-DQ-002, FN-ADM-004"),
      f("FN-DQ-004", "Command", "Complete Place Verification", "Admin", "placeId, checked fields, evidence", "new verified dates/status", "W: Verification, Place quality, AuditLog", "ຕ້ອງລະບຸ source/evidence ແລະ field ທີ່ກວດ", "FN-PADM-003, FN-ADM-004"),
      f("FN-DQ-005", "Background", "Recheck Unavailable Source", "Scheduler/Admin", "sourceId, dueAt", "still unavailable/restored", "R/W: Source check/status", "Recheck ພາຍໃນ 7 ວັນ; Takedown ບໍ່ Auto-restore", "FN-SRC-002/006"),
      f("FN-DQ-006", "Command", "Restore Available Source", "Admin/Validated Job", "sourceId, successful check evidence", "Checked/Published source", "W: Source status, AuditLog", "ຕ້ອງຜ່ານ validation/attribution/place link ຄືນ", "FN-SRC-002—005, FN-ADM-004"),
    ],
  },
];

const totalFunctions = modules.reduce((sum, module) => sum + module.functions.length, 0);
const typeCounts = modules.flatMap((module) => module.functions).reduce<Record<string, number>>((counts, item) => ({ ...counts, [item.type]: (counts[item.type] ?? 0) + 1 }), {});

export default function SystemAnalysisFunctionCatalog() {
  return (
    <section className={styles.saFunctionCatalog} id="sa-function-catalog">
      <header className={styles.saPartHeader}>
        <span>ພາກ B · ຂັ້ນ 1 ຂອງ SA</span>
        <h2>Functional Decomposition & Function Catalog</h2>
        <p>ພາກນີ້ແຕກ System Boundary ຈາກພາກ A ອອກເປັນ 10 Modules ແລະ {totalFunctions} Logical Functions. “Function” ໃນ Catalog ໝາຍເຖິງຄວາມຮັບຜິດຊອບໜຶ່ງທີ່ມີ Caller, Input, Output, Data Impact, Rules ແລະ Dependency ຊັດເຈນ; ບໍ່ໄດ້ໝາຍຄວາມວ່າຈະຕ້ອງກາຍເປັນ Code Function ໜຶ່ງອັນພອດີ.</p>
        <p>Catalog ນີ້ແມ່ນ Baseline ສຳລັບຂັ້ນ 2 Logical Data Model: Entity ແລະ Relationship ຈະຖືກສ້າງຈາກ Data Read/Write ຂອງ Function ເຫຼົ່ານີ້. Algorithm ແບບລະອຽດຍັງບໍ່ຂຽນໃນຂັ້ນນີ້ ເພາະເປັນຂັ້ນ 4.</p>
      </header>

      <div className={styles.saCatalogSummary}>
        <article><small>MODULES</small><strong>{modules.length}</strong><p>Public, Content, Place, Monetization, Control ແລະ Measurement</p></article>
        <article><small>LOGICAL FUNCTIONS</small><strong>{totalFunctions}</strong><p>ທຸກ Function ມີ ID ຖາວອນສຳລັບ Traceability</p></article>
        <article><small>FUNCTION TYPES</small><strong>{Object.keys(typeCounts).length}</strong><p>Query · Command · Control · Client · Integration · Background · Report</p></article>
        <article><small>STEP STATUS</small><strong>DONE</strong><p>Logical Data Model & ERD ຖືກຈັດເຮັດຕໍ່ໃນພາກ C</p></article>
      </div>

      <section className={styles.documentArticleSection}>
        <span>B1 · DECOMPOSITION METHOD</span>
        <h2>ລະບົບ → Domain → Module → Function</h2>
        <p className={styles.documentQuestion}>ຫຼັກໃດໃຊ້ແບ່ງ Function ແລະຈະປ້ອງກັນການແບ່ງຕາມໜ້າຈໍແນວໃດ?</p>
        <div className={styles.documentProse}>
          <p>Decomposition ເລີ່ມຈາກ System Boundary ແລ້ວແບ່ງຕາມ Business Capability, ບໍ່ແມ່ນຕາມ UI Page. ຕົວຢ່າງ Place Detail Page ຮຽກຫຼາຍ Function: Get Public Place Detail, List Sources, Resolve Labels ແລະ Build Contact Actions. ແຕ່ Function ເຫຼົ່ານີ້ບໍ່ຄວນຖືກລວມເປັນ “Open Page” ອັນດຽວ ເພາະມີ Data/Rules ຄົນລະສ່ວນ.</p>
          <p>Query ອ່ານຂໍ້ມູນແຕ່ບໍ່ປ່ຽນ Business State; Command ປ່ຽນ State; Control ປະເມີນ Rule ແລະສົ່ງ Decision; Client ເຮັດວຽກໃນອຸປະກອນ; Integration ຕິດຕໍ່ລະບົບພາຍນອກ; Background ຖືກຮຽກຕາມກຳນົດ; Report ສະຫຼຸບຂໍ້ມູນ.</p>
          <p>Function ID ຈະບໍ່ຖືກນຳກັບມາໃຊ້ໃໝ່ຖ້າ Function ຖືກຍົກເລີກ. ການ Split/Merge Function ພາຍຫຼັງຕ້ອງບັນທຶກ Mapping ເພື່ອບໍ່ໃຫ້ Requirement, Workflow ແລະ Test Case ຂາດ Traceability.</p>
        </div>
        <div className={styles.saTypeLegend}>{Object.entries(typeCounts).map(([type, count]) => <div key={type}><b>{type}</b><strong>{count}</strong><span>Functions</span></div>)}</div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>B2 · MODULE INVENTORY</span>
        <h2>10 Modules ແລະຂອບເຂດຄວາມຮັບຜິດຊອບ</h2>
        <div className={styles.saModuleTable} role="table" aria-label="System module inventory">
          <div role="row"><b>MODULE</b><b>DOMAIN</b><b>RESPONSIBILITY</b><b>FUNCTIONS</b><b>PRO-01</b><b>MODULE DEPENDENCIES</b></div>
          {modules.map((module) => <div role="row" key={module.id}><b>{module.id}</b><small>{module.domain}</small><div><strong>{module.name}</strong><p>{module.lao}</p></div><em>{module.functions.length}</em><span>{module.prd}</span><p>{module.dependencies}</p></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>B3 · FUNCTION CATALOG</span>
        <h2>Function Dictionary ແຍກຕາມ Module</h2>
        <p className={styles.documentQuestion}>Developer ຄວນເຫັນຂໍ້ມູນໃດກ່ອນນຳ Function ໄປອອກແບບ Data, Workflow ແລະ Algorithm?</p>
        <div className={styles.documentProse}>
          <p>ເລືອກເປີດແຕ່ລະ Module ເພື່ອເບິ່ງ Catalog. Data Impact ໃຊ້ R ໝາຍເຖິງ Read ແລະ W ໝາຍເຖິງ Write. ຊື່ Entity ປັດຈຸບັນເປັນ Conceptual Name; ຈະຖືກຢືນຢັນເປັນ Logical Entity/Relationship ໃນຂັ້ນ 2.</p>
        </div>
        <div className={styles.saModuleCatalogs}>
          {modules.map((module, index) => (
            <details key={module.id} open={index === 0}>
              <summary><span>{module.id}</span><div><small>{module.domain}</small><strong>{module.name} — {module.lao}</strong></div><em>{module.functions.length} Functions</em></summary>
              <div className={styles.saModuleDescription}><p>{module.goal}</p><div><b>RESPONSIBILITIES</b><ul>{module.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div><div><b>DEPENDENCIES</b><p>{module.dependencies}</p></div></div>
              <div className={styles.saFunctionTable} role="table" aria-label={`${module.name} functions`}>
                <div role="row"><b>ID / TYPE</b><b>FUNCTION / CALLER</b><b>INPUT → OUTPUT</b><b>DATA IMPACT</b><b>RULES</b><b>DEPENDENCIES</b></div>
                {module.functions.map((item) => <div role="row" key={item.id}>
                  <div><b>{item.id}</b><span>{item.type}</span></div>
                  <div><strong>{item.name}</strong><small>Caller: {item.caller}</small></div>
                  <div><p><b>IN</b> {item.input}</p><p><b>OUT</b> {item.output}</p></div>
                  <p>{item.data}</p><p>{item.rules}</p><p>{item.dependencies}</p>
                </div>)}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>B4 · SCOPE CONTROL</span>
        <h2>Function ທີ່ບໍ່ຢູ່ໃນ MVP Catalog</h2>
        <div className={styles.documentProse}>
          <p>Booking, Payment, Order, Refund, Native Mobile App, User Account/Profile, Creator Dashboard/Marketplace, Comment/Follow ແລະ AI Personalization ບໍ່ຢູ່ໃນ 64 Functions. ການອອກແບບ Function, Entity ຫຼື Workflow ສຳລັບສິ່ງເຫຼົ່ານີ້ຈະຖືວ່າ Scope Expansion.</p>
          <p>External Map, Dialer, Messaging ແລະ Social Platform ປາກົດເປັນ Dependency/Integration Boundary ເທົ່ານັ້ນ. “ພ້ອມໄປ” ຮັບຜິດຊອບການສ້າງຂໍ້ມູນສົ່ງຕໍ່, ບັນທຶກ Intent ແລະຈັດການ Fallback; ບໍ່ຮັບຜິດຊອບຜົນການດຳເນີນງານພາຍໃນ External App.</p>
        </div>
        <div className={styles.scopeColumns}>
          <div><h3>IN FUNCTION CATALOG</h3><ul><li>Public discovery/search/place/actions</li><li>Place/Source/Request/Campaign operations</li><li>Admin access and audit boundary</li><li>Analytics, reporting and data quality</li><li>External integration handoff/fallback</li></ul></div>
          <div><h3>OUT OF MVP CATALOG</h3><ul><li>Booking, payment, order and refund</li><li>User/Creator account ecosystem</li><li>Social comments/follow/messages inside platform</li><li>Native apps and push notifications</li><li>AI personalization and automated content generation</li></ul></div>
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>B5 · COMPLETION GATE</span>
        <h2>ເກນສຳເລັດຂອງຂັ້ນ 1</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ທຸກ Function ມີ ID ບໍ່ຊ້ຳ ແລະສັງກັດ Module ດຽວ.</span></li>
          <li><b>02</b><span>ທຸກ Function ລະບຸ Caller, Input, Output ແລະປະເພດຂອງ Function.</span></li>
          <li><b>03</b><span>Function ທີ່ປ່ຽນ State ລະບຸ Data Write ແລະ Audit Dependency.</span></li>
          <li><b>04</b><span>External Action ແລະ Background Job ຖືກແຍກອອກຈາກ Query/Command ປົກກະຕິ.</span></li>
          <li><b>05</b><span>PRO-01 Requirements ມີ Module ຮັບຜິດຊອບ ແລະບໍ່ມີ Non-goal ປົນເຂົ້າ MVP Catalog.</span></li>
          <li><b>06</b><span>Conceptual Data Names ຈາກ Data Impact ພ້ອມນຳໄປສ້າງ Logical ERD ໃນຂັ້ນ 2.</span></li>
        </ul>
      </section>

      <aside className={styles.saNextStep}>
        <small>ສະຖານະ SA</small><h2>ຂັ້ນ 1 ຈັດເຮັດແລ້ວ · ອ່ານຕໍ່ຂັ້ນ 2 Logical Data Model & ERD</h2>
        <p>PRO-02 ຍັງຢູ່ສະຖານະ “ກຳລັງຈັດເຮັດ”. Function Catalog ຈະບໍ່ຖືກອ້າງເປັນ Physical API ຫຼື Code Structure; ພາກ C ດ້ານລຸ່ມຈະກຳນົດ Entity, Attribute, Key ແລະ Relationship ຈາກ Data Impact ຂອງ Catalog.</p>
      </aside>
    </section>
  );
}
