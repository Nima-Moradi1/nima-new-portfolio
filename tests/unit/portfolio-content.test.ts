import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import { projectEvidence } from "@/content/project-evidence";

describe("employer-focused content contract", () => {
  it("uses one primary role and ordinary section destinations", () => {
    expect(portfolio.identity.role).toBe("Senior Software Engineer");
    expect(portfolio.identity.shortRole).toContain("Frontend Lead");
    expect(portfolio.identity.availability).not.toMatch(/6\+ years/);
    expect(portfolio.navigation.map((p) => p.href)).toEqual([
      "/#work",
      "/#experience",
      "/#capabilities",
      "/#contact",
    ]);
  });
  it("retains both Hesabo positions and historical roles and the owner-corrected chronology", () => {
    expect(portfolio.experience).toHaveLength(5);
    expect(portfolio.experience[0]).toMatchObject({
      period: "Apr 2026 - Present",
      role: "Frontend Chapter Lead",
    });
    expect(portfolio.experience[1].period).toBe("Aug 2025 - Apr 2026");
    expect(portfolio.experience[1].role).toBe("Senior Frontend Developer");
    expect(portfolio.experience[2].period).toBe("Mar 2024 - Mar 2025");
    expect(
      portfolio.experience.every(
        (p) => p.highlights.length >= 2 && p.highlights.length <= 4,
      ),
    ).toBe(true);
  });
  it("leads with professional work and only publishes the owner-confirmed shop destination", () => {
    expect(
      portfolio.projects.filter((p) => p.featured).map((p) => p.id),
    ).toEqual(["hesabo-platform", "xo-arena", "3d-online-shop"]);
    const shop = portfolio.projects.find((p) => p.id === "3d-online-shop")!;
    expect(shop.requestedDestination).toBe("https://3d-shop-design.ir/");
    expect(shop.sourceUrl).toBeUndefined();
    expect(shop.liveVerified).toBe(true);
    expect(projectEvidence["3d-online-shop"].liveUrl).toBe(
      shop.requestedDestination,
    );
    expect(
      portfolio.projects.find((p) => p.id === "hesabo-platform")?.href,
    ).toBe("/projects/hesabo");
  });
  it("keeps source-backed database and education claims consistent", () => {
    const emerald = portfolio.projects.find((p) => p.id === "emerald-case")!;
    expect(emerald.technologies).toContain("PostgreSQL");
    expect(emerald.technologies).not.toContain("MongoDB");
    expect(portfolio.education.institution).toBe(
      "Islamic Azad University, Tehran",
    );
    expect(portfolio.education.note).not.toMatch(/20\d{2}/);
    expect(portfolio.education.languages).toContain("English: C1 proficiency");
    expect(portfolio.capabilities).toHaveLength(7);
    expect(
      portfolio.capabilities.every((g) =>
        g.evidenceHref?.startsWith("/projects/"),
      ),
    ).toBe(true);
  });
  it("keeps confidential MVPs, temporary processing status and the removed project consistent", () => {
    expect(portfolio.projects.some((p) => p.id === "tarabari-nima")).toBe(
      false,
    );
    for (const id of ["moradi-gallery", "3d-online-shop"]) {
      const project = portfolio.projects.find((p) => p.id === id)!;
      expect(project.status).toContain("MVP");
      expect(project.statusNote).toContain("confidential");
      expect(project.caseStudy?.sections).toHaveLength(3);
    }
    expect(
      portfolio.projects.find((p) => p.id === "emerald-case")?.status,
    ).toContain("temporarily offline");
    expect(portfolio.experience[0].highlights.join(" ")).toContain("17%");
  });
});
