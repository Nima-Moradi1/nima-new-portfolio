import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";
import { projectEvidence } from "@/content/project-evidence";

describe("employer-focused content contract", () => {
  it("uses one primary role and ordinary section destinations", () => {
    expect(portfolio.identity.role).toBe("Senior Frontend Engineer");
    expect(portfolio.identity.shortRole).toBe(portfolio.identity.role);
    expect(portfolio.identity.availability).not.toMatch(/6\+ years/);
    expect(portfolio.navigation.map((p) => p.href)).toEqual([
      "/#work",
      "/#experience",
      "/#capabilities",
      "/#contact",
    ]);
  });
  it("retains all four historical roles and the owner-corrected chronology", () => {
    expect(portfolio.experience).toHaveLength(4);
    expect(portfolio.experience[0]).toMatchObject({
      period: "Feb 2025 - Present",
      role: "Senior Frontend Developer",
    });
    expect(portfolio.experience[1].period).toBe("Mar 2024 - Dec 2024");
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
    expect(portfolio.education.institution).toBe("Tehran Azad University");
    expect(portfolio.education.note).toContain("2026");
    expect(portfolio.education.languages).toContain(
      "English: Professional working proficiency",
    );
    expect(portfolio.capabilities).toHaveLength(4);
    expect(
      portfolio.capabilities.every((g) =>
        g.evidenceHref?.startsWith("/projects/"),
      ),
    ).toBe(true);
  });
});
