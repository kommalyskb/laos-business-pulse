import styles from "../documents.module.css";
import BusinessDocumentDeepDive from "./BusinessDocumentDeepDive";

const alternatives = [
  ["TikTok / Facebook / YouTube", "ວິດີໂອຫຼາຍ, ເຂົ້າເຖິງງ່າຍ ແລະມີ Creator ຢູ່ແລ້ວ", "ຂໍ້ມູນກະແຈກກະຈາຍ, ຄົ້ນຫາຊ້ຳຍາກ ແລະຂາດຂໍ້ມູນຮ້ານທີ່ເປັນມາດຕະຖານ", "ໃຊ້ເປັນ Source ແລະສົ່ງ Traffic ກັບຄືນ; ບໍ່ແຂ່ງຂັນດ້ານ Creator feed"],
  ["Map ແລະ Search", "ເກັ່ງດ້ານພິກັດ, ເສັ້ນທາງ, ເວລາ ແລະຂໍ້ມູນພື້ນຖານ", "ປະສົບການຄົ້ນພົບບໍ່ໄດ້ເນັ້ນວິດີໂອຣີວິວຈາກ Creator ທ້ອງຖິ່ນ", "ໃຊ້ເປັນປາຍທາງຂອງປຸ່ມແຜນທີ່ ແລະຊ່ວຍກວດ Location"],
  ["Website Directory / Portal", "ຈັດຂໍ້ມູນເປັນໝວດ ແລະມີໜ້າສະຖານທີ່", "ຫຼາຍແຫ່ງສື່ສານແບບຂໍ້ຄວາມ ຫຼືຄຳໂຄສະນາ ແລະບໍ່ໄດ້ຈັດວິດີໂອຣີວິວເປັນຫຼັກ", "ຮຽນຮູ້ຈາກໂຄງສ້າງຂໍ້ມູນ ແຕ່ສ້າງ Flow ແບບ Video → Place → Action"],
  ["ໜ້າ Social ຂອງຮ້ານ", "ຮ້ານສາມາດອັບເດດເບີໂທ, ເວລາ ແລະໂປຣໂມຊັນໄດ້ໂດຍກົງ", "ຜູ້ໃຊ້ຕ້ອງຮູ້ຈັກຊື່ຮ້ານກ່ອນ ແລະຂໍ້ມູນອາດປົນກັບໂຄສະນາ", "ໃຊ້ເປັນ Source ສຳລັບຂໍ້ມູນທາງການ ແລະຊ່ອງທາງ Message"],
  ["“ພ້ອມໄປ”", "ວິດີໂອຣີວິວ + ຂໍ້ມູນ Place + ປຸ່ມການກະທຳໃນ Flow ດຽວ", "ຕ້ອງສ້າງຂໍ້ມູນເລີ່ມຕົ້ນ, ຮັກສາຄວາມສົດໃໝ່ ແລະພຶ່ງພາ Link/Preview ຈາກພາຍນອກ", "ຊະນະດ້ວຍການຈັດລະບຽບ, ຄວາມໂປ່ງໃສ ແລະຄວາມສະດວກໃນການຕັດສິນໃຈ"],
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
        <div><small>ສະບັບ</small><strong>0.1</strong></div>
        <div><small>ສະຖານະ</small><strong>ຮ່າງສຳລັບທົບທວນ</strong></div>
        <div><small>ວັນທີປັບປຸງ</small><strong>26 ສິງຫາ 2026</strong></div>
        <div><small>ຂໍ້ມູນຕົ້ນທາງ</small><strong>Vision 1.0 + Founder observations</strong></div>
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
        <span>07 · BEACHHEAD MARKET</span>
        <h2>ເລີ່ມໃນບ່ອນນ້ອຍທີ່ມີໂອກາດໃຊ້ຊ້ຳ</h2>
        <div className={styles.feasibilityInputs}>
          <div><b>ພື້ນທີ່</b><p>ນະຄອນຫຼວງວຽງຈັນ. ບໍ່ເປີດຫຼາຍແຂວງພ້ອມກັນ ເພາະຈະເຮັດໃຫ້ຂໍ້ມູນບາງ ແລະຄ່າກວດຂໍ້ມູນສູງ.</p></div>
          <div><b>ໝວດ</b><p>ຮ້ານອາຫານ ແລະຄາເຟ. ສອງໝວດນີ້ມີ Content ຈຳນວນໜຶ່ງ, ການຕັດສິນໃຈເກີດຊ້ຳ ແລະທົດສອບ Map/Call/Message ໄດ້ງ່າຍ.</p></div>
          <div><b>ຂະໜາດທົດສອບ</b><p>100 Place records, 20 ຜູ້ໃຊ້ທົດສອບ ແລະ 30 ຮ້ານທີ່ເຂົ້າຫາ. ຕົວເລກນີ້ແມ່ນຂອບເຂດການຮຽນຮູ້ ບໍ່ແມ່ນການຄາດຄະເນຂະໜາດຕະຫຼາດ.</p></div>
        </div>
      </section>

      <section>
        <span>08 · TWO-SIDED MARKET</span>
        <h2>ຕ້ອງສ້າງທັງຝັ່ງຜູ້ໃຊ້ ແລະຝັ່ງຂໍ້ມູນ</h2>
        <div className={styles.exchangeGrid}>
          <article><b>DEMAND</b><h3>ຜູ້ຊອກຮ້ານ</h3><p>ຈະກັບມາໃຊ້ກໍ່ຕໍ່ເມື່ອມີຕົວເລືອກພໍ, Filter ມີຄວາມໝາຍ ແລະຂໍ້ມູນຖືກຕ້ອງ.</p></article>
          <article><b>PLACE SUPPLY</b><h3>ຮ້ານ ແລະສະຖານທີ່</h3><p>ຕ້ອງມີ Canonical Place record ທີ່ບໍ່ຊ້ຳ, ມີຂໍ້ມູນບັງຄັບ ແລະມີຜູ້ຮັບຜິດຊອບການອັບເດດ.</p></article>
          <article><b>CONTENT SUPPLY</b><h3>Creator ແລະ Source</h3><p>Platform ບໍ່ຄວນລໍຖ້າໃຫ້ Creator ສ້າງ Account ກ່ອນ. Pilot ໃຊ້ Canonical link, Preview ແລະ Attribution ທີ່ໂປ່ງໃສ.</p></article>
          <article><b>PAYING SIDE</b><h3>ຮ້ານທີ່ຕ້ອງການຜົນ</h3><p>ຮ້ານຈ່າຍເມື່ອເຫັນການຕິດຕໍ່ ຫຼືເຈດຕະນາໄປຮ້ານທີ່ວັດໄດ້; ບໍ່ແມ່ນຈ່າຍພຽງເພື່ອມີລາຍຊື່.</p></article>
        </div>
      </section>

      <section>
        <span>09 · POSITIONING</span>
        <h2>ປະໂຫຍກບອກຕຳແໜ່ງຂອງ Product</h2>
        <blockquote className={styles.visionStatement}>ສຳລັບຄົນທີ່ຢາກຫາບ່ອນກິນ ຫຼືບ່ອນໄປໃນລາວ, “ພ້ອມໄປ” ແມ່ນ Platform ຄົ້ນຫາສະຖານທີ່ແບບ Video-first ທີ່ລວມຣີວິວຈາກ Source ຕົ້ນສະບັບກັບຂໍ້ມູນຮ້ານ ແລະປຸ່ມເພື່ອໄປ. ຈຸດຕ່າງບໍ່ແມ່ນການມີວິດີໂອຫຼາຍກວ່າ Social Media, ແຕ່ແມ່ນການຈັດວິດີໂອໃຫ້ຄົ້ນຫາໄດ້ ແລະພາຜູ້ໃຊ້ໄປຮອດການຕັດສິນໃຈ.</blockquote>
      </section>

      <section>
        <span>10 · ຄວາມໄດ້ປຽບທີ່ຕ້ອງສ້າງ</span>
        <h2>ໜ້າ Feed ສາມາດລອກໄດ້ ແຕ່ລະບົບຂໍ້ມູນລອກຍາກກວ່າ</h2>
        <div className={styles.financialMetrics}>
          <article><b>PLACE DATABASE</b><ul><li>ບັນທຶກຮ້ານບໍ່ຊ້ຳ</li><li>Source ແລະວັນກວດລາຍ Field</li><li>Correction history</li></ul></article>
          <article><b>TAXONOMY</b><ul><li>ໝວດ ແລະ Tag ພາສາລາວ</li><li>ຄຳຄົ້ນທີ່ກົງກັບພຶດຕິກຳຈິງ</li><li>Filter ທີ່ຊ່ວຍຕັດສິນໃຈ</li></ul></article>
          <article><b>TRUST & RELATIONSHIP</b><ul><li>Attribution ກັບ Creator</li><li>Workflow ກວດຂໍ້ມູນກັບຮ້ານ</li><li>Sponsored label ທີ່ໂປ່ງໃສ</li></ul></article>
        </div>
      </section>

      <section>
        <span>11 · ຄວາມສ່ຽງ</span>
        <h2>ສິ່ງທີ່ອາດເຮັດໃຫ້ Market thesis ບໍ່ຖືກ</h2>
        <ol className={styles.riskList}>{risks.map(([level, risk, control]) => <li key={level}><b>{level}</b><p>{risk}</p><span>{control}</span></li>)}</ol>
      </section>

      <section>
        <span>12 · ຫຼັກຖານທີ່ຕ້ອງເກັບ</span>
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
        <span>13 · ຂໍ້ສະຫຼຸບສຳລັບທົບທວນ</span>
        <h2>Market thesis ສະບັບຮ່າງ</h2>
        <ul className={styles.decisionList}>
          <li><b>01</b><span>ບັນຫາຫຼັກແມ່ນຄວາມກະແຈກກະຈາຍຂອງ Content ແລະການຂາດຂໍ້ມູນພ້ອມຕັດສິນໃຈ.</span></li>
          <li><b>02</b><span>“ພ້ອມໄປ” ເປັນຊັ້ນຈັດລະບຽບ ແລະເຊື່ອມຕໍ່; Social, Map ແລະໜ້າຮ້ານເປັນທັງທາງເລືອກ ແລະຄູ່ຮ່ວມ.</span></li>
          <li><b>03</b><span>ຕະຫຼາດເລີ່ມຕົ້ນແມ່ນຮ້ານອາຫານ/ຄາເຟໃນວຽງຈັນ; ບໍ່ເປີດທົ່ວປະເທດໃນ MVP.</span></li>
          <li><b>04</b><span>ຈຸດຕ່າງຕ້ອງວັດຈາກການຄົ້ນຫາງ່າຍຂຶ້ນ ແລະ Decision Action ບໍ່ແມ່ນຍອດເບິ່ງ.</span></li>
          <li><b>05</b><span>ຂໍ້ສະຫຼຸບທາງຕະຫຼາດຍັງເປັນສົມມຸດຖານຈົນກວ່າ Pilot ຈະໃຫ້ຫຼັກຖານຈາກຜູ້ໃຊ້ ແລະຮ້ານຈິງ.</span></li>
        </ul>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>ລໍຖ້າການທົບທວນ</span><h2>Market & Competitor Analysis 0.1</h2></div>
        <ul><li>Market definition — ຮ່າງແລ້ວ</li><li>User behavior — ຮ່າງແລ້ວ</li><li>Alternatives and competitors — ຮ່າງແລ້ວ</li><li>Market gap and positioning — ຮ່າງແລ້ວ</li><li>Evidence plan — ລໍຖ້າທົບທວນ</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/product-vision`}><small>← ເອກະສານຕົ້ນທາງ</small><strong>ວິໄສທັດຜະລິດຕະພັນ</strong></a>
        <a href={`${basePath}/documents/business-canvas`}><small>ເອກະສານຕໍ່ໄປ →</small><strong>ແຜນພາບທຸລະກິດ</strong></a>
      </nav>
    </article>
  );
}
