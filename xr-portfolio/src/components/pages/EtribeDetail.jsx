import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../ui/FadeIn';

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

const PIPELINE_STEPS = [
  {
    step: '01',
    title: '시나리오 설계',
    duration: '4H',
    summary: '기승전결의 감정선 및 조명 대비 전략 수립',
    detail:
      '20년이라는 여정을 "고독 → 연대 → 결실"의 3막 구조로 압축. 초반부는 차가운 블루/그레이 조명으로 1인 창업의 고독을 표현하고, 중반부 악수·계약 장면에서 따뜻한 톤으로 전환, 클라이맥스에서 골든아워 조명으로 찬란한 성과를 시각화하는 조명 대비 전략을 설계했습니다.',
    color: 'rgba(111, 216, 255, 0.8)',
  },
  {
    step: '02',
    title: '페르소나 고정',
    duration: '6H',
    summary: 'Midjourney --cref 파라미터를 활용한 캐릭터 정체성 유지',
    detail:
      'AI 이미지 생성에서 가장 어려운 "캐릭터 일관성" 문제를 해결. Midjourney의 --cref(Character Reference) 파라미터와 --cw(Character Weight) 값을 정밀하게 튜닝하여, 대표이사 캐릭터가 30컷 이상의 장면에서 동일한 인상을 유지하도록 제어했습니다. 실패 후보 이미지만 200장 이상 생성·폐기하며 최적의 레퍼런스 세트를 확보.',
    color: 'rgba(167, 139, 250, 0.8)',
  },
  {
    step: '03',
    title: 'AI 비디오 인터폴레이션',
    duration: '2H',
    summary: '비즈니스 논리에 기반한 Start-End Frame 설계 및 영상 추출',
    detail:
      '단순히 "좋아 보이는" 영상이 아닌, 비즈니스 개연성을 갖춘 장면 전환을 설계. "사람이 먼저 등장 → 대화 → 악수 → 계약서 서명" 순서로 Start/End 프레임을 지정하고, Runway Gen-2로 키프레임 사이를 보간하여 자연스러운 모션을 추출했습니다.',
    color: 'rgba(110, 231, 183, 0.8)',
  },
  {
    step: '04',
    title: '파이널 마스터링',
    duration: '4H',
    summary: '시네마틱 영상 편집 및 슬로건 모션 그래픽 삽입',
    detail:
      'After Effects에서 전체 시퀀스의 색보정, 전환 효과, 슬로건 타이포그래피 모션을 완성. 20주년 슬로건을 골든 그라데이션 텍스트로 처리하고, 파티클 이펙트와 렌즈 플레어로 클라이맥스의 찬란한 분위기를 극대화했습니다. BGM 싱크 작업 포함.',
    color: 'rgba(216, 165, 75, 0.8)',
  },
];

const DIRECTOR_INSIGHTS = [
  {
    title: 'Logic over Aesthetics',
    subtitle: '비즈니스 개연성 확보',
    code: `// ❌ Bad: 계약서가 먼저, 사람이 나중
scene_order: ["contract", "handshake", "person"]

// ✅ Good: 사람 → 소통 → 신뢰 → 계약
scene_order: ["person_intro", "dialogue", "handshake", "contract_signing"]

// 비즈니스에서는 "사람이 먼저 등장한 후 
// 계약이 성사"되어야 개연성이 확보된다.`,
    desc: '"예쁜 영상"이 아니라 "말이 되는 영상"을 만들기 위해, 장면 순서에 비즈니스 로직을 적용했습니다.',
  },
  {
    title: 'Nuanced Direction',
    subtitle: '절제된 디테일 튜닝',
    code: `// Prompt tuning for trustworthy expression
prompt: "subtle confident smile, 
  NOT grinning, NOT thumbs up,
  gentle nod, professional warmth,
  --no exaggerated_expression --no teeth_showing"

// 과장된 제스처는 신뢰를 깎는다.
// "절제된 따봉"과 "가벼운 미소"로 
// 신뢰감 있는 전문가 이미지를 구축.`,
    desc: '표정과 제스처 하나로 영상의 신뢰도가 달라집니다. AI에게 "하지 말 것"을 지시하는 것이 핵심.',
  },
  {
    title: 'Production Innovation',
    subtitle: '압도적 생산성 증명',
    code: `// Traditional pipeline (외주)
traditional: { cost: "500만원+", time: "3~4주", iterations: 2 }

// AI-augmented pipeline (본 프로젝트)
ai_pipeline: { cost: "0원", time: "2일 (16H)", iterations: "∞" }

// ROI: 비용 100% 절감, 시간 90% 단축
// 핵심: AI가 아닌 "디렉터"가 품질을 결정한다.`,
    desc: '외주 대비 비용 100% 절감, 시간 90% 단축. 단, AI는 도구일 뿐 — 품질은 디렉팅이 결정합니다.',
  },
];

