import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import { research } from "../data/research";
import news from "../data/news.json";
import { useLab } from "../context/LabContext";
import { SectionHeading } from "../components/ui";
import { asset } from "../lib/assets";
import { FeaturedPapers } from "./PublicationsPage";

export default function HomePage() {
  const { t, l, lang } = useLab();
  return (
    <>
      <section className="container home-intro">
        <div className="intro-copy">
          <div className="section-label">
            {t("实验室简介", "ABOUT THE LAB")}
          </div>
          <h1>
            {t("多模态认知智能实验室", "Multimodal Cognitive Intelligence Lab")}
          </h1>
          <p className="intro-affiliation">
            {l(site.institute)}
            <br />
            {l(site.school)}
          </p>
          <p>
            {t(
              "实验室围绕多模态大模型开展研究，主要关注视觉与语言理解、可验证推理、智能体和科学智能。",
              "Our lab studies multimodal large language models, with a focus on vision–language understanding, verifiable reasoning, agents, and AI for science.",
            )}
          </p>
          <p>
            {t(
              "研究工作涉及几何推理与生成、工具调用验证、科学文献理解和生成内容溯源。欢迎有相关研究兴趣的同学及合作者与我们联系。",
              "Our work includes geometric reasoning and generation, tool-use verification, scientific literature understanding, and provenance for generated content. We welcome inquiries from prospective students and collaborators.",
            )}
          </p>
          <div className="intro-links">
            <Link className="text-link" to="/research">
              {t("研究方向", "Research")}
              <ArrowRight size={15} />
            </Link>
            <Link className="text-link" to="/team">
              {t("团队成员", "People")}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <figure className="intro-photo">
          <img
            src={asset("images/lab/group.webp")}
            alt={t("实验室成员合照", "Lab group photo")}
            width="1440"
            height="1080"
            fetchPriority="high"
          />
          <figcaption>
            <span>{t("实验室成员合照", "Lab group photo")}</span>
            <span>
              {t(
                "中国科学院沈阳计算技术研究所",
                "Shenyang Institute of Computing Technology, CAS",
              )}
            </span>
          </figcaption>
        </figure>
      </section>
      <div className="container home-columns">
        <section className="home-news">
          <SectionHeading
            title={t("新闻动态", "News")}
            en={lang === "zh" ? "News" : undefined}
            to="/news"
            linkText={t("全部动态", "All news")}
          />
          <div className="news-list compact">
            {news.slice(0, 5).map((item) => (
              <article key={item.id}>
                <time dateTime={item.date}>
                  {item.date.replaceAll("-", ".")}
                </time>
                <div>
                  <h3>
                    <Link to={`/news/${item.id}`}>{l(item.title)}</Link>
                  </h3>
                  <p>{l(item.summary)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="home-aside">
          <SectionHeading
            title={t("研究方向", "Research")}
            en={lang === "zh" ? "Research" : undefined}
          />
          <div className="research-index">
            {research.map((item) => (
              <Link to={`/research#${item.id}`} key={item.id}>
                <span>
                  {l(item.title)}
                  <small>
                    {lang === "zh" ? item.title.en : item.tags.en.join(" · ")}
                  </small>
                </span>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
          <div className="home-contact">
            <h3>{t("招生与合作", "Admissions & collaboration")}</h3>
            <p>
              {t(
                "研究生申请、科研交流及合作咨询，请联系：",
                "For graduate study, research visits, or collaboration inquiries:",
              )}
            </p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link className="text-link" to="/join">
              {t("申请与联系说明", "How to get in touch")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      </div>
      <section className="container home-publications">
        <SectionHeading
          title={t("代表性成果", "Selected publications")}
          en={lang === "zh" ? "Selected publications" : undefined}
          to="/publications"
          linkText={t("全部成果", "All publications")}
        />
        <FeaturedPapers />
      </section>
    </>
  );
}
