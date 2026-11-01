import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation, site } from "../data/site";
import { useLab } from "../context/LabContext";
import { asset } from "../lib/assets";

export function Header() {
  const { t, l, toggleLanguage, lang } = useLab();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container masthead">
        <Link
          to="/"
          className="brand"
          aria-label={t("多模态认知智能实验室首页", "MCI Lab home")}
        >
          <span className="wordmark" aria-hidden="true">
            MCI<span>LAB</span>
          </span>
          <span className="brand-text">
            <strong>{l(site.name)}</strong>
            <span>
              {lang === "zh"
                ? "Multimodal Cognitive Intelligence Lab"
                : "SICT, Chinese Academy of Sciences · UCAS"}
            </span>
          </span>
        </Link>
        <div className="masthead-institutions">
          <a
            href="https://www.ucas.ac.cn/"
            target="_blank"
            rel="noreferrer"
            aria-label={l(site.school)}
          >
            <img
              src={asset("images/institutions/ucas.webp")}
              width="763"
              height="160"
              alt={l(site.school)}
            />
          </a>
          <a
            href="https://www.sict.ac.cn/"
            target="_blank"
            rel="noreferrer"
            aria-label={l(site.institute)}
          >
            <img
              src={asset("images/institutions/sict.webp")}
              width="604"
              height="127"
              alt={l(site.institute)}
            />
          </a>
        </div>
        <div className="masthead-tools">
          <button
            className="language-button"
            onClick={toggleLanguage}
            aria-label={t("Switch to English", "切换为中文")}
          >
            {lang === "zh" ? "English" : "中文"}
          </button>
          <button
            className="menu-toggle icon-button"
            aria-label={
              open ? t("关闭菜单", "Close menu") : t("打开菜单", "Open menu")
            }
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div className="nav-bar">
        <nav
          id="main-navigation"
          className={`container nav-links${open ? " open" : ""}`}
          aria-label={t("主导航", "Main navigation")}
        >
          {navigation.map((item) => (
            <NavLink key={item.path} end={item.path === "/"} to={item.path}>
              {l(item.label)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  const { t, l } = useLab();
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <strong>{l(site.name)}</strong>
          <p>
            {l(site.institute)}
            <br />
            {l(site.school)}
          </p>
        </div>
        <div>
          <span className="footer-label">{t("联系实验室", "Contact")}</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>
            {l(site.address)} · {site.postcode}
          </p>
        </div>
        <div className="footer-links">
          <Link to="/join">
            {t("招生与合作", "Admissions & collaboration")}
            <ArrowUpRight size={13} />
          </Link>
          <a href={site.oldSite} target="_blank" rel="noreferrer">
            {t("旧版网站", "Previous website")}
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {t("多模态认知智能实验室", "MCI Lab")}
        </span>
        <span>{t("中国 · 沈阳", "Shenyang, China")}</span>
      </div>
    </footer>
  );
}
