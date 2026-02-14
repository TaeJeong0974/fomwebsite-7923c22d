import { useRef, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";
import { getColor, APPLE_GRADIENT_COLORS } from "@/lib/colorUtils";

/**
 * SVG path data for FOM logo — used to sample target particle positions.
 */
const FOM_PATHS = [
  // F top bar
  "M0,0 L149.5,0 L149.5,37.2 L0,37.2 Z",
  // F middle bar
  "M0,74.38 L149.5,74.38 L149.5,111.58 L0,111.58 Z",
  // F bottom stub
  "M0,148.8 L73.68,148.8 L73.68,186 L0,186 Z",
  // O outer
  "M280.322,0 C228.705,0 186.875,41.6346 186.875,93.0097 C186.875,144.385 228.705,186.019 280.322,186.019 C331.939,186.019 373.769,144.385 373.769,93.0097 C373.769,41.6346 331.92,0 280.322,0 Z",
  // O inner (hole)
  "M280.322,37.2 C311.238,37.2 336.394,62.2388 336.394,93.0097 C336.394,123.781 311.238,148.819 280.322,148.819 C249.407,148.819 224.25,123.781 224.25,93.0097 C224.25,62.2388 249.407,37.2 280.322,37.2 Z",
  // M left bar
  "M411.125,0 L448.5,0 L448.5,186 L411.125,186 Z",
  // M middle bar
  "M485.875,0 L523.25,0 L523.25,186 L485.875,186 Z",
  // M right bar
  "M560.625,0 L598,0 L598,186 L560.625,186 Z",
];

const SVG_WIDTH = 598;
const SVG_HEIGHT = 186;

interface Particle {
  // Target position (normalized 0-1)
  tx: number;
  ty: number;
  // Current position
  x: number;
  y: number;
  // Starting position (random scatter)
  sx: number;
  sy: number;
  // Delay before this particle starts moving (stagger)
  delay: number;
  // Size
  size: number;
  // Color index
  colorIdx: number;
}

/**
 * Sample points from the FOM logo paths using an offscreen canvas.
 */
function sampleLogoPoints(count: number): Array<[number, number]> {
  const canvas = document.createElement("canvas");
  const scale = 2;
  canvas.width = SVG_WIDTH * scale;
  canvas.height = SVG_HEIGHT * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  // Draw filled shape (outer O minus inner O hole)
  ctx.fillStyle = "black";
  FOM_PATHS.forEach((d, i) => {
    const path = new Path2D(d);
    if (i === 4) {
      // O inner hole — use evenodd or just clip
      // We'll handle this by erasing
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill(path);
      ctx.globalCompositeOperation = "source-over";
    } else {
      ctx.fill(path);
    }
  });

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const filled: Array<[number, number]> = [];

  // Sample filled pixels
  const step = Math.max(1, Math.floor(Math.sqrt((canvas.width * canvas.height) / (count * 4))));
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const idx = (y * canvas.width + x) * 4;
      if (imageData.data[idx + 3] > 128) {
        filled.push([x / canvas.width, y / canvas.height]);
      }
    }
  }

  // If we got too many or too few, randomly sample to target count
  if (filled.length > count) {
    const shuffled = filled.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  return filled;
}

interface ParticleLogoCanvasProps {
  className?: string;
  onSettled?: () => void;
}

const ParticleLogoCanvas = ({ className, onSettled }: ParticleLogoCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const hasInitRef = useRef(false);
  const dprRef = useRef(1);
  const settledCalledRef = useRef(false);

  const PARTICLE_COUNT = 10000;
  const DURATION = 3.5;
  const STAGGER_RANGE = 1.8;
  const FADE_OUT_START = 4.0;
  const FADE_OUT_DURATION = 1.5;

  const initParticles = useCallback(() => {
    if (hasInitRef.current) return;
    hasInitRef.current = true;

    const points = sampleLogoPoints(PARTICLE_COUNT);
    particlesRef.current = points.map(([tx, ty]) => {
      // Organic scatter using gaussian-like distribution for natural cloud shape
      const cx = 0.5, cy = 0.5;
      const r = Math.sqrt(-2 * Math.log(Math.max(0.001, Math.random()))) * 0.35;
      const theta = Math.random() * Math.PI * 2;
      const sx = cx + r * Math.cos(theta) * (1 + Math.random() * 0.3);
      const sy = cy + r * Math.sin(theta) * (0.8 + Math.random() * 0.4);
      return {
        tx, ty,
        x: sx, y: sy,
        sx, sy,
        delay: Math.random() * STAGGER_RANGE,
        size: 1.2,
        colorIdx: (tx * 4 + ty * 2 + Math.random()) % 4,
      };
    });
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    canvas.width = rect.width * dpr;
    canvas.height = rect.width * (SVG_HEIGHT / SVG_WIDTH) * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.width * (SVG_HEIGHT / SVG_WIDTH)}px`;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (!isInView) return;
    initParticles();
    startTimeRef.current = performance.now();

    const draw = (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const elapsed = (now - startTimeRef.current!) / 1000;
      const w = canvas.width;
      const h = canvas.height;
      const dpr = dprRef.current;

      ctx.clearRect(0, 0, w, h);

      // Global fade-out after particles have settled
      const globalFade = elapsed > FADE_OUT_START
        ? Math.max(0, 1 - (elapsed - FADE_OUT_START) / FADE_OUT_DURATION)
        : 1;

      // Notify parent when particles start fading so logo can appear
      if (elapsed > FADE_OUT_START && !settledCalledRef.current) {
        settledCalledRef.current = true;
        onSettled?.();
      }

      if (globalFade <= 0) {
        // Animation complete, stop loop
        return;
      }

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const t = Math.max(0, Math.min(1, (elapsed - p.delay) / (DURATION - p.delay)));
        // Smooth ease-in-out for gentler convergence
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        p.x = p.sx + (p.tx - p.sx) * ease;
        p.y = p.sy + (p.ty - p.sy) * ease;

        const alpha = globalFade;

        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isInView, initParticles]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}` }}
      />
    </div>
  );
};

export default ParticleLogoCanvas;
