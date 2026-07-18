import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MobileExperienceReader } from "@/components/experience/mobile-experience-reader";
import { portfolio } from "@/content/portfolio";
import { renderWithIntl, testMessages } from "../helpers/render-with-intl";

describe("MobileExperienceReader", () => {
  it("uses native buttons to move across every résumé chapter", () => {
    renderWithIntl(
      <MobileExperienceReader experiences={portfolio.experience} />,
    );

    const previous = screen.getByRole("button", {
      name: "Previous experience",
    });
    const next = screen.getByRole("button", { name: "Next experience" });

    expect(previous).toBeDisabled();
    expect(
      screen.getByRole("heading", { name: "Senior Frontend Developer" }),
    ).toBeInTheDocument();

    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: "Senior Frontend Engineer" }),
    ).toBeInTheDocument();

    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: "Frontend Developer" }),
    ).toBeInTheDocument();

    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: "React Developer" }),
    ).toBeInTheDocument();
    expect(next).toBeDisabled();
  });

  it.each(["en", "fa", "de"] as const)(
    "keeps every %s highlight available in the active chapter",
    (locale) => {
      const experiences = testMessages[locale].Portfolio.experience;

      renderWithIntl(<MobileExperienceReader experiences={experiences} />, {
        locale,
      });

      for (const highlight of experiences[0].highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      }
    },
  );

  it("updates chapter copy without remounting the paper surface", () => {
    const { container } = renderWithIntl(
      <MobileExperienceReader experiences={portfolio.experience} />,
    );
    const paper = container.querySelector(
      ".mobile-experience-reader__book article",
    );

    expect(paper).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Next experience" }));

    expect(
      container.querySelector(".mobile-experience-reader__book article"),
    ).toBe(paper);
    expect(
      screen.getByRole("heading", { name: "Senior Frontend Engineer" }),
    ).toBeInTheDocument();
  });

  it("uses RTL direction, Persian actions, and mirrored navigation arrows", () => {
    const messages = testMessages.fa;
    const experiences = messages.Portfolio.experience;

    renderWithIntl(<MobileExperienceReader experiences={experiences} />, {
      locale: "fa",
    });

    const previous = screen.getByRole("button", {
      name: messages.Experience.previous,
    });
    const next = screen.getByRole("button", {
      name: messages.Experience.next,
    });
    const firstHeading = screen.getByRole("heading", {
      name: experiences[0].role,
    });

    expect(firstHeading.closest(".mobile-experience-reader")).toHaveAttribute(
      "data-direction",
      "rtl",
    );
    expect(previous).toBeDisabled();
    expect(previous.querySelector("svg")).toHaveClass("lucide-arrow-right");
    expect(next.querySelector("svg")).toHaveClass("lucide-arrow-left");

    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: experiences[1].role }),
    ).toBeInTheDocument();
    expect(previous).toBeEnabled();

    fireEvent.click(previous);
    expect(
      screen.getByRole("heading", { name: experiences[0].role }),
    ).toBeInTheDocument();
  });
});
