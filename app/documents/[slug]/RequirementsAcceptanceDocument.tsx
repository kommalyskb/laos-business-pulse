"use client";

import { useState } from "react";
import styles from "../documents.module.css";
import { traceRows } from "./SystemAnalysisTraceability";

type RequirementFilter = "All" | "Guest" | "Operations" | "Quality";

const filterLabels: Record<RequirementFilter, string> = {
  All: "ທັງໝົດ",
  Guest: "Guest Journey",
  Operations: "Operations & Trust",
  Quality: "Non-functional",
};

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

function getFilter(id: string): Exclude<RequirementFilter, "All"> {
  if (id.startsWith("USR-")) return "Guest";
  if (id.startsWith("NFR-")) return "Quality";
  return "Operations";
}

export default function RequirementsAcceptanceDocument({ basePath }: { basePath: string }) {
  const [filter, setFilter] = useState<RequirementFilter>("All");
  const visibleRows = filter === "All" ? traceRows : traceRows.filter((row) => getFilter(row.id) === filter);
  const acceptanceCount = traceRows.reduce((total, row) => total + row.acceptance.length, 0);
  const linkedFunctions = new Set(traceRows.flatMap((row) => row.functionIds)).size;
  const linkedWorkflows = new Set(traceRows.flatMap((row) => row.workflowIds)).size;
  const linkedErrors = new Set(traceRows.flatMap((row) => row.errorCodes)).size;

  return (
    <article className={`${styles.detailBody} ${styles.businessDocument} ${styles.racBody}`}>
      <section className={styles.documentControl}>
        <div><small>ສະບັບ</small><strong>0.1</strong></div>
        <div><small>ສະຖານະ</small><strong>ຮ່າງສຳລັບທົບທວນ</strong></div>
        <div><small>ວັນທີປັບປຸງ</small><strong>26 ສິງຫາ 2026</strong></div>
        <div><small>ເອກະສານຕົ້ນທາງ</small><strong>PRO-01 1.0 + PRO-02 1.0 + PRO-03 1.0</strong></div>
      </section>

      <header className={styles.documentReadingHeader}>
        <span>PRO-04 · REQUIREMENTS & ACCEPTANCE CRITERIA</span>
        <h2>ລະບົບຕ້ອງເຮັດຫຍັງ ແລະຈະຕັດສິນແນວໃດວ່າ “ສຳເລັດ”</h2>
        <p>PRO-04 ແປຂອບເຂດທີ່ອະນຸມັດໃນ PRO-03 ໃຫ້ເປັນ Requirement ແລະ Acceptance Criteria ທີ່ກວດໄດ້. Developer ໃຊ້ມັນເພື່ອຮູ້ Behavior ທີ່ຕ້ອງສ້າງ; QA ໃຊ້ເພື່ອຂຽນ Test Case; Product Owner ໃຊ້ເພື່ອຮັບ ຫຼືບໍ່ຮັບການສົ່ງມອບ.</p>
        <p>Requirement ຈະບໍ່ຖືວ່າສຳເລັດເພາະໜ້າຈໍເບິ່ງໄດ້ ຫຼື Code ຖືກ Merge. ຕ້ອງຜ່ານ Criterion ທີ່ກຳນົດ ແລະມີຫຼັກຖານການທົດສອບ.</p>
      </header>

      <nav className={styles.documentToc} aria-label="ສາລະບານ PRO-04"><b>ສາລະບານ</b><ol>
        <li><a href="#rac-purpose">ຈຸດປະສົງ</a></li><li><a href="#rac-language">ພາສາຮ່ວມ</a></li><li><a href="#rac-baseline">Baseline ທີ່ຮັບມາ</a></li><li><a href="#rac-rules">ຫຼັກການຂຽນ Criterion</a></li><li><a href="#rac-catalog">13 Requirements / 46 Criteria</a></li><li><a href="#rac-testing">ລະດັບການທົດສອບ</a></li><li><a href="#rac-data">Test Data</a></li><li><a href="#rac-pass">Pass/Fail Policy</a></li><li><a href="#rac-coverage">Traceability Coverage</a></li><li><a href="#rac-review">5 ຈຸດທົບທວນ</a></li>
      </ol></nav>

      <section className={styles.documentArticleSection} id="rac-purpose">
        <span>01 · PURPOSE</span><h2>PRO-04 ເປັນສັນຍາການຮັບມອບລະຫວ່າງ Product, Development ແລະ QA</h2>
        <blockquote className={styles.racPurpose}>ກ່ອນເລີ່ມພັດທະນາ ທຸກຝ່າຍຕ້ອງຕົກລົງກັນກ່ອນວ່າ <strong>Input ແບບໃດ, ຢູ່ State ໃດ, ເມື່ອຜູ້ໃຊ້ເຮັດຫຍັງ ແລ້ວລະບົບຕ້ອງໃຫ້ຜົນແບບໃດ.</strong></blockquote>
        <div className={styles.racPurposeMap}>
          <article><b>PRODUCT OWNER</b><h3>ກຳນົດຜົນທີ່ຍອມຮັບ</h3><p>ຢືນຢັນ Business Rule, Priority, User Outcome ແລະຜົນ UAT.</p></article>
          <article><b>DEVELOPER</b><h3>ສ້າງ Behavior ຕາມ Contract</h3><p>ນຳ Requirement, Function, Workflow, State ແລະ Error Contract ໄປ Implement.</p></article>
          <article><b>QA</b><h3>ສ້າງຫຼັກຖານ Pass/Fail</h3><p>ແປ Acceptance Criterion ເປັນ Test Case, Test Data, Expected Result ແລະ Evidence.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="rac-language">
        <span>02 · SHARED LANGUAGE</span><h2>Requirement, Acceptance Criterion, Test Case ແລະ Evidence ບໍ່ແມ່ນສິ່ງດຽວກັນ</h2>
        <div className={styles.racDefinitions}>
          <article><b>REQUIREMENT</b><h3>ລະບົບຕ້ອງເຮັດຫຍັງ</h3><p>ກຳນົດ Capability, Actor, Boundary ແລະຜົນທີ່ຕ້ອງໄດ້. ຕົວຢ່າງ: Guest ກົດ Map ໄປຫາ Place ຖືກຕ້ອງ.</p></article>
          <article><b>ACCEPTANCE CRITERION</b><h3>ເງື່ອນໄຂການຮັບ</h3><p>ລະບຸ Given/State, Action ແລະ Expected Result ທີ່ຕັດສິນ Pass ຫຼື Fail ໄດ້.</p></article>
          <article><b>TEST CASE</b><h3>ວິທີກວດ Criterion</h3><p>ລະບຸ Environment, Precondition, Test Data, Steps, Expected Result ແລະ Cleanup.</p></article>
          <article><b>EVIDENCE</b><h3>ຫຼັກຖານວ່າກວດແລ້ວ</h3><p>Test result, log, query, screenshot ເມື່ອຈຳເປັນ, build version, ວັນທີ ແລະຜູ້ຮັບຮອງ.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="rac-baseline">
        <span>03 · APPROVED BASELINE</span><h2>PRO-04 ບໍ່ສ້າງ Scope ໃໝ່</h2>
        <p className={styles.documentQuestion}>ເອກະສານນີ້ສືບທອດ Requirement ຈາກ PRO-01, Analysis Contract ຈາກ PRO-02 ແລະ Priority/Release Boundary ຈາກ PRO-03.</p>
        <div className={styles.racSummary}>
          <article><small>REQUIREMENTS</small><strong>{traceRows.length}</strong><p>9 Functional + 4 Non-functional</p></article>
          <article><small>ACCEPTANCE CRITERIA</small><strong>{acceptanceCount}</strong><p>ທຸກຂໍ້ມີ ID ແລະ Expected Result</p></article>
          <article><small>LINKED FUNCTIONS</small><strong>{linkedFunctions}</strong><p>Logical Functions ຈາກ PRO-02</p></article>
          <article><small>WORKFLOWS / ERRORS</small><strong>{linkedWorkflows}/{linkedErrors}</strong><p>Workflow IDs / Error Codes ທີ່ອ້າງອີງ</p></article>
        </div>
        <div className={styles.racBoundary}>
          <div><b>ຢູ່ໃນ PRO-04</b><ul><li>Requirement statement ແລະ rationale</li><li>Acceptance Criteria ລະດັບ Product/System</li><li>Test level, data fixture ແລະ evidence</li><li>Pass/Fail, defect ແລະ sign-off policy</li><li>Traceability ຫາ Function/Workflow/Error</li></ul></div>
          <div><b>ບໍ່ຢູ່ໃນ PRO-04</b><ul><li>UX layout ລະອຽດທຸກໜ້າ</li><li>API endpoint/schema ສຸດທ້າຍ</li><li>Programming framework/infrastructure</li><li>Test automation code</li><li>Production operation runbook ສະບັບເຕັມ</li></ul></div>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="rac-rules">
        <span>04 · ACCEPTANCE WRITING RULES</span><h2>Criterion ທີ່ດີຕ້ອງລົບຄວາມຄຸມເຄືອ</h2>
        <ol className={styles.racAcceptanceRules}>{acceptanceRules.map(([id, title, detail]) => <li key={id}><b>{id}</b><div><strong>{title}</strong><p>{detail}</p></div></li>)}</ol>
      </section>

      <section className={styles.documentArticleSection} id="rac-catalog">
        <span>05 · REQUIREMENT & ACCEPTANCE CATALOG</span><h2>13 Requirements ແລະ 46 Acceptance Criteria</h2>
        <p className={styles.documentQuestion}>ໃຊ້ Filter ເພື່ອເບິ່ງ Guest Journey, Operations/Trust ຫຼື Non-functional Requirement. ກົດ Requirement ເພື່ອເປີດ Criteria, Evidence ແລະ Traceability.</p>
        <div className={styles.racFilters} role="tablist" aria-label="Filter requirements">
          {(["All", "Guest", "Operations", "Quality"] as const).map((value) => <button type="button" role="tab" aria-selected={filter === value} className={filter === value ? styles.racFilterActive : ""} key={value} onClick={() => setFilter(value)}><b>{filterLabels[value]}</b><span>{value === "All" ? traceRows.length : traceRows.filter((row) => getFilter(row.id) === value).length}</span></button>)}
        </div>
        <div className={styles.racRequirementList}>
          {visibleRows.map((row, index) => <details key={row.id} open={index === 0 && filter === "All"}>
            <summary><div><code>{row.id}</code><span data-priority={row.priority}>{row.priority}</span><span>{row.kind}</span></div><strong>{row.title}</strong><small>{row.acceptance.length} Criteria · {row.functionIds.length} Functions · {row.workflowIds.length} Workflows</small></summary>
            <div className={styles.racRequirementBody}>
              <section><b>REQUIREMENT</b><p>{row.requirement}</p></section>
              <section><b>RATIONALE</b><p>{row.rationale}</p></section>
              <section className={styles.racAcceptanceBlock}><b>ACCEPTANCE CRITERIA</b><ol>{row.acceptance.map((criterion) => { const [id, ...detail] = criterion.split(" · "); return <li key={id}><code>{id}</code><p>{detail.join(" · ")}</p></li>; })}</ol></section>
              <section><b>REQUIRED EVIDENCE</b><ul>{row.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section className={styles.racTraceBlock}><b>TRACEABILITY</b><dl><div><dt>Use Case / Rules</dt><dd>{[...row.useCases, ...row.rules].join(" · ") || "—"}</dd></div><div><dt>Functions</dt><dd>{row.functionIds.join(" · ") || "—"}</dd></div><div><dt>Entities / Workflows</dt><dd>{[...row.entityIds, ...row.workflowIds].join(" · ") || "—"}</dd></div><div><dt>States / Errors</dt><dd>{[...row.stateIds, ...row.errorCodes].join(" · ") || "—"}</dd></div></dl></section>
            </div>
          </details>)}
        </div>
      </section>

      <section className={styles.documentArticleSection} id="rac-testing">
        <span>06 · VERIFICATION LEVELS</span><h2>Criterion ແຕ່ລະຂໍ້ອາດຕ້ອງມີຫຼາຍກວ່າໜຶ່ງ Test</h2>
        <div className={styles.racTestLevels} role="table" aria-label="Test levels"><div role="row"><b>LEVEL</b><b>TYPE</b><b>ກວດຫຍັງ</b><b>OWNER</b><b>EVIDENCE</b></div>{testLevels.map(([id, type, purpose, owner, evidence]) => <div role="row" key={id}><strong>{id}</strong><b>{type}</b><p>{purpose}</p><span>{owner}</span><code>{evidence}</code></div>)}</div>
      </section>

      <section className={styles.documentArticleSection} id="rac-data">
        <span>07 · CONTROLLED TEST DATA</span><h2>ຫ້າມທົດສອບດ້ວຍ Place ທີ່ສົມບູນພຽງແບບດຽວ</h2>
        <div className={styles.documentProse}><p>Test Environment ຕ້ອງມີ Dataset ທີ່ສ້າງຊ້ຳໄດ້ ແລະບໍ່ມີຂໍ້ມູນສ່ວນບຸກຄົນຈິງທີ່ບໍ່ຈຳເປັນ. Fixture ID ຕ້ອງຖືກອ້າງໃນ Test Case ເພື່ອໃຫ້ຜົນທົດສອບຊ້ຳໄດ້.</p></div>
        <div className={styles.racFixtureTable} role="table" aria-label="Required test fixtures"><div role="row"><b>ID</b><b>FIXTURE</b><b>STATE / DATA</b><b>USED TO VERIFY</b></div>{fixtures.map(([id, name, data, use]) => <div role="row" key={id}><strong>{id}</strong><b>{name}</b><p>{data}</p><span>{use}</span></div>)}</div>
      </section>

      <section className={styles.documentArticleSection} id="rac-pass">
        <span>08 · PASS, FAIL & DEFECT POLICY</span><h2>“ໃຊ້ໄດ້ສ່ວນໃຫຍ່” ບໍ່ແມ່ນເກນຮັບມອບ</h2>
        <div className={styles.racPassPolicy}>{passPolicy.map(([type, rule]) => <article key={type} data-policy={type}><b>{type}</b><p>{rule}</p></article>)}</div>
        <div className={styles.racSignoffFlow}><div><b>01</b><span>QA ຕິດ Evidence ກັບ Requirement/Build</span></div><i>→</i><div><b>02</b><span>Tech Lead ຢືນຢັນ Technical/Regression Result</span></div><i>→</i><div><b>03</b><span>Product Owner ກວດ UAT ແລະ Business Outcome</span></div><i>→</i><div><b>04</b><span>ບັນທຶກ Accepted, Rejected ຫຼື Accepted with Approved Deviation</span></div></div>
      </section>

      <section className={styles.documentArticleSection} id="rac-coverage">
        <span>09 · TRACEABILITY COVERAGE</span><h2>Requirement ທຸກຂໍ້ຕ້ອງຕາມຫາ Analysis ແລະ Test ໄດ້</h2>
        <div className={styles.racCoverageTable} role="table" aria-label="Requirement acceptance coverage"><div role="row"><b>REQ</b><b>PRIORITY</b><b>AC</b><b>FUNCTIONS</b><b>ENTITIES</b><b>WORKFLOWS</b><b>STATES</b><b>ERRORS</b></div>{traceRows.map((row) => <div role="row" key={row.id}><strong>{row.id}</strong><span>{row.priority}</span><b>{row.acceptance.length}</b><span>{row.functionIds.length}</span><span>{row.entityIds.length}</span><span>{row.workflowIds.length}</span><span>{row.stateIds.length}</span><span>{row.errorCodes.length}</span></div>)}</div>
        <div className={styles.racChangeRule}><b>CHANGE RULE</b><p>ຖ້າ Requirement ຫຼື Criterion ປ່ຽນ ຜູ້ຂໍປ່ຽນຕ້ອງກວດ PRO-02 Function/Entity/Workflow/State/Error, PRO-03 Priority/Milestone, UX Flow, API/Data Design, Test Case ແລະ Release Plan ທີ່ຖືກກະທົບ. ຫ້າມແກ້ Criterion ໃຫ້ຜ່ານຫຼັງ Test ລົ້ມ ໂດຍບໍ່ມີ Change Decision.</p></div>
      </section>

      <section className={styles.documentArticleSection} id="rac-review">
        <span>10 · REVIEW REQUIRED</span><h2>5 ຈຸດທີ່ຕ້ອງຕັດສິນກ່ອນ PRO-04 ຂຶ້ນເປັນ 1.0</h2>
        <ol className={styles.saReviewChecklist}>
          <li><b>Acceptance Authority:</b><p>ໃຜເປັນຜູ້ມີສິດຮັບມອບສຸດທ້າຍສຳລັບ Business/UAT, Technical Quality ແລະ Operational Readiness?</p></li>
          <li><b>Test Environment & Data:</b><p>ອະນຸມັດໃຫ້ມີ Test Environment ແຍກ, 8 Controlled Fixtures ແລະຫ້າມນຳ Production Personal Data ມາທົດສອບໂດຍກົງຫຼືບໍ່?</p></li>
          <li><b>Defect Severity & Release Block:</b><p>Critical/High ຕ້ອງ Block Release; Medium ອາດຮັບໄດ້ສະເພາະມີ workaround, owner ແລະ due date; Low ເຂົ້າ backlog—ຂອບເຂດນີ້ເໝາະສົມຫຼືບໍ່?</p></li>
          <li><b>Performance Target:</b><p>NFR-02 ຍັງຕ້ອງລະບຸ Mobile Network/Device baseline, response/render target ແລະ External Media timeout ໃນ Technical Proposal ກ່ອນ Pilot; ຈະໃຫ້ PRO-04 ອະນຸມັດແບບມີເງື່ອນໄຂ ຫຼືລໍຕົວເລກກ່ອນ?</p></li>
          <li><b>UAT & Sign-off Evidence:</b><p>ຈະໃຊ້ Journey/Scenario ໃດເປັນ UAT ບັງຄັບ, ໃຜຕ້ອງລົງນາມ ແລະຈະເກັບ Evidence/Approved Deviation ໄວ້ບ່ອນໃດ?</p></li>
        </ol>
      </section>

      <aside className={styles.draftApprovalGate}><div><span>ຮ່າງສຳລັບທົບທວນ</span><h2>PRO-04 · Requirements & Acceptance 0.1</h2><p>ຮ່າງນີ້ກວມ 13 Requirements, 46 Acceptance Criteria, Test Levels, Controlled Fixtures, Pass/Fail Policy ແລະ Traceability Coverage. ຍັງບໍ່ເປັນ 1.0 ຈົນກວ່າ 5 ຈຸດທົບທວນຈະຖືກຕັດສິນ.</p></div><ul><li>Requirements — 13/13</li><li>Acceptance Criteria — 46</li><li>Test Fixtures — 8</li><li>Traceability — ຜູກກັບ PRO-02</li><li>Review decisions — ລໍອະນຸມັດ</li></ul></aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/mvp-scope`}><small>← ເອກະສານຕົ້ນທາງ</small><strong>MVP Scope & Prioritization 1.0</strong></a>
        <a href={`${basePath}/documents/content-taxonomy`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>Content Taxonomy</strong></a>
      </nav>
    </article>
  );
}
