import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroShowcase from '../ui/HeroShowcase';

/* 랜딩 = 히어로(첫 화면 요약) + 역량 + 대표작 + 연락.
   히어로는 Work(ProjectShowcase)와 같은 흰 프레임 · 홈 탭 · 대형 타이포 문법을 쓴다.
   랜딩과 Work가 따로 노는 문제를 컨테이너 자체로 해결한 구조라,
   본문 섹션도 Work 상세와 마찬가지로 프레임 안쪽에 들어간다.
   깊은 내용은 Work · Solo Work · AI-lab · Why Me · 이력서가 담당한다. */

/* 공통 잉크 — Work 상세 페이지와 같은 값 */
const INK = 'rgba(24,32,27,0.88)';
const INK_60 = 'rgba(24,32,27,0.6)';
const INK_45 = 'rgba(24,32,27,0.45)';
const BORDER = 'rgba(24,32,27,0.08)';
const CARD = 'rgba(255,255,255,0.6)';
const ACCENT = '#0f8f74';
/* 섹션 라벨 색 = 그 섹션이 이어지는 페이지의 시그니처.
   색만 봐도 어디로 가는 목록인지 알 수 있게 한다. */
const XR_ACCENT = '#1540c9';     // Work(KISTI·꿈키·한콘진)
const WEB_ACCENT = '#0d6b46';    // 웹마인드
const SIDE_ACCENT = '#6d4fd6';   // Solo Work

/* What I deliver — 형용사가 아니라 실제로 만들어 넘기는 산출물 목록.
   전부 지식그래프 볼트·실프로젝트에 실물이 있는 것만 (검증 가능성 원칙) */
const CAPABILITIES = [
  '요구사항 정의서',
  '화면정의서 · 와이어프레임',
  'IA · 사이트맵',
  '유저 플로우 · 저니맵',
  '데이터 스키마',
  'QA 시나리오',
  'WBS · 일정 계획',
  '프롬프트 · 가드레일 설계',
];

/* Background — 산출물이 아니라 그 산출물이 나오는 배경.
   deliver 목록과 성격이 달라 줄을 분리한다. 전부 이력으로 증명되는 것만
   (컴공 전공·정보처리기사·캐파 인턴·개발자 취준·웹마인드 1년 4개월). */
const BACKGROUND = [
  '컴퓨터공학 전공 · 정보처리기사',
  'B2B 웹 서비스 기획 — 에이전시 1년 4개월',
  '백엔드 개발 경험 — Spring Boot · React',
];

/* 실무 프로젝트 — 색·워드마크를 Work 쇼케이스 패널과 맞춰 같은 계보로 읽히게 한다.
   desc는 데스크톱 아코디언의 펼친 패널에서만 노출.
   thumb: 펼친 패널 배경으로 깔리는 실화면 이미지 (없으면 그라디언트만) */
const PROJECTS = [
  {
    tab: 'kisti', name: 'KISTI', sub: '고령자 인지-운동 융합 훈련 VR',
    meta: '2024 — 현재 · 단독 기획 · PM',
    desc: '1차 임상 60명 무이슈 완료. 1년 용역이 3년차 운영으로 연장됐습니다.',
    thumb: '/images/kisti/card.png',
    bg: '#1540c9', bgSoft: '#2f66ee', accent: '#8ee4ff',
  },
  {
    tab: 'dream', name: '꿈키올래', sub: 'Vision Pro 직업체험 9종',
    meta: '2025 · PM · 기획 · QA',
    desc: '불가능한 일정을 3컨셉 × 3직업 프레임워크 구조로 해결했습니다.',
    bg: '#3a2a10', bgSoft: '#5a4218', accent: '#e8bd6d',
  },
  {
    tab: 'kocca-detail', name: 'KOCCA', sub: 'LLM 실시간 생성 과학수사 체험',
    meta: '2026 · 국가과제 진행 중',
    desc: '매 플레이마다 LLM이 사건을 새로 생성합니다. LLM은 제안, 코드가 보증.',
    bg: '#3b1428', bgSoft: '#5c1f3d', accent: '#f9a8d4',
  },
];

