"use client";

import { useState } from "react";
import styles from "./final-design.module.css";

type ScreenId = "SCR-G01" | "SCR-G02" | "SCR-G03" | "SCR-G05" | "SCR-A01" | "SCR-A02" | "SCR-A03";
type GuestScreenId = Extract<ScreenId, "SCR-G01" | "SCR-G02" | "SCR-G03" | "SCR-G05">;
type Viewport = "mobile" | "tablet" | "desktop";
type UiState = "default" | "loading" | "empty" | "error" | "disabled" | "stale" | "sponsored" | "long_text" | "unauthorized" | "conflict";

const screens: Array<{ id: ScreenId; group: "Guest/Pilot" | "Admin"; name: string; purpose: string; route: string; states: UiState[] }> = [
  { id: "SCR-G01", group: "Guest/Pilot", name: "Discovery Feed", purpose: "ຄົ້ນພົບສະຖານທີ່ຈາກວິດີໂອ ແລະໄປຫາຂໍ້ມູນຕັດສິນໃຈ", route: "/prototype?screen=discover", states: ["default", "sponsored", "stale"] },
  { id: "SCR-G02", group: "Guest/Pilot", name: "Search & Filters", purpose: "ຄົ້ນຕາມເຈດຕະນາ ແລະປຽບທຽບ Video/List/Map", route: "/prototype?screen=search", states: ["default", "loading", "empty", "error"] },
  { id: "SCR-G03", group: "Guest/Pilot", name: "Place Decision", purpose: "ລວມຂໍ້ມູນຈຳເປັນໃຫ້ຕັດສິນໃຈໄປ ຫຼືບໍ່ໄປ", route: "/prototype?screen=place", states: ["default", "disabled", "stale", "sponsored", "long_text"] },
  { id: "SCR-G05", group: "Guest/Pilot", name: "Consent & Privacy", purpose: "ໃຫ້ທາງເລືອກ analytics ທີ່ຊັດ ແລະປ່ຽນໃຈໄດ້", route: "/prototype?consent=pending", states: ["default"] },
  { id: "SCR-A01", group: "Admin", name: "Operations Queue", purpose: "ຈັດລຳດັບ Place/Trust work ຕາມ priority, SLA ແລະ owner", route: "/admin/queue", states: ["default", "loading", "empty", "error", "unauthorized"] },
  { id: "SCR-A02", group: "Admin", name: "Place Editor", purpose: "ແກ້ຂໍ້ມູນ Place ຄູ່ກັບ source evidence ແລະ publish readiness", route: "/admin/places/:placeId", states: ["default", "error", "conflict", "unauthorized"] },
  { id: "SCR-A03", group: "Admin", name: "Moderation Case", purpose: "ຕັດສິນ report/takedown/correction ດ້ວຍ policy, evidence ແລະ audit trail", route: "/admin/cases/:caseId", states: ["default", "loading", "error", "unauthorized"] },
];

const stateLabels: Record<UiState, string> = {
  default: "Default", loading: "Loading", empty: "Empty", error: "Error", disabled: "Disabled", stale: "Stale", sponsored: "Sponsored", long_text: "Long text", unauthorized: "Unauthorized", conflict: "Conflict",
};

const guestPrototypeScreens: Record<GuestScreenId, "discover" | "search" | "place"> = {
  "SCR-G01": "discover",
  "SCR-G02": "search",
  "SCR-G03": "place",
  "SCR-G05": "discover",
};

