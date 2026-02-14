/**
 * Shared color interpolation utilities for gradient animations.
 */

export const DEFAULT_GRADIENT_COLORS: number[][] = [
  [255, 100, 80],
  [255, 60, 120],
  [255, 160, 40],
  [255, 180, 60],
];

const FALLBACK_COLOR = [255, 100, 80];

/**
 * Linearly interpolate between two RGB color arrays.
 * Gracefully handles undefined inputs by falling back to a default color.
 */
export const lerpColor = (
  a: number[] | undefined,
  b: number[] | undefined,
  t: number
): number[] => {
  const safeA = a ?? FALLBACK_COLOR;
  const safeB = b ?? FALLBACK_COLOR;
  return safeA.map((v, i) => Math.round(v + ((safeB[i] ?? v) - v) * t));
};

/**
 * Get an interpolated color from a palette at a given fractional offset.
 * Safely normalizes the offset to always produce a valid index.
 */
export const getColor = (
  offset: number,
  colors: number[][] = DEFAULT_GRADIENT_COLORS
): number[] => {
  const len = colors.length;
  const normalizedOffset = ((offset % len) + len) % len;
  const i = Math.floor(normalizedOffset) % len;
  const next = (i + 1) % len;
  const t = normalizedOffset - Math.floor(normalizedOffset);
  return lerpColor(colors[i], colors[next], t);
};
