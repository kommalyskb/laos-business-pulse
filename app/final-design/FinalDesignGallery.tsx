"use client";

import { useState, type ReactNode } from "react";
import styles from "./final-design.module.css";

type ScreenId = "SCR-G01" | "SCR-G02" | "SCR-G03" | "SCR-G05" | "SCR-A01" | "SCR-A02" | "SCR-A03";
type GuestScreenId = Extract<ScreenId, "SCR-G01" | "SCR-G02" | "SCR-G03" | "SCR-G05">;
type AdminScreenId = Extract<ScreenId, "SCR-A01" | "SCR-A02" | "SCR-A03">;
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

const adminMeta: Record<AdminScreenId, { section: string; title: string; description: string }> = {
  "SCR-A01": { section: "Operations", title: "Operations Queue", description: "Prioritize, assign and resolve Place and Trust work." },
  "SCR-A02": { section: "Place catalog", title: "Place Editor", description: "Maintain verified place data against source evidence." },
  "SCR-A03": { section: "Trust & Safety", title: "Moderation Case", description: "Review evidence and record an auditable policy decision." },
};

function AdminShell({ screen, state, children }: { screen: AdminScreenId; state: UiState; children: ReactNode }) {
  const meta = adminMeta[screen];
  const navigation = [
    { label: "Work queue", icon: "▦", active: screen === "SCR-A01", count: "17" },
    { label: "Places", icon: "⌂", active: screen === "SCR-A02" },
    { label: "Trust cases", icon: "⚑", active: screen === "SCR-A03", count: "3" },
    { label: "Partners", icon: "◇", active: false },
  ];
  return <div className={styles.adminApp}>
    <aside className={styles.adminSidebar}>
      <div className={styles.adminBrand}><span>ພ</span><div><strong>ພ້ອມໄປ</strong><small>OPERATIONS CONSOLE</small></div></div>
      <div className={styles.workspaceSelect}><small>WORKSPACE</small><b>Laos Pilot Operations</b><span>⌄</span></div>
      <nav aria-label="Admin navigation">
        <small>OPERATIONS</small>
        {navigation.map(item => <button key={item.label} aria-current={item.active ? "page" : undefined}><i>{item.icon}</i><span>{item.label}</span>{item.count ? <em>{item.count}</em> : null}</button>)}
        <small>INSIGHTS & CONTROL</small>
        <button><i>◫</i><span>Performance</span></button>
        <button><i>◎</i><span>Audit log</span></button>
        <button><i>⚙</i><span>Settings</span></button>
      </nav>
      <div className={styles.systemHealth}><span /><div><b>All systems operational</b><small>Last checked 1 min ago</small></div></div>
      <div className={styles.adminUser}><b>KS</b><div><strong>Kommaly S.</strong><small>Operations administrator</small></div><span>⋮</span></div>
    </aside>
    <main className={styles.adminMain}>
      <header className={styles.adminTopbar}>
        <div><small>{meta.section}　/　{screen}</small><h2>{meta.title}</h2><p>{meta.description}</p></div>
        <div className={styles.adminTopActions}><button className={styles.adminSearch}>⌕ <span>Search records…</span><kbd>⌘ K</kbd></button><button aria-label="Notifications">♢<em>3</em></button><button aria-label="Help">?</button></div>
      </header>
      <div className={styles.adminContent}><StateNotice state={state} />{children}</div>
    </main>
  </div>;
}

