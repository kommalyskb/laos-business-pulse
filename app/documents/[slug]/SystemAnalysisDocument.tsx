"use client";

import { useState } from "react";
import styles from "../documents.module.css";
import SystemAnalysisFunctionCatalog from "./SystemAnalysisFunctionCatalog";
import SystemAnalysisDataModel from "./SystemAnalysisDataModel";
import SystemAnalysisWorkflows from "./SystemAnalysisWorkflows";
import SystemAnalysisFunctionSpecifications from "./SystemAnalysisFunctionSpecifications";
import SystemAnalysisStateErrors from "./SystemAnalysisStateErrors";

const useCases = [
  {
    id: "discover",
    label: "UC-USR-01/02",
    title: "ຄົ້ນພົບ ແລະກອງຜົນ",
    actor: "Guest User",
    trigger: "ຜູ້ໃຊ້ເຂົ້າ Feed, ພິມຄຳຄົ້ນ ຫຼືເລືອກ Filter.",
    preconditions: ["ມີ Place ແລະ Content Source ທີ່ຢູ່ສະຖານະ Published", "ຜູ້ໃຊ້ບໍ່ຈຳເປັນຕ້ອງມີ Account"],
    mainFlow: ["ລະບົບໂຫຼດ Content Card ຈາກ Place ທີ່ເຜີຍແຜ່", "ຜູ້ໃຊ້ເລື່ອນ Feed ຫຼືສົ່ງ Search/Filter", "ລະບົບສົ່ງຜົນທີ່ກົງເງື່ອນໄຂ ແລະບັນທຶກ Event", "ຜູ້ໃຊ້ເລືອກ Content Card ເພື່ອເປີດ Place Page"],
    exceptions: ["ຖ້າບໍ່ມີຜົນ ໃຫ້ສະແດງ Empty State ແລະປຸ່ມລ້າງ Filter", "ຖ້າ Preview ໂຫຼດບໍ່ໄດ້ ໃຫ້ໃຊ້ Fallback ແລະຍັງເປີດ Place Page ໄດ້"],
    outcome: "ຜູ້ໃຊ້ພົບ Place ທີ່ສົນໃຈ ແລະລະບົບມີຫຼັກຖານ Feed View/Search/Filter/Place Open.",
  },
  {
    id: "decide",
    label: "UC-USR-03/04/05",
    title: "ກວດຂໍ້ມູນ ແລະລົງມືເຮັດ",
    actor: "Guest User",
    trigger: "ຜູ້ໃຊ້ເປີດ Place Page ຈາກ Feed, Search, Shared Link ຫຼື Save.",
    preconditions: ["Place ຢູ່ສະຖານະ Published", "Required Field ຄົບ ແລະຂໍ້ມູນທີ່ບໍ່ຢືນຢັນມີປ້າຍຊັດເຈນ"],
    mainFlow: ["ລະບົບສະແດງ Place, Source, Verified Date ແລະ Trust Labels", "ຜູ້ໃຊ້ເລືອກ Map, Call ຫຼື Message", "ລະບົບບັນທຶກ Decision Intent ແລະເປີດ External App", "ຜູ້ໃຊ້ອາດ Save ໃນອຸປະກອນ ຫຼື Share Canonical Link"],
    exceptions: ["ຖ້າອຸປະກອນໂທບໍ່ໄດ້ ໃຫ້ສະແດງເບີເພື່ອ Copy", "ຖ້າ Messaging App ບໍ່ມີ ໃຫ້ສະແດງຊ່ອງທາງຕິດຕໍ່ສຳຮອງ"],
    outcome: "External Action ເປີດປາຍທາງຖືກຕ້ອງ; Event ຖືກນັບຕາມນິຍາມ ແລະບໍ່ຖືກອ້າງເປັນຍອດຂາຍ.",
  },
  {
    id: "correct",
    label: "UC-BUS-01",
    title: "ສະເໜີແກ້ໄຂຂໍ້ມູນ",
    actor: "Place Owner / Representative",
    trigger: "ຮ້ານພົບວ່າຊື່, ທີ່ຢູ່, ເວລາ, ລາຄາ ຫຼືຊ່ອງທາງຕິດຕໍ່ບໍ່ຖືກຕ້ອງ.",
    preconditions: ["Place Page ມີປຸ່ມແຈ້ງແກ້ໄຂ", "Pilot ໃຊ້ຊ່ອງທາງສື່ສານພາຍນອກ ແລະແບບຟອມຂໍ້ຄວາມມາດຕະຖານ"],
    mainFlow: ["ຜູ້ແຈ້ງລະບຸ Place, Field ທີ່ຈະແກ້ ແລະຫຼັກຖານ", "Admin ສ້າງ Correction Record ແລະກວດຄວາມຄົບ", "Admin ກວດຫຼັກຖານກັບ Source ອື່ນ ຫຼືຕິດຕໍ່ຮ້ານ", "ເມື່ອອະນຸມັດ ຈຶ່ງອັບເດດ Place, Verified Date ແລະ Audit Log"],
    exceptions: ["ຫຼັກຖານບໍ່ພໍ: ສະຖານະ Needs Evidence", "ຂໍ້ມູນຂັດກັນ: ບໍ່ປ່ຽນ Public Record ຈົນກວ່າ Admin ຈະຢືນຢັນ"],
    outcome: "ຂໍ້ມູນ Public ປ່ຽນສະເພາະຫຼັງອະນຸມັດ ແລະສາມາດກວດຮອຍການປ່ຽນໄດ້.",
  },
  {
    id: "operate",
    label: "UC-ADM-01—04",
    title: "ບໍລິຫານ Place, Source ແລະ Campaign",
    actor: "Admin",
    trigger: "ມີ Place/Source ໃໝ່, Correction/Takedown Request ຫຼື Sponsored Campaign.",
    preconditions: ["Admin ຜ່ານການຢືນຢັນຕົວຕົນດ້ວຍ Account ຂອງຕົນເອງ; ຫ້າມໃຊ້ Account ຮ່ວມກັນ", "ທຸກການປ່ຽນທີ່ກະທົບ Public Data ຖືກບັນທຶກ"],
    mainFlow: ["Admin ຄົ້ນກ່ອນສ້າງ Place ເພື່ອຫຼີກລ່ຽງຂໍ້ມູນຊ້ຳ", "ປ້ອນ Required Field, Source ແລະຜົນການກວດ", "Preview Record ແລະປ່ຽນສະຖານະເປັນ Published", "ຕິດຕາມ Correction, Takedown, Source Availability ແລະ Campaign Period"],
    exceptions: ["ພົບ Place ຊ້ຳ: Merge ຫຼືເຊື່ອມໄປ Canonical Place", "Source ຖືກລົບ: ປິດ Source ໂດຍບໍ່ລົບ Place ອັດຕະໂນມັດ", "Campaign ໝົດອາຍຸ: ຍຸດ Sponsored Placement ແລະຮັກສາລາຍງານ"],
    outcome: "Public Data, Trust Label ແລະ Campaign Status ສອດຄ່ອງກັບຫຼັກຖານ ແລະກົດທຸລະກິດ.",
  },
] as const;

