import { motion } from 'framer-motion';

/* ══════════════════════════════════════════
   DATA — Hide & Seek 강화학습 실험 로그
   출처: 개인 실험 기록(2026.02). 수치는 학습 step 로그 기준.
   ══════════════════════════════════════════ */

const META_BADGES = [
  { label: '2026.02 · 개인 실험' },
  { label: 'Unity ML-Agents' },
  { label: 'PPO · Self-Play' },
  { label: 'LSTM' },
  { label: 'ONNX' },
];

const SETUP = [
  {
    term: '환경',
    desc: 'OpenAI Hide & Seek 재현. 술래(Seeker)와 도망자(Hider)가 한 맵에서 셀프플레이로 서로를 상대하며 학습.',
    img: '/withai/rl/setup-layout.png',
    mediaTag: '환경 배치',
  },
  {
    term: '학습 루프',
    desc: 'PPO 기반 훈련 → 학습된 ONNX 모델을 각 에이전트의 Behavior Parameters에 임베드해 플레이 검증.',
    img: '/withai/rl/setup-onnx.png',
    mediaTag: 'ONNX → Behavior Parameters',
  },
  {
    term: '가속',
    desc: '학습 속도 확보를 위해 씬을 프리팹화, 4개 환경을 병렬 배치해 동시 학습.',
    video: '/withai/rl/setup-parallel.mp4',
    mediaTag: '4개 환경 병렬 학습',
  },
  {
    term: '커리큘럼',
    desc: '기본 추격·도주 → 고정 장애물 → 장애물 조작 순으로 난이도 단계화(Curriculum Learning).',
  },
];

const VERSIONS = [
  {
    v: 'V1',
    title: '기본 추격 · 도주',
    problem: '4만~5만 step 구간 보상 편차 0.000. 매 에피소드 동일 행동 반복 — 학습 정체.',
    action: 'Local Minimum 진단. 커리큘럼 러닝으로 재설계: 기본 추격·도주 → 고정 장애물 → 장애물 조작 순.',
    video: '/withai/rl/v1-60k.mp4',
    mediaTag: '6만 step — 안전한 구석에서 같은 행동만 반복',
  },
  {
    v: 'V2',
    title: '거리 기반 보상 추가',
    problem: '"가까울수록 보상"을 넣자 술래가 벽 너머 신호에 반응, 벽에 밀착한 채 이탈하지 않음(벽 비비기). 도구 "잡기" 보상 탓에 도망자는 도주 대신 상자 옮기기에 집착.',
    action: '거리 보상·잡기 보상 삭제. 잠금 후 생존 시에만 보상하도록 조건 변경.',
    video: '/withai/rl/v2-distance.mp4',
    mediaTag: '20만 step — 도망자의 구석 선호를 술래가 역이용',
  },
  {
    v: 'V3',
    title: 'LSTM(기억) 추가',
    problem: '기억 부재 — 매 순간을 처음처럼 판단, 전략이 누적되지 않음.',
    action: 'LSTM 추가. 94만 step에 술래의 수색 반경 확장, 이후 상대의 구석 선호를 학습해 미리 대기하는 예측 행동 관측.',
    video: '/withai/rl/v3-940k.mp4',
    mediaTag: '94만 step — 구석만 돌던 술래의 수색 반경 확장',
  },
  {
    v: 'V4',
    title: '관성 문제',
    problem: '1,250만 step 학습한 술래가 구습(벽 비비기)을 유지. 보상을 바꿔도 행동 불변.',
    action: '도망자 가중치는 유지, 술래만 초기화하는 비대칭 재학습. 학습된 관성은 수정보다 재학습이 빠름을 확인.',
  },
  {
    v: 'V5',
    title: 'Pure RL — 중간 보상 전량 삭제',
    problem: '중간 보상을 넣을 때마다 전략 대신 보상의 지름길이 최적화됨.',
    action: '승 +1 / 패 -1만 잔존. 2,700만 step — 입구 봉쇄, 상자 고정 등 가르친 적 없는 전략 출현.',
    video: '/withai/rl/v5-27m.mp4',
    mediaTag: '2,700만 step — 입구를 막고 상자를 고정하는 도망자',
  },
];

