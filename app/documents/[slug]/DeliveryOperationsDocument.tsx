import styles from "../documents.module.css";

type Props = { slug: string; basePath: string };

const phasePlan = [
  ["P0", "Foundation", "TP-WP01 · WP-01", "Identity/OIDC, role/action authorization, audit atomicity, schema/migration, CI/CD, secret, log and environment", "Admin mutation ບໍ່ເລີ່ມຈົນ negative authorization ແລະ audit rollback ຜ່ານ"],
  ["P1", "First vertical slice", "TP-WP02 · WP-02A/03/02B/04", "Admin ສ້າງ Place + Source → readiness → publish → Guest ເປີດ canonical Place → Map Intent", "E2E, Published-only boundary, attribution, audit/outbox ແລະ rollback ຜ່ານ"],
  ["P2", "Discover & decide", "TP-WP03 · WP-05/06", "Full-screen Feed, Lao Search/filter, Place detail, menu/room/media fallback, Map/Call/Message", "Core Guest journey, PERF-01—04, responsive and accessibility baseline ຜ່ານ"],
  ["P3", "Trust & evidence", "TP-WP04 · WP-07/08/09", "Correction/takedown, freshness/retry, consent event, Founding Partner, Sponsored and performance summary", "Trust queue, event reconciliation, disclosure and manual operations rehearsal ຜ່ານ"],
  ["P4", "Hardening & Pilot", "TP-WP05/06", "Regression, security, recovery, load, UAT, rollback, seed/import, operator training and launch support", "QA/UAT/G-SEC/Operations gates ຜ່ານ; Product Owner signs Go/No-Go"],
] as const;

const effort = [
  ["TP-WP01", "Foundation & delivery controls", 8, 12, "P0", "Founder/Tech Lead", "Identity, audit, CI/CD, schema, secret, observability"],
  ["TP-WP02", "Admin Place/Source vertical slice", 14, 20, "P1", "Founder + QA checkpoint", "Draft, source, validation, publish and projection"],
  ["TP-WP03", "Guest decision journey", 16, 24, "P2", "Founder + UX/QA", "Feed, Search, Place, actions and media fallback"],
  ["TP-WP04", "Trust, analytics & partner operations", 18, 26, "P3", "Founder + Operations", "Correction, consent, quality, campaign and reporting"],
  ["TP-WP05", "Hardening & release readiness", 14, 20, "P4", "QA/Security/Infrastructure specialist", "Regression, security, performance, recovery and UAT defect"],
  ["TP-WP06", "Pilot support & handoff", 5, 8, "P4", "Founder + Operations", "Seed, runbook, training, launch and evidence pack"],
] as const;

const teamModel = [
  ["Product Owner / Founder", "Scope, priority, business decision, acceptance and Go/No-Go", "Cannot self-mark technical/security evidence as passed"],
  ["Tech Lead / Developer", "Architecture, implementation, review, migration, automation and technical evidence", "Cannot approve own unresolved Critical/High exception"],
  ["QA Lead / Specialist", "Risk-based test plan, independent verification, defect and UAT evidence", "Independence checkpoint required at P1 and P4"],
  ["Operations Owner", "Environment, release, monitoring, backup, incident, queue and SOP readiness", "Accepts operational handoff before Pilot"],
  ["Security / Infrastructure Specialist", "Threat/control, host/container, recovery and security-gate review", "Checkpoint-based; findings have owner and expiry"],
  ["Content / Trust Operator", "Fixture, Place/Source, correction/takedown and quality rehearsal", "Uses least-privilege role and documented queue"],
] as const;

const currentRoleAssignments = [
  ["Product Owner", "Founder", "ASSIGNED", "Scope, priority, acceptance and Go/No-Go within an approved stage"],
  ["Budget Owner / Finance Record Owner", "Founder", "ASSIGNED", "Approve and record Validation Pilot spending within the 25,000,000 LAK ceiling"],
  ["Delivery Lead", "Founder", "ASSIGNED", "Plan capacity, limit WIP, maintain backlog, risk and evidence register"],
  ["Tech Lead / Developer", "Founder", "ASSIGNED", "Architecture, implementation, migration, automation and technical evidence"],
  ["Operations Owner", "Founder", "ASSIGNED", "Monitoring, backup, incident, queue and operating record during covered hours"],
  ["Content / Trust Operator (interim)", "Founder", "ASSIGNED", "Place/Source, correction, takedown and quality rehearsal using named role"],
  ["QA Reviewer", "VACANT — Gate blocker", "VACANT", "Independent P1/P4 verification; Founder cannot verify own QA evidence"],
  ["Security / Infrastructure Reviewer", "VACANT — Gate blocker", "VACANT", "Independent P0/P4 security and recovery review"],
  ["Legal Reviewer", "VACANT — Gate blocker", "VACANT", "Required before Public Pilot, optional analytics and external-content legal acceptance"],
  ["Accountant / Tax Reviewer", "VACANT — Gate blocker", "VACANT", "Required before real revenue, invoice or tax operation"],
] as const;

const weeklyCapacity = [
  ["Development / Technical", "2.50 days", "Build, migration, automated test and technical evidence"],
  ["Product / Content / User validation", "0.75 day", "Scope, fixture, content and user validation"],
  ["QA / Documentation / Evidence", "0.50 day", "Self-check, document update and evidence collection; not independent sign-off"],
  ["Operations / Finance", "0.25 day", "Monitoring, backup, queue and expense record"],
  ["Total committed", "4.00 days / 32 hours", "One additional weekday remains uncommitted for interruption, recovery and rest"],
] as const;

const budgetAuthority = [
  ["≤ 500,000 LAK", "Founder", "Within approved Validation category; receipt/invoice and purpose required"],
  ["500,001–999,999 LAK", "Founder", "Expense evidence plus written reason and remaining-budget check"],
  ["≥ 1,000,000 LAK", "Founder after comparison", "At least two comparable prices/quotations and recorded selection reason"],
  ["Contingency use", "Founder", "Decision Record states trigger, amount, residual contingency and effect"],
  ["Production Build / P0–P4", "NOT AUTHORIZED", "Requires a new budget decision after Validation Pilot; 25m LAK does not authorize Production"],
  ["60m living reserve + 15m personal obligations", "OUT OF PROJECT SCOPE", "Must never be presented or spent as project/production budget"],
] as const;

const evidenceStatuses = [
  ["Planned", "Evidence requirement exists; execution has not started"],
  ["Collected", "Artifact/result exists but has not been reviewed"],
  ["Under Review", "Named reviewer is checking scope, integrity and result"],
  ["Verified", "Authorized independent reviewer accepts the evidence for the named gate"],
  ["Rejected", "Evidence is incomplete, invalid or failed; gate remains blocked"],
  ["Expired", "Evidence age/version no longer covers the release; repeat is required"],
] as const;

const slaRehearsalRounds = [
  ["Round 1 · Normal operations", "10 controlled cases across OPS-Q01—07", "100% have case ID, owner, state, SLA clock, next action and evidence; no lost case"],
  ["Round 2 · Incident / trust", "S1 alert, P0 safe-hide, unavailable source, correction, takedown, failed job and handover", "S1 alert ≤5m; P0 safe-hide ≤15m; S1 human acknowledgement ≤60m only during 08:00–22:00 ICT"],
] as const;

const validationTargets = [
  ["VAL-T01", "Place supply", "100 Place records with required core data, source and checked date", "Place register + source evidence + completeness result"],
  ["VAL-T02", "User problem/value", "20 target users complete problem interview and/or controlled usability task", "Consent-safe interview/test record; no unnecessary personal data"],
  ["VAL-T03", "Owner problem", "15 Place owners interviewed across the selected Pilot scope", "Owner interview record and coded problem/objection"],
  ["VAL-T04", "Commercial demand", "30 shops approached; at least 3 paid/deposit plus 2 signed LOI", "Payment/deposit proof or signed document; verbal interest does not count"],
  ["VAL-T05", "Decision value", "Users can find a Place and reach Map/Call/Message without operator help", "Task outcome, issue, Decision Intent and optional manual visit follow-up"],
  ["VAL-T06", "Financial control", "Total ≤25m LAK; Validation work ≤10m LAK; planned work ≤7.9m LAK", "Expense register, receipt/quote, committed/spent/remaining and 2.1m contingency"],
] as const;

const validationWeeks = [
  ["W1", "Problem and operating setup", "Interview 6 users + 4 owners; lock interview script, selected scope, evidence IDs and first Place candidates", "Research 14h · Content 8h · Prototype 4h · Evidence/Admin 4h · Buffer 2h", "Interview records; scope decision; candidate/source ledger"],
  ["W2", "Problem/supply Gate 1", "Reach cumulative 10 users + 8 owners and 30 publish-ready Place records; measure time/cost per Place", "Content 12h · Interview 6h · Prototype 6h · Evidence 4h · Admin 2h · Buffer 2h", "Gate G2 decision and Tranche 1 expense close"],
  ["W3", "Clickable value test", "Test Feed → Search → Place → Map/Call/Message; reach 15 users, 12 owners and 60 Places", "Prototype 14h · User test 8h · Content 4h · Evidence 4h · Admin 2h", "Task results, issue log, Decision Intent baseline"],
  ["W4", "Technical/policy Gate 2", "Reach 20 users + 15 owners; verify link/embed fallback, mobile path, EssentialOnly analytics and content/takedown workflow", "Technical/Policy 14h · Test/Interview 6h · Content 4h · Evidence 4h · Admin 2h · Buffer 2h", "Gate G4 decision; risk/policy findings; Tranche 2 close"],
  ["W5", "Supply completion and pre-sell", "Complete 100 Places; approach first 15 of 30 shops with Founding Partner Pilot at 200,000 LAK/month", "Pre-sell 14h · Content 8h · Prototype 4h · Evidence 4h · Finance 2h", "Outreach/objection log; only payment, deposit or signed LOI counts"],
  ["W6", "Commercial proof and final decision", "Approach remaining shops; close evidence; calculate actual cost and decide GO/PIVOT/NO-GO", "Pre-sell 8h · Analysis 8h · Decision pack 8h · Finance/Evidence 4h · Buffer 4h", "Gate G6; 3 paid/deposit + 2 signed LOI target; final evidence pack"],
] as const;

const validationGates = [
  ["G2", "End of Week 2", "Problem and first supply proof", "10 user + 8 owner cumulative records; 30 Places; repeatable workflow; actual cost/time visible", "Release Tranche 2 only if evidence supports continuing; otherwise hold, reduce scope or stop"],
  ["G4", "End of Week 4", "User value and technical/policy feasibility", "20 users + 15 owners; 60 Places; critical journey works; rights/fallback/EssentialOnly path is safe", "Release Tranche 3 only if value and feasibility are evidenced; otherwise pivot or stop"],
  ["G6", "End of Week 6", "Full Validation decision", "100 Places; 30 outreach; revenue evidence; actual cost; unresolved risk and evidence integrity", "GO proposes a separately approved Production budget; PIVOT defines one bounded retest; NO-GO stops spending"],
] as const;

