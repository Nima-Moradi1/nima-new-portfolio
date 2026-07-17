"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { ExperienceItem } from "@/types/portfolio";

type MobileExperienceReaderProps = {
  experiences: readonly ExperienceItem[];
};

export function MobileExperienceReader({
  experiences,
}: MobileExperienceReaderProps) {
  const [activePage, setActivePage] = useState(0);
  const experience = experiences[activePage];

  function goToPage(page: number) {
    setActivePage(Math.max(0, Math.min(experiences.length - 1, page)));
  }

  return (
    <div className="mobile-experience-reader page-shell">
      <header className="mobile-experience-reader__heading">
        <p>
          <span>02</span>
          Professional trajectory
        </p>
        <h2 id="experience-title">A career, bound in chapters.</h2>
        <p>A touch-optimized edition of the experience book.</p>
      </header>

      <div className="mobile-experience-reader__book">
        <article
          key={`${experience.company}-${experience.period}`}
          aria-live="polite"
        >
          <div className="mobile-experience-reader__page">
            <div className="mobile-experience-reader__folio">
              <span>{String(activePage + 1).padStart(2, "0")}</span>
              <span>{experience.period}</span>
            </div>
            <p className="mobile-experience-reader__company">
              {experience.company}
            </p>
            <h3>{experience.role}</h3>
            <p className="mobile-experience-reader__summary">
              {experience.summary}
            </p>
            <div className="mobile-experience-reader__tags">
              {experience.technologies.slice(0, 4).map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <div className="mobile-experience-reader__page">
            <p className="mobile-experience-reader__chapter">
              Selected signals · Chapter{" "}
              {String(activePage + 1).padStart(2, "0")}
            </p>
            <ul>
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <nav
        className="mobile-experience-reader__navigation"
        aria-label="Experience chapters"
      >
        <button
          type="button"
          onClick={() => goToPage(activePage - 1)}
          disabled={activePage === 0}
          aria-label="Previous experience"
        >
          <ArrowLeft aria-hidden="true" size={18} />
        </button>
        <p>
          <span>{String(activePage + 1).padStart(2, "0")}</span>
          <i aria-hidden="true" />
          <span>{String(experiences.length).padStart(2, "0")}</span>
        </p>
        <button
          type="button"
          onClick={() => goToPage(activePage + 1)}
          disabled={activePage === experiences.length - 1}
          aria-label="Next experience"
        >
          <ArrowRight aria-hidden="true" size={18} />
        </button>
      </nav>
    </div>
  );
}
