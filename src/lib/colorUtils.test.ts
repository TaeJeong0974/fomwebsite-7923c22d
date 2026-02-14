import { describe, it, expect } from "vitest";
import { lerpColor, getColor, DEFAULT_GRADIENT_COLORS } from "@/lib/colorUtils";

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
    const result = lerpColor(undefined, [0, 0, 0], 1);
    expect(result).toEqual([0, 0, 0]);
  });

  it("handles undefined color B with fallback", () => {
    const result = lerpColor([0, 0, 0], undefined, 0);
    expect(result).toEqual([0, 0, 0]);
  });

  it("handles both colors undefined", () => {
    const result = lerpColor(undefined, undefined, 0.5);
    // Should return fallback color lerped with itself
    expect(result).toEqual([255, 100, 80]);
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
    // Should be midpoint between colors[0] and colors[1]
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
    const result = getColor(0);
    expect(result).toEqual(DEFAULT_GRADIENT_COLORS[0]);
  });
});
