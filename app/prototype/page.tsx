"use client";

import { useMemo, useState } from "react";
import styles from "./prototype.module.css";

type Screen = "discover" | "search" | "place";
type Place = {
  id: string;
  name: string;
  category: "restaurant" | "cafe";
  categoryLabel: string;
  district: string;
  price: string;
  hours: string;
  checked: string;
  creator: string;
  image: string;
  sponsored?: boolean;
  sourceAvailable?: boolean;
};

const places: Place[] = [
  { id: "p01", name: "ເຮືອນຄົວວຽງ", category: "restaurant", categoryLabel: "ຮ້ານອາຫານລາວ", district: "ສີສັດຕະນາກ", price: "₭₭", hours: "ເປີດຮອດ 21:30", checked: "ກວດຫຼ້າສຸດ 20 ສິງຫາ", creator: "@lao.food.story", image: "/platform-food.jpg", sourceAvailable: true },
  { id: "p02", name: "ຄາເຟແຄມຂອງ", category: "cafe", categoryLabel: "ຮ້ານກາເຟ", district: "ຈັນທະບູລີ", price: "₭₭", hours: "ເປີດຮອດ 21:00", checked: "ກວດຫຼ້າສຸດ 18 ສິງຫາ", creator: "@slowday.vte", image: "/platform-cafe.jpg", sponsored: true, sourceAvailable: true },
  { id: "p03", name: "ສວນກາເຟເຊົ້າ", category: "cafe", categoryLabel: "ຮ້ານກາເຟ", district: "ໄຊເສດຖາ", price: "ຍັງບໍ່ຮູ້ລາຄາ", hours: "ຂໍ້ມູນເວລາອາດເກົ່າ", checked: "ກວດຫຼ້າສຸດ 2 ເດືອນກ່ອນ", creator: "@morning.lao", image: "/laos-weaver.jpg", sourceAvailable: false },
];

