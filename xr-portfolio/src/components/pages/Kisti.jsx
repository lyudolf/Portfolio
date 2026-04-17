import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

const META_BADGES = [
  { label: '서비스 기획 PM' },
  { label: '2024 — 2025' },
  { label: 'Unity · VR' },
  { label: 'SSO · Force Plate' },
  { label: 'Meta Quest 3' },
];

const PROBLEMS = [
  {
    id: 'visual',
    title: '과도한 시각적 정보량',
    result: '시점 고정 + 핵심 오브젝트 중심 씬 재설계, 집중도 향상',
    body: '무한하게 펼쳐진 공간형 씬은 시각적 부하가 과했고, 고령자가 훈련 목표에 집중하기 어려웠습니다. 고정 시점 기반으로 씬을 재설계하고 핵심 오브젝트만 남겨 인지 부담을 최소화했습니다.',
  },
  {
    id: 'motion',
    title: '높은 멀미·적응 부담',
    result: '고정 시점·확대 콜라이더 도입, 고령자 5명 파일럿 테스트 통과',
    body: 'VR 환경에 익숙하지 않은 고령자에게는 공간 적응과 멀미 부담이 컸습니다. 카메라 이동을 완전히 제거하고 콜라이더를 확대하여 핸드트래킹 오차를 흡수했습니다.',
  },
  {
    id: 'depth',
    title: '깊은 Depth의 운영 구조',
    result: '교수자/훈련자 2-depth 플랫 구조로 재정의, 실 운영 채택',
    body: '진입 depth가 4~5단계에 달해 교수자와 훈련자 모두 혼란을 겪었습니다. 대상자 선택부터 결과 확인까지 단일 흐름의 2-depth 구조로 과감히 단축했습니다.',
  },
  {
    id: 'legacy',
    title: '불안정한 레거시 구조',
    result: '인수 코드 재구조화, 임상 센터 3곳 안정 운영 중',
    body: '기존 업체가 작성한 코드를 인수받아 시작한 프로젝트라, 구조와 일정 모두 불안정한 상태였습니다. 코드를 재구조화하고 안정적인 세션 반복 운영이 가능한 시스템을 구축했습니다.',
  },
];

const PRINCIPLES = [
  {
    id: 'visibility',
    icon: '👁️',
    title: '시인성 최우선',
    desc: 'UI를 해치지 않는 선에서 텍스트를 충분히 크게, 교수자가 크기·수치를 제어',
    accent: 'rgba(111,216,255,0.12)',
    border: 'rgba(111,216,255,0.18)',
  },
  {
    id: 'accuracy',
    icon: '🎯',
    title: '조작 정확도',
    desc: '핸드트래킹 민감도 상향, 콜라이더 확대로 작은 오차에도 성공 경험 유도',
    accent: 'rgba(74,222,128,0.10)',
    border: 'rgba(74,222,128,0.18)',
  },
  {
    id: 'fatigue',
    icon: '⚡',
    title: '피로도 최소화',
    desc: '시점 전환과 카메라 이동을 제거, 고정 공간 내에서 상호작용 설계',
    accent: 'rgba(168,85,247,0.10)',
    border: 'rgba(168,85,247,0.18)',
  },
  {
    id: 'control',
    icon: '🔒',
    title: '중앙 제어 강화',
    desc: '교수자가 모든 설정과 진행을 중앙에서 관리, 훈련자 부담 최소화',
    accent: 'rgba(244,162,63,0.10)',
    border: 'rgba(244,162,63,0.18)',
  },
];

const SOLUTIONS = [
  {
    id: 'training',
    badge: '훈련 콘텐츠',
    title: '곤충잡기 · 공놀이',
    desc: '색상, 종류, 방향, 기억 과제를 결합한 인지·운동 복합 훈련. 직관적 상호작용에 임상 정량 지표를 자연스럽게 녹였습니다.',
  },
  {
    id: 'test',
    badge: '검사 콘텐츠',
    title: '인지검사 · 균형검사',
    desc: '9가지 주의력 항목 측정, Force Plate 연동 실시간 균형 모니터링. 실행 안정성을 품질의 일부로 접근했습니다.',
  },
  {
    id: 'launcher',
    badge: '운영 시스템',
    title: '교수자 · 훈련자 런처',
    desc: '4~5단계 진입을 1~2 Depth로 과감히 단축. 대상자 선택부터 결과 확인까지 단일 흐름으로 재구성했습니다.',
  },
];

/* ── Animation variants ── */
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

/* ── Color tokens ── */
const C = {
  accent: 'rgba(111,216,255,0.55)',
  accentDim: 'rgba(111,216,255,0.35)',
  text92: 'rgba(243,246,251,0.92)',
  text60: 'rgba(243,246,251,0.6)',
  text45: 'rgba(243,246,251,0.45)',
  text35: 'rgba(243,246,251,0.35)',
  border: 'rgba(255,255,255,0.06)',
  cardBg: 'rgba(255,255,255,0.03)',
  cardBorder: 'rgba(255,255,255,0.07)',
};

/* ══════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════ */

