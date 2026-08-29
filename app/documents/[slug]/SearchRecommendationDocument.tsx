import styles from "../documents.module.css";

type SearchRecommendationDocumentProps = { basePath: string };

const baselineDecisions = [
  ["SR-D01", "Search ແມ່ນ MVP; AI personalization ບໍ່ແມ່ນ MVP", "Pilot ຕ້ອງຄົ້ນດ້ວຍຊື່/ຄຳສຳຄັນ ແລະກອງຕາມໝວດ, ເຂດ ແລະຊ່ວງລາຄາໄດ້ໂດຍບໍ່ພຶ່ງ AI/LLM."],
  ["SR-D02", "PostgreSQL-first candidate retrieval", "ໃຊ້ exact/alias, prefix, full-text ແລະ pg_trgm ຈາກ place_search_documents; Dedicated Search Engine ຈະເພີ່ມເມື່ອມີຫຼັກຖານວ່າ PostgreSQL ບໍ່ຜ່ານ."],
  ["SR-D03", "Organic relevance ແຍກຈາກ Sponsored", "ການຈ່າຍເງິນບໍ່ເພີ່ມ organic score, rating, trust ຫຼື verification. Sponsored ໃຊ້ slot ແຍກ ແລະມີປ້າຍຊັດເຈນ."],
  ["SR-D04", "Recommendation ຕ້ອງອະທິບາຍໄດ້", "ທຸກ Related Place/Feed recommendation ມີ reason code ເຊັ່ນ ໝວດຄ້າຍກັນ, ເຂດໃກ້ກັນ, ລາຄາໃກ້ຄຽງ ຫຼືກຳລັງເປີດ."],
  ["SR-D05", "Privacy-safe signals", "MVP ບໍ່ສ້າງ user profile ຖາວອນ. ໃຊ້ query/filter/current context ແລະ anonymous-session events ຕາມ consent; ຫ້າມເກັບ raw PII ຫຼື infer sensitive trait."],
] as const;

const deliveryPhases = [
  ["Phase 0 · Internal", "Deterministic browse/feed", "Editorial category/area mix + Published/Trust/Freshness gates", "30 Place records ແລະ search fixtures ພ້ອມ"],
  ["Phase 1 · MVP Pilot", "Rule-based Search & Related Places", "Exact/alias/prefix/full-text/trigram + filters + fixed ranking + reason code", "Lao benchmark, latency ແລະ zero-result gate ຜ່ານ"],
  ["Phase 2 · Evidence-led", "Session-context recommendation", "Current query/filter, viewed category/area/price ແລະ diversity; ບໍ່ມີ account profile", "Event quality, consent ແລະ A/B holdout ພ້ອມ"],
  ["Phase 3 · Later", "AI/embedding or learning-to-rank", "ທົດສອບເປັນ candidate/feature ຫຼັງ deterministic baseline; ຕ້ອງມີ fallback", "ຂໍ້ມູນພໍ, quality uplift, cost/latency/privacy ຜ່ານ"],
] as const;

const normalizationPipeline = [
  ["NORM-01", "Validate", "ຮັບ UTF-8 ສູງສຸດ 100 Unicode code points; ປະຕິເສດ control/bidi override ທີ່ບໍ່ຈຳເປັນ; empty query ເຂົ້າ Browse Mode."],
  ["NORM-02", "Preserve", "ເກັບ raw query ໄວ້ໃນ request scope ເພື່ອສະແດງຄືນ; analytics ບໍ່ເກັບ raw query ຈົນ privacy/retention policy ອະນຸມັດ."],
  ["NORM-03", "Unicode NFC", "Trim, collapse whitespace ແລະ normalize ເປັນ NFC. ຮັກສາ display text ຕົ້ນສະບັບ; normalized form ໃຊ້ສຳລັບທຽບ/ຄົ້ນຫາ."],
  ["NORM-04", "Canonical characters", "ແປ Lao/Arabic digits ເປັນ numeric search form, ປັບ punctuation/space ຕາມ allowlist; ຫ້າມລຶບວັນນະຍຸດ ຫຼືຕົວອັກສອນແບບກວ້າງ."],
  ["NORM-05", "Alias expansion", "ຂະຫຍາຍສະເພາະ alias/synonym/translated term ທີ່ອະນຸມັດໃນ CON-01; ທຸກ term ມີ owner, source ແລະ version."],
  ["NORM-06", "Token views", "ສ້າງ full-string view, whitespace/punctuation token view ແລະ trigram view. ບໍ່ຄາດວ່າ Lao stemming/tokenization ຈະຖືກໂດຍບໍ່ benchmark."],
  ["NORM-07", "Intent parse", "Map term ໄປ category/area/price intent ສະເພາະຄ່າຈາກ taxonomy; ambiguity ສົ່ງ suggestion ແທນການຄາດເດົາ."],
  ["NORM-08", "Determinism", "Normalization version ຢູ່ໃນ projection ແລະ query log aggregate; version ປ່ຽນແລ້ວຕ້ອງ rebuild projection ແລະ rerun benchmark."],
] as const;

const candidateStages = [
  ["RET-01", "Exact canonical name", "normalized_query = normalized_name", "1.00", "ຮັບສູງສຸດ 50 IDs"],
  ["RET-02", "Exact approved alias", "normalized_query = normalized_alias", "0.95", "ອ້າງ canonical Place; alias ບໍ່ສ້າງ record ຊ້ຳ"],
  ["RET-03", "Name/alias prefix", "normalized_name/alias LIKE query%", "0.85", "B-tree/pattern path ແລະ max 100 IDs"],
  ["RET-04", "Full-text candidate", "search_vector @@ websearch/plain tsquery", "normalized ts_rank 0–1", "GIN; query syntax ຖືກສ້າງໂດຍ server"],
  ["RET-05", "Trigram candidate", "search_text % normalized_query", "similarity 0–1", "GIN pg_trgm; threshold ບໍ່ hard-code ກ່ອນ benchmark"],
  ["RET-06", "Candidate union", "UNION Place IDs ແລະເອົາ max feature per channel", "—", "ສູງສຸດ 200 candidates ໃນ Pilot; deduplicate by canonical Place"],
  ["RET-07", "Eligibility recheck", "Place Published + active taxonomy + source/rights policy", "hard gate", "ກວດ canonical table ກ່ອນ response; projection ເກົ່າຫ້າມ leak Suspended/Archived"],
] as const;

