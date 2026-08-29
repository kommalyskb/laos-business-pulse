import styles from "../documents.module.css";

type Props = { basePath: string };

const decisions = [
  ["SEC-D01", "Single-host Pilot ແບບມີຂອບເຂດ", "OVH Dedicated Server ໃຊ້ໄດ້ສະເພາະເມື່ອ OVH-G01—06/CNT-01—11 ມີຫຼັກຖານ; RAID1 ບໍ່ແມ່ນ Backup ແລະຫ້າມອ້າງ High Availability."],
  ["SEC-D02", "Server-enforced identity/access", "Admin ໃຊ້ Managed OIDC, MFA, server session, role/action/resource policy ແລະ append-only Audit; UI visibility ບໍ່ແມ່ນ Security Control."],
  ["SEC-D03", "Data minimization", "MVP ເປັນ Guest-first; optional analytics ປິດຈົນ consent/retention/legal gate ຜ່ານ. Raw query, secret, token, evidence body ແລະ unnecessary PII ຫ້າມເຂົ້າ telemetry."],
  ["SEC-D04", "Recovery/Monitoring = Release Gate", "Encrypted off-host base backup + continuous WAL, restore drill, uptime/missing-telemetry alert, incident owner/runbook ແລະ security detection ຕ້ອງພ້ອມກ່ອນ Public Pilot."],
  ["SEC-D05", "Evidence ກ່ອນຄຳອ້າງ", "1.0 ຈະລັອກ Design/Operations Baseline; control ບໍ່ຖືວ່າຜ່ານຈົນມີ config/report/test/restore evidence."],
] as const;

const dataClasses = [
  ["DATA-C1", "Public", "Published Place/source/labels and safe aggregate", "Guest/Public API", "Integrity, availability, attribution"],
  ["DATA-C2", "Internal", "Draft metadata, work queue, operational aggregate", "Staff by job role", "No public response/export"],
  ["DATA-C3", "Restricted", "Requester contact/evidence, admin identity, audit/security event, contract/invoice", "Named role + purpose + audit", "Encrypt, redact, export off by default"],
  ["DATA-C4", "Secret", "OIDC/DB/session/R2/backup/Grafana/deploy/encryption keys", "Required service/designated owner", "Never browser, source, image, business row, log, ticket or export"],
] as const;

const threats = [
  ["THR-01", "Admin account takeover", "Phishing/stolen session", "MFA, session controls, revoke and login detection", "OIDC/MFA/revocation test"],
  ["THR-02", "Broken authorization", "Role/resource bypass", "Deny-by-default server action/resource policy", "Negative role-action tests"],
  ["THR-03", "Injection/SSRF", "Search/form/API/worker/source URL", "Schema validation, parameterized query, allowlist, egress/IP checks", "SAST/DAST/SSRF fixtures"],
  ["THR-04", "Public data leak", "Projection/cache/API/export", "Published canonical recheck, explicit DTO, private evidence, purge", "No-leak integration tests"],
  ["THR-05", "Content/rights abuse", "Malicious/removed source or false report", "URL checks, redirect boundary, P0 takedown, audit", "CON-04/05 rehearsal"],
  ["THR-06", "Availability abuse", "Traffic/query/job/disk exhaustion", "Rate/time/queue/resource limits, quotas, reserve, alerts", "Load/abuse/disk-full tests"],
  ["THR-07", "Supply-chain compromise", "Package/image/workflow/token", "Lockfile, official source, scan, digest, minimal CI permission", "SBOM/scan/approved digest"],
  ["THR-08", "Host/container escape", "Root/privileged/socket/public port", "Non-root, no privileged/host/socket, network isolation, patching", "Compose/runtime/port audit"],
  ["THR-09", "Backup loss/ransomware", "Delete/corrupt/steal archive/key", "Encrypted off-host copy, separate credential, restore drill", "Timed monthly restore"],
  ["THR-10", "Audit/monitoring tamper", "Delete/disable/flood evidence", "Append-only behavior, restricted backend, missing-data alert", "Tamper/detection test"],
  ["THR-11", "Insider/excess privilege", "Self-approval/bulk export/break-glass", "Least privilege, second review, step-up, audit, access review", "Quarterly access review"],
  ["THR-12", "Single-host outage", "Hardware/network/region/operator", "Off-host restore, versioned config, fallback trigger; no HA claim", "DR exercise"],
] as const;

const roles = [
  ["content_editor", "Draft Place/Source; submit review", "Publish, evidence export, access/campaign activation"],
  ["publisher", "Publish/suspend/archive eligible Place/Source", "Access/secret management; unreviewed self-approval"],
  ["support", "Assigned correction case and contact", "Publish, trust decision, bulk evidence export"],
  ["trust", "Takedown/privacy case, evidence, urgent hide", "Approve own appeal; commercial/finance/access"],
  ["commercial", "Partner/Sponsored Draft and report", "Organic ranking/rating/verification; unapproved activation"],
  ["finance", "Revenue/expense evidence and verification", "Content/trust/access/audit mutation"],
  ["auditor", "Redacted audit/security/compliance read", "Business mutation or raw secret/evidence by default"],
  ["platform_admin", "Identity/role/deploy/recovery", "Routine business self-approval or unrestricted evidence browse"],
] as const;

