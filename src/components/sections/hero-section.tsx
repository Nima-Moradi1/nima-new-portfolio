import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { HeroStudio } from "@/components/three/hero-studio";
import { Button } from "@/components/ui/button";
import styles from "./portfolio-layout.module.css";

export function HeroSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Employer");
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={`${styles.shell} ${styles.heroGrid}`}>
        <div>
          <h1 className={styles.heroTitle} id="hero-title">
            {portfolio.identity.role}
          </h1>
          <p className={styles.heroIntro}>{portfolio.identity.intro}</p>
          <div className={styles.actions}>
            <Button asChild className={styles.action}>
              <a href="#work">
                {t("viewWork")}
                <ArrowRight
                  data-icon="inline-end"
                  className="rtl:rotate-180"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button asChild variant="outline" className={styles.action}>
              <a
                href={portfolio.identity.resumeUrl}
                download="Nima-Moradirad-Resume.pdf"
              >
                {t("resume")}
              </a>
            </Button>
          </div>
        </div>
        <div className={styles.heroArt}>
          <HeroStudio />
        </div>
      </div>
    </section>
  );
}
