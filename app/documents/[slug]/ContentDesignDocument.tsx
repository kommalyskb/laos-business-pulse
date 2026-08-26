import styles from "../documents.module.css";

type MatrixSection = {
  title: string;
  intro: string;
  headers: string[];
  rows: string[][];
  note?: string;
};

type Wireframe = { title: string; screen: string; blocks: string[] };

type DocumentSpec = {
  code: string;
  title: string;
  english: string;
  owner: string;
  sources: string[];
  purpose: string[];
  sections: MatrixSection[];
  review: string[];
  wireframes?: Wireframe[];
};

const specs: Record<string, DocumentSpec> = {
  "content-taxonomy": {
    code: "CON-01", title: "ມາດຕະຖານການຈັດໝວດ", english: "Content Taxonomy", owner: "Content Lead / System Analyst",
    sources: ["PRO-01 1.0", "PRO-02 1.0", "PRO-03 1.0", "PRO-04 0.1"],
    purpose: [
      "ເອກະສານນີ້ກຳນົດພາສາກາງສຳລັບຈັດໝວດ Place, Content Source ແລະ Search Filter. ຈຸດປະສົງແມ່ນໃຫ້ Content Team, Developer, Designer ແລະຜູ້ໃຊ້ເຂົ້າໃຈຄຳດຽວກັນ ແລະບໍ່ສ້າງ Tag ຊ້ຳຊ້ອນ.",
      "Pilot ຈຳກັດ Primary Category ເປັນ Restaurant ແລະ Café. Attraction, Accommodation ແລະ Service ຖືກກຳນົດໄວ້ໃນ Model ເພື່ອບໍ່ຕ້ອງຮື້ໂຄງສ້າງພາຍຫຼັງ ແຕ່ຍັງບໍ່ເປີດໃຊ້ໃນ Pilot."
    ],
    sections: [
      { title: "ໂຄງສ້າງການຈັດໝວດ", intro: "Taxonomy ແບ່ງເປັນ 4 ຊັ້ນ. ຊັ້ນເທິງຕ້ອງຄົງທີ່; ຊັ້ນລຸ່ມສາມາດຂະຫຍາຍຕາມຫຼັກຖານ.", headers: ["ຊັ້ນ", "ຈຸດປະສົງ", "ຕົວຢ່າງ", "ກົດ"], rows: [
        ["Primary Category", "ກຳນົດປະເພດ Place ຫຼັກ", "Restaurant, Café", "ໜຶ່ງ Place ມີ Primary Category ໜຶ່ງອັນພໍດີ"],
        ["Subcategory", "ອະທິບາຍຮູບແບບຮ້ານ", "Noodle shop, Bakery, Specialty coffee", "ເລືອກໄດ້ 1–3; ຕ້ອງມີ Canonical ID"],
        ["Attribute", "ຂໍ້ເທັດຈິງທີ່ໃຊ້ກອງ", "District, Price, Cuisine, Setting", "ຕ້ອງມີຄ່າທີ່ຄວບຄຸມ; ຫ້າມ Free-text ສຳລັບ Filter"],
        ["Editorial Tag", "ບໍລິບົດຊ່ວຍຄົ້ນພົບ", "Good for groups, Riverside, Late night", "ຕ້ອງມີ Evidence; ບໍ່ນຳໃຊ້ແທນຂໍ້ເທັດຈິງ"]
      ]},
      { title: "Attribute ແລະ Filter ສຳລັບ Pilot", intro: "Filter ຕ້ອງອີງຂໍ້ມູນທີ່ທີມຮັກສາໄດ້. ຖ້າ Field ບໍ່ຄົບພໍ ຫ້າມເປີດ Filter ໃຫ້ຜູ້ໃຊ້.", headers: ["Attribute", "ຄ່າທີ່ອະນຸຍາດ", "MVP UI", "ຄຸນນະພາບຂັ້ນຕ່ຳ"], rows: [
        ["District", "Canonical district IDs ຂອງວຽງຈັນ", "Filter ແບບເລືອກໜຶ່ງ/ຫຼາຍ", "≥90% ຂອງ Published Places ມີຄ່າ"],
        ["Price band", "₭ · ₭₭ · ₭₭₭ · Unknown", "Filter + label", "ຫ້າມຄາດເດົາ; Unknown ຕ້ອງສະແດງ"],
        ["Cuisine / Product", "Lao, Thai, Vietnamese, Chinese, Western, Bakery, Coffee, Other", "Multi-select", "ອີງເມນູ ຫຼື Source ທີ່ກວດໄດ້"],
        ["Setting", "Indoor, Outdoor, Riverside, Garden, Takeaway", "Tag/Filter ພາຍຫຼັງ", "ໃຊ້ສະເພາະຄ່າທີ່ຢືນຢັນ"],
        ["Open now", "ຄຳນວນຈາກ Hours + timezone", "Later", "ຫ້າມເປີດຈົນກວ່າ Hours freshness ຜ່ານ"]
      ]},
      { title: "ຄຳຄົ້ນຫາ ແລະ Synonym", intro: "Search Vocabulary ຊ່ວຍໃຫ້ຄຳລາວ, ອັງກິດ, ການສະກົດຕ່າງກັນ ແລະຊື່ຫຍໍ້ຊີ້ໄປຫາ Canonical Term ດຽວ.", headers: ["ປະເພດຄຳ", "ຕົວຢ່າງ", "ການປະມວນຜົນ", "ການຄວບຄຸມ"], rows: [
        ["Canonical", "ຮ້ານກາເຟ / Café", "ເກັບເປັນ term ID ດຽວ", "Content Lead ອະນຸມັດ"],
        ["Synonym", "ຄາເຟ, coffee shop", "ແປໄປ Canonical ID", "ບັນທຶກທີ່ມາ ແລະວັນທີ"],
        ["Transliteration / typo", "Vientiane/Viengchan; ກາເຟ/ຄາເຟ", "Normalize ແຕ່ບໍ່ປ່ຽນຂໍ້ຄວາມຕົ້ນສະບັບ", "ອັບເດດຈາກ zero-result query"],
        ["Blocked term", "ຄຳທີ່ຫຼອກ, ດູຖູກ ຫຼືບໍ່ກ່ຽວ", "ບໍ່ເປັນ Public Tag", "ຕ້ອງມີ moderation reason"]
      ]},
      { title: "Governance ແລະ Change Control", intro: "Taxonomy ທີ່ບໍ່ມີ owner ຈະເກີດ Tag ຊ້ຳ ແລະ Filter ທີ່ບໍ່ມີຂໍ້ມູນ.", headers: ["ຂັ້ນຕອນ", "ຜູ້ຮັບຜິດຊອບ", "ຫຼັກຖານ", "ຜົນສົ່ງມອບ"], rows: [
        ["ສະເໜີ Term", "Content/Admin", "Search log, user request ຫຼື inventory gap", "Change request"],
        ["ກວດຊ້ຳ/ຜົນກະທົບ", "Content Lead + SA", "Existing term, data migration, UI/API impact", "Approve / merge / reject"],
        ["ປ່ອຍ Version", "Product Owner", "Updated dictionary + migration rule", "Taxonomy version"],
        ["ທົບທວນ", "Content Lead", "Zero-result, unused term, low coverage", "Monthly during Pilot"]
      ]}
    ],
    review: ["ອະນຸມັດ Primary Category ຂອງ Pilot ເປັນ Restaurant ແລະ Café ຫຼືບໍ່?", "ອະນຸມັດ Price Band 3 ລະດັບ + Unknown ຫຼືຕ້ອງການຈຳນວນເງິນ?", "District ແລະ Cuisine ໃດຕ້ອງມີກ່ອນ 30 Places ທຳອິດ?", "ໃຜເປັນ Taxonomy Owner ແລະຜູ້ອະນຸມັດ Term?", "ຈະໃຊ້ coverage threshold 90% ກ່ອນເປີດ Public Filter ຫຼືປັບເປັນເທົ່າໃດ?"]
  },

  "place-data-standard": {
    code: "CON-02", title: "ມາດຕະຖານຂໍ້ມູນສະຖານທີ່", english: "Place Data Standard", owner: "Data Steward / Content Lead",
    sources: ["CON-01 0.1", "PRO-02 Entity Model", "PRO-03 MVP-001/004/008", "PRO-04 0.1"],
    purpose: ["ກຳນົດ Field Dictionary, Source Evidence, Verification State, Freshness ແລະ Correction Rule ສຳລັບ Place Record. ເປົ້າໝາຍແມ່ນໃຫ້ Public Place Page ບອກຂໍ້ມູນທີ່ຮູ້, ສິ່ງທີ່ຍັງບໍ່ຮູ້ ແລະວັນທີກວດຄັ້ງລ່າສຸດຢ່າງຊັດເຈນ.", "ມາດຕະຖານນີ້ບັງຄັບກັບ Place ທຸກອັນກ່ອນ Publish. ການຈ່າຍຄ່າ Founding Partner ບໍ່ຫຼຸດຂໍ້ກຳນົດ Data Quality ແລະບໍ່ຊື້ປ້າຍ Verified."],
    sections: [
      { title: "Field Dictionary ແລະ Publish Readiness", intro: "Required Field ຕ້ອງຄົບກ່ອນ Publish; Conditional Field ຕ້ອງຄົບເມື່ອມີສະພາບທີ່ກຳນົດ.", headers: ["Field", "ລະດັບ", "ກົດຂໍ້ມູນ", "Public behavior"], rows: [
        ["place_id / slug", "Required", "Unique, immutable ID; canonical URL", "ບໍ່ປ່ຽນເມື່ອແກ້ຊື່"],
        ["name_lao / display_name", "Required", "ຊື່ທາງການ ຫຼືຊື່ທີ່ຮ້ານໃຊ້", "ສະແດງເປັນຫົວຂໍ້"],
        ["primary_category", "Required", "Canonical ID ຈາກ CON-01", "ສະແດງ ແລະໃຊ້ Filter"],
        ["address + district", "Required", "ທີ່ຢູ່ອ່ານໄດ້ + District ID", "ສະແດງທີ່ຢູ່"],
        ["latitude / longitude", "Required", "ພິກັດຕ້ອງກວດກັບ Place", "ເປີດ Map Action"],
        ["phone / message_url", "Required: ຢ່າງໜຶ່ງ", "Normalize ແຕ່ຮັກສາ raw value", "ສະແດງ Action ທີ່ມີ"],
        ["opening_hours", "Conditional", "Structured weekly hours + exception", "Unknown ເມື່ອບໍ່ຢືນຢັນ"],
        ["price_band", "Conditional", "₭/₭₭/₭₭₭/Unknown", "ຫ້າມເດົາ"],
        ["source + checked_at", "Required", "ຢ່າງໜ້ອຍ 1 source ແລະວັນກວດ", "ສະແດງ Checked Date/Trust label"]
      ]},
      { title: "Source Evidence ແລະ Confidence", intro: "ທຸກ Field ສຳຄັນຕ້ອງຕາມກັບຫາ Source ໄດ້. Confidence ບອກຄຸນນະພາບຂອງຫຼັກຖານ ບໍ່ແມ່ນຄະແນນຮ້ານ.", headers: ["Source class", "ຕົວຢ່າງ", "Confidence", "ການນຳໃຊ້"], rows: [
        ["Owner-confirmed", "ຮ້ານຢືນຢັນຜ່ານຊ່ອງທາງທີ່ກວດໄດ້", "ສູງ", "Contact, Hours, Address"],
        ["Official public source", "Official Page, official map listing", "ສູງ/ກາງ", "Name, location, contact"],
        ["Independent creator source", "Review link ທີ່ລະບຸ Place ຊັດ", "ກາງ", "Context, product, setting; ບໍ່ໃຊ້ຢືນຢັນ Hours ຢ່າງດຽວ"],
        ["Unverified submission", "User/owner request ທີ່ຍັງບໍ່ມີ evidence", "ຕ່ຳ", "ເຂົ້າ review queue; ຫ້າມ auto-publish"]
      ]},
      { title: "Verification, Freshness ແລະ State", intro: "Checked Date ບໍ່ໝາຍຄວາມວ່າຂໍ້ມູນຈະຖືກຕະຫຼອດ. ມັນບອກວ່າກວດຫຍັງ, ເມື່ອໃດ ແລະຈາກ Source ໃດ.", headers: ["State", "ເຂົ້າ State ເມື່ອ", "Public behavior", "ການອອກຈາກ State"], rows: [
        ["Draft", "Record ຍັງບໍ່ຄົບ", "ບໍ່ Public", "Required fields + source ຄົບ"],
        ["Ready for review", "Validation ຜ່ານ", "ບໍ່ Public", "Reviewer approve/reject"],
        ["Published", "Reviewer ອະນຸມັດ", "Public + Checked Date", "Correction, stale, suspend, archive"],
        ["Stale", "Field ເກີນ cadence ຫຼື source conflict", "ສະແດງຄຳເຕືອນ/Unknown", "Re-verify"],
        ["Suspended", "ສົງໄສຂໍ້ມູນ/rights/safety", "ຖອນອອກຊົ່ວຄາວ", "Resolve + review"],
        ["Archived", "ປິດຖາວອນ/merged", "Redirect ຫຼື unavailable", "ບໍ່ restore ໂດຍບໍ່ມີ decision"]
      ], note: "ຄ່າ Freshness cadence ເລີ່ມຕົ້ນສຳລັບ Pilot: Contact/Hours 30 ວັນ; Address/Map 90 ວັນ; Category 180 ວັນ. ຕົວເລກນີ້ເປັນ Operational Hypothesis ແລະຕ້ອງທົບທວນຈາກຂໍ້ມູນຈິງ."},
      { title: "Correction, Duplicate ແລະ Audit", intro: "ການແກ້ຂໍ້ມູນຕ້ອງຮັກສາຄ່າເກົ່າ, ຫຼັກຖານ, actor ແລະ reason.", headers: ["Process", "ຂັ້ນຕອນ", "ກົດຄວາມປອດໄພ", "Evidence"], rows: [
        ["Correction", "Receive → triage → verify item → approve/reject → publish", "ອະນຸມັດແຍກແຕ່ລະ Field; ຫ້າມທັບ Record ທັງໝົດ", "Request, source, before/after, actor"],
        ["Duplicate", "Detect → compare → confirm same place/branch → merge", "ຫ້າມ merge ພຽງເພາະຊື່ຄ້າຍ", "Match signals + decision"],
        ["Conflict", "Keep current → mark disputed → collect evidence → review", "ຫ້າມເລືອກ source ເພາະຜູ້ຈ່າຍ", "Conflict record"],
        ["Rollback", "Restore previous accepted version", "ຕ້ອງບັນທຶກ reason ແລະ actor", "Audit log + version ID"]
      ]}
    ],
    review: ["Required Field ທີ່ລະບຸຄົບພໍສຳລັບ Pilot ຫຼືບໍ່?", "ອະນຸມັດ Source Confidence 4 ລະດັບ ຫຼືຕ້ອງການ Score?", "ອະນຸມັດ Freshness cadence 30/90/180 ວັນເປັນຄ່າທົດສອບຫຼືບໍ່?", "ໃຜເປັນ Data Steward ແລະ Reviewer ສຸດທ້າຍ?", "Public UI ຈະສະແດງ Unknown/Stale/Verified label ດ້ວຍຄຳໃດ?"]
  },

  "content-acquisition": {
    code: "CON-03", title: "ແຜນຫາ Content ໄລຍະທຳອິດ", english: "Content Acquisition Plan", owner: "Content Lead / Founder",
    sources: ["BUS-04 Pilot Plan", "PRO-03 DEC-01/02/04", "CON-01 0.1", "CON-02 0.1"],
    purpose: ["ກຳນົດວິທີສ້າງ Supply ຈາກ 0 ໄປ 100 Places ໂດຍບໍ່ Copy ຫຼື Re-host ວິດີໂອ. ແຜນລວມ Place Inventory, Review Link, Creator Attribution, Owner Confirmation ແລະຕົ້ນທຶນການດຳເນີນງານ.", "Cold start ຕ້ອງພິສູດວ່າທີມສາມາດສ້າງ ແລະຮັກສາ Content ໄດ້ດ້ວຍກຳລັງຄົນຈິງ. ຫ້າມໃຊ້ຈຳນວນ Link ເປັນຄຸນນະພາບໂດຍບໍ່ກວດ Place Data ແລະ Rights."],
    sections: [
      { title: "Cold-start Inventory 30 → 60 → 100", intro: "ແຕ່ລະຂັ້ນມີຈຸດປະສົງຮຽນຮູ້ຕ່າງກັນ. ຫ້າມຂ້າມ Gate ເພາະຕ້ອງການຕົວເລກ 100 ໄວ.", headers: ["Stage", "ເປົ້າໝາຍ", "ສິ່ງທີ່ຕ້ອງພິສູດ", "Gate"], rows: [
        ["30 Places", "Restaurant/Café ໃນ 2–3 ເຂດ", "Field workflow, source linking, publish review, time-per-place", "≥90% required field; no unresolved rights issue"],
        ["60 Places", "ເພີ່ມຄວາມຫຼາກຫຼາຍ price/cuisine", "Search/filter usefulness, duplicate handling, correction volume", "Core search + place journey tested"],
        ["100 Places", "Inventory ພໍສຳລັບ Validation Pilot", "Freshness workload, owner response, creator/source coverage", "Release Gate G2/G3 evidence"]
      ]},
      { title: "Source Discovery ແລະ Selection", intro: "TikTok/Facebook ເປັນ Source ຫຼັກ; YouTube ເປັນ Source ເສີມ. Platform ເກັບ URL, attribution ແລະ metadata ທີ່ອະນຸຍາດເທົ່ານັ້ນ.", headers: ["ຂັ້ນ", "ການກວດ", "ຜ່ານເມື່ອ", "ບໍ່ຜ່ານເມື່ອ"], rows: [
        ["Discover", "ຊອກດ້ວຍ place/name/area/food term", "ພົບ original public source", "Repost ບໍ່ຮູ້ຕົ້ນສະບັບ"],
        ["Match", "ຊື່, ພິກັດ, ພາບ/ບໍລິບົດ", "ຊີ້ Place ດຽວຢ່າງໝັ້ນໃຈ", "ສາຂາບໍ່ຊັດ"],
        ["Rights/availability", "public URL, official embed, creator attribution", "ມີ link/fallback ແລະ takedown path", "ຕ້ອງ download/copy ຈຶ່ງໃຊ້ໄດ້"],
        ["Quality", "ເນື້ອຫາກ່ຽວ, ບໍ່ຫຼອກ, ບໍ່ຂັດ policy", "ຊ່ວຍຕັດສິນໃຈ", "ມີອັນຕະລາຍ/ຄວາມຜິດຊັດ"]
      ]},
      { title: "Creator ແລະ Place-owner Outreach", intro: "Pilot ບໍ່ບັງຄັບໃຫ້ Creator ຫຼືຮ້ານສ້າງ Account. Outreach ມຸ່ງຢືນຢັນ attribution, data ແລະ willingness to participate.", headers: ["Audience", "Offer", "Call to action", "ສິ່ງທີ່ຫ້າມສັນຍາ"], rows: [
        ["Creator", "Attribution + link back + correction/takedown channel", "ຢືນຢັນ creator identity/source link; opt out ຫຼືຮ່ວມ", "ບໍ່ສັນຍາ reach/revenue"],
        ["Place owner", "Free listing verification; Founding Partner ເປັນທາງເລືອກ", "ຢືນຢັນ data; ທົດສອບ 200,000 ກີບ/ເດືອນ", "ການຈ່າຍບໍ່ຊື້ review score/verification"],
        ["Reviewer/user", "ຊ່ອງທາງແຈ້ງຂໍ້ມູນຜິດ", "ສົ່ງ evidence", "ບໍ່ publish ອັດຕະໂນມັດ"]
      ]},
      { title: "Supply Metrics ແລະ Workload", intro: "ທີມຕ້ອງວັດທັງ output, quality, rights ແລະ operation cost.", headers: ["Metric", "ສູດ/ວິທີນັບ", "ເປົ້າ Pilot", "ໃຊ້ຕັດສິນ"], rows: [
        ["Publish-ready rate", "Published records ÷ reviewed records", "≥80% ຫຼັງ 30 Places", "ຄຸນນະພາບ source process"],
        ["Required-field completeness", "required fields present ÷ required fields", "≥90%; critical fields 100%", "Pilot readiness"],
        ["Source coverage", "Places ມີ active review source ÷ Published Places", "≥80%", "Feed usefulness"],
        ["Time per place", "total curation/review minutes ÷ accepted places", "ບັນທຶກ baseline; ບໍ່ຟັນທົງກ່ອນ 30", "Staffing/automation"],
        ["Manual workload", "hours ທັງໝົດຕໍ່ອາທິດ", "ທົບທວນເມື່ອ >20h/week 2 ອາທິດ", "ຢຸດຂະຫຍາຍ/automate"]
      ]}
    ],
    review: ["ເລືອກ 2–3 ເຂດໃດສຳລັບ 30 Places ທຳອິດ?", "ສັດສ່ວນ Restaurant:Café ຈະເປັນ 60:40 ຫຼືແບບໃດ?", "ໃຜຮັບຜິດຊອບ curation, review ແລະ owner outreach?", "Creator outreach ຈະເລີ່ມກ່ອນ ຫຼືຫຼັງ 30 Places?", "ອະນຸມັດ Supply target ແລະ workload threshold ທີ່ລະບຸຫຼືບໍ່?"]
  },

  "creator-moderation": {
    code: "CON-04", title: "Creator ແລະ Content Moderation", english: "Creator & Moderation Guideline", owner: "Trust & Safety Owner",
    sources: ["CON-03 0.1", "PRO-02 Trust Workflows", "PRO-03 MVP-011/013", "PRO-04 TRU-01"],
    purpose: ["ກຳນົດມາດຕະຖານ Creator Attribution, Content Eligibility, Report, Takedown ແລະ Appeal. Platform ເປັນຜູ້ຈັດລະບຽບ link ແລະຂໍ້ມູນ Place; ບໍ່ໄດ້ເປັນເຈົ້າຂອງວິດີໂອຈາກ Social Platform.", "Moderation ຕ້ອງແຍກລະຫວ່າງ Content ບໍ່ເໝາະສົມ, Source unavailable, Rights complaint, Place data conflict ແລະ Sponsored disclosure. ແຕ່ລະປະເພດມີ workflow ຕ່າງກັນ."],
    sections: [
      { title: "Creator Identity ແລະ Attribution", intro: "Attribution ຕ້ອງຊີ້ໄປຫາ Original Source ແລະບໍ່ສ້າງຄວາມເຂົ້າໃຈວ່າ Creator ຮັບຮອງ Platform.", headers: ["Field/Element", "Required", "ກົດ", "Fallback"], rows: [
        ["Creator display name", "Yes", "ອ່ານຈາກ public source ຫຼື creator-confirmed", "ສະແດງ source platform ເມື່ອ name ບໍ່ມີ"],
        ["Original URL", "Yes", "ຕ້ອງຊີ້ content ຕົ້ນສະບັບ", "ຖອນ source ເມື່ອບໍ່ຮູ້ຕົ້ນສະບັບ"],
        ["Platform label", "Yes", "TikTok/Facebook/YouTube", "ຫ້າມໃຊ້ generic video label"],
        ["Commercial disclosure", "Conditional", "Sponsored/Paid partnership ຕ້ອງຮັກສາປ້າຍ", "ຢຸດ publish ເມື່ອບໍ່ຊັດ"]
      ]},
      { title: "Content Eligibility ແລະ Moderation Reasons", intro: "Content ທີ່ຜ່ານຕ້ອງກ່ຽວກັບ Place, ຊີ້ Place/ສາຂາໄດ້ ແລະມີ Source ທີ່ເປີດເບິ່ງໄດ້.", headers: ["Reason code", "ຄວາມໝາຍ", "ການດຳເນີນການ", "Public result"], rows: [
        ["MOD-IRRELEVANT", "ບໍ່ກ່ຽວກັບ Place/decision", "Reject/Unlink", "ບໍ່ສະແດງ"],
        ["MOD-MISMATCH", "ຜູກຜິດ Place ຫຼືສາຂາ", "Suspend + rematch", "Fallback ໄປ Place ໂດຍບໍ່ມີ source"],
        ["MOD-DECEPTIVE", "ຫຼອກລວງ/ປອມແປງຊັດເຈນ", "Remove + audit", "ບໍ່ສະແດງ"],
        ["MOD-RIGHTS", "Rights holder ແຈ້ງຖອນ", "Immediate public removal + case review", "ບໍ່ສະແດງລະຫວ່າງກວດ"],
        ["MOD-UNAVAILABLE", "Source ລົ້ມ/ລົບ/ຈຳກັດ", "Fallback + retry; confirm before permanent unlink", "Place ຍັງຢູ່"],
        ["MOD-UNSAFE", "ເນື້ອຫາສ່ຽງອັນຕະລາຍ/ລະເມີດຮ້າຍແຮງ", "Remove + escalate", "ບໍ່ສະແດງ"]
      ]},
      { title: "Report, Review ແລະ Takedown", intro: "Report ຕ້ອງເຂົ້າ Case Queue ດຽວ, ມີ owner, priority, evidence ແລະ audit trail.", headers: ["Priority", "ຕົວຢ່າງ", "Initial action", "Pilot target"], rows: [
        ["P0", "Rights takedown, serious safety/privacy", "ຖອນ public source ທັນທີ + notify owner", "ຮັບຮູ້ພາຍໃນ 4 ຊົ່ວໂມງທຳການ"],
        ["P1", "Wrong place, deceptive content, active conflict", "Suspend + investigate", "1 ວັນທຳການ"],
        ["P2", "Attribution/name correction", "Queue by age", "3 ວັນທຳການ"],
        ["P3", "Suggestion/non-blocking quality", "Backlog", "7 ວັນທຳການ"]
      ], note: "SLA ນີ້ເປັນ Pilot operating target ບໍ່ແມ່ນຄຳຮັບປະກັນທາງກົດໝາຍ; ຕ້ອງປັບຕາມຈຳນວນຄົນແລະການທົບທວນກົດໝາຍ."},
      { title: "Appeal, Conflict of Interest ແລະ Audit", intro: "ຜູ້ແຈ້ງ, Creator ແລະ Place Owner ຕ້ອງມີທາງສົ່ງຫຼັກຖານເພີ່ມ. Reviewer ຄົນເກົ່າບໍ່ຄວນຕັດສິນ Appeal ຂອງຕົນເອງ.", headers: ["ຂັ້ນ", "ກົດ", "ຜູ້ຕັດສິນ", "ບັນທຶກ"], rows: [
        ["Submit appeal", "ອ້າງ case ID + new evidence", "Requester", "Timestamp + evidence"],
        ["Eligibility check", "ບໍ່ຮັບ duplicate ທີ່ບໍ່ມີຂໍ້ມູນໃໝ່", "Trust operator", "Accept/reject reason"],
        ["Independent review", "Reviewer ບໍ່ແມ່ນຜູ້ຕັດສິນຄັ້ງທຳອິດ", "Trust owner/Product Owner", "Decision + policy reference"],
        ["Restore/confirm removal", "ປ່ຽນ state ແບບ auditable", "Authorized admin", "Before/after + actor"]
      ]}
    ],
    review: ["ໃຜເປັນ Trust & Safety Owner ໃນ Pilot?", "Reason Codes ຄົບກັບຄວາມສ່ຽງຫຼັກຫຼືບໍ່?", "ອະນຸມັດ P0–P3 operating target ຫຼືຕ້ອງປັບຕາມກຳລັງຄົນ?", "ຊ່ອງທາງ report/takedown ທຳອິດຈະໃຊ້ Email, Form ຫຼື Messaging?", "ໃຜເປັນ independent appeal reviewer ເມື່ອທີມຍັງນ້ອຍ?"]
  },

  "legal-disclosure": {
    code: "CON-05", title: "ລິຂະສິດ ແລະການເປີດເຜີຍ", english: "Copyright & Sponsored Disclosure", owner: "Product Owner / Legal Reviewer",
    sources: ["PRO-03 DEC-02/03", "CON-03 0.1", "CON-04 0.1", "BUS-06 Revenue Model"],
    purpose: ["ກຳນົດ Product Policy ສຳລັບ Linking, Official Embed, Attribution, Takedown, Sponsored Placement ແລະ User Consent. ເອກະສານນີ້ກຳນົດພຶດຕິກຳຂອງ Platform ແຕ່ບໍ່ແທນຄຳແນະນຳທາງກົດໝາຍ.", "ກ່ອນ Public MVP ຕ້ອງໃຫ້ທີ່ປຶກສາກົດໝາຍທີ່ມີອຳນາດໃນລາວກວດ Terms, Privacy Notice, consent, takedown ແລະ commercial disclosure ສະບັບສຸດທ້າຍ."],
    sections: [
      { title: "Linking, Embedding ແລະ Attribution Policy", intro: "Platform ຕ້ອງຊີ້ກັບຫາ Original Source ແລະຫ້າມເກັບສຳເນົາວິດີໂອໂດຍບໍ່ມີສິດ.", headers: ["ການກະທຳ", "ສະຖານະ", "ເງື່ອນໄຂ", "Fallback"], rows: [
        ["Redirect to original URL", "Allowed by product policy", "Public URL + attribution + source platform", "ສະແດງ Place ໂດຍບໍ່ມີ source ເມື່ອ link unavailable"],
        ["Official embed", "Allowed conditionally", "ໃຊ້ກົນໄກ official provider; ບໍ່ຂ້າມ access control", "Preview + open original"],
        ["Store permitted metadata", "Limited", "ເກັບສະເພາະ metadata ທີ່ຈຳເປັນ ແລະອະນຸຍາດ", "Manual title/attribution ຈາກ approved source"],
        ["Download/re-host/transcode", "Prohibited by MVP policy", "ຍົກເວັ້ນມີ written license ແລະ approval ໃໝ່", "Link/embed only"],
        ["Scraping beyond permission", "Prohibited", "ຫ້າມ bypass restriction/rate limit", "Manual curation"]
      ]},
      { title: "Takedown ແລະ Rights Complaint", intro: "Rights complaint ຕ້ອງມີຊ່ອງທາງຊັດເຈນ, ຖອນ public exposure ໄດ້ໄວ ແລະຮັກສາ case evidence.", headers: ["ຂັ້ນ", "ຂໍ້ມູນທີ່ຕ້ອງຮັບ", "Platform action", "ຜົນ"], rows: [
        ["Receive", "Contact, URL, rights claim, evidence, declaration", "Create case + acknowledge", "Case ID"],
        ["Protect", "ກວດວ່າ source ໃດຖືກແຈ້ງ", "Remove/suspend public source ທັນທີເມື່ອຄວາມສ່ຽງສູງ", "Place record ບໍ່ຖືກລົບອັດຕະໂນມັດ"],
        ["Review", "Identity/authority, URL match, counter evidence", "Approve removal / request more / restore", "Reasoned decision"],
        ["Close", "Final decision + notification", "Update state/audit", "Retention per approved policy"]
      ]},
      { title: "Sponsored ແລະ Commercial Disclosure", intro: "ຜູ້ໃຊ້ຕ້ອງແຍກ Organic Source, Founding Partner ແລະ Sponsored Placement ອອກຈາກກັນໄດ້ໃນທັນທີ.", headers: ["Label", "ໝາຍເຖິງ", "ບໍ່ໝາຍເຖິງ", "UI rule"], rows: [
        ["Source linked", "ມີ review source ຕົ້ນສະບັບ", "Platform ບໍ່ຮັບຮອງຄວາມເຫັນ", "ສະແດງ creator + platform + link"],
        ["Place information verified", "Field ສຳຄັນຖືກກວດຕາມ CON-02", "ບໍ່ແມ່ນຄະແນນ/ຄຳຮັບປະກັນ", "ສະແດງ Checked Date"],
        ["Founding Partner", "ຮ້ານຮ່ວມ Pilot ແລະຈ່າຍ package", "ບໍ່ຊື້ ranking, review score ຫຼື verification", "ປ້າຍ Partner ແຍກຈາກ Sponsored"],
        ["Sponsored", "ຮ້ານຈ່າຍເພື່ອ placement ໃນຊ່ວງກຳນົດ", "ບໍ່ແມ່ນ organic ranking", "ປ້າຍ “Sponsored/ໂຄສະນາ” ຢູ່ໃກ້ title/action; ຫ້າມເຊື່ອງ"]
      ]},
      { title: "Consent, Analytics ແລະ Data Boundary", intro: "MVP ໃຊ້ Guest-first ແລະ Anonymous Session. ຕ້ອງເກັບຂໍ້ມູນເທົ່າທີ່ຈຳເປັນຕໍ່ essential operation ແລະ approved analytics.", headers: ["Data/Action", "Purpose", "Consent/notice", "ຂໍ້ຈຳກັດ"], rows: [
        ["Essential session", "Security, state, rate limiting", "Privacy notice", "ບໍ່ໃຊ້ marketing profile"],
        ["Analytics event", "Feed → Place → Intent funnel", "Consent choice ຕາມ approved policy", "Pseudonymous ID; dedupe; limited retention"],
        ["Map/Call/Message click", "Decision Intent", "ອະທິບາຍວ່າ click ບໍ່ເທົ່າ visit/sale", "ຫ້າມລາຍງານເກີນຫຼັກຖານ"],
        ["Correction/takedown contact", "Resolve request", "Form notice", "Access limited; retention decision required"]
      ]}
    ],
    review: ["ຕົກລົງວ່າ CON-05 ເປັນ Product Policy ທີ່ຕ້ອງຜ່ານ Legal Review ກ່ອນ Public MVP ຫຼືບໍ່?", "Official Embed ຂອງ provider ໃດຈະອະນຸຍາດໃນ Pilot?", "Rights complaint ຈະຮັບຜ່ານຊ່ອງທາງໃດ ແລະໃຜເປັນ owner?", "ອະນຸມັດຄຳລາວສຳລັບ Partner, Sponsored ແລະ Verified label ຫຼືບໍ່?", "ຈະກຳນົດ analytics consent ແລະ data retention ໃນ TEC-06/Legal Review ກ່ອນ PRO-04 1.0 ຫຼືບໍ່?"]
  },

  "information-user-flow": {
    code: "UX-01", title: "ໂຄງສ້າງຂໍ້ມູນ ແລະ User Flow", english: "Information Architecture & User Flow", owner: "Product Designer / System Analyst",
    sources: ["PRO-01 1.0", "PRO-02 Workflows", "PRO-03 1.0", "CON-01/02 0.1"],
    purpose: ["ກຳນົດວ່າຜູ້ໃຊ້ພົບຂໍ້ມູນຢູ່ໃສ, ເຄື່ອນຈາກ Discover → Decide → Act ແນວໃດ ແລະລະບົບຕ້ອງຮັກສາ Context ແນວໃດເມື່ອເກີດ Empty, Error ຫຼື External Link fallback.", "MVP ໃຊ້ Guest-first navigation: ຜູ້ໃຊ້ເປີດ Feed, Search ແລະ Place Page ໄດ້ໂດຍບໍ່ສະໝັກ Account. Admin navigation ແຍກຈາກ Public experience ແລະຕ້ອງມີ authentication."],
    sections: [
      { title: "Navigation Model", intro: "Mobile ໃຊ້ bottom navigation ສຳລັບ 3 destination ຫຼັກ; Desktop ໃຊ້ top/side navigation ແຕ່ຮັກສາຊື່ ແລະລຳດັບດຽວກັນ.", headers: ["Destination", "ຈຸດປະສົງ", "Entry", "ການຮັກສາ Context"], rows: [
        ["Discover", "Full-screen video-first feed", "Default home/deep link", "ຈື່ feed position ເມື່ອກັບຈາກ Place"],
        ["Search", "ຄົ້ນດ້ວຍ query/filter", "Navigation/search affordance", "ຈື່ query, filter, result position"],
        ["Saved", "Local-device shortlist", "Bottom nav/place action", "No account; ອະທິບາຍ device-local"],
        ["Place", "Canonical decision page", "Feed/Search/Saved/deep link", "Back ກັບ entry context"],
        ["Admin", "Manage data/source/case", "Protected URL", "ແຍກ session ແລະ authorization"]
      ]},
      { title: "Primary Guest Journeys", intro: "ທຸກ Journey ຈົບທີ່ການຕັດສິນໃຈ ຫຼືການກັບໄປຄົ້ນຕໍ່; ບໍ່ມີ Booking/Payment.", headers: ["Journey", "Flow", "Success", "Analytics boundary"], rows: [
        ["J-01 Discover", "Feed → select video/place → Place → Map/Call/Message", "Action ເປີດປາຍທາງຖືກ", "Intent click ບໍ່ເທົ່າ visit/sale"],
        ["J-02 Search", "Search → query/filter → results → Place → action", "ພົບ Place ຫຼືເຫັນ Empty guidance", "Track query category; protect personal text"],
        ["J-03 Source", "Feed/Place → creator/source → external original", "ກັບຫາ original source ໄດ້", "External open only"],
        ["J-04 Correction", "Place → report correction → external/form → confirmation", "Case/reference received", "No auto-publish"],
        ["J-05 Save/share", "Place → local save/share canonical URL", "ກັບເປີດ Place ໄດ້", "Should scope"]
      ]},
      { title: "Screen Inventory ແລະ Route Contract", intro: "Screen ID ເປັນຕົວອ້າງອີງລະຫວ່າງ UX, Requirement, API ແລະ Test.", headers: ["Screen ID", "Screen", "Route/entry", "ຂໍ້ມູນຫຼັກ"], rows: [
        ["SCR-G01", "Discovery Feed", "/ or /discover", "video/source/place preview/actions"],
        ["SCR-G02", "Search", "/search", "query, filters, result list, empty state"],
        ["SCR-G03", "Place Detail", "/places/:slug", "canonical place, sources, trust, map/contact"],
        ["SCR-G04", "Saved", "/saved", "device-local saved places"],
        ["SCR-G05", "Consent/Privacy", "entry banner + settings", "essential/analytics choice"],
        ["SCR-A01", "Admin queue", "/admin", "draft/review/correction/takedown queues"],
        ["SCR-A02", "Place editor", "/admin/places/:id", "fields, sources, readiness, audit"],
        ["SCR-A03", "Case detail", "/admin/cases/:id", "report/evidence/decision/history"]
      ]},
      { title: "Edge Cases ແລະ Recovery", intro: "Error state ຕ້ອງຮັກສາທາງໄປຕໍ່. ຫ້າມໃຫ້ external media failure ປິດກັ້ນ Place information.", headers: ["Case", "System response", "Primary action", "ຫ້າມ"], rows: [
        ["Video/embed fail", "ສະແດງ poster/source fallback + place summary", "Open original / View place", "Blank full screen"],
        ["No search result", "ບອກ filter/query ທີ່ໃຊ້", "Clear filter / suggest broader term", "ສະແດງ sponsored result ທີ່ບໍ່ກົງ"],
        ["Field unknown/stale", "ສະແດງ Unknown/Stale + checked date", "Contact place / report correction", "ສ້າງຄ່າປອມ"],
        ["Map/contact missing", "ປິດ action ທີ່ຂາດ; ຮັກສາ action ອື່ນ", "Choose available action", "Dead button"],
        ["Admin conflict", "ບໍ່ທັບ update; ສະແດງ latest version", "Reload/compare/reapply", "Silent overwrite"]
      ]}
    ],
    review: ["ອະນຸມັດ bottom navigation: Discover, Search, Saved ຫຼືບໍ່?", "Saved ເປັນ Should ຈະສະແດງໃນ nav ຕັ້ງແຕ່ Pilot ຫຼືລໍ?", "Route naming ແລະ Screen IDs ສອດຄ່ອງກັບ Technical Proposal ຫຼືຕ້ອງປັບ?", "Correction flow ຈະໃຊ້ external channel ຫຼື lightweight form?", "Admin queue ຄວນຮວມຢູ່ໜ້າດຽວ ຫຼືແຍກ Place/Case?"]
  },

  "ux-ui-wireframe": {
    code: "UX-02", title: "ໂຄງຮ່າງ UX/UI", english: "UX/UI Wireframe", owner: "Product Designer",
    sources: ["UX-01 0.1", "PRO-03 1.0", "CON-01/02 0.1", "PRO-04 0.1"],
    purpose: ["ກຳນົດ Layout, Information Hierarchy, Interaction ແລະ System State ກ່ອນເລືອກສີ ຫຼືຮູບພາບສຸດທ້າຍ. Wireframe ເນັ້ນວ່າຜູ້ໃຊ້ເຫັນຫຍັງກ່ອນ, ກົດຢູ່ໃສ ແລະກັບຄືນ Context ໄດ້ແນວໃດ.", "Mobile-first width ເປັນ baseline. Discovery Feed ໃຊ້ວິດີໂອເຕັມ viewport; Place identity, trust label ແລະ action ຕ້ອງອ່ານໄດ້ໂດຍບໍ່ບັງເນື້ອຫາຫຼັກ."],
    sections: [
      { title: "Discovery Feed Wireframe Contract", intro: "ໜຶ່ງ viewport ສະແດງໜຶ່ງ content item. Swipe ປ່ຽນ item; tap Place card ເປີດ Place Page; external source ເປັນ action ແຍກ.", headers: ["Zone", "ຕຳແໜ່ງ", "Content/Action", "ກົດ"], rows: [
        ["Media", "Full viewport background", "official embed/poster/fallback", "ບໍ່ auto-open external app"],
        ["Top bar", "Safe-area top", "logo, search, sound/state", "contrast ຜ່ານທຸກ media"],
        ["Place summary", "Bottom-left above nav", "name, category, district, price, trust", "2–3 ແຖວ; tap ເປີດ Place"],
        ["Actions", "Right rail/bottom action row", "place, source, save/share", "Map/Call ຢູ່ Place Page ເພື່ອຫຼຸດ mis-tap"],
        ["Navigation", "Safe-area bottom", "Discover/Search/Saved", "ບໍ່ບັງ media control"]
      ]},
      { title: "Search, Filter ແລະ Result", intro: "Search ຕ້ອງເຫັນ query/filter ປັດຈຸບັນ ແລະລຶບໄດ້ໂດຍບໍ່ reset ທັງໝົດ.", headers: ["Element", "Behavior", "State", "Acceptance note"], rows: [
        ["Search input", "Debounced submit/explicit search", "idle, typing, loading, error", "Keyboard submit; clear button"],
        ["Filter chips", "Category, district, price", "selected count + remove", "Only filters with data coverage"],
        ["Result card", "thumbnail/source + place facts", "organic/sponsored label", "Sponsored never mimics organic"],
        ["Empty state", "Explain no match", "query/filter retained", "Clear one/all; suggestion"],
        ["Pagination/load more", "Preserve order and scroll", "loading/retry", "No duplicate result"]
      ]},
      { title: "Place Page ແລະ Action Hierarchy", intro: "Place Page ເປັນ decision surface. Action ຫຼັກຕ້ອງຢູ່ໃນ thumb reach ແລະຍັງເຫັນໄດ້ເມື່ອ scroll.", headers: ["Order", "Block", "ຂໍ້ມູນ", "Action"], rows: [
        ["1", "Identity + trust", "name, category, district, price, verified/checked", "share/save"],
        ["2", "Primary action bar", "Map, Call, Message", "disable unavailable action with reason"],
        ["3", "Decision facts", "address, hours, price, setting", "report correction"],
        ["4", "Review sources", "creator, platform, disclosure", "open original"],
        ["5", "Related places", "same category/area", "return to discovery"]
      ]},
      { title: "Admin Wireframe Contract", intro: "Admin UI ຕ້ອງເນັ້ນ queue, validation, before/after, source evidence ແລະ audit; ບໍ່ເນັ້ນ marketing visuals.", headers: ["Screen", "Primary region", "Secondary region", "Critical control"], rows: [
        ["Queue", "filters + sortable cases/places", "workload/SLA summary", "claim/assign/open"],
        ["Place editor", "field form + inline validation", "source/evidence panel", "save draft / request review"],
        ["Review", "before/after + readiness failures", "audit/source history", "approve/reject with reason"],
        ["Case", "claim/evidence/timeline", "related place/source", "suspend/remove/restore with confirmation"]
      ]}
    ],
    wireframes: [
      { title: "SCR-G01 · Discovery Feed", screen: "MOBILE · FULL VIEWPORT", blocks: ["TOP: Brand · Search · Media state", "CENTER: Official embed / poster / fallback", "BOTTOM: Place name · category · district · price", "ACTIONS: View place · Source · Save/Share", "NAV: Discover · Search · Saved"] },
      { title: "SCR-G02 · Search", screen: "MOBILE · SCROLL", blocks: ["HEADER: Back · Search field · Clear", "FILTERS: Category · District · Price", "STATUS: Result count · active filters", "LIST: Place cards + source/trust", "STATE: Loading · Empty · Error · Retry"] },
      { title: "SCR-G03 · Place", screen: "MOBILE · DECISION PAGE", blocks: ["IDENTITY: Name · trust · checked date", "STICKY ACTIONS: Map · Call · Message", "FACTS: Address · hours · price · category", "SOURCES: Creator · platform · original link", "FOOTER: Correction · related places"] },
      { title: "SCR-A02 · Place Editor", screen: "DESKTOP · ADMIN", blocks: ["LEFT: Field groups + validation", "RIGHT: Source evidence + preview", "TOP: State · owner · readiness", "BOTTOM: Save draft · submit review", "AUDIT: before/after · actor · reason"] }
    ],
    review: ["ອະນຸມັດ full-screen one-item-per-viewport Feed ຫຼືບໍ່?", "Map/Call/Message ຄວນຢູ່ Feed ຫຼືເປີດຫຼັງເຂົ້າ Place Page?", "Saved ເປັນ Should ຈະລວມໃນ Wireframe Pilot ຫຼືບໍ່?", "Search Result ຄວນເປັນ list card ຫຼື video grid ໃນ Mobile?", "Admin Place Editor ຄວນໃຊ້ split view ໃນ desktop ແລະ stacked view ໃນ tablet ຫຼືບໍ່?"]
  },

  "interactive-prototype": {
    code: "UX-03", title: "ຕົວຢ່າງໂຕ້ຕອບ ແລະການທົດສອບ", english: "Interactive Prototype & Usability Test", owner: "Product Designer / Research Lead",
    sources: ["UX-01 0.1", "UX-02 0.1", "PRO-03 G3", "PRO-04 UAT"],
    purpose: ["ກຳນົດ Prototype Scope, Scenario, Participant, Task, Metric ແລະວິທີປ່ຽນ Finding ເປັນ Design Decision. Prototype ບໍ່ຕ້ອງເຊື່ອມ backend ແຕ່ຕ້ອງຮັກສາ navigation, state ແລະ content ທີ່ໃກ້ຂອງຈິງ.", "ແຜນທົດສອບລວມ 2 ຮອບ: formative 5 ຄົນເພື່ອຫາບັນຫາຫຼັກ ແລະ validation ລວມ 20 ຄົນຕາມ PRO-03. ບໍ່ຄວນສະຫຼຸບຈາກຄຳວ່າ “ມັກ” ໂດຍບໍ່ເບິ່ງ task behavior."],
    sections: [
      { title: "Prototype Scope ແລະ Fidelity", intro: "Prototype ຕ້ອງກວມ Core Journey ແລະ failure state ທີ່ກະທົບການຕັດສິນໃຈ.", headers: ["Scenario", "Screens", "Interaction", "ບໍ່ຈຳເປັນ"], rows: [
        ["P-01 Feed discovery", "Feed → Place → Map", "swipe, tap, back, external handoff", "real video streaming"],
        ["P-02 Search", "Search → filters → results → Place", "type, select, clear, empty recovery", "live search index"],
        ["P-03 Trust/source", "Place → source/disclosure", "open source, interpret labels", "provider authentication"],
        ["P-04 Contact", "Place → Call/Message", "confirmation/external handoff", "real phone/message"],
        ["P-05 Failure", "embed fail / stale / no result", "fallback/retry/correction", "real outage"]
      ]},
      { title: "Participants ແລະ Recruitment", intro: "ກຸ່ມຕົວຢ່າງຕ້ອງສະທ້ອນຄົນທີ່ໃຊ້ Social Video ເພື່ອຊອກຫາຮ້ານ ແລະມີຄວາມຫຼາກຫຼາຍດ້ານອາຍຸ/ຄວາມຄຸ້ນເຄີຍ.", headers: ["Cohort", "ຈຳນວນ", "ເງື່ອນໄຂ", "ຈຸດສົນໃຈ"], rows: [
        ["Frequent social searcher", "8", "ຊອກຮ້ານຜ່ານ TikTok/Facebook ຢ່າງນ້ອຍ monthly", "Feed mental model"],
        ["Search/map-first", "6", "ໃຊ້ search/map ຫຼາຍກວ່າ video", "Search/filter/value comparison"],
        ["Occasional/low-confidence digital user", "4", "ໃຊ້ smartphone ແຕ່ບໍ່ຄ່ອງ", "Clarity/accessibility"],
        ["Place owner perspective", "2", "ຮ້ານອາຫານ/ຄາເຟ", "Trust label/contact/correction"]
      ]},
      { title: "Tasks ແລະ Measures", intro: "Moderator ບໍ່ຄວນບອກຊື່ປຸ່ມ ຫຼືສອນ Flow ກ່ອນ participant ລອງ.", headers: ["Task", "Success", "Measure", "Failure signal"], rows: [
        ["T-01 ຫາຮ້ານຄາເຟໃນເຂດ/ລາຄາ", "ເຂົ້າ Place ທີ່ກົງ constraint", "completion, time, wrong turns", "ກັບໄປ Social/search engine"],
        ["T-02 ກວດວ່າຮ້ານເປີດ ແລະຢູ່ໃສ", "ພົບ hours/map/checked date", "fact comprehension", "ຕີຄວາມ Unknown ເປັນ Closed"],
        ["T-03 ເປີດແຜນທີ່", "ກົດ Map ຖືກ", "task completion", "ກົດ source/share ຜິດ"],
        ["T-04 ຮູ້ວ່າອັນໃດ Sponsored", "ຊີ້ label ແລະອະທິບາຍໄດ້", "comprehension", "ຄິດວ່າ Sponsored = best/verified"],
        ["T-05 Recover from failed video", "ເຂົ້າ Place ຫຼື source fallback", "recovery rate", "dead end"]
      ]},
      { title: "Finding Severity ແລະ Revision", intro: "Finding ຕ້ອງອ້າງ task, evidence ແລະ screen; ຫ້າມປ່ຽນດີໄຊນ໌ຈາກຄຳເຫັນຄົນດຽວໂດຍບໍ່ກວດ behavior.", headers: ["Severity", "ຄວາມໝາຍ", "Action", "Retest"], rows: [
        ["S1 Critical", "ຈົບ Core Task ບໍ່ໄດ້/ເຂົ້າໃຈ trust ຜິດຮ້າຍແຮງ", "Fix before next round", "Mandatory"],
        ["S2 High", "ຫຼາຍຄົນຫຼົງ/ຊ້າ/ກົດຜິດ", "Fix in current iteration", "Mandatory"],
        ["S3 Medium", "ຈົບ task ໄດ້ແຕ່ friction ຊັດ", "Prioritize with scope", "Targeted"],
        ["S4 Low", "Cosmetic/preference ບໍ່ກະທົບ outcome", "Backlog", "Optional"]
      ]}
    ],
    review: ["ອະນຸມັດ participant mix 8/6/4/2 ຫຼືຕ້ອງປັບ?", "Prototype ຈະສ້າງດ້ວຍ Web ຫຼື design tool ໃດ?", "ໃຜເປັນ moderator ແລະ note taker?", "ອະນຸມັດ 5 mandatory tasks ແລະ severity model ຫຼືບໍ່?", "ກຳນົດ task-success threshold ເທົ່າໃດກ່ອນ UX-05 final design?"]
  },

  "design-system": {
    code: "UX-04", title: "ລະບົບການອອກແບບ", english: "Design System", owner: "Design System Owner / Frontend Lead",
    sources: ["UX-02 0.1", "UX-03 0.1", "PRO-04 NFR-01/02/04", "Brand direction"],
    purpose: ["ກຳນົດ Design Token, Typography, Color, Spacing, Component, State ແລະ Accessibility Contract ເພື່ອໃຫ້ Designer ແລະ Developer ສ້າງຫນ້າຈໍດ້ວຍພາສາດຽວກັນ.", "Design System ຕ້ອງຮອງຮັບພາສາລາວ, ຕົວເລກກີບ, ຂໍ້ຄວາມຍາວ, full-screen media, low-bandwidth fallback ແລະ keyboard/screen-reader behavior. ສີບໍ່ຄວນເປັນວິທີດຽວໃນການບອກ State."],
    sections: [
      { title: "Foundations ແລະ Tokens", intro: "Token ໃຊ້ semantic name ເພື່ອປ່ຽນ theme ໄດ້ໂດຍບໍ່ແກ້ component ທຸກອັນ.", headers: ["Token group", "Baseline", "Usage", "ກົດ"], rows: [
        ["Typography", "Noto Sans Lao Variable; system sans fallback", "Lao/English UI and documents", "ທົດສອບ ປ/ຜ/ຝ, ວັນນະຍຸດ ແລະ line-height"],
        ["Type scale", "12, 14, 16, 20, 24, 32", "caption → body → heading", "Body mobile ≥16px ສຳລັບຂໍ້ຄວາມອ່ານ"],
        ["Spacing", "4px base: 4/8/12/16/24/32/48", "gap, padding, layout", "ຫ້າມ arbitrary spacing ໂດຍບໍ່ມີ token"],
        ["Radius", "4/8/12/full", "input/card/sheet/chip", "Media edge ແລະ action hierarchy ຕ້ອງຄົງທີ່"],
        ["Elevation", "0/1/2/overlay", "sticky action, sheet, modal", "ບໍ່ໃຊ້ shadow ເປັນ boundary ດຽວ"]
      ]},
      { title: "Semantic Color", intro: "ຄ່າສີສຸດທ້າຍຕ້ອງຜ່ານ contrast test ກັບ text/icon/state. ຕາຕະລາງນີ້ກຳນົດ role ກ່ອນກຳນົດ hex final.", headers: ["Role", "Draft value", "Usage", "Accessibility rule"], rows: [
        ["Surface / inverse", "#FFFDF8 / #101928", "page, media overlay, admin", "text contrast ≥4.5:1"],
        ["Primary", "#17644F", "primary action, active state", "ມີ label/icon; focus visible"],
        ["Accent", "#F27A45", "highlight, selected marker", "ຫ້າມໃຊ້ເປັນ body text ຖ້າ contrast ບໍ່ຜ່ານ"],
        ["Info", "#284B8F", "link/info state", "underline for inline link"],
        ["Success/Warning/Error", "semantic variants", "validation, trust, failure", "icon + text + color"],
        ["Sponsored", "distinct disclosure token", "commercial label", "ຕ້ອງອ່ານຄຳວ່າ Sponsored/ໂຄສະນາ"]
      ]},
      { title: "Component Catalog", intro: "Component ແຕ່ລະອັນຕ້ອງມີ variant, state, keyboard behavior, accessible name ແລະ analytics hook ເມື່ອຈຳເປັນ.", headers: ["Component", "Variants", "Required states", "Contract"], rows: [
        ["Button / Icon button", "primary, secondary, ghost, destructive", "default, hover, focus, pressed, disabled, loading", "min touch target 44×44; accessible name"],
        ["Search field", "default, with suggestions", "idle, typing, loading, error", "label, clear, submit, keyboard"],
        ["Filter chip/sheet", "single/multi, removable", "selected, disabled, count", "announce selection; clear all"],
        ["Place card", "list, feed overlay, related", "organic, sponsored, stale, unavailable", "canonical click area; trust/disclosure"],
        ["Media frame", "embed, poster, fallback", "loading, playing, muted, error", "no dead end; source action"],
        ["Trust badge", "verified info, partner, sponsored, stale", "normal/tooltip/detail", "badge text must not overclaim"],
        ["Toast/alert/empty", "success, info, warning, error", "persistent/dismissible", "critical message not auto-dismiss"],
        ["Admin data field", "text/select/location/hours/source", "dirty, valid, invalid, conflict", "before/after + reason + audit"]
      ]},
      { title: "Accessibility ແລະ Quality Gate", intro: "Accessibility ເປັນ Acceptance Gate ບໍ່ແມ່ນ polish ພາຍຫຼັງ.", headers: ["Area", "Requirement", "Verification", "Blocker"], rows: [
        ["Keyboard", "ທຸກ action ເຂົ້າໄດ້; logical focus order", "manual + automated", "focus trap/lost focus"],
        ["Screen reader", "landmark, heading, label, state announcement", "NVDA/VoiceOver baseline", "unlabeled critical action"],
        ["Contrast", "normal text ≥4.5:1; large ≥3:1", "token audit + UI test", "core text/action fail"],
        ["Touch", "target ≥44×44; spacing prevents mis-tap", "device test", "Map/Call/Message mis-tap risk"],
        ["Motion/media", "respect reduced motion; captions/source fallback where available", "preference test", "autoplay with sound"],
        ["Lao language", "no clipping/overlap at 200% text", "visual/text resize test", "meaning hidden/truncated"]
      ]}
    ],
    review: ["ອະນຸມັດ Noto Sans Lao Variable ເປັນ primary font ຫຼືບໍ່?", "ອະນຸມັດ draft palette ຫຼືຕ້ອງມີ brand exploration ກ່ອນ?", "Component ໃດຕ້ອງສ້າງກ່ອນ First Vertical Slice?", "Accessibility baseline ຈະຍຶດ WCAG 2.2 AA ເປັນ internal target ຫຼືບໍ່?", "ໃຜເປັນ Design System Owner ແລະຜູ້ອະນຸມັດ token/component change?"]
  },

  "full-ux-ui": {
    code: "UX-05", title: "ການອອກແບບ UX/UI ສົມບູນ", english: "Full UX/UI Design", owner: "Product Designer / Frontend Lead",
    sources: ["UX-01—04 0.1", "PRO-04 0.1", "CON-01—05 0.1", "TEC-01/02 pending"],
    purpose: ["ກຳນົດຂອບເຂດ Final Screen, Responsive Behavior, System State, Prototype Link, Asset ແລະ Developer Handoff ທີ່ຕ້ອງຄົບກ່ອນເລີ່ມ Frontend implementation.", "UX-05 ບໍ່ຄວນຖືກອະນຸມັດຈາກ Happy-path screen ເທົ່ານັ້ນ. Loading, Empty, Error, Stale, Sponsored, Permission, Conflict ແລະ External Fallback ຕ້ອງຖືກອອກແບບ ແລະຜູກກັບ Requirement/Screen ID."],
    sections: [
      { title: "Final Screen Inventory", intro: "Screen ທີ່ລະບຸເປັນ Must ຕ້ອງມີ mobile final design, responsive rule, state set ແລະ annotation.", headers: ["Screen ID", "Screen", "Priority", "Required deliverables"], rows: [
        ["SCR-G01", "Discovery Feed", "Must", "mobile portrait final; fallback; sponsored/source/trust; gesture annotation"],
        ["SCR-G02", "Search & Filters", "Must", "query, filter sheet, result list, loading/empty/error"],
        ["SCR-G03", "Place Detail", "Must", "identity, facts, sticky actions, sources, stale/correction"],
        ["SCR-G04", "Saved", "Should", "empty/list/local-device notice"],
        ["SCR-G05", "Consent/Privacy", "Must", "initial choice, settings, essential-only state"],
        ["SCR-A01", "Admin Queue", "Must", "desktop/tablet, SLA/filter/assignment/empty/error"],
        ["SCR-A02", "Place Editor", "Must", "field/source/readiness/audit/conflict"],
        ["SCR-A03", "Case Detail", "Must", "report/takedown/correction/appeal timeline"],
        ["SCR-A04", "Partner/Campaign Manual Admin", "Should", "partner status, report export, sponsored window"]
      ]},
      { title: "Responsive Behavior", intro: "Responsive ບໍ່ແມ່ນພຽງຫຍໍ້ຂະໜາດ. Information priority ແລະ interaction ຕ້ອງປ່ຽນຕາມ viewport/input.", headers: ["Range", "Navigation/Layout", "Feed/Place", "Admin"], rows: [
        ["Mobile <768", "bottom nav; sheets; single column", "full viewport feed; sticky bottom actions", "limited review; stacked fields"],
        ["Tablet 768–1199", "adaptive nav; 2-column where useful", "feed max-width + context; place 2-column", "queue + detail split optional"],
        ["Desktop ≥1200", "top/side nav; max content width", "media/context split; keyboard controls", "persistent queue/sidebar + editor/evidence split"],
        ["Landscape/short viewport", "safe areas; compact controls", "no hidden place/action behind nav", "sticky header without covering errors"]
      ]},
      { title: "System State Coverage", intro: "ທຸກ component/screen ຕ້ອງລະບຸ data state ແລະ recovery action.", headers: ["State", "UI requirement", "Recovery", "Evidence link"], rows: [
        ["Loading", "skeleton/progress ທີ່ຮັກສາ layout", "cancel/retry when relevant", "NFR-02"],
        ["Empty", "ອະທິບາຍວ່າຫຍັງບໍ່ມີ", "clear filter/create/add", "USR-02"],
        ["Error", "plain-language message + error reference", "retry/fallback/contact", "NFR-03"],
        ["Offline/slow", "preserve last safe content; media fallback", "retry/open original", "NFR-02"],
        ["Unknown/Stale", "label + checked date", "contact/report correction", "CON-02"],
        ["Unauthorized/expired", "do not expose data; explain session", "sign in/retry", "ADM-01"],
        ["Conflict", "show latest + unsaved changes", "compare/reapply", "PRO-02 ERR-CONFLICT"],
        ["Sponsored", "visible label adjacent to placement", "disclosure detail", "CON-05"]
      ]},
      { title: "Developer Handoff Package", intro: "Handoff ຕ້ອງລົບການຄາດເດົາ: ທຸກ screen/component ຕ້ອງອ້າງ Requirement, State, Data ແລະ Interaction.", headers: ["Deliverable", "ລາຍລະອຽດ", "Owner", "Definition of ready"], rows: [
        ["Final screens", "mobile/tablet/desktop + state variants", "Designer", "Screen IDs/version/date"],
        ["Prototype", "core journeys + failure recovery", "Designer", "link + start points + scenario map"],
        ["Component spec", "token, variant, state, behavior, accessibility", "Design System Owner", "mapped to code component"],
        ["Content spec", "Lao/English copy, truncation, empty/error/disclosure", "Content/Product", "approved copy owner"],
        ["Data annotation", "field source, required/optional, unknown/stale", "SA/Data Steward", "mapped to entity/API"],
        ["Traceability", "screen/action → requirement/AC/event", "SA + QA", "no orphan Must screen/action"],
        ["Asset export", "icons/images/posters with license/source", "Designer/Trust", "format, size, ownership"],
        ["Review record", "open issue, deviation, approval", "Product Owner", "signed version baseline"]
      ]}
    ],
    review: ["Screen Inventory ຄົບກັບ MVP Must/Should ຫຼືບໍ່?", "ອະນຸມັດ responsive ranges <768, 768–1199, ≥1200 ຫຼືຕ້ອງອີງ device targets ອື່ນ?", "System State ໃດຍັງຂາດຈາກ Requirement/Error Contract?", "ເອກະສານໃດຕ້ອງອະນຸມັດກ່ອນ UX-05 ຂຶ້ນ 1.0—UX-01—04, CON-01—05, TEC-01/02 ຫຼືທັງໝົດ?", "ໃຜລົງນາມ final design, accessibility, content/trust ແລະ developer readiness?"]
  }
};

