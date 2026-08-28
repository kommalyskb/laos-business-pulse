import styles from "../documents.module.css";

const principles = [
  ["ARC-P01", "Modular Monolith-first", "MVP ໃຊ້ application/backend ຊຸດດຽວທີ່ແຍກ Domain Module ຊັດ; ບໍ່ເລີ່ມດ້ວຍ Microservices ເພາະຈະເພີ່ມຄ່າດຳເນີນງານ, deployment ແລະ debugging ໂດຍຍັງບໍ່ມີ scale evidence."],
  ["ARC-P02", "Relational source of truth", "Place, Source, Workflow, Campaign, Finance Evidence, Access ແລະ Audit ຢູ່ໃນ transactional relational database; Search/Analytics ເປັນ projection ທີ່ສ້າງຄືນໄດ້."],
  ["ARC-P03", "Public read ແຍກຈາກ Admin command", "Public API ເປີດສະເພາະ Published data; Admin API ຕ້ອງ Authenticate, Authorize, Validate ແລະຂຽນ Audit ກ່ອນ mutation ສຳເລັດ."],
  ["ARC-P04", "External failure ບໍ່ລົ້ມ Core Journey", "Social embed, Map, Message ແລະ Analytics ຕ້ອງມີ timeout/fallback; ການລົ້ມຂອງບໍລິການພາຍນອກບໍ່ຂັດຂວາງ Place text ຫຼື action ທີ່ຍັງພ້ອມ."],
  ["ARC-P05", "Link-only media", "Platform ເກັບ canonical URL, attribution ແລະ metadata ທີ່ອະນຸຍາດ; ບໍ່ download ຫຼື re-host ວິດີໂອ social."],
  ["ARC-P06", "Consent-aware measurement", "Analytics event ແຍກ Essential ອອກຈາກ Optional; event ຕ້ອງ anonymous/pseudonymous, deduplicate ແລະບໍ່ block user action."],
  ["ARC-P07", "Server-enforced trust", "Role, record rule, publish gate, sponsored label, payment evidence ແລະ audit ຕ້ອງ enforce ຢູ່ server; ການເຊື່ອງປຸ່ມໃນ UI ບໍ່ແມ່ນ security control."],
  ["ARC-P08", "Evidence before scale", "ແຍກ service, search engine ຫຼື data pipeline ເພີ່ມກໍ່ຕໍ່ເມື່ອມີ bottleneck, reliability ຫຼື team-ownership evidence ທີ່ວັດໄດ້."],
] as const;

const components = [
  ["ARC-C01", "Edge & Delivery", "Public/Admin", "TLS, routing, static assets, cache, basic rate limit ແລະ request ID", "CDN/edge configuration", "NFR-02/03"],
  ["ARC-C02", "Guest Web", "Public", "Feed, Search, Place, Consent, Map/Call/Message handoff ແລະ media fallback", "No canonical business write; local Saved only", "MOD-01—03"],
  ["ARC-C03", "Admin Web", "Private", "10 Modules / 55 views, task workflow, evidence, role-aware controls ແລະ operational reporting", "API state; browser session only in prototype", "MOD-04—10 · UX-05"],
  ["ARC-C04", "Public API", "Public", "Published-only Feed/Search/Place query, canonical redirect ແລະ action availability", "Read model + cache", "FN-FEED/SRCH/PLC"],
  ["ARC-C05", "Admin API", "Private", "Command/query boundary for Place, Source, Request, Campaign, Finance, Access ແລະ Audit", "Transactional core data", "FN-PADM/SRC/REQ/CMP/ADM"],
  ["ARC-C06", "Domain Modules", "Internal", "Business rules, state transitions, publish gates, eligibility, dedupe ແລະ calculations", "Core relational schema", "PRO-02 64 Functions"],
  ["ARC-C07", "Primary Database", "Private", "System of record, constraints, transactions, version/conflict field ແລະ outbox", "27 logical entities + extension tables", "PRO-02 LDM"],
  ["ARC-C08", "Search Projection", "Private read", "Published Place search/filter index; rebuildable from Primary Database", "Derived projection", "MOD-02 · CON-01"],
  ["ARC-C09", "Job Queue & Worker", "Private", "Source recheck, freshness, scheduled campaign, projection update, notification ແລະ aggregate jobs", "Job/attempt/lease/dead-letter records", "MOD-07/09/10"],
  ["ARC-C10", "Analytics Ingest & Aggregate", "Controlled", "Consent check, event validation, dedupe, Decision Intent ແລະ privacy-safe aggregates", "Event store + aggregate tables", "MOD-09 · BUS-06"],
  ["ARC-C11", "Integration Adapters", "Boundary", "Social metadata/embed, Map, Call/Message URL, notification ແລະ future payment adapters", "Provider references; no social video copy", "ACT-01 · CON-05"],
  ["ARC-C12", "Object/Evidence Storage", "Private", "Approved Place images, posters, receipts/evidence exports ແລະ generated files", "Binary object + database metadata", "CON-02/04 · BUS-05"],
  ["ARC-C13", "Identity & Session", "Private", "Admin sign-in, session expiry, role claims ແລະ privileged-step verification", "Provider/session references", "FN-ADM-001/002"],
  ["ARC-C14", "Observability & Recovery", "Operations", "Structured logs, metrics, traces, alerts, backup verification ແລະ restore evidence", "Telemetry/backup outside request path", "NFR-02/03/04"],
] as const;