function OperationsQueue({ state }: { state: UiState }) {
  const rows = [
    { id: "PLC-041", title: "ເຮືອນຄົວວຽງ", detail: "Place data · Freshness review", priority: "P1", owner: "KS", due: "Today, 14:30", status: "In review", tone: "review" },
    { id: "CAS-019", title: "Original source removed", detail: "Trust case · Source integrity", priority: "P0", owner: "ML", due: "Overdue 42m", status: "Escalated", tone: "danger" },
    { id: "PLC-055", title: "ສວນກາເຟເຊົ້າ", detail: "Place data · Publish readiness", priority: "P2", owner: "Unassigned", due: "Tomorrow", status: "Needs owner", tone: "warning" },
    { id: "REQ-028", title: "Business hours correction", detail: "Correction · Owner submitted", priority: "P2", owner: "NP", due: "29 Aug, 10:00", status: "Ready", tone: "ready" },
  ];
  return <>
    <section className={styles.adminPageLead}><div><span>LIVE OPERATIONS</span><h3>Good morning, Kommaly</h3><p>There are <b>5 tasks due today</b> and <b>2 items at SLA risk</b>.</p></div><div><button>Export</button><button>＋ Create task</button></div></section>
    <section className={styles.adminMetrics}>
      {[["Assigned to me", "12", "+3 today", "neutral"], ["Due today", "5", "2 high priority", "warning"], ["SLA risk", "2", "Needs attention", "danger"], ["7-day completion", "94%", "+6.4% vs prior", "success"]].map(item => <article key={item[0]}><div><small>{item[0]}</small><b>{item[1]}</b></div><span className={styles[`metric_${item[3]}`]}>{item[2]}</span></article>)}
    </section>
    <section className={styles.queuePanel}>
      <header><div className={styles.queueTabs}><button aria-pressed="true">My work <b>12</b></button><button>Unassigned <b>5</b></button><button>All open <b>31</b></button></div><div className={styles.queueTools}><button>⌕ Search queue</button><button>☷ Filter <b>3</b></button><button>↕ Sort</button></div></header>
      <div className={styles.tableWrap}>
        <table><thead><tr><th><input type="checkbox" aria-label="Select all work items" /></th><th>Work item</th><th>Priority</th><th>Owner</th><th>SLA / Due</th><th>Status</th><th aria-label="Actions" /></tr></thead>
          <tbody>{state !== "empty" && state !== "error" && state !== "unauthorized" ? rows.map(row => <tr key={row.id}><td><input type="checkbox" aria-label={`Select ${row.id}`} /></td><td><div className={styles.workItem}><code>{row.id}</code><b>{row.title}</b><small>{row.detail}</small></div></td><td><span className={`${styles.priority} ${styles[`priority_${row.priority.toLowerCase()}`]}`}>{row.priority}</span></td><td><span className={styles.ownerAvatar}>{row.owner === "Unassigned" ? "—" : row.owner}</span><small>{row.owner}</small></td><td className={row.due.startsWith("Overdue") ? styles.overdue : ""}><b>{row.due}</b><small>{row.due.startsWith("Overdue") ? "SLA breached" : "Within SLA"}</small></td><td><span className={`${styles.statusPill} ${styles[`status_${row.tone}`]}`}><i />{row.status}</span></td><td><button className={styles.rowAction}>•••</button></td></tr>) : null}</tbody>
        </table>
      </div>
      <footer><span>Showing 1–4 of 12 work items</span><div><button disabled>←</button><b>1</b><button>2</button><button>3</button><button>→</button></div></footer>
    </section>
  </>;
}

function PlaceEditor() {
  return <>
    <section className={styles.recordHeader}><div><small>PLACE RECORD　/　PLC-041</small><h3>ເຮືອນຄົວວຽງ <span>Draft</span></h3><p>Version 12 · Last saved today at 10:42 by Kommaly S.</p></div><div><button>Preview</button><button>Save draft</button><button>Submit for review</button></div></section>
    <div className={styles.placeEditorLayout}>
      <section className={styles.formCard}>
        <nav><button aria-pressed="true">Place information</button><button>Category details</button><button>Media & sources <b>3</b></button><button>Change history</button></nav>
        <div className={styles.formSection}><header><div><b>Identity</b><small>Public-facing name and classification</small></div><span>Required fields complete</span></header>
          <div className={styles.fieldGrid}><label className={styles.fullField}>Place name <em>*</em><input readOnly value="ເຮືອນຄົວວຽງ" /><small>Use the official business name shown at the location.</small></label><label>Primary category <em>*</em><select defaultValue="restaurant"><option value="restaurant">ຮ້ານອາຫານ</option></select></label><label>Price band <em>*</em><select defaultValue="2"><option value="2">₭₭ · 50,000–100,000</option></select></label></div>
        </div>
        <div className={styles.formSection}><header><div><b>Location & contact</b><small>Information used for external decision actions</small></div><span>Verified 20 Aug 2026</span></header>
          <div className={styles.fieldGrid}><label>Province <em>*</em><input readOnly value="ນະຄອນຫຼວງວຽງຈັນ" /></label><label>District <em>*</em><input readOnly value="ສີສັດຕະນາກ" /></label><label className={styles.fullField}>Address <em>*</em><textarea readOnly value="ຖະໜົນເຈົ້າອານຸ, ບ້ານໂພນສະຫວັນ..." /></label><label>Phone number<input readOnly value="+856 20 5555 0141" /></label><label>Map coordinates <em>*</em><input readOnly value="17.9558, 102.6094" /></label></div>
        </div>
        <footer><span>✓ All changes saved locally</span><div><button>Discard changes</button><button>Save draft</button></div></footer>
      </section>
      <aside className={styles.evidencePanel}>
        <section><header><div><small>PUBLISH READINESS</small><b>4 of 5 checks passed</b></div><strong>80%</strong></header><div className={styles.readinessBar}><i /></div><ul><li data-state="pass">Identity verified <span>✓</span></li><li data-state="pass">Location verified <span>✓</span></li><li data-state="pass">Contact available <span>✓</span></li><li data-state="pass">Source attribution <span>✓</span></li><li data-state="warning">Price freshness <span>!</span></li></ul></section>
        <section><header><div><small>SOURCE EVIDENCE</small><b>Primary source</b></div><button>＋</button></header><article><span>f</span><div><b>Facebook review</b><small>@lao.food.story · Captured 20 Aug</small></div><a>Open ↗</a></article><p>Source supports identity, location and menu price range. Recheck due in 22 days.</p></section>
        <section className={styles.auditNote}><small>LAST AUDIT EVENT</small><b>Address normalized</b><p>10:42 · Kommaly S. · ADM-PLACE-UPDATE</p><a>View complete history →</a></section>
      </aside>
    </div>
  </>;
}

