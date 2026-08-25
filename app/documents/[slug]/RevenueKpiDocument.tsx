"use client";

import { useMemo, useState } from "react";
import styles from "../documents.module.css";

const LAK = new Intl.NumberFormat("lo-LA", { maximumFractionDigits: 0 });
const formatLak = (value: number) => `${LAK.format(Math.max(0, Math.round(value)))} ₭`;
const formatPercent = (value: number) => `${value.toFixed(1)}%`;

function CountInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label><span>{label}</span><input type="number" min="0" step="1" value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /><small>ຈຳນວນ</small></label>;
}

function MoneyInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label><span>{label}</span><input type="number" min="0" step="100000" value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /><small>ກີບ</small></label>;
}

const metricDefinitions = [
  ["ຜູ້ຊົມບໍ່ຊ້ຳ", "ຈຳນວນຄົນບໍ່ຊ້ຳທີ່ເຫັນວິດີໂອໃນໄລຍະທີ່ລາຍງານ.", "ວັດຂອບເຂດການເຂົ້າເຖິງ; ບໍ່ແມ່ນຄຸນຄ່າຫຼັກ."],
  ["ການເປີດໜ້າສະຖານທີ່", "ຜູ້ໃຊ້ເປີດເບິ່ງລາຄາ, ເວລາ, ແຜນທີ່ ຫຼືຂໍ້ມູນຮ້ານ.", "ສະແດງວ່າວິດີໂອພາໄປສູ່ການຄົ້ນຂໍ້ມູນ."],
  ["ການກົດເພື່ອໄປ", "ຜູ້ໃຊ້ກົດແຜນທີ່, ໂທ ຫຼືສົ່ງຂໍ້ຄວາມຫາຮ້ານ.", "ເປັນຫຼັກຖານໃກ້ກັບການຕັດສິນໃຈທີ່ສຸດໃນ MVP."],
  ["ຮ້ານທີ່ຊຳລະ ຫຼືວາງມັດຈຳ", "ຮ້ານຈ່າຍເງິນທົດລອງ ຫຼືວາງມັດຈຳທີ່ມີຫຼັກຖານ.", "ນັບເປັນຫຼັກຖານຄວາມພ້ອມຈ່າຍ; ບໍ່ນັບພຽງຄຳວ່າສົນໃຈ."],
  ["ລາຍຮັບທີ່ຮັບແລ້ວ", "ເງິນທີ່ເຂົ້າບັນຊີແລ້ວ ແລະມີໃບຮັບເງິນ ຫຼືຫຼັກຖານໂອນ.", "ແຍກອອກຈາກເງິນມັດຈຳທີ່ອາດຕ້ອງຄືນ."],
];

const risks = [
  ["R1 · ສູງ", "ເນັ້ນຍອດເບິ່ງຈົນລືມວ່າ platform ຕ້ອງຊ່ວຍໃຫ້ຄົນຕັດສິນໃຈ.", "ໃຊ້ການກົດແຜນທີ່, ໂທ ແລະສົ່ງຂໍ້ຄວາມເປັນຕົວຊີ້ວັດຫຼັກ."],
  ["R2 · ສູງ", "ຮ້ານຈ່າຍເພື່ອໃຫ້ອັນດັບດີ ຫຼືປິດບັງຣີວິວທີ່ບໍ່ດີ.", "ຂາຍການສະແດງຜົນທີ່ມີປ້າຍຊັດເຈນ; ບໍ່ຂາຍຄະແນນ ຫຼືຄວາມໜ້າເຊື່ອຖື."],
  ["R3 · ກາງ", "ນັບການກົດຊ້ຳຈາກຄົນດຽວເຮັດໃຫ້ຜົນເບິ່ງດີເກີນຈິງ.", "ລາຍງານທັງຈຳນວນຄັ້ງ ແລະຈຳນວນຜູ້ໃຊ້ບໍ່ຊ້ຳ."],
  ["R4 · ກາງ", "ມີລາຍຮັບຈາກການໂຄສະນາແຕ່ຕົ້ນທຶນການບໍລິການສູງກວ່າ.", "ບັນທຶກຕົ້ນທຶນຜັນແປຕໍ່ຮ້ານ ແລະຕໍ່ການໂຄສະນາຄຽງຄູ່ລາຍຮັບ."],
];

