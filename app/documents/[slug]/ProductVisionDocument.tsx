import styles from "../documents.module.css";

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
  "ການຈັດໝວດ: ອາຫານ, ຄາເຟ, ທີ່ພັກ ແລະສະຖານທີ່ທ່ອງທ່ຽວ",
  "Place Page ທີ່ມີ map, contact, hours, price range, tags ແລະວັນກວດສອບ",
  "Link ຫາ content ແລະ creator ຕົ້ນສະບັບ",
  "Search, filter, save ແລະ share",
  "Admin workflow ສຳລັບກວດ place data ແລະ moderation",
  "Analytics ຕັ້ງແຕ່ video view ຫາ map/call/message click",
];

const nonGoals = [
  "ບໍ່ຮັບຈອງ ຫຼືຮັບຊຳລະເງິນໃນ MVP",
  "ບໍ່ດາວໂຫຼດແລະເກັບວິດີໂອຂອງ creator ໂດຍບໍ່ມີສິດ",
  "ບໍ່ສ້າງ social network ທີ່ແຂ່ງຂັນດ້ວຍ follower ແລະ watch time",
  "ບໍ່ເລີ່ມດ້ວຍ AI ທີ່ຊັບຊ້ອນກ່ອນພິສູດຄຸນນະພາບ data",
  "ບໍ່ເປີດ creator marketplace ແລະ affiliate ຈົນກວ່າຈະມີ traffic ທີ່ວັດແທກໄດ້",
];

export default function ProductVisionDocument({ basePath }: { basePath: string }) {
  return (
    <article className={`${styles.detailBody} ${styles.visionBody}`}>
      <section className={styles.documentControl}>
        <div><small>VERSION</small><strong>0.1</strong></div>
        <div><small>STATUS</small><strong>Draft for review</strong></div>
        <div><small>UPDATED</small><strong>25 ສິງຫາ 2026</strong></div>
        <div><small>DECISION OWNER</small><strong>Founder / Product</strong></div>
      </section>

      <section>
        <span>01 · VISION STATEMENT</span>
        <h2>ວິໄສທັດ</h2>
        <blockquote className={styles.visionStatement}>
          “ພ້ອມໄປ” ຈະປ່ຽນວິດີໂອຣີວິວທີ່ກະແຈກກະຈາຍໃນ social media
          ໃຫ້ເປັນຂໍ້ມູນທີ່ຄົ້ນຫາໄດ້, ໜ້າເຊື່ອຖື ແລະພ້ອມສຳລັບການຕັດສິນໃຈ—
          ເພື່ອໃຫ້ຜູ້ໃຊ້ເຮັດທຸກຢ່າງກ່ອນອອກເດີນທາງ ແລະເຫຼືອພຽງແຕ່ “ໄປ”.
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
          <article><small>PRIMARY</small><h3>ຜູ້ຊອກຫາບ່ອນໄປ</h3><p>ຄົນລາວທີ່ໃຊ້ມືຖືເພື່ອຊອກຮ້ານອາຫານ, ຄາເຟ, ທີ່ພັກ ແລະບ່ອນທ່ຽວ.</p></article>
          <article><small>SECONDARY</small><h3>ນັກທ່ອງທ່ຽວ</h3><p>ຜູ້ເດີນທາງພາຍໃນ ແລະຕ່າງປະເທດທີ່ຕ້ອງການຂໍ້ມູນສັ້ນ, ເຫັນພາບ ແລະໄປເຖິງໄດ້.</p></article>
          <article><small>ECOSYSTEM</small><h3>Place owner ແລະ Creator</h3><p>ຮ້ານ/ສະຖານທີ່ທີ່ຕ້ອງການ traffic ທີ່ວັດໄດ້ ແລະ creator ທີ່ຕ້ອງການການອ້າງອີງທີ່ຖືກຕ້ອງ.</p></article>
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
          <li><b>CONTENT</b><p>ສາມາດຫາ link ຣີວິວທີ່ມີຄຸນນະພາບໄດ້ພໍສຳລັບ cold start.</p><span>ທົດສອບ: ສ້າງ inventory ຂອງ 1 ເມືອງ</span></li>
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
        </ul>
      </section>

      <section>
        <span>12 · OPEN QUESTIONS</span>
        <h2>ສິ່ງທີ່ຕ້ອງຕັດສິນໃຈຕໍ່</h2>
        <ol className={styles.openQuestions}>
          <li><b>01</b><p>ເມືອງ ແລະ category ໃດຄວນເປັນ launch market?</p></li>
          <li><b>02</b><p>ມາດຕະຖານໃດຈະໃຊ້ຕັດສິນວ່າ content ແລະ place ຜ່ານການກວດສອບ?</p></li>
          <li><b>03</b><p>Preview ແລະ link ຮູບແບບໃດທີ່ຖືກຕ້ອງທາງສິດ ແລະຍັງໃຊ້ງານງ່າຍ?</p></li>
          <li><b>04</b><p>ໃຜຈະເປັນ owner ຂອງ place data ແລະຮັບຜິດຊອບການກວດຄືນ?</p></li>
          <li><b>05</b><p>“ພ້ອມໄປ” ເປັນຊື່ທາງການ ຫຼືເປັນ working name?</p></li>
        </ol>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>REVIEW GATE</span><h2>ສິ່ງທີ່ຕ້ອງອະນຸມັດ</h2></div>
        <ul><li>Vision statement</li><li>Target users</li><li>Product principles</li><li>MVP scope / non-goals</li><li>Open questions ທີ່ຕ້ອງວິໄຈ</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານຕໍ່ໄປ">
        <span />
        <a href={`${basePath}/documents/market-competitor`}><small>NEXT →</small><strong>ຕະຫຼາດ ແລະ ຄູ່ແຂ່ງ</strong></a>
      </nav>
    </article>
  );
}

