import { useFormatter, useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { contactSectionClassNames as styles } from "./contact-section.class-names";

export function ContactSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Contact");
  const format = useFormatter();

  return (
    <section
      className={styles.root}
      id="contact"
      aria-labelledby="contact-title"
      data-depth-section
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.shell} data-depth-plane>
        <Reveal>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowIndex} aria-hidden="true">
                {format.number(5, {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </span>
              {t("eyebrow")}
            </p>
            <h2 className={styles.title} id="contact-title">
              {t("title")}
              <span className={styles.titleAccent}>{t("titleAccent")}</span>
            </h2>
          </div>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.layoutCell}>
            <div className={styles.aside}>
              <p className={styles.description}>{t("description")}</p>
              <div className={styles.availability}>
                <span className={styles.statusDot} aria-hidden="true" />
                <div className={styles.availabilityCopy}>
                  <strong className={styles.availabilityTitle}>
                    {portfolio.identity.availability}
                  </strong>
                  <small className={styles.availabilityLocation}>
                    {portfolio.identity.location}
                  </small>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className={styles.layoutCell} delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
