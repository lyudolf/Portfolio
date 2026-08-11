import { useRef, useState, useMemo, useCallback, useSyncExternalStore, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Html, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* ══════════════════════════════════════════
   프로젝트 디오라마 — 하나의 섬, 세 구역
   기본: 전체 조망 + 각 구역에 라벨 말풍선
   클릭: 해당 구역으로 확대 + 상세 패널 전개

   ⚠️ GLB 교체 지점: <Terrain /> 컴포넌트만 갈아끼우면 된다.
      앵커 좌표(anchor)와 카메라 위치(camPos)는 모델 스케일에 맞춰 재조정.
   ══════════════════════════════════════════ */

const OVERVIEW = { camPos: [0.2, 3.1, 6.4], target: [0, 0, 0] };

const ZONES = [
  {
    id: 'kisti',
    tab: 'kisti',
    label: 'KISTI',
    tagline: '임상 데이터가 실제로 쌓이는 훈련 시스템',
    anchor: [-1.75, 0.55, 0.35],
    camPos: [-2.5, 1.7, 2.6],
    period: '2024 — 현재 · 단독 기획 · PM',
    desc: '고령자 인지·운동 훈련 VR. 교수자 PC와 VR 앱 두 종이 서버를 사이에 두고 움직이는 구조를 기획 단계에서 정의하고, 임상 데이터가 수집되는 운영 체계까지 설계했습니다.',
    stats: [
      { num: '60명', label: '1차 임상 무이슈' },
      { num: '3년차', label: '용역 연장' },
      { num: '1~2', label: '운영 depth' },
    ],
    accent: '#1776a6',
    accentLight: '#6fd8ff',
  },
  {
    id: 'dream',
    tab: 'dream',
    label: '꿈키올래',
    tagline: '두 달에 아홉 종, 버리는 속도로 만든 결과',
    anchor: [0.15, 0.75, -0.3],
    camPos: [0.3, 1.9, 2.3],
    period: '2025.09 — 12 · PM · 기획 · QA',
    desc: 'Apple Vision Pro 직업체험 9종. 세 세계관 아래 세 직업이 같은 흐름을 공유하는 프레임워크로 재설계해, 불가능한 일정을 구조로 해결했습니다.',
    stats: [
      { num: '9종', label: '체험 콘텐츠' },
      { num: '2개월', label: '실개발' },
      { num: '후속 제안', label: '재요청' },
    ],
    accent: '#9e6a16',
    accentLight: '#d8a54b',
  },
  {
    id: 'kocca',
    tab: 'kocca-detail',
    label: '한콘진',
    tagline: '내 기획 구조가 생성 엔진의 뼈대가 됐다',
    anchor: [1.8, 0.55, 0.3],
    camPos: [2.6, 1.7, 2.5],
    period: '2026.04 — 진행 중 · 초기 기획',
    desc: '한국콘텐츠진흥원 국가과제. 매 플레이마다 LLM이 사건·증거·NPC 대사를 새로 생성합니다. 꿈키올래의 세계관과 난이도 파라미터 설계가 출발점이 됐습니다.',
    stats: [
      { num: 'LLM', label: '실시간 생성' },
      { num: '34개', label: '테이블 모델' },
      { num: '7.5개월', label: '과제 기간' },
    ],
    accent: '#a63666',
    accentLight: '#f9a8d4',
  },
];

/* ══════════════════════════════════════════
   지형 — GLB 도착 시 이 컴포넌트만 교체
   ══════════════════════════════════════════ */
function Terrain() {
  return (
    <group>
      {/* 섬 본체 */}
      <RoundedBox args={[5.4, 0.42, 3.2]} radius={0.12} smoothness={4} receiveShadow>
        <meshStandardMaterial color="#8f9a8c" roughness={0.9} metalness={0.04} />
      </RoundedBox>
      <mesh position={[0, 0.216, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.34, 3.14]} />
        <meshStandardMaterial color="#dfe5d8" roughness={0.95} />
      </mesh>

      {/* ── 구역 1: 공상과학 (좌) ── */}
      <group position={[-1.75, 0.22, 0.35]}>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.95, 32]} />
          <meshStandardMaterial color="#cfe4e6" roughness={0.7} />
        </mesh>
        <RoundedBox args={[0.62, 0.36, 0.05]} radius={0.02} position={[0, 0.34, -0.15]} castShadow>
          <meshStandardMaterial color="#2b3138" roughness={0.35} metalness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0.34, -0.12]}>
          <planeGeometry args={[0.54, 0.29]} />
          <meshBasicMaterial color="#6fd8ff" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0.1, 0.2]}>
          <cylinderGeometry args={[0.22, 0.24, 0.06, 24]} />
          <meshStandardMaterial color="#3c434a" roughness={0.5} />
        </mesh>
        {[-0.6, 0.6].map((x) => (
          <mesh key={x} position={[x, 0.26, 0.35]}>
            <coneGeometry args={[0.13, 0.5, 7]} />
            <meshStandardMaterial color="#8fc7ae" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* ── 구역 2: 화성 (중앙) ── */}
      <group position={[0.15, 0.22, -0.3]}>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.8, 32]} />
          <meshStandardMaterial color="#c0714a" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.14, 0]} castShadow>
          <sphereGeometry args={[0.42, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#a85536" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.07, 0.42, 12]} />
          <meshStandardMaterial color="#e8e4dd" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.74, 0]}>
          <coneGeometry args={[0.05, 0.14, 12]} />
          <meshStandardMaterial color="#d8a54b" roughness={0.35} metalness={0.3} />
        </mesh>
      </group>

      {/* ── 구역 3: 수사 현장 (우) ── */}
      <group position={[1.8, 0.22, 0.3]}>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.9, 32]} />
          <meshStandardMaterial color="#8d8189" roughness={0.9} />
        </mesh>
        <mesh position={[-0.15, 0.16, -0.1]} rotation={[0, 0.3, 0.55]} castShadow>
          <boxGeometry args={[0.2, 0.55, 0.2]} />
          <meshStandardMaterial color="#cfc7c0" roughness={0.8} />
        </mesh>
        {[[-0.5, 0.25], [0.3, 0.4], [0.55, -0.25]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.11, z]} castShadow>
            <coneGeometry args={[0.07, 0.18, 4]} />
            <meshStandardMaterial color="#f472b6" roughness={0.5} />
          </mesh>
        ))}
        {[-0.75, 0.75].map((x) => (
          <mesh key={x} position={[x, 0.28, 0.45]}>
            <sphereGeometry args={[0.19, 12, 10]} />
            <meshStandardMaterial color="#a8574e" roughness={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ══════════════════════════════════════════
   카메라 리그 — 확대/복귀 보간
   ══════════════════════════════════════════ */
function CameraRig({ focus, controlsRef }) {
  const destPos = useRef(new THREE.Vector3());
  const destTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const p = focus ? focus.camPos : OVERVIEW.camPos;
    const t = focus ? focus.anchor : OVERVIEW.target;
    destPos.current.set(p[0], p[1], p[2]);
    destTarget.current.set(t[0], t[1], t[2]);

    const k = 1 - Math.pow(0.0015, delta); // 프레임레이트 독립 보간
    state.camera.position.lerp(destPos.current, k);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(destTarget.current, k);
      controlsRef.current.update();
    }
  });
  return null;
}

/* ══════════════════════════════════════════
   구역 라벨 / 상세 패널
   ══════════════════════════════════════════ */
function ZoneMarker({ zone, focused, dimmed, onSelect, onClose, onNavigate }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={zone.anchor}>
      {/* 앵커 점 */}
      <mesh>
        <sphereGeometry args={[0.032, 12, 12]} />
        <meshBasicMaterial color={zone.accent} transparent opacity={dimmed ? 0.25 : 1} />
      </mesh>

      <Html center distanceFactor={6.5} zIndexRange={[30, 0]} style={{ pointerEvents: dimmed ? 'none' : 'auto' }}>
        {focused ? (
          /* ── 확대 시: 상세 패널 ── */
          <div
            className="rounded-2xl text-left"
            style={{
              width: 300,
              padding: '16px 18px',
              transform: 'translateY(-96px)',
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${zone.accent}33`,
              boxShadow: '0 18px 44px rgba(20,28,24,0.3)',
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p style={{ fontSize: 16, fontWeight: 800, color: 'rgba(20,28,24,0.92)', letterSpacing: '-0.01em' }}>
                {zone.label}
              </p>
              <button
                onClick={onClose}
                aria-label="닫기"
                className="cursor-pointer"
                style={{
                  width: 22, height: 22, borderRadius: 99, flexShrink: 0,
                  background: 'rgba(20,28,24,0.06)', color: 'rgba(20,28,24,0.5)',
                  fontSize: 13, lineHeight: '20px', textAlign: 'center',
                }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: 10, fontWeight: 600, color: `${zone.accent}cc`, marginBottom: 9 }}>
              {zone.period}
            </p>
            <p style={{ fontSize: 11.5, lineHeight: 1.75, color: 'rgba(20,28,24,0.62)', marginBottom: 12 }}>
              {zone.desc}
            </p>
            <div className="flex gap-3 mb-3" style={{ paddingTop: 10, borderTop: '1px solid rgba(20,28,24,0.08)' }}>
              {zone.stats.map((s) => (
                <div key={s.label} style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: zone.accent, lineHeight: 1, marginBottom: 3 }}>
                    {s.num}
                  </p>
                  <p style={{ fontSize: 9, color: 'rgba(20,28,24,0.45)', lineHeight: 1.3 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate?.(zone.tab)}
              className="w-full cursor-pointer"
              style={{
                padding: '9px 0', borderRadius: 99, background: zone.accent,
                color: '#fff', fontSize: 12, fontWeight: 800,
              }}
            >
              자세히 보기 →
            </button>
          </div>
        ) : (
          /* ── 기본: 라벨 말풍선 ── */
          <button
            onClick={onSelect}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            className="text-left rounded-full cursor-pointer whitespace-nowrap"
            style={{
              padding: '7px 14px',
              transform: `translateY(-42px) scale(${hovered ? 1.05 : 1})`,
              background: hovered ? 'rgba(255,255,255,0.99)' : 'rgba(255,255,255,0.93)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: `1px solid ${zone.accent}40`,
              boxShadow: hovered ? '0 12px 28px rgba(20,28,24,0.28)' : '0 6px 18px rgba(20,28,24,0.18)',
              opacity: dimmed ? 0.2 : 1,
              transition: 'all .2s',
            }}
          >
            <span className="flex items-center gap-1.5">
              <span style={{ width: 6, height: 6, borderRadius: 99, background: zone.accent }} />
              <span style={{ fontSize: 12.5, fontWeight: 800, color: 'rgba(20,28,24,0.9)' }}>{zone.label}</span>
            </span>
            <span style={{ display: 'block', fontSize: 10, color: 'rgba(20,28,24,0.55)', marginTop: 2 }}>
              {zone.tagline}
            </span>
          </button>
        )}
      </Html>
    </group>
  );
}

/* ══════════════════════════════════════════
   씬
   ══════════════════════════════════════════ */
function Scene({ focusId, setFocusId, onNavigate, reduced, controlsRef }) {
  const focus = useMemo(() => ZONES.find((z) => z.id === focusId) ?? null, [focusId]);

  return (
    <>
      <hemisphereLight args={['#ffffff', '#c4cfc2', 1.05]} />
      <directionalLight position={[3.5, 6, 4]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2.5, -3]} intensity={0.3} color="#bfe4ff" />

      <Float speed={reduced || focusId ? 0 : 0.9} rotationIntensity={0} floatIntensity={reduced || focusId ? 0 : 0.28}>
        <group position={[0, -0.25, 0]}>
          <Terrain />
          {ZONES.map((z) => (
            <ZoneMarker
              key={z.id}
              zone={z}
              focused={focusId === z.id}
              dimmed={!!focusId && focusId !== z.id}
              onSelect={() => setFocusId(z.id)}
              onClose={() => setFocusId(null)}
              onNavigate={onNavigate}
            />
          ))}
        </group>
      </Float>

      <ContactShadows position={[0, -0.62, 0]} opacity={0.34} scale={9} blur={2.8} far={3.5} color="#1d2a22" />
      <CameraRig focus={focus} controlsRef={controlsRef} />
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
export default function ProjectDiorama({ onNavigate }) {
  const [focusId, setFocusId] = useState(null);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const isMobile = useMedia('(max-width: 767px)');
  const controlsRef = useRef(null);

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-3 gap-4">
        <p className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(24,32,27,0.45)' }}>
          Explore
        </p>
        <p className="text-[11px] text-right" style={{ color: 'rgba(24,32,27,0.4)' }}>
          {focusId ? '닫기를 누르면 전체 보기로 돌아갑니다' : '라벨을 누르면 해당 프로젝트로 확대됩니다'}
        </p>
      </div>

      <div
        className="relative w-full rounded-3xl overflow-hidden"
        style={{
          height: isMobile ? 420 : 660,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 100%)',
          border: '1px solid rgba(24,32,27,0.08)',
          boxShadow: '0 12px 38px rgba(24,32,27,0.08)',
          touchAction: 'pan-y',
        }}
      >
        <Canvas camera={{ position: OVERVIEW.camPos, fov: 38 }} dpr={[1, 1.6]} shadows gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene
              focusId={focusId}
              setFocusId={setFocusId}
              onNavigate={onNavigate}
              reduced={reduced}
              controlsRef={controlsRef}
            />
            <OrbitControls
              ref={controlsRef}
              enableZoom={false}
              enablePan={false}
              enableRotate={!isMobile && !focusId}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.3}
              rotateSpeed={0.45}
            />
          </Suspense>
        </Canvas>

        {/* 전체 보기 복귀 — 레퍼런스의 Close view 버튼 위치 */}
        {focusId && (
          <button
            onClick={() => setFocusId(null)}
            className="absolute left-1/2 -translate-x-1/2 bottom-5 flex items-center gap-2 px-4 py-2.5 rounded-full text-[12.5px] font-bold cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.94)',
              border: '1px solid rgba(24,32,27,0.1)',
              color: 'rgba(24,32,27,0.75)',
              boxShadow: '0 8px 24px rgba(24,32,27,0.18)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1 }}>×</span>
            전체 보기
          </button>
        )}
      </div>
    </div>
  );
}
