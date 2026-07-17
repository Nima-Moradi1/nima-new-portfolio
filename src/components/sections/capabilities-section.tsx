import { portfolio } from "@/content/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CapabilityTimeline } from "@/components/capabilities/capability-timeline";

export function CapabilitiesSection() {
  return (
    <section
      className="section capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
      data-depth-section
    >
      <div className="page-shell capabilities__intro" data-depth-plane>
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Engineering capabilities"
            title="From web architecture to Android delivery."
            description="The product architecture, mobile and PWA delivery, quality practices, and AI-assisted systems I use across production work."
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
