import { ExperienceBook } from "@/components/experience/experience-book";
import { usePortfolio } from "@/content/use-portfolio";
import { experienceSectionClassNames as styles } from "./experience-section.class-names";

export function ExperienceSection() {
  const portfolio = usePortfolio();
  return (
    <section
      className={styles.root}
      id="experience"
      aria-labelledby="experience-title"
      data-depth-section
    >
      <ExperienceBook experiences={portfolio.experience} />
    </section>
  );
}
