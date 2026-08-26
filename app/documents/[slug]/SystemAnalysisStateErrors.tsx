import styles from "../documents.module.css";
import { systemFunctionCatalog } from "./SystemAnalysisFunctionCatalog";

type StateDefinition = {
  name: string;
  meaning: string;
  publicEffect: string;
};

type Transition = {
  id: string;
  from: string;
  event: string;
  to: string;
  functionId: string;
  actor: string;
  guard: string;
  writes: string;
  failure: string;
};

type StateMachine = {
  id: string;
  entity: string;
  field: string;
  purpose: string;
  invariant: string;
  states: StateDefinition[];
  transitions: Transition[];
};

type ErrorDefinition = {
  code: string;
  category: string;
  status: string;
  retry: string;
  condition: string;
  userResponse: string;
  systemResponse: string;
};

const stateMachines: StateMachine[] = [
  {
    id: "SM-01",
    entity: "Place",
    field: "Place.lifecycle_status",
    purpose: "ຄວບຄຸມວ່າ Place ຖືກແກ້, ກວດ ແລະປາກົດຕໍ່ສາທາລະນະໄດ້ຕອນໃດ.",
    invariant: "Feed/Search/Place Detail ສະແດງໄດ້ສະເພາະ Published. Archived ແລະ Merged ເປັນ Terminal State; ຫ້າມກັບໄປ Published ໂດຍການ Update ທົ່ວໄປ.",
    states: [
      { name: "Draft", meaning: "ບັນທຶກໃໝ່ທີ່ Admin ຍັງປ້ອນ ຫຼືແກ້ຂໍ້ມູນ.", publicEffect: "ບໍ່ປາກົດໃນ Public UI." },
      { name: "InReview", meaning: "Required Field, Source, Duplicate ແລະ Evidence ກຳລັງຖືກກວດ.", publicEffect: "ບໍ່ປາກົດ; Admin ເຫັນ Blocker." },
      { name: "Published", meaning: "ຜ່ານ Publish Gate ແລະມີ Canonical URL.", publicEffect: "ປາກົດໃນ Feed/Search/Place Detail ຕາມ Eligibility." },
      { name: "Suspended", meaning: "ຖືກຢຸດຊົ່ວຄາວເພາະຄຸນນະພາບ, ຂໍ້ມູນຂັດກັນ ຫຼືການກວດສອບ.", publicEffect: "ຖອນຈາກ Feed/Search; ປະຫວັດຍັງຢູ່." },
      { name: "Archived", meaning: "ຢືນຢັນວ່າປິດຖາວອນ ຫຼືບໍ່ຄວນໃຊ້ອີກ.", publicEffect: "ບໍ່ປາກົດ; ບໍ່ Hard Delete." },
      { name: "Merged", meaning: "ບັນທຶກຊ້ຳຖືກລວມເຂົ້າ Canonical Place.", publicEffect: "URL/ID ເກົ່າ Redirect ໄປ Canonical Place." },
    ],
    transitions: [
      { id: "TR-PLC-01", from: "—", event: "Create draft", to: "Draft", functionId: "FN-PADM-001", actor: "Admin", guard: "ຂໍ້ມູນຂັ້ນຕ່ຳຄົບ; ກວດ Duplicate Candidate ແລ້ວ.", writes: "ສ້າງ Place + relation ຂັ້ນຕົ້ນ + Audit.", failure: "ERR-VALIDATION ຫຼື ERR-DUPLICATE-REVIEW-REQUIRED; ບໍ່ສ້າງ Place." },
      { id: "TR-PLC-02", from: "Draft", event: "Submit for review", to: "InReview", functionId: "FN-PADM-002 / 003", actor: "Admin", guard: "ຮູບແບບ Field ຖືກ; Source/Evidence ຂອງ Field ສຳຄັນຄົບ.", writes: "ອັບເດດ Field, Verification ແລະ status ໃນ transaction.", failure: "ERR-VALIDATION; ຄົງ Draft ແລະສົ່ງ field_errors." },
      { id: "TR-PLC-03", from: "InReview", event: "Approve publication", to: "Published", functionId: "FN-PADM-004 / 005", actor: "Admin", guard: "Publish Readiness = true; Source valid; Duplicate ຖືກຕັດສິນ; expected_version ກົງ.", writes: "status, published_at, canonical slug ແລະ Audit commit ພ້ອມກັນ.", failure: "ERR-PLACE-PUBLISH-BLOCKED ຫຼື ERR-CONCURRENCY-CONFLICT; ຄົງ InReview." },
      { id: "TR-PLC-04", from: "InReview", event: "Return for correction", to: "Draft", functionId: "FN-PADM-002", actor: "Admin", guard: "ລະບຸ Blocker/Reason ຢ່າງໜ້ອຍ 1 ຂໍ້.", writes: "status + review reason + Audit.", failure: "ERR-INVALID-STATE; ບໍ່ປ່ຽນ." },
      { id: "TR-PLC-05", from: "Published", event: "Suspend", to: "Suspended", functionId: "FN-PADM-006", actor: "Admin / Quality Control", guard: "ມີ reason; Admin ມີສິດ; expected_version ກົງ.", writes: "status, reason, optional_until + Audit; Feed/Search ບໍ່ເລືອກຫຼັງ commit.", failure: "ERR-FORBIDDEN ຫຼື ERR-CONCURRENCY-CONFLICT." },
      { id: "TR-PLC-06", from: "Suspended", event: "Revalidate and restore", to: "InReview", functionId: "FN-DQ-004 / FN-PADM-002", actor: "Admin", guard: "ມີ Evidence ໃໝ່; ບໍ່ແມ່ນ Permanent Closure.", writes: "Verification + status + Audit; ຕ້ອງຜ່ານ Publish Gate ອີກຄັ້ງ.", failure: "ERR-EVIDENCE-REQUIRED; ຄົງ Suspended." },
      { id: "TR-PLC-07", from: "Draft / InReview / Published / Suspended", event: "Confirm permanent closure", to: "Archived", functionId: "FN-PADM-007", actor: "Admin", guard: "ມີ closure evidence, reason ແລະ authorization.", writes: "status, closed_at + Audit; Campaign Active ຕ້ອງຖືກ Pause/End ຕາມ policy.", failure: "ERR-EVIDENCE-REQUIRED; ບໍ່ Archive." },
      { id: "TR-PLC-08", from: "Draft / InReview / Published / Suspended", event: "Merge duplicate", to: "Merged", functionId: "FN-PADM-008 / 009", actor: "Admin", guard: "Canonical Place ຄົນລະ ID; ກວດວ່າບໍ່ແມ່ນຄົນລະສາຂາ; relation migration plan ຄົບ.", writes: "ຍ້າຍ Source/Request/Campaign/Analytics reference, ສ້າງ Redirect ແລະ Audit ໃນ transaction.", failure: "ERR-MERGE-CONFLICT; rollback ທັງໝົດ." },
    ],
  },
  {
    id: "SM-02",
    entity: "Place Quality",
    field: "Place.quality_status",
    purpose: "ແຍກຄຸນນະພາບຂໍ້ມູນອອກຈາກ Public Lifecycle; Published Place ອາດ Fresh, Due ຫຼື Stale ໄດ້.",
    invariant: "Quality State ບໍ່ປ່ຽນ lifecycle_status ອັດຕະໂນມັດ. Stale ສະແດງປ້າຍ ແລະສ້າງ Work Item; Suspend ຕ້ອງຜ່ານ Admin Command.",
    states: [
      { name: "Fresh", meaning: "Critical Field ທີ່ກຳນົດຍັງບໍ່ຮອດວັນກວດຄືນ.", publicEffect: "ສະແດງ Verified/checked date ຕາມຫຼັກຖານ." },
      { name: "Due", meaning: "ຮອດກຳນົດ 30/60 ວັນ ແຕ່ຍັງບໍ່ເກີນ Grace Period.", publicEffect: "Admin queue; Public label ຕາມ policy." },
      { name: "Stale", meaning: "ກາຍກຳນົດ ຫຼື Critical Field ບໍ່ສາມາດຢືນຢັນ.", publicEffect: "ສະແດງ “ຂໍ້ມູນຄວນກວດຄືນ”." },
      { name: "NeedsReview", meaning: "ມີຂໍ້ມູນຂັດກັນ ຫຼືບັນຫາຮຸນແຮງທີ່ຕ້ອງ Admin ຕັດສິນ.", publicEffect: "ອາດສົ່ງ Suspend Candidate; ບໍ່ Auto-suspend." },
    ],
    transitions: [
      { id: "TR-DQ-01", from: "Fresh", event: "Review due", to: "Due", functionId: "FN-DQ-001 / 002", actor: "Scheduler", guard: "latest expires_at <= current date.", writes: "Upsert WorkItem; ບໍ່ສ້າງ Open Item ຊ້ຳ.", failure: "ERR-JOB-LEASE-CONFLICT ໃຫ້ worker ອື່ນດຳເນີນຕໍ່." },
      { id: "TR-DQ-02", from: "Due", event: "Pass due threshold / failed verification", to: "Stale", functionId: "FN-DQ-002 / 003", actor: "Scheduler / Admin", guard: "ກາຍກຳນົດ ຫຼືມີ Unverified Field.", writes: "quality_status, stale field list, WorkItem + Audit.", failure: "ERR-CONCURRENCY-CONFLICT; recalculation ໃໝ່." },
      { id: "TR-DQ-03", from: "Fresh / Due / Stale", event: "Conflicting critical evidence", to: "NeedsReview", functionId: "FN-DQ-003", actor: "Admin / System", guard: "ມີ Verification result = Conflicting.", writes: "quality_status + urgent WorkItem + Audit.", failure: "ERR-EVIDENCE-REQUIRED." },
      { id: "TR-DQ-04", from: "Due / Stale / NeedsReview", event: "Complete verification", to: "Fresh", functionId: "FN-DQ-004", actor: "Admin", guard: "Critical Field ຄົບ, Evidence valid ແລະ expires_at ໃໝ່ຄົບ.", writes: "append Verification, recalculate quality, complete WorkItem + Audit.", failure: "ERR-VERIFICATION-INCOMPLETE; ຄົງ State ຕາມຜົນກວດ." },
    ],
  },
  {
    id: "SM-03",
    entity: "Content Source Lifecycle",
    field: "ContentSource.lifecycle_status",
    purpose: "ຄວບຄຸມລິ້ງ Review ຈາກການສະເໜີ ຫາການກວດ, ເຜີຍແຜ່, ຖອນ ຫຼືລຶບອອກຈາກ Public View.",
    invariant: "Published ຕ້ອງມີ Canonical URL, Creator Attribution, Canonical Place ແລະ availability = Available. Removed ເປັນ Terminal; ບໍ່ re-host ວິດີໂອ.",
    states: [
      { name: "Proposed", meaning: "ຮັບ URL ແລ້ວ ແຕ່ຍັງບໍ່ຢືນຢັນ Platform/Creator/Place.", publicEffect: "ບໍ່ປາກົດ." },
      { name: "Checked", meaning: "URL ແລະ Metadata ຜ່ານການກວດ ແຕ່ຍັງບໍ່ Publish.", publicEffect: "Admin preview ໄດ້." },
      { name: "Published", meaning: "ຜ່ານ Attribution/Place/Availability Gate.", publicEffect: "ມີສິດເຂົ້າ Feed ແລະ Place Source List." },
      { name: "Unavailable", meaning: "ຢືນຢັນວ່າ URL ບໍ່ສາມາດໃຊ້; ຍັງຮັກສາ Metadata/History.", publicEffect: "ຖອນ Source ຈາກ Public UI; Place ຍັງຢູ່ໄດ້." },
      { name: "Removed", meaning: "ຖືກຖອນຕາມ Takedown/Policy ຫຼື Admin Decision.", publicEffect: "ບໍ່ປາກົດ ແລະຫ້າມ Auto-restore." },
    ],
    transitions: [
      { id: "TR-SRC-01", from: "—", event: "Register URL", to: "Proposed", functionId: "FN-SRC-001", actor: "Admin", guard: "canonical_url + platform ຄົບ; URL unique.", writes: "Source, optional Creator + Audit.", failure: "ERR-SOURCE-URL-DUPLICATE ຫຼື ERR-VALIDATION." },
      { id: "TR-SRC-02", from: "Proposed", event: "Validate URL and metadata", to: "Checked", functionId: "FN-SRC-002 / 003 / 004", actor: "Admin", guard: "URL Available; Creator Attribution ແລະ Place link ຄົບ.", writes: "check history, permitted metadata, place_id + Audit.", failure: "Temporary failure ຄົງ Proposed; ERR-SOURCE-VALIDATION ບອກ Blocker." },
      { id: "TR-SRC-03", from: "Checked", event: "Publish", to: "Published", functionId: "FN-SRC-005", actor: "Admin", guard: "availability = Available; Place ບໍ່ Archived/Merged; no Takedown hold.", writes: "lifecycle_status, published_at + Audit.", failure: "ERR-SOURCE-PUBLISH-BLOCKED; ຄົງ Checked." },
      { id: "TR-SRC-04", from: "Published", event: "Manual unpublish", to: "Checked", functionId: "FN-SRC-005", actor: "Admin", guard: "reason ຄົບ; expected_version ກົງ.", writes: "status + Audit; ຖອນຈາກ Feed ຫຼັງ commit.", failure: "ERR-CONCURRENCY-CONFLICT." },
      { id: "TR-SRC-05", from: "Published / Checked", event: "Confirmed unavailable", to: "Unavailable", functionId: "FN-SRC-006 / FN-DQ-005", actor: "Scheduler / Admin", guard: "404/Private/Removed ທີ່ຢືນຢັນ ຫຼື Retry Policy ຄົບ.", writes: "check history, status, next_check_at + WorkItem.", failure: "TemporaryFailure ບໍ່ປ່ຽນ Lifecycle." },
      { id: "TR-SRC-06", from: "Unavailable", event: "Restore after successful recheck", to: "Checked / Published", functionId: "FN-DQ-005 / 006", actor: "Scheduler / Admin", guard: "URL Available; Attribution/Place valid; no Takedown; previous publication eligibility ກວດຄືນ.", writes: "check history, availability, lifecycle + Audit.", failure: "ERR-SOURCE-TAKEDOWN-HOLD ຫຼື ERR-SOURCE-PUBLISH-BLOCKED." },
      { id: "TR-SRC-07", from: "Proposed / Checked / Published / Unavailable", event: "Takedown received", to: "Removed", functionId: "FN-SRC-007", actor: "Admin", guard: "Takedown request ຖືກລົງທະບຽນ; Public View ຕ້ອງຖືກຖອນທັນທີ.", writes: "Source Removed/Takedown, Request state + Audit.", failure: "ERR-AUDIT-WRITE-FAILED ໃຫ້ rollback state ແລະຍົກ Incident ດ່ວນ." },
    ],
  },
  {
    id: "SM-04",
    entity: "Source Availability",
    field: "ContentSource.availability_status",
    purpose: "ແຍກບັນຫາເຊື່ອມຕໍ່ຊົ່ວຄາວອອກຈາກ Source ທີ່ຫາຍໄປ ແລະ Takedown.",
    invariant: "Failure ຄັ້ງດຽວຫ້າມປ່ຽນເປັນ ConfirmedUnavailable. Takedown ມີລຳດັບສູງກວ່າ Availability Check ແລະຫ້າມ Auto-restore.",
    states: [
      { name: "Unknown", meaning: "ຍັງບໍ່ກວດ ຫຼືຜົນເກົ່າໃຊ້ບໍ່ໄດ້.", publicEffect: "ບໍ່ຄວນ Publish Source ໃໝ່." },
      { name: "Available", meaning: "ກວດ URL/Embed/Metadata ໄດ້ຕາມວິທີທີ່ອະນຸຍາດ.", publicEffect: "Source ອາດສະແດງໄດ້ຖ້າ Lifecycle = Published." },
      { name: "TemporaryFailure", meaning: "Timeout, rate limit ຫຼື Platform error ທີ່ຍັງບໍ່ພິສູດວ່າ Content ຫາຍ.", publicEffect: "ໃຊ້ Preview/Fallback; ຍັງບໍ່ຖອນ Source ທັນທີ." },
      { name: "ConfirmedUnavailable", meaning: "404, Removed, Private ຫຼື Retry ຄົບແລ້ວຍັງລົ້ມ.", publicEffect: "ຖອນ Source ຈາກ Feed ແລະກວດຄືນພາຍໃນ 7 ວັນ." },
      { name: "Takedown", meaning: "ມີຄຳຮ້ອງຖອນ/Policy hold.", publicEffect: "ຖອນ Public View ທັນທີ; ບໍ່ Auto-restore." },
    ],
    transitions: [
      { id: "TR-AVL-01", from: "Unknown / TemporaryFailure / ConfirmedUnavailable", event: "Check succeeds", to: "Available", functionId: "FN-SRC-002 / 006 / FN-DQ-005", actor: "Admin / Scheduler", guard: "Response ຢືນຢັນ canonical content ແລະບໍ່ມີ Takedown hold.", writes: "append check, checked_at, clear retry counter.", failure: "ERR-DEPENDENCY-TIMEOUT → TemporaryFailure." },
      { id: "TR-AVL-02", from: "Unknown / Available", event: "Transient external failure", to: "TemporaryFailure", functionId: "FN-SRC-002 / 006", actor: "System", guard: "Timeout/429/5xx ຫຼື network failure; ຍັງບໍ່ຄົບ Retry threshold.", writes: "append check, attempt count, next_check_at.", failure: "ບໍ່ສົ່ງ Technical detail ໃຫ້ Public UI." },
      { id: "TR-AVL-03", from: "TemporaryFailure / Available", event: "Confirmed removal", to: "ConfirmedUnavailable", functionId: "FN-SRC-006 / FN-DQ-005", actor: "System / Admin", guard: "Hard evidence ຫຼື Retry threshold ຄົບ.", writes: "availability + lifecycle Unavailable + recheck work.", failure: "ຖ້າຫຼັກຖານບໍ່ພໍ ຄົງ TemporaryFailure." },
      { id: "TR-AVL-04", from: "Any non-Takedown", event: "Apply takedown hold", to: "Takedown", functionId: "FN-SRC-007", actor: "Admin", guard: "request ID + reason ຄົບ.", writes: "availability, lifecycle Removed, request + Audit.", failure: "ERR-VALIDATION; incident queue ສຳລັບ urgent request." },
    ],
  },
  {
    id: "SM-05",
    entity: "Correction Request",
    field: "CorrectionRequest.status",
    purpose: "ຮັກສາຄຳຮ້ອງ, SLA, Evidence ແລະການຕັດສິນລາຍ Item ໃຫ້ກວດຮອຍໄດ້.",
    invariant: "Public Place ປ່ຽນສະເພາະຫຼັງ Approved Item commit. NeedsEvidence ຢຸດ SLA clock. Closed ເປັນ Terminal ແລະຫ້າມ Apply ຊ້ຳ.",
    states: [
      { name: "Submitted", meaning: "ຮັບຄຳຮ້ອງແລະບັນທຶກ received_at.", publicEffect: "ຍັງບໍ່ປ່ຽນ Place." },
      { name: "UnderReview", meaning: "Admin ຮັບວຽກ ແລະກຳລັງກວດ Item/Evidence.", publicEffect: "Public data ຄົງເກົ່າ." },
      { name: "NeedsEvidence", meaning: "ຫຼັກຖານບໍ່ຄົບ; ລໍຖ້າຜູ້ຮ້ອງ.", publicEffect: "SLA 3 ວັນຢຸດນັບ." },
      { name: "Approved", meaning: "ຢ່າງໜ້ອຍ 1 Item ຖືກອະນຸມັດ ແລະ Apply ສຳເລັດ.", publicEffect: "Place ສະແດງຄ່າໃໝ່ຫຼັງ commit." },
      { name: "Rejected", meaning: "ທຸກ Item ຖືກປະຕິເສດ ພ້ອມເຫດຜົນ.", publicEffect: "Place ບໍ່ປ່ຽນ." },
      { name: "Closed", meaning: "ການ Apply/Notice/Outcome ຄົບແລ້ວ.", publicEffect: "ອ່ານປະຫວັດໄດ້; ຫ້າມແກ້ຜົນເກົ່າ." },
    ],
    transitions: [
      { id: "TR-REQ-01", from: "—", event: "Register request", to: "Submitted", functionId: "FN-REQ-001", actor: "Place Owner / Admin", guard: "placeId, requested item, requester contact ຄົບ.", writes: "Request, Item, Evidence reference, received_at.", failure: "ERR-VALIDATION; ບໍ່ສ້າງ Partial Request." },
      { id: "TR-REQ-02", from: "Submitted", event: "Triage complete", to: "UnderReview", functionId: "FN-REQ-002", actor: "Admin", guard: "priority, completeness ແລະ sla_due_at ຖືກຄຳນວນ.", writes: "status, priority, assignee, SLA fields.", failure: "ERR-CONCURRENCY-CONFLICT." },
      { id: "TR-REQ-03", from: "Submitted / UnderReview", event: "Ask for evidence", to: "NeedsEvidence", functionId: "FN-REQ-003", actor: "Admin", guard: "missing evidence list + message ຄົບ.", writes: "status, sla_paused_at, communication + Audit.", failure: "ERR-VALIDATION; SLA ບໍ່ຢຸດ." },
      { id: "TR-REQ-04", from: "NeedsEvidence", event: "Receive valid evidence", to: "UnderReview", functionId: "FN-REQ-002", actor: "Admin", guard: "Evidence validation = Valid ແລະ SLA remainder ຖືກຄຳນວນ.", writes: "resume SLA, status, evidence result.", failure: "ERR-EVIDENCE-REQUIRED; ຄົງ NeedsEvidence." },
      { id: "TR-REQ-05", from: "UnderReview", event: "Approve items", to: "Approved", functionId: "FN-REQ-004", actor: "Admin", guard: "ຢ່າງໜ້ອຍ 1 approved item; current Place version ກົງ snapshot; Evidence valid.", writes: "Item decisions + Place changes + Verification + Request + Audit ໃນ transaction ດຽວ.", failure: "ERR-REQUEST-VALUE-CONFLICT ຫຼື ERR-AUDIT-WRITE-FAILED; rollback ທັງໝົດ." },
      { id: "TR-REQ-06", from: "UnderReview", event: "Reject all items", to: "Rejected", functionId: "FN-REQ-005", actor: "Admin", guard: "ທຸກ Item ມີ decision reason.", writes: "Item/Header decision + Audit; Place ບໍ່ປ່ຽນ.", failure: "ERR-VALIDATION; ຄົງ UnderReview." },
      { id: "TR-REQ-07", from: "Approved / Rejected", event: "Close after outcome", to: "Closed", functionId: "FN-REQ-006", actor: "Admin / System", guard: "Apply/decision ແລະ communication outcome ຄົບ.", writes: "status, closed_at, final communication reference.", failure: "ERR-REQUEST-NOT-READY-TO-CLOSE." },
    ],
  },
  {
    id: "SM-06",
    entity: "Sponsored Campaign",
    field: "Campaign.status",
    purpose: "ຄວບຄຸມວ່າ Sponsored Placement ຈະເລີ່ມ, ຢຸດ, ກັບຄືນ ຫຼືສິ້ນສຸດຕອນໃດ.",
    invariant: "Active ຕ້ອງຢູ່ໃນ start_at–end_at, Place = Published ແລະປ້າຍ Sponsored ຄົບ. Ended/Cancelled ເປັນ Terminal; ການຈ່າຍບໍ່ປ່ຽນ Verification/Review score.",
    states: [
      { name: "Draft", meaning: "ກຳລັງບັນທຶກ Place, Placement, ໄລຍະ ແລະຂໍ້ຕົກລົງ.", publicEffect: "ບໍ່ສະແດງ." },
      { name: "Scheduled", meaning: "ຜ່ານ Eligibility ແລະລໍຖ້າ start_at.", publicEffect: "ບໍ່ສະແດງກ່ອນເວລາ." },
      { name: "Active", meaning: "ເຂົ້າ Placement ພ້ອມປ້າຍ Sponsored.", publicEffect: "Feed/Search ສາມາດເລືອກເຂົ້າ Sponsored slot." },
      { name: "Paused", meaning: "ຢຸດຊົ່ວຄາວໂດຍ Admin ຫຼື Place ບໍ່ eligible.", publicEffect: "ຖອນ Sponsored placement ທັນທີຫຼັງ commit." },
      { name: "Ended", meaning: "ຮອດ end_at ຫຼື Admin ປິດສຳເລັດ.", publicEffect: "ບໍ່ສະແດງ; Report ຍັງອ່ານໄດ້." },
      { name: "Cancelled", meaning: "ຍົກເລີກກ່ອນ/ລະຫວ່າງ Campaign ຕາມຂໍ້ຕົກລົງ.", publicEffect: "ບໍ່ສະແດງ; ຮັກສາປະຫວັດ." },
    ],
    transitions: [
      { id: "TR-CMP-01", from: "—", event: "Create campaign", to: "Draft", functionId: "FN-CMP-001", actor: "Admin", guard: "placeId, placement, start/end, price/reference ຄົບ.", writes: "Campaign + Audit.", failure: "ERR-VALIDATION." },
      { id: "TR-CMP-02", from: "Draft", event: "Schedule", to: "Scheduled", functionId: "FN-CMP-002 / 003", actor: "Admin", guard: "Place Published; start < end; label config ຄົບ.", writes: "status + Audit.", failure: "ERR-CAMPAIGN-INELIGIBLE ພ້ອມ blockers." },
      { id: "TR-CMP-03", from: "Scheduled", event: "Start time reached", to: "Active", functionId: "FN-CMP-002 / 004", actor: "Scheduler", guard: "current time ໃນ window; recheck Place Published; expected state = Scheduled.", writes: "status, activated_at + Audit.", failure: "ERR-CAMPAIGN-INELIGIBLE; ສ້າງ WorkItem ແທນ Auto-retry ບໍ່ຈຳກັດ." },
      { id: "TR-CMP-04", from: "Active", event: "Pause", to: "Paused", functionId: "FN-CMP-004", actor: "Admin / Scheduler", guard: "reason ຄົບ ຫຼື Place ບໍ່ Published.", writes: "status, paused_at/reason + Audit.", failure: "ERR-CONCURRENCY-CONFLICT." },
      { id: "TR-CMP-05", from: "Paused", event: "Resume", to: "Active", functionId: "FN-CMP-002 / 004", actor: "Admin", guard: "ຍັງຢູ່ໃນ window; Place eligible; reason ຖືກແກ້.", writes: "status + Audit.", failure: "ERR-CAMPAIGN-WINDOW ຫຼື ERR-CAMPAIGN-INELIGIBLE." },
      { id: "TR-CMP-06", from: "Scheduled / Active / Paused", event: "End time reached / manual end", to: "Ended", functionId: "FN-CMP-004", actor: "Scheduler / Admin", guard: "end_at <= now ຫຼືມີ manual reason.", writes: "status, ended_at + Audit.", failure: "Idempotent: ຖ້າ Ended ແລ້ວສົ່ງ current result." },
      { id: "TR-CMP-07", from: "Draft / Scheduled / Active / Paused", event: "Cancel", to: "Cancelled", functionId: "FN-CMP-004", actor: "Admin", guard: "reason + authorization ຄົບ; settlement ຢູ່ນອກ MVP ຖ້າມີ.", writes: "status, cancelled_at/reason + Audit.", failure: "ERR-FORBIDDEN ຫຼື ERR-INVALID-STATE." },
    ],
  },
  {
    id: "SM-07",
    entity: "Operational Work Item",
    field: "WorkItem.status",
    purpose: "ປ້ອງກັນ Scheduler/Admin ເຮັດວຽກກວດ Source/Place ຊ້ຳ ແລະຮັກສາການມອບໝາຍ.",
    invariant: "ຕໍ່ work_type + subject + field ມີ Open/InProgress ໄດ້ພຽງ 1 ລາຍການ. Claim ຕ້ອງມີ lease expiry; Complete ຕ້ອງມີ outcome reference.",
    states: [
      { name: "Open", meaning: "ວຽກຖືກສ້າງ ແຕ່ຍັງບໍ່ມີຜູ້ຮັບ.", publicEffect: "ຢູ່ Admin queue." },
      { name: "InProgress", meaning: "Admin/Worker claim ແລະມີ lease.", publicEffect: "ບໍ່ໃຫ້ worker ອື່ນເຮັດຊ້ຳ." },
      { name: "Blocked", meaning: "ລໍຖ້າ Evidence, External Platform ຫຼືການຕັດສິນ.", publicEffect: "ສະແດງ blocker ແລະ due date." },
      { name: "Completed", meaning: "ຜົນການກວດ/ແກ້ຖືກບັນທຶກ.", publicEffect: "ອອກຈາກ Active queue." },
      { name: "Cancelled", meaning: "ວຽກບໍ່ຈຳເປັນແລ້ວ ຫຼື Subject ຖືກ Archive/Merge.", publicEffect: "ຮັກສາເຫດຜົນການຍົກເລີກ." },
    ],
    transitions: [
      { id: "TR-WRK-01", from: "—", event: "Upsert due work", to: "Open", functionId: "FN-DQ-001 / 003 / 005", actor: "Scheduler", guard: "ບໍ່ມີ active item ສຳລັບ unique subject key.", writes: "WorkItem ຫຼື update due/priority.", failure: "Duplicate key = idempotent success; ບໍ່ສ້າງຊ້ຳ." },
      { id: "TR-WRK-02", from: "Open", event: "Claim", to: "InProgress", functionId: "FN-ADM-003", actor: "Admin / Worker", guard: "lease ວ່າງ/ໝົດອາຍຸ; expected_version ກົງ.", writes: "assignee, lease_expires_at, started_at.", failure: "ERR-JOB-LEASE-CONFLICT; reload queue." },
      { id: "TR-WRK-03", from: "InProgress", event: "Dependency/evidence unavailable", to: "Blocked", functionId: "Domain function", actor: "Admin / Worker", guard: "blocker reason + next_action_at ຄົບ.", writes: "status, blocker, next action; release/extend lease ຕາມ policy.", failure: "ERR-VALIDATION." },
      { id: "TR-WRK-04", from: "Blocked", event: "Blocker resolved", to: "Open", functionId: "Domain function", actor: "Admin / Scheduler", guard: "Evidence/Dependency ກັບມາພ້ອມ.", writes: "clear blocker; recalculate due/priority.", failure: "ຄົງ Blocked." },
      { id: "TR-WRK-05", from: "InProgress", event: "Complete", to: "Completed", functionId: "FN-DQ-004 / 006", actor: "Admin / Worker", guard: "outcome entity/reference ມີແລ້ວ.", writes: "status, completed_at, outcome reference + Audit ຖ້າປ່ຽນ Public Data.", failure: "ERR-WORK-OUTCOME-MISSING." },
      { id: "TR-WRK-06", from: "Open / InProgress / Blocked", event: "Cancel", to: "Cancelled", functionId: "Admin control", actor: "Admin / System", guard: "reason ຄົບ; Subject Archived/Merged ຫຼື work superseded.", writes: "status, reason, closed_at.", failure: "ERR-FORBIDDEN." },
    ],
  },
];

