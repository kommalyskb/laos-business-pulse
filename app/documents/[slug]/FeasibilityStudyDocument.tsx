import styles from "../documents.module.css";
import BusinessDocumentReaderGuide from "./BusinessDocumentReaderGuide";

const dimensions = [
  ["01", "Market", "ທົດສອບໄດ້", "ພຶດຕິກຳຄົ້ນຫາຜ່ານວິດີໂອມີຢູ່ແລ້ວ ແຕ່ຍັງຕ້ອງພິສູດວ່າຜູ້ໃຊ້ຈະຍ້າຍມາໃຊ້ portal ສະເພາະ.", "ທົດສອບ", "User prototype test"],
  ["02", "Content supply", "ມີຄວາມສ່ຽງ", "ມີ review link ກະຈາຍຢູ່ຫຼາຍແຫຼ່ງ; ວຽກໜັກແມ່ນຄັດເລືອກ, ຈັບຄູ່ place ແລະຮັກສາຂໍ້ມູນ.", "ລະວັງ", "Curation sprint"],
  ["03", "Operations", "ເປັນໄປໄດ້ແບບຈຳກັດ", "Concierge operation ເຮັດໄດ້ໃນ pilot ແຕ່ຈະຂະຫຍາຍບໍ່ໄດ້ຖ້າ verification ແລະ update ຍັງ manual ທັງໝົດ.", "ມີເງື່ອນໄຂ", "Time-per-place test"],
  ["04", "Technical", "ເປັນໄປໄດ້", "Web/PWA, search, place page, map/call/message ແລະ analytics ເປັນ scope ທີ່ສ້າງໄດ້; booking ແລະ AI ບໍ່ຈຳເປັນ.", "ໄປຕໍ່", "Technical spike"],
  ["05", "Legal & trust", "ຕ້ອງກວດ", "Link ແລະ official embed ຫຼຸດຄວາມສ່ຽງ ແຕ່ຕ້ອງກວດ platform terms, attribution, takedown ແລະ sponsor disclosure.", "ຕ້ອງກວດ", "Policy review"],
  ["06", "Financial", "ຍັງບໍ່ພິສູດ", "ມີ revenue hypothesis ແລ້ວ ແຕ່ຍັງຂາດ cost ceiling, willingness-to-pay ແລະ unit economics.", "ຍັງບໍ່ຮູ້", "Pre-sell + FS"],
];

const risks = [
  ["R1 · HIGH", "ຜູ້ໃຊ້ເບິ່ງວິດີໂອແຕ່ບໍ່ກົດເຂົ້າ Place Page.", "ທົດສອບ feed → place → map/call ກ່ອນສ້າງລະບົບເຕັມ."],
  ["R2 · HIGH", "Content link ຫາໄດ້ ແຕ່ການຈັບຄູ່ ແລະກວດ place data ໃຊ້ເວລາຫຼາຍ.", "ວັດນາທີຕໍ່ place ແລະອອກແບບ admin workflow ຈາກ pilot."],
  ["R3 · HIGH", "ຮ້ານສົນໃຈ traffic ແຕ່ບໍ່ຍອມຈ່າຍ.", "ຂໍ deposit ຫຼື letter of intent; ບໍ່ນັບພຽງຄຳວ່າ “ສົນໃຈ”."],
  ["R4 · MED", "Official embed/preview ປ່ຽນຂໍ້ກຳນົດ ຫຼື link ຫາຍ.", "ເກັບ canonical URL, platform/source, checked date ແລະ fallback ໄປຫາຕົ້ນສະບັບ."],
  ["R5 · MED", "Sponsored content ທຳລາຍຄວາມເຊື່ອໃຈ.", "ຕິດປ້າຍ, ຈຳກັດ inventory ແລະບໍ່ໃຫ້ການຈ່າຍເງິນປ່ຽນ review score."],
  ["R6 · MED", "Server/media cost ເຕີບໄວກວ່າລາຍຮັບ.", "ບໍ່ re-host video, ຕິດຕາມ cost per active user/place ແລະຕັ້ງ monthly stop-loss."],
];

