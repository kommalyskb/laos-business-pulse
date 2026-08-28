import styles from "../documents.module.css";

const constraints = [
  ["TP-C01", "Architecture", "TEC-01 1.0 ອະນຸມັດ Modular Monolith-first, Relational source of truth, Queue/Outbox, Link-only media ແລະ Server-enforced security."],
  ["TP-C02", "Product scope", "PRO-03 1.0 ກຳນົດ Must scope, Pilot inventory 30 → 60 → 100 Places, Restaurant/Café ແລະບໍ່ມີ Booking/Payment."],
  ["TP-C03", "Financial boundary", "ງົບ 25 ລ້ານກີບ = ຄ່າຄອງຊີບ 15 ລ້ານ + ວຽກທົດລອງ 10 ລ້ານ; ບໍ່ແມ່ນງົບຈ້າງສ້າງ Production MVP ທັງໝົດ."],
  ["TP-C04", "Operating model", "Correction, verification, source recheck, partner onboarding/payment ແລະ report ເຮັດ Manual ໃນ Pilot; ທົບທວນ automation ເມື່ອເກີນ 20 ຊົ່ວໂມງ/ອາທິດ 2 ອາທິດຕິດຕໍ່ກັນ."],
  ["TP-C05", "Quality", "Core journey ຕ້ອງຜ່ານ performance, trust, privacy, accessibility, backup/rollback ແລະ UAT gate ກ່ອນ Public Pilot."],
  ["TP-C06", "Evidence", "ການສະເໜີລາຄາ, effort ແລະ timeline ໃນ TEC-02 ເປັນ Rough Order of Magnitude; ລາຄາຕົວຈິງຕ້ອງມີ quote/evidence ໃນ TEC-03 ແລະ DEL-01."],
] as const;

const deliveryOptions = [
  ["OPT-A", "Prototype + Concierge only", "ໄວ ແລະໃຊ້ເງິນສົດຕ່ຳ; ພິສູດ user/owner behavior ໄດ້", "ບໍ່ພິສູດ production reliability, auth, durable data ຫຼື scale", "ໃຊ້ໃນ Validation Track ເທົ່ານັ້ນ", "Conditional"],
  ["OPT-B", "Founder-led hybrid build", "Founder ຄຸມ domain/code; ໃຊ້ managed services ແລະຈ້າງ specialist ສະເພາະ security/QA/infra", "Founder capacity ເປັນ bottleneck; ຕ້ອງຄວບຄຸມ scope ແລະບັນທຶກ shadow cost", "Production MVP ຫຼັງຜ່ານຈຸດອະນຸມັດ", "Recommended"],
  ["OPT-C", "Agency / outsourced full build", "ເພີ່ມຄົນໄດ້ໄວ ແລະມີ contract deliverable", "ຕ້ອງມີ specification/acceptance ຄົບ, ຄ່າໃຊ້ຈ່າຍສູງ ແລະສ່ຽງ vendor dependency", "ປຽບທຽບໄດ້ຫຼັງ TEC-03/04; ບໍ່ຢູ່ໃນງົບ 10 ລ້ານ", "Not now"],
  ["OPT-D", "Microservices / self-managed infrastructure", "ຄວບຄຸມໄດ້ຫຼາຍ ແລະແຍກ scale", "deployment, security, monitoring, backup ແລະ debugging burden ສູງເກີນ Pilot", "ພິຈາລະນາສະເພາະມີ scale/team evidence", "Rejected for Pilot"],
] as const;

const tracks = [
  ["TRACK-A", "Validation Pilot · 6 ອາທິດ", "Prototype R2.3 + Admin R5.0, curated dataset, manual correction/partner/report, user test ແລະ paid/deposit/LOI evidence", "ຢູ່ພາຍໃນງົບ 25 ລ້ານກີບທີ່ອະນຸມັດ", "ການເລີ່ມ Production MVP ບໍ່ແມ່ນຜົນອັດຕະໂນມັດ"],
  ["TRACK-B", "Production MVP · ຫຼັງ approval", "Durable backend, Admin auth/audit, Place/Source workflow, Guest feed/search/place/action, consent analytics, trust/takedown ແລະ recovery", "ຕ້ອງມີ stack decision, person-day baseline, vendor quote, funding source ແລະ release plan", "Must scope ເທົ່ານັ້ນ; Should ເຂົ້າໄດ້ຜ່ານ change control"],
] as const;

