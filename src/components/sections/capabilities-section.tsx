import { useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CapabilityTimeline } from "@/components/capabilities/capability-timeline";
import { cn } from "@/lib/cn";
import { capabilitiesSectionClassNames as styles } from "./capabilities-section.class-names";
import artwork from "./capabilities-section.module.css";

export function CapabilitiesSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Capabilities");

  return (
    <section
      className={styles.root}
      id="capabilities"
      aria-labelledby="capabilities-title"
      data-depth-section
    >
      <div className={cn(styles.intro, artwork.intro)} data-depth-plane>
        <Reveal>
          <SectionHeading
            id="capabilities-title"
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
