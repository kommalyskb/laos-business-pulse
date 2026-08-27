"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  rating: string;
  reviewCount: number;
  distance: string;
  tags: string[];
  reviewCreators: string[];
  menu: { name: string; price: string; image: string }[];
  sponsored?: boolean;
  sourceAvailable?: boolean;
};

const places: Place[] = [
  { id: "p01", name: "ເຮືອນຄົວວຽງ", category: "restaurant", categoryLabel: "ຮ້ານອາຫານລາວ", district: "ສີສັດຕະນາກ", price: "₭₭", hours: "ເປີດຮອດ 21:30", checked: "ກວດຫຼ້າສຸດ 20 ສິງຫາ", creator: "@lao.food.story", image: "/platform-food.jpg", rating: "4.6", reviewCount: 128, distance: "2.4 km", tags: ["ອາຫານລາວ", "ຄອບຄົວ", "ມີບ່ອນຈອດລົດ"], reviewCreators: ["@lao.food.story", "@kinyang.vte", "@where2eat.la"], menu: [{ name: "ເອາະຫຼາມ", price: "65,000 ₭", image: "/platform-food.jpg" }, { name: "ລາບປານ້ຳຂອງ", price: "75,000 ₭", image: "/laos-weaver.jpg" }, { name: "ຕຳໝາກຫຸ່ງ", price: "35,000 ₭", image: "/platform-cafe.jpg" }], sourceAvailable: true },
  { id: "p02", name: "ຄາເຟແຄມຂອງ", category: "cafe", categoryLabel: "ຮ້ານກາເຟ", district: "ຈັນທະບູລີ", price: "₭₭", hours: "ເປີດຮອດ 21:00", checked: "ກວດຫຼ້າສຸດ 18 ສິງຫາ", creator: "@slowday.vte", image: "/platform-cafe.jpg", rating: "4.4", reviewCount: 86, distance: "1.1 km", tags: ["ວິວແຄມຂອງ", "ນັ່ງເຮັດວຽກ", "ເປີດເດິກ"], reviewCreators: ["@slowday.vte", "@cafehopping.la", "@vte.weekend"], menu: [{ name: "Lao Cold Brew", price: "38,000 ₭", image: "/platform-cafe.jpg" }, { name: "Coconut Latte", price: "42,000 ₭", image: "/platform-food.jpg" }, { name: "Croissant", price: "28,000 ₭", image: "/laos-weaver.jpg" }], sponsored: true, sourceAvailable: true },
  { id: "p03", name: "ສວນກາເຟເຊົ້າ", category: "cafe", categoryLabel: "ຮ້ານກາເຟ", district: "ໄຊເສດຖາ", price: "ຍັງບໍ່ຮູ້ລາຄາ", hours: "ຂໍ້ມູນເວລາອາດເກົ່າ", checked: "ກວດຫຼ້າສຸດ 2 ເດືອນກ່ອນ", creator: "@morning.lao", image: "/laos-weaver.jpg", rating: "4.1", reviewCount: 34, distance: "4.8 km", tags: ["ສວນ", "ງຽບ", "ກາເຟເຊົ້າ"], reviewCreators: ["@morning.lao"], menu: [{ name: "Americano", price: "ລໍກວດສອບ", image: "/platform-cafe.jpg" }, { name: "ຊາດອກໄມ້", price: "ລໍກວດສອບ", image: "/laos-weaver.jpg" }], sourceAvailable: false },
];

