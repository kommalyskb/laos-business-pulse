"use client";

import styles from "../documents.module.css";
import { traceRows } from "./SystemAnalysisTraceability";

const acceptanceRules = [
  ["01", "ກວດເຫັນໄດ້", "Criterion ຕ້ອງລະບຸຜົນທີ່ຄົນ ຫຼື Test ກວດໄດ້; ຫ້າມໃຊ້ຄຳວ່າ “ດີ”, “ໄວ”, “ໃຊ້ງ່າຍ” ໂດຍບໍ່ມີເກນ."],
  ["02", "ຕັດສິນ Pass/Fail ໄດ້", "ເມື່ອໃຫ້ Input ແລະ State ດຽວກັນ ຜູ້ທົດສອບຕ່າງຄົນຕ້ອງໄດ້ຄຳຕັດສິນຄືກັນ."],
  ["03", "ມີທັງ Success ແລະ Failure", "ບໍ່ທົດສອບພຽງ Happy Path; ຕ້ອງຄອບຄຸມ Empty, Invalid, Unauthorized, Timeout, Conflict ແລະ Rollback ຕາມຄວາມສ່ຽງ."],
  ["04", "ຜູກກັບ Requirement ID", "Acceptance Criterion, Test Case, Defect ແລະ Evidence ຕ້ອງອ້າງ Requirement ID ເພື່ອຕາມຜົນກະທົບໄດ້."],
  ["05", "ບໍ່ລັອກວິທີຂຽນ Code", "Criterion ກຳນົດ Behavior ແລະ Result; Implementation detail ຢູ່ Technical Proposal/API Design ຍົກເວັ້ນຈຸດທີ່ກະທົບ Security, Data Integrity ຫຼື Audit."],
] as const;

const testLevels = [
  ["01", "Unit / Rule Test", "ກວດ validation, eligibility, state transition, deduplication ແລະ calculation ດ້ວຍ input ທີ່ຄວບຄຸມໄດ້.", "Developer", "Test report + failed assertion"],
  ["02", "Contract / API Test", "ກວດ request/response schema, error code, authorization, idempotency, pagination ແລະ backward compatibility.", "Developer + QA", "API contract result"],
  ["03", "Integration Test", "ກວດ transaction, database relation, external-link fallback, event ingest, audit write ແລະ rollback.", "Developer + QA", "Integration log + database assertion"],
  ["04", "End-to-End Test", "ກວດ Journey ຜ່ານ UI: Feed/Search → Place → Map/Call/Message ແລະ Admin → Draft → Publish.", "QA", "E2E run + screenshot/log on failure"],
  ["05", "UAT", "ກວດວ່າຜົນທີ່ລະບົບສົ່ງມອບກົງກັບວຽກຈິງຂອງ Guest, Admin ແລະຮ້ານ.", "Product Owner + Business User", "Signed UAT checklist"],
  ["06", "Operational Acceptance", "ກວດ backup/rollback, audit, takedown, work queue, monitoring, support path ແລະຄູ່ມືດຳເນີນງານ.", "Product Owner + Operator", "Operational readiness record"],
] as const;

const fixtures = [
  ["DATA-01", "Published Place — Complete", "Place ຂໍ້ມູນຄົບ, Source active, Map/Contact ຖືກ, Checked Date ຍັງບໍ່ກາຍກຳນົດ.", "Feed, Search, Place, Action"],
  ["DATA-02", "Unknown / Stale Field", "Hours ຫຼື Price ຍັງບໍ່ຢືນຢັນ; ອີກ Place ກາຍ Freshness cadence.", "Unknown/Stale label"],
  ["DATA-03", "Source Failure", "TikTok/Facebook Source ລົ້ມຊົ່ວຄາວ, Confirmed Unavailable ແລະ Takedown ຢ່າງລະອັນ.", "Fallback, retry, removal"],
  ["DATA-04", "Duplicate Places", "2 Records ມີຊື່/ເບີ/ພິກັດໃກ້ກັນ; ໜຶ່ງຄູ່ແມ່ນຮ້ານດຽວ, ອີກຄູ່ແມ່ນຄົນລະສາຂາ.", "Detect, review, merge, redirect"],
  ["DATA-05", "Correction Request", "Request ມີຫຼາຍ Item: approve ບາງອັນ, reject ບາງອັນ ແລະ Needs Evidence ບາງອັນ.", "SLA, partial decision, audit"],
  ["DATA-06", "Sponsored Window", "Campaign Draft, Scheduled, Active, Expired ແລະ Place ທີ່ບໍ່ມີສິດ.", "Label, eligibility, time boundary"],
  ["DATA-07", "Analytics Consent", "AnalyticsAllowed, EssentialOnly, duplicate event_id ແລະ rapid repeated action.", "Consent, schema, dedupe, report"],
  ["DATA-08", "Admin Security", "Valid Admin, expired session, unauthorized actor, concurrent update ແລະ audit-write failure.", "Auth, conflict, rollback"],
] as const;

