import { ArrowDown } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Reveal } from "@/components/motion/reveal";
import { HeroStudio } from "@/components/three/hero-studio";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { heroSectionClassNames as styles } from "./hero-section.class-names";

export function HeroSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Hero");
  const format = useFormatter();
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <section
      className={styles.root}
      id="top"
      aria-labelledby="hero-title"
      data-depth-section
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content} data-depth-plane>
        <div className={styles.layout}>
          <div className={styles.copy} data-landing-critical-copy>
            <Reveal className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              {portfolio.identity.availability}
            </Reveal>
            <Reveal delay={0.06}>
              <p className={styles.role}>{portfolio.identity.role}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className={styles.title} id="hero-title">
                {t("titleLine1")}
                <span className={styles.titleOutline}>{t("titleLine2")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className={styles.intro}>{portfolio.identity.intro}</p>
            </Reveal>
            <div className={styles.actions}>
              <MagneticLink href="#work" className="magnetic-link--primary">
                {t("primaryCta")}
              </MagneticLink>
              <MagneticLink href={portfolio.identity.resumeUrl} download>
                {t("resumeCta")}
              </MagneticLink>
              <MagneticLink href="#contact" contact>
                {t("contactCta")}
              </MagneticLink>
            </div>
          </div>

          <div className={styles.workstation}>
            <HeroStudio />
          </div>
        </div>

        <Reveal className={styles.footer} delay={0.36}>
          <a href="#about" className={styles.scrollCue}>
            <ArrowDown aria-hidden="true" size={16} />
            {t("scrollCue")}
          </a>
          <div className={styles.signals} aria-label={t("signalsLabel")}>
            {portfolio.signals.map((signal, index) => (
              <span className={styles.signal} key={signal}>
                <small className={styles.signalIndex}>
                  <bdi>{formatIndex(index + 1)}</bdi>
                </small>
                {signal}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
