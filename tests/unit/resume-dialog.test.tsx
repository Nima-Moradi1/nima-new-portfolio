import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResumeDialog } from "@/components/ui/resume-dialog";
import { renderWithIntl, testMessages } from "../helpers/render-with-intl";

describe("ResumeDialog", () => {
  it("renders one optimized résumé page and the PDF actions", () => {
    renderWithIntl(
      <ResumeDialog
        open={false}
        resumeUrl="/nima-moradirad-resume.pdf"
        onClose={vi.fn()}
      />,
    );

    const messages = testMessages.en.ResumeDialog;
    const preview = screen.getByAltText(messages.previewAlt);
    expect(preview.getAttribute("src")).toContain(
      "nima-moradirad-resume-preview.webp",
    );
    expect(screen.getAllByAltText(messages.previewAlt)).toHaveLength(1);
    expect(screen.queryByText(/Page 02/i)).not.toBeInTheDocument();
    expect(screen.getByText(messages.description)).toBeInTheDocument();
    expect(screen.getByText(messages.open).closest("a")).toHaveAttribute(
      "href",
      "/nima-moradirad-resume.pdf",
    );
    expect(screen.getByText(messages.download).closest("a")).toHaveAttribute(
      "download",
    );

    const viewport = preview.closest(".resume-dialog__viewport");
    expect(viewport).toHaveAttribute("lang", "en");
    expect(viewport).toHaveAttribute("dir", "ltr");
    expect(viewport).toHaveAttribute("data-artifact-language", "en");
  });
});
