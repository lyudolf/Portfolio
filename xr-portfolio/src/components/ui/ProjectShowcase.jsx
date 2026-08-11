import { useRef, useState, useCallback, useSyncExternalStore, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

/* ══════════════════════════════════════════
   프로젝트 쇼케이스
   — 대형 타이포 위에 대표 오브젝트 하나를 띄우고,
     오브젝트에 붙은 핫스팟으로 핵심 설계 결정을 설명한다.

   ⚠️ GLB 교체 지점: <PlaceholderModel /> 을 useGLTF 로딩으로 바꾸면 된다.
      PROJECTS[].model 에 경로를 넣고 hotspots[].pos 만 모델 스케일에 맞춰 재조정.
   ══════════════════════════════════════════ */

const PROJECTS = [
  {
    id: 'kisti',
    tab: 'kisti',
    label: 'KISTI',
    display: ['KIS', 'TI'],
    eyebrow: 'Clinical XR · 2024 — 현재 · 단독 기획 · PM',
    summary:
      '고령자 인지·운동 훈련 VR. 교수자 PC와 VR 앱 두 종이 서버를 사이에 두고 움직이는 구조를 기획 단계에서 정의하고, 임상 데이터가 실제로 수집되는 운영 체계까지 설계했습니다.',
    stats: [
      { num: '60명', label: '1차 임상 무이슈' },
      { num: '3년차', label: '용역 연장' },
      { num: '1~2', label: '운영 depth' },
    ],
    bg: '#0e3145',
    bgSoft: '#154a66',
    accent: '#6fd8ff',
    model: null,
    hotspots: [
      { pos: [0.62, 0.34, 0.42], title: 'HMD는 스스로 로그인하지 않는다', desc: '헤드셋 안에서 계정을 입력하는 건 고령 훈련자에게 비현실적. 교수자가 PC에서 기기와 계정을 연결하면 자동 로그인된다.' },
      { pos: [-0.58, 0.16, 0.5], title: '진행 권한은 교수자 PC에', desc: '생성·미션·시간·기록을 한곳에 모아, 문제가 생겨도 교수자가 그 자리에서 수습할 수 있게 했다.' },
      { pos: [0.05, -0.52, 0.62], title: 'VR은 무대, 측정은 장비가', desc: '검사 4종 중 VR이 직접 재는 건 인지검사뿐. 균형·심혈관·운동성은 검증된 장비가 측정한다.' },
    ],
  },
  {
    id: 'dream',
    tab: 'dream',
    label: '꿈키올래',
    display: ['꿈키', '올래'],
    eyebrow: 'Career XR · 2025.09 — 12 · PM · 기획 · QA',
    summary:
      'Apple Vision Pro 직업체험 9종. 세 세계관 아래 세 직업이 같은 흐름을 공유하는 프레임워크로 재설계해, 두 달이라는 불가능한 일정을 구조로 해결했습니다.',
    stats: [
      { num: '9종', label: '체험 콘텐츠' },
      { num: '2개월', label: '실개발' },
      { num: '후속 제안', label: '클라이언트 재요청' },
    ],
    bg: '#3a2a10',
    bgSoft: '#5a4218',
    accent: '#e8bd6d',
    model: null,
    hotspots: [
      { pos: [0.42, 0.72, 0.36], title: '3컨셉 × 3직업 프레임워크', desc: '아홉 종을 각각 설계하는 대신 같은 뼈대를 공유하게 묶어, 기획·개발·검수가 반복 가능해졌다.' },
      { pos: [-0.46, 0.05, 0.44], title: '추리를 데이터로', desc: '증거를 변수로, 용의자를 속성 집합으로 정의해 범인 특정을 교집합 문제로 바꿨다.' },
      { pos: [0.34, -0.6, 0.42], title: '생성 모델 우회', desc: '악기별 분리 생성이 안 되자 완성곡을 만든 뒤 트랙을 분리해, 엔진에서 켜고 끄는 순서로 뒤집었다.' },
    ],
  },
  {
    id: 'kocca',
    tab: 'kocca-detail',
    label: '한콘진',
    display: ['KOC', 'CA'],
    eyebrow: 'AI × Career · 2026.04 — 진행 중 · 초기 기획',
    summary:
      '한국콘텐츠진흥원 국가과제. 매 플레이마다 LLM이 사건·증거·NPC 대사를 새로 생성합니다. 꿈키올래의 세계관과 난이도 파라미터 설계가 이 과제의 출발점이 됐습니다.',
    stats: [
      { num: 'LLM', label: '실시간 시나리오 생성' },
      { num: '34개', label: '테이블 데이터 모델' },
      { num: '7.5개월', label: '국가과제' },
    ],
    bg: '#3b1428',
    bgSoft: '#5c1f3d',
    accent: '#f9a8d4',
    model: null,
    hotspots: [
      { pos: [0.5, 0.46, 0.44], title: '매번 새로 생성되는 사건', desc: '교사가 한 줄 프롬프트를 넣으면 배경·용의자·범인·단서가 생성된다. 같은 시나리오도 매 플레이가 다르다.' },
      { pos: [-0.52, 0.2, 0.4], title: 'LLM은 제안, 코드가 보증', desc: '정답 유일성과 배치 유효성은 코드가 최종 검증. 실패 시 보정 → 재생성 → 폴백으로 플레이가 멈추지 않는다.' },
      { pos: [0.1, -0.55, 0.55], title: '난이도를 값으로', desc: '용의자 수·시간·훼손율로 난이도를 정의한 초기 기획이, 생성 슬롯 파라미터의 전신이 됐다.' },
    ],
  },
];

/* ══════════════════════════════════════════
   임시 오브젝트 — GLB 도착 시 교체
   ══════════════════════════════════════════ */
function PlaceholderModel({ id, accent }) {
  if (id === 'kisti') {
    /* VR 헤드셋 + 받침 */
    return (
      <group>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[1.25, 0.62, 0.62]} />
          <meshStandardMaterial color="#f2f5f3" roughness={0.42} metalness={0.08} />
        </mesh>
        <mesh position={[0, 0.25, 0.32]}>
          <boxGeometry args={[1.12, 0.44, 0.03]} />
          <meshStandardMaterial color={accent} roughness={0.2} metalness={0.5} emissive={accent} emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0, 0.34, -0.34]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.07, 12, 28, Math.PI]} />
          <meshStandardMaterial color="#cfd6d2" roughness={0.75} />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.72, 0.78, 0.1, 40]} />
          <meshStandardMaterial color="#e6ebe8" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.36, 0]}>
          <torusGeometry args={[0.7, 0.014, 10, 48]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
        </mesh>
      </group>
    );
  }
  if (id === 'dream') {
    /* 로켓 */
    return (
      <group>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.34, 1.1, 28]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.42} />
        </mesh>
        <mesh position={[0, 0.92, 0]} castShadow>
          <coneGeometry args={[0.3, 0.62, 28]} />
          <meshStandardMaterial color={accent} roughness={0.3} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.42, 0.31]}>
          <circleGeometry args={[0.11, 20]} />
          <meshStandardMaterial color="#2b4a5c" roughness={0.2} metalness={0.4} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos((i / 3) * Math.PI * 2) * 0.34, -0.42, Math.sin((i / 3) * Math.PI * 2) * 0.34]}
            rotation={[0, -(i / 3) * Math.PI * 2, 0.24]} castShadow>
            <boxGeometry args={[0.06, 0.5, 0.3]} />
            <meshStandardMaterial color={accent} roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.28, 0.22, 24]} />
          <meshStandardMaterial color="#8f9aa2" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
    );
  }
  /* 돋보기 + 증거 표식 */
  return (
    <group rotation={[0, 0, -0.5]}>
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.52, 0.08, 16, 48]} />
        <meshStandardMaterial color="#c9ccd4" roughness={0.32} metalness={0.62} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <circleGeometry args={[0.5, 40]} />
        <meshStandardMaterial color={accent} transparent opacity={0.24} roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.42, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.85, 20]} />
        <meshStandardMaterial color="#6b4c3a" roughness={0.68} />
      </mesh>
      {[[-0.85, -0.5], [0.9, -0.62]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.2]} rotation={[0, 0, 0.5]} castShadow>
          <coneGeometry args={[0.14, 0.34, 4]} />
          <meshStandardMaterial color={accent} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

