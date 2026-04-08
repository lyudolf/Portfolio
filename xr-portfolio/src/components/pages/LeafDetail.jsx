import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

const META_BADGES = [
  { label: '2026.01 (7일 소요)' },
  { label: 'React Three Fiber' },
  { label: 'ONNX Runtime' },
  { label: 'Vercel' },
];

const TROUBLESHOOTING_ITEMS = [
  {
    id: 'rendering',
    category: '렌더링 / 물리 최적화',
    title: '웹 브라우저의 한계를 돌파한\n렌더링 파이프라인 최적화',
    problem:
      '8,000개의 낙엽 객체가 매 프레임 물리 연산을 수행할 경우, 웹 브라우저의 메인 스레드가 과부하 상태에 빠져 심각한 프레임 드랍이 발생했습니다.',
    bullets: [
      {
        term: 'InstancedMesh 렌더링',
        desc: '8,000개의 개별 오브젝트를 하나의 메시로 통합하여 드로우콜(Draw Call)을 8,000회 → 1회로 최적화.',
      },
      {
        term: '수면(Sleep) 시스템',
        desc: '정지한 낙엽의 물리 계산을 스킵하고 외부 힘이 가해질 때만 활성화. 평균 70%의 객체를 수면 상태로 유지하여 CPU 부하를 극적으로 절감.',
      },
    ],
    mediaTag: 'InstancedMesh + Sleep System Demo',
    flip: false,
  },
  {
    id: 'ai',
    category: 'AI 아키텍처',
    title: '딥러닝(ONNX)과 상태 머신(FSM)을\n결합한 지능형 에이전트 설계',
    problem:
      '단순한 타이머 기반 장애물만으로는 후반부 스테이지의 몰입도를 유지하기 어려웠습니다. 플레이어가 패턴을 빠르게 파악해 긴장감이 소실되는 문제가 있었습니다.',
    bullets: [
      {
        term: 'ONNX 기반 적대적 AI',
        desc: '플레이어의 시선 방향과 낙엽 밀도 맵을 분석하는 324차원 입력 딥러닝 모델을 브라우저에 직접 탑재. 이동 경로를 예측해 선제 타겟팅.',
      },
      {
        term: 'FSM 기반 NPC 도우미',
        desc: 'IDLE ↔ MOVING ↔ CARRYING 상태를 갖는 유한 상태 머신으로 AI 도우미를 설계. 수집·운반 자동화 분업 시스템 구현.',
      },
    ],
    mediaTag: 'ONNX Sniper Mole Targeting Demo',
    flip: true,
  },
  {
    id: 'physics-env',
    category: '환경 변수 제어',
    title: '벡터 필드(Vector Field) 기반의\n동적 물리 환경 구축',
    problem:
      '고정형 장애물로는 동적인 3D 환경의 난이도 조절 및 변수 창출에 한계가 있었습니다. 오브젝트의 이동 방향을 실시간으로 제어하는 물리 시스템이 필요했습니다.',
    bullets: [
      {
        term: '비선형 물리 로직 설계',
        desc: '중심점을 향하는 구심력과 상승 벡터를 수학적으로 계산하여, 수백 개의 객체가 자연스럽게 휩쓸리는 토네이도 기믹 구현.',
      },
      {
        term: '전역/국지 풍향 제어',
        desc: '특정 구역 진입 시 물리 엔진에 방향 벡터를 더해 플레이어와 오브젝트의 이동을 통제하는 Wind Zone 시스템 설계.',
      },
    ],
    mediaTag: 'Tornado Vector Field & Wind Zone Demo',
    flip: false,
  },
  {
    id: 'modularity',
    category: '시스템 모듈화',
    title: '확장성을 고려한\n모듈형 도구(Tool) 아키텍처 설계',
    problem:
      '장비 성장에 따라 물리 연산 방식이 달라지며, 하드코딩 시 신규 도구 추가·변경 때마다 전체 로직 수정이 필요한 유지보수 문제가 있었습니다.',
    bullets: [
      {
        term: '컴포넌트 패턴 적용',
        desc: '충돌 범위(Raycast/Box)와 물리적 힘(밀기/당기기)을 모듈화하여, 신규 장비 추가 시 기존 코드 수정 없이 데이터 주입만으로 동작하도록 설계.',
      },
      {
        term: '물리 연산 분리',
        desc: '장비 특성(Kinematic, 전역 인력 등)에 맞춘 독립적인 연산 파이프라인을 매핑하여 퍼포먼스 드랍 방지.',
      },
    ],
    mediaTag: 'Modular Tool Architecture Diagram',
    flip: true,
  },
  {
    id: 'core-loop',
    category: '프로덕트 설계',
    title: '리텐션을 극대화하는\n데이터 기반 경제 시스템 (Core Loop)',
    problem:
      '대량의 낙엽을 치우는 단순 반복 작업만으로는 장기 플레이 동기를 유지하기 어렵습니다. 유저 이탈을 방지하는 보상 구조 설계가 필요했습니다.',
    bullets: [
      {
        term: '단계적 코어 루프',
        desc: '\'수집 → 봉투 생성(100단위) → 판매 → 업그레이드\'로 이어지는 명확한 경제 보상 파이프라인 구축.',
      },
      {
        term: '난이도 곡선 제어',
        desc: '5개 스테이지에 걸쳐 도구와 환경 변수를 점진적으로 해금하여 사용자 학습 곡선(Learning Curve) 최적화.',
      },
    ],
    mediaTag: 'Core Loop & Economy System Demo',
    flip: false,
  },
];


