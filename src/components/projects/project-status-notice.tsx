import { CircleAlert } from "lucide-react";
import styles from "./project-status-notice.module.css";

/** Informational project scope/availability, deliberately distinct from copy. */
export function ProjectStatusNotice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <aside className={styles.notice} aria-label={title}>
      <div className={styles.label}>
        <CircleAlert size={18} aria-hidden="true" />
        <strong>{title}</strong>
      </div>
      <p>{description}</p>
    </aside>
  );
}
