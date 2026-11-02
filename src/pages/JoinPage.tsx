import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "../data/site";
import { useLab } from "../context/LabContext";
import { PageHeading } from "../components/ui";
import { asset } from "../lib/assets";
export default function JoinPage() {
  const { t } = useLab();
  const subject = t(
    "研究生申请 / 科研合作｜姓名｜研究方向",
    "Graduate study / collaboration | Name | Research area",
  );
  const body = t(
    "老师您好：\n\n我叫［姓名］，来自［学校 / 单位］。\n我希望咨询［研究生申请 / 科研交流 / 合作事宜］，感兴趣的方向是［研究方向］。\n\n学习背景与相关经历：\n［简要介绍，可附简历、项目或论文链接］\n\n谢谢！\n［姓名］",
    "Dear MCI Lab team,\n\nMy name is [name], from [institution].\nI would like to inquire about [graduate study / research exchange / collaboration].\nMy research interests are [areas].\n\nAcademic background and experience:\n[Brief introduction; optionally attach a CV, project, or paper links.]\n\nBest regards,\n[name]",
  );
  return (
    <>
      <PageHeading
        eyebrow="Join us"
        title={t("加入我们", "Join us")}
        description={t(
          "研究生申请、本科科研交流与学术合作。",
          "Graduate study, undergraduate research, and academic collaboration.",
        )}
      />
      <div className="container page-content join-layout">
        <div className="join-main">
          <section>
            <h2>{t("研究生申请", "Graduate study")}</h2>
            <p>
              {t(
                "欢迎对多模态大模型、强化学习、智能体或科学智能感兴趣的同学联系实验室。建议先阅读研究方向和近期论文，结合自己的学习背景说明感兴趣的问题。",
                "Prospective graduate students interested in multimodal large language models, reinforcement learning, agents, or AI for science are welcome to contact the lab. Please read our recent work and describe how your background connects to the questions you hope to study.",
              )}
            </p>
            <p>
              {t(
                "硕士、博士招生的报考资格、名额、申请流程与截止日期，以中国科学院大学和研究所当年度招生公告为准。",
                "Eligibility, places, application procedures, and deadlines for master’s and doctoral programs follow the current UCAS and SICT admissions notices.",
              )}
            </p>
            <div className="inline-links">
              <a
                className="text-link"
                href="https://admission.ucas.ac.cn/"
                target="_blank"
                rel="noreferrer"
              >
                {t("国科大招生信息", "UCAS admissions")}
                <ArrowUpRight size={14} />
              </a>
              <Link className="text-link" to="/research">
                {t("实验室研究方向", "Research areas")}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </section>
          <section>
            <h2>{t("联系时建议提供", "What to include")}</h2>
            <ol className="application-list">
              <li>
                {t(
                  "姓名、学校或单位、专业与当前学习阶段。",
                  "Your name, institution, field of study, and current degree stage.",
                )}
              </li>
              <li>
                {t(
                  "个人简历，以及与申请相关的学习、编程或研究经历。",
                  "A CV and relevant coursework, programming, or research experience.",
                )}
              </li>
              <li>
                {t(
                  "感兴趣的研究问题，以及相关项目、论文或代码链接（如有）。",
                  "Research questions of interest and links to relevant projects, papers, or code, if available.",
                )}
              </li>
              <li>
                {t(
                  "希望咨询的具体事项及预计开始时间。",
                  "The specific purpose of your inquiry and your expected start date.",
                )}
              </li>
            </ol>
          </section>
          <section>
            <h2>
              {t(
                "本科科研与合作交流",
                "Undergraduate research & collaboration",
              )}
            </h2>
            <p>
              {t(
                "本科生可通过邮件介绍自己的学习背景、可投入时间与研究兴趣。高校、研究机构及产业伙伴如有合作意向，请说明研究问题、已有工作及预期的合作方式。",
                "Undergraduates can email us with their background, availability, and research interests. Academic and industry collaborators can outline the research problem, existing work, and proposed form of collaboration.",
              )}
            </p>
          </section>
          <section className="join-life">
            <h2>{t("团队日常", "Life in the lab")}</h2>
            <p>
              {t(
                "在组会中讨论研究进展，在合作交流中认识不同领域的问题，也共同记录毕业与成长。",
                "We discuss research progress in lab meetings, learn about problems across fields through collaboration, and celebrate graduations and growth together.",
              )}
            </p>
            <div className="lab-gallery">
              <figure>
                <img
                  src={asset("images/lab/discussion.webp")}
                  alt={t("团队研究讨论", "Research discussion")}
                  loading="lazy"
                  width="640"
                  height="480"
                />
                <figcaption>{t("研究讨论", "Research discussion")}</figcaption>
              </figure>
              <figure>
                <img
                  src={asset("images/lab/graduation.webp")}
                  alt={t("毕业合影", "Graduation photo")}
                  loading="lazy"
                  width="640"
                  height="480"
                />
                <figcaption>
                  {t("毕业留念", "Celebrating graduation")}
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
        <aside className="join-contact">
          <h2>{t("联系邮箱", "Email")}</h2>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p>
            {t(
              "邮件主题建议注明姓名、交流类别与研究方向。",
              "Please include your name, inquiry type, and research area in the subject line.",
            )}
          </p>
          <a
            className="button button-primary"
            href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
          >
            <Mail size={16} />
            {t("撰写邮件", "Compose an email")}
          </a>
          <Link className="text-link" to="/contact">
            {t("其他联系方式", "Other contact details")}
            <ArrowUpRight size={14} />
          </Link>
        </aside>
      </div>
    </>
  );
}
