import { useRef, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";
import { getColor, APPLE_GRADIENT_COLORS } from "@/lib/colorUtils";

const SVG_WIDTH = 598;
const SVG_HEIGHT = 186;

/** SVG mask for the FOM logo — used as CSS mask on the canvas */
const logoMask = `url("data:image/svg+xml,%3Csvg width='598' height='186' viewBox='0 0 598 186' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M448.5 0H411.125V186H448.5V0Z' fill='black'/%3E%3Cpath d='M0 -4.57764e-05L0 37.2L149.5 37.2V-4.57764e-05L0 -4.57764e-05Z' fill='black'/%3E%3Cpath d='M0 74.3806L0 111.581L149.5 111.581V74.3806H0Z' fill='black'/%3E%3Cpath d='M0 148.8L0 186H73.6799V148.8H0Z' fill='black'/%3E%3Cpath d='M523.25 0H485.875V186H523.25V0Z' fill='black'/%3E%3Cpath d='M598 0H560.625V186H598V0Z' fill='black'/%3E%3Cpath d='M280.322 37.2C311.238 37.2 336.394 62.2388 336.394 93.0097C336.394 123.781 311.238 148.819 280.322 148.819C249.407 148.819 224.25 123.781 224.25 93.0097C224.25 62.2388 249.407 37.2 280.322 37.2ZM280.322 0C228.705 0 186.875 41.6346 186.875 93.0097C186.875 144.385 228.705 186.019 280.322 186.019C331.939 186.019 373.769 144.385 373.769 93.0097C373.769 41.6346 331.92 0 280.322 0Z' fill='black'/%3E%3C/svg%3E")`;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorIdx: number;
}

interface ParticleLogoCanvasProps {
  className?: string;
  onSettled?: () => void;
}

const PARTICLE_COUNT = 30000;
const SETTLE_TIME = 3.0;
const BLACK_START = 2.5;
const BLACK_END = 5.0;

const ParticleLogoCanvas = ({ className, onSettled }: ParticleLogoCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const hasInitRef = useRef(false);
  const dprRef = useRef(1);
  const doneRef = useRef(false);
  const lastElapsedRef = useRef(0);

  const initParticles = useCallback(() => {
    if (hasInitRef.current) return;
    hasInitRef.current = true;

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.003,
      vy: (Math.random() - 0.5) * 0.003,
      size: 0.3 + Math.random() * 0.7,
      colorIdx: Math.random() * 4,
    }));
  }, []);

  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !doneRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const dpr = dprRef.current;
    ctx.clearRect(0, 0, w, h);
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const finalSize = p.size + 10.0;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, finalSize * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,0,0,1)`;
      ctx.fill();
    }
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
    // Redraw if animation already finished
    drawStatic();
  }, [drawStatic]);

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
      const settled = elapsed > SETTLE_TIME;
      const done = elapsed > BLACK_END;
      const w = canvas.width;
      const h = canvas.height;
      const dpr = dprRef.current;

      ctx.clearRect(0, 0, w, h);

      // How much to blend toward black (0 = full color, 1 = solid black)
      const blackT = elapsed < BLACK_START ? 0
        : elapsed > BLACK_END ? 1
        : (elapsed - BLACK_START) / (BLACK_END - BLACK_START);
      // Smooth ease
      const blackEase = blackT * blackT * (3 - 2 * blackT);

      // Slow particles down as we approach settle time
      const speedFactor = settled ? 0 : Math.max(0, 1 - elapsed / SETTLE_TIME);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!settled) {
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor;

          if (p.x < 0) p.x += 1;
          if (p.x > 1) p.x -= 1;
          if (p.y < 0) p.y += 1;
          if (p.y > 1) p.y -= 1;
        }

        const colorTime = settled ? SETTLE_TIME : elapsed;
        const color = getColor(p.colorIdx + colorTime * 0.15, APPLE_GRADIENT_COLORS);

        // Lerp RGB toward black based on blackEase
        const r = Math.round(color[0] * (1 - blackEase));
        const g = Math.round(color[1] * (1 - blackEase));
        const b = Math.round(color[2] * (1 - blackEase));

        // Also increase size slightly to fill gaps as it becomes solid
        const finalSize = p.size + blackEase * 10.0;

        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, finalSize * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.85 + blackEase * 0.15})`;
        ctx.fill();
      }

      if (!done) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        doneRef.current = true;
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isInView, initParticles]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{
          aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
          maskImage: logoMask,
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: logoMask,
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};

export default ParticleLogoCanvas;
