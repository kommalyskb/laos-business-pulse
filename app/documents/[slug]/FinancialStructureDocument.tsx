"use client";

import { useMemo, useState } from "react";
import styles from "../documents.module.css";

const LAK = new Intl.NumberFormat("lo-LA", { maximumFractionDigits: 0 });
const formatLak = (value: number) => `${LAK.format(Math.max(0, Math.round(value)))} ₭`;

const allocations = [
  ["Research & content", 30, "User interview, place records, curation ແລະ verification"],
  ["Prototype & technical", 25, "Prototype, technical spike, analytics ແລະ QA"],
  ["Sales & onboarding", 15, "Place-owner outreach, pre-sell ແລະ onboarding"],
  ["Tools, hosting & legal", 15, "Hosting, software tools, policy/accounting checkpoint"],
  ["Contingency", 15, "ສຳຮອງສະເພາະບັນຫາທີ່ບັນທຶກແລະອະນຸມັດ"],
] as const;

const financialRisks = [
  ["F1 · HIGH", "ເລີ່ມຈ້າງທີມ ຫຼືສ້າງ full MVP ກ່ອນພິສູດ revenue.", "ອະນຸຍາດພຽງ pilot expense ແລະປ່ອຍງົບຕາມ gate."],
  ["F2 · HIGH", "ນັບ verbal interest ເປັນລາຍຮັບທີ່ຄາດໄດ້.", "ນັບສະເພາະ cash collected, deposit ແລະ signed LOI ແຍກກັນ."],
  ["F3 · HIGH", "ປົນເງິນໂຄງການກັບເງິນຄ່າຄອງຊີບສ່ວນຕົວ.", "ແຍກບັນຊີ/ledger ແລະຫ້າມໃຊ້ emergency reserve."],
  ["F4 · MED", "ບໍ່ນັບມູນຄ່າເວລາຂອງ founder ເຮັດໃຫ້ unit economics ເບິ່ງດີເກີນຈິງ.", "ແຍກ cash cost ແລະ shadow cost ໃນລາຍງານ."],
  ["F5 · MED", "Hosting, support ແລະ content cost ເຕີບຕາມ usage ໄວກວ່າລາຍຮັບ.", "ວັດ cost/user, cost/place ແລະ contribution margin ທຸກອາທິດ."],
];

function MoneyInput({ label, value, onChange, step = 100000 }: { label: string; value: number; onChange: (value: number) => void; step?: number }) {
  return <label><span>{label}</span><input type="number" min="0" step={step} value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /><small>ກີບ</small></label>;
}

function CountInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label><span>{label}</span><input type="number" min="0" step="1" value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /><small>ຈຳນວນ</small></label>;
}

