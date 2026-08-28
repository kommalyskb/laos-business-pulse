"use client";

import { useState } from "react";
import styles from "./design-system.module.css";

const states = [
  { id: "default", lao: "ປົກກະຕິ", english: "Default" },
  { id: "loading", lao: "ກຳລັງໂຫຼດ", english: "Loading" },
  { id: "empty", lao: "ບໍ່ພົບຂໍ້ມູນ", english: "Empty" },
  { id: "error", lao: "ຜິດພາດ", english: "Error" },
  { id: "disabled", lao: "ໃຊ້ບໍ່ໄດ້", english: "Disabled" },
  { id: "sponsored", lao: "ໂຄສະນາ", english: "Sponsored" },
  { id: "stale", lao: "ຂໍ້ມູນເກົ່າ", english: "Stale" },
] as const;

type StateId = (typeof states)[number]["id"];
type ViewId = "video" | "list" | "map";

const colors = [
  ["Surface", "#FFFDF8", "#17221F"], ["Primary", "#17644F", "#FFFFFF"],
  ["Accent", "#F27A45", "#17221F"], ["Info", "#284B8F", "#FFFFFF"],
  ["Sponsored", "#FFD09F", "#351B06"], ["Error", "#FDE7E7", "#7D1D1D"],
];

const menuItems = [
  { name: "ເຂົ້າປຽກປາ", price: "45,000 ກີບ", tone: "warm" },
  { name: "ກາເຟລາວເຢັນ", price: "28,000 ກີບ", tone: "dark" },
  { name: "ເຂົ້າໜຽວໝູປີ້ງ", price: "38,000 ກີບ", tone: "green" },
];

function StateMessage({ state }: { state: StateId }) {
  if (state === "loading") return <div className={styles.statePanel}><div className={styles.spinner} aria-hidden="true"/><div><strong>ກຳລັງໂຫຼດຂໍ້ມູນ</strong><p>ຄຳຄົ້ນ ແລະ Filter ຈະບໍ່ຖືກລຶບ.</p></div></div>;
  if (state === "empty") return <div className={styles.statePanel}><b aria-hidden="true">0</b><div><strong>ບໍ່ພົບສະຖານທີ່ຕາມເງື່ອນໄຂ</strong><p>ລອງປ່ຽນເຂດ, ລາຄາ ຫຼືລຶບ Filter ບາງອັນ.</p><button>ລຶບ Filter ທັງໝົດ</button></div></div>;
  if (state === "error") return <div className={`${styles.statePanel} ${styles.errorPanel}`} role="alert"><b aria-hidden="true">!</b><div><strong>ບໍ່ສາມາດໂຫຼດຜົນໄດ້</strong><p>ກະລຸນາກວດ Internet ແລ້ວລອງອີກຄັ້ງ. ຄຳຄົ້ນຂອງທ່ານຍັງຢູ່.</p><button>ລອງອີກຄັ້ງ</button></div></div>;
  if (state === "disabled") return <div className={styles.statePanel}><b aria-hidden="true">—</b><div><strong>Action ນີ້ຍັງໃຊ້ບໍ່ໄດ້</strong><p>ຮ້ານຍັງບໍ່ມີເບີໂທທີ່ກວດສອບແລ້ວ.</p><button disabled>ໂທຫາຮ້ານ</button></div></div>;
  if (state === "sponsored") return <div className={`${styles.statePanel} ${styles.sponsoredPanel}`}><b aria-hidden="true">AD</b><div><strong>Sponsored · ໂຄສະນາ</strong><p>ຮ້ານຈ່າຍຄ່າພື້ນທີ່ສະແດງຜົນ. ການຈ່າຍບໍ່ປ່ຽນຄະແນນ ຫຼືສະຖານະ Verified.</p></div></div>;
  if (state === "stale") return <div className={`${styles.statePanel} ${styles.stalePanel}`}><b aria-hidden="true">↻</b><div><strong>ຂໍ້ມູນອາດປ່ຽນແປງ</strong><p>ກວດຄັ້ງລ່າສຸດ 15 ກໍລະກົດ 2026. ຄວນຕິດຕໍ່ຮ້ານກ່ອນເດີນທາງ.</p><button>ລາຍງານຂໍ້ມູນໃໝ່</button></div></div>;
  return <div className={`${styles.statePanel} ${styles.successPanel}`}><b aria-hidden="true">✓</b><div><strong>ຂໍ້ມູນພ້ອມໃຊ້ຕັດສິນໃຈ</strong><p>ກວດຊື່, ທີ່ຢູ່, ເວລາ ແລະຊ່ອງທາງຕິດຕໍ່ແລ້ວ.</p></div></div>;
}

