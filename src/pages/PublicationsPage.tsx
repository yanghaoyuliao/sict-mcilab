import { useState } from "react";
import { asset } from "../lib/assets";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  Download,
  ArrowRight,
  SlidersHorizontal,
  Copy,
  FileText,
  X,
} from "lucide-react";
import records from "../data/publications.json";
import { research } from "../data/research";
import { useLab, copyText } from "../context/LabContext";
import { EmptyState, Modal, PageHeading } from "../components/ui";

export type Paper = (typeof records)[number];
export const publications: Paper[] = records;
export const publicationStats = {
  total: records.length,
  a: records.filter((p) => p.ccf === "A").length,
  b: records.filter((p) => p.ccf === "B").length,
  published: records.filter((p) => p.published).length,
  accepted: records.filter((p) => !p.published).length,
};
export function PaperStatus({ paper }: { paper: Paper }) {
  const { t } = useLab();
  return (
    <span
      className={`paper-status ${paper.published ? "published" : "accepted"}`}
    >
      <span />
      {paper.published ? t("已发表", "Published") : t("已录用", "Accepted")}
    </span>
  );
}
export function PaperDetails({
  paper,
  onClose,
}: {
  paper: Paper;
  onClose: () => void;
}) {
  const { t, notify } = useLab();
  const copyReference = async () => {
    const value = `${paper.title}. ${paper.venue}, ${paper.year}. ${paper.url}`;
    notify(
      (await copyText(value))
        ? t("论文题名、出处与链接已复制", "Title, venue, and link copied")
        : t(
            "无法访问剪贴板，请手动复制论文链接",
            "Clipboard unavailable. Please copy the paper link manually.",
          ),
    );
  };
  return (
    <Modal title={paper.title} onClose={onClose}>
      <div className="paper-detail-badges">
        <span className="venue-badge">
          {paper.venue} {paper.year}
        </span>
        {paper.ccf && <span className="ccf-badge">CCF {paper.ccf}</span>}
        <PaperStatus paper={paper} />
      </div>
      <dl className="paper-details">
        <div>
          <dt>
            {"authorOrderPending" in paper && paper.authorOrderPending
              ? t(
                  "实验室相关作者（顺序待核）",
                  "Related lab authors (order pending verification)",
                )
              : t("实验室相关作者", "Related lab authors")}
          </dt>
          <dd>{paper.authors.join(", ")}</dd>
        </div>
        <div>
          <dt>{t("发表状态", "Publication status")}</dt>
          <dd>
            {paper.published
              ? t("已发表", "Published")
              : t("已录用", "Accepted")}
          </dd>
        </div>
        <div>
          <dt>{t("成果归属", "Affiliation")}</dt>
          <dd>
            {paper.affiliation === "核心团队"
              ? t("核心团队", "Core lab team")
              : t("合作论文", "Collaborative publication")}
          </dd>
        </div>
        <div>
          <dt>{t("来源备注", "Source note")}</dt>
          <dd>
            <a
              className="text-link"
              href={paper.url}
              target="_blank"
              rel="noreferrer"
            >
              {paper.venueFull}
              <ArrowUpRight size={14} />
            </a>
          </dd>
        </div>
      </dl>
      <div className="dialog-actions">
        <a
          className="button button-primary"
          href={paper.url}
          target="_blank"
          rel="noreferrer"
        >
          {t("访问论文原文", "Read the paper")}
          <ArrowUpRight size={17} />
        </a>
        <button className="button button-outline" onClick={copyReference}>
          <Copy size={16} />
          {t("复制题名与链接", "Copy reference link")}
        </button>
      </div>
    </Modal>
  );
}
export function FeaturedPapers() {
  const { t } = useLab();
  const [selected, setSelected] = useState<Paper | null>(null);
  const featured = ["paper-01", "paper-05", "paper-06"].map((id) =>
    records.find((p) => p.id === id)!,
  );
  const figures: Record<string, string> = {
    "paper-01": "images/news/genprove-2026/figure-3.webp",
    "paper-05": "images/news/ggbench-2026/figure-1.webp",
    "paper-06": "images/news/geoint-r1-2026/figure-2.webp",
  };
  return (
    <>
      <div className="featured-papers">
        {featured.map((paper) => (
          <article className="featured-paper" key={paper.id}>
            <button
              className="paper-cover-button"
              onClick={() => setSelected(paper)}
              aria-label={`${t("查看论文详情：", "Paper details: ")}${paper.title}`}
            >
              <img
                src={asset(figures[paper.id])}
                alt=""
                width="260"
                height="160"
                loading="lazy"
              />
            </button>
            <div className="featured-paper-content">
              <div className="paper-meta">
                <span className="venue-badge">
                  {paper.venue} {paper.year}
                </span>
                {paper.ccf && (
                  <span className="ccf-badge">CCF {paper.ccf}</span>
                )}
              </div>
              <h3>
                <button onClick={() => setSelected(paper)}>
                  {paper.title}
                </button>
              </h3>
              <p>
                {t("相关作者：", "Lab authors: ")}
                {paper.authors.join(", ")}
              </p>
              <a
                className="text-link"
                href={paper.url}
                target="_blank"
                rel="noreferrer"
              >
                {t("论文原文", "Read paper")}
                <ArrowUpRight size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>
      {selected && (
        <PaperDetails paper={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

export default function PublicationsPage() {
  const { t, l, notify } = useLab();
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState<Paper | null>(null);
  const q = params.get("q") || "";
  const year = params.get("year") || "all";
  const ccf = params.get("ccf") || "all";
  const status = params.get("status") || "all";
  const topic = params.get("topic") || "all";
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (!value || value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  const topicRecords = research.find((r) => r.id === topic)?.papers;
  const filtered = records.filter(
    (p) =>
      (!q.trim() ||
        `${p.title} ${p.authors.join(" ")} ${p.venue}`
          .toLowerCase()
          .includes(q.trim().toLowerCase())) &&
      (year === "all" || p.year === Number(year)) &&
      (ccf === "all" || (ccf === "other" ? !p.ccf : p.ccf === ccf)) &&
      (status === "all" ||
        (status === "published" ? p.published : !p.published)) &&
      (topic === "all" || topicRecords?.includes(p.id)),
  );
  const years = [...new Set(records.map((p) => p.year))].sort((a, b) => b - a);
  const reset = () => setParams({});
  const exportCsv = () => {
    const escape = (value: unknown) => {
      const text = String(value);
      return `"${/^[=+@\-]/.test(text) ? "'" : ""}${text.replaceAll('"', '""')}"`;
    };
    const rows = [
      [
        t("年份", "Year"),
        t("题名", "Title"),
        t("会议/期刊", "Venue"),
        "CCF",
        t("实验室相关作者（按原文顺序）", "Lab authors (in paper order)"),
        t("状态", "Status"),
        t("链接", "URL"),
      ],
      ...filtered.map((p) => [
        p.year,
        p.title,
        p.venue,
        p.ccf ?? "",
        p.authors.join("; "),
        p.published ? t("已发表", "Published") : t("已录用", "Accepted"),
        p.url,
      ]),
    ];
    const blob = new Blob(
      ["\uFEFF" + rows.map((row) => row.map(escape).join(",")).join("\r\n")],
      { type: "text/csv;charset=utf-8;" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mci-publications.csv";
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify(
      t(
        `已导出 ${filtered.length} 项成果`,
        `Exported ${filtered.length} publications`,
      ),
    );
  };
  return (
    <>
      <PageHeading
        eyebrow="PUBLICATIONS"
        title={t("科研成果", "Publications")}
        description={t(
          "近三年（2024–2026）科研成果，包含已发表及已录用论文，可按研究方向、年份与发表状态检索。",
          "Research publications from the past three years (2024–2026), including published and accepted work.",
        )}
      >
        <div className="heading-stat-row">
          <span>
            <strong>{publicationStats.total}</strong>
            {t("篇论文", "publications")}
          </span>
          <span>{t("近三年 · 2024–2026", "Past three years · 2024–2026")}</span>
        </div>
      </PageHeading>
      <div className="container page-content">
        <section
          className="publication-filters"
          aria-label={t("论文筛选", "Publication filters")}
        >
          <div className="filter-top">
            <label className="search-field">
              <Search size={19} />
              <input
                type="search"
                value={q}
                onChange={(event) => update("q", event.target.value)}
                placeholder={t(
                  "搜索论文题目、作者或会议…",
                  "Search titles, authors, or venues…",
                )}
                aria-label={t("搜索论文", "Search publications")}
              />
              {q && (
                <button
                  className="icon-button"
                  onClick={() => update("q", "")}
                  aria-label={t("清空搜索", "Clear search")}
                >
                  <X size={17} />
                </button>
              )}
            </label>
            <button
              className="button button-outline export-button"
              onClick={exportCsv}
              disabled={!filtered.length}
            >
              <Download size={16} />
              {t("导出结果", "Export results")}
            </button>
          </div>
          <div className="filter-selects">
            <SlidersHorizontal size={16} />
            <label>
              <span>{t("年份", "Year")}</span>
              <select
                value={year}
                onChange={(e) => update("year", e.target.value)}
              >
                <option value="all">{t("所有年份", "All years")}</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </label>
            <label>
              <span>CCF</span>
              <select
                value={ccf}
                onChange={(e) => update("ccf", e.target.value)}
              >
                <option value="all">{t("所有等级", "All tiers")}</option>
                <option value="A">CCF A</option>
                <option value="B">CCF B</option>
                <option value="other">{t("其他", "Other")}</option>
              </select>
            </label>
            <label>
              <span>{t("状态", "Status")}</span>
              <select
                value={status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option value="all">{t("所有状态", "All statuses")}</option>
                <option value="published">{t("已发表", "Published")}</option>
                <option value="accepted">{t("已录用", "Accepted")}</option>
              </select>
            </label>
            <label className="topic-filter">
              <span>{t("方向", "Area")}</span>
              <select
                value={topic}
                onChange={(e) => update("topic", e.target.value)}
              >
                <option value="all">{t("所有方向", "All areas")}</option>
                {research.map((r) => (
                  <option key={r.id} value={r.id}>
                    {l(r.title)}
                  </option>
                ))}
              </select>
            </label>
            {params.size > 0 && (
              <button className="reset-filters" onClick={reset}>
                {t("重置", "Reset")}
              </button>
            )}
          </div>
        </section>
        <div className="results-count" role="status" aria-live="polite">
          <span>
            {t(
              `共 ${filtered.length} 项成果`,
              `${filtered.length} publications`,
            )}
          </span>
          <span>{t("按年份倒序排列", "Newest year first")}</span>
        </div>
        {filtered.length ? (
          years.map((y) => {
            const items = filtered.filter((p) => p.year === y);
            if (!items.length) return null;
            return (
              <section className="publication-year" key={y}>
                <div className="year-heading">
                  <h2>{y}</h2>
                  <span>
                    {items.length} {t("项成果", "works")}
                  </span>
                </div>
                <div className="paper-list">
                  {items.map((p) => (
                    <article key={p.id} className="paper-row">
                      <div className="paper-row-icon">
                        <FileText size={21} />
                      </div>
                      <div className="paper-row-main">
                        <div className="paper-meta">
                          <span className="venue-badge">{p.venue}</span>
                          {p.ccf && (
                            <span className="ccf-badge">CCF {p.ccf}</span>
                          )}
                          <PaperStatus paper={p} />
                          {p.affiliation === "合作论文" && (
                            <span className="collaboration-label">
                              {t("合作论文", "Collaboration")}
                            </span>
                          )}
                        </div>
                        <h3>
                          <button onClick={() => setSelected(p)}>
                            {p.title}
                          </button>
                        </h3>
                        <p>
                          {t("实验室相关作者：", "Related lab authors: ")}
                          {p.authors.join(", ")}
                        </p>
                        <div className="paper-row-links">
                          <a href={p.url} target="_blank" rel="noreferrer">
                            {t("论文原文", "Read paper")}
                            <ArrowUpRight size={14} />
                          </a>
                          <button onClick={() => setSelected(p)}>
                            {t("查看详情", "Details")}
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <EmptyState
            title={t("没有找到匹配的成果", "No matching publications")}
            description={t(
              "试试其他关键词，或放宽筛选条件。",
              "Try another keyword or adjust the filters.",
            )}
            onReset={reset}
          />
        )}
        <div className="source-footnote">
          {t(
            "本页汇总近三年（2024–2026）成果；实验室相关作者按原文顺序整理，包含往届成员，个别待核条目在详情中注明。",
            "This list covers 2024–2026. Lab authors are listed in paper order, including former members; outstanding author-order checks are marked in the details.",
          )}{" "}
          <Link to="/contact">
            {t("联系我们更正信息", "Contact us about a correction")}
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
      {selected && (
        <PaperDetails paper={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