export default function FeasibilityStudyDocument({ basePath }: { basePath: string }) {
  return (
    <article className={`${styles.detailBody} ${styles.feasibilityBody}`}>
      <section className={styles.documentControl}>
        <div><small>VERSION</small><strong>1.0</strong></div>
        <div><small>STATUS</small><strong>Approved</strong></div>
        <div><small>UPDATED</small><strong>25 ສິງຫາ 2026</strong></div>
        <div><small>INPUT</small><strong>Vision 1.0 + Canvas 1.0</strong></div>
      </section>

      <BusinessDocumentReaderGuide code="BUS-04" />

      <section>
        <span>01 · EXECUTIVE VERDICT</span>
        <h2>ຂໍ້ສະຫຼຸບເບື້ອງຕົ້ນ</h2>
        <div className={styles.feasibilityVerdict}>
          <div><small>APPROVED DECISION</small><strong>CONDITIONAL GO</strong><b>ໄປຕໍ່ແບບມີເງື່ອນໄຂ</b></div>
          <p>ແນະນຳໃຫ້ລົງທຶນໃນ <strong>validation pilot 6 ອາທິດ</strong> ເທົ່ານັ້ນ. ຫຼັກຖານປັດຈຸບັນພຽງພໍສຳລັບການທົດສອບ ແຕ່ຍັງບໍ່ພຽງພໍສຳລັບອະນຸມັດ full MVP development. ຈຸດສ່ຽງທີ່ສຸດແມ່ນ content operation, willingness-to-pay ແລະ monthly cost ceiling—ບໍ່ແມ່ນການຂຽນ software.</p>
        </div>
      </section>

      <section>
        <span>02 · DECISION BOUNDARY</span>
        <h2>ເອກະສານນີ້ຕັດສິນຫຍັງ</h2>
        <div className={styles.feasibilityInputs}>
          <div><b>APPROVED INPUTS</b><ul><li>Launch ທີ່ວຽງຈັນ</li><li>ອາຫານ ແລະຄາເຟກ່ອນ</li><li>Video-first discovery</li><li>Place data + map/call/message</li><li>ບໍ່ມີ booking ໃນ MVP</li><li>Basic listing ແລະ user access ຟຣີ</li></ul></div>
          <div><b>THIS STUDY MUST PROVE</b><ul><li>ຜູ້ໃຊ້ໄດ້ປະໂຫຍດຫຼາຍກວ່າ social search</li><li>ສ້າງ inventory ໄດ້ໃນຕົ້ນທຶນທີ່ຮັບໄດ້</li><li>ຮ້ານຍອມຈ່າຍເພື່ອ measurable intent</li><li>Link/embed model ໃຊ້ໄດ້ຢ່າງຍືນຍົງ</li><li>Pilot economics ບໍ່ເກີນ stop-loss</li></ul></div>
          <div><b>NOT AUTHORIZED YET</b><ul><li>ສ້າງ full production platform</li><li>ຈ້າງທີມຖາວອນ</li><li>ຊື້/host video ຈຳນວນຫຼາຍ</li><li>ສ້າງ AI recommendation</li><li>Booking, payment ຫຼື native app</li></ul></div>
        </div>
      </section>

      <section>
        <span>03 · FEASIBILITY SCORECARD</span>
        <h2>ສະຖານະ 6 ດ້ານ</h2>
        <div className={styles.feasibilityScorecard} role="table" aria-label="Feasibility scorecard">
          <div role="row"><b>#</b><b>DIMENSION</b><b>ASSESSMENT</b><b>STATUS</b><b>NEXT EVIDENCE</b></div>
          {dimensions.map(([no, name, summary, detail, status, test]) => (
            <div role="row" key={name}><b>{no}</b><strong>{name}</strong><p><em>{summary}</em>{detail}</p><span>{status}</span><small>{test}</small></div>
          ))}
        </div>
        <p className={styles.metricNote}>Scorecard ນີ້ແມ່ນການປະເມີນເບື້ອງຕົ້ນຈາກ Vision ແລະ Business Canvas; ຈະປ່ຽນເມື່ອມີຫຼັກຖານຈາກ pilot.</p>
      </section>

      <section>
        <span>04 · MARKET FEASIBILITY</span>
        <h2>ພິສູດບັນຫາ ບໍ່ແມ່ນພິສູດຍອດ view</h2>
        <div className={styles.feasibilityGrid}>
          <article><b>USER DEMAND</b><h3>ຄຳຖາມ</h3><p>ການຮວບຮວມວິດີໂອຕາມ place/category ຊ່ວຍໃຫ້ຕັດສິນໃຈໄວຂຶ້ນຫຼືບໍ່?</p><h3>ຫຼັກຖານ</h3><p>Task completion, repeat use ແລະ map/call/message intent.</p></article>
          <article><b>BUSINESS DEMAND</b><h3>ຄຳຖາມ</h3><p>Place owner ເຫັນຄຸນຄ່າຈາກ qualified traffic ແລະຍອມຈ່າຍແທ້ຫຼືບໍ່?</p><h3>ຫຼັກຖານ</h3><p>Deposit, paid pilot ຫຼື letter of intent—ບໍ່ແມ່ນ verbal interest.</p></article>
          <article><b>ALTERNATIVE</b><h3>ຄູ່ແຂ່ງຈິງ</h3><p>Facebook, TikTok, YouTube, Google Maps ແລະການຖາມໝູ່ ແມ່ນພຶດຕິກຳເດີມ.</p><h3>ຊ່ອງວ່າງ</h3><p>ຈັດຕາມ place, ຂໍ້ມູນຄົບ ແລະກົດ action ໄດ້ໃນ flow ດຽວ.</p></article>
        </div>
      </section>

      <section>
        <span>05 · CONTENT & OPERATIONS</span>
        <h2>Cold start ຈະໄປໄດ້ຫຼືບໍ່</h2>
        <div className={styles.feasibilityTable} role="table" aria-label="Content and operations tests">
          <div role="row"><b>WORKSTREAM</b><b>PILOT METHOD</b><b>MEASURE</b><b>FAIL SIGNAL</b></div>
          <div role="row"><strong>Place inventory</strong><p>ເກັບ 100 place records ຈາກ 2 category ໃນວຽງຈັນ.</p><span>ເວລາ/record, completeness, duplicate rate</span><em>ຂໍ້ມູນຄົບຍາກ ຫຼືແພງເກີນໄປ</em></div>
          <div role="row"><strong>Review supply</strong><p>ຈັບຄູ່ canonical link ແລະ creator attribution ໃຫ້ແຕ່ລະ place.</p><span>usable links/place, broken/takedown rate</span><em>ບໍ່ມີ content ພໍ ຫຼື source ບໍ່ຍືນຍົງ</em></div>
          <div role="row"><strong>Freshness</strong><p>ທົດສອບການກວດເບີ, ເວລາເປີດ ແລະ location ຊ້ຳ.</p><span>correction rate, minutes/update</span><em>ຂໍ້ມູນເກົ່າໄວ ແລະບໍ່ມີ owner</em></div>
          <div role="row"><strong>Business onboarding</strong><p>ໃຫ້ຮ້ານ claim ແລະແກ້ຂໍ້ມູນຜ່ານ concierge workflow.</p><span>claim rate, response time, support load</span><em>ຮ້ານບໍ່ຮ່ວມມື ຫຼື support ຫຼາຍເກີນໄປ</em></div>
        </div>
      </section>

      <section>
        <span>06 · TECHNICAL FEASIBILITY</span>
        <h2>ສ້າງພຽງສິ່ງທີ່ຈຳເປັນຕໍ່ການພິສູດ</h2>
        <div className={styles.costColumns}>
          <div><h3>FEASIBLE FOR PILOT</h3><ul><li>Responsive web/PWA</li><li>Vertical video/link preview feed</li><li>Search, category ແລະ filter</li><li>Canonical Place Page</li><li>Map, call, message deep links</li><li>Admin curation ແບບງ່າຍ</li><li>Event analytics</li></ul></div>
          <div><h3>DEFER TO REDUCE RISK</h3><ul><li>Video re-hosting/transcoding</li><li>AI recommendation</li><li>User account ທີ່ຊັບຊ້ອນ</li><li>Real-time booking</li><li>Payment/settlement</li><li>Native iOS/Android</li><li>Multi-city scale architecture</li></ul></div>
        </div>
        <p className={styles.metricNote}>Technical spike ຕ້ອງກວດ 3 ຢ່າງ: official embed/preview behavior, performance ຂອງ feed ໃນ mobile network ແລະ event tracking ຈາກ Video → Place → Action.</p>
      </section>

      <section>
        <span>07 · LEGAL & TRUST FEASIBILITY</span>
        <h2>ຂອບເຂດທີ່ຕ້ອງມີກ່ອນ pilot</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ເກັບ canonical URL ແລະ redirect ໄປຫາຕົ້ນສະບັບ; ບໍ່ download/re-host video.</span></li>
          <li><b>02</b><span>ໃຊ້ official embed/preview ສະເພາະເມື່ອ platform terms ອະນຸຍາດ.</span></li>
          <li><b>03</b><span>ສະແດງ creator, source platform, original link ແລະ checked date.</span></li>
          <li><b>04</b><span>ມີ report, correction ແລະ takedown channel ທີ່ຕອບກັບໄດ້.</span></li>
          <li><b>05</b><span>Sponsored ຕ້ອງມີ label ຊັດເຈນ ແລະແຍກຈາກ Source linked/Place verified.</span></li>
          <li><b>06</b><span>ກວດກົດໝາຍລາວ, privacy, advertising ແລະ platform terms ກັບຜູ້ຊ່ຽວຊານກ່ອນ public launch.</span></li>
        </ul>
      </section>

      <section>
        <span>08 · FINANCIAL FEASIBILITY</span>
        <h2>ພິສູດວ່າລາຍຮັບສາມາດຮອງຮັບ operation</h2>
        <div className={styles.financialLogic}>
          <article><b>REVENUE TEST</b><strong>3 + 2</strong><p>ຢ່າງໜ້ອຍ 3 paid/deposit ແລະ 2 signed LOI; verbal interest ບໍ່ນັບ.</p></article>
          <article><b>PRICE HYPOTHESIS</b><strong>200K / 1M ₭</strong><p>ຕໍ່ເດືອນ / ຕໍ່ campaign ສຳລັບທົດສອບ; ບໍ່ແມ່ນລາຄາສຸດທ້າຍ.</p></article>
          <article><b>COST CONTROL</b><strong>STOP-LOSS</strong><p>Founder ຕ້ອງກຳນົດເພດານ pilot ແລະ monthly burn ໃນ Financial Structure.</p></article>
        </div>
        <div className={styles.formulaBlock}><b>CORE FORMULAS</b><p>Monthly pilot revenue = partner subscription + sponsored campaign</p><p>Contribution margin = revenue − variable hosting − curation − support − creator/campaign cost</p><p>Break-even partners = monthly fixed cost ÷ contribution per paying partner</p></div>
      </section>

      <section>
        <span>09 · SIX-WEEK VALIDATION PLAN</span>
        <h2>ແຜນທົດສອບກ່ອນສ້າງ MVP</h2>
        <ol className={styles.pilotTimeline}>
          <li><b>W1</b><div><strong>Problem interviews</strong><p>ສຳພາດຜູ້ໃຊ້ 20 ຄົນທີ່ມີພຶດຕິກຳ social search ແລະ place owners 15 ຮ້ານ.</p></div></li>
          <li><b>W2</b><div><strong>Supply sprint</strong><p>ສ້າງ place records ແບບ 30 → 60 → 100; ກວດ workflow ໃນແຕ່ລະ gate ກ່ອນໄປຕໍ່.</p></div></li>
          <li><b>W3</b><div><strong>Clickable prototype</strong><p>ທົດສອບ feed → search → place → map/call/message ກັບຜູ້ໃຊ້.</p></div></li>
          <li><b>W4</b><div><strong>Technical & policy spike</strong><p>ກວດ embed/link, mobile performance, analytics ແລະ content policy.</p></div></li>
          <li><b>W5</b><div><strong>Pre-sell</strong><p>ສະເໜີ Founding Partner package ຫາ 30 ຮ້ານ; ເປົ້າໝາຍຢ່າງໜ້ອຍ 3 paid/deposit + 2 signed LOI.</p></div></li>
          <li><b>W6</b><div><strong>Decision review</strong><p>ລວບລວມ evidence, cost model ແລະຕັດສິນ GO / PIVOT / NO-GO.</p></div></li>
        </ol>
      </section>

      <section>
        <span>10 · PILOT CONTROL</span>
        <h2>Owner, ງົບ ແລະສິດຢຸດ</h2>
        <div className={styles.costColumns}>
          <div><h3>ACCOUNTABLE OWNERS</h3><ul><li>Founder — decision, budget, place interview ແລະ pre-sell</li><li>Content/Research Operator — user interview, curation ແລະ verification</li><li>Technical Builder — prototype, technical spike ແລະ analytics</li><li>Legal adviser — policy checkpoint ກ່ອນ public launch</li></ul></div>
          <div><h3>BUDGET RELEASE</h3><ul><li>30% — ອາທິດ 1–2</li><li>35% — ອາທິດ 3–4 ຫຼັງຜ່ານ supply gate</li><li>35% — ອາທິດ 5–6 ຫຼັງຜ່ານ user-value gate</li><li>ບໍ່ຜ່ານ gate = ຢຸດງົບ, ທົບທວນ ຫຼື pivot</li></ul></div>
        </div>
        <p className={styles.metricNote}>ຈຳນວນ cash ceiling ແລະ monthly stop-loss ຕ້ອງຖືກອະນຸມັດໃນ Financial Structure ກ່ອນປ່ອຍງົບງວດທຳອິດ.</p>
      </section>

      <section>
        <span>11 · GO / NO-GO GATES</span>
        <h2>ເກນຕັດສິນທີ່ບໍ່ໃຊ້ຄວາມຮູ້ສຶກ</h2>
        <div className={styles.gateTable} role="table" aria-label="Go no-go criteria">
          <div role="row"><b>GATE</b><b>GO</b><b>PIVOT</b><b>NO-GO</b></div>
          <div role="row"><strong>User value</strong><p>ຜູ້ທົດສອບສ່ວນໃຫຍ່ຫາ place ແລະ action ໄດ້ໂດຍບໍ່ຊ່ວຍ.</p><span>ເຫັນຄຸນຄ່າ ແຕ່ flow/category ຍັງບໍ່ຖືກ.</span><em>ກັບໄປ social search ແລະບໍ່ຢາກໃຊ້ຊ້ຳ.</em></div>
          <div role="row"><strong>Supply</strong><p>100 records ມີຂໍ້ມູນຫຼັກຄົບ ແລະມີ workflow ຊ້ຳໄດ້.</p><span>ຫາ content ໄດ້ ແຕ່ຕ້ອງຫຼຸດ category/area.</span><em>ຂໍ້ມູນບໍ່ຄົບ, rights ບໍ່ຊັດ ຫຼືຕົ້ນທຶນຮັບບໍ່ໄດ້.</em></div>
          <div role="row"><strong>Revenue</strong><p>ຢ່າງໜ້ອຍ 3 paid/deposit + 2 signed LOI ຈາກ 30 ຮ້ານທີ່ເຂົ້າຫາ.</p><span>ມີ commitment ແຕ່ package/price ຕ້ອງປັບ.</span><em>ມີພຽງ verbal interest ຫຼືບໍ່ມີ commitment.</em></div>
          <div role="row"><strong>Economics</strong><p>Pilot ຢູ່ໃນ stop-loss ແລະມີທາງຫຼຸດ cost/place.</p><span>ຕ້ອງຫຼຸດ scope ຫຼືປ່ຽນ operation.</span><em>Cost ເຕີບຕາມ content/user ໂດຍບໍ່ມີທາງຮອງຮັບ.</em></div>
          <div role="row"><strong>Trust & rights</strong><p>Link/embed, attribution, takedown ແລະ sponsored policy ໃຊ້ງານໄດ້.</p><span>ຈຳກັດ source/platform ເພື່ອຫຼຸດຄວາມສ່ຽງ.</span><em>Model ຕ້ອງພຶ່ງການນຳ content ມາໃຊ້ໂດຍບໍ່ມີສິດ.</em></div>
        </div>
      </section>

      <section>
        <span>12 · RISK REGISTER</span>
        <h2>ຄວາມສ່ຽງທີ່ຕ້ອງຈັດການກ່ອນ</h2>
        <ol className={styles.riskList}>
          {risks.map(([level, risk, mitigation]) => <li key={level}><b>{level}</b><p>{risk}</p><span>{mitigation}</span></li>)}
        </ol>
      </section>

      <section>
        <span>13 · EVIDENCE REGISTER</span>
        <h2>ຂໍ້ມູນທີ່ຍັງຕ້ອງເກັບ</h2>
        <div className={styles.sourcePlan}>
          <article><b>USER</b><p>Interview note, task result, action click, repeat intent</p></article>
          <article><b>PLACE</b><p>Interview, claim behavior, paid/deposit/LOI evidence</p></article>
          <article><b>CONTENT</b><p>Source URL, creator, rights method, match quality, checked date</p></article>
          <article><b>OPERATION</b><p>Minutes/place, correction rate, support request, staffing need</p></article>
          <article><b>TECH</b><p>Load time, embed success, broken link, analytics completeness</p></article>
          <article><b>FINANCE</b><p>Actual pilot spend, monthly burn, contribution, runway</p></article>
        </div>
      </section>

      <section>
        <span>14 · APPROVED PILOT PARAMETERS</span>
        <h2>ຂໍ້ກຳນົດທີ່ອະນຸມັດແລ້ວ</h2>
        <ol className={styles.openQuestions}>
          <li><b>01</b><p>Conditional Go ສຳລັບ validation pilot 6 ອາທິດ ມີ review gate ທ້າຍອາທິດ 2, 4 ແລະ 6.</p></li>
          <li><b>02</b><p>Place records 30 → 60 → 100, user test 20 ຄົນ, owner interview 15 ຮ້ານ ແລະ sales outreach 30 ຮ້ານ.</p></li>
          <li><b>03</b><p>Revenue gate ແມ່ນ 3 paid/deposit + 2 signed LOI; verbal interest ບໍ່ນັບເປັນຫຼັກຖານ.</p></li>
          <li><b>04</b><p>ປ່ອຍງົບ 30%/35%/35% ຕາມ gate; cash ceiling ແລະ stop-loss ກຳນົດໃນ Financial Structure.</p></li>
          <li><b>05</b><p>Founder ເປັນ decision/budget/sales owner; Content/Research Operator ແລະ Technical Builder ເປັນ execution owners.</p></li>
        </ol>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>APPROVAL RECORDED</span><h2>Feasibility Study 1.0</h2></div>
        <ul><li>Conditional Go — Approved</li><li>Six-week pilot — Approved</li><li>Sample and supply targets — Approved</li><li>Revenue evidence gate — Approved</li><li>Budget control and ownership — Approved</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/business-canvas`}><small>← APPROVED INPUT</small><strong>ແຜນພາບທຸລະກິດ</strong></a>
        <a href={`${basePath}/documents/financial-structure`}><small>NEXT PRIORITY →</small><strong>ໂຄງສ້າງການເງິນ</strong></a>
      </nav>
    </article>
  );
}