const iam = [
  ["IAM-01", "Managed OIDC; local Production Admin password database prohibited.", "Provider/config + login/logout test"],
  ["IAM-02", "MFA for every Admin; WebAuthn/passkey or hardware factor preferred for Founder/platform_admin.", "Enrollment report without secret"],
  ["IAM-03", "Secure HttpOnly SameSite cookie; rotate session after login/step-up/role change; token never browser storage.", "Cookie/session test"],
  ["IAM-04", "Idle 30 min; absolute 12 h; privileged step-up valid 15 min—provisional for REV-02.", "Clock-controlled test"],
  ["IAM-05", "Step-up for role, evidence export, bulk, secret, backup, deploy and break-glass action.", "Action-policy tests"],
  ["IAM-06", "Disable/role removal revokes sessions within 15 min; admin user deactivated, not hard deleted.", "Revocation + audit test"],
  ["IAM-07", "Sealed break-glass with two separately held recovery factors; immediate alert and incident/review.", "Quarterly drill"],
  ["IAM-08", "Quarterly access review; dormant account >45 days disabled unless documented.", "Signed access review"],
] as const;

const retention = [
  ["RET-01", "Essential anonymous session", "Session/security/rate limit", "30 days after last activity/expiry", "Auto purge; no marketing profile", "Technical + Legal"],
  ["RET-02", "Network abuse identifier", "Rate limit/investigation", "7 days; rotating salted HMAC", "No raw IP in analytics", "Technical + Legal"],
  ["RET-03", "Optional analytics event", "Feed → Place → Intent", "90 days raw; 12 months aggregate", "Opt-in only; withdrawal stops future events", "Legal required"],
  ["RET-04", "Raw search query", "Request-time search", "Not persisted in MVP", "No analytics/log field", "TEC-05 approved"],
  ["RET-05", "Correction/takedown contact", "Resolve/communicate case", "12 months after closure", "Delete/anonymize unless dispute/legal hold", "Legal required"],
  ["RET-06", "Restricted request evidence", "Prove claim/decision", "12 months after closure", "Private storage; deletion job/legal hold", "Legal required"],
  ["RET-07", "Business audit", "Who/what/when", "12 months online + up to 24 months encrypted archive", "Redacted; app cannot update/delete", "Business + Legal"],
  ["RET-08", "Application log / trace", "Debug/performance", "30 days logs; 14 days traces", "Incident-selected hold only", "Operations"],
  ["RET-09", "Security event", "Detection/investigation", "90 days online + up to 12 months archive", "Required events not sampled", "Security + Legal"],
  ["RET-10", "Encrypted backup", "Disaster recovery", "35-day rolling + 12 monthly points", "Recovery-only; scheduled expiry/key control", "REV-03/04"],
] as const;

const appControls = [
  ["APP-01", "Explicit Public/Admin DTO + Published canonical recheck", "No-leak integration test"],
  ["APP-02", "Boundary schema/size/type/enum/URL validation; unknown privileged field rejected", "Negative contract test"],
  ["APP-03", "Parameterized Drizzle/SQL; reviewed raw SQL; no user-controlled sort/table/command", "SAST/review"],
  ["APP-04", "CSRF + Origin/Host validation for cookie mutation; no state-changing GET", "Cross-origin test"],
  ["APP-05", "Output encoding/CSP; provider embed isolated with redirect fallback", "Security-header test"],
  ["APP-06", "SSRF: canonical URL, allowed scheme/host, deny private/link-local/metadata IP after DNS/redirect", "SSRF fixtures"],
  ["APP-07", "Risk-based rate limit; 429 Retry-After; privacy-safe key", "Abuse/load test"],
  ["APP-08", "Admin mutation = authorize + validate + version + write + redacted audit + outbox atomically", "Transaction rollback test"],
  ["APP-09", "Stable error + traceId; never stack/SQL/token/path; allowlist logging", "Error/redaction test"],
  ["APP-10", "Use OWASP ASVS 5.0 as versioned verification catalog; no certification claim", "Mapped checklist/evidence"],
] as const;

