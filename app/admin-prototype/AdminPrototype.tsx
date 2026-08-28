"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import styles from "./admin-prototype.module.css";

type ModuleId = "overview" | "queue" | "places" | "content" | "trust" | "partners" | "campaigns" | "analytics" | "finance" | "system";
type WorkStatus = "New" | "In review" | "Escalated" | "Resolved";
type WorkItem = { id:string; title:string; type:string; priority:"P0"|"P1"|"P2"; owner:string; due:string; status:WorkStatus };
type Place = { id:string; name:string; category:string; phone:string; address:string; status:"Draft"|"Review"|"Published"; freshness:number; sources:number };
type Source = { id:string; title:string; creator:string; platform:string; place:string; stage:"Captured"|"Rights review"|"Matched"|"Ready"|"Published" };
type TrustCase = { id:string; title:string; place:string; priority:"P0"|"P1"; status:"Open"|"Review"|"Resolved"; evidence:number; note:string };
type Partner = { id:string; name:string; category:string; stage:"Lead"|"Pilot invited"|"Paid pilot"|"Active"|"Renewal"; value:number; next:string };
type Campaign = { id:string; name:string; partner:string; status:"Draft"|"Review"|"Live"|"Completed"; budget:number; reach:number; intent:number };
type Transaction = { id:string; counterparty:string; type:"Campaign"|"Pilot"|"Subscription"|"Expense"; amount:number; status:"Pending"|"Verified"; date:string };
type User = { id:string; name:string; role:string; scope:string; active:boolean };

const modules: Array<{id:ModuleId; icon:string; label:string; section:string}> = [
  {id:"overview",icon:"⌂",label:"Overview",section:"Command center"}, {id:"queue",icon:"☷",label:"Operations",section:"Work management"},
  {id:"places",icon:"⌖",label:"Places",section:"Catalog & facts"}, {id:"content",icon:"▶",label:"Content",section:"Sources & rights"},
  {id:"trust",icon:"◇",label:"Trust",section:"Policy decisions"}, {id:"partners",icon:"♙",label:"Partners",section:"Commercial CRM"},
  {id:"campaigns",icon:"◎",label:"Campaigns",section:"Sponsored delivery"}, {id:"analytics",icon:"↗",label:"Analytics",section:"Decision insight"},
  {id:"finance",icon:"₭",label:"Finance",section:"Evidence & runway"}, {id:"system",icon:"⚙",label:"System",section:"Access & controls"},
];

const subMenus: Record<ModuleId, Array<{id:string; label:string}>> = {
  overview: [{id:"dashboard",label:"Dashboard"},{id:"my-dashboard",label:"My Dashboard"},{id:"reports",label:"Reports"},{id:"alerts",label:"Alerts"},{id:"system-health",label:"System Health"}],
  queue: [{id:"my-queue",label:"My Queue"},{id:"all-work",label:"All Work"},{id:"sla-monitor",label:"SLA Monitor"},{id:"automation",label:"Automation"}],
  places: [{id:"all-places",label:"All Places"},{id:"needs-review",label:"Needs Review"},{id:"categories",label:"Categories"},{id:"source-coverage",label:"Source Coverage"},{id:"corrections",label:"Corrections"},{id:"import-export",label:"Import / Export"}],
  content: [{id:"source-inbox",label:"Source Inbox"},{id:"rights-review",label:"Rights Review"},{id:"place-matching",label:"Place Matching"},{id:"publishing",label:"Publishing"},{id:"creators",label:"Creators"}],
  trust: [{id:"cases",label:"Cases"},{id:"reports",label:"Reports"},{id:"appeals",label:"Appeals"},{id:"policies",label:"Policies"},{id:"reason-codes",label:"Reason Codes"}],
  partners: [{id:"pipeline",label:"Pipeline"},{id:"accounts",label:"Accounts"},{id:"pilot",label:"Pilot"},{id:"renewals",label:"Renewals"},{id:"activities",label:"Activities"},{id:"performance",label:"Performance"}],
  campaigns: [{id:"all-campaigns",label:"All Campaigns"},{id:"calendar",label:"Calendar"},{id:"creative-review",label:"Creative Review"},{id:"sponsored-compliance",label:"Sponsored Compliance"},{id:"billing",label:"Billing"}],
  analytics: [{id:"audience",label:"Audience"},{id:"search",label:"Search"},{id:"decision-intent",label:"Decision Intent"},{id:"places",label:"Places"},{id:"campaign-attribution",label:"Campaign Attribution"},{id:"exports",label:"Exports"}],
  finance: [{id:"overview",label:"Overview"},{id:"payments",label:"Payments"},{id:"invoices",label:"Invoices"},{id:"expenses",label:"Expenses"},{id:"budget-gates",label:"Budget Gates"},{id:"runway",label:"Runway"}],
  system: [{id:"users",label:"Users"},{id:"roles",label:"Roles"},{id:"record-rules",label:"Record Rules"},{id:"integrations",label:"Integrations"},{id:"feature-flags",label:"Feature Flags"},{id:"audit",label:"Audit"},{id:"deployments",label:"Deployments"}],
};

const copy: Record<ModuleId,{eyebrow:string;title:string;description:string;primary?:string}> = {
  overview:{eyebrow:"EXECUTIVE OVERVIEW",title:"Platform command center",description:"ເບິ່ງ audience, operations, trust, commercial ແລະ cash runway ໃນບ່ອນດຽວ"},
  queue:{eyebrow:"OPERATIONS / WORK QUEUE",title:"ວຽກທີ່ຕ້ອງດຳເນີນການ",description:"ຈັດລຳດັບ, ມອບໝາຍ ແລະປິດວຽກພ້ອມ Audit",primary:"＋ ສ້າງວຽກ"},
  places:{eyebrow:"CATALOG / PLACE 360",title:"ຂໍ້ມູນສະຖານທີ່",description:"ແກ້ຂໍ້ມູນ, ກວດແຫຼ່ງອ້າງອີງ ແລະຄວບຄຸມການ Publish",primary:"＋ ສ້າງ Place"},
  content:{eyebrow:"CONTENT / SOURCES",title:"Content intake & publishing",description:"ຕິດຕາມ Source ຈາກ capture ຫາ rights, Place match ແລະ publish",primary:"＋ ເພີ່ມ Source"},
  trust:{eyebrow:"TRUST & SAFETY",title:"ຄຳຮ້ອງຮຽນແລະການຕັດສິນ",description:"ກວດຫຼັກຖານ, ໃຊ້ Policy ແລະບັນທຶກຄຳຕັດສິນທີ່ກວດຍ້ອນຫຼັງໄດ້"},
  partners:{eyebrow:"PARTNER CRM",title:"ຮ້ານຄູ່ຮ່ວມທຸລະກິດ",description:"ຕິດຕາມຈາກ Lead ຫາ Pilot, ຊຳລະເງິນ, Active ແລະ Renewal",primary:"＋ New partner"},
  campaigns:{eyebrow:"SPONSORED CAMPAIGNS",title:"Campaign operations",description:"ວາງແຜນ, ກວດ Creative, ເປີດ Campaign ແລະວັດ Decision Intent",primary:"＋ New campaign"},
  analytics:{eyebrow:"ANALYTICS",title:"Discovery → Decision",description:"ວັດພຶດຕິກຳທີ່ຊ່ວຍຕັດສິນໃຈ ບໍ່ແມ່ນພຽງ View ຫຼື Like"},
  finance:{eyebrow:"REVENUE & FINANCE",title:"ຫຼັກຖານລາຍຮັບແລະ Runway",description:"ນັບສະເພາະເງິນທີ່ມີຫຼັກຖານ, ຕິດຕາມລາຍຈ່າຍ ແລະເພດານງົບ",primary:"＋ ບັນທຶກທຸລະກຳ"},
  system:{eyebrow:"SYSTEM & ACCESS",title:"Users, roles and platform controls",description:"ຄວບຄຸມສິດ, Integration, Feature Flag ແລະ privileged audit",primary:"＋ Invite user"},
};

