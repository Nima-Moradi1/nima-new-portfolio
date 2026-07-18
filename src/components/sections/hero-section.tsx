import { ArrowDown } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Reveal } from "@/components/motion/reveal";
import { HeroStudio } from "@/components/three/hero-studio";
import { MagneticLink } from "@/components/ui/magnetic-link";

export function HeroSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Hero");
  const format = useFormatter();
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      data-depth-section
    >
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content page-shell" data-depth-plane>
        <Reveal className="hero__status">
          <span className="status-dot" aria-hidden="true" />
          {portfolio.identity.availability}
        </Reveal>

        <div className="hero__layout">
          <div
            className="hero__copy hero__copy--edge-offset"
            data-landing-critical-copy
          >
            <Reveal delay={0.06}>
              <p className="hero__role">{portfolio.identity.role}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 id="hero-title">
                {t("titleLine1")}
                <span>{t("titleLine2")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="hero__intro ">{portfolio.identity.intro}</p>
            </Reveal>
            <Reveal className="hero__actions" delay={0.3}>
              <MagneticLink href="#work" className="magnetic-link--primary">
                {t("primaryCta")}
              </MagneticLink>
              <MagneticLink href={portfolio.identity.resumeUrl} download>
                {t("resumeCta")}
              </MagneticLink>
              <MagneticLink href="#contact">{t("contactCta")}</MagneticLink>
            </Reveal>
          </div>

          <div className="hero__workstation">
            <HeroStudio />
          </div>
        </div>

        <Reveal className="hero__footer" delay={0.36}>
          <a href="#about" className="hero__scroll-cue">
            <ArrowDown aria-hidden="true" size={16} />
            {t("scrollCue")}
          </a>
          <div className="hero__signals" aria-label={t("signalsLabel")}>
            {portfolio.signals.map((signal, index) => (
              <span key={signal}>
                <small>
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
