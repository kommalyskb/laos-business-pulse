"use client";

import { useState } from "react";
import styles from "../documents.module.css";
import ProductRequirementsDeepDive from "./ProductRequirementsDeepDive";

const journeyAreas = [
  {
    id: "discover",
    label: "01 · DISCOVER",
    title: "ຄົ້ນພົບສະຖານທີ່",
    goal: "ຜູ້ໃຊ້ເຫັນຮູບພາບຈິງຈາກວິດີໂອ ແລະພົບຮ້ານທີ່ສົນໃຈໂດຍບໍ່ຕ້ອງສະໝັກ Account.",
    requirements: ["Full-screen vertical feed ສຳລັບ Mobile", "Search ດ້ວຍຊື່ຮ້ານ ຫຼືຄຳຄົ້ນ", "Filter ຕາມໝວດ, ເຂດ ແລະຊ່ວງລາຄາ", "ສະແດງ Creator, Source ແລະ Sponsored label"],
    evidence: "ຜູ້ທົດສອບສາມາດພົບຮ້ານທີ່ກົງກັບໂຈດໄດ້ ແລະກົດເຂົ້າ Place Page.",
  },
  {
    id: "decide",
    label: "02 · DECIDE",
    title: "ມີຂໍ້ມູນພໍສຳລັບເລືອກ",
    goal: "ຜູ້ໃຊ້ເຫັນຂໍ້ມູນຮ້ານທີ່ຈຳເປັນໃນໜ້າດຽວ ແລະຮູ້ວ່າຂໍ້ມູນຖືກກວດຄັ້ງຫຼ້າສຸດເມື່ອໃດ.",
    requirements: ["Canonical Place Page ໜຶ່ງໜ້າຕໍ່ໜຶ່ງສະຖານທີ່", "ຊື່, ໝວດ, ທີ່ຢູ່, ແຜນທີ່, ເວລາ, ເບີໂທ ແລະຊ່ວງລາຄາ", "Review link ຫຼາຍກວ່າໜຶ່ງ Source ເມື່ອມີ", "Source linked, Place verified ແລະ Sponsored ຕ້ອງແຍກກັນ"],
    evidence: "ຜູ້ທົດສອບຕອບໄດ້ວ່າຮ້ານຢູ່ໃສ, ເປີດເວລາໃດ ແລະເໝາະກັບງົບຂອງຕົນຫຼືບໍ່.",
  },
  {
    id: "act",
    label: "03 · ACT",
    title: "ອອກຈາກ Platform ເພື່ອໄປ ຫຼືຕິດຕໍ່",
    goal: "ຜູ້ໃຊ້ກົດແຜນທີ່, ໂທ ຫຼືສົ່ງຂໍ້ຄວາມຫາຮ້ານໄດ້ໂດຍກົງ.",
    requirements: ["ປຸ່ມ Map, Call ແລະ Message ຢູ່ໃນ Place Page", "Deep link ໄປຫາ App ທີ່ອຸປະກອນຮອງຮັບ", "ບັນທຶກ Decision Intent event ແບບບໍ່ຊ້ຳ", "Save ໃນອຸປະກອນ ແລະ Share ເປັນ Link"],
    evidence: "ຜູ້ທົດສອບກົດ Action ໄດ້ ແລະ Analytics ບັນທຶກ Event ຖືກຕ້ອງ.",
  },
  {
    id: "operate",
    label: "04 · OPERATE",
    title: "ຮັກສາຂໍ້ມູນ ແລະຄວາມໜ້າເຊື່ອຖື",
    goal: "Admin ສາມາດເພີ່ມ, ກວດ, ແກ້ ແລະປິດຂໍ້ມູນທີ່ບໍ່ຖືກຕ້ອງ; ຮ້ານສາມາດສະເໜີແກ້ໄຂໄດ້.",
    requirements: ["Admin ຈັດການ Place, Source link, Tag ແລະສະຖານະ", "ບັນທຶກ Source ແລະວັນທີກວດຂອງ Field ສຳຄັນ", "Correction request ແລະ Takedown request", "Sponsored content ມີ Label ແລະໄລຍະເວລາ"],
    evidence: "Admin ສາມາດສ້າງ Place ໃໝ່, ຈັບຄູ່ Source, ອັບເດດຂໍ້ມູນ ແລະຈັດການຄຳຮ້ອງໄດ້ຄົບ.",
  },
] as const;