const validationBudget = [
  ["Tranche 1 · W1–W2", "30% · 7,500,000 LAK", "Founder living 5,000,000 + Validation work ceiling 2,500,000", "Approved to start; close G2 before any Tranche 2 commitment"],
  ["Tranche 2 · W3–W4", "35% · 8,750,000 LAK", "Founder living 5,000,000 + Validation work ceiling 3,750,000", "Not released until G2 passes and remaining cash is confirmed"],
  ["Tranche 3 · W5–W6", "35% · 8,750,000 LAK", "Founder living 5,000,000 + Validation work ceiling 3,750,000", "Not released until G4 passes and remaining cash is confirmed"],
  ["Total", "100% · 25,000,000 LAK", "Living 15,000,000 + work ceiling 10,000,000", "Planned non-contingency work is 7,900,000; contingency 2,100,000 requires Decision Record"],
] as const;

const deliveryCadence = [
  ["Backlog refinement", "Weekly", "Ready items have Requirement, dependency, acceptance, estimate, owner and evidence type", "Product + Tech + QA"],
  ["Iteration planning", "Every 2 weeks or capacity window", "Commit by available person-days, not optimistic calendar", "Product + Delivery"],
  ["Daily control", "Working days", "Blocker, risk, queue and evidence gap updated; no status theatre", "Active team"],
  ["Demo/acceptance", "End of iteration", "Working outcome against controlled fixture and criteria", "Product + QA + Operations"],
  ["Retrospective", "End of iteration", "Cycle time, escaped defect, rework and process action", "Active team"],
  ["Gate review", "P0—P4 exit", "Evidence pack, residual risk, budget and next-stage authority", "Named approvers"],
] as const;

const deliveryRisks = [
  ["DEL-R01", "Founder capacity becomes bottleneck", "High", "Reserve realistic capacity; WIP limit; specialist checkpoint; do not convert ROM directly to date", "Founder"],
  ["DEL-R02", "Should/Later scope enters silently", "High", "Must-only backlog; change record with person-day/budget/gate impact", "Product Owner"],
  ["DEL-R03", "External source behavior changes", "High", "Early adapter spike, redirect fallback, contract fixture and owner", "Tech Lead"],
  ["DEL-R04", "Late security/recovery failure", "High", "P0 controls, monthly restore, security test throughout—not only P4", "Security/Operations"],
  ["DEL-R05", "Insufficient Lao content/test data", "Medium", "Controlled fixtures plus Pilot inventory gate 30→60→100", "Content Owner"],
  ["DEL-R06", "Evidence is missing despite feature completion", "Medium", "Evidence path is part of Definition of Done and gate checklist", "QA Lead"],
] as const;

const backlogItems = [
  ["DEL-B001", "Lock domain/API/state/error contracts and reference seed", "P0", "—", "Reviewed examples, migration/seed from empty DB"],
  ["DEL-B002", "Managed OIDC, MFA, session and server authorization", "P0", "DEL-B001", "Allowed/expired/forbidden/step-up tests"],
  ["DEL-B003", "Audit writer, outbox and business-write atomicity", "P0", "DEL-B001/B002", "Commit together or rollback together"],
  ["DEL-B004", "Place Draft, required field and duplicate candidate", "P1", "DEL-B001—003", "Draft/audit/validation/duplicate fixtures"],
  ["DEL-B005", "Source URL, attribution, metadata, link and fallback", "P1", "DEL-B003/B004", "Provider contract and lifecycle tests"],
  ["DEL-B006", "Readiness, publish, public DTO and canonical Place", "P1", "DEL-B004/B005", "Published-only E2E and no-leak test"],
  ["DEL-B007", "Feed, Lao Search, filters and media fallback", "P2", "DEL-B006", "Eligibility, pagination, 60-query and mobile E2E"],
  ["DEL-B008", "Map/Call/Message, save/share and consent-safe event skeleton", "P2", "DEL-B006", "Deep-link/fallback/consent/dedupe tests"],
  ["DEL-B009", "Correction, takedown, suspend/archive and appeal", "P3", "DEL-B003/B006", "SLA/partial decision/urgent hide/audit"],
  ["DEL-B010", "Freshness, source retry, dead-letter and maintenance queue", "P3", "DEL-B005/B006/B009", "Clock/idempotency/recovery evidence"],
  ["DEL-B011", "Partner, Sponsored and performance summary", "P3", "DEL-B007/B008", "Time/eligibility/disclosure/reconciliation"],
  ["DEL-B012", "Regression, accessibility, performance and security", "P4", "DEL-B001—011", "DEL-02 + G-SEC evidence"],
  ["DEL-B013", "Backup restore, rollback and incident rehearsal", "P4", "DEL-B012", "Timed restore and release tabletop"],
  ["DEL-B014", "Seed/import, operator training, UAT and known limits", "P4", "DEL-B012/B013", "Signed UAT/operations handoff"],
  ["DEL-B015", "Public Pilot Go/No-Go and launch observation", "P4", "DEL-B014", "Four-role sign-off and evidence pack"],
] as const;

const del01Reviews = [
  ["REV-01", "Calendar model", "Founder productive capacity is 4 person-days/32 hours per week with one uncommitted day; WIP is 1 Primary Function + 1 Operations/Defect.", "Approved · ROM gives approximately 22–32 weeks with 15% buffer; no Launch commitment."],
  ["REV-02", "Team", "Founder is the only current operator. QA, Security/Infrastructure, Legal and Accountant/Tax reviewers are VACANT — Gate blocker.", "Approved · no invented staffing or self-verification."],
  ["REV-03", "Scope", "Only Must scope enters committed baseline; Should/Later requires change control.", "Approved · protects runway and Pilot learning."],
  ["REV-04", "Release gates", "P0→P4 are evidence gates; an iteration date cannot waive a failed gate.", "Approved · failed gate returns work to its owner."],
  ["REV-05", "Budget authority", "25m LAK authorizes only the 6-week Validation Pilot; expenses ≥1m require two price comparisons; Production requires a new decision.", "Approved · P0–P4 Production spending is not authorized."],
] as const;

const testLevels = [
  ["T1", "Unit / rule", "Validation, state, eligibility, score, dedupe, calculation", "Developer", "Every PR"],
  ["T2", "Contract / API", "Schema, stable error, authorization, pagination, idempotency, compatibility", "Developer + QA", "PR and release"],
  ["T3", "Integration", "PostgreSQL transaction, audit/outbox, worker, search projection, provider adapter", "Developer + QA", "PR/nightly"],
  ["T4", "End-to-end", "Guest/Admin critical journeys and failure recovery through UI", "QA", "P1 onward + release"],
  ["T5", "Non-functional", "Performance, accessibility, security, recovery, capacity and resilience", "Specialist owners", "P2/P4 gates"],
  ["T6", "UAT / operational acceptance", "Business outcome, operator queue, release, backup, incident and support", "Product + Operations", "P4"],
] as const;

const fixtures = [
  ["DATA-01", "Complete Published Place", "Eligible Feed/Search/Place/Action"],
  ["DATA-02", "Unknown and stale fields", "Trust/freshness labels and safe fallback"],
  ["DATA-03", "Temporary, unavailable and takedown Source", "Retry, redirect fallback and public removal"],
  ["DATA-04", "Duplicate Place and separate branch", "Candidate, review, merge and redirect"],
  ["DATA-05", "Partial correction request", "Approve/reject/needs-evidence and SLA clock"],
  ["DATA-06", "Campaign state/time boundaries", "Sponsored eligibility, label, schedule and expiry"],
  ["DATA-07", "Consent and duplicate events", "Essential-only, opt-in, dedupe and reconciliation"],
  ["DATA-08", "Admin security failures", "Expired/forbidden/concurrent/audit-failure rollback"],
] as const;

const uatJourneys = [
  ["UAT-01", "Admin creates and publishes Place + Source", "Place/Source fields, duplicate warning, attribution, readiness, audit and public visibility"],
  ["UAT-02", "Guest discovers and decides", "Feed → Place → Map/Call/Message with media failure fallback"],
  ["UAT-03", "Guest searches in Lao", "Normalization, filters, empty result and Sponsored separation"],
  ["UAT-04", "Correction and takedown", "Intake, evidence, queue, partial decision, urgent hide and audit"],
  ["UAT-05", "Source/data quality recovery", "Temporary retry, confirmed unavailable, stale Place and manual queue"],
  ["UAT-06", "Partner and Sponsored reporting", "Time window, disclosure, eligible placement and Decision Intent disclaimer"],
  ["UAT-07", "Operational recovery", "Deploy, migration, monitoring, rollback/restore, support and handover"],
] as const;

const defects = [
  ["Critical", "Security/rights breach, restricted leak, data corruption/loss, core unavailable without recovery", "Release blocked; S1 process; no waiver by feature owner"],
  ["High", "Must journey, authorization, audit, Published boundary, backup/rollback or material incorrect result", "Release blocked unless Product + Tech + Operations approve time-bound exceptional risk; Security High normally no waiver"],
  ["Medium", "Workaround exists; limited audience/non-core behavior; no security/data-integrity impact", "Owner, target date and regression scope required"],
  ["Low", "Cosmetic/copy/minor efficiency with no outcome loss", "Backlog; may release with documented acceptance"],
] as const;

const del02Reviews = [
  ["REV-01", "Automation boundary", "Automate deterministic unit/contract/integration/critical E2E; keep exploratory, usability and business judgment human.", "Approved"],
  ["REV-02", "Environment/data", "Use isolated Test/UAT with versioned synthetic fixtures; never copy Production PII directly.", "Approved"],
  ["REV-03", "Defect policy", "Critical/High block release according to the matrix; deviation must name owner, expiry and compensating control.", "Approved"],
  ["REV-04", "Performance/security/recovery", "PERF-01—04 are Pilot targets tested on Mobile/4G Lao–Singapore path; G-SEC-01—08 requires reproducible evidence.", "Approved · thresholds are re-baselined only through evidence/change control."],
  ["REV-05", "Acceptance authority", "QA verifies, Tech accepts technical quality, Operations accepts readiness, Product gives final UAT/Go-No-Go.", "Approved"],
] as const;

