import styles from "../documents.module.css";
import BusinessDocumentDeepDive from "./BusinessDocumentDeepDive";

const principles = [
  ["Video-first", "ວິດີໂອແນວຕັ້ງເຕັມຈໍເປັນຈຸດເລີ່ມຕົ້ນ ເພາະຜູ້ໃຊ້ຕັດສິນຄວາມສົນໃຈຈາກພາບກ່ອນ."],
  ["Place-first data", "ທຸກ content ຕ້ອງເຊື່ອມກັບ place ທີ່ຄົ້ນຫາ, ປຽບທຽບ ແລະກວດສອບໄດ້."],
  ["Decision-ready", "ລາຄາ, ເວລາ, ແຜນທີ່, ເບີໂທ ແລະຂໍ້ມູນຈຳເປັນຕ້ອງຢູ່ໃກ້ກັບ video."],
  ["Source-transparent", "ຜູ້ໃຊ້ຕ້ອງເຫັນ creator, platform ຕົ້ນສະບັບ, ວັນທີ ແລະ sponsored label ຢ່າງຊັດເຈນ."],
  ["Contact-first MVP", "ໄລຍະທຳອິດ platform ພາຜູ້ໃຊ້ໄປຫາ map, call ຫຼື message; ບໍ່ສ້າງ booking ເອງ."],
  ["Simple before AI", "ເລີ່ມຈາກ category, filter ແລະ rule-based recommendation ກ່ອນເພີ່ມ AI ເມື່ອມີຂໍ້ມູນພໍ."],
];

const scope = [
  "Full-screen vertical discovery feed",
  "Launch ທີ່ວຽງຈັນ ໂດຍເນັ້ນໝວດອາຫານ ແລະຄາເຟ",
  "Place Page ທີ່ມີ map, contact, hours, price range, tags ແລະວັນກວດສອບ",
  "Link ຫາ content ແລະ creator ຕົ້ນສະບັບ",
  "Search, filter, save ແລະ share",
  "Guest-first: ເຂົ້າໃຊ້ໄດ້ໂດຍບໍ່ສ້າງ account ແລະ save ໃນອຸປະກອນ",
  "Admin workflow ສຳລັບກວດ place data ແລະ moderation",
  "Analytics ຕັ້ງແຕ່ video view ຫາ map/call/message click",
];

const nonGoals = [
  "ບໍ່ຮັບຈອງ ຫຼືຮັບຊຳລະເງິນໃນ MVP",
  "ບໍ່ດາວໂຫຼດແລະເກັບວິດີໂອຂອງ creator ໂດຍບໍ່ມີສິດ",
  "ບໍ່ສ້າງ social network ທີ່ແຂ່ງຂັນດ້ວຍ follower ແລະ watch time",
  "ບໍ່ມີ comment, follower ແລະ community feature ໃນ MVP",
  "ບໍ່ເລີ່ມດ້ວຍ AI ທີ່ຊັບຊ້ອນກ່ອນພິສູດຄຸນນະພາບ data",
  "ບໍ່ເປີດ creator marketplace ແລະ affiliate ຈົນກວ່າຈະມີ traffic ທີ່ວັດແທກໄດ້",
  "ບໍ່ເປີດທົ່ວປະເທດພ້ອມກັນ; ທີ່ພັກ ແລະບ່ອນທ່ຽວເປັນ Phase 2",
];