const MOMENTS = [
  {
    icon: '🧱',
    title: '벽 비비기',
    desc: '거리 보상 도입 직후 관측. 술래가 탐색을 버리고 벽 너머 신호에 밀착. 지표를 주면 지표만 최적화된다.',
  },
  {
    icon: '🕳️',
    title: '물리 버그 착취',
    desc: '180만 step, 도망자가 램프를 벽 밖으로 떨어뜨려 라운드 내 발각 불가 상태를 만드는 버그 발견. 빈틈은 반드시 착취된다.',
    video: '/withai/rl/bug-ramp.mp4',
  },
  {
    icon: '📦',
    title: '창발적 전략',
    desc: 'V5 2,700만 step. 학습시킨 적 없는 입구 봉쇄·상자 고정 출현. 어설픈 힌트보다 명확한 결과 목표가 강하다.',
  },
];

/* ── Animation / tokens ── */
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } } };
const C = {
  accent: 'rgba(167,139,250,0.8)',
  accentDim: 'rgba(167,139,250,0.5)',
  text92: 'rgba(243,246,251,0.92)',
  text60: 'rgba(243,246,251,0.6)',
  text45: 'rgba(243,246,251,0.45)',
  border: 'rgba(255,255,255,0.06)',
  cardBg: 'rgba(255,255,255,0.02)',
  cardBorder: 'rgba(255,255,255,0.06)',
};

/* ══════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════ */

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: C.text60 }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      AI-lab
    </button>
  );
}

function HeroSection() {
  return (
    <section className="px-8 pt-32 pb-16" style={{ maxWidth: '860px', margin: '0 auto' }}>
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: C.accentDim }}>
          AI Lab · Reinforcement Learning
        </motion.p>
        <motion.h1 variants={fadeUp}
          className="text-[44px] md:text-[64px] font-extrabold leading-[1.05] tracking-tight mb-6"
          style={{ color: 'rgba(243,246,251,0.95)', letterSpacing: '-0.02em' }}>
          Hide &amp; Seek RL
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[18px] md:text-[21px] font-medium leading-snug mb-4"
          style={{ color: 'rgba(243,246,251,0.5)' }}>
          보상을 잘못 설계하면, 시스템은 보상만 최적화한다
        </motion.p>
        <motion.p variants={fadeUp} className="text-[14px] leading-[1.9] mb-10" style={{ color: C.text45, maxWidth: '620px' }}>
          OpenAI Hide &amp; Seek을 Unity ML-Agents로 재현한 개인 실험.
          누적 2,700만 step, 보상 설계 5회 개편. 남은 것은 강화학습 지식이 아니라
          <span style={{ color: C.text60 }}> 인센티브 설계의 실패 기록</span>.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2.5 mb-6">
          {META_BADGES.map((b) => (
            <span key={b.label} className="text-[12px] font-semibold px-3 py-1.5 rounded-md"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: C.text60 }}>
              {b.label}
            </span>
          ))}
        </motion.div>
        <motion.a variants={fadeUp}
          href="https://github.com/lyudolf/hideNseek_ML" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
          style={{ color: C.accentDim }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.accentDim; }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          github.com/lyudolf/hideNseek_ML
        </motion.a>
      </motion.div>
    </section>
  );
}