const environments = [
  ["Local", "Developer feedback", "Synthetic local seed; fake provider", "No production secret/data", "Developer"],
  ["Test / CI", "Automated repeatable verification", "Ephemeral DB/fixture per run", "No manual sign-off", "Tech/QA"],
  ["Pilot / Staging", "UAT, load, security, migration, restore and operator rehearsal", "Production-like sanitized dataset/config", "Restricted access; outbound integration controlled", "QA/Operations"],
  ["Production", "Public Pilot", "Approved seed and business data", "Change/release/audit/backup controls", "Operations"],
] as const;

const pipeline = [
  ["CI-01", "Change validation", "Format/type/lint/unit/contract/migration check", "No failed required job"],
  ["CI-02", "Security/supply chain", "Secret, dependency, SAST, container scan and SBOM", "Critical/High = 0 or approved non-release exception"],
  ["CI-03", "Build", "Immutable OCI image pinned by digest", "Same digest promoted; never rebuild per environment"],
  ["CI-04", "Test deployment", "Migration from clean and previous schema; integration/E2E/smoke", "Required suites pass"],
  ["CI-05", "Pilot gate", "Performance, accessibility, DAST, restore, rollback and UAT evidence", "Named approvers sign"],
  ["CI-06", "Production release", "Backup, migration, digest deploy, health/smoke and observation", "Release commander records result"],
] as const;

const alerts = [
  ["ALT-01", "External availability/HTTPS", "2 consecutive failures or cert threshold", "S1/S2 runbook"],
  ["ALT-02", "Host/RAID/disk", "RAID degraded; disk 70/80/90%; SMART/NVMe failure", "Protect capacity; stop unsafe release"],
  ["ALT-03", "Application/API", "Error rate/latency above baseline", "Inspect trace; rollback when release-correlated"],
  ["ALT-04", "PostgreSQL", "Connection, lock, replication/WAL archive, storage anomaly", "Protect writes and recovery chain"],
  ["ALT-05", "Worker/outbox", "Queue age/depth/dead-letter or projection lag", "Pause/retry/reconcile"],
  ["ALT-06", "Backup/restore", "Job/checksum/WAL gap or missed drill", "Block release; recovery owner"],
  ["ALT-07", "Security", "SEC-DET-01—08", "Auto-safe; On-call; evidence preservation"],
  ["ALT-08", "Missing telemetry", "Expected heartbeat absent", "Treat monitoring silence as incident"],
] as const;

const del03Reviews = [
  ["REV-01", "Promotion", "Promote one immutable image digest from Test to Pilot to Production.", "Approved"],
  ["REV-02", "Release authority", "Product, Tech, QA and Operations sign their own gates; Release Commander executes.", "Approved"],
  ["REV-03", "Migration/rollback", "Backup before migration; forward-fix by default, restore only by incident authority when integrity requires it.", "Approved"],
  ["REV-04", "Observability/on-call", "ALT-01—08 and safe automation run 24×7. Human acknowledgement ≤60 minutes is committed only during 08:00–22:00 ICT; outside that window is best effort until backup On-call/managed service exists.", "Approved · do not claim 24×7 human SLA."],
  ["REV-05", "Single-host disclosure", "Allow planned maintenance and no zero-downtime/HA claim; release only with recovery evidence.", "Approved"],
] as const;

const analyticsEvents = [
  ["AN-E01", "feed_impression", "Optional", "Feed", "session_id,event_id,place_id,position,source_kind", "Exposure only; not a view/sale"],
  ["AN-E02", "feed_item_engaged", "Optional", "Feed", "session_id,event_id,place_id,dwell_bucket", "Threshold/version required"],
  ["AN-E03", "search_submitted", "Optional", "Search", "normalized_intent/category/area/price IDs,result_count_bucket", "No raw query"],
  ["AN-E04", "search_result_opened", "Optional", "Search", "place_id,position,normalized filters", "Search success signal"],
  ["AN-E05", "place_opened", "Optional", "Place", "place_id,entry_surface,campaign_id?", "Interest only"],
  ["AN-E06", "source_opened", "Optional", "Place", "place_id,source_id,provider", "Redirect to original"],
  ["AN-E07", "map_clicked", "Optional", "Decision Intent", "place_id,action_target_kind", "Intent—not verified visit"],
  ["AN-E08", "call_clicked", "Optional", "Decision Intent", "place_id,action_target_kind", "Intent—not completed call/sale"],
  ["AN-E09", "message_clicked", "Optional", "Decision Intent", "place_id,channel", "Intent—not completed conversation"],
  ["AN-E10", "share_clicked", "Optional", "Place", "place_id,share_channel", "No recipient data"],
  ["AN-E11", "consent_changed", "Essential", "Privacy", "session_id,previous_mode,new_mode,policy_version", "No optional event before opt-in"],
  ["AN-E12", "client_error", "Essential operational", "Reliability", "error_code,route,build,trace_id", "No content/PII payload"],
] as const;

const funnel = [
  ["FNL-01", "Discovery reach", "Unique consented sessions with eligible feed/search exposure", "Deduplicate session + event; bot/test excluded"],
  ["FNL-02", "Place consideration", "Unique sessions with place_opened ÷ Discovery reach", "Same window and eligibility"],
  ["FNL-03", "Decision Intent", "Unique sessions with map/call/message ÷ Place consideration", "One Place/action family within 7 days; not sale"],
  ["FNL-04", "Source exploration", "Unique source_opened ÷ Place consideration", "Attribution source must remain valid"],
  ["FNL-05", "Partner result", "Eligible Place exposure/open/intent by approved campaign/partner window", "Sponsored and organic reported separately"],
] as const;

const dataQuality = [
  ["DQ-A01", "Schema validity", "≥99.5% accepted optional events; invalid separated", "Daily"],
  ["DQ-A02", "Duplicate rate", "≤1% after event_id/dedupe policy", "Daily"],
  ["DQ-A03", "Processing delay", "p95 ≤15 min for dashboard; documented outage otherwise", "Hourly"],
  ["DQ-A04", "Consent violation", "0 optional events from EssentialOnly", "Release + daily"],
  ["DQ-A05", "Identity/privacy", "0 raw query/PII/secret in payload", "CI + daily sample"],
  ["DQ-A06", "Reconciliation", "Client test log, ingest and aggregate agree within approved tolerance", "Release + weekly"],
] as const;

const del04Reviews = [
  ["REV-01", "Consent gate", "Keep optional analytics OFF until consent UI, withdrawal, retention, vendor and Legal gates pass.", "Approved"],
  ["REV-02", "Event catalog", "AN-E01—12 is the approved catalog; ad-hoc production events require schema/version/purpose/owner and change control.", "Approved"],
  ["REV-03", "Decision Intent", "Use Map/Call/Message as intent only; never present it as visit, booking or sale.", "Approved"],
  ["REV-04", "Retention/access", "Apply TEC-06 RET-03/08/09 and restricted role-based access; no raw search query.", "Approved"],
  ["REV-05", "Reporting", "Organic/Sponsored and observed/manual evidence stay separate; dashboard shows quality/consent state.", "Approved"],
] as const;

const operationsQueues = [
  ["OPS-Q01", "Content intake", "New Place/Source and duplicate candidates", "Content Editor", "Oldest/risk/launch-area"],
  ["OPS-Q02", "Publish review", "Readiness, attribution, trust/freshness and public preview", "Publisher", "No self-approval where conflict exists"],
  ["OPS-Q03", "Correction/support", "Owner/user request and evidence", "Support", "SLA clock; Needs Evidence pauses"],
  ["OPS-Q04", "Takedown/trust", "Rights, harmful/removed source, appeal", "Trust", "P0/P1 first; urgent safe-hide"],
  ["OPS-Q05", "Data quality", "Stale, failed source, retry/dead-letter and duplicate", "Content/Operations", "Risk then age"],
  ["OPS-Q06", "Campaign/partner", "Schedule, label, eligibility, performance summary", "Commercial", "Cannot alter verification/rating"],
  ["OPS-Q07", "Incident/technical", "Alert, outage, security and recovery task", "Operations/Platform", "S1—S4 severity"],
] as const;

const opsRoles = [
  ["content_editor", "Create/edit Place and Source Draft; submit review", "Cannot publish, decide trust case or manage access"],
  ["publisher", "Review readiness and publish/suspend/archive eligible content", "Cannot self-approve conflicted draft or manage secret/access"],
  ["support", "Handle assigned correction/support case and communication", "Cannot publish, make trust ruling or bulk export evidence"],
  ["trust", "Handle takedown/privacy/rights evidence, urgent hide and appeal workflow", "Cannot approve own appeal or commercial/finance/access"],
  ["commercial", "Manage Partner/Campaign Draft, schedule and approved report", "Cannot change organic rank, verification, review or trust decision"],
  ["finance", "Maintain revenue/expense/invoice evidence and verification", "Cannot mutate content, trust, access or audit"],
  ["auditor", "Read redacted audit/security/compliance evidence by purpose", "Cannot mutate business state or browse raw secret/evidence by default"],
  ["platform_admin", "Identity, role, deploy, backup and recovery", "Cannot self-approve routine content/commercial/trust decision"],
] as const;

const dailySop = [
  ["START", "Open shift", "Review handover, active incident, dashboard/alert, backup/WAL status and overdue queues", "Shift log opened"],
  ["TRUST", "Urgent safety/rights", "Process P0/P1 takedown, restricted leak, false disclosure and appeal", "Decision/evidence/audit linked"],
  ["CONTENT", "Inventory and publish", "Intake → duplicate → source → readiness → independent publish preview", "Place/Source audit and checked date"],
  ["QUALITY", "Freshness and failure", "Retry temporary source; classify unavailable; update stale field or queue", "No silent delete; task outcome"],
  ["SUPPORT", "Correction", "Acknowledge, validate evidence, partial decision, apply approved fields and reply", "Case state, SLA and audit"],
  ["COMMERCIAL", "Partner/campaign", "Verify window/label/eligibility; reconcile report; explain Decision Intent", "Commercial evidence separate from trust"],
  ["END", "Handover", "Summarize open S1/S2, overdue, blocked, change/release and next owner", "Named receiver and timestamp"],
] as const;

const operatingCadence = [
  ["Daily", "Queues, alert, backup/WAL, failed jobs, data freshness, consent/data-quality and handover"],
  ["Weekly", "Publish sample, correction/takedown SLA, event reconciliation, capacity, defect and partner summary"],
  ["Monthly", "Isolated PostgreSQL restore, access/secret/patch review, cost/capacity, incident trend and SOP drill"],
  ["Quarterly", "Access review, break-glass, evidence restore sample, clean-host reconstruction and vendor/risk review"],
] as const;

