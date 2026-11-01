import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { useLab } from "../context/LabContext";

export function SectionHeading({
  title,
  en,
  to,
  linkText,
}: {
  title: string;
  en?: string;
  to?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <h2>
        {title}
        {en && <span>{en}</span>}
      </h2>
      {to && (
        <Link className="text-link" to={to}>
          {linkText}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  const { t } = useLab();
  return (
    <div className="page-heading">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">{t("首页", "Home")}</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = useLab();
  useEffect(() => {
    const dialog = ref.current!;
    const opener = document.activeElement;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`detail-dialog${wide ? " wide-dialog" : ""}`}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-heading">
          <h2 id="dialog-title">{title}</h2>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label={t("关闭详情", "Close details")}
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
export function EmptyState({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset?: () => void;
}) {
  const { t } = useLab();
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {onReset && (
        <button className="button button-outline" onClick={onReset}>
          {t("重置筛选", "Reset filters")}
        </button>
      )}
    </div>
  );
}