const errorContract = [
  ["code", "Machine-readable code ທີ່ຄົງທີ່ ເຊັ່ນ ERR-INVALID-STATE; Client ຕັດສິນ UX ຈາກ code ບໍ່ແມ່ນຈາກຂໍ້ຄວາມ."],
  ["message", "ຂໍ້ຄວາມພາສາລາວທີ່ອ່ານຮູ້ເລື່ອງ; ບໍ່ເປີດ stack trace, SQL, token ຫຼືລາຍລະອຽດພາຍໃນ."],
  ["trace_id", "ID ສຳລັບຄົ້ນ Log ຂ້າມ Web, API, Job ແລະ External Call; ຜູ້ໃຊ້ສາມາດແຈ້ງ ID ນີ້ເມື່ອຂໍ Support."],
  ["retryable", "Boolean ບອກວ່າການຮ້ອງຂໍເດີມສາມາດ Retry ໄດ້ຫຼືບໍ່; Command ທີ່ Retry ຕ້ອງມີ idempotency_key."],
  ["field_errors", "ລາຍການ field + rule + message ສຳລັບ Validation Error; ບໍ່ສົ່ງຄ່າ ProtectedText ກັບຄືນໃນ Log."],
  ["current_state", "ໃສ່ເມື່ອ Error ມາຈາກ State/Concurrency ເພື່ອໃຫ້ Client reload ໄດ້; ບໍ່ມີໃນ Error ທົ່ວໄປ."],
  ["expected_version", "Version ທີ່ Command ນຳມາກວດ Optimistic Concurrency; ສົ່ງກັບສະເພາະ Conflict ທີ່ຜູ້ໃຊ້ແກ້ໄດ້."],
  ["retry_after_seconds", "ໃສ່ສະເພາະ Rate Limit/Temporary Dependency ເມື່ອລະບົບຮູ້ເວລາທີ່ຄວນລອງໃໝ່."],
] as const;