const order = ["content-taxonomy", "place-data-standard", "content-acquisition", "creator-moderation", "legal-disclosure", "information-user-flow", "ux-ui-wireframe", "interactive-prototype", "design-system", "full-ux-ui"];

export default function ContentDesignDocument({ slug, basePath }: { slug: string; basePath: string }) {
  const spec = specs[slug];
  if (!spec) return null;
  const currentIndex = order.indexOf(slug);
  const previous = currentIndex > 0 ? order[currentIndex - 1] : "requirements-acceptance";
  const next = currentIndex < order.length - 1 ? order[currentIndex + 1] : "system-architecture";
  const previousSpec = specs[previous];
  const nextSpec = specs[next];
  const category = spec.code.startsWith("CON-") ? "CONTENT & TRUST" : "UX/UI DESIGN";

  return <article className={`${styles.detailBody} ${styles.formalDocument}`}>
    <header className={styles.formalDocumentHeader}>
      <p>{spec.code} · {category}</p><h1>{spec.english}</h1><h2>{spec.title}</h2>
      <div className={`${styles.formalStatus} ${styles.formalDraftStatus}`}>ສະບັບ 0.1 · ຮ່າງສຳລັບທົບທວນ · 26 ສິງຫາ 2026</div>
    </header>

    <section className={styles.formalSection} id="document-control"><h2><span>1.</span> ຂໍ້ມູນຄວບຄຸມເອກະສານ</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
        <tr><th>ລະຫັດ</th><td>{spec.code}</td><th>ສະບັບ</th><td>0.1</td></tr>
        <tr><th>ຊື່</th><td>{spec.english}</td><th>ສະຖານະ</th><td>ຮ່າງສຳລັບທົບທວນ</td></tr>
        <tr><th>Owner</th><td>{spec.owner}</td><th>ວັນທີ</th><td>26 ສິງຫາ 2026</td></tr>
        <tr><th>Source documents</th><td colSpan={3}>{spec.sources.join(" · ")}</td></tr>
      </tbody></table></div>
      <h3>1.1 ປະຫວັດການແກ້ໄຂ</h3>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ສະບັບ</th><th>ວັນທີ</th><th>ລາຍລະອຽດ</th><th>ສະຖານະ</th></tr></thead><tbody><tr><td>0.1</td><td>26 ສິງຫາ 2026</td><td>ຈັດທຳ baseline, policy/matrix ແລະຄຳຖາມສຳລັບການທົບທວນຄັ້ງທຳອິດ</td><td>ຮ່າງ</td></tr></tbody></table></div>
    </section>

    <nav className={styles.formalToc} aria-label={`ສາລະບານ ${spec.code}`}><h2>ສາລະບານ</h2><ol>
      <li><a href="#document-control">ຂໍ້ມູນຄວບຄຸມ</a></li><li><a href="#purpose">ຈຸດປະສົງ ແລະຂອບເຂດ</a></li>
      {spec.sections.map((section, index) => <li key={section.title}><a href={`#section-${index + 3}`}>{section.title}</a></li>)}
      {spec.wireframes ? <li><a href="#wireframes">Low-fidelity Wireframes</a></li> : null}<li><a href="#review">ຂໍ້ຕ້ອງທົບທວນ</a></li>
    </ol></nav>

    <section className={styles.formalSection} id="purpose"><h2><span>2.</span> ຈຸດປະສົງ ແລະຂອບເຂດ</h2>{spec.purpose.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <div className={styles.formalNote}><strong>ສະຖານະຂອງເນື້ອຫາ</strong>ຂໍ້ກຳນົດ, target ແລະ threshold ໃນສະບັບ 0.1 ແມ່ນ baseline ສຳລັບການທົບທວນ. ຍັງບໍ່ມີຜົນບັງຄັບເປັນ 1.0 ຈົນກວ່າຂໍ້ຕ້ອງຕັດສິນຈະຖືກອະນຸມັດ.</div>
    </section>

    {spec.sections.map((section, index) => <section className={styles.formalSection} id={`section-${index + 3}`} key={section.title}>
      <h2><span>{index + 3}.</span> {section.title}</h2><p>{section.intro}</p>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr>{section.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.rows.map((row, rowIndex) => <tr key={`${section.title}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cellIndex === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody></table></div>
      {section.note ? <div className={styles.formalDecision}><strong>ຂໍ້ສັງເກດ</strong><p>{section.note}</p></div> : null}
    </section>)}

    {spec.wireframes ? <section className={styles.formalSection} id="wireframes"><h2><span>{spec.sections.length + 3}.</span> Low-fidelity Wireframes</h2><p>ແຜນຜັງຕໍ່ໄປນີ້ສະແດງລຳດັບຂໍ້ມູນ ແລະ interaction zone; ບໍ່ແມ່ນ visual design ສຸດທ້າຍ.</p><div className={styles.formalWireframeGrid}>{spec.wireframes.map((wireframe) => <figure className={styles.formalWireframe} key={wireframe.title}><figcaption><strong>{wireframe.title}</strong><span>{wireframe.screen}</span></figcaption><div>{wireframe.blocks.map((block) => <p key={block}>{block}</p>)}</div></figure>)}</div></section> : null}

    <section className={styles.formalSection} id="review"><h2><span>{spec.sections.length + (spec.wireframes ? 4 : 3)}.</span> ຂໍ້ຕ້ອງທົບທວນກ່ອນຂຶ້ນສະບັບ 1.0</h2>
      <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>ຄຳຖາມຕ້ອງຕັດສິນ</th><th>ສະຖານະ</th></tr></thead><tbody>{spec.review.map((item, index) => <tr key={item}><td>REV-{String(index + 1).padStart(2, "0")}</td><td>{item}</td><td>ລໍທົບທວນ</td></tr>)}</tbody></table></div>
      <div className={styles.formalDraftNotice}><strong>{spec.code} · Draft 0.1</strong><p>ເອກະສານມີ baseline ສຳລັບຣີວິວແລ້ວ ແຕ່ຍັງບໍ່ອະນຸມັດ. ການຕັດສິນ REV-01 ຫາ REV-05 ຈະຖືກບັນທຶກໃນ Revision ຖັດໄປ.</p></div>
    </section>

    <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
      <a href={`${basePath}/documents/${previous}`}><small>← ເອກະສານກ່ອນໜ້າ</small><strong>{previousSpec?.english ?? "Requirements & Acceptance Criteria"}</strong></a>
      <a href={`${basePath}/documents/${next}`}><small>ເອກະສານລຳດັບຕໍ່ໄປ →</small><strong>{nextSpec?.english ?? "System Architecture"}</strong></a>
    </nav>
  </article>;
}
