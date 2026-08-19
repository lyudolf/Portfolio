import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import FrameCard from './FrameCard';
import { useMedia } from '../../lib/useMedia';

/* ══════════════════════════════════════════
   랜딩 히어로 쇼케이스
   — ProjectShowcase(Work)와 완전히 같은 문법을 쓴다.
     흰 프레임 · 상단 홈 탭 · 대형 타이포(좌상단) · 오브젝트(우측) ·
     좌하단 요약 블록 · 하단 홈 + 스크롤 버튼.
     다른 건 딱 하나 — 패널 배경이 단색 컬러가 아니라 사진이다.
     그래야 랜딩이 "표지"로 읽히면서도 같은 사이트로 읽힌다.
   ══════════════════════════════════════════ */

/* ── 3D 오브젝트 자리 ──────────────────────────────
   아직 쓸 모델이 정해지지 않아 빈 오브젝트만 놓아둔다.
   여기 값만 바꾸면 위치·크기·회전·카메라가 그대로 잡히고,
   model 에 GLB 경로를 넣는 순간 플레이스홀더가 자동 교체된다. */
const HERO_OBJECT = {
  model: null,               // 예: '/models/hero-orb.glb'  (Draco면 draco: '/draco/' 도 같이)
  draco: null,

  radius: 1.15,              // 어떤 크기의 GLB가 와도 이 반지름으로 정규화
  position: [0, 0, 0],       // 정규화 후 추가 이동
  rotation: [0, 0, 0],
  scale: 1,

  camera: { position: [0, 0.4, 4.2], fov: 42 },
  panelLeft: '33%',          // 패널 안에서 오브젝트 영역이 시작하는 x (모바일은 0)
  panelTopMobile: -40,

  autoSpin: 0.25,            // rad/s. 0이면 정지
  drag: true,                // 마우스로 돌리기 허용
  shadowY: -1.05,
};

const ACCENT = '#7ef1d6';    // 랜딩 시그니처 — Work 3색(시안/앰버/로즈)과 겹치지 않는 민트

/* 첫 화면에서 바로 읽혀야 하는 핵심 지표 */
const STATS = [
  { num: '3배', label: '팀 매출 성장 견인', sub: '3.8억 → 11.5억' },
  { num: '3년차', label: '1년 용역 → 계속 연장', sub: '임상 60명 무이슈' },
  { num: '금상', label: '웹어워드 코리아', sub: '수상 프로젝트 기획' },
];

/* ══════════════════════════════════════════
   3D
   ══════════════════════════════════════════ */

/* GLB — 바운딩 스피어 기준으로 정규화해 배치 (ProjectShowcase와 동일 규칙) */
function Model({ url, draco, radius }) {
  const { scene } = useGLTF(url, draco || undefined);
  const { object, scale, center } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    const sphere = new THREE.Box3().setFromObject(clone).getBoundingSphere(new THREE.Sphere());
    return { object: clone, scale: radius / sphere.radius, center: sphere.center };
  }, [scene, radius]);

  return (
    <group scale={scale}>
      <primitive object={object} position={[-center.x, -center.y, -center.z]} />
    </group>
  );
}

/* 빈 오브젝트 — 모델이 들어오기 전까지 자리와 크기만 보여준다.
   실루엣만 있는 와이어프레임이라 사진 위에서도 시야를 가리지 않는다. */
function EmptySlot({ radius }) {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[radius, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.16} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -radius * 0.92, 0]}>
        <ringGeometry args={[radius * 0.82, radius * 0.85, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Stage({ reduced }) {
  const spin = useRef();
  useFrame((_, delta) => {
    if (spin.current && !reduced) spin.current.rotation.y += delta * HERO_OBJECT.autoSpin;
  });

  return (
    <>
      {/* 배경 사진(숲 자연광)에 맞춘 조명 */}
      <hemisphereLight args={['#e2f0d4', '#1c3a26', 1.1]} />
      <directionalLight position={[3, 5, 4]} intensity={1.15} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 1.5, -3]} intensity={0.45} color={ACCENT} />

      <Float speed={reduced ? 0 : 1.2} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.4}>
        <group ref={spin}
          position={HERO_OBJECT.position}
          rotation={HERO_OBJECT.rotation}
          scale={HERO_OBJECT.scale}>
          <Suspense fallback={null}>
            {HERO_OBJECT.model
              ? <Model url={HERO_OBJECT.model} draco={HERO_OBJECT.draco} radius={HERO_OBJECT.radius} />
              : <EmptySlot radius={HERO_OBJECT.radius} />}
          </Suspense>
        </group>
      </Float>

      <ContactShadows position={[0, HERO_OBJECT.shadowY, 0]} opacity={0.34} scale={5} blur={2.6} far={2.8} color="#04120a" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false}
        enableRotate={HERO_OBJECT.drag}
        minPolarAngle={Math.PI / 3.4} maxPolarAngle={Math.PI / 1.9} rotateSpeed={0.5} />
    </>
  );
}

/* ══════════════════════════════════════════
   MAIN
   ══════════════════════════════════════════ */
