import { describe, expect, it } from "vitest";
import { carouselCopyOpacity, proofFrame, proofIllumination, proofSceneBlend } from "@/lib/kinetic-model";

describe("kinetic copy choreography", () => {
  it("withholds project copy while the logo is still assembling the rack", () => {
    expect(carouselCopyOpacity("hero", 0, 0)).toBe(0);
    expect(carouselCopyOpacity("assembly", 0, 0)).toBe(0);
    expect(carouselCopyOpacity("carousel", 0, 0)).toBe(1);
    expect(carouselCopyOpacity("proof", 0, 0)).toBe(0);
  });

  it("reveals only the selected project and yields to its open preview", () => {
    expect(carouselCopyOpacity("carousel", 2, 2)).toBe(1);
    expect(carouselCopyOpacity("carousel", 2, 1)).toBe(0);
    expect(carouselCopyOpacity("carousel", 2, 2, 1)).toBe(0);
  });

  it("finishes the orbit and starts sunlight before revealing the text", () => {
    expect(proofIllumination(.1).copy).toBe(0);
    expect(proofIllumination(.2).beam).toBeGreaterThan(0);
    expect(proofIllumination(.2).copy).toBe(0);
    expect(proofIllumination(.26).orbit).toBe(1);
    expect(proofIllumination(.5)).toEqual({ orbit: 1, beam: 1, copy: 1 });
  });

  it("reverses without leaving illuminated copy at the next orbit boundary", () => {
    expect(proofIllumination(1).copy).toBe(0);
    expect(proofIllumination(1).beam).toBe(0);
    expect(proofIllumination(0).copy).toBe(0);
    expect(proofIllumination(.5).copy).toBe(1);
  });
  it("keeps the final illuminated statement readable in the sticky tail", () => {
    const last = proofFrame(1);
    expect(last.index).toBe(3);
    expect(proofIllumination(last.progress).copy).toBe(1);
  });
  it("overlaps the outgoing rack with the arriving solar system", () => {
    expect(proofSceneBlend(0, 0)).toEqual({ rack: 1, solar: 0 });
    expect(proofSceneBlend(.5, 0)).toEqual({ rack: .5, solar: .5 });
    expect(proofSceneBlend(1, 0)).toEqual({ rack: 0, solar: 1 });
  });
  it("never brings the rack back while the solar system exits to FAQ", () => {
    for (const exit of [0, .25, .5, .75, 1]) expect(proofSceneBlend(1, exit).rack).toBe(0);
    expect(proofSceneBlend(1, 1)).toEqual({ rack: 0, solar: 0 });
  });
  it("changes continuously across the phase boundary in either scroll direction", () => {
    const before = proofSceneBlend(.5428, 0);
    const after = proofSceneBlend(.543, 0);
    expect(Math.abs(before.solar - after.solar)).toBeLessThan(.001);
    expect(before.rack + before.solar).toBeCloseTo(1);
    expect(after.rack + after.solar).toBeCloseTo(1);
  });
});