const containers = [
  ["CNT-01", "Docker Engine CE/Compose v2/BuildKit from approved official source; record version/digest.", "Host/image inventory"],
  ["CNT-02", "Non-root application; read-only root filesystem where compatible; explicit writable paths.", "Runtime inspect"],
  ["CNT-03", "No privileged, host network/PID, writable Docker socket or broad host mount.", "CI/runtime policy"],
  ["CNT-04", "Separate edge/app/data/observability networks; DB/Worker/Alloy not public.", "Network/port evidence"],
  ["CNT-05", "Only Caddy publishes 80/443; HTTPS redirect and external certificate-expiry check.", "Firewall/HTTPS probe"],
  ["CNT-06", "Drop capabilities + no-new-privileges; only documented additions.", "Container spec"],
  ["CNT-07", "Read-only secret only to required service; absent from image/Compose/env dump/log.", "Secret/runtime scan"],
  ["CNT-08", "Production image pinned by digest with SBOM/dependency/image/secret scans.", "CI artifact"],
  ["CNT-09", "CPU/memory/PID/log quotas, health checks; reserve ≥25% CPU, 16 GB RAM, 20% disk.", "Load/capacity report"],
  ["CNT-10", "One-shot migration after backup with lock/time, forward-fix/restore plan.", "Release record"],
  ["CNT-11", "Versioned secret-free Compose/Caddy/runbook; restricted deploy user; rollback manifest.", "Rollback rehearsal"],
] as const;

const ovhGates = [
  ["OVH-G01", "RAID1/NVMe/filesystem", "Verified RAID1; SMART/NVMe/RAID + disk 70/80/90% alerts", "Pending evidence"],
  ["OVH-G02", "Off-host recovery", "Encrypted base + continuous WAL; separate credential; monthly timed restore", "Pending restore"],
  ["OVH-G03", "Network/SSH", "Default deny; public 80/443; SSH key-only VPN/IP allowlist; root/DB public disabled", "Pending scan"],
  ["OVH-G04", "Release/secret", "Digest, migration, health/smoke, rollback, external secret and audit", "Pending rehearsal"],
  ["OVH-G05", "Monitoring", "Uptime + host/RAID/disk/backup/DB/queue/security/missing telemetry alerts", "Pending rehearsal"],
  ["OVH-G06", "Capacity/latency", "PRO-04 load/latency from Lao/SEA + resource reserve/saturation evidence", "Pending test"],
] as const;

const secrets = [
  ["KEY-01", "Session/signing", "Web/API", "≤90 days with key overlap; immediately on suspicion", "Platform Admin"],
  ["KEY-02", "DB app/migration/backup", "Separate least-privilege principals", "≤90 days or role/person/environment change", "Platform Admin"],
  ["KEY-03", "OIDC client", "Auth service only", "Provider policy; immediately on compromise", "Identity Owner"],
  ["KEY-04", "R2/evidence/backup", "Separate evidence and append/restore roles", "≤90 days; restore credential absent from app", "Platform Admin"],
  ["KEY-05", "Grafana/OTLP", "Alloy ingest only", "≤90 days or telemetry anomaly", "Operations"],
  ["KEY-06", "GitHub/deploy", "Environment/repository minimum scope", "Short-lived where possible; otherwise ≤90 days", "Release Owner"],
] as const;

const patching = [
  ["Debian", "Security repo/unattended-upgrades for approved scope; reboot-required alert", "Critical reachable/exploited ≤72 h; High ≤7 d; monthly routine"],
  ["Container/base", "Digest rebuild + PR/nightly/release scan", "Critical reachable ≤72 h; High ≤7 d"],
  ["Application dependency", "Lockfile + dependency/secret/SAST scan", "Critical reachable ≤72 h; High ≤7 d; other monthly"],
  ["Caddy/PostgreSQL/Docker", "Official advisory + supported-version tracking", "Critical ≤72 h; High ≤7 d"],
] as const;

const recovery = [
  ["REC-G01", "PostgreSQL", "Daily encrypted base + continuous off-host WAL", "RPO ≤1 h; RTO ≤8 h", "Monthly isolated PITR + integrity/app smoke"],
  ["REC-G02", "Restricted evidence", "Encrypted/versioned object storage + checksum inventory", "RPO/RTO ≤24 h", "Quarterly sampled restore/access test"],
  ["REC-G03", "Configuration", "Secret-free Git config/runbook + separate sealed recovery material", "Last approved commit; RTO ≤4 h", "Quarterly clean-host reconstruction"],
  ["REC-G04", "Telemetry/audit archive", "Provider retention + restricted archive", "Per RET-07—09", "Quarterly query/export/integrity sample"],
] as const;

const restoreSteps = [
  ["DR-01", "Declare incident, freeze destructive automation, name commander/target timestamp.", "Incident authorization"],
  ["DR-02", "Preserve failed host/volume/WAL/log evidence; never overwrite only copy.", "Evidence inventory/checksum"],
  ["DR-03", "Provision isolated host/network and restore secrets through break-glass.", "Host/access evidence"],
  ["DR-04", "Restore base, replay WAL, verify PostgreSQL consistency/migration version.", "Backup/WAL/timing record"],
  ["DR-05", "Start maintenance/read-only; verify auth, Published boundary, audit/outbox/search/evidence.", "Smoke/reconciliation"],
  ["DR-06", "Resume worker/writes, cut traffic, monitor, communicate, rotate and review.", "Measured RPO/RTO + actions"],
] as const;

