import styles from "../documents.module.css";
import BusinessDocumentDeepDive from "./BusinessDocumentDeepDive";

const alternatives = [
  ["TikTok / Facebook / YouTube", "ວິດີໂອຫຼາຍ, ເຂົ້າເຖິງງ່າຍ ແລະມີ Creator ຢູ່ແລ້ວ", "ຂໍ້ມູນກະແຈກກະຈາຍ, ຄົ້ນຫາຊ້ຳຍາກ ແລະຂາດຂໍ້ມູນຮ້ານທີ່ເປັນມາດຕະຖານ", "ໃຊ້ເປັນ Source ແລະສົ່ງ Traffic ກັບຄືນ; ບໍ່ແຂ່ງຂັນດ້ານ Creator feed"],
  ["Map ແລະ Search", "ເກັ່ງດ້ານພິກັດ, ເສັ້ນທາງ, ເວລາ ແລະຂໍ້ມູນພື້ນຖານ", "ປະສົບການຄົ້ນພົບບໍ່ໄດ້ເນັ້ນວິດີໂອຣີວິວຈາກ Creator ທ້ອງຖິ່ນ", "ໃຊ້ເປັນປາຍທາງຂອງປຸ່ມແຜນທີ່ ແລະຊ່ວຍກວດ Location"],
  ["Website Directory / Portal", "ຈັດຂໍ້ມູນເປັນໝວດ ແລະມີໜ້າສະຖານທີ່", "ຫຼາຍແຫ່ງສື່ສານແບບຂໍ້ຄວາມ ຫຼືຄຳໂຄສະນາ ແລະບໍ່ໄດ້ຈັດວິດີໂອຣີວິວເປັນຫຼັກ", "ຮຽນຮູ້ຈາກໂຄງສ້າງຂໍ້ມູນ ແຕ່ສ້າງ Flow ແບບ Video → Place → Action"],
  ["ໜ້າ Social ຂອງຮ້ານ", "ຮ້ານສາມາດອັບເດດເບີໂທ, ເວລາ ແລະໂປຣໂມຊັນໄດ້ໂດຍກົງ", "ຜູ້ໃຊ້ຕ້ອງຮູ້ຈັກຊື່ຮ້ານກ່ອນ ແລະຂໍ້ມູນອາດປົນກັບໂຄສະນາ", "ໃຊ້ເປັນ Source ສຳລັບຂໍ້ມູນທາງການ ແລະຊ່ອງທາງ Message"],
  ["“ພ້ອມໄປ”", "ວິດີໂອຣີວິວ + ຂໍ້ມູນ Place + ປຸ່ມການກະທຳໃນ Flow ດຽວ", "ຕ້ອງສ້າງຂໍ້ມູນເລີ່ມຕົ້ນ, ຮັກສາຄວາມສົດໃໝ່ ແລະພຶ່ງພາ Link/Preview ຈາກພາຍນອກ", "ຊະນະດ້ວຍການຈັດລະບຽບ, ຄວາມໂປ່ງໃສ ແລະຄວາມສະດວກໃນການຕັດສິນໃຈ"],
] as const;