function StateNotice({ state }: { state: UiState }) {
  if (state === "default") return null;
  const copy: Record<Exclude<UiState, "default">, [string, string]> = {
    loading: ["ກຳລັງໂຫຼດຂໍ້ມູນ…", "ຮັກສາ layout ແລະ context ໄວ້"],
    empty: ["ຍັງບໍ່ມີລາຍການ", "ປ່ຽນຕົວກອງ ຫຼືກັບໄປຄົ້ນຫາ"],
    error: ["ດຶງຂໍ້ມູນບໍ່ສຳເລັດ", "ລອງໃໝ່ໂດຍບໍ່ລຶບຂໍ້ມູນທີ່ປ້ອນ"],
    disabled: ["ຄຳສັ່ງນີ້ຍັງໃຊ້ບໍ່ໄດ້", "ສະແດງເຫດຜົນ ແລະທາງເລືອກທີ່ເຮັດໄດ້"],
    stale: ["ຂໍ້ມູນອາດປ່ຽນແປງ", "ກວດຫຼ້າສຸດ 20 ສິງຫາ 2026"],
    sponsored: ["Sponsored · ໂຄສະນາ", "ຮ້ານຈ່າຍຄ່າສະແດງ; ບໍ່ປ່ຽນຄະແນນຣີວິວ"],
    unauthorized: ["Session ໝົດອາຍຸ", "ເຂົ້າລະບົບໃໝ່; ຫ້າມສະແດງຂໍ້ມູນ Admin"],
    conflict: ["ມີຄົນອື່ນອັບເດດຂໍ້ມູນ", "ປຽບທຽບສະບັບຫຼ້າສຸດກ່ອນບັນທຶກ"],
    long_text: ["ທົດສອບຂໍ້ຄວາມຍາວ", "ກວດການຕັດຄຳ ແລະ layout ໃນ Prototype"],
  };
  return <div className={`${styles.stateNotice} ${styles[`state_${state}`]}`} role={state === "error" || state === "unauthorized" ? "alert" : "status"}><strong>{copy[state][0]}</strong><span>{copy[state][1]}</span><button>{state === "error" ? "ລອງໃໝ່" : state === "conflict" ? "ປຽບທຽບ" : "ລາຍລະອຽດ"}</button></div>;
}

function AdminPreview({ screen, state }: { screen: ScreenId; state: UiState }) {
  return <div className={styles.adminScreen}><aside><strong>ພ້ອມໄປ <small>ADMIN</small></strong><nav><b>▦ Queue</b><span>⌂ Places</span><span>⚑ Cases</span><span>◎ Audit</span></nav><small>Signed in · Operations</small></aside><main><header><div><small>{screen}</small><h2>{screen === "SCR-A01" ? "Operations Queue" : screen === "SCR-A02" ? "Place Editor" : "Moderation Case"}</h2></div><button>Help</button><span>KS</span></header><StateNotice state={state} />{screen === "SCR-A01" ? <><div className={styles.adminStats}><article><small>Assigned</small><b>12</b></article><article><small>Due today</small><b>5</b></article><article><small>P0/P1</small><b>2</b></article><article><small>Ready</small><b>8</b></article></div><div className={styles.queue}><div><b>Place & Data</b><span>Trust Cases</span><button>Filter · 3</button></div>{state !== "empty" && state !== "error" ? [["PLC-041", "ເຮືອນຄົວວຽງ", "Freshness", "Due 14:30"], ["CAS-019", "Source removed", "P1", "Due 11:00"], ["PLC-055", "ສວນກາເຟ", "Publish check", "Tomorrow"]].map(row => <article key={row[0]}><code>{row[0]}</code><b>{row[1]}</b><span>{row[2]}</span><small>{row[3]}</small><button>Open →</button></article>) : null}</div></> : screen === "SCR-A02" ? <div className={styles.editor}><section><div className={styles.editorTabs}><b>Place data</b><span>Category details</span><span>Trust</span></div><label>ຊື່ສະຖານທີ່<input readOnly value="ເຮືອນຄົວວຽງ" /></label><div><label>Category<input readOnly value="ຮ້ານອາຫານ" /></label><label>District<input readOnly value="ສີສັດຕະນາກ" /></label></div><label>Address<textarea readOnly value="ຖະໜົນເຈົ້າອານຸ, ບ້ານ..." /></label><footer><button>Save draft</button><button>Submit review</button></footer></section><aside><b>Source evidence</b><a>Facebook review · Original ↗</a><small>Captured 20 Aug 2026</small><hr/><b>Publish readiness</b><span>✓ Identity</span><span>✓ Location</span><span>✓ Contact</span><span>! Price freshness</span></aside></div> : <div className={styles.case}><section><small>CAS-019 · P1 · Due 11:00</small><h3>Original review source removed</h3><p>ຜູ້ລາຍງານລະບຸວ່າ source link ບໍ່ສາມາດເປີດໄດ້ ແລະຂໍໃຫ້ກວດ Place facts.</p><b>Evidence</b><article>Source URL <code>facebook.com/…</code><mark>Unavailable</mark></article><article>Place facts <code>PLC-041</code><mark>Protected</mark></article><b>Decision</b><label>Reason code<select><option>SRC-REMOVED</option></select></label><label>Finding<textarea defaultValue="Remove media reference; preserve verified Place facts." /></label><footer><button>Save draft</button><button>Apply decision</button></footer></section><aside><b>Case timeline</b><span>09:14 · Report received</span><span>09:18 · Media protected</span><span>10:02 · Assigned to KS</span><small>Appeal reviewer must differ from decision maker.</small></aside></div>}</main></div>;
}

