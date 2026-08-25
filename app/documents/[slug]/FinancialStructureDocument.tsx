"use client";

import { useMemo, useState } from "react";
import styles from "../documents.module.css";

const LAK = new Intl.NumberFormat("lo-LA", { maximumFractionDigits: 0 });
const formatLak = (value: number) => `${LAK.format(Math.max(0, Math.round(value)))} ₭`;

const allocations = [
  ["ຄົ້ນຄວ້າ ແລະເນື້ອຫາ", 30, "ສຳພາດຜູ້ໃຊ້, ສ້າງຂໍ້ມູນສະຖານທີ່, ຄັດເລືອກ ແລະກວດສອບ"],
  ["ຕົວຢ່າງລະບົບ ແລະເຕັກນິກ", 25, "ສ້າງຕົວຢ່າງ, ທົດສອບເຕັກນິກ, ເກັບສະຖິຕິ ແລະກວດຄຸນນະພາບ"],
  ["ການຂາຍ ແລະຮັບຮ້ານເຂົ້າລະບົບ", 15, "ເຂົ້າຫາເຈົ້າຂອງຮ້ານ, ທົດສອບການຂາຍ ແລະຊ່ວຍຮ້ານເລີ່ມໃຊ້"],
  ["ເຄື່ອງມື, ເຊີເວີ ແລະທີ່ປຶກສາ", 15, "ຄ່າເຊີເວີ, ໂປຣແກຣມ, ການກວດນະໂຍບາຍ ແລະບັນຊີ"],
  ["ເງິນສຳຮອງ", 15, "ໃຊ້ສະເພາະບັນຫາທີ່ບັນທຶກເຫດຜົນ ແລະໄດ້ຮັບອະນຸມັດ"],
] as const;

const financialRisks = [
  ["F1 · ສູງ", "ເລີ່ມຈ້າງທີມ ຫຼືສ້າງລະບົບສົມບູນກ່ອນພິສູດລາຍຮັບ.", "ອະນຸຍາດສະເພາະລາຍຈ່າຍຂອງໄລຍະທົດລອງ ແລະປ່ອຍງົບຕາມຈຸດກວດສອບ."],
  ["F2 · ສູງ", "ນັບຄຳເວົ້າວ່າສົນໃຈເປັນລາຍຮັບທີ່ຄາດໄດ້.", "ແຍກເງິນທີ່ຮັບແລ້ວ, ເງິນມັດຈຳ ແລະໜັງສືສະແດງເຈດຈຳນົງອອກຈາກກັນ."],
  ["F3 · ສູງ", "ປົນເງິນໂຄງການກັບເງິນຄ່າຄອງຊີບສ່ວນຕົວ.", "ແຍກບັນຊີ ຫຼືສົມຸດລາຍຮັບລາຍຈ່າຍ ແລະຫ້າມໃຊ້ເງິນສຳຮອງສຸກເສີນ."],
  ["F4 · ກາງ", "ບໍ່ນັບມູນຄ່າເວລາຂອງຜູ້ກໍ່ຕັ້ງ ເຮັດໃຫ້ຕົ້ນທຶນຕໍ່ລູກຄ້າເບິ່ງຕ່ຳເກີນຈິງ.", "ແຍກລາຍຈ່າຍເງິນສົດ ແລະມູນຄ່າເວລາທີ່ບໍ່ໄດ້ຈ່າຍເປັນເງິນສົດ."],
  ["F5 · ກາງ", "ຄ່າເຊີເວີ, ຊ່ວຍເຫຼືອລູກຄ້າ ແລະເນື້ອຫາເຕີບໄວກວ່າລາຍຮັບ.", "ວັດຕົ້ນທຶນຕໍ່ຜູ້ໃຊ້, ຕໍ່ສະຖານທີ່ ແລະກຳໄລຫຼັງຫັກລາຍຈ່າຍຜັນແປທຸກອາທິດ."],
];

function MoneyInput({ label, value, onChange, step = 100000 }: { label: string; value: number; onChange: (value: number) => void; step?: number }) {
  return <label><span>{label}</span><input type="number" min="0" step={step} value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /><small>ກີບ</small></label>;
}

function CountInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label><span>{label}</span><input type="number" min="0" step="1" value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /><small>ຈຳນວນ</small></label>;
}

