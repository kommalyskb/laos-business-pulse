"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import styles from "./artifact-preview.module.css";

const supportedFile = /^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(md|csv|json|css)$/;
const supportedDocument = /^[a-z0-9-]+$/;

type PreviewState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; content: string };

const invalidJson = Symbol("invalid-json");

function parseCsv(source: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];
    if (character === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell);
  if (row.some((value) => value.length > 0)) rows.push(row);
  return rows;
}

function MarkdownPreview({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const ListTag = list.ordered ? "ol" : "ul";
    blocks.push(<ListTag key={`list-${blocks.length}`}>{list.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ListTag>);
    list = null;
  };

  lines.forEach((line) => {
    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    const bullet = /^[-*]\s+(.+)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(line);

    if (heading) {
      flushList();
      const level = Math.min(heading[1].length + 1, 4);
      const HeadingTag = `h${level}` as "h2" | "h3" | "h4";
      blocks.push(<HeadingTag key={`heading-${blocks.length}`}>{heading[2]}</HeadingTag>);
    } else if (bullet || numbered) {
      const ordered = Boolean(numbered);
      const item = (bullet ?? numbered)?.[1] ?? "";
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push(item);
    } else if (!line.trim()) {
      flushList();
    } else {
      flushList();
      blocks.push(<p key={`paragraph-${blocks.length}`}>{line}</p>);
    }
  });
  flushList();
  return <div className={styles.markdown}>{blocks}</div>;
}

function JsonNode({ label, value, depth = 0 }: { label?: string; value: unknown; depth?: number }) {
  if (value === null || typeof value !== "object") {
    return <div className={styles.jsonValue}><b>{label ?? "value"}</b><span>{value === null ? "null" : String(value)}</span></div>;
  }

  const entries = Array.isArray(value) ? value.map((item, index) => [String(index + 1), item] as const) : Object.entries(value as Record<string, unknown>);
  return <details className={styles.jsonGroup} open={depth < 2}>
    <summary><strong>{label ?? (Array.isArray(value) ? "Array" : "Object")}</strong><span>{entries.length} {Array.isArray(value) ? "items" : "fields"}</span></summary>
    <div>{entries.map(([key, child]) => <JsonNode key={key} label={key} value={child} depth={depth + 1} />)}</div>
  </details>;
}

export default function ArtifactPreviewClient() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [fileName, setFileName] = useState("");
  const [fromDocument, setFromDocument] = useState("");
  const [preview, setPreview] = useState<PreviewState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    const loadPreview = async () => {
      await Promise.resolve();
      const search = new URLSearchParams(window.location.search);
      const requestedFile = search.get("file") ?? "";
      const requestedDocument = search.get("from") ?? "";
      setFromDocument(supportedDocument.test(requestedDocument) ? requestedDocument : "documents");

      if (!supportedFile.test(requestedFile)) {
        setPreview({ status: "error", message: "ໄຟລ໌ນີ້ບໍ່ຢູ່ໃນຮູບແບບທີ່ Preview ໄດ້." });
        return;
      }

      setFileName(requestedFile);
      try {
        const response = await fetch(`${basePath}/templates/${encodeURIComponent(requestedFile)}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setPreview({ status: "ready", content: await response.text() });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setPreview({ status: "error", message: "ບໍ່ສາມາດໂຫຼດໄຟລ໌ໄດ້. ກະລຸນາລອງໃໝ່." });
        }
      }
    };

    void loadPreview();
    return () => controller.abort();
  }, [basePath]);

  const extension = fileName.split(".").pop()?.toUpperCase() ?? "FILE";
  const backPath = fromDocument === "documents" ? `${basePath}/documents` : `${basePath}/documents/${fromDocument}#artifacts`;
  const downloadPath = fileName ? `${basePath}/templates/${encodeURIComponent(fileName)}` : "";
  const csvRows = useMemo(() => preview.status === "ready" && extension === "CSV" ? parseCsv(preview.content) : [], [extension, preview]);
  const jsonValue = useMemo(() => {
    if (preview.status !== "ready" || extension !== "JSON") return invalidJson;
    try {
      return JSON.parse(preview.content) as unknown;
    } catch {
      return invalidJson;
    }
  }, [extension, preview]);

  let content: ReactNode = null;
  if (preview.status === "loading") content = <div className={styles.state}><span className={styles.spinner} aria-hidden="true"/><p>ກຳລັງໂຫຼດ Preview…</p></div>;
  if (preview.status === "error") content = <div className={styles.state}><strong>ບໍ່ສາມາດສະແດງ Preview</strong><p>{preview.message}</p></div>;
  if (preview.status === "ready" && extension === "MD") content = <MarkdownPreview content={preview.content} />;
  if (preview.status === "ready" && extension === "CSV") content = <div className={styles.csvWrap}><table><thead><tr>{(csvRows[0] ?? []).map((cell, index) => <th key={`${cell}-${index}`}>{cell || `Column ${index + 1}`}</th>)}</tr></thead><tbody>{csvRows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{(csvRows[0] ?? []).map((_, cellIndex) => <td key={cellIndex}>{row[cellIndex] || <span className={styles.emptyCell}>ວ່າງ</span>}</td>)}</tr>)}</tbody></table></div>;
  if (preview.status === "ready" && extension === "JSON") content = jsonValue === invalidJson ? <pre className={styles.code}>{preview.content}</pre> : <div className={styles.jsonTree}><JsonNode value={jsonValue} /></div>;
  if (preview.status === "ready" && extension === "CSS") content = <pre className={styles.code}>{preview.content}</pre>;

  return <main className={styles.page}>
    <header className={styles.topbar}><a href={`${basePath}/documents`} className={styles.brand}>ພ້ອມ<span>ໄປ</span><small>DOCS</small></a><a href={backPath}>← ກັບໄປເອກະສານ</a></header>
    <section className={styles.hero}><div><span>{extension} · WEB PREVIEW</span><h1>{fileName || "ແບບຟອມ ແລະໄຟລ໌ນຳໃຊ້"}</h1><p>Preview ນີ້ຊ່ວຍໃຫ້ກວດເນື້ອຫາກ່ອນດາວໂຫຼດ. ໄຟລ໌ຕົ້ນສະບັບບໍ່ຖືກແກ້ໄຂ.</p></div>{downloadPath ? <a className={styles.download} href={downloadPath} download>ດາວໂຫຼດໄຟລ໌</a> : null}</section>
    <section className={styles.previewPanel} aria-live="polite">{content}</section>
    <footer><a href={backPath}>← ກັບໄປຫາລາຍການໄຟລ໌</a>{downloadPath ? <a href={downloadPath} download>ດາວໂຫຼດ {fileName}</a> : null}</footer>
  </main>;
}