const rankingFeatures = [
  ["RF-01", "Lexical match", "0.50", "max(exact name, exact alias, prefix, normalized ts_rank, trigram similarity)", "ກົງກັບຄຳທີ່ຜູ້ໃຊ້ພິມ"],
  ["RF-02", "Intent match", "0.20", "approved intent/category/occasion term match 0–1", "ໃຊ້ CON-01 terms ເທົ່ານັ້ນ"],
  ["RF-03", "Category match", "0.15", "selected category = 1; compatible child/parent = provisional graded value", "Filter ທີ່ຜູ້ໃຊ້ເລືອກຍັງເປັນ hard filter"],
  ["RF-04", "Area match", "0.10", "selected area/direct child match 0–1", "ບໍ່ໃຊ້ GPS/Near me ໃນ MVP"],
  ["RF-05", "Price match", "0.05", "approved price band overlap 0–1", "Unknown price ບໍ່ຜ່ານ price filter"],
] as const;

const filterContract = [
  ["Category", "OR ພາຍໃນ category group; AND ກັບ group ອື່ນ", "Must/MVP", "Active taxonomy IDs only"],
  ["Area", "OR ພາຍໃນ area group; AND ກັບ group ອື່ນ", "Must/MVP", "Pilot areas only"],
  ["Price", "Place ຕ້ອງມີ approved price band ແລະ overlap selected band", "Must/MVP", "Unknown price excluded when filter active"],
  ["Open now", "Reserved field in TEC-04 API; UI hidden and request rejected/ignored by documented compatibility behavior", "Deferred", "Enable only after Hours + timezone + freshness + test Change Decision"],
  ["Near me/distance", "ບໍ່ຮັບ location ແລະບໍ່ rank ດ້ວຍ distance", "Deferred", "Requires consent, coordinate quality and radius semantics"],
] as const;

const recommendationSurfaces = [
  ["REC-01", "Discover Feed", "Published Place + active Source + pilot area/category", "Deterministic rotation across category/area; no repeated Place in recent session window; source/Place dedupe", "ກຳລັງຄົ້ນພົບໃນໝວດ/ເຂດນີ້", "Editorial eligible list"],
  ["REC-02", "Related Places", "Current Place category, area and price band", "Category 0.50 + area 0.30 + price 0.20; exclude current/merged/suspended; max 6", "ໝວດດຽວກັນ · ເຂດໃກ້ຄຽງ · ລາຄາໃກ້ຄຽງ", "Same category, then same area"],
  ["REC-03", "Search suggestions", "Approved Place names, aliases, categories, areas and intent terms", "Exact/prefix first; no raw historical query suggestion in MVP", "ຊື່ຮ້ານ/ໝວດ/ເຂດທີ່ກົງ", "Active taxonomy suggestions"],
  ["REC-04", "Session-context Feed", "Current-session viewed categories/areas/prices after consent", "Rule boost + diversity; memory expires with anonymous session; no cross-device identity", "ເພາະທ່ານກຳລັງເບິ່ງ…", "REC-01 baseline"],
  ["REC-05", "AI candidate experiment", "Approved public fields or embeddings only", "Shadow/offline candidate feature; deterministic rank/fallback remains", "AI reason must map to approved reason codes", "Phase 1 rule-based output"],
] as const;

const coldStartRules = [
  ["CS-01", "New user/session", "ໃຊ້ pilot area, active category mix ແລະ deterministic rotation; ບໍ່ຂໍສ້າງ account ແລະບໍ່ຄາດເດົາ demographic."],
  ["CS-02", "New Place", "ເຂົ້າ Search ທັນທີຫຼັງ Published/projection ready ຕາມ relevance; Feed ໃຊ້ fair rotation/exploration ທີ່ບໍ່ຂຶ້ນກັບ Partner/Sponsored."],
  ["CS-03", "New category/area", "Admin ຕ້ອງກວດ inventory threshold ແລະ taxonomy terms; ຖ້າ supply ນ້ອຍໃຫ້ບອກ coverage ບໍ່ຄົບ ແທນການສ້າງ fake result."],
  ["CS-04", "No active video/source", "ບໍ່ເຂົ້າ video Feed; Search/Place eligibility ຂຶ້ນກັບ Published/rights policy. UI ໃຊ້ approved poster/fallback ແລະບອກ source state."],
  ["CS-05", "No behavioral data", "Related Place ໃຊ້ category/area/price; Phase 1 ຫ້າມໃຊ້ popularity ທີ່ສ້າງ feedback loop."],
] as const;

const signalRegistry = [
  ["SIG-01", "Raw query", "Request scope only", "Search parsing/ranking", "Not persisted in MVP analytics", "May contain sensitive text"],
  ["SIG-02", "Normalized intent/category/area/price", "Request + approved aggregate", "Search and zero-result analysis", "Allowed with consent/aggregation", "No free-text payload"],
  ["SIG-03", "Result impression", "Anonymous event", "Coverage/position evaluation", "Allowed by event schema", "Not direct organic boost in Phase 1"],
  ["SIG-04", "Place open/source click", "Anonymous event", "Search success/funnel", "Allowed by consent contract", "Interest, not visit/sale"],
  ["SIG-05", "Map/Call/Message", "Decision Intent", "Outcome evidence/Phase 2 experiment", "Deduplicated anonymous aggregate", "Intent, not visit/sale"],
  ["SIG-06", "Partner/Sponsored/payment", "Commercial records", "Eligibility/reporting only", "Never organic rank feature", "Commercial integrity boundary"],
  ["SIG-07", "Admin verification/freshness", "Canonical Place data", "Eligibility, labels and stale suppression", "May be shown as trust metadata", "No paid positive rank boost"],
] as const;