export default function RevenueKpiDocument({ basePath }: { basePath: string }) {
  const [videoViewers, setVideoViewers] = useState(1000);
  const [placeVisitors, setPlaceVisitors] = useState(200);
  const [decisionUsers, setDecisionUsers] = useState(40);
  const [businessesContacted, setBusinessesContacted] = useState(30);
  const [paidOrDeposit, setPaidOrDeposit] = useState(3);
  const [signedIntent, setSignedIntent] = useState(2);
  const [partnerPrice, setPartnerPrice] = useState(200_000);
  const [campaigns, setCampaigns] = useState(0);
  const [campaignPrice, setCampaignPrice] = useState(1_000_000);

  const result = useMemo(() => {
    const videoToPlace = videoViewers > 0 ? placeVisitors / videoViewers * 100 : 0;
    const decisionRate = placeVisitors > 0 ? decisionUsers / placeVisitors * 100 : 0;
    const paymentRate = businessesContacted > 0 ? paidOrDeposit / businessesContacted * 100 : 0;
    const commitmentRate = businessesContacted > 0 ? (paidOrDeposit + signedIntent) / businessesContacted * 100 : 0;
    const collectedRevenue = paidOrDeposit * partnerPrice + campaigns * campaignPrice;
    const revenueGatePassed = paidOrDeposit >= 3 && signedIntent >= 2 && businessesContacted >= 30;
    return { videoToPlace, decisionRate, paymentRate, commitmentRate, collectedRevenue, revenueGatePassed };
  }, [videoViewers, placeVisitors, decisionUsers, businessesContacted, paidOrDeposit, signedIntent, partnerPrice, campaigns, campaignPrice]);

  return (
    <article className={`${styles.detailBody} ${styles.revenueBody}`}>
      <section className={styles.documentControl}>
        <div><small>ສະບັບ</small><strong>0.1</strong></div>
        <div><small>ສະຖານະ</small><strong>ຮ່າງສຳລັບທົບທວນ</strong></div>
        <div><small>ວັນທີປັບປຸງ</small><strong>25 ສິງຫາ 2026</strong></div>
        <div><small>ເອກະສານຕົ້ນທາງ</small><strong>Canvas 1.0 + Feasibility 1.0 + FS 1.0</strong></div>
      </section>

      <section>
        <span>01 · ຈຸດຢືນ</span>
        <h2>ລາຍຮັບຕ້ອງຕາມຫຼັງຄຸນຄ່າ</h2>
        <blockquote className={styles.revenueStatement}>“ພ້ອມໄປ” ບໍ່ຂາຍຍອດເບິ່ງ ແລະບໍ່ຂາຍຄະແນນຣີວິວ. Platform ສ້າງລາຍຮັບເມື່ອສາມາດພາຜູ້ໃຊ້ຈາກວິດີໂອໄປຫາຂໍ້ມູນຮ້ານ ແລະການກົດແຜນທີ່, ໂທ ຫຼືສົ່ງຂໍ້ຄວາມທີ່ວັດແທກໄດ້.</blockquote>
      </section>

      <section>
        <span>02 · ແຫຼ່ງລາຍຮັບ</span>
        <h2>ລາຍຮັບ 3 ໄລຍະ: ທົດລອງ → ລາຍເດືອນ → ຄ່າທຳນຽມ</h2>
        <div className={styles.canvasRevenueLadder}>
          <article>
            <b>ໄລຍະທົດລອງ 6 ອາທິດ</b>
            <h3>ສ້າງຖານຮ້ານ ແລະທົດສອບວ່າຮ້ານຍອມຈ່າຍຫຼືບໍ່</h3>
            <ul>
              <li><strong>Free Business Profile:</strong> ທຸກຮ້ານມີໜ້າຂໍ້ມູນພື້ນຖານໄດ້ຟຣີ. ສ່ວນນີ້ບໍ່ສ້າງລາຍຮັບ ແຕ່ຊ່ວຍສ້າງຖານຂໍ້ມູນ.</li>
              <li><strong>Founding Partner Pilot:</strong> ຮ້ານຈ່າຍຄ່າທົດລອງ 200,000 ກີບຕໍ່ເດືອນ ເພື່ອຮັບການກວດຂໍ້ມູນ, ສະເໜີແກ້ໄຂ ແລະຮັບ Performance Summary.</li>
              <li><strong>Sponsored Campaign:</strong> ຮ້ານຈ່າຍ 1,000,000 ກີບຕໍ່ Campaign ເພື່ອສະແດງໃນພື້ນທີ່ໂຄສະນາທີ່ມີປ້າຍ “Sponsored” ຊັດເຈນ.</li>
            </ul>
            <p>Platform ນັບລາຍຮັບເມື່ອຮັບເງິນແລ້ວ; ຄຳເວົ້າວ່າ “ສົນໃຈ” ບໍ່ນັບ.</p>
          </article>
          <article>
            <b>ຫຼັງຈາກ PILOT ພິສູດຄຸນຄ່າ</b>
            <h3>ຄ່າສະມາຊິກທີ່ຮ້ານຈ່າຍທຸກເດືອນ</h3>
            <ul>
              <li><strong>Pro Business Subscription:</strong> ຮ້ານຈ່າຍຄ່າສະມາຊິກລາຍເດືອນ.</li>
              <li>ຮ້ານໄດ້ Verified Profile, ສິດສະເໜີແກ້ໄຂຂໍ້ມູນ ແລະການຊ່ວຍເຫຼືອ.</li>
              <li><strong>Performance Analytics:</strong> ລາຍງານຈຳນວນຄົນເປີດໜ້າຮ້ານ, ກົດແຜນທີ່, ໂທ ຫຼືສົ່ງຂໍ້ຄວາມ. ນີ້ແມ່ນ Feature ໃນຊຸດ Pro ບໍ່ແມ່ນຄ່າບໍລິການອີກລາຍການໜຶ່ງ.</li>
            </ul>
            <p>Platform ຈະມີລາຍຮັບປະຈຳກໍ່ຕໍ່ເມື່ອຮ້ານຕໍ່ອາຍຸສະມາຊິກ. ຈຶ່ງຕ້ອງວັດ Monthly Recurring Revenue ແລະອັດຕາຮ້ານທີ່ຕໍ່ອາຍຸ.</p>
          </article>
          <article>
            <b>ໄລຍະອະນາຄົດ</b>
            <h3>ເກັບຄ່າທຳນຽມເມື່ອມີການຊື້ຂາຍ ຫຼືວ່າຈ້າງສຳເລັດ</h3>
            <ul>
              <li><strong>Creator Marketplace Commission:</strong> ຮ້ານຈ້າງ Creator ຜ່ານ Platform; Platform ເກັບ Commission ເມື່ອຕົກລົງວ່າຈ້າງສຳເລັດ.</li>
              <li><strong>Affiliate Commission:</strong> Partner ຈ່າຍ Commission ເມື່ອຜູ້ໃຊ້ກົດອອກຈາກ Platform ແລະເຮັດທຸລະກຳສຳເລັດກັບ Partner.</li>
              <li><strong>Booking Commission:</strong> ໃນອະນາຄົດ Platform ອາດເກັບຄ່າທຳນຽມຕໍ່ການຈອງທີ່ສຳເລັດ.</li>
            </ul>
            <p>ບໍ່ມີການຊື້ຂາຍ ຫຼືວ່າຈ້າງສຳເລັດ = Platform ບໍ່ໄດ້ Commission. ລາຍຮັບກຸ່ມນີ້ບໍ່ແມ່ນຂອບເຂດຂອງ MVP.</p>
          </article>
        </div>
        <p className={styles.priceHypothesis}><b>ລາຄາສຳລັບທົດສອບ—ບໍ່ແມ່ນລາຄາຂາຍສຸດທ້າຍ</b><span>ຮ້ານຮ່ວມທົດລອງ 200,000 ກີບຕໍ່ເດືອນ · ການໂຄສະນາ 1,000,000 ກີບຕໍ່ຄັ້ງ. ຕ້ອງປັບຈາກຜົນການສະເໜີຂາຍຈິງ.</span></p>
      </section>

      <section>
        <span>03 · ຫຼັກຖານລາຍຮັບ</span>
        <h2>ຢ່ານັບຄຳເວົ້າວ່າ “ສົນໃຈ” ເປັນລາຍຮັບ</h2>
        <div className={styles.revenueEvidence}>
          <div><b>01 · ແຂງທີ່ສຸດ</b><strong>ຮັບເງິນແລ້ວ</strong><p>ມີຫຼັກຖານໂອນ ຫຼືໃບຮັບເງິນ ແລະລະບຸບໍລິການທີ່ຕ້ອງສົ່ງມອບ.</p></div>
          <div><b>02 · ມີຂໍ້ຜູກມັດ</b><strong>ວາງມັດຈຳ</strong><p>ນັບເປັນຫຼັກຖານຄວາມພ້ອມຈ່າຍ ແຕ່ຕ້ອງແຍກຈາກລາຍຮັບຖ້າຍັງອາດຕ້ອງຄືນ.</p></div>
          <div><b>03 · ຕ້ອງຕິດຕາມ</b><strong>ໜັງສືສະແດງເຈດຈຳນົງ</strong><p>ໃຊ້ເປັນຫຼັກຖານປະກອບການຕັດສິນ ແຕ່ບໍ່ແມ່ນເງິນສົດ.</p></div>
          <div><b>04 · ບໍ່ນັບ</b><strong>ສົນໃຈດ້ວຍຄຳເວົ້າ</strong><p>ເກັບໄວ້ເປັນຄຳເຫັນຂອງລູກຄ້າ; ບໍ່ນັບເປັນລາຍຮັບ ຫຼືຜ່ານຈຸດກວດ.</p></div>
        </div>
      </section>

      <section>
        <span>04 · ເສັ້ນທາງການຕັດສິນໃຈ</span>
        <h2>ວັດຈາກການເຫັນ ໄປຫາການກະທຳ</h2>
        <div className={styles.funnelPath}>
          <div><b>01</b><strong>ເຫັນວິດີໂອ</strong><p>ຮັບຮູ້ສະຖານທີ່</p></div><i>→</i>
          <div><b>02</b><strong>ເປີດໜ້າຮ້ານ</strong><p>ກວດລາຄາ, ເວລາ ແລະຂໍ້ມູນ</p></div><i>→</i>
          <div><b>03</b><strong>ກົດເພື່ອໄປ</strong><p>ແຜນທີ່, ໂທ ຫຼືຂໍ້ຄວາມ</p></div><i>→</i>
          <div><b>04</b><strong>ຮ້ານເຫັນຄຸນຄ່າ</strong><p>ອັບເດດຂໍ້ມູນ ແລະຍອມຈ່າຍ</p></div>
        </div>
      </section>

      <section>
        <span>05 · ຕົວຊີ້ວັດຫຼັກ</span>
        <h2>ຄົນບໍ່ຊ້ຳທີ່ກົດເພື່ອໄປ ຕໍ່ອາທິດ</h2>
        <div className={styles.northStar}>
          <div><small>ຕົວຊີ້ວັດຫຼັກຂອງ PRODUCT</small><strong>ແຜນທີ່ + ໂທ + ຂໍ້ຄວາມ</strong></div>
          <p>ນັບຈຳນວນຜູ້ໃຊ້ບໍ່ຊ້ຳທີ່ກົດຢ່າງໜ້ອຍໜຶ່ງການກະທຳພາຍໃນ 7 ມື້. ຕົວເລກນີ້ສະທ້ອນພາລະກິດ “ຊ່ວຍຄົນຕັດສິນໃຈໄປ” ໄດ້ດີກວ່າຍອດເບິ່ງ ຫຼືເວລາທີ່ຢູ່ໃນແອັບ.</p>
        </div>
        <div className={styles.formulaBlock}><b>ສູດປະກອບ</b><p>ອັດຕາເປີດໜ້າຮ້ານ = ຜູ້ເປີດໜ້າຮ້ານ ÷ ຜູ້ເຫັນວິດີໂອ</p><p>ອັດຕາການກົດເພື່ອໄປ = ຜູ້ກົດແຜນທີ່/ໂທ/ຂໍ້ຄວາມ ÷ ຜູ້ເປີດໜ້າຮ້ານ</p><p>ອັດຕາຮ້ານທີ່ຈ່າຍ = ຮ້ານທີ່ຊຳລະ ຫຼືວາງມັດຈຳ ÷ ຮ້ານທີ່ເຂົ້າຫາ</p></div>
      </section>

      <section>
        <span>06 · ແບບຈຳລອງ</span>
        <h2>ປັບຕົວເລກ ແລະເບິ່ງຜົນທັນທີ</h2>
        <div className={styles.financialCalculator}>
          <div className={styles.financialInputs}>
            <header><b>ຂໍ້ມູນທົດລອງ</b><p>ຕົວເລກເລີ່ມຕົ້ນເປັນພຽງຕົວຢ່າງ; ໃຫ້ປ່ຽນເປັນຜົນຈາກການທົດລອງຈິງ.</p></header>
            <CountInput label="ຜູ້ເຫັນວິດີໂອບໍ່ຊ້ຳ" value={videoViewers} onChange={setVideoViewers} />
            <CountInput label="ຜູ້ເປີດໜ້າຮ້ານບໍ່ຊ້ຳ" value={placeVisitors} onChange={setPlaceVisitors} />
            <CountInput label="ຜູ້ກົດແຜນທີ່/ໂທ/ຂໍ້ຄວາມ" value={decisionUsers} onChange={setDecisionUsers} />
            <CountInput label="ຮ້ານທີ່ເຂົ້າຫາ" value={businessesContacted} onChange={setBusinessesContacted} />
            <CountInput label="ຮ້ານທີ່ຊຳລະ ຫຼືວາງມັດຈຳ" value={paidOrDeposit} onChange={setPaidOrDeposit} />
            <CountInput label="ໜັງສືສະແດງເຈດຈຳນົງ" value={signedIntent} onChange={setSignedIntent} />
            <MoneyInput label="ລາຄາຕໍ່ຮ້ານທົດລອງ" value={partnerPrice} onChange={setPartnerPrice} />
            <CountInput label="ຈຳນວນການໂຄສະນາ" value={campaigns} onChange={setCampaigns} />
            <MoneyInput label="ລາຄາຕໍ່ການໂຄສະນາ" value={campaignPrice} onChange={setCampaignPrice} />
          </div>
          <div className={styles.financialOutputs} aria-live="polite">
            <header><b>ຜົນການຄຳນວນ</b><p>ໃຊ້ເພື່ອທົບທວນຜົນ pilot; ບໍ່ແມ່ນການຄາດຄະເນລາຍຮັບ.</p></header>
            <div><small>ອັດຕາວິດີໂອ → ໜ້າຮ້ານ</small><strong>{formatPercent(result.videoToPlace)}</strong></div>
            <div><small>ອັດຕາໜ້າຮ້ານ → ກົດເພື່ອໄປ</small><strong>{formatPercent(result.decisionRate)}</strong></div>
            <div><small>ອັດຕາຮ້ານທີ່ຊຳລະ/ວາງມັດຈຳ</small><strong>{formatPercent(result.paymentRate)}</strong></div>
            <div><small>ອັດຕາຂໍ້ຜູກມັດລວມ</small><strong>{formatPercent(result.commitmentRate)}</strong></div>
            <div><small>ເງິນຕາມແບບຈຳລອງ</small><strong>{formatLak(result.collectedRevenue)}</strong></div>
            <div><small>ຈຸດກວດລາຍຮັບ 3 + 2 ຈາກ 30 ຮ້ານ</small><strong className={result.revenueGatePassed ? styles.positiveValue : styles.negativeValue}>{result.revenueGatePassed ? "ຜ່ານ" : "ຍັງບໍ່ຜ່ານ"}</strong></div>
          </div>
        </div>
        <p className={styles.financialDisclaimer}>ເງິນມັດຈຳທີ່ອາດຕ້ອງຄືນ ແລະໜັງສືສະແດງເຈດຈຳນົງ ບໍ່ຄວນລວມເປັນລາຍຮັບທີ່ນຳໄປໃຊ້ໄດ້. ລາຍຮັບທາງບັນຊີຕ້ອງກວດກັບນັກບັນຊີໃນລາວ.</p>
      </section>

      <section>
        <span>07 · ຄຳນິຍາມທີ່ຕ້ອງໃຊ້ຄືກັນ</span>
        <h2>ທຸກຄົນຕ້ອງນັບດ້ວຍວິທີດຽວກັນ</h2>
        <div className={styles.metricDictionary} role="table" aria-label="ຄຳນິຍາມຕົວຊີ້ວັດ">
          <div role="row"><b>ຕົວຊີ້ວັດ</b><b>ຄຳນິຍາມ</b><b>ໃຊ້ຕັດສິນຫຍັງ</b></div>
          {metricDefinitions.map(([metric, definition, use]) => <div role="row" key={metric}><strong>{metric}</strong><p>{definition}</p><span>{use}</span></div>)}
        </div>
      </section>

      <section>
        <span>08 · ເປົ້າໝາຍຂອງ PILOT 6 ອາທິດ</span>
        <h2>ວັດພຽງສິ່ງທີ່ໃຊ້ຕັດສິນໃຈ</h2>
        <div className={styles.gateTable} role="table" aria-label="ເປົ້າໝາຍຂອງ pilot">
          <div role="row"><b>ດ້ານ</b><b>ເປົ້າໝາຍເບື້ອງຕົ້ນ</b><b>ຫຼັກຖານ</b><b>ຖ້າບໍ່ເຖິງ</b></div>
          <div role="row"><strong>ຂໍ້ມູນ</strong><p>100 ສະຖານທີ່ທີ່ຂໍ້ມູນຫຼັກຄົບ.</p><span>ບັນທຶກສະຖານທີ່, ແຫຼ່ງຂໍ້ມູນ ແລະວັນກວດ.</span><em>ຫຼຸດເຂດ ຫຼືໝວດ ແລະກວດຕົ້ນທຶນຕໍ່ບັນທຶກ.</em></div>
          <div role="row"><strong>ຜູ້ໃຊ້</strong><p>20 ຄົນທົດສອບສາມາດຫາຮ້ານ ແລະກົດເພື່ອໄປໄດ້.</p><span>ຜົນວຽກທົດສອບ, ບັນຫາທີ່ພົບ ແລະການກັບມາໃຊ້.</span><em>ປັບລຳດັບໜ້າ, ໝວດ ຫຼືຂໍ້ມູນທີ່ຂາດ.</em></div>
          <div role="row"><strong>ຮ້ານ</strong><p>ເຂົ້າຫາ 30 ຮ້ານ; 3 ຊຳລະ/ວາງມັດຈຳ + 2 ໜັງສືສະແດງເຈດຈຳນົງ.</p><span>ຫຼັກຖານເງິນ ຫຼືເອກະສານທີ່ລົງນາມ.</span><em>ປັບຊຸດບໍລິການ, ລາຄາ ຫຼືກຸ່ມຮ້ານ; ບໍ່ຂະຫຍາຍທີມ.</em></div>
          <div role="row"><strong>ການເງິນ</strong><p>ລາຍຈ່າຍຢູ່ໃນເພດານ 25 ລ້ານກີບ.</p><span>ທະບຽນລາຍຈ່າຍ, ໃບຮັບເງິນ ແລະເງິນຄົງເຫຼືອ.</span><em>ຢຸດງົບ ແລະຫຼຸດຂອບເຂດກ່ອນສືບຕໍ່.</em></div>
        </div>
        <p className={styles.metricNote}>ຍັງບໍ່ກຳນົດເປົ້າອັດຕາການກົດແບບຖາວອນ ເພາະຍັງບໍ່ມີຄ່າຕັ້ງຕົ້ນຈາກຜູ້ໃຊ້ຈິງ. Pilot ຈະໃຊ້ເພື່ອສ້າງຄ່າຕັ້ງຕົ້ນ ແລ້ວຈຶ່ງກຳນົດເປົ້າໝາຍສະບັບ 1.0.</p>
      </section>

      <section>
        <span>09 · ຮອບການລາຍງານ</span>
        <h2>ໃຜກວດຫຍັງ ແລະກວດເມື່ອໃດ</h2>
        <div className={styles.sourcePlan}>
          <article><b>ທຸກມື້</b><p>ກວດວ່າຂໍ້ມູນການເປີດໜ້າ ແລະການກົດຖືກບັນທຶກຄົບ.</p></article>
          <article><b>ທຸກອາທິດ</b><p>ຜູ້ກໍ່ຕັ້ງກວດການກົດເພື່ອໄປ, ຮ້ານທີ່ເຂົ້າຫາ, ຫຼັກຖານລາຍຮັບ ແລະລາຍຈ່າຍ.</p></article>
          <article><b>ທ້າຍອາທິດ 2, 4, 6</b><p>ຕັດສິນວ່າຈະເປີດງົບງວດຕໍ່ໄປ, ປັບການທົດລອງ ຫຼືຢຸດ.</p></article>
        </div>
      </section>

      <section>
        <span>10 · ຂໍ້ຈຳກັດ</span>
        <h2>ຕົວເລກທີ່ບໍ່ຄວນໃຊ້ຫຼອກຕົນເອງ</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ຍອດເບິ່ງສູງບໍ່ໄດ້ໝາຍວ່າຜູ້ໃຊ້ຕັດສິນໃຈໄດ້.</span></li>
          <li><b>02</b><span>ການກົດແຜນທີ່ ຫຼືໂທບໍ່ໄດ້ຢືນຢັນວ່າໄດ້ໄປຮ້ານ; ໃຊ້ຄຳວ່າ “ເຈດຕະນາ” ບໍ່ແມ່ນ “ລູກຄ້າ”.</span></li>
          <li><b>03</b><span>ບໍ່ໃຫ້ຮ້ານຊື້ຄະແນນ, ລຶບຄຳເຫັນ ຫຼືເຂົ້າອັນດັບທຳມະຊາດ.</span></li>
          <li><b>04</b><span>ການສະແດງຜົນທີ່ຮ້ານຈ່າຍເງິນຕ້ອງມີປ້າຍແຈ້ງຊັດ ແລະແຍກຈາກຜົນທຳມະຊາດ.</span></li>
          <li><b>05</b><span>ບໍ່ເພີ່ມ creator marketplace, affiliate ຫຼື booking ໃນ pilot ເພື່ອໃຫ້ຕົວເລກລາຍຮັບເບິ່ງໃຫຍ່ຂຶ້ນ.</span></li>
        </ul>
      </section>

      <section>
        <span>11 · ຄວາມສ່ຽງ</span>
        <h2>ສິ່ງທີ່ຕ້ອງລະວັງ</h2>
        <ol className={styles.riskList}>{risks.map(([level, risk, control]) => <li key={level}><b>{level}</b><p>{risk}</p><span>{control}</span></li>)}</ol>
      </section>

      <section>
        <span>12 · ຈຸດທີ່ຕ້ອງທົບທວນ</span>
        <h2>5 ຂໍ້ກ່ອນອະນຸມັດສະບັບ 1.0</h2>
        <ol className={styles.openQuestions}>
          <li><b>01</b><p>ເຫັນດີບໍວ່າ ຕົວຊີ້ວັດຫຼັກແມ່ນ “ຜູ້ໃຊ້ບໍ່ຊ້ຳທີ່ກົດແຜນທີ່, ໂທ ຫຼືຂໍ້ຄວາມຕໍ່ອາທິດ”?</p></li>
          <li><b>02</b><p>ຊຸດຮ້ານຮ່ວມທົດລອງຄວນໃຫ້ສິດຫຍັງແດ່ ໂດຍບໍ່ກະທົບຄວາມໜ້າເຊື່ອຖື?</p></li>
          <li><b>03</b><p>ຍັງເຫັນດີໃຊ້ 200,000 ກີບຕໍ່ເດືອນ ແລະ 1,000,000 ກີບຕໍ່ການໂຄສະນາເປັນລາຄາທົດສອບຫຼືບໍ່?</p></li>
          <li><b>04</b><p>ເກນ 3 ຮ້ານຊຳລະ/ວາງມັດຈຳ + 2 ໜັງສືສະແດງເຈດຈຳນົງ ຈາກ 30 ຮ້ານ ພຽງພໍສຳລັບໄປຕໍ່ຫຼືບໍ່?</p></li>
          <li><b>05</b><p>ຄວນຕ້ອງມີການຢືນຢັນວ່າຜູ້ໃຊ້ໄປຮ້ານຈິງໃນ pilot ຫຼືການກົດເພື່ອໄປພຽງພໍແລ້ວ?</p></li>
        </ol>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>ລໍຖ້າການທົບທວນ</span><h2>ລາຍຮັບ ແລະຕົວຊີ້ວັດ 0.1</h2></div>
        <ul><li>ຕົວຊີ້ວັດຫຼັກ — ລໍຖ້າຢືນຢັນ</li><li>ຊຸດບໍລິການໄລຍະທົດລອງ — ລໍຖ້າຢືນຢັນ</li><li>ລາຄາທົດສອບ — ລໍຖ້າຢືນຢັນ</li><li>ເກນ 3 + 2 ຈາກ 30 ຮ້ານ — ລໍຖ້າຢືນຢັນ</li><li>ວິທີຢືນຢັນການໄປຮ້ານ — ລໍຖ້າຄຳຕັດສິນ</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/financial-structure`}><small>← ເອກະສານຕົ້ນທາງທີ່ອະນຸມັດແລ້ວ</small><strong>ໂຄງສ້າງການເງິນ</strong></a>
        <a href={`${basePath}/documents/prd`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>ຂໍ້ກຳນົດຜະລິດຕະພັນ</strong></a>
      </nav>
    </article>
  );
}