/* ══════════════════════════════════════════
   ANIMATION VARIANTS
   ══════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ══════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════ */

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 left-8 z-50 flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
      style={{ color: 'rgba(243,246,251,0.45)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(243,246,251,0.9)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243,246,251,0.45)')}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      with AI
    </button>
  );
}

/* ── HeroSection ── */
function HeroSection() {
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDoorsOpen(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh', background: '#0A0C0F' }}>
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(74,222,128,0.04) 0%, transparent 70%)',
      }} />

      {/* Left door panel */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full z-20"
        initial={{ x: 0 }}
        animate={{ x: doorsOpen ? '-102%' : 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          background: 'linear-gradient(90deg, #080A0D 60%, #0D1012)',
          borderRight: '1px solid rgba(74,222,128,0.08)',
        }}
      >
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
          <p className="text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: 'rgba(74,222,128,0.25)' }}>
            React Three Fiber
          </p>
        </div>
      </motion.div>

      {/* Right door panel */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full z-20"
        initial={{ x: 0 }}
        animate={{ x: doorsOpen ? '102%' : 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          background: 'linear-gradient(270deg, #080A0D 60%, #0D1012)',
          borderLeft: '1px solid rgba(74,222,128,0.08)',
        }}
      >
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <p className="text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: 'rgba(74,222,128,0.25)' }}>
            ONNX Runtime
          </p>
        </div>
      </motion.div>

      {/* Content (revealed after doors open) */}
      <div className="relative z-10 w-full px-8" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          animate={doorsOpen ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
            style={{ color: 'rgba(74,222,128,0.6)' }}
          >
            Case Study · Web 3D Game
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="text-[52px] md:text-[72px] font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{ color: 'rgba(243,246,251,0.95)', letterSpacing: '-0.02em' }}
          >
            Leaf It Alone
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-[18px] md:text-[22px] font-medium leading-snug mb-10"
            style={{ color: 'rgba(243,246,251,0.5)' }}
          >
            웹 기반 3D 물리 시뮬레이션 환경 구축<br className="hidden md:block" /> 및 AI 최적화 프로젝트
          </motion.p>

          {/* Meta Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2.5 mb-10">
            {META_BADGES.map((b) => (
              <span
                key={b.label}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(243,246,251,0.6)',
                }}
              >
                {b.label}
              </span>
            ))}
            <a
              href="https://leaf-it-alone-web.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-md transition-all duration-200"
              style={{
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.2)',
                color: 'rgba(74,222,128,0.85)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(74,222,128,0.14)';
                e.currentTarget.style.color = 'rgba(74,222,128,1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(74,222,128,0.08)';
                e.currentTarget.style.color = 'rgba(74,222,128,0.85)';
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live Demo
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="h-px w-full mb-10"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />

          {/* One-liner */}
          <motion.p
            variants={fadeUp}
            className="text-[16px] leading-[1.85]"
            style={{ color: 'rgba(243,246,251,0.5)', fontFamily: '"Noto Serif KR", serif' }}
          >
            8,000개의 물리 객체가 상호작용하는 웹 환경에서, 렌더링 최적화와 AI 알고리즘을 도입해{' '}
            <span style={{ color: 'rgba(74,222,128,0.8)', fontStyle: 'normal' }}>60fps의 안정적인 3D 환경</span>을 구축한 프로젝트.
          </motion.p>

          {/* Scroll cue */}
          <motion.div variants={fadeUp} className="mt-14">
            <div className="w-px h-10 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(74,222,128,0.25), transparent)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── TroubleshootingBlock ── */
function TroubleshootingBlock({ item, index }) {
  const isFlipped = item.flip;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-20 ${
        index < TROUBLESHOOTING_ITEMS.length - 1 ? 'border-b' : ''
      }`}
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {/* Text Block */}
      <div className={isFlipped ? 'md:order-2' : 'md:order-1'}>
        <motion.p
          variants={fadeUp}
          className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4"
          style={{ color: 'rgba(74,222,128,0.55)' }}
        >
          {item.category}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-[26px] md:text-[30px] font-bold leading-snug mb-6"
          style={{ color: 'rgba(243,246,251,0.92)', whiteSpace: 'pre-line', letterSpacing: '-0.01em' }}
        >
          {item.title}
        </motion.h2>

        {/* Problem */}
        <motion.div variants={fadeUp} className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: '#546178' }}>
            Problem
          </p>
          <p className="text-[14px] leading-[1.85]" style={{ color: 'rgba(243,246,251,0.45)', fontFamily: '"Noto Serif KR", serif' }}>
            {item.problem}
          </p>
        </motion.div>

        {/* Solution Bullets */}
        <motion.div variants={fadeUp}>
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: '#546178' }}>
            Solution & Outcome
          </p>
          <ul className="flex flex-col gap-4">
            {item.bullets.map((b) => (
              <li key={b.term} className="flex gap-3">
                <span
                  className="flex-shrink-0 mt-[3px] w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(74,222,128,0.8)" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div>
                  <span className="text-[14px] font-semibold" style={{ color: 'rgba(243,246,251,0.85)' }}>
                    {b.term}
                  </span>
                  <span className="text-[14px]" style={{ color: 'rgba(243,246,251,0.45)' }}>
                    {' '}— {b.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Media Placeholder */}
      <motion.div
        variants={fadeUp}
        className={isFlipped ? 'md:order-1' : 'md:order-2'}
      >
        <div
          className="aspect-video rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="text-center px-6">
            <div
              className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.15)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(74,222,128,0.5)" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <p className="text-[12px]" style={{ color: '#546178' }}>
              {item.mediaTag}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── TroubleshootingSection ── */
function TroubleshootingSection() {
  return (
    <section className="px-8 pb-32" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-12 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#546178' }}>
          Technical Deep Dive
        </p>
        <h2 className="text-[28px] font-bold" style={{ color: 'rgba(243,246,251,0.88)', letterSpacing: '-0.01em' }}>
          문제 정의 → 해결 → 성과
        </h2>
      </motion.div>

      {/* Blocks */}
      {TROUBLESHOOTING_ITEMS.map((item, i) => (
        <TroubleshootingBlock key={item.id} item={item} index={i} />
      ))}
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════ */

export default function LeafDetail({ onNavigate }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: '#0A0C0F',
        color: 'rgba(243,246,251,0.9)',
        fontFamily: '"Pretendard", "Inter", "Apple SD Gothic Neo", sans-serif',
      }}
    >
      {/* Subtle top glow */}
      <div
        className="fixed top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.15), transparent)' }}
      />

      <BackButton onClick={() => onNavigate('withai')} />
      <HeroSection />
      <TroubleshootingSection />
    </div>
  );
}