const detections = [
  ["SEC-DET-01", "Authentication attack", "Failed login/MFA/recovery anomaly", "Rate/challenge/revoke + escalate"],
  ["SEC-DET-02", "Privilege change", "Role/account/MFA/break-glass event", "Immediate alert/audit review"],
  ["SEC-DET-03", "Authorization abuse", "Repeated forbidden/enumeration/cross-role", "Block/investigate"],
  ["SEC-DET-04", "Sensitive evidence access", "Outside assignment/unusual volume", "Suspend export/session"],
  ["SEC-DET-05", "Bulk data movement", "Export/query/result above threshold", "Stop/revoke/preserve"],
  ["SEC-DET-06", "Audit/monitor tamper", "Audit fail, collector silence, alert disable", "Rollback protected write or S1"],
  ["SEC-DET-07", "Config/secret change", "Firewall/Compose/Caddy/OIDC/backup change", "Revert/rotate/investigate"],
  ["SEC-DET-08", "Data integrity anomaly", "Published leak/orphan/outbox divergence/checksum fail", "Safe-hide/rebuild/restore"],
] as const;

const incidents = [
  ["S1 Critical", "PII/secret leak, admin takeover, audit tamper, restricted leak, unrecoverable loss", "Auto-safe + On-call alert immediately; acknowledge ≤60 min at all times"],
  ["S2 High", "Material auth bypass, sustained outage, backup degradation, active abuse", "Ack ≤2 h in coverage; contain same coverage period"],
  ["S3 Medium", "Limited weakness, recurring error, suspicious event without confirmed impact", "Next business day; fix or expiring risk acceptance"],
  ["S4 Low", "Hardening improvement without current impact", "Backlog + monthly review"],
] as const;

const releaseGates = [
  ["G-SEC-01", "Threat/control", "THR-01—12 each has owner, implemented control, evidence and residual-risk result"],
  ["G-SEC-02", "Identity/access", "OIDC/MFA/session/role/negative authz/break-glass/offboarding/access review pass"],
  ["G-SEC-03", "Privacy/legal", "Data map, consent/withdrawal, RET-01—10, vendor register and LEG-01—08 complete; otherwise analytics off"],
  ["G-SEC-04", "Application security", "ASVS map + SAST/dependency/secret/image/DAST/SSRF/CSRF/authz tests; Critical/High = 0"],
  ["G-SEC-05", "Host/container", "CNT-01—11 + OVH-G01/G03/G04/G06 pass; port/privilege scan clean"],
  ["G-SEC-06", "Recovery", "OVH-G02 + DR-01—06 timed restore meets approved RPO/RTO"],
  ["G-SEC-07", "Monitoring/incident", "OVH-G05 + SEC-DET-01—08 + alert/missing-data/S1 tabletop pass"],
  ["G-SEC-08", "Release authority", "Founder signs residual single-host/on-call/vendor/legal risk and Go/No-Go"],
] as const;

const reviews = [
  ["REV-01", "Risk/single host", "ອະນຸມັດ OVH Single-host Pilot ແບບບໍ່ອ້າງ HA, ຜ່ານ OVH-G01—06/CNT-01—11 ແລະໃຊ້ fallback ເມື່ອ gate ບໍ່ຜ່ານ.", "ອະນຸມັດແບບມີເງື່ອນໄຂ", "Approved"],
  ["REV-02", "Identity/access", "ອະນຸມັດ Managed OIDC + MFA ທຸກ Admin, IAM-01—08 ແລະ 30-min idle/12-h absolute/15-min step-up; provider ລັອກຫຼັງ quote/audit/region/exit test.", "ອະນຸມັດ Control; ຍັງບໍ່ລັອກ Provider", "Approved"],
  ["REV-03", "Consent/retention", "ອະນຸມັດ RET-01—10 ເປັນ Technical/Product baseline; optional analytics ປິດຈົນ Consent, Vendor ແລະ Legal Review ຜ່ານ.", "ອະນຸມັດ Technical/Product; Legal ຍັງຄົງຄ້າງ", "Approved"],
  ["REV-04", "Recovery", "ອະນຸມັດ RPO ≤1h ແລະ RTO ≤8h ເປັນ Target ດ້ວຍ daily base + continuous WAL + monthly restore; ຫ້າມອ້າງ SLO ຈົນ timed restore ຜ່ານ.", "ອະນຸມັດ Target; Evidence ກ່ອນ SLO", "Approved"],
  ["REV-05", "Monitoring/incident", "ອະນຸມັດ SIEM-ready, SEC-DET-01—08, S1—S4, human coverage 08:00–22:00 ICT ແລະ 24×7 automated safe action. S1 ຕ້ອງແຈ້ງ On-call ທັນທີ ແລະຮັບຮູ້ພາຍໃນ 60 ນາທີ.", "ອະນຸມັດພ້ອມປັບ S1; Managed SIEM/24×7 SOC ຕາມ Trigger", "Approved"],
] as const;