export default function FinancialStructureDocument({ basePath }: { basePath: string }) {
  const [cashCeiling, setCashCeiling] = useState(20_000_000);
  const [monthlyFixed, setMonthlyFixed] = useState(6_000_000);
  const [monthlyVariable, setMonthlyVariable] = useState(2_000_000);
  const [partners, setPartners] = useState(3);
  const [subscription, setSubscription] = useState(200_000);
  const [campaigns, setCampaigns] = useState(1);
  const [campaignPrice, setCampaignPrice] = useState(1_000_000);

  const model = useMemo(() => {
    const monthlyRevenue = partners * subscription + campaigns * campaignPrice;
    const monthlyCost = monthlyFixed + monthlyVariable;
    const netBurn = Math.max(0, monthlyCost - monthlyRevenue);
    const runway = netBurn > 0 ? cashCeiling / netBurn : Infinity;
    const pilotCost = monthlyCost * 1.5;
    const pilotRevenue = monthlyRevenue * 1.5;
    const cashAfterPilot = cashCeiling - Math.max(0, pilotCost - pilotRevenue);
    const partnerContributionNeeded = Math.max(0, monthlyCost - campaigns * campaignPrice);
    const breakEvenPartners = subscription > 0 ? Math.ceil(partnerContributionNeeded / subscription) : 0;
    return { monthlyRevenue, monthlyCost, netBurn, runway, pilotCost, pilotRevenue, cashAfterPilot, breakEvenPartners };
  }, [cashCeiling, monthlyFixed, monthlyVariable, partners, subscription, campaigns, campaignPrice]);

  return (
    <article className={`${styles.detailBody} ${styles.financialBody}`}>
      <section className={styles.documentControl}>
        <div><small>VERSION</small><strong>0.1</strong></div>
        <div><small>STATUS</small><strong>Draft for review</strong></div>
        <div><small>UPDATED</small><strong>25 ສິງຫາ 2026</strong></div>
        <div><small>INPUT</small><strong>Feasibility Study 1.0</strong></div>
      </section>

      <section>
        <span>01 · FINANCIAL POSITION</span>
        <h2>ຊື້ຫຼັກຖານ ບໍ່ແມ່ນຊື້ລະບົບ</h2>
        <blockquote className={styles.financialStatement}>ຈຸດປະສົງຂອງທຶນໄລຍະທຳອິດແມ່ນພິສູດ user value, content operation ແລະ willingness-to-pay ພາຍໃນ stop-loss ທີ່ຮັບໄດ້—ບໍ່ແມ່ນສ້າງ full production platform.</blockquote>
      </section>

      <section>
        <span>02 · CAPITAL RULES</span>
        <h2>ກົດ 6 ຂໍ້ກ່ອນໃຊ້ເງິນ</h2>
        <ol className={styles.financialPrinciples}>
          <li><b>01</b><p>ແຍກ personal emergency reserve ອອກຈາກ project capital ຢ່າງຊັດເຈນ.</p></li>
          <li><b>02</b><p>Pilot cash ceiling ແມ່ນຈຳນວນທີ່ສາມາດເສຍທັງໝົດໄດ້ໂດຍບໍ່ກະທົບຄ່າຄອງຊີບ.</p></li>
          <li><b>03</b><p>ບໍ່ແນະນຳໃຫ້ກູ້ຢືມເພື່ອ validation pilot ທີ່ຍັງບໍ່ພິສູດລາຍຮັບ.</p></li>
          <li><b>04</b><p>ປ່ອຍງົບ 30%/35%/35% ເມື່ອຜ່ານ gate; ບໍ່ໃຊ້ງົບລ່ວງໜ້າ.</p></li>
          <li><b>05</b><p>ບັນທຶກ cash cost ແລະ founder shadow cost ແຍກກັນ.</p></li>
          <li><b>06</b><p>ທຸກລາຍຈ່າຍຕ້ອງຜູກກັບ hypothesis, owner ແລະ evidence ທີ່ຈະໄດ້.</p></li>
        </ol>
      </section>

      <section>
        <span>03 · INTERACTIVE MODEL</span>
        <h2>ປັບຕົວເລກ ແລະເບິ່ງຜົນທັນທີ</h2>
        <div className={styles.financialCalculator}>
          <div className={styles.financialInputs}>
            <header><b>MODEL INPUTS</b><p>ຕົວເລກເລີ່ມຕົ້ນແມ່ນຕົວຢ່າງສຳລັບຄິດ ບໍ່ແມ່ນງົບທີ່ອະນຸມັດ.</p></header>
            <MoneyInput label="Pilot cash ceiling" value={cashCeiling} onChange={setCashCeiling} />
            <MoneyInput label="Monthly fixed cash cost" value={monthlyFixed} onChange={setMonthlyFixed} />
            <MoneyInput label="Monthly variable cost" value={monthlyVariable} onChange={setMonthlyVariable} />
            <CountInput label="Paying partners" value={partners} onChange={setPartners} />
            <MoneyInput label="Subscription / partner / month" value={subscription} onChange={setSubscription} />
            <CountInput label="Sponsored campaigns / month" value={campaigns} onChange={setCampaigns} />
            <MoneyInput label="Revenue / campaign" value={campaignPrice} onChange={setCampaignPrice} />
          </div>
          <div className={styles.financialOutputs} aria-live="polite">
            <header><b>MODEL OUTPUTS</b><p>6-week pilot = 1.5 ເດືອນ</p></header>
            <div><small>MONTHLY REVENUE</small><strong>{formatLak(model.monthlyRevenue)}</strong></div>
            <div><small>MONTHLY CASH COST</small><strong>{formatLak(model.monthlyCost)}</strong></div>
            <div><small>NET MONTHLY BURN</small><strong>{formatLak(model.netBurn)}</strong></div>
            <div><small>RUNWAY</small><strong>{Number.isFinite(model.runway) ? `${model.runway.toFixed(1)} ເດືອນ` : "Cash-positive"}</strong></div>
            <div><small>CASH AFTER PILOT</small><strong className={model.cashAfterPilot < 0 ? styles.negativeValue : ""}>{model.cashAfterPilot < 0 ? "−" : ""}{formatLak(Math.abs(model.cashAfterPilot))}</strong></div>
            <div><small>BREAK-EVEN PARTNERS</small><strong>{model.breakEvenPartners}</strong></div>
          </div>
        </div>
        <p className={styles.financialDisclaimer}>Calculator ນີ້ເປັນ planning tool ສຳລັບ project decision. ບໍ່ລວມພາສີ, ຄ່າແລກປ່ຽນ, debt service ຫຼືລາຍລະອຽດບັນຊີ; ຕ້ອງກວດກັບນັກບັນຊີ/ຜູ້ຊ່ຽວຊານໃນລາວກ່ອນນຳໃຊ້ຈິງ.</p>
      </section>

      <section>
        <span>04 · PILOT ALLOCATION</span>
        <h2>ແບ່ງ cash ceiling ຕາມວຽກ</h2>
        <div className={styles.allocationPlan}>
          {allocations.map(([name, percent, detail]) => <article key={name}><div><b>{name}</b><strong>{percent}%</strong></div><i><span style={{ width: `${percent}%` }} /></i><p>{detail}</p><small>{formatLak(cashCeiling * percent / 100)}</small></article>)}
        </div>
        <p className={styles.metricNote}>Allocation ເປັນ policy ceiling ບໍ່ແມ່ນເປົ້າໃຫ້ໃຊ້ໝົດ. ເງິນທີ່ບໍ່ໄດ້ໃຊ້ຕ້ອງກັບເຂົ້າ reserve.</p>
      </section>

      <section>
        <span>05 · STAGED FUNDING</span>
        <h2>ປ່ອຍງົບຕາມຫຼັກຖານ</h2>
        <div className={styles.fundingStages}>
          <article><b>30% · W1–W2</b><strong>{formatLak(cashCeiling * .30)}</strong><h3>Problem + Supply Gate</h3><p>20 user interviews, 15 owner interviews ແລະ place records ຊຸດທຳອິດ 30 ແຫ່ງ.</p><small>RELEASE CONDITION: approved pilot budget</small></article>
          <article><b>35% · W3–W4</b><strong>{formatLak(cashCeiling * .35)}</strong><h3>User-value + Technical Gate</h3><p>ຂະຫຍາຍ 60 → 100 places, prototype test, embed/performance/analytics spike.</p><small>RELEASE CONDITION: supply workflow repeats</small></article>
          <article><b>35% · W5–W6</b><strong>{formatLak(cashCeiling * .35)}</strong><h3>Revenue + Decision Gate</h3><p>Outreach 30 ຮ້ານ, 3 paid/deposit + 2 LOI ແລະ final GO/PIVOT/NO-GO review.</p><small>RELEASE CONDITION: user-value signal</small></article>
        </div>
      </section>

      <section>
        <span>06 · REVENUE LOGIC</span>
        <h2>ແຍກຫຼັກຖານລາຍຮັບອອກຈາກຄວາມສົນໃຈ</h2>
        <div className={styles.revenueEvidence}>
          <div><b>A · CASH</b><strong>Paid pilot</strong><p>ຫຼັກຖານແຂງທີ່ສຸດ; ບັນທຶກ cash collected ແລະ service obligation.</p></div>
          <div><b>B · COMMITMENT</b><strong>Refundable deposit</strong><p>ສະແດງ willingness-to-pay ແຕ່ຕ້ອງແຍກເປັນ liability ຈົນກວ່າຈະສົ່ງມອບ.</p></div>
          <div><b>C · INTENT</b><strong>Signed LOI</strong><p>ໃຊ້ປະກອບການຕັດສິນ ແຕ່ບໍ່ນັບເປັນ cash ຫຼື revenue.</p></div>
          <div><b>D · SIGNAL ONLY</b><strong>Verbal interest</strong><p>ເກັບເປັນ interview note; ບໍ່ນັບໃນ revenue gate.</p></div>
        </div>
      </section>

      <section>
        <span>07 · CASH FLOW VIEW</span>
        <h2>ຕົວເລກທີ່ຕ້ອງລາຍງານທຸກອາທິດ</h2>
        <div className={styles.financialMetrics}>
          <article><b>CASH CONTROL</b><ul><li>Opening cash</li><li>Cash spent this week</li><li>Committed but unpaid</li><li>Cash remaining</li><li>Stop-loss remaining</li></ul></article>
          <article><b>OPERATING COST</b><ul><li>Cash cost / place</li><li>Minutes / verified place</li><li>Cost / user test</li><li>Cost / owner acquired</li><li>Hosting cost / active user</li></ul></article>
          <article><b>REVENUE QUALITY</b><ul><li>Cash collected</li><li>Deposits held</li><li>Signed LOI</li><li>Monthly recurring revenue</li><li>Contribution margin</li></ul></article>
        </div>
      </section>

      <section>
        <span>08 · UNIT ECONOMICS</span>
        <h2>ສູດສຳລັບຕັດສິນໃຈ</h2>
        <div className={styles.formulaBlock}><b>CORE FORMULAS</b><p>MRR = paying partners × monthly price</p><p>Campaign revenue = campaigns × campaign price</p><p>Contribution / partner = subscription price − variable service cost / partner</p><p>Net burn = monthly cash cost − monthly cash revenue</p><p>Runway = available project cash ÷ net monthly burn</p><p>Break-even partners = (fixed cost − campaign contribution) ÷ contribution per partner</p></div>
        <p className={styles.metricNote}>ຖ້າ contribution per partner ຍັງບໍ່ຮູ້ ບໍ່ຄວນໃຊ້ break-even result ເປັນຄຳສັນຍາ; ຕ້ອງວັດຈາກ paid pilot.</p>
      </section>

      <section>
        <span>09 · FINANCIAL GATES</span>
        <h2>GO / HOLD / STOP</h2>
        <div className={styles.gateTable} role="table" aria-label="Financial decision gates">
          <div role="row"><b>GATE</b><b>GO</b><b>HOLD / PIVOT</b><b>STOP</b></div>
          <div role="row"><strong>Capital safety</strong><p>Pilot cash ແຍກຈາກ personal reserve ແລະຢູ່ໃນ ceiling.</p><span>ຕ້ອງຫຼຸດ scope ຫຼືຍືດເວລາ.</span><em>ຕ້ອງໃຊ້ emergency fund ຫຼື debt.</em></div>
          <div role="row"><strong>Milestone spend</strong><p>ລາຍຈ່າຍບໍ່ເກີນ tranche ແລະ gate ຜ່ານ.</p><span>ລາຍຈ່າຍສູງ ແຕ່ມີວິທີຫຼຸດທີ່ທົດສອບໄດ້.</span><em>ເກີນ ceiling ແລະບໍ່ມີ evidence ໃໝ່.</em></div>
          <div role="row"><strong>Revenue proof</strong><p>3 paid/deposit + 2 signed LOI ພາຍໃນ outreach 30 ຮ້ານ.</p><span>ມີ commitment ແຕ່ price/package ຕ້ອງປັບ.</span><em>ມີແຕ່ verbal interest.</em></div>
          <div role="row"><strong>Post-pilot runway</strong><p>ມີ cash runway ຢ່າງໜ້ອຍ 3 ເດືອນສຳລັບຂັ້ນຕໍ່ໄປ.</p><span>ຢຸດພັດທະນາ ແລະຫາທຶນ/ລາຍຮັບກ່ອນ.</span><em>Cash runway ເປັນສູນ ຫຼືຕິດລົບ.</em></div>
        </div>
      </section>

      <section>
        <span>10 · FINANCIAL CONTROL</span>
        <h2>ບັນທຶກທີ່ຕ້ອງມີ</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ແຍກ project account/ledger ອອກຈາກບັນຊີສ່ວນຕົວ.</span></li>
          <li><b>02</b><span>ທຸກລາຍຈ່າຍມີ date, vendor, category, owner, receipt ແລະ hypothesis.</span></li>
          <li><b>03</b><span>ທຸກລາຍຮັບແຍກ cash, deposit, deferred obligation ແລະ LOI.</span></li>
          <li><b>04</b><span>ປິດ cash report ທຸກອາທິດ ແລະທົບທວນ gate ທ້າຍອາທິດ 2, 4, 6.</span></li>
          <li><b>05</b><span>ການປ່ຽນ ceiling ຫຼື tranche ຕ້ອງມີ written decision ແລະເຫດຜົນ.</span></li>
          <li><b>06</b><span>ກວດ tax, invoice, deposit ແລະ accounting treatment ກັບນັກບັນຊີໃນລາວ.</span></li>
        </ul>
      </section>

      <section>
        <span>11 · FINANCIAL RISKS</span>
        <h2>ຄວາມສ່ຽງທີ່ຕ້ອງຄຸມ</h2>
        <ol className={styles.riskList}>{financialRisks.map(([level, risk, control]) => <li key={level}><b>{level}</b><p>{risk}</p><span>{control}</span></li>)}</ol>
      </section>

      <section>
        <span>12 · OPEN DECISIONS</span>
        <h2>5 ຂໍ້ທີ່ຢາກໃຫ້ທ່ານທົບທວນ</h2>
        <ol className={styles.openQuestions}>
          <li><b>01</b><p>Pilot cash ceiling ທີ່ສາມາດເສຍໄດ້ທັງໝົດ ໂດຍບໍ່ແຕະ personal emergency reserve ແມ່ນເທົ່າໃດ?</p></li>
          <li><b>02</b><p>ເຫັນດີໃຫ້ໃຊ້ founder equity/cash ເທົ່ານັ້ນໃນ pilot ແລະບໍ່ໃຊ້ debt ຫຼືບໍ່?</p></li>
          <li><b>03</b><p>Founder ຈະບໍ່ຮັບເງິນເດືອນໃນ 6 ອາທິດ ຫຼືຕ້ອງມີ minimum allowance?</p></li>
          <li><b>04</b><p>Monthly fixed/variable cash cost ຈິງທີ່ຈະໃຊ້ໃນ model ແມ່ນເທົ່າໃດ ຫຼັງຈາກຂໍ quotation?</p></li>
          <li><b>05</b><p>ເຫັນດີກັບ post-pilot runway ຢ່າງໜ້ອຍ 3 ເດືອນ ກ່ອນອະນຸມັດ full MVP ຫຼືບໍ່?</p></li>
        </ol>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>REVIEW GATE</span><h2>Financial Structure 0.1</h2></div>
        <ul><li>Pilot cash ceiling</li><li>Capital source / no-debt rule</li><li>Founder compensation</li><li>Cost assumptions</li><li>Post-pilot runway</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/feasibility-study`}><small>← APPROVED INPUT</small><strong>ການສຶກສາຄວາມເປັນໄປໄດ້</strong></a>
        <a href={`${basePath}/documents/revenue-kpi`}><small>NEXT PRIORITY →</small><strong>ລາຍຮັບ ແລະຕົວຊີ້ວັດ</strong></a>
      </nav>
    </article>
  );
}
