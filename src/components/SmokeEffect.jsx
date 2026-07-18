import { useEffect, useRef, useCallback } from 'react';

/**
 * SmokeEffect – volumetric auto-emitting smoke with fire-glow.
 *
 * Renders a full-size <canvas> that continuously spawns soft smoke
 * particles rising from the bottom-center.  Colours blend between
 * deep red / orange (fire core) and cool grey / white (dissipating smoke).
 *
 * Props
 * ─────
 * className  – extra Tailwind / CSS classes for the wrapper
 * style      – inline styles forwarded to the <canvas>
 * intensity  – 1 = normal, 2 = double particle count, etc.
 */

// ───────── Simplex-ish 2-D noise (fast, self-contained) ─────────
const PERM = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();

function grad2(hash, x, y) {
  const h = hash & 3;
  return (h & 1 ? -x : x) + (h & 2 ? -y : y);
}

function noise2D(x, y) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const aa = PERM[PERM[X] + Y];
  const ab = PERM[PERM[X] + Y + 1];
  const ba = PERM[PERM[X + 1] + Y];
  const bb = PERM[PERM[X + 1] + Y + 1];
  const x1 = grad2(aa, xf, yf) * (1 - u) + grad2(ba, xf - 1, yf) * u;
  const x2 = grad2(ab, xf, yf - 1) * (1 - u) + grad2(bb, xf - 1, yf - 1) * u;
  return x1 * (1 - v) + x2 * v; // range ~ [-1, 1]
}

// ───────── Colour palette ─────────
const PALETTES = [
  // [R, G, B]  – sampled from the reference image
  [210, 60, 20],   // deep orange-red (fire core)
  [230, 85, 30],   // bright orange
  [190, 50, 15],   // dark ember red
  [140, 40, 10],   // deep red
  [120, 110, 100], // warm grey
  [160, 150, 140], // light warm grey
  [200, 190, 180], // near-white smoke
  [90, 80, 75],    // dark grey
  [60, 50, 45],    // very dark smoke
  [255, 120, 50],  // hot orange highlight
];

// ───────── Smoke sprite generator ─────────
const SPRITE_SIZE = 64;

function makeSmokeSprite(color) {
  const canvas = document.createElement('canvas');
  canvas.width = SPRITE_SIZE;
  canvas.height = SPRITE_SIZE;
  const ctx = canvas.getContext('2d');

  // Radial gradient for a soft blob
  const cx = SPRITE_SIZE / 2;
  const cy = SPRITE_SIZE / 2;
  const r = SPRITE_SIZE / 2;

  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grd.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},1)`);
  grd.addColorStop(0.35, `rgba(${color[0]},${color[1]},${color[2]},0.8)`);
  grd.addColorStop(0.65, `rgba(${color[0]},${color[1]},${color[2]},0.35)`);
  grd.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

  return canvas;
}

// Pre-build a sprite for each palette colour
const SPRITES = PALETTES.map((c) => makeSmokeSprite(c));

// ───────── Particle factory ─────────
function rand(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(x, y, canvasW, canvasH) {
  // Heavier bias towards fire colours (first 4) near bottom, grey higher up
  const isFireCore = Math.random() < 0.55;
  const spriteIndex = isFireCore
    ? (Math.random() * 4) | 0
    : 4 + ((Math.random() * 6) | 0);

  const lifetime = rand(3000, 9000);
  const startScale = rand(0.3, 1.0);
  const endScale = rand(startScale + 4, startScale + 14);

  return {
    x,
    y,
    // Slight horizontal drift
    vx: rand(-0.03, 0.03),
    // Upward velocity  (negative = up in canvas coords)
    vy: rand(-0.18, -0.05),
    startVy: 0, // set below
    scale: startScale,
    endScale,
    lifetime,
    age: 0,
    spriteIndex,
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: rand(-0.0005, 0.0005),
    noiseOffsetX: rand(0, 1000),
    noiseOffsetY: rand(0, 1000),
  };
}

// ───────── Component ─────────
export default function SmokeEffect({
  className = '',
  style = {},
  intensity = 1,
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const run = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize helper
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let particles = [];
    let lastTime = performance.now();
    let elapsed = 0; // global clock for noise sampling

    // Emission zone – bottom-center band
    const emitParticles = (dt) => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      // Spawn rate: ~30-50 particles per frame at 60 fps
      const count = Math.ceil(rand(20, 40) * intensity * (dt / 16.67));

      for (let i = 0; i < count; i++) {
        // Spread across the bottom ~40% horizontally centred
        const cx = w / 2;
        const spread = w * 0.35;
        const px = cx + rand(-spread, spread);
        const py = h + rand(-10, 30); // just below visible bottom

        const p = createParticle(px, py, w, h);
        p.startVy = p.vy;
        particles.push(p);
      }
    };

    // Update & draw
    const tick = (now) => {
      const dt = Math.min(now - lastTime, 50); // cap to avoid spiral of death
      lastTime = now;
      elapsed += dt;

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      // Clear with subtle black trail (motion blur feel)
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);

      // Emit
      emitParticles(dt);

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;

        if (p.age >= p.lifetime) {
          particles.splice(i, 1);
          continue;
        }

        const frac = p.age / p.lifetime;

        // Noise-driven turbulence
        const t = elapsed * 0.0004;
        const nx = noise2D(p.noiseOffsetX + t, p.noiseOffsetY) * 0.12;
        const ny = noise2D(p.noiseOffsetY + t, p.noiseOffsetX) * 0.04;

        p.x += (p.vx + nx) * dt;
        p.y += (p.vy + ny) * dt;

        // Slow down as it rises
        p.vy = p.startVy * (1 - frac * 0.7);

        // Scale grows over lifetime
        p.scale = p.endScale * Math.sqrt(frac) + (1 - frac) * p.scale;

        // Rotation
        p.rotation += p.rotationSpeed * dt;
      }

      // ── Draw ──
      // Use lighter composite for fire glow blending
      ctx.globalCompositeOperation = 'lighter';

      for (const p of particles) {
        const frac = p.age / p.lifetime;

        // Opacity: fade in fast, long plateau, fade out
        let alpha;
        if (frac < 0.08) {
          alpha = frac / 0.08; // quick fade-in
        } else if (frac < 0.6) {
          alpha = 1;
        } else {
          alpha = 1 - (frac - 0.6) / 0.4; // fade-out
        }
        // Fire-core particles are brighter, grey ones subtler
        const baseBrightness = p.spriteIndex < 4 ? 0.12 : 0.07;
        ctx.globalAlpha = alpha * baseBrightness;

        const size = p.scale * SPRITE_SIZE;
        const half = size / 2;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.drawImage(SPRITES[p.spriteIndex], -half, -half, size, size);
        ctx.restore();
      }

      // Reset
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Inner glow overlay at the base (fire hotspot)
      const glowGrad = ctx.createRadialGradient(
        w / 2, h, 0,
        w / 2, h, h * 0.55
      );
      glowGrad.addColorStop(0, 'rgba(230, 80, 20, 0.18)');
      glowGrad.addColorStop(0.3, 'rgba(200, 50, 10, 0.08)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  useEffect(() => {
    const cleanup = run();
    return cleanup;
  }, [run]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background: '#000',
        ...style,
      }}
    />
  );
}