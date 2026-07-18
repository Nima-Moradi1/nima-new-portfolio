import { useFormatter, useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CapabilityTimeline } from "@/components/capabilities/capability-timeline";
import { capabilitiesSectionClassNames as styles } from "./capabilities-section.class-names";

export function CapabilitiesSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Capabilities");
  const format = useFormatter();

  return (
    <section
      className={styles.root}
      id="capabilities"
      aria-labelledby="capabilities-title"
      data-depth-section
    >
      <div className={styles.intro} data-depth-plane>
        <Reveal>
          <SectionHeading
            id="capabilities-title"
            index={format.number(4, {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>
      </div>
      <CapabilityTimeline
        groups={portfolio.capabilities}
        education={portfolio.education}
      />
    </section>
  );
}