export default function InteractivePrototype() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [screen, setScreen] = useState<Screen>("discover");
  const [returnScreen, setReturnScreen] = useState<Exclude<Screen, "place">>("discover");
  const [selectedId, setSelectedId] = useState("p01");
  const [feedIndex, setFeedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "restaurant" | "cafe">("all");
  const [notice, setNotice] = useState("Prototype ພ້ອມສຳລັບລອງ 5 tasks");
  const [analytics, setAnalytics] = useState<"pending" | "essential" | "allowed">("pending");
  const [showTasks, setShowTasks] = useState(false);

  const selected = places.find((place) => place.id === selectedId) ?? places[0];
  const feedPlace = places[feedIndex];
  const results = useMemo(() => places.filter((place) => {
    const matchesFilter = filter === "all" || place.category === filter;
    const normalized = query.trim().toLowerCase();
    const matchesQuery = !normalized || `${place.name} ${place.categoryLabel} ${place.district}`.toLowerCase().includes(normalized);
    return matchesFilter && matchesQuery;
  }), [filter, query]);

  const openPlace = (place: Place) => {
    setSelectedId(place.id);
    if (screen !== "place") setReturnScreen(screen);
    setScreen("place");
    setNotice(`ເປີດ Place: ${place.name}`);
  };

  const returnFromPlace = () => {
    setScreen(returnScreen);
    setNotice(returnScreen === "search" ? "ກັບຄືນຫາ Search — ຄຳຄົ້ນ ແລະຕົວກອງຍັງຢູ່" : "ກັບຄືນຫາ Discover");
  };

  const moveFeed = (direction: -1 | 1) => {
    const nextIndex = (feedIndex + direction + places.length) % places.length;
    setFeedIndex(nextIndex);
    setNotice(`ເລື່ອນໄປລາຍການ ${nextIndex + 1} ຈາກ ${places.length}`);
  };

  const act = (label: string, place: Place) => setNotice(`${label}: ${place.name} — Prototype ບໍ່ເປີດແອັບພາຍນອກ`);

  return <main className={styles.stage}>
    <header className={styles.prototypeHeader}>
      <div><strong>ພ້ອມໄປ · UX-03</strong><span>INTERACTIVE TEST PROTOTYPE · NOT PRODUCTION</span></div>
      <nav><button onClick={() => setShowTasks((value) => !value)}>{showTasks ? "ປິດ Tasks" : "ເບິ່ງ 5 Tasks"}</button><a href={`${basePath}/documents/interactive-prototype`}>ກັບເອກະສານ</a></nav>
    </header>

    {showTasks ? <aside className={styles.tasks} aria-label="Usability test tasks"><strong>ລອງໂດຍບໍ່ມີຄົນບອກປຸ່ມ</strong><ol><li>ຫາຮ້ານກາເຟຕາມເຂດ/ລາຄາ</li><li>ກວດເວລາ ແລະສະຖານທີ່</li><li>ກົດເປີດແຜນທີ່</li><li>ຊີ້ວ່າລາຍການໃດເປັນໂຄສະນາ</li><li>ໄປຕໍ່ເມື່ອວິດີໂອເບິ່ງບໍ່ໄດ້</li></ol></aside> : null}

    <section className={styles.device} aria-label="Mobile application prototype">
      <div className={styles.statusBar}><span>9:41</span><span>● ●</span></div>

      {screen === "discover" ? <section className={styles.feed} style={{ backgroundImage: `linear-gradient(180deg, rgba(5,12,17,.08), rgba(5,12,17,.9)), url(${basePath}${feedPlace.image})` }}>
        <div className={styles.feedTop}><strong>ສຳຫຼວດ</strong><button aria-label="ເປີດຄົ້ນຫາ" onClick={() => setScreen("search")}>⌕</button></div>
        {!feedPlace.sourceAvailable ? <div className={styles.fallback}><b>ວິດີໂອເບິ່ງບໍ່ໄດ້</b><span>ຂໍ້ມູນ Place ຍັງເບິ່ງໄດ້</span><button onClick={() => openPlace(feedPlace)}>ເບິ່ງຂໍ້ມູນຮ້ານ</button></div> : <button className={styles.play} aria-label="ຈຳລອງຫຼິ້ນວິດີໂອ" onClick={() => setNotice("ຈຳລອງການຫຼິ້ນວິດີໂອ")}>▶</button>}
        <div className={styles.feedContent}>
          {feedPlace.sponsored ? <span className={styles.sponsored}>ໂຄສະນາ — ຮ້ານຈ່າຍເພື່ອສະແດງ</span> : <span className={styles.source}>ແຫຼ່ງຣີວິວ · {feedPlace.creator}</span>}
          <button className={styles.placeTitle} onClick={() => openPlace(feedPlace)}><strong>{feedPlace.name}</strong><span>{feedPlace.categoryLabel} · {feedPlace.district} · {feedPlace.price}</span><small>{feedPlace.checked}</small></button>
          <div className={styles.actionRow}><button onClick={() => act("ແຜນທີ່", feedPlace)}>⌖<span>ແຜນທີ່</span></button><button onClick={() => act("ໂທ", feedPlace)}>☎<span>ໂທ</span></button><button onClick={() => act("ຂໍ້ຄວາມ", feedPlace)}>◫<span>ຂໍ້ຄວາມ</span></button><button onClick={() => openPlace(feedPlace)}>ⓘ<span>ຂໍ້ມູນ</span></button></div>
          <div className={styles.feedPager}><button aria-label="ລາຍການກ່ອນ" onClick={() => moveFeed(-1)}>↑</button><span>{feedIndex + 1}/{places.length}</span><button aria-label="ລາຍການຖັດໄປ" onClick={() => moveFeed(1)}>↓</button></div>
        </div>
      </section> : null}

      {screen === "search" ? <section className={styles.lightScreen}>
        <header className={styles.screenHeader}><h1>ຄົ້ນຫາ</h1><button onClick={() => setScreen("discover")}>ປິດ</button></header>
        <label className={styles.searchBox}><span className={styles.srOnly}>ຄົ້ນຫາຊື່ຮ້ານ ຫຼືເຂດ</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ຊື່ຮ້ານ, ເຂດ..."/><button onClick={() => setQuery("")} aria-label="ລຶບຄຳຄົ້ນ">×</button></label>
        <div className={styles.chips} aria-label="ກອງປະເພດ">{(["all", "restaurant", "cafe"] as const).map((value) => <button key={value} className={filter === value ? styles.activeChip : ""} onClick={() => setFilter(value)}>{value === "all" ? "ທັງໝົດ" : value === "restaurant" ? "ຮ້ານອາຫານ" : "ຮ້ານກາເຟ"}</button>)}</div>
        <p className={styles.resultCount}>{results.length} ຜົນການຄົ້ນຫາ</p>
        <div className={styles.results}>{results.length ? results.map((place) => <button className={styles.resultCard} key={place.id} onClick={() => openPlace(place)}><i className={styles.resultImage} aria-hidden="true" style={{ backgroundImage: `url(${basePath}${place.image})` }}/><span><strong>{place.name}</strong><small>{place.categoryLabel} · {place.district}</small><em>{place.price} · {place.checked}</em>{place.sponsored ? <b>ໂຄສະນາ</b> : null}</span></button>) : <div className={styles.empty}><strong>ບໍ່ພົບຮ້ານທີ່ກົງ</strong><p>ລອງລຶບຄຳຄົ້ນ ຫຼືປ່ຽນປະເພດ.</p><button onClick={() => { setQuery(""); setFilter("all"); }}>ລ້າງຕົວກອງ</button></div>}</div>
      </section> : null}

      {screen === "place" ? <section className={styles.lightScreen}>
        <header className={styles.placeHero} style={{ backgroundImage: `linear-gradient(180deg, rgba(5,12,17,.1), rgba(5,12,17,.85)), url(${basePath}${selected.image})` }}><button onClick={returnFromPlace}>← ກັບ</button>{selected.sponsored ? <span>ໂຄສະນາ</span> : null}<div><small>{selected.categoryLabel}</small><h1>{selected.name}</h1><p>{selected.district} · {selected.price}</p></div></header>
        <div className={styles.placeActions}><button onClick={() => act("ແຜນທີ່", selected)}>⌖ ແຜນທີ່</button><button onClick={() => act("ໂທ", selected)}>☎ ໂທ</button><button onClick={() => act("ຂໍ້ຄວາມ", selected)}>◫ ຂໍ້ຄວາມ</button></div>
        <div className={styles.placeBody}><section><h2>ຂໍ້ມູນສຳລັບຕັດສິນໃຈ</h2><dl><div><dt>ເວລາ</dt><dd>{selected.hours}</dd></div><div><dt>ລາຄາ</dt><dd>{selected.price}</dd></div><div><dt>ຄວາມສົດໃໝ່</dt><dd>{selected.checked}</dd></div></dl></section><section><h2>ແຫຼ່ງຣີວິວ</h2>{selected.sourceAvailable ? <button className={styles.sourceCard} onClick={() => setNotice(`ເປີດ original source ຂອງ ${selected.creator}`)}><strong>{selected.creator}</strong><span>Original social source ↗</span></button> : <div className={styles.sourceMissing}><strong>Source ຖືກລົບ ຫຼືເບິ່ງບໍ່ໄດ້</strong><span>Place facts ຍັງສະແດງຕາມຫຼັກຖານທີ່ກວດໄດ້.</span></div>}</section><button className={styles.correction} onClick={() => setNotice("Correction form → ຈະສ້າງ Case ID; ບໍ່ auto-publish")}>ແຈ້ງຂໍ້ມູນຜິດ</button></div>
      </section> : null}

      {screen !== "place" ? <nav className={styles.bottomNav} aria-label="Prototype navigation"><button className={screen === "discover" ? styles.navActive : ""} onClick={() => setScreen("discover")}><b>⌂</b><span>ສຳຫຼວດ</span></button><button className={screen === "search" ? styles.navActive : ""} onClick={() => setScreen("search")}><b>⌕</b><span>ຄົ້ນຫາ</span></button></nav> : null}
      {analytics === "pending" ? <div className={styles.consent}><strong>ການວັດການນຳໃຊ້</strong><p>Prototype ຈະຈຳລອງ analytics choice; ບໍ່ໄດ້ບັນທຶກ task ຂອງທ່ານ.</p><div><button onClick={() => setAnalytics("essential")}>ໃຊ້ສະເພາະທີ່ຈຳເປັນ</button><button onClick={() => setAnalytics("allowed")}>ອະນຸຍາດ Analytics</button></div></div> : null}
    </section>

    <p className={styles.notice} role="status">{notice} · Consent: {analytics}</p>
  </main>;
}