const errors: ErrorDefinition[] = [
  { code: "ERR-VALIDATION", category: "INPUT", status: "400", retry: "NO", condition: "Required field, type, format ຫຼື range ບໍ່ຖືກ.", userResponse: "ຊີ້ field ທີ່ຕ້ອງແກ້ ແລະຮັກສາຄ່າທີ່ປ້ອນໄວ້.", systemResponse: "ບໍ່ write; ສົ່ງ field_errors; log ສະເພາະ rule/code ບໍ່ log ProtectedText." },
  { code: "ERR-AUTHENTICATION-REQUIRED", category: "SECURITY", status: "401", retry: "AFTER LOGIN", condition: "ບໍ່ມີ Session, Session ໝົດອາຍຸ ຫຼື proof ບໍ່ຜ່ານ.", userResponse: "ໃຫ້ Admin login ໃໝ່; ບໍ່ບອກວ່າ Account ໃດມີຢູ່.", systemResponse: "ຢຸດກ່ອນ Domain Call; ບັນທຶກ security event ແບບບໍ່ມີ credential." },
  { code: "ERR-FORBIDDEN", category: "SECURITY", status: "403", retry: "NO", condition: "Identity ຖືກແຕ່ບໍ່ມີສິດເຮັດ action/resource.", userResponse: "ບອກວ່າບໍ່ມີສິດ ແລະໃຫ້ກັບໄປ Work Queue.", systemResponse: "ບໍ່ເປີດ data ຂອງ resource; log actor/action/result." },
  { code: "ERR-NOT-FOUND", category: "RESOURCE", status: "404", retry: "NO", condition: "ID/slug ບໍ່ມີ ຫຼື resource ບໍ່ມີສິດເຫັນ.", userResponse: "Public UI ສະແດງ not found; ສະເໜີ Feed/Search.", systemResponse: "ກວດ Redirect ກ່ອນ; ຫ້າມຢືນຢັນ private resource." },
  { code: "ERR-PLACE-NOT-PUBLIC", category: "BUSINESS", status: "404", retry: "NO", condition: "Place ບໍ່ Published ຫຼືຖືກ Archived ແລະບໍ່ມີ Redirect.", userResponse: "ບໍ່ສະແດງ private lifecycle; ພາກັບ Feed/Search.", systemResponse: "ບໍ່ບັນທຶກ Place Open ເປັນ success." },
  { code: "ERR-INVALID-STATE", category: "STATE", status: "409", retry: "AFTER RELOAD", condition: "target transition ບໍ່ອະນຸຍາດຈາກ current_state.", userResponse: "ບອກວ່າສະຖານະປ່ຽນແລ້ວ ແລະສະເໜີ reload.", systemResponse: "ບໍ່ write; ສົ່ງ current_state + allowed actions; metric invalid_transition." },
  { code: "ERR-CONCURRENCY-CONFLICT", category: "STATE", status: "409", retry: "RELOAD FIRST", condition: "expected_version ບໍ່ກົງເພາະມີການແກ້ພ້ອມກັນ.", userResponse: "ໃຫ້ reload ແລະທົບທວນຄ່າໃໝ່; ຫ້າມ overwrite ງຽບໆ.", systemResponse: "rollback; ສົ່ງ current version/state ໂດຍບໍ່ສົ່ງ ProtectedText." },
  { code: "ERR-IDEMPOTENCY-CONFLICT", category: "STATE", status: "409", retry: "NO", condition: "idempotency_key ເກົ່າຖືກໃຊ້ກັບ payload ຄົນລະອັນ.", userResponse: "ຢຸດ ແລະໃຫ້ສົ່ງ Command ໃໝ່ຫຼັງກວດຜົນເກົ່າ.", systemResponse: "ບໍ່ execute; log key hash + actor + function." },
  { code: "ERR-PLACE-PUBLISH-BLOCKED", category: "BUSINESS", status: "422", retry: "AFTER FIX", condition: "Required Field, Source, Duplicate Review ຫຼື Approval ບໍ່ຄົບ.", userResponse: "ສະແດງ blocker ແຍກຂໍ້ ແລະລິ້ງໄປສ່ວນທີ່ຕ້ອງແກ້.", systemResponse: "ຄົງ InReview; ບໍ່ສ້າງ published_at/canonical exposure." },
  { code: "ERR-DUPLICATE-REVIEW-REQUIRED", category: "BUSINESS", status: "422", retry: "AFTER DECISION", condition: "ມີ Duplicate Candidate ທີ່ເກີນ Review threshold.", userResponse: "ໃຫ້ Admin ເລືອກ: ເປັນ Place ໃໝ່, ສາຂາອື່ນ ຫຼື Merge.", systemResponse: "ຫ້າມ Auto-merge; ຮັກສາ candidate signals." },
  { code: "ERR-MERGE-CONFLICT", category: "BUSINESS", status: "409", retry: "MANUAL REVIEW", condition: "Canonical target ບໍ່ຖືກ, relation ຍ້າຍບໍ່ໄດ້ ຫຼືອາດເປັນຄົນລະສາຂາ.", userResponse: "ຢຸດ Merge ແລະສະແດງ relation/blocker ທີ່ຕ້ອງກວດ.", systemResponse: "rollback ທຸກ write/redirect; incident ຖ້າ partial commit ຖືກກວດພົບ." },
  { code: "ERR-SOURCE-URL-DUPLICATE", category: "BUSINESS", status: "409", retry: "NO", condition: "canonical_url ມີ Source Record ຢູ່ແລ້ວ.", userResponse: "ເປີດ Source ເກົ່າ ຫຼືຂໍກວດ Place link; ບໍ່ສ້າງຊ້ຳ.", systemResponse: "ສົ່ງ existing source ID ໃຫ້ Admin ທີ່ມີສິດ." },
  { code: "ERR-SOURCE-VALIDATION", category: "INTEGRATION", status: "422", retry: "DEPENDS", condition: "Platform/URL/Creator/Permitted Metadata ບໍ່ຜ່ານ.", userResponse: "ລະບຸ blocker ເຊັ່ນ URL ບໍ່ຮອງຮັບ ຫຼື Attribution ບໍ່ຄົບ.", systemResponse: "ບໍ່ download/re-host; ບັນທຶກ check result ທີ່ບໍ່ມີ secret." },
  { code: "ERR-SOURCE-PUBLISH-BLOCKED", category: "BUSINESS", status: "422", retry: "AFTER FIX", condition: "Availability, Attribution, Place link ຫຼື Takedown Gate ບໍ່ຜ່ານ.", userResponse: "ສະແດງ blocker; ຄົງ Checked/Unavailable.", systemResponse: "ຫ້າມ Feed eligibility ແລະບໍ່ປ່ຽນ published_at." },
  { code: "ERR-SOURCE-TAKEDOWN-HOLD", category: "LEGAL/CONTROL", status: "423", retry: "NO", condition: "Source ມີ Takedown/Policy hold.", userResponse: "ບອກ Admin ວ່າ Source ຖືກ hold; ບໍ່ເປີດຂໍ້ມູນຜູ້ຮ້ອງເກີນສິດ.", systemResponse: "ຫ້າມ Publish/Restore; ສົ່ງວຽກໄປ Takedown queue." },
  { code: "ERR-EVIDENCE-REQUIRED", category: "BUSINESS", status: "422", retry: "AFTER EVIDENCE", condition: "ການ Correction, Archive, Restore ຫຼື Verification ຂາດຫຼັກຖານ.", userResponse: "ລະບຸ Evidence ທີ່ຂາດ ແລະຊ່ອງທາງສົ່ງ.", systemResponse: "ຄົງ state; ຢຸດ SLA ສະເພາະ Correction NeedsEvidence." },
  { code: "ERR-VERIFICATION-INCOMPLETE", category: "BUSINESS", status: "422", retry: "AFTER REVIEW", condition: "Critical Field ຍັງ Unverified/Conflicting ຫຼັງກວດ.", userResponse: "ສະແດງ Field ທີ່ຍັງຄ້າງ ແລະບໍ່ອ້າງວ່າ Fresh.", systemResponse: "append Verification result; ຄົງ Stale/NeedsReview ແລະ WorkItem." },
  { code: "ERR-REQUEST-VALUE-CONFLICT", category: "STATE", status: "409", retry: "REVIEW AGAIN", condition: "Place value ຖືກປ່ຽນຫຼັງ current_value_snapshot ຂອງ Correction Item.", userResponse: "ສະແດງ current/proposed ໃຫ້ Admin ຕັດສິນໃໝ່; ຫ້າມ overwrite.", systemResponse: "rollback decision transaction; update review context ເທົ່ານັ້ນ." },
  { code: "ERR-REQUEST-NOT-READY-TO-CLOSE", category: "STATE", status: "422", retry: "AFTER ACTION", condition: "Decision, Apply ຫຼື final outcome ຍັງບໍ່ຄົບ.", userResponse: "ສະແດງຂັ້ນຕອນຄ້າງ ແລະບໍ່ປິດ Request.", systemResponse: "ຄົງ Approved/Rejected; create/retain WorkItem ສຳລັບຂັ້ນຄ້າງ." },
  { code: "ERR-CAMPAIGN-INELIGIBLE", category: "BUSINESS", status: "422", retry: "AFTER FIX", condition: "Place ບໍ່ Published, label/placement ບໍ່ຄົບ ຫຼືຂໍ້ຕົກລົງບໍ່ຜ່ານ.", userResponse: "ສະແດງ blockers; ບໍ່ Schedule/Activate.", systemResponse: "ຄົງ current state; Scheduler ສ້າງ Admin WorkItem ແທນ retry ບໍ່ຈຳກັດ." },
  { code: "ERR-CAMPAIGN-WINDOW", category: "BUSINESS", status: "422", retry: "NO", condition: "start/end ບໍ່ຖືກ ຫຼື Resume ນອກໄລຍະ.", userResponse: "ສະແດງເວລາທີ່ຖືກ; ໃຫ້ End ຫຼືສ້າງ Campaign ໃໝ່.", systemResponse: "ຫ້າມ Active ນອກ window." },
  { code: "ERR-JOB-LEASE-CONFLICT", category: "CONCURRENCY", status: "409", retry: "AFTER LEASE", condition: "Work Item/Job ຖືກ worker ອື່ນ claim.", userResponse: "Admin reload queue; ບໍ່ສະແດງວ່າສຳເລັດ.", systemResponse: "Worker ປັດຈຸບັນຢຸດ; ບໍ່ write outcome; metric lease_conflict." },
  { code: "ERR-WORK-OUTCOME-MISSING", category: "STATE", status: "422", retry: "AFTER OUTCOME", condition: "ພະຍາຍາມ Complete WorkItem ໂດຍບໍ່ມີ result/reference.", userResponse: "ໃຫ້ບັນທຶກຜົນກ່ອນ Complete.", systemResponse: "ຄົງ InProgress/Blocked; ບໍ່ປິດ queue item." },
  { code: "ERR-EXTERNAL-ACTION-UNAVAILABLE", category: "CLIENT/INTEGRATION", status: "200 + FALLBACK", retry: "USER CHOICE", condition: "Map/Dialer/Messaging/Web Share ບໍ່ມີ ຫຼືເປີດບໍ່ໄດ້.", userResponse: "ສະແດງ Copy/Web fallback; ບໍ່ປ່ອຍ Error Page ທີ່ບໍ່ມີທາງອອກ.", systemResponse: "ບັນທຶກ action result ຕາມ consent; ຫ້າມນັບ launch failure ເປັນ success intent ຕາມ metric definition." },
  { code: "ERR-EVENT-SCHEMA", category: "MEASUREMENT", status: "400", retry: "NO", condition: "Event name/property/version ບໍ່ຢູ່ allowlist ຫຼືພົບ PII.", userResponse: "Public journey ສືບຕໍ່ໂດຍບໍ່ສະແດງ Error modal.", systemResponse: "Reject event; metric ສະເພາະ code/client version; ບໍ່ log payload ທີ່ສົງໄສ PII." },
  { code: "ERR-REPORT-DEFINITION-CONFLICT", category: "MEASUREMENT", status: "422", retry: "CHANGE PERIOD", condition: "Metric definition ປ່ຽນກາງ period ຫຼືຂໍ mixed version comparison.", userResponse: "ໃຫ້ເລືອກ definition/version ຫຼືແບ່ງ period.", systemResponse: "ຫ້າມລວມ rate ທີ່ນິຍາມຄົນລະອັນ; ສົ່ງ data quality flag." },
  { code: "ERR-RATE-LIMITED", category: "PLATFORM", status: "429", retry: "YES, DELAY", condition: "Client/Admin/External Platform ເກີນ request policy.", userResponse: "ບອກໃຫ້ລອງໃໝ່ຕາມ retry_after_seconds.", systemResponse: "Throttle ຕາມ actor/IP/session ໂດຍບໍ່ log raw credential; Background Job reschedule." },
  { code: "ERR-DEPENDENCY-TIMEOUT", category: "INTEGRATION", status: "503", retry: "YES, BOUNDED", condition: "Social/Map/Auth ຫຼື dependency ຕອບຊ້າ/5xx.", userResponse: "Public read ໃຊ້ fallback; Admin ບອກວ່າບໍລິການຊົ່ວຄາວບໍ່ພ້ອມ.", systemResponse: "timeout ສັ້ນ + exponential backoff/jitter; ຫ້າມຖືເປັນ ConfirmedUnavailable ຈາກຄັ້ງດຽວ." },
  { code: "ERR-AUDIT-WRITE-FAILED", category: "PLATFORM", status: "500", retry: "SAFE KEY ONLY", condition: "Privileged Domain Change ບັນທຶກ Audit ບໍ່ໄດ້.", userResponse: "ບອກວ່າການປ່ຽນບໍ່ສຳເລັດ; ຫ້າມສະແດງ success.", systemResponse: "Rollback Domain Change ໃນ transaction ດຽວ; alert incident; retry ດ້ວຍ idempotency key ເກົ່າ." },
  { code: "ERR-UNEXPECTED", category: "PLATFORM", status: "500", retry: "NO BLIND RETRY", condition: "ຂໍ້ຜິດພາດທີ່ບໍ່ເຂົ້າ Catalog.", userResponse: "ສະແດງຂໍ້ຄວາມກາງ + trace_id; ຮັກສາຂໍ້ມູນໃນ form ຖ້າປອດໄພ.", systemResponse: "Sanitized structured log + alert; ບໍ່ເປີດ stack/SQL/secret; ທົບທວນເພີ່ມ code ສະເພາະ." },
];

