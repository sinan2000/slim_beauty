"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

// Ashima 3D simplex noise (MIT), used for the dimples and the soft lobes.
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uProgress;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDimple;
${noise}

// Unit-sphere direction -> sculpted surface point. Progress 0 is dimpled and lumpy; 1 is smooth and waisted.
vec3 shape(vec3 n, out float dimple){
  float s = smoothstep(0.0, 1.0, uProgress);
  float t = uTime * 0.12;
  float lobes = snoise(n * 1.1 + vec3(t, t * 0.7, -t)) * mix(0.1, 0.05, s);
  float d = snoise(n * 6.0 + vec3(0.0, t * 0.3, 0.0)) * 0.6 + snoise(n * 3.2 - vec3(t * 0.2)) * 0.4;
  dimple = max(0.0, -d) * (1.0 - s);
  float r = 1.0 + lobes + d * mix(0.028, 0.0, s);
  vec3 q = n * r;
  float y = q.y;
  q.y *= mix(1.0, 1.32, s);
  float waist = exp(-pow(y * 1.7 + 0.05, 2.0));
  q.xz *= 1.0 - 0.26 * s * waist;
  q.xz *= 1.0 + 0.06 * s * exp(-pow(y * 2.0 + 1.0, 2.0));
  return q;
}

void main(){
  vec3 n = normalize(position);
  vec3 up = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tg = normalize(cross(n, up));
  vec3 bt = cross(n, tg);
  float eps = 0.006;
  float dimple; float dd;
  vec3 p0 = shape(n, dimple);
  vec3 p1 = shape(normalize(n + tg * eps), dd);
  vec3 p2 = shape(normalize(n + bt * eps), dd);
  vec3 objNormal = normalize(cross(p1 - p0, p2 - p0));
  vDimple = dimple;
  vNormal = normalize(normalMatrix * objNormal);
  vec4 mv = modelViewMatrix * vec4(p0, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uProgress;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDimple;

void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(vec3(-0.55, 0.75, 0.65));
  vec3 L2 = normalize(vec3(0.8, -0.2, -0.4));

  float ndl = dot(N, L);
  float wrap = clamp((ndl + 0.5) / 1.5, 0.0, 1.0);
  vec3 deep = vec3(0.52, 0.2, 0.3);
  vec3 blush = vec3(0.95, 0.82, 0.81);
  vec3 porcelain = vec3(1.0, 0.95, 0.93);
  vec3 col = mix(deep, blush, smoothstep(0.08, 0.8, wrap));
  col = mix(col, porcelain, smoothstep(0.7, 1.0, wrap) * 0.7);

  // Light scattering through the shadow side, warm like skin.
  float back = pow(clamp(dot(-N, L2) * 0.5 + 0.5, 0.0, 1.0), 3.0);
  col += vec3(0.9, 0.35, 0.4) * back * 0.18;

  // Darken the pits a touch while they exist.
  col *= 1.0 - vDimple * 0.18;

  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.6);
  vec3 pearl = 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + fres * 0.9 + N.y * 0.2 + uTime * 0.015));
  pearl = mix(vec3(1.0), pearl, 0.45);
  col = mix(col, pearl * vec3(1.0, 0.93, 0.95), fres * mix(0.45, 0.65, uProgress));

  vec3 H = normalize(L + V);
  float gloss = mix(40.0, 120.0, uProgress);
  float spec = pow(max(dot(N, H), 0.0), gloss) * mix(0.55, 0.95, uProgress);
  float sheen = pow(max(dot(N, H), 0.0), 10.0) * 0.12;
  col += vec3(1.0, 0.97, 0.98) * (spec + sheen);

  gl_FragColor = vec4(col, 1.0);
}
`;

type FormProps = { progress: MotionValue<number>; detail: [number, number]; onReady?: () => void };

function SculptForm({ progress, detail, onReady }: FormProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef(0);
  const announced = useRef(false);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uProgress: { value: 0 } }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const wide = size.width >= 768;


  useFrame((state, delta) => {
    const m = mesh.current;
    const mat = material.current;
    if (!m || !mat) return;
    if (!announced.current) {
      announced.current = true;
      onReady?.();
    }
    const dt = Math.min(delta, 0.05);
    smooth.current += (progress.get() - smooth.current) * Math.min(1, dt * 4);
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uProgress.value = smooth.current;
    m.rotation.y += dt * 0.12;
    m.rotation.x += (pointer.current.y * 0.25 - 0.08 - m.rotation.x) * dt * 2;
    m.rotation.z += (-pointer.current.x * 0.18 + smooth.current * 0.12 - m.rotation.z) * dt * 2;
  });

  // Wide screens give the form its own right-hand canvas; phones stack it above the headline.
  const scale = wide ? Math.min(viewport.height * 0.3, viewport.width * 0.32) : Math.min(viewport.width * 0.36, viewport.height * 0.2);
  const position: [number, number, number] = wide ? [0, -viewport.height * 0.02, 0] : [0, viewport.height * 0.2, 0];

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[1, detail[0], detail[1]]} />
      <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

export function SculptCanvas({ progress, onReady }: { progress: MotionValue<number>; onReady?: () => void }) {
  const detail = useMemo<[number, number]>(
    () => (window.matchMedia("(max-width: 767px)").matches ? [144, 108] : [180, 136]),
    [],
  );
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <SculptForm progress={progress} detail={detail} onReady={onReady} />
    </Canvas>
  );
}