function ModerationCase() {
  return <>
    <section className={styles.recordHeader}><div><small>TRUST CASE　/　CAS-019</small><h3>Original review source removed <span className={styles.casePriority}>P1 · HIGH</span></h3><p>Opened today at 09:14 · SLA due today at 11:00 · Assigned to Kommaly S.</p></div><div><button>Reassign</button><button>Escalate</button><button>Resolve case</button></div></section>
    <div className={styles.caseLayout}>
      <div className={styles.casePrimary}>
        <section className={styles.caseSummary}><header><div><small>REPORTED ISSUE</small><b>Source integrity</b></div><span>Under review</span></header><h4>Original review URL is no longer available</h4><p>ຜູ້ລາຍງານລະບຸວ່າ source link ບໍ່ສາມາດເປີດໄດ້. Place facts ທີ່ກວດຢືນຢັນແລ້ວຍັງບໍ່ຄວນຖືກລຶບໂດຍອັດຕະໂນມັດ.</p><dl><div><dt>Place</dt><dd>PLC-041 · ເຮືອນຄົວວຽງ</dd></div><div><dt>Reporter</dt><dd>Anonymous user · Web form</dd></div><div><dt>Policy</dt><dd>CON-04 · Source availability</dd></div></dl></section>
        <section className={styles.evidenceList}><header><div><small>EVIDENCE</small><b>2 records protected</b></div><button>＋ Add evidence</button></header><article><span className={styles.evidenceIcon}>↗</span><div><b>Original source URL</b><small>facebook.com/reel/… · Checked 10:02</small></div><mark>Unavailable</mark><button>Inspect</button></article><article><span className={styles.evidenceIcon}>⌂</span><div><b>Verified Place facts</b><small>Identity, location and contact · Version 11</small></div><mark className={styles.protected}>Protected</mark><button>Compare</button></article></section>
        <section className={styles.decisionPanel}><header><div><small>DECISION</small><b>Record policy outcome</b></div><span>Audit event required</span></header><div className={styles.decisionChoices}><label><input type="radio" name="decision" defaultChecked /><span><b>Remove source reference</b><small>Preserve verified Place facts</small></span></label><label><input type="radio" name="decision" /><span><b>Restore source</b><small>Evidence confirms availability</small></span></label><label><input type="radio" name="decision" /><span><b>Escalate</b><small>Legal or policy review needed</small></span></label></div><label>Reason code <em>*</em><select defaultValue="removed"><option value="removed">SRC-REMOVED · Original source unavailable</option></select></label><label>Decision note <em>*</em><textarea defaultValue="Remove the unavailable media reference. Preserve verified identity, location and contact facts on the Place record." /></label><footer><small>Decision will be written to the immutable audit log.</small><div><button>Save draft</button><button>Apply decision</button></div></footer></section>
      </div>
      <aside className={styles.caseAside}>
        <section><header><small>CASE TIMELINE</small><b>Today</b></header><ol><li><i /><div><b>Case assigned</b><small>10:02 · Kommaly S.</small></div></li><li><i /><div><b>Public media protected</b><small>09:18 · System</small></div></li><li><i /><div><b>Report received</b><small>09:14 · Web form</small></div></li></ol></section>
        <section><header><small>POLICY GUIDANCE</small><b>CON-04 · §7.2</b></header><p>When an original source becomes unavailable, remove the public media reference. Preserve independently verified Place facts unless a separate correction or takedown applies.</p><a>Open policy document ↗</a></section>
        <section className={styles.separationNote}><b>Separation of duties</b><p>An appeal must be reviewed by a person other than the original decision maker.</p></section>
      </aside>
    </div>
  </>;
}