const namedCompetitors = [
  {
    name: "Discover Laos Today",
    type: "Tourism marketplace / booking portal",
    evidence: "ໜ້າເວັບທາງການສະແດງ Destination, Tour, Accommodation, Restaurant/Foodie, ການຈ່າຍເງິນ, Booking, Support ແລະລະບຸວ່າມີສິນຄ້າທ່ອງທ່ຽວລາວຫຼາຍກວ່າ 1,000 ລາຍການ.",
    strength: "ມີ Supply ດ້ານທ່ອງທ່ຽວ, Transaction, Payment, ຫຼາຍພາສາ ແລະຄວາມສຳພັນກັບ Supplier.",
    gap: "Core journey ເນັ້ນສິນຄ້າ/ການຈອງທ່ອງທ່ຽວ. ຈາກການກວດໜ້າຫຼັກ ຍັງບໍ່ເຫັນ Flow ແບບ Vertical review video → Canonical Place → Decision Action ສຳລັບການຫາຮ້ານປະຈຳວັນ.",
    role: "ຄູ່ແຂ່ງທາງອ້ອມໃນ Discovery; ຄູ່ແຂ່ງທາງກົງຖ້າ Platform ຂະຫຍາຍໄປ Tour/Accommodation/Booking.",
    source: "https://discoverlaos.today/la",
  },
  {
    name: "Google Maps + Business Profile",
    type: "Map, local search ແລະ business data",
    evidence: "Google ລະບຸວ່າ Place ສາມາດມີເວລາ, Menu, Review, Photo/Video, Website, Phone, Direction ແລະ Suggest edit; ເຈົ້າຂອງສາມາດກວດຢືນຢັນ ແລະອັບເດດ Business Profile.",
    strength: "ແຂງແຮງຫຼາຍດ້ານພິກັດ, Search, Route, Review, Business ownership ແລະ Direct Action.",
    gap: "ບໍ່ໄດ້ຈັດ Creator review video ພາສາລາວເປັນ Feed ຫຼັກທີ່ເຊື່ອມຫຼາຍ Social source ເຂົ້າ Place ດຽວ.",
    role: "ຄູ່ແຂ່ງຫຼັກດ້ານ Place/Action ແລະເປັນປາຍທາງຂອງປຸ່ມ Map; Platform ບໍ່ຄວນສ້າງ Navigation ແຂ່ງ.",
    source: "https://support.google.com/maps/answer/144349?hl=en",
  },
  {
    name: "TikTok Search / For You",
    type: "Short-video discovery ແລະ social search",
    evidence: "TikTok ອະທິບາຍວ່າ Search ໃຊ້ຄົ້ນ Content ແລະແນະນຳຄຳຄົ້ນ; ຜົນຄົ້ນຫາຂຶ້ນກັບພຶດຕິກຳຄົ້ນ, Like, Share, Comment, Watch ແລະ Skip.",
    strength: "ມີ Creator, Content ວິດີໂອຈຳນວນຫຼາຍ ແລະ Discovery experience ທີ່ຜູ້ໃຊ້ຄຸ້ນເຄີຍ.",
    gap: "Content ຈັດຕາມ Post/Creator; ຂໍ້ມູນ Place, ວັນກວດ, ການລວມຫຼາຍ Review ແລະ Map/Call/Message ບໍ່ໄດ້ເປັນມາດຕະຖານດຽວກັນທຸກ Post.",
    role: "ຄູ່ແຂ່ງຫຼັກດ້ານ Attention/Discovery ແລະເປັນ Content source; Platform ຕ້ອງສົ່ງ Attribution/Traffic ກັບໄປຫາຕົ້ນສະບັບ.",
    source: "https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content",
  },
  {
    name: "Facebook Pages / Recommendations / Messenger",
    type: "Business presence, community review ແລະ contact",
    evidence: "Facebook ລະບຸວ່າ Business Page ສາມາດເປີດ Recommendations/Reviews ໃຫ້ຄົນເຜີຍແຜ່ຄຳແນະນຳ, ເຫັນ Rating ແລະຊ່ວຍໃຫ້ Page ຖືກຄົ້ນພົບ.",
    strength: "ຮ້ານລາວສາມາດອັບເດດ Page, ສື່ສານກັບລູກຄ້າ, ຮັບ Message ແລະສ້າງ Community ໄດ້.",
    gap: "ຂໍ້ມູນຢູ່ກະແຈກກະຈາຍລະຫວ່າງ Page, Post, Reel ແລະ Group; ບໍ່ມີ Canonical Place/Taxonomy ກາງທີ່ຄົງທີ່.",
    role: "ຄູ່ແຂ່ງດ້ານ Business discovery/contact ແລະເປັນຊ່ອງທາງ Message/official shop source.",
    source: "https://www.facebook.com/help/548274415377576/",
  },
] as const;

const researchSources = [
  ["S1", "Discover Laos Today — ໜ້າຫຼັກພາສາລາວ", "Destination, Tour, Accommodation, Foodie/Restaurant, Booking, Payment ແລະ Partnership", "https://discoverlaos.today/la"],
  ["S2", "Google Maps Help — Get started", "Place information, Review, Direction, Save, Contribute ແລະ Correction", "https://support.google.com/maps/answer/144349?hl=en"],
  ["S3", "Google Business Profile Help", "Business hours, Website, Phone, Location, Photo/Video, Review ແລະ Booking link", "https://support.google.com/business/answer/7039811?hl=en-en"],
  ["S4", "TikTok Help — How TikTok recommends content", "Search, recommended terms ແລະ signals ທີ່ມີຜົນຕໍ່ Search", "https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content"],
  ["S5", "Facebook Help — Page Recommendations", "Recommendations, Reviews, Rating ແລະ Facebook Search", "https://www.facebook.com/help/548274415377576/"],
  ["S6", "Lao Tourism Statistical Report 2022", "ຕາຕະລາງ 23: ກິດຈະການບໍລິການທ່ອງທ່ຽວແຍກຕາມແຂວງ", "https://laos-dmn.com/wp-content/uploads/2024/08/Lao-Tourism-Statistical-Report-in-2022_English_Final.pdf"],
  ["S7", "DataReportal — Digital 2025: Laos", "Internet users, social-media identities ແລະຂໍ້ຈຳກັດຂອງ audience data", "https://datareportal.com/reports/digital-2025-laos"],
] as const;