const businessRules = [
  ["BR-01", "Canonical Place", "ສະຖານທີ່ຈິງໜຶ່ງແຫ່ງຕ້ອງມີ Place Record ຫຼັກພຽງໜຶ່ງ; Content Source ຫຼາຍອັນສາມາດອ້າງຫາ Place ດຽວກັນ.", "ຫຼຸດຜົນຄົ້ນຊ້ຳ ແລະປ້ອງກັນຂໍ້ມູນຮ້ານຂັດກັນ."],
  ["BR-02", "Publish Gate", "Place ຈະ Published ໄດ້ເມື່ອ Required Field ຄົບ, ມີ Source Link, Checked Date ແລະ Admin Approval.", "ປ້ອງກັນບັນທຶກທີ່ຍັງບໍ່ພ້ອມໄປປາກົດຕໍ່ຜູ້ໃຊ້."],
  ["BR-03", "Unknown Data", "ເວລາເປີດ–ປິດ ຫຼືຊ່ວງລາຄາທີ່ກວດບໍ່ໄດ້ຕ້ອງສະແດງ “ຍັງບໍ່ຢືນຢັນ”; ຫ້າມໃສ່ຄ່າຄາດເດົາ.", "ໃຫ້ຜູ້ໃຊ້ແຍກຂໍ້ມູນທີ່ຮູ້ຈິງອອກຈາກຂໍ້ມູນທີ່ຂາດ."],
  ["BR-04", "Content Attribution", "ທຸກ Content Source ຕ້ອງມີ Platform, Creator Name, Canonical URL ແລະ Checked Date; ຫ້າມ Re-host ວິດີໂອໂດຍບໍ່ມີສິດ.", "ຮັກສາທີ່ມາ ແລະຫຼຸດຄວາມສ່ຽງດ້ານຊັບສິນທາງປັນຍາ."],
  ["BR-05", "Separate Trust Labels", "Source linked, Place verified, Founding Partner ແລະ Sponsored ເປັນຄົນລະສະຖານະ ແລະຫ້າມໃຊ້ປ້າຍໜຶ່ງແທນອີກປ້າຍໜຶ່ງ.", "ການຈ່າຍເງິນບໍ່ສາມາດຊື້ Verification ຫຼືຄະແນນ Review."],
  ["BR-06", "Correction Approval", "ຮ້ານສາມາດສະເໜີແກ້ໄຂ ແຕ່ Public Data ປ່ຽນໄດ້ຫຼັງ Admin ກວດຫຼັກຖານ ແລະອະນຸມັດ.", "ຮັກສາຄວາມໜ້າເຊື່ອຖື ແລະ Audit Trail."],
  ["BR-07", "Sponsored Period", "Sponsored Placement ຕ້ອງມີປ້າຍ, ວັນເລີ່ມ, ວັນສິ້ນສຸດ ແລະປິດອັດຕະໂນມັດຫຼືໂດຍ Admin ເມື່ອໝົດ Campaign.", "ປ້ອງກັນການໂຄສະນາເກີນໄລຍະທີ່ຊຳລະ."],
  ["BR-08", "Anonymous Analytics", "Core Journey ຕ້ອງໃຊ້ໄດ້ເມື່ອຜູ້ໃຊ້ປະຕິເສດ Optional Analytics; Event ຫ້າມມີ PII ທີ່ບໍ່ຈຳເປັນ.", "ຫຼຸດການເກັບຂໍ້ມູນ ແລະຮັກສາ Guest-first."],
  ["BR-09", "Decision Intent", "Map/Call/Message ຖືກນັບເປັນເຈດຕະນາ; ຫ້າມລາຍງານເປັນການໄປຮ້ານ ຫຼືຍອດຂາຍຖ້າບໍ່ມີຫຼັກຖານອື່ນ.", "ປ້ອງກັນລາຍງານ Performance ເກີນຄວາມຈິງ."],
  ["BR-10", "No Transaction", "MVP ບໍ່ຮັບ Booking, Payment, Refund ຫຼື Order; ຜູ້ໃຊ້ ແລະຮ້ານຕິດຕໍ່ກັນເອງ.", "ຮັກສາ System Boundary ແລະຫຼຸດ Operational Risk."],
  ["BR-11", "Admin Identity", "Pilot ໃຊ້ Full Admin ບົດບາດດຽວ, ແຕ່ Admin ແຕ່ລະຄົນຕ້ອງໃຊ້ Account ຂອງຕົນເອງ; ຫ້າມແບ່ງປັນ Account. ທຸກການປ່ຽນສຳຄັນຕ້ອງມີ Audit Log.", "ຮູ້ໄດ້ວ່າໃຜປ່ຽນຫຍັງ ແລະສາມາດທວນຄືນເຫດການໄດ້."],
  ["BR-12", "Correction SLA", "ຢືນຢັນການຮັບຄຳຮ້ອງພາຍໃນ 1 ວັນເຮັດວຽກ ແລະຕັດສິນພາຍໃນ 3 ວັນເຮັດວຽກນັບຈາກຫຼັກຖານຄົບ. ຖ້າຫຼັກຖານບໍ່ຄົບ ໃຫ້ຢຸດນັບເວລາໄວ້ທີ່ Needs Evidence.", "ກຳນົດຄວາມຄາດຫວັງຂອງຮ້ານ ແລະຊ່ວຍໃຫ້ Admin ຈັດລຳດັບວຽກ."],
  ["BR-13", "Data Freshness", "ກວດ Contact, Map, Hours, ສະຖານະກິດຈະການ ແລະຊ່ວງລາຄາຂອງ Founding Partner ທຸກ 30 ວັນ ແລະ Free Listing ທຸກ 60 ວັນ. ເມື່ອກາຍກຳນົດໃຫ້ສະແດງ “ຂໍ້ມູນຄວນກວດຄືນ”.", "ຫຼຸດການນຳໃຊ້ຂໍ້ມູນເກົ່າໂດຍບໍ່ລົບ Place ໄວເກີນໄປ."],
  ["BR-14", "Duplicate Merge", "ລະບົບສາມາດແຈ້ງ Duplicate Candidate ຈາກຊື່, ເບີໂທ, ພິກັດ ແລະ Social Page, ແຕ່ Merge ໄດ້ໂດຍ Admin ເທົ່ານັ້ນ. Source, Request, Campaign ແລະ Analytics ຕ້ອງຍ້າຍໄປ Canonical Place ແລະ URL ເກົ່າຕ້ອງ Redirect.", "ປ້ອງກັນການ Merge ຜິດສາຂາ ແລະຮັກສາ Shared Link/ປະຫວັດ."],
  ["BR-15", "Source Availability", "ແຍກ Temporary Failure, Confirmed Unavailable ແລະ Takedown. Failure ຄັ້ງດຽວໃຊ້ Fallback ແລະ Retry; 404/ຖືກລົບ/Private ຫຼືລົ້ມຫຼາຍຄັ້ງຈຶ່ງຖອນຈາກ Feed. Takedown ຖອນຈາກ Public View ທັນທີ; Source Unavailable ກວດຄືນພາຍໃນ 7 ວັນ.", "ບໍ່ລົງໂທດ Source ຈາກບັນຫາຊົ່ວຄາວ ແຕ່ຕອບສະໜອງສິດ Takedown ທັນເວລາ."],
] as const;