export default function ProductVisionDocument({ basePath }: { basePath: string }) {
  return (
    <article className={`${styles.detailBody} ${styles.visionBody} ${styles.businessDocument}`}>
      <section className={styles.documentControl}>
        <div><small>VERSION</small><strong>1.0</strong></div>
        <div><small>STATUS</small><strong>Approved</strong></div>
        <div><small>UPDATED</small><strong>25 ສິງຫາ 2026</strong></div>
        <div><small>DECISION OWNER</small><strong>Founder / Product</strong></div>
      </section>

      <BusinessDocumentDeepDive code="BUS-01" />

      <section>
        <span>01 · VISION STATEMENT</span>
        <h2>ວິໄສທັດ</h2>
        <blockquote className={styles.visionStatement}>
          “ພ້ອມໄປ” ແມ່ນ platform ຄົ້ນຫາສະຖານທີ່ໃນລາວແບບ video-first
          ທີ່ຮວບຮວມຣີວິວຈາກ social media ແລະເຊື່ອມກັບຂໍ້ມູນສະຖານທີ່,
          ແຜນທີ່ ແລະການຕິດຕໍ່—ເພື່ອພາຜູ້ໃຊ້ຈາກ “ເຫັນແລ້ວສົນໃຈ”
          ໄປສູ່ “ຮູ້ພໍທີ່ຈະໄປ”.
        </blockquote>
      </section>

      <section>
        <span>02 · PROBLEM</span>
        <h2>ບັນຫາທີ່ຈະແກ້</h2>
        <div className={styles.problemCards}>
          <div><b>01</b><h3>Review ກະແຈກກະຈາຍ</h3><p>Content ຢູ່ໃນ TikTok, Facebook ແລະ YouTube; ຜູ້ໃຊ້ຕ້ອງຄົ້ນຫາຊ້ຳໆ.</p></div>
          <div><b>02</b><h3>Video ຂາດ decision data</h3><p>ເບິ່ງແລ້ວຍັງຕ້ອງອອກໄປຊອກ map, ເວລາ, ລາຄາ ແລະການຕິດຕໍ່ຢູ່ບ່ອນອື່ນ.</p></div>
          <div><b>03</b><h3>Place data ບໍ່ມີມາດຕະຖານ</h3><p>ຂໍ້ມູນອາດເກົ່າ, ບໍ່ຄົບ ຫຼືບໍ່ຮູ້ວັນທີກວດສອບຄັ້ງຫຼ້າສຸດ.</p></div>
          <div><b>04</b><h3>Social feed ພາໄປຫາ video ຕໍ່ໄປ</h3><p>ເປົ້າໝາຍຂອງ feed ເດີມແມ່ນ engagement; ບໍ່ແມ່ນການຊ່ວຍໃຫ້ການຕັດສິນໃຈສຳເລັດ.</p></div>
        </div>
      </section>

      <section>
        <span>03 · TARGET USERS</span>
        <h2>ຜູ້ໃຊ້ເປົ້າໝາຍ</h2>
        <div className={styles.userGroups}>
          <article><small>PRIMARY · LAUNCH</small><h3>ຜູ້ຊອກຮ້ານໃນວຽງຈັນ</h3><p>ຄົນລາວທີ່ໃຊ້ TikTok, Facebook ຫຼື YouTube ເພື່ອຊອກຮ້ານອາຫານ ແລະຄາເຟ.</p></article>
          <article><small>SUPPLY SIDE</small><h3>Place Owner ແລະ Creator</h3><p>ຮ້ານທີ່ຕ້ອງການ traffic ທີ່ວັດໄດ້ ແລະ creator ທີ່ຕ້ອງການ attribution ທີ່ຖືກຕ້ອງ.</p></article>
          <article><small>FUTURE</small><h3>ນັກທ່ອງທ່ຽວ</h3><p>ຜູ້ເດີນທາງພາຍໃນ ແລະຕ່າງປະເທດ ລວມເຖິງທີ່ພັກ ແລະຜູ້ປະກອບການທ່ອງທ່ຽວໃນ Phase 2.</p></article>
        </div>
      </section>

      <section>
        <span>04 · VALUE PROPOSITION</span>
        <h2>ຄຸນຄ່າຫຼັກ</h2>
        <div className={styles.valueFlow}>
          <div><b>DISCOVER</b><strong>ເຫັນຂອງຈິງ</strong><p>Video ຊ່ວຍໃຫ້ຮູ້ບັນຍາກາດ, ອາຫານ ຫຼືສະພາບສະຖານທີ່.</p></div>
          <i>→</i>
          <div><b>DECIDE</b><strong>ຮູ້ພໍທີ່ຈະເລືອກ</strong><p>Place data ຊ່ວຍກວດລາຄາ, ເວລາ, ໄລຍະຫ່າງ ແລະຄວາມເໝາະສົມ.</p></div>
          <i>→</i>
          <div><b>ACT</b><strong>ໄປໄດ້ທັນທີ</strong><p>Map, call ແລະ message ພາຜູ້ໃຊ້ໄປຫາສະຖານທີ່ໂດຍກົງ.</p></div>
        </div>
      </section>

      <section>
        <span>05 · PRODUCT PRINCIPLES</span>
        <h2>ຫຼັກການຂອງຜະລິດຕະພັນ</h2>
        <ol className={styles.principleList}>
          {principles.map(([title, description], index) => <li key={title}><b>0{index + 1}</b><div><strong>{title}</strong><p>{description}</p></div></li>)}
        </ol>
      </section>

      <section>
        <span>06 · MVP BOUNDARY</span>
        <h2>ຂອບເຂດ MVP</h2>
        <div className={styles.scopeColumns}>
          <div><h3>IN SCOPE</h3><ul>{scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>NOT YET</h3><ul>{nonGoals.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section>
        <span>07 · DIFFERENTIATION</span>
        <h2>ຈຸດຕ່າງຈາກ Social Media</h2>
        <div className={styles.comparison} role="table" aria-label="ປຽບທຽບ social media ກັບ ພ້ອມໄປ">
          <div role="row"><b>ຫົວຂໍ້</b><b>Social feed ທົ່ວໄປ</b><b>ພ້ອມໄປ</b></div>
          <div role="row"><span>ເປົ້າໝາຍ</span><span>Watch ແລະ engagement</span><strong>Decide ແລະ go</strong></div>
          <div role="row"><span>ໂຄງສ້າງ</span><span>ຈັດຕາມ creator/content</span><strong>ຈັດຕາມ place/category</strong></div>
          <div role="row"><span>Place data</span><span>ມີບາງ video</span><strong>ເປັນມາດຕະຖານບັງຄັບ</strong></div>
          <div role="row"><span>Action</span><span>ໄປຫາ content ຕໍ່ໄປ</span><strong>Map, call, message</strong></div>
          <div role="row"><span>ຄວາມໂປ່ງໃສ</span><span>ຂຶ້ນກັບແຕ່ລະ post</span><strong>Source, date, verification, sponsor label</strong></div>
        </div>
      </section>

      <section>
        <span>08 · BUSINESS ALIGNMENT</span>
        <h2>ຄວາມສອດຄ່ອງກັບລາຍຮັບ</h2>
        <div className={styles.revenuePath}>
          <div><b>LAUNCH</b><h3>Basic listing + Founding Partner</h3><p>ສ້າງ supply ແລະພິສູດວ່າຮ້ານຍອມຈ່າຍ.</p></div>
          <div><b>GROWTH</b><h3>Pro Business + Sponsored placement</h3><p>ເກັບຄ່າບໍລິການເມື່ອພິສູດ traffic ແລະ contact intent ໄດ້.</p></div>
          <div><b>SCALE</b><h3>Creator marketplace + Affiliate</h3><p>ເພີ່ມ transaction revenue ກ່ອນພິຈາລະນາ booking ຂອງ platform.</p></div>
        </div>
      </section>

      <section>
        <span>09 · ASSUMPTIONS & RISKS</span>
        <h2>ສົມມຸດຖານທີ່ຕ້ອງພິສູດ</h2>
        <ol className={styles.riskList}>
          <li><b>CONTENT</b><p>ສາມາດຫາ link ຣີວິວທີ່ມີຄຸນນະພາບໄດ້ພໍສຳລັບ cold start.</p><span>ທົດສອບ: ສ້າງ inventory 100–200 places ໃນວຽງຈັນ</span></li>
          <li><b>USAGE</b><p>ຜູ້ໃຊ້ຈະເລືອກ search/category ທີ່ຈັດລຽງແລ້ວ ແທນການຄົ້ນໃນຫຼາຍ social app.</p><span>ທົດສອບ: prototype ແລະ concierge MVP</span></li>
          <li><b>DATA</b><p>Place owner ແລະ admin ສາມາດຮັກສາຂໍ້ມູນໃຫ້ທັນສະໄໝໄດ້.</p><span>ທົດສອບ: freshness workflow 30–60 ມື້</span></li>
          <li><b>REVENUE</b><p>ທຸລະກິດຈະຍອມຈ່າຍເມື່ອເຫັນ map, call ແລະ message click ທີ່ວັດໄດ້.</p><span>ທົດສອບ: pre-sell 5–10 founding partners</span></li>
          <li><b>RIGHTS</b><p>ການໃຊ້ link, preview ແລະ attribution ຕ້ອງບໍ່ລະເມີດສິດຂອງ creator ແລະ platform ຕົ້ນສະບັບ.</p><span>ທົດສອບ: legal/link policy ແລະ takedown process</span></li>
        </ol>
      </section>

      <section>
        <span>10 · SUCCESS SIGNALS</span>
        <h2>ຫຼັກຖານວ່າ Vision ຖືກທາງ</h2>
        <div className={styles.signalGrid}>
          {["ຈຳນວນ place ທີ່ກວດສອບແລ້ວ", "ອັດຕາ Video → Place Page", "Map / Call / Message click", "ຜູ້ໃຊ້ທີ່ກັບມາຊ້ຳ", "Place owner ທີ່ claim profile", "ທຸລະກິດທີ່ຍອມຈ່າຍ"].map((item, index) => <div key={item}><b>0{index + 1}</b><p>{item}</p></div>)}
        </div>
        <p className={styles.metricNote}>ຄ່າເປົ້າໝາຍແບບຕົວເລກຈະຖືກກຳນົດຫຼັງຈາກ Feasibility Study ແລະ Financial Structure.</p>
      </section>

      <section>
        <span>11 · DECISIONS</span>
        <h2>ສິ່ງທີ່ຕັດສິນໃຈແລ້ວ</h2>
        <ul className={styles.decisionList}>
          <li><b>✓</b><span>ໃຊ້ full-screen vertical video feed ເປັນ discovery experience.</span></li>
          <li><b>✓</b><span>ຈັດ content ຕາມ place ແລະ category ຢ່າງມີມາດຕະຖານ.</span></li>
          <li><b>✓</b><span>ເຊື່ອມຫາ content ຕົ້ນສະບັບ ແລະບໍ່ນຳວິດີໂອມາເກັບໂດຍບໍ່ມີສິດ.</span></li>
          <li><b>✓</b><span>MVP ໃຫ້ຜູ້ໃຊ້ຕິດຕໍ່ place owner ໂດຍກົງ; ບໍ່ເຮັດ booking.</span></li>
          <li><b>✓</b><span>ລາຍຮັບໃນອະນາຄົດມາຈາກ Pro, sponsored, creator marketplace ແລະ affiliate.</span></li>
          <li><b>✓</b><span>Launch market ແມ່ນວຽງຈັນ; primary categories ແມ່ນອາຫານ ແລະຄາເຟ.</span></li>
          <li><b>✓</b><span>Platform ເປັນ owner ຂອງ canonical place record; place owner ສະເໜີແກ້ໄຂ ແລະ admin ອະນຸມັດ.</span></li>
          <li><b>✓</b><span>ແຍກປ້າຍ Source linked, Place verified ແລະ Sponsored ອອກຈາກກັນ.</span></li>
          <li><b>✓</b><span>“ພ້ອມໄປ” ຍັງເປັນ working name ຈົນກວ່າຈະກວດ domain, social handle ແລະຊື່ທາງການ.</span></li>
        </ul>
      </section>

      <section>
        <span>12 · APPROVED LAUNCH MODEL</span>
        <h2>ຂໍ້ສະຫຼຸບສຳລັບ Launch</h2>
        <ol className={styles.openQuestions}>
          <li><b>01</b><p>ເລີ່ມທີ່ວຽງຈັນ ດ້ວຍອາຫານ ແລະຄາເຟ; 100–200 places ເປັນສົມມຸດຖານສຳລັບ Feasibility.</p></li>
          <li><b>02</b><p>ໃຊ້ 3 ສະຖານະທີ່ບໍ່ປົນກັນ: Source linked, Place verified ແລະ Sponsored.</p></li>
          <li><b>03</b><p>ເກັບ canonical URL, ໃຊ້ official embed/preview ເມື່ອອະນຸຍາດ, ບໍ່ re-host video ແລະມີ takedown process.</p></li>
          <li><b>04</b><p>Platform ຮັກສາ canonical data; place owner ສະເໜີ, admin ອະນຸມັດ ແລະທຸກ field ມີ source/verified date.</p></li>
          <li><b>05</b><p>“ພ້ອມໄປ” ເປັນ working name ຈົນກວ່າຈະຜ່ານ brand, domain ແລະ legal checks.</p></li>
        </ol>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>APPROVAL RECORDED</span><h2>Product Vision 1.0</h2></div>
        <ul><li>Vision statement — Approved</li><li>Target users — Approved</li><li>Product principles — Approved</li><li>MVP scope / non-goals — Approved</li><li>Launch model — Approved</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານຕໍ່ໄປ">
        <span />
        <a href={`${basePath}/documents/market-competitor`}><small>NEXT DOCUMENT →</small><strong>ຕະຫຼາດ ແລະຄູ່ແຂ່ງ</strong></a>
      </nav>
    </article>
  );
}
