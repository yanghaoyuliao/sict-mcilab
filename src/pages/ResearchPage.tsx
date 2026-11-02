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
          <div className="practice-grid">
            <article>
              <span>01</span>
              <h3>
                {t("知识图谱与大模型", "Knowledge graphs & large models")}
              </h3>
              <p>
                {t(
                  "围绕“石头”知识图谱构建平台与“沈思”多模态大模型，开展知识抽取、实体链接、知识推理、检索增强生成与模型适配研究；参与知识图谱相关标准的研究与编制。",
                  "Our work on the Shitou knowledge graph platform and Shensi multimodal model covers knowledge extraction, entity linking, knowledge reasoning, retrieval-augmented generation, and model adaptation. The team also contributes to research and drafting of knowledge graph standards.",
                )}
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>
                {t(
                  "科学智能与科研装备",
                  "AI for science & scientific instruments",
                )}
              </h3>
              <p>
                {t(
                  "面向生命科学、材料和科技文献开展合作，探索抗体设计、材料设计与知识发现。团队参与高频超声雾化科研装备、X 射线单晶衍射仪及科技文献智能处理等相关项目。",
                  "We collaborate on life sciences, materials, and scientific literature, exploring antibody design, materials design, and knowledge discovery. Team projects have included high-frequency ultrasonic atomization instruments, X-ray single-crystal diffractometers, and intelligent processing of scientific literature.",
                )}
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>
                {t(
                  "多模态感知与智能交互",
                  "Multimodal perception & interaction",
                )}
              </h3>
              <p>
                {t(
                  "结合视觉、文本与语音信息，研究语音与声纹识别、人物动作识别、多模态事件图谱和智能体交互，将算法研究与实际场景中的系统研发相结合。",
                  "Combining visual, textual, and speech information, we study speech and speaker recognition, human action recognition, multimodal event graphs, and agent interaction, connecting algorithms with system development for practical applications.",
                )}
              </p>
            </article>
          </div>
        </section>
      </div>
      {selected && (
        <PaperDetails paper={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