export default function HeroShowcase({ onNavigate, children }) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const isMobile = useMedia('(max-width: 767px)');

  return (
    <FrameCard
      label="유희수"
      meta="Service Planner · PM"
      accent={ACCENT}
      panelStyle={{
        backgroundColor: '#101a13',
        backgroundImage:
          "linear-gradient(150deg, rgba(10,22,15,0.62) 0%, rgba(8,18,12,0.5) 45%, rgba(6,14,10,0.72) 100%), url('/hero-bg.jpg')",
        backgroundSize: 'auto, cover',
        backgroundPosition: 'center, center',
      }}
      panel={
        <>
          {/* 상단 — 좌: 라벨 / 우: 구직 상태 (Work의 스위처 자리) */}
          <div className="relative z-30 flex items-center justify-between gap-3 px-6 md:px-9 pt-6">
            <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Portfolio · 2026
            </p>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(126,241,214,0.14)', border: '1px solid rgba(126,241,214,0.36)', color: '#a9f7e4' }}>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: ACCENT }} />
              서비스 기획 · PO 포지션 탐색 중
            </span>
          </div>

          {/* 대형 타이포 — 좌측 상단, 아래로 옅어지는 그라디언트 (Work와 동일) */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute z-0 pointer-events-none select-none"
            style={{ top: isMobile ? 62 : 78, left: isMobile ? 18 : 40, margin: 0 }}
          >
            <span style={{
              display: 'block',
              fontSize: isMobile ? 'clamp(52px, 17vw, 76px)' : 'clamp(74px, 10.5vw, 158px)',
              fontWeight: 900, letterSpacing: '-0.055em',
              lineHeight: 0.92, whiteSpace: 'nowrap',
              backgroundImage:
                'linear-gradient(180deg, rgba(255,255,255,0.86) 26%, rgba(255,255,255,0.48) 62%, rgba(255,255,255,0.08) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}>
              HEESU
            </span>
            <span style={{
              display: 'block',
              marginTop: isMobile ? 8 : 12,
              fontSize: isMobile ? 14 : 21,
              fontWeight: 600, letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.68)',
              whiteSpace: 'nowrap',
            }}>
              서비스 기획 · PO · 프로덕트 매니저
            </span>
          </motion.h1>

          {/* 3D 오브젝트 — 우측 (지금은 빈 자리) */}
          <div className="absolute inset-0 z-10"
            style={{
              touchAction: 'pan-y',
              top: isMobile ? HERO_OBJECT.panelTopMobile : 0,
              left: isMobile ? 0 : HERO_OBJECT.panelLeft,
            }}>
            <Canvas camera={HERO_OBJECT.camera} dpr={[1, 1.7]} shadows
              gl={{ antialias: true, alpha: true }}>
              <Suspense fallback={null}>
                <Stage reduced={reduced} />
              </Suspense>
            </Canvas>
          </div>

          {/* 좌하단 — 헤드라인 · 요약 · 지표 · CTA (Work와 같은 블록) */}
          <div className="absolute left-0 bottom-0 z-20 px-6 md:px-10 pb-6 md:pb-9 w-full md:w-auto"
            style={{ width: isMobile ? '100%' : 'max(440px, calc(50% - 250px))' }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}>
              <p className="text-[10.5px] font-semibold mb-2.5" style={{ color: ACCENT }}>
                XR · AI 프로덕트 · 2019 — 현재
              </p>
              <h2 className="text-[20px] md:text-[25px] font-extrabold leading-[1.28] mb-3"
                style={{ color: '#fff', letterSpacing: '-0.025em' }}>
                &lsquo;Why&rsquo;로 문제를 정의하고,<br />실현 가능한 &lsquo;How&rsquo;를 설계합니다
              </h2>
              <p className="text-[13px] leading-[1.85] mb-4" style={{ color: 'rgba(255,255,255,0.78)' }}>
                기술 이해와 AI로 실행 속도를 높이는 서비스 기획자.
                문서로 끝내지 않고 현장에서 작동하는 상태까지 만듭니다.
              </p>
              <div className="flex gap-5 mb-5">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-[17px] font-extrabold leading-none mb-1" style={{ color: '#fff' }}>{s.num}</p>
                    <p className="text-[10px] leading-snug" style={{ color: 'rgba(255,255,255,0.62)' }}>{s.label}</p>
                    <p className="text-[9.5px] leading-snug" style={{ color: 'rgba(255,255,255,0.38)' }}>{s.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => onNavigate?.('resume')}
                  className="px-6 py-3 rounded-full text-[13px] font-bold cursor-pointer transition-transform"
                  style={{ background: '#fff', color: '#12211a' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
                  이력서 보기
                </button>
                <button onClick={() => onNavigate?.('kisti')}
                  className="px-6 py-3 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.26)',
                    color: 'rgba(255,255,255,0.92)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.24)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}>
                  작업 보기
                </button>
              </div>
            </motion.div>
          </div>

          {/* 우하단 — Work의 페이지네이션 자리 (연락 채널) */}
          <div className="absolute right-6 md:right-9 bottom-16 md:bottom-8 z-20 flex items-center gap-2">
            <a href="mailto:iplay3473@gmail.com"
              className="px-4 py-2 rounded-full text-[12px] font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.24)', color: '#fff' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.26)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}>
              iplay3473@gmail.com
            </a>
            <a href="https://github.com/lyudolf" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold transition-all"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.24)', color: '#fff' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.26)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}>
              GH
            </a>
          </div>
        </>
      }
    >
      {children}
    </FrameCard>
  );
}