export default function FinalDesignGallery({ basePath }: { basePath: string }) {
  const [screenId, setScreenId] = useState<ScreenId>("SCR-G01");
  const [viewport, setViewport] = useState<Viewport>("mobile");
  const [uiState, setUiState] = useState<UiState>("default");
  const screen = screens.find(item => item.id === screenId)!;
  const isGuest = screen.group === "Guest/Pilot";
  const guestScreenId = isGuest ? screenId as GuestScreenId : "SCR-G01";
  const guestConsent = guestScreenId === "SCR-G05" ? "pending" : "essential";
  const guestPrototypeUrl = `${basePath}/prototype?embed=1&screen=${guestPrototypeScreens[guestScreenId]}&state=${uiState}&consent=${guestConsent}`;

  const chooseScreen = (id: ScreenId) => {
    const next = screens.find(item => item.id === id)!;
    setScreenId(id); setUiState("default"); setViewport(next.group === "Admin" ? "desktop" : "mobile");
  };

  return <main className={styles.site}>
    <header className={styles.topbar}><a href={`${basePath}/documents/full-ux-ui`}><b>UX-05</b><span>FINAL DESIGN GALLERY</span></a><nav><a href={`${basePath}/prototype`}>Prototype R2.3</a><a href={`${basePath}/design-system`}>UX-04 Gallery</a><a href={`${basePath}/documents`}>Documents</a></nav></header>
    <section className={styles.hero}><div><small>FULL UX/UI DESIGN · BASELINE 0.7.1</small><h1>ໜ້າຈໍສຳລັບຕັດສິນໃຈ<br/><em>ແລະພ້ອມສົ່ງຕໍ່ Developer</em></h1></div><p>Guest/Pilot ໃຊ້ Prototype R2.3 ເປັນແຫຼ່ງອອກແບບດຽວ. ການປ່ຽນ Screen ຫຼື State ຢູ່ໜ້ານີ້ຈະເປີດ UI ຕົວຈິງຈາກ Prototype ໂດຍກົງ.</p></section>
    <section className={styles.workspace}>
      <aside className={styles.registry}><div><small>SCREEN REGISTRY</small><b>7 Must Screens</b></div>{["Guest/Pilot", "Admin"].map(group => <section key={group}><h2>{group}</h2>{screens.filter(item => item.group === group).map(item => <button key={item.id} aria-pressed={screenId === item.id} onClick={() => chooseScreen(item.id)}><code>{item.id}</code><span><b>{item.name}</b><small>{item.route}</small></span></button>)}</section>)}</aside>
      <div className={styles.board}>
        <header className={styles.boardTools}><div><code>{screen.id}</code><span><b>{screen.name}</b><small>{screen.purpose}</small></span></div><div className={styles.switches}>{isGuest ? <span className={styles.sourceBadge}>LIVE · PROTOTYPE R2.3</span> : <span aria-label="Viewport selector">{(["mobile", "tablet", "desktop"] as Viewport[]).map(item => <button key={item} aria-pressed={viewport === item} onClick={() => setViewport(item)}>{item}</button>)}</span>}<span aria-label="State selector">{screen.states.map(item => <button key={item} aria-pressed={uiState === item} onClick={() => setUiState(item)}>{stateLabels[item]}</button>)}</span></div></header>
        <div className={`${styles.canvas} ${styles[isGuest ? "mobile" : viewport]}`}><div className={styles.viewportLabel}><b>{isGuest ? "390 × 844 · Prototype source" : viewport === "mobile" ? "390 × 844" : viewport === "tablet" ? "768 × 1024" : "1440 × 900"}</b><span>{uiState}</span></div><div className={`${styles.preview} ${isGuest ? styles.prototypePreview : ""}`}>{isGuest ? <iframe key={guestPrototypeUrl} src={guestPrototypeUrl} title={`Prototype R2.3 · ${screen.name} · ${stateLabels[uiState]}`} /> : <AdminPreview screen={screenId} state={uiState} />}</div></div>
        <footer className={styles.specBar}><div><small>PRIMARY OUTCOME</small><b>{screen.purpose}</b></div><div><small>DATA CONTRACT</small><b>{screen.group === "Admin" ? "Protected API · role + audit required" : "Place ID · source · freshness · action availability"}</b></div><div><small>HANDOFF STATUS</small><b>{isGuest ? "Prototype parity · single source of truth" : "Baseline ready · final gates pending"}</b></div></footer>
      </div>
    </section>
  </main>;
}