/* ── HeroSection (auto curtain reveal) ── */
function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Curtain left */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 z-20 flex items-center justify-end pr-10"
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.0, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: '#090B10' }}
      >
        <p className="text-[22px] md:text-[28px] font-extrabold tracking-[0.35em] uppercase"
          style={{ color: 'rgba(111,216,255,0.7)' }}>
          Clinical XR
        </p>
      </motion.div>
      {/* Curtain right */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 z-20 flex items-center pl-10"
        initial={{ x: '0%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.0, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: '#090B10' }}
      >
        <p className="text-[22px] md:text-[28px] font-extrabold tracking-[0.35em] uppercase"
          style={{ color: 'rgba(111,216,255,0.7)' }}>
          KISTi
        </p>
      </motion.div>

      {/* Revealed content */}
      <motion.div
        className="relative z-10 px-8 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ maxWidth: '1100px' }}
      >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {/* Eyebrow */}
            <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
              style={{ color: C.accent }}>
              Clinical XR — KISTi
            </motion.p>

            {/* Headline */}
            <motion.h1 variants={fadeUp}
              className="text-[42px] md:text-[56px] font-extrabold leading-[1.08] tracking-tight mb-6"
              style={{ color: C.text92, letterSpacing: '-0.02em' }}>
              고령자를 위한 XR은 단순히<br />"재미있는 콘텐츠"로<br />완성되지 않습니다
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp}
              className="text-[16px] md:text-[18px] font-medium leading-relaxed mb-10"
              style={{ color: C.text45, maxWidth: '520px' }}>
              실제 임상 데이터가 수집되고, 현장 운영이 안정적으로 이어지는 '시스템'을 설계했습니다.
            </motion.p>

            {/* Meta badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2.5">
              {META_BADGES.map((b) => (
                <span key={b.label}
                  className="text-[12px] font-semibold px-3 py-1.5 rounded-md"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: C.text60 }}>
                  {b.label}
                </span>
              ))}
            </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── ProblemSection (sticky sidebar) ── */
function ProblemSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left sticky */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
              Problem Definition
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-[28px] md:text-[34px] font-bold leading-tight"
              style={{ color: C.text92, letterSpacing: '-0.02em' }}>
              기존 구조를<br />다시 봐야 했던 이유
            </motion.h2>
          </div>
        </div>

        {/* Right scrollable */}
        <div className="md:col-span-8 flex flex-col gap-14">
          {PROBLEMS.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: C.accent }}>
                0{i + 1}
              </p>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-2 leading-snug" style={{ color: 'rgba(243,246,251,0.88)' }}>
                {p.title}
              </h3>
              <p className="text-[12px] font-semibold mb-3 px-2 py-1 rounded inline-block"
                style={{ color: 'rgba(111,216,255,0.8)', background: 'rgba(111,216,255,0.06)' }}>
                → {p.result}
              </p>
              <div className="h-px w-full mb-4" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <p className="text-[14px] leading-[2]"
                style={{ color: C.text45, fontFamily: '"Noto Serif KR", serif' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PrincipleCard (glow hover) ── */
function PrincipleCard({ item, index }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const glowX = useTransform(mouseX, (v) => `${v}px`);
  const glowY = useTransform(mouseY, (v) => `${v}px`);

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove}
      className="relative rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ background: C.cardBg, border: `1px solid ${item.border}` }}>
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(240px circle at ${glowX} ${glowY}, ${item.accent}, transparent 70%)` }} />
      <div className="relative z-10 p-6">
        <div className="text-2xl mb-3">{item.icon}</div>
        <h4 className="text-[15px] font-bold mb-2" style={{ color: 'rgba(243,246,251,0.85)' }}>{item.title}</h4>
        <p className="text-[13px] leading-relaxed" style={{ color: C.text45 }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

/* ── PrinciplesSection ── */
function PrinciplesSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        Design Principles
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-12"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        고령자 기준의 UX 재정의
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRINCIPLES.map((p, i) => (
          <PrincipleCard key={p.id} item={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── SolutionsSection ── */
function SolutionsSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        Core Solutions
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-12"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        해결책 및 핵심 기능
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SOLUTIONS.map((s, i) => (
          <motion.div key={s.id}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group overflow-hidden"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(111,216,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.cardBorder; }}>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: C.accentDim }}>
              {s.badge}
            </p>
            <h4 className="text-[16px] font-bold mb-3" style={{ color: 'rgba(243,246,251,0.85)' }}>{s.title}</h4>
            <p className="text-[13px] leading-[1.85] flex-1"
              style={{ color: C.text45, fontFamily: '"Noto Serif KR", serif' }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── ImpactSection ── */
function ImpactSection() {
  return (
    <section className="px-8 py-24 pb-32" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        PM's Impact
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-8"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        기준이 없는 상황에서 기준을 세우고,<br />굴러가는 구조를 만들다
      </motion.h2>

      {/* Quote */}
      <motion.blockquote initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="relative pl-6 py-4 mb-14"
        style={{ borderLeft: '2px solid rgba(111,216,255,0.25)' }}>
        <p className="text-[15px] italic leading-relaxed" style={{ color: C.text45 }}>
          "기획은 문서를 만드는 일이 아니라, 실제로 필요한 구조를 현실 안에서 작동하게 만드는 일임을 증명했습니다."
        </p>
      </motion.blockquote>

      {/* Impact cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '📈', title: '핵심 성과', desc: '차기 연차 연계 및 기술이전 논의 단계로 발전. 클라이언트가 계속 참여하는 조건으로 예산 확대를 제안.' },
          { icon: '🏗️', title: '운영 구조', desc: '임상 환경에서 실제 운영 가능한 구조 구축 완료. 안정적인 세션 반복 운영이 가능한 시스템 완성.' },
        ].map((item, i) => (
          <motion.div key={item.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            className="p-7 rounded-2xl"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <div className="text-2xl mb-3">{item.icon}</div>
            <h4 className="text-[15px] font-bold mb-2" style={{ color: 'rgba(243,246,251,0.85)' }}>{item.title}</h4>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text45 }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */
export default function Kisti() {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ background: '#090B10', color: '#f3f6fb' }}
    >
      {/* Top glow line */}
      <div
        className="fixed top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(111,216,255,0.15), transparent)' }}
      />

      <HeroSection />
      <ProblemSection />
      <PrinciplesSection />
      <SolutionsSection />
      <ImpactSection />
    </div>
  );
}
