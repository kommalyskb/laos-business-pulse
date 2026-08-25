import styles from "../documents.module.css";
import BusinessDocumentReaderGuide from "./BusinessDocumentReaderGuide";

const assumptions = [
  ["Demand", "ຜູ້ໃຊ້ຈະເລືອກ feed ທີ່ຈັດຕາມ place/category ແທນການຄົ້ນຊ້ຳໃນຫຼາຍ social app.", "Prototype + concierge MVP", "Video → Place Page"],
  ["Supply", "ສາມາດສ້າງ inventory 100–200 ຮ້ານອາຫານ/ຄາເຟໃນວຽງຈັນທີ່ຂໍ້ມູນຄົບ.", "Manual curation sprint", "Verified places"],
  ["Payment", "Place owner ຈະຍອມຈ່າຍເມື່ອເຫັນ map, call ແລະ message intent ທີ່ວັດໄດ້.", "Pre-sell founding package", "5–10 paying partners"],
  ["Content rights", "Canonical link, official embed/preview ແລະ attribution ສາມາດໃຊ້ໄດ້ຢ່າງຍືນຍົງ.", "Policy + creator outreach", "Low takedown rate"],
  ["Economics", "ລາຍຮັບຈາກ partner ແລະ campaign ສາມາດຮອງຮັບ hosting ແລະ data operation.", "Cost model + pilot", "Contribution margin"],
];