const requirements = [
  ["USR-01", "Must", "Discovery Feed", "ສະແດງວິດີໂອ/Preview ແນວຕັ້ງເຕັມຈໍ ພ້ອມຊື່ຮ້ານ, Source ແລະປຸ່ມໄປ Place Page."],
  ["USR-02", "Must", "Search & Filter", "ຄົ້ນດ້ວຍຊື່ ຫຼືຄຳສຳຄັນ ແລະກອງຕາມຂໍ້ມູນທີ່ອະນຸມັດສຳລັບ Launch."],
  ["USR-03", "Must", "Place Page", "ລວມຂໍ້ມູນຕັດສິນໃຈ, Review source, ວັນກວດ ແລະສະຖານະຂໍ້ມູນໄວ້ໃນໜ້າດຽວ."],
  ["USR-04", "Must", "Decision Actions", "ກົດ Map, Call ຫຼື Message ໄດ້ ແລະບັນທຶກ Decision Intent event."],
  ["USR-05", "Should", "Save & Share", "Save ໃນອຸປະກອນໂດຍບໍ່ມີ Account ແລະ Share Place link ໄດ້."],
  ["BUS-01", "Must", "Correction Request", "ຮ້ານສົ່ງຄຳຮ້ອງແກ້ຂໍ້ມູນ; Admin ກວດແລະອະນຸມັດກ່ອນເຜີຍແຜ່."],
  ["ADM-01", "Must", "Place & Content Admin", "Admin ເພີ່ມ, ແກ້, ກວດ, ຈັບຄູ່ Source ແລະປິດບັນທຶກໄດ້."],
  ["TRU-01", "Must", "Trust Labels", "Source linked, Place verified ແລະ Sponsored ຕ້ອງໃຊ້ Label ຄົນລະປະເພດ."],
  ["ANA-01", "Must", "Product Analytics", "ບັນທຶກ Feed view, Place open, Search, Filter, Map, Call, Message, Save ແລະ Share."],
] as const;

export const productRequirementIds = [
  ...requirements.map(([id]) => id),
  "NFR-01", "NFR-02", "NFR-03", "NFR-04",
];

const userStories = [
  ["ຜູ້ຊອກຮ້ານ", "ເມື່ອບໍ່ຮູ້ຈະໄປກິນຫຍັງ ຂ້ອຍຢາກເລື່ອນເບິ່ງວິດີໂອຕາມໝວດ ເພື່ອພົບຮ້ານທີ່ສົນໃຈ."],
  ["ຜູ້ກຳລັງຕັດສິນໃຈ", "ເມື່ອສົນໃຈຮ້ານ ຂ້ອຍຢາກເຫັນລາຄາ, ເວລາ, ທີ່ຢູ່ ແລະ Review source ໃນໜ້າດຽວ."],
  ["ເຈົ້າຂອງຮ້ານ", "ເມື່ອຂໍ້ມູນຮ້ານຜິດ ຂ້ອຍຢາກສົ່ງຄຳຮ້ອງແກ້ໄຂ ແລະຮູ້ວ່າ Admin ດຳເນີນເຖິງຂັ້ນໃດ."],
  ["Admin", "ເມື່ອມີ Place ຫຼື Source ໃໝ່ ຂ້ອຍຢາກກວດແລະເຜີຍແຜ່ຜ່ານ Workflow ດຽວທີ່ມີຫຼັກຖານ."],
] as const;

