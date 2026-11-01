import { Link } from "react-router-dom";
import { useLab } from "../context/LabContext";
export default function NotFoundPage() {
  const { t } = useLab();
  return (
    <div className="container not-found">
      <span>404</span>
      <h1>{t("页面不存在", "Page not found")}</h1>
      <p>
        {t(
          "请检查网址，或返回首页继续浏览。",
          "Please check the address or return to the home page.",
        )}
      </p>
      <Link className="button button-primary" to="/">
        {t("返回首页", "Back to home")}
      </Link>
    </div>
  );
}
