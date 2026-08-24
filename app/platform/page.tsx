"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./platform.module.css";

type PlaceKey = "food" | "nature" | "cafe";
type RevenueStage = "launch" | "growth" | "scale";

const demoPlaces: Record<PlaceKey, {
  label: string;
  name: string;
  meta: string;
  price: string;
  distance: string;
  contact: string;
  creator: string;
  scene: PlaceKey;
  image: string;
  tags: string[];
}> = {
  food: {
    label: "ຮ້ານອາຫານ",
    name: "ເຮືອນຄົວວຽງ",
    meta: "ອາຫານລາວ · ສີສັດຕະນາກ",
    price: "₭₭",
    distance: "2.4 km",
    contact: "ໂທຫາຮ້ານ",
    creator: "@lao.food.story",
    scene: "food",
    image: "/platform-food.jpg",
    tags: ["ຄອບຄົວ", "ບ່ອນຈອດລົດ", "ອາຫານລາວ"],
  },
  nature: {
    label: "ສະຖານທີ່ທ່ຽວ",
    name: "ຕາດສາຍຫມອກ",
    meta: "ທຳມະຊາດ · ຫ່າງຈາກເມືອງ 34 km",
    price: "20K",
    distance: "48 min",
    contact: "ເປີດເສັ້ນທາງ",
    creator: "@thiao.laos",
    scene: "nature",
    image: "/platform-waterfall.jpg",
    tags: ["ໄປເຊົ້າ–ແລງ", "ຖ່າຍຮູບ", "ລົດເກັງໄປໄດ້"],
  },
  cafe: {
    label: "ຄາເຟ",
    name: "ຄາເຟແຄມຂອງ",
    meta: "Coffee & workspace · ຈັນທະບູລີ",
    price: "₭₭",
    distance: "1.1 km",
    contact: "ສົ່ງຂໍ້ຄວາມ",
    creator: "@slowday.vte",
    scene: "cafe",
    image: "/platform-cafe.jpg",
    tags: ["Wi‑Fi", "ງຽບ", "ເປີດຮອດ 21:00"],
  },
};

const revenueStages: Record<RevenueStage, {
  no: string;
  title: string;
  description: string;
  items: string[];
  signal: string;
}> = {
  launch: {
    no: "01",
    title: "ສ້າງ supply ແລະລາຍຮັບຊຸດທຳອິດ",
    description: "ເປີດ basic listing ຟຣີ ແລະ pre-sell Founding Partner ກ່ອນທີ່ platform ຈະໃຫຍ່.",
    items: ["Basic listing ຟຣີ", "Founding Partner package", "Sponsored placement ທີ່ຕິດປ້າຍຊັດ"],
    signal: "ຫຼັກຖານ: 5–10 ຮ້ານຍອມຈ່າຍກ່ອນ launch",
  },
  growth: {
    no: "02",
    title: "ປ່ຽນ traffic ໃຫ້ເປັນ recurring revenue",
    description: "ເມື່ອພິສູດໄດ້ວ່າ platform ພາຄົນໄປຫາຮ້ານ ຈຶ່ງເປີດບໍລິການລາຍເດືອນ.",
    items: ["Pro Business profile", "Traffic & contact analytics", "Creator campaign marketplace"],
    signal: "ຫຼັກຖານ: map click, call, message ແລະ repeat usage",
  },
  scale: {
    no: "03",
    title: "ເພີ່ມ transaction ໂດຍບໍ່ຮີບສ້າງລະບົບຈອງ",
    description: "ຮັບ commission ຈາກບໍລິການພາຍນອກກ່ອນ ແລ້ວຄ່ອຍເລືອກປະເພດທີ່ຄຸ້ມຄ່າເຮັດ booking ເອງ.",
    items: ["Affiliate ກັບພາກສ່ວນອື່ນ", "Sponsored collections", "Booking ສະເພາະຈຸດທີ່ມີ demand"],
    signal: "ຫຼັກຖານ: ຜູ້ໃຊ້ມີ transaction intent ຊ້ຳໆ",
  },
};

const formatKip = (value: number) => `${new Intl.NumberFormat("en-US").format(value)} ₭`;

