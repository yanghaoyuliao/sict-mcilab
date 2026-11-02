import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { research } from "../data/research";
import news from "../data/news.json";
import { useLab } from "../context/LabContext";
import { PageHeading } from "../components/ui";
import { publications, PaperDetails } from "./PublicationsPage";
import type { Paper } from "./PublicationsPage";
import { asset } from "../lib/assets";
const illustrations: Record<string, string> = {
  reasoning: "geoint-r1-2026",
  generation: "tool-verifier-2026",
  language: "genprove-2026",
};
export default function ResearchPage() {
  const { t, l, lang } = useLab();
  const [selected, setSelected] = useState<Paper | null>(null);
  return (
    <>
      <PageHeading
        eyebrow="Research"
        title={t("研究方向", "Research")}
        description={t(
          "多模态理解与推理、结构化生成与智能体、科学智能、语言模型与高效学习。",
          "Multimodal reasoning, structured generation and agents, AI for science, and efficient language modeling.",
        )}
      />
      <div className="container page-content research-page">
        <nav
          className="research-jump"
          aria-label={t("研究方向索引", "Research area index")}
        >
          {research.map((r) => (
            <Link to={`/research#${r.id}`} key={r.id}>
              {l(r.title)}
            </Link>
          ))}
        </nav>
        {research.map((r) => {
          const update = news.find((n) => n.id === illustrations[r.id]);
          return (
            <section id={r.id} key={r.id} className="research-detail">
              <div className="research-description">
                <span className="section-label">
                  {r.number} / {r.subtitle}
                </span>
                <h2>{l(r.title)}</h2>
                <p>{l(r.detail)}</p>
                <p className="research-keywords">{r.tags[lang].join(" · ")}</p>
                {update && (
                  <Link to={`/news/${update.id}`} className="research-figure">
                    <img
                      src={asset(update.image)}
                      alt={l(update.title)}
                      loading="lazy"
                    />
                    <span>
                      {l(update.title)}
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                )}
                {!update && (
                  <p className="research-context">
                    {t(
                      "相关研究涉及科学文献、图表理解与跨文档知识组织。",
                      "Related studies cover scientific literature, chart understanding, and knowledge organization across documents.",
                    )}
                  </p>
                )}
              </div>
              <div className="related-papers">
                <h3>{t("相关成果", "Related publications")}</h3>
                {r.papers.slice(0, 3).map((id) => {
                  const p = publications.find((p) => p.id === id);
                  return p ? (
                    <button key={id} onClick={() => setSelected(p)}>
                      <span className="related-venue">
                        {p.venue} {p.year}
                      </span>
                      <span>{p.title}</span>
                      <ArrowUpRight size={15} />
                    </button>
                  ) : null;
                })}
                <Link className="text-link" to={`/publications?topic=${r.id}`}>
                  {t("此方向全部成果", "All publications in this area")}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </section>
          );
        })}
        <section className="research-practice">
          <span className="section-label">
            {t("科研平台与工程实践", "PLATFORMS & ENGINEERING")}
          </span>
          <h2>
            {t(
              "知识、模型与应用的结合",
              "Connecting knowledge, models, and applications",
            )}
          </h2>
          <p>
            {t(
              "围绕“石头”知识图谱平台、“沈思”多模态大模型、科学智能与科研装备，团队将算法研究与领域应用中的系统研发相结合。",
              "Through the Shitou knowledge graph platform, Shensi multimodal model, AI for science, and scientific instruments, the team connects algorithm research with system development for domain applications.",
            )}
          </p>
          <Link className="text-link" to="/collaboration">
            {t("查看实践项目与合作单位", "Explore projects and collaborators")}
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>
      {selected && (
        <PaperDetails paper={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