const states = [
  ["Place", "Draft", "In Review", "Published", "Suspended / Archived", "ສ້າງ → ກວດ Required Field/Source → ເຜີຍແຜ່ → ຢຸດຊົ່ວຄາວ ຫຼືເກັບເມື່ອປິດກິດຈະການ"],
  ["Content Source", "Proposed", "Checked / Temporary Failure", "Published", "Unavailable / Removed", "ຮັບ URL → ກວດ Creator/Place/ສິດ → ສະແດງ → Retry ເມື່ອລົ້ມຊົ່ວຄາວ → ປິດເມື່ອຢືນຢັນວ່າລິ້ງເສຍ ຫຼືມີ Takedown"],
  ["Correction", "Submitted", "Under Review", "Approved / Rejected", "Closed", "ຮັບຄຳຮ້ອງ → ກວດຫຼັກຖານ → ຕັດສິນ → ອັບເດດ/ແຈ້ງຜົນ → ປິດ"],
  ["Campaign", "Draft", "Scheduled", "Active", "Paused / Ended", "ກຳນົດຮ້ານ/ພື້ນທີ່/ໄລຍະ → ກວດປ້າຍ → ເລີ່ມ → ຢຸດ ຫຼືສິ້ນສຸດ"],
] as const;

const entities = [
  ["Place", "ບັນທຶກຫຼັກຂອງຮ້ານ ຫຼືສະຖານທີ່", "Category, Location, Contact Method, Content Source, Correction, Campaign, Audit Log"],
  ["Content Source", "ລິ້ງ Content ຕົ້ນສະບັບຈາກ Social Platform", "Creator, Source Platform, Place, Availability Check"],
  ["Creator", "ຕົວຕົນຜູ້ສ້າງ Content ສຳລັບ Attribution", "Content Source; ຍັງບໍ່ມີ Login ໃນ MVP"],
  ["Correction Request", "ຄຳຮ້ອງປ່ຽນ Field ພ້ອມຫຼັກຖານ", "Place, Requested Change, Evidence, Status, Admin Decision"],
  ["Campaign", "ຂອບເຂດ Sponsored Placement ທີ່ມີໄລຍະເວລາ", "Place, Placement, Start/End Date, Status, Performance Summary"],
  ["Analytics Event", "ບັນທຶກ Interaction ແບບ Anonymous", "Session, Place/Content ID, Event Name, Timestamp, Action Type"],
  ["Audit Log", "ປະຫວັດວ່າໃຜປ່ຽນຫຍັງ ແລະເມື່ອໃດ", "Admin, Entity, Before/After, Reason, Timestamp"],
] as const;

const permissions = [
  ["ເບິ່ງ Published Place/Content", "ໄດ້", "ໄດ້", "ຜ່ານ Public Link", "ໄດ້"],
  ["Search, Filter, Save, Share, Action", "ໄດ້", "ໄດ້ໃນຖານະ Guest", "ຜ່ານ Public Link", "ໃຊ້ທົດສອບໄດ້"],
  ["ສະເໜີ Correction", "ແຈ້ງໄດ້", "ໄດ້", "ແຈ້ງ Source Issue", "ຮັບແລະປະມວນຜົນ"],
  ["ແກ້ Public Place ໂດຍກົງ", "ບໍ່ໄດ້", "ບໍ່ໄດ້ໃນ Pilot", "ບໍ່ໄດ້", "ໄດ້ພ້ອມ Audit Log"],
  ["Publish/Suspend/Archive", "ບໍ່ໄດ້", "ບໍ່ໄດ້", "ບໍ່ໄດ້", "ໄດ້"],
  ["ຈັດການ Sponsored Campaign", "ບໍ່ໄດ້", "ສະເໜີ/ຕົກລົງນອກລະບົບ", "ບໍ່ໄດ້", "ສ້າງ ແລະປ່ຽນສະຖານະ"],
] as const;

const traceability = [
  ["USR-01", "UC-USR-01", "Feed + Content Source + Place", "Feed View, Place Open"],
  ["USR-02", "UC-USR-02", "Search + Category/Area/Price Filter", "Search, Filter, Empty Result"],
  ["USR-03", "UC-USR-03", "Canonical Place Page + Trust Labels", "Place Open, Source Click"],
  ["USR-04", "UC-USR-04", "Map/Call/Message + External Deep Link", "Decision Intent by Action Type"],
  ["USR-05", "UC-USR-05", "Device-local Save + Canonical Share Link", "Save, Share"],
  ["BUS-01", "UC-BUS-01", "Correction Request + Evidence + Admin Decision", "Request Status + Audit Log"],
  ["ADM-01", "UC-ADM-01—04", "Admin Place/Source/Request/Campaign Workflow", "Admin Action + Entity Status"],
  ["TRU-01", "BR-04—07", "Attribution, Verification, Partner, Sponsored", "Label Presence + Checked Date"],
  ["ANA-01", "BR-08—09", "Consent + Anonymous Event Pipeline", "Event QA against Test Log"],
] as const;

const edgeCases = [
  ["ບໍ່ພົບ Search Result", "ສະແດງຄຳຄົ້ນ/Filter ທີ່ໃຊ້, ປຸ່ມລ້າງ Filter ແລະໝວດທາງເລືອກ; ບໍ່ສະແດງຜົນທີ່ບໍ່ກົງໂດຍບໍ່ບອກ."],
  ["Official Embed ລົ້ມເຫຼວ", "Failure ຄັ້ງດຽວຖືເປັນ Temporary Failure: ໃຊ້ Preview/Fallback, Attribution ແລະ Link ຕົ້ນສະບັບ ພ້ອມ Retry; Place Data ຕ້ອງຍັງອ່ານໄດ້."],
  ["Source URL ຖືກລົບ", "404, Content ຖືກລົບ/Private ຫຼື Retry ບໍ່ຜ່ານຈຶ່ງປ່ຽນ Source ເປັນ Confirmed Unavailable ແລະຖອນຈາກ Feed; ກວດຄືນພາຍໃນ 7 ວັນ. Takedown ຖອນ Public View ທັນທີ."],
  ["Place ຊ້ຳ", "ລະບົບແຈ້ງ Duplicate Candidate ຈາກຊື່, ເບີໂທ, ພິກັດ ແລະ Social Page; Admin ເທົ່ານັ້ນທີ່ Merge ໄດ້. ຂໍ້ມູນສຳພັນຖືກຍ້າຍ ແລະ URL ເກົ່າ Redirect ໄປ Canonical Place."],
  ["ຮ້ານປິດຊົ່ວຄາວ/ຖາວອນ", "ຊົ່ວຄາວໃຊ້ Suspended ພ້ອມເຫດຜົນ; ຖາວອນໃຊ້ Archived ແລະບໍ່ປາກົດໃນ Feed/Search."],
  ["External App ບໍ່ມີ", "ສະແດງຂໍ້ມູນໃຫ້ Copy ຫຼືທາງເລືອກ Web; ບໍ່ຄວນປ່ອຍຜູ້ໃຊ້ຢູ່ Error Page ທີ່ບໍ່ມີທາງອອກ."],
  ["ຜູ້ໃຊ້ປະຕິເສດ Analytics", "ບັນທຶກສະເພາະສິ່ງຈຳເປັນຕໍ່ການເຮັດວຽກ/ຄວາມປອດໄພ ແລະບໍ່ຂັດຂວາງ Core Journey."],
] as const;