const passPolicy = [
  ["MUST", "ຕ້ອງຜ່ານ Acceptance Criteria ທຸກຂໍ້ ແລະບໍ່ມີ Release-blocking defect. ການຜ່ານບາງສ່ວນບໍ່ນັບວ່າ Requirement ສຳເລັດ."],
  ["SHOULD", "ຖ້າຍັງບໍ່ສົ່ງມອບ ຕ້ອງບັນທຶກການເລື່ອນ, ເຫດຜົນ, ຜົນກະທົບ ແລະຜູ້ອະນຸມັດ; ຫ້າມເຮັດໃຫ້ Must Journey ເສຍ."],
  ["DEFECT", "Critical/High defect ທີ່ກະທົບ Core Journey, Security, Rights, Public Data, Payment Claim ຫຼື Audit ຕ້ອງແກ້ກ່ອນປ່ອຍ."],
  ["EVIDENCE", "ຄຳວ່າ “ທົດສອບແລ້ວ” ບໍ່ພຽງພໍ; ຕ້ອງມີ Test Run, Result, Environment, Build Version, Data Fixture ແລະຜູ້ຮັບຮອງ."],
] as const;

export default function RequirementsAcceptanceDocument({ basePath }: { basePath: string }) {
  const acceptanceCount = traceRows.reduce((total, row) => total + row.acceptance.length, 0);
  const linkedFunctions = new Set(traceRows.flatMap((row) => row.functionIds)).size;
  const linkedWorkflows = new Set(traceRows.flatMap((row) => row.workflowIds)).size;
  const linkedErrors = new Set(traceRows.flatMap((row) => row.errorCodes)).size;

  return (
    <article className={`${styles.detailBody} ${styles.formalDocument}`}>
      <header className={styles.formalDocumentHeader}>
        <p>PRO-04 · PRODUCT &amp; ANALYSIS</p>
        <h1>Requirements &amp; Acceptance Criteria</h1>
        <h2>ຂໍ້ກຳນົດຂອງລະບົບ ແລະເງື່ອນໄຂການຮັບມອບ</h2>
        <div className={`${styles.formalStatus} ${styles.formalApprovedStatus}`}>ສະບັບ 1.0 · Approved Acceptance Baseline · Execution Evidence Planned · 31 ສິງຫາ 2026</div>
      </header>

      <section className={styles.formalSection} id="rac-control">
        <h2><span>1.</span> ຂໍ້ມູນຄວບຄຸມເອກະສານ</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
          <tr><th>ລະຫັດເອກະສານ</th><td>PRO-04</td><th>ສະບັບ</th><td>1.0</td></tr>
          <tr><th>ຊື່ເອກະສານ</th><td>Requirements &amp; Acceptance Criteria</td><th>ສະຖານະ</th><td>ອະນຸມັດເກນແລ້ວ · ລໍ Consent/Retention Baseline</td></tr>
          <tr><th>ເຈົ້າຂອງເອກະສານ</th><td>Product Owner / System Analyst</td><th>ຜູ້ທົບທວນ</th><td>Tech Lead · QA Lead · Operations</td></tr>
          <tr><th>ເອກະສານຕົ້ນທາງ</th><td colSpan={3}>PRO-01 1.0 · PRO-02 1.0 · PRO-03 1.0</td></tr>
        </tbody></table></div>
        <h3>1.1 ປະຫວັດການແກ້ໄຂ</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ສະບັບ</th><th>ວັນທີ</th><th>ລາຍລະອຽດ</th><th>ຜູ້ຈັດທຳ</th></tr></thead><tbody>
          <tr><td>0.1</td><td>26 ສິງຫາ 2026</td><td>ຈັດທຳ 13 Requirements, {acceptanceCount} Acceptance Criteria, Test Policy ແລະ Traceability ສຳລັບທົບທວນ</td><td>System Analyst</td></tr>
          <tr><td>0.9</td><td>27 ສິງຫາ 2026</td><td>ອະນຸມັດ Acceptance Authority, Test Environment/Data, Defect Policy, Pilot Performance Target, UAT Journey ແລະ Evidence Contract</td><td>Product Owner / System Analyst</td></tr>
          <tr><td>1.0</td><td>31 ສິງຫາ 2026</td><td>ອະນຸມັດເປັນ Acceptance Baseline; ແຍກ Document Approval ອອກຈາກ Test/UAT Execution ແລະ Evidence Verification</td><td>Product Owner / System Analyst</td></tr>
        </tbody></table></div>
      </section>

      <nav className={styles.formalToc} aria-label="ສາລະບານ PRO-04"><h2>ສາລະບານ</h2><ol>
        <li><a href="#rac-control">ຂໍ້ມູນຄວບຄຸມເອກະສານ</a></li><li><a href="#rac-purpose">ຈຸດປະສົງ ແລະຂອບເຂດ</a></li><li><a href="#rac-reference">ເອກະສານອ້າງອີງ</a></li><li><a href="#rac-language">ຄຳສັບ ແລະຫຼັກການຂຽນ</a></li><li><a href="#rac-catalog">ບັນຊີ Requirements ແລະ Criteria</a></li><li><a href="#rac-testing">ວິທີການກວດສອບ</a></li><li><a href="#rac-data">ຂໍ້ມູນທົດສອບ</a></li><li><a href="#rac-pass">Pass/Fail ແລະ Defect Policy</a></li><li><a href="#rac-uat">UAT ແລະການອະນຸມັດ</a></li><li><a href="#rac-coverage">Traceability Matrix</a></li><li><a href="#rac-review">ຂໍ້ຕ້ອງຕັດສິນ</a></li>
      </ol></nav>

      <section className={styles.formalSection} id="rac-purpose">
        <h2><span>2.</span> ຈຸດປະສົງ ແລະຂອບເຂດ</h2>
        <p>PRO-04 ແປຂອບເຂດທີ່ອະນຸມັດໃນ PRO-03 ໃຫ້ເປັນ Requirement ແລະ Acceptance Criteria ທີ່ກວດໄດ້. Developer ໃຊ້ເອກະສານນີ້ເພື່ອຮູ້ Behavior ທີ່ຕ້ອງສ້າງ; QA ໃຊ້ຂຽນ Test Case ແລະ Expected Result; Product Owner ໃຊ້ຮັບ ຫຼືປະຕິເສດການສົ່ງມອບ.</p>
        <p>Requirement ຈະບໍ່ຖືວ່າສຳເລັດເພາະໜ້າຈໍເປີດໄດ້ ຫຼື Code ຖືກ Merge. ຕ້ອງຜ່ານ Acceptance Criteria ທີ່ກຳນົດ, ບໍ່ມີ Defect ທີ່ຂັດຂວາງ Release ແລະມີ Evidence ທີ່ຕາມກັບຫາ Build ແລະ Test Data ໄດ້.</p>
        <div className={styles.formalNote}><strong>ຂອບເຂດ:</strong> ເອກະສານນີ້ກວມ Requirement statement, rationale, acceptance criteria, evidence, verification level, controlled test data, pass/fail policy, UAT ແລະ traceability. ບໍ່ກຳນົດ UX layout ລະອຽດ, API schema ສຸດທ້າຍ, Framework, Test Automation Code ຫຼື Production Runbook.</div>
      </section>

      <section className={styles.formalSection} id="rac-reference">
        <h2><span>3.</span> ເອກະສານອ້າງອີງ ແລະ Baseline</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ເອກະສານ</th><th>ສິ່ງທີ່ PRO-04 ຮັບມາ</th><th>ວິທີນຳໃຊ້</th></tr></thead><tbody>
          <tr><td><strong>PRO-01 · PRD</strong></td><td>Actors, user outcomes, business rules ແລະ high-level requirements</td><td>ໃຊ້ເປັນ Requirement source</td></tr>
          <tr><td><strong>PRO-02 · System Analysis</strong></td><td>Functions, entities, workflows, states, errors ແລະ algorithms</td><td>ໃຊ້ກວດ Behavior ແລະ Traceability</td></tr>
          <tr><td><strong>PRO-03 · MVP Scope</strong></td><td>Priority, milestone, manual boundary ແລະ release gates</td><td>ໃຊ້ກຳນົດວ່າ Requirement ໃດຕ້ອງຜ່ານກ່ອນ Pilot</td></tr>
        </tbody></table></div>
        <p>Baseline ປັດຈຸບັນປະກອບມີ <strong>{traceRows.length} Requirements</strong>, <strong>{acceptanceCount} Acceptance Criteria</strong>, <strong>{linkedFunctions} Functions</strong>, <strong>{linkedWorkflows} Workflows</strong> ແລະ <strong>{linkedErrors} Error Codes</strong> ທີ່ຖືກອ້າງອີງ.</p>
      </section>

      <section className={styles.formalSection} id="rac-language">
        <h2><span>4.</span> ຄຳສັບ ແລະຫຼັກການຂຽນ</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ຄຳສັບ</th><th>ຄວາມໝາຍ</th><th>ຕົວຢ່າງການນຳໃຊ້</th></tr></thead><tbody>
          <tr><td><strong>Requirement</strong></td><td>ຂໍ້ກຳນົດວ່າ Actor ຫຼືລະບົບຕ້ອງເຮັດຫຍັງ ແລະໄດ້ຜົນຫຍັງ.</td><td>Guest ກົດ Map ໄປຫາ Place ຖືກຕ້ອງ.</td></tr>
          <tr><td><strong>Acceptance Criterion</strong></td><td>ເງື່ອນໄຂທີ່ລະບຸ State/Input, Action ແລະ Expected Result ເພື່ອຕັດສິນ Pass/Fail.</td><td>Given Place ມີພິກັດ, when Guest ກົດ Map, then ເປີດປາຍທາງກົງກັບ Place.</td></tr>
          <tr><td><strong>Test Case</strong></td><td>ຂັ້ນຕອນການກວດ Criterion ທີ່ລະບຸ Environment, Data, Steps, Expected Result ແລະ Cleanup.</td><td>TC-USR-04-01 ໃຊ້ DATA-01 ໃນ Test Environment.</td></tr>
          <tr><td><strong>Evidence</strong></td><td>ຫຼັກຖານວ່າກວດແລ້ວ ແລະຜົນເປັນຫຍັງ.</td><td>Test run, log/query, build version, ວັນທີ ແລະຜູ້ຮັບຮອງ.</td></tr>
        </tbody></table></div>
        <h3>4.1 ຫຼັກການຂຽນ Acceptance Criteria</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ຂໍ້</th><th>ຫຼັກການ</th><th>ຄຳອະທິບາຍ</th></tr></thead><tbody>{acceptanceRules.map(([id, title, detail]) => <tr key={id}><td>{id}</td><td><strong>{title}</strong></td><td>{detail}</td></tr>)}</tbody></table></div>
      </section>

      <section className={styles.formalSection} id="rac-catalog">
        <h2><span>5.</span> ບັນຊີ Requirements ແລະ Acceptance Criteria</h2>
        <p>Requirement ທັງ {traceRows.length} ຂໍ້ສະແດງເນື້ອຫາຄົບໂດຍບໍ່ເຊື່ອງໄວ້ຫຼັງ Filter ຫຼືປຸ່ມເປີດ-ປິດ. ແຕ່ລະຂໍ້ມີ Statement, Rationale, Acceptance Criteria, Evidence ແລະ Traceability ໃນຮູບແບບດຽວກັນ.</p>
        <div className={styles.formalRequirementList}>{traceRows.map((row) => <section className={styles.formalRequirement} key={row.id} id={`req-${row.id.toLowerCase()}`}>
          <header><div><code>{row.id}</code><span className={styles.formalPriority} data-priority={row.priority}>{row.priority}</span><span>{row.kind}</span></div><h3>{row.title}</h3></header>
          <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
            <tr><th>Requirement Statement</th><td>{row.requirement}</td></tr>
            <tr><th>Rationale</th><td>{row.rationale}</td></tr>
            <tr><th>Priority / Type</th><td>{row.priority} · {row.kind}</td></tr>
            <tr><th>Acceptance Criteria</th><td><ol className={styles.formalCriteria}>{row.acceptance.map((criterion) => { const [id, ...detail] = criterion.split(" · "); return <li key={id}><code>{id}</code><span>{detail.join(" · ")}</span></li>; })}</ol></td></tr>
            <tr><th>Required Evidence</th><td><ul className={styles.formalPlainList}>{row.evidence.map((item) => <li key={item}>{item}</li>)}</ul></td></tr>
            <tr><th>Use Cases / Rules</th><td><code>{[...row.useCases, ...row.rules].join(" · ") || "—"}</code></td></tr>
            <tr><th>Functions</th><td><code>{row.functionIds.join(" · ") || "—"}</code></td></tr>
            <tr><th>Entities / Workflows</th><td><code>{[...row.entityIds, ...row.workflowIds].join(" · ") || "—"}</code></td></tr>
            <tr><th>States / Errors</th><td><code>{[...row.stateIds, ...row.errorCodes].join(" · ") || "—"}</code></td></tr>
          </tbody></table></div>
        </section>)}</div>
      </section>

      <section className={styles.formalSection} id="rac-testing">
        <h2><span>6.</span> ວິທີການກວດສອບ</h2>
        <p>Acceptance Criterion ໜຶ່ງຂໍ້ອາດຕ້ອງມີຫຼາຍກວ່າໜຶ່ງ Test Level. ຕົວຢ່າງ: Authorization Rule ອາດຕ້ອງມີ Unit Test, API Contract Test, Integration Test ແລະ End-to-End Test.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Level</th><th>ປະເພດ</th><th>ສິ່ງທີ່ກວດ</th><th>ຜູ້ຮັບຜິດຊອບ</th><th>Evidence</th></tr></thead><tbody>{testLevels.map(([id, type, purpose, owner, evidence]) => <tr key={id}><td>{id}</td><td><strong>{type}</strong></td><td>{purpose}</td><td>{owner}</td><td>{evidence}</td></tr>)}</tbody></table></div>
        <h3>6.1 ເປົ້າໝາຍ Performance ສຳລັບ Pilot</h3>
        <p>ຄ່າຕໍ່ໄປນີ້ເປັນ Pilot Baseline ແລະຕ້ອງຖືກກວດໃນ Android ລະດັບກາງ, Mobile Viewport ແລະເຄືອຂ່າຍຈຳລອງ 4G ທົ່ວໄປ. Technical Proposal ສາມາດປັບເກນໃຫ້ເຂັ້ມຂຶ້ນ ແຕ່ຫ້າມຫຼຸດເກນໂດຍບໍ່ມີ Change Decision.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ສິ່ງທີ່ວັດ</th><th>ເກນ Pilot</th><th>ຜົນເມື່ອບໍ່ຜ່ານ</th></tr></thead><tbody>
          <tr><td>PERF-01</td><td>First useful content</td><td>ປາກົດພາຍໃນ 3 ວິນາທີ</td><td>Fail NFR-02</td></tr>
          <tr><td>PERF-02</td><td>Place core data</td><td>ສະແດງພາຍໃນ 2.5 ວິນາທີ</td><td>Fail NFR-02</td></tr>
          <tr><td>PERF-03</td><td>Interaction feedback</td><td>ໜ້າຈໍຕອບສະໜອງພາຍໃນ 300 ມິນລິວິນາທີ</td><td>ບັນທຶກ Defect ຕາມຜົນກະທົບ</td></tr>
          <tr><td>PERF-04</td><td>External media timeout</td><td>ສະແດງ Poster/Fallback + Open Original ພາຍໃນ 4 ວິນາທີ</td><td>Fail media recovery</td></tr>
        </tbody></table></div>
      </section>

      <section className={styles.formalSection} id="rac-data">
        <h2><span>7.</span> ຂໍ້ມູນທົດສອບທີ່ຄວບຄຸມໄດ້</h2>
        <p>Test Environment ຕ້ອງມີ Dataset ທີ່ສ້າງຊ້ຳໄດ້ ແລະບໍ່ໃຊ້ Production Personal Data ໂດຍກົງ. Test Case ຕ້ອງອ້າງ Fixture ID ເພື່ອໃຫ້ທີມສາມາດສ້າງ State ເກົ່າ ແລະກວດຜົນຊ້ຳໄດ້.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Fixture</th><th>State / Data</th><th>ໃຊ້ກວດ</th></tr></thead><tbody>{fixtures.map(([id, name, data, use]) => <tr key={id}><td><code>{id}</code></td><td><strong>{name}</strong></td><td>{data}</td><td>{use}</td></tr>)}</tbody></table></div>
      </section>

      <section className={styles.formalSection} id="rac-pass">
        <h2><span>8.</span> Pass/Fail ແລະ Defect Policy</h2>
        <p>ຄຳວ່າ “ໃຊ້ໄດ້ສ່ວນໃຫຍ່” ບໍ່ແມ່ນເກນຮັບມອບ. ການຕັດສິນຕ້ອງອ້າງ Acceptance Criteria, Priority ແລະ Defect Severity.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Policy</th><th>ກົດການຮັບມອບ</th></tr></thead><tbody>{passPolicy.map(([type, rule]) => <tr key={type}><td><strong>{type}</strong></td><td>{rule}</td></tr>)}</tbody></table></div>
        <h3>8.1 Defect Severity</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ລະດັບ</th><th>ຄວາມໝາຍ</th><th>ຜົນຕໍ່ Release</th></tr></thead><tbody>
          <tr><td>Critical</td><td>ລະບົບໃຊ້ບໍ່ໄດ້, data/security/rights ເສຍຫາຍຮ້າຍແຮງ ຫຼືບໍ່ມີ workaround.</td><td>Block Release</td></tr>
          <tr><td>High</td><td>Core Journey ຫຼື Must Requirement ລົ້ມເຫຼວ ແລະ workaround ບໍ່ປອດໄພ.</td><td>Block Release</td></tr>
          <tr><td>Medium</td><td>Behavior ຜິດບາງສ່ວນ ແຕ່ມີ workaround ທີ່ກວດແລ້ວ.</td><td>ຮັບໄດ້ສະເພາະມີ owner, due date ແລະ approved deviation</td></tr>
          <tr><td>Low</td><td>ບັນຫານ້ອຍທີ່ບໍ່ກະທົບຜົນລັບ, security, trust ຫຼືການໃຊ້ງານຫຼັກ.</td><td>ບັນທຶກເຂົ້າ Backlog</td></tr>
        </tbody></table></div>
      </section>

      <section className={styles.formalSection} id="rac-uat">
        <h2><span>9.</span> UAT ແລະການອະນຸມັດຮັບມອບ</h2>
        <ol className={styles.formalNumberList}><li><strong>QA:</strong> ກວດ Test Run ແລະຕິດ Evidence ກັບ Requirement, Build Version ແລະ Fixture.</li><li><strong>Tech Lead:</strong> ຮັບຮອງ Technical Quality, Regression ແລະ Security.</li><li><strong>Operations Owner:</strong> ຮັບຮອງ Operational Readiness, Monitoring, Backup, Rollback ແລະ Support Path.</li><li><strong>Product Owner:</strong> ຮັບຮອງ Business/UAT ແລະເປັນຜູ້ຕັດສິນ Go/No-go ຂັ້ນສຸດທ້າຍ ຫຼັງບົດບາດທີ່ກ່ຽວຂ້ອງລົງນາມ.</li><li><strong>Decision Record:</strong> ບັນທຶກຜົນເປັນ Accepted, Rejected ຫຼື Accepted with Approved Deviation.</li></ol>
        <h3>9.1 Journey ທີ່ຕ້ອງຜ່ານ UAT</h3>
        <ol className={styles.formalNumberList}><li>Feed → Place → Map.</li><li>Search/Filter → Place → Map, Call ຫຼື Message.</li><li>External Media ລົ້ມ → Poster/Fallback → Open Original.</li><li>Correction, Report ແລະ Takedown.</li><li>Admin: Draft → Review → Publish.</li><li>Consent/Analytics: Allow, Essential Only ແລະປ່ຽນການຕັດສິນ.</li><li>Sponsored Placement ສະແດງປ້າຍໂຄສະນາຖືກຕ້ອງ.</li></ol>
        <div className={styles.formalNote}><strong>ຫຼັກຖານຂັ້ນຕ່ຳ:</strong> ເກັບໃນ Project Evidence Repository ພາຍໃຕ້ <code>UAT/&lt;build-version&gt;/</code> ແລະຕ້ອງມີ Requirement ID, Test Case ID, Environment, Build Version, Fixture ID, Expected/Actual Result, Defect Link, ວັນທີ, ຜູ້ທົດສອບ, ຜູ້ອະນຸມັດ ແລະ Approved Deviation ຖ້າມີ.</div>
      </section>

      <section className={styles.formalSection} id="rac-coverage">
        <h2><span>10.</span> Traceability Matrix</h2>
        <p>Matrix ນີ້ໃຊ້ກວດວ່າ Requirement ທຸກຂໍ້ມີ Acceptance Criteria ແລະສາມາດຕາມກັບຫາ Analysis Element ໄດ້. ຕົວເລກສະແດງຈຳນວນ Link; ລາຍລະອຽດ ID ຢູ່ໃນຂໍ້ 5.</p>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Requirement</th><th>Priority</th><th>Criteria</th><th>Functions</th><th>Entities</th><th>Workflows</th><th>States</th><th>Errors</th></tr></thead><tbody>{traceRows.map((row) => <tr key={row.id}><td><code>{row.id}</code></td><td>{row.priority}</td><td>{row.acceptance.length}</td><td>{row.functionIds.length}</td><td>{row.entityIds.length}</td><td>{row.workflowIds.length}</td><td>{row.stateIds.length}</td><td>{row.errorCodes.length}</td></tr>)}</tbody></table></div>
        <div className={styles.formalDecision}><strong>Change Rule</strong><p>ຖ້າ Requirement ຫຼື Criterion ປ່ຽນ ຜູ້ຂໍປ່ຽນຕ້ອງກວດ PRO-02 Function/Entity/Workflow/State/Error, PRO-03 Priority/Milestone, UX Flow, API/Data Design, Test Case ແລະ Release Plan. ຫ້າມຫຼຸດ Criterion ໃຫ້ຜ່ານຫຼັງ Test ລົ້ມໂດຍບໍ່ມີ Change Decision.</p></div>
      </section>

      <section className={styles.formalSection} id="rac-review">
        <h2><span>11.</span> ບັນທຶກຂໍ້ຕັດສິນ ແລະ Pre-launch Gate</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ຫົວຂໍ້</th><th>ຂໍ້ຕັດສິນ</th><th>ສະຖານະ</th></tr></thead><tbody>
          <tr><td>REV-01</td><td><strong>Acceptance Authority</strong></td><td>Product Owner ຮັບ Business/UAT ແລະ Final Go/No-go; Tech Lead ຮັບ Technical Quality; Operations Owner ຮັບ Operational Readiness.</td><td>ອະນຸມັດ</td></tr>
          <tr><td>REV-02</td><td><strong>Test Environment &amp; Data</strong></td><td>ແຍກ Test Environment, ໃຊ້ DATA-01 ຫາ DATA-08 ແລະຫ້າມໃຊ້ Production Personal Data ໂດຍກົງ; ໃຊ້ Synthetic/Anonymized Data.</td><td>ອະນຸມັດ</td></tr>
          <tr><td>REV-03</td><td><strong>Defect Severity</strong></td><td>Critical/High Block Release; Medium ຕ້ອງມີ workaround, owner, due date ແລະ Approved Deviation; Low ເຂົ້າ Backlog.</td><td>ອະນຸມັດ</td></tr>
          <tr><td>REV-04</td><td><strong>Performance Target</strong></td><td>ອະນຸມັດ PERF-01 ຫາ PERF-04 ເປັນ Pilot Baseline ໃນ Android ລະດັບກາງ ແລະຈຳລອງ 4G.</td><td>ອະນຸມັດ</td></tr>
          <tr><td>REV-05</td><td><strong>UAT &amp; Sign-off Evidence</strong></td><td>ອະນຸມັດ 7 Journey ບັງຄັບ, Sign-off Roles ແລະ Evidence Contract ຕາມຂໍ້ 9.</td><td>ອະນຸມັດ</td></tr>
        </tbody></table></div>
        <div className={styles.formalDraftNotice}><strong>PRO-04 · ສະບັບ 1.0</strong><p>Requirement ແລະ Acceptance Criteria ຖືກອະນຸມັດເປັນ baseline ແລ້ວ. Consent/Retention ແລະ Legal Review ຍັງເປັນ Pre-launch Gate; Test/UAT ຍັງບໍ່ໄດ້ execute ແລະຜົນຕ້ອງເກັບໃນ Evidence Register. ສະຖານະ 1.0 ຈຶ່ງບໍ່ແມ່ນການອ້າງວ່າລະບົບຜ່ານການທົດສອບແລ້ວ.</p></div>
      </section>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/mvp-scope`}><small>← ເອກະສານຕົ້ນທາງ</small><strong>MVP Scope & Prioritization 1.0</strong></a>
        <a href={`${basePath}/documents/content-taxonomy`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>Content Taxonomy</strong></a>
      </nav>
    </article>
  );
}