export default function DesignSystemGallery({ basePath }: { basePath: string }) {
  const [activeState, setActiveState] = useState<StateId>("default");
  const [activeView, setActiveView] = useState<ViewId>("video");
  const stateLabel = states.find((state) => state.id === activeState)?.lao;

  return <main className={styles.site}>
    <header className={styles.topbar}>
      <a className={styles.brand} href={`${basePath}/platform`}>ພ້ອມ<span>ໄປ</span><small>UX-04</small></a>
      <nav aria-label="ນຳທາງ Design System">
        <a href={`${basePath}/documents/design-system`}>← ກັບເອກະສານ UX-04</a>
        <a href={`${basePath}/prototype`}>ເປີດ Prototype R2.3 QA</a>
      </nav>
    </header>

    <section className={styles.hero}>
      <div><p>UX-04 · COMPONENT GALLERY · 0.9.4</p><h1>ມາດຕະຖານ UI<br/>ສຳລັບ Pilot</h1></div>
      <div className={styles.heroNote}><strong>ຈຸດປະສົງຂອງໜ້ານີ້</strong><p>ໃຊ້ກວດ Design Token, Component ແລະ State ກ່ອນ Developer ນຳໄປສ້າງລະບົບຈິງ. ນີ້ແມ່ນເອກະສານແບບ Interactive—ບໍ່ແມ່ນໜ້າໂຄສະນາ ຫຼື Production Product.</p></div>
    </section>

    <nav className={styles.sectionNav} aria-label="ສາລະບານ Component Gallery">
      <a href="#foundations">01 · Foundations</a><a href="#states">02 · States</a><a href="#search">03 · Search</a><a href="#place">04 · Place</a><a href="#gate">05 · 1.0 Gate</a>
    </nav>

    <section className={styles.section} id="foundations">
      <header className={styles.sectionHeader}><span>01</span><div><p>FOUNDATIONS</p><h2>ຄ່າພື້ນຖານທີ່ທຸກໜ້າຕ້ອງໃຊ້ຮ່ວມກັນ</h2></div></header>
      <div className={styles.typeSpecimen}><small>PRIMARY TYPEFACE · NOTO SANS LAO VARIABLE</small><strong>ຄົ້ນຫາ ເບິ່ງຣີວິວ ແລ້ວຄ່ອຍຕັດສິນໃຈ</strong><p>ຕົວຢ່າງພາສາລາວ: ປາ · ຜັກ · ຝົນ · ເຂົ້າໜຽວ · 45,000 ກີບ</p></div>
      <div className={styles.colorGrid}>{colors.map(([name, background, foreground]) => <article key={name} style={{ background, color: foreground }}><b>{name}</b><code>{background}</code><span>Aa ຂໍ້ຄວາມ</span></article>)}</div>
      <div className={styles.tokenGrid}>
        <article><b>SPACING</b><strong>4 · 8 · 12 · 16 · 24 · 32 · 48</strong><p>ຫ້າມສ້າງຄ່າໄລຍະຫ່າງໃໝ່ໂດຍບໍ່ມີ Token.</p></article>
        <article><b>MEDIA</b><strong>9:16 · 4:3 · 1:1</strong><p>ຮັກສາອັດຕາສ່ວນ ແລະໃຊ້ object-fit ໂດຍບໍ່ບີບຮູບ.</p></article>
        <article><b>TOUCH &amp; FOCUS</b><strong>44px · 3px ring</strong><p>Action ຕ້ອງກົດງ່າຍ ແລະເຫັນ Focus ຊັດເມື່ອໃຊ້ Keyboard.</p></article>
      </div>
    </section>

    <section className={`${styles.section} ${styles.stateSection}`} id="states">
      <header className={styles.sectionHeader}><span>02</span><div><p>INTERACTIVE STATE CHECK</p><h2>ເລືອກ State ເພື່ອກວດວ່າ UI ອະທິບາຍສະພາບໄດ້ຊັດຫຼືບໍ່</h2></div></header>
      <div className={styles.stateControls} role="group" aria-label="ເລືອກ UI State">{states.map((state) => <button key={state.id} aria-pressed={activeState === state.id} onClick={() => setActiveState(state.id)}><span>{state.lao}</span><small>{state.english}</small></button>)}</div>
      <div className={styles.liveLabel} aria-live="polite">State ທີ່ກຳລັງພຣີວິວ: <strong>{stateLabel}</strong></div>
      <StateMessage state={activeState}/>
    </section>

    <section className={styles.section} id="search">
      <header className={styles.sectionHeader}><span>03</span><div><p>SEARCH COMPONENTS · DS-C01—05</p><h2>Search ຕາມເຈດຕະນາ ແລະປ່ຽນມຸມມອງໂດຍບໍ່ເສຍ Context</h2></div></header>
      <div className={styles.demoFrame}>
        <div className={styles.searchBar}><label htmlFor="gallery-search">ທ່ານຢາກໄປໃສ ຫຼືຢາກກິນຫຍັງ?</label><div><input id="gallery-search" defaultValue="ຮ້ານອາຫານລາວ ລາຄາບໍ່ແພງ"/><button aria-label="ຄົ້ນຫາ">ຄົ້ນຫາ</button></div></div>
        <div className={styles.intentRow}><button aria-pressed="true">ລາຄາ ₭</button><button>ຢູ່ໃກ້</button><button>ເໝາະກັບຄອບຄົວ</button><button>ເປີດຕອນແລງ</button></div>
        <div className={styles.viewSwitcher} role="group" aria-label="ຮູບແບບຜົນຄົ້ນຫາ">{(["video", "list", "map"] as ViewId[]).map((view) => <button key={view} aria-pressed={activeView === view} onClick={() => setActiveView(view)}>{view === "video" ? "▻ Video" : view === "list" ? "☷ List" : "⌖ Map"}</button>)}</div>
        {activeView === "video" ? <div className={styles.videoResult}><div className={styles.videoPoster}><span>REVIEW VIDEO · 00:38</span><button aria-label="ຫຼິ້ນວິດີໂອ">▶</button></div><div><small>ສີສະຫວາດ · ລາຄາ ₭ · ອາຫານລາວ</small><h3>ເຮືອນຄົວແຄມຂອງ</h3><p>ມີເມນູພ້ອມລາຄາ · ກວດຂໍ້ມູນ 24 ສິງຫາ 2026</p><a href="#place">ເບິ່ງຂໍ້ມູນຮ້ານ →</a></div></div> : null}
        {activeView === "list" ? <div className={styles.listResults}>{["ເຮືອນຄົວແຄມຂອງ", "ສວນອາຫານວຽງຈັນ", "ຄົວລາວບ້ານເຮົາ"].map((name, index) => <article key={name}><b>0{index + 1}</b><div><h3>{name}</h3><p>ອາຫານລາວ · ລາຄາ {index === 1 ? "₭₭" : "₭"} · ມີ Review Video</p></div><span>ເບິ່ງ →</span></article>)}</div> : null}
        {activeView === "map" ? <div className={styles.mapDemo}><div className={styles.mapGrid} aria-hidden="true"><i/><i/><i/><span className={styles.markerOne}>1</span><span className={styles.markerTwo}>2</span></div><article><small>MARKER 01</small><h3>ເຮືອນຄົວແຄມຂອງ</h3><p>ສີສະຫວາດ · ລາຄາ ₭</p><button>ເບິ່ງ Place Page</button></article></div> : null}
      </div>
    </section>

    <section className={`${styles.section} ${styles.placeSection}`} id="place">
      <header className={styles.sectionHeader}><span>04</span><div><p>PLACE COMPONENTS · DS-C06—11</p><h2>Place Page ຕ້ອງມີຂໍ້ມູນພໍໃຫ້ຕັດສິນໃຈ ແລະອອກເດີນທາງ</h2></div></header>
      <div className={styles.placeHero}><div><small>ຮ້ານອາຫານ · ສີສະຫວາດ</small><h3>ເຮືອນຄົວແຄມຂອງ</h3><p>ອາຫານລາວ · ລາຄາ ₭ · ເໝາະກັບຄອບຄົວ</p></div><aside><b>ກວດຂໍ້ມູນແລ້ວ</b><span>24 ສິງຫາ 2026</span></aside></div>
      <div className={styles.actionBar}><button>⌖ ເປີດແຜນທີ່</button><button>☎ ໂທຫາຮ້ານ</button><button>● ສົ່ງຂໍ້ຄວາມ</button><button>↗ Share</button></div>
      <div className={styles.decisionGrid}><article><small>ການຕັດສິນໃຈ</small><strong>ເປີດ 10:00–22:00</strong><p>ມີບ່ອນຈອດລົດ · ຮັບຄອບຄົວ · ມີບ່ອນນັ່ງນອກ</p></article><article><small>ແຫຼ່ງຂໍ້ມູນ</small><strong>Official Page + 3 Reviews</strong><p>ປ້າຍ Partner ບໍ່ແມ່ນຄະແນນ ແລະບໍ່ຊື້ Verified Status.</p></article></div>
      <h3 className={styles.subheading}>ເມນູ ແລະລາຄາ</h3>
      <div className={styles.menuGrid}>{menuItems.map((item) => <article key={item.name}><div className={`${styles.menuImage} ${styles[item.tone]}`} role="img" aria-label={`ຮູບຕົວຢ່າງ ${item.name}`}><span>PHOTO</span></div><div><h4>{item.name}</h4><strong>{item.price}</strong><small>ລາຄາກວດ 24 ສິງຫາ 2026</small></div></article>)}</div>
      <h3 className={styles.subheading}>Review ຈາກແຫຼ່ງຕົ້ນສະບັບ</h3>
      <div className={styles.reviewRail}>{["TikTok · @kinlao", "Facebook · VTE Food", "YouTube · Lao Journey"].map((source, index) => <article key={source}><div><span>0{index + 1}</span><button aria-label={`ຫຼິ້ນຕົວຢ່າງ Review ${index + 1}`}>▶</button></div><strong>{source}</strong><small>ເປີດ Original Source ↗</small></article>)}</div>
    </section>

    <section className={`${styles.section} ${styles.gateSection}`} id="gate">
      <header className={styles.sectionHeader}><span>05</span><div><p>UX-04 1.0 ACCEPTANCE GATE</p><h2>ສິ່ງທີ່ຕ້ອງຜ່ານກ່ອນຖືວ່າ Design System ພ້ອມ</h2></div></header>
      <div className={styles.gateGrid}>
        <article className={styles.passed}><b>ຜ່ານແລ້ວ</b><ul><li>11 ຄູ່ສີ Semantic</li><li>White-on-accent ຖືກຫ້າມ</li><li>Touch target ຂັ້ນຕ່ຳ 44px</li><li>Consent focus/inert structure</li></ul></article>
        <article className={styles.pending}><b>ຍັງຂວາງ 1.0</b><ul><li>VoiceOver ກັບ Pilot Flow</li><li>Keyboard ທຸກ Core Action</li><li>ພາສາລາວທີ່ 200%</li><li>Reduced Motion Manual Retest</li><li>Pilot Component States ຄົບ</li></ul></article>
        <article className={styles.deferred}><b>ບໍ່ຂວາງ Pilot 1.0</b><ul><li>Admin Component States → UX-04.1</li><li>NVDA → ກ່ອນ Wider Launch</li><li>Brand Exploration ໃໝ່</li></ul></article>
      </div>
      <p className={styles.finalNote}>ໜ້າ Gallery ນີ້ຢືນຢັນວ່າ Specification ແລະ Preview ມີແລ້ວ; ມັນບໍ່ສາມາດຢືນຢັນແທນການທົດສອບ VoiceOver, Keyboard ແລະ Lao 200% ດ້ວຍຄົນຈິງ.</p>
    </section>
  </main>;
}
