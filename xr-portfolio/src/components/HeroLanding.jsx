import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* 히어로 중앙 3D 모델 (public/models/hero-orb.glb) */
const MODEL_URL = '/models/hero-orb.glb';

/* 배경 이미지는 About 페이지 루트에서 페이지 전체로 깔림(스크롤 연속).
   이 컴포넌트는 투명 배경 위에 오브·글래스 패널만 얹는다. */

/* 오브 위 진입 핫스팟 — Work 카테고리 하나로 통합 (이끼 배경 위 밝은 액센트) */
const HOTSPOTS = [
  { tab: 'work', label: 'Work', sub: '프로젝트 3선', dir: [1.0, 0.45, 0.9], color: '#6fd8ff' },
];

const NAV = [
  { tab: 'work', label: 'Work' },
  { tab: 'withai', label: 'with AI' },
  { tab: 'whyme', label: 'Why Me' },
  { tab: 'process', label: 'Process' },
];

const R = 1.4;

/* GLB 모델을 원점 중심·반지름 R로 정규화해 배치.
   → 어떤 크기의 모델이 와도 기존 오브 자리(중앙 원점 회전)에 맞음. */
function GlbOrb({ orbRef }) {
  const { scene } = useGLTF(MODEL_URL);
  const { object, scale, center } = useMemo(() => {
    const clone = scene.clone(true);
    const sphere = new THREE.Box3().setFromObject(clone).getBoundingSphere(new THREE.Sphere());
    return { object: clone, scale: R / sphere.radius, center: sphere.center };
  }, [scene]);
  return (
    <group>
      <group ref={orbRef} scale={scale}>
        <primitive object={object} position={[-center.x, -center.y, -center.z]} />
      </group>
    </group>
  );
}
useGLTF.preload(MODEL_URL);

function Hotspot({ data, orbRef, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const p = useMemo(() => new THREE.Vector3(...data.dir).normalize().multiplyScalar(R * 1.02), [data.dir]);
  return (
    <group position={p}>
      <mesh>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={data.color} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.07, 0.088, 32]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <Html center distanceFactor={8} occlude={orbRef.current ? [orbRef] : undefined}
        style={{ pointerEvents: 'auto' }}>
        <button
          onClick={() => onNavigate?.(data.tab)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 cursor-pointer"
          style={{
            transform: `translateY(-24px) scale(${hovered ? 1.06 : 1})`,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.1) 100%)',
            backdropFilter: 'blur(10px) saturate(1.15)',
            WebkitBackdropFilter: 'blur(10px) saturate(1.15)',
            border: `1px solid ${data.color}`,
            boxShadow: hovered ? `0 4px 18px ${data.color}66` : '0 4px 14px rgba(0,0,0,0.25)',
            color: 'rgba(255,255,255,0.92)', fontSize: 11, fontWeight: 600, transition: 'all .18s',
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: 99, background: data.color }} />
          {data.label}
          <span style={{ opacity: 0.55, fontWeight: 400 }}>· {data.sub}</span>
        </button>
      </Html>
    </group>
  );
}

function Scene({ onNavigate, allowDrag, autoRotate }) {
  const orbRef = useRef();
  return (
    <>
      {/* 배경 사진(숲 자연광)에 맞춘 조명 — 위: 연두빛 하늘광 / 아래: 이끼 반사광 */}
      <hemisphereLight args={['#cfe8b8', '#1c3a26', 1.15]} />
      <directionalLight position={[3, 6, 4]} intensity={0.7} color="#e8f5d8" />
      <pointLight position={[-4, -2, 2]} intensity={0.35} color="#3f7a54" />
      <group scale={0.66}>
        <GlbOrb orbRef={orbRef} />
        {HOTSPOTS.map((h) => (
          <Hotspot key={h.tab} data={h} orbRef={orbRef} onNavigate={onNavigate} />
        ))}
      </group>
      {/* 바닥 접지 그림자 — 이끼 배경 위 딥 그린 플로팅 섀도 */}
      <ContactShadows position={[0, -1.05, 0]} opacity={0.42} scale={5} blur={2.8} far={2.5} color="#04120a" />
      <OrbitControls
        enableZoom={false} enablePan={false} enableRotate={allowDrag}
        autoRotate={autoRotate} autoRotateSpeed={0.5} rotateSpeed={0.6}
        minPolarAngle={Math.PI / 3} maxPolarAngle={(Math.PI * 2) / 3}
      />
    </>
  );
}

function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    setMatch(m.matches);
    const on = () => setMatch(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}

export default function HeroLanding({ onNavigate }) {
  const isMobile = useMedia('(max-width: 767px)');
  const reduced = useMedia('(prefers-reduced-motion: reduce)');

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* 3D 오브 (센터-우측) — 배경은 About 루트의 포슬린 그라디언트 */}
      <div className="absolute inset-0 z-10" style={{ touchAction: 'pan-y' }}>
        <Canvas camera={{ position: [0, 0, 4.3], fov: 45 }} dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene onNavigate={onNavigate} allowDrag={!isMobile} autoRotate={!reduced} />
          </Suspense>
        </Canvas>
      </div>

      {/* 우측 세로 라벨 */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 hidden md:block pointer-events-none"
        style={{ writingMode: 'vertical-rl', letterSpacing: '0.35em', fontSize: 11,
          color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 8px rgba(0,0,0,0.35)', textTransform: 'uppercase' }}>
        Portfolio&nbsp;·&nbsp;2026&nbsp;&nbsp;—&nbsp;&nbsp;Service&nbsp;Planner
      </div>

      {/* 글래스 패널 — 좌측 */}
      <div className="relative z-20 flex min-h-screen items-center px-5 md:px-10 md:pl-36 pointer-events-none">
        <div className="pointer-events-auto w-full md:w-[46%] md:max-w-[520px] p-8 md:p-10"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 100%)',
            backdropFilter: 'blur(22px) saturate(1.15)',
            WebkitBackdropFilter: 'blur(22px) saturate(1.15)',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: 28,
            boxShadow: '0 30px 70px rgba(0,0,0,0.3)',
          }}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-8"
            style={{ color: 'rgba(255,255,255,0.6)' }}>
            유희수 · Service Planner · PM
          </p>

          {/* 볼드+라이트 대비 디스플레이 */}
          <h1 className="mb-5" style={{ color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.02em', lineHeight: 1.08 }}>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,26px)', opacity: 0.85 }}>
              'Why'로 문제를 정의하고,
            </span>
            <span style={{ display: 'block', fontWeight: 800, fontSize: 'clamp(32px,4.4vw,52px)' }}>
              실현 가능한 'How'
            </span>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,26px)', opacity: 0.85 }}>
              를 설계합니다
            </span>
          </h1>

          <p className="text-[14px] leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.68)' }}>
            기술 이해와 AI로 실행 속도를 높이는 서비스 기획자.
          </p>

          {/* 네비 — 필 버튼 */}
          <div className="flex flex-wrap gap-2">
            {NAV.map((n) => (
              <button key={n.tab} onClick={() => onNavigate?.(n.tab)}
                className="rounded-full px-4 py-2 text-[13px] font-medium transition-all"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.24)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}>
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[11px] tracking-widest uppercase pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.65)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
        Scroll ↓ &nbsp;·&nbsp; 오브를 드래그해 돌려보세요
      </div>
    </section>
  );
}