const evaluationSet = [
  ["EVAL-01", "Known-item exact", "12", "Canonical Lao/English Place names and approved aliases", "Expected Place = relevance 3; exact known match Top 1"],
  ["EVAL-02", "Unicode/spacing/spelling", "12", "NFC-equivalent input, repeated spaces, punctuation, common observed typo variants", "Canonical match remains in Top 5; unsafe character handling passes"],
  ["EVAL-03", "Category/intent", "12", "Food/café and approved occasion/price intents", "Judged relevant Places ordered by graded relevance"],
  ["EVAL-04", "Area/price filters", "12", "Pilot areas × category × price combinations", "Every result satisfies hard filters; known eligible set recalled"],
  ["EVAL-05", "Zero-result/recovery", "6", "No-match and over-constrained combinations", "Explicit empty state; clear-one/clear-all creates valid next search; no fake match"],
  ["EVAL-06", "Abuse/limits", "6", "Too long, control/bidi, wildcard/SQL-like, invalid cursor/filter", "Safe validation/rate limit; no execution/data leak"],
] as const;

const qualityGates = [
  ["QG-S01", "Exact known-item", "Top-1 accuracy = 100% for 12 approved exact/alias cases", "Fail blocks Pilot; fix alias/normalization/retrieval"],
  ["QG-S02", "Relevant coverage", "Recall@20 ≥ 0.90 across judged queries with eligible matches", "Tune retrieval threshold/index; do not hide failure with ranking"],
  ["QG-S03", "Ranking quality", "NDCG@10 ≥ 0.80 overall and no query family < 0.70", "Tune feature/weights with recorded before-after benchmark"],
  ["QG-S04", "Zero-result integrity", "Known-match zero result = 0; true empty has recovery action = 100%", "Fix normalization/filter semantics or content coverage"],
  ["QG-S05", "Public/trust integrity", "Draft/Suspended/Archived leak = 0; Sponsored label = 100%; paid feature in organic formula = 0", "Severity S1; block release"],
  ["QG-S06", "Search API latency", "10,000 synthetic projections, 20 concurrent virtual users: p95 ≤ 500 ms, p99 ≤ 1,000 ms, error < 1%", "EXPLAIN/index/query/capacity work before adding search service"],
  ["QG-S07", "Projection consistency", "p95 projection lag ≤ 60 s; canonical status recheck prevents public leak immediately", "Alert/rebuild; suspend/publish path must remain safe"],
  ["QG-S08", "Product evidence", "Search → Place-open and Search → Decision-Intent reported by query family without claiming visit/sale", "Investigate query/content/UX; not automatic rank change"],
] as const;

const aiEscalationGates = [
  ["AI-G01", "Baseline exhausted", "Phase 1 benchmark is stable and documented; error analysis shows semantic/behavioral gap not fixable by taxonomy, alias, filter, weight or content coverage."],
  ["AI-G02", "Data sufficiency", "Semantic experiment: ≥300 Published Places + ≥200 judged query–Place pairs. Personalized/LTR experiment: ≥10,000 consented search sessions + ≥1,000 deduplicated Decision Intents in trailing 90 days."],
  ["AI-G03", "Measured uplift", "Offline NDCG@10 improves ≥5% relative without lowering exact Top-1/Recall/integrity; online holdout shows improvement with confidence interval reported."],
  ["AI-G04", "Operational fit", "Incremental p95 ≤ 200 ms or async precompute; documented cost per 1,000 searches; budget, cache, rate limit, fallback and vendor exit path approved."],
  ["AI-G05", "Privacy/safety", "Only approved public fields or consented aggregates; no protected PII/raw query export, sensitive inference or generated Place facts; DPIA/security review complete."],
  ["AI-G06", "Reversibility", "Feature flag + control group + rule-based fallback; model/vendor/version logged; rollback does not require data migration."],
] as const;

const failureMatrix = [
  ["Empty query", "Browse/Discover Mode", "Return deterministic eligible mix; do not treat as error"],
  ["No matching candidate", "Explicit empty result", "Echo filters, clear-one/clear-all, active category suggestions; no unrelated fake match"],
  ["Projection lag/missing", "Canonical fallback where bounded or retryable error", "Never return non-Published Place; queue rebuild"],
  ["Search DB timeout", "ERR-DEPENDENCY-TIMEOUT", "Show Retry and preserve query/filter; record trace/slow query"],
  ["Invalid cursor/filter", "ERR-VALIDATION", "Restart from first page only after user-visible recovery; no silent filter drop"],
  ["Recommendation unavailable", "Rule/editorial fallback", "Core Search/Feed/Place remains usable; telemetry failure never blocks journey"],
  ["AI timeout/low confidence", "Ignore AI feature", "Use Phase 1 deterministic score and log safe experiment outcome"],
] as const;

