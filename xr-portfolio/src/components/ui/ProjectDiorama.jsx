import { useRef, useState, useMemo, useCallback, useSyncExternalStore, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Html, Line, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* ══════════════════════════════════════════
   프로젝트 디오라마
   — 외부 3D 에셋 없이 절차적 지오메트리로 구성.
     각 프로젝트를 하나의 섬(slab)으로 만들고,
     공간 좌표에 앵커된 글래스 카드로 핵심 설명을 띄운다.
   ══════════════════════════════════════════ */

/* ── 프로젝트별 구성 ── */
const DIORAMAS = [
  {
    id: 'kisti',
    tab: 'kisti',
    label: 'KISTI',
    caption: '임상 XR 훈련 시스템',
    accent: '#1776a6',
    accentLight: '#6fd8ff',
    slab: '#8d9a92',
    /* 슬래브 위 오브젝트 */
    props: [
      { type: 'panel', pos: [-1.15, 0.42, 0.15], size: [0.8, 0.5, 0.05], tint: '#6fd8ff', label: '교수자 PC' },
      { type: 'panel', pos: [0.35, 0.36, -0.55], size: [0.42, 0.3, 0.05], tint: '#7ef1d6', label: '훈련자 HMD' },
      { type: 'panel', pos: [1.25, 0.36, 0.35], size: [0.42, 0.3, 0.05], tint: '#a78bfa', label: '검사 HMD' },
      { type: 'server', pos: [0.1, -0.62, 0.1], size: [0.55, 0.5, 0.4], tint: '#1776a6' },
    ],
    /* 노드 간 연결선 */
    links: [
      [[-1.15, 0.2, 0.15], [0.1, -0.4, 0.1]],
      [[0.35, 0.2, -0.55], [0.1, -0.4, 0.1]],
      [[1.25, 0.2, 0.35], [0.1, -0.4, 0.1]],
    ],
    /* 공간에 떠 있는 설명 카드 */
    cards: [
      { pos: [-1.15, 0.95, 0.15], title: 'HMD는 스스로 로그인하지 않는다', desc: '고령 훈련자가 헤드셋 안에서 계정을 입력하는 건 비현실적. 교수자가 PC에서 기기와 계정을 연결하면 자동 로그인된다.' },
      { pos: [1.25, 0.85, 0.35], title: 'VR은 무대, 측정은 장비가', desc: '검사 4종 중 VR이 직접 재는 건 인지검사뿐. 균형·심혈관·운동성은 검증된 장비가 측정한다.' },
      { pos: [0.15, -0.78, 0.85], title: '진행 권한은 교수자 PC에', desc: '생성·미션·시간·기록을 한곳에 모아, 문제가 생겨도 교수자가 그 자리에서 수습할 수 있게 했다.' },
    ],
  },
  {
    id: 'dream',
    tab: 'dream',
    label: '꿈키올래',
    caption: 'Vision Pro 직업체험 9종',
    accent: '#9e6a16',
    accentLight: '#d8a54b',
    slab: '#a2957c',
    props: [
      { type: 'pedestal', pos: [-1.2, 0.28, 0.1], tint: '#e06c4f', label: 'MARS' },
      { type: 'pedestal', pos: [0.05, 0.28, -0.35], tint: '#8c6dd8', label: '수사대' },
      { type: 'pedestal', pos: [1.25, 0.28, 0.25], tint: '#f472b6', label: '엔터' },
      { type: 'orbit', pos: [0.05, 0.75, -0.35], tint: '#d8a54b' },
    ],
    links: [
      [[-1.2, 0.4, 0.1], [0.05, 0.4, -0.35]],
      [[0.05, 0.4, -0.35], [1.25, 0.4, 0.25]],
    ],
    cards: [
      { pos: [-1.2, 1.0, 0.1], title: '3컨셉 × 3직업 프레임워크', desc: '아홉 종을 각각 설계하는 대신 같은 뼈대를 공유하게 묶어, 두 달에 아홉 종을 냈다.' },
      { pos: [0.05, -0.72, 0.9], title: '추리를 데이터로', desc: '증거를 변수로, 용의자를 속성 집합으로 정의해 범인 특정을 교집합 문제로 바꿨다.' },
      { pos: [1.25, 0.95, 0.25], title: '생성 모델 우회', desc: '악기별 분리 생성이 안 되자 완성곡을 만든 뒤 트랙을 분리해 엔진에서 켜고 끄는 순서로 뒤집었다.' },
    ],
  },
  {
    id: 'kocca',
    tab: 'kocca-detail',
    label: '한콘진',
    caption: 'LLM 생성형 직업체험',
    accent: '#a63666',
    accentLight: '#f9a8d4',
    slab: '#9a8b90',
    props: [
      { type: 'panel', pos: [0, 0.55, -0.75], size: [1.5, 0.85, 0.05], tint: '#f9a8d4', label: 'AI 생성' },
      { type: 'marker', pos: [-1.1, 0.24, 0.35], tint: '#f472b6' },
      { type: 'marker', pos: [-0.4, 0.24, 0.6], tint: '#f472b6' },
      { type: 'marker', pos: [0.55, 0.24, 0.45], tint: '#f472b6' },
      { type: 'marker', pos: [1.2, 0.24, 0.15], tint: '#f472b6' },
    ],
    links: [
      [[0, 0.2, -0.75], [-1.1, 0.24, 0.35]],
      [[0, 0.2, -0.75], [-0.4, 0.24, 0.6]],
      [[0, 0.2, -0.75], [0.55, 0.24, 0.45]],
      [[0, 0.2, -0.75], [1.2, 0.24, 0.15]],
    ],
    cards: [
      { pos: [0, 1.15, -0.75], title: '매번 새로 생성되는 사건', desc: '교사가 한 줄 프롬프트를 넣으면 LLM이 배경·용의자·범인·단서를 생성한다. 같은 시나리오도 매 플레이가 다르다.' },
      { pos: [-1.1, 0.85, 0.35], title: 'LLM은 제안, 코드가 보증', desc: '정답 유일성과 배치 유효성은 코드가 최종 검증. 실패 시 보정 → 재생성 → 폴백으로 플레이가 멈추지 않는다.' },
      { pos: [1.2, 0.8, 0.15], title: '난이도를 값으로', desc: '용의자 수·시간·훼손율로 난이도를 정의한 초기 기획이, 생성 슬롯 파라미터의 전신이 됐다.' },
    ],
  },
];

/* ── 개별 오브젝트 ── */
function Prop({ p }) {
  if (p.type === 'panel') {
    return (
      <group position={p.pos}>
        <RoundedBox args={p.size} radius={0.02} smoothness={3} castShadow>
          <meshStandardMaterial color="#2b3138" roughness={0.35} metalness={0.2} />
        </RoundedBox>
        {/* 화면 발광면 */}
        <mesh position={[0, 0, p.size[2] / 2 + 0.005]}>
          <planeGeometry args={[p.size[0] * 0.88, p.size[1] * 0.82]} />
          <meshBasicMaterial color={p.tint} transparent opacity={0.55} />
        </mesh>
        {/* 지지대 */}
        <mesh position={[0, -p.size[1] / 2 - 0.09, 0]}>
          <cylinderGeometry args={[0.03, 0.045, 0.18, 12]} />
          <meshStandardMaterial color="#3c434a" roughness={0.5} />
        </mesh>
      </group>
    );
  }
  if (p.type === 'server') {
    return (
      <group position={p.pos}>
        <RoundedBox args={p.size} radius={0.04} smoothness={3}>
          <meshStandardMaterial color="#252b31" roughness={0.4} metalness={0.3} />
        </RoundedBox>
        {[0.12, 0, -0.12].map((y) => (
          <mesh key={y} position={[0, y, p.size[2] / 2 + 0.004]}>
            <planeGeometry args={[p.size[0] * 0.7, 0.035]} />
            <meshBasicMaterial color={p.tint} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
    );
  }
  if (p.type === 'pedestal') {
    return (
      <group position={p.pos}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.34, 0.2, 28]} />
          <meshStandardMaterial color="#2f3339" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.115, 0]}>
          <cylinderGeometry args={[0.27, 0.27, 0.02, 28]} />
          <meshBasicMaterial color={p.tint} transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color={p.tint} roughness={0.25} metalness={0.35} />
        </mesh>
      </group>
    );
  }
  if (p.type === 'orbit') {
    return (
      <mesh position={p.pos} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[0.55, 0.012, 12, 64]} />
        <meshBasicMaterial color={p.tint} transparent opacity={0.5} />
      </mesh>
    );
  }
  /* marker — 증거 표식 */
  return (
    <group position={p.pos}>
      <mesh castShadow>
        <coneGeometry args={[0.1, 0.22, 4]} />
        <meshStandardMaterial color={p.tint} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ── 공간 앵커 카드 ── */
function AnchorCard({ card, accent, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group position={card.pos}>
      {/* 앵커 점 */}
      <mesh>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      <Html center distanceFactor={7} zIndexRange={[20, 0]} style={{ pointerEvents: 'auto' }}>
        <button
          onClick={onOpen}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          className="text-left rounded-2xl cursor-pointer"
          style={{
            width: 218,
            padding: '12px 14px',
            transform: `translateY(-58px) scale(${hovered ? 1.03 : 1})`,
            background: hovered
              ? 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 100%)',
            backdropFilter: 'blur(14px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
            border: `1px solid ${accent}44`,
            boxShadow: hovered ? `0 14px 34px rgba(20,28,24,0.28)` : '0 8px 24px rgba(20,28,24,0.18)',
            transition: 'all .2s',
          }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <span style={{ width: 5, height: 5, borderRadius: 99, background: accent, flexShrink: 0 }} />
            <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.16em', color: `${accent}cc` }}>
              0{index + 1}
            </span>
          </div>
          <p style={{ fontSize: 12.5, fontWeight: 800, lineHeight: 1.32, color: 'rgba(20,28,24,0.92)', marginBottom: 5 }}>
            {card.title}
          </p>
          <p style={{ fontSize: 10.5, lineHeight: 1.6, color: 'rgba(20,28,24,0.6)' }}>
            {card.desc}
          </p>
        </button>
      </Html>
    </group>
  );
}

/* ── 하나의 섬 ── */
function Island({ data, reduced, onOpen }) {
  const group = useRef();
  const t = useRef(0);

  /* 전환 시 살짝 솟아오르며 등장 */
  useFrame((_, delta) => {
    if (!group.current) return;
    t.current = Math.min(1, t.current + delta * 2.2);
    const e = 1 - Math.pow(1 - t.current, 3);
    group.current.scale.setScalar(0.9 + 0.1 * e);
    group.current.position.y = -0.3 - 0.25 * (1 - e);
    group.current.rotation.y = (1 - e) * -0.25;
  });

  const linePts = useMemo(
    () => data.links.map((l) => l.map((p) => new THREE.Vector3(...p))),
    [data.links]
  );

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.12} floatIntensity={reduced ? 0 : 0.35}>
        {/* 지반 슬래브 */}
        <RoundedBox args={[3.9, 0.36, 2.5]} radius={0.09} smoothness={4} position={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial color={data.slab} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        {/* 상부 표면 */}
        <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3.86, 2.46]} />
          <meshStandardMaterial color="#e9ece7" roughness={0.95} />
        </mesh>
        {/* 표면 격자 */}
        <gridHelper
          args={[3.86, 14, data.accent, '#c9cfc7']}
          position={[0, 0.19, 0]}
          material-transparent
          material-opacity={0.28}
        />

        {/* 오브젝트 */}
        {data.props.map((p, i) => <Prop key={i} p={p} />)}

        {/* 연결선 */}
        {linePts.map((pts, i) => (
          <Line key={i} points={pts} color={data.accentLight} lineWidth={1.6} transparent opacity={0.55} dashed dashSize={0.08} gapSize={0.06} />
        ))}

        {/* 설명 카드 */}
        {data.cards.map((c, i) => (
          <AnchorCard key={i} card={c} accent={data.accent} index={i} onOpen={onOpen} />
        ))}
      </Float>

      <ContactShadows position={[0, -0.55, 0]} opacity={0.35} scale={7} blur={2.6} far={3} color="#1d2a22" />
    </group>
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
export default function ProjectDiorama({ onNavigate }) {
  const [active, setActive] = useState(0);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const isMobile = useMedia('(max-width: 767px)');
  const data = DIORAMAS[active];

  return (
    <div className="w-full">
      {/* 프로젝트 전환 */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {DIORAMAS.map((d, i) => {
          const on = i === active;
          return (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              className="px-4 py-2 rounded-full text-[13px] font-bold cursor-pointer transition-all"
              style={{
                background: on ? d.accent : 'rgba(255,255,255,0.6)',
                color: on ? '#fff' : 'rgba(24,32,27,0.6)',
                border: `1px solid ${on ? d.accent : 'rgba(24,32,27,0.1)'}`,
              }}
            >
              {d.label}
            </button>
          );
        })}
        <span className="ml-auto text-[11px] hidden md:block" style={{ color: 'rgba(24,32,27,0.4)' }}>
          드래그해서 각도를 바꿔보세요 · 카드를 누르면 프로젝트로 이동합니다
        </span>
      </div>

      {/* 3D 무대 */}
      <div
        className="w-full rounded-3xl overflow-hidden"
        style={{
          height: isMobile ? 380 : 520,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.24) 100%)',
          border: '1px solid rgba(24,32,27,0.08)',
          boxShadow: '0 10px 34px rgba(24,32,27,0.07)',
          touchAction: 'pan-y',
        }}
      >
        <Canvas
          key={data.id}
          camera={{ position: [0, 2.1, 5.2], fov: 38 }}
          dpr={[1, 1.6]}
          shadows
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <hemisphereLight args={['#ffffff', '#c8d2c6', 1.1]} />
            <directionalLight position={[3, 6, 4]} intensity={1.15} castShadow
              shadow-mapSize={[1024, 1024]} />
            <directionalLight position={[-4, 2, -3]} intensity={0.35} color={data.accentLight} />
            <Island data={data} reduced={reduced} onOpen={() => onNavigate?.(data.tab)} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={!isMobile}
              autoRotate={!reduced && !isMobile}
              autoRotateSpeed={0.35}
              minPolarAngle={Math.PI / 5}
              maxPolarAngle={Math.PI / 2.15}
              rotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 캡션 */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-[13px] font-semibold" style={{ color: data.accent }}>
          {data.label} — {data.caption}
        </p>
        <button
          onClick={() => onNavigate?.(data.tab)}
          className="text-[12px] font-bold cursor-pointer transition-opacity"
          style={{ color: data.accent }}
        >
          자세히 보기 →
        </button>
      </div>
    </div>
  );
}