const workPackages = [
  ["TP-WP01", "Foundation & delivery controls", "Repository structure, environment, CI/CD, schema/migration foundation, identity, audit, secrets, logs", 8, 12, "TEC-01 · TEC-06"],
  ["TP-WP02", "Admin Place/Source vertical slice", "Draft → validation → publish, source attribution, evidence, duplicate warning, search projection update", 14, 20, "PRO-02 · CON-02/04"],
  ["TP-WP03", "Guest decision journey", "Feed, Search/filter, canonical Place, menu/photo detail, Map/Call/Message, media fallback", 16, 24, "UX-05 · PERF-01—04"],
  ["TP-WP04", "Trust, analytics & partner operations", "Correction/takedown, consent events, Decision Intent, Founding Partner, manual performance summary", 18, 26, "BUS-06 · PRO-03"],
  ["TP-WP05", "Hardening & release readiness", "Security checks, integration/E2E, accessibility, performance, backup/restore, rollback, UAT defects", 14, 20, "PRO-04 · TEC-06"],
  ["TP-WP06", "Pilot support & handoff", "Runbook, known limitations, data seed/import, operator training, launch support and evidence pack", 5, 8, "DEL-01—04"],
] as const;

const totalMin = workPackages.reduce((sum, row) => sum + row[3], 0);
const totalMax = workPackages.reduce((sum, row) => sum + row[4], 0);

const releaseSteps = [
  ["P0", "Foundation", "Admin identity, audit, migration, environment and observability work before business mutation"],
  ["P1", "First vertical slice", "Admin creates Place + Source → publishes → Guest opens canonical Place → Map action is recorded"],
  ["P2", "Discover & decide", "Feed, Search/filter, Place detail, media fallback and Decision actions"],
  ["P3", "Trust & revenue evidence", "Correction/takedown, consent analytics, Founding Partner and performance summary"],
  ["P4", "Hardening & Pilot", "Performance, accessibility, security, backup/restore, UAT, rollback and operator rehearsal"],
] as const;

const costRules = [
  ["Cash development cost", "External specialist days × approved day rate + build tools/services + test devices/data + contingency", "ເງິນທີ່ຈ່າຍຈິງ"],
  ["Economic development cost", "Cash development cost + Founder person-days × reference day rate", "ສະແດງຕົ້ນທຶນແຮງງານທີ່ບໍ່ໄດ້ຈ່າຍ"],
  ["Monthly run cost", "Application + Database + Storage/Egress + Queue/Search + Observability + Backup + External API + Support reserve", "ຄ່າດຳເນີນງານຕໍ່ເດືອນ"],
  ["Cost per published Place", "Content/data labor + allocated system cost ÷ Published Places", "ກວດວ່າ inventory ຂະຫຍາຍໄດ້ຫຼືບໍ່"],
  ["Cost per unique intent", "Allocated platform + operation cost ÷ valid unique Map/Call/Message actions", "ຫ້າມແປ intent ເປັນ visit ຫຼື sale"],
] as const;