const seedWork: WorkItem[] = [
  {id:"CAS-019",title:"Original review source removed",type:"Trust case · Source integrity",priority:"P0",owner:"Mali L.",due:"Overdue 42m",status:"Escalated"},
  {id:"PLC-041",title:"ເຮືອນຄົວວຽງ",type:"Place data · Freshness review",priority:"P1",owner:"Kommaly S.",due:"Today 14:30",status:"In review"},
  {id:"SRC-284",title:"TikTok review rights check",type:"Content · Rights review",priority:"P1",owner:"Unassigned",due:"Today 16:00",status:"New"},
  {id:"REQ-028",title:"Business hours correction",type:"Correction · Owner submitted",priority:"P2",owner:"Noy P.",due:"Tomorrow",status:"New"},
];
const seedPlaces: Place[] = [
  {id:"PLC-041",name:"ເຮືອນຄົວວຽງ",category:"ຮ້ານອາຫານ",phone:"+856 20 5555 0141",address:"ບ້ານໂພນສະຫວັນ, ສີສັດຕະນາກ",status:"Review",freshness:91,sources:3},
  {id:"PLC-055",name:"ກາເຟພູດອຍ",category:"ຮ້ານກາເຟ",phone:"+856 20 5555 0322",address:"ຫຼວງພະບາງ",status:"Published",freshness:96,sources:5},
  {id:"PLC-061",name:"Mekong View Hotel",category:"ໂຮງແຮມ",phone:"+856 31 555 114",address:"ປາກເຊ, ຈຳປາສັກ",status:"Draft",freshness:64,sources:1},
];
const seedSources: Source[] = [
  {id:"SRC-284",title:"ຣີວິວເມນູອາຫານລາວ",creator:"@kinlao",platform:"TikTok",place:"PLC-041",stage:"Rights review"},
  {id:"SRC-281",title:"ຕາດກວາງຊີ guide",creator:"Lao Travel",platform:"Facebook",place:"PLC-055",stage:"Ready"},
  {id:"SRC-276",title:"Hotel room tour",creator:"Stay Local",platform:"YouTube",place:"PLC-061",stage:"Matched"},
];
const seedCases: TrustCase[] = [
  {id:"CAS-019",title:"Original review source removed",place:"PLC-041",priority:"P0",status:"Review",evidence:2,note:"Remove unavailable media reference; preserve independently verified Place facts."},
  {id:"CAS-021",title:"Incorrect opening hours",place:"PLC-055",priority:"P1",status:"Open",evidence:3,note:""},
];
const seedPartners: Partner[] = [
  {id:"PAR-011",name:"ຮ້ານຄົວລາວ",category:"Restaurant",stage:"Lead",value:1000000,next:"Call today"},
  {id:"PAR-014",name:"ກາເຟພູດອຍ",category:"Café",stage:"Pilot invited",value:200000,next:"Confirm pilot"},
  {id:"PAR-018",name:"ເຮືອນຄົວວຽງ",category:"Restaurant",stage:"Paid pilot",value:200000,next:"Send summary"},
  {id:"PAR-022",name:"Green Discovery",category:"Tour",stage:"Active",value:1000000,next:"Renewal in 28d"},
];
const seedCampaigns: Campaign[] = [
  {id:"CAM-026",name:"Weekend Food Discovery",partner:"ເຮືອນຄົວວຽງ",status:"Live",budget:1000000,reach:128000,intent:8.4},
  {id:"CAM-024",name:"Stay Local Luang Prabang",partner:"ກາເຟພູດອຍ",status:"Review",budget:1000000,reach:0,intent:0},
  {id:"CAM-021",name:"Green Season Escape",partner:"Green Discovery",status:"Completed",budget:1000000,reach:286000,intent:11.2},
];
const seedTransactions: Transaction[] = [
  {id:"PAY-082",counterparty:"Lao Table",type:"Campaign",amount:1000000,status:"Verified",date:"28 Aug"},
  {id:"INV-041",counterparty:"Sabaidee Stay",type:"Pilot",amount:200000,status:"Verified",date:"27 Aug"},
  {id:"PAY-086",counterparty:"ກາເຟພູດອຍ",type:"Pilot",amount:200000,status:"Pending",date:"28 Aug"},
  {id:"EXP-119",counterparty:"Cloud provider",type:"Expense",amount:-820000,status:"Verified",date:"26 Aug"},
];
const seedUsers: User[] = [
  {id:"USR-001",name:"Kommaly S.",role:"Platform Administrator",scope:"All modules",active:true},
  {id:"USR-004",name:"Mali L.",role:"Trust Reviewer",scope:"Trust · Content",active:true},
  {id:"USR-007",name:"Noy P.",role:"Data Steward",scope:"Places · Content",active:true},
];

const sourceStages: Source["stage"][] = ["Captured","Rights review","Matched","Ready","Published"];
const partnerStages: Partner["stage"][] = ["Lead","Pilot invited","Paid pilot","Active","Renewal"];
const campaignStages: Campaign["status"][] = ["Draft","Review","Live","Completed"];
const money = (value:number) => `${value < 0 ? "−" : ""}₭${Math.abs(value).toLocaleString("en-US")}`;

function Metric({label,value,detail,tone}:{label:string;value:string|number;detail:string;tone?:string}) {
  return <article><small>{label}</small><b>{value}</b><span data-tone={tone}>{detail}</span></article>;
}

function QuickCreate({kind,onClose,onCreate}:{kind:string;onClose:()=>void;onCreate:(name:string)=>void}) {
  const [name,setName] = useState("");
  const submit = (event:FormEvent) => { event.preventDefault(); if(name.trim()) onCreate(name.trim()); };
  return <div className={styles.modalBackdrop} role="presentation"><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="create-title"><header><div><small>QUICK CREATE</small><h2 id="create-title">{kind}</h2></div><button onClick={onClose} aria-label="Close">×</button></header><form onSubmit={submit}><label>ຊື່ ຫຼືຫົວຂໍ້<input autoFocus value={name} onChange={event=>setName(event.target.value)} placeholder="ປ້ອນຂໍ້ມູນ…" /></label><p>Prototype ຈະສ້າງ record ຕົວຢ່າງ ແລະເກັບ state ໄວ້ໃນ session ນີ້.</p><footer><button type="button" onClick={onClose}>ຍົກເລີກ</button><button className={styles.primary} disabled={!name.trim()}>ສ້າງ record</button></footer></form></section></div>;
}

type DetailBlueprint = { title:string; purpose:string; headline:string; records:string[]; control:string; evidence:string };
const detailView = (title:string,purpose:string,headline:string,records:string[],control:string,evidence:string):DetailBlueprint => ({title,purpose,headline,records,control,evidence});