export default function BusinessCanvasDocument({ basePath }: { basePath: string }) {
  return (
    <article className={`${styles.detailBody} ${styles.canvasBody}`}>
      <section className={styles.documentControl}>
        <div><small>VERSION</small><strong>1.0</strong></div>
        <div><small>STATUS</small><strong>Approved</strong></div>
        <div><small>UPDATED</small><strong>25 ສິງຫາ 2026</strong></div>
        <div><small>INPUT</small><strong>Product Vision 1.0</strong></div>
      </section>

      <BusinessDocumentReaderGuide code="BUS-03" />

      <section>
        <span>01 · BUSINESS MODEL STATEMENT</span>
        <h2>ແນວຄິດທາງທຸລະກິດ</h2>
        <blockquote className={styles.canvasStatement}>
          “ພ້ອມໄປ” ສ້າງຄຸນຄ່າໃຫ້ຜູ້ໃຊ້ດ້ວຍການຄົ້ນຫາສະຖານທີ່ແບບ video-first
          ແລະສ້າງລາຍຮັບຈາກທຸລະກິດທີ່ຕ້ອງການ profile, visibility ແລະ traffic intent
          ທີ່ວັດແທກໄດ້—ໂດຍບໍ່ຮີບສ້າງ booking ຫຼື payment ໃນ MVP.
        </blockquote>
      </section>

      <section>
        <span>02 · THE CANVAS</span>
        <h2>Business Model Canvas</h2>
        <div className={styles.canvasBoard}>
          <article className={styles.canvasPartners}><b>08</b><h3>Key Partners</h3><ul><li>Creator ທ້ອງຖິ່ນ</li><li>ຮ້ານອາຫານ ແລະຄາເຟ</li><li>Map/direction provider</li><li>Social platform official embed/API</li><li>ກຸ່ມທຸລະກິດ/ທ່ອງທ່ຽວ</li><li>Legal ແລະ data-policy advisor</li></ul></article>
          <article className={styles.canvasActivities}><b>07</b><h3>Key Activities</h3><ul><li>ຄັດເລືອກ review link</li><li>ສ້າງ/ກວດ place data</li><li>Search, category ແລະ feed</li><li>Onboard place owner/creator</li><li>Moderation ແລະ analytics</li></ul></article>
          <article className={styles.canvasResources}><b>06</b><h3>Key Resources</h3><ul><li>Canonical place database</li><li>Content taxonomy</li><li>Creator/place relationships</li><li>Verification operation</li><li>Technology ແລະ brand trust</li></ul></article>
          <article className={styles.canvasValue}><b>02</b><h3>Value Propositions</h3><div><strong>ຜູ້ໃຊ້</strong><p>Video + place data + direct action ໃນ flow ດຽວ.</p></div><div><strong>ທຸລະກິດ</strong><p>Discoverability, verified profile ແລະ measurable intent.</p></div><div><strong>Creator</strong><p>Attribution, referral traffic ແລະ campaign opportunity ໃນອະນາຄົດ.</p></div></article>
          <article className={styles.canvasRelationships}><b>04</b><h3>Customer Relationships</h3><ul><li>Guest self-service</li><li>Saved places ໃນອຸປະກອນ</li><li>Claimed business profile</li><li>Onboarding/support ສຳລັບ Pro</li><li>Report, correction ແລະ takedown</li></ul></article>
          <article className={styles.canvasChannels}><b>03</b><h3>Channels</h3><ul><li>Web/PWA platform</li><li>Search ແລະ shareable Place Page</li><li>Creator/social links</li><li>QR ຢູ່ໜ້າຮ້ານ</li><li>Direct sales ຫາ founding partners</li></ul></article>
          <article className={styles.canvasSegments}><b>01</b><h3>Customer Segments</h3><div><strong>Primary user</strong><p>ຄົນລາວໃນວຽງຈັນທີ່ຊອກຮ້ານອາຫານ/ຄາເຟ.</p></div><div><strong>Paying customer</strong><p>Place owner ທີ່ຕ້ອງການ visibility ແລະ traffic.</p></div><div><strong>Supply partner</strong><p>Creator ແລະຜູ້ດູແລ content.</p></div><div><strong>Future</strong><p>ນັກທ່ອງທ່ຽວ, ທີ່ພັກ ແລະ tour service.</p></div></article>
          <article className={styles.canvasCosts}><b>09</b><h3>Cost Structure</h3><ul><li>Product development</li><li>Hosting, database, search ແລະ monitoring</li><li>Content curation, verification ແລະ moderation</li><li>Business onboarding/sales</li><li>Creator acquisition/marketing</li><li>Legal, admin ແລະ support</li></ul></article>
          <article className={styles.canvasRevenue}><b>05</b><h3>Revenue Streams</h3><ul><li>Basic listing — free</li><li>Founding Partner / Pro — monthly</li><li>Sponsored placement — campaign</li><li>Creator marketplace — commission</li><li>Affiliate — external transaction</li><li>Booking — only after demand proof</li></ul></article>
        </div>
      </section>

      <section>
        <span>03 · VALUE EXCHANGE</span>
        <h2>ໃຜໃຫ້ຫຍັງ ແລະໄດ້ຫຍັງ</h2>
        <div className={styles.exchangeGrid}>
          <article><b>USER</b><h3>ໃຫ້</h3><p>Attention, search intent, map/call/message signal</p><h3>ໄດ້</h3><p>ຄົ້ນຫາງ່າຍ, ເຫັນຂອງຈິງ ແລະພ້ອມໄປ</p></article>
          <article><b>PLACE OWNER</b><h3>ໃຫ້</h3><p>Verified data, profile ownership, subscription/campaign fee</p><h3>ໄດ້</h3><p>Visibility, direct traffic ແລະ performance insight</p></article>
          <article><b>CREATOR</b><h3>ໃຫ້</h3><p>Original review content ແລະ audience trust</p><h3>ໄດ້</h3><p>Attribution, referral traffic ແລະ campaign opportunity</p></article>
          <article><b>PLATFORM</b><h3>ໃຫ້</h3><p>Organization, verification, discovery, analytics</p><h3>ໄດ້</h3><p>Traffic, data advantage ແລະ recurring/campaign revenue</p></article>
        </div>
      </section>

      <section>
        <span>04 · REVENUE LADDER</span>
        <h2>ສ້າງລາຍຮັບຕາມຫຼັກຖານ</h2>
        <div className={styles.canvasRevenueLadder}>
          <article><b>01 · LAUNCH</b><h3>ລາຍຮັບຊຸດທຳອິດ</h3><ul><li>Basic listing ຟຣີ</li><li>Founding Partner package</li><li>Sponsored placement ທີ່ຕິດປ້າຍ</li></ul><p>Gate: 5–10 ທຸລະກິດຍອມຈ່າຍ.</p></article>
          <article><b>02 · GROWTH</b><h3>Recurring revenue</h3><ul><li>Pro Business profile</li><li>Traffic/contact analytics</li><li>Creator campaign marketplace</li></ul><p>Gate: map/call/message ແລະ repeat usage ວັດໄດ້.</p></article>
          <article><b>03 · SCALE</b><h3>Transaction revenue</h3><ul><li>Affiliate</li><li>Sponsored collections</li><li>Booking ສະເພາະຈຸດ</li></ul><p>Gate: transaction intent ເກີດຊ້ຳແລະມີ partner ຮອງຮັບ.</p></article>
        </div>
        <aside className={styles.priceHypothesis}><b>APPROVED VALIDATION HYPOTHESIS — PRICE NOT FINAL</b><p>Pro/Founding Partner: 200,000 ₭ ຕໍ່ເດືອນ · Sponsored campaign: 1,000,000 ₭ ຕໍ່ campaign. ຕົວເລກນີ້ຖືກອະນຸມັດໃຫ້ໃຊ້ທົດສອບ; ລາຄາຂາຍຈິງຈະຕ້ອງຜ່ານ customer interview, pre-sell ແລະ Financial Structure.</p></aside>
      </section>

      <section>
        <span>05 · COST LOGIC</span>
        <h2>ລາຍຈ່າຍທີ່ຕ້ອງຄວບຄຸມ</h2>
        <div className={styles.costColumns}>
          <div><h3>FIXED / STEP COST</h3><ul><li>Core team ແລະ product development</li><li>Design, admin tools ແລະ legal setup</li><li>Baseline infrastructure/monitoring</li><li>Business development</li></ul></div>
          <div><h3>VARIABLE COST</h3><ul><li>Traffic, media preview, search ແລະ API usage</li><li>Content curation/verification ຕໍ່ place</li><li>Creator campaign ແລະ acquisition</li><li>Support/moderation ຕາມຈຳນວນຜູ້ໃຊ້</li></ul></div>
        </div>
        <p className={styles.metricNote}>Business Canvas ກຳນົດແຕ່ປະເພດລາຍຈ່າຍ. ຕົວເລກ, cash flow, runway ແລະ break-even ຈະຢູ່ໃນ Financial Structure.</p>
      </section>

      <section>
        <span>06 · CRITICAL ASSUMPTIONS</span>
        <h2>ສົມມຸດຖານທີ່ຕ້ອງພິສູດ</h2>
        <div className={styles.assumptionTable} role="table" aria-label="ສົມມຸດຖານທາງທຸລະກິດ">
          <div role="row"><b>AREA</b><b>ASSUMPTION</b><b>TEST</b><b>SIGNAL</b></div>
          {assumptions.map(([area, assumption, test, signal]) => <div role="row" key={area}><b>{area}</b><p>{assumption}</p><span>{test}</span><strong>{signal}</strong></div>)}
        </div>
      </section>

      <section>
        <span>07 · OPERATING FLYWHEEL</span>
        <h2>ວົງຈອນທີ່ເຮັດໃຫ້ platform ເຕີບໂຕ</h2>
        <div className={styles.canvasFlywheel}>
          <div><b>01</b><strong>Content + Place Data</strong><p>ສ້າງ inventory ທີ່ຄົ້ນຫາໄດ້</p></div><i>→</i>
          <div><b>02</b><strong>Useful Discovery</strong><p>ຜູ້ໃຊ້ພົບບ່ອນທີ່ເໝາະສົມ</p></div><i>→</i>
          <div><b>03</b><strong>Measurable Intent</strong><p>ເກີດ place, map, call ແລະ message click</p></div><i>→</i>
          <div><b>04</b><strong>Business Value</strong><p>ຮ້ານ claim, update ແລະຍອມຈ່າຍ</p></div>
        </div>
      </section>

      <section>
        <span>08 · METRICS</span>
        <h2>ສິ່ງທີ່ຕ້ອງວັດ</h2>
        <div className={styles.canvasMetrics}>
          <article><b>USER VALUE</b><ul><li>Video → Place Page</li><li>Map/call/message click</li><li>Repeat visitor</li><li>Saved place</li></ul></article>
          <article><b>SUPPLY HEALTH</b><ul><li>Verified places</li><li>Review links per place</li><li>Data freshness</li><li>Claimed profiles</li></ul></article>
          <article><b>BUSINESS HEALTH</b><ul><li>Paying partners</li><li>MRR/campaign revenue</li><li>Partner retention</li><li>Revenue versus operating cost</li></ul></article>
        </div>
      </section>

      <section>
        <span>09 · RECOMMENDED DECISIONS</span>
        <h2>ຂໍ້ສະເໜີສຳລັບອະນຸມັດ</h2>
        <ol className={styles.canvasDecisions}>
          <li><b>01</b><p>ຜູ້ໃຊ້ຫຼັກແມ່ນຄົນຊອກບ່ອນໄປ; paying customer ຫຼັກແມ່ນ place owner.</p></li>
          <li><b>02</b><p>ຜູ້ໃຊ້ ແລະ Basic listing ໃຊ້ຟຣີ; ບໍ່ມີ consumer subscription ໃນ MVP.</p></li>
          <li><b>03</b><p>ລາຍຮັບທຳອິດມາຈາກ Founding Partner ແລະ Sponsored placement.</p></li>
          <li><b>04</b><p>Pro subscription ເປີດຫຼັງພິສູດວ່າ platform ສ້າງ traffic/contact intent ໄດ້.</p></li>
          <li><b>05</b><p>Creator marketplace, affiliate ແລະ booking ເປັນລາຍຮັບຂັ້ນຕໍ່ໄປ ບໍ່ແມ່ນ launch dependency.</p></li>
          <li><b>06</b><p>ທຸລະກິດຂອງ platform ຕ້ອງວັດຈາກ “intent generated” ບໍ່ແມ່ນ watch time.</p></li>
        </ol>
      </section>

      <section>
        <span>10 · APPROVED VALIDATION RULES</span>
        <h2>ກົດສຳລັບທົດສອບຮູບແບບທຸລະກິດ</h2>
        <ol className={styles.openQuestions}>
          <li><b>01</b><p>Founding Partner ໄດ້ verified profile, ສິດອັບເດດຂໍ້ມູນ, performance summary ແລະປ້າຍ partner—ແຕ່ບໍ່ຊື້ຄະແນນຣີວິວ.</p></li>
          <li><b>02</b><p>ໃຊ້ 200,000 ₭/ເດືອນ ແລະ 1,000,000 ₭/campaign ເປັນລາຄາທົດສອບ ບໍ່ແມ່ນລາຄາຂາຍສຸດທ້າຍ.</p></li>
          <li><b>03</b><p>Sponsored placement ຕ້ອງມີປ້າຍຊັດເຈນ, ຈຳກັດຈຳນວນ ແລະບໍ່ປ່ຽນຄະແນນຣີວິວ ຫຼືປິດບັງ organic result.</p></li>
          <li><b>04</b><p>ຕັ້ງເປົ້າ pre-sell 5–10 Founding Partners ກ່ອນຕັດສິນໃຈຂະຫຍາຍ.</p></li>
          <li><b>05</b><p>ເພດານລາຍຈ່າຍ pilot, runway ແລະ break-even ຈະກຳນົດໃນ Financial Structure ກ່ອນເລີ່ມພັດທະນາ.</p></li>
        </ol>
      </section>

      <aside className={styles.approvalGate}>
        <div><span>APPROVAL RECORDED</span><h2>Business Model Canvas 1.0</h2></div>
        <ul><li>Customer versus paying customer — Approved</li><li>Free versus paid boundary — Approved</li><li>Revenue sequence — Approved</li><li>Pricing validation hypothesis — Approved</li><li>Validation rules — Approved</li></ul>
      </aside>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/market-competitor`}><small>← PREVIOUS DOCUMENT</small><strong>ຕະຫຼາດ ແລະຄູ່ແຂ່ງ</strong></a>
        <a href={`${basePath}/documents/feasibility-study`}><small>NEXT PRIORITY →</small><strong>ການສຶກສາຄວາມເປັນໄປໄດ້</strong></a>
      </nav>
    </article>
  );
}
