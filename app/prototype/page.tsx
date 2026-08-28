"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./prototype.module.css";

type Screen = "discover" | "search" | "place";
type QaScenario = "default" | "loading" | "empty" | "error" | "disabled" | "sponsored" | "stale" | "long_text";
type QaResult = "pending" | "pass" | "fail";
type QaItemId = "keyboard" | "lao_200" | "reduced_motion" | "voiceover" | "component_states";
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

const qaScenarios: { id: QaScenario; label: string; description: string }[] = [
  { id: "default", label: "Default", description: "ການນຳໃຊ້ປົກກະຕິ" },
  { id: "loading", label: "Loading", description: "ກຳລັງໂຫຼດຜົນຄົ້ນຫາ" },
  { id: "empty", label: "Empty", description: "ບໍ່ພົບຜົນຄົ້ນຫາ" },
  { id: "error", label: "Error", description: "ລະບົບດຶງຂໍ້ມູນບໍ່ສຳເລັດ" },
  { id: "disabled", label: "Disabled", description: "ປິດປຸ່ມໂທເມື່ອບໍ່ມີເບີ" },
  { id: "sponsored", label: "Sponsored", description: "ຮ້ານຈ່າຍຄ່າສະແດງຜົນ" },
  { id: "stale", label: "Stale", description: "ຂໍ້ມູນເກົ່າ ແລະ Source ຂາດ" },
  { id: "long_text", label: "Lao long text", description: "ກວດຂໍ້ຄວາມລາວຍາວ" },
];