const reviewDecisions = [
  ["REV-01", "MVP boundary", "ອະນຸມັດ", "Phase 1 PostgreSQL rule-based Search/Related Places ເປັນ Production MVP; Phase 2/3 AI/personalization, Near Me ແລະ Open Now ເປັນ Later."],
  ["REV-02", "Ranking contract", "ອະນຸມັດເປັນ benchmark baseline", "Candidate union, 50/20/15/10/5 weights, deterministic tie-break ແລະ hard eligibility/filter ຖືກລັອກເປັນ V1; weight ປ່ຽນໄດ້ສະເພາະຈາກ recorded experiment."],
  ["REV-03", "Commercial integrity", "ອະນຸມັດໂດຍບໍ່ມີຂໍ້ຍົກເວັ້ນ", "Partner, Sponsored ແລະ payment ບໍ່ເປັນ organic feature; paid placement ຢູ່ໃນ labeled slot ແຍກ ແລະຊື້ rating/verification ບໍ່ໄດ້."],
  ["REV-04", "Quality/privacy gates", "ອະນຸມັດສຳລັບ Pilot", "60-query benchmark, QG-S01—08, raw-query non-persistence ແລະ session-only recommendation ເປັນ baseline; Quality Gate ຍັງຕ້ອງພິສູດດ້ວຍ inventory ແລະຜົນທົດສອບຈິງ."],
  ["REV-05", "AI escalation", "ອະນຸມັດ AI-G01—06", "ຫ້າມເພີ່ມ AI/dedicated engine ໂດຍບໍ່ມີ baseline gap, data sufficiency, quality uplift, cost/latency/privacy evidence, feature flag ແລະ rule-based fallback."],
] as const;

