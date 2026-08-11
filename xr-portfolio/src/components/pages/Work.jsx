import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

/* ══════════════════════════════════════════
   DATA — Work 인덱스 (프로젝트 3종)
   ══════════════════════════════════════════ */

const PROJECTS = [
  {
    id: 'kisti',
    tab: 'kisti',
    eyebrow: 'Clinical XR',
    name: 'KISTI 고령자 훈련 시스템',
    period: '2024 — 현재',
    role: '단독 기획 · PM',
    tagline: '재미있는 콘텐츠로는 완성되지 않는다',
    desc: '고령자 인지·운동 훈련을 위한 VR 시스템. 교수자 PC와 VR 앱 두 종이 서버를 사이에 두고 움직이는 구조를 기획 단계에서 정의하고, 임상 데이터가 실제로 수집되는 운영 체계까지 설계.',
    stats: [
      { num: '60명', label: '1차 임상 무이슈' },
      { num: '3년차', label: '1년 용역 → 연장' },
      { num: '1~2', label: '운영 depth 단축' },
    ],
    tags: ['Unity · VR', 'Meta Quest 3', 'Force Plate', '임상 검증'],
    image: '/images/dream/8.jpg',
    accent: 'rgba(23,118,166,0.95)',
    accentSoft: 'rgba(111,216,255,0.16)',
    glow: 'rgba(111,216,255,0.3)',
  },
  {
    id: 'dream',
    tab: 'dream',
    eyebrow: 'Career XR',
    name: '꿈키올래 XR 직업체험',
    period: '2025.09 — 2025.12',
    role: 'PM · 기획 · 컨셉 설계 · QA',
    tagline: '아홉 종을 만든 힘은 버리는 속도였다',
    desc: 'Apple Vision Pro 기반 직업체험 콘텐츠 9종. 세 개의 세계관 아래 세 직업이 같은 흐름을 공유하는 프레임워크로 재설계해, 불가능한 일정을 구조로 해결.',
    stats: [
      { num: '9종', label: '직업체험 콘텐츠' },
      { num: '2개월', label: '실개발 기간' },
      { num: '후속 제안', label: '클라이언트 재요청' },
    ],
    tags: ['Apple Vision Pro', 'Unity · visionOS', '핸드트래킹', '세계관 설계'],
    image: '/images/dream/1.png',
    accent: 'rgba(158,106,22,0.95)',
    accentSoft: 'rgba(216,165,75,0.2)',
    glow: 'rgba(216,165,75,0.3)',
  },
  {
    id: 'kocca',
    tab: 'kocca-detail',
    eyebrow: 'AI × Career',
    name: '한콘진 AI 직업체험',
    period: '2026.04 — 진행 중',
    role: '초기 기획 참여',
    tagline: '내 기획 구조가 생성 엔진의 뼈대가 됐다',
    desc: '한국콘텐츠진흥원 국가과제. 매 플레이마다 LLM이 사건·증거·NPC 대사를 새로 생성하는 과학수사 직무체험. 꿈키올래의 세계관과 난이도 파라미터 설계가 이 과제의 출발점이 됨.',
    stats: [
      { num: 'LLM', label: '실시간 시나리오 생성' },
      { num: '34개', label: '테이블 데이터 모델' },
      { num: '7.5개월', label: '국가과제 기간' },
    ],
    tags: ['Gemini', 'Three.js · R3F', 'FastAPI', '교사용 에디터'],
    image: null,
    accent: 'rgba(166,54,102,0.95)',
    accentSoft: 'rgba(244,114,182,0.18)',
    glow: 'rgba(244,114,182,0.3)',
    ongoing: true,
  },
];

/* ── tokens ── */
const C = {
  text92: 'rgba(24,32,27,0.92)',
  text60: 'rgba(24,32,27,0.65)',
  text45: 'rgba(24,32,27,0.52)',
  text35: 'rgba(24,32,27,0.4)',
  cardBg: 'rgba(255,255,255,0.62)',
  cardBorder: 'rgba(24,32,27,0.08)',
  cardShadow: '0 8px 28px rgba(24,32,27,0.06)',
};