const qaItems: { id: QaItemId; title: string; instruction: string }[] = [
  { id: "keyboard", title: "Keyboard", instruction: "ໃຊ້ Tab/Shift+Tab ໄປທຸກປຸ່ມ, Enter/Space ເພື່ອກົດ ແລະ Escape ເພື່ອປິດ QA panel." },
  { id: "lao_200", title: "Lao text 200%", instruction: "ຕັ້ງ Browser Zoom ເປັນ 200%, ເລືອກ Lao long text ແລະກວດວ່າຂໍ້ຄວາມບໍ່ຖືກຕັດ/ທັບກັນ." },
  { id: "reduced_motion", title: "Reduced Motion", instruction: "ເປີດ Reduce Motion ໃນລະບົບປະຕິບັດການ, reload ໜ້າ ແລະກວດວ່າບໍ່ມີ animation ທີ່ລົບກວນ." },
  { id: "voiceover", title: "VoiceOver", instruction: "ເປີດ VoiceOver, ຟັງຊື່/ສະຖານະຂອງ control ແລະເດີນ Discover → Search → Place." },
  { id: "component_states", title: "Component states", instruction: "ເປີດ Default, Loading, Empty, Error, Disabled, Sponsored ແລະ Stale ແລ້ວປຽບທຽບກັບຂໍ້ຄວາມກຳກັບ." },
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
  const [notice, setNotice] = useState("Prototype R2.2 · ເປີດ UX-04 QA Test Mode ໄດ້ແລ້ວ");
  const [analytics, setAnalytics] = useState<"pending" | "essential" | "allowed">("pending");
  const [showTasks, setShowTasks] = useState(false);
  const [showQa, setShowQa] = useState(false);
  const [qaScenario, setQaScenario] = useState<QaScenario>("default");
  const [qaResults, setQaResults] = useState<Record<QaItemId, QaResult>>({ keyboard: "pending", lao_200: "pending", reduced_motion: "pending", voiceover: "pending", component_states: "pending" });
  const essentialConsentRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (analytics === "pending") essentialConsentRef.current?.focus();
  }, [analytics]);

  useEffect(() => {
    if (!showQa) return;
    const closeQa = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowQa(false);
    };
    window.addEventListener("keydown", closeQa);
    return () => window.removeEventListener("keydown", closeQa);
  }, [showQa]);

  const selected = places.find((place) => place.id === selectedId) ?? places[0];
  const displaySelected: Place = qaScenario === "long_text" ? {
    ...selected,
    name: "ເຮືອນຄົວວຽງສຳລັບຄອບຄົວໃຫຍ່ ແລະກຸ່ມໝູ່ທີ່ຢາກຊິມອາຫານລາວຫຼາຍປະເພດ",
    categoryLabel: "ຮ້ານອາຫານລາວພື້ນບ້ານທີ່ເນັ້ນວັດຖຸດິບຕາມລະດູການ",
    menu: selected.menu.map((item, index) => index === 0 ? { ...item, name: "ເອາະຫຼາມສູດພື້ນບ້ານໃສ່ຜັກຫຼາຍຊະນິດ ແລະຊີ້ນທີ່ເລືອກໄດ້" } : item),
  } : selected;
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

  const activateQaScenario = (scenario: QaScenario) => {
    setQaScenario(scenario);
    setAnalytics((current) => current === "pending" ? "essential" : current);
    if (scenario === "loading" || scenario === "empty" || scenario === "error") setScreen("search");
    else if (scenario === "disabled" || scenario === "sponsored" || scenario === "stale" || scenario === "long_text") {
      setReturnScreen("search");
      setSelectedId(scenario === "sponsored" ? "p02" : scenario === "stale" ? "p03" : "p01");
      setScreen("place");
    } else setScreen("discover");
    setNotice(`UX-04 QA · ກຳລັງຈຳລອງ ${qaScenarios.find((item) => item.id === scenario)?.label ?? scenario}`);
  };

  const qaSummary = Object.values(qaResults).reduce((summary, result) => ({ ...summary, [result]: summary[result] + 1 }), { pending: 0, pass: 0, fail: 0 });

  return <main className={styles.stage}>
    <header className={styles.prototypeHeader}>
      <div><strong>ພ້ອມໄປ · UX-03</strong><span>PROTOTYPE R2.2 · QA TEST MODE</span></div>
      <nav><button aria-expanded={showQa} aria-controls="ux04-qa-panel" onClick={() => setShowQa((value) => !value)}>{showQa ? "ປິດ QA" : "UX-04 · ທົດສອບ"}</button><button onClick={() => setShowTasks((value) => !value)}>{showTasks ? "ປິດຜົນທົບທວນ" : "Founder Review R2 · ຜົນ"}</button><a href={`${basePath}/documents/interactive-prototype`}>ກັບເອກະສານ</a></nav>
    </header>

    {showTasks ? <aside className={styles.tasks} aria-label="Founder review results"><strong>Founder Review R2 · ຜ່ານໂດຍມີ 1 Minor Revision</strong><ol><li><b>ຜ່ານ:</b> Platform ມີຄວາມແຕກຕ່າງຊັດ.</li><li><b>ຜ່ານໃນລະດັບໜຶ່ງ:</b> Search ຊ່ວຍຄົ້ນ ແລະປຽບທຽບໄດ້.</li><li><b>ຜ່ານຫຼັງແກ້:</b> Place Page ຂໍ້ມູນຄົບ; Prototype R2.1 ເພີ່ມຮູບໃນເມນູແລ້ວ.</li><li><b>ຜ່ານ:</b> Sponsored, rating/source ແລະ checked date ແຍກຊັດ.</li><li><b>ຜ່ານ:</b> MVP scope ໂດຍລວມເໝາະສົມ.</li></ol><p>ຜົນນີ້ເປັນ Founder/Product Review; external usability evidence ຍັງບໍ່ທັນເລີ່ມ.</p></aside> : null}

    {showQa ? <aside id="ux04-qa-panel" className={styles.qaPanel} aria-label="UX-04 QA test mode">
      <header><div><span>UX-04 · QA TEST MODE</span><h2>ເປີດສະຖານະທົດສອບໄດ້ທັນທີ</h2></div><button aria-label="ປິດ QA panel" onClick={() => setShowQa(false)}>×</button></header>
      <p className={styles.qaWarning}>ປຸ່ມ Pass/Fail ເປັນບັນທຶກຊົ່ວຄາວໃນໜ້ານີ້. ການມີ Test Mode ບໍ່ໝາຍຄວາມວ່າຜ່ານ QA ແລ້ວ.</p>
      <section><h3>1. ເລືອກໜ້າ</h3><div className={styles.qaScreens}>{(["discover", "search", "place"] as Screen[]).map((item) => <button key={item} aria-pressed={screen === item} onClick={() => { setQaScenario("default"); setScreen(item); if (item === "place") setSelectedId("p01"); }}>{item === "discover" ? "Discover" : item === "search" ? "Search" : "Place"}</button>)}</div></section>
      <section><h3>2. ເລືອກ State</h3><div className={styles.qaScenarios}>{qaScenarios.map((item) => <button key={item.id} aria-pressed={qaScenario === item.id} onClick={() => activateQaScenario(item.id)}><strong>{item.label}</strong><span>{item.description}</span></button>)}</div></section>
      <section><div className={styles.qaChecklistTitle}><h3>3. ບັນທຶກຜົນ</h3><span>Pass {qaSummary.pass} · Fail {qaSummary.fail} · ລໍ {qaSummary.pending}</span></div><div className={styles.qaChecklist}>{qaItems.map((item) => <article key={item.id}><div><strong>{item.title}</strong><p>{item.instruction}</p></div><div aria-label={`ຜົນທົດສອບ ${item.title}`}>{(["pass", "fail", "pending"] as QaResult[]).map((result) => <button key={result} aria-pressed={qaResults[item.id] === result} onClick={() => setQaResults((current) => ({ ...current, [item.id]: result }))}>{result === "pass" ? "ຜ່ານ" : result === "fail" ? "ບໍ່ຜ່ານ" : "ລ້າງ"}</button>)}</div></article>)}</div></section>
      <footer><a href={`${basePath}/templates/ux04-qa-test-record.template.json`}>ເປີດແບບຟອມບັນທຶກຫຼັກຖານ ↗</a><small>ບັນທຶກ Device, Browser, ຂັ້ນຕອນ, Expected, Actual ແລະ Issue ID.</small></footer>
    </aside> : null}

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
        {qaScenario === "loading" ? <div className={styles.loadingState} role="status" aria-live="polite"><strong>ກຳລັງໂຫຼດສະຖານທີ່…</strong><span>ລໍຖ້າຂໍ້ມູນຈາກລະບົບ</span><i/><i/><i/></div> : qaScenario === "error" ? <div className={styles.errorState} role="alert"><strong>ດຶງຂໍ້ມູນບໍ່ສຳເລັດ</strong><p>ກວດກາ Internet ແລ້ວລອງໃໝ່. ຄຳຄົ້ນຂອງທ່ານຍັງຖືກຮັກສາໄວ້.</p><button onClick={() => setQaScenario("default")}>ລອງໃໝ່</button></div> : qaScenario === "empty" ? <div className={styles.stateWrap}><div className={styles.empty}><strong>ບໍ່ພົບຮ້ານທີ່ກົງ</strong><p>ລອງລຶບຄຳຄົ້ນ ຫຼືປ່ຽນປະເພດ.</p><button onClick={() => { setQaScenario("default"); setQuery(""); setFilter("all"); }}>ລ້າງຕົວກອງ</button></div></div> : resultView === "map" ? <div className={styles.mapPreview}><span>ແຜນທີ່ຈຳລອງ</span>{results.map((place, index) => <button key={place.id} style={{ left: `${20 + index * 28}%`, top: `${25 + (index % 2) * 35}%` }} onClick={() => openPlace(place)}>⌖<small>{place.name}</small></button>)}</div> : <div className={resultView === "video" ? styles.videoResults : styles.results}>{results.length ? results.map((place) => <button className={resultView === "video" ? styles.videoResultCard : styles.resultCard} key={place.id} onClick={() => openPlace(place)}><i className={styles.resultImage} aria-hidden="true" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(5,12,17,.82)), url(${basePath}${place.image})` }}>{resultView === "video" ? <em>▶</em> : null}</i><span><strong>{place.name}</strong><small>{place.categoryLabel} · {place.district}</small><em>★ {place.rating} · {place.reviewCount} ຄຳເຫັນ · {place.distance}</em><small>{place.price} · {place.checked}</small>{place.sponsored ? <b>ໂຄສະນາ</b> : <i>{place.tags.slice(0, 2).join(" · ")}</i>}</span></button>) : <div className={styles.empty}><strong>ບໍ່ພົບຮ້ານທີ່ກົງ</strong><p>ລອງລຶບຄຳຄົ້ນ ຫຼືປ່ຽນປະເພດ.</p><button onClick={() => { setQuery(""); setFilter("all"); }}>ລ້າງຕົວກອງ</button></div>}</div>}
      </section> : null}

      {screen === "place" ? <section className={`${styles.lightScreen} ${qaScenario === "long_text" ? styles.longTextMode : ""}`}>
        <header className={styles.placeHero} style={{ backgroundImage: `linear-gradient(180deg, rgba(5,12,17,.08), rgba(5,12,17,.9)), url(${basePath}${displaySelected.image})` }}><button onClick={returnFromPlace}>← ກັບ</button>{displaySelected.sponsored ? <span>ໂຄສະນາ — ຮ້ານຈ່າຍ</span> : null}<button className={styles.heroPlay} onClick={() => setNotice(`ຫຼິ້ນຣີວິວຫຼັກຈາກ ${displaySelected.creator}`)} aria-label="ຫຼິ້ນວິດີໂອຣີວິວ">▶</button><div><small>{displaySelected.categoryLabel}</small><h1>{displaySelected.name}</h1><p>{displaySelected.district} · {displaySelected.price} · {displaySelected.distance}</p><b>★ {displaySelected.rating} <span>({displaySelected.reviewCount} ຄຳເຫັນຈາກແຫຼ່ງອ້າງອີງ)</span></b></div></header>
        <div className={styles.placeActions}><button onClick={() => act("ແຜນທີ່", displaySelected)}>⌖<span>ແຜນທີ່</span></button><button disabled={qaScenario === "disabled"} aria-describedby={qaScenario === "disabled" ? "disabled-call-reason" : undefined} onClick={() => act("ໂທ", displaySelected)}>☎<span>ໂທ</span></button><button onClick={() => act("ຂໍ້ຄວາມ", displaySelected)}>◫<span>ຂໍ້ຄວາມ</span></button><button onClick={() => act("ບັນທຶກ", displaySelected)}>♡<span>ບັນທຶກ</span></button></div>
        {qaScenario === "disabled" ? <p id="disabled-call-reason" className={styles.disabledReason} role="status">ປຸ່ມ “ໂທ” ຖືກປິດ ເພາະຮ້ານຍັງບໍ່ມີເບີໂທທີ່ກວດສອບແລ້ວ.</p> : null}
        <div className={styles.placeBody}>
          <section className={styles.decisionCard}><div><span>ສະຖານະ</span><strong>{displaySelected.hours}</strong></div><div><span>ລາຄາ</span><strong>{displaySelected.price}</strong></div><div><span>ໄລຍະທາງ</span><strong>{displaySelected.distance}</strong></div><small>{displaySelected.checked} · ລາຄາແມ່ນຂໍ້ມູນອ້າງອີງ</small></section>
          <section><div className={styles.sectionTitle}><div><span>VIDEO REVIEWS</span><h2>ຄົນອື່ນເວົ້າແນວໃດ?</h2></div><button onClick={() => setNotice("ສະແດງຣີວິວທັງໝົດ")}>ເບິ່ງທັງໝົດ</button></div><div className={styles.reviewRail}>{displaySelected.reviewCreators.map((creator, index) => <button key={creator} onClick={() => setNotice(`ເປີດ original source ຂອງ ${creator}`)} style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(5,12,17,.86)), url(${basePath}${index % 2 ? "/platform-cafe.jpg" : displaySelected.image})` }}><i>▶</i><span><strong>{creator}</strong><small>Original review ↗</small></span></button>)}</div></section>
          <section><div className={styles.sectionTitle}><div><span>DETAILS</span><h2>{displaySelected.category === "restaurant" ? "ເມນູ ແລະລາຄາ" : "ເມນູແນະນຳ"}</h2></div><button onClick={() => setNotice("ສະແດງເມນູທັງໝົດ")}>ເບິ່ງເມນູ</button></div><div className={styles.menuList}>{displaySelected.menu.map((item) => <div key={item.name}><i aria-hidden="true" style={{ backgroundImage: `url(${basePath}${item.image})` }}/><span><b>{item.name}</b><small>ຮູບຕົວຢ່າງ · Prototype</small></span><strong>{item.price}</strong></div>)}</div><p className={styles.freshness}>ຮູບ ແລະລາຄາເປັນຂໍ້ມູນຕົວຢ່າງ · {displaySelected.checked}</p></section>
          <section><h2>ເໝາະກັບໃຜ?</h2><div className={styles.tagList}>{displaySelected.tags.map((tag) => <span key={tag}>✓ {tag}</span>)}</div></section>
          <section><h2>ແຫຼ່ງຣີວິວ ແລະຄວາມໂປ່ງໃສ</h2>{displaySelected.sourceAvailable ? <button className={styles.sourceCard} onClick={() => setNotice(`ເປີດ original source ຂອງ ${displaySelected.creator}`)}><span><strong>{displaySelected.creator}</strong><small>ຜູ້ສ້າງຣີວິວຕົ້ນສະບັບ</small></span><b>ເປີດຕົ້ນສະບັບ ↗</b></button> : <div className={styles.sourceMissing}><strong>Source ຖືກລົບ ຫຼືເບິ່ງບໍ່ໄດ້</strong><span>Place facts ຍັງສະແດງຕາມຫຼັກຖານທີ່ກວດໄດ້.</span></div>}</section>
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