/* 오브젝트에 붙는 핫스팟 */
function Hotspot({ data, accent, open, onToggle }) {
  return (
    <group position={data.pos}>
      <mesh onClick={(e) => { e.stopPropagation(); onToggle(); }}>
        <sphereGeometry args={[0.055, 14, 14]} />
        <meshBasicMaterial color={open ? accent : '#ffffff'} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.08, 0.098, 28]} />
        <meshBasicMaterial color={accent} transparent opacity={0.7} side={2} />
      </mesh>
      <Html center distanceFactor={5.5} zIndexRange={[40, 0]} style={{ pointerEvents: 'auto' }}>
        {open ? (
          <div
            className="rounded-2xl text-left"
            style={{
              width: 236, padding: '13px 15px', transform: 'translate(0, -74px)',
              background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(14px)',
              border: `1px solid ${accent}55`, boxShadow: '0 16px 38px rgba(0,0,0,0.34)',
            }}
          >
            <p style={{ fontSize: 12.5, fontWeight: 800, lineHeight: 1.35, color: 'rgba(18,24,28,0.92)', marginBottom: 6 }}>
              {data.title}
            </p>
            <p style={{ fontSize: 10.5, lineHeight: 1.65, color: 'rgba(18,24,28,0.6)' }}>{data.desc}</p>
          </div>
        ) : (
          <button
            onClick={onToggle}
            className="cursor-pointer whitespace-nowrap rounded-full"
            style={{
              padding: '4px 10px', transform: 'translate(0, -34px)',
              background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(8px)', color: '#fff', fontSize: 10, fontWeight: 700,
            }}
          >
            {data.title.length > 12 ? `${data.title.slice(0, 12)}…` : data.title}
          </button>
        )}
      </Html>
    </group>
  );
}