function AdminPreview({ screen, state }: { screen: AdminScreenId; state: UiState }) {
  return <AdminShell screen={screen} state={state}>{screen === "SCR-A01" ? <OperationsQueue state={state} /> : screen === "SCR-A02" ? <PlaceEditor /> : <ModerationCase />}</AdminShell>;
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
    <section className={styles.hero}><div><small>FULL UX/UI DESIGN · BASELINE 0.7.2</small><h1>ໜ້າຈໍສຳລັບຕັດສິນໃຈ<br/><em>ແລະພ້ອມສົ່ງຕໍ່ Developer</em></h1></div><p>Guest/Pilot ໃຊ້ Prototype R2.3 ເປັນແຫຼ່ງອອກແບບດຽວ. Admin R1.2 ຖືກຍົກລະດັບເປັນ Professional Operations Console ສຳລັບ Queue, Place Data ແລະ Trust Case.</p></section>
    <section className={styles.workspace}>
      <aside className={styles.registry}><div><small>SCREEN REGISTRY</small><b>7 Must Screens</b></div>{["Guest/Pilot", "Admin"].map(group => <section key={group}><h2>{group}</h2>{screens.filter(item => item.group === group).map(item => <button key={item.id} aria-pressed={screenId === item.id} onClick={() => chooseScreen(item.id)}><code>{item.id}</code><span><b>{item.name}</b><small>{item.route}</small></span></button>)}</section>)}</aside>
      <div className={styles.board}>
        <header className={styles.boardTools}><div><code>{screen.id}</code><span><b>{screen.name}</b><small>{screen.purpose}</small></span></div><div className={styles.switches}>{isGuest ? <span className={styles.sourceBadge}>LIVE · PROTOTYPE R2.3</span> : <span aria-label="Viewport selector">{(["mobile", "tablet", "desktop"] as Viewport[]).map(item => <button key={item} aria-pressed={viewport === item} onClick={() => setViewport(item)}>{item}</button>)}</span>}<span aria-label="State selector">{screen.states.map(item => <button key={item} aria-pressed={uiState === item} onClick={() => setUiState(item)}>{stateLabels[item]}</button>)}</span></div></header>
        <div className={`${styles.canvas} ${styles[isGuest ? "mobile" : viewport]}`}><div className={styles.viewportLabel}><b>{isGuest ? "390 × 844 · Prototype source" : viewport === "mobile" ? "390 × 844" : viewport === "tablet" ? "768 × 1024" : "1440 × 900"}</b><span>{uiState}</span></div><div className={`${styles.preview} ${isGuest ? styles.prototypePreview : ""}`}>{isGuest ? <iframe key={guestPrototypeUrl} src={guestPrototypeUrl} title={`Prototype R2.3 · ${screen.name} · ${stateLabels[uiState]}`} /> : <AdminPreview screen={screenId as AdminScreenId} state={uiState} />}</div></div>
        <footer className={styles.specBar}><div><small>PRIMARY OUTCOME</small><b>{screen.purpose}</b></div><div><small>DATA CONTRACT</small><b>{screen.group === "Admin" ? "Protected API · role + audit required" : "Place ID · source · freshness · action availability"}</b></div><div><small>HANDOFF STATUS</small><b>{isGuest ? "Prototype parity · single source of truth" : "Baseline ready · final gates pending"}</b></div></footer>
      </div>
    </section>
  </main>;
}