const risks = [
  ["P1 · ສູງ", "Official Embed ບາງ Source ໃຊ້ບໍ່ໄດ້ ຫຼືໂຫຼດຊ້າ.", "ກຳນົດ Fallback ເປັນ Preview + Link ໄປຕົ້ນສະບັບ ແລະບໍ່ Re-host ວິດີໂອ."],
  ["P2 · ສູງ", "Place Page ມີຂໍ້ມູນບໍ່ຄົບ ຫຼືເກົ່າ.", "ກຳນົດ Required Field, Source ແລະ Verified Date ກ່ອນສະແດງ."],
  ["P3 · ສູງ", "Feed ເບິ່ງຄື Social app ແຕ່ບໍ່ພາຜູ້ໃຊ້ໄປ Action.", "ທົດສອບ Video → Place → Map/Call/Message ເປັນ Journey ດຽວ."],
  ["P4 · ກາງ", "Admin ໃຊ້ເວລາກວດຂໍ້ມູນຫຼາຍຈົນຂະຫຍາຍບໍ່ໄດ້.", "ບັນທຶກເວລາຕໍ່ Place ແລະຕັດ Field/Workflow ທີ່ບໍ່ຈຳເປັນ."],
  ["P5 · ກາງ", "Analytics ນັບ Event ຜິດ ຫຼືນັບຄົນດຽວຊ້ຳ.", "ມີ Event definition, Test data ແລະກວດຈຳນວນບໍ່ຊ້ຳກ່ອນ Pilot."],
] as const;