const moduleErrorPolicies: Record<string, string[]> = {
  "MOD-01": ["ERR-PLACE-NOT-PUBLIC", "ERR-DEPENDENCY-TIMEOUT", "ERR-EVENT-SCHEMA"],
  "MOD-02": ["ERR-VALIDATION", "ERR-DEPENDENCY-TIMEOUT", "ERR-EVENT-SCHEMA"],
  "MOD-03": ["ERR-NOT-FOUND", "ERR-PLACE-NOT-PUBLIC", "ERR-EXTERNAL-ACTION-UNAVAILABLE", "ERR-EVENT-SCHEMA"],
  "MOD-04": ["ERR-SOURCE-URL-DUPLICATE", "ERR-SOURCE-VALIDATION", "ERR-SOURCE-PUBLISH-BLOCKED", "ERR-SOURCE-TAKEDOWN-HOLD", "ERR-DEPENDENCY-TIMEOUT"],
  "MOD-05": ["ERR-VALIDATION", "ERR-INVALID-STATE", "ERR-PLACE-PUBLISH-BLOCKED", "ERR-DUPLICATE-REVIEW-REQUIRED", "ERR-MERGE-CONFLICT", "ERR-CONCURRENCY-CONFLICT"],
  "MOD-06": ["ERR-VALIDATION", "ERR-EVIDENCE-REQUIRED", "ERR-REQUEST-VALUE-CONFLICT", "ERR-REQUEST-NOT-READY-TO-CLOSE", "ERR-CONCURRENCY-CONFLICT"],
  "MOD-07": ["ERR-VALIDATION", "ERR-INVALID-STATE", "ERR-CAMPAIGN-INELIGIBLE", "ERR-CAMPAIGN-WINDOW", "ERR-CONCURRENCY-CONFLICT"],
  "MOD-08": ["ERR-AUTHENTICATION-REQUIRED", "ERR-FORBIDDEN", "ERR-AUDIT-WRITE-FAILED", "ERR-CONCURRENCY-CONFLICT"],
  "MOD-09": ["ERR-EVENT-SCHEMA", "ERR-REPORT-DEFINITION-CONFLICT", "ERR-VALIDATION"],
  "MOD-10": ["ERR-JOB-LEASE-CONFLICT", "ERR-VERIFICATION-INCOMPLETE", "ERR-DEPENDENCY-TIMEOUT", "ERR-CONCURRENCY-CONFLICT"],
};