const risks = [
  ["M1 · ສູງ", "ຜູ້ໃຊ້ອາດພໍໃຈກັບການຄົ້ນຫາໃນ Social Media ແບບເດີມ.", "ທົດສອບ Task ດຽວກັນລະຫວ່າງວິທີເດີມ ແລະ Prototype; ວັດເວລາ, ຄວາມສຳເລັດ ແລະຄວາມຢາກໃຊ້ຊ້ຳ."],
  ["M2 · ສູງ", "ບໍ່ມີ Content ຫຼື Place data ພໍໃຫ້ Search/Filter ມີປະໂຫຍດ.", "ຈຳກັດ Launch ຢູ່ວຽງຈັນ ແລະ 2 ໝວດ; ສ້າງ 100 Place records ກ່ອນຂະຫຍາຍ."],
  ["M3 · ສູງ", "ຄູ່ແຂ່ງໃຫຍ່ສາມາດເພີ່ມ Feature ຄ້າຍກັນໄດ້.", "ສ້າງຄວາມໄດ້ປຽບຈາກຂໍ້ມູນທ້ອງຖິ່ນ, Taxonomy, ການກວດຂໍ້ມູນ ແລະຄວາມສຳພັນກັບຮ້ານ/Creator."],
  ["M4 · ກາງ", "ຮ້ານອາດສົນໃຈ Visibility ແຕ່ບໍ່ຍອມຈ່າຍ.", "ຂາຍ Founding Partner Pilot ກ່ອນພັດທະນາເຕັມ; ນັບສະເພາະເງິນ, ມັດຈຳ ຫຼືຫຼັກຖານທີ່ລົງນາມ."],
  ["M5 · ກາງ", "ຜູ້ໃຊ້ອາດເຂົ້າມາເບິ່ງວິດີໂອ ແຕ່ບໍ່ເປີດ Place Page ຫຼືກົດເພື່ອໄປ.", "ອອກແບບການທົດສອບຕາມ Funnel: Feed → Place → Map/Call/Message ແລະບໍ່ໃຊ້ຍອດ View ເປັນຕົວຊີ້ວັດດຽວ."],
] as const;

