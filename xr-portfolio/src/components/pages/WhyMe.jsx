import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

/* ── 카드 데이터 ── */
const CARDS = [
  {
    id: 'technical-pm',
    label: '01. Core Strength',
    title: 'Technical PM',
    subtitle: '엔지니어링 해상도를 갖춘 기획',
    body: '단순히 요구사항(What)을 나열하는 것에 그치지 않고, 시스템의 동작 원리와 기술적 구현 가능성(Feasibility)을 기획 초기부터 함께 고민합니다. 프론트엔드 렌더링이나 데이터 파이프라인 등 개발 생태계의 맥락을 이해하고 문서를 작성하여, 기획과 개발 사이의 인지적 간극을 줄이고 협업 과정의 병목을 최소화합니다.',
    col: 'md:col-span-2',
    accent: 'rgba(99,179,237,0.12)',
    border: 'rgba(99,179,237,0.18)',
    tag: ['Feasibility', 'System Thinking', 'Dev Collab'],
  },
  {
    id: 'impact-driven',
    label: '02. Mindset',
    title: 'Impact-Driven',
    subtitle: '본질에 집중하는 MVP',
    body: '불필요한 개발 리소스가 낭비되는 기능 팽창(Feature Creep)을 경계합니다. 비즈니스 목표와 유저의 핵심 과제 해결에만 집중하여, 시장 검증이 가능한 최소 기능 제품(MVP)을 명확히 정의합니다.',
    col: 'md:col-span-1',
    accent: 'rgba(74,222,128,0.10)',
    border: 'rgba(74,222,128,0.18)',
    tag: ['MVP', 'Anti-Creep'],
  },
  {
    id: 'agile-proto',
    label: '03. Workflow',
    title: 'Agile Prototyping',
    subtitle: 'AI 툴을 활용한 빠른 검증',
    body: '기획의 타당성을 문서에만 머물게 하지 않고, AI 어시스턴트(Cursor, v0 등)를 활용해 빠르게 테스트합니다. 아이디어를 실제 동작하는 수준의 프로토타입으로 시각화하여 팀 내 불확실성을 줄이고 의사결정 속도를 극대화합니다.',
    col: 'md:col-span-3',
    accent: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.18)',
    tag: ['Cursor', 'v0', 'Prototype', 'AI-Assisted'],
    wide: true,
  },
];

/* ── Hover glow card ── */
function BentoCard({ card, index }) {
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative ${card.col} rounded-3xl overflow-hidden group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${card.border}`,
      }}
    >
      {/* Radial glow follow cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(280px circle at ${glowX} ${glowY}, ${card.accent}, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-between ${card.wide ? 'p-8 md:flex-row md:items-center md:gap-12' : 'p-7'}`}>
        {/* Text block */}
        <div className={card.wide ? 'flex-1' : ''}>
          <p
            className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4"
            style={{ color: 'rgba(74,222,128,0.55)' }}
          >
            {card.label}
          </p>

          <h3
            className="font-bold leading-tight mb-1"
            style={{
              color: 'rgba(243,246,251,0.92)',
              fontSize: card.wide ? '28px' : '22px',
              letterSpacing: '-0.02em',
            }}
          >
            {card.title}
          </h3>

          <p
            className="text-[13px] font-medium mb-4"
            style={{ color: 'rgba(243,246,251,0.35)' }}
          >
            {card.subtitle}
          </p>

          {!card.wide && (
            <div className="h-px w-full mb-5" style={{ background: 'rgba(255,255,255,0.05)' }} />
          )}

          <p
            className="text-[13px] leading-[1.85]"
            style={{
              color: 'rgba(243,246,251,0.45)',
              fontFamily: '"Noto Serif KR", serif',
              maxWidth: card.wide ? '520px' : '100%',
            }}
          >
            {card.body}
          </p>
        </div>

        {/* Tags */}
        <div className={`flex flex-wrap gap-2 ${card.wide ? 'md:flex-col md:items-end md:gap-2 mt-6 md:mt-0' : 'mt-6'}`}>
          {card.tag.map((t) => (
            <span
              key={t}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${card.border}`,
                color: 'rgba(243,246,251,0.45)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function WhyMe() {
  return (
    <div style={{ background: '#090B10', minHeight: '100vh' }}>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p
            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
            style={{ color: '#546178' }}
          >
            Why Me
          </p>
          <h1
            className="text-[34px] md:text-[44px] font-extrabold leading-tight mb-4"
            style={{ color: 'rgba(243,246,251,0.92)', letterSpacing: '-0.025em' }}
          >
            기획과 엔지니어링의<br className="hidden md:block" /> 간극을 없앱니다.
          </h1>
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: 'rgba(243,246,251,0.4)', maxWidth: '520px', fontFamily: '"Noto Serif KR", serif' }}
          >
            본질적인 비즈니스 임팩트에 집중하는 Technical PM.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
