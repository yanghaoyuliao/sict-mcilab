import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Expand, Mail } from "lucide-react";
import { Modal, PageHeading, SectionHeading } from "../components/ui";
import { useLab } from "../context/LabContext";
import { practices, partnerGroups } from "../data/collaboration";
import type { PracticeFigure } from "../data/collaboration";
import { site } from "../data/site";
import { asset } from "../lib/assets";

export default function CollaborationPage() {
  const { t, l } = useLab();
  const [selected, setSelected] = useState<PracticeFigure | null>(null);
  return (
    <>
      <PageHeading
        eyebrow="Collaboration"
        title={t("实践合作", "Collaboration")}
        description={t(
          "围绕知识工程、科学智能与多模态技术，与科研院所、高校和产业伙伴开展联合研究及系统研发。",
          "Joint research and system development with research institutes, universities, and industry in knowledge engineering, AI for science, and multimodal technologies.",
        )}
      />
      <div className="container page-content collaboration-page">
        <nav
          className="practice-index"
          aria-label={t("实践合作索引", "Collaboration index")}
        >
          {practices.map((practice, index) => (
            <Link to={`/collaboration#${practice.id}`} key={practice.id}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {l(practice.title)}
            </Link>
          ))}
        </nav>
        <div className="practice-studies">
          {practices.map((practice, index) => (
            <section
              id={practice.id}
              className="practice-study"
              key={practice.id}
              aria-labelledby={`${practice.id}-title`}
            >
              <div className="practice-copy">
                <span className="practice-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 id={`${practice.id}-title`}>{l(practice.title)}</h2>
                <p className="practice-description">
                  {l(practice.description)}
                </p>
                <dl className="practice-examples">
                  {practice.examples.map((example) => (
                    <div key={example.title.en}>
                      <dt>{l(example.title)}</dt>
                      <dd>{l(example.body)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="practice-technologies">
                  <h3>{t("相关技术", "Related technologies")}</h3>
                  <p>{l(practice.technologies)}</p>
                </div>
              </div>
              <div className="practice-figures">
                {practice.figures.map((figure) => (
                  <figure key={figure.image}>
                    <button
                      className="practice-image"
                      onClick={() => setSelected(figure)}
                      aria-label={`${t("放大图片：", "Enlarge image: ")}${l(figure.caption)}`}
                    >
                      <img
                        src={asset(figure.image)}
                        alt={l(figure.caption)}
                        width={figure.width}
                        height={figure.height}
                        loading="lazy"
                      />
                      <span aria-hidden="true">
                        <Expand size={16} />
                      </span>
                    </button>
                    <figcaption>{l(figure.caption)}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </div>
        <section
          className="collaboration-network"
          aria-label={t("部分合作与交流单位", "Selected collaborators")}
        >
          <SectionHeading
            title={t("部分合作与交流单位", "Selected collaborators")}
          />
          <p className="network-intro">
            {t(
              "团队围绕科研课题、技术研发与学术交流，与以下单位开展合作。",
              "The team works with the following organizations on research projects, technical development, and academic exchange.",
            )}
          </p>
          <div className="partner-groups">
            {partnerGroups.map((group) => (
              <div key={group.id}>
                <h3>{l(group.title)}</h3>
                <ul>
                  {group.names.map((name) => (
                    <li key={name.en}>{l(name)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <aside className="collaboration-contact">
          <div>
            <h2>{t("合作交流", "Work with us")}</h2>
            <p>
              {t(
                "欢迎围绕具体研究问题、领域数据与系统研发需求与我们联系。",
                "Contact us to discuss research questions, domain data, or system development needs.",
              )}
            </p>
          </div>
          <div className="collaboration-actions">
            <a className="text-link" href={`mailto:${site.email}`}>
              <Mail size={17} />
              {site.email}
            </a>
            <Link className="text-link" to="/contact">
              {t("联系方式", "Contact details")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </div>
      {selected && (
        <Modal
          title={l(selected.caption)}
          onClose={() => setSelected(null)}
          wide
        >
          <img
            className="enlarged-figure"
            src={asset(selected.image)}
            alt={l(selected.caption)}
          />
        </Modal>
      )}
    </>
  );
}
