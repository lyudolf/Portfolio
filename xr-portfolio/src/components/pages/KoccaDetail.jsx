import { motion } from 'framer-motion';
import ProjectShowcase from '../ui/ProjectShowcase';

/* ══════════════════════════════════════════
   DATA — 한콘진 AI 직업체험
   ⚠️ 개발 성과는 팀 전체의 프로젝트 규모 지표입니다.
      유희수 본인 기여는 'My Part'(초기 기획)에 분리 명시.
   ══════════════════════════════════════════ */

/* 유희수 본인 산출물 — Figma 실물 확인(2026-08) */
const MY_PART = [
  {
    num: '01',
    title: '세계관과 직무 구조',
    desc: '꿈키올래의 "밀실사건수사대"가 이 과제의 출발점입니다. 사건 하나를 증거 수집 → 데이터 변환 → 범인 특정으로 나눠 맡는 직무 구조를 그대로 이어받아, 과학수사 직무체험의 기본 골격으로 삼았습니다.',
  },
  {
    num: '02',
    title: '페르소나 3종 · 성향 축',
    desc: '초등 저학년 · 초등 고학년 · 중학생 페르소나를 세우고, 호기심 탐험가 / 논리 추리가 / 전문 분석가라는 성향 축을 함께 정의했습니다. 같은 사건을 다른 연령과 성향이 어떻게 다르게 겪는지가 설계의 기준이 됐습니다.',
  },
  {
    num: '03',
    title: '난이도 파라미터 설계',
    desc: '난이도를 감각이 아니라 조절 가능한 값으로 정의했습니다. 쉬움 5분 · 용의자 3인 / 보통 7~8분 · 4인 / 어려움 10분 · 5인 · 증거 훼손율 80%. 이 파라미터 구조가 이후 LLM 생성 슬롯의 전신이 됩니다.',
  },
  {
    num: '04',
    title: '스토리보드 42컷 · 평가지표',
    desc: 'A/B/C 코스 각 14컷, 총 42컷의 스토리보드로 도입부터 결말까지의 흐름을 고정했습니다. 학습 성과는 채증 정확도 · 실험 분석 성공률 · 추론 논리(모순 제거) 세 축으로 측정하도록 정의했습니다.',
  },
];

/* 프로젝트(팀) 규모 — 개발팀 성과 포함 */
const PROJECT_SCALE = [
  { num: '34개', label: '테이블 데이터 모델', sub: '고정 31 + 런타임 3' },
  { num: '1,600건+', label: '자동화 테스트', sub: '3개 레포 누적' },
  { num: '5슬롯', label: 'LLM 생성 파이프라인', sub: '공간·증거·배경·전개·대사' },
  { num: '2회', label: '내부 POC 시연 완료', sub: '2026.07 · 08' },
];

const ENGINE = [
  {
    title: '매 플레이마다 새로 생성되는 사건',
    desc: '교사가 한 줄 프롬프트를 입력하면 LLM이 제목·배경·용의자·범인·단서까지 사건 전체의 초안을 만듭니다. 구조적 슬롯(공간 배치·증거 배치)과 서술적 슬롯(배경 상황·전개·NPC 대사)을 순차로 생성해, 서술과 배치가 어긋나지 않게 순서를 잡았습니다.',
  },
  {
    title: '"LLM은 제안, 코드가 보증"',
    desc: '정답이 하나로 좁혀지는지, 배치가 유효한지는 전부 코드가 최종 검증합니다. 검증에 실패하면 값 보정 → 재생성(최대 3회) → 사전 저작 콘텐츠 폴백의 3단계로 처리해, 어떤 경우에도 플레이가 멈추지 않도록 설계됐습니다.',
  },
  {
    title: '차단하지 않고 안내하는 검증',
    desc: '교사가 단서를 고를 때 정답 유일성을 실시간으로 검사하되, 위반 시 막기만 하지 않고 "어느 용의자가 왜 걸러지지 않는지, 무엇을 바꾸면 해결되는지"를 함께 안내합니다.',
  },
  {
    title: '생성 품질의 관측',
    desc: 'LLM 호출 성공률, 실패 원인 분류, 자동 수선 내역, 재생성 횟수, 폴백 사용 여부를 전량 기록하고 운영 화면에서 폴백률을 노출합니다. 생성형 AI를 쓰는 제품에서 품질을 눈으로 볼 수 있게 만든 부분입니다.',
  },
];

