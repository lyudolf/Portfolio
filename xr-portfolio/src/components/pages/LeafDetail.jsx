import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MermaidDiagram from '../ui/MermaidDiagram';

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
      { term: 'InstancedMesh 렌더링', desc: '8,000개의 개별 오브젝트를 하나의 메시로 통합하여 드로우콜(Draw Call)을 8,000회 → 1회로 최적화.' },
      { term: '수면(Sleep) 시스템', desc: '정지한 낙엽의 물리 계산을 스킵하고 외부 힘이 가해질 때만 활성화. 평균 70%의 객체를 수면 상태로 유지하여 CPU 부하를 극적으로 절감.' },
    ],
    video: '/withai/leaf/render.mp4',
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
      { term: 'ONNX 기반 적대적 AI', desc: '플레이어의 시선 방향과 낙엽 밀도 맵을 분석하는 324차원 입력 딥러닝 모델을 브라우저에 직접 탑재. 이동 경로를 예측해 선제 타겟팅.' },
      { term: 'FSM 기반 NPC 도우미', desc: 'IDLE ↔ MOVING ↔ CARRYING 상태를 갖는 유한 상태 머신으로 AI 도우미를 설계. 수집·운반 자동화 분업 시스템 구현.' },
    ],
    video: '/withai/leaf/mole.mp4',
    mediaTag: 'ONNX Sniper Mole Targeting Demo',
    flip: true,
  },

  {
    id: 'modularity',
    category: '시스템 모듈화',
    title: '확장성을 고려한\n모듈형 도구(Tool) 아키텍처 설계',
    problem:
      '장비 성장에 따라 물리 연산 방식이 달라지며, 하드코딩 시 신규 도구 추가·변경 때마다 전체 로직 수정이 필요한 유지보수 문제가 있었습니다.',
    bullets: [
      { term: '컴포넌트 패턴 적용', desc: '충돌 범위(Raycast/Box)와 물리적 힘(밀기/당기기)을 모듈화하여, 신규 장비 추가 시 기존 코드 수정 없이 데이터 주입만으로 동작하도록 설계.' },
      { term: '물리 연산 분리', desc: '장비 특성(Kinematic, 전역 인력 등)에 맞춘 독립적인 연산 파이프라인을 매핑하여 퍼포먼스 드랍 방지.' },
    ],
    video: '/withai/leaf/tool.mp4',
    mediaTag: 'Modular Tool Architecture Diagram',
    flip: true,
  },
  {
    id: 'core-loop',
    category: '프로덕트 설계',
    title: '리텐션을 극대화하는\n레벨 디자인',
    problem:
      '대량의 낙엽을 치우는 단순 반복 작업만으로는 장기 플레이 동기를 유지하기 어렵습니다. 유저 이탈을 방지하는 보상 구조 설계가 필요했습니다.',
    bullets: [
      { term: '단계적 코어 루프', desc: '\'수집 → 봉투 생성(100단위) → 판매 → 업그레이드\'로 이어지는 명확한 경제 보상 파이프라인 구축.' },
      { term: '난이도 곡선 제어', desc: '5개 스테이지에 걸쳐 도구와 환경 변수를 점진적으로 해금하여 사용자 학습 곡선(Learning Curve) 최적화.' },
    ],
    video: '/withai/leaf/level.mp4',
    mediaTag: 'Core Loop & Economy System Demo',
    flip: false,
  },
];

/* ══════════════════════════════════════════
   DIAGRAM DATA
   ══════════════════════════════════════════ */