function SetupSection() {
  return (
    <section className="px-8 py-16 border-t" style={{ maxWidth: '860px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-8" style={{ color: C.accentDim }}>
        Setup
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SETUP.map((s, i) => (
          <motion.div key={s.term}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="p-5 rounded-xl" style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <p className="text-[13px] font-bold mb-1.5" style={{ color: 'rgba(243,246,251,0.8)' }}>{s.term}</p>
            <p className="text-[13px] leading-[1.8]" style={{ color: C.text45 }}>{s.desc}</p>
            {(s.img || s.video) && (
              <div className="mt-4 rounded-lg overflow-hidden" style={{ border: `1px solid ${C.cardBorder}` }}>
                {s.video ? (
                  <video src={s.video} autoPlay loop muted playsInline className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} />
                ) : (
                  <img src={s.img} alt={s.mediaTag} className="w-full object-cover" style={{ aspectRatio: '16 / 9', objectPosition: 'top' }} />
                )}
                {s.mediaTag && (
                  <p className="text-[11px] px-3 py-2" style={{ color: C.text45, background: 'rgba(255,255,255,0.02)' }}>
                    {s.mediaTag}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LogSection() {
  return (
    <section className="px-8 py-16 border-t" style={{ maxWidth: '860px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: C.accentDim }}>
        Experiment Log
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="text-[24px] md:text-[28px] font-bold leading-snug mb-10" style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        보상 설계 5회 개편의 기록
      </motion.h2>
      <div className="flex flex-col gap-3">
        {VERSIONS.map((ver, i) => (
          <motion.div key={ver.v}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 p-6 rounded-xl"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start gap-2">
              <span className="text-[13px] font-bold px-2.5 py-1 rounded-md"
                style={{ background: 'rgba(167,139,250,0.08)', color: C.accent, border: '1px solid rgba(167,139,250,0.18)' }}>
                {ver.v}
              </span>
              <h3 className="text-[15px] font-bold" style={{ color: 'rgba(243,246,251,0.85)' }}>{ver.title}</h3>
            </div>
            <div className="md:col-span-4">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1.5" style={{ color: 'rgba(244,114,182,0.55)' }}>관측</p>
              <p className="text-[13px] leading-[1.8]" style={{ color: C.text45 }}>{ver.problem}</p>
            </div>
            <div className="md:col-span-5">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1.5" style={{ color: 'rgba(110,231,183,0.55)' }}>조치</p>
              <p className="text-[13px] leading-[1.8]" style={{ color: C.text45 }}>{ver.action}</p>
            </div>
            {ver.video && (
              <div className="md:col-span-12 rounded-lg overflow-hidden" style={{ border: `1px solid ${C.cardBorder}` }}>
                <video src={ver.video} autoPlay loop muted playsInline preload="metadata"
                  className="w-full object-cover" style={{ aspectRatio: '21 / 9' }} />
                {ver.mediaTag && (
                  <p className="text-[11px] px-3 py-2 font-medium"
                    style={{ color: C.accentDim, background: 'rgba(167,139,250,0.05)' }}>
                    ▶ {ver.mediaTag}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MomentsSection() {
  return (
    <section className="px-8 py-16 pb-32 border-t" style={{ maxWidth: '860px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-8" style={{ color: C.accentDim }}>
        Findings
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {MOMENTS.map((m, i) => (
          <motion.div key={m.title}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="h-full p-6 rounded-2xl flex flex-col" style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <div className="text-2xl mb-3">{m.icon}</div>
            <h4 className="text-[15px] font-bold mb-2" style={{ color: 'rgba(243,246,251,0.85)' }}>{m.title}</h4>
            <p className="text-[13px] leading-[1.8] flex-1" style={{ color: C.text45 }}>{m.desc}</p>
            {m.video && (
              <div className="mt-4 rounded-lg overflow-hidden" style={{ border: `1px solid ${C.cardBorder}` }}>
                <video src={m.video} autoPlay loop muted playsInline preload="metadata"
                  className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-[14px] font-semibold leading-relaxed pl-4"
        style={{ color: C.accent, borderLeft: '2px solid rgba(167,139,250,0.35)' }}>
        실험이 남긴 결론 세 줄. 지표를 주면 지표만 최적화된다. 빈틈은 반드시 착취된다.
        중간 보상보다 명확한 결과 목표가 강하다. — KPI와 정책을 설계할 때 마주치는 문제와 정확히 같았다.
      </motion.p>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════ */

export default function RlDetail({ onNavigate }) {
  return (
    <div className="min-h-screen" style={{ background: '#0B0912', color: '#f3f6fb' }}>
      <div className="fixed top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.18), transparent)' }} />
      <BackButton onClick={() => onNavigate?.('withai')} />
      <HeroSection />
      <SetupSection />
      <LogSection />
      <MomentsSection />
    </div>
  );
}
