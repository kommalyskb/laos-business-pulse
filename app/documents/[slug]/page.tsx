import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, documents, getDocument } from "../documentData";
import styles from "../documents.module.css";
import BusinessCanvasDocument from "./BusinessCanvasDocument";
import FeasibilityStudyDocument from "./FeasibilityStudyDocument";
import FinancialStructureDocument from "./FinancialStructureDocument";
import ProductVisionDocument from "./ProductVisionDocument";

export function generateStaticParams() {
  return documents.map((document) => ({ slug: document.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const document = getDocument(slug);
  if (!document) return {};
  return {
    title: `${document.title} | ພ້ອມໄປ Docs`,
    description: document.summary,
    openGraph: { title: document.title, description: document.summary, images: [] },
    twitter: { title: document.title, description: document.summary, images: [] },
  };
}

export default async function DocumentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const document = getDocument(slug);
  if (!document) notFound();

  const category = categories.find((item) => item.id === document.category);
  const categoryDocuments = documents.filter((item) => item.category === document.category);
  const currentIndex = categoryDocuments.findIndex((item) => item.slug === document.slug);
  const previous = categoryDocuments[currentIndex - 1];
  const next = categoryDocuments[currentIndex + 1];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const status = document.status === "approved"
    ? { label: "ອະນຸມັດແລ້ວ", className: styles.statusApproved }
    : document.status === "draft"
      ? { label: "ຮ່າງສຳລັບທົບທວນ", className: styles.statusDraft }
      : document.status === "next"
        ? { label: "ລຳດັບຕໍ່ໄປ", className: styles.statusNext }
        : { label: "ວາງແຜນ", className: styles.statusPlanned };

  return (
    <main className={styles.site}>
      <header className={styles.topbar}>
        <a className={styles.brand} href={`${basePath}/platform`}>ພ້ອມ<span>ໄປ</span><small>DOCS</small></a>
        <nav aria-label="ນຳທາງຫຼັກ">
          <a href={`${basePath}/`}>ບົດລາຍງານ</a>
          <a href={`${basePath}/platform`}>ບົດນຳສະເໜີ</a>
          <a className={styles.current} href={`${basePath}/documents`}>ເອກະສານ</a>
        </nav>
      </header>

      <section className={styles.detailHero}>
        <a href={`${basePath}/documents`}>← ກັບໄປ Document Directory</a>
        <div className={styles.detailTitle}>
          <div><code>{document.code}</code><span>{category?.title}</span></div>
          <div><h1>{document.title}</h1><p>{document.english}</p></div>
        </div>
      </section>

      <section className={styles.detailLayout}>
        <aside className={styles.detailMeta}>
          <div><small>STATUS</small><strong className={status.className}>{status.label}</strong></div>
          <div><small>CATEGORY</small><strong>{category?.lao}</strong></div>
          <div><small>DOCUMENT ID</small><strong>{document.code}</strong></div>
          <div><small>FORMAT</small><strong>Living Web Document</strong></div>
          <p>ເອກະສານນີ້ຈະຖືກປັບປຸງຕາມການຕັດສິນໃຈ ແລະຫຼັກຖານໃໝ່ຂອງໂຄງການ.</p>
        </aside>

        {document.slug === "product-vision"
          ? <ProductVisionDocument basePath={basePath} />
          : document.slug === "business-canvas"
            ? <BusinessCanvasDocument basePath={basePath} />
            : document.slug === "feasibility-study"
              ? <FeasibilityStudyDocument basePath={basePath} />
              : document.slug === "financial-structure"
                ? <FinancialStructureDocument basePath={basePath} />
                : <article className={styles.detailBody}>
          <section>
            <span>01 · PURPOSE</span>
            <h2>ຈຸດປະສົງ</h2>
            <p className={styles.detailLead}>{document.summary}</p>
          </section>

          <section>
            <span>02 · EXPECTED CONTENT</span>
            <h2>ໂຄງຮ່າງເນື້ອຫາ</h2>
            <ol className={styles.outlineList}>
              {document.sections.map((section, index) => <li key={section}><b>0{index + 1}</b><span>{section}</span></li>)}
            </ol>
          </section>

          <section>
            <span>03 · DEFINITION OF DONE</span>
            <h2>ເກນສຳເລັດ</h2>
            <div className={styles.doneGrid}>
              <div><b>✓</b><p>ມີ owner ແລະຜູ້ອະນຸມັດທີ່ຊັດເຈນ</p></div>
              <div><b>✓</b><p>ສົມມຸດຖານ ແລະແຫຼ່ງຂໍ້ມູນຖືກລະບຸ</p></div>
              <div><b>✓</b><p>ການຕັດສິນໃຈສຳຄັນຖືກບັນທຶກ</p></div>
              <div><b>✓</b><p>ເອກະສານທີ່ກ່ຽວຂ້ອງມີ link ເຊື່ອມຫາກັນ</p></div>
            </div>
          </section>

          <aside className={styles.draftNote}>
            <b>DOCUMENT STATUS</b>
            <p>ໜ້ານີ້ເປັນໂຄງສ້າງສຳລັບຈັດເຮັດເອກະສານ. ເນື້ອຫາສະບັບຈິງຈະຖືກຕື່ມ ແລະອະນຸມັດເປັນລຳດັບ.</p>
          </aside>

          <nav className={styles.docPagination} aria-label="ເອກະສານກ່ອນໜ້າ ແລະຕໍ່ໄປ">
            {previous ? <a href={`${basePath}/documents/${previous.slug}`}><small>← PREVIOUS</small><strong>{previous.title}</strong></a> : <span />}
            {next ? <a href={`${basePath}/documents/${next.slug}`}><small>NEXT →</small><strong>{next.title}</strong></a> : <span />}
          </nav>
        </article>}
      </section>
    </main>
  );
}