function Stage({ project, reduced, openIdx, setOpenIdx }) {
  const spin = useRef();
  useFrame((_, delta) => {
    if (spin.current && !reduced && openIdx === null) spin.current.rotation.y += delta * 0.25;
  });
  return (
    <>
      <hemisphereLight args={['#ffffff', '#20303a', 1.0]} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 1.5, -3]} intensity={0.5} color={project.accent} />
      <Float speed={reduced ? 0 : 1.2} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.4}>
        <group ref={spin}>
          <PlaceholderModel id={project.id} accent={project.accent} />
          {project.hotspots.map((h, i) => (
            <Hotspot
              key={i} data={h} accent={project.accent}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </group>
      </Float>
      <ContactShadows position={[0, -1.05, 0]} opacity={0.5} scale={5} blur={2.4} far={2.6} color="#000000" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false}
        minPolarAngle={Math.PI / 3.4} maxPolarAngle={Math.PI / 1.9} rotateSpeed={0.5} />
    </>
  );
}

function useMedia(query) {
  const subscribe = useCallback((cb) => {
    const m = window.matchMedia(query);
    m.addEventListener('change', cb);
    return () => m.removeEventListener('change', cb);
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/* ══════════════════════════════════════════
   MAIN
   ══════════════════════════════════════════ */
export default function ProjectShowcase({ onNavigate }) {
  const [idx, setIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState(null);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const isMobile = useMedia('(max-width: 767px)');
  const p = PROJECTS[idx];

  const go = (next) => {
    setOpenIdx(null);
    setIdx((next + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        borderRadius: 32,
        background: `linear-gradient(150deg, ${p.bgSoft} 0%, ${p.bg} 62%)`,
        minHeight: isMobile ? 660 : 640,
        transition: 'background 0.6s ease',
        boxShadow: '0 18px 50px rgba(20,28,24,0.16)',
      }}
    >
      {/* 상단 — 프로젝트 스위처 */}
      <div className="relative z-30 flex items-center justify-between gap-3 px-6 md:px-9 pt-6">
        <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Selected Work
        </p>
        <div className="flex items-center gap-1.5 p-1 rounded-full"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)' }}>
          {PROJECTS.map((it, i) => (
            <button key={it.id} onClick={() => { setIdx(i); setOpenIdx(null); }}
              className="px-3.5 py-1.5 rounded-full text-[11.5px] font-bold cursor-pointer transition-all"
              style={{
                background: i === idx ? '#fff' : 'transparent',
                color: i === idx ? p.bg : 'rgba(255,255,255,0.7)',
              }}>
              {it.label}
            </button>
          ))}
        </div>
      </div>

      {/* 배경 대형 타이포 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
          style={{ top: isMobile ? -60 : 0 }}
        >
          <span style={{
            fontSize: 'clamp(64px, 13vw, 178px)', fontWeight: 900, letterSpacing: '-0.05em',
            color: 'rgba(255,255,255,0.9)', lineHeight: 1, marginRight: isMobile ? '32vw' : '26vw',
          }}>
            {p.display[0]}
          </span>
          <span style={{
            fontSize: 'clamp(64px, 13vw, 178px)', fontWeight: 900, letterSpacing: '-0.05em',
            color: 'rgba(255,255,255,0.9)', lineHeight: 1, marginLeft: isMobile ? '32vw' : '26vw',
          }}>
            {p.display[1]}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* 3D 오브젝트 */}
      <div className="absolute inset-0 z-10" style={{ touchAction: 'pan-y', top: isMobile ? -40 : 0 }}>
        <Canvas key={p.id} camera={{ position: [0, 0.4, 4.2], fov: 42 }} dpr={[1, 1.7]} shadows
          gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Stage project={p} reduced={reduced} openIdx={openIdx} setOpenIdx={setOpenIdx} />
          </Suspense>
        </Canvas>
      </div>

      {/* 하단 좌 — 요약 · 지표 · CTA */}
      <div className="absolute left-0 bottom-0 z-20 px-6 md:px-9 pb-6 md:pb-8 w-full md:w-auto"
        style={{ maxWidth: isMobile ? '100%' : 400 }}>
        <AnimatePresence mode="wait">
          <motion.div key={p.id}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}>
            <p className="text-[10.5px] font-semibold mb-2.5" style={{ color: p.accent }}>
              {p.eyebrow}
            </p>
            <p className="text-[13px] leading-[1.85] mb-4" style={{ color: 'rgba(255,255,255,0.78)' }}>
              {p.summary}
            </p>
            <div className="flex gap-5 mb-5">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[17px] font-extrabold leading-none mb-1" style={{ color: '#fff' }}>{s.num}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate?.(p.tab)}
              className="px-6 py-3 rounded-full text-[13px] font-bold cursor-pointer transition-transform"
              style={{ background: '#fff', color: p.bg }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
              자세히 보기 →
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 우 — 페이지네이션 · 화살표 */}
      <div className="absolute right-6 md:right-9 bottom-6 md:bottom-8 z-20 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {PROJECTS.map((it, i) => (
            <span key={it.id} style={{
              width: i === idx ? 18 : 6, height: 6, borderRadius: 99,
              background: i === idx ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'all .3s',
            }} />
          ))}
        </div>
        {[['←', idx - 1], ['→', idx + 1]].map(([sym, next]) => (
          <button key={sym} onClick={() => go(next)}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-[14px] transition-all"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.24)', color: '#fff' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.26)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}>
            {sym}
          </button>
        ))}
      </div>

      {/* 안내 */}
      <p className="absolute left-1/2 -translate-x-1/2 z-20 text-[10px] pointer-events-none hidden md:block"
        style={{ bottom: 14, color: 'rgba(255,255,255,0.4)' }}>
        오브젝트를 드래그해 돌려보세요 · 점을 누르면 설계 결정이 열립니다
      </p>
    </div>
  );
}