const OVERVIEW_STATS = [
  { label: '제작 기간', value: '2일', sub: '2026.02.26 – 02.27' },
  { label: '총 소요 시간', value: '16H', sub: '시나리오 4H + 페르소나 6H + 영상 2H + 마스터링 4H' },
  { label: '비용 절감', value: '100%', sub: '외주 대비 ₩0 (전액 내재화)' },
  { label: '수상', value: '1위', sub: '사내 공모전 최우수상' },
];

/* ══════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════ */

/* ── Noise Texture Overlay ── */
function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  );
}

/* ── Back Button ── */
function BackButton({ onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.8, duration: 0.4 }}
      onClick={onClick}
      className="fixed top-6 left-8 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-semibold cursor-pointer transition-all duration-200"
      style={{
        background: 'rgba(12, 14, 20, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(243,246,251,0.6)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(111, 216, 255, 0.25)';
        e.currentTarget.style.color = 'rgba(111, 216, 255, 0.9)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.color = 'rgba(243,246,251,0.6)';
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      with AI
    </motion.button>
  );
}

/* ── Hero Section — Curtain Reveal ── */
function HeroSection() {
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDoorsOpen(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#060509' }}>
      {/* Background glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(216,165,75,0.06) 0%, transparent 70%)',
      }} />

      {/* Door panels */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full z-20"
        initial={{ x: 0 }}
        animate={{ x: doorsOpen ? '-102%' : 0 }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          background: 'linear-gradient(90deg, #080A0F 60%, #0D0F16)',
          borderRight: '1px solid rgba(216,165,75,0.1)',
        }}
      >
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ color: 'rgba(216,165,75,0.3)' }}>Since 2006</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full z-20"
        initial={{ x: 0 }}
        animate={{ x: doorsOpen ? '102%' : 0 }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          background: 'linear-gradient(270deg, #080A0F 60%, #0D0F16)',
          borderLeft: '1px solid rgba(216,165,75,0.1)',
        }}
      >
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ color: 'rgba(216,165,75,0.3)' }}>→ 2026</p>
        </div>
      </motion.div>

      {/* Center content (revealed after doors open) */}
      <div className="relative z-10 text-center px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: doorsOpen ? 1 : 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-[11px] font-bold tracking-[0.35em] uppercase mb-8"
          style={{ color: 'rgba(216,165,75,0.5)' }}
        >
          Portfolio Case Study
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 20 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-display mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(243,246,251,0.95) 30%, rgba(216,165,75,0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          20 Years of<br />ETRIBE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 12 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-[15px] leading-[1.8] max-w-md mx-auto"
          style={{ color: 'rgba(243,246,251,0.45)', fontFamily: '"Noto Serif KR", serif' }}
        >
          20년의 고독을 연대로,<br />
          연대를 찬란한 결실로 재구성하다
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: doorsOpen ? 1 : 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          className="mt-12"
        >
          <div className="w-px h-12 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(216,165,75,0.3), transparent)' }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Overview Section ── */
function OverviewSection() {
  return (
    <section className="relative py-24" style={{ background: '#0C0A12' }}>
      <div className="mx-auto px-8" style={{ maxWidth: '1100px' }}>
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(216,165,75,0.45)' }}>
            Project Overview
          </p>
          <h2 className="text-headline mb-4" style={{ color: 'rgba(243,246,251,0.9)' }}>
            이트라이브 창립 20주년<br />
            <span style={{ color: 'rgba(216,165,75,0.8)' }}>시네마틱 히스토리</span>
          </h2>
          <p className="text-body max-w-xl mb-16" style={{ fontFamily: '"Noto Serif KR", serif' }}>
            '어둠에서 빛으로' — 1인 창업의 고독부터 20년간의 성장을 AI 시각화 파이프라인으로
            60초 쇼츠 영상에 압축. 스토리보드 설계부터 최종 마스터링까지 전 과정을 2일 만에 완성했습니다.
          </p>
        </FadeIn>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {OVERVIEW_STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.06}>
              <div className="rounded-xl p-6 text-center"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3"
                  style={{ color: 'rgba(216,165,75,0.5)' }}>
                  {stat.label}
                </p>
                <p className="text-[32px] font-extrabold leading-none mb-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(243,246,251,0.9), rgba(216,165,75,0.8))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {stat.value}
                </p>
                <p className="text-[11px] leading-[1.5]" style={{ color: '#546178' }}>
                  {stat.sub}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pipeline Accordion Item ── */
function PipelineItem({ step, isOpen, onToggle, index }) {
  return (
    <FadeIn delay={index * 0.06}>
      <div
        className="rounded-xl overflow-hidden mb-3 transition-all duration-300"
        style={{
          background: isOpen ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.015)',
          border: `1px solid ${isOpen ? 'rgba(216,165,75,0.15)' : 'rgba(255,255,255,0.06)'}`,
        }}
      >
        {/* Header (clickable) */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-5 px-6 py-5 text-left cursor-pointer transition-colors duration-200"
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {/* Step Number */}
          <span className="text-[13px] font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
            style={{
              background: step.color.replace('0.8', '0.08'),
              color: step.color,
              border: `1px solid ${step.color.replace('0.8', '0.15')}`,
              fontFamily: '"JetBrains Mono", monospace',
            }}>
            {step.step}
          </span>

          {/* Title + Summary */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-bold mb-0.5" style={{ color: 'rgba(243,246,251,0.85)' }}>
              {step.title}
            </h3>
            <p className="text-[13px] truncate" style={{ color: '#546178' }}>
              {step.summary}
            </p>
          </div>

          {/* Duration Badge */}
          <span className="text-[12px] font-bold px-3 py-1 rounded-md flex-shrink-0"
            style={{
              background: 'rgba(216,165,75,0.08)',
              color: 'rgba(216,165,75,0.7)',
              border: '1px solid rgba(216,165,75,0.12)',
              fontFamily: '"JetBrains Mono", monospace',
            }}>
            {step.duration}
          </span>

          {/* Chevron */}
          <motion.svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="rgba(243,246,251,0.3)" strokeWidth="2" strokeLinecap="round"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>

        {/* Expandable Detail */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-1">
                <div className="pl-[52px]">
                  <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  <p className="text-[14px] leading-[1.9]" style={{ color: 'rgba(243,246,251,0.55)', fontFamily: '"Noto Serif KR", serif' }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

/* ── Pipeline Section ── */
function PipelineSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-24" style={{
      background: 'linear-gradient(180deg, #0C0A12 0%, #110E0A 100%)',
    }}>
      <div className="mx-auto px-8" style={{ maxWidth: '1100px' }}>
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(216,165,75,0.45)' }}>
            Implementation Pipeline
          </p>
          <h2 className="text-subhead mb-4" style={{ color: 'rgba(243,246,251,0.85)' }}>
            AI Production Pipeline
          </h2>
          <p className="text-caption mb-12 max-w-lg">
            총 16시간의 제작 과정을 4단계로 분해. 각 단계를 클릭하면 상세 내용을 확인할 수 있습니다.
          </p>
        </FadeIn>

        {/* Timeline bar */}
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-1 mb-10 px-2">
            {PIPELINE_STEPS.map((step, i) => {
              const widthPercent = parseInt(step.duration) / 16 * 100;
              return (
                <div
                  key={step.step}
                  className="h-2 rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    width: `${widthPercent}%`,
                    background: openIndex === i
                      ? step.color.replace('0.8', '0.6')
                      : step.color.replace('0.8', '0.12'),
                  }}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  title={`${step.title} — ${step.duration}`}
                />
              );
            })}
          </div>
        </FadeIn>

        {/* Accordion */}
        {PIPELINE_STEPS.map((step, i) => (
          <PipelineItem
            key={step.step}
            step={step}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Director's Insight Section ── */
function InsightSection() {
  return (
    <section className="relative py-24 pb-32" style={{
      background: 'linear-gradient(180deg, #110E0A 0%, #1A150B 100%)',
    }}>
      {/* Warm ambient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(216,165,75,0.04) 0%, transparent 70%)',
      }} />

      <div className="relative mx-auto px-8" style={{ maxWidth: '1100px' }}>
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(216,165,75,0.5)' }}>
            Director's Insight
          </p>
          <h2 className="text-subhead mb-4" style={{ color: 'rgba(243,246,251,0.85)' }}>
            AI를 통제하는 3가지 원칙
          </h2>
          <p className="text-caption mb-14 max-w-lg">
            생성형 AI의 품질은 프롬프트가 아닌 '디렉팅 철학'이 결정합니다.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-6">
          {DIRECTOR_INSIGHTS.map((insight, i) => (
            <FadeIn key={insight.title} delay={i * 0.08}>
              <div className="rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                <div className="flex flex-col lg:flex-row">
                  {/* Left — Code Block */}
                  <div className="lg:w-[55%] flex-shrink-0">
                    <div className="h-full" style={{
                      background: 'rgba(0,0,0,0.35)',
                      borderRight: '1px solid rgba(255,255,255,0.04)',
                    }}>
                      {/* Terminal bar */}
                      <div className="flex items-center gap-2 px-4 py-2.5"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                        <span className="text-[10px] ml-2" style={{ color: '#546178', fontFamily: '"JetBrains Mono", monospace' }}>
                          insight_{String(i + 1).padStart(2, '0')}.js
                        </span>
                      </div>
                      {/* Code */}
                      <pre className="px-5 py-5 overflow-x-auto">
                        <code className="text-[12px] leading-[2]" style={{
                          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                          color: 'rgba(243,246,251,0.55)',
                        }}>
                          {insight.code}
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Right — Explanation */}
                  <div className="flex-1 p-7 flex flex-col justify-center">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2"
                      style={{ color: 'rgba(216,165,75,0.5)' }}>
                      {insight.subtitle}
                    </p>
                    <h3 className="text-[18px] font-bold mb-4" style={{ color: 'rgba(243,246,251,0.9)' }}>
                      {insight.title}
                    </h3>
                    <p className="text-[14px] leading-[1.8]"
                      style={{ color: 'rgba(243,246,251,0.5)', fontFamily: '"Noto Serif KR", serif' }}>
                      {insight.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Closing line */}
        <FadeIn delay={0.3}>
          <div className="mt-20 text-center">
            <div className="w-px h-12 mx-auto mb-8" style={{
              background: 'linear-gradient(to bottom, rgba(216,165,75,0.3), transparent)',
            }} />
            <p className="text-[14px] italic max-w-md mx-auto"
              style={{ color: 'rgba(216,165,75,0.5)', fontFamily: '"Noto Serif KR", serif' }}>
              "AI는 도구다. 도구의 품질을 결정하는 것은 디렉터의 판단이다."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════ */

export default function EtribeDetail({ onNavigate }) {
  return (
    <div style={{ background: '#0C0A12' }}>
      <NoiseOverlay />
      <BackButton onClick={() => onNavigate('withai')} />
      <HeroSection />
      <OverviewSection />
      <PipelineSection />
      <InsightSection />
    </div>
  );
}
