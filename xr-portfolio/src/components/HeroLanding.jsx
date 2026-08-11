import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* 히어로 배경 3D 모델 (public/models/hero-orb.glb)
   — 오브는 전면 배경으로 물러나고, 그 위에 정보 그리드가 올라간다.
   배경 이미지는 About 페이지 루트에서 페이지 전체로 깔림(스크롤 연속). */
const MODEL_URL = '/models/hero-orb.glb';

/* 첫 화면에서 바로 읽혀야 하는 핵심 지표 */
const STATS = [
  { num: '3배', label: '팀 매출 성장 견인', sub: '3.8억 → 11.5억' },
  { num: '3년차', label: '1년 용역 → 계속 연장', sub: '임상 60명 무이슈 완료' },
  { num: '금상', label: '웹어워드 코리아', sub: '수상 프로젝트 기획' },
];

/* 역량 키워드 — 채용담당자가 스캔하는 지점 */
const CAPABILITIES = [
  '서비스 기획 · PO',
  '요구사항 정의 · IA',
  'XR · 3D 콘텐츠 설계',
  'AI 프로덕트 기획',
  '프로토타이핑 · 실행',
  'QA · 운영 설계',
];

/* 대표작 미니 프리뷰 — 클릭 시 각 상세로 직행 */
const FEATURED = [
  { tab: 'kisti', name: 'KISTI', sub: '임상 XR 훈련 시스템', meta: '2024 — 현재 · 단독 기획', color: '#6fd8ff' },
  { tab: 'dream', name: '꿈키올래', sub: 'Vision Pro 직업체험 9종', meta: '2025 · PM · 2개월', color: '#d8a54b' },
  { tab: 'kocca-detail', name: '한콘진', sub: 'LLM 생성형 직업체험', meta: '2026 · 국가과제 진행 중', color: '#f9a8d4' },
];

const R = 1.4;

/* GLB 모델을 원점 중심·반지름 R로 정규화해 배치. */
function GlbOrb() {
  const { scene } = useGLTF(MODEL_URL);
  const { object, scale, center } = useMemo(() => {
    const clone = scene.clone(true);
    const sphere = new THREE.Box3().setFromObject(clone).getBoundingSphere(new THREE.Sphere());
    return { object: clone, scale: R / sphere.radius, center: sphere.center };
  }, [scene]);
  return (
    <group scale={scale}>
      <primitive object={object} position={[-center.x, -center.y, -center.z]} />
    </group>
  );
}
useGLTF.preload(MODEL_URL);

function Scene({ autoRotate }) {
  return (
    <>
      {/* 배경 사진(숲 자연광)에 맞춘 조명 — 위: 연두빛 하늘광 / 아래: 이끼 반사광 */}
      <hemisphereLight args={['#cfe8b8', '#1c3a26', 1.15]} />
      <directionalLight position={[3, 6, 4]} intensity={0.7} color="#e8f5d8" />
      <pointLight position={[-4, -2, 2]} intensity={0.35} color="#3f7a54" />
      <group scale={0.9}>
        <GlbOrb />
      </group>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={6} blur={3} far={3} color="#04120a" />
      <OrbitControls
        enableZoom={false} enablePan={false} enableRotate={false}
        autoRotate={autoRotate} autoRotateSpeed={0.35}
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

/* 유리 카드 공통 스타일 */
const glass = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)',
  backdropFilter: 'blur(18px) saturate(1.15)',
  WebkitBackdropFilter: 'blur(18px) saturate(1.15)',
  border: '1px solid rgba(255,255,255,0.32)',
};

function FeaturedCard({ item, onNavigate }) {
  const ref = useRef(null);
  return (
    <button
      ref={ref}
      onClick={() => onNavigate?.(item.tab)}
      className="flex-1 text-left px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-200"
      style={{ ...glass, borderRadius: 18 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.14) 100%)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = glass.background;
        e.currentTarget.style.transform = 'none';
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span style={{ width: 6, height: 6, borderRadius: 99, background: item.color, flexShrink: 0 }} />
        <span className="text-[14px] font-bold" style={{ color: 'rgba(255,255,255,0.95)' }}>{item.name}</span>
      </div>
      <p className="text-[12px] leading-snug mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{item.sub}</p>
      <p className="text-[10.5px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.meta}</p>
    </button>
  );
}