const DIAGRAMS = [
  {
    id: 'system',
    eyebrow: 'System Architecture',
    title: '전체 시스템 아키텍처',
    desc: '브라우저에서 8,000개의 물리 객체를 안정적으로 렌더링하려면 WebGL 추상화와 물리 엔진, 전역 상태가 긴밀하게 분리되어야 했습니다. Next.js App Router를 기반으로 R3F 3D 씬, Cannon.js 물리 엔진, Zustand 전역 상태를 독립 레이어로 설계해 각 관심사를 분리했습니다.',
    chart: `%%{init: {
  "flowchart": { "nodeSpacing": 10, "rankSpacing": 80, "padding": 0 },
  "themeVariables": { "fontSize": "20px", "fontFamily": "Pretendard, -apple-system, sans-serif" }
}}%%
graph TD
    classDef default fill:#1e293b,stroke:#475569,stroke-width:1px,color:#f8fafc,rx:8px,ry:8px;
    classDef app fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#bfdbfe,rx:8px,ry:8px;
    classDef r3f fill:#020617,stroke:#10b981,stroke-width:2px,color:#a7f3d0,rx:8px,ry:8px;
    classDef state fill:#171717,stroke:#f59e0b,stroke-width:2px,color:#fde68a,rx:8px,ry:8px;
    classDef ai fill:#2e1065,stroke:#8b5cf6,stroke-width:2px,color:#ddd6fe,rx:8px,ry:8px;
    classDef server fill:#1e1b4b,stroke:#ef4444,stroke-width:2px,color:#fecaca,rx:8px,ry:8px;
    subgraph Client ["Browser Client Architecture"]
        style Client fill:transparent,stroke:#334155,stroke-width:2px,stroke-dasharray: 5 5,rx:12px,ry:12px,color:#94a3b8
        subgraph NextApp ["Next.js App Router"]
            style NextApp fill:transparent,stroke:none,color:#cbd5e1
            Page["page.tsx<br/>(Entry Point)"]:::app --> Canvas["@react-three/fiber<br/>Canvas"]:::app
        end
        subgraph R3F ["React Three Fiber — 3D Scene"]
            style R3F fill:transparent,stroke:none,color:#cbd5e1
            Canvas --> Physics["@react-three/cannon<br/>Physics World"]:::r3f
            Canvas --> Leaves["InstancedMesh<br/>Leaf System"]:::r3f
            Canvas --> Tools["Tool Components<br/>(HAND / RAKE / BLOWER)"]:::r3f
            Canvas --> Stage["Scene Components<br/>(Tornado / StageGate)"]:::r3f
        end
        subgraph State ["Global State — Zustand"]
            style State fill:transparent,stroke:none,color:#cbd5e1
            Store["useGameStore<br/>(store.ts)"]:::state
            Store --> GameLogic["Game Logic<br/>(Score / Money)"]:::state
            Store --> UIState["UI State<br/>(Inventory / Shop)"]:::state
            Store --> CreateMode["Create Mode<br/>(Custom Models)"]:::state
        end
        subgraph AI ["MoleSniper AI (Stage 5)"]
            style AI fill:transparent,stroke:none,color:#cbd5e1
            ONNX["ONNX Runtime Web<br/>(mole_sniper.onnx)"]:::ai
            Brain["MoleSniperBrain.ts<br/>(FSM & Logic)"]:::ai
            Brain --> ONNX
            Brain --> Fallback["Rule-Based Fallback<br/>(Density Scoring)"]:::ai
        end
    end
    subgraph Server ["Backend API Server"]
        style Server fill:transparent,stroke:#334155,stroke-width:2px,stroke-dasharray: 5 5,rx:12px,ry:12px,color:#94a3b8
        ProxyRoute["api/proxy-model<br/>(Route Handler)"]:::server
        ProxyRoute --> Gemini["Google Gemini API<br/>(AI Generation)"]:::server
    end
    Stage --> Brain
    Physics --> Leaves
    Tools --> Store
    Stage --> Store
    Canvas --> ProxyRoute`,
  },
  {
    id: 'gameloop',
    eyebrow: 'Game Loop',
    title: '게임 루프 & Zustand 상태 흐름',
    desc: '플레이어 입력 → 물리 반응 → 수집 판정 → 스테이지 전환으로 이어지는 단방향 게임 루프. 모든 상태 변경은 Zustand Store를 단일 진실의 원천으로 흘러갑니다.',
    chart: `%%{init: {
  "theme": "base",
  "sequence": {
    "actorMargin": 40,
    "messageMargin": 40,
    "noteMargin": 10,
    "boxMargin": 10
  },
  "themeVariables": {
    "fontSize": "16px",
    "fontFamily": "Pretendard, -apple-system, sans-serif",
    "primaryColor": "#1e293b",
    "primaryTextColor": "#f8fafc",
    "primaryBorderColor": "#3b82f6",
    "lineColor": "#64748b",
    "actorBkg": "#0f172a",
    "actorBorder": "#3b82f6",
    "actorTextColor": "#f8fafc",
    "signalColor": "#38bdf8",
    "noteBkgColor": "#334155",
    "noteTextColor": "#f8fafc",
    "noteBorderColor": "#475569"
  }
}}%%
sequenceDiagram
    autonumber
    box rgb(15, 23, 42) "Client / Interaction"
        participant P as Player
        participant T as Tool Component
    end
    box rgb(2, 6, 23) "3D & Physics Engine"
        participant PH as Cannon.js
        participant L as InstancedMesh
    end
    box rgb(23, 23, 23) "Global State (Zustand)"
        participant S as Store
        participant G as StageGate
    end
    box rgb(46, 16, 101) "AI System"
        participant AI as MoleSniper AI
    end
    P->>T: Input (WASD / 1234 / Space)
    T->>PH: Apply force / impulse
    PH->>L: Update leaf positions (InstancedMatrix)
    T->>S: addLeaf(amount)
    S->>S: stageCleared check (total >= goal)
    Note over P, S: Stage Transition Logic
    P->>G: Interact [E Key] near gate
    G->>S: nextStage()
    S->>S: Reset collections / Unlock new tools
    Note over L, AI: AI Inference Loop (Every 10s)
    AI->>L: Read positions → buildDensityMap()
    AI->>AI: ONNX Inference (Predict Target)
    AI->>L: Scatter leaves at target cell
    AI->>S: triggerPlayerPush() (Feedback)
    Note over P, S: Core Economic Loop
    S->>S: createBag() (Vacuum fills 100 leaves)
    P->>S: Throw bag to TrashBin
    S->>S: removeBag(sold=true) → money++`,
  },
  {
    id: 'onnx',
    eyebrow: 'AI Pipeline',
    title: 'ONNX MoleSniper AI\n학습 추론 파이프라인',
    desc: 'Rule-based 알고리즘의 예측 한계를 극복하기 위해, PyTorch로 합성 데이터를 생성하고 MLP 추론 모델을 직접 학습. ONNX로 변환 후 브라우저에서 WebAssembly 백엔드로 서버 없이 직접 추론.',
    chart: `%%{init: {
  "flowchart": { "nodeSpacing": 100, "rankSpacing": 10, "padding": 10 },
  "themeVariables": { "fontSize": "20px", "fontFamily": "Pretendard, -apple-system, sans-serif" }
}}%%
flowchart LR
    classDef train fill:#1e1b4b,stroke:#8b5cf6,stroke-width:2px,color:#ddd6fe,rx:8px,ry:8px;
    classDef artifact fill:#022c22,stroke:#10b981,stroke-width:2px,color:#a7f3d0,rx:8px,ry:8px;
    classDef infer fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#bfdbfe,rx:8px,ry:8px;
    classDef fallback fill:#450a0a,stroke:#ef4444,stroke-width:2px,color:#fecaca,rx:8px,ry:8px;
    subgraph Train ["Python Training (Offline)"]
        style Train fill:transparent,stroke:#4c1d95,stroke-width:2px,stroke-dasharray: 5 5,rx:12px,ry:12px,color:#a78bfa
        direction TB
        A["Synthetic Data<br/>(50k samples, Density map)"]:::train
        B["MoleSniperMLP<br/>(fc1: 128 → fc2: 320 logits)"]:::train
        C["CrossEntropyLoss<br/>(Adam lr=0.001, 50 ep)"]:::train
        D["torch.onnx.export<br/>(opset v11, dynamic batch)"]:::train
        A --> B --> C --> D
    end
    subgraph Artifact ["Artifact"]
        style Artifact fill:transparent,stroke:#047857,stroke-width:2px,stroke-dasharray: 5 5,rx:12px,ry:12px,color:#34d399
        E["public/models/<br/>mole_sniper.onnx<br/>(~200KB)"]:::artifact
    end
    subgraph Infer ["Browser Inference (Runtime)"]
        style Infer fill:transparent,stroke:#1e3a8a,stroke-width:2px,stroke-dasharray: 5 5,rx:12px,ry:12px,color:#60a5fa
        direction TB
        F["Game Tick<br/>(10s cooldown)"]:::infer
        G["buildDensityMap()<br/>(20×16 Grid normalize)"]:::infer
        H["Input Tensor [1×324]<br/>(density + pos + dir)"]:::infer
        I["ort.InferenceSession<br/>(WASM backend)"]:::infer
        J["ArgMax over 320 logits<br/>(Best Grid Cell)"]:::infer
        K["cellToWorld()<br/>(Leaf Scatter Target)"]:::infer
        F --> G --> H --> I --> J --> K
    end
    L["Rule-Based Fallback<br/>(Intercept + density bonus)"]:::fallback
    D --> E
    E --> I
    F -. "ONNX load fails?" .-> L
    L --> K`,
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
              Play
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

      {/* Media Area */}
      <motion.div
        variants={fadeUp}
        className={isFlipped ? 'md:order-1' : 'md:order-2'}
      >
        <div
          className="aspect-video rounded-xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {item.video ? (
            <video
              src={item.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
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
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── GameplayVideoSection ── */
function GameplayVideoSection() {
  return (
    <section
      className="px-8 py-16 border-b"
      style={{ maxWidth: '1100px', margin: '0 auto', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(74,222,128,0.55)' }}>
          5스테이지 전체 플레이 축약 영상
        </p>
        <h2
          className="text-[26px] md:text-[30px] font-bold leading-snug mb-8"
          style={{ color: 'rgba(243,246,251,0.92)', letterSpacing: '-0.01em' }}
        >
          Gameplay Overview
        </h2>
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            background: '#000',
            border: '1px solid rgba(255,255,255,0.07)',
            aspectRatio: '16 / 9',
          }}
        >
          <video
            src="/withai/leaf/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ── PhilosophySection ── */
const PHILOSOPHY_BLOCKS = [
  {
    id: 'mvp',
    title: "기능의 나열에서 '핵심 가치(MVP)'로의 전환",
    body: '이 프로젝트는 "유저가 필요한 서비스가 아닌, 보여주고 싶은 기능만 나열하다가 무산되는 패턴(Feature Creep)"에 대한 반성에서 출발했습니다. 성공적인 서비스의 본질은 \'단 하나의 핵심 기능에 집중하는 것\'입니다. 따라서 복잡한 기획을 덜어내고, "수많은 낙엽을 주워서 정리한다"라는 명확한 코어 액션(Core Action)에 집중하여 완벽한 MVP를 구축하는 것을 최우선 목표로 삼았습니다.',
  },
  {
    id: 'engineering',
    title: '한계 돌파와 시스템 최적화에 대한 호기심',
    body: '단순한 코어 액션 이면에는 기술적 호기심이 있었습니다. "단순히 몇십 개가 아니라, 화면을 뒤덮는 수만 개의 낙엽(물리 객체)을 브라우저 환경에서 어떻게 렌더링하고 처리할 것인가?"라는 엔지니어링 과제를 증명해 보고 싶었습니다. 이는 향후 대규모 트래픽이나 복잡한 데이터를 다루는 SaaS 플랫폼의 병목을 해결하는 아키텍처 설계 역량과 맞닿아 있습니다.',
  },
  {
    id: 'ai-mode',
    title: 'API 연동을 통한 서비스 확장 (생성형 AI 모드)',
    body: '기본적인 게임플레이(Core Loop)가 안정화된 후, 유저의 자유도(UGC)를 극대화하기 위해 \'생성형 AI 모드\'를 기획 및 도입했습니다. Hyper3D API와 Skybox AI API를 연동하여 유저의 프롬프트에 따라 3D 자산이 실시간으로 교체되도록 설계했습니다. 또한, 외부 API 모델 렌더링 시 발생하는 WebGL 메모리 오버플로우를 방지하기 위해 생성 단계에서 폴리곤(Polygon) 수를 강제 통제하는 파이프라인을 구축하여 서비스 안정성을 확보했습니다.',
  },
];

function PhilosophySection() {
  return (
    <section
      className="px-8 py-24 border-b"
      style={{ maxWidth: '1100px', margin: '0 auto', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left sticky title */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(74,222,128,0.55)' }}
            >
              Project Philosophy
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-[28px] md:text-[34px] font-bold leading-tight"
              style={{ color: 'rgba(243,246,251,0.92)', letterSpacing: '-0.02em' }}
            >
              Product<br />Philosophy
            </motion.h2>
          </div>
        </div>

        {/* Right scrollable content */}
        <div className="md:col-span-8 flex flex-col gap-14">
          {PHILOSOPHY_BLOCKS.map((block, i) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p
                className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: 'rgba(74,222,128,0.45)' }}
              >
                0{i + 1}
              </p>
              <h3
                className="text-[18px] md:text-[20px] font-bold mb-4 leading-snug"
                style={{ color: 'rgba(243,246,251,0.88)', letterSpacing: '-0.01em' }}
              >
                {block.title}
              </h3>
              <div className="h-px w-full mb-5" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <p
                className="text-[14px] leading-[2]"
                style={{ color: 'rgba(243,246,251,0.45)', fontFamily: '"Noto Serif KR", serif' }}
              >
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── DiagramCarousel ── */
function DiagramCarousel() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [dir, setDir] = useState(1);
  const total = DIAGRAMS.length;

  const go = (d) => {
    setDir(d);
    setCurrent((p) => (p + d + total) % total);
    setAnimKey((k) => k + 1);
  };

  const slide = DIAGRAMS[current];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="py-16 border-b"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {/* Eyebrow + arrows */}
      <div className="flex items-center justify-between mb-4">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.25em] uppercase"
          style={{ color: 'rgba(74,222,128,0.55)' }}>
          {slide.eyebrow}
        </motion.p>
        <div className="flex items-center gap-3">
          <span className="text-[12px]" style={{ color: '#546178' }}>{current + 1} / {total}</span>
          {[{ d: -1, pts: '15,18 9,12 15,6' }, { d: 1, pts: '9,18 15,12 9,6' }].map(({ d, pts }) => (
            <button key={d} onClick={() => go(d)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(243,246,251,0.5)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.3)'; e.currentTarget.style.color = 'rgba(74,222,128,0.8)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(243,246,251,0.5)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points={pts} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <motion.h2 key={`t-${animKey}`}
        initial={{ opacity: 0, x: dir * 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-4"
        style={{ color: 'rgba(243,246,251,0.92)', letterSpacing: '-0.01em' }}>
        {slide.title}
      </motion.h2>

      {/* Desc */}
      <motion.p key={`d-${animKey}`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.06 }}
        className="text-[14px] leading-[1.85] mb-10"
        style={{ color: 'rgba(243,246,251,0.45)', fontFamily: '"Noto Serif KR", serif' }}>
        {slide.desc}
      </motion.p>

      {/* Chart */}
      <motion.div key={`c-${animKey}`}
        initial={{ opacity: 0, x: dir * 30 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-xl p-3 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', minHeight: '420px' }}>
        <MermaidDiagram chart={slide.chart} />
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {DIAGRAMS.map((_, i) => (
          <button key={i}
            onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); setAnimKey((k) => k + 1); }}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer border-0 p-0"
            style={{
              background: i === current ? 'rgba(74,222,128,0.7)' : 'rgba(255,255,255,0.15)',
              transform: i === current ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── TroubleshootingSection ── */
function TroubleshootingSection() {
  return (
    <section className="px-8 pb-32" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <DiagramCarousel />

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
      <GameplayVideoSection />
      <PhilosophySection />
      <TroubleshootingSection />
    </div>
  );
}
