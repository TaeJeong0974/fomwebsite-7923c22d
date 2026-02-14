import { describe, it, expect } from "vitest";
import {
  lerpColor,
  getColor,
  sampleColors,
  buildMeshGradient,
  DEFAULT_GRADIENT_COLORS,
  APPLE_GRADIENT_COLORS,
} from "@/lib/colorUtils";

describe("lerpColor", () => {
  it("returns color A when t=0", () => {
    expect(lerpColor([255, 0, 0], [0, 255, 0], 0)).toEqual([255, 0, 0]);
  });

  it("returns color B when t=1", () => {
    expect(lerpColor([255, 0, 0], [0, 255, 0], 1)).toEqual([0, 255, 0]);
  });

  it("returns midpoint when t=0.5", () => {
    expect(lerpColor([0, 0, 0], [100, 200, 50], 0.5)).toEqual([50, 100, 25]);
  });

  it("handles undefined color A with fallback", () => {
    expect(lerpColor(undefined, [0, 0, 0], 1)).toEqual([0, 0, 0]);
  });

  it("handles undefined color B with fallback", () => {
    expect(lerpColor([0, 0, 0], undefined, 0)).toEqual([0, 0, 0]);
  });

  it("handles both colors undefined", () => {
    expect(lerpColor(undefined, undefined, 0.5)).toEqual([255, 100, 80]);
  });
});

describe("getColor", () => {
  const colors = DEFAULT_GRADIENT_COLORS;

  it("returns exact color at integer offset 0", () => {
    expect(getColor(0, colors)).toEqual(colors[0]);
  });

  it("returns exact color at integer offset 1", () => {
    expect(getColor(1, colors)).toEqual(colors[1]);
  });

  it("interpolates at fractional offset 0.5", () => {
    const result = getColor(0.5, colors);
    const expected = lerpColor(colors[0], colors[1], 0.5);
    expect(result).toEqual(expected);
  });

  it("wraps around at offset equal to colors.length", () => {
    expect(getColor(4, colors)).toEqual(colors[0]);
  });

  it("wraps around at offset greater than colors.length", () => {
    expect(getColor(5.5, colors)).toEqual(getColor(1.5, colors));
  });

  it("handles negative offsets safely", () => {
    const result = getColor(-1, colors);
    expect(result).toBeDefined();
    expect(result).toHaveLength(3);
    result.forEach((v) => expect(typeof v).toBe("number"));
  });

  it("handles very large fractional offsets", () => {
    const result = getColor(999.7, colors);
    expect(result).toBeDefined();
    expect(result).toHaveLength(3);
    result.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(255);
    });
  });

  it("handles NaN-adjacent edge (offset = 0.0001)", () => {
    const result = getColor(0.0001, colors);
    expect(result).toBeDefined();
    expect(result).toHaveLength(3);
  });

  it("uses default palette when no colors provided", () => {
    expect(getColor(0)).toEqual(DEFAULT_GRADIENT_COLORS[0]);
  });
});

describe("APPLE_GRADIENT_COLORS", () => {
  it("has at least 5 colors for mesh sampling", () => {
    expect(APPLE_GRADIENT_COLORS.length).toBeGreaterThanOrEqual(5);
  });

  it("loops back to first color", () => {
    expect(APPLE_GRADIENT_COLORS[APPLE_GRADIENT_COLORS.length - 1]).toEqual(
      APPLE_GRADIENT_COLORS[0]
    );
  });
});

describe("sampleColors", () => {
  it("returns the requested number of colors", () => {
    const result = sampleColors(0, 5);
    expect(result).toHaveLength(5);
    result.forEach((c) => expect(c).toHaveLength(3));
  });

  it("works with custom palette", () => {
    const result = sampleColors(0, 3, APPLE_GRADIENT_COLORS);
    expect(result).toHaveLength(3);
  });

  it("handles fractional offsets", () => {
    const result = sampleColors(1.7, 4);
    expect(result).toHaveLength(4);
    result.forEach((c) =>
      c.forEach((v) => {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(255);
      })
    );
  });
});

describe("buildMeshGradient", () => {
  const colors = sampleColors(0, 5, APPLE_GRADIENT_COLORS);

  it("returns a non-empty string", () => {
    const result = buildMeshGradient(colors);
    expect(result.length).toBeGreaterThan(0);
  });

  it("contains radial-gradient layers", () => {
    const result = buildMeshGradient(colors);
    expect(result).toContain("radial-gradient");
  });

  it("contains a linear-gradient base layer", () => {
    const result = buildMeshGradient(colors);
    expect(result).toContain("linear-gradient");
  });

  it("responds to mouse position options", () => {
    const a = buildMeshGradient(colors, { mx: 0, my: 0 });
    const b = buildMeshGradient(colors, { mx: 1, my: 1 });
    expect(a).not.toEqual(b);
  });

  it("responds to angle option", () => {
    const a = buildMeshGradient(colors, { angle: 0 });
    const b = buildMeshGradient(colors, { angle: 180 });
    expect(a).not.toEqual(b);
  });

  it("handles fewer than 5 colors with fallbacks", () => {
    const sparse = sampleColors(0, 2);
    // Should not throw
    const result = buildMeshGradient(sparse);
    expect(result).toContain("radial-gradient");
  });
});
