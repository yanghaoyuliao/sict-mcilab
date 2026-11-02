import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import members from "../data/members.json";
import papers from "../data/publications.json";
import { useLab } from "../context/LabContext";
import { EmptyState, Modal, PageHeading } from "../components/ui";
import { asset } from "../lib/assets";

type Member = (typeof members)[number];
function Portrait({ person }: { person: Member }) {
  const [failed, setFailed] = useState(false);
  return person.image && !failed ? (
    <img
      src={asset(person.image)}
      alt={person.nameZh ?? person.name}
      width="240"
      height="320"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <div className="portrait-placeholder" aria-hidden="true">
      <span>
        {person.name
          .trim()
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .toUpperCase()}
      </span>
    </div>
  );
}
export default function TeamPage() {
  const { t, l, lang } = useLab();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Member | null>(null);
  const groups = [
    { id: "faculty", label: t("教师", "Faculty") },
    { id: "secretary", label: t("实验室秘书", "Lab secretary") },
    { id: "phd", label: t("博士研究生", "PhD students") },
    { id: "masters", label: t("硕士研究生", "Master’s students") },
  ];
  const name = (p: Member) => (lang === "zh" ? (p.nameZh ?? p.name) : p.name);
  const related = selected
    ? papers.filter((p) => p.authors.includes(selected.name))
    : [];
  return (
    <>
      <PageHeading
        eyebrow="Members"
        title={t("团队成员", "Members")}
        description={t(
          "教师、实验室秘书、博士研究生与硕士研究生。",
          "Faculty, lab secretary, doctoral students, and master’s students.",
        )}
      />
      <div className="container page-content">
        <div
          className="filter-tabs"
          role="group"
          aria-label={t("成员分类", "Filter members")}
        >
          {[{ id: "all", label: t("全部成员", "All members") }, ...groups].map(
            (group) => (
              <button
                key={group.id}
                className={filter === group.id ? "active" : ""}
                aria-pressed={filter === group.id}
                onClick={() => setFilter(group.id)}
              >
                {group.label}
                <span>
                  {
                    members.filter(
                      (m) => group.id === "all" || m.group === group.id,
                    ).length
                  }
                </span>
              </button>
            ),
          )}
        </div>
        {groups
          .filter((group) => filter === "all" || filter === group.id)
          .map((group) => (
            <section key={group.id} className="people-section">
              <h2 className="group-title">
                {group.label}
                <span>
                  {members.filter((p) => p.group === group.id).length}
                </span>
              </h2>
              <div
                className={
                  ["faculty", "secretary"].includes(group.id)
                    ? "faculty-list"
                    : "people-grid"
                }
              >
                {members
                  .filter((p) => p.group === group.id)
                  .map((person) => (
                    <article
                      className={`person${["faculty", "secretary"].includes(group.id) ? " faculty-person" : ""}`}
                      key={person.id}
                    >
                      <button
                        className="member-portrait"
                        onClick={() => setSelected(person)}
                        aria-label={`${t("查看成员：", "View profile: ")}${name(person)}`}
                      >
                        <Portrait person={person} />
                      </button>
                      <div className="person-info">
                        <h3>
                          <button onClick={() => setSelected(person)}>
                            {name(person)}
                          </button>
                        </h3>
                        {lang === "zh" && person.nameZh && (
                          <span className="person-roman-name" lang="en">
                            {person.name}
                          </span>
                        )}
                        {["faculty", "secretary"].includes(group.id) && (
                          <p className="person-role">{l(person.role)}</p>
                        )}
                        <p>{l(person.interests)}</p>
                        {["faculty", "secretary"].includes(group.id) &&
                          person.bio && (
                            <p className="faculty-bio">{l(person.bio)}</p>
                          )}
                        {["faculty", "secretary"].includes(group.id) && (
                          <div className="inline-links">
                            {person.email && (
                              <a
                                className="text-link"
                                href={`mailto:${person.email}`}
                              >
                                {person.email}
                              </a>
                            )}
                            {person.homepage && (
                              <a
                                className="text-link"
                                href={person.homepage}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {t("国科大个人主页", "UCAS profile")}
                                <ArrowUpRight size={14} />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        <div className="people-contact">
          <p>
            {t(
              "有意申请或开展合作？",
              "Interested in joining or collaborating?",
            )}
          </p>
          <Link className="text-link" to="/join">
            {t("招生与合作联系", "Admissions & collaboration")}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      {selected && (
        <Modal title={name(selected)} onClose={() => setSelected(null)}>
          <div className="profile-header">
            <div className="profile-portrait">
              <Portrait person={selected} />
            </div>
            <div>
              <span className="person-roman-name">{selected.name}</span>
              <p>{l(selected.role)}</p>
              <p>
                {t("研究方向：", "Research interests: ")}
                {l(selected.interests)}
              </p>
              {selected.email && (
                <p>
                  <a className="text-link" href={`mailto:${selected.email}`}>
                    {selected.email}
                  </a>
                </p>
              )}
            </div>
          </div>
          {selected.bio && <p className="profile-bio">{l(selected.bio)}</p>}
          {related.length > 0 ? (
            <>
              <h3 className="profile-subheading">
                {t("收录成果", "Cataloged publications")}
              </h3>
              <ul className="profile-papers">
                {related.slice(0, 4).map((p) => (
                  <li key={p.id}>
                    <span>
                      {p.venue} {p.year}
                    </span>
                    <a href={p.url} target="_blank" rel="noreferrer">
                      {p.title}
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                className="text-link"
                to={`/publications?q=${encodeURIComponent(selected.name)}`}
                onClick={() => setSelected(null)}
              >
                {t("查看全部相关成果", "All related publications")}
                <ArrowUpRight size={14} />
              </Link>
            </>
          ) : null}
          {selected.homepage && (
            <div className="dialog-actions">
              <a
                href={selected.homepage}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                {selected.id === "bihui-yu"
                  ? t("国科大个人主页", "UCAS profile")
                  : t("个人主页（旧站）", "Personal website (previous site)")}
                <ArrowUpRight size={14} />
              </a>
            </div>
          )}
        </Modal>
      )}
      {members.length === 0 && (
        <EmptyState
          title={t("暂无成员信息", "No member information")}
          description=""
        />
      )}
    </>
  );
}