export default function HeroLanding({ onNavigate }) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)');

  return (
    <section className="relative w-full overflow-hidden flex items-center" style={{ minHeight: '100vh' }}>
      {/* ── 배경 오브 (비인터랙티브) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.55 }}>
        <Canvas camera={{ position: [0, 0, 4.3], fov: 45 }} dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene autoRotate={!reduced} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── 가독성 스크림 ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(105deg, rgba(10,16,12,0.62) 0%, rgba(10,16,12,0.42) 45%, rgba(10,16,12,0.2) 100%)' }} />

      {/* ── 정보 그리드 ── */}
      <div className="relative z-10 w-full px-5 md:px-10 md:pl-36 py-20 md:py-12">
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

          {/* 상단: 신분 + 구직 상태 */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase"
              style={{ color: 'rgba(255,255,255,0.62)' }}>
              유희수 · Service Planner · PM
            </p>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(126,241,214,0.16)', border: '1px solid rgba(126,241,214,0.4)', color: '#a9f7e4' }}>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: '#7ef1d6' }} />
              서비스 기획 · PO 포지션 탐색 중
            </span>
          </div>

          {/* 헤드라인 */}
          <h1 className="mb-4" style={{ color: 'rgba(255,255,255,0.97)', letterSpacing: '-0.03em', lineHeight: 1.04 }}>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,25px)', opacity: 0.82, letterSpacing: '-0.01em' }}>
              'Why'로 문제를 정의하고,
            </span>
            <span style={{ display: 'block', fontWeight: 800, fontSize: 'clamp(38px,5.6vw,72px)' }}>
              실현 가능한 'How'
            </span>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,25px)', opacity: 0.82, letterSpacing: '-0.01em' }}>
              를 설계합니다
            </span>
          </h1>

          <p className="text-[14px] md:text-[15px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '520px' }}>
            기술 이해와 AI로 실행 속도를 높이는 서비스 기획자.
            문서로 끝내지 않고 현장에서 작동하는 상태까지 만듭니다.
          </p>

          {/* 핵심 지표 3 */}
          <div className="grid grid-cols-3 gap-2.5 md:gap-3 mb-6" style={{ maxWidth: '640px' }}>
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-3.5 rounded-2xl" style={{ ...glass, borderRadius: 18 }}>
                <p className="text-[22px] md:text-[26px] font-extrabold leading-none mb-1.5"
                  style={{ color: '#ffffff' }}>
                  {s.num}
                </p>
                <p className="text-[11.5px] font-semibold leading-snug mb-0.5" style={{ color: 'rgba(255,255,255,0.86)' }}>
                  {s.label}
                </p>
                <p className="text-[10.5px] leading-snug" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* 역량 키워드 */}
          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
              What I Do
            </p>
            <div className="flex flex-wrap gap-2">
              {CAPABILITIES.map((c) => (
                <span key={c} className="text-[12px] font-medium px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.9)' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* 대표작 프리뷰 */}
          <div className="mb-6">
            <div className="flex items-baseline justify-between mb-3" style={{ maxWidth: '720px' }}>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Featured Work
              </p>
              <button onClick={() => onNavigate?.('work')}
                className="text-[11px] font-semibold cursor-pointer transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.95)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}>
                전체 보기 →
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5" style={{ maxWidth: '720px' }}>
              {FEATURED.map((f) => (
                <FeaturedCard key={f.tab} item={f} onNavigate={onNavigate} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button onClick={() => onNavigate?.('resume')}
              className="px-5 py-2.5 rounded-full text-[13px] font-bold cursor-pointer transition-all"
              style={{ background: 'rgba(255,255,255,0.95)', color: '#12211a' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
              이력서 보기
            </button>
            <button onClick={() => onNavigate?.('whyme')}
              className="px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
              style={{ ...glass, color: 'rgba(255,255,255,0.92)', borderRadius: 99 }}>
              왜 저인가
            </button>
            <a href="mailto:iplay3473@gmail.com"
              className="px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all"
              style={{ ...glass, color: 'rgba(255,255,255,0.92)', borderRadius: 99 }}>
              iplay3473@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-[10.5px] tracking-[0.25em] uppercase pointer-events-none hidden md:block"
        style={{ color: 'rgba(255,255,255,0.5)' }}>
        Scroll ↓
      </div>
    </section>
  );
}