export default function SearchRecommendationDocument({ basePath }: SearchRecommendationDocumentProps) {
  return (
    <article className={styles.formalDocument}>
      <header className={styles.formalDocumentHeader}>
        <p>TEC-05 · SEARCH QUALITY BASELINE · 30 AUGUST 2026</p>
        <h1>ການຄົ້ນຫາ ແລະລະບົບແນະນຳ</h1>
        <h2>Search &amp; AI Recommendation</h2>
        <span className={styles.formalStatus}>1.0 · ອະນຸມັດແລ້ວ · 30 ສິງຫາ 2026</span>
      </header>

      <aside className={styles.formalDecision}>
        <strong>ຈຸດປະສົງ ແລະສະຖານະຂອງ TEC-05</strong>
        <p>ກຳນົດວ່າ Platform ຈະແປຄຳຄົ້ນພາສາລາວ, filter, Place data ແລະ anonymous behavior ເປັນຜົນຄົ້ນຫາ/ຄຳແນະນຳທີ່ກົງ, ໄວ, ອະທິບາຍໄດ້ ແລະບໍ່ໃຫ້ການຈ່າຍເງິນປ່ຽນ organic relevance. ເອກະສານນີ້ບໍ່ຖືວ່າ “ໃຊ້ AI” ເປັນຄຸນຄ່າໃນຕົວມັນເອງ; AI ຕ້ອງພິສູດວ່າດີກວ່າ rule-based baseline.</p>
        <p>Founder ອະນຸມັດ REV-01—05 ແລ້ວ. ສະບັບ 1.0 ນີ້ເປັນ Design/Developer Baseline; ບໍ່ໄດ້ໝາຍຄວາມວ່າ QG-S01—08 ຜ່ານແລ້ວ—ຜົນທົດສອບຈິງຍັງເປັນ Release Gate.</p>
      </aside>

      <nav className={styles.formalToc} aria-label="ສາລະບານ TEC-05">
        <h2>ສາລະບານ</h2>
        <ol>
          <li><a href="#tec05-control">ການຄວບຄຸມເອກະສານ</a></li>
          <li><a href="#tec05-purpose">ຈຸດປະສົງ ແລະ Non-goals</a></li>
          <li><a href="#tec05-decisions">ຂໍ້ຕັດສິນຫຼັກ</a></li>
          <li><a href="#tec05-phases">ລຳດັບ Rule-based → AI</a></li>
          <li><a href="#tec05-pipeline">Search Pipeline ແລະ Ranking</a></li>
          <li><a href="#tec05-recommendation">Recommendation ແລະ Cold Start</a></li>
          <li><a href="#tec05-signals">Signal ແລະ Privacy Boundary</a></li>
          <li><a href="#tec05-evaluation">Evaluation ແລະ Quality Gates</a></li>
          <li><a href="#tec05-ai">AI Escalation ແລະ Safeguards</a></li>
          <li><a href="#tec05-operations">Failure, Monitoring ແລະ Handoff</a></li>
          <li><a href="#tec05-sources">Official Sources</a></li>
          <li><a href="#tec05-review">ບັນທຶກ 5 ການຕັດສິນທີ່ອະນຸມັດ</a></li>
        </ol>
      </nav>

      <section id="tec05-control" className={styles.formalSection}>
        <h2><span>01</span> ການຄວບຄຸມເອກະສານ</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><tbody>
          <tr><th>Document ID</th><td><code>TEC-05</code></td></tr>
          <tr><th>Version / status</th><td>1.0 — ອະນຸມັດແລ້ວ</td></tr>
          <tr><th>Owner / approver</th><td>Technical Lead + Product Owner / Founder</td></tr>
          <tr><th>Input</th><td>PRO-02 System Analysis, PRO-03 MVP Scope, PRO-04 Acceptance, CON-01 Taxonomy, TEC-03 Tech Stack ແລະ TEC-04 Data/API</td></tr>
          <tr><th>Output</th><td>Lao normalization, retrieval/ranking contract, recommendation phases, quality benchmark, safeguards ແລະ AI escalation gate</td></tr>
        </tbody></table></div>
      </section>

      <section id="tec05-purpose" className={styles.formalSection}>
        <h2><span>02</span> ຈຸດປະສົງ ແລະ Non-goals</h2>
        <p>MVP ຕ້ອງເຮັດໃຫ້ Guest ພົບ Published Place ຕາມຊື່, alias, intent, ໝວດ, ເຂດ ແລະລາຄາ; ເຫັນວ່າຜົນໃດເປັນ Organic/Sponsored; ແລະຟື້ນຕົວຈາກ zero result ໄດ້.</p>
        <p><strong>Non-goals:</strong> ບໍ່ສ້າງ user account profile, cross-device tracking, black-box personalized feed, sensitive-trait inference, auto-generated Place facts, AI chatbot ຫຼື dedicated vector/search cluster ໃນ Pilot.</p>
      </section>

      <section id="tec05-decisions" className={styles.formalSection}>
        <h2><span>03</span> ຂໍ້ຕັດສິນຫຼັກ</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Decision</th><th>Implementation meaning</th></tr></thead><tbody>{baselineDecisions.map(([id, decision, meaning]) => <tr key={id}><td><code>{id}</code></td><td><strong>{decision}</strong></td><td>{meaning}</td></tr>)}</tbody></table></div>
      </section>

      <section id="tec05-phases" className={styles.formalSection}>
        <h2><span>04</span> ລຳດັບ Rule-based → AI</h2>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Phase</th><th>Capability</th><th>Mechanism</th><th>Entry gate</th></tr></thead><tbody>{deliveryPhases.map(([phase, capability, mechanism, gate]) => <tr key={phase}><th>{phase}</th><td><strong>{capability}</strong></td><td>{mechanism}</td><td>{gate}</td></tr>)}</tbody></table></div>
        <aside className={styles.formalDecision}><strong>Pilot baseline</strong><p>Phase 1 ເປັນ scope ຂອງ Production MVP. Phase 2/3 ເປັນ Later ແລະຫ້າມເຮັດໃຫ້ Search/Feed/Place ຂັດຂ້ອງເມື່ອ recommendation service ບໍ່ພ້ອມ.</p></aside>
      </section>

      <section id="tec05-pipeline" className={styles.formalSection}>
        <h2><span>05</span> Search Pipeline ແລະ Ranking</h2>
        <p>Search request ຜ່ານລຳດັບ <strong>Validate → Normalize → Parse Intent → Retrieve Candidates → Apply Hard Filters → Recheck Eligibility → Score → Diversity/Tie-break → Sponsored Slot → Response</strong>. ບໍ່ມີຂັ້ນໃດອະນຸຍາດໃຫ້ Draft/Suspended/Archived Place ອອກສູ່ Public.</p>
        <h3>5.1 Lao/Unicode normalization</h3>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Stage</th><th>Rule</th></tr></thead><tbody>{normalizationPipeline.map(([id, stage, rule]) => <tr key={id}><td><code>{id}</code></td><td><strong>{stage}</strong></td><td>{rule}</td></tr>)}</tbody></table></div>
        <aside className={styles.formalNote}><strong>ຫ້າມ “normalize ເກີນຄວາມໝາຍ”</strong><p>NFC ຊ່ວຍໃຫ້ Unicode ທີ່ທຽບເທົ່າກັນມີ representation ຄົງທີ່. ແຕ່ການລຶບວັນນະຍຸດ, ປ່ຽນຕົວອັກສອນ ຫຼືສ້າງ synonym ເອງອາດປ່ຽນຄວາມໝາຍ; ຈຶ່ງຕ້ອງມາຈາກ Lao query evidence ແລະ CON-01.</p></aside>

        <h3>5.2 Candidate retrieval</h3>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Channel</th><th>Match</th><th>Feature value</th><th>Limit/guardrail</th></tr></thead><tbody>{candidateStages.map(([id, channel, match, value, guardrail]) => <tr key={id}><td><code>{id}</code></td><td><strong>{channel}</strong></td><td><code>{match}</code></td><td>{value}</td><td>{guardrail}</td></tr>)}</tbody></table></div>

        <h3>5.3 Hard filter semantics</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Filter</th><th>Semantics</th><th>MVP status</th><th>Control</th></tr></thead><tbody>{filterContract.map(([filter, semantics, status, control]) => <tr key={filter}><th>{filter}</th><td>{semantics}</td><td><strong>{status}</strong></td><td>{control}</td></tr>)}</tbody></table></div>
        <aside className={styles.formalDecision}><strong>TEC-04 compatibility note</strong><p><code>openNow</code> ທີ່ຢູ່ໃນ API-P02 ເປັນ reserved/deferred field. MVP UI ຫ້າມສະແດງ ແລະ Server ຕ້ອງຕອບ validation/unsupported behavior ຕາມ contract ຖ້າ Client ສົ່ງມາ. ການເປີດໃຊ້ຕ້ອງມີ Change Decision ທີ່ກວດ Hours, timezone, overnight schedule ແລະ freshness.</p></aside>

        <h3>5.4 Organic ranking formula — provisional baseline</h3>
        <div className={styles.proposalFormula}><b>ORGANIC SCORE V1</b><p><code>0.50 × Lexical + 0.20 × Intent + 0.15 × Category + 0.10 × Area + 0.05 × Price</code></p><span>Feature ທຸກອັນ normalize ເປັນ 0–1. Formula ນີ້ເປັນ benchmark baseline ບໍ່ແມ່ນຄວາມຈິງສຸດທ້າຍ; weight/threshold ປ່ຽນໄດ້ສະເພາະຜ່ານ versioned experiment ແລະບັນທຶກ before/after.</span></div>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Feature</th><th>Weight</th><th>Calculation</th><th>Meaning</th></tr></thead><tbody>{rankingFeatures.map(([id, feature, weight, calculation, meaning]) => <tr key={id}><td><code>{id}</code></td><td><strong>{feature}</strong></td><td>{weight}</td><td>{calculation}</td><td>{meaning}</td></tr>)}</tbody></table></div>
        <p><strong>Tie-break:</strong> <code>organic_score DESC → lexical_score DESC → canonical_name ASC → place_id ASC</code>. ຄຳຄົ້ນ, filter, normalization/ranking version ແລະ dataset ດຽວກັນຕ້ອງໄດ້ລຳດັບດຽວກັນ. Freshness/verification/Partner ສະແດງເປັນ label ຫຼືໃຊ້ hard safety gate; ບໍ່ເປັນ positive organic weight.</p>

        <h3>5.5 Sponsored placement</h3>
        <ol className={styles.formalNumberList}>
          <li>ຄຳນວນ Organic list ໃຫ້ສຳເລັດກ່ອນ ແລະຫ້າມໃຊ້ campaign/partner/payment ເປັນ feature.</li>
          <li>ເລືອກ Sponsored ສະເພາະ Active Campaign, Published Place, placement/query/category/area eligible ແລະມີ approved label.</li>
          <li>Insert ເຂົ້າ reserved slot ຕາມ placement policy; response ມີ <code>isSponsored</code>, campaign ID ສຳລັບ internal trace ແລະ disclosure text.</li>
          <li>Sponsored impression/click/intent ລາຍງານແຍກ Organic; expired/paused/label missing ບໍ່ເຂົ້າ paid slot.</li>
        </ol>
      </section>

      <section id="tec05-recommendation" className={styles.formalSection}>
        <h2><span>06</span> Recommendation ແລະ Cold Start</h2>
        <p>Recommendation ບໍ່ແມ່ນ Search ທີ່ເຊື່ອງ query. ແຕ່ລະ surface ມີ goal, eligible pool, ranking, reason ແລະ fallback ຂອງຕົນ. Phase 1 ບໍ່ສ້າງ profile ຜູ້ໃຊ້ຖາວອນ.</p>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Surface</th><th>Inputs/eligibility</th><th>Ranking/diversity</th><th>User-visible reason</th><th>Fallback</th></tr></thead><tbody>{recommendationSurfaces.map(([id, surface, input, rank, reason, fallback]) => <tr key={id}><td><code>{id}</code></td><td><strong>{surface}</strong></td><td>{input}</td><td>{rank}</td><td>{reason}</td><td>{fallback}</td></tr>)}</tbody></table></div>
        <h3>6.1 Cold-start rules</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Situation</th><th>Required behavior</th></tr></thead><tbody>{coldStartRules.map(([id, situation, behavior]) => <tr key={id}><td><code>{id}</code></td><td><strong>{situation}</strong></td><td>{behavior}</td></tr>)}</tbody></table></div>
        <h3>6.2 Diversity and anti-feedback-loop rules</h3>
        <ul className={styles.formalPlainList}>
          <li>Discover Feed ບໍ່ສະແດງ Place ດຽວຊ້ຳໃນ 10 ລາຍການຫຼ້າສຸດຂອງ session ແລະບໍ່ສະແດງ category ດຽວຕິດກັນເກີນ 2 ລາຍການ ເມື່ອ eligible supply ພຽງພໍ.</li>
          <li>Related Places ບໍ່ສະແດງ current/merged/duplicate candidate ທີ່ຍັງບໍ່ resolve; ໜຶ່ງ Place ມີໜຶ່ງ card ແມ່ນວ່າມີຫຼາຍ Source.</li>
          <li>Popularity/impression/click ບໍ່ເຂົ້າ Organic V1; ຖ້າທົດສອບພາຍຫຼັງຕ້ອງມີ age normalization, exploration quota ແລະ holdout ເພື່ອບໍ່ໃຫ້ “ຄົນເຫັນຫຼາຍ → ຍິ່ງຖືກເຫັນຫຼາຍ”.</li>
        </ul>
      </section>

      <section id="tec05-signals" className={styles.formalSection}>
        <h2><span>07</span> Signal ແລະ Privacy Boundary</h2>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Signal</th><th>Storage</th><th>Use</th><th>Allowed retention/use</th><th>Guardrail</th></tr></thead><tbody>{signalRegistry.map(([id, signal, storage, use, allowed, guardrail]) => <tr key={id}><td><code>{id}</code></td><td><strong>{signal}</strong></td><td>{storage}</td><td>{use}</td><td>{allowed}</td><td>{guardrail}</td></tr>)}</tbody></table></div>
        <aside className={styles.formalDecision}><strong>Raw query decision</strong><p>MVP ບໍ່ບັນທຶກ raw free-text query ໃນ analytics/log. ສຳລັບ zero-result analysis ໃຫ້ເກັບ normalized category/area/price/intent IDs, query-length bucket ແລະ result count. ຖ້າຕ້ອງເກັບ raw query ພາຍຫຼັງ ຕ້ອງຜ່ານ TEC-06 privacy/retention/access approval.</p></aside>
      </section>

      <section id="tec05-evaluation" className={styles.formalSection}>
        <h2><span>08</span> Evaluation ແລະ Quality Gates</h2>
        <p>ການທົດສອບ Search ບໍ່ໃຊ້ຄຳວ່າ “ເບິ່ງແລ້ວດີ”. Gold set ມີ query, filters, eligible Place set ແລະ relevance label: <code>3 = ກົງຫຼາຍ</code>, <code>2 = ກົງ</code>, <code>1 = ພໍກ່ຽວ</code>, <code>0 = ບໍ່ກົງ</code>. Product Owner ແລະ Content/Taxonomy reviewer ໃຫ້ຄະແນນແຍກກັນ; disagreement ຖືກ resolve ແລະບັນທຶກ.</p>
        <h3>8.1 Lao benchmark composition</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>ID</th><th>Family</th><th>Count</th><th>Examples/data</th><th>Expected judgment</th></tr></thead><tbody>{evaluationSet.map(([id, family, count, examples, expected]) => <tr key={id}><td><code>{id}</code></td><td><strong>{family}</strong></td><td>{count}</td><td>{examples}</td><td>{expected}</td></tr>)}</tbody></table></div>
        <h3>8.2 Metric meaning</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Metric</th><th>ຄວາມໝາຍ</th><th>ສິ່ງທີ່ມັນບໍ່ບອກ</th></tr></thead><tbody>
          <tr><th>Top-1 accuracy</th><td>ສຳລັບຄຳຊື່/alias ທີ່ຮູ້ຄຳຕອບ, Place ຖືກຢູ່ອັນດັບ 1 ຫຼືບໍ່.</td><td>ບໍ່ວັດ query ກວ້າງທີ່ມີຫຼາຍຄຳຕອບ.</td></tr>
          <tr><th>Recall@20</th><td>ໃນ Place ທີ່ reviewer ລະບຸວ່າກ່ຽວຂ້ອງ, ລະບົບດຶງເຂົ້າ 20 ອັນທຳອິດໄດ້ກີ່ສ່ວນ.</td><td>ບໍ່ບອກວ່າຂອງທີ່ກົງຢູ່ເທິງຫຼືລຸ່ມ.</td></tr>
          <tr><th>NDCG@10</th><td>ໃຫ້ຄ່າຫຼາຍກັບ relevant Place ທີ່ຢູ່ເທິງ ແລະຮອງຮັບ relevance 0–3.</td><td>ບໍ່ທົດແທນ integrity, latency ຫຼື user research.</td></tr>
          <tr><th>Zero-result rate</th><td>ສັດສ່ວນ Search ທີ່ບໍ່ມີຜົນ ແຍກ true-no-supply ອອກຈາກ known-match failure.</td><td>ຄ່າຕ່ຳບໍ່ດີຖ້າລະບົບເອົາ fake/unrelated match ມາສະແດງ.</td></tr>
        </tbody></table></div>
        <h3>8.3 Pilot quality gates</h3>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Gate</th><th>Pass threshold</th><th>When fail</th></tr></thead><tbody>{qualityGates.map(([id, gate, threshold, failure]) => <tr key={id}><td><code>{id}</code></td><td><strong>{gate}</strong></td><td>{threshold}</td><td>{failure}</td></tr>)}</tbody></table></div>
        <p>60-query file ເປັນ template ຈົນກວ່າ 100 Place inventory ແລະ Pilot area/category terms ຈະຖືກລັອກ. ຫ້າມອ້າງວ່າ Quality Gate ຜ່ານຈາກ placeholder query.</p>
      </section>

      <section id="tec05-ai" className={styles.formalSection}>
        <h2><span>09</span> AI Escalation ແລະ Safeguards</h2>
        <p>AI ມີ 2 ຮູບແບບທີ່ຕ່າງກັນ: <strong>Semantic retrieval</strong> ຊ່ວຍຫາ candidate ຈາກຄວາມໝາຍ; <strong>Personalization/Learning-to-rank</strong> ໃຊ້ behavioral evidence ຈັດລຳດັບ. ອັນຫຼັງຕ້ອງການ data/consent ຫຼາຍກວ່າ ແລະຫ້າມເອົາ threshold ຂອງອັນທຳອິດໄປອ້າງແທນ.</p>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>Gate</th><th>Evidence required</th></tr></thead><tbody>{aiEscalationGates.map(([id, gate, evidence]) => <tr key={id}><td><code>{id}</code></td><td><strong>{gate}</strong></td><td>{evidence}</td></tr>)}</tbody></table></div>
        <h3>9.1 Non-negotiable safeguards</h3>
        <ul className={styles.formalPlainList}>
          <li>AI/embedding output ບໍ່ສ້າງ ຫຼືປ່ຽນ Place fact, opening hours, price, rating, verification ຫຼື Sponsored label.</li>
          <li>Taxonomy/alias suggestion ຈາກ AI ຕ້ອງຜ່ານ human review ກ່ອນກາຍເປັນ canonical term.</li>
          <li>Provider input ໃຊ້ສະເພາະ approved public fields ຫຼື consented aggregate; request evidence, contact PII, Admin/Audit ແລະ raw query ບໍ່ອອກນອກ boundary.</li>
          <li>Model/vendor/version, feature flag, experiment cohort, latency, cost ແລະ fallback outcome ຕ້ອງກວດຍ້ອນໄດ້.</li>
        </ul>
      </section>

      <section id="tec05-operations" className={styles.formalSection}>
        <h2><span>10</span> Failure, Monitoring ແລະ Handoff</h2>
        <h3>10.1 Failure and recovery matrix</h3>
        <div className={styles.formalTableWrap}><table className={styles.formalTable}><thead><tr><th>Condition</th><th>System behavior</th><th>User/operations recovery</th></tr></thead><tbody>{failureMatrix.map(([condition, behavior, recovery]) => <tr key={condition}><th>{condition}</th><td>{behavior}</td><td>{recovery}</td></tr>)}</tbody></table></div>
        <h3>10.2 Required telemetry</h3>
        <ul className={styles.formalPlainList}>
          <li><strong>Technical:</strong> request/trace ID, normalization/ranking version, latency p50/p95/p99, candidate count by channel, DB duration, rows examined/returned, timeout/error, projection age/lag ແລະ fallback used.</li>
          <li><strong>Product:</strong> normalized intent/category/area/price IDs, result-count bucket, result open, Place open, source click, Decision Intent, reformulation ແລະ clear-filter—ຕາມ consent/event allowlist.</li>
          <li><strong>Integrity:</strong> non-Published candidate caught by final gate, Sponsored label missing, campaign outside window, duplicate Place/Source, ranking version mismatch ແລະ dead projection job.</li>
        </ul>
        <h3>10.3 Implementation order</h3>
        <ol className={styles.formalNumberList}>
          <li>ລັອກ 100-Place inventory, CON-01 term registry ແລະ 60-query benchmark template.</li>
          <li>ສ້າງ normalization package ພ້ອມ unit/property fixtures; version output.</li>
          <li>ສ້າງ/rebuild <code>place_search_documents</code> ຜ່ານ outbox/worker ແລະກວດ projection lag.</li>
          <li>ສ້າງ RET-01—07, hard filters, Organic V1 ແລະ deterministic cursor/tie-break.</li>
          <li>ເພີ່ມ Sponsored slot ແຍກ, explicit empty recovery, recommendation rules ແລະ telemetry.</li>
          <li>ສ້າງ gold judgments, rerun benchmark/load/security tests ແລະປິດ QG-S01—08 ກ່ອນ Public Pilot.</li>
        </ol>
        <h3>10.4 Preview/download artifacts</h3>
        <div className={styles.architectureArtifacts}>
          <a href={`${basePath}/artifact-preview?file=tec05-search-recommendation-baseline-2026-08-30.json&from=ai-recommendation`}><b>ພຣີວິວ TEC-05 Baseline JSON</b><span>Scope, formula, phases, quality/AI gates ແລະ safeguards</span></a>
          <a href={`${basePath}/artifact-preview?file=tec05-lao-search-benchmark-template-2026-08-30.csv&from=ai-recommendation`}><b>ພຣີວິວ Lao Benchmark CSV</b><span>60 query slots, filters, judgments, rank/latency ແລະ result</span></a>
          <a href={`${basePath}/artifact-preview?file=tec05-ranking-signal-register-2026-08-30.csv&from=ai-recommendation`}><b>ພຣີວິວ Ranking/Signal CSV</b><span>Feature, weight, source, phase, privacy ແລະ commercial-integrity control</span></a>
          <a href={`${basePath}/templates/tec05-search-recommendation-baseline-2026-08-30.json`} download><b>ດາວໂຫຼດ Baseline JSON</b><span>Machine-readable handoff</span></a>
          <a href={`${basePath}/templates/tec05-lao-search-benchmark-template-2026-08-30.csv`} download><b>ດາວໂຫຼດ Benchmark CSV</b><span>ຕື່ມຫຼັງ inventory/taxonomy ລັອກ</span></a>
          <a href={`${basePath}/templates/tec05-ranking-signal-register-2026-08-30.csv`} download><b>ດາວໂຫຼດ Signal CSV</b><span>Developer/QA/Privacy review register</span></a>
        </div>
      </section>

      <section id="tec05-sources" className={styles.formalSection}>
        <h2><span>11</span> Official Source Register</h2>
        <p>ແຫຼ່ງອ້າງອີງນີ້ກວດໃນວັນທີ 30 ສິງຫາ 2026. ມັນຢືນຢັນຄວາມສາມາດຂອງ Unicode/PostgreSQL; ranking weight ແລະ quality threshold ຍັງເປັນຂໍ້ຕັດສິນຂອງໂຄງການທີ່ຕ້ອງພິສູດດ້ວຍ Lao benchmark.</p>
        <ul className={styles.formalNumberList}>
          <li><a href="https://www.unicode.org/reports/tr15/">Unicode Standard Annex #15</a> — Unicode Normalization Forms ແລະ conformance test.</li>
          <li><a href="https://www.postgresql.org/docs/18/functions-string.html">PostgreSQL 18 String Functions</a> — <code>normalize(text, NFC)</code> ແລະ normalized-form checking ໃນ UTF-8 database.</li>
          <li><a href="https://www.postgresql.org/docs/18/pgtrgm.html">PostgreSQL 18 pg_trgm</a> — similarity/word similarity, GIN/GiST index support ແລະ full-text integration.</li>
          <li><a href="https://www.postgresql.org/docs/18/functions-textsearch.html">PostgreSQL Text Search Functions</a> — <code>ts_rank</code>/<code>ts_rank_cd</code> ແລະ query functions.</li>
          <li><a href="https://www.postgresql.org/docs/18/textsearch-indexes.html">PostgreSQL Preferred Text Search Indexes</a> ແລະ <a href="https://www.postgresql.org/docs/18/gin.html">GIN Indexes</a>.</li>
        </ul>
      </section>

      <section id="tec05-review" className={styles.formalSection}>
        <h2><span>12</span> ບັນທຶກ 5 ການຕັດສິນທີ່ອະນຸມັດ</h2>
        <p>Founder ອະນຸມັດ REV-01—05 ໃນວັນທີ 30 ສິງຫາ 2026. ການປ່ຽນ MVP boundary, Organic V1, commercial-integrity rule, privacy boundary ຫຼື AI escalation gate ຫຼັງຈາກນີ້ຕ້ອງມີ Change Decision ແລະຫຼັກຖານປະກອບ.</p>
        <div className={styles.formalTableWrap}><table className={`${styles.formalTable} ${styles.formalCatalogTable}`}><thead><tr><th>ID</th><th>ຫົວຂໍ້</th><th>ຜົນຕັດສິນ</th><th>ຂອບເຂດທີ່ຖືກລັອກ</th></tr></thead><tbody>{reviewDecisions.map(([id, title, decision, scope]) => <tr key={id}><td><code>{id}</code></td><td><strong>{title}</strong></td><td>{decision}</td><td>{scope}</td></tr>)}</tbody></table></div>
        <aside className={styles.formalDecision}><strong>TEC-05 1.0 baseline</strong><p>Normalization, retrieval, ranking, filter, recommendation, fallback, 60-query benchmark template ແລະ signal register ຖືກລັອກສຳລັບ Developer Handoff. QG-S01—08 ຍັງຕ້ອງມີ evidence ກ່ອນ Public Pilot; placeholder benchmark ບໍ່ຖືວ່າເປັນຜົນຜ່ານ.</p></aside>
      </section>

      <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
        <a href={`${basePath}/documents/data-api`}><small>← PREVIOUS</small><strong>TEC-04 · ຖານຂໍ້ມູນ ແລະ API</strong></a>
        <a href={`${basePath}/documents/security-infrastructure`}><small>NEXT →</small><strong>TEC-06 · Security, Privacy &amp; Infrastructure</strong></a>
      </nav>
    </article>
  );
}