const detailCatalog: Record<string,DetailBlueprint> = {
  "overview:my-dashboard": detailView("My operating dashboard","ລວມສະເພາະ KPI, ວຽກ ແລະການອະນຸມັດທີ່ຜູ້ໃຊ້ຄົນນີ້ຮັບຜິດຊອບ.","8 assigned items",["My priority queue","Pending approvals","Saved KPI view","Recent activity"],"ເຫັນສະເພາະ record ຕາມ Role ແລະ owner scope.","Assignment, due date ແລະ approval history"),
  "overview:reports": detailView("Management reports","ລາຍງານດຳເນີນງານ, trust, growth ແລະ finance ທີ່ export ແລະກວດທີ່ມາໄດ້.","12 report packs",["Weekly operating review","Place quality report","Decision Intent report","Revenue evidence report"],"Report ຕ້ອງລະບຸ period, filter, timezone ແລະ data owner.","Generated date, source query ແລະ export log"),
  "overview:alerts": detailView("Alerts & exceptions","ລວມບັນຫາທີ່ຕ້ອງແກ້ກ່ອນ SLA, trust, data quality ຫຼື cash control ເສຍຫາຍ.","5 need attention",["P0 trust SLA risk","Place freshness below threshold","Payment evidence missing","Email integration degraded"],"Alert ທຸກອັນຕ້ອງມີ severity, owner, deadline ແລະ escalation path.","Rule triggered, affected records ແລະ acknowledgement"),
  "overview:system-health": detailView("System health","ຕິດຕາມ API, database, media, notification ແລະ background job ໃນມຸມມອງທຸລະກິດ.","99.93% availability",["Core API","Media delivery","Search indexing","Notification service"],"ສະແດງ degraded state ແລະ impact ຕໍ່ user journey ຢ່າງຊັດເຈນ.","Heartbeat, incident timeline ແລະ recovery note"),

  "queue:all-work": detailView("All operational work","ສູນລວມວຽກຈາກ Place, Content, Trust, Partner ແລະ Finance ພ້ອມ filter ແລະ bulk assignment.","34 open records",["Trust and safety cases","Place verification tasks","Content rights checks","Commercial follow-ups"],"ຫ້າມປິດວຽກຖ້າ mandatory evidence ຍັງບໍ່ຄົບ.","Owner, SLA, state transition ແລະ resolution code"),
  "queue:sla-monitor": detailView("SLA monitor","ຈັດກຸ່ມວຽກຕາມ overdue, due soon, priority ແລະ team capacity.","1 overdue · 4 due soon",["P0 response SLA","Trust resolution SLA","Place correction SLA","Rights review SLA"],"P0 overdue ຕ້ອງ escalate ໄປ Platform Administrator ທັນທີ.","First response, resolution time ແລະ breach reason"),
  "queue:automation": detailView("Work automation","ກຳນົດ rule ສ້າງ, ມອບໝາຍ, ເຕືອນ ແລະ escalate ວຽກຊ້ຳໆ.","7 active rules",["Freshness recheck rule","Removed-source alert","Unassigned work routing","Payment evidence reminder"],"Automation ບໍ່ສາມາດຕັດສິນ Trust case ແທນຄົນ.","Rule version, trigger sample ແລະ execution log"),

  "places:needs-review": detailView("Places needing review","ຈັດລຳດັບ Place ທີ່ຂໍ້ມູນເກົ່າ, evidence ບໍ່ຄົບ, ມີ correction ຫຼືລໍ publish.","18 records need action",["Freshness below 90%","Contact data changed","Price/menu recheck","Draft waiting approval"],"Publish ໄດ້ເມື່ອ required fields ແລະ source checklist ຄົບ.","Before/after value, reviewer ແລະ source checked date"),
  "places:categories": detailView("Category management","ຄວບຄຸມ taxonomy, attribute template ແລະ required fields ຂອງ restaurant, hotel, attraction ແລະ service.","4 active categories",["Restaurant & café","Hotel & stay","Attraction & activity","Local service"],"ການປ່ຽນ category schema ຕ້ອງກວດ impact ຕໍ່ Place ເກົ່າ.","Schema version, affected count ແລະ migration result"),
  "places:source-coverage": detailView("Place source coverage","ເບິ່ງວ່າ Place ແຕ່ລະແຫ່ງມີ source ພຽງພໍ, ຫຼາກຫຼາຍ ແລະຍັງໃຊ້ໄດ້ຫຼືບໍ່.","82% meet baseline",["No linked source","Single-source dependency","Source removed","Coverage verified"],"Verified profile ບໍ່ໝາຍເຖິງ review score ສູງ.","Source URL, origin, checked date ແລະ rights state"),
  "places:corrections": detailView("Place corrections","ຮັບແລະກວດຄຳຂໍແກ້ຊື່, ເບີໂທ, ເວລາເປີດ, menu, price ຫຼື location.","6 pending requests",["Owner-submitted correction","User-reported correction","Internal data correction","Correction dispute"],"ຜູ້ສົ່ງຄຳຂໍບໍ່ສາມາດ approve ຂໍ້ມູນຕົນເອງ.","Submitter, proof, field diff ແລະ reviewer decision"),
  "places:import-export": detailView("Place import & export","ຈັດການ CSV import, validation preview, duplicate match, export ແລະ rollback.","2 import jobs",["Pilot place batch","Category attribute update","Duplicate reconciliation","Partner export"],"Import ຕ້ອງ preview error ແລະຫ້າມ overwrite published data ໂດຍບໍ່ຢືນຢັນ.","Uploaded file hash, validation result ແລະ rollback reference"),

  "content:rights-review": detailView("Content rights review","ກວດວ່າ source ສາມາດ link, embed ຫຼືອ້າງອີງໄດ້ຕາມ policy.","9 awaiting review",["Creator permission pending","Platform embed permitted","Link-only source","Rights expired"],"MVP ໃຊ້ redirect link; ຫ້າມດາວໂຫຼດ/re-upload ວິດີໂອຂອງ creator.","Original URL, creator consent ແລະ policy version"),
  "content:place-matching": detailView("Place matching","ຈັບຄູ່ review source ກັບ Place ທີ່ຖືກຕ້ອງ ແລະຈັດການ duplicate/ambiguous match.","14 unmatched sources",["Exact Place match","Possible duplicate","Location ambiguous","New Place candidate"],"Confidence ຕ່ຳກວ່າ threshold ຕ້ອງມີຄົນກວດ.","Candidate scores, chosen Place ແລະ reviewer"),
  "content:publishing": detailView("Publishing pipeline","ຄວບຄຸມ content ຈາກ ready, schedule, publish ຫາ removal ແລະ recheck.","6 ready to publish",["Ready after rights check","Scheduled feature","Published source","Removal requested"],"ຕ້ອງສະແດງ source attribution ແລະ checked date ຕໍ່ user.","Publish version, placement ແລະ removal history"),
  "content:creators": detailView("Creator directory","ບັນທຶກ creator profile, channel, categories, permission history ແລະ partnership activity.","27 creator profiles",["Travel creator","Food reviewer","Stay reviewer","Permission follow-up"],"Creator relationship ບໍ່ສາມາດລຶບ negative review ຫຼືປ່ຽນ ranking.","Channel ownership, consent scope ແລະ activity log"),

  "trust:reports": detailView("User and owner reports","ຮັບ report ກ່ຽວກັບ source, misinformation, impersonation, privacy ແລະ sponsored disclosure.","11 open reports",["Source unavailable","Incorrect business fact","Privacy concern","Sponsored label missing"],"Report ຕ້ອງ triage ຕາມ harm ບໍ່ແມ່ນຕາມຜູ້ຈ່າຍເງິນ.","Reporter input, affected content ແລະ triage decision"),
  "trust:appeals": detailView("Appeals","ທົບທວນຄຳຕັດສິນ Trust ໂດຍ reviewer ອີກຄົນ ແລະຮັກສາ original decision.","2 awaiting appeal review",["Source removal appeal","Correction rejection appeal","Account restriction appeal","Resolved appeal"],"Appeal reviewer ຕ້ອງບໍ່ແມ່ນຜູ້ຕັດສິນຄັ້ງທຳອິດ.","Original decision, new evidence ແລະ final reason"),
  "trust:policies": detailView("Trust policies","ຈັດການ policy version, effective date, severity, enforcement ແລະ owner.","8 active policies",["Source integrity","Business fact accuracy","Privacy and personal data","Sponsored transparency"],"Policy change ບໍ່ປ່ຽນ case ເກົ່າແບບງຽບໆ.","Version diff, approver ແລະ effective date"),
  "trust:reason-codes": detailView("Decision reason codes","ມາດຕະຖານເຫດຜົນສຳລັບ remove, retain, correct, escalate ແລະ restore.","16 controlled codes",["SRC-REMOVED","FACT-VERIFIED","PRIVACY-RISK","SPONSORED-MISSING"],"ການຕັດສິນຕ້ອງມີ reason code ແລະ note ອະທິບາຍ.","Reason code version, usage count ແລະ policy mapping"),

  "partners:accounts": detailView("Partner accounts","Place owner, billing contact, verified profile, contract ແລະ support history ໃນ record ດຽວ.","18 partner accounts",["Founding partner","Active paid partner","Payment pending","Account at risk"],"Partner badge ບໍ່ສາມາດຊື້ rating ຫຼືລຳດັບ organic.","Identity proof, agreement, billing ແລະ account activity"),
  "partners:pilot": detailView("Founding Partner Pilot","ຕິດຕາມຮ້ານທີ່ຈ່າຍ 200,000 ກີບ/ເດືອນ ພ້ອມ deliverables ແລະ outcome.","7 pilot businesses",["Pilot onboarding","Profile verified","Monthly summary due","Pilot feedback"],"ນັບລາຍຮັບເມື່ອມີຫຼັກຖານຊຳລະເທົ່ານັ້ນ.","Payment receipt, delivered service ແລະ performance summary"),
  "partners:renewals": detailView("Renewals","ເຫັນ contract end, usage, value delivered, payment ແລະ next renewal action.","3 renewals in 30 days",["Renew now","Value review needed","Payment follow-up","Churn risk"],"Renewal recommendation ຕ້ອງອີງຜົນທີ່ວັດໄດ້.","Prior term, delivered KPI ແລະ renewal decision"),
  "partners:activities": detailView("Commercial activities","ບັນທຶກ call, meeting, message, task ແລະ commitment ຂອງແຕ່ລະ partner.","21 activities this week",["Introductory call","Pilot follow-up","Performance review","Payment reminder"],"Commitment ຕ້ອງມີ owner ແລະ due date.","Activity time, participant, note ແລະ next action"),
  "partners:performance": detailView("Partner performance","ສະແດງ profile views, Decision Intent, map/contact action ແລະ freshness ໂດຍບໍ່ປົນ organic ກັບ sponsored.","31.6% avg intent",["Restaurant cohort","Hotel cohort","Attraction cohort","Pilot cohort"],"Report ຕ້ອງແຍກ organic ແລະ sponsored traffic.","Metric definition, period, attribution ແລະ export log"),

  "campaigns:calendar": detailView("Campaign calendar","ເບິ່ງ creative deadline, review, flight, pause ແລະ completion ຕາມວັນທີ.","4 flights this month",["Creative deadline","Compliance review","Campaign flight","Post-campaign report"],"Campaign ຫ້າມ go live ຖ້າ creative ຫຼື payment ຍັງບໍ່ຜ່ານ.","Schedule version, approval ແລະ delivery event"),
  "campaigns:creative-review": detailView("Creative review","ກວດ video/link, copy, landing Place, sponsored label ແລະ prohibited claims.","3 awaiting approval",["Video and thumbnail","Sponsored disclosure","Landing Place match","Claim substantiation"],"Reviewer ຕ້ອງບັນທຶກ pass/fail ແຍກແຕ່ລະ checklist.","Creative version, checklist ແລະ approver"),
  "campaigns:sponsored-compliance": detailView("Sponsored compliance","ກວດວ່າ paid placement ມີປ້າຍຊັດ ແລະບໍ່ປ່ຽນ review/rating/trust score.","100% labeled",["Label visibility","Organic separation","Targeting scope","Complaint review"],"Payment ບໍ່ໃຫ້ສິດແກ້ review ຫຼື rating.","Placement capture, ranking explanation ແລະ complaint log"),
  "campaigns:billing": detailView("Campaign billing","ຜູກ quote, invoice, payment evidence ແລະ campaign delivery ໃນ reconciliation view.","₭3,000,000 booked",["Invoice issued","Payment pending","Payment verified","Delivery reconciled"],"Booked revenue ບໍ່ເທົ່າກັບ verified revenue.","Invoice, receipt, delivery report ແລະ finance link"),

  "analytics:search": detailView("Search analytics","ວັດ search demand, success, zero-result, filter usage ແລະ follow-up action.","72.8% success rate",["Top search intents","Zero-result queries","Category filters","Search-to-Place conversion"],"ຕ້ອງ aggregate ຂໍ້ມູນ ແລະຫ້າມສະແດງ personal query ທີ່ລະບຸຄົນໄດ້.","Metric query, threshold ແລະ privacy rule"),
  "analytics:decision-intent": detailView("Decision Intent analytics","ວັດ action ທີ່ບອກວ່າ user ກຳລັງຕັດສິນໃຈ: map, call, message, save ແລະ share.","18,420 intent events",["Open map","Call business","Send message","Save or share"],"Decision Intent ບໍ່ແມ່ນຫຼັກຖານວ່າ user ໄປຮ້ານແລ້ວ.","Event definition, deduplication ແລະ consent state"),
  "analytics:places": detailView("Place performance","ປຽບທຽບ discovery, detail open, Decision Intent, freshness ແລະ source coverage ຕໍ່ Place.","126 active Places",["Top decision Places","High view / low intent","Freshness impact","Source coverage impact"],"ຫ້າມໃຊ້ paid placement ເປັນ organic score.","Place ID, segment, metric period ແລະ traffic type"),
  "analytics:campaign-attribution": detailView("Campaign attribution","ແຍກ impression, Place open, Decision Intent ແລະ external action ຕາມ Campaign.","8.4% sponsored intent",["Campaign reach","Attributed Place opens","Attributed intent","Organic comparison"],"ຕ້ອງລະບຸ first-touch/last-touch ແລະ attribution window.","Campaign ID, traffic label ແລະ attribution rule"),
  "analytics:exports": detailView("Analytics exports","ຈັດການ scheduled report, CSV export, recipient, expiry ແລະ download audit.","6 scheduled exports",["Weekly founder report","Partner performance CSV","Place quality export","Finance evidence export"],"Export ທີ່ມີຂໍ້ມູນຈຳກັດຕ້ອງມີ expiry ແລະ role check.","Exporter, filter, file hash ແລະ download log"),

  "finance:payments": detailView("Payments","ກວດ incoming payment ກັບ invoice, counterparty ແລະຫຼັກຖານຊຳລະ.","₭1,200,000 verified",["Pilot payment","Campaign payment","Unmatched payment","Refund"],"ລາຍຮັບຖືກນັບຫຼັງ verification ເທົ່ານັ້ນ.","Receipt, bank reference, verifier ແລະ verified date"),
  "finance:invoices": detailView("Invoices","ສ້າງແລະຕິດຕາມ draft, issued, due, paid, void ແລະ overdue invoice.","4 open invoices",["Founding Partner Pilot","Sponsored Campaign","Pro Business","Credit note"],"Invoice ບໍ່ຖືກນັບເປັນ cash ຈົນ payment verified.","Invoice version, due date, tax fields ແລະ payment link"),
  "finance:expenses": detailView("Expenses","ຈັດປະເພດ server, operation, experiment ແລະ founder living cost ພ້ອມ evidence.","₭10.7M monthly burn",["Cloud and media","Operations tools","Pilot experiments","Founder living cost"],"ລາຍຈ່າຍຕ້ອງມີ category, date, amount ແລະຫຼັກຖານ.","Receipt/quote, approver ແລະ budget category"),
  "finance:budget-gates": detailView("Budget gates","ປ່ອຍງົບ 30% / 35% / 35% ຫຼັງແຕ່ລະຂັ້ນຜ່ານຫຼັກຖານ; ບໍ່ໃຊ້ລ່ວງໜ້າ.","Gate 1 · 30% released",["Problem evidence gate","Usage evidence gate","Revenue evidence gate","Stop / continue decision"],"Gate ຕໍ່ໄປເປີດໄດ້ຫຼັງ signer ກວດ evidence ແລະອະນຸມັດ.","Gate checklist, evidence links ແລະ approval record"),
  "finance:runway": detailView("Cash runway","ຄຳນວນເງິນສົດທີ່ໃຊ້ໄດ້ ÷ ລາຍຈ່າຍສຸດທິຕໍ່ເດືອນ ພ້ອມ scenario.","5.8 months base case",["Base case","Server cost +30%","Revenue delayed 60 days","Stop-spend scenario"],"Runway ຕ້ອງລວມ founder living cost ₭75M ຕາມ Financial Structure.","Cash balance date, burn assumptions ແລະ scenario version"),

  "system:roles": detailView("Roles & permissions","ກຳນົດ module access, action permission, approval authority ແລະ separation of duties.","5 active roles",["Platform Administrator","Trust Reviewer","Data Steward","Commercial Manager"],"Role change ທີ່ມີ privileged access ຕ້ອງອະນຸມັດແລະ audit.","Permission diff, approver ແລະ effective time"),
  "system:record-rules": detailView("Record rules","ຈຳກັດວ່າ role ໃດເຫັນ/ແກ້/ອະນຸມັດ record ປະເພດໃດ ແລະ field ໃດ.","14 enforced rules",["Trust case visibility","Finance evidence access","Partner account scope","Place publish authority"],"UI ທີ່ເຊື່ອງປຸ່ມບໍ່ພຽງພໍ; backend ຕ້ອງ enforce.","Rule expression, test cases ແລະ denial log"),
  "system:integrations": detailView("Integrations","ຈັດການ API, map, media, email, analytics ແລະ webhook ພ້ອມ health/status.","6 of 7 operational",["Core API","Map provider","Media storage","Transactional email"],"Secret ຫ້າມສະແດງໃນ UI ຫຼື audit payload.","Connection test, last success, error code ແລະ owner"),
  "system:feature-flags": detailView("Feature flags","ຄວບຄຸມ rollout ຕາມ environment, cohort, percentage ແລະ kill switch.","2 flags enabled",["Guest video feed","AI recommendations","Partner self-service","Booking transaction"],"High-risk flag ຕ້ອງມີ rollback owner ແລະ expiry date.","Flag version, targeting, changer ແລະ rollback event"),
  "system:audit": detailView("Privileged audit","ຄົ້ນຫາ before/after change, actor, reason, IP/session, module ແລະ correlation ID.","1,842 events / 30 days",["Place publish","Trust decision","Role change","Finance verification"],"Audit record ຕ້ອງ append-only ແລະຫ້າມ admin ແກ້ໄຂ.","Actor, timestamp, diff, reason ແລະ correlation ID"),
  "system:deployments": detailView("Deployments","ຕິດຕາມ environment, version, migration, health check, rollback ແລະ release owner.","Production healthy",["Web application","Admin portal","Search index","Database migration"],"Deploy ຕ້ອງຢຸດຖ້າ health check ຫຼື migration validation ບໍ່ຜ່ານ.","Commit/version, approver, health result ແລະ rollback reference"),
};