const retryRules = [
  ["Public Query", "Timeout/503 ເທົ່ານັ້ນ", "Retry ສູງສຸດ 2 ຄັ້ງ ດ້ວຍ exponential backoff + jitter; Feed/Place ໃຊ້ cached/fallback ຖ້າຍັງລົ້ມ.", "ບໍ່ retry 400/404/422; ບໍ່ເພີ່ມ page item ຊ້ຳ."],
  ["Privileged Command", "Network loss/500 ຫຼັງບໍ່ຮູ້ຜົນ", "ກວດ result ດ້ວຍ idempotency_key ກ່ອນ; Retry ດ້ວຍ key/payload ເດີມເທົ່ານັ້ນ.", "ຫ້າມ blind retry Publish/Merge/Decision/Status Change."],
  ["External Source Check", "Timeout/429/5xx", "3 attempts ພາຍໃນ job ດ້ວຍ backoff; ຖ້າຍັງລົ້ມໃຫ້ TemporaryFailure ແລະ schedule ໃໝ່.", "ຄັ້ງດຽວຫ້າມ ConfirmedUnavailable."],
  ["Background Job", "Transient database/dependency", "ມີ attempt_id + lease; Retry ຕາມ max_attempts; ຫຼັງນັ້ນ Blocked/Dead-letter Work Item ໃຫ້ Admin.", "ປ້ອງກັນ worker ສອງຕົວ commit ຜົນດຽວກັນ."],
  ["Analytics Event", "Network/ingest failure", "Best effort; client ອາດສົ່ງຊ້ຳດ້ວຍ event_id ເດີມ. Product Action ບໍ່ລໍຖ້າ.", "ບໍ່ສະແດງ Error modal; event_id/dedupe_key ກັນການນັບຊ້ຳ."],
  ["Client External Action", "App ບໍ່ມີ/launch failure", "ສະເໜີ Web/Copy fallback; Retry ຕາມການເລືອກຂອງຜູ້ໃຊ້.", "ຫ້າມ loop ເປີດ App ອັດຕະໂນມັດ."],
] as const;