/* 웹 프로젝트 — 웹마인드에서 구축한 B2B 사이트들. 전부 /webmind로 연결.
   ⚠️ 클라이언트 실명은 본인 확인 후 교체 (지금은 업종명) */
const WEB_PROJECTS = [
  {
    tab: 'webmind', name: '분석기업', sub: '공식 사이트 고도화',
    meta: 'IA 개선 · 정보 접근성 향상',
    bg: '#0d6b46', bgSoft: '#1d9a68', accent: '#8ff0c0',
  },
  {
    tab: 'webmind', name: '주차솔루션', sub: '브랜드 사이트 리뉴얼',
    meta: '웹어워드 코리아 금상 · 유지보수 연장',
    bg: '#14614f', bgSoft: '#248a72', accent: '#93ead6',
  },
  {
    tab: 'webmind', name: '건설사', sub: '공식 사이트 구축',
    meta: '제안 PT 참여 · 수주 100%',
    bg: '#16603a', bgSoft: '#26905a', accent: '#97eeb8',
  },
];

/* 개인 프로젝트 — 같은 카드 문법, 전부 Solo Work 페이지로 연결.
   워드마크는 카드 폭에 맞춰 짧게 줄이고 정식 명칭은 아래 줄이 받는다. */
const SIDE_PROJECTS = [
  {
    tab: 'solo', name: '퀴즈왕', sub: '성격유형별 상식 퀴즈',
    meta: '앱인토스 · 2026.06 출시',
    bg: '#8a5a10', bgSoft: '#c98a22', accent: '#ffd98a',
  },
  {
    tab: 'solo', name: '소비유형', sub: '2지선다 소비 성향 진단',
    meta: '앱인토스 · 2026 출시',
    bg: '#0e5a4c', bgSoft: '#1d8f78', accent: '#8ef0da',
  },
  {
    tab: 'solo', name: '커피내기', sub: '균등 1/N 슬롯 추첨',
    meta: '앱인토스 · 2026 출시',
    bg: '#8c3a12', bgSoft: '#c95c22', accent: '#ffb289',
  },
  {
    tab: 'solo', name: '산책지수', sub: '오늘 산책 나가도 되는지',
    meta: '앱인토스 · 2026 출시',
    bg: '#12466e', bgSoft: '#2578b5', accent: '#a8dcff',
  },
];

const CHANNELS = [
  {
    id: 'email',
    label: '이메일',
    value: 'iplay3473@gmail.com',
    href: 'mailto:iplay3473@gmail.com',
    hint: '가장 빠른 연락 수단입니다',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/lyudolf',
    href: 'https://github.com/lyudolf',
    hint: '직접 만든 것들이 올라가 있습니다',
  },
];

function SectionLabel({ children, color = ACCENT }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
      style={{ color }}
    >
      {children}
    </motion.p>
  );
}