function DetailWorkspace({moduleId,viewId,query,onAction}:{moduleId:ModuleId;viewId:string;query:string;onAction:(message:string)=>void}) {
  const spec = detailCatalog[`${moduleId}:${viewId}`];
  const [selected,setSelected] = useState(0);
  useEffect(()=>setSelected(0),[moduleId,viewId]);
  if(!spec) return null;
  const filtered = spec.records.map((name,index)=>({name,index})).filter(item=>item.name.toLowerCase().includes(query.toLowerCase()));
  const current = spec.records[selected] ?? spec.records[0];
  const statuses = ["Action required","In review","On track","Scheduled"];
  const owners = ["Kommaly S.","Mali L.","Noy P.","System rule"];
  return <>
    <div className={styles.summary}><Metric label="Current scope" value={spec.headline} detail="Live operating view"/><Metric label="Open / active" value={spec.records.length*3+2} detail="Filterable records"/><Metric label="Needs attention" value={Math.max(1,spec.records.length-2)} detail="Owner action required" tone="danger"/><Metric label="Data freshness" value="96%" detail="Checked today" tone="success"/></div>
    <div className={styles.detailWorkspace}>
      <section className={styles.detailRegister}><header><div><small>{moduleId.toUpperCase()} / {viewId.replaceAll("-"," ").toUpperCase()}</small><h2>{spec.title}</h2><p>{spec.purpose}</p></div><button onClick={()=>onAction(`${spec.title} filter saved`)}>Save view</button></header><div className={styles.detailToolbar}><button aria-pressed="true">Active</button><button>Needs attention</button><button>Completed</button><span>{filtered.length} groups · updated just now</span></div><div className={styles.detailHead}><span>Record / scope</span><span>Status</span><span>Owner</span><span>Updated</span></div>{filtered.map(item=><button key={item.name} className={styles.detailRow} aria-pressed={item.index===selected} onClick={()=>setSelected(item.index)}><span><code>{moduleId.slice(0,3).toUpperCase()}-{String(item.index+1).padStart(3,"0")}</code><b>{item.name}</b><small>{spec.purpose}</small></span><mark data-status={statuses[item.index%statuses.length]}>{statuses[item.index%statuses.length]}</mark><span>{owners[item.index%owners.length]}</span><time>{item.index===0?"12 min ago":`${item.index+1}h ago`}</time></button>)}</section>
      <aside className={styles.contextPanel}><header><div><small>SELECTED OPERATING RECORD</small><h2>{current}</h2><code>{moduleId.toUpperCase()} / {viewId}</code></div><mark data-status={statuses[selected%statuses.length]}>{statuses[selected%statuses.length]}</mark></header><div className={styles.contextFacts}><article><small>OWNER</small><b>{owners[selected%owners.length]}</b></article><article><small>NEXT REVIEW</small><b>{selected===0?"Today · 14:30":"Within 48 hours"}</b></article><article><small>IMPACT</small><b>{selected===0?"High · user-facing":"Standard operations"}</b></article><article><small>DEPENDENCY</small><b>{moduleId==="system"?"Technical owner":"Source + policy check"}</b></article></div><section><small>CONTROL / BUSINESS RULE</small><p>{spec.control}</p></section><section><small>REQUIRED EVIDENCE</small><p>{spec.evidence}</p></section><section className={styles.checklist}><small>COMPLETION CHECKLIST</small><label><input type="checkbox" defaultChecked/> Record scope confirmed</label><label><input type="checkbox"/> Evidence reviewed</label><label><input type="checkbox"/> Decision note completed</label></section><section className={styles.activity}><small>ACTIVITY & AUDIT</small><ol><li><i>10:42</i><span><b>Record opened for review</b><small>{owners[selected%owners.length]}</small></span></li><li><i>09:18</i><span><b>Data refreshed</b><small>System automation</small></span></li></ol></section><footer><button onClick={()=>onAction(`${current} assigned to Kommaly S.`)}>Assign to me</button><button onClick={()=>onAction(`${current} evidence opened`)}>Open evidence</button><button className={styles.primary} onClick={()=>onAction(`${current} action completed · audit recorded`)}>Complete action</button></footer></aside>
    </div>
  </>;
}

