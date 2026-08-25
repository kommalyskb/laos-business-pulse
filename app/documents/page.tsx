"use client";

import { useMemo, useState } from "react";
import { categories, documents } from "./documentData";
import styles from "./documents.module.css";

const statusView = {
  approved: { label: "ອະນຸມັດແລ້ວ", className: styles.approved },
  in_progress: { label: "ກຳລັງຈັດເຮັດ", className: styles.inProgress },
  draft: { label: "ຮ່າງສຳລັບທົບທວນ", className: styles.draft },
  next: { label: "ລຳດັບຕໍ່ໄປ", className: styles.next },
  planned: { label: "ວາງແຜນ", className: styles.planned },
};

export default function DocumentDirectory() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const visibleDocuments = useMemo(() => {
    const term = query.trim().toLowerCase();
    return documents.filter((document) => {
      const inCategory = activeCategory === "all" || document.category === activeCategory;
      const searchable = `${document.code} ${document.title} ${document.english} ${document.summary}`.toLowerCase();
      return inCategory && (!term || searchable.includes(term));
    });
  }, [activeCategory, query]);

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

      <section className={styles.hero}>
        <div>
          <p>PROJECT KNOWLEDGE BASE · VERSION 01</p>
          <h1>ສູນລວມ<br /><span>ເອກະສານ.</span></h1>
        </div>
        <div className={styles.heroCopy}>
          <strong>ແຫຼ່ງຂໍ້ມູນດຽວຂອງໂຄງການ</strong>
          <p>ຈັດລຽງເອກະສານຕັ້ງແຕ່ business, product ແລະ content ໄປຈົນເຖິງ design, engineering ແລະການ launch.</p>
          <div><b>{documents.length}</b><span>ເອກະສານ</span><b>{categories.length}</b><span>ໝວດ</span></div>
        </div>
      </section>

      <section className={styles.directory}>
        <aside className={styles.sidebar}>
          <span>FILTER BY CATEGORY</span>
          <button className={activeCategory === "all" ? styles.active : ""} onClick={() => setActiveCategory("all")}><b>00</b>ທັງໝົດ <i>{documents.length}</i></button>
          {categories.map((category) => (
            <button key={category.id} className={activeCategory === category.id ? styles.active : ""} onClick={() => setActiveCategory(category.id)}>
              <b>{category.no}</b>{category.lao}<i>{documents.filter((document) => document.category === category.id).length}</i>
            </button>
          ))}
        </aside>

        <div className={styles.content}>
          <div className={styles.tools}>
            <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ຄົ້ນຫາຊື່ ຫຼື ລະຫັດເອກະສານ..." /></label>
            <b>{visibleDocuments.length} DOCUMENTS</b>
          </div>

          {categories.map((category) => {
            const categoryDocuments = visibleDocuments.filter((document) => document.category === category.id);
            if (!categoryDocuments.length) return null;
            return (
              <section className={styles.category} key={category.id} id={category.id}>
                <header>
                  <div><span>{category.no}</span><p>{category.title}</p></div>
                  <div><h2>{category.lao}</h2><p>{category.description}</p></div>
                </header>
                <div className={styles.docGrid}>
                  {categoryDocuments.map((document) => (
                    <a href={`${basePath}/documents/${document.slug}`} className={styles.docCard} key={document.slug}>
                      <div><code>{document.code}</code><span className={statusView[document.status].className}>{statusView[document.status].label}</span></div>
                      <h3>{document.title}</h3>
                      <small>{document.english}</small>
                      <p>{document.summary}</p>
                      <footer><span>ເປີດເອກະສານ</span><b>↗</b></footer>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}

          {!visibleDocuments.length && <div className={styles.empty}><b>ບໍ່ພົບເອກະສານ</b><p>ລອງປ່ຽນຄຳຄົ້ນຫາ ຫຼືເລືອກໝວດອື່ນ.</p></div>}
        </div>
      </section>
    </main>
  );
}
