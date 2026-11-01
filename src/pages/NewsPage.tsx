import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Maximize2, Search } from "lucide-react";
import news from "../data/news.json";
import { useLab } from "../context/LabContext";
import { EmptyState, Modal, PageHeading } from "../components/ui";
import { asset } from "../lib/assets";
import { PaperDetails, publications } from "./PublicationsPage";
import type { Paper } from "./PublicationsPage";
import NotFoundPage from "./NotFoundPage";

export default function NewsPage() {
  const { t, l } = useLab();
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const years = [...new Set(news.map((n) => n.date.slice(0, 4)))];
  const filtered = news.filter(
    (n) =>
      (year === "all" || n.date.startsWith(year)) &&
      `${l(n.title)} ${l(n.summary)} ${n.venue}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="News"
        title={t("新闻动态", "News")}
        description={t(
          "实验室科研进展与学术交流。",
          "Research updates and academic exchange.",
        )}
      />
      <div className="container page-content">
        <div className="news-toolbar">
          <div
            className="filter-tabs"
            role="group"
            aria-label={t("新闻年份", "News year")}
          >
            {["all", ...years].map((y) => (
              <button
                key={y}
                className={year === y ? "active" : ""}
                aria-pressed={year === y}
                onClick={() => setYear(y)}
              >
                {y === "all" ? t("全部", "All") : y}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} />
            <input
              type="search"
              aria-label={t("搜索新闻", "Search news")}
              placeholder={t("搜索新闻、会议…", "Search news or venue…")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="results-count" role="status">
          {t(`共 ${filtered.length} 条动态`, `${filtered.length} updates`)}
        </p>
        <div className="news-list news-archive">
          {filtered.map((item) => (
            <article key={item.id}>
              <time dateTime={item.date}>{item.date.replaceAll("-", ".")}</time>
              <Link
                to={`/news/${item.id}`}
                className="news-preview"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={asset(item.image)}
                  alt=""
                  loading="lazy"
                  width="360"
                  height="220"
                />
              </Link>
              <div>
                <div className="news-venue">{item.venue}</div>
                <h2>
                  <Link to={`/news/${item.id}`}>{l(item.title)}</Link>
                </h2>
                <p>{l(item.summary)}</p>
                <Link className="text-link" to={`/news/${item.id}`}>
                  {t("阅读详情", "Read more")}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <EmptyState
            title={t("未找到匹配的动态", "No matching news")}
            description={t(
              "请尝试其他关键词或年份。",
              "Try another keyword or year.",
            )}
            onReset={() => {
              setQuery("");
              setYear("all");
            }}
          />
        )}
      </div>
    </>
  );
}
export function NewsDetailPage() {
  const { id } = useParams();
  const { t, l } = useLab();
  const item = news.find((n) => n.id === id);
  const [selected, setSelected] = useState<Paper | null>(null);
  const [zoom, setZoom] = useState<{ image: string; caption: string } | null>(
    null,
  );
  if (!item) return <NotFoundPage />;
  const paper = publications.find((p) => p.id === item.paperId);
  const position = news.indexOf(item);
  const next = news[position + 1];
  return (
    <>
      <div className="container article-breadcrumb breadcrumb">
        <Link to="/">{t("首页", "Home")}</Link>
        <span>/</span>
        <Link to="/news">{t("新闻动态", "News")}</Link>
      </div>
      <article className="article-content">
        <header className="article-header">
          <span className="section-label">{item.venue}</span>
          <h1>{l(item.title)}</h1>
          <div className="article-meta">
            <time dateTime={item.date}>{item.date.replaceAll("-", ".")}</time>
            <span>{l(item.category)}</span>
          </div>
          <p className="article-lead">{l(item.summary)}</p>
        </header>
        <div className="article-body">
          {item.sections.map((section, i) => (
            <section key={i}>
              {section.heading && <h2>{l(section.heading)}</h2>}
              <p>{l(section.body)}</p>
              {section.image && section.caption && (
                <figure>
                  <button
                    className="article-figure-button"
                    aria-label={`${t("放大查看：", "Enlarge: ")}${l(section.caption)}`}
                    onClick={() =>
                      setZoom({
                        image: section.image!,
                        caption: l(section.caption!),
                      })
                    }
                  >
                    <img
                      src={asset(section.image)}
                      alt={l(section.caption)}
                      loading="lazy"
                    />
                    <span>
                      <Maximize2 size={16} />
                      {t("放大", "Enlarge")}
                    </span>
                  </button>
                  <figcaption>{l(section.caption)}</figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>
        {item.byline && <p className="article-byline">{l(item.byline)}</p>}
        {(paper || item.paperTitle) && (
          <aside className="article-paper">
            <span className="section-label">
              {t("相关论文", "RELATED PAPER")}
            </span>
            <h2>{paper?.title ?? item.paperTitle}</h2>
            <p>{item.venue}</p>
            {paper && (
              <button className="text-link" onClick={() => setSelected(paper)}>
                {t("论文信息与原文", "Paper details and link")}
                <ArrowUpRight size={15} />
              </button>
            )}
          </aside>
        )}
        <div className="article-bottom">
          <Link className="text-link" to="/news">
            ← {t("返回新闻列表", "Back to news")}
          </Link>
          {item.source && (
            <a
              className="text-link"
              href={item.source}
              target="_blank"
              rel="noreferrer"
            >
              {t("原站记录", "Original update")}
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
        {next && (
          <Link to={`/news/${next.id}`} className="next-article">
            <span>{t("下一篇", "Next article")}</span>
            <strong>{l(next.title)}</strong>
            <ArrowRight size={19} />
          </Link>
        )}
      </article>
      {selected && (
        <PaperDetails paper={selected} onClose={() => setSelected(null)} />
      )}
      {zoom && (
        <Modal title={zoom.caption} onClose={() => setZoom(null)} wide>
          <img
            className="enlarged-figure"
            src={asset(zoom.image)}
            alt={zoom.caption}
          />
        </Modal>
      )}
    </>
  );
}