export default function SecurityInfrastructureDocument({ basePath }: Props) {
  return <article className={styles.formalDocument}>
    <header className={styles.formalDocumentHeader}>
      <p>TEC-06 · SECURITY / PRIVACY / INFRASTRUCTURE · 30 AUGUST 2026</p>
      <h1>Security, Privacy ແລະ Infrastructure</h1><h2>Production Pilot Control Baseline</h2>
      <span className={styles.formalStatus}>1.0 · ອະນຸມັດແລ້ວ</span>
    </header>
    <aside className={styles.formalDraftNotice}><strong>ຈຸດປະສົງ</strong><p>ປ່ຽນ Security, Privacy, OVH, Container, Backup, Monitoring ແລະ Incident decisions ຈາກ TEC-01/03/04/05 ໃຫ້ເປັນ Control, Owner, Evidence ແລະ Release Gate. ນີ້ແມ່ນ Technical/Product Baseline ບໍ່ແທນຄຳປຶກສາກົດໝາຍລາວ.</p></aside>
    <nav className={styles.formalToc} aria-label="ສາລະບານ TEC-06"><h2>ສາລະບານ</h2><ol>
      <li><a href="#tec06-control">ການຄວບຄຸມ</a></li><li><a href="#tec06-scope">Scope/Decisions</a></li>
      <li><a href="#tec06-threat">Data/Threat</a></li><li><a href="#tec06-access">Identity/Access</a></li>
      <li><a href="#tec06-privacy">Privacy/Retention</a></li><li><a href="#tec06-app">Application Security</a></li>
      <li><a href="#tec06-infra">Infrastructure</a></li><li><a href="#tec06-secrets">Secret/Patch</a></li>
      <li><a href="#tec06-recovery">Recovery</a></li><li><a href="#tec06-monitor">Monitoring/Incident</a></li>
      <li><a href="#tec06-release">Release/Artifacts</a></li><li><a href="#tec06-sources">Sources</a></li>
      <li><a href="#tec06-review">5 ຂໍ້ທົບທວນ</a></li>
    </ol></nav>

    <section id="tec06-control" className={styles.formalSection}><h2><span>01</span> ການຄວບຄຸມເອກະສານ</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
        <tr><th>ID / status</th><td><code>TEC-06</code> · 1.0 — Design/Operations Baseline approved 30 August 2026</td></tr>
        <tr><th>Owner / approver</th><td>Technical/Security Owner / Founder; Legal Reviewer ອະນຸມັດ privacy/legal</td></tr>
        <tr><th>Inputs</th><td>CON-04/05, PRO-03/04, TEC-01/03/04/05 ແລະ OVH server specification</td></tr>
        <tr><th>Outputs</th><td>Threat/control, access/session, retention, hardening, RPO/RTO, restore, monitoring/incident and evidence gates</td></tr>
      </tbody></table></div>
    </section>

    <section id="tec06-scope" className={styles.formalSection}><h2><span>02</span> Scope ແລະ Decisions</h2>
      <p><strong>In:</strong> Guest/Public, Admin/OIDC, PostgreSQL/Worker/Search, evidence/R2, OVH Debian/Docker/Caddy, CI/CD, Grafana and recovery. <strong>Out:</strong> customer/creator login, booking/payment/card, private message, AI training, Kubernetes/Swarm, multi-region HA and 24×7 human SOC.</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Decision</th><th>Meaning</th></tr></thead><tbody>{decisions.map(([id,d,m])=><tr key={id}><td><code>{id}</code></td><td><strong>{d}</strong></td><td>{m}</td></tr>)}</tbody></table></div>
    </section>

    <section id="tec06-threat" className={styles.formalSection}><h2><span>03</span> Data Classification ແລະ Threat Model</h2>
      <h3>3.1 Data classes</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Class</th><th>Examples</th><th>Access</th><th>Handling</th></tr></thead><tbody>{dataClasses.map(([id,c,e,a,h])=><tr key={id}><td><code>{id}</code></td><td><strong>{c}</strong></td><td>{e}</td><td>{a}</td><td>{h}</td></tr>)}</tbody></table></div>
      <p><strong>Trust boundary:</strong> Internet → Caddy → Web/API → PostgreSQL/Worker → R2/OIDC/Grafana/External Sources. Provider response, URL, header and event are untrusted; Admin browser never connects directly to DB/Object Storage.</p>
      <h3>3.2 Threat register</h3><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Threat</th><th>Path</th><th>Controls</th><th>Evidence</th></tr></thead><tbody>{threats.map(([id,t,p,c,e])=><tr key={id}><td><code>{id}</code></td><td><strong>{t}</strong></td><td>{p}</td><td>{c}</td><td>{e}</td></tr>)}</tbody></table></div>
      <aside className={styles.formalNote}><strong>Risk rule</strong><p>Critical/High risk ຕ້ອງມີ owner, reason, compensating control ແລະ expiry; rerun model ຫຼັງ major scope/provider/data-flow change ຫຼື material incident.</p></aside>
    </section>

    <section id="tec06-access" className={styles.formalSection}><h2><span>04</span> Identity, Access ແລະ Session</h2>
      <p>Authorize ຈາກ identity + active account + role + action + resource/state; default Deny. ຖ້າ Pilot ມີຄົນດຽວ, privileged self-decision ຕ້ອງ step-up, decision note ແລະ weekly second-review queue.</p>
      <h3>4.1 Role boundary</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Role</th><th>Allowed</th><th>Forbidden</th></tr></thead><tbody>{roles.map(([r,a,f])=><tr key={r}><td><code>{r}</code></td><td>{a}</td><td>{f}</td></tr>)}</tbody></table></div>
      <h3>4.2 IAM controls</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Control</th><th>Evidence</th></tr></thead><tbody>{iam.map(([id,c,e])=><tr key={id}><td><code>{id}</code></td><td>{c}</td><td>{e}</td></tr>)}</tbody></table></div>
    </section>

    <section id="tec06-privacy" className={styles.formalSection}><h2><span>05</span> Privacy, Consent ແລະ Retention</h2>
      <p>Essential processing ຕ້ອງຈຳເປັນແລະມີ Notice. Optional analytics default off, ບໍ່ block core journey, ຖອນ consent ໄດ້ ແລະບໍ່ສົ່ງ event ກ່ອນ consent check. Vendor register ຕ້ອງມີ data/region/contract/subprocessor/retention/exit-delete evidence.</p>
      <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Data</th><th>Purpose</th><th>Retention</th><th>Deletion</th><th>Approval</th></tr></thead><tbody>{retention.map(([id,d,p,r,x,a])=><tr key={id}><td><code>{id}</code></td><td><strong>{d}</strong></td><td>{p}</td><td>{r}</td><td>{x}</td><td>{a}</td></tr>)}</tbody></table></div>
      <aside className={styles.formalDecision}><strong>Fail-safe</strong><p>Pending Legal = optional analytics off, restricted case receives minimum data, export off, no invented consent default or longer retention. Backup is recovery-only and expires as a set; legal hold requires reason/owner/expiry.</p></aside>
    </section>

    <section id="tec06-app" className={styles.formalSection}><h2><span>06</span> Application Security ແລະ Secure SDLC</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Control</th><th>Verification</th></tr></thead><tbody>{appControls.map(([id,c,v])=><tr key={id}><td><code>{id}</code></td><td>{c}</td><td>{v}</td></tr>)}</tbody></table></div>
      <p><strong>CI/CD:</strong> PR runs lint/type/unit/contract/dependency/license/secret/SAST/migration review; build emits minimal digest-pinned image + SBOM/scan; staging runs migration, negative authz, CSRF/SSRF/injection, DAST/abuse, Must journeys and rollback prerequisite. Release has unresolved Critical/High = 0 unless expiring Founder-approved exception.</p>
    </section>

    <section id="tec06-infra" className={styles.formalSection}><h2><span>07</span> OVH, Debian, Docker ແລະ Network</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
        <tr><th>Host</th><td>OVH Singapore · AMD EPYC 7313 16c/32t · 128 GB ECC · 2×960 GB NVMe · Debian 13</td></tr>
        <tr><th>Topology</th><td>Caddy → Web/API → PostgreSQL/Graphile Worker/Grafana Alloy; outbound TLS to R2/OIDC/Grafana/backup</td></tr>
        <tr><th>Public</th><td>Caddy 80/443 only; SSH via VPN/IP allowlist; DB/Worker/Alloy/Docker API not public</td></tr>
        <tr><th>Claim</th><td>Single host + RAID1 is recovery-based Pilot, not HA</td></tr>
      </tbody></table></div>
      <h3>7.1 Container controls</h3><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Control</th><th>Evidence</th></tr></thead><tbody>{containers.map(([id,c,e])=><tr key={id}><td><code>{id}</code></td><td>{c}</td><td>{e}</td></tr>)}</tbody></table></div>
      <h3>7.2 OVH gates</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Area</th><th>Required evidence</th><th>State</th></tr></thead><tbody>{ovhGates.map(([id,a,e,s])=><tr key={id}><td><code>{id}</code></td><td><strong>{a}</strong></td><td>{e}</td><td>{s}</td></tr>)}</tbody></table></div>
      <p>Firewall default-deny. Docker traffic ຕ້ອງກວດ Docker firewall path/DOCKER-USER, ບໍ່ພຶ່ງ UFW ຢ່າງດຽວ. Egress allowlist OIDC/R2/Grafana/backup/DNS/NTP/package/approved source; deny metadata/private/link-local destinations.</p>
    </section>

    <section id="tec06-secrets" className={styles.formalSection}><h2><span>08</span> Secret, Key ແລະ Patch</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Secret</th><th>Boundary</th><th>Rotation</th><th>Owner</th></tr></thead><tbody>{secrets.map(([id,s,b,r,o])=><tr key={id}><td><code>{id}</code></td><td><strong>{s}</strong></td><td>{b}</td><td>{r}</td><td>{o}</td></tr>)}</tbody></table></div>
      <p>Production secret lives outside Git/image/Compose, mounts read-only under <code>/run/secrets</code> or approved mechanism only to required service. Inventory stores metadata—not value. Suspected exposure: revoke/rotate first, investigate second.</p>
      <h3>8.1 Patch SLA</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Surface</th><th>Detection</th><th>Target</th></tr></thead><tbody>{patching.map(([s,d,t])=><tr key={s}><th>{s}</th><td>{d}</td><td>{t}</td></tr>)}</tbody></table></div>
    </section>

    <section id="tec06-recovery" className={styles.formalSection}><h2><span>09</span> Backup, Restore ແລະ Disaster Recovery</h2>
      <aside className={styles.formalDecision}><strong>Proposed Pilot target</strong><p>PostgreSQL <strong>RPO ≤1 hour</strong> / <strong>RTO ≤8 hours</strong>, replacing TEC-01 provisional RPO 24h. It becomes an SLO only after a timed restore passes.</p></aside>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Asset</th><th>Method</th><th>Objective</th><th>Verification</th></tr></thead><tbody>{recovery.map(([id,a,m,o,v])=><tr key={id}><td><code>{id}</code></td><td><strong>{a}</strong></td><td>{m}</td><td>{o}</td><td>{v}</td></tr>)}</tbody></table></div>
      <h3>9.1 Restore runbook</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Step</th><th>Action</th><th>Evidence</th></tr></thead><tbody>{restoreSteps.map(([id,a,e])=><tr key={id}><td><code>{id}</code></td><td>{a}</td><td>{e}</td></tr>)}</tbody></table></div>
      <ul className={styles.formalPlainList}><li>Encrypt off-host; backup/app/delete/restore credentials separated. Job records ID, timing, bytes, checksum, WAL range, key ID and outcome.</li><li>Monthly drill restores isolated—not over Production—and validates auth, Published boundary, audit, outbox, search rebuild and evidence reference.</li><li>Two consecutive failures, no valid off-host point or RTO &gt;8h blocks release and triggers fallback evaluation.</li></ul>
    </section>

    <section id="tec06-monitor" className={styles.formalSection}><h2><span>10</span> Observability, SIEM-ready ແລະ Incident</h2>
      <p>Pino/OpenTelemetry → local Grafana Alloy → Grafana Cloud Loki/Mimir/Tempo/Alerting. App logs may sample; Audit/required Security Events do not. Telemetry failure never blocks Guest request but missing-data alert must be external.</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Detection</th><th>Signal</th><th>Response</th></tr></thead><tbody>{detections.map(([id,d,s,r])=><tr key={id}><td><code>{id}</code></td><td><strong>{d}</strong></td><td>{s}</td><td>{r}</td></tr>)}</tbody></table></div>
      <h3>10.1 Severity and coverage</h3><p>Approved baseline: human coverage <strong>08:00–22:00 ICT daily</strong>; alert/automated safe action 24×7. S1 alerts On-call immediately and must be acknowledged within <strong>60 minutes at all times</strong>. This is not a claim of 24×7 human SOC.</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Severity</th><th>Examples</th><th>Target</th></tr></thead><tbody>{incidents.map(([s,e,t])=><tr key={s}><th>{s}</th><td>{e}</td><td>{t}</td></tr>)}</tbody></table></div>
      <p><strong>Lifecycle:</strong> Prepare → Detect/Triage → Contain → Eradicate/Recover → fact-based communication → post-incident review within 5 business days. Managed SIEM evaluation trigger: payment/booking, compliance, dedicated owner, cross-source complexity or material incident.</p>
    </section>

    <section id="tec06-release" className={styles.formalSection}><h2><span>11</span> Release Gates ແລະ Artifacts</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Gate</th><th>Pass evidence</th></tr></thead><tbody>{releaseGates.map(([id,g,e])=><tr key={id}><td><code>{id}</code></td><td><strong>{g}</strong></td><td>{e}</td></tr>)}</tbody></table></div>
      <p><strong>No-Go:</strong> open S1/Critical, High without expiry, no valid backup/restore, Admin without MFA, public DB/evidence, missing audit or unknown consent/legal behavior.</p>
      <div className={styles.architectureArtifacts}>
        <a href={`${basePath}/artifact-preview?file=tec06-security-privacy-infrastructure-baseline-2026-08-30.json&from=security-infrastructure`}><b>ພຣີວິວ Baseline JSON</b><span>Decisions, objectives, gates and review</span></a>
        <a href={`${basePath}/artifact-preview?file=tec06-security-control-matrix-2026-08-30.csv&from=security-infrastructure`}><b>ພຣີວິວ Control Matrix</b><span>Threat/control/owner/evidence/result</span></a>
        <a href={`${basePath}/artifact-preview?file=tec06-retention-register-2026-08-30.csv&from=security-infrastructure`}><b>ພຣີວິວ Retention Register</b><span>Data/purpose/duration/deletion/legal state</span></a>
        <a href={`${basePath}/artifact-preview?file=tec06-backup-restore-runbook-template-2026-08-30.json&from=security-infrastructure`}><b>ພຣີວິວ Restore Runbook</b><span>Authorization, steps, timing and evidence</span></a>
        <a href={`${basePath}/templates/tec06-security-privacy-infrastructure-baseline-2026-08-30.json`} download><b>ດາວໂຫຼດ Baseline JSON</b><span>Machine-readable handoff</span></a>
        <a href={`${basePath}/templates/tec06-security-control-matrix-2026-08-30.csv`} download><b>ດາວໂຫຼດ Control CSV</b><span>Implementation/QA register</span></a>
        <a href={`${basePath}/templates/tec06-retention-register-2026-08-30.csv`} download><b>ດາວໂຫຼດ Retention CSV</b><span>Product/Legal/Technical register</span></a>
        <a href={`${basePath}/templates/tec06-backup-restore-runbook-template-2026-08-30.json`} download><b>ດາວໂຫຼດ Restore JSON</b><span>Monthly drill template</span></a>
      </div>
    </section>

    <section id="tec06-sources" className={styles.formalSection}><h2><span>12</span> Official Sources</h2>
      <p>Checked 30 August 2026. Sources establish capabilities/guidance; project timeouts, retention, RPO/RTO and coverage remain explicit project decisions.</p>
      <ul className={styles.formalNumberList}>
        <li><a href="https://owasp.org/www-project-application-security-verification-standard/">OWASP ASVS 5.0</a> — versioned web security verification catalog; no certification claim.</li>
        <li><a href="https://pages.nist.gov/800-63-4/sp800-63b.html">NIST SP 800-63B</a> — authentication/authenticator/session guidance.</li>
        <li><a href="https://csrc.nist.gov/pubs/sp/800/61/r3/final">NIST SP 800-61 Rev. 3</a> — incident response and risk management.</li>
        <li><a href="https://www.postgresql.org/docs/18/backup.html">PostgreSQL 18 Backup</a> / <a href="https://www.postgresql.org/docs/18/app-pgbasebackup.html">pg_basebackup</a> — base backup, WAL and PITR.</li>
        <li><a href="https://docs.docker.com/engine/network/packet-filtering-firewalls/">Docker firewalls</a> — Docker packet-filtering/published-port behavior.</li>
        <li><a href="https://caddyserver.com/docs/automatic-https">Caddy Automatic HTTPS</a> — certificate automation and redirect.</li>
        <li><a href="https://www.debian.org/security/">Debian Security</a> — advisories/update channel and unattended-upgrades.</li>
      </ul>
    </section>

    <section id="tec06-review" className={styles.formalSection}><h2><span>13</span> ບັນທຶກການອະນຸມັດ 5 ຂໍ້</h2>
      <p>Founder/Product Owner ອະນຸມັດ REV-01—05 ວັນທີ 30 ສິງຫາ 2026. Version 1.0 ລັອກ Design/Operations Baseline; G-SEC-01—08 ຍັງຕ້ອງມີຫຼັກຖານກ່ອນ Public Pilot.</p>
      <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Topic</th><th>Approved decision</th><th>Meaning</th><th>Status</th></tr></thead><tbody>{reviews.map(([id,t,q,r,s])=><tr key={id}><td><code>{id}</code></td><td><strong>{t}</strong></td><td>{q}</td><td>{r}</td><td><strong>{s}</strong></td></tr>)}</tbody></table></div>
      <aside className={styles.formalApproval}><strong>TEC-06 · ສະບັບ 1.0</strong><p>Threat, Role, Access, Privacy, Infrastructure, Recovery, Monitoring, Incident ແລະ Release contracts ຖືກອະນຸມັດເປັນ Developer/Operations Handoff Baseline. Legal Review, provider selection ແລະ G-SEC-01—08 ຍັງເປັນ Pre-launch Evidence; ຫ້າມໝາຍ Control ວ່າ Passed ໂດຍບໍ່ມີຫຼັກຖານ.</p></aside>
    </section>

    <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
      <a href={`${basePath}/documents/ai-recommendation`}><small>← PREVIOUS</small><strong>TEC-05 · Search &amp; AI Recommendation</strong></a>
      <a href={`${basePath}/documents/development-plan`}><small>NEXT →</small><strong>DEL-01 · Development Plan</strong></a>
    </nav>
  </article>;
}