/* ── tokens ── */
const C = {
  accent: 'rgba(166,54,102,0.95)',
  accentDim: 'rgba(166,54,102,0.6)',
  accentSoft: 'rgba(244,114,182,0.16)',
  text92: 'rgba(28,24,26,0.92)',
  text60: 'rgba(28,24,26,0.65)',
  text45: 'rgba(28,24,26,0.52)',
  text35: 'rgba(28,24,26,0.4)',
  border: 'rgba(28,24,26,0.08)',
  cardBg: 'rgba(255,255,255,0.62)',
  cardBorder: 'rgba(28,24,26,0.08)',
  cardShadow: '0 8px 24px rgba(28,24,26,0.05)',
};


/* ══════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════ */

/* 꿈키올래 → 이 과제로 이어진 경로 */
function LineageSection({ onNavigate }) {
  return (
    <section className="px-8 py-20 border-b" style={{ maxWidth: '1000px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accentDim }}>
        Lineage
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[32px] font-bold leading-snug mb-10"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        내가 만든 콘텐츠가<br />국가과제의 출발점이 됐습니다
      </motion.h2>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-stretch gap-3 mb-8">
        <button
          onClick={() => onNavigate?.('dream')}
          className="flex-1 text-left p-6 rounded-2xl cursor-pointer transition-all"
          style={{ background: 'rgba(216,165,75,0.1)', border: '1px solid rgba(158,106,22,0.25)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(216,165,75,0.18)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(216,165,75,0.1)'; }}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(158,106,22,0.9)' }}>
            2025 · 꿈키올래
          </p>
          <p className="text-[16px] font-bold mb-2" style={{ color: C.text92 }}>밀실사건수사대</p>
          <p className="text-[13px] leading-[1.8]" style={{ color: C.text45 }}>
            증거를 변수로, 용의자를 데이터셋으로 정의하고 범인 특정을 교집합 문제로 바꾼 구조.
            난이도는 용의자 수·시간·훼손율 같은 값으로 조절했습니다.
          </p>
          <p className="text-[12px] font-semibold mt-3" style={{ color: 'rgba(158,106,22,0.9)' }}>
            꿈키올래 자세히 보기 →
          </p>
        </button>

        <div className="flex md:flex-col items-center justify-center px-2" style={{ color: C.accentDim }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            className="rotate-90 md:rotate-0">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>

        <div className="flex-1 p-6 rounded-2xl"
          style={{ background: C.accentSoft, border: `1px solid ${C.accent.replace('0.95', '0.25')}` }}>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: C.accent }}>
            2026 · 한콘진 국가과제
          </p>
          <p className="text-[16px] font-bold mb-2" style={{ color: C.text92 }}>AI 생성형 과학수사 체험</p>
          <p className="text-[13px] leading-[1.8]" style={{ color: C.text45 }}>
            같은 구조를 LLM이 매번 새로 채웁니다. 사람이 값을 정하던 자리에 생성 모델이 들어오고,
            코드가 그 결과의 유효성을 보증하는 형태로 확장됐습니다.
          </p>
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-[14px] font-semibold leading-relaxed pl-4"
        style={{ color: C.accent, borderLeft: `2px solid ${C.accent.replace('0.95', '0.35')}` }}>
        난이도를 감각이 아니라 조절 가능한 값으로 정의해 둔 덕분에,
        그 자리를 생성 모델로 바꾸는 확장이 가능했습니다.
      </motion.p>
    </section>
  );
}

function MyPartSection() {
  return (
    <section className="px-8 py-20 border-b" style={{ maxWidth: '1000px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accentDim }}>
        My Part · 초기 기획
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[32px] font-bold leading-snug mb-4"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        무엇을 만들지 정하는 단계
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="text-[14px] leading-relaxed mb-10" style={{ color: C.text45, maxWidth: '600px' }}>
        이 과제에서 제가 맡은 범위는 초기 기획입니다.
        누가 무엇을 어떤 난이도로 겪을지를 정하고, 그것을 개발팀이 값으로 다룰 수 있는 형태로 정리했습니다.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MY_PART.map((m, i) => (
          <motion.div key={m.num}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="p-6 md:p-7 rounded-2xl"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow }}>
            <p className="text-[11px] font-bold tracking-[0.2em] mb-3" style={{ color: C.accentDim }}>{m.num}</p>
            <h3 className="text-[17px] font-bold mb-3 leading-snug" style={{ color: C.text92 }}>{m.title}</h3>
            <p className="text-[13px] leading-[1.9]" style={{ color: C.text45 }}>{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EngineSection() {
  return (
    <section className="px-8 py-20 border-b" style={{ maxWidth: '1000px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accentDim }}>
        Project · AI 생성 엔진
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[32px] font-bold leading-snug mb-4"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        생성형 AI를 콘텐츠 엔진 안에 넣는 법
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="text-[14px] leading-relaxed mb-10" style={{ color: C.text45, maxWidth: '620px' }}>
        아래는 팀이 함께 만든 과제의 구성입니다.
        AI를 데모가 아니라 제품의 핵심부에 넣을 때 무엇이 필요한지를 보여주는 사례라, 기획자로서 함께 기록해 둡니다.
      </motion.p>

      {/* 프로젝트 규모 */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {PROJECT_SCALE.map((s) => (
          <div key={s.label} className="p-5 rounded-2xl"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow }}>
            <p className="text-[22px] font-extrabold leading-none mb-2" style={{ color: C.accent }}>{s.num}</p>
            <p className="text-[12px] font-semibold mb-1" style={{ color: C.text60 }}>{s.label}</p>
            <p className="text-[11px] leading-snug" style={{ color: C.text35 }}>{s.sub}</p>
          </div>
        ))}
      </motion.div>

      <div className="flex flex-col gap-3">
        {ENGINE.map((e, i) => (
          <motion.div key={e.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="p-6 md:p-7 rounded-2xl"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow }}>
            <h3 className="text-[16px] font-bold mb-3 leading-snug" style={{ color: C.text92 }}>{e.title}</h3>
            <p className="text-[13px] leading-[1.9]" style={{ color: C.text45 }}>{e.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-[12px] leading-relaxed mt-8 pl-4"
        style={{ color: C.text35, borderLeft: `2px solid ${C.border}` }}>
        위 구성과 지표는 과제 전체(기획·개발·운영)의 결과입니다.
        이 중 제가 맡은 범위는 앞 섹션의 초기 기획이며, 생성 엔진과 시스템 구현은 개발팀의 성과입니다.
      </motion.p>
    </section>
  );
}

function StatusSection() {
  return (
    <section className="px-8 py-20 pb-32" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accentDim }}>
        Status
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[24px] md:text-[28px] font-bold leading-snug mb-8"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        2026년 11월 과업 완료를 목표로 진행 중입니다
      </motion.h2>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="p-7 rounded-2xl"
        style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow }}>
        <p className="text-[14px] leading-[1.9]" style={{ color: C.text45 }}>
          내부 POC 시연 2회를 마쳤고, 실증 시연과 최종 시연이 남아 있습니다.
          진행 중인 국가과제라 세부 산출물과 수치는 공개 범위를 조정해 기재했습니다.
          면접에서는 제가 맡은 기획 산출물을 중심으로 더 자세히 말씀드릴 수 있습니다.
        </p>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */

export default function KoccaDetail({ onNavigate }) {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{
        backgroundColor: '#f2eef0',
        backgroundImage:
          "linear-gradient(180deg, rgba(242,238,240,0) 0%, rgba(242,238,240,0.55) 70vh, rgba(242,238,240,0.94) 115vh, #f2eef0 150vh), url('/hero-bg.jpg')",
        backgroundSize: 'auto, 100% auto',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        color: '#1c181a',
      }}
    >
      <div className="fixed top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(166,54,102,0.25), transparent)' }} />
      <div className="px-4 md:px-6 pt-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <ProjectShowcase activeId="kocca" onNavigate={onNavigate} />
        </div>
      </div>
      <LineageSection onNavigate={onNavigate} />
      <MyPartSection />
      <EngineSection />
      <StatusSection />
    </div>
  );
}