const operationsSlas = [
  ["OPS-Q01", "Content intake", "Acknowledge within 1 operating day; target first review within 2 operating days", "Missing evidence records a blocker; it does not silently stop the clock"],
  ["OPS-Q02", "Publish review", "Target review within 2 operating days after readiness passes", "Not Ready returns to owner with failed rule; no publication promise before readiness"],
  ["OPS-Q03", "Correction/support", "Acknowledge within 2 operating days; target initial decision within 5 operating days", "Needs Evidence pauses resolution target with reason and requested evidence"],
  ["OPS-Q04", "Takedown/trust", "P0 safe-hide immediately; P1 within 4 coverage hours; P2 within 1 operating day; P3 within 3 operating days", "Irreversible decision/appeal requires independent review; safe state remains while waiting"],
  ["OPS-Q05", "Data quality", "Unsafe/publicly wrong data safe-hides in current coverage window; High within 1 operating day; normal review weekly", "Retry/dead-letter never silently deletes the Source or Place"],
  ["OPS-Q06", "Campaign/partner", "Validate before scheduled start; missing Sponsored label pauses placement immediately", "Commercial priority cannot override trust, organic rank or evidence"],
  ["OPS-Q07", "Incident/technical", "S1 alert and safe automation 24×7; human acknowledgement ≤60 minutes during 08:00–22:00 ICT; outside hours best effort", "24×7 human SLA begins only after backup On-call or managed service is approved"],
] as const;

const del05Reviews = [
  ["REV-01", "Operating hours", "Normal human coverage is 08:00–22:00 ICT daily; alerts/safe automation are 24×7; no 24×7 human promise before backup On-call exists.", "Approved"],
  ["REV-02", "Segregation of duties", "Founder is sole operator and must record active role. QA, Security/Infrastructure, Legal and Accountant/Tax are VACANT — Gate blocker.", "Approved · Founder cannot manufacture independence by switching role labels."],
  ["REV-03", "Queue/SLA", "Run 10 normal cases plus incident/trust scenarios; S1 alert ≤5m, P0 safe-hide ≤15m and S1 human ≤60m during coverage.", "Approved · execution and independent verification pending."],
  ["REV-04", "Maintenance cadence", "Run isolated restore before Public Pilot and monthly; RPO ≤1h, RTO ≤8h and integrity journeys must pass.", "Approved · missed/failed drill blocks release."],
  ["REV-05", "Evidence/handover", "Central register uses Planned, Collected, Under Review, Verified, Rejected and Expired with named creator/reviewer and artifact hash.", "Approved · independent evidence cannot be self-Verified."],
] as const;

function Header({ code, title, lao, date = "30 AUGUST 2026", status = "0.3 · Capacity/Authority ອະນຸມັດ · External checkpoints VACANT · Execution evidence ຍັງຄົງຄ້າງ" }: { code: string; title: string; lao: string; date?: string; status?: string }) {
  return <header className={styles.formalDocumentHeader}><p>{code} · DELIVERY &amp; OPERATIONS · {date}</p><h1>{title}</h1><h2>{lao}</h2><span className={`${styles.formalStatus} ${styles.formalDraftStatus}`}>{status}</span></header>;
}

function Artifacts({ basePath, items }: { basePath: string; items: readonly (readonly [string,string,string])[] }) {
  return <div className={styles.architectureArtifacts}>{items.flatMap(([file,title,description])=>[
    <a key={`p-${file}`} href={`${basePath}/artifact-preview?file=${file}`}><b>ພຣີວິວ {title}</b><span>{description}</span></a>,
    <a key={`d-${file}`} href={`${basePath}/templates/${file}`} download><b>ດາວໂຫຼດ {title}</b><span>Working artifact · ມະຕິອະນຸມັດ · evidence ຍັງຄົງຄ້າງ</span></a>,
  ])}</div>;
}

function Reviews({ rows }: { rows: readonly (readonly [string,string,string,string])[] }) {
  return <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Topic</th><th>Approved decision</th><th>Resolution</th></tr></thead><tbody>{rows.map(([id,t,d,r])=><tr key={id}><td><code>{id}</code></td><td><strong>{t}</strong></td><td>{d}</td><td>{r}</td></tr>)}</tbody></table></div>;
}