export default function MarketCompetitorDocument({ basePath }: { basePath: string }) {
  return (
    <article className={`${styles.detailBody} ${styles.marketBody} ${styles.businessDocument}`}>
      <section className={styles.documentControl}>
        <div><small>ສະບັບ</small><strong>1.0</strong></div>
        <div><small>ສະຖານະ</small><strong>ອະນຸມັດ — Pre-Pilot Baseline</strong></div>
        <div><small>ວັນທີປັບປຸງ</small><strong>26 ສິງຫາ 2026</strong></div>
        <div><small>ຂໍ້ມູນຕົ້ນທາງ</small><strong>Vision 1.0 + Desk research + Founder observations</strong></div>
      </section>

      <BusinessDocumentDeepDive code="BUS-02" />

      <section>
        <span>01 · ຂໍ້ສະຫຼຸບ</span>
        <h2>ຊ່ອງວ່າງບໍ່ແມ່ນ “ບໍ່ມີຄົນເຮັດ Content”</h2>
        <blockquote className={styles.canvasStatement}>ຕະຫຼາດມີ Content ຣີວິວຢູ່ແລ້ວ. ບັນຫາແມ່ນ Content ບໍ່ຖືກຈັດຕາມສະຖານທີ່, ຄົ້ນຫາຍາກ, ຂໍ້ມູນສຳລັບຕັດສິນໃຈບໍ່ຄົບ ແລະຜູ້ໃຊ້ຕ້ອງສະຫຼັບຫຼາຍ App ກ່ອນຈະໄປຮ້ານໄດ້. “ພ້ອມໄປ” ຈຶ່ງເຂົ້າມາຈັດລະບຽບ ແລະເຊື່ອມການຄົ້ນພົບກັບການກະທຳ.</blockquote>
      </section>

      <section>
        <span>02 · ຂອບເຂດຕະຫຼາດ</span>
        <h2>ເຮົາບໍ່ໄດ້ແຂ່ງເພື່ອຍອດເບິ່ງ</h2>
        <div className={styles.readerGuideBody}>
          <article><b>ຕະຫຼາດທີ່ເຂົ້າໄປ</b><p>ການຊ່ວຍຄົນຄົ້ນຫາ ແລະຕັດສິນໃຈເລືອກສະຖານທີ່ໃນລາວ ໂດຍໃຊ້ວິດີໂອຣີວິວເປັນຈຸດເລີ່ມ ແລະຂໍ້ມູນ Place ເປັນຕົວພາໄປຫາການກະທຳ.</p></article>
          <article><b>ສິ່ງທີ່ບໍ່ແມ່ນຕະຫຼາດຫຼັກ</b><p>ບໍ່ແຂ່ງເພື່ອໃຫ້ Creator ສ້າງຜູ້ຕິດຕາມ, ບໍ່ແຂ່ງດ້ານ Watch time, ບໍ່ເປັນ Online Travel Agency ແລະບໍ່ສ້າງລະບົບ Booking/Payment ໃນ MVP.</p></article>
        </div>
      </section>

      <section>
        <span>03 · ພຶດຕິກຳທີ່ສັງເກດເຫັນ</span>
        <h2>ຈາກ “ເຫັນ” ໄປຫາ “ພ້ອມໄປ” ຍັງມີຊ່ອງວ່າງ</h2>
        <div className={styles.valueFlow}>
          <div><b>01 · DISCOVER</b><strong>ເຫັນວິດີໂອ</strong><p>Social feed ສ້າງຄວາມສົນໃຈຈາກຮູບພາບ, ບັນຍາກາດ ແລະປະສົບການຂອງ Creator.</p></div>
          <i>→</i>
          <div><b>02 · VERIFY</b><strong>ຄົ້ນຂໍ້ມູນເພີ່ມ</strong><p>ຜູ້ໃຊ້ໄປຊອກຊື່, ພິກັດ, ລາຄາ, ເວລາ ແລະຄຳເຫັນອື່ນ.</p></div>
          <i>→</i>
          <div><b>03 · ACT</b><strong>ຕິດຕໍ່ ຫຼືເດີນທາງ</strong><p>ກົດແຜນທີ່, ໂທ ຫຼືສົ່ງຂໍ້ຄວາມ; ຂັ້ນນີ້ແມ່ນຄຸນຄ່າທີ່ Platform ຕ້ອງພາໄປໃຫ້ເຖິງ.</p></div>
        </div>
        <p className={styles.metricNote}>ຂໍ້ສັງເກດນີ້ມາຈາກ Founder ແລະການເບິ່ງພຶດຕິກຳໃນ Social Media; ຍັງບໍ່ແມ່ນຜົນສຳຫຼວດຕະຫຼາດ. Pilot ຕ້ອງພິສູດດ້ວຍການທົດສອບຜູ້ໃຊ້ຈິງ.</p>
      </section>

      <section>
        <span>04 · JOBS TO BE DONE</span>
        <h2>ຜູ້ໃຊ້ກຳລັງພະຍາຍາມເຮັດຫຍັງ</h2>
        <div className={styles.userGroups}>
          <article><small>ເມື່ອຍັງບໍ່ມີຮ້ານໃນໃຈ</small><h3>ຊ່ວຍໃຫ້ຄົ້ນພົບ</h3><p>ຂ້ອຍຢາກເລື່ອນເບິ່ງຕາມອາຫານ, ບັນຍາກາດ, ເຂດ ຫຼືງົບ ເພື່ອຫາຕົວເລືອກທີ່ເໝາະກັບຕອນນັ້ນ.</p></article>
          <article><small>ເມື່ອສົນໃຈຮ້ານໜຶ່ງ</small><h3>ຊ່ວຍໃຫ້ຕັດສິນໃຈ</h3><p>ຂ້ອຍຢາກເຫັນຫຼາຍກວ່າຄຳໂຄສະນາ: ຕ້ອງມີຣີວິວຕົ້ນສະບັບ, ລາຄາ, ເວລາ, Location ແລະວັນທີກວດຂໍ້ມູນ.</p></article>
          <article><small>ເມື່ອຕັດສິນໃຈແລ້ວ</small><h3>ຊ່ວຍໃຫ້ລົງມືເຮັດ</h3><p>ຂ້ອຍຢາກກົດແຜນທີ່, ໂທ ຫຼືຂໍ້ຄວາມໄດ້ທັນທີ ໂດຍບໍ່ຕ້ອງອອກໄປຄົ້ນອີກຮອບ.</p></article>
        </div>
      </section>

      <section>
        <span>05 · ທາງເລືອກ ແລະຄູ່ແຂ່ງ</span>
        <h2>ຄູ່ແຂ່ງແມ່ນທຸກວິທີທີ່ຄົນໃຊ້ແກ້ບັນຫາຢູ່ແລ້ວ</h2>
        <p className={styles.detailLead}>Platform ບໍ່ຄວນປຽບທຽບສະເພາະກັບ App ທີ່ມີຮູບແບບຄ້າຍກັນ. ການຄົ້ນຫາໃນ Social Media, ການເປີດ Map, ການຖາມໝູ່ ຫຼືການເຂົ້າໜ້າຮ້ານໂດຍກົງ ລ້ວນເປັນທາງເລືອກທີ່ “ພ້ອມໄປ” ຕ້ອງເຮັດໃຫ້ສະດວກກວ່າ.</p>
        <div className={styles.marketMatrix} role="table" aria-label="ປຽບທຽບທາງເລືອກໃນຕະຫຼາດ">
          <div role="row"><b>ທາງເລືອກ</b><b>ຈຸດແຂງ</b><b>ຊ່ອງວ່າງ</b><b>ບົດບາດຕໍ່ “ພ້ອມໄປ”</b></div>
          {alternatives.map(([name, strength, gap, role]) => <div role="row" key={name}><strong>{name}</strong><p>{strength}</p><span>{gap}</span><em>{role}</em></div>)}
        </div>
        <h3 className={styles.documentSubheading}>ການວິເຄາະຄູ່ແຂ່ງລາຍຊື່ຈິງ</h3>
        <div className={styles.namedCompetitorList}>
          {namedCompetitors.map((competitor) => (
            <article key={competitor.name}>
              <header><div><small>{competitor.type}</small><h3>{competitor.name}</h3></div><a href={competitor.source} target="_blank" rel="noreferrer">ເປີດແຫຼ່ງຂໍ້ມູນ ↗</a></header>
              <dl>
                <div><dt>ສິ່ງທີ່ກວດພົບ</dt><dd>{competitor.evidence}</dd></div>
                <div><dt>ຈຸດແຂງ</dt><dd>{competitor.strength}</dd></div>
                <div><dt>ຊ່ອງວ່າງ</dt><dd>{competitor.gap}</dd></div>
                <div><dt>ບົດບາດຕໍ່ “ພ້ອມໄປ”</dt><dd>{competitor.role}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <p className={styles.metricNote}>ກວດຄັ້ງຫຼ້າສຸດ: 26 ສິງຫາ 2026. ການປຽບທຽບນີ້ອີງໃສ່ໜ້າເວັບ/ຄູ່ມືທາງການທີ່ເຂົ້າເຖິງໄດ້; Feature ອາດແຕກຕ່າງຕາມປະເທດ, ບັນຊີ ແລະອຸປະກອນ.</p>
      </section>

      <section>
        <span>06 · MARKET GAP</span>
        <h2>ຄຸນຄ່າຕ້ອງຄົບ 4 ຊັ້ນ</h2>
        <div className={styles.problemCards}>
          <div><b>01 · DISCOVERY</b><h3>ຄົ້ນພົບດ້ວຍພາບ</h3><p>ເລີ່ມຈາກວິດີໂອແນວຕັ້ງ ແລະຈັດ Feed ຕາມສະຖານທີ່/ໝວດ ບໍ່ແມ່ນຕາມ Creator ພຽງຢ່າງດຽວ.</p></div>
          <div><b>02 · DECISION DATA</b><h3>ຂໍ້ມູນພໍກ່ອນໄປ</h3><p>ລວມທີ່ຢູ່, ແຜນທີ່, ເວລາ, ຊ່ວງລາຄາ, ການຕິດຕໍ່ ແລະສະຖານະການກວດໄວ້ໃນ Place Page.</p></div>
          <div><b>03 · DIRECT ACTION</b><h3>ກົດເພື່ອໄປ</h3><p>Map, Call ແລະ Message ຕ້ອງເຫັນງ່າຍ ແລະເປີດ App ປາຍທາງໄດ້ຖືກຕ້ອງ.</p></div>
          <div><b>04 · TRUST</b><h3>ຮູ້ວ່າຂໍ້ມູນມາຈາກໃສ</h3><p>ແຍກ Source linked, Place verified ແລະ Sponsored ໃຫ້ຊັດ; ມີວັນກວດ ແລະຊ່ອງທາງແຈ້ງແກ້ໄຂ.</p></div>
        </div>
      </section>

      <section>
        <span>07 · PRELIMINARY MARKET BASELINE</span>
        <h2>ຂະໜາດຕະຫຼາດເບື້ອງຕົ້ນ: ແຍກ “ຂໍ້ມູນອ້າງອີງ” ອອກຈາກ “ຕະຫຼາດທີ່ເຂົ້າເຖິງໄດ້”</h2>
        <div className={styles.marketBaselineGrid}>
          <article><b>ຜູ້ໃຊ້ Internet — ລາວ 2025</b><strong>4.97 ລ້ານ</strong><p>DataReportal ລາຍງານວ່າລາວມີຜູ້ໃຊ້ Internet 4.97 ລ້ານຄົນໃນເດືອນມັງກອນ 2025. ຕົວເລກນີ້ເປັນ National demand context ບໍ່ແມ່ນຈຳນວນລູກຄ້າຂອງ Platform.</p></article>
          <article><b>Social-media user identities — ລາວ 2025</b><strong>4.25 ລ້ານ</strong><p>ເທົ່າກັບ 54.3% ຂອງປະຊາກອນຕາມ DataReportal. “User identities” ອາດມີບັນຊີຊ້ຳ ແລະບໍ່ຄວນອ່ານເປັນຈຳນວນບຸກຄົນບໍ່ຊ້ຳ.</p></article>
          <article><b>ຮ້ານອາຫານ — ວຽງຈັນ 2022</b><strong>144 ແຫ່ງ</strong><p>ລາຍງານສະຖິຕິທ່ອງທ່ຽວລະບຸຮ້ານອາຫານ 144 ແຫ່ງໃນນະຄອນຫຼວງ. ນີ້ແມ່ນສະເພາະກິດຈະການທີ່ຢູ່ໃນຂອບຂໍ້ມູນບໍລິການທ່ອງທ່ຽວ ແລະບໍ່ຄອບຄຸມຄາເຟ/ຮ້ານທັງໝົດ.</p></article>
          <article><b>ຮ້ານອາຫານ — ທົ່ວປະເທດ 2022</b><strong>2,944 ແຫ່ງ</strong><p>ໃຊ້ເປັນ Supply context ລະດັບປະເທດເທົ່ານັ້ນ. ບໍ່ໃຊ້ເປັນ TAM ຂອງ Platform ເພາະຂໍ້ມູນເກົ່າ, ຂອບເຂດການຂຶ້ນທະບຽນຈຳກັດ ແລະ MVP ເລີ່ມພຽງວຽງຈັນ.</p></article>
        </div>
        <div className={styles.documentFormulaLight}>
          <b>ສູດປະເມີນ Serviceable Business Base ຫຼັງຈາກ Field audit</b>
          <code>ຮ້ານທີ່ເຂົ້າເຖິງໄດ້ = ຮ້ານ Candidate ບໍ່ຊ້ຳ × ອັດຕາຮ້ານທີ່ຜ່ານເກນ × ອັດຕາທີ່ຕິດຕໍ່ເຈົ້າຂອງໄດ້</code>
          <ol>
            <li><strong>Candidate ບໍ່ຊ້ຳ:</strong> ລວມລາຍຊື່ຈາກ Map, Social ແລະການສຳຫຼວດ ແລ້ວລຶບ Duplicate.</li>
            <li><strong>ຜ່ານເກນ:</strong> ຢູ່ໃນວຽງຈັນ, ເປັນຮ້ານອາຫານ/ຄາເຟ, ເປີດຢູ່ ແລະມີຂໍ້ມູນພໍ.</li>
            <li><strong>ຕິດຕໍ່ໄດ້:</strong> ມີເບີ, Message ຫຼືຜູ້ຮັບຜິດຊອບທີ່ສາມາດສະເໜີ Pilot.</li>
            <li><strong>ຕົວຢ່າງ:</strong> 300 Candidate × 70% ຜ່ານເກນ × 60% ຕິດຕໍ່ໄດ້ = 126 ຮ້ານ. ຕົວເລກ 300/70%/60% ເປັນພຽງຕົວຢ່າງວິທີຄຳນວນ, ບໍ່ແມ່ນຜົນສຳຫຼວດ.</li>
          </ol>
        </div>
        <p className={styles.financialDisclaimer}><strong>ຂໍ້ຈຳກັດ:</strong> BUS-02 1.0 ຍັງບໍ່ກຳນົດ TAM/SAM/SOM ເປັນຕົວເລກລາຍຮັບ. ການຄຳນວນດັ່ງກ່າວຈະເຮັດຫຼັງຈາກ Field audit ລຶບລາຍຊື່ຊ້ຳ, ກວດຮ້ານທີ່ຍັງເປີດ ແລະໄດ້ອັດຕາຕິດຕໍ່ຈິງ.</p>
      </section>

      <section>
        <span>08 · BEACHHEAD MARKET</span>
        <h2>ເລີ່ມໃນບ່ອນນ້ອຍທີ່ມີໂອກາດໃຊ້ຊ້ຳ</h2>
        <div className={styles.feasibilityInputs}>
          <div><b>ພື້ນທີ່</b><p>ນະຄອນຫຼວງວຽງຈັນ. ບໍ່ເປີດຫຼາຍແຂວງພ້ອມກັນ ເພາະຈະເຮັດໃຫ້ຂໍ້ມູນບາງ ແລະຄ່າກວດຂໍ້ມູນສູງ.</p></div>
          <div><b>ໝວດ</b><p>ຮ້ານອາຫານ ແລະຄາເຟ. ສອງໝວດນີ້ມີ Content ຈຳນວນໜຶ່ງ, ການຕັດສິນໃຈເກີດຊ້ຳ ແລະທົດສອບ Map/Call/Message ໄດ້ງ່າຍ.</p></div>
          <div><b>ຂະໜາດທົດສອບ</b><p>100 Place records, 20 ຜູ້ໃຊ້ທົດສອບ ແລະ 30 ຮ້ານທີ່ເຂົ້າຫາ. ຕົວເລກນີ້ແມ່ນຂອບເຂດການຮຽນຮູ້ ບໍ່ແມ່ນການຄາດຄະເນຂະໜາດຕະຫຼາດ.</p></div>
        </div>
      </section>

      <section>
        <span>09 · TWO-SIDED MARKET</span>
        <h2>ຕ້ອງສ້າງທັງຝັ່ງຜູ້ໃຊ້ ແລະຝັ່ງຂໍ້ມູນ</h2>
        <div className={styles.exchangeGrid}>
          <article><b>DEMAND</b><h3>ຜູ້ຊອກຮ້ານ</h3><p>ຈະກັບມາໃຊ້ກໍ່ຕໍ່ເມື່ອມີຕົວເລືອກພໍ, Filter ມີຄວາມໝາຍ ແລະຂໍ້ມູນຖືກຕ້ອງ.</p></article>
          <article><b>PLACE SUPPLY</b><h3>ຮ້ານ ແລະສະຖານທີ່</h3><p>ຕ້ອງມີ Canonical Place record ທີ່ບໍ່ຊ້ຳ, ມີຂໍ້ມູນບັງຄັບ ແລະມີຜູ້ຮັບຜິດຊອບການອັບເດດ.</p></article>
          <article><b>CONTENT SUPPLY</b><h3>Creator ແລະ Source</h3><p>Platform ບໍ່ຄວນລໍຖ້າໃຫ້ Creator ສ້າງ Account ກ່ອນ. Pilot ໃຊ້ Canonical link, Preview ແລະ Attribution ທີ່ໂປ່ງໃສ.</p></article>
          <article><b>PAYING SIDE</b><h3>ຮ້ານທີ່ຕ້ອງການຜົນ</h3><p>ຮ້ານຈ່າຍເມື່ອເຫັນການຕິດຕໍ່ ຫຼືເຈດຕະນາໄປຮ້ານທີ່ວັດໄດ້; ບໍ່ແມ່ນຈ່າຍພຽງເພື່ອມີລາຍຊື່.</p></article>
        </div>
      </section>

      <section>
        <span>10 · POSITIONING</span>
        <h2>ປະໂຫຍກບອກຕຳແໜ່ງຂອງ Product</h2>
        <blockquote className={styles.visionStatement}>ສຳລັບຄົນທີ່ຢາກຫາບ່ອນກິນ ຫຼືບ່ອນໄປໃນລາວ, “ພ້ອມໄປ” ແມ່ນ Platform ຄົ້ນຫາສະຖານທີ່ແບບ Video-first ທີ່ລວມຣີວິວຈາກ Source ຕົ້ນສະບັບກັບຂໍ້ມູນຮ້ານ ແລະປຸ່ມເພື່ອໄປ. ຈຸດຕ່າງບໍ່ແມ່ນການມີວິດີໂອຫຼາຍກວ່າ Social Media, ແຕ່ແມ່ນການຈັດວິດີໂອໃຫ້ຄົ້ນຫາໄດ້ ແລະພາຜູ້ໃຊ້ໄປຮອດການຕັດສິນໃຈ.</blockquote>
      </section>

      <section>
        <span>11 · ຄວາມໄດ້ປຽບທີ່ຕ້ອງສ້າງ</span>
        <h2>ໜ້າ Feed ສາມາດລອກໄດ້ ແຕ່ລະບົບຂໍ້ມູນລອກຍາກກວ່າ</h2>
        <div className={styles.financialMetrics}>
          <article><b>PLACE DATABASE</b><ul><li>ບັນທຶກຮ້ານບໍ່ຊ້ຳ</li><li>Source ແລະວັນກວດລາຍ Field</li><li>Correction history</li></ul></article>
          <article><b>TAXONOMY</b><ul><li>ໝວດ ແລະ Tag ພາສາລາວ</li><li>ຄຳຄົ້ນທີ່ກົງກັບພຶດຕິກຳຈິງ</li><li>Filter ທີ່ຊ່ວຍຕັດສິນໃຈ</li></ul></article>
          <article><b>TRUST & RELATIONSHIP</b><ul><li>Attribution ກັບ Creator</li><li>Workflow ກວດຂໍ້ມູນກັບຮ້ານ</li><li>Sponsored label ທີ່ໂປ່ງໃສ</li></ul></article>
        </div>
      </section>

      <section>
        <span>12 · ຄວາມສ່ຽງ</span>
        <h2>ສິ່ງທີ່ອາດເຮັດໃຫ້ Market thesis ບໍ່ຖືກ</h2>
        <ol className={styles.riskList}>{risks.map(([level, risk, control]) => <li key={level}><b>{level}</b><p>{risk}</p><span>{control}</span></li>)}</ol>
      </section>

      <section>
        <span>13 · EVIDENCE PLAN</span>
        <h2>ສິ່ງທີ່ເຮົາຮູ້ ແລະສິ່ງທີ່ຍັງຄາດ</h2>
        <div className={styles.feasibilityTable} role="table" aria-label="ຫຼັກຖານຕະຫຼາດ">
          <div role="row"><b>ຫົວຂໍ້</b><b>ສະຖານະປັດຈຸບັນ</b><b>ຫຼັກຖານທີ່ຕ້ອງໄດ້</b><b>ນຳໄປຕັດສິນຫຍັງ</b></div>
          <div role="row"><strong>ບັນຫາຜູ້ໃຊ້</strong><p>Founder observation</p><span>20 ການທົດສອບຫາຮ້ານດ້ວຍວິທີເດີມ ແລະ Prototype</span><em>ບັນຫາເຈັບພໍໃຫ້ປ່ຽນພຶດຕິກຳຫຼືບໍ່</em></div>
          <div role="row"><strong>Content supply</strong><p>ພົບຣີວິວຢູ່ຫຼາຍ Platform</p><span>ສ້າງ 100 Place records ແລະນັບ Link ທີ່ໃຊ້ໄດ້ຕໍ່ຮ້ານ</span><em>Cold start ສ້າງໄດ້ໃນຕົ້ນທຶນຮັບໄດ້ຫຼືບໍ່</em></div>
          <div role="row"><strong>Business demand</strong><p>ຍັງບໍ່ມີຫຼັກຖານການຈ່າຍ</p><span>ເຂົ້າຫາ 30 ຮ້ານ; ເປົ້າ 3 ຊຳລະ/ມັດຈຳ + 2 ໜັງສືສະແດງເຈດຈຳນົງ</span><em>Founding Partner ມີຄຸນຄ່າພໍຫຼືບໍ່</em></div>
          <div role="row"><strong>Decision action</strong><p>ຍັງບໍ່ມີ Baseline</p><span>ວັດ Feed → Place → Map/Call/Message ແລະກວດການໄປຮ້ານແບບ Manual</span><em>Platform ພາຄົນໄປເກີນກວ່າການເບິ່ງຫຼືບໍ່</em></div>
        </div>
      </section>

      <section>
        <span>14 · APPROVED PRE-PILOT BASELINE</span>
        <h2>Market thesis ທີ່ອະນຸມັດເພື່ອນຳໄປທົດສອບ</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ບັນຫາຫຼັກແມ່ນຄວາມກະແຈກກະຈາຍຂອງ Content ແລະການຂາດຂໍ້ມູນພ້ອມຕັດສິນໃຈ.</span></li>
          <li><b>02</b><span>“ພ້ອມໄປ” ເປັນຊັ້ນຈັດລະບຽບ ແລະເຊື່ອມຕໍ່; Social, Map ແລະໜ້າຮ້ານເປັນທັງທາງເລືອກ ແລະຄູ່ຮ່ວມ.</span></li>
          <li><b>03</b><span>ຕະຫຼາດເລີ່ມຕົ້ນແມ່ນຮ້ານອາຫານ/ຄາເຟໃນວຽງຈັນ; ບໍ່ເປີດທົ່ວປະເທດໃນ MVP.</span></li>
          <li><b>04</b><span>ຈຸດຕ່າງຕ້ອງວັດຈາກການຄົ້ນຫາງ່າຍຂຶ້ນ ແລະ Decision Action ບໍ່ແມ່ນຍອດເບິ່ງ.</span></li>
          <li><b>05</b><span>ອະນຸມັດ Market thesis ນີ້ເປັນ Pre-Pilot Baseline; ຂໍ້ສະຫຼຸບທີ່ຍັງບໍ່ມີຫຼັກຖານຕ້ອງຮັກສາປ້າຍ “ສົມມຸດຖານ” ແລະອັບເດດເປັນ 1.1 ຫຼັງ Pilot.</span></li>
        </ul>
      </section>

      <section>
        <span>15 · SOURCES & RESEARCH LOG</span>
        <h2>ແຫຼ່ງຂໍ້ມູນ, ສິ່ງທີ່ນຳມາໃຊ້ ແລະວັນກວດ</h2>
        <p className={styles.detailLead}>ທຸກຂໍ້ສະຫຼຸບຈາກພາຍນອກຕ້ອງກັບໄປກວດໄດ້. ວັນກວດຂອງ Source registry ນີ້ແມ່ນ 26 ສິງຫາ 2026; ກ່ອນໃຊ້ຕັດສິນໃຈຄັ້ງໃໝ່ຕ້ອງກວດ Feature ແລະຕົວເລກອີກຄັ້ງ.</p>
        <div className={styles.sourceRegistry}>
          {researchSources.map(([id, title, usage, url]) => <article key={id}><b>{id}</b><div><h3>{title}</h3><p>{usage}</p><a href={url} target="_blank" rel="noreferrer">ເປີດແຫຼ່ງຕົ້ນສະບັບ ↗</a></div></article>)}
        </div>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>ອະນຸມັດແລ້ວ</span><h2>Market & Competitor Analysis 1.0</h2></div>
        <ul><li>Market definition — ອະນຸມັດ</li><li>User behavior hypothesis — ອະນຸມັດເພື່ອທົດສອບ</li><li>Named competitor baseline — ອະນຸມັດ</li><li>Market gap and positioning — ອະນຸມັດ</li><li>Evidence plan — ອະນຸມັດສຳລັບ Pilot</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/product-vision`}><small>← ເອກະສານຕົ້ນທາງ</small><strong>ວິໄສທັດຜະລິດຕະພັນ</strong></a>
        <a href={`${basePath}/documents/business-canvas`}><small>ເອກະສານຕໍ່ໄປ →</small><strong>ແຜນພາບທຸລະກິດ</strong></a>
      </nav>
    </article>
  );
}
