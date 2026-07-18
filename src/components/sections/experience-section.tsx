import { ExperienceBook } from "@/components/experience/experience-book";
import { usePortfolio } from "@/content/use-portfolio";

export function ExperienceSection() {
  const portfolio = usePortfolio();
  return (
    <section
      className="experience"
      id="experience"
      aria-labelledby="experience-title"
      data-depth-section
    >
      <ExperienceBook experiences={portfolio.experience} />
    </section>
  );
}
