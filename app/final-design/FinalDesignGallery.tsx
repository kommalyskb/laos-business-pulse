"use client";

import { useState, type ReactNode } from "react";
import styles from "./final-design.module.css";

type ScreenId = "SCR-G01" | "SCR-G02" | "SCR-G03" | "SCR-G05" | "SCR-A00" | "SCR-A01" | "SCR-A02" | "SCR-A03" | "SCR-A04" | "SCR-A05" | "SCR-A06" | "SCR-A07" | "SCR-A08" | "SCR-A09";
type GuestScreenId = Extract<ScreenId, "SCR-G01" | "SCR-G02" | "SCR-G03" | "SCR-G05">;
type AdminScreenId = Exclude<ScreenId, GuestScreenId>;
type Viewport = "mobile" | "tablet" | "desktop";
type UiState = "default" | "loading" | "empty" | "error" | "disabled" | "stale" | "sponsored" | "long_text" | "unauthorized" | "conflict";

const screens: Array<{ id: ScreenId; group: "Guest/Pilot" | "Admin"; name: string; purpose: string; route: string; states: UiState[] }> = [
  { id: "SCR-G01", group: "Guest/Pilot", name: "Discovery Feed", purpose: "ຄົ້ນພົບສະຖານທີ່ຈາກວິດີໂອ ແລະໄປຫາຂໍ້ມູນຕັດສິນໃຈ", route: "/prototype?screen=discover", states: ["default", "sponsored", "stale"] },
  { id: "SCR-G02", group: "Guest/Pilot", name: "Search & Filters", purpose: "ຄົ້ນຕາມເຈດຕະນາ ແລະປຽບທຽບ Video/List/Map", route: "/prototype?screen=search", states: ["default", "loading", "empty", "error"] },
  { id: "SCR-G03", group: "Guest/Pilot", name: "Place Decision", purpose: "ລວມຂໍ້ມູນຈຳເປັນໃຫ້ຕັດສິນໃຈໄປ ຫຼືບໍ່ໄປ", route: "/prototype?screen=place", states: ["default", "disabled", "stale", "sponsored", "long_text"] },
  { id: "SCR-G05", group: "Guest/Pilot", name: "Consent & Privacy", purpose: "ໃຫ້ທາງເລືອກ analytics ທີ່ຊັດ ແລະປ່ຽນໃຈໄດ້", route: "/prototype?consent=pending", states: ["default"] },
  { id: "SCR-A00", group: "Admin", name: "Executive Overview", purpose: "ເຫັນສຸຂະພາບ Platform 360° ຈາກ content ຫາ revenue", route: "/admin", states: ["default", "loading", "error", "unauthorized"] },
  { id: "SCR-A01", group: "Admin", name: "Operations Queue", purpose: "ຈັດລຳດັບ Place/Trust work ຕາມ priority, SLA ແລະ owner", route: "/admin/queue", states: ["default", "loading", "empty", "error", "unauthorized"] },
  { id: "SCR-A02", group: "Admin", name: "Place 360 & Editor", purpose: "ເຫັນ ແລະແກ້ Place record ຄູ່ກັບ evidence, performance ແລະ readiness", route: "/admin/places/:placeId", states: ["default", "error", "conflict", "unauthorized"] },
  { id: "SCR-A03", group: "Admin", name: "Trust & Safety", purpose: "ຕັດສິນ report/takedown/correction ດ້ວຍ policy, evidence ແລະ audit trail", route: "/admin/trust/:caseId", states: ["default", "loading", "error", "unauthorized"] },
  { id: "SCR-A04", group: "Admin", name: "Content & Sources", purpose: "ຄວບຄຸມ content intake, source rights, freshness ແລະ publishing pipeline", route: "/admin/content", states: ["default", "loading", "empty", "error", "unauthorized"] },
  { id: "SCR-A05", group: "Admin", name: "Partners", purpose: "ບໍລິຫານຮ້ານຈາກ lead ຫາ pilot, active partner ແລະ renewal", route: "/admin/partners", states: ["default", "loading", "empty", "error", "unauthorized"] },
  { id: "SCR-A06", group: "Admin", name: "Campaigns", purpose: "ຈັດການ Sponsored Campaign ໂດຍແຍກໂຄສະນາອອກຈາກ review score", route: "/admin/campaigns", states: ["default", "loading", "empty", "error", "unauthorized"] },
  { id: "SCR-A07", group: "Admin", name: "Analytics", purpose: "ວັດ discovery, Decision Intent, contact action ແລະ Place performance", route: "/admin/analytics", states: ["default", "loading", "error", "unauthorized"] },
  { id: "SCR-A08", group: "Admin", name: "Revenue & Finance", purpose: "ເຫັນ revenue stream, invoice, expense, cash runway ແລະ budget gate", route: "/admin/finance", states: ["default", "loading", "empty", "error", "unauthorized"] },
  { id: "SCR-A09", group: "Admin", name: "System & Access", purpose: "ຄວບຄຸມ role, permission, integration, feature flag ແລະ system health", route: "/admin/settings", states: ["default", "loading", "error", "unauthorized"] },
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

const adminPrototypeModules: Record<AdminScreenId, string> = {
  "SCR-A00":"overview", "SCR-A01":"queue", "SCR-A02":"places", "SCR-A03":"trust", "SCR-A04":"content",
  "SCR-A05":"partners", "SCR-A06":"campaigns", "SCR-A07":"analytics", "SCR-A08":"finance", "SCR-A09":"system",
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
  "SCR-A00": { section: "Command center", title: "Executive Overview", description: "Monitor the full operating model from content supply to cash runway." },
  "SCR-A01": { section: "Operations", title: "Operations Queue", description: "Prioritize, assign and resolve Place and Trust work." },
  "SCR-A02": { section: "Place catalog", title: "Place 360 & Editor", description: "Maintain verified place data and see its complete operating context." },
  "SCR-A03": { section: "Trust & Safety", title: "Moderation Case", description: "Review evidence and record an auditable policy decision." },
  "SCR-A04": { section: "Content operations", title: "Content & Sources", description: "Control intake, rights, freshness, quality and publishing flow." },
  "SCR-A05": { section: "Commercial", title: "Partner Management", description: "Manage every business relationship from lead through renewal." },
  "SCR-A06": { section: "Commercial", title: "Sponsored Campaigns", description: "Plan, approve and measure transparent sponsored placement." },
  "SCR-A07": { section: "Insights", title: "Platform Analytics", description: "Turn discovery and decision behavior into operating insight." },
  "SCR-A08": { section: "Finance", title: "Revenue & Finance", description: "Track verified revenue, expenses, budget gates and cash runway." },
  "SCR-A09": { section: "Administration", title: "System & Access", description: "Manage people, permissions, integrations and platform controls." },
};

const adminModules: Array<{ id: AdminScreenId; label: string; icon: string; group: "Operate" | "Grow" | "Control"; count?: string }> = [
  { id: "SCR-A00", label: "Overview", icon: "⌂", group: "Operate" },
  { id: "SCR-A01", label: "Work queue", icon: "☷", group: "Operate", count: "17" },
  { id: "SCR-A02", label: "Places", icon: "⌖", group: "Operate" },
  { id: "SCR-A03", label: "Trust & Safety", icon: "⚑", group: "Operate", count: "3" },
  { id: "SCR-A04", label: "Content", icon: "▶", group: "Operate", count: "12" },
  { id: "SCR-A05", label: "Partners", icon: "◇", group: "Grow" },
  { id: "SCR-A06", label: "Campaigns", icon: "◉", group: "Grow", count: "4" },
  { id: "SCR-A07", label: "Analytics", icon: "▥", group: "Grow" },
  { id: "SCR-A08", label: "Finance", icon: "₭", group: "Control" },
  { id: "SCR-A09", label: "System", icon: "⚙", group: "Control" },
];

function AdminShell({ screen, state, children, onNavigate }: { screen: AdminScreenId; state: UiState; children: ReactNode; onNavigate: (screen: AdminScreenId) => void }) {
  const meta = adminMeta[screen];
  const [launcherOpen, setLauncherOpen] = useState(false);
  const moduleMenus: Record<AdminScreenId, string[]> = {
    "SCR-A00": ["Dashboards", "My Dashboard", "Reporting"],
    "SCR-A01": ["My Work", "All Work", "Activities", "Reporting"],
    "SCR-A02": ["Places", "Categories", "Sources", "Configuration"],
    "SCR-A03": ["Cases", "Appeals", "Policies", "Reporting"],
    "SCR-A04": ["Content", "Sources", "Publishing", "Configuration"],
    "SCR-A05": ["Pipeline", "Partners", "Activities", "Reporting"],
    "SCR-A06": ["Campaigns", "Creative", "Delivery", "Reporting"],
    "SCR-A07": ["Dashboards", "Audience", "Places", "Attribution"],
    "SCR-A08": ["Overview", "Payments", "Expenses", "Reporting"],
    "SCR-A09": ["Users", "Access Rights", "Integrations", "Technical"],
  };
  return <div className={styles.adminApp}>
    <aside className={styles.adminSidebar}>
      <div className={styles.adminBrand}><button aria-label="Open application launcher" aria-expanded={launcherOpen} onClick={() => setLauncherOpen(value => !value)}>▦</button><div><strong>{meta.title}</strong><small>ພ້ອມໄປ</small></div></div>
      <nav aria-label={`${meta.title} menus`}>{moduleMenus[screen].map((label, index) => <button key={label} aria-current={index === 0 ? "page" : undefined}><span>{label}</span>{index === 0 ? <i>⌄</i> : null}</button>)}</nav>
      <div className={styles.adminTopUtilities}><button aria-label="Messages">✉<em>2</em></button><button aria-label="Activities">◷<em>5</em></button><button aria-label="Help">?</button><button className={styles.companyMenu}>Laos Pilot Operations　⌄</button></div>
      <div className={styles.adminUser}><b>KS</b><div><strong>Kommaly S.</strong><small>Administrator</small></div><span>⌄</span></div>
    </aside>
    <main className={styles.adminMain}>
      <header className={styles.adminTopbar}>
        <div><small>ພ້ອມໄປ　/　{meta.section}　/　{screen}</small><h2>{meta.title}</h2><p>{meta.description}</p></div>
        <div className={styles.adminTopActions}><button className={styles.adminSearch}>⌕ <span>Search in {meta.title}…</span><kbd>⌘ K</kbd></button><button aria-label="Favorite">☆</button><button aria-label="Actions">⚙</button></div>
      </header>
      <div className={styles.adminContent}><StateNotice state={state} />{children}</div>
      {launcherOpen ? <div className={styles.appLauncher}><header><div><small>ພ້ອມໄປ · APPLICATIONS</small><b>ເລືອກ Module ທີ່ຕ້ອງການເຮັດວຽກ</b></div><button onClick={() => setLauncherOpen(false)}>×</button></header><label><span>⌕</span><input aria-label="Search applications" placeholder="ຄົ້ນຫາ Module…" /></label><div>{adminModules.map(item => <button key={item.id} onClick={() => { onNavigate(item.id); setLauncherOpen(false); }}><i>{item.icon}</i><span><b>{item.label}</b><small>{adminMeta[item.id].section}</small></span>{item.count ? <em>{item.count}</em> : null}</button>)}</div></div> : null}
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

function ModuleToolbar({ primary = "＋ Create", views = ["☷", "▦", "▥"] }: { primary?: string; views?: string[] }) {
  return <section className={styles.moduleToolbar}><button className={styles.primaryAction}>{primary}</button><div className={styles.omniFilter}><span>⌕</span><b>Search</b><i>▾</i><button>Filters</button><button>Group By</button><button>Favorites</button></div><div className={styles.viewSwitcher}>{views.map((view, index) => <button key={view} aria-pressed={index === 0}>{view}</button>)}</div><span className={styles.recordPager}>1–20 / 148　‹　›</span></section>;
}

function MetricStrip({ items }: { items: Array<[string, string, string, string]> }) {
  return <section className={styles.portalMetrics}>{items.map(item => <article key={item[0]}><span>{item[3]}</span><div><small>{item[0]}</small><b>{item[1]}</b><em>{item[2]}</em></div></article>)}</section>;
}

function ExecutiveOverview() {
  const bars = [42, 55, 49, 67, 61, 78, 72, 86, 81, 94, 89, 100];
  return <>
    <section className={styles.portalLead}><div><small>FRIDAY · 28 AUGUST 2026</small><h3>Platform command center</h3><p>One operating view across audience, catalog, trust, partners and money.</p></div><div><button>Share snapshot</button><button>＋ Add dashboard</button></div></section>
    <section className={styles.globalFilters}><button>Period: Last 30 days　⌄</button><button>Province: All　⌄</button><button>Category: All　⌄</button><button>Partner type: All　⌄</button><span>Data refreshed 10:58</span></section>
    <MetricStrip items={[["Monthly active users","18,420","+14.8% vs prior","↗"],["Decision Intent rate","31.6%","+3.2 points","◎"],["Verified Places","486","91% fresh","⌖"],["Verified revenue","₭12.8M","74% of target","₭"]]} />
    <div className={styles.overviewGrid}>
      <section className={styles.portalCard}><header><div><small>GROWTH & DECISION</small><b>Discovery → decision trend</b></div><button>Monthly　⌄</button></header><div className={styles.trendChart}><div className={styles.chartScale}><span>24k</span><span>16k</span><span>8k</span><span>0</span></div><div className={styles.bars}>{bars.map((height, index) => <i key={index} style={{ height: `${height}%` }}><em>{index === 11 ? "18.4k" : ""}</em></i>)}</div></div><footer><span><i /> Discovery sessions</span><span><i /> Decision actions</span><b>Conversion 31.6%</b></footer></section>
      <section className={styles.portalCard}><header><div><small>BUSINESS FUNNEL</small><b>Partner pipeline</b></div><a>Open CRM →</a></header><div className={styles.funnelList}>{[["Qualified leads",36,"₭31.2M"],["Pilot invited",18,"₭10.8M"],["Pilot paid",9,"₭1.8M"],["Active partner",7,"₭1.4M MRR"]].map((item,index) => <article key={item[0]}><span>{index+1}</span><div><b>{item[0]}</b><i style={{width:`${100-index*19}%`}} /></div><strong>{item[1]}</strong><small>{item[2]}</small></article>)}</div></section>
      <section className={styles.portalCard}><header><div><small>OPERATIONAL HEALTH</small><b>What needs attention</b></div><a>View all 17 →</a></header><div className={styles.attentionList}><article data-tone="danger"><i>!</i><div><b>2 trust cases approaching SLA</b><small>Oldest case due in 22 minutes</small></div><button>Review</button></article><article data-tone="warning"><i>◷</i><div><b>43 Places need freshness check</b><small>Price or hours older than policy allows</small></div><button>Assign</button></article><article data-tone="info"><i>▶</i><div><b>12 sources awaiting rights review</b><small>3 may block scheduled publication</small></div><button>Inspect</button></article></div></section>
      <section className={styles.portalCard}><header><div><small>CASH CONTROL</small><b>Runway and budget gates</b></div><a>Open Finance →</a></header><div className={styles.runway}><div><span>Available cash</span><b>₭62.4M</b><small>Founder living cost included</small></div><div><span>Monthly burn</span><b>₭10.7M</b><small>Runway 5.8 months</small></div></div><div className={styles.budgetGate}><span><i style={{width:"30%"}} /></span><div><b>Gate 1 · Validation</b><small>₭7.5M of ₭25M experiment ceiling</small><strong>ON TRACK</strong></div></div></section>
    </div>
  </>;
}

function ContentSources() {
  const rows = [["SRC-284","TikTok · @kinlao","Restaurant review","Rights review","Today"],["SRC-281","Facebook · Lao Travel","Waterfall guide","Ready","29 Aug"],["SRC-276","YouTube · Stay Local","Hotel room tour","Needs transcript","30 Aug"],["SRC-269","TikTok · eat.with.me","Menu update","Source removed","Overdue"]];
  return <><ModuleToolbar primary="＋ Add source" /><MetricStrip items={[["New intake","48","Last 7 days","＋"],["Rights cleared","86%","41 of 48","✓"],["Publishing ready","29","8 scheduled","▶"],["Freshness risk","43","Needs recheck","◷"]]} /><section className={styles.pipelineStrip}>{[["Captured",48],["Classified",44],["Rights checked",41],["Place matched",37],["Ready to publish",29]].map((item,index)=><article key={item[0]}><span>{index+1}</span><div><b>{item[0]}</b><small>{item[1]} records</small></div>{index<4?<i>→</i>:null}</article>)}</section><section className={styles.dataPanel}><header><div><b>Content source register</b><small>Every public media reference keeps source, rights status, freshness and linked Place.</small></div><div><button>Owner: Any　⌄</button><button>Status: Open　⌄</button></div></header><table><thead><tr><th>Source ID</th><th>Origin / Creator</th><th>Content type</th><th>Compliance state</th><th>Next action</th><th /></tr></thead><tbody>{rows.map((row,index)=><tr key={row[0]}><td><code>{row[0]}</code></td><td><b>{row[1]}</b><small>{index===0?"Matched to PLC-041":"Linked Place available"}</small></td><td>{row[2]}</td><td><span data-tone={index===3?"danger":index===0||index===2?"warning":"success"}>{row[3]}</span></td><td>{row[4]}</td><td><button>•••</button></td></tr>)}</tbody></table></section></>;
}

function PartnerManagement() {
  const columns = [
    {title:"Qualified",value:"₭31.2M",cards:[["ຮ້ານຄົວລາວ","Restaurant · Vientiane","Next: Call today"],["Mekong View Hotel","Hotel · Pakse","Next: Verify owner"]]},
    {title:"Pilot invited",value:"₭10.8M",cards:[["ກາເຟພູດອຍ","Café · Luang Prabang","Proposal sent"],["River Garden","Restaurant · Vang Vieng","Meeting 30 Aug"]]},
    {title:"Paid pilot",value:"₭1.8M",cards:[["ເຮືອນຄົວວຽງ","Restaurant · Vientiane","₭200k · Month 2"],["Sabaidee Stay","Hotel · Thakhek","₭200k · Month 1"]]},
    {title:"Active partner",value:"₭1.4M MRR",cards:[["Green Discovery","Tour · Multi-province","Renewal in 28d"],["Lao Table","Restaurant · Vientiane","Healthy account"]]},
  ];
  return <><ModuleToolbar primary="＋ New partner" views={["▦","☷","▥"]} /><MetricStrip items={[["Pipeline value","₭45.2M","Weighted ₭13.4M","₭"],["Paid pilots","9","50% conversion","◇"],["Monthly recurring","₭1.4M","7 active partners","↗"],["Renewal risk","2","Action this week","!"]]} /><section className={styles.kanbanBoard}>{columns.map(column=><section key={column.title}><header><div><b>{column.title}</b><span>{column.cards.length}</span></div><small>{column.value}</small></header>{column.cards.map(card=><article key={card[0]}><div><span>{card[0].slice(0,1)}</span><div><b>{card[0]}</b><small>{card[1]}</small></div></div><p>{card[2]}</p><footer><span className={styles.ownerAvatar}>KS</span><div><i /><i /><i /></div><button>•••</button></footer></article>)}<button className={styles.addCard}>＋ Add</button></section>)}</section></>;
}

function CampaignManagement() {
  const campaigns=[["CAM-026","Weekend Food Discovery","Live","24–31 Aug","128k","8.4%","₭1,000,000"],["CAM-024","Stay Local Luang Prabang","Review","1–14 Sep","—","—","₭1,000,000"],["CAM-021","Green Season Escape","Completed","1–15 Aug","286k","11.2%","₭1,000,000"]];
  return <><ModuleToolbar primary="＋ New campaign" /><MetricStrip items={[["Active campaigns","4","2 end this week","◉"],["Sponsored reach","412k","+18% vs plan","↗"],["Decision Intent","9.7%","Organic baseline 7.1%","◎"],["Booked revenue","₭4.0M","100% verified","₭"]]} /><section className={styles.complianceBanner}><i>✓</i><div><b>Sponsored integrity is enforced</b><small>Placement is visibly labeled “Sponsored”; campaign payment cannot change rating, review order or trust score.</small></div><button>View policy</button></section><section className={styles.dataPanel}><header><div><b>Campaign register</b><small>Plan, creative approval, delivery, decision outcome and billing in one record.</small></div><div><button>Timeline</button><button>All campaigns　⌄</button></div></header><table><thead><tr><th>Campaign</th><th>Status</th><th>Flight</th><th>Reach</th><th>Decision rate</th><th>Revenue</th><th /></tr></thead><tbody>{campaigns.map((row,index)=><tr key={row[0]}><td><code>{row[0]}</code><b>{row[1]}</b></td><td><span data-tone={index===0?"success":index===1?"warning":"neutral"}>{row[2]}</span></td><td>{row[3]}</td><td>{row[4]}</td><td>{row[5]}</td><td><b>{row[6]}</b></td><td><button>•••</button></td></tr>)}</tbody></table></section></>;
}

function AnalyticsDashboard() {
  const points=[35,48,44,58,52,69,73,68,82,77,91,96];
  return <><section className={styles.globalFilters}><button>Period: 1–28 Aug 2026　⌄</button><button>Audience: All　⌄</button><button>Province: All　⌄</button><button>Attribution: First touch　⌄</button><span>Privacy-safe aggregate</span></section><MetricStrip items={[["Discovery sessions","58,214","+16.2%","◉"],["Search success","72.8%","+4.1 points","⌕"],["Decision Intent","18,420","31.6% of sessions","◎"],["Contact / Map action","7,286","39.6% of intent","↗"]]} /><div className={styles.analyticsGrid}><section className={`${styles.portalCard} ${styles.wideCard}`}><header><div><small>BEHAVIOR TREND</small><b>Discovery and Decision Intent</b></div><div><button>Sessions</button><button>Decision Intent</button></div></header><div className={styles.lineChart}><div>{points.map((point,index)=><i key={index} style={{height:`${point}%`}}><span /></i>)}</div><footer>{["1 Aug","7 Aug","14 Aug","21 Aug","28 Aug"].map(label=><span key={label}>{label}</span>)}</footer></div></section><section className={styles.portalCard}><header><div><small>DECISION FUNNEL</small><b>Where users move forward</b></div></header><div className={styles.decisionFunnel}>{[["Viewed Place",32180,"100%"],["Opened details",24604,"76%"],["Decision Intent",18420,"57%"],["Map / Contact",7286,"23%"]].map(item=><div key={item[0]}><span style={{width:item[2]}}><b>{item[0]}</b></span><strong>{item[1].toLocaleString()}</strong></div>)}</div></section><section className={styles.portalCard}><header><div><small>TOP PLACES</small><b>Decision contribution</b></div><a>Full report →</a></header><ol className={styles.ranking}>{[["ເຮືອນຄົວວຽງ","1,284","42%"],["ຕາດກວາງຊີ","1,102","38%"],["Mekong View","946","35%"],["ກາເຟພູດອຍ","804","33%"]].map((item,index)=><li key={item[0]}><span>{index+1}</span><b>{item[0]}</b><small>{item[1]} intent</small><strong>{item[2]}</strong></li>)}</ol></section></div></>;
}

function FinanceDashboard() {
  return <><ModuleToolbar primary="＋ Record payment" views={["☷","▥"]} /><MetricStrip items={[["Verified revenue","₭12.8M","Aug month-to-date","₭"],["Recurring revenue","₭1.4M","7 partner accounts","↗"],["Operating expense","₭10.7M","Within monthly plan","−"],["Cash runway","5.8 mo","₭62.4M available","◷"]]} /><div className={styles.financeGrid}><section className={styles.portalCard}><header><div><small>REVENUE MIX</small><b>Only paid evidence is counted</b></div><button>August　⌄</button></header><div className={styles.revenueDonut}><div><b>₭12.8M</b><small>Total</small></div><ul><li><i data-tone="one" />Sponsored Campaign <b>₭8.0M</b></li><li><i data-tone="two" />Founding Partner Pilot <b>₭1.8M</b></li><li><i data-tone="three" />Pro Business <b>₭1.4M</b></li><li><i data-tone="four" />Affiliate / other <b>₭1.6M</b></li></ul></div></section><section className={styles.portalCard}><header><div><small>BUDGET CONTROL</small><b>Experiment ceiling · ₭25M</b></div><span>Gate 1</span></header><div className={styles.budgetSummary}><div><span><i style={{width:"30%"}} /></span><b>₭7.5M released</b><small>Release next 35% only after Gate 1 evidence passes.</small></div><dl><div><dt>Spent</dt><dd>₭5.9M</dd></div><div><dt>Committed</dt><dd>₭1.1M</dd></div><div><dt>Available</dt><dd>₭0.5M</dd></div></dl></div></section><section className={`${styles.dataPanel} ${styles.financeTable}`}><header><div><b>Recent financial evidence</b><small>Interest or verbal promise is never recorded as revenue.</small></div><button>Reconcile　3</button></header><table><thead><tr><th>Evidence</th><th>Counterparty</th><th>Type</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{[["PAY-082","Lao Table","Campaign","28 Aug","₭1,000,000","Verified"],["INV-041","Sabaidee Stay","Pilot","27 Aug","₭200,000","Paid"],["EXP-119","Cloud provider","Server","26 Aug","−₭820,000","Matched"]].map((row,index)=><tr key={row[0]}><td><code>{row[0]}</code></td><td><b>{row[1]}</b></td><td>{row[2]}</td><td>{row[3]}</td><td><b>{row[4]}</b></td><td><span data-tone={index===2?"neutral":"success"}>{row[5]}</span></td></tr>)}</tbody></table></section></div></>;
}

function SystemAccess() {
  return <><ModuleToolbar primary="＋ Invite user" views={["☷","▦"]} /><MetricStrip items={[["Active users","8","4 roles","♙"],["Pending access","2","Owner approval","◷"],["Integrations","6 / 7","1 degraded","⌁"],["Audit events","1,842","Last 30 days","◎"]]} /><div className={styles.systemGrid}><section className={styles.portalCard}><header><div><small>ROLE-BASED ACCESS</small><b>Users and responsibility</b></div><a>Manage roles →</a></header><div className={styles.userList}>{[["KS","Kommaly S.","Platform Administrator","All modules"],["ML","Mali L.","Trust Reviewer","Trust · Content"],["NP","Noy P.","Data Steward","Places · Content"],["VK","Vanh K.","Commercial Manager","Partners · Campaigns"]].map(user=><article key={user[0]}><span>{user[0]}</span><div><b>{user[1]}</b><small>{user[2]}</small></div><em>{user[3]}</em><button>•••</button></article>)}</div></section><section className={styles.portalCard}><header><div><small>INTEGRATIONS</small><b>Connected services</b></div><a>Configure →</a></header><div className={styles.integrationList}>{[["API","Core application API","Operational"],["MAP","Map link provider","Operational"],["OBJ","Object media storage","Operational"],["MAIL","Transactional email","Degraded"]].map((item,index)=><article key={item[0]}><span>{item[0]}</span><div><b>{item[1]}</b><small>{index===3?"Latency above target":"Checked less than 2m ago"}</small></div><i data-tone={index===3?"warning":"success"}>{item[2]}</i></article>)}</div></section><section className={styles.portalCard}><header><div><small>FEATURE CONTROL</small><b>Pilot release flags</b></div><a>Open deployment →</a></header><div className={styles.flagList}>{([["Guest video feed",true,"100%"],["AI recommendations",false,"Internal only"],["Partner self-service",false,"5 pilot accounts"],["Booking transaction",false,"Deferred"]] as Array<[string, boolean, string]>).map(item=><label key={item[0]}><span><b>{item[0]}</b><small>{item[2]}</small></span><input type="checkbox" defaultChecked={Boolean(item[1])} /></label>)}</div></section><section className={styles.portalCard}><header><div><small>SECURITY & AUDIT</small><b>Latest privileged activity</b></div><a>Full audit log →</a></header><div className={styles.auditFeed}><article><i>10:42</i><div><b>Place version published</b><small>KS · PLC-041 · before/after retained</small></div></article><article><i>10:18</i><div><b>Trust case evidence protected</b><small>ML · CAS-019 · CON-04</small></div></article><article><i>09:51</i><div><b>Role permission changed</b><small>KS · USER-007 · owner approval</small></div></article></div></section></div></>;
}

function AdminPreview({ screen, state, onNavigate }: { screen: AdminScreenId; state: UiState; onNavigate: (screen: AdminScreenId) => void }) {
  const content: Record<AdminScreenId, ReactNode> = {
    "SCR-A00": <ExecutiveOverview />, "SCR-A01": <OperationsQueue state={state} />, "SCR-A02": <PlaceEditor />, "SCR-A03": <ModerationCase />, "SCR-A04": <ContentSources />, "SCR-A05": <PartnerManagement />, "SCR-A06": <CampaignManagement />, "SCR-A07": <AnalyticsDashboard />, "SCR-A08": <FinanceDashboard />, "SCR-A09": <SystemAccess />,
  };
  return <AdminShell screen={screen} state={state} onNavigate={onNavigate}>{content[screen]}</AdminShell>;
}

export default function FinalDesignGallery({ basePath }: { basePath: string }) {
  const [screenId, setScreenId] = useState<ScreenId>("SCR-A00");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [uiState, setUiState] = useState<UiState>("default");
  const screen = screens.find(item => item.id === screenId)!;
  const isGuest = screen.group === "Guest/Pilot";
  const guestScreenId = isGuest ? screenId as GuestScreenId : "SCR-G01";
  const guestConsent = guestScreenId === "SCR-G05" ? "pending" : "essential";
  const guestPrototypeUrl = `${basePath}/prototype?embed=1&screen=${guestPrototypeScreens[guestScreenId]}&state=${uiState}&consent=${guestConsent}`;
  const adminPrototypeUrl = isGuest ? "" : `${basePath}/admin-prototype?module=${adminPrototypeModules[screenId as AdminScreenId]}`;

  const chooseScreen = (id: ScreenId) => {
    const next = screens.find(item => item.id === id)!;
    setScreenId(id); setUiState("default"); setViewport(next.group === "Admin" ? "desktop" : "mobile");
  };

  return <main className={styles.site}>
    <header className={styles.topbar}><a href={`${basePath}/documents/full-ux-ui`}><b>UX-05</b><span>FINAL DESIGN GALLERY</span></a><nav><a href={`${basePath}/prototype`}>Guest Prototype R2.3</a><a href={`${basePath}/admin-prototype`}>Admin Prototype R3.2</a><a href={`${basePath}/design-system`}>UX-04 Gallery</a><a href={`${basePath}/documents`}>Documents</a></nav></header>
    <section className={styles.hero}><div><small>FULL UX/UI DESIGN · BASELINE 0.9.2</small><h1>ໜ້າຈໍສຳລັບຕັດສິນໃຈ<br/><em>ແລະພ້ອມທົດລອງ Workflow</em></h1></div><p>Guest/Pilot ໃຊ້ Prototype R2.3 ເປັນແຫຼ່ງອອກແບບດຽວ. Admin R3.2 ເລືອກ Main Module ຈາກ Application Launcher; Header Menu ສະແດງສະເພາະ Sub-Menu ຂອງ Module ປັດຈຸບັນ ແລະບໍ່ມີ navigation ຊັ້ນທີສອງ. ໜ້າວຽກລະອຽດຍັງຄົງມີ KPI, records, control, evidence, owner, next action ແລະ audit.</p></section>
    <section className={styles.workspace}>
      <aside className={styles.registry}><div><small>SCREEN REGISTRY</small><b>14 Screen / Module Views</b></div>{["Guest/Pilot", "Admin"].map(group => <section key={group}><h2>{group}</h2>{screens.filter(item => item.group === group).map(item => <button key={item.id} aria-pressed={screenId === item.id} onClick={() => chooseScreen(item.id)}><code>{item.id}</code><span><b>{item.name}</b><small>{item.route}</small></span></button>)}</section>)}</aside>
      <div className={styles.board}>
        <header className={styles.boardTools}><div><code>{screen.id}</code><span><b>{screen.name}</b><small>{screen.purpose}</small></span></div><div className={styles.switches}><span className={styles.sourceBadge}>{isGuest ? "LIVE · GUEST PROTOTYPE R2.3" : "LIVE · ADMIN WORKFLOW R3.2"}</span>{!isGuest ? <span aria-label="Viewport selector">{(["mobile", "tablet", "desktop"] as Viewport[]).map(item => <button key={item} aria-pressed={viewport === item} onClick={() => setViewport(item)}>{item}</button>)}</span> : <span aria-label="State selector">{screen.states.map(item => <button key={item} aria-pressed={uiState === item} onClick={() => setUiState(item)}>{stateLabels[item]}</button>)}</span>}</div></header>
        <div className={`${styles.canvas} ${styles[isGuest ? "mobile" : viewport]}`}><div className={styles.viewportLabel}><b>{isGuest ? "390 × 844 · Guest prototype" : viewport === "mobile" ? "390 × 844" : viewport === "tablet" ? "768 × 1024" : "1440 × 900"}</b><span>{isGuest ? uiState : "interactive"}</span></div><div className={`${styles.preview} ${styles.prototypePreview}`}>{isGuest ? <iframe key={guestPrototypeUrl} src={guestPrototypeUrl} title={`Prototype R2.3 · ${screen.name} · ${stateLabels[uiState]}`} /> : <iframe key={adminPrototypeUrl} src={adminPrototypeUrl} title={`Admin Workflow Prototype R3.2 · ${screen.name}`} />}</div></div>
        <footer className={styles.specBar}><div><small>PRIMARY OUTCOME</small><b>{screen.purpose}</b></div><div><small>DATA CONTRACT</small><b>{screen.group === "Admin" ? "Application Launcher Modules · one-level Header Sub-Menu · record workspace · audit" : "Place ID · source · freshness · action availability"}</b></div><div><small>HANDOFF STATUS</small><b>{isGuest ? "Prototype parity · single source of truth" : "Admin Workflow R3.2 · interactive prototype · backend/auth not connected"}</b></div></footer>
      </div>
    </section>
  </main>;
}
