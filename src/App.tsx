import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LabProvider, useLab } from "./context/LabContext";
import { Header, Footer } from "./components/Layout";
import { navigation } from "./data/site";
import news from "./data/news.json";
import Home from "./pages/HomePage";
import PublicationsPage from "./pages/PublicationsPage";
import ResearchPage from "./pages/ResearchPage";
import TeamPage from "./pages/TeamPage";
import NewsPage, { NewsDetailPage } from "./pages/NewsPage";
import JoinPage from "./pages/JoinPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function Website() {
  const location = useLocation();
  const { t, l, lang } = useLab();
  useEffect(() => {
    const page = navigation.find((n) => n.path === location.pathname);
    const article = news.find((n) => location.pathname === `/news/${n.id}`);
    const title = page
      ? l(page.label)
      : article
        ? l(article.title)
        : t("页面不存在", "Page not found");
    document.title = `${title} · ${t("多模态认知智能实验室", "MCI Lab")}`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      article
        ? l(article.summary)
        : t(
            "多模态认知智能实验室，依托中国科学院沈阳计算技术研究所与中国科学院大学，开展多模态推理、科学智能与语言理解研究。",
            "Multimodal Cognitive Intelligence Lab at SICT, CAS and UCAS. Research in multimodal reasoning, AI for science, and language understanding.",
          ),
    );
  }, [location.pathname, lang, l, t]);
  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        {t("跳转到正文", "Skip to main content")}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <LabProvider>
      <Website />
    </LabProvider>
  );
}
