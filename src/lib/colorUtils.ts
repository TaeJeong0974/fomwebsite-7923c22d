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
  [120, 80, 200],   // purple
  [100, 70, 220],   // deeper purple
  [140, 90, 210],   // soft violet
  [110, 75, 215],   // mid purple
  [130, 85, 205],   // lavender purple
  [120, 80, 200],   // loop back
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
  /** Container aspect ratio (width / height), defaults to 1 */
  aspect?: number;
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
  const { mx = 0.5, my = 0.5, angle = 135, aspect = 1 } = options;

  // Aspect-aware compensation so blobs stay organic at any container ratio
  const ar = Math.max(0.3, Math.min(3, aspect));
  const aw = 1 / Math.sqrt(ar);  // width scale (shrinks for wide containers)
  const ah = Math.sqrt(ar);       // height scale (grows for wide containers)

  const [c0, c1, c2, c3, c4] = [
    colors[0] ?? FALLBACK_COLOR,
    colors[1] ?? FALLBACK_COLOR,
    colors[2] ?? FALLBACK_COLOR,
    colors[3] ?? FALLBACK_COLOR,
    colors[4] ?? FALLBACK_COLOR,
  ];

  // Derive shape variation from mouse position
  const sx = mx * 30;
  const sy = my * 30;

  // Parallax offsets — each layer shifts at a different rate
  const px = (mx - 0.5) * 2;
  const py = (my - 0.5) * 2;

  const ew = (w: number) => (w * aw).toFixed(1);
  const eh = (h: number) => (h * ah).toFixed(1);

  return [
    `radial-gradient(ellipse ${ew(60 + sx)}% ${eh(60 - sy)}% at ${mx * 100}% ${my * 100}%, ${rgba(c0, 1)} 0%, transparent 60%)`,
    `linear-gradient(${angle}deg, ${rgba(c4, 0.3)} 0%, ${rgba(c0, 0.2)} 100%)`,
  ].join(', ');
};