const flows = [
  ["FLOW-01", "Place/Source → Publish", "Admin Web → Admin API → Domain → DB transaction + Audit/Outbox → Worker → Search/Cache invalidation", "Mutation ແລະ Audit commit ພ້ອມກັນ; Published ເມື່ອ readiness/evidence ຜ່ານ."],
  ["FLOW-02", "Guest Discover → Decide", "Guest Web → Edge → Public API → Cache/Search/DB read model → Place/Source response", "ສົ່ງສະເພາະ Published; media timeout ສົ່ງ fallback ໂດຍບໍ່ປິດ Place."],
  ["FLOW-03", "Map/Call/Message", "Guest Web → availability check → external adapter/deep link → optional analytics event", "Action ຕ້ອງສຳເລັດແມ່ນວ່າ analytics ingest ລົ້ມ; ບໍ່ອ້າງ intent ເປັນ visit/sale."],
  ["FLOW-04", "Correction/Takedown", "Intake → Admin API → Request workflow → Evidence → Decision → Place/Source command → Audit → notification", "Urgent takedown ສາມາດ hide public media ກ່ອນ final review; hard delete ບໍ່ໃຊ້."],
  ["FLOW-05", "Source Availability", "Scheduler → Queue → Worker → Social Adapter → classified result → retry/backoff or state command", "Temporary/Confirmed/Takedown ແຍກກັນ; job idempotent ແລະ bounded retry."],
  ["FLOW-06", "Sponsored Campaign", "Admin → Campaign command → eligibility → scheduler → Public placement → analytics aggregate → report", "Paid status ບໍ່ປ່ຽນ verification/rating; label ແລະ time window enforce server-side."],
  ["FLOW-07", "Payment/Expense Evidence", "Admin → Finance command → evidence storage → DB record → verifier → audit/report", "Invoice ຫຼືຄຳວ່າສົນໃຈບໍ່ນັບເປັນ revenue; Pilot ບໍ່ process payment transaction."],
] as const;

const dataOwnership = [
  ["Place & Taxonomy", "Place, Category, Area, facts, contacts, images, version", "Place Domain", "Public read only after publish gate", "Search Projection"],
  ["Content & Rights", "Source URL, creator, attribution, availability, rights decision", "Content Domain", "Link/metadata only", "Feed/Place projection"],
  ["Trust & Requests", "Correction, takedown, evidence, decision, appeal", "Trust Domain", "Restricted evidence by role", "Operational queue"],
  ["Partner & Campaign", "Partner, campaign, creative, placement, disclosure", "Commercial Domain", "Sponsored independent from trust score", "Campaign report"],
  ["Finance Evidence", "Invoice, payment evidence, expense, budget gate, cash snapshot", "Finance Domain", "Verified evidence only; restricted", "Finance summary"],
  ["Identity & Audit", "User, role, permission, session ref, immutable-style audit", "Platform Control", "Least privilege; append-only audit behavior", "Compliance report"],
  ["Analytics", "Consent, anonymous session, event, intent, aggregate", "Measurement Domain", "Optional event requires consent; small cohorts protected", "Dashboard aggregates"],
] as const;

const environments = [
  ["Local", "Developer machine", "Synthetic fixtures", "Fast feedback; external adapters mocked by default", "No production secret/data"],
  ["Test / CI", "Automated contract, integration and E2E", "Resettable DATA-01—08", "Every change", "Deterministic build and migration"],
  ["Pilot / Staging", "UAT, performance, accessibility and operational rehearsal", "Anonymized/approved pilot dataset", "Release candidate", "Production-like config without public traffic"],
  ["Production", "Public pilot and Admin operations", "Authoritative data", "Approved release only", "Backup, alert, audit and rollback enabled"],
] as const;