export default function SystemAnalysisDocument({ basePath }: { basePath: string }) {
  const [activeUseCase, setActiveUseCase] = useState<(typeof useCases)[number]["id"]>("discover");
  const useCase = useCases.find((item) => item.id === activeUseCase) ?? useCases[0];

  return (
    <article className={`${styles.detailBody} ${styles.systemAnalysisBody} ${styles.businessDocument}`}>
      <section className={styles.documentControl}>
        <div><small>ສະບັບ</small><strong>0.7</strong></div>
        <div><small>ສະຖານະ</small><strong>ກຳລັງຈັດເຮັດ</strong></div>
        <div><small>ວັນທີປັບປຸງ</small><strong>26 ສິງຫາ 2026</strong></div>
        <div><small>ເອກະສານຕົ້ນທາງ</small><strong>PRO-01 Product Requirements 1.0</strong></div>
      </section>

      <aside className={styles.saReconstructionNotice}>
        <div><span>ປັບສະຖານະເອກະສານ</span><h2>PRO-02 ກຳລັງຖືກສ້າງຄືນຕາມ 7 ຂັ້ນຂອງ System Analysis</h2></div>
        <div>
          <p>PRO-02 ຖືກຖອນຈາກສະຖານະ 1.0 ເພາະຍັງບໍ່ພຽງພໍສຳລັບ Developer Handoff. Actor, Boundary, Use Case ລະດັບສູງ ແລະ Business Rules ຈະຖືກເກັບເປັນພາກພື້ນຖານ.</p>
          <p>Functional Decomposition/Catalog ເປັນພາກ B; Logical Data Model/ERD ເປັນພາກ C; Workflow/Sequence ເປັນພາກ D; Function Specification/Algorithm ເປັນພາກ E; State Transition/Error Handling ເປັນພາກ F ແລ້ວ. ກ່ອນກັບໄປສູ່ສະບັບ 1.0 ຍັງຕ້ອງເພີ່ມ Traceability Matrix ແລະ Development Dependency Order.</p>
        </div>
      </aside>

      <header className={styles.documentReadingHeader}>
        <span>PRO-02 · SYSTEM ANALYSIS</span>
        <h2>ການວິເຄາະລະບົບ “ພ້ອມໄປ” ສຳລັບ MVP</h2>
        <p>System Analysis ຫຼື SA ແປ Requirement ຈາກ PRO-01 ໃຫ້ເປັນພາບການເຮັດວຽກຂອງລະບົບ: ໃຜເຮັດຫຍັງ, ເລີ່ມຈາກເຫດການໃດ, ຂໍ້ມູນໄຫຼໄປໃສ, ກົດໃດຄວບຄຸມ ແລະລະບົບຢຸດຮັບຜິດຊອບຢູ່ຈຸດໃດ.</p>
        <p>ເອກະສານນີ້ຢູ່ລະຫວ່າງ Product ແລະ Technical Design. ມັນລະອຽດພໍໃຫ້ UX/UI, Developer, Tester ແລະ Admin ເຂົ້າໃຈ Process ດຽວກັນ, ແຕ່ຍັງບໍ່ເລືອກ Database Schema, API Endpoint ຫຼື Technology Stack.</p>
      </header>

      <nav className={styles.documentToc} aria-label="ສາລະບານ PRO-02">
        <b>ສາລະບານ</b>
        <ol>
          <li><a href="#sa-purpose">ຈຸດປະສົງ ແລະຂອບເຂດຂອງ SA</a></li>
          <li><a href="#sa-boundary">System Boundary</a></li>
          <li><a href="#sa-actors">Actors ແລະ Stakeholders</a></li>
          <li><a href="#sa-use-cases">Use Cases ແລະ Main Flow</a></li>
          <li><a href="#sa-processes">ຂະບວນການຫຼັກ</a></li>
          <li><a href="#sa-rules">Business Rules</a></li>
          <li><a href="#sa-states">ສະຖານະ ແລະ Lifecycle</a></li>
          <li><a href="#sa-data">Conceptual Data Model</a></li>
          <li><a href="#sa-permissions">ສິດ ແລະການຄວບຄຸມ</a></li>
          <li><a href="#sa-errors">Exception ແລະ Edge Cases</a></li>
          <li><a href="#sa-traceability">Traceability</a></li>
          <li><a href="#sa-review">5 ຂໍ້ຕັດສິນທີ່ອະນຸມັດ</a></li>
          <li><a href="#sa-state-error-specification">State Transition & Error Handling</a></li>
        </ol>
      </nav>

      <section className={styles.documentArticleSection} id="sa-purpose">
        <span>01 · PURPOSE</span>
        <h2>SA ອະທິບາຍ Logic ການເຮັດວຽກ ບໍ່ແມ່ນຮູບໜ້າຈໍ ຫຼື Code</h2>
        <p className={styles.documentQuestion}>ເອກະສານນີ້ຕ້ອງຕອບຄຳຖາມຫຍັງໃຫ້ທີມພັດທະນາ?</p>
        <div className={styles.documentProse}>
          <p>SA ກຳນົດ Actor, Use Case, Main Flow, Alternative Flow, Business Rule, Entity, State ແລະ System Boundary. ສິ່ງເຫຼົ່ານີ້ຊ່ວຍປ້ອງກັນບັນຫາທີ່ແຕ່ລະຝ່າຍເຂົ້າໃຈ Feature ຄົນລະແບບ.</p>
          <p>ຕົວຢ່າງ: PRD ບອກວ່າຮ້ານ “ສະເໜີແກ້ໄຂຂໍ້ມູນໄດ້”. SA ຕ້ອງອະທິບາຍຕໍ່ວ່າຜູ້ແຈ້ງສົ່ງຫຍັງ, Admin ກວດຫຍັງ, Public Data ປ່ຽນຕອນໃດ, ຖ້າຫຼັກຖານບໍ່ພໍຈະເຮັດແນວໃດ ແລະຈະເກັບປະຫວັດແນວໃດ.</p>
          <p>SA ບໍ່ກຳນົດຮູບຮ່າງປຸ່ມ, ສີ ຫຼືຕຳແໜ່ງ Component; ນັ້ນແມ່ນວຽກຂອງ UX/UI. SA ກໍບໍ່ກຳນົດ Table, Index, Endpoint ຫຼື Cloud Provider; ນັ້ນແມ່ນວຽກຂອງ Technical Design.</p>
        </div>
        <dl className={styles.documentDefinitions}>
          <div><dt>Actor</dt><dd>ບຸກຄົນ, ບົດບາດ ຫຼືລະບົບພາຍນອກທີ່ແລກປ່ຽນຂໍ້ມູນກັບ “ພ້ອມໄປ”.</dd></div>
          <div><dt>Use Case</dt><dd>ການອະທິບາຍເປົ້າໝາຍໜຶ່ງຂອງ Actor ຕັ້ງແຕ່ Trigger, Preconditions, Main Flow, Exception ຫາ Outcome.</dd></div>
          <div><dt>Business Rule</dt><dd>ກົດທີ່ບອກວ່າຂໍ້ມູນ ຫຼື Process ຕ້ອງຖືກຄວບຄຸມແນວໃດ ໂດຍບໍ່ຂຶ້ນກັບໜ້າຈໍ.</dd></div>
          <div><dt>Entity</dt><dd>ສິ່ງທີ່ລະບົບຕ້ອງຈື່ຈຳ ແລະຈັດການ ເຊັ່ນ Place, Content Source, Correction Request ຫຼື Campaign.</dd></div>
        </dl>
      </section>

      <section className={styles.documentArticleSection} id="sa-boundary">
        <span>02 · SYSTEM BOUNDARY</span>
        <h2>“ພ້ອມໄປ” ຈັດລະບຽບການຄົ້ນພົບ ແລະການຕັດສິນໃຈ—ບໍ່ຮັບທຸລະກຳ</h2>
        <p className={styles.documentQuestion}>ລະບົບຮັບຜິດຊອບຮອດຈຸດໃດ ແລະສົ່ງຕໍ່ໃຫ້ລະບົບອື່ນຢູ່ຈຸດໃດ?</p>
        <div className={styles.documentProse}>
          <p>ພາຍໃນ Boundary, “ພ້ອມໄປ” ຮັບຜິດຊອບ Feed, Search/Filter, Canonical Place Page, Content Attribution, Trust Label, Save/Share, Correction/Takedown Workflow, Sponsored Placement, Admin Operation ແລະ Anonymous Product Analytics.</p>
          <p>ພາຍນອກ Boundary, Social Platform ເປັນເຈົ້າຂອງ/ໂຮສ Content ຕົ້ນສະບັບ; Map Provider ຮັບການນຳທາງ; Phone ແລະ Messaging App ຮັບການຕິດຕໍ່. ເມື່ອຜູ້ໃຊ້ອອກໄປແອັບພາຍນອກ, Platform ບໍ່ຄວບຄຸມການສື່ສານ, ການຈອງ, ການຊຳລະ ຫຼືການໃຫ້ບໍລິການຂອງຮ້ານ.</p>
          <p>Boundary ນີ້ເປັນການຕັດສິນດ້ານ Product ແລະ Operation: MVP ບໍ່ຕ້ອງສ້າງ Inventory, Booking Calendar, Payment Ledger, Refund ຫຼື Customer Dispute. ຖ້າຈະເພີ່ມໃນອະນາຄົດ ຈະຕ້ອງເຮັດ SA ແລະ Risk Review ໃໝ່.</p>
        </div>
        <div className={styles.systemContext} aria-label="System context">
          <div><b>CONTENT SOURCES</b><span>Facebook · TikTok · YouTube</span></div>
          <i>→</i>
          <strong><small>SYSTEM OF RECORD</small>ພ້ອມໄປ<em>Feed · Place · Trust · Admin · Analytics</em></strong>
          <i>→</i>
          <div><b>EXTERNAL ACTIONS</b><span>Map · Phone · Messaging</span></div>
        </div>
        <p className={styles.documentSectionCaution}><strong>ຂອບເຂດສຳຄັນ:</strong> ການກົດ Map, Call ຫຼື Message ຢືນຢັນໄດ້ພຽງ Decision Intent; ລະບົບບໍ່ຮູ້ໂດຍອັດຕະໂນມັດວ່າຜູ້ໃຊ້ໄປຮ້ານ ຫຼືຊື້ຈິງ.</p>
      </section>

      <section className={styles.documentArticleSection} id="sa-actors">
        <span>03 · ACTORS & STAKEHOLDERS</span>
        <h2>Actor ແມ່ນບົດບາດຕໍ່ລະບົບ ບໍ່ແມ່ນຊື່ບຸກຄົນ</h2>
        <p className={styles.documentQuestion}>ໃຜໃຊ້ລະບົບໂດຍກົງ, ໃຜໃຫ້ຂໍ້ມູນ ແລະໃຜໄດ້ຮັບຜົນກະທົບ?</p>
        <div className={styles.documentProse}>
          <p>Actor ຫຼັກມີ Guest User, Place Owner/Representative ແລະ Admin. Creator ເປັນທັງ Stakeholder ແລະ Content Source Actor ເພາະ Content ຂອງເຂົາຖືກອ້າງອີງ, ແຕ່ໃນ MVP ຍັງບໍ່ມີ Creator Login ຫຼື Dashboard.</p>
          <p>ຄົນດຽວສາມາດມີຫຼາຍບົດບາດ. ເຈົ້າຂອງຮ້ານອາດເຂົ້າເບິ່ງ Feed ໃນຖານະ Guest; Admin ອາດທົດສອບ Public Journey. ແຕ່ Permission ຕ້ອງອີງຕາມບົດບາດໃນເວລານັ້ນ, ບໍ່ແມ່ນອີງຕາມຄວາມຄຸ້ນເຄີຍ.</p>
        </div>
        <div className={styles.actorCards}>
          <article><b>PRIMARY ACTOR</b><h3>Guest User</h3><p>ຄົ້ນພົບ, ກວດຂໍ້ມູນ, Save/Share ແລະກົດ Map/Call/Message ໂດຍບໍ່ມີ Account.</p></article>
          <article><b>BUSINESS ACTOR</b><h3>Place Owner</h3><p>ກວດ Public Profile, ສະເໜີ Correction, ໃຫ້ຫຼັກຖານ ແລະຮ່ວມ Pilot/Campaign ຜ່ານຊ່ອງທາງນອກລະບົບ.</p></article>
          <article><b>CONTENT STAKEHOLDER</b><h3>Creator</h3><p>ໄດ້ຮັບ Attribution ແລະ Link ກັບຫາຕົ້ນສະບັບ; ສາມາດແຈ້ງ Source Issue/Takedown.</p></article>
          <article><b>OPERATIONAL ACTOR</b><h3>Admin</h3><p>ສ້າງ, ກວດ, Publish, Suspend, Merge ແລະ Archive ຂໍ້ມູນ; ຈັດການ Request, Label ແລະ Campaign.</p></article>
          <article><b>EXTERNAL SYSTEM</b><h3>Social Platforms</h3><p>ໂຮສ Content ຕົ້ນສະບັບ ແລະກຳນົດ Embed/Link Availability; “ພ້ອມໄປ” ຄວບຄຸມບໍ່ໄດ້.</p></article>
          <article><b>EXTERNAL SYSTEM</b><h3>Map / Phone / Message</h3><p>ຮັບ Deep Link ຫຼື Contact Action ແລະດຳເນີນການຕໍ່ນອກ Platform.</p></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="sa-use-cases">
        <span>04 · USE CASE ANALYSIS</span>
        <h2>Use Case ເຊື່ອມເປົ້າໝາຍຂອງ Actor ກັບພຶດຕິກຳຂອງລະບົບ</h2>
        <p className={styles.documentQuestion}>Main Flow ແລະ Exception Flow ຂອງ Journey ຫຼັກເປັນແນວໃດ?</p>
        <div className={styles.documentProse}>
          <p>Use Case ບໍ່ໄດ້ບອກພຽງວ່າ “ມີ Feature”. ມັນລະບຸ Trigger, Preconditions, ຂັ້ນຕອນທຳມະດາ, ທາງອອກເມື່ອເກີດບັນຫາ ແລະ Outcome. ການແຍກຄົບທັງ 5 ສ່ວນຊ່ວຍໃຫ້ UX ອອກແບບ State ແລະ Tester ຂຽນ Scenario ໄດ້.</p>
        </div>
        <div className={styles.saTabs} role="tablist" aria-label="System use cases">
          {useCases.map((item) => <button key={item.id} type="button" role="tab" aria-selected={activeUseCase === item.id} className={activeUseCase === item.id ? styles.activeSaTab : ""} onClick={() => setActiveUseCase(item.id)}><small>{item.label}</small><strong>{item.title}</strong></button>)}
        </div>
        <div className={styles.useCasePanel} role="tabpanel">
          <header><small>PRIMARY ACTOR</small><strong>{useCase.actor}</strong><p><b>Trigger:</b> {useCase.trigger}</p></header>
          <div><b>PRECONDITIONS</b><ul>{useCase.preconditions.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><b>MAIN FLOW</b><ol>{useCase.mainFlow.map((item) => <li key={item}>{item}</li>)}</ol></div>
          <div><b>EXCEPTIONS / ALTERNATIVES</b><ul>{useCase.exceptions.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <footer><b>EXPECTED OUTCOME</b><p>{useCase.outcome}</p></footer>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="sa-processes">
        <span>05 · PROCESS FLOWS</span>
        <h2>4 ຂະບວນການຫຼັກຕ້ອງເຊື່ອມ Public Experience ກັບ Admin Operation</h2>
        <p className={styles.documentQuestion}>ຂໍ້ມູນເຂົ້າລະບົບ, ຜ່ານການກວດ ແລະອອກໄປຫາຜູ້ໃຊ້ແນວໃດ?</p>
        <div className={styles.documentProse}>
          <p>Public Discovery Flow ແລະ Admin Content Flow ບໍ່ຄວນອອກແບບແຍກຂາດຈາກກັນ. Feed ທີ່ຜູ້ໃຊ້ເຫັນເກີດຈາກ Place/Source ທີ່ Admin ກວດ; Correction ທີ່ຮ້ານສົ່ງຈະປ່ຽນ Public Data ໄດ້ຫຼັງ Admin Decision; Campaign ຈະປາກົດໄດ້ສະເພາະໃນໄລຍະ Active.</p>
        </div>
        <div className={styles.processGrid}>
          <article><b>PROCESS 01</b><h3>Discover → Decide → Act</h3><ol><li>ເຂົ້າ Feed/Search</li><li>ເລືອກ Content/Place</li><li>ກວດ Place Data/Source</li><li>ກົດ Map/Call/Message</li><li>ບັນທຶກ Decision Intent</li></ol></article>
          <article><b>PROCESS 02</b><h3>Source → Place → Publish</h3><ol><li>ຮັບ Content URL</li><li>ຄົ້ນ Canonical Place</li><li>ສ້າງ/ຈັບຄູ່ Source</li><li>ກວດ Required Field/Attribution</li><li>Admin Publish</li></ol></article>
          <article><b>PROCESS 03</b><h3>Correction → Evidence → Decision</h3><ol><li>ຮັບຄຳຮ້ອງ</li><li>ລະບຸ Field ທີ່ປ່ຽນ</li><li>ກວດຫຼັກຖານ</li><li>Approve/Reject</li><li>Update + Audit + Close</li></ol></article>
          <article><b>PROCESS 04</b><h3>Campaign → Label → Report</h3><ol><li>ລະບຸ Place/Placement</li><li>ກຳນົດໄລຍະ</li><li>ກວດ Sponsored Label</li><li>Activate/End</li><li>ສະຫຼຸບ Performance</li></ol></article>
        </div>
      </section>

      <section className={styles.documentArticleSection} id="sa-rules">
        <span>06 · BUSINESS RULES</span>
        <h2>Business Rule ຕ້ອງຄວບຄຸມຂໍ້ມູນຄືກັນບໍ່ວ່າຜູ້ໃຊ້ຈະເຂົ້າຈາກໜ້າໃດ</h2>
        <p className={styles.documentQuestion}>ກົດໃດຫ້າມປ່ຽນຕາມ UI ຫຼືຄວາມສະດວກຊົ່ວຄາວ?</p>
        <div className={styles.documentProse}>
          <p>Business Rule ເປັນ Logic ກາງ. ຕົວຢ່າງ Publish Gate ຕ້ອງໃຊ້ທັງເມື່ອ Admin ສ້າງ Place ໃໝ່ ແລະເມື່ອ Correction ປ່ຽນ Field ສຳຄັນ. ຖ້າກົດມີຢູ່ພຽງໃນປຸ່ມຂອງໜ້າໜຶ່ງ, ການອັບເດດຈາກອີກຊ່ອງທາງອາດຂ້າມກົດໄດ້.</p>
          <p>ID ຂອງ Rule ຈະຖືກນຳໄປອ້າງໃນ Use Case, Data Validation, API Contract ແລະ Test Case. ຖ້າມີການປ່ຽນ Rule, ຕ້ອງກວດທຸກຈຸດທີ່ອ້າງ ID ນັ້ນ.</p>
        </div>
        <div className={styles.businessRuleTable} role="table" aria-label="Business rules">
          <div role="row"><b>ID</b><b>RULE</b><b>ຂໍ້ກຳນົດ</b><b>ເຫດຜົນ</b></div>
          {businessRules.map(([id, name, rule, rationale]) => <div role="row" key={id}><b>{id}</b><strong>{name}</strong><p>{rule}</p><span>{rationale}</span></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection} id="sa-states">
        <span>07 · STATE & LIFECYCLE</span>
        <h2>State ບອກວ່າ Record ກຳລັງຢູ່ຂັ້ນໃດ ແລະການກະທຳໃດອະນຸຍາດ</h2>
        <p className={styles.documentQuestion}>ເປັນຫຍັງຈຶ່ງບໍ່ໃຊ້ພຽງ “ເປີດ/ປິດ” ສຳລັບທຸກຢ່າງ?</p>
        <div className={styles.documentProse}>
          <p>Record ທີ່ “ຍັງບໍ່ທັນກວດ”, “ຖືກຢຸດຊົ່ວຄາວ” ແລະ “ຖືກເກັບເພາະປິດກິດຈະການ” ມີຄວາມໝາຍບໍ່ຄືກັນ. ຖ້າມີພຽງ Boolean ເປີດ/ປິດ, Admin ຈະບໍ່ຮູ້ສາເຫດ ແລະບໍ່ຮູ້ວ່າຈະເຮັດຫຍັງຕໍ່.</p>
          <p>ການປ່ຽນ State ຕ້ອງມີຜູ້ກະທຳ, ເວລາ, ເຫດຜົນ ແລະກົດກ່ອນ/ຫຼັງ. ຕົວຢ່າງ Place ຈາກ In Review ໄປ Published ຕ້ອງຜ່ານ BR-02; Campaign ຈາກ Scheduled ໄປ Active ຕ້ອງຢູ່ໃນໄລຍະທີ່ອະນຸມັດ ແລະມີ Sponsored Label.</p>
        </div>
        <div className={styles.stateTable} role="table" aria-label="Entity lifecycle states">
          <div role="row"><b>ENTITY</b><b>ເລີ່ມ</b><b>ກຳລັງກວດ/ລໍຖ້າ</b><b>ສະຖານະໃຊ້ງານ</b><b>ຢຸດ/ສິ້ນສຸດ</b><b>ຄວາມໝາຍຂອງ FLOW</b></div>
          {states.map(([entity, start, review, active, end, meaning]) => <div role="row" key={entity}><strong>{entity}</strong><span>{start}</span><span>{review}</span><span>{active}</span><span>{end}</span><p>{meaning}</p></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection} id="sa-data">
        <span>08 · CONCEPTUAL DATA MODEL</span>
        <h2>Data Model ລະດັບແນວຄິດບອກວ່າລະບົບຕ້ອງຈື່ຈຳຫຍັງ ແລະສິ່ງເຫຼົ່ານັ້ນສຳພັນກັນແນວໃດ</h2>
        <p className={styles.documentQuestion}>ນີ້ແມ່ນ Database Schema ແລ້ວຫຼືຍັງ?</p>
        <div className={styles.documentProse}>
          <p>Conceptual Data Model ຍັງບໍ່ແມ່ນ Table Schema. ມັນລະບຸ Entity ແລະ Relationship ທີ່ທຸລະກິດຕ້ອງການ ໂດຍບໍ່ຕັດສິນ Data Type, Primary Key, Index ຫຼື Storage Engine. ການອອກແບບ Database ຈະອ້າງອີງ Model ນີ້ພາຍຫຼັງ.</p>
          <p>Place ເປັນ Center Entity: ມີ Content Source ຫຼາຍອັນ, Correction Request ຫຼາຍຄັ້ງ, Campaign ຫຼາຍໄລຍະ ແລະ Analytics Event ຫຼາຍເຫດການ. Creator ອາດມີ Content Source ຫຼາຍອັນ; Content Source ໜຶ່ງຄວນຊີ້ໄປ Place ຫຼັກໜຶ່ງໃນ MVP.</p>
          <p>Audit Log ບໍ່ແມ່ນ Public Content. ມັນເກັບຫຼັກຖານການປ່ຽນຂອງ Admin ເພື່ອທວນຄືນວ່າ Field ໃດຖືກປ່ຽນ, ປ່ຽນຈາກຫຍັງເປັນຫຍັງ, ເຫດຜົນຫຍັງ ແລະອ້າງຫຼັກຖານໃດ.</p>
        </div>
        <div className={styles.entityTable} role="table" aria-label="Conceptual entities">
          <div role="row"><b>ENTITY</b><b>ໜ້າທີ່</b><b>ຄວາມສຳພັນຫຼັກ</b></div>
          {entities.map(([entity, purpose, relations]) => <div role="row" key={entity}><strong>{entity}</strong><p>{purpose}</p><span>{relations}</span></div>)}
        </div>
        <div className={styles.documentExample}><b>ຕົວຢ່າງຄວາມສຳພັນ</b><p>Place “ຮ້ານ A” ອາດມີ TikTok Source 2 ລິ້ງ ແລະ YouTube Source 1 ລິ້ງ, Correction Request 3 ຄັ້ງ ແລະ Sponsored Campaign 1 ໄລຍະ. ທັງໝົດອ້າງຫາ Place ID ດຽວ ເພື່ອບໍ່ສ້າງຮ້ານຊ້ຳ.</p></div>
      </section>

      <section className={styles.documentArticleSection} id="sa-permissions">
        <span>09 · PERMISSIONS & CONTROL</span>
        <h2>ສິດໃນ Pilot ຍຶດຫຼັກ Guest-first ແຕ່ Public Data ຕ້ອງປ່ຽນຜ່ານ Admin</h2>
        <p className={styles.documentQuestion}>ຜູ້ໃຊ້ແຕ່ລະບົດບາດເບິ່ງ ແລະປ່ຽນຫຍັງໄດ້?</p>
        <div className={styles.documentProse}>
          <p>Guest User ອ່ານ Public Data ແລະໃຊ້ Core Journey ໄດ້. Place Owner ແລະ Creator ຍັງບໍ່ມີ Authenticated Dashboard ໃນ MVP; ເຂົາເຈົ້າສົ່ງ Correction ຫຼື Source Issue ຜ່ານຊ່ອງທາງທີ່ກຳນົດ, ແລ້ວ Admin ເປັນຜູ້ປະມວນຜົນ.</p>
          <p>Admin ມີສິດສູງເພາະສາມາດປ່ຽນ Public Data ແລະ Trust Label. ດັ່ງນັ້ນທຸກ Admin Action ທີ່ສຳຄັນຕ້ອງມີ Authentication ແລະ Audit Log. ລາຍລະອຽດ Role-based Access Control, Session ແລະ Security Policy ຈະກຳນົດໃນ Technical/Security Document.</p>
        </div>
        <div className={styles.permissionTable} role="table" aria-label="Actor permission matrix">
          <div role="row"><b>ACTION</b><b>GUEST</b><b>PLACE OWNER</b><b>CREATOR</b><b>ADMIN</b></div>
          {permissions.map(([action, guest, owner, creator, admin]) => <div role="row" key={action}><strong>{action}</strong><span>{guest}</span><span>{owner}</span><span>{creator}</span><span>{admin}</span></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection} id="sa-errors">
        <span>10 · EXCEPTIONS & EDGE CASES</span>
        <h2>ລະບົບຕ້ອງມີທາງອອກເມື່ອຂໍ້ມູນ ຫຼືລະບົບພາຍນອກບໍ່ເປັນໄປຕາມຄາດ</h2>
        <p className={styles.documentQuestion}>ກໍລະນີຜິດປົກກະຕິໃດທີ່ຕ້ອງອອກແບບຕັ້ງແຕ່ກ່ອນພັດທະນາ?</p>
        <div className={styles.documentProse}>
          <p>Platform ພຶ່ງພາ Content URL, Embed, Map ແລະ Messaging App ພາຍນອກ; ສິ່ງເຫຼົ່ານັ້ນອາດຊ້າ, ຖືກລົບ ຫຼືບໍ່ມີໃນອຸປະກອນ. Exception ຈຶ່ງບໍ່ແມ່ນວຽກເພີ່ມພາຍຫຼັງ; ມັນເປັນສ່ວນຂອງ Core Experience.</p>
          <p>ຫຼັກທົ່ວໄປແມ່ນ: ບອກສະຖານະຕາມຄວາມຈິງ, ບໍ່ສ້າງຂໍ້ມູນຄາດເດົາ, ຮັກສາ Place Data ໃຫ້ອ່ານໄດ້ເມື່ອ Media ລົ້ມ, ແລະໃຫ້ຜູ້ໃຊ້ມີທາງເລືອກຖັດໄປ.</p>
        </div>
        <ol className={styles.edgeCaseList}>{edgeCases.map(([caseName, response], index) => <li key={caseName}><b>{String(index + 1).padStart(2, "0")}</b><strong>{caseName}</strong><p>{response}</p></li>)}</ol>
      </section>

      <section className={styles.documentArticleSection} id="sa-traceability">
        <span>11 · REQUIREMENT TRACEABILITY</span>
        <h2>PRO-02 ຕ້ອງບອກໄດ້ວ່າແຕ່ລະ Requirement ຈາກ PRO-01 ຖືກວິເຄາະຢູ່ໃສ</h2>
        <p className={styles.documentQuestion}>ຈະປ້ອງກັນ Requirement ຕົກຫຼົ່ນເມື່ອສົ່ງຕໍ່ຫາ Design ແລະ Development ແນວໃດ?</p>
        <div className={styles.documentProse}>
          <p>Traceability Matrix ເຊື່ອມ PRD Requirement → SA Use Case/Rule → System Responsibility → Evidence. ມັນບໍ່ແທນ Test Plan, ແຕ່ຊ່ວຍກວດວ່າທຸກ Requirement ມີ Process ແລະຂໍ້ມູນຮອງຮັບ.</p>
          <p>ໃນເອກະສານຖັດໄປ, Use Case/Rule ID ຈະຖືກອ້າງໃນ PRO-03 Scope, PRO-04 Acceptance Criteria, UX Flow, Data/API Design ແລະ Test/UAT. ຖ້າ Requirement ປ່ຽນ, Matrix ຈະບອກວ່າສ່ວນໃດຕ້ອງປັບຕາມ.</p>
        </div>
        <div className={styles.traceTable} role="table" aria-label="Requirement traceability matrix">
          <div role="row"><b>PRO-01</b><b>PRO-02</b><b>SYSTEM RESPONSIBILITY</b><b>EVIDENCE / EVENT</b></div>
          {traceability.map(([requirement, analysis, responsibility, evidence]) => <div role="row" key={requirement}><b>{requirement}</b><strong>{analysis}</strong><p>{responsibility}</p><span>{evidence}</span></div>)}
        </div>
      </section>

      <section className={styles.documentArticleSection} id="sa-review">
        <span>12 · REVIEW DECISIONS</span>
        <h2>5 ຂໍ້ຕັດສິນທີ່ຢືນຢັນເພື່ອນຳໄປຂະຫຍາຍ SA</h2>
        <p className={styles.documentQuestion}>ຂໍ້ຕັດສິນໃດຖືກຢືນຢັນແລ້ວ ແຕ່ຍັງຕ້ອງແປຕໍ່ເປັນ Function, Workflow, Data Constraint ແລະ Testable Logic?</p>
        <ol className={styles.reviewDecisions}>
          <li><b>01 · ADMIN ROLE</b><div><strong>ອະນຸມັດ:</strong><p>Pilot ເລີ່ມດ້ວຍ Full Admin ບົດບາດດຽວ. ຫ້າມໃຊ້ Admin Account ຮ່ວມກັນ; ທຸກການປ່ຽນສຳຄັນຕ້ອງບັນທຶກຜູ້ປ່ຽນ, ຂໍ້ມູນກ່ອນ–ຫຼັງ, ເຫດຜົນ ແລະເວລາ. ເມື່ອມີ Admin ຕັ້ງແຕ່ 2 ຄົນຂຶ້ນໄປ ໃຫ້ແຍກ Operator ແລະ Approver.</p></div></li>
          <li><b>02 · CORRECTION SLA</b><div><strong>ອະນຸມັດ:</strong><p>ຢືນຢັນການຮັບຄຳຮ້ອງພາຍໃນ 1 ວັນເຮັດວຽກ ແລະຕັດສິນພາຍໃນ 3 ວັນເຮັດວຽກນັບຈາກຫຼັກຖານຄົບ. ໄລຍະ 3 ວັນຢຸດນັບໃນສະຖານະ Needs Evidence. ແຜນທີ່/ເບີໂທຜິດ, ຮ້ານປິດ ຫຼື Takedown ເປັນຄຳຮ້ອງດ່ວນທີ່ຕ້ອງກວດພາຍໃນ 24 ຊົ່ວໂມງ.</p></div></li>
          <li><b>03 · DATA FRESHNESS</b><div><strong>ອະນຸມັດ:</strong><p>ກວດ Contact, Hours, Map, ສະຖານະກິດຈະການ ແລະຊ່ວງລາຄາຂອງ Founding Partner ທຸກ 30 ວັນ ແລະ Free Listing ທຸກ 60 ວັນ. ເມື່ອກາຍກຳນົດໃຫ້ສະແດງ “ຂໍ້ມູນຄວນກວດຄືນ”; ຖ້າກາຍກຳນົດຫຼາຍ ແລະຢືນຢັນບໍ່ໄດ້ ຈຶ່ງ Suspend ຈາກ Feed/Search.</p></div></li>
          <li><b>04 · DUPLICATE PLACE</b><div><strong>ອະນຸມັດ:</strong><p>ລະບົບແຈ້ງ Duplicate Candidate ຈາກຊື່, ເບີໂທ, ພິກັດ ແລະ Social Page; Admin ເທົ່ານັ້ນທີ່ Merge ໄດ້. Content Source, Correction, Campaign ແລະ Analytics ຕ້ອງຍ້າຍໄປ Canonical Place; URL ເກົ່າຕ້ອງ Redirect ແລະມີ Audit Log.</p></div></li>
          <li><b>05 · SOURCE UNAVAILABLE</b><div><strong>ອະນຸມັດ:</strong><p>ແຍກ Temporary Failure, Confirmed Unavailable ແລະ Takedown. Failure ຄັ້ງດຽວໃຊ້ Fallback ແລະ Retry; 404, Content ຖືກລົບ/Private ຫຼື Retry ບໍ່ຜ່ານຈຶ່ງຖອນຈາກ Feed. Takedown ຖອນຈາກ Public View ທັນທີ. Source Unavailable ກວດຄືນພາຍໃນ 7 ວັນ; Place Page ຍັງຢູ່ໄດ້ຖ້າຜ່ານ Publish Gate.</p></div></li>
        </ol>
      </section>

      <SystemAnalysisFunctionCatalog />

      <SystemAnalysisDataModel />

      <SystemAnalysisWorkflows />

      <SystemAnalysisFunctionSpecifications />

      <SystemAnalysisStateErrors />

      <aside className={styles.draftApprovalGate}>
        <div><span>ກຳລັງຈັດເຮັດ</span><h2>PRO-02 · System Analysis 0.7</h2><p>ຂັ້ນ 1–5 ຈັດເຮັດແລ້ວ: 64 Functions ມີ Catalog, Data Model, Workflow, Specification/Algorithm ແລະ Error Policy ຄົບ. 7 State Machines ກຳນົດ Transition, Guard, Atomic Write, Retry ແລະ Failure Result ແລ້ວ. ເອກະສານຍັງບໍ່ເປັນ Developer-ready SA ຈົນກວ່າຂັ້ນ 6–7 ຈະຄົບ.</p></div>
        <ul><li>ພາກ A · Context & Rules — ມີແລ້ວ</li><li>ຂັ້ນ 1 · Functional Decomposition & Catalog — ຈັດເຮັດແລ້ວ</li><li>ຂັ້ນ 2 · Logical Data Model & ERD — ຈັດເຮັດແລ້ວ</li><li>ຂັ້ນ 3 · Workflow/Sequence — ຈັດເຮັດແລ້ວ</li><li>ຂັ້ນ 4 · Function Specification & Algorithm — ຈັດເຮັດແລ້ວ</li><li>ຂັ້ນ 5 · State Transition & Error Handling — ຈັດເຮັດແລ້ວ</li><li>ຂັ້ນ 6 · Traceability Matrix — ຍັງຕ້ອງເຮັດ</li><li>ຂັ້ນ 7 · Developer Handoff — ຍັງຕ້ອງເຮັດ</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/prd`}><small>← ເອກະສານຕົ້ນທາງ</small><strong>Product Requirements Document</strong></a>
        <a href={`${basePath}/documents/mvp-scope`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>MVP Scope & Prioritization</strong></a>
      </nav>
    </article>
  );
}