export default function InteractivePrototype() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [screen, setScreen] = useState<Screen>("discover");
  const [returnScreen, setReturnScreen] = useState<Exclude<Screen, "place">>("discover");
  const [selectedId, setSelectedId] = useState("p01");
  const [feedIndex, setFeedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "restaurant" | "cafe">("all");
  const [resultView, setResultView] = useState<"video" | "list" | "map">("video");
  const [notice, setNotice] = useState("Founder Review R2 ຜ່ານ · Prototype R2.1 ເພີ່ມຮູບໃນເມນູແລ້ວ");
  const [analytics, setAnalytics] = useState<"pending" | "essential" | "allowed">("pending");
  const [showTasks, setShowTasks] = useState(false);
  const essentialConsentRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (analytics === "pending") essentialConsentRef.current?.focus();
  }, [analytics]);

  const selected = places.find((place) => place.id === selectedId) ?? places[0];
  const relatedPlaces = places.filter((place) => place.id !== selected.id).slice(0, 2);
  const feedPlace = places[feedIndex];
  const results = useMemo(() => places.filter((place) => {
    const matchesFilter = filter === "all" || place.category === filter;
    const normalized = query.trim().toLowerCase();
    const intentMatch = normalized === "ໃກ້ຂ້ອຍ"
      || (normalized === "ເປີດເດິກ" && place.tags.includes("ເປີດເດິກ"))
      || (normalized === "ຄອບຄົວ" && place.tags.includes("ຄອບຄົວ"))
      || (normalized === "ງົບ ₭₭" && place.price === "₭₭");
    const searchable = `${place.name} ${place.categoryLabel} ${place.district} ${place.price} ${place.hours} ${place.tags.join(" ")}`.toLowerCase();
    const matchesQuery = !normalized || intentMatch || searchable.includes(normalized);
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

  const chooseAnalytics = (choice: "essential" | "allowed") => {
    setAnalytics(choice);
    setNotice(choice === "essential" ? "ເລືອກໃຊ້ສະເພາະຂໍ້ມູນທີ່ຈຳເປັນ" : "ອະນຸຍາດ Analytics ສຳລັບ Prototype");
  };

  return <main className={styles.stage}>
    <header className={styles.prototypeHeader}>
      <div><strong>ພ້ອມໄປ · UX-03</strong><span>PROTOTYPE R2.1 · NOT PRODUCTION</span></div>
      <nav><button onClick={() => setShowTasks((value) => !value)}>{showTasks ? "ປິດຜົນທົບທວນ" : "Founder Review R2 · ຜົນ"}</button><a href={`${basePath}/documents/interactive-prototype`}>ກັບເອກະສານ</a></nav>
    </header>

    {showTasks ? <aside className={styles.tasks} aria-label="Founder review results"><strong>Founder Review R2 · ຜ່ານໂດຍມີ 1 Minor Revision</strong><ol><li><b>ຜ່ານ:</b> Platform ມີຄວາມແຕກຕ່າງຊັດ.</li><li><b>ຜ່ານໃນລະດັບໜຶ່ງ:</b> Search ຊ່ວຍຄົ້ນ ແລະປຽບທຽບໄດ້.</li><li><b>ຜ່ານຫຼັງແກ້:</b> Place Page ຂໍ້ມູນຄົບ; Prototype R2.1 ເພີ່ມຮູບໃນເມນູແລ້ວ.</li><li><b>ຜ່ານ:</b> Sponsored, rating/source ແລະ checked date ແຍກຊັດ.</li><li><b>ຜ່ານ:</b> MVP scope ໂດຍລວມເໝາະສົມ.</li></ol><p>ຜົນນີ້ເປັນ Founder/Product Review; external usability evidence ຍັງບໍ່ທັນເລີ່ມ.</p></aside> : null}

    <section className={styles.device} aria-label="Mobile application prototype">
      <div className={styles.prototypeSurface} inert={analytics === "pending"} aria-hidden={analytics === "pending"}>
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
        <header className={styles.screenHeader}><div><span>ຄົ້ນຫາຈາກຣີວິວຈິງ</span><h1>ມື້ນີ້ຢາກໄປໃສ?</h1></div><button onClick={() => setScreen("discover")}>ປິດ</button></header>
        <label className={styles.searchBox}><span className={styles.srOnly}>ຄົ້ນຫາຊື່ຮ້ານ ເຂດ ຫຼືຄວາມຕ້ອງການ</span><b aria-hidden="true">⌕</b><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ເຊັ່ນ: ຮ້ານຄອບຄົວ ເປີດເດິກ..."/><button onClick={() => setQuery("")} aria-label="ລຶບຄຳຄົ້ນ">×</button></label>
        <div className={styles.intentRail} aria-label="ຄຳຄົ້ນແນະນຳ"><button onClick={() => setQuery("ໃກ້ຂ້ອຍ")}>⌖ ໃກ້ຂ້ອຍ</button><button onClick={() => setQuery("ເປີດເດິກ")}>☾ ເປີດເດິກ</button><button onClick={() => setQuery("ຄອບຄົວ")}>♙ ສຳລັບຄອບຄົວ</button><button onClick={() => setQuery("ງົບ ₭₭")}>₭ ງົບ ₭₭</button></div>
        <div className={styles.chips} aria-label="ກອງປະເພດ">{(["all", "restaurant", "cafe"] as const).map((value) => <button key={value} className={filter === value ? styles.activeChip : ""} onClick={() => setFilter(value)}>{value === "all" ? "ທັງໝົດ" : value === "restaurant" ? "ຮ້ານອາຫານ" : "ຮ້ານກາເຟ"}</button>)}</div>
        <div className={styles.resultTools}><p><strong>ແນະນຳສຳລັບທ່ານ</strong><span>{results.length} ສະຖານທີ່</span></p><div aria-label="ຮູບແບບຜົນຄົ້ນຫາ">{(["video", "list", "map"] as const).map((view) => <button key={view} className={resultView === view ? styles.activeView : ""} onClick={() => setResultView(view)}>{view === "video" ? "▶" : view === "list" ? "☷" : "⌖"}<span className={styles.srOnly}>{view}</span></button>)}</div></div>
        {resultView === "map" ? <div className={styles.mapPreview}><span>ແຜນທີ່ຈຳລອງ</span>{results.map((place, index) => <button key={place.id} style={{ left: `${20 + index * 28}%`, top: `${25 + (index % 2) * 35}%` }} onClick={() => openPlace(place)}>⌖<small>{place.name}</small></button>)}</div> : <div className={resultView === "video" ? styles.videoResults : styles.results}>{results.length ? results.map((place) => <button className={resultView === "video" ? styles.videoResultCard : styles.resultCard} key={place.id} onClick={() => openPlace(place)}><i className={styles.resultImage} aria-hidden="true" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(5,12,17,.82)), url(${basePath}${place.image})` }}>{resultView === "video" ? <em>▶</em> : null}</i><span><strong>{place.name}</strong><small>{place.categoryLabel} · {place.district}</small><em>★ {place.rating} · {place.reviewCount} ຄຳເຫັນ · {place.distance}</em><small>{place.price} · {place.checked}</small>{place.sponsored ? <b>ໂຄສະນາ</b> : <i>{place.tags.slice(0, 2).join(" · ")}</i>}</span></button>) : <div className={styles.empty}><strong>ບໍ່ພົບຮ້ານທີ່ກົງ</strong><p>ລອງລຶບຄຳຄົ້ນ ຫຼືປ່ຽນປະເພດ.</p><button onClick={() => { setQuery(""); setFilter("all"); }}>ລ້າງຕົວກອງ</button></div>}</div>}
      </section> : null}

      {screen === "place" ? <section className={styles.lightScreen}>
        <header className={styles.placeHero} style={{ backgroundImage: `linear-gradient(180deg, rgba(5,12,17,.08), rgba(5,12,17,.9)), url(${basePath}${selected.image})` }}><button onClick={returnFromPlace}>← ກັບ</button>{selected.sponsored ? <span>ໂຄສະນາ — ຮ້ານຈ່າຍ</span> : null}<button className={styles.heroPlay} onClick={() => setNotice(`ຫຼິ້ນຣີວິວຫຼັກຈາກ ${selected.creator}`)} aria-label="ຫຼິ້ນວິດີໂອຣີວິວ">▶</button><div><small>{selected.categoryLabel}</small><h1>{selected.name}</h1><p>{selected.district} · {selected.price} · {selected.distance}</p><b>★ {selected.rating} <span>({selected.reviewCount} ຄຳເຫັນຈາກແຫຼ່ງອ້າງອີງ)</span></b></div></header>
        <div className={styles.placeActions}><button onClick={() => act("ແຜນທີ່", selected)}>⌖<span>ແຜນທີ່</span></button><button onClick={() => act("ໂທ", selected)}>☎<span>ໂທ</span></button><button onClick={() => act("ຂໍ້ຄວາມ", selected)}>◫<span>ຂໍ້ຄວາມ</span></button><button onClick={() => act("ບັນທຶກ", selected)}>♡<span>ບັນທຶກ</span></button></div>
        <div className={styles.placeBody}>
          <section className={styles.decisionCard}><div><span>ສະຖານະ</span><strong>{selected.hours}</strong></div><div><span>ລາຄາ</span><strong>{selected.price}</strong></div><div><span>ໄລຍະທາງ</span><strong>{selected.distance}</strong></div><small>{selected.checked} · ລາຄາແມ່ນຂໍ້ມູນອ້າງອີງ</small></section>
          <section><div className={styles.sectionTitle}><div><span>VIDEO REVIEWS</span><h2>ຄົນອື່ນເວົ້າແນວໃດ?</h2></div><button onClick={() => setNotice("ສະແດງຣີວິວທັງໝົດ")}>ເບິ່ງທັງໝົດ</button></div><div className={styles.reviewRail}>{selected.reviewCreators.map((creator, index) => <button key={creator} onClick={() => setNotice(`ເປີດ original source ຂອງ ${creator}`)} style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(5,12,17,.86)), url(${basePath}${index % 2 ? "/platform-cafe.jpg" : selected.image})` }}><i>▶</i><span><strong>{creator}</strong><small>Original review ↗</small></span></button>)}</div></section>
          <section><div className={styles.sectionTitle}><div><span>DETAILS</span><h2>{selected.category === "restaurant" ? "ເມນູ ແລະລາຄາ" : "ເມນູແນະນຳ"}</h2></div><button onClick={() => setNotice("ສະແດງເມນູທັງໝົດ")}>ເບິ່ງເມນູ</button></div><div className={styles.menuList}>{selected.menu.map((item) => <div key={item.name}><i aria-hidden="true" style={{ backgroundImage: `url(${basePath}${item.image})` }}/><span><b>{item.name}</b><small>ຮູບຕົວຢ່າງ · Prototype</small></span><strong>{item.price}</strong></div>)}</div><p className={styles.freshness}>ຮູບ ແລະລາຄາເປັນຂໍ້ມູນຕົວຢ່າງ · {selected.checked}</p></section>
          <section><h2>ເໝາະກັບໃຜ?</h2><div className={styles.tagList}>{selected.tags.map((tag) => <span key={tag}>✓ {tag}</span>)}</div></section>
          <section><h2>ແຫຼ່ງຣີວິວ ແລະຄວາມໂປ່ງໃສ</h2>{selected.sourceAvailable ? <button className={styles.sourceCard} onClick={() => setNotice(`ເປີດ original source ຂອງ ${selected.creator}`)}><span><strong>{selected.creator}</strong><small>ຜູ້ສ້າງຣີວິວຕົ້ນສະບັບ</small></span><b>ເປີດຕົ້ນສະບັບ ↗</b></button> : <div className={styles.sourceMissing}><strong>Source ຖືກລົບ ຫຼືເບິ່ງບໍ່ໄດ້</strong><span>Place facts ຍັງສະແດງຕາມຫຼັກຖານທີ່ກວດໄດ້.</span></div>}</section>
          <section><div className={styles.sectionTitle}><div><span>DISCOVER MORE</span><h2>ຮ້ານທີ່ຄ້າຍຄືກັນ</h2></div></div><div className={styles.relatedGrid}>{relatedPlaces.map((place) => <button key={place.id} onClick={() => openPlace(place)}><i style={{ backgroundImage: `url(${basePath}${place.image})` }}/><span><strong>{place.name}</strong><small>★ {place.rating} · {place.distance}</small></span></button>)}</div></section>
          <button className={styles.correction} onClick={() => setNotice("Correction form → ຈະສ້າງ Case ID; ບໍ່ auto-publish")}>ຂໍ້ມູນບໍ່ຖືກຕ້ອງ? ແຈ້ງໃຫ້ພວກເຮົາ</button>
        </div>
      </section> : null}

      {screen !== "place" ? <nav className={styles.bottomNav} aria-label="Prototype navigation"><button className={screen === "discover" ? styles.navActive : ""} onClick={() => setScreen("discover")}><b>⌂</b><span>ສຳຫຼວດ</span></button><button className={screen === "search" ? styles.navActive : ""} onClick={() => setScreen("search")}><b>⌕</b><span>ຄົ້ນຫາ</span></button></nav> : null}
      </div>
      {analytics === "pending" ? <div className={styles.consent} role="dialog" aria-modal="true" aria-labelledby="analytics-consent-title"><strong id="analytics-consent-title">ການວັດການນຳໃຊ້</strong><p>Prototype ຈະຈຳລອງ analytics choice; ບໍ່ໄດ້ບັນທຶກ task ຂອງທ່ານ.</p><div><button ref={essentialConsentRef} onClick={() => chooseAnalytics("essential")}>ໃຊ້ສະເພາະທີ່ຈຳເປັນ</button><button onClick={() => chooseAnalytics("allowed")}>ອະນຸຍາດ Analytics</button></div></div> : null}
    </section>

    <p className={styles.notice} role="status">{notice} · Consent: {analytics}</p>
  </main>;
}