const transactionRules = [
  ["Domain state + Audit", "Publish, Suspend, Archive, Merge, Correction Decision, Campaign State ຕ້ອງປ່ຽນ Domain Record ແລະຂຽນ Audit ໃນ transaction ດຽວ. Audit ລົ້ມ = rollback Domain Change."],
  ["External call", "ຫ້າມຖື Database Transaction ລໍຖ້າ Social/Map/Auth. ໃຫ້ call ນອກ transaction, ຈາກນັ້ນເປີດ transaction ສັ້ນເພື່ອກວດ expected state/version ແລະບັນທຶກຜົນ."],
  ["Notification/Communication", "Commit business outcome ກ່ອນສົ່ງຂໍ້ຄວາມ. ຖ້າສົ່ງລົ້ມ ໃຫ້ບັນທຶກ Communication = Failed ແລະ Retry; ຫ້າມ rollback Correction ທີ່ Apply ສຳເລັດແລ້ວ."],
  ["Merge", "ການຍ້າຍ relation, ປ່ຽນ source Place, ສ້າງ Redirect, ປ່ຽນ source Place ເປັນ Merged ແລະ Audit ຕ້ອງ atomic. ຖ້າ relation ໃດຍ້າຍບໍ່ໄດ້ໃຫ້ rollback ທັງໝົດ."],
  ["Event + Decision Intent", "Validate Event, insert AnalyticsEvent ແລະ insert optional DecisionIntent ຢູ່ transaction ດຽວ; unique event_id/dedupe_key ປ່ຽນ retry ໃຫ້ເປັນ idempotent result."],
  ["Job claim + result", "Claim/lease ເປັນ transaction ສັ້ນ. External work ເຮັດນອກ transaction. ກ່ອນ commit result ຕ້ອງກວດວ່າ lease ຍັງເປັນຂອງ worker ແລະ expected entity version ຍັງກົງ."],
] as const;