const safeguards = [
  ["Identity", "Admin authentication; no shared accounts; short-lived/rotated session according to TEC-06", "ARC-C13"],
  ["Authorization", "Role + action + record rule checked by Admin API for every privileged command", "ARC-C05/C06"],
  ["Transaction & Audit", "Business write, version check, audit and outbox commit atomically or all rollback", "ARC-C06/C07"],
  ["Privacy", "Minimize PII, separate restricted evidence, consent-gate optional analytics, retention policy pending CON-05/TEC-06", "ARC-C07/C10/C12"],
  ["Secrets", "Runtime secret store; never source code, browser bundle, logs or exported fixtures", "Deployment boundary"],
  ["External input", "URL allowlist, size/type validation, timeout, response sanitization and no arbitrary server fetch", "ARC-C11"],
  ["Observability", "Request/job ID, actor, module, outcome, duration and safe error code; redact secrets/PII", "ARC-C14"],
  ["Recovery", "Automated backup + restore rehearsal; Pilot RPO 24h and RTO 8h are approved as a provisional baseline and must be confirmed in TEC-06", "ARC-C07/C12/C14"],
] as const;

const decisions = [
  ["ADR-001", "Modular Monolith for Pilot", "Accepted", "Lowest operational complexity while preserving domain boundaries; split only with measured evidence."],
  ["ADR-002", "Relational DB as source of truth", "Accepted", "Transactions, relations, audit and constraints dominate MVP requirements."],
  ["ADR-003", "Search starts as rebuildable projection", "Accepted", "Avoid dedicated search operations until Lao relevance/volume evidence requires it."],
  ["ADR-004", "Transactional outbox for async effects", "Accepted", "Prevents business commit succeeding while search/event/job notification is silently lost."],
  ["ADR-005", "External social media remains link-only", "Fixed by scope", "Protect attribution and copyright boundary; use permitted embed/metadata and fallback."],
  ["ADR-006", "Admin authorization is server-enforced", "Fixed by security", "Prototype visibility rules are not sufficient for production access control."],
  ["ADR-007", "Analytics is asynchronous and consent-aware", "Accepted", "Measurement failure cannot block discovery or decision actions."],
  ["ADR-008", "No platform booking/payment transaction in MVP", "Fixed by PRO-03", "Users contact Place directly; Finance records verified evidence, not payment processing."],
] as const;

const scaling = [
  ["S0 · Pilot", "30–100 Places; small operator team", "One modular app/API, relational DB, worker, basic cache and scheduled jobs", "Default baseline"],
  ["S1 · Growth", "Read traffic or search latency approaches performance budget", "Increase cache/read replicas, tune indexes, isolate worker capacity, add search service if evidence supports", "PERF-01/02 trend or DB query saturation"],
  ["S2 · Operational scale", "Job backlog, integrations or analytics affect core requests", "Separate worker/analytics deployment while keeping contracts and source-of-truth ownership", "Queue age, error isolation or independent scaling need"],
  ["S3 · Team/domain scale", "Independent teams require separate release ownership", "Extract a domain service only after ownership, transaction and migration boundaries are proven", "Organizational + technical evidence"],
] as const;

const reviews = [
  ["REV-01", "Architecture Style", "ອະນຸມັດ Modular Monolith-first ສຳລັບ Pilot ຫຼືຕ້ອງແຍກ Service ຕັ້ງແຕ່ຕົ້ນ?", "ອະນຸມັດ Modular Monolith-first; ແຍກ Service ເມື່ອມີຫຼັກຖານຈາກ scale, reliability ຫຼື team ownership."],
  ["REV-02", "Data & Search", "ອະນຸມັດ Relational DB ເປັນ source of truth ແລະ Search/Analytics ເປັນ rebuildable projection ຫຼືບໍ່?", "ອະນຸມັດ Relational DB ເປັນຂໍ້ມູນທາງການ; Search/Analytics ຕ້ອງສ້າງຄືນໄດ້."],
  ["REV-03", "Async & External Boundary", "ອະນຸມັດ queue/outbox, bounded retry ແລະ link-only media adapter ເພື່ອແຍກ external failure ອອກຈາກ Core Journey ຫຼືບໍ່?", "ອະນຸມັດ Queue, Transactional Outbox, ການລອງໃໝ່ແບບຈຳກັດ ແລະ Link-only media."],
  ["REV-04", "Security & Admin", "ອະນຸມັດ server-enforced role/record rule, atomic audit ແລະ restricted evidence boundary ຫຼືບໍ່?", "ອະນຸມັດເປັນຂໍ້ບັງຄັບ; UI ບໍ່ສາມາດໃຊ້ແທນ server security control."],
  ["REV-05", "Environment & Recovery", "ອະນຸມັດ Local → Test/CI → Pilot/Staging → Production ແລະ Pilot recovery baseline RPO 24h / RTO 8h ຫຼືຕ້ອງປັບ?", "ອະນຸມັດ 4 Environment; RPO 24h / RTO 8h ເປັນຄ່າຊົ່ວຄາວ ແລະທົບທວນຄືນໃນ TEC-06."],
] as const;