function DevelopmentPlan({ basePath }: { basePath: string }) {
  const totalMin=effort.reduce((s,r)=>s+r[2],0), totalMax=effort.reduce((s,r)=>s+r[3],0);
  return <article className={styles.formalDocument}><Header code="DEL-01" title="Development Plan" lao="ແຜນພັດທະນາຈາກ Approved Baseline ຫາ Public Pilot" />
    <aside className={styles.formalDraftNotice}><strong>ຈຸດປະສົງ</strong><p>ປ່ຽນ 64 Functions, 9 Work Packages, Must Scope, Technical Stack ແລະ Security Gates ໃຫ້ເປັນລຳດັບສ້າງ, Capacity, Owner, Evidence ແລະ Go/No-Go. ບໍ່ສ້າງວັນ Launch ຈາກ ROM ໂດຍບໍ່ຮູ້ຄວາມສາມາດທີມ.</p></aside>
    <nav className={styles.formalToc}><h2>ສາລະບານ</h2><ol><li><a href="#del01-control">Control</a></li><li><a href="#del01-effort">Effort/Capacity</a></li><li><a href="#del01-phase">P0—P4</a></li><li><a href="#del01-team">Team/Cadence</a></li><li><a href="#del01-quality">Ready/Done/Change</a></li><li><a href="#del01-risk">Risk/Artifacts</a></li><li><a href="#del01-review">Review</a></li></ol></nav>
    <section id="del01-control" className={styles.formalSection}><h2><span>01</span> Document Control ແລະ Baseline</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody><tr><th>ID / status</th><td>DEL-01 · 0.3 · Capacity and Validation authority approved; independent checkpoints and execution evidence pending</td></tr><tr><th>Current operator</th><td>Founder ຄົນດຽວ; ບໍ່ສົມມຸດຊື່ທີມ ຫຼື reviewer ທີ່ຍັງບໍ່ມີ</td></tr><tr><th>Inputs</th><td>PRO-02/03/04 · TEC-01—06 · CON/UX handoff</td></tr><tr><th>Output</th><td>Capacity plan, ordered backlog, gates, role register, budget authority, delivery evidence and change control</td></tr></tbody></table></div><p>Approved planning range is <strong>{totalMin}–{totalMax} person-days</strong>. It includes work, review and evidence stated below; it excludes unknown vendor procurement, post-Pilot product expansion and calendar delay from unavailable capacity.</p><aside className={styles.formalDecision}><strong>ຂອບເຂດອະນຸມັດ</strong><p>ງົບ 25,000,000 ກີບອະນຸມັດສະເພາະ Validation Pilot 6 ອາທິດ. ມັນບໍ່ແມ່ນ Production Build Budget ແລະບໍ່ອະນຸຍາດໃຫ້ເລີ່ມ P0—P4. ຫຼັງ Validation ຕ້ອງມີມະຕິງົບໃໝ່.</p></aside></section>
    <section id="del01-effort" className={styles.formalSection}><h2><span>02</span> Effort, Capacity ແລະ Calendar Formula</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>WP</th><th>Outcome</th><th>Min</th><th>Max</th><th>Gate</th><th>Owner</th><th>Includes</th></tr></thead><tbody>{effort.map(([id,o,min,max,g,owner,scope])=><tr key={id}><td><code>{id}</code></td><td><strong>{o}</strong></td><td>{min}</td><td>{max}</td><td>{g}</td><td>{owner}</td><td>{scope}</td></tr>)}</tbody><tfoot><tr><th colSpan={2}>Total ROM</th><th>{totalMin}</th><th>{totalMax}</th><td colSpan={3}>person-days · not commitment</td></tr></tfoot></table></div><h3>2.1 Weekly productive capacity ທີ່ອະນຸມັດ</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Capacity bucket</th><th>Per week</th><th>Meaning</th></tr></thead><tbody>{weeklyCapacity.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p><strong>Calendar estimate = 75–110 person-days ÷ 4 productive days/week × 1.15 buffer = approximately 22–32 weeks.</strong> ນີ້ແມ່ນ planning range, ບໍ່ແມ່ນ Launch commitment. WIP limit ແມ່ນ <strong>1 Primary Function + 1 Operations/Defect</strong>; ວຽກໃໝ່ບໍ່ເຂົ້າຈົນວຽກເກົ່າ Done ຫຼືຖືກບັນທຶກວ່າ Blocked.</p></section>
    <section id="del01-phase" className={styles.formalSection}><h2><span>03</span> Delivery Gates P0—P4 ແລະ Ordered Backlog</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Gate</th><th>Outcome</th><th>Work</th><th>Scope</th><th>Exit evidence</th></tr></thead><tbody>{phasePlan.map(([id,o,w,s,e])=><tr key={id}><td><code>{id}</code></td><td><strong>{o}</strong></td><td>{w}</td><td>{s}</td><td>{e}</td></tr>)}</tbody></table></div><aside className={styles.formalDecision}><strong>Dependency order</strong><p>WP-01 → WP-02A → WP-03 → WP-02B → WP-04 → WP-05/06 → WP-07/08 → WP-09. Duplicate Merge/Redirect follows first publish; analytics capture may use no-op sink until consent gate, but failure must never block Guest action.</p></aside><h3>3.1 Development starting backlog</h3><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Outcome</th><th>Gate</th><th>Depends on</th><th>Exit evidence</th></tr></thead><tbody>{backlogItems.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div></section>
    <section id="del01-team" className={styles.formalSection}><h2><span>04</span> Team, Ownership ແລະ Cadence</h2><h3>4.1 Target operating model</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Role</th><th>Accountability</th><th>Separation/control</th></tr></thead><tbody>{teamModel.map(([r,a,c])=><tr key={r}><td><strong>{r}</strong></td><td>{a}</td><td>{c}</td></tr>)}</tbody></table></div><h3>4.2 Current named-role register</h3><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>Role</th><th>Current assignee</th><th>Status</th><th>Authority / blocker</th></tr></thead><tbody>{currentRoleAssignments.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>Founder ສາມາດສ້າງ, ທົດສອບ ແລະເກັບຫຼັກຖານໄດ້, ແຕ່ຫຼັກຖານ QA/Security/Legal ທີ່ຕ້ອງການຄວາມເປັນອິດສະຫຼະບໍ່ສາມາດເປັນ Verified ໂດຍ Founder ເອງ. Gate ຈະຢູ່ Blocked ແລະລະບົບຄົງສະພາບປອດໄພ.</p><h3>4.3 Cadence</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Control</th><th>When</th><th>Required output</th><th>Owner</th></tr></thead><tbody>{deliveryCadence.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div></section>
    <section id="del01-quality" className={styles.formalSection}><h2><span>05</span> Definition of Ready, Done ແລະ Change</h2><h3>Ready</h3><ul className={styles.formalPlainList}><li>Requirement/Function/Workflow ID, outcome, dependency and owner are known.</li><li>Acceptance and controlled fixture exist; UX/API/data contract is stable enough to implement.</li><li>Estimate includes code, review, test, evidence, documentation and migration/operations work.</li><li>Secret/vendor/legal decision is either resolved or explicitly blocks start.</li></ul><h3>Done</h3><ul className={styles.formalPlainList}><li>Acceptance and negative/security paths pass; code review and migration compatibility complete.</li><li>Observability, audit, error/fallback, runbook and evidence are updated where affected.</li><li>No open blocking defect; change is demonstrable from approved environment/build/fixture.</li></ul><h3>Change control</h3><p>Every scope/stack/gate/date/budget change records request, reason, alternatives, person-day/cash/runway/risk impact, affected documents, decision owner and effective baseline. Emergency change is retrospectively documented within one business day.</p></section>
    <section id="del01-risk" className={styles.formalSection}><h2><span>06</span> Risk, Budget Authority ແລະ Evidence</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Risk</th><th>Level</th><th>Control</th><th>Owner</th></tr></thead><tbody>{deliveryRisks.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><h3>6.1 Budget authority</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Amount / scope</th><th>Authority</th><th>Required evidence</th></tr></thead><tbody>{budgetAuthority.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><h3>6.2 Central Execution Evidence Register</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Status</th><th>Meaning</th></tr></thead><tbody>{evidenceStatuses.map(([s,m])=><tr key={s}><th>{s}</th><td>{m}</td></tr>)}</tbody></table></div><p>Every evidence row names Gate/Control/Requirement, environment, commit and image digest, fixture, expected/actual result, creator, reviewer, timestamp, artifact reference/hash, expiry and defect/exception. Founder-produced independent QA/Security evidence cannot become <strong>Verified</strong> while the reviewer is VACANT.</p><Artifacts basePath={basePath} items={[["del01-development-plan-baseline-2026-08-30.json","Delivery Baseline JSON","Gate, effort, capacity, RACI, change and decision"],["del01-work-package-plan-2026-08-30.csv","Work Package CSV","Estimate, dependency, owner, gate, evidence and status"],["del-role-capacity-authority-register-2026-08-30.csv","Role, Capacity & Authority Register","Founder assignments, vacant blockers, weekly capacity and spending authority"],["del-execution-evidence-register-2026-08-30.csv","Execution Evidence Register","Central gate/control/result/reviewer status of record"]]} /></section>
    <section id="del01-review" className={styles.formalSection}><h2><span>07</span> ມະຕິທົບທວນ 5 ຂໍ້</h2><Reviews rows={del01Reviews} /><aside className={styles.formalDraftNotice}><strong>ຂໍ້ຄົງຄ້າງກ່ອນ 1.0</strong><p>Weekly capacity, Founder roles ແລະ Validation authority ປິດມະຕິແລ້ວ. ສິ່ງທີ່ຍັງ Blocked ແມ່ນ QA, Security/Infrastructure, Legal ແລະ Accountant/Tax reviewer ທີ່ເປັນ VACANT, Production budget ທີ່ຕ້ອງອະນຸມັດໃໝ່ ແລະ execution evidence ທີ່ຍັງບໍ່ໄດ້ປະຕິບັດ. ຈຶ່ງຍັງບໍ່ສ້າງ Launch date ຫຼື Go-Live approval.</p></aside></section>
    <nav className={styles.docPagination}><a href={`${basePath}/documents/security-infrastructure`}><small>← PREVIOUS</small><strong>TEC-06 · Security/Infrastructure</strong></a><a href={`${basePath}/documents/test-uat`}><small>NEXT →</small><strong>DEL-02 · Test &amp; UAT</strong></a></nav>
  </article>;
}

function TestUat({ basePath }: { basePath: string }) {
  return <article className={styles.formalDocument}><Header code="DEL-02" title="Test & UAT Plan" lao="ແຜນທົດສອບ, ຫຼັກຖານ ແລະການຮັບມອບ" />
    <aside className={styles.formalDraftNotice}><strong>ຈຸດປະສົງ</strong><p>ກຳນົດວ່າຈະພິສູດ Requirement, Security, Performance, Recovery ແລະວຽກ Admin/Guest ແນວໃດ. “ເປີດໄດ້” ຫຼື “ທົດສອບແລ້ວ” ບໍ່ພຽງພໍຖ້າບໍ່ມີ Build, Fixture, Result ແລະ Approver.</p></aside>
    <section className={styles.formalSection}><h2><span>01</span> Control ແລະ Strategy</h2><p>DEL-02 operationalizes PRO-04’s 13 Requirements/46 Criteria, PRO-02 traceability, PERF-01—04, TEC-05 QG-S01—08 and TEC-06 G-SEC-01—08. Risk-based depth increases for authorization, public/restricted data boundary, rights, audit/outbox, analytics consent and recovery.</p><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Level</th><th>Type</th><th>Coverage</th><th>Owner</th><th>When</th></tr></thead><tbody>{testLevels.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div></section>
    <section className={styles.formalSection}><h2><span>02</span> Environment, Fixture ແລະ Test Data</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Fixture</th><th>Coverage</th></tr></thead><tbody>{fixtures.map(([id,n,c])=><tr key={id}><td><code>{id}</code></td><td><strong>{n}</strong></td><td>{c}</td></tr>)}</tbody></table></div><ul className={styles.formalPlainList}><li>Fixtures are versioned, resettable and synthetic/sanitized; Production PII is never copied directly.</li><li>External provider tests use recorded approved fixtures plus limited controlled live checks; flaky live behavior cannot silently pass.</li><li>Every test result records Test Case, Requirement, environment, build digest, fixture version, expected/actual, defect and tester.</li></ul></section>
    <section className={styles.formalSection}><h2><span>03</span> Required Suites ແລະ Non-functional Gates</h2><p>Every PR runs T1/T2 and affected T3. Nightly runs full integration and selected E2E. Release candidate runs regression, UAT seed, performance, accessibility, security, migration/rollback and recovery suites.</p><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Measure</th><th>Pilot threshold</th><th>Fail result</th></tr></thead><tbody><tr><td>PERF-01</td><td>First useful content</td><td>≤3 seconds</td><td>Block NFR-02</td></tr><tr><td>PERF-02</td><td>Place core data</td><td>≤2.5 seconds</td><td>Block NFR-02</td></tr><tr><td>PERF-03</td><td>Interaction feedback</td><td>≤300 ms</td><td>Defect by impact</td></tr><tr><td>PERF-04</td><td>Media timeout fallback</td><td>≤4 seconds</td><td>Block media recovery</td></tr></tbody></table></div><p>Performance runs on a defined mid-range Android/mobile viewport and simulated normal 4G from Lao/SEA path. Security/recovery result cannot be replaced by screenshots; use scan/test/config/restore evidence.</p></section>
    <section className={styles.formalSection}><h2><span>04</span> Defect, Regression ແລະ Deviation</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Severity</th><th>Meaning</th><th>Release rule</th></tr></thead><tbody>{defects.map(([s,m,r])=><tr key={s}><th>{s}</th><td>{m}</td><td>{r}</td></tr>)}</tbody></table></div><p>Every fix has cause, affected Requirement/Function, regression cases and retest evidence. A deviation includes owner, reason, user/risk impact, compensating control, expiry and explicit approvers; expired deviation automatically blocks the next release.</p></section>
    <section className={styles.formalSection}><h2><span>05</span> UAT Journeys and Sign-off</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Journey</th><th>Must demonstrate</th></tr></thead><tbody>{uatJourneys.map(([id,j,m])=><tr key={id}><td><code>{id}</code></td><td><strong>{j}</strong></td><td>{m}</td></tr>)}</tbody></table></div><ol className={styles.formalNumberList}><li>QA prepares build/fixture/case and confirms no blocking regression.</li><li>Business/Operations user executes without developer steering; actual result and defect are recorded.</li><li>Tech Lead signs technical quality; Operations signs readiness; Product Owner accepts/rejects or approves a time-bound deviation.</li><li>Evidence lives under versioned UAT path and is immutable after sign-off; correction creates a new revision.</li></ol></section>
    <section className={styles.formalSection}><h2><span>06</span> Exit Criteria and Artifacts</h2><ul className={styles.formalPlainList}><li>All Must criteria and seven UAT journeys pass; Critical/High open count = 0.</li><li>Performance, accessibility, security, backup/restore, rollback and monitoring evidence pass.</li><li>Test coverage maps every Must Requirement to case/result/evidence; known limitations and Medium/Low defects are signed.</li><li>Operations accepts runbook, access, queues, alerts, handover and support path.</li></ul><Artifacts basePath={basePath} items={[["del02-test-uat-baseline-2026-08-30.json","Test Baseline JSON","Levels, fixture, gate, defect and authority"],["del02-uat-test-register-2026-08-30.csv","UAT Register CSV","Journey, case, fixture, expected/actual, defect, result and sign-off"]]} /></section>
    <section className={styles.formalSection}><h2><span>07</span> ມະຕິທົບທວນ 5 ຂໍ້</h2><Reviews rows={del02Reviews} /><aside className={styles.formalDraftNotice}><strong>Execution evidence ຍັງບໍ່ແມ່ນ “ຜ່ານ”</strong><p>Founder ສາມາດ execute Test/UAT ແລະເກັບ Actual Result ໄດ້, ແຕ່ QA Reviewer ຍັງເປັນ <strong>VACANT — Gate blocker</strong>. Test/UAT Result ຈຶ່ງບໍ່ສາມາດເປັນ Verified ຈົນມີ independent reviewer ກວດ Build, Fixture, Actual Result, Defect ແລະ evidence.</p></aside></section>
    <nav className={styles.docPagination}><a href={`${basePath}/documents/development-plan`}><small>← PREVIOUS</small><strong>DEL-01 · Development Plan</strong></a><a href={`${basePath}/documents/release-monitoring`}><small>NEXT →</small><strong>DEL-03 · Release &amp; Monitoring</strong></a></nav>
  </article>;
}

function ReleaseMonitoring({ basePath }: { basePath: string }) {
  return <article className={styles.formalDocument}><Header code="DEL-03" title="Deployment, Release & Monitoring" lao="ວິທີນຳສົ່ງ, ກວດສອບ, ຍ້ອນກັບ ແລະຮັບມືເຫດການ" />
    <aside className={styles.formalDraftNotice}><strong>ຈຸດປະສົງ</strong><p>ໃຫ້ທຸກ Release ຮູ້ Source, Image Digest, Migration, Approver, Backup, Smoke, Observation, Rollback ແລະ Incident path. OVH Single-host Pilot ບໍ່ອ້າງ Zero-downtime ຫຼື High Availability.</p></aside>
    <section className={styles.formalSection}><h2><span>01</span> Environment and Promotion</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Environment</th><th>Purpose</th><th>Data</th><th>Boundary</th><th>Owner</th></tr></thead><tbody>{environments.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>Source commit produces one scanned OCI image and SBOM. The same digest is promoted Test → Pilot → Production with environment configuration outside the image. Production deploy requires protected authority and cannot use a developer-local build.</p></section>
    <section className={styles.formalSection}><h2><span>02</span> CI/CD Gates</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Stage</th><th>Checks</th><th>Pass</th></tr></thead><tbody>{pipeline.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>Required CI cannot be bypassed by changing a workflow in the same unreviewed change. Emergency release still records authorizer, reason, minimal tests, observation and retrospective within one business day.</p></section>
    <section className={styles.formalSection}><h2><span>03</span> Release Runbook</h2><ol className={styles.formalNumberList}><li><strong>Plan:</strong> name release commander, change set, risk, affected contracts, maintenance/communication and rollback trigger.</li><li><strong>Prepare:</strong> verify gate/sign-off, current backup/WAL, disk reserve, secret/config, image digest and migration plan.</li><li><strong>Protect:</strong> announce maintenance if needed; pause worker/write where migration requires; record start timestamp.</li><li><strong>Migrate/deploy:</strong> run one-shot migration with lock/time; deploy pinned digest through Compose; Caddy remains only public ingress.</li><li><strong>Verify:</strong> health, OIDC, Admin negative auth, audit/outbox, Published boundary, Feed/Search/Place/Intent and external HTTPS.</li><li><strong>Observe:</strong> watch ALT-01—08, error/latency/queue/data-quality for approved window; record decision.</li><li><strong>Close or recover:</strong> resume work, communicate and close evidence, or rollback/forward-fix under incident authority.</li></ol></section>
    <section className={styles.formalSection}><h2><span>04</span> Migration, Rollback and Recovery</h2><p>Database change is forward-compatible across one release where possible: expand → deploy → backfill → contract later. Backup precedes destructive migration. Application rollback uses previous approved image/config only if schema remains compatible; data restore is not a routine undo and requires incident/recovery authority.</p><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Trigger</th><th>Action</th><th>Authority</th></tr></thead><tbody><tr><td>Smoke/health fails before traffic</td><td>Stop release; restore previous image/config; verify</td><td>Release Commander</td></tr><tr><td>Error/latency or Must journey regression</td><td>Pause writes/worker if needed; rollback or forward-fix by safest path</td><td>Tech + Operations</td></tr><tr><td>Data integrity/restricted leak</td><td>S1, safe-hide/revoke, preserve evidence; restore only by DR runbook</td><td>Incident Commander</td></tr><tr><td>Migration irreversible/unknown</td><td>No-Go until backup, restore and forward repair are proven</td><td>Tech + Product + Operations</td></tr></tbody></table></div><h3>4.1 Restore test ທີ່ບັງຄັບ</h3><ol className={styles.formalNumberList}><li>Run once before Public Pilot and repeat monthly; a missed or failed drill blocks release.</li><li>Select a recorded base backup and WAL/recovery point; never overwrite the active Production database.</li><li>Restore into an isolated environment with separate credentials/network and record start/end timestamps.</li><li>Verify schema/migration, row counts and checksums, audit/outbox consistency, OIDC/Admin access and critical Guest journeys.</li><li>Pass only when measured <strong>RPO ≤1 hour</strong> and <strong>RTO ≤8 hours</strong>, no integrity error exists and cleanup is recorded.</li><li>Founder executes and collects evidence. Security/Infrastructure Reviewer remains <strong>VACANT — Gate blocker</strong>, so G-SEC/Go-Live cannot be independently Verified yet.</li></ol></section>
    <section className={styles.formalSection}><h2><span>05</span> Monitoring, Alert and Incident</h2><p>Pino/OpenTelemetry → Grafana Alloy → Grafana Cloud. Application log, append-only Audit and required Security Event remain separate. Alert delivery and approved automated safe action run 24×7. Human coverage is 08:00–22:00 ICT daily and commits to acknowledge S1 within 60 minutes only inside that window. Outside the window, delivery continues and response is best effort until a second On-call person or managed service is approved; the Platform must not claim a 24×7 human SLA before then.</p><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Signal</th><th>Condition</th><th>Response</th></tr></thead><tbody>{alerts.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>Incident lifecycle: detect/triage → contain → preserve evidence → eradicate/recover → fact-based communication → review within five business days. Monitoring silence itself generates ALT-08.</p></section>
    <section className={styles.formalSection}><h2><span>06</span> Release Evidence and Artifacts</h2><ul className={styles.formalPlainList}><li>Commit, digest, SBOM/scans, environment, migration, backup ID, test/UAT, approvers and release timestamps.</li><li>Smoke/monitoring screenshots alone are supporting evidence; retain machine results, log/trace/query references and decision.</li><li>No-Go: open S1/Critical, unauthorized Admin, public DB/evidence, invalid restore point, failed migration/rollback, missing audit or unresolved consent behavior.</li></ul><Artifacts basePath={basePath} items={[["del03-release-monitoring-baseline-2026-08-30.json","Release Baseline JSON","Environment, CI/CD, monitoring, incident and authority"],["del03-release-checklist-2026-08-30.csv","Release Checklist CSV","Preflight, deploy, verify, observe, rollback and evidence"],["del03-restore-test-record-2026-08-30.csv","Restore Test Record","Isolated restore, integrity, measured RPO/RTO, result and reviewer"],["tec06-backup-restore-runbook-template-2026-08-30.json","Backup & Restore Runbook","Execution procedure and recovery control contract"]]} /></section>
    <section className={styles.formalSection}><h2><span>07</span> ມະຕິທົບທວນ 5 ຂໍ້</h2><Reviews rows={del03Reviews} /><aside className={styles.formalDraftNotice}><strong>ຂອບເຂດ Pilot</strong><p>Single-host ຍອມຮັບ Planned Maintenance ແລະບໍ່ອ້າງ HA/Zero-downtime. 24×7 human response ເປັນ Expansion Trigger ທີ່ຈະເປີດຫຼັງຈາກມີ backup On-call ຫຼື Managed Service.</p></aside></section>
    <nav className={styles.docPagination}><a href={`${basePath}/documents/test-uat`}><small>← PREVIOUS</small><strong>DEL-02 · Test &amp; UAT</strong></a><a href={`${basePath}/documents/analytics-plan`}><small>NEXT →</small><strong>DEL-04 · Analytics Plan</strong></a></nav>
  </article>;
}

function AnalyticsPlan({ basePath }: { basePath: string }) {
  return <article className={styles.formalDocument}><Header code="DEL-04" title="Analytics Tracking Plan" lao="ແຜນ Event, Funnel, Data Quality ແລະ Privacy-safe Reporting" />
    <aside className={styles.formalDraftNotice}><strong>Fail-safe baseline</strong><p>Optional Analytics ຍັງປິດຈົນ Consent, Withdrawal, Vendor, Retention ແລະ Legal gate ຜ່ານ. Core Guest journey ຕ້ອງໃຊ້ໄດ້ໃນ EssentialOnly; raw search query, PII, secret ແລະ evidence body ຫ້າມເຂົ້າ Event.</p></aside>
    <section className={styles.formalSection}><h2><span>01</span> Measurement Contract</h2><p>DEL-04 measures Discover → Consider → Decision Intent and operational quality. It does not claim a verified visit, reservation or sale. Every event has ID/name, version, purpose, consent class, trigger, allowlisted fields, dedupe rule, owner, retention and validation.</p><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Event</th><th>Consent</th><th>Surface</th><th>Allowed properties</th><th>Guardrail</th></tr></thead><tbody>{analyticsEvents.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div></section>
    <section className={styles.formalSection}><h2><span>02</span> Trigger, Session and Deduplication</h2><ul className={styles.formalPlainList}><li>Event emits only after the user-visible action/outcome occurs; pre-render does not count as impression.</li><li>Anonymous session is rotated/expired under TEC-06; no cross-device identity or fingerprinting.</li><li><code>event_id</code> is unique; Decision Intent deduplicates by anonymous session + Place + action family within seven days.</li><li>Test/bot/internal traffic has explicit marker and is excluded from business dashboard but retained in QA evidence.</li><li>Client retry is idempotent; analytics failure never blocks navigation, Map, Call or Message.</li></ul><p>Context uses approved IDs and bounded enums. Raw URL may be normalized to provider/source ID; free text, phone content, message body, precise device fingerprint and raw IP are not analytic properties.</p></section>
    <section className={styles.formalSection}><h2><span>03</span> Funnel and Attribution</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Metric</th><th>Formula</th><th>Rule</th></tr></thead><tbody>{funnel.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>Attribution window and campaign eligibility are evaluated at event time. Sponsored and organic exposure/results are separate dimensions. Manual shop follow-up is reported as supplementary observed evidence, never merged silently into platform Decision Intent.</p></section>
    <section className={styles.formalSection}><h2><span>04</span> Privacy, Retention and Access</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody><tr><th>Optional raw event</th><td>RET-03 · 90 days only after legal/consent gate</td></tr><tr><th>Aggregate</th><td>12 months, non-identifying and purpose-bound</td></tr><tr><th>Application log/trace</th><td>RET-08 · 30-day log / 14-day trace; not analytics source by default</td></tr><tr><th>Security event</th><td>RET-09; restricted and not mixed with marketing/product analytics</td></tr><tr><th>Access</th><td>Role/purpose-based aggregate; event-level export disabled by default and audited</td></tr><tr><th>Withdrawal</th><td>Stops future optional events; deletion follows policy and feasible identifier boundary</td></tr></tbody></table></div></section>
    <section className={styles.formalSection}><h2><span>05</span> Data Quality and Dashboard</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Control</th><th>Threshold</th><th>Review</th></tr></thead><tbody>{dataQuality.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>Every dashboard shows time window, timezone Asia/Vientiane, consent mode, data freshness, excluded test/bot count and quality flags. Minimum views: Product Funnel, Search Quality, Place/Source, Partner/Sponsored, Operations/Data Quality and Consent/Privacy.</p></section>
    <section className={styles.formalSection}><h2><span>06</span> Release Gate and Artifacts</h2><ul className={styles.formalPlainList}><li>Schema/catalog, client trigger and server validator match same version.</li><li>EssentialOnly emits no optional event; consent change and withdrawal tests pass.</li><li>QA action log reconciles with accepted, rejected, duplicate and aggregate counts.</li><li>Retention/purge and restricted access evidence pass before optional production collection.</li></ul><Artifacts basePath={basePath} items={[["del04-analytics-baseline-2026-08-30.json","Analytics Baseline JSON","Consent, session, funnel, retention, dashboard and gate"],["del04-analytics-event-catalog-2026-08-30.csv","Event Catalog CSV","Trigger, properties, consent, dedupe, retention, owner and status"]]} /></section>
    <section className={styles.formalSection}><h2><span>07</span> ມະຕິທົບທວນ 5 ຂໍ້</h2><Reviews rows={del04Reviews} /><aside className={styles.formalDraftNotice}><strong>Privacy-safe default</strong><p>ອະນຸມັດແຜນ Event/Funnel ບໍ່ໄດ້ໝາຍຄວາມວ່າອະນຸຍາດເກັບ Optional Analytics. Legal Reviewer ຍັງເປັນ <strong>VACANT — Gate blocker</strong>; ລະບົບຕ້ອງຄົງ EssentialOnly ຈົນ Consent, Withdrawal, Retention, Access, Vendor ແລະ Legal evidence ຜ່ານ.</p></aside></section>
    <nav className={styles.docPagination}><a href={`${basePath}/documents/release-monitoring`}><small>← PREVIOUS</small><strong>DEL-03 · Release &amp; Monitoring</strong></a><a href={`${basePath}/documents/admin-operations`}><small>NEXT →</small><strong>DEL-05 · Admin &amp; Operations SOP</strong></a></nav>
  </article>;
}

function AdminOperations({ basePath }: { basePath: string }) {
  return <article className={styles.formalDocument}><Header code="DEL-05" title="Admin & Operations SOP" lao="ຄູ່ມືວຽກປະຈຳວັນ, Queue, Escalation ແລະ Handover" />
    <aside className={styles.formalDraftNotice}><strong>ຈຸດປະສົງ</strong><p>ໃຫ້ Admin ຮູ້ວ່າຈະເລີ່ມວຽກຈາກ Queue ໃດ, ກວດຫຍັງ, ໃຜອະນຸມັດ, ເມື່ອໃດຕ້ອງຢຸດ/ຍົກລະດັບ ແລະຫຼັກຖານຫຍັງຕ້ອງສົ່ງຕໍ່.</p></aside>
    <section className={styles.formalSection}><h2><span>01</span> Roles and Operating Boundary</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Role</th><th>Routine authority</th><th>Must not do</th></tr></thead><tbody>{opsRoles.map(([r,a,c])=><tr key={r}><td><code>{r}</code></td><td>{a}</td><td>{c}</td></tr>)}</tbody></table></div><h3>1.1 Current people and checkpoints</h3><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>Role</th><th>Current assignee</th><th>Status</th><th>Authority / blocker</th></tr></thead><tbody>{currentRoleAssignments.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>Every Admin uses a named OIDC/MFA account. Shared account, copied secret, direct database change and untracked evidence export are prohibited. Privileged action uses step-up and append-only audit.</p><aside className={styles.formalDecision}><strong>Solo-Founder Pilot control</strong><p>ປັດຈຸບັນມີ Founder ພຽງຄົນດຽວ. System roles ຍັງແຍກກັນ ແລະທຸກ action ບັນທຶກ active role. Routine low-risk self-review ຕ້ອງ flag ໄວ້. P0 safe-hide ເຮັດໄດ້ທັນທີ, ແຕ່ irreversible deletion, appeal, security exception, Public Pilot ແລະ material financial/access decision ຕ້ອງຢຸດຢູ່ safe/restricted state ຈົນ independent checkpoint ທີ່ເປັນ VACANT ຖືກຕື່ມ.</p></aside></section>
    <section className={styles.formalSection}><h2><span>02</span> Work Queues and Pilot SLA</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Queue</th><th>Contains</th><th>Owner</th><th>Priority</th></tr></thead><tbody>{operationsQueues.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>Queue item contains case/task ID, entity, source, severity/SLA, owner, state, blockers, last action, next action and audit/evidence reference. Personal chat or memory is not the queue of record.</p><h3>2.1 SLA target ສຳລັບ Pilot</h3><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Queue</th><th>Response/target</th><th>Pause/escalation rule</th></tr></thead><tbody>{operationsSlas.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>These are operational targets, not an unconditional customer guarantee. Measure attainment for the first 30 operating days, then re-baseline through a recorded decision.</p><h3>2.2 SLA rehearsal before Pilot</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Round</th><th>Controlled scope</th><th>Pass criteria</th></tr></thead><tbody>{slaRehearsalRounds.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><p>ທັງສອງຮອບຕ້ອງບໍ່ມີ case ຫາຍ, ບໍ່ມີ irreversible self-approval ທີ່ບໍ່ມີອຳນາດ ແລະ 100% ຂອງ case ມີ required fields. Founder ເຮັດ rehearsal ໄດ້, ແຕ່ independent acceptance ຍັງ Blocked ຈົນ QA/Security reviewer ມີຕົວຈິງ.</p></section>
    <section className={styles.formalSection}><h2><span>03</span> Daily Workflow</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Stage</th><th>Work</th><th>Procedure</th><th>Evidence</th></tr></thead><tbody>{dailySop.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div></section>
    <section className={styles.formalSection}><h2><span>04</span> Place/Source Publish SOP</h2><ol className={styles.formalNumberList}><li>Search canonical records and evaluate duplicate candidate before creating a Place.</li><li>Create Draft with required source, category, area, contact/map, freshness and Unknown label where evidence is absent.</li><li>Register canonical social URL, validate provider/availability, attribute creator and keep Open Original fallback; never re-host video.</li><li>Resolve duplicate/readiness errors; preview public DTO and confirm no restricted field/evidence appears.</li><li>Publisher independently checks PUB-01—06, trust/freshness/partner/Sponsored separation and publishes with reason/audit.</li><li>Verify Feed/Search/Place, link/action targets and monitoring; failed verification suspends or returns to Draft according to state rule.</li></ol></section>
    <section className={styles.formalSection}><h2><span>05</span> Correction, Takedown and Escalation</h2><p>Correction acknowledges request, validates requester/evidence, allows approve/reject/needs-evidence per item, applies approved fields through normal validation and communicates a reasoned outcome. Takedown/rights/safety uses CON-04 P0—P3; P0 safe-hides immediately without deleting audit/evidence.</p><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Severity</th><th>Example</th><th>Operations response</th></tr></thead><tbody>{defects.map(([s,m,r])=><tr key={s}><th>{s}</th><td>{m}</td><td>{r}</td></tr>)}</tbody></table></div><p>S1 alert delivery and safe automation remain 24×7. Human acknowledgement ≤60 minutes applies during 08:00–22:00 ICT; outside this window response is best effort until backup On-call/managed service is approved. Preserve evidence before destructive recovery and communicate confirmed facts only.</p></section>
    <section className={styles.formalSection}><h2><span>06</span> Commercial and Reporting Boundary</h2><ul className={styles.formalPlainList}><li>Commercial creates Partner/Campaign Draft; authorized activation requires dates, eligible Place, approved placement and visible Sponsored label.</li><li>Payment/partner status never changes organic rank, verification, review score or trust decision.</li><li>Performance Summary identifies window, definitions, consent/data-quality state and states Decision Intent is not a verified visit/sale.</li><li>Invoice/payment evidence is separate from content/trust record and available only to appropriate Finance/Commercial role.</li></ul></section>
    <section className={styles.formalSection}><h2><span>07</span> Maintenance, Handover and Evidence</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Cadence</th><th>Controls</th></tr></thead><tbody>{operatingCadence.map(([c,w])=><tr key={c}><th>{c}</th><td>{w}</td></tr>)}</tbody></table></div><p>Handover names open incident, overdue queue, release/change, temporary access/exception, blocked item, next action, owner and due time. Material decisions remain in system record, not only chat. SOP revision is versioned and operators acknowledge training.</p><p>Execution evidence uses the central register. Each item remains Planned/Collected/Under Review until an authorized reviewer changes it to Verified; evidence may also be Rejected or Expired. Founder cannot use a second role label to create artificial independence.</p><Artifacts basePath={basePath} items={[["del05-admin-operations-baseline-2026-08-30.json","Operations Baseline JSON","Role, queue, daily SOP, escalation, cadence and handover"],["del05-operations-checklist-2026-08-30.csv","Operations Checklist CSV","Daily/weekly/monthly/quarterly control and evidence"],["del05-sla-rehearsal-register-2026-08-30.csv","SLA Rehearsal Register","Normal and incident/trust cases with measured result and evidence"]]} /></section>
    <section className={styles.formalSection}><h2><span>08</span> ມະຕິທົບທວນ 5 ຂໍ້</h2><Reviews rows={del05Reviews} /><aside className={styles.formalDraftNotice}><strong>ກ່ອນ 1.0</strong><p>Founder roles ລະບຸແລ້ວ; external checkpoints ລະບຸຢ່າງຊື່ສັດເປັນ <strong>VACANT — Gate blocker</strong>. ຕ້ອງ execute SLA rehearsal 2 ຮອບ, monthly timed restore, incident/handover drill ແລະເກັບ evidence. ຈາກນັ້ນ QA/Security reviewer ທີ່ເປັນອິດສະຫຼະຈຶ່ງສາມາດ Verify; ມະຕິອະນຸມັດແຜນບໍ່ແມ່ນຫຼັກຖານວ່າ control ຜ່ານແລ້ວ.</p></aside></section>
    <nav className={styles.docPagination}><a href={`${basePath}/documents/analytics-plan`}><small>← PREVIOUS</small><strong>DEL-04 · Analytics Plan</strong></a><a href={`${basePath}/documents/validation-pilot`}><small>NEXT →</small><strong>DEL-06 · Validation Pilot</strong></a></nav>
  </article>;
}

function ValidationPilot({ basePath }: { basePath: string }) {
  return <article className={styles.formalDocument}><Header code="DEL-06" title="Validation Pilot Execution Plan" lao="ແຜນດຳເນີນງານທົດລອງ 6 ອາທິດສຳລັບ Founder ຄົນດຽວ" date="31 AUGUST 2026" status="0.1 · Ready to execute · Actual results ຍັງບໍ່ເລີ່ມ" />
    <aside className={styles.formalDraftNotice}><strong>ຈຸດປະສົງ</strong><p>ເອກະສານນີ້ປ່ຽນ Conditional GO ຈາກ BUS-04/05/06 ໃຫ້ເປັນວຽກທີ່ Founder ເຮັດໄດ້ຈິງພາຍໃນ 6 ອາທິດ, 32 ຊົ່ວໂມງຕໍ່ອາທິດ ແລະເພດານ 25 ລ້ານກີບ. ຈຸດປາຍທາງແມ່ນຫຼັກຖານ GO/PIVOT/NO-GO—ບໍ່ແມ່ນ software Production ຫຼື Public Launch.</p></aside>
    <nav className={styles.formalToc}><h2>ສາລະບານ</h2><ol><li><a href="#del06-control">Control</a></li><li><a href="#del06-targets">Targets</a></li><li><a href="#del06-calendar">Six-week calendar</a></li><li><a href="#del06-budget">Budget</a></li><li><a href="#del06-gates">Gates</a></li><li><a href="#del06-evidence">Evidence</a></li><li><a href="#del06-decision">Final decision</a></li></ol></nav>
    <section id="del06-control" className={styles.formalSection}><h2><span>01</span> Document Control ແລະ Execution Boundary</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody><tr><th>ID / status</th><td>DEL-06 · 0.1 · Ready to execute; no actual result yet</td></tr><tr><th>Accountable / operator</th><td>Founder ຄົນດຽວ ເປັນ Product, Research, Content, Technical, Finance Record ແລະ Decision Owner</td></tr><tr><th>Duration / capacity</th><td>6 weeks · 4 productive person-days / 32 hours per week · one weekday uncommitted</td></tr><tr><th>WIP rule</th><td>1 Primary Validation Experiment + 1 Operations/Evidence item</td></tr><tr><th>Inputs</th><td>BUS-04 Feasibility · BUS-05 Financial Structure · BUS-06 Revenue/KPI · PRO-03 MVP · CON-02/04 · UX-03 · DEL-01</td></tr><tr><th>Output</th><td>Controlled evidence pack and G6 GO/PIVOT/NO-GO decision</td></tr></tbody></table></div><h3>1.1 In scope</h3><ul className={styles.formalPlainList}><li>Problem interview, Place/Source curation, controlled prototype testing and technical/policy spike.</li><li>Founding Partner Pilot pre-sell at approved test price 200,000 LAK/month.</li><li>Manual evidence collection, cost/time measurement and bounded adjustments inside the approved experiment.</li></ul><h3>1.2 Non-goals</h3><ul className={styles.formalPlainList}><li>No Production backend, Public Pilot, booking, creator marketplace or full Sponsored sale.</li><li>No claim that Decision Intent is a verified visit/sale; no location tracking.</li><li>No hiring, Production budget, long-term vendor commitment or use of the separate 75m LAK personal reserve/obligations.</li><li>Sponsored 1,000,000 LAK remains a price hypothesis and is not offered until campaign scope is separately defined.</li></ul></section>
    <section id="del06-targets" className={styles.formalSection}><h2><span>02</span> Validation Questions, Targets ແລະ Evidence</h2><p>The Pilot must answer five questions: do users have a repeated discovery problem; can useful Place data be curated legally and repeatedly; does the prototype improve decision-making; will businesses make a real commitment; and can the model stay inside the cost ceiling?</p><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Question area</th><th>Target</th><th>Acceptable evidence</th></tr></thead><tbody>{validationTargets.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><aside className={styles.formalDecision}><strong>ຫຼັກຖານລາຍຮັບ</strong><p>ຢ່ານັບຄຳເວົ້າຂອງຮ້ານວ່າ “ສົນໃຈ” ຫຼື “ຖ້າເຮັດແລ້ວຈະໃຊ້” ເປັນລາຍຮັບຂອງໂຄງການ. Paid/deposit ຕ້ອງມີຫຼັກຖານເງິນ; LOI ຕ້ອງມີຜູ້ລົງນາມ, ວັນທີ ແລະຂອບເຂດຄວາມຕັ້ງໃຈ.</p></aside></section>
    <section id="del06-calendar" className={styles.formalSection}><h2><span>03</span> Six-week Founder Execution Calendar</h2><p>BUS-04 targets remain unchanged, but the work is spread across six weeks because the current team is one Founder. The cumulative counts below are control points, not six separate workstreams.</p><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>Week</th><th>Primary experiment</th><th>Committed outcome</th><th>32-hour allocation</th><th>End-of-week evidence</th></tr></thead><tbody>{validationWeeks.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===1?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><h3>3.1 Weekly operating rhythm</h3><ol className={styles.formalNumberList}><li><strong>Monday:</strong> close prior week, select one Primary Experiment, confirm capacity/budget and create evidence IDs.</li><li><strong>Tuesday–Thursday:</strong> execute interviews, Place work, prototype test, technical spike or pre-sell according to the week.</li><li><strong>Friday:</strong> reconcile counts, expense, issue, decision and next action; do not backfill evidence from memory later.</li><li><strong>Gate week:</strong> freeze new commitments before G2/G4/G6 review and record GO/PIVOT/NO-GO for that gate.</li></ol></section>
    <section id="del06-budget" className={styles.formalSection}><h2><span>04</span> Budget Tranches, Authority ແລະ Stop-loss</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Period</th><th>Maximum released</th><th>Composition</th><th>Release rule</th></tr></thead><tbody>{validationBudget.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><ul className={styles.formalPlainList}><li>The ceiling is permission not a spending target. Unused money remains unspent.</li><li>Expense ≤500,000 LAK needs purpose and receipt/invoice; 500,001–999,999 also needs written reason and remaining-budget check.</li><li>Expense ≥1,000,000 LAK requires at least two comparable prices/quotations and a recorded selection reason.</li><li>Contingency use requires a Decision Record naming trigger, amount, remaining contingency and effect.</li><li>No next-tranche purchase/commitment before the previous gate is recorded as GO. PIVOT authorizes only the bounded retest stated in the decision.</li></ul></section>
    <section id="del06-gates" className={styles.formalSection}><h2><span>05</span> Gate 2/4/6 and Stop Rules</h2><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>Gate</th><th>When</th><th>Decision focus</th><th>Minimum review pack</th><th>Authority/result</th></tr></thead><tbody>{validationGates.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={`${row[0]}-${i}`}>{i===0?<code>{c}</code>:i===2?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table></div><h3>5.1 Immediate hold/stop triggers</h3><ul className={styles.formalPlainList}><li>Expected total will exceed 25m LAK, Validation work will exceed 10m LAK or next tranche is committed before gate approval.</li><li>Content model requires unauthorized copying/re-hosting or cannot support attribution, open-original and takedown.</li><li>Interview/payment evidence cannot be proven, is duplicated, or verbal interest is being counted as commitment.</li><li>Founder workload repeatedly exceeds 32 productive hours and evidence quality declines; reduce area/category before adding capacity.</li><li>A material safety, rights, privacy or financial issue cannot be kept in a safe/restricted state.</li></ul></section>
    <section id="del06-evidence" className={styles.formalSection}><h2><span>06</span> Evidence Contract and Working Files</h2><p>Every record uses a stable ID, date, week, experiment/question, subject code rather than unnecessary personal data, method, expected/actual result, evidence reference, status and next decision. Original receipts, signed LOI and restricted interview notes are stored outside the public repository; the public register contains only references and non-sensitive summaries.</p><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Record</th><th>Minimum fields</th><th>Rule</th></tr></thead><tbody><tr><td><strong>Weekly execution</strong></td><td>Planned/actual hours, cumulative target, result, blocker, next experiment</td><td>Total committed productive capacity ≤32h</td></tr><tr><td><strong>Validation evidence</strong></td><td>Type, subject code, question, result, evidence reference, status</td><td>No raw personal data or unsupported conclusion</td></tr><tr><td><strong>Expense</strong></td><td>Category, amount, receipt/quote, tranche, committed/spent, approver</td><td>Separate living, planned work and contingency</td></tr><tr><td><strong>Gate decision</strong></td><td>Target/actual, gaps, expense, risk, GO/PIVOT/NO-GO, next authority</td><td>No Gate decision based only on Founder feeling</td></tr></tbody></table></div><Artifacts basePath={basePath} items={[["del06-validation-pilot-baseline-2026-08-31.json","Validation Pilot Baseline","Scope, targets, calendar, budget, evidence and decision rules"],["del06-weekly-execution-register-2026-08-31.csv","Weekly Execution Register","Six-week plan/actual hours, cumulative result, blocker and next action"],["del06-validation-evidence-register-2026-08-31.csv","Validation Evidence Register","User, owner, Place, usability, policy and commercial evidence"],["del06-expense-register-2026-08-31.csv","Pilot Expense Register","Tranche, living/work/contingency, receipt/quote and remaining authority"],["del06-gate-decision-register-2026-08-31.csv","Gate Decision Register","G2/G4/G6 target, actual, evidence, cost, risk and decision"]]} /></section>
    <section id="del06-decision" className={styles.formalSection}><h2><span>07</span> Final GO / PIVOT / NO-GO</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Decision</th><th>Meaning</th><th>Next authorized action</th></tr></thead><tbody><tr><th>GO</th><td>User value, repeatable supply, commercial commitment, economics and trust boundary are supported by evidence.</td><td>Prepare a separate Production Build proposal/budget and fill required independent gate roles; GO does not itself authorize Production.</td></tr><tr><th>PIVOT</th><td>At least one dimension has useful evidence but area, category, workflow, package or price needs a bounded change.</td><td>Approve one time-boxed retest with explicit hypothesis, ceiling and deadline; do not silently extend the Pilot.</td></tr><tr><th>NO-GO</th><td>Core problem/value, legal supply, willingness-to-pay or sustainable economics is not supported.</td><td>Stop project spending, preserve evidence and record lessons/conditions that would justify reopening.</td></tr></tbody></table></div><aside className={styles.formalDraftNotice}><strong>ສະຖານະປັດຈຸບັນ</strong><p>ແຜນພ້ອມເລີ່ມ, ແຕ່ W1–W6 ຍັງບໍ່ມີ Actual Result. ຈຶ່ງບໍ່ອ້າງວ່າ Gate ໃດຜ່ານ ຫຼືວ່າໂຄງການມີລາຍຮັບແລ້ວ.</p></aside></section>
    <nav className={styles.docPagination}><a href={`${basePath}/documents/admin-operations`}><small>← PREVIOUS</small><strong>DEL-05 · Admin &amp; Operations SOP</strong></a><a href={`${basePath}/documents`}><small>DIRECTORY →</small><strong>Document Directory</strong></a></nav>
  </article>;
}

export default function DeliveryOperationsDocument({ slug, basePath }: Props) {
  if (slug === "development-plan") return <DevelopmentPlan basePath={basePath} />;
  if (slug === "test-uat") return <TestUat basePath={basePath} />;
  if (slug === "release-monitoring") return <ReleaseMonitoring basePath={basePath} />;
  if (slug === "analytics-plan") return <AnalyticsPlan basePath={basePath} />;
  if (slug === "admin-operations") return <AdminOperations basePath={basePath} />;
  if (slug === "validation-pilot") return <ValidationPilot basePath={basePath} />;
  return null;
}
