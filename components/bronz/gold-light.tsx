"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped fbm folded into thin bright bands: reads as light moving across silk or tanned skin.
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);
  float t = u_time * 0.035;

  float d = distance(p, m);
  vec2 pull = (m - p) * 0.35 * exp(-d * 2.4);

  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 - t + 3.1));
  vec2 r = vec2(fbm(p * 1.1 + 2.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 1.1 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.0 + 2.4 * r + pull);

  float folds = sin(f * 13.0 + r.x * 5.0 - u_time * 0.22) * 0.5 + 0.5;
  float sheen = pow(folds, 7.0);
  float glow = exp(-d * 2.6) * 0.28;

  vec3 deep = vec3(0.40, 0.24, 0.10);
  vec3 gold = vec3(0.84, 0.64, 0.36);
  vec3 cream = vec3(1.0, 0.90, 0.72);
  vec3 col = mix(deep, gold, smoothstep(0.25, 0.85, f));
  col = mix(col, cream, sheen * 0.85);

  // Keep the light off the left third so the headline sits on calm ground.
  float calm = mix(0.35, 1.0, smoothstep(0.05, 0.7, uv.x));
  float a = (sheen * 0.5 + f * f * 0.22 + glow) * 0.6 * calm;
  gl_FragColor = vec4(col * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

/** Slow "liquid gold" light over the hero photo. Screen-blended, pauses off-screen, frozen under reduced motion. */
export function GoldLight({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0.72, y: 0.55 };
    const mouse = { x: 0.72, y: 0.55 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (time: number) => {
      resize();
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const loop = () => {
      draw((performance.now() - start) / 1000 + 20);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = 1 - (e.clientY - rect.top) / rect.height;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduced) raf = requestAnimationFrame(loop);
    });

    if (reduced) {
      draw(20);
    } else {
      io.observe(canvas);
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    const onResize = () => reduced && draw(20);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