/* ══════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════ */

function ProjectCard({ p, index, onNavigate }) {
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
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative rounded-3xl overflow-hidden group"
      style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(420px circle at ${glowX} ${glowY}, ${p.glow}, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col md:flex-row">
        {/* 좌: 비주얼 */}
        <div className="md:w-[38%] flex-shrink-0 overflow-hidden"
          style={{ background: p.accentSoft, minHeight: 200 }}>
          {p.image ? (
            <img src={p.image} alt={p.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: 200 }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8" style={{ minHeight: 200 }}>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.5)', border: `1px solid ${p.accent.replace('0.95', '0.25')}` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p className="text-[12px] font-semibold" style={{ color: p.accent }}>진행 중 · 이미지 준비 예정</p>
              </div>
            </div>
          )}
        </div>

        {/* 우: 내용 */}
        <div className="flex-1 p-7 md:p-9">
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: p.accent }}>
              {p.eyebrow}
            </span>
            {p.ongoing && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: p.accentSoft, color: p.accent, border: `1px solid ${p.accent.replace('0.95', '0.25')}` }}>
                ONGOING
              </span>
            )}
          </div>

          <h3 className="text-[24px] md:text-[28px] font-extrabold leading-tight mb-2"
            style={{ color: C.text92, letterSpacing: '-0.02em' }}>
            {p.name}
          </h3>

          <p className="text-[14px] font-semibold mb-4 pl-3"
            style={{ color: p.accent, borderLeft: `2px solid ${p.accent.replace('0.95', '0.35')}` }}>
            {p.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] mb-4" style={{ color: C.text35 }}>
            <span>{p.period}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: C.text60, fontWeight: 600 }}>{p.role}</span>
          </div>

          <p className="text-[14px] leading-[1.9] mb-6" style={{ color: C.text45 }}>
            {p.desc}
          </p>

          {/* 지표 */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {p.stats.map((s) => (
              <div key={s.label}>
                <p className="text-[19px] font-extrabold leading-none mb-1.5" style={{ color: p.accent }}>{s.num}</p>
                <p className="text-[11px] leading-snug" style={{ color: C.text35 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* 태그 + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5"
            style={{ borderTop: `1px solid ${C.cardBorder}` }}>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${C.cardBorder}`, color: C.text60 }}>
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => onNavigate?.(p.tab)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold cursor-pointer transition-all"
              style={{ background: p.accent, color: '#fff' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              자세히 보기
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */

export default function Work({ onNavigate }) {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{
        backgroundColor: '#eef2ec',
        backgroundImage:
          "linear-gradient(180deg, rgba(238,242,236,0.15) 0%, rgba(238,242,236,0.75) 45vh, rgba(238,242,236,0.97) 80vh, #eef2ec 110vh), url('/hero-bg.jpg')",
        backgroundSize: 'auto, 100% auto',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        color: '#1a231e',
      }}
    >
      {/* 헤더 */}
      <section className="px-8 pt-32 pb-14" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
          style={{ color: 'rgba(23,118,166,0.9)' }}>
          Work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
          className="text-[36px] md:text-[48px] font-extrabold leading-[1.12] mb-5"
          style={{ color: C.text92, letterSpacing: '-0.02em' }}>
          기획이 실제로<br />작동하는 것까지가 일이었다
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.12 }}
          className="text-[15px] leading-[1.9]" style={{ color: C.text45, maxWidth: '600px' }}>
          임상 데이터를 수집하는 훈련 시스템, 두 달에 아홉 종을 만든 직업체험,
          그리고 그 기획이 이어진 국가과제. 세 프로젝트 모두 문서가 아니라
          현장에서 굴러가는 상태까지 만들었습니다.
        </motion.p>
      </section>

      {/* 프로젝트 카드 */}
      <section className="px-8 pb-32" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="flex flex-col gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
}