const risks = [
  ["TP-R01", "Critical", "ງົບ validation ຖືກໃຊ້ເປັນງົບສ້າງ production", "ແຍກ Track A/B; ຫ້າມຈ້າງ full build ໂດຍບໍ່ມີ funding decision", "Product Owner"],
  ["TP-R02", "High", "Scope creep ຈາກ 55 Admin views ແລະ Should features", "Build ຕາມ vertical slice/Must; feature ໃໝ່ຕ້ອງລະບຸສິ່ງທີ່ຖືກເລື່ອນ", "Product + SA"],
  ["TP-R03", "High", "Social embed/API/policy ປ່ຽນ ຫຼື source ຫາຍ", "Link-only, timeout/fallback, source state, bounded retry ແລະ takedown", "Tech + Trust"],
  ["TP-R04", "High", "Founder ເປັນ single capacity/knowledge point", "Decision log, automated test, runbook, code review ແລະ specialist checkpoint", "Founder"],
  ["TP-R05", "High", "Manual data freshness/support ເກີນກຳລັງ", "ວັດ time-per-place/work queue; ຢຸດ inventory ແລະທົບທວນ automation ຕາມ trigger", "Operations"],
  ["TP-R06", "High", "Admin access, evidence ຫຼື audit ບໍ່ປອດໄພ", "Server authorization, least privilege, atomic audit, secret store, backup/restore gate", "Tech + Security"],
  ["TP-R07", "Medium", "Analytics ຖືກຕີຄວາມເປັນ visit/sale", "Consent, dedupe, metric dictionary ແລະ label Decision Intent ຊັດເຈນ", "Product + Data"],
  ["TP-R08", "Medium", "Managed service lock-in ຫຼືຄ່າ run cost ເພີ່ມ", "Portable data export, relational schema, adapter boundary, monthly cost threshold", "Tech Lead"],
] as const;

const reviews = [
  ["REV-01", "Delivery model", "ອະນຸມັດ 2 Tracks: Validation Pilot 6 ອາທິດກ່ອນ ແລະ Production MVP ເລີ່ມຫຼັງມີ approval/funding ຫຼືບໍ່?", "ແນະນຳ: ອະນຸມັດ; ຫ້າມຖືວ່າ Prototype/Validation = Production MVP"],
  ["REV-02", "Resourcing", "ອະນຸມັດ Founder-led hybrid build ພ້ອມ specialist checkpoint ແທນ full outsource ຫຼືບໍ່?", "ແນະນຳ: ອະນຸມັດ ແລະບັນທຶກ founder person-days/shadow cost"],
  ["REV-03", "Scope control", "ອະນຸມັດ Must-only production baseline ແລະໃຫ້ Should ເຂົ້າຜ່ານ evidence/change control ຫຼືບໍ່?", "ແນະນຳ: ອະນຸມັດ; ຮັກສາ first vertical slice ກ່ອນຂະຫຍາຍ"],
  ["REV-04", "Cost authority", "ອະນຸມັດວ່າ 25 ລ້ານກີບເປັນ Validation Budget; Production Build Budget ຕ້ອງມີ TEC-03/DEL-01 estimate ແລະ quote ໃໝ່ ຫຼືບໍ່?", "ແນະນຳ: ອະນຸມັດ; ບໍ່ສ້າງຕົວເລກງົບຈາກການຄາດເດົາ"],
  ["REV-05", "Effort & release", `ຮັບ ${totalMin}–${totalMax} person-days ເປັນ ROM ແລະບັງຄັບ P0→P4 release gates ຫຼືບໍ່?`, "ແນະນຳ: ອະນຸມັດເປັນ planning range; ຫ້າມປ່ຽນເປັນວັນສົ່ງມອບຈົນກວ່າ team capacity/stack/backlog ຖືກຢືນຢັນ"],
] as const;