const coveredFunctions = systemFunctionCatalog.filter((fn) => (moduleErrorPolicies[fn.moduleId] ?? []).length > 0);
const missingCoverage = systemFunctionCatalog.filter((fn) => !(moduleErrorPolicies[fn.moduleId] ?? []).length).map((fn) => fn.id);
const totalTransitions = stateMachines.reduce((sum, machine) => sum + machine.transitions.length, 0);
const uniqueErrorCodes = new Set(errors.map((item) => item.code));
const unknownPolicyCodes = Array.from(new Set(Object.values(moduleErrorPolicies).flat())).filter((code) => !uniqueErrorCodes.has(code));

export default function SystemAnalysisStateErrors() {
  const coveragePass = missingCoverage.length === 0 && unknownPolicyCodes.length === 0;

  return (
    <section className={styles.saStateErrors} id="sa-state-error-specification">
      <header className={styles.saPartHeader}>
        <span>ພາກ F · ຂັ້ນ 5 ຂອງ SA</span>
        <h2>State Transition & Error Handling</h2>
        <p>ພາກນີ້ກຳນົດວ່າ Business Entity ແຕ່ລະອັນຢູ່ State ໃດ, Event/Function ໃດປ່ຽນ State ໄດ້, ຕ້ອງຜ່ານ Guard ຫຍັງ ແລະຖ້າລົ້ມແລ້ວຂໍ້ມູນຈະຄົງຢູ່ແນວໃດ. Error Handling ບໍ່ແມ່ນພຽງຂໍ້ຄວາມໜ້າຈໍ; ມັນລວມ Error Code, Transaction, Retry, Fallback, Log, Audit ແລະວິທີປ້ອງກັນການປ່ຽນຂໍ້ມູນເຄິ່ງດຽວ.</p>
        <p>State/Transition ນີ້ແມ່ນ Logical Contract. Physical API status, database constraint ແລະ queue technology ຈະຖືກອອກແບບໃນ Technical Proposal, ແຕ່ຫ້າມປ່ຽນ Business Meaning ໂດຍບໍ່ອັບເດດ PRO-02.</p>
      </header>

      <div className={styles.saCatalogSummary}>
        <article><small>STATE MACHINES</small><strong>{stateMachines.length}</strong><p>Place, Quality, Source, Availability, Request, Campaign ແລະ Work Item</p></article>
        <article><small>TRANSITIONS</small><strong>{totalTransitions}</strong><p>ທຸກ Transition ມີ From/To, Function, Guard, Write ແລະ Failure Result</p></article>
        <article><small>ERROR CODES</small><strong>{errors.length}</strong><p>Stable Code ສຳລັບ Client, API, Job, Log ແລະ Test Case</p></article>
        <article><small>FUNCTION COVERAGE</small><strong>{coveredFunctions.length}/{systemFunctionCatalog.length}</strong><p>64 Functions ທຸກອັນມີ Module Error Policy</p></article>
      </div>

      <section className={styles.documentArticleSection}>
        <span>F1 · STATE RULES</span>
        <h2>State ປັດຈຸບັນ + Event + Guard = State ໃໝ່ ຫຼື Error ທີ່ບໍ່ປ່ຽນຂໍ້ມູນ</h2>
        <p className={styles.documentQuestion}>Developer ຈະປ້ອງກັນການຂ້າມຂັ້ນ, update ຊ້ຳ ແລະການປ່ຽນ State ພ້ອມກັນແນວໃດ?</p>
        <div className={styles.saModelRules}>
          <article><b>RULE 01</b><strong>Server decides</strong><p>Client ສົ່ງ Event/Command ແລະ expected_version; Server ອ່ານ current state ແລ້ວກວດ Transition. Client ຫ້າມສົ່ງ State ໃໝ່ໄປ overwrite ໂດຍກົງ.</p></article>
          <article><b>RULE 02</b><strong>Guard before write</strong><p>Authentication, Authorization, Input, Current State, Version ແລະ Business Guard ຕ້ອງຜ່ານກ່ອນ write. Guard ລົ້ມຕ້ອງບໍ່ເກີດ partial data.</p></article>
          <article><b>RULE 03</b><strong>Atomic change</strong><p>Domain change, timestamp, relation ຈຳເປັນ ແລະ Audit ຕ້ອງ commit/rollback ພ້ອມກັນສຳລັບ privileged command.</p></article>
          <article><b>RULE 04</b><strong>Optimistic lock</strong><p>Record ທີ່ປ່ຽນ State ຕ້ອງມີ version/updated_at check. ຖ້າບໍ່ກົງໃຫ້ ERR-CONCURRENCY-CONFLICT; ຫ້າມ last-write-wins.</p></article>
          <article><b>RULE 05</b><strong>Idempotent command</strong><p>Publish, Merge, Decision, Campaign State ແລະ Background Job ຕ້ອງຮັບ idempotency/attempt key. Key ເດີມ + payload ເດີມສົ່ງຜົນເກົ່າ.</p></article>
          <article><b>RULE 06</b><strong>Terminal means terminal</strong><p>Archived, Merged, Removed, Closed, Ended ແລະ Cancelled ຫ້າມກັບຄືນຜ່ານ Update ທົ່ວໄປ. ຖ້າທຸລະກິດຕ້ອງການ Restore ຕ້ອງສ້າງ Transition ໃໝ່ທີ່ອະນຸມັດ.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>F2 · STATE MACHINE CATALOG</span>
        <h2>{stateMachines.length} State Machines ພ້ອມ Definition ແລະ Transition Table</h2>
        <p className={styles.documentQuestion}>ເມື່ອກົດ Publish, Approve, Suspend, Restore ຫຼື End ແລ້ວ ຂໍ້ມູນຕ້ອງປ່ຽນຈາກຫຍັງໄປຫຍັງ?</p>
        <div className={styles.saStateMachines}>
          {stateMachines.map((machine, index) => (
            <details key={machine.id} open={index === 0}>
              <summary><span>{machine.id}</span><div><small>{machine.field}</small><strong>{machine.entity}</strong></div><em>{machine.transitions.length} Transitions</em></summary>
              <div className={styles.saStateIntro}><p>{machine.purpose}</p><div><b>INVARIANT</b><span>{machine.invariant}</span></div><div><b>STATE FIELD</b><code>{machine.field}</code></div></div>
              <div className={styles.saStateDefinitions}>
                {machine.states.map((state) => <article key={state.name}><b>{state.name}</b><p>{state.meaning}</p><small>{state.publicEffect}</small></article>)}
              </div>
              <div className={styles.saTransitionTable} role="table" aria-label={`${machine.entity} transition table`}>
                <div role="row"><b>ID / FROM → TO</b><b>EVENT / FUNCTION</b><b>ACTOR / GUARD</b><b>ATOMIC WRITES / SIDE EFFECT</b><b>ON FAILURE</b></div>
                {machine.transitions.map((transition) => <div role="row" key={transition.id}>
                  <div><b>{transition.id}</b><code>{transition.from}</code><i>→</i><strong>{transition.to}</strong></div>
                  <div><strong>{transition.event}</strong><code>{transition.functionId}</code></div>
                  <div><b>{transition.actor}</b><p>{transition.guard}</p></div>
                  <p>{transition.writes}</p><p>{transition.failure}</p>
                </div>)}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>F3 · STANDARD ERROR CONTRACT</span>
        <h2>Error Response ຕ້ອງອ່ານໄດ້ທັງໂດຍຜູ້ໃຊ້, Client ແລະທີມ Support</h2>
        <p className={styles.documentQuestion}>Error ໜຶ່ງອັນຄວນສົ່ງຂໍ້ມູນຫຍັງ ແລະຫ້າມສົ່ງຫຍັງ?</p>
        <div className={styles.documentProse}>
          <p>ທຸກ API/Server Function ທີ່ລົ້ມຕ້ອງສົ່ງ Error Envelope ຮູບແບບດຽວ. HTTP status ໃນ Error Catalog ເປັນຄຳແນະນຳສຳລັບ Technical Design; Business Code ເປັນສັນຍາທີ່ສຳຄັນກວ່າ ເພາະ Client, Test Case ແລະ Monitoring ອ້າງ code ນີ້.</p>
          <p>Public message ຕ້ອງບອກສິ່ງທີ່ເກີດ ແລະທາງເລືອກຖັດໄປ. Internal log ອາດມີ function_id, actor_id, entity_id, current state, duration ແລະ dependency result ແຕ່ຫ້າມມີ password, token, raw credential, requester contact, ProtectedText ຫຼື full external response ທີ່ອາດມີ PII.</p>
        </div>
        <div className={styles.saErrorContract}>
          {errorContract.map(([field, meaning], index) => <div key={field}><b>{String(index + 1).padStart(2, "0")}</b><code>{field}</code><p>{meaning}</p></div>)}
        </div>
        <pre className={styles.saCodeSample} aria-label="Standard error response example"><code>{`{
  "error": {
    "code": "ERR-INVALID-STATE",
    "message": "ບໍ່ສາມາດ Publish ໄດ້ ເພາະ Place ບໍ່ໄດ້ຢູ່ InReview",
    "trace_id": "trc_...",
    "retryable": false,
    "current_state": "Suspended",
    "field_errors": []
  }
}`}</code></pre>
      </section>

      <section className={styles.documentArticleSection}>
        <span>F4 · ERROR CATALOG</span>
        <h2>{errors.length} Error Codes ທີ່ຕ້ອງນຳໃຊ້ສອດຄ່ອງກັນ</h2>
        <p className={styles.documentQuestion}>ເມື່ອ Function ລົ້ມ Client ຄວນສະແດງຫຍັງ, ລະບົບຄວນ Retry ຫຼືບໍ່ ແລະຂໍ້ມູນຕ້ອງຢູ່ແນວໃດ?</p>
        <div className={styles.saErrorTable} role="table" aria-label="Error catalog">
          <div role="row"><b>CODE / CLASS</b><b>STATUS / RETRY</b><b>WHEN</b><b>USER / CLIENT RESPONSE</b><b>SYSTEM / DATA RESPONSE</b></div>
          {errors.map((error) => <div role="row" key={error.code}><div><code>{error.code}</code><small>{error.category}</small></div><div><b>{error.status}</b><span>{error.retry}</span></div><p>{error.condition}</p><p>{error.userResponse}</p><p>{error.systemResponse}</p></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>F5 · RETRY, TRANSACTION & RECOVERY</span>
        <h2>Retry ຕ້ອງແກ້ບັນຫາຊົ່ວຄາວ ໂດຍບໍ່ສ້າງຂໍ້ມູນຊ້ຳ</h2>
        <p className={styles.documentQuestion}>ຈະເຮັດແນວໃດເມື່ອ Network ຂາດ, External Platform ຊ້າ, Audit ລົ້ມ ຫຼື Worker ເຮັດວຽກພ້ອມກັນ?</p>
        <div className={styles.saRetryTable} role="table" aria-label="Retry policy">
          <div role="row"><b>OPERATION</b><b>RETRYABLE FAILURE</b><b>POLICY</b><b>SAFETY RULE</b></div>
          {retryRules.map(([operation, failure, policy, safety]) => <div role="row" key={operation}><strong>{operation}</strong><p>{failure}</p><p>{policy}</p><p>{safety}</p></div>)}
        </div>
        <div className={styles.saTransactionRules}>
          {transactionRules.map(([title, detail], index) => <article key={title}><b>{String(index + 1).padStart(2, "0")}</b><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>F6 · FUNCTION → ERROR COVERAGE</span>
        <h2>Module Error Policy ຄອບຄຸມ Function Catalog ຄົບ 64 ອັນ</h2>
        <p className={styles.documentQuestion}>Developer ຈະຮູ້ໄດ້ແນວໃດວ່າ Function ແຕ່ລະອັນຕ້ອງຮອງຮັບ Error Family ໃດ?</p>
        <div className={coveragePass ? styles.saCoveragePass : styles.saCoverageFail}>
          <strong>{coveredFunctions.length}/{systemFunctionCatalog.length}</strong>
          <div><b>{coveragePass ? "PASS — ERROR POLICY COVERAGE" : "ERROR POLICY MISMATCH"}</b><p>{coveragePass ? `Function Catalog ທຸກອັນມີ Module Error Policy; Error Code ທີ່ອ້າງທັງໝົດມີຢູ່ໃນ Catalog ${errors.length} ລາຍການ.` : `Missing Functions: ${missingCoverage.join(", ") || "—"}; Unknown Error Codes: ${unknownPolicyCodes.join(", ") || "—"}`}</p></div>
        </div>
        <div className={styles.saModuleErrorCoverage}>
          {Object.entries(moduleErrorPolicies).map(([moduleId, codes]) => {
            const functions = systemFunctionCatalog.filter((fn) => fn.moduleId === moduleId);
            return <details key={moduleId}>
              <summary><span>{moduleId}</span><strong>{functions[0]?.moduleName}</strong><em>{functions.length} Functions · {codes.length} Error Families</em></summary>
              <div><b>FUNCTIONS</b><p>{functions.map((fn) => fn.id).join(" · ")}</p></div>
              <div><b>REQUIRED ERROR FAMILIES</b><p>{codes.join(" · ")}</p></div>
              <div><b>UNIVERSAL</b><p>ທຸກ Server Function ຕ້ອງຮອງຮັບ ERR-RATE-LIMITED, ERR-DEPENDENCY-TIMEOUT ເມື່ອມີ dependency ແລະ ERR-UNEXPECTED ເປັນ safety net. Query ຕ້ອງບໍ່ write; Command ລົ້ມຕ້ອງ rollback.</p></div>
            </details>;
          })}
        </div>
      </section>

      <section className={styles.documentArticleSection}>
        <span>F7 · TEST BASELINE & HANDOFF</span>
        <h2>ທຸກ Transition ແລະ Error Code ກາຍເປັນ Test Scenario ໄດ້</h2>
        <div className={styles.saWorkflowConditions}>
          <div><b>MINIMUM STATE TESTS</b><ul><li>Happy path ຂອງ Transition ທຸກອັນ: From, Event, Guard → To + writes + Audit.</li><li>Invalid from-state: ໄດ້ ERR-INVALID-STATE ແລະ record/version ບໍ່ປ່ຽນ.</li><li>Guard ແຕ່ລະຂໍ້ລົ້ມ: ໄດ້ Error ສະເພາະ ແລະບໍ່ມີ partial write.</li><li>Concurrent update: ມີພຽງ 1 command commit; ອີກອັນໄດ້ ERR-CONCURRENCY-CONFLICT.</li><li>Idempotency: key/payload ເດີມສົ່ງ result ເດີມ; key ເດີມ/payload ໃໝ່ຖືກປະຕິເສດ.</li></ul></div>
          <div><b>MINIMUM ERROR TESTS</b><ul><li>Error envelope ມີ code/message/trace_id/retryable ຕາມ contract.</li><li>Public response/log ບໍ່ມີ token, credential, ProtectedText, raw requester contact ຫຼື stack trace.</li><li>Retry Policy ບໍ່ສ້າງ Place, Source, Event, Intent, Audit ຫຼື WorkItem ຊ້ຳ.</li><li>External timeout ໃຊ້ fallback/TemporaryFailure; ບໍ່ປ່ຽນເປັນ ConfirmedUnavailable ຈາກ failure ຄັ້ງດຽວ.</li><li>Audit failure ທຳໃຫ້ privileged domain change rollback ແລະຜູ້ໃຊ້ບໍ່ເຫັນ success.</li></ul></div>
        </div>
        <aside className={styles.saNextStep}><small>NEXT · STEP 6</small><h2>Traceability Matrix</h2><p>ຂັ້ນຖັດໄປຈະເຊື່ອມ PRO-01 Requirement → Use Case/Business Rule → Module/Function → Entity/Relationship → Workflow → State Transition/Error → Acceptance/Test Evidence ເພື່ອກວດວ່າບໍ່ມີ Requirement ຕົກຫຼົ່ນ.</p></aside>
      </section>
    </section>
  );
}