export default function ProductRequirementsDocument({ basePath }: { basePath: string }) {
  const [activeJourney, setActiveJourney] = useState<(typeof journeyAreas)[number]["id"]>("discover");
  const journey = journeyAreas.find((item) => item.id === activeJourney) ?? journeyAreas[0];

  return (
    <article className={`${styles.detailBody} ${styles.prdBody} ${styles.businessDocument}`}>
      <section className={styles.documentControl}>
        <div><small>ສະບັບ</small><strong>1.0</strong></div>
        <div><small>ສະຖານະ</small><strong>ອະນຸມັດແລ້ວ</strong></div>
        <div><small>ວັນທີປັບປຸງ</small><strong>26 ສິງຫາ 2026</strong></div>
        <div><small>ເອກະສານຕົ້ນທາງ</small><strong>Vision 1.0 + Feasibility 1.0 + Revenue & KPI 1.0</strong></div>
      </section>

      <ProductRequirementsDeepDive />

      <section>
        <span>01 · ຈຸດປະສົງ</span>
        <h2>PRD ບອກວ່າລະບົບຕ້ອງເຮັດຫຍັງ</h2>
        <blockquote className={styles.prdStatement}>MVP ຂອງ “ພ້ອມໄປ” ຕ້ອງພາຜູ້ໃຊ້ຈາກ “ເຫັນວິດີໂອ” ໄປຫາ “ຮູ້ຂໍ້ມູນຮ້ານພໍ” ແລະ “ກົດແຜນທີ່, ໂທ ຫຼືຂໍ້ຄວາມ” ໂດຍບໍ່ຕ້ອງຈອງ, ຊຳລະເງິນ ຫຼືສະໝັກ Account.</blockquote>
      </section>

      <section>
        <span>02 · ຂອບເຂດການຕັດສິນ</span>
        <h2>ສິ່ງທີ່ກຳນົດແລ້ວ ແລະສິ່ງທີ່ PRD ຕ້ອງຕອບ</h2>
        <div className={styles.feasibilityInputs}>
          <div><b>ຂໍ້ກຳນົດທີ່ອະນຸມັດແລ້ວ</b><ul><li>Launch ທີ່ວຽງຈັນ</li><li>ອາຫານ ແລະຄາເຟ</li><li>Video-first + Place-first</li><li>Guest-first</li><li>Map, Call, Message</li><li>ບໍ່ມີ Booking ໃນ MVP</li></ul></div>
          <div><b>PRD ຕ້ອງກຳນົດ</b><ul><li>Feature ທີ່ຕ້ອງມີ</li><li>User Story ແລະ Journey</li><li>ຂໍ້ມູນທີ່ຕ້ອງສະແດງ</li><li>ການກະທຳທີ່ຕ້ອງວັດ</li><li>ເກນຮັບມອບເບື້ອງຕົ້ນ</li></ul></div>
          <div><b>ບໍ່ຕັດສິນໃນເອກະສານນີ້</b><ul><li>Programming language</li><li>Database schema</li><li>API design</li><li>Server provider</li><li>ລາຍລະອຽດ UX/UI ທຸກໜ້າ</li><li>ຕາຕະລາງ Development</li></ul></div>
        </div>
      </section>

      <section>
        <span>03 · ຜູ້ໃຊ້ ແລະຜູ້ດຳເນີນງານ</span>
        <h2>4 ກຸ່ມທີ່ລະບົບຕ້ອງຮອງຮັບ</h2>
        <div className={styles.exchangeGrid}>
          <article><b>PRIMARY USER</b><h3>ຜູ້ຊອກຮ້ານ</h3><p>ເບິ່ງ, ຄົ້ນ, ກອງ, ເປີດ Place Page, Save, Share ແລະກົດເພື່ອໄປ.</p></article>
          <article><b>BUSINESS</b><h3>ເຈົ້າຂອງຮ້ານ</h3><p>ກວດຂໍ້ມູນ, ສະເໜີແກ້ໄຂ ແລະຮັບ Performance Summary ໃນ Pilot.</p></article>
          <article><b>CONTENT SOURCE</b><h3>Creator</h3><p>ໄດ້ຮັບ Attribution ແລະ Traffic ກັບໄປຫາ Content ຕົ້ນສະບັບ; ຍັງບໍ່ມີ Creator Account.</p></article>
          <article><b>OPERATOR</b><h3>Admin</h3><p>ຈັດການ Place, Source, Verification, Correction, Sponsored label ແລະ Takedown.</p></article>
        </div>
      </section>

      <section>
        <span>04 · PRODUCT JOURNEY</span>
        <h2>ເລືອກເບິ່ງ Requirement ຂອງແຕ່ລະຂັ້ນ</h2>
        <div className={styles.prdTabs} role="tablist" aria-label="Product journey">
          {journeyAreas.map((item) => <button key={item.id} type="button" role="tab" aria-selected={activeJourney === item.id} className={activeJourney === item.id ? styles.activePrdTab : ""} onClick={() => setActiveJourney(item.id)}>{item.label}<strong>{item.title}</strong></button>)}
        </div>
        <div className={styles.prdJourneyPanel} role="tabpanel">
          <div><small>USER GOAL</small><h3>{journey.title}</h3><p>{journey.goal}</p></div>
          <div><small>REQUIREMENTS</small><ul>{journey.requirements.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><small>ACCEPTANCE EVIDENCE</small><p>{journey.evidence}</p></div>
        </div>
      </section>

      <section>
        <span>05 · FUNCTIONAL REQUIREMENTS</span>
        <h2>Feature ທີ່ຕ້ອງມີໃນ MVP</h2>
        <div className={styles.prdRequirementTable} role="table" aria-label="Functional requirements">
          <div role="row"><b>ID</b><b>PRIORITY</b><b>FEATURE</b><b>REQUIREMENT</b></div>
          {requirements.map(([id, priority, feature, requirement]) => <div role="row" key={id}><b>{id}</b><span>{priority}</span><strong>{feature}</strong><p>{requirement}</p></div>)}
        </div>
      </section>

      <section>
        <span>06 · MVP BOUNDARY</span>
        <h2>ເຮັດໃນ MVP / ຍັງບໍ່ເຮັດ</h2>
        <div className={styles.scopeColumns}>
          <div><h3>IN MVP</h3><ul><li>Responsive Web/PWA</li><li>Full-screen discovery feed</li><li>Search ແລະ Filter ພື້ນຖານ</li><li>Place Page + Source link</li><li>Map, Call, Message</li><li>Save ໃນອຸປະກອນ + Share</li><li>Correction request</li><li>Admin workflow</li><li>Analytics ຕັ້ງແຕ່ View ຫາ Decision Intent</li></ul></div>
          <div><h3>NOT IN MVP</h3><ul><li>Booking ແລະ Payment</li><li>Native iOS/Android App</li><li>User account ແບບເຕັມ</li><li>Creator marketplace</li><li>Comment, Follow ແລະ Social profile</li><li>AI recommendation ແບບຊັບຊ້ອນ</li><li>Video download, storage ແລະ transcoding</li><li>Launch ຫຼາຍແຂວງພ້ອມກັນ</li></ul></div>
        </div>
      </section>

      <section>
        <span>07 · USER STORIES</span>
        <h2>ຄວາມຕ້ອງການໃນມຸມຂອງຜູ້ໃຊ້</h2>
        <ol className={styles.openQuestions}>{userStories.map(([actor, story], index) => <li key={actor}><b>0{index + 1} · {actor}</b><p>{story}</p></li>)}</ol>
      </section>

      <section>
        <span>08 · NON-FUNCTIONAL REQUIREMENTS</span>
        <h2>ຄຸນນະພາບທີ່ລະບົບຕ້ອງມີ</h2>
        <div className={styles.prdQualityGrid}>
          <article><b>NFR-01 · MOBILE</b><h3>ໃຊ້ງານດ້ວຍມືດຽວ</h3><p>Feed, Search, Place ແລະ Action ຕ້ອງໃຊ້ໄດ້ໃນໜ້າຈໍ Mobile ກ່ອນ Desktop.</p></article>
          <article><b>NFR-02 · PERFORMANCE</b><h3>ໂຫຼດໄວໃນ Mobile Network</h3><p>ຕ້ອງມີ Placeholder/Fallback ເມື່ອ Preview ຊ້າ ແລະບໍ່ໃຫ້ External Embed ຂັດຂວາງ Place data.</p></article>
          <article><b>NFR-03 · ACCESSIBILITY</b><h3>ອ່ານ ແລະກົດໄດ້</h3><p>ຂໍ້ຄວາມມີ Contrast, ປຸ່ມມີ Label, Keyboard ໃຊ້ໄດ້ ແລະບໍ່ພຶ່ງສີພຽງຢ່າງດຽວ.</p></article>
          <article><b>NFR-04 · PRIVACY</b><h3>ເກັບຂໍ້ມູນເທົ່າທີ່ຈຳເປັນ</h3><p>ບໍ່ບັງຄັບ Account, ບໍ່ເກັບຕຳແໜ່ງແບບຕໍ່ເນື່ອງ ແລະບໍ່ອ້າງ Decision Intent ເປັນການໄປຮ້ານຈິງ.</p></article>
        </div>
      </section>

      <section>
        <span>09 · CORE ACCEPTANCE</span>
        <h2>Journey ຫຼັກຈະຖືວ່າສຳເລັດເມື່ອ</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ຜູ້ໃຊ້ເຂົ້າ Feed ແລະເລີ່ມຄົ້ນພົບໄດ້ໂດຍບໍ່ສະໝັກ Account.</span></li>
          <li><b>02</b><span>ທຸກ Content card ພາໄປ Place Page ແລະສະແດງ Source/Creator ຕົ້ນສະບັບ.</span></li>
          <li><b>03</b><span>Place Page ທີ່ເຜີຍແຜ່ຕ້ອງມີ Required Field ຄົບ ຫຼືບອກຊັດວ່າ Field ໃດຍັງບໍ່ຢືນຢັນ.</span></li>
          <li><b>04</b><span>Map, Call ແລະ Message ເປີດປາຍທາງຖືກຕ້ອງ ແລະບັນທຶກ Event ໄດ້.</span></li>
          <li><b>05</b><span>ຜົນ Sponsored ມີ Label ຊັດເຈນ ແລະບໍ່ປົນກັບ Place verified ຫຼືຜົນທຳມະຊາດ.</span></li>
          <li><b>06</b><span>Admin ສາມາດຮັບ Correction/Takedown request ແລະບັນທຶກຜົນການດຳເນີນໄດ້.</span></li>
        </ul>
      </section>

      <section>
        <span>10 · DATA & ANALYTICS</span>
        <h2>ຂໍ້ມູນທີ່ Product ຕ້ອງສົ່ງຕໍ່</h2>
        <div className={styles.financialMetrics}>
          <article><b>PLACE DATA</b><ul><li>Identity ແລະ Category</li><li>Location ແລະ Contact</li><li>Hours ແລະ Price range</li><li>Source ແລະ Verified date</li><li>Status ແລະ Labels</li></ul></article>
          <article><b>CONTENT DATA</b><ul><li>Canonical URL</li><li>Source platform</li><li>Creator attribution</li><li>Linked Place</li><li>Checked date</li></ul></article>
          <article><b>EVENT DATA</b><ul><li>Feed view</li><li>Place open</li><li>Search / Filter</li><li>Map / Call / Message</li><li>Save / Share</li></ul></article>
        </div>
      </section>

      <section>
        <span>11 · RELEASE GATE</span>
        <h2>ກ່ອນນຳ MVP ໄປທົດສອບ</h2>
        <div className={styles.gateTable} role="table" aria-label="MVP release gate">
          <div role="row"><b>GATE</b><b>ຜ່ານ</b><b>ປັບກ່ອນ</b><b>ຫ້າມປ່ອຍ</b></div>
          <div role="row"><strong>Core journey</strong><p>Feed → Place → Action ສຳເລັດໃນ Mobile.</p><span>Flow ສຳເລັດແຕ່ຍັງມີຈຸດສັບສົນ.</span><em>ເປີດ Place ຫຼື Action ບໍ່ໄດ້.</em></div>
          <div role="row"><strong>Place data</strong><p>100 Place records ມີຂໍ້ມູນຫຼັກຄົບ.</p><span>ຕ້ອງຫຼຸດເຂດ ຫຼືໝວດ.</span><em>ຂໍ້ມູນສຳຄັນຜິດ ແລະບໍ່ມີ Source.</em></div>
          <div role="row"><strong>Trust</strong><p>Source, Creator, Verified ແລະ Sponsored ສະແດງຖືກ.</p><span>ຈຳກັດ Source ທີ່ຍັງບໍ່ຊັດ.</span><em>ຕ້ອງ Re-host Content ໂດຍບໍ່ມີສິດ.</em></div>
          <div role="row"><strong>Analytics</strong><p>Decision Intent Event ກວດທຽບກັບ Test log ໄດ້.</p><span>ບາງ Event ຂາດແຕ່ Core Event ຄົບ.</span><em>ບໍ່ຮູ້ວ່າ Event ຖືກນັບຫຼືບໍ່.</em></div>
        </div>
      </section>

      <section>
        <span>12 · RISKS & DEPENDENCIES</span>
        <h2>ສິ່ງທີ່ອາດຂັດຂວາງ MVP</h2>
        <ol className={styles.riskList}>{risks.map(([level, risk, control]) => <li key={level}><b>{level}</b><p>{risk}</p><span>{control}</span></li>)}</ol>
      </section>

      <section>
        <span>13 · ຄຳຕັດສິນທີ່ອະນຸມັດ</span>
        <h2>5 ຂໍ້ກຳນົດສຳລັບ PRD 1.0</h2>
        <ol className={styles.openQuestions}>
          <li><b>01 · CONTENT FALLBACK</b><p>ຖ້າ Official Embed ໃຊ້ບໍ່ໄດ້ ໃຫ້ສະແດງ Preview, ຊື່ Creator, Source ແລະ Link ໄປຫາຕົ້ນສະບັບ. ຖ້ານຳຮູບປົກມາໃຊ້ບໍ່ໄດ້ ໃຫ້ໃຊ້ຮູບສຳຮອງ; ຫ້າມສຳເນົາວິດີໂອມາເກັບໂດຍບໍ່ມີສິດ.</p></li>
          <li><b>02 · REQUIRED PLACE DATA</b><p>ກ່ອນເຜີຍແຜ່ຕ້ອງມີຊື່, ໝວດ, ເຂດ, ຕຳແໜ່ງແຜນທີ່, ຊ່ອງທາງຕິດຕໍ່ຢ່າງໜ້ອຍໜຶ່ງຊ່ອງທາງ, Source link, ວັນທີກວດ ແລະການອະນຸມັດຈາກ Admin. ເວລາເປີດ–ປິດ ແລະຊ່ວງລາຄາທີ່ຍັງກວດບໍ່ໄດ້ ຕ້ອງສະແດງວ່າ “ຍັງບໍ່ຢືນຢັນ”.</p></li>
          <li><b>03 · LAUNCH FILTERS</b><p>MVP ໃຊ້ Filter ພຽງໝວດ, ເຂດ ແລະຊ່ວງລາຄາ. “ເປີດຢູ່ຕອນນີ້” ແລະ “ຮ້ານໃກ້ຂ້ອຍ” ເພີ່ມພາຍຫຼັງເມື່ອຂໍ້ມູນເວລາ ແລະຕຳແໜ່ງມີຄວາມໜ້າເຊື່ອຖື.</p></li>
          <li><b>04 · CORRECTION REQUEST</b><p>ໃນ Pilot ໃຫ້ປຸ່ມ “ແຈ້ງແກ້ໄຂຂໍ້ມູນ” ພາໄປຫາຊ່ອງທາງສື່ສານທີ່ໂຄງການໃຊ້ຢູ່ ພ້ອມຂໍ້ຄວາມມາດຕະຖານ; Admin ບັນທຶກ, ກວດຫຼັກຖານ ແລະອະນຸມັດແບບ Manual.</p></li>
          <li><b>05 · ANALYTICS CONSENT</b><p>ໃນການເຂົ້າໃຊ້ຄັ້ງທຳອິດ ໃຫ້ແຈ້ງການເກັບ Anonymous Product Analytics ແລະໃຫ້ເລືອກ “ຍອມຮັບ” ຫຼື “ໃຊ້ສະເພາະຟັງຊັນຈຳເປັນ”. ການປະຕິເສດຕ້ອງບໍ່ຂັດຂວາງການໃຊ້ງານຫຼັກ ແລະຕ້ອງມີ Privacy Notice ອະທິບາຍຊັດເຈນ.</p></li>
        </ol>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>ອະນຸມັດແລ້ວ</span><h2>Product Requirements 1.0</h2></div>
        <ul><li>Product journey — ຢືນຢັນແລ້ວ</li><li>MVP feature scope — ຢືນຢັນແລ້ວ</li><li>Core acceptance — ຢືນຢັນແລ້ວ</li><li>Required place fields — ກຳນົດແລ້ວ</li><li>Content fallback, Filter, Correction ແລະ Analytics consent — ກຳນົດແລ້ວ</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/revenue-kpi`}><small>← ເອກະສານຕົ້ນທາງທີ່ອະນຸມັດແລ້ວ</small><strong>ລາຍຮັບ ແລະຕົວຊີ້ວັດ</strong></a>
        <a href={`${basePath}/documents/system-analysis`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>ການວິເຄາະລະບົບ</strong></a>
      </nav>
    </article>
  );
}