export default function AdminPrototype() {
  const [active,setActive] = useState<ModuleId>("overview");
  const [activeSub,setActiveSub] = useState(subMenus.overview[0].id);
  const [launcherOpen,setLauncherOpen] = useState(false);
  const [query,setQuery] = useState("");
  const [toast,setToast] = useState("Interactive prototype · ທຸກການປ່ຽນແປງເກັບໃນ session ນີ້");
  const [createOpen,setCreateOpen] = useState(false);
  const [work,setWork] = useState(seedWork);
  const [places,setPlaces] = useState(seedPlaces);
  const [sources,setSources] = useState(seedSources);
  const [cases,setCases] = useState(seedCases);
  const [partners,setPartners] = useState(seedPartners);
  const [campaigns,setCampaigns] = useState(seedCampaigns);
  const [transactions,setTransactions] = useState(seedTransactions);
  const [users,setUsers] = useState(seedUsers);
  const [flags,setFlags] = useState({feed:true,ai:false,partner:false,booking:false});
  const [selectedWork,setSelectedWork] = useState(seedWork[0].id);
  const [selectedPlace,setSelectedPlace] = useState(seedPlaces[0].id);
  const [selectedSource,setSelectedSource] = useState(seedSources[0].id);
  const [selectedCase,setSelectedCase] = useState(seedCases[0].id);
  const [province,setProvince] = useState("All");
  const [audit,setAudit] = useState(["10:42 · Place version published · PLC-041","10:18 · Trust evidence protected · CAS-019","09:51 · Role permission changed · USR-007"]);

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("module") as ModuleId | null;
    if(requested && modules.some(item=>item.id===requested)) {
      setActive(requested);
      const requestedSub = params.get("view");
      setActiveSub(subMenus[requested].some(item=>item.id===requestedSub) ? String(requestedSub) : subMenus[requested][0].id);
    }
  },[]);

  const nav = (id:ModuleId) => {
    const firstSub = subMenus[id][0].id;
    setActive(id); setActiveSub(firstSub); setQuery(""); setLauncherOpen(false);
    const url = new URL(window.location.href); url.searchParams.set("module",id); url.searchParams.set("view",firstSub); window.history.replaceState({},"",url);
  };
  const openSub = (id:string) => {
    setActiveSub(id); setQuery("");
    const url = new URL(window.location.href); url.searchParams.set("module",active); url.searchParams.set("view",id); window.history.replaceState({},"",url);
  };
  const announce = (message:string) => { setToast(message); setAudit(items => [`Now · ${message}`,...items].slice(0,6)); };
  const q = query.toLowerCase();
  const selectedWorkItem = work.find(x=>x.id===selectedWork) ?? work[0];
  const selectedPlaceItem = places.find(x=>x.id===selectedPlace) ?? places[0];
  const selectedSourceItem = sources.find(x=>x.id===selectedSource) ?? sources[0];
  const selectedCaseItem = cases.find(x=>x.id===selectedCase) ?? cases[0];
  const verifiedRevenue = transactions.filter(x=>x.status==="Verified"&&x.amount>0).reduce((sum,x)=>sum+x.amount,0);
  const expense = Math.abs(transactions.filter(x=>x.status==="Verified"&&x.amount<0).reduce((sum,x)=>sum+x.amount,0));

  const createRecord = (name:string) => {
    if(active==="queue") { const id=`TSK-${100+work.length}`; setWork(items=>[{id,title:name,type:"Manual task",priority:"P2",owner:"Unassigned",due:"Tomorrow",status:"New"},...items]); setSelectedWork(id); }
    if(active==="places") { const id=`PLC-${70+places.length}`; setPlaces(items=>[{id,name,category:"ຍັງບໍ່ລະບຸ",phone:"",address:"",status:"Draft",freshness:0,sources:0},...items]); setSelectedPlace(id); }
    if(active==="content") { const id=`SRC-${290+sources.length}`; setSources(items=>[{id,title:name,creator:"Unknown",platform:"Social",place:"Unmatched",stage:"Captured"},...items]); setSelectedSource(id); }
    if(active==="partners") setPartners(items=>[{id:`PAR-${30+items.length}`,name,category:"Business",stage:"Lead",value:0,next:"Contact owner"},...items]);
    if(active==="campaigns") setCampaigns(items=>[{id:`CAM-${30+items.length}`,name,partner:"Unassigned",status:"Draft",budget:1000000,reach:0,intent:0},...items]);
    if(active==="finance") setTransactions(items=>[{id:`PAY-${90+items.length}`,counterparty:name,type:"Pilot",amount:200000,status:"Pending",date:"Today"},...items]);
    if(active==="system") setUsers(items=>[{id:`USR-${10+items.length}`,name,role:"Viewer",scope:"Overview",active:true},...items]);
    announce(`${copy[active].primary ?? "Record"} · ${name} ຖືກສ້າງແລ້ວ`); setCreateOpen(false);
  };

  const openWorkRecord = () => {
    if(selectedWorkItem.id.startsWith("CAS")){ setSelectedCase(selectedWorkItem.id); nav("trust"); }
    else if(selectedWorkItem.id.startsWith("SRC")){ setSelectedSource(selectedWorkItem.id); nav("content"); }
    else { setSelectedPlace("PLC-041"); nav("places"); }
  };

  const moduleContent = useMemo(():ReactNode => {
    if(activeSub!==subMenus[active][0].id) return <DetailWorkspace moduleId={active} viewId={activeSub} query={query} onAction={announce}/>;
    if(active==="overview") return <>
      <div className={styles.summary}><Metric label="Monthly active users" value="18,420" detail="+14.8% vs prior" tone="success"/><Metric label="Decision Intent" value="31.6%" detail="+3.2 points" tone="success"/><Metric label="Verified Places" value={places.filter(x=>x.status==="Published").length} detail={`${places.filter(x=>x.freshness>=90).length} fresh`}/><Metric label="Verified revenue" value={money(verifiedRevenue)} detail="Paid evidence only"/></div>
      <div className={styles.dashboardGrid}>
        <section className={`${styles.panel} ${styles.chartPanel}`}><header><div><small>DISCOVERY → DECISION</small><b>30-day operating trend</b></div><button onClick={()=>nav("analytics")}>Open Analytics →</button></header><div className={styles.barChart}>{[34,47,41,62,58,76,68,83,71,91,78,96].map((h,i)=><i key={i} style={{height:`${h}%`}}><span style={{height:`${Math.max(14,h*.43)}%`}}/></i>)}</div><footer><span><i/>Discovery</span><span><i/>Decision actions</span><b>31.6% conversion</b></footer></section>
        <section className={styles.panel}><header><div><small>OPERATIONAL HEALTH</small><b>ຕ້ອງຈັດການຕອນນີ້</b></div><button onClick={()=>nav("queue")}>View queue →</button></header><div className={styles.attention}><button onClick={()=>nav("trust")}><b>!</b><span><strong>{cases.filter(x=>x.status!=="Resolved").length} Trust cases open</strong><small>Oldest case approaching SLA</small></span></button><button onClick={()=>nav("places")}><b>◷</b><span><strong>{places.filter(x=>x.freshness<90).length} Places need freshness</strong><small>Price or contact requires recheck</small></span></button><button onClick={()=>nav("content")}><b>▶</b><span><strong>{sources.filter(x=>x.stage!=="Published").length} Sources in pipeline</strong><small>Rights and Place match pending</small></span></button></div></section>
        <section className={styles.panel}><header><div><small>PARTNER PIPELINE</small><b>Commercial progress</b></div><button onClick={()=>nav("partners")}>Open CRM →</button></header><div className={styles.pipeline}>{partnerStages.map(stage=><div key={stage}><span>{stage}</span><b>{partners.filter(x=>x.stage===stage).length}</b><small>{money(partners.filter(x=>x.stage===stage).reduce((s,x)=>s+x.value,0))}</small></div>)}</div></section>
        <section className={styles.panel}><header><div><small>CASH CONTROL</small><b>Runway & evidence</b></div><button onClick={()=>nav("finance")}>Open Finance →</button></header><div className={styles.cash}><div><span>Verified revenue</span><b>{money(verifiedRevenue)}</b></div><div><span>Operating expense</span><b>{money(expense)}</b></div><div><span>Experiment ceiling</span><b>₭25,000,000</b></div><div className={styles.progress}><i style={{width:"30%"}}/></div><small>Gate 1 · 30% released after evidence</small></div></section>
      </div>
    </>;

    if(active==="queue") {
      const filtered=work.filter(x=>`${x.id} ${x.title} ${x.type} ${x.owner}`.toLowerCase().includes(q));
      const update=(patch:Partial<WorkItem>,message:string)=>{setWork(items=>items.map(x=>x.id===selectedWorkItem.id?{...x,...patch}:x));announce(message)};
      return <><div className={styles.summary}><Metric label="ວຽກເປີດ" value={work.filter(x=>x.status!=="Resolved").length} detail="ທັງໝົດ"/><Metric label="SLA risk" value={work.filter(x=>x.due.startsWith("Overdue")).length} detail="ຕ້ອງຈັດການ" tone="danger"/><Metric label="ບໍ່ມີ Owner" value={work.filter(x=>x.owner==="Unassigned").length} detail="ລໍມອບໝາຍ"/><Metric label="ສຳເລັດ" value={work.filter(x=>x.status==="Resolved").length} detail="Session ນີ້" tone="success"/></div><div className={styles.splitView}><section className={styles.queue}><header><div><button aria-pressed="true">ວຽກຂອງຂ້ອຍ</button><button>Unassigned</button><button>All</button></div><span>{filtered.length} records</span></header><div className={styles.tableHead}><span>ວຽກ</span><span>Priority</span><span>Owner</span><span>Due</span><span>Status</span></div>{filtered.map(item=><button key={item.id} className={styles.queueRow} aria-pressed={selectedWorkItem.id===item.id} onClick={()=>setSelectedWork(item.id)}><span><code>{item.id}</code><b>{item.title}</b><small>{item.type}</small></span><strong data-priority={item.priority}>{item.priority}</strong><span>{item.owner}</span><span data-overdue={item.due.startsWith("Overdue")}>{item.due}</span><mark data-status={item.status}>{item.status}</mark></button>)}{!filtered.length?<div className={styles.empty}><b>ບໍ່ພົບວຽກ</b><span>ລອງປ່ຽນຄຳຄົ້ນຫາ</span></div>:null}</section><aside className={styles.record}><header><div><small>{selectedWorkItem.type}</small><h2>{selectedWorkItem.title}</h2><code>{selectedWorkItem.id}</code></div><mark data-status={selectedWorkItem.status}>{selectedWorkItem.status}</mark></header><dl><div><dt>Priority</dt><dd>{selectedWorkItem.priority}</dd></div><div><dt>Owner</dt><dd>{selectedWorkItem.owner}</dd></div><div><dt>SLA / Due</dt><dd data-overdue={selectedWorkItem.due.startsWith("Overdue")}>{selectedWorkItem.due}</dd></div></dl><section><small>NEXT BEST ACTION</small><b>{selectedWorkItem.owner==="Unassigned"?"ມອບໝາຍ Owner ກ່ອນເລີ່ມວຽກ":selectedWorkItem.status==="Resolved"?"ກວດ Audit record ແລະປິດວຽກ":"ເປີດ record ຕົ້ນສະບັບແລະດຳເນີນ workflow"}</b></section><section className={styles.activity}><small>ACTIVITY</small><ol><li><i>10:42</i><span><b>Record opened</b><small>Prototype reviewer</small></span></li><li><i>09:14</i><span><b>Work item created</b><small>System rule</small></span></li></ol></section><footer><button onClick={openWorkRecord}>Open record</button>{selectedWorkItem.owner==="Unassigned"?<button onClick={()=>update({owner:"Kommaly S.",status:"In review"},`${selectedWorkItem.id} assigned to Kommaly S.`)}>Assign to me</button>:<button onClick={()=>update({status:"In review"},`${selectedWorkItem.id} started review`)}>Start review</button>}<button className={styles.primary} disabled={selectedWorkItem.status==="Resolved"} onClick={()=>update({status:"Resolved"},`${selectedWorkItem.id} resolved · audit recorded`)}>Resolve & audit</button></footer></aside></div></>;
    }

    if(active==="places") {
      const filtered=places.filter(x=>`${x.id} ${x.name} ${x.category}`.toLowerCase().includes(q));
      const save=(patch:Partial<Place>,message:string)=>{setPlaces(items=>items.map(x=>x.id===selectedPlaceItem.id?{...x,...patch}:x));setToast(message)};
      return <><div className={styles.statGrid}><Metric label="Published" value={places.filter(x=>x.status==="Published").length} detail="Public records"/><Metric label="Under review" value={places.filter(x=>x.status==="Review").length} detail="Awaiting decision"/><Metric label="Freshness risk" value={places.filter(x=>x.freshness<90).length} detail="Needs recheck" tone="danger"/></div><div className={styles.masterDetail}><section className={styles.recordList}>{filtered.map(item=><button key={item.id} aria-pressed={item.id===selectedPlaceItem.id} onClick={()=>setSelectedPlace(item.id)}><span><code>{item.id}</code><b>{item.name}</b><small>{item.category} · {item.sources} sources</small></span><mark data-status={item.status}>{item.status}</mark><em>{item.freshness}% fresh</em></button>)}</section><section className={styles.detail}><header><div><small>PLACE 360 · {selectedPlaceItem.id}</small><h2>{selectedPlaceItem.name}</h2><span>Last change kept in audit history</span></div><mark data-status={selectedPlaceItem.status}>{selectedPlaceItem.status}</mark></header><div className={styles.workflow}>{["Draft","Review","Published"].map(stage=><span key={stage} data-active={stage===selectedPlaceItem.status}>{stage}</span>)}</div><div className={styles.fieldGrid}><label>Place name<input value={selectedPlaceItem.name} onChange={e=>save({name:e.target.value},"Unsaved field changed")}/></label><label>Category<input value={selectedPlaceItem.category} onChange={e=>save({category:e.target.value},"Unsaved field changed")}/></label><label>Phone<input value={selectedPlaceItem.phone} onChange={e=>save({phone:e.target.value},"Unsaved field changed")}/></label><label className={styles.full}>Address<textarea value={selectedPlaceItem.address} onChange={e=>save({address:e.target.value},"Unsaved field changed")}/></label></div><section className={styles.evidence}><div><small>SOURCE EVIDENCE</small><b>{selectedPlaceItem.sources} linked sources</b></div><button onClick={()=>nav("content")}>Open Content & Sources →</button></section><footer><button onClick={()=>announce(`${selectedPlaceItem.id} draft saved`)}>Save draft</button>{selectedPlaceItem.status==="Draft"?<button className={styles.primary} onClick={()=>save({status:"Review"},`${selectedPlaceItem.id} submitted for review`)}>Submit for review</button>:selectedPlaceItem.status==="Review"?<button className={styles.primary} onClick={()=>{save({status:"Published",freshness:100},`${selectedPlaceItem.id} published`);announce(`${selectedPlaceItem.id} published · audit recorded`)}}>Approve & publish</button>:<button onClick={()=>save({status:"Review"},`${selectedPlaceItem.id} correction opened`)}>Open correction</button>}</footer></section></div></>;
    }

    if(active==="content") {
      const filtered=sources.filter(x=>`${x.id} ${x.title} ${x.creator} ${x.platform}`.toLowerCase().includes(q));
      const advance=(item:Source)=>{const i=sourceStages.indexOf(item.stage);const stage=sourceStages[Math.min(i+1,sourceStages.length-1)];setSources(items=>items.map(x=>x.id===item.id?{...x,stage}:x));announce(`${item.id} advanced to ${stage}`)};
      return <><div className={styles.summary}>{sourceStages.slice(0,4).map(stage=><Metric key={stage} label={stage} value={sources.filter(x=>x.stage===stage).length} detail="records"/>)}</div><section className={styles.panel}><header><div><small>INTAKE → PUBLISH</small><b>Content source register</b></div><span>Source, rights, Place match and freshness stay together</span></header><div className={styles.dataTable}><div className={styles.dataHead}><span>Source</span><span>Origin</span><span>Place</span><span>Stage</span><span>Action</span></div>{filtered.map(item=><div key={item.id} className={styles.dataRow} data-selected={item.id===selectedSourceItem.id} onClick={()=>setSelectedSource(item.id)}><span><code>{item.id}</code><b>{item.title}</b></span><span>{item.platform}<small>{item.creator}</small></span><span>{item.place}</span><mark data-status={item.stage}>{item.stage}</mark><button disabled={item.stage==="Published"} onClick={event=>{event.stopPropagation();advance(item)}}>{item.stage==="Published"?"Complete":"Advance →"}</button></div>)}</div></section><section className={styles.inlineDetail}><div><small>SELECTED SOURCE · {selectedSourceItem.id}</small><b>{selectedSourceItem.title}</b><span>{selectedSourceItem.platform} · {selectedSourceItem.creator}</span></div><div><label>Linked Place<select value={selectedSourceItem.place} onChange={e=>{setSources(items=>items.map(x=>x.id===selectedSourceItem.id?{...x,place:e.target.value}:x));announce(`${selectedSourceItem.id} Place match updated`)}}>{places.map(p=><option key={p.id} value={p.id}>{p.id} · {p.name}</option>)}</select></label><button onClick={()=>advance(selectedSourceItem)} disabled={selectedSourceItem.stage==="Published"}>Complete current check</button></div></section></>;
    }

    if(active==="trust") {
      const filtered=cases.filter(x=>`${x.id} ${x.title} ${x.place}`.toLowerCase().includes(q));
      const resolve=()=>{setCases(items=>items.map(x=>x.id===selectedCaseItem.id?{...x,status:"Resolved"}:x));setWork(items=>items.map(x=>x.id===selectedCaseItem.id?{...x,status:"Resolved"}:x));announce(`${selectedCaseItem.id} policy decision applied · immutable audit recorded`)};
      return <div className={styles.masterDetail}><section className={styles.recordList}>{filtered.map(item=><button key={item.id} aria-pressed={item.id===selectedCaseItem.id} onClick={()=>setSelectedCase(item.id)}><span><code>{item.id}</code><b>{item.title}</b><small>{item.place} · {item.evidence} evidence</small></span><strong data-priority={item.priority}>{item.priority}</strong><mark data-status={item.status}>{item.status}</mark></button>)}</section><section className={styles.detail}><header><div><small>TRUST CASE · {selectedCaseItem.id}</small><h2>{selectedCaseItem.title}</h2><span>CON-04 · Source integrity policy</span></div><mark data-status={selectedCaseItem.status}>{selectedCaseItem.status}</mark></header><div className={styles.caseFacts}><article><small>PLACE</small><b>{selectedCaseItem.place}</b></article><article><small>EVIDENCE</small><b>{selectedCaseItem.evidence} protected records</b></article><article><small>SEPARATION OF DUTIES</small><b>Appeal requires another reviewer</b></article></div><fieldset className={styles.decisions}><legend>Policy decision</legend><label><input type="radio" name="decision" defaultChecked/>Remove unavailable source; preserve verified facts</label><label><input type="radio" name="decision"/>Restore source after evidence check</label><label><input type="radio" name="decision"/>Escalate for legal review</label></fieldset><label className={styles.note}>Decision note<textarea value={selectedCaseItem.note} onChange={e=>setCases(items=>items.map(x=>x.id===selectedCaseItem.id?{...x,note:e.target.value}:x))}/></label><footer><button onClick={()=>announce(`${selectedCaseItem.id} decision draft saved`)}>Save draft</button><button className={styles.primary} disabled={!selectedCaseItem.note||selectedCaseItem.status==="Resolved"} onClick={resolve}>Apply decision & audit</button></footer></section></div>;
    }

    if(active==="partners") {
      const advance=(item:Partner)=>{const i=partnerStages.indexOf(item.stage);const stage=partnerStages[Math.min(i+1,partnerStages.length-1)];setPartners(items=>items.map(x=>x.id===item.id?{...x,stage,next:stage==="Paid pilot"?"Confirm payment evidence":stage==="Active"?"Send performance summary":"Schedule next activity"}:x));announce(`${item.id} moved to ${stage}`)};
      return <><div className={styles.summary}><Metric label="Pipeline value" value={money(partners.reduce((s,x)=>s+x.value,0))} detail="All opportunities"/><Metric label="Paid pilots" value={partners.filter(x=>x.stage==="Paid pilot").length} detail="₭200k / month"/><Metric label="Active partners" value={partners.filter(x=>x.stage==="Active").length} detail="Recurring" tone="success"/><Metric label="Renewal" value={partners.filter(x=>x.stage==="Renewal").length} detail="Action required" tone="danger"/></div><div className={styles.kanban}>{partnerStages.map(stage=><section key={stage}><header><b>{stage}</b><span>{partners.filter(x=>x.stage===stage).length}</span></header>{partners.filter(x=>x.stage===stage&&`${x.name} ${x.category}`.toLowerCase().includes(q)).map(item=><article key={item.id}><small>{item.id} · {item.category}</small><b>{item.name}</b><span>{item.next}</span><strong>{money(item.value)}</strong><button disabled={stage==="Renewal"} onClick={()=>advance(item)}>Advance →</button></article>)}</section>)}</div></>;
    }

    if(active==="campaigns") {
      const advance=(item:Campaign)=>{const i=campaignStages.indexOf(item.status);const status=campaignStages[Math.min(i+1,campaignStages.length-1)];setCampaigns(items=>items.map(x=>x.id===item.id?{...x,status,reach:status==="Live"?25000:x.reach}:x));announce(`${item.id} advanced to ${status}`)};
      return <><div className={styles.summary}><Metric label="Active" value={campaigns.filter(x=>x.status==="Live").length} detail="Sponsored label enforced"/><Metric label="Reach" value={campaigns.reduce((s,x)=>s+x.reach,0).toLocaleString()} detail="All verified delivery"/><Metric label="Avg Decision Intent" value={`${(campaigns.reduce((s,x)=>s+x.intent,0)/campaigns.length).toFixed(1)}%`} detail="Organic baseline 7.1%"/><Metric label="Booked revenue" value={money(campaigns.reduce((s,x)=>s+x.budget,0))} detail="Evidence required"/></div><section className={styles.compliance}><b>Sponsored integrity</b><span>ການຈ່າຍເງິນບໍ່ປ່ຽນ rating, review order ຫຼື trust score; ຕ້ອງມີປ້າຍ “Sponsored”.</span></section><section className={styles.panel}><div className={styles.dataTable}><div className={styles.dataHead}><span>Campaign</span><span>Partner</span><span>Status</span><span>Reach / Intent</span><span>Action</span></div>{campaigns.filter(x=>`${x.name} ${x.partner}`.toLowerCase().includes(q)).map(item=><div key={item.id} className={styles.dataRow}><span><code>{item.id}</code><b>{item.name}</b></span><span>{item.partner}</span><mark data-status={item.status}>{item.status}</mark><span>{item.reach.toLocaleString()}<small>{item.intent}% intent</small></span><button disabled={item.status==="Completed"} onClick={()=>advance(item)}>Advance →</button></div>)}</div></section></>;
    }

    if(active==="analytics") {
      const factor=province==="All" ? 1 : province==="Vientiane" ? 0.62 : 0.38;
      return <><section className={styles.filters}><label>Period<select><option>1–28 Aug 2026</option></select></label><label>Province<select value={province} onChange={e=>setProvince(e.target.value)}><option>All</option><option>Vientiane</option><option>Other provinces</option></select></label><label>Attribution<select><option>First touch</option><option>Last touch</option></select></label><span>Privacy-safe aggregate</span></section><div className={styles.summary}><Metric label="Discovery sessions" value={Math.round(58214*factor).toLocaleString()} detail="+16.2%" tone="success"/><Metric label="Search success" value="72.8%" detail="+4.1 points"/><Metric label="Decision Intent" value={Math.round(18420*factor).toLocaleString()} detail="31.6% of sessions"/><Metric label="Map / Contact" value={Math.round(7286*factor).toLocaleString()} detail="39.6% of intent"/></div><div className={styles.dashboardGrid}><section className={`${styles.panel} ${styles.chartPanel}`}><header><div><small>BEHAVIOR TREND</small><b>Discovery and Decision Intent</b></div></header><div className={styles.lineBars}>{[42,51,47,66,58,73,69,82,75,91,84,96].map((h,i)=><i key={i} style={{height:`${h}%`}}><span/></i>)}</div></section><section className={styles.panel}><header><div><small>DECISION FUNNEL</small><b>Where users move forward</b></div></header><div className={styles.funnel}>{[["Viewed Place",32180,100],["Opened details",24604,76],["Decision Intent",18420,57],["Map / Contact",7286,23]].map(x=><div key={String(x[0])}><span style={{width:`${x[2]}%`}}>{x[0]}</span><b>{Math.round(Number(x[1])*factor).toLocaleString()}</b></div>)}</div></section></div></>;
    }

    if(active==="finance") {
      const verify=(item:Transaction)=>{setTransactions(items=>items.map(x=>x.id===item.id?{...x,status:"Verified"}:x));announce(`${item.id} verified · finance dashboard updated`)};
      return <><div className={styles.summary}><Metric label="Verified revenue" value={money(verifiedRevenue)} detail="Paid evidence only"/><Metric label="Pending evidence" value={transactions.filter(x=>x.status==="Pending").length} detail="Not counted" tone="danger"/><Metric label="Operating expense" value={money(expense)} detail="Matched evidence"/><Metric label="Experiment ceiling" value="₭25,000,000" detail="30% Gate 1"/></div><div className={styles.financeGrid}><section className={styles.panel}><header><div><small>BUDGET CONTROL</small><b>ປ່ອຍງົບຫຼັງຜ່ານ Gate</b></div><span>Gate 1</span></header><div className={styles.bigProgress}><i style={{width:"30%"}}/></div><div className={styles.budgetFacts}><div><small>Released</small><b>₭7,500,000</b></div><div><small>Spent</small><b>₭5,900,000</b></div><div><small>Available</small><b>₭1,600,000</b></div></div></section><section className={styles.panel}><header><div><small>CASH RUNWAY</small><b>Founder living cost included</b></div></header><div className={styles.runway}><b>5.8</b><span>months</span><small>Available cash ₭62.4M · Monthly burn ₭10.7M</small></div></section></div><section className={styles.panel}><header><div><small>FINANCIAL EVIDENCE</small><b>ຄຳວ່າ “ສົນໃຈ” ບໍ່ຖືກນັບເປັນລາຍຮັບ</b></div></header><div className={styles.dataTable}><div className={styles.dataHead}><span>Evidence</span><span>Counterparty</span><span>Type</span><span>Amount</span><span>Status</span></div>{transactions.filter(x=>`${x.id} ${x.counterparty}`.toLowerCase().includes(q)).map(item=><div className={styles.dataRow} key={item.id}><span><code>{item.id}</code><small>{item.date}</small></span><b>{item.counterparty}</b><span>{item.type}</span><b>{money(item.amount)}</b>{item.status==="Pending"?<button onClick={()=>verify(item)}>Verify evidence</button>:<mark data-status="Verified">Verified</mark>}</div>)}</div></section></>;
    }

    return <><div className={styles.summary}><Metric label="Active users" value={users.filter(x=>x.active).length} detail={`${new Set(users.map(x=>x.role)).size} roles`}/><Metric label="Integrations" value="6 / 7" detail="1 degraded" tone="danger"/><Metric label="Feature flags" value={Object.values(flags).filter(Boolean).length} detail="Enabled"/><Metric label="Audit events" value={audit.length} detail="This prototype session"/></div><div className={styles.systemGrid}><section className={styles.panel}><header><div><small>ROLE-BASED ACCESS</small><b>Users & responsibility</b></div></header><div className={styles.userRows}>{users.filter(x=>`${x.name} ${x.role}`.toLowerCase().includes(q)).map(user=><article key={user.id}><span>{user.name.split(" ").map(x=>x[0]).join("")}</span><div><b>{user.name}</b><small>{user.id} · {user.scope}</small></div><select value={user.role} onChange={e=>{setUsers(items=>items.map(x=>x.id===user.id?{...x,role:e.target.value}:x));announce(`${user.id} role changed to ${e.target.value}`)}}><option>Platform Administrator</option><option>Trust Reviewer</option><option>Data Steward</option><option>Commercial Manager</option><option>Viewer</option></select></article>)}</div></section><section className={styles.panel}><header><div><small>FEATURE CONTROL</small><b>Pilot release flags</b></div></header><div className={styles.flags}>{([['feed','Guest video feed','100%'],['ai','AI recommendations','Internal only'],['partner','Partner self-service','Pilot accounts'],['booking','Booking transaction','Deferred']] as const).map(([key,label,detail])=><label key={key}><span><b>{label}</b><small>{detail}</small></span><input type="checkbox" checked={flags[key]} onChange={()=>{setFlags(old=>({...old,[key]:!old[key]}));announce(`${label} flag changed`)}}/></label>)}</div></section><section className={styles.panel}><header><div><small>INTEGRATIONS</small><b>Connected services</b></div></header><div className={styles.integrations}>{[["API","Core application API","Operational"],["MAP","Map provider","Operational"],["OBJ","Media storage","Operational"],["MAIL","Transactional email","Degraded"]].map(x=><article key={x[0]}><span>{x[0]}</span><div><b>{x[1]}</b><small>Checked less than 2m ago</small></div><mark data-status={x[2]}>{x[2]}</mark></article>)}</div></section><section className={styles.panel}><header><div><small>SECURITY & AUDIT</small><b>Latest privileged activity</b></div></header><ol className={styles.audit}>{audit.map((event,i)=><li key={`${event}-${i}`}>{event}</li>)}</ol></section></div></>;
  },[active,activeSub,q,query,work,places,sources,cases,partners,campaigns,transactions,users,flags,selectedWorkItem,selectedPlaceItem,selectedSourceItem,selectedCaseItem,verifiedRevenue,expense,province,audit]);

  const current=copy[active];
  const currentSub=subMenus[active].find(item=>item.id===activeSub) ?? subMenus[active][0];
  return <main className={styles.app}>
    <header className={styles.appBar}><button className={styles.launchButton} onClick={()=>setLauncherOpen(true)} aria-label="Open application launcher">▦</button><a href="../final-design" className={styles.brand}><b>ພ້ອມໄປ</b><span>ADMIN OPERATIONS</span></a><nav aria-label="Module navigation">{modules.map(item=><button key={item.id} aria-current={item.id===active?"page":undefined} onClick={()=>nav(item.id)}><i>{item.icon}</i><span>{item.label}</span></button>)}</nav><div className={styles.utilities}><button aria-label="Activities" onClick={()=>setToast(`${audit.length} audit/activity records in this session`)}>◷<em>{audit.length}</em></button><button aria-label="Help" onClick={()=>setToast("Prototype help · ເລືອກ Module ແລະດຳເນີນຕາມ Next Best Action")}>?</button><span>KS</span></div></header>
    <nav className={styles.subNav} aria-label={`${modules.find(item=>item.id===active)?.label} sub-navigation`}><strong>{modules.find(item=>item.id===active)?.label}</strong><div>{subMenus[active].map(item=><button key={item.id} aria-current={item.id===currentSub.id?"page":undefined} onClick={()=>openSub(item.id)}>{item.label}</button>)}</div></nav>
    <section className={styles.workspace}><header className={styles.controlBar}><div><small>{current.eyebrow} / {currentSub.label.toUpperCase()}</small><h1>{current.title}</h1><p>{current.description}</p></div><label><span>⌕</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder={`ຄົ້ນຫາໃນ ${currentSub.label}…`} aria-label={`Search ${active} ${currentSub.label}`}/></label>{current.primary?<button className={styles.primary} onClick={()=>setCreateOpen(true)}>{current.primary}</button>:<button onClick={()=>setLauncherOpen(true)}>All modules ▦</button>}</header>{moduleContent}</section>
    {launcherOpen?<div className={styles.launcher} role="dialog" aria-modal="true" aria-label="Application launcher"><header><div><small>ພ້ອມໄປ · APPLICATIONS</small><b>ເລືອກ Module ທີ່ຕ້ອງການເຮັດວຽກ</b></div><button onClick={()=>setLauncherOpen(false)} aria-label="Close">×</button></header><div>{modules.map(item=><button key={item.id} onClick={()=>nav(item.id)}><i>{item.icon}</i><b>{item.label}</b><small>{item.section}</small></button>)}</div></div>:null}
    {createOpen?<QuickCreate kind={current.primary??"Create record"} onClose={()=>setCreateOpen(false)} onCreate={createRecord}/>:null}
    <div className={styles.toast} role="status">{toast}</div>
  </main>;
}