function CapabilitiesSection() {
  return (
    <section className="px-8 pb-4" style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* "What I do"는 이제 Work 페이지의 문장이라, 랜딩 역량 칩은 deliver로 구분 */}
      <SectionLabel>What I deliver</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {CAPABILITIES.map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="text-[13px] font-medium px-4 py-2 rounded-full"
            style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          >
            {c}
          </motion.span>
        ))}
      </div>

      {/* 배경 — 위 산출물이 나오는 이력. 채움 없는 칩으로 층위를 낮춘다. */}
      <p className="text-[11px] font-bold tracking-[0.3em] uppercase mt-8 mb-4"
        style={{ color: INK_45 }}>
        Background
      </p>
      <div className="flex flex-wrap gap-2">
        {BACKGROUND.map((b, i) => (
          <motion.span
            key={b}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="text-[12.5px] font-medium px-4 py-2 rounded-full"
            style={{ background: 'transparent', border: `1px dashed rgba(24,32,27,0.22)`, color: INK_60 }}
          >
            {b}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* 카드 하나 = 해당 프로젝트 쇼케이스 패널의 축소판.
   색·워드마크·서브가 상세 페이지와 그대로 이어진다. */
function ProjectCard({ item, index, wordmarkSize }) {
  return (
    <motion.button
      onClick={item.onClick}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="text-left overflow-hidden cursor-pointer"
      style={{
        borderRadius: 22,
        background: '#fff',
        border: `1px solid ${BORDER}`,
        boxShadow: '0 8px 24px rgba(24,32,27,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(24,32,27,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(24,32,27,0.05)';
      }}
    >
      {/* 미니 패널 — 쇼케이스 히어로와 같은 그라디언트·대형 워드마크.
         thumb가 있으면 그라디언트 아래 실화면을 깔고 워드마크 가독성만 확보 */}
      <div className="relative flex items-end px-5"
        style={{
          height: 132,
          backgroundColor: item.bg,
          backgroundImage: item.thumb
            ? `linear-gradient(150deg, ${item.bgSoft}cc 0%, ${item.bg}e6 62%), url('${item.thumb}')`
            : `linear-gradient(150deg, ${item.bgSoft} 0%, ${item.bg} 62%)`,
          backgroundSize: item.thumb ? 'auto, cover' : 'auto',
          backgroundPosition: 'center, center',
        }}>
        <span style={{
          position: 'absolute', left: 18, bottom: 10,
          fontSize: wordmarkSize, fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 0.92,
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.82) 26%, rgba(255,255,255,0.4) 68%, rgba(255,255,255,0.06) 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          color: 'transparent', WebkitTextFillColor: 'transparent',
          whiteSpace: 'nowrap',
        }}>
          {item.name}
        </span>
        <span style={{
          position: 'absolute', right: 16, top: 14,
          width: 7, height: 7, borderRadius: 99, background: item.accent,
        }} />
      </div>

      <div className="px-5 py-4">
        <p className="text-[14px] font-bold mb-1.5" style={{ color: INK }}>{item.sub}</p>
        <p className="text-[11.5px]" style={{ color: INK_45 }}>{item.meta}</p>
      </div>
    </motion.button>
  );
}

/* ── 데스크톱 전용 아코디언 갤러리 ──
   hover한 패널이 넓게 펼쳐지고 나머지는 접히며 채도가 빠진다.
   패널은 쇼케이스와 같은 그라디언트+워드마크 — 이미지 없이 문법을 잇는다.
   클릭은 항상 상세 이동(확장은 hover/focus 담당이라 충돌 없음). */
function ProjectAccordion({ onNavigate }) {
  const [idx, setIdx] = useState(0);

  return (
    <div className="hidden md:flex gap-2.5" style={{ height: 400 }}>
      {PROJECTS.map((f, i) => {
        const open = i === idx;
        return (
          <button
            key={f.tab}
            onMouseEnter={() => setIdx(i)}
            onFocus={() => setIdx(i)}
            onClick={() => onNavigate?.(f.tab)}
            aria-expanded={open}
            className="relative text-left overflow-hidden cursor-pointer"
            style={{
              flexGrow: open ? 2.6 : 1,
              flexBasis: 0,
              minWidth: 0,
              borderRadius: 22,
              backgroundColor: f.bg,
              /* thumb가 있으면 실화면을 배경으로 깔고, 그 위에 컬러 그라디언트를
                 얹어 텍스트 가독성을 확보한다. 펼친 패널일수록 사진이 더 보이게. */
              backgroundImage: f.thumb
                ? `linear-gradient(150deg, ${f.bgSoft}${open ? 'b8' : 'e0'} 0%, ${f.bg}${open ? 'e0' : 'f2'} 62%), url('${f.thumb}')`
                : `linear-gradient(150deg, ${f.bgSoft} 0%, ${f.bg} 62%)`,
              backgroundSize: f.thumb ? 'auto, cover' : 'auto',
              backgroundPosition: 'center, center',
              filter: open ? 'none' : 'saturate(0.5) brightness(0.8)',
              transition:
                'flex-grow 0.65s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease',
            }}
          >
            {/* 상단 — 액센트 점 + 펼친 패널에만 메타 */}
            <div className="absolute top-5 left-6 right-5 flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold whitespace-nowrap overflow-hidden"
                style={{
                  color: f.accent,
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(6px)',
                  transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s',
                }}>
                {f.meta}
              </span>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: f.accent, flexShrink: 0 }} />
            </div>

            {/* 하단 — 워드마크(항상) + 설명(펼친 패널만) */}
            <div className="absolute left-6 right-5 bottom-5">
              <span style={{
                display: 'block',
                fontSize: 52, fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 0.92,
                backgroundImage:
                  'linear-gradient(180deg, rgba(255,255,255,0.85) 26%, rgba(255,255,255,0.42) 68%, rgba(255,255,255,0.07) 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap',
              }}>
                {f.name}
              </span>
              <div style={{
                maxHeight: open ? 120 : 0,
                opacity: open ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.55s cubic-bezier(0.22,1,0.36,1) 0.08s, opacity 0.4s ease 0.18s',
              }}>
                <p className="text-[15px] font-bold mt-3 mb-1.5 whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.94)' }}>
                  {f.sub}
                </p>
                <p className="text-[12.5px] leading-relaxed mb-2.5" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  {f.desc}
                </p>
                <span className="text-[12px] font-bold" style={{ color: f.accent }}>
                  자세히 보기 →
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* 캐러셀 화살표 — 비활성 상태를 색·테두리로 확실히 구분 */
function PageArrow({ dir, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'next' ? '다음 프로젝트' : '이전 프로젝트'}
      className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] transition-all"
      style={{
        border: `1px solid ${disabled ? 'rgba(24,32,27,0.08)' : 'rgba(24,32,27,0.18)'}`,
        background: disabled ? 'transparent' : '#fff',
        color: disabled ? 'rgba(24,32,27,0.22)' : INK,
        cursor: disabled ? 'default' : 'pointer',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(24,32,27,0.06)'; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = '#fff'; }}
    >
      {dir === 'next' ? '→' : '←'}
    </button>
  );
}

/* 페이지네이션 카드 섹션 — 한 줄에 4장씩, 우측 상단 좌우 화살표로 넘긴다.
   첫 페이지면 ←, 마지막 페이지면 → 가 비활성. 항목이 perPage 이하면 둘 다 비활성. */
function CarouselSection({ label, labelColor, items, perPage = 4, wordmarkSize = 34, moreTab, onNavigate, className }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const atFirst = page === 0;
  const atLast = page >= pages - 1;
  const visible = items.slice(page * perPage, page * perPage + perPage);

  return (
    <section className={`px-8 ${className}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <SectionLabel color={labelColor}>{label}</SectionLabel>
        <div className="flex items-center gap-2.5" style={{ transform: 'translateY(-4px)' }}>
          {pages > 1 && (
            <span className="text-[11.5px] font-semibold" style={{ color: INK_45 }}>
              {page + 1} / {pages}
            </span>
          )}
          {moreTab && (
            <button onClick={() => onNavigate?.(moreTab)}
              className="text-[12px] font-semibold cursor-pointer transition-colors mr-1"
              style={{ color: INK_45 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = INK; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = INK_45; }}>
              전체 보기 →
            </button>
          )}
          <PageArrow dir="prev" disabled={atFirst} onClick={() => setPage((p) => Math.max(0, p - 1))} />
          <PageArrow dir="next" disabled={atLast} onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((it, i) => (
          <ProjectCard
            key={it.name}
            item={{ ...it, onClick: () => onNavigate?.(it.tab) }}
            index={i}
            wordmarkSize={wordmarkSize}
          />
        ))}
      </div>
    </section>
  );
}

function CardSection({ label, labelColor, items, columns, wordmarkSize = 42, moreTab, onNavigate, className }) {
  return (
    <section className={`px-8 ${className}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="flex items-baseline justify-between mb-6">
        <SectionLabel color={labelColor}>{label}</SectionLabel>
        <button onClick={() => onNavigate?.(moreTab)}
          className="text-[12px] font-semibold cursor-pointer transition-colors"
          style={{ color: INK_45 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = INK; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = INK_45; }}>
          전체 보기 →
        </button>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${columns}`}>
        {items.map((it, i) => (
          <ProjectCard
            key={it.name}
            item={{ ...it, onClick: () => onNavigate?.(it.tab) }}
            index={i}
            wordmarkSize={wordmarkSize}
          />
        ))}
      </div>
    </section>
  );
}

function ContactSection({ onNavigate }) {
  return (
    <section className="px-8 pt-4 pb-20" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Let&apos;s talk</SectionLabel>
      <h2 className="text-[28px] md:text-[38px] font-extrabold leading-[1.22] mb-5"
        style={{ color: INK, letterSpacing: '-0.03em' }}>
        서비스 기획 · PO 포지션을<br />찾고 있습니다
      </h2>
      <p className="text-[14px] md:text-[15px] leading-[1.9] mb-10"
        style={{ color: INK_60, maxWidth: 560 }}>
        문제 정의부터 실행까지 함께 만들 팀이라면, 도메인을 가리지 않고 이야기 나누고 싶습니다.
        이력서는 아래에서 바로 보실 수 있습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10" style={{ maxWidth: 760 }}>
        {CHANNELS.map((c) => (
          <a key={c.id} href={c.href}
            target={c.id === 'github' ? '_blank' : undefined}
            rel={c.id === 'github' ? 'noopener noreferrer' : undefined}
            className="block p-6 rounded-2xl transition-all"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = 'rgba(15,143,116,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = CARD;
              e.currentTarget.style.borderColor = BORDER;
            }}>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>
              {c.label}
            </p>
            <p className="text-[16px] font-semibold mb-1.5" style={{ color: INK }}>{c.value}</p>
            <p className="text-[12px]" style={{ color: INK_45 }}>{c.hint}</p>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button onClick={() => onNavigate?.('resume')}
          className="px-6 py-3 rounded-full text-[13px] font-bold cursor-pointer transition-transform"
          style={{ background: '#12211a', color: '#fff' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
          이력서 보기
        </button>
        <button onClick={() => onNavigate?.('whyme')}
          className="px-6 py-3 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = CARD; }}>
          왜 저인가
        </button>
      </div>
    </section>
  );
}

export default function About({ onNavigate }) {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ backgroundColor: '#eef0ec', color: '#1a231e' }}
    >
      <div className="px-4 md:px-6 py-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <HeroShowcase onNavigate={onNavigate}>
            <CapabilitiesSection />
            <section className="px-8 pt-16 pb-10" style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div className="flex items-baseline justify-between mb-6">
                <SectionLabel color={XR_ACCENT}>XR Project</SectionLabel>
                <button onClick={() => onNavigate?.('kisti')}
                  className="text-[12px] font-semibold cursor-pointer transition-colors"
                  style={{ color: INK_45 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = INK; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = INK_45; }}>
                  전체 보기 →
                </button>
              </div>
              {/* 데스크톱: hover 아코디언 / 모바일: 카드 스택 (hover 없어 탭 충돌 방지) */}
              <ProjectAccordion onNavigate={onNavigate} />
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {PROJECTS.map((it, i) => (
                  <ProjectCard key={it.name}
                    item={{ ...it, onClick: () => onNavigate?.(it.tab) }}
                    index={i} wordmarkSize={42} />
                ))}
              </div>
            </section>
            <CarouselSection
              label="Web Project"
              labelColor={WEB_ACCENT}
              items={WEB_PROJECTS}
              perPage={4}
              moreTab="webmind"
              onNavigate={onNavigate}
              className="pb-10"
            />
            <CardSection
              label="Side Project"
              labelColor={SIDE_ACCENT}
              items={SIDE_PROJECTS}
              columns="md:grid-cols-2 lg:grid-cols-4"
              wordmarkSize={34}
              moreTab="solo"
              onNavigate={onNavigate}
              className="pb-16"
            />
            <ContactSection onNavigate={onNavigate} />
          </HeroShowcase>
        </div>
      </div>
    </div>
  );
}