export default function PlatformPitch() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [selectedPlace, setSelectedPlace] = useState<PlaceKey>("food");
  const [activeStage, setActiveStage] = useState<RevenueStage>("launch");
  const [actionMessage, setActionMessage] = useState("ລອງກົດການກະທຳໃນຕົວຢ່າງ");
  const [partners, setPartners] = useState(25);
  const [campaigns, setCampaigns] = useState(3);
  const [operatingCost, setOperatingCost] = useState(5_000_000);
  const [scrollProgress, setScrollProgress] = useState(0);

  const place = demoPlaces[selectedPlace];
  const monthlyRevenue = partners * 200_000 + campaigns * 1_000_000;
  const operatingResult = monthlyRevenue - operatingCost;
  const breakEvenPartners = Math.max(0, Math.ceil((operatingCost - campaigns * 1_000_000) / 200_000));

  const resultLabel = useMemo(() => {
    if (operatingResult > 0) return "ເກີນຈຸດຄຸ້ມທຶນ";
    if (operatingResult === 0) return "ຮອດຈຸດຄຸ້ມທຶນ";
    return "ຍັງບໍ່ຮອດຈຸດຄຸ້ມທຶນ";
  }, [operatingResult]);

  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const demonstrateAction = (action: string) => {
    setActionMessage(`${action} — ຜູ້ໃຊ້ຖືກສົ່ງໄປຫາຊ່ອງທາງຂອງສະຖານທີ່ໂດຍກົງ`);
  };

  return (
    <main className={styles.site}>
      <div className={styles.progress} aria-hidden="true"><i style={{ width: `${scrollProgress}%` }} /></div>

      <header className={styles.topbar}>
        <a className={styles.brand} href="#top" aria-label="ກັບໄປດ້ານເທິງ">ພ້ອມ<span>ໄປ</span></a>
        <nav className={styles.nav} aria-label="ນຳທາງບົດນຳສະເໜີ">
          <a href="#problem">ບັນຫາ</a>
          <a href="#product">ຜະລິດຕະພັນ</a>
          <a href="#standard">ມາດຕະຖານ</a>
          <a href="#revenue">ລາຍຮັບ</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
        <a className={styles.reportLink} href="../">ກັບໄປບົດລາຍງານ ↗</a>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>VIDEO DISCOVERY PLATFORM ສຳລັບລາວ</p>
          <h1>ຈາກການເບິ່ງ<br />ສູ່ການ<span>ອອກໄປ.</span></h1>
          <p className={styles.lede}>
            ລວມວິດີໂອຣີວິວທີ່ກະແຈກກະຈາຍ ແລ້ວເພີ່ມຂໍ້ມູນທີ່ຄົນຕ້ອງການ
            ເພື່ອຕັດສິນໃຈ: ລາຄາ, ເວລາ, ແຜນທີ່ ແລະຊ່ອງທາງຕິດຕໍ່.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href="#problem">ເລີ່ມບົດນຳສະເໜີ <span>↓</span></a>
            <span>WORKING CONCEPT · AUG 2026</span>
          </div>
        </div>

        <div className={styles.demoWrap} aria-label="ຕົວຢ່າງໜ້າວິດີໂອ">
          <div className={styles.phone}>
            <div className={styles.phoneTop}><span>9:41</span><span>● ●</span></div>
            <div
              className={`${styles.videoScene} ${styles.heroFeed} ${styles.food}`}
              style={{ backgroundImage: `url(${basePath}/platform-food.jpg)` }}
            >
              <div className={styles.feedHeader}><span>ກຳລັງນິຍົມ　 ສຳລັບເຈົ້າ</span><b>⌕</b></div>
              <div className={styles.contentBadge}>ຣີວິວຈາກ creator</div>
              <div className={styles.feedRail}><span>♡<small>1.2K</small></span><span>♧<small>ບັນທຶກ</small></span><span>↗<small>ແຊຣ໌</small></span></div>
              <div className={styles.play}>▶</div>
              <div className={styles.creator}>@lao.food.story · 2 ມື້ກ່ອນ</div>
              <div className={styles.placeCard}>
                <div><small>ອາຫານລາວ · ສີສັດຕະນາກ</small><strong>ເຮືອນຄົວວຽງ　›</strong></div>
                <div className={styles.quickFacts}><span>ເປີດຢູ່</span><span>₭₭</span><span>2.4 km</span></div>
                <div className={styles.phoneActions}><button>ໂທຫາ</button><button>ແຜນທີ່</button></div>
              </div>
              <div className={styles.bottomNav}><b>⌂<small>ສຳຫຼວດ</small></b><b>⌕<small>ຄົ້ນຫາ</small></b><b>＋</b><b>♧<small>ບັນທຶກ</small></b><b>○<small>ໂປຣໄຟລ໌</small></b></div>
            </div>
          </div>
          <p className={styles.demoNote}>VIDEO <span>+</span> PLACE DATA <span>+</span> ACTION</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.problem}`} id="problem">
        <div className={styles.sectionIndex}>01</div>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>THE PROBLEM</p>
          <h2>ຣີວິວມີຢູ່ແລ້ວ.<br />ແຕ່ການຕັດສິນໃຈຍັງຍາກ.</h2>
        </div>
        <div className={styles.problemGrid}>
          <article><b>01</b><h3>Content ກະແຈກກະຈາຍ</h3><p>ຜູ້ໃຊ້ຕ້ອງຄົ້ນຫາຊ້ຳໃນ TikTok, Facebook ແລະ YouTube ໂດຍບໍ່ຮູ້ວ່າຣີວິວໃດໃໝ່ ຫຼືໜ້າເຊື່ອຖື.</p></article>
          <article><b>02</b><h3>Video ບໍ່ມີ decision data</h3><p>ເບິ່ງແລ້ວຍັງຕ້ອງອອກໄປຫາແຜນທີ່, ເບີໂທ, ເວລາເປີດ ແລະລາຄາຢູ່ບ່ອນອື່ນ.</p></article>
          <article><b>03</b><h3>Platform ເດີມສົນໃຈ watch time</h3><p>ລະບົບເດີມພາຄົນໄປຫາວິດີໂອຕໍ່ໄປ; ບໍ່ໄດ້ພາຄົນໄປຫາການຕັດສິນໃຈທີ່ສຳເລັດ.</p></article>
        </div>
        <aside className={styles.problemStatement}>
          <span>ບັນຫາທີ່ເຮົາແກ້</span>
          <p>ຫຼຸດໄລຍະຫ່າງລະຫວ່າງ “ເຫັນແລ້ວສົນໃຈ” ກັບ “ຮູ້ພໍທີ່ຈະອອກໄປ”.</p>
        </aside>
      </section>

      <section className={`${styles.section} ${styles.product}`} id="product">
        <div className={styles.sectionIndex}>02</div>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>THE PRODUCT</p>
          <h2>ວິດີໂອເປັນຫຼັກຖານ.<br />Place Page ເປັນຊັ້ນຕັດສິນໃຈ.</h2>
          <p className={styles.sectionIntro}>ລອງປ່ຽນປະເພດດ້ານລຸ່ມ ເພື່ອເຫັນວ່າຂໍ້ມູນແລະ action ຈະປ່ຽນຕາມຈຸດປະສົງ.</p>
        </div>

        <div className={styles.interactiveDemo}>
          <div className={styles.demoControls} role="tablist" aria-label="ເລືອກປະເພດສະຖານທີ່">
            {(Object.keys(demoPlaces) as PlaceKey[]).map((key, index) => (
              <button
                key={key}
                role="tab"
                aria-selected={selectedPlace === key}
                className={selectedPlace === key ? styles.active : ""}
                onClick={() => { setSelectedPlace(key); setActionMessage("ລອງກົດການກະທຳໃນຕົວຢ່າງ"); }}
              >
                <span>0{index + 1}</span>{demoPlaces[key].label}
              </button>
            ))}
          </div>

          <div className={styles.liveDemo}>
            <div className={styles.demoPhone}>
              <div className={styles.phoneTop}><span>9:41</span><span>● ●</span></div>
              <div
                className={`${styles.videoScene} ${styles.productFeed} ${styles[place.scene]}`}
                style={{ backgroundImage: `url(${basePath}${place.image})` }}
              >
                <div className={styles.feedHeader}><span>ກຳລັງນິຍົມ　 ສຳລັບເຈົ້າ</span><b>⌕</b></div>
                <div className={styles.contentBadge}>ວິດີໂອຕົ້ນສະບັບ ↗</div>
                <div className={styles.play}>▶</div>
                <div className={styles.creator}>{place.creator} · ຣີວິວຕົ້ນສະບັບ</div>
                <div className={styles.placeCard}>
                  <div><small>{place.meta}</small><strong>{place.name}　›</strong></div>
                  <div className={styles.quickFacts}><span>ກວດສອບແລ້ວ</span><span>{place.price}</span><span>{place.distance}</span></div>
                  <div className={styles.miniMap}>
                    <i className={styles.mapRoadOne} /><i className={styles.mapRoadTwo} /><b>●</b>
                    <span><small>ຈຸດໝາຍ</small>ເບິ່ງເສັ້ນທາງ</span>
                  </div>
                  <div className={styles.phoneActions}>
                    <button onClick={() => demonstrateAction(place.contact)}>{place.contact}</button>
                    <button onClick={() => demonstrateAction("ເປີດແຜນທີ່")}>ແຜນທີ່</button>
                  </div>
                </div>
                <div className={styles.bottomNav}><b>⌂<small>ສຳຫຼວດ</small></b><b>⌕<small>ຄົ້ນຫາ</small></b><b>＋</b><b>♧<small>ບັນທຶກ</small></b><b>○<small>ໂປຣໄຟລ໌</small></b></div>
              </div>
            </div>

            <div className={styles.demoExplanation} aria-live="polite">
              <span className={styles.liveBadge}>LIVE PRODUCT LOGIC</span>
              <h3>{place.name}</h3>
              <div className={styles.tagRow}>{place.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <p>{actionMessage}</p>
              <ol>
                <li><b>DISCOVER</b><span>ວິດີໂອດຶງຄວາມສົນໃຈ</span></li>
                <li><b>DECIDE</b><span>ຂໍ້ມູນຈັດໝວດໝູ່ຊ່ວຍປຽບທຽບ</span></li>
                <li><b>ACT</b><span>ຕິດຕໍ່ ຫຼືເດີນທາງໄດ້ທັນທີ</span></li>
              </ol>
            </div>
          </div>
        </div>

        <div className={styles.productEquation}>
          <span>VIDEO DISCOVERY</span><i>＋</i><span>VERIFIED PLACE DATA</span><i>＋</i><span>DIRECT ACTION</span><b>＝</b><strong>READY TO GO</strong>
        </div>
      </section>

      <section className={`${styles.section} ${styles.standard}`} id="standard">
        <div className={styles.sectionIndex}>03</div>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>THE STANDARD</p>
          <h2>ສິ່ງທີ່ແຍກ platform ນີ້ອອກຈາກ social media.</h2>
          <p className={styles.sectionIntro}>Content ທຸກອັນຕ້ອງຖືກເຊື່ອມກັບ Place ແລະມີຂໍ້ມູນຂັ້ນຕ່ຳກ່ອນຖືກເອີ້ນວ່າ “ພ້ອມໄປ”.</p>
        </div>

        <div className={styles.standardGrid}>
          {[
            ["01", "ພິກັດຖືກຕ້ອງ", "ຈຸດແຜນທີ່, ເສັ້ນທາງ ແລະໄລຍະຫ່າງ"],
            ["02", "ຂໍ້ມູນສຳລັບຕັດສິນໃຈ", "ເວລາ, ລາຄາ, ປະເພດ ແລະຄຸນລັກສະນະ"],
            ["03", "ຊ່ອງທາງຕິດຕໍ່", "ໂທ, Messenger, WhatsApp ຫຼືຊ່ອງທາງຫຼັກ"],
            ["04", "ຣີວິວມີທີ່ມາ", "Creator, platform, ວັນທີ ແລະ link ຕົ້ນສະບັບ"],
            ["05", "ການຈ້າງຕ້ອງເປີດເຜີຍ", "Sponsored content ແລະ organic review ບໍ່ຖືກປະປົນ"],
            ["06", "ຂໍ້ມູນມີອາຍຸ", "ສະແດງວັນກວດສອບ ແລະມີປຸ່ມແຈ້ງຂໍ້ມູນຜິດ"],
          ].map(([no, title, description]) => (
            <article key={no}><b>{no}</b><h3>{title}</h3><p>{description}</p><span>✓ REQUIRED</span></article>
          ))}
        </div>

        <div className={styles.dataModel}>
          <div><span>CORE ASSET</span><h3>Place database<br />ທີ່ແຂງແຮງ</h3></div>
          <ol>
            <li><b>PLACE</b><span>ສະຖານທີ່ແທ້ ແລະພິກັດ</span></li>
            <li><b>VIDEO REVIEW</b><span>URL, platform, creator ແລະວັນທີ</span></li>
            <li><b>TAXONOMY</b><span>ປະເພດ, ຈຸດປະສົງ ແລະຄຸນລັກສະນະ</span></li>
            <li><b>ACTION</b><span>ໂທ, ຂໍ້ຄວາມ, ແຜນທີ່ ແລະ link</span></li>
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ecosystem}`} id="ecosystem">
        <div className={styles.sectionIndex}>04</div>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>THE FLYWHEEL</p>
          <h2>Platform ເຕີບໄດ້ເມື່ອທຸກຝ່າຍໄດ້ຄຸນຄ່າ.</h2>
        </div>

        <div className={styles.flywheel}>
          <article><b>01</b><h3>Creator</h3><p>ສົ່ງ URL ແລະໄດ້ traffic, profile, analytics ແລະ campaign.</p></article>
          <div className={styles.arrow}>→</div>
          <article><b>02</b><h3>Platform</h3><p>ຈັບຄູ່ content ກັບ Place, ຕິດ tag ແລະກວດຂໍ້ມູນ.</p></article>
          <div className={styles.arrow}>→</div>
          <article><b>03</b><h3>User</h3><p>ຄົ້ນພົບ, ປຽບທຽບ, save ແລະຕິດຕໍ່ໄດ້ໄວ.</p></article>
          <div className={styles.arrow}>→</div>
          <article><b>04</b><h3>Business</h3><p>ໄດ້ qualified attention, contact intent ແລະຂໍ້ມູນຄວາມສົນໃຈ.</p></article>
        </div>

        <aside className={styles.coldStart}>
          <div><span>CONTENT COLD START</span><h3>Creator ມີຢູ່ແລ້ວ.<br />ເຮົາສ້າງລະບົບນຳເຂົ້າ.</h3></div>
          <ol>
            <li><b>1 ເມືອງ</b><span>ເລີ່ມຈາກວຽງຈັນ</span></li>
            <li><b>100 Places</b><span>ອາຫານ, ຄາເຟ ແລະສະຖານທີ່</span></li>
            <li><b>300–500 Videos</b><span>ຢ່າງໜ້ອຍ 2 creator ຕໍ່ Place</span></li>
            <li><b>4 ຊ່ອງທາງ</b><span>ຄັດເລືອກເອງ, creator, ຮ້ານ ແລະ user submission</span></li>
          </ol>
        </aside>
      </section>

      <section className={`${styles.section} ${styles.revenue}`} id="revenue">
        <div className={styles.sectionIndex}>05</div>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>THE BUSINESS MODEL</p>
          <h2>ຜູ້ໃຊ້ໃຊ້ຟຣີ.<br />ທຸລະກິດຈ່າຍເພື່ອ reach, tools ແລະ insight.</h2>
        </div>

        <div className={styles.revenueTabs} role="tablist" aria-label="ລຳດັບສ້າງລາຍຮັບ">
          {(Object.keys(revenueStages) as RevenueStage[]).map((key) => (
            <button key={key} role="tab" aria-selected={activeStage === key} className={activeStage === key ? styles.active : ""} onClick={() => setActiveStage(key)}>
              <span>{revenueStages[key].no}</span>{key === "launch" ? "LAUNCH" : key === "growth" ? "GROWTH" : "SCALE"}
            </button>
          ))}
        </div>

        <div className={styles.revenuePanel}>
          <div><span>PHASE {revenueStages[activeStage].no}</span><h3>{revenueStages[activeStage].title}</h3><p>{revenueStages[activeStage].description}</p></div>
          <ul>{revenueStages[activeStage].items.map((item) => <li key={item}>{item}</li>)}</ul>
          <strong>{revenueStages[activeStage].signal}</strong>
        </div>

        <div className={styles.revenueModels}>
          <article><span>RECURRING</span><h3>Pro Business</h3><p>Verified profile, ແກ້ຂໍ້ມູນ, promotion ແລະ analytics ແບບລາຍເດືອນ.</p></article>
          <article><span>CAMPAIGN</span><h3>Sponsored placement</h3><p>ເພີ່ມ reach ໃນ feed ຫຼື collection ໂດຍຕິດປ້າຍ paid content ຊັດເຈນ.</p></article>
          <article><span>COMMISSION</span><h3>Creator marketplace</h3><p>ຈັບຄູ່ຮ້ານກັບ creator ແລະເກັບຄ່າບໍລິຫານ campaign.</p></article>
          <article><span>LATER</span><h3>Affiliate & booking</h3><p>ສົ່ງ transaction ໃຫ້ພາຍນອກກ່ອນ; ຄ່ອຍສ້າງ booking ເມື່ອ demand ຊັດ.</p></article>
        </div>

        <div className={styles.calculator}>
          <div className={styles.calculatorIntro}>
            <span>INTERACTIVE · BREAK-EVEN SANDBOX</span>
            <h3>ລອງປ່ຽນຕົວເລກ</h3>
            <p>ແບບຈຳລອງນີ້ໃຊ້ Pro Business 200,000 ກີບ/ເດືອນ ແລະ campaign 1,000,000 ກີບ. ເປັນພຽງ pricing hypothesis ສຳລັບທົດສອບ.</p>
          </div>
          <div className={styles.sliders}>
            <label><span>Pro Business partners <b>{partners}</b></span><input type="range" min="0" max="80" step="1" value={partners} onChange={(event) => setPartners(Number(event.target.value))} /></label>
            <label><span>Sponsored campaigns / ເດືອນ <b>{campaigns}</b></span><input type="range" min="0" max="12" step="1" value={campaigns} onChange={(event) => setCampaigns(Number(event.target.value))} /></label>
            <label><span>ລາຍຈ່າຍຕໍ່ເດືອນ <b>{formatKip(operatingCost)}</b></span><input type="range" min="2000000" max="20000000" step="500000" value={operatingCost} onChange={(event) => setOperatingCost(Number(event.target.value))} /></label>
          </div>
          <div className={styles.calculatorResult}>
            <span>{resultLabel}</span>
            <b>{formatKip(monthlyRevenue)}</b>
            <small>ລາຍຮັບຈຳລອງ / ເດືອນ</small>
            <p>{operatingResult >= 0 ? `ເຫຼືອຫຼັງລາຍຈ່າຍ ${formatKip(operatingResult)}` : `ຍັງຂາດ ${formatKip(Math.abs(operatingResult))}`}</p>
            <em>ຢ່າງໜ້ອຍ {breakEvenPartners} Pro partners ເມື່ອມີ {campaigns} campaigns</em>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.leanTech}`} id="cost">
        <div className={styles.sectionIndex}>06</div>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>LEAN INFRASTRUCTURE</p>
          <h2>Platform ວິດີໂອ<br />ບໍ່ຈຳເປັນຕ້ອງແບກຄ່າ video hosting.</h2>
        </div>

        <div className={styles.techFlow}>
          <article><b>STORE</b><h3>URL + Place data</h3><p>ເກັບ canonical URL, platform ID, tags, contact ແລະສະຖິຕິ.</p></article>
          <i>→</i>
          <article><b>PLAY</b><h3>Official embed</h3><p>TikTok ແລະ YouTube ເປັນຜູ້ສົ່ງ video stream ໃຫ້ viewer.</p></article>
          <i>→</i>
          <article><b>OPTIMIZE</b><h3>Lazy load</h3><p>Load ສະເພາະວິດີໂອປັດຈຸບັນ ແລະ preload ອີກພຽງໜຶ່ງ.</p></article>
        </div>

        <div className={styles.costTruth}>
          <div><span>ຄ່າໃຊ້ຈ່າຍທີ່ຄວນກັງວົນກວ່າ</span><h3>ບໍ່ແມ່ນ server.<br />ແຕ່ແມ່ນ operation.</h3></div>
          <ul><li>ຄັດເລືອກ ແລະກວດ content</li><li>ກວດຂໍ້ມູນຮ້ານໃຫ້ທັນສະໄໝ</li><li>ຫາຜູ້ໃຊ້ ແລະ creator</li><li>ຂາຍ package ໃຫ້ທຸລະກິດ</li></ul>
        </div>
        <p className={styles.techSources}>Technical references: <a href="https://developers.tiktok.com/docs/en/embed-videos" target="_blank" rel="noreferrer">TikTok Embed ↗</a> · <a href="https://developers.google.com/youtube/iframe_api_reference" target="_blank" rel="noreferrer">YouTube IFrame API ↗</a> · <a href="https://developers.cloudflare.com/pages/functions/pricing/" target="_blank" rel="noreferrer">Cloudflare Pages ↗</a></p>
      </section>

      <section className={`${styles.section} ${styles.roadmap}`} id="roadmap">
        <div className={styles.sectionIndex}>07</div>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>THE ROADMAP</p>
          <h2>ເລີ່ມນ້ອຍ.<br />ພິສູດສອງຕະຫຼາດພ້ອມກັນ.</h2>
          <p className={styles.sectionIntro}>ບໍ່ພຽງແຕ່ພິສູດວ່າ user ຢາກໃຊ້; ຕ້ອງພິສູດວ່າຮ້ານຍອມຈ່າຍ.</p>
        </div>

        <div className={styles.timeline}>
          <article><span>0–4 ອາທິດ</span><b>01</b><h3>Prototype</h3><ul><li>1 ເມືອງ</li><li>30 Places</li><li>100 video links</li><li>ສຳພາດ user 30 ຄົນ</li></ul></article>
          <article><span>1–3 ເດືອນ</span><b>02</b><h3>Curated MVP</h3><ul><li>100 Places</li><li>300–500 videos</li><li>Search + filters</li><li>Map + direct contact</li></ul></article>
          <article><span>3–6 ເດືອນ</span><b>03</b><h3>Revenue test</h3><ul><li>Founding Partners</li><li>Sponsored placement</li><li>Business analytics</li><li>Creator submissions</li></ul></article>
          <article><span>ຫຼັງພິສູດ demand</span><b>04</b><h3>Scale</h3><ul><li>ເພີ່ມເມືອງ</li><li>Pro subscription</li><li>Creator marketplace</li><li>Affiliate / booking ສະເພາະຈຸດ</li></ul></article>
        </div>

        <div className={styles.metrics}>
          <span>NORTH STAR</span>
          <h3>ບໍ່ວັດພຽງ watch time.<br />ວັດການຕັດສິນໃຈທີ່ສຳເລັດ.</h3>
          <div><b>SAVE</b><b>SHARE</b><b>MAP CLICK</b><b>CALL / MESSAGE</b><b>RETURN VISIT</b></div>
        </div>
      </section>

      <section className={styles.close}>
        <p>ONE-LINE PITCH</p>
        <h2>ຄົ້ນຫາວິດີໂອຣີວິວ.<br />ຮູ້ທຸກຢ່າງທີ່ຕ້ອງຮູ້.<br /><span>ແລ້ວອອກໄປ.</span></h2>
        <div className={styles.closeFooter}><strong>ພ້ອມ<span>ໄປ</span></strong><small>Working concept · Laos · 2026</small><a href="#top">ກັບໄປດ້ານເທິງ ↑</a></div>
      </section>
    </main>
  );
}
