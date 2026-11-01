import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { site } from "../data/site";
import members from "../data/members.json";
import { useLab, copyText } from "../context/LabContext";
import { PageHeading } from "../components/ui";
import { asset } from "../lib/assets";
export default function ContactPage() {
  const { t, l, lang, notify } = useLab();
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (email: string) => {
    if (await copyText(email)) {
      setCopied(email);
      notify(t("邮箱地址已复制", "Email address copied"));
    } else
      notify(
        t("请选中邮箱地址手动复制", "Please select and copy the email address"),
      );
  };
  const mapUrl = `https://www.amap.com/search?query=${encodeURIComponent("中国科学院沈阳计算技术研究所 南屏东路16号")}&city=210100`;
  return (
    <>
      <PageHeading
        eyebrow="Contact"
        title={t("联系方式", "Contact")}
        description={t(
          "研究交流、申请咨询及来访预约。",
          "Research inquiries, study applications, and visits.",
        )}
      />
      <div className="container page-content contact-layout">
        <section>
          <h2>{l(site.name)}</h2>
          <p className="contact-affiliation">
            {l(site.institute)}
            <br />
            {l(site.school)}
          </p>
          <dl className="contact-details">
            {members
              .filter((person) => person.group === "faculty" && person.email)
              .map((person) => (
                <div key={person.id}>
                  <dt>
                    {lang === "zh"
                      ? (person.nameZh ?? person.name)
                      : person.name}
                  </dt>
                  <dd>
                    <a href={`mailto:${person.email}`}>{person.email}</a>
                    <button
                      className="icon-button"
                      onClick={() => copy(person.email!)}
                      aria-label={`${t("复制邮箱地址", "Copy email address")}: ${person.email}`}
                    >
                      {copied === person.email ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                    <small>{l(person.role)}</small>
                  </dd>
                </div>
              ))}
            <div>
              <dt>{t("联系电话", "Phone")}</dt>
              <dd>
                <a href="tel:+862424696188">{site.phone}</a>
                <small>{t("总机转分机 8668", "Extension 8668")}</small>
              </dd>
            </div>
            <div>
              <dt>{t("通信地址", "Address")}</dt>
              <dd>
                {l(site.address)}
                <small>
                  {t("邮编：", "Postal code: ")}
                  {site.postcode}
                </small>
              </dd>
            </div>
          </dl>
          <p>
            {t(
              "来访前请通过邮件或电话预约。",
              "Please arrange visits by email or phone in advance.",
            )}
          </p>
          <a
            className="text-link"
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("在高德地图中查看", "Find us on Amap")}
            <ArrowUpRight size={15} />
          </a>
        </section>
        <figure className="contact-photo">
          <img
            src={asset("images/lab/group.webp")}
            alt={t("实验室成员在研究所的合照", "Lab members at the institute")}
            width="1440"
            height="1080"
          />
          <figcaption>{l(site.institute)}</figcaption>
        </figure>
      </div>
    </>
  );
}
