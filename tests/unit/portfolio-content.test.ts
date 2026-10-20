import { describe, expect, it } from "vitest";
import { portfolio } from "@/content/portfolio";

describe("updated professional portfolio content", () => {
  it("uses the 2026 professional identity and hero signals", () => {
    expect(portfolio.identity.role).toBe("AI Full-Stack Developer");
    expect(portfolio.identity.availability).toContain("6+ years");
    expect(portfolio.signals).toEqual([
      "Scalability",
      "Performance",
      "Creativity",
      "Product engineering",
    ]);
  });

  it("reflects the updated employment dates and delivery scope", () => {
    const experienceById = Object.fromEntries(
      portfolio.experience.map((experience) => [experience.id, experience]),
    );
    expect(experienceById.hesabo).toMatchObject({
      period: "Feb 2025 — Present",
      role: "Senior Frontend Developer",
      company: "Hesabo · Tehran, Iran",
    });
    expect(experienceById.hesabo.highlights.join(" ")).toMatch(/Capacitor/i);
    expect(experienceById.hesabo.highlights.join(" ")).toMatch(
      /cache versioning/i,
    );
    expect(experienceById.hesabo.highlights.join(" ")).toMatch(
      /Codex and Claude Max/i,
    );
    expect(experienceById.basilica.role).toBe("Senior Frontend Engineer");
    expect(experienceById["barname-negar"].role).toBe("Frontend Developer");
    expect(experienceById.kzi).toMatchObject({
      role: "React Developer",
      period: "Dec 2020 — Sep 2022",
    });
  });

  it("promotes the visual case studies and retains production products", () => {
    const projectsById = Object.fromEntries(
      portfolio.projects.map((project) => [project.id, project]),
    );
    expect(portfolio.projects.map((project) => project.id)).toEqual([
      "sarochi-3d-shop",
      "moradi-gallery",
      "xo-arena",
      "emerald-case",
      "hesabo-platform",
      "tarabari-nima",
      "lingo-learn",
    ]);
    expect(projectsById["sarochi-3d-shop"]).toMatchObject({
      title: "3D Interactive Shop / Sarochi",
      href: "/projects/sarochi-3d-shop",
      technologies: expect.arrayContaining([
        "Three.js",
        "React Three Fiber",
        "TypeScript",
      ]),
    });
    expect(projectsById["moradi-gallery"]).toMatchObject({
      href: "/projects/moradi-gallery",
      technologies: expect.arrayContaining([
        "Three.js",
        "React Three Fiber",
        "GSAP",
      ]),
    });
    expect(projectsById["xo-arena"]).toMatchObject({
      href: "/projects/xo-arena",
      technologies: expect.arrayContaining(["Socket.IO", "Prisma", "MySQL"]),
    });
    expect(projectsById["emerald-case"]).toMatchObject({
      href: "/projects/emerald-case",
      technologies: expect.arrayContaining(["Prisma", "MongoDB", "Stripe"]),
    });
    expect(projectsById["hesabo-platform"].href).toBe("https://hesabo.com/");
    expect(projectsById["lingo-learn"]).toMatchObject({
      href: "https://lingo-learn.ir/",
      logo: "/assets/projects/lingo-learn/logo.png",
    });
    expect(projectsById["tarabari-nima"]).toMatchObject({
      href: "/projects/tarabari-nima",
      technologies: expect.arrayContaining([
        "GSAP",
        "Three.js",
        "React Three Fiber",
      ]),
    });
  });

  it("covers web, mobile, quality, AI, systems, and education without an unconfirmed completion date", () => {
    expect(portfolio.capabilities).toHaveLength(4);
    expect(portfolio.capabilities.flatMap((group) => group.skills)).toEqual(
      expect.arrayContaining([
        "Module Federation",
        "Java plugins",
        "Unit / E2E testing",
        "LangChain agents",
        "Docker",
      ]),
    );
    expect(portfolio.education.institution).toBe(
      "Tehran Azad University",
    );
  });
});