export default function SystemArchitectureDocument({ basePath }: { basePath: string }) {
  return <article className={`${styles.detailBody} ${styles.formalDocument}`}>
    <header className={styles.formalDocumentHeader}>
      <p>TEC-01 · ARCHITECTURE &amp; ENGINEERING</p>
      <h1>System Architecture</h1>
      <h2>ໂຄງສ້າງລະບົບສຳລັບ Guest, Admin, Data, Search, Background Work ແລະ External Integration</h2>
      <div className={styles.formalStatus}>ສະບັບ 1.0 · ອະນຸມັດແລ້ວ · 28 ສິງຫາ 2026</div>
    </header>

    <section className={styles.formalSection} id="arc-control"><h2><span>1.</span> ຂໍ້ມູນຄວບຄຸມເອກະສານ</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
        <tr><th>ລະຫັດ</th><td>TEC-01</td><th>ສະບັບ</th><td>1.0</td></tr>
        <tr><th>ສະຖານະ</th><td>ອະນຸມັດແລ້ວ</td><th>ເຈົ້າຂອງ</th><td>Solution Architect / Tech Lead</td></tr>
        <tr><th>ຜູ້ທົບທວນ</th><td>Product Owner · System Analyst · Security/Operations · Frontend/Backend Lead</td><th>ເອກະສານຖັດໄປ</th><td>TEC-02 Technical Proposal</td></tr>
        <tr><th>Baseline ຕົ້ນທາງ</th><td colSpan={3}>PRO-02 1.0 · PRO-03 1.0 · PRO-04 0.9 · UX-05 0.11.0 · CON-02/04 1.0 · BUS-05/06 1.0</td></tr>
      </tbody></table></div>
      <h3>1.1 ປະຫວັດການແກ້ໄຂ</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ສະບັບ</th><th>ວັນທີ</th><th>ລາຍລະອຽດ</th><th>ຜູ້ຈັດທຳ</th></tr></thead><tbody><tr><td>0.1</td><td>28 ສິງຫາ 2026</td><td>ກຳນົດ logical architecture, 14 components, 7 core flows, data ownership, deployment, security, recovery, scaling ແລະ 8 Architecture Decisions.</td><td>Solution Architecture</td></tr><tr><td>1.0</td><td>28 ສິງຫາ 2026</td><td>ອະນຸມັດ REV-01—05, ປ່ຽນ ADR-001—004/007 ເປັນ Accepted ແລະກຳນົດ RPO 24h / RTO 8h ເປັນ Pilot provisional baseline.</td><td>Product Owner / Solution Architecture</td></tr></tbody></table></div>
    </section>

    <nav className={styles.formalToc} aria-label="ສາລະບານ TEC-01"><h2>ສາລະບານ</h2><ol>
      <li><a href="#arc-purpose">ຈຸດປະສົງ ແລະຂອບເຂດ</a></li><li><a href="#arc-drivers">Architecture Drivers</a></li><li><a href="#arc-style">Architecture Style</a></li><li><a href="#arc-components">Component Catalog</a></li><li><a href="#arc-data">Data Ownership</a></li><li><a href="#arc-flows">Request/Data Flows</a></li><li><a href="#arc-deployment">Deployment Topology</a></li><li><a href="#arc-safety">Security &amp; Recovery</a></li><li><a href="#arc-scaling">Scaling &amp; Cost</a></li><li><a href="#arc-decisions">Decision Register</a></li><li><a href="#arc-handoff">Technical Handoff</a></li><li><a href="#arc-review">5 ຂໍ້ທົບທວນ</a></li>
    </ol></nav>

    <section className={styles.formalSection} id="arc-purpose"><h2><span>2.</span> ຈຸດປະສົງ ແລະຂອບເຂດ</h2>
      <p>TEC-01 ແປ Logical System Analysis ແລະ UX Design Handoff ໃຫ້ເປັນໂຄງສ້າງທີ່ທີມພັດທະນາສາມາດແບ່ງຄວາມຮັບຜິດຊອບ, ກຳນົດ API/Data boundary, ວາງ deployment ແລະປະເມີນ risk/cost ໄດ້. ເອກະສານນີ້ຕອບວ່າ component ໃດມີໜ້າທີ່ຫຍັງ, ຂໍ້ມູນໃດເປັນຂໍ້ມູນຫຼັກ, request ໄຫຼແນວໃດ ແລະ failure ຖືກຈຳກັດຢູ່ໃສ.</p>
      <div className={styles.formalNote}><strong>ຂອບເຂດ:</strong><p>ຄຸ້ມ Logical Component, Trust Boundary, Data Ownership, Flow, Environment, Resilience, Observability, Recovery ແລະ Scaling Path. ຍັງບໍ່ລັອກ programming language, framework, cloud vendor, physical table/column, endpoint schema ຫຼືລາຄາ vendor; ລາຍລະອຽດເຫຼົ່ານັ້ນຢູ່ TEC-02—06.</p></div>
      <div className={styles.formalDraftNotice}><strong>Prototype ≠ Architecture Implementation</strong><p>Guest/Admin Prototype ເປັນ interaction baseline. Browser sessionStorage, fixture data ແລະ simulated audit ຈະບໍ່ຖືກນຳໄປໃຊ້ເປັນ production persistence ຫຼື security control.</p></div>
    </section>

    <section className={styles.formalSection} id="arc-drivers"><h2><span>3.</span> Architecture Drivers ແລະຫຼັກການ</h2>
      <p>Driver ຫຼັກຄືທຶນ/ຄົນຈຳກັດ, Pilot 30 → 60 → 100 Places, video-link-first, Admin ທີ່ຕ້ອງກວດ evidence, external platform ທີ່ບໍ່ຄວບຄຸມໄດ້, performance ເທິງ Android/4G ແລະຄວາມໜ້າເຊື່ອຖືຂອງ public data.</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ຫຼັກການ</th><th>ຜົນຕໍ່ການອອກແບບ</th></tr></thead><tbody>{principles.map(([id,title,detail])=><tr key={id}><td><code>{id}</code></td><td><strong>{title}</strong></td><td>{detail}</td></tr>)}</tbody></table></div>
      <h3>3.1 Performance Baseline ທີ່ Architecture ຕ້ອງຮອງຮັບ</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Target</th><th>Architecture implication</th></tr></thead><tbody>
        <tr><td>PERF-01</td><td>First useful content ≤ 3s</td><td>Edge delivery, small initial payload, cacheable public reads ແລະ defer external media.</td></tr><tr><td>PERF-02</td><td>Place core data ≤ 2.5s</td><td>Published read model/index, bounded query ແລະ no synchronous social fetch.</td></tr><tr><td>PERF-03</td><td>Interaction feedback ≤ 300ms</td><td>Optimistic/local feedback ເມື່ອປອດໄພ; long command ສົ່ງ progress/job state.</td></tr><tr><td>PERF-04</td><td>Media fallback ≤ 4s</td><td>Client timeout + cached poster/metadata + Open Original action.</td></tr>
      </tbody></table></div>
    </section>

    <section className={styles.formalSection} id="arc-style"><h2><span>4.</span> Architecture Style ແລະ System Context</h2>
      <p>ແນວທາງທີ່ແນະນຳສຳລັບ Pilot ແມ່ນ <strong>Modular Monolith + Background Worker + Relational Database</strong>. Guest ແລະ Admin ອາດ deploy ເປັນ web surface ແຍກກັນ, ແຕ່ backend ຮັກສາ codebase/deployment ທີ່ຈັດການງ່າຍ ແລະແຍກ Domain Module ດ້ວຍ contract ທີ່ຊັດ.</p>
      <div className={styles.architectureDiagram} aria-label="System architecture overview">
        <div className={styles.architectureActors}><article><b>GUEST</b><span>Discover · Search · Decide</span></article><article><b>ADMIN</b><span>Operate · Review · Publish</span></article></div>
        <i>↓ HTTPS / Edge ↓</i>
        <div className={styles.architectureClients}><article><b>GUEST WEB</b><span>Public experience</span></article><article><b>ADMIN WEB</b><span>Private operating portal</span></article></div>
        <i>↓ Public Query / Authorized Command ↓</i>
        <div className={styles.architectureCore}><article><b>MODULAR APPLICATION / API</b><span>Public API · Admin API · Domain Rules · Authorization · Audit · Outbox</span></article></div>
        <i>↓ Transaction / Async Work ↓</i>
        <div className={styles.architectureStores}><article><b>RELATIONAL DB</b><span>Source of truth</span></article><article><b>QUEUE + WORKER</b><span>Retry · schedule · projection</span></article><article><b>SEARCH / ANALYTICS</b><span>Rebuildable read models</span></article></div>
        <i>↓ Controlled adapters ↓</i>
        <div className={styles.architectureExternal}><article><b>SOCIAL</b><span>Link/embed/metadata</span></article><article><b>MAP &amp; MESSAGE</b><span>External handoff</span></article><article><b>STORAGE / NOTIFY</b><span>Evidence &amp; operations</span></article></div>
      </div>
      <div className={styles.formalDecision}><strong>ເຫດຜົນທີ່ບໍ່ເລີ່ມດ້ວຍ Microservices</strong><p>ຂະໜາດ Pilot ຍັງບໍ່ມີ throughput ຫຼື team boundary ທີ່ຄຸ້ມຄ່າກັບ service discovery, distributed transaction, multiple deployment, observability ແລະ incident complexity. Domain boundary ທີ່ດີສາມາດຮັກສາໄວ້ໃນ Modular Monolith ແລະຄ່ອຍ extract ເມື່ອມີ evidence.</p></div>
    </section>

    <section className={styles.formalSection} id="arc-components"><h2><span>5.</span> Logical Component Catalog</h2><p>Component ID ເປັນຈຸດອ້າງອີງສຳລັບ TEC-02/03/04/06. “Component” ບໍ່ໝາຍຄວາມວ່າຕ້ອງ deploy ແຍກ service.</p>
      <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Component</th><th>Trust zone</th><th>Responsibility</th><th>Owns / uses</th><th>Source</th></tr></thead><tbody>{components.map(([id,name,zone,responsibility,data,source])=><tr key={id}><td><code>{id}</code></td><td><strong>{name}</strong></td><td>{zone}</td><td>{responsibility}</td><td>{data}</td><td>{source}</td></tr>)}</tbody></table></div>
    </section>

    <section className={styles.formalSection} id="arc-data"><h2><span>6.</span> Data Ownership ແລະ Consistency Boundary</h2><p>Domain ໜຶ່ງເປັນ owner ຂອງ write rule; Domain ອື່ນອ່ານຜ່ານ contract/projection. ຫ້າມ Search, Dashboard ຫຼື Worker ຂຽນ core state ໂດຍຂ້າມ Domain Command.</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Domain</th><th>Canonical data</th><th>Write owner</th><th>Critical rule</th><th>Projection</th></tr></thead><tbody>{dataOwnership.map(row=><tr key={row[0]}>{row.map((cell,index)=><td key={`${index}-${cell}`}>{index===0?<strong>{cell}</strong>:cell}</td>)}</tr>)}</tbody></table></div>
      <div className={styles.formalNote}><strong>Consistency rule</strong><p>Place/Source publish, correction decision, campaign state, verified finance evidence, access change ແລະ audit ຕ້ອງ strong consistency ໃນ transaction. Search, analytics, notification ແລະ dashboard aggregate ຍອມ eventual consistency ໄດ້ ແຕ່ຕ້ອງມີ updated-at/status ແລະ rebuild path.</p></div>
    </section>

    <section className={styles.formalSection} id="arc-flows"><h2><span>7.</span> Request, Data ແລະ Event Flows</h2><p>Flow ຕໍ່ໄປນີ້ກຳນົດ critical path ແລະ failure boundary; endpoint/schema ລະອຽດຈະຢູ່ TEC-04.</p>
      <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Journey</th><th>Flow</th><th>Transaction / failure rule</th></tr></thead><tbody>{flows.map(([id,name,flow,rule])=><tr key={id}><td><code>{id}</code></td><td><strong>{name}</strong></td><td>{flow}</td><td>{rule}</td></tr>)}</tbody></table></div>
      <h3>7.1 Command Transaction Pattern</h3><ol className={styles.formalNumberList}><li>Authenticate session ແລະ resolve actor.</li><li>Authorize action + record scope.</li><li>Validate input, current state, version ແລະ business rule.</li><li>Write business change + audit + outbox event ໃນ transaction ດຽວ.</li><li>Commit ແລ້ວຈຶ່ງສົ່ງ response.</li><li>Worker ນຳ outbox ໄປ update search/cache, analytics/notification ແລະ retry ໂດຍ idempotency key.</li></ol>
    </section>

    <section className={styles.formalSection} id="arc-deployment"><h2><span>8.</span> Deployment Topology ແລະ Environment</h2><p>Topology ຕ້ອງຮັກສາ public surface ອອກຈາກ private data plane. Database, queue, evidence storage ແລະ admin-only endpoint ບໍ່ຄວນເປີດກົງສູ່ Internet.</p>
      <div className={styles.architectureTopology}><div><b>PUBLIC ZONE</b><span>Guest Web · Public API · cacheable Published reads</span></div><i>→</i><div><b>APPLICATION ZONE</b><span>Admin Web · Admin API · Domain · Worker · Integration adapters</span></div><i>→</i><div><b>DATA ZONE</b><span>Primary DB · Queue · Search projection · Analytics · Evidence storage</span></div><i>→</i><div><b>OPERATIONS ZONE</b><span>Identity · Secrets · Logs/Metrics · Backup/Restore</span></div></div>
      <h3>8.1 Environment Contract</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Environment</th><th>Purpose</th><th>Data</th><th>Release cadence</th><th>Control</th></tr></thead><tbody>{environments.map(row=><tr key={row[0]}>{row.map((cell,index)=><td key={`${index}-${cell}`}>{index===0?<strong>{cell}</strong>:cell}</td>)}</tr>)}</tbody></table></div>
      <div className={styles.formalDraftNotice}><strong>Vendor-neutral baseline</strong><p>TEC-01 ບໍ່ເລືອກ cloud/framework. TEC-02 ຈະປຽບທຽບ deployment options ຕາມ cost, skill, region/latency, managed backup, queue/search support ແລະ operational burden; TEC-03 ຈຶ່ງລັອກ stack.</p></div>
    </section>

    <section className={styles.formalSection} id="arc-safety"><h2><span>9.</span> Security, Privacy, Reliability ແລະ Recovery</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Control</th><th>Architecture requirement</th><th>Component</th></tr></thead><tbody>{safeguards.map(([name,requirement,component])=><tr key={name}><td><strong>{name}</strong></td><td>{requirement}</td><td><code>{component}</code></td></tr>)}</tbody></table></div>
      <h3>9.1 Failure Isolation</h3><ul className={styles.formalNumberList}><li><strong>Social/Map/Message:</strong> timeout, circuit/open fallback ແລະ provider-safe error; Place text ຍັງອ່ານໄດ້.</li><li><strong>Analytics:</strong> buffer/drop safely ຕາມ policy; ບໍ່ block user journey.</li><li><strong>Search projection:</strong> fallback ໄປ bounded DB query ຫຼືສະແດງ temporary unavailable; ຫ້າມສົ່ງ Draft.</li><li><strong>Queue/Worker:</strong> lease, attempt count, exponential backoff, dead-letter/manual replay ແລະ idempotency.</li><li><strong>Audit failure:</strong> privileged mutation ຕ້ອງ rollback; ຫ້າມ business state ປ່ຽນໂດຍບໍ່ມີ audit.</li></ul>
    </section>

    <section className={styles.formalSection} id="arc-scaling"><h2><span>10.</span> Scaling Path ແລະ Cost Control</h2><p>Architecture ເລີ່ມຈາກ S0 ແລະຂະຫຍາຍເມື່ອ metric ຊີ້ບອກ; ຫ້າມແຍກ service ເພາະຄາດເດົາ.</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Stage</th><th>Evidence/scale</th><th>Architecture action</th><th>Trigger</th></tr></thead><tbody>{scaling.map(row=><tr key={row[0]}>{row.map((cell,index)=><td key={`${index}-${cell}`}>{index===0?<strong>{cell}</strong>:cell}</td>)}</tr>)}</tbody></table></div>
      <div className={styles.formalDecision}><strong>Cost rule</strong><p>Server budget ຕ້ອງແຍກ fixed cost, usage cost, storage/egress, observability, backup ແລະ third-party quota. TEC-02 ຈະສ້າງ 3 scenario: Pilot minimum, expected ແລະ stress; ບໍ່ໃຊ້ຄຳວ່າ “server ແພງ” ໂດຍບໍ່ມີ traffic/storage/job assumption.</p></div>
    </section>

    <section className={styles.formalSection} id="arc-decisions"><h2><span>11.</span> Architecture Decision Register</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Decision</th><th>Status</th><th>Rationale</th></tr></thead><tbody>{decisions.map(([id,decision,status,rationale])=><tr key={id}><td><code>{id}</code></td><td><strong>{decision}</strong></td><td>{status}</td><td>{rationale}</td></tr>)}</tbody></table></div>
      <p>ADR-001—004 ແລະ ADR-007 ຖືກອະນຸມັດເປັນ Accepted. “Fixed by scope/security” ປ່ຽນໄດ້ສະເພາະມີ upstream Change Decision ທີ່ຖືກອະນຸມັດ.</p>
    </section>

    <section className={styles.formalSection} id="arc-handoff"><h2><span>12.</span> Technical Handoff ແລະ Traceability</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ຕົ້ນທາງ</th><th>TEC-01 ຮັບມາ</th><th>ສົ່ງຕໍ່</th></tr></thead><tbody>
        <tr><td>PRO-02</td><td>64 Functions, 27 Entities, 16 Workflows, State/Error/Audit rules</td><td>Component/data/flow boundaries</td></tr><tr><td>PRO-03/04</td><td>MVP priority, manual boundary, acceptance/performance</td><td>Release architecture and NFR constraints</td></tr><tr><td>UX-05 0.11.0</td><td>Guest/Admin screens, control, responsive, session prototype boundary</td><td>Client/API/auth/persistence responsibility</td></tr><tr><td>CON/BUS</td><td>Source, disclosure, evidence, revenue and cost rules</td><td>Storage/integration/security/commercial boundaries</td></tr><tr><td>TEC-01</td><td>14 Components, 7 Flows, trust/data zones, ADRs</td><td>TEC-02 alternatives/cost · TEC-03 stack · TEC-04 schema/API · TEC-06 security/infra</td></tr>
      </tbody></table></div>
      <h3>12.1 ໄຟລ໌ນຳໃຊ້</h3><div className={styles.architectureArtifacts}><a href={`${basePath}/artifact-preview?file=tec01-architecture-baseline-2026-08-28.json&from=system-architecture`}><b>ພຣີວິວ Architecture Baseline JSON</b><span>Component, flow, decision, security ແລະ review contract</span></a><a href={`${basePath}/templates/tec01-architecture-baseline-2026-08-28.json`} download><b>ດາວໂຫຼດ JSON</b><span>Machine-readable handoff ສຳລັບ TEC-02—06</span></a></div>
      <div className={styles.formalApproval}><strong>TEC-02 ພ້ອມເລີ່ມ</strong><p>REV-01—05 ຖືກອະນຸມັດ; Component/Flow/Trust Boundary ບໍ່ຂັດ PRO-02/UX-05; RPO/RTO ມີ owner ທົບທວນໃນ TEC-06; ແລະ TEC-02 ສາມາດນຳ baseline ນີ້ໄປປຽບທຽບທາງເລືອກ, cost ແລະ delivery approach.</p></div>
    </section>

    <section className={styles.formalSection} id="arc-review"><h2><span>13.</span> ບັນທຶກການອະນຸມັດ 5 ຂໍ້</h2><p>ການຕັດສິນ REV-01—05 ເປັນ Architecture Baseline ສຳລັບ TEC-02—06. Developer ບໍ່ຄວນປ່ຽນແປງໂດຍບໍ່ມີ Change Decision ແລະການປະເມີນຜົນກະທົບ.</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ຫົວຂໍ້</th><th>ຄຳຖາມ</th><th>ຜົນຕັດສິນ</th><th>ສະຖານະ</th></tr></thead><tbody>{reviews.map(([id,title,question,recommendation])=><tr key={id}><td><code>{id}</code></td><td><strong>{title}</strong></td><td>{question}</td><td>{recommendation}</td><td><strong>ອະນຸມັດ</strong></td></tr>)}</tbody></table></div>
      <div className={styles.formalApproval}><strong>TEC-01 · ສະບັບ 1.0</strong><p>Architecture Baseline ຖືກອະນຸມັດຄົບແລ້ວ. RPO 24h / RTO 8h ຍັງເປັນຄ່າຊົ່ວຄາວສຳລັບ Pilot ແລະຕ້ອງຢືນຢັນຄືນໃນ TEC-06 ຫຼັງຈາກຮູ້ infrastructure cost ແລະ data criticality.</p></div>
    </section>

    <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ"><a href={`${basePath}/documents/full-ux-ui`}><small>← DESIGN HANDOFF</small><strong>UX-05 0.11.0</strong></a><a href={`${basePath}/documents/technical-proposal`}><small>ເອກະສານຖັດໄປ →</small><strong>TEC-02 Technical Proposal</strong></a></nav>
  </article>;
}
