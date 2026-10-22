import { useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import styles from "./portfolio-layout.module.css";
export function CapabilitiesSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Employer");
  return (
    <section
      className={styles.section}
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className={styles.shell}>
        <h2 className={styles.heading} id="capabilities-title">
          {t("skills")}
        </h2>
        <div className={styles.skills}>
          {portfolio.capabilities.map((group) => (
            <article className={styles.skill} key={group.id}>
              <h3>{group.title}</h3>
              <p className={styles.body}>{group.description}</p>
              <div className={styles.tags}>
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    <bdi dir="ltr">{skill}</bdi>
                  </Badge>
                ))}
              </div>
              {group.evidenceHref ? (
                <Link
                  className={styles.link}
                  href={group.evidenceHref}
                  aria-label={`${t("evidence")}: ${group.title}`}
                >
                  {t("evidence")}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
