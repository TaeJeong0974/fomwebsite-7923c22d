/**
 * Shared color interpolation and gradient utilities.
 */

// ── Palettes ──────────────────────────────────────────────

export const DEFAULT_GRADIENT_COLORS: number[][] = [
  [255, 100, 80],
  [255, 60, 120],
  [255, 160, 40],
  [255, 180, 60],
];

/** Warm palette matching the original site gradient: coral → pink → orange → gold */
export const APPLE_GRADIENT_COLORS: number[][] = [
  [255, 100, 80],   // coral
  [255, 60, 120],   // pink
  [255, 160, 40],   // orange
  [255, 180, 60],   // gold
  [255, 100, 80],   // loop back to coral
];

const FALLBACK_COLOR = [255, 100, 80];

// ── Core interpolation ───────────────────────────────────

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

/**
 * Sample multiple colors from a palette at evenly spaced offsets.
 */
export const sampleColors = (
  offset: number,
  count: number,
  colors: number[][] = DEFAULT_GRADIENT_COLORS
): number[][] =>
  Array.from({ length: count }, (_, i) => getColor(offset + i, colors));

// ── Gradient string builders ─────────────────────────────

/** Format an RGB array as a CSS rgba() string. */
const rgba = (c: number[], alpha: number): string =>
  `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;

export interface MeshGradientOptions {
  /** Normalized mouse X (0–1), defaults to 0.5 */
  mx?: number;
  /** Normalized mouse Y (0–1), defaults to 0.5 */
  my?: number;
  /** Angle in degrees for the base linear layer */
  angle?: number;
}

/**
 * Build a layered mesh-gradient CSS string from sampled colors.
 * Combines multiple radial gradients with a base linear gradient
 * for an Apple-style dimensional effect.
 */
export const buildMeshGradient = (
  colors: number[][],
  options: MeshGradientOptions = {}
): string => {
  const { mx = 0.5, my = 0.5, angle = 135 } = options;
  const [c0, c1, c2, c3, c4] = [
    colors[0] ?? FALLBACK_COLOR,
    colors[1] ?? FALLBACK_COLOR,
    colors[2] ?? FALLBACK_COLOR,
    colors[3] ?? FALLBACK_COLOR,
    colors[4] ?? FALLBACK_COLOR,
  ];

  return [
    `radial-gradient(ellipse 90% 70% at ${mx * 100}% ${my * 100}%, ${rgba(c0, 0.9)} 0%, transparent 65%)`,
    `radial-gradient(ellipse 55% 85% at ${100 - mx * 60}% ${100 - my * 60}%, ${rgba(c1, 0.8)} 0%, transparent 55%)`,
    `radial-gradient(ellipse 75% 50% at ${mx * 80 + 10}% ${my * 40 + 30}%, ${rgba(c2, 0.7)} 0%, transparent 60%)`,
    `radial-gradient(ellipse 40% 65% at ${50 + (mx - 0.5) * 40}% ${50 + (my - 0.5) * 40}%, ${rgba(c3, 0.65)} 0%, transparent 50%)`,
    `linear-gradient(${angle}deg, ${rgba(c4, 0.4)} 0%, ${rgba(c0, 0.3)} 100%)`,
  ].join(', ');
};
