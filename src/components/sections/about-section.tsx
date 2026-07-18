import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutSectionClassNames as styles } from "./about-section.class-names";

export function AboutSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("About");
  const format = useFormatter();
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <section
      className={styles.root}
      id="about"
      aria-labelledby="about-title"
      data-depth-section
    >
      <div className={styles.shell} data-depth-plane>
        <Reveal>
          <SectionHeading
            id="about-title"
            index={formatIndex(1)}
            eyebrow={portfolio.about.eyebrow}
            title={t("title")}
          />
        </Reveal>

        <div className={styles.body}>
          <div className={styles.statement}>
            <Reveal>
              <p className={styles.statementText}>
                {portfolio.identity.statement}
              </p>
            </Reveal>
            <div className={styles.coordinate} aria-hidden="true">
              <span>{t("engineering")}</span>
              <span className={styles.coordinateAccent}>×</span>
              <span>{t("creativity")}</span>
            </div>
            <Reveal delay={0.08}>
              <figure className={styles.portrait}>
                <Image
                  className={styles.portraitImage}
                  src="/assets/nima-moradirad.jpg"
                  alt={t("portraitAlt")}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 72vw, 28vw"
                />
                <figcaption className={styles.portraitCaption}>
                  <span className={styles.portraitName}>
                    {portfolio.identity.name}
                  </span>
                  <span>{portfolio.identity.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className={styles.details}>
            <Reveal className={styles.narrative}>
              {portfolio.about.paragraphs.map((paragraph) => (
                <p className={styles.narrativeParagraph} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
            {portfolio.about.principles.map((principle, index) => (
              <Reveal
                className={styles.detailCell}
                key={principle.id}
                delay={(index + 1) * 0.06}
              >
                <article className={styles.principleCard}>
                  <span className={styles.principleIndex}>
                    {formatIndex(Number(principle.index))}
                  </span>
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleText}>{principle.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