export default function FinancialStructureDocument({ basePath }: { basePath: string }) {
  const [cashCeiling, setCashCeiling] = useState(25_000_000);
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
        <div><small>ສະບັບ</small><strong>0.3</strong></div>
        <div><small>ສະຖານະ</small><strong>ຮ່າງ — ລໍຖ້າ 2 ຕົວເລກ</strong></div>
        <div><small>ວັນທີປັບປຸງ</small><strong>25 ສິງຫາ 2026</strong></div>
        <div><small>ເອກະສານຕົ້ນທາງ</small><strong>ການສຶກສາຄວາມເປັນໄປໄດ້ 1.0</strong></div>
      </section>

      <section>
        <span>01 · ຈຸດຢືນດ້ານການເງິນ</span>
        <h2>ຊື້ຫຼັກຖານ ບໍ່ແມ່ນຊື້ລະບົບ</h2>
        <blockquote className={styles.financialStatement}>ຈຸດປະສົງຂອງທຶນໄລຍະທຳອິດແມ່ນພິສູດວ່າຜູ້ໃຊ້ໄດ້ປະໂຫຍດ, ການຈັດຫາເນື້ອຫາເຮັດຊ້ຳໄດ້ ແລະຮ້ານຍອມຈ່າຍ ໂດຍບໍ່ໃຊ້ເງິນເກີນວົງເງິນທີ່ຍອມເສຍໄດ້—ບໍ່ແມ່ນການສ້າງລະບົບສົມບູນ.</blockquote>
      </section>

      <section>
        <span>02 · ກົດການໃຊ້ທຶນ</span>
        <h2>ກົດ 6 ຂໍ້ກ່ອນໃຊ້ເງິນ</h2>
        <ol className={styles.financialPrinciples}>
          <li><b>01</b><p>ແຍກເງິນສຳຮອງສຸກເສີນສ່ວນຕົວຢ່າງໜ້ອຍ 6 ເດືອນອອກຈາກທຶນຂອງໂຄງການຢ່າງຊັດເຈນ.</p></li>
          <li><b>02</b><p>ເພດານງົບທົດລອງແມ່ນຈຳນວນສູງສຸດທີ່ສາມາດເສຍທັງໝົດໄດ້ໂດຍບໍ່ກະທົບຄ່າຄອງຊີບ.</p></li>
          <li><b>03</b><p>ໄລຍະທົດລອງໃຊ້ສະເພາະທຶນທີ່ຜູ້ກໍ່ຕັ້ງແຍກໄວ້, ລາຍຮັບຈາກການທົດລອງທີ່ລູກຄ້າຊຳລະຈິງ ຫຼືເງິນຊ່ວຍເຫຼືອທີ່ບໍ່ຕ້ອງຊຳລະຄືນ ແລະບໍ່ມີເງື່ອນໄຂທີ່ເສຍປຽບ. ຫ້າມໃຊ້ເງິນກູ້, ບັດເຄຣດິດ ຫຼືໜີ້ທີ່ມີດອກເບ້ຍ.</p></li>
          <li><b>04</b><p>ແບ່ງຂີດຈຳກັດການອະນຸຍາດໃຊ້ເງິນເປັນ 30%/35%/35%; ອະນຸຍາດງວດຕໍ່ໄປສະເພາະເມື່ອວຽກງວດກ່ອນຜ່ານຈຸດກວດສອບ.</p></li>
          <li><b>05</b><p>ຖ້າຜູ້ກໍ່ຕັ້ງມີລາຍຮັບອື່ນ ສາມາດບໍ່ຮັບເງິນສົດໃນ 6 ອາທິດໄດ້ ແຕ່ຕ້ອງບັນທຶກມູນຄ່າເວລາ. ຖ້າເຮັດໂຄງການເຕັມເວລາ ຕ້ອງລວມຄ່າຄອງຊີບຂັ້ນຕ່ຳໄວ້ໃນງົບ.</p></li>
          <li><b>06</b><p>ທຸກລາຍຈ່າຍຕ້ອງລະບຸສິ່ງທີ່ຕ້ອງການພິສູດ, ຜູ້ຮັບຜິດຊອບ ແລະຫຼັກຖານທີ່ຈະໄດ້. ລາຍຈ່າຍລາຍການໃດເກີນ 10% ຂອງງົບລວມ ຕ້ອງປຽບທຽບລາຄາຢ່າງໜ້ອຍ 2 ແຫຼ່ງ.</p></li>
        </ol>
        <div className={styles.financialLogic}>
          <article><b>ເພດານງົບທົດລອງ</b><strong>ຈຳນວນສູງສຸດ</strong><p>ແມ່ນຈຳນວນເງິນສູງສຸດທີ່ໂຄງການສາມາດໃຊ້ໃນ 6 ອາທິດ ໂດຍບໍ່ແຕະເງິນສຳຮອງສ່ວນຕົວ ແລະບໍ່ກະທົບຄ່າຄອງຊີບ. ນີ້ແມ່ນຂີດຈຳກັດ ບໍ່ແມ່ນເປົ້າໃຫ້ໃຊ້ເງິນໝົດ.</p></article>
          <article><b>ຄ່າຄອງຊີບຜູ້ກໍ່ຕັ້ງ</b><strong>ລາຍຈ່າຍຈຳເປັນ</strong><p>ແມ່ນເງິນຂັ້ນຕ່ຳສຳລັບລາຍຈ່າຍຈຳເປັນໃນຊ່ວງທົດລອງ 6 ອາທິດ. ຖ້າຜູ້ກໍ່ຕັ້ງມີລາຍຮັບອື່ນ ສາມາດກຳນົດເປັນ 0 ກີບ ແຕ່ຍັງຕ້ອງບັນທຶກເວລາເຮັດວຽກ.</p></article>
          <article><b>ຄວາມສຳພັນຂອງສອງຈຳນວນ</b><strong>ບໍ່ບວກເພີ່ມ</strong><p>ຖ້າໂຄງການຈ່າຍຄ່າຄອງຊີບໃຫ້ຜູ້ກໍ່ຕັ້ງ ຈຳນວນນັ້ນຕ້ອງນັບຢູ່ພາຍໃນເພດານງົບທົດລອງ ບໍ່ແມ່ນເງິນເພີ່ມນອກງົບ.</p></article>
        </div>
        <p className={`${styles.fundingExplanation} ${styles.confirmedBudget}`}><strong>ການແບ່ງເງິນທີ່ຢືນຢັນແລ້ວ</strong>ເງິນທັງໝົດ 100 ລ້ານກີບ ແບ່ງເປັນເງິນສຳຮອງຄ່າຄອງຊີບສ່ວນຕົວ 60 ລ້ານກີບ, ເງິນສຳລັບພັນທະສ່ວນຕົວອື່ນ 15 ລ້ານກີບ ແລະເພດານງົບໂຄງການ 25 ລ້ານກີບ. ເງິນສ່ວນຕົວ 75 ລ້ານກີບຫ້າມນຳມາໃຊ້ໃນໂຄງການ.</p>
      </section>

      <section>
        <span>03 · ແບບຈຳລອງທີ່ປັບຕົວເລກໄດ້</span>
        <h2>ປັບຕົວເລກ ແລະເບິ່ງຜົນທັນທີ</h2>
        <div className={styles.financialCalculator}>
          <div className={styles.financialInputs}>
            <header><b>ຕົວເລກທີ່ນຳເຂົ້າ</b><p>ຕົວເລກເລີ່ມຕົ້ນແມ່ນຕົວຢ່າງສຳລັບຄິດ ບໍ່ແມ່ນງົບທີ່ອະນຸມັດ.</p></header>
            <MoneyInput label="ເພດານງົບທົດລອງ" value={cashCeiling} onChange={setCashCeiling} />
            <MoneyInput label="ລາຍຈ່າຍຄົງທີ່ຕໍ່ເດືອນ" value={monthlyFixed} onChange={setMonthlyFixed} />
            <MoneyInput label="ລາຍຈ່າຍຜັນແປຕໍ່ເດືອນ" value={monthlyVariable} onChange={setMonthlyVariable} />
            <CountInput label="ຮ້ານທີ່ຈ່າຍຄ່າບໍລິການ" value={partners} onChange={setPartners} />
            <MoneyInput label="ຄ່າສະມາຊິກຕໍ່ຮ້ານຕໍ່ເດືອນ" value={subscription} onChange={setSubscription} />
            <CountInput label="ຈຳນວນການໂຄສະນາຕໍ່ເດືອນ" value={campaigns} onChange={setCampaigns} />
            <MoneyInput label="ລາຍຮັບຕໍ່ການໂຄສະນາໜຶ່ງຄັ້ງ" value={campaignPrice} onChange={setCampaignPrice} />
          </div>
          <div className={styles.financialOutputs} aria-live="polite">
            <header><b>ຜົນການຄຳນວນ</b><p>ໄລຍະທົດລອງ 6 ອາທິດ ເທົ່າກັບ 1.5 ເດືອນ</p></header>
            <div><small>ລາຍຮັບຕໍ່ເດືອນ</small><strong>{formatLak(model.monthlyRevenue)}</strong></div>
            <div><small>ລາຍຈ່າຍເງິນສົດຕໍ່ເດືອນ</small><strong>{formatLak(model.monthlyCost)}</strong></div>
            <div><small>ເງິນທີ່ຂາດຕໍ່ເດືອນ</small><strong>{formatLak(model.netBurn)}</strong></div>
            <div><small>ໄລຍະທີ່ເງິນຮອງຮັບໄດ້</small><strong>{Number.isFinite(model.runway) ? `${model.runway.toFixed(1)} ເດືອນ` : "ລາຍຮັບບໍ່ຕ່ຳກວ່າລາຍຈ່າຍ"}</strong></div>
            <div><small>ເງິນຄົງເຫຼືອຫຼັງທົດລອງ</small><strong className={model.cashAfterPilot < 0 ? styles.negativeValue : ""}>{model.cashAfterPilot < 0 ? "−" : ""}{formatLak(Math.abs(model.cashAfterPilot))}</strong></div>
            <div><small>ຈຳນວນຮ້ານສຳລັບຈຸດຄຸ້ມທຶນ</small><strong>{model.breakEvenPartners}</strong></div>
          </div>
        </div>
        <p className={styles.financialDisclaimer}>ເຄື່ອງຄຳນວນນີ້ໃຊ້ສຳລັບວາງແຜນ ແລະຕັດສິນໃຈພາຍໃນໂຄງການ. ຍັງບໍ່ລວມພາສີ, ຄ່າແລກປ່ຽນ, ຄ່າດອກເບ້ຍ ຫຼືລາຍລະອຽດບັນຊີ; ຕ້ອງກວດກັບນັກບັນຊີ ຫຼືຜູ້ຊ່ຽວຊານໃນລາວກ່ອນນຳໃຊ້ຈິງ.</p>
      </section>

      <section>
        <span>04 · ການແບ່ງງົບທົດລອງ</span>
        <h2>ແບ່ງເພດານງົບຕາມໝວດວຽກ</h2>
        <div className={styles.allocationPlan}>
          {allocations.map(([name, percent, detail]) => <article key={name}><div><b>{name}</b><strong>{percent}%</strong></div><i><span style={{ width: `${percent}%` }} /></i><p>{detail}</p><small>{formatLak(cashCeiling * percent / 100)}</small></article>)}
        </div>
        <p className={styles.metricNote}>ຈຳນວນຂອງແຕ່ລະໝວດແມ່ນເພດານສູງສຸດ ບໍ່ແມ່ນເປົ້າໃຫ້ໃຊ້ໝົດ. ເງິນທີ່ບໍ່ໄດ້ໃຊ້ຕ້ອງກັບເຂົ້າເງິນສຳຮອງ.</p>
      </section>

      <section>
        <span>05 · ການອະນຸຍາດໃຊ້ງົບເປັນງວດ</span>
        <h2>30%/35%/35% ໝາຍເຖິງຫຍັງ</h2>
        <p className={styles.fundingExplanation}><strong>ບໍ່ແມ່ນງວດຈ່າຍໃຫ້ຜູ້ຮັບເໝົາ ແລະບໍ່ແມ່ນເປົ້າວ່າຕ້ອງໃຊ້ໃຫ້ໝົດ.</strong> ມັນແມ່ນຂີດຈຳກັດການອະນຸຍາດໃຊ້ເງິນໃນແຕ່ລະໄລຍະ. ງວດຕໍ່ໄປຈະຖືກເປີດໃຫ້ໃຊ້ສະເພາະເມື່ອວຽກຂອງງວດກ່ອນຜ່ານຈຸດກວດສອບ. ຖ້າບໍ່ຜ່ານ ໃຫ້ຢຸດໃຊ້ເງິນ, ທົບທວນ ຫຼືປ່ຽນແນວທາງ.</p>
        <div className={styles.fundingStages}>
          <article><b>ງວດທີ 1 · 30% · ອາທິດ 1–2</b><strong>{formatLak(cashCeiling * .30)}</strong><h3>ກວດບັນຫາ ແລະແຫຼ່ງຂໍ້ມູນ</h3><p>ສຳພາດຜູ້ໃຊ້ 20 ຄົນ, ເຈົ້າຂອງຮ້ານ 15 ຮ້ານ ແລະສ້າງຂໍ້ມູນສະຖານທີ່ຊຸດທຳອິດ 30 ແຫ່ງ.</p><small>ເປີດໃຊ້ຫຼັງຈາກອະນຸມັດເພດານງົບທົດລອງ</small></article>
          <article><b>ງວດທີ 2 · 35% · ອາທິດ 3–4</b><strong>{formatLak(cashCeiling * .35)}</strong><h3>ກວດຄຸນຄ່າຕໍ່ຜູ້ໃຊ້ ແລະເຕັກນິກ</h3><p>ຂະຫຍາຍຂໍ້ມູນເປັນ 60 → 100 ແຫ່ງ, ທົດສອບຕົວຢ່າງ, ຄວາມໄວ ແລະການເກັບສະຖິຕິ.</p><small>ເປີດໃຊ້ເມື່ອການສ້າງຂໍ້ມູນເຮັດຊ້ຳໄດ້ ແລະງວດທີ 1 ບໍ່ເກີນງົບ</small></article>
          <article><b>ງວດທີ 3 · 35% · ອາທິດ 5–6</b><strong>{formatLak(cashCeiling * .35)}</strong><h3>ກວດລາຍຮັບ ແລະຕັດສິນໃຈ</h3><p>ເຂົ້າຫາ 30 ຮ້ານ, ຫາ 3 ຮ້ານທີ່ຈ່າຍ/ວາງມັດຈຳ + 2 ໜັງສືສະແດງເຈດຈຳນົງ ແລະຕັດສິນໄປຕໍ່, ປັບ ຫຼືຢຸດ.</p><small>ເປີດໃຊ້ເມື່ອຜູ້ໃຊ້ສະແດງພຶດຕິກຳຕັດສິນໃຈຜ່ານຕົວຢ່າງ</small></article>
        </div>
      </section>

      <section>
        <span>06 · ຫຼັກຖານຂອງລາຍຮັບ</span>
        <h2>ຢ່ານັບຄຳເວົ້າຂອງຮ້ານວ່າ “ສົນໃຈ” ຫຼື “ຖ້າເຮັດແລ້ວຈະໃຊ້” ເປັນລາຍຮັບຂອງໂຄງການ</h2>
        <div className={styles.revenueEvidence}>
          <div><b>A · ຮັບເງິນແລ້ວ</b><strong>ຊຳລະຄ່າທົດລອງ</strong><p>ເປັນຫຼັກຖານແຂງທີ່ສຸດ; ຕ້ອງບັນທຶກເງິນທີ່ຮັບ ແລະບໍລິການທີ່ຕ້ອງສົ່ງມອບ.</p></div>
          <div><b>B · ມີຂໍ້ຜູກມັດ</b><strong>ເງິນມັດຈຳທີ່ຄືນໄດ້</strong><p>ສະແດງວ່າລູກຄ້າມີຄວາມພ້ອມຈ່າຍ ແຕ່ຍັງຕ້ອງແຍກໄວ້ເປັນເງິນທີ່ອາດຕ້ອງຄືນ.</p></div>
          <div><b>C · ສະແດງເຈດຈຳນົງ</b><strong>ໜັງສືສະແດງເຈດຈຳນົງ</strong><p>ໃຊ້ປະກອບການຕັດສິນ ແຕ່ບໍ່ນັບເປັນເງິນສົດ ຫຼືລາຍຮັບ.</p></div>
          <div><b>D · ພຽງສັນຍານ</b><strong>ຄຳເວົ້າວ່າສົນໃຈ</strong><p>ເກັບໄວ້ເປັນບັນທຶກການສຳພາດ ແຕ່ບໍ່ນັບໃນເກນພິສູດລາຍຮັບ.</p></div>
        </div>
      </section>

      <section>
        <span>07 · ການຕິດຕາມເງິນສົດ</span>
        <h2>ຕົວເລກທີ່ຕ້ອງລາຍງານທຸກອາທິດ</h2>
        <div className={styles.financialMetrics}>
          <article><b>ຄວບຄຸມເງິນສົດ</b><ul><li>ເງິນຕົ້ນອາທິດ</li><li>ເງິນທີ່ໃຊ້ໃນອາທິດ</li><li>ລາຍຈ່າຍທີ່ຕົກລົງແລ້ວແຕ່ຍັງບໍ່ຈ່າຍ</li><li>ເງິນຄົງເຫຼືອ</li><li>ວົງເງິນທີ່ຍັງອະນຸຍາດໃຫ້ເສຍໄດ້</li></ul></article>
          <article><b>ຕົ້ນທຶນການດຳເນີນງານ</b><ul><li>ຕົ້ນທຶນເງິນສົດຕໍ່ສະຖານທີ່</li><li>ເວລາກວດສອບຕໍ່ສະຖານທີ່</li><li>ຕົ້ນທຶນຕໍ່ຜູ້ທົດສອບ</li><li>ຕົ້ນທຶນຕໍ່ຮ້ານທີ່ໄດ້ມາ</li><li>ຄ່າເຊີເວີຕໍ່ຜູ້ໃຊ້</li></ul></article>
          <article><b>ຄຸນນະພາບຂອງລາຍຮັບ</b><ul><li>ເງິນທີ່ຮັບແລ້ວ</li><li>ເງິນມັດຈຳທີ່ຖືໄວ້</li><li>ໜັງສືສະແດງເຈດຈຳນົງ</li><li>ລາຍຮັບປະຈຳຕໍ່ເດືອນ</li><li>ກຳໄລຫຼັງຫັກລາຍຈ່າຍຜັນແປ</li></ul></article>
        </div>
      </section>

      <section>
        <span>08 · ຕົ້ນທຶນ ແລະລາຍຮັບຕໍ່ໜ່ວຍ</span>
        <h2>ສູດສຳລັບຕັດສິນໃຈ</h2>
        <div className={styles.formulaBlock}><b>ສູດຫຼັກ</b><p>ລາຍຮັບປະຈຳຕໍ່ເດືອນ = ຈຳນວນຮ້ານທີ່ຈ່າຍ × ຄ່າສະມາຊິກຕໍ່ເດືອນ</p><p>ລາຍຮັບຈາກໂຄສະນາ = ຈຳນວນການໂຄສະນາ × ລາຄາຕໍ່ຄັ້ງ</p><p>ເງິນທີ່ເຫຼືອຈາກແຕ່ລະຮ້ານ = ຄ່າສະມາຊິກ − ລາຍຈ່າຍຜັນແປໃນການບໍລິການຮ້ານນັ້ນ</p><p>ເງິນທີ່ຂາດຕໍ່ເດືອນ = ລາຍຈ່າຍເງິນສົດຕໍ່ເດືອນ − ລາຍຮັບເງິນສົດຕໍ່ເດືອນ</p><p>ໄລຍະທີ່ເງິນຮອງຮັບໄດ້ = ເງິນໂຄງການທີ່ມີ ÷ ເງິນທີ່ຂາດຕໍ່ເດືອນ</p><p>ຈຳນວນຮ້ານສຳລັບຄຸ້ມທຶນ = (ລາຍຈ່າຍຄົງທີ່ − ລາຍຮັບສຸດທິຈາກໂຄສະນາ) ÷ ເງິນທີ່ເຫຼືອຈາກແຕ່ລະຮ້ານ</p></div>
        <p className={styles.metricNote}>ຖ້າຍັງບໍ່ຮູ້ລາຍຈ່າຍຜັນແປຕໍ່ຮ້ານ ບໍ່ຄວນໃຊ້ຜົນຄຳນວນຈຸດຄຸ້ມທຶນເປັນຄຳສັນຍາ; ຕ້ອງວັດຈາກຮ້ານທີ່ຊຳລະຄ່າທົດລອງຈິງ.</p>
      </section>

      <section>
        <span>09 · ຈຸດກວດສອບດ້ານການເງິນ</span>
        <h2>ໄປຕໍ່ / ພັກໄວ້ / ຢຸດ</h2>
        <div className={styles.gateTable} role="table" aria-label="ຈຸດກວດສອບດ້ານການເງິນ">
          <div role="row"><b>ຈຸດກວດ</b><b>ໄປຕໍ່</b><b>ພັກໄວ້ ຫຼືປັບ</b><b>ຢຸດ</b></div>
          <div role="row"><strong>ຄວາມປອດໄພຂອງທຶນ</strong><p>ເງິນທົດລອງແຍກຈາກເງິນສຳຮອງສ່ວນຕົວ ແລະບໍ່ເກີນເພດານ.</p><span>ຕ້ອງຫຼຸດຂອບເຂດວຽກ ຫຼືຍືດເວລາ.</span><em>ຕ້ອງໃຊ້ເງິນສຳຮອງສຸກເສີນ ຫຼືເງິນກູ້.</em></div>
          <div role="row"><strong>ລາຍຈ່າຍແຕ່ລະງວດ</strong><p>ລາຍຈ່າຍບໍ່ເກີນຈຳນວນທີ່ອະນຸຍາດ ແລະວຽກຜ່ານຈຸດກວດ.</p><span>ລາຍຈ່າຍສູງ ແຕ່ມີວິທີຫຼຸດທີ່ທົດສອບໄດ້.</span><em>ເກີນເພດານ ແລະບໍ່ໄດ້ຫຼັກຖານໃໝ່.</em></div>
          <div role="row"><strong>ຫຼັກຖານລາຍຮັບ</strong><p>3 ຮ້ານຊຳລະ/ວາງມັດຈຳ + 2 ໜັງສືສະແດງເຈດຈຳນົງ ຈາກ 30 ຮ້ານທີ່ເຂົ້າຫາ.</p><span>ມີຂໍ້ຜູກມັດ ແຕ່ຕ້ອງປັບລາຄາ ຫຼືຊຸດບໍລິການ.</span><em>ມີພຽງຄຳເວົ້າວ່າສົນໃຈ.</em></div>
          <div role="row"><strong>ສືບຕໍ່ການທົດສອບ</strong><p>ມີເງິນຮອງຮັບຢ່າງໜ້ອຍ 3 ເດືອນສຳລັບການທົດສອບ ຫຼືປັບແນວທາງ.</p><span>ມີເງິນຕ່ຳກວ່າ 3 ເດືອນ: ຢຸດພັດທະນາ ແລະຫາລາຍຮັບ ຫຼືທຶນກ່ອນ.</span><em>ເງິນຄົງເຫຼືອເປັນສູນ ຫຼືຕິດລົບ.</em></div>
          <div role="row"><strong>ອະນຸມັດສ້າງລະບົບໃຊ້ງານຈິງ</strong><p>ມີເງິນຮອງຮັບຢ່າງໜ້ອຍ 6 ເດືອນ ກ່ອນສ້າງລະບົບສົມບູນ ຫຼືຈ້າງທີມຖາວອນ.</p><span>ມີເງິນ 3–6 ເດືອນ: ສືບຕໍ່ພິສູດສົມມຸດຖານ ແຕ່ຍັງບໍ່ສ້າງລະບົບເຕັມຮູບແບບ.</span><em>ມີເງິນຕ່ຳກວ່າ 3 ເດືອນ.</em></div>
        </div>
      </section>

      <section>
        <span>10 · ການຄວບຄຸມບັນຊີ</span>
        <h2>ບັນທຶກທີ່ຕ້ອງມີ</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ແຍກບັນຊີ ຫຼືສົມຸດລາຍຮັບລາຍຈ່າຍຂອງໂຄງການອອກຈາກບັນຊີສ່ວນຕົວ.</span></li>
          <li><b>02</b><span>ທຸກລາຍຈ່າຍມີວັນທີ, ຜູ້ຮັບເງິນ, ໝວດ, ຜູ້ອະນຸມັດ, ໃບຮັບເງິນ ແລະສິ່ງທີ່ຕ້ອງການພິສູດ.</span></li>
          <li><b>03</b><span>ທຸກລາຍຮັບຕ້ອງແຍກເປັນເງິນທີ່ຮັບແລ້ວ, ເງິນມັດຈຳ, ພັນທະບໍລິການທີ່ຍັງຄ້າງ ແລະໜັງສືສະແດງເຈດຈຳນົງ.</span></li>
          <li><b>04</b><span>ສະຫຼຸບເງິນສົດທຸກອາທິດ ແລະທົບທວນຈຸດກວດສອບທ້າຍອາທິດ 2, 4 ແລະ 6.</span></li>
          <li><b>05</b><span>ການປ່ຽນເພດານງົບ ຫຼືຈຳນວນແຕ່ລະງວດ ຕ້ອງມີບັນທຶກການຕັດສິນໃຈ ແລະເຫດຜົນ.</span></li>
          <li><b>06</b><span>ກວດພາສີ, ໃບແຈ້ງໜີ້, ເງິນມັດຈຳ ແລະວິທີລົງບັນຊີກັບນັກບັນຊີໃນລາວ.</span></li>
        </ul>
      </section>

      <section>
        <span>11 · ຄວາມສ່ຽງດ້ານການເງິນ</span>
        <h2>ຄວາມສ່ຽງທີ່ຕ້ອງຄຸມ</h2>
        <ol className={styles.riskList}>{financialRisks.map(([level, risk, control]) => <li key={level}><b>{level}</b><p>{risk}</p><span>{control}</span></li>)}</ol>
      </section>

      <section>
        <span>12 · ກົດການເງິນທີ່ອະນຸມັດແລ້ວ</span>
        <h2>ສິ່ງທີ່ຕົກລົງແລ້ວ</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ແຍກເງິນສຳຮອງຄ່າຄອງຊີບສ່ວນຕົວຢ່າງໜ້ອຍ 6 ເດືອນອອກຈາກເງິນໂຄງການ.</span></li>
          <li><b>02</b><span>ບໍ່ໃຊ້ໜີ້; ຮັບສະເພາະທຶນຜູ້ກໍ່ຕັ້ງ, ລາຍຮັບທົດລອງທີ່ຊຳລະຈິງ ຫຼືເງິນຊ່ວຍເຫຼືອທີ່ບໍ່ຕ້ອງຊຳລະຄືນ.</span></li>
          <li><b>03</b><span>ແບ່ງຂີດຈຳກັດການອະນຸຍາດໃຊ້ເງິນເປັນ 30%/35%/35% ແລະເປີດງວດຕໍ່ໄປເມື່ອວຽກງວດກ່ອນຜ່ານຈຸດກວດສອບ.</span></li>
          <li><b>04</b><span>ຜູ້ກໍ່ຕັ້ງທີ່ມີລາຍຮັບອື່ນສາມາດບໍ່ຮັບເງິນສົດໃນ 6 ອາທິດ; ຖ້າເຮັດເຕັມເວລາຕ້ອງມີຄ່າຄອງຊີບຂັ້ນຕ່ຳ.</span></li>
          <li><b>05</b><span>ລາຍຈ່າຍລາຍການໃດເກີນ 10% ຂອງງົບລວມ ຕ້ອງປຽບທຽບລາຄາຢ່າງໜ້ອຍ 2 ແຫຼ່ງ.</span></li>
          <li><b>06</b><span>ຕ້ອງມີເງິນຮອງຮັບ 3 ເດືອນເພື່ອສືບຕໍ່ທົດສອບ ແລະ 6 ເດືອນກ່ອນສ້າງລະບົບສົມບູນ ຫຼືຈ້າງທີມຖາວອນ.</span></li>
          <li><b>07</b><span>ຢືນຢັນເພດານງົບໂຄງການ 25 ລ້ານກີບ ແລະກັນເງິນສ່ວນຕົວ 75 ລ້ານກີບອອກຈາກໂຄງການ.</span></li>
        </ul>
      </section>

      <section>
        <span>13 · ຕົວເລກທີ່ຍັງລໍຖ້າ</span>
        <h2>2 ຕົວເລກກ່ອນຂຶ້ນສະບັບ 1.0</h2>
        <ol className={styles.openQuestions}>
          <li><b>01</b><p>ຈຳນວນຄ່າຄອງຊີບຂັ້ນຕ່ຳທີ່ໂຄງການຈະຈ່າຍໃຫ້ຜູ້ກໍ່ຕັ້ງ ຫຼືຢືນຢັນວ່າບໍ່ຮັບເງິນສົດໃນ 6 ອາທິດ.</p></li>
          <li><b>02</b><p>ລາຍຈ່າຍຕົວຈິງສຳລັບການທົດລອງ 6 ອາທິດ ໂດຍອ້າງອີງຈາກລາຄາທີ່ສອບຖາມຈາກຜູ້ໃຫ້ບໍລິການດ້ານເຕັກນິກ, ຂໍ້ມູນ, ການເດີນທາງ, ເຄື່ອງມື ແລະການບັນຊີ.</p></li>
        </ol>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>ຍັງບໍ່ພ້ອມສຳລັບ 1.0</span><h2>ໂຄງສ້າງການເງິນ 0.3</h2></div>
        <ul><li>ກົດການເງິນ — ອະນຸມັດແລ້ວ</li><li>ເພດານງົບ 25 ລ້ານກີບ — ອະນຸມັດແລ້ວ</li><li>ຄ່າຄອງຊີບທີ່ໂຄງການຈະຈ່າຍ — ລໍຖ້າ</li><li>ລາຍຈ່າຍທົດລອງຕົວຈິງ — ລໍຖ້າ</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/feasibility-study`}><small>← ເອກະສານຕົ້ນທາງທີ່ອະນຸມັດແລ້ວ</small><strong>ການສຶກສາຄວາມເປັນໄປໄດ້</strong></a>
        <a href={`${basePath}/documents/revenue-kpi`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>ລາຍຮັບ ແລະຕົວຊີ້ວັດ</strong></a>
      </nav>
    </article>
  );
}