export default function TechnicalProposalDocument({ basePath }: { basePath: string }) {
  return <article className={`${styles.detailBody} ${styles.formalDocument}`}>
    <header className={styles.formalDocumentHeader}>
      <p>TEC-02 · ARCHITECTURE &amp; ENGINEERING</p>
      <h1>Technical Proposal</h1>
      <h2>ຂໍ້ສະເໜີວິທີພິສູດ ແລະສ້າງ MVP ໂດຍແຍກ Scope, Effort, Cash Cost ແລະ Release Gate ຢ່າງຊັດເຈນ</h2>
      <div className={`${styles.formalStatus} ${styles.formalDraftStatus}`}>ສະບັບ 0.1 · ຮ່າງສຳລັບທົບທວນ · 28 ສິງຫາ 2026</div>
    </header>

    <section className={styles.formalSection} id="tp-control"><h2><span>1.</span> ຂໍ້ມູນຄວບຄຸມເອກະສານ</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
      <tr><th>ລະຫັດ / ສະບັບ</th><td>TEC-02 / 0.1</td><th>ສະຖານະ</th><td>ຮ່າງສຳລັບທົບທວນ</td></tr>
      <tr><th>ເຈົ້າຂອງ</th><td>Solution Architect / Tech Lead</td><th>ຜູ້ອະນຸມັດ</th><td>Product Owner</td></tr>
      <tr><th>Baseline</th><td colSpan={3}>TEC-01 1.0 · PRO-02 1.0 · PRO-03 1.0 · PRO-04 0.9 · UX-05 0.11.0 · BUS-05/06 1.0</td></tr>
      <tr><th>ເອກະສານຮັບຕໍ່</th><td colSpan={3}>TEC-03 Tech Stack · TEC-04 Database/API · TEC-06 Security/Infrastructure · DEL-01 Development Plan</td></tr>
    </tbody></table></div><h3>1.1 ປະຫວັດ</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ສະບັບ</th><th>ວັນທີ</th><th>ລາຍລະອຽດ</th></tr></thead><tbody><tr><td>0.1</td><td>28 ສິງຫາ 2026</td><td>ຮ່າງ delivery model, solution alternatives, work-package ROM, cost method, risk, release gate ແລະ 5 review decisions.</td></tr></tbody></table></div></section>

    <nav className={styles.formalToc} aria-label="ສາລະບານ TEC-02"><h2>ສາລະບານ</h2><ol>
      <li><a href="#tp-purpose">ຈຸດປະສົງ</a></li><li><a href="#tp-recommendation">ຂໍ້ສະເໜີຫຼັກ</a></li><li><a href="#tp-constraints">ຂໍ້ຈຳກັດ</a></li><li><a href="#tp-options">ທາງເລືອກ</a></li><li><a href="#tp-solution">Proposed Solution</a></li><li><a href="#tp-effort">Effort &amp; Timeline</a></li><li><a href="#tp-cost">Cost Model</a></li><li><a href="#tp-risk">Risk &amp; Control</a></li><li><a href="#tp-handoff">Handoff</a></li><li><a href="#tp-review">5 ຂໍ້ທົບທວນ</a></li>
    </ol></nav>

    <section className={styles.formalSection} id="tp-purpose"><h2><span>2.</span> ຈຸດປະສົງ ແລະສິ່ງທີ່ເອກະສານນີ້ບໍ່ເຮັດ</h2><p>TEC-02 ແປ Architecture Baseline ໃຫ້ເປັນວິທີດຳເນີນງານທີ່ຕັດສິນໄດ້: ຈະພິສູດຫຍັງກ່ອນ, ຈະສ້າງຫຍັງ, ໃຜຄວນເຮັດ, ລຳດັບແນວໃດ, effort/cost ຖືກຄິດແນວໃດ ແລະເງື່ອນໄຂໃດຈຶ່ງປ່ອຍ Public Pilot.</p><div className={styles.formalNote}><strong>ຂອບເຂດທີ່ຍັງບໍ່ລັອກ</strong><p>TEC-02 ບໍ່ເລືອກ programming language, framework, database product, cloud vendor ຫຼືລາຄາສຸດທ້າຍ. ສິ່ງເຫຼົ່ານີ້ຈະຖືກປຽບທຽບໃນ TEC-03 ໂດຍອີງກອບການຕັດສິນຂອງເອກະສານນີ້.</p></div></section>

    <section className={styles.formalSection} id="tp-recommendation"><h2><span>3.</span> ຂໍ້ສະເໜີຫຼັກ</h2><div className={styles.proposalExecutive}><article><b>NOW · VALIDATE</b><h3>ໃຊ້ Prototype + Manual Operation</h3><p>ດຳເນີນ 6-week evidence pilot ເພື່ອກວດ user value, content supply, owner response, workload ແລະ willingness-to-pay ພາຍໃນງົບທີ່ອະນຸມັດ.</p></article><article><b>NEXT · BUILD CONDITIONALLY</b><h3>Founder-led Production MVP</h3><p>ເລີ່ມສ້າງ durable MVP ສະເພາະເມື່ອ scope, team capacity, funding source, stack decision, person-day estimate ແລະ release gate ຖືກອະນຸມັດ.</p></article></div><div className={styles.formalDecision}><strong>Decision intent</strong><p>ຂໍ້ສະເໜີນີ້ບໍ່ຫ້າມ Founder ພັດທະນາ code ໃນຊ່ວງ Validation. ແຕ່ຫ້າມນັບ code/demo ເປັນ Production MVP ຈົນກວ່າ security, durable data, test, recovery ແລະ operational gate ຈະຜ່ານ.</p></div></section>

    <section className={styles.formalSection} id="tp-constraints"><h2><span>4.</span> Baseline ແລະຂໍ້ຈຳກັດ</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ດ້ານ</th><th>ຂໍ້ກຳນົດ</th></tr></thead><tbody>{constraints.map(([id,area,rule])=><tr key={id}><td><code>{id}</code></td><td><strong>{area}</strong></td><td>{rule}</td></tr>)}</tbody></table></div></section>

    <section className={styles.formalSection} id="tp-options"><h2><span>5.</span> ທາງເລືອກ ແລະ Trade-off</h2><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>ທາງເລືອກ</th><th>ຂໍ້ດີ</th><th>ຂໍ້ຈຳກັດ</th><th>ການນຳໃຊ້</th><th>ຜົນສະເໜີ</th></tr></thead><tbody>{deliveryOptions.map(([id,name,benefit,limit,use,status])=><tr key={id}><td><code>{id}</code></td><td><strong>{name}</strong></td><td>{benefit}</td><td>{limit}</td><td>{use}</td><td><strong>{status}</strong></td></tr>)}</tbody></table></div><h3>5.1 Hosting/Operations Direction ສຳລັບ TEC-03</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Model</th><th>ເໝາະກັບ Pilot</th><th>ຜົນຕັດສິນເບື້ອງຕົ້ນ</th></tr></thead><tbody><tr><td><strong>Managed application + managed relational database</strong></td><td>Operational burden ຕ່ຳ, backup/metrics ມີ baseline, ຂະຫຍາຍຕາມຫຼັກຖານ</td><td>ແນະນຳໃຫ້ TEC-03 ປຽບທຽບເປັນທາງຫຼັກ</td></tr><tr><td><strong>Self-managed VPS</strong></td><td>ຄ່າ service ອາດຕ່ຳ ແຕ່ຄ່າເວລາ patch, backup, monitoring ແລະ incident ສູງ</td><td>ໃຊ້ເປັນ comparison option; ຕ້ອງນັບ operator time</td></tr><tr><td><strong>Multiple independent cloud services</strong></td><td>Flexible ແຕ່ contract, billing, observability ແລະ failure surface ຫຼາຍ</td><td>ບໍ່ແນະນຳຈົນກວ່າມີ bottleneck evidence</td></tr></tbody></table></div></section>

    <section className={styles.formalSection} id="tp-solution"><h2><span>6.</span> Proposed Solution ແລະ Delivery Contract</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Track</th><th>ຈຸດປະສົງ</th><th>Deliverable</th><th>Budget/authority</th><th>Boundary</th></tr></thead><tbody>{tracks.map(row=><tr key={row[0]}>{row.map((cell,index)=><td key={`${index}-${cell}`}>{index<2?<strong>{cell}</strong>:cell}</td>)}</tr>)}</tbody></table></div><h3>6.1 Production MVP ຕາມລຳດັບ Dependency</h3><div className={styles.proposalRoadmap}>{releaseSteps.map(([id,name,detail])=><article key={id}><b>{id}</b><h3>{name}</h3><p>{detail}</p></article>)}</div><div className={styles.formalDraftNotice}><strong>Scope rule</strong><p>P0—P4 ບໍ່ແມ່ນ Sprint commitment. ມັນແມ່ນ dependency order. ຂັ້ນຕໍ່ໄປເລີ່ມໄດ້ເມື່ອຂັ້ນກ່ອນມີ testable output ແລະ critical defect ຖືກປິດ.</p></div></section>

    <section className={styles.formalSection} id="tp-effort"><h2><span>7.</span> Effort ແລະ Timeline ແບບ Rough Order of Magnitude</h2><p>Person-day ໝາຍເຖິງແຮງງານຂອງຄົນໜຶ່ງໃນໜຶ່ງມື້ເຮັດວຽກ. ມັນບໍ່ເທົ່າກັບ calendar day ເພາະມີ dependency, review, defect, waiting time ແລະວຽກ operation.</p><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Work package</th><th>ຂອບເຂດ</th><th>Min person-days</th><th>Max person-days</th><th>Trace</th></tr></thead><tbody>{workPackages.map(([id,name,scope,min,max,trace])=><tr key={id}><td><code>{id}</code></td><td><strong>{name}</strong></td><td>{scope}</td><td>{min}</td><td>{max}</td><td>{trace}</td></tr>)}<tr><td colSpan={3}><strong>ROM Total</strong></td><td><strong>{totalMin}</strong></td><td><strong>{totalMax}</strong></td><td>ຍັງບໍ່ລວມ post-Pilot growth</td></tr></tbody></table></div><div className={styles.proposalFormula}><b>Calendar estimate</b><p>Calendar weeks ≈ Total person-days ÷ ຈຳນວນ person-days ທີ່ທີມສົ່ງໄດ້ຈິງຕໍ່ອາທິດ + dependency/review buffer.</p><span>ຕົວຢ່າງ planning ເທົ່ານັ້ນ: 1 ຄົນ full-time + part-time QA/UX ປະມານ 16–24 ອາທິດ; 2 experienced developers + part-time QA/UX ປະມານ 9–14 ອາທິດ. ຕ້ອງຄຳນວນຄືນໃນ DEL-01.</span></div></section>

    <section className={styles.formalSection} id="tp-cost"><h2><span>8.</span> Cost Model ແລະຫຼັກຖານລາຄາ</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ຕົ້ນທຶນ</th><th>ສູດ</th><th>ການຕີຄວາມ</th></tr></thead><tbody>{costRules.map(([name,formula,meaning])=><tr key={name}><td><strong>{name}</strong></td><td><code>{formula}</code></td><td>{meaning}</td></tr>)}</tbody></table></div><div className={styles.formalDecision}><strong>Budget boundary</strong><p>TEC-02 ບໍ່ອະນຸມັດ Production Build Budget. ລາຍການໃດຕັ້ງແຕ່ 1 ລ້ານກີບຂຶ້ນໄປຕ້ອງມີຢ່າງໜ້ອຍ 2 quotes ຕາມ BUS-05. TEC-03 ຕ້ອງເກັບ vendor/service price ຕາມ Minimum, Expected, Stress assumption; DEL-01 ຈຶ່ງລັອກ team, schedule ແລະ cash plan.</p></div><h3>8.1 ສາມ Cost Scenarios ທີ່ຕ້ອງສ້າງໃນ TEC-03</h3><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Scenario</th><th>ຂອບເຂດ</th><th>ຫຼັກຖານ</th></tr></thead><tbody><tr><td><strong>Validation minimum</strong></td><td>Prototype, manual operation, approved tools/data/test expense; ບໍ່ມີ production backend claim</td><td>BUS-05 expense register</td></tr><tr><td><strong>Controlled Production Pilot</strong></td><td>Must scope + managed app/database/storage/jobs/observability/backup + specialist checkpoints</td><td>TEC-03 vendor pricing + staffing estimate</td></tr><tr><td><strong>Stress / growth</strong></td><td>Traffic, storage, source check, analytics ແລະ support ເພີ່ມຕາມ assumption ທີ່ລະບຸ</td><td>Unit-price formula; ບໍ່ຊື້ capacity ລ່ວງໜ້າ</td></tr></tbody></table></div></section>

    <section className={styles.formalSection} id="tp-risk"><h2><span>9.</span> Technical Delivery Risk Register</h2><div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>ລະດັບ</th><th>ຄວາມສ່ຽງ</th><th>ການຄວບຄຸມ</th><th>Owner</th></tr></thead><tbody>{risks.map(([id,level,risk,control,owner])=><tr key={id}><td><code>{id}</code></td><td><strong>{level}</strong></td><td>{risk}</td><td>{control}</td><td>{owner}</td></tr>)}</tbody></table></div></section>

    <section className={styles.formalSection} id="tp-handoff"><h2><span>10.</span> Technical Handoff ແລະ Definition of Done</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ເອກະສານ</th><th>ສິ່ງທີ່ຮັບຈາກ TEC-02</th><th>ຫ້າມຄາດເດົາ</th></tr></thead><tbody><tr><td><strong>TEC-03</strong></td><td>Managed-first comparison, cost formula, capacity scenarios, operational criteria</td><td>Vendor/price/region ໂດຍບໍ່ມີ evidence</td></tr><tr><td><strong>TEC-04</strong></td><td>P0—P4 vertical slice, data/write boundaries, API priorities</td><td>Physical schema/API ກ່ອນ stack decision</td></tr><tr><td><strong>TEC-06</strong></td><td>Mandatory security/recovery controls, provisional RPO 24h/RTO 8h</td><td>Privacy/retention/incident control</td></tr><tr><td><strong>DEL-01</strong></td><td>{totalMin}–{totalMax} person-day ROM, dependency order, resource model, release gates</td><td>Calendar date ກ່ອນ team capacity/backlog</td></tr></tbody></table></div><h3>10.1 ໄຟລ໌ນຳໃຊ້</h3><div className={styles.architectureArtifacts}><a href={`${basePath}/artifact-preview?file=tec02-technical-proposal-baseline-2026-08-28.json&from=technical-proposal`}><b>ພຣີວິວ Proposal Baseline JSON</b><span>Track, option, work package, risk ແລະ review decision</span></a><a href={`${basePath}/artifact-preview?file=tec02-effort-cost-estimate-template-2026-08-28.csv&from=technical-proposal`}><b>ພຣີວິວ Effort/Cost CSV</b><span>ປັບ person-days, rate, quote/evidence ແລະ owner</span></a><a href={`${basePath}/templates/tec02-technical-proposal-baseline-2026-08-28.json`} download><b>ດາວໂຫຼດ JSON</b><span>Machine-readable proposal handoff</span></a><a href={`${basePath}/templates/tec02-effort-cost-estimate-template-2026-08-28.csv`} download><b>ດາວໂຫຼດ CSV</b><span>Planning template; ບໍ່ແມ່ນ approved budget</span></a></div><div className={styles.formalDraftNotice}><strong>Definition of done for TEC-02 1.0</strong><p>REV-01—05 ຖືກຕັດສິນ; validation/production budget ແຍກກັນ; recommended option, ROM, risk owner ແລະ handoff ບໍ່ຂັດ TEC-01/PRO-03/BUS-05; ແລະ TEC-03 ຮູ້ criteria/evidence ທີ່ຕ້ອງເກັບ.</p></div></section>

    <section className={styles.formalSection} id="tp-review"><h2><span>11.</span> 5 ຂໍ້ທີ່ຕ້ອງທົບທວນກ່ອນ TEC-02 ຂຶ້ນ 1.0</h2><div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ຫົວຂໍ້</th><th>ຄຳຖາມ</th><th>ຄຳແນະນຳ</th><th>ສະຖານະ</th></tr></thead><tbody>{reviews.map(([id,title,question,recommendation])=><tr key={id}><td><code>{id}</code></td><td><strong>{title}</strong></td><td>{question}</td><td>{recommendation}</td><td>ລໍທົບທວນ</td></tr>)}</tbody></table></div><div className={styles.formalDraftNotice}><strong>TEC-02 · ສະບັບ 0.1</strong><p>Proposal ຄົບສຳລັບ review ແຕ່ຍັງບໍ່ອະນຸມັດ budget, team ຫຼື delivery date. ຫຼັງ REV-01—05 ຈຶ່ງຂຶ້ນ 1.0 ແລະເລີ່ມ TEC-03.</p></div></section>

    <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ"><a href={`${basePath}/documents/system-architecture`}><small>← ARCHITECTURE BASELINE</small><strong>TEC-01 1.0</strong></a><a href={`${basePath}/documents/tech-stack`}><small>ເອກະສານຖັດໄປ →</small><strong>TEC-03 Tech Stack</strong></a></nav>
  </article>;
}
